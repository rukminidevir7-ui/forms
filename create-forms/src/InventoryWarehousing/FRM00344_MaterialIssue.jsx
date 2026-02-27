// FRM00344_MaterialIssue.jsx
// FRM-00344 – Material Issue – Request / Initiation Form

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
  issueDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  issuedBy: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  warehouseLocation: Yup.string().required('Required'),
  requestorName: Yup.string().required('Required'),
  costCenter: Yup.string().required('Required'),

  // 2. Issue Details
  issueType: Yup.string().required('Required'),
  purpose: Yup.string().required('Required'),
  requiredDate: Yup.string().required('Required'),

  // 3. Item Details
  items: Yup.array().of(
    Yup.object().shape({
      itemCode: Yup.string().required('Required'),
      itemDescription: Yup.string().required('Required'),
      uom: Yup.string().required('Required'),
      requestedQty: Yup.number().required('Required'),
      issuedQty: Yup.number().required('Required'),
      batchNumber: Yup.string(),
      remarks: Yup.string(),
      dynamicFields: Yup.object()
    })
  ).min(1, 'At least one item required'),

  // 4. Verification
  stockAvailabilityChecked: Yup.string().required('Required'),
  balanceAfterIssue: Yup.string().required('Required'),
  verificationRemarks: Yup.string(),

  // 5. Authorization
  requestorApproval: Yup.string().required('Required'),
  storesApproval: Yup.string().required('Required'),
  departmentApproval: Yup.string().required('Required'),
  authorizationComments: Yup.string(),

  // 6. Supporting Information
  supportingDocuments: Yup.string(),
  additionalNotes: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  issueDate: '',
  department: '',
  issuedBy: '',
  referenceNumber: '',
  warehouseLocation: '',
  requestorName: '',
  costCenter: '',

  issueType: '',
  purpose: '',
  requiredDate: '',

  items: [
    {
      itemCode: '',
      itemDescription: '',
      uom: '',
      requestedQty: '',
      issuedQty: '',
      batchNumber: '',
      remarks: '',
      dynamicFields: {}
    }
  ],

  stockAvailabilityChecked: '',
  balanceAfterIssue: '',
  verificationRemarks: '',

  requestorApproval: '',
  storesApproval: '',
  departmentApproval: '',
  authorizationComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00344_MaterialIssue = () => {

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
      formId="FRM-00344"
      title="Material Issue – Request / Initiation Form"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Material Issue submitted successfully');
        }}
      >
        {({ values }) => (
          <Form>
            <ModernA4Template
              formId="FRM-00344"
              title="Material Issue"
              department="Inventory & Warehousing – Stores Operations"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'issueDate','Issue Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'issuedBy','Issued By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {field(values,'warehouseLocation','Warehouse Location')}
                  {field(values,'requestorName','Requestor Name')}
                  {field(values,'costCenter','Cost Center / Project')}
                </div>
              </div>

              {/* 2. Issue Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Issue Details</h3>
                <div className="form-fields">
                  {select(values,'issueType','Issue Type',['Consumption','Transfer','Return'])}
                  {textarea(values,'purpose','Purpose')}
                  {field(values,'requiredDate','Required Date','date')}
                </div>
              </div>

              {/* 3. Item Details (Dynamic Rows + Columns SAME AS GRN) */}
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
                            <th>Requested Qty</th>
                            <th>Issued Qty</th>
                            <th>Batch/Lot</th>
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
                              <td><Field name={`items.${index}.requestedQty`} type="number" className="form-input" /></td>
                              <td><Field name={`items.${index}.issuedQty`} type="number" className="form-input" /></td>
                              <td><Field name={`items.${index}.batchNumber`} className="form-input" /></td>
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
                            requestedQty: '',
                            issuedQty: '',
                            batchNumber: '',
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

              {/* 4. Verification */}
              <div className="form-section">
                <h3 className="form-section-title">4. Verification</h3>
                <div className="form-fields">
                  {field(values,'stockAvailabilityChecked','Stock Availability Checked')}
                  {field(values,'balanceAfterIssue','Balance After Issue')}
                  {textarea(values,'verificationRemarks','Remarks')}
                </div>
              </div>

              {/* 5. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requestorApproval','Requestor Approval')}
                  {field(values,'storesApproval','Stores Approval')}
                  {field(values,'departmentApproval','Department Approval')}
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
                    Submit Material Issue
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

export default FRM00344_MaterialIssue;
