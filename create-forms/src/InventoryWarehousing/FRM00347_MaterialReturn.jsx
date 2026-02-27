// FRM00347_MaterialReturn.jsx
// FRM-00347 – Material Return – Request / Initiation Form

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormAttachments from '../components/FormAttachments';
import FormCustomFields from '../components/FormCustomFields';
import FormSignatures from '../components/FormSignatures';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({

  // 1. Basic Information
  returnDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  returnedBy: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  warehouseLocation: Yup.string().required('Required'),
  originalIssueRef: Yup.string().required('Required'),
  costCenter: Yup.string().required('Required'),

  // 2. Return Details
  returnType: Yup.string().required('Required'),
  reasonForReturn: Yup.string().required('Required'),
  conditionOfMaterial: Yup.string().required('Required'),

  // 3. Item Details
  items: Yup.array().of(
    Yup.object().shape({
      itemCode: Yup.string().required('Required'),
      itemDescription: Yup.string().required('Required'),
      uom: Yup.string().required('Required'),
      issuedQty: Yup.number().required('Required'),
      returnedQty: Yup.number().required('Required'),
      acceptedQty: Yup.number().required('Required'),
      rejectedQty: Yup.number().required('Required'),
      remarks: Yup.string(),
      dynamicFields: Yup.object()
    })
  ).min(1, 'At least one item required'),

  // 4. Inspection
  inspectionRequired: Yup.string().required('Required'),
  inspectionResult: Yup.string().required('Required'),
  disposition: Yup.string().required('Required'),

  // 5. Authorization
  requestorConfirmation: Yup.string().required('Required'),
  storesVerification: Yup.string().required('Required'),
  qualityApproval: Yup.string().required('Required'),
  authorizationComments: Yup.string(),

  // 6. Supporting Information
  supportingDocuments: Yup.string(),
  additionalNotes: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  returnDate: '',
  department: '',
  returnedBy: '',
  referenceNumber: '',
  warehouseLocation: '',
  originalIssueRef: '',
  costCenter: '',

  returnType: '',
  reasonForReturn: '',
  conditionOfMaterial: '',

  items: [
    {
      itemCode: '',
      itemDescription: '',
      uom: '',
      issuedQty: '',
      returnedQty: '',
      acceptedQty: '',
      rejectedQty: '',
      remarks: '',
      dynamicFields: {}
    }
  ],

  inspectionRequired: '',
  inspectionResult: '',
  disposition: '',

  requestorConfirmation: '',
  storesVerification: '',
  qualityApproval: '',
  authorizationComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00347_MaterialReturn = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const columnName = prompt('Enter New Column Name');
    if (!columnName) return;

    const key = columnName.replace(/\s+/g, '');

    if (dynamicColumns.find(col => col.key === key)) {
      alert('Column already exists');
      return;
    }

    setDynamicColumns([...dynamicColumns, { key, label: columnName }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
  };

  const field = (values, name, label, type = 'text') => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '___________________'}</div>
      ) : (
        <>
          <Field name={name} type={type} className="form-input" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  const textarea = (values, name, label) => (
    <div className="form-field full-width">
      <label className="form-label">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '___________________'}</div>
      ) : (
        <>
          <Field as="textarea" name={name} className="form-textarea" rows="3" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  const select = (values, name, label, options) => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '___________________'}</div>
      ) : (
        <>
          <Field as="select" name={name} className="form-input">
            <option value="">-- Select --</option>
            {options.map(o => <option key={o} value={o}>{o}</option>)}
          </Field>
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (
    <ModernFormWrapper
      formId="FRM-00347"
      title="Material Return – Request / Initiation Form"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Material Return submitted successfully');
        }}
      >
        {({ values }) => (
          <Form>
            <ModernA4Template
              formId="FRM-00347"
              title="Material Return"
              department="Inventory & Warehousing – Stores Operations"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'returnDate','Return Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'returnedBy','Returned By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {field(values,'warehouseLocation','Warehouse Location')}
                  {field(values,'originalIssueRef','Original Issue Ref')}
                  {field(values,'costCenter','Cost Center / Project')}
                </div>
              </div>

              {/* 2. Return Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Return Details</h3>
                <div className="form-fields">
                  {select(values,'returnType','Return Type',['Excess','Damaged','Unused'])}
                  {textarea(values,'reasonForReturn','Reason for Return')}
                  {field(values,'conditionOfMaterial','Condition of Material')}
                </div>
              </div>

              {/* 3. Item Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Item Details</h3>

                {!isPrintMode && (
                  <button type="button" className="btn-submit" onClick={addColumn}>
                    + Add Column
                  </button>
                )}

                <FieldArray name="items">
                  {({ push, remove }) => (
                    <>
                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Item Code</th>
                            <th>Description</th>
                            <th>UOM</th>
                            <th>Issued Qty</th>
                            <th>Returned Qty</th>
                            <th>Accepted Qty</th>
                            <th>Rejected Qty</th>
                            <th>Remarks</th>

                            {dynamicColumns.map(col => (
                              <th key={col.key}>
                                {col.label}
                                {!isPrintMode && (
                                  <button type="button" onClick={() => removeColumn(col.key)}> x </button>
                                )}
                              </th>
                            ))}

                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {values.items.map((item, index) => (
                            <tr key={index}>
                              <td><Field name={`items.${index}.itemCode`} className="form-input" /></td>
                              <td><Field name={`items.${index}.itemDescription`} className="form-input" /></td>
                              <td><Field name={`items.${index}.uom`} className="form-input" /></td>
                              <td><Field name={`items.${index}.issuedQty`} type="number" className="form-input" /></td>
                              <td><Field name={`items.${index}.returnedQty`} type="number" className="form-input" /></td>
                              <td><Field name={`items.${index}.acceptedQty`} type="number" className="form-input" /></td>
                              <td><Field name={`items.${index}.rejectedQty`} type="number" className="form-input" /></td>
                              <td><Field name={`items.${index}.remarks`} className="form-input" /></td>

                              {dynamicColumns.map(col => (
                                <td key={col.key}>
                                  <Field
                                    name={`items.${index}.dynamicFields.${col.key}`}
                                    className="form-input"
                                  />
                                </td>
                              ))}

                              {!isPrintMode && (
                                <td>
                                  <button type="button" onClick={() => remove(index)}>Remove</button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={() => push({
                            itemCode: '',
                            itemDescription: '',
                            uom: '',
                            issuedQty: '',
                            returnedQty: '',
                            acceptedQty: '',
                            rejectedQty: '',
                            remarks: '',
                            dynamicFields: {}
                          })}
                        >
                          + Add Item
                        </button>
                      )}
                    </>
                  )}
                </FieldArray>
              </div>

              {/* 4. Inspection */}
              <div className="form-section">
                <h3 className="form-section-title">4. Inspection</h3>
                <div className="form-fields">
                  {select(values,'inspectionRequired','Inspection Required',['Yes','No'])}
                  {select(values,'inspectionResult','Inspection Result',['Accepted','Partially Accepted','Rejected'])}
                  {select(values,'disposition','Disposition',['Restock','Scrap','Repair'])}
                </div>
              </div>

              {/* 5. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requestorConfirmation','Requestor Confirmation')}
                  {field(values,'storesVerification','Stores Verification')}
                  {field(values,'qualityApproval','Quality Approval')}
                  {textarea(values,'authorizationComments','Comments')}
                </div>
              </div>

              {/* 6. Supporting Information */}
              <div className="form-section">
                <h3 className="form-section-title">6. Supporting Information</h3>
                <div className="form-fields">
                  {textarea(values,'supportingDocuments','Supporting Documents')}
                  {textarea(values,'additionalNotes','Additional Notes')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Material Return
                  </button>
                </div>
              )}

            </ModernA4Template>
          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00347_MaterialReturn;
