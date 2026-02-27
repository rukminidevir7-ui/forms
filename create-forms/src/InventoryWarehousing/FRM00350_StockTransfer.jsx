// FRM00350_StockTransfer.jsx
// FRM-00350 – Stock Transfer – Request / Initiation Form

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
  transferDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  requestedBy: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  transferType: Yup.string().required('Required'),
  fromLocation: Yup.string().required('Required'),
  toLocation: Yup.string().required('Required'),

  // 2. Transfer Details
  reasonForTransfer: Yup.string().required('Required'),
  requiredDate: Yup.string().required('Required'),
  transportMethod: Yup.string().required('Required'),

  // 3. Item Details
  items: Yup.array().of(
    Yup.object().shape({
      itemCode: Yup.string().required('Required'),
      itemDescription: Yup.string().required('Required'),
      uom: Yup.string().required('Required'),
      availableQty: Yup.number().required('Required'),
      transferQty: Yup.number().required('Required'),
      batchNumber: Yup.string(),
      remarks: Yup.string(),
      dynamicFields: Yup.object()
    })
  ).min(1, 'At least one item required'),

  // 4. Verification
  stockAvailabilityChecked: Yup.string().required('Required'),
  conditionBeforeTransfer: Yup.string().required('Required'),
  verificationRemarks: Yup.string(),

  // 5. Authorization
  requestorApproval: Yup.string().required('Required'),
  storesApprovalFrom: Yup.string().required('Required'),
  storesApprovalTo: Yup.string().required('Required'),
  managementApproval: Yup.string().required('Required'),
  authorizationComments: Yup.string(),

  // 6. Supporting Information
  supportingDocuments: Yup.string(),
  additionalNotes: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  transferDate: '',
  department: '',
  requestedBy: '',
  referenceNumber: '',
  transferType: '',
  fromLocation: '',
  toLocation: '',

  reasonForTransfer: '',
  requiredDate: '',
  transportMethod: '',

  items: [
    {
      itemCode: '',
      itemDescription: '',
      uom: '',
      availableQty: '',
      transferQty: '',
      batchNumber: '',
      remarks: '',
      dynamicFields: {}
    }
  ],

  stockAvailabilityChecked: '',
  conditionBeforeTransfer: '',
  verificationRemarks: '',

  requestorApproval: '',
  storesApprovalFrom: '',
  storesApprovalTo: '',
  managementApproval: '',
  authorizationComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00350_StockTransfer = () => {

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
      formId="FRM-00350"
      title="Stock Transfer – Request / Initiation Form"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Stock Transfer submitted successfully');
        }}
      >
        {({ values }) => (
          <Form>
            <ModernA4Template
              formId="FRM-00350"
              title="Stock Transfer"
              department="Inventory & Warehousing – Stores Operations"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'transferDate','Transfer Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'requestedBy','Requested By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {field(values,'transferType','Transfer Type')}
                  {field(values,'fromLocation','From Location')}
                  {field(values,'toLocation','To Location')}
                </div>
              </div>

              {/* 2. Transfer Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Transfer Details</h3>
                <div className="form-fields">
                  {textarea(values,'reasonForTransfer','Reason for Transfer')}
                  {field(values,'requiredDate','Required Date','date')}
                  {field(values,'transportMethod','Transport Method')}
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
                            <th>Available Qty</th>
                            <th>Transfer Qty</th>
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
                              <td><Field name={`items.${index}.availableQty`} type="number" className="form-input" /></td>
                              <td><Field name={`items.${index}.transferQty`} type="number" className="form-input" /></td>
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
                            availableQty: '',
                            transferQty: '',
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
                  {field(values,'conditionBeforeTransfer','Condition Before Transfer')}
                  {textarea(values,'verificationRemarks','Remarks')}
                </div>
              </div>

              {/* 5. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requestorApproval','Requestor Approval')}
                  {field(values,'storesApprovalFrom','Stores Approval (From)')}
                  {field(values,'storesApprovalTo','Stores Approval (To)')}
                  {field(values,'managementApproval','Management Approval')}
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
                    Submit Stock Transfer
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

export default FRM00350_StockTransfer;
