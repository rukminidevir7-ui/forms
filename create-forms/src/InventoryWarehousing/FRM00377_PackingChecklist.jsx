// FRM00376_PackingChecklist.jsx
// FRM-00376 – Packing Checklist – Checklist (Dynamic Columns Enabled)

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

const defaultVerificationItems = [
  "Packing list verified",
  "Correct items packed",
  "Quantity verified",
  "Batch / lot verified",
  "Items free from damage",
  "Proper packaging material used",
  "Labeling completed",
  "Seal integrity verified",
  "Documentation included",
  "System entry completed",
  "Safety procedures followed"
];

const validationSchema = Yup.object({

  checklistDate: Yup.string().required('Required'),
  warehouseLocation: Yup.string().required('Required'),
  packingReference: Yup.string().required('Required'),
  checkedBy: Yup.string().required('Required'),
  shiftTime: Yup.string().required('Required'),

  items: Yup.array().of(
    Yup.object().shape({
      orderNo: Yup.string().required('Required'),
      itemDescription: Yup.string().required('Required'),
      itemCode: Yup.string().required('Required'),
      batchNumber: Yup.string(),
      quantityPacked: Yup.number().required('Required'),
      packageId: Yup.string().required('Required'),
      dynamicFields: Yup.object()
    })
  ).min(1, 'At least one item required'),

  verificationChecks: Yup.array().of(
    Yup.object().shape({
      checkItem: Yup.string().required('Required'),
      status: Yup.string().required('Required'),
      remarks: Yup.string()
    })
  ).min(1, 'At least one verification check required'),

  performedBy: Yup.string().required('Required'),
  supervisor: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()
});

const initialValues = {
  checklistDate: '',
  warehouseLocation: '',
  packingReference: '',
  checkedBy: '',
  shiftTime: '',

  items: [
    {
      orderNo: '',
      itemDescription: '',
      itemCode: '',
      batchNumber: '',
      quantityPacked: '',
      packageId: '',
      dynamicFields: {}
    }
  ],

  verificationChecks: defaultVerificationItems.map(item => ({
    checkItem: item,
    status: '',
    remarks: ''
  })),

  performedBy: '',
  supervisor: '',

  customFields: [],
  attachments: [],
  signatures: []
};

const FRM00376_PackingChecklist = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const name = prompt("Enter New Item Field Name");
    if (!name) return;

    const key = name.replace(/\s+/g, '');
    if (dynamicColumns.find(col => col.key === key)) {
      alert("Field already exists");
      return;
    }

    setDynamicColumns([...dynamicColumns, { key, label: name }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
  };

  return (
    <ModernFormWrapper
      formId="FRM-00376"
      title="Packing Checklist – Checklist"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Packing Checklist submitted successfully');
        }}
      >
        {({ values }) => (
          <Form>
            <ModernA4Template
              formId="FRM-00376"
              title="Packing Checklist"
              department="Inventory & Warehousing – Warehouse Control"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  <Field name="checklistDate" type="date" className="form-input" />
                  <Field name="warehouseLocation" className="form-input" />
                  <Field name="packingReference" className="form-input" />
                  <Field name="checkedBy" className="form-input" />
                  <Field name="shiftTime" className="form-input" />
                </div>
              </div>

              {/* 2. Order / Material Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Order / Material Details</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: '15px' }}>
                    <button
                      type="button"
                      className="btn-submit"
                      onClick={addColumn}
                      style={{ marginRight: '15px' }}
                    >
                      + Add Item Field
                    </button>

                    <FieldArray name="items">
                      {({ push }) => (
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={() =>
                            push({
                              orderNo: '',
                              itemDescription: '',
                              itemCode: '',
                              batchNumber: '',
                              quantityPacked: '',
                              packageId: '',
                              dynamicFields: {}
                            })
                          }
                        >
                          + Add Item
                        </button>
                      )}
                    </FieldArray>
                  </div>
                )}

                <FieldArray name="items">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Order No.</th>
                          <th>Item Description</th>
                          <th>Item Code</th>
                          <th>Batch</th>
                          <th>Qty Packed</th>
                          <th>Package ID</th>

                          {dynamicColumns.map(col => (
                            <th key={col.key}>
                              {col.label}
                              {!isPrintMode && (
                                <button
                                  type="button"
                                  onClick={() => removeColumn(col.key)}
                                  style={{ marginLeft: '8px' }}
                                >
                                  x
                                </button>
                              )}
                            </th>
                          ))}

                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>

                      <tbody>
                        {values.items.map((item, index) => (
                          <tr key={index}>
                            <td><Field name={`items.${index}.orderNo`} className="form-input" /></td>
                            <td><Field name={`items.${index}.itemDescription`} className="form-input" /></td>
                            <td><Field name={`items.${index}.itemCode`} className="form-input" /></td>
                            <td><Field name={`items.${index}.batchNumber`} className="form-input" /></td>
                            <td><Field name={`items.${index}.quantityPacked`} type="number" className="form-input" /></td>
                            <td><Field name={`items.${index}.packageId`} className="form-input" /></td>

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
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  style={{ marginLeft: '10px' }}
                                >
                                  Remove
                                </button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>
              </div>

              {/* 3. Verification Checks */}
              <div className="form-section">
                <h3 className="form-section-title">3. Packing Verification Checks</h3>

                <FieldArray name="verificationChecks">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <div style={{ marginBottom: '15px' }}>
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={() => push({ checkItem: '', status: '', remarks: '' })}
                          >
                            + Add Custom Check
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Verification Item</th>
                            <th>Yes</th>
                            <th>No</th>
                            <th>Remarks</th>
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {values.verificationChecks.map((check, index) => (
                            <tr key={index}>
                              <td>
                                <Field name={`verificationChecks.${index}.checkItem`} className="form-input" />
                              </td>
                              <td>
                                <Field type="radio" name={`verificationChecks.${index}.status`} value="Yes" />
                              </td>
                              <td>
                                <Field type="radio" name={`verificationChecks.${index}.status`} value="No" />
                              </td>
                              <td>
                                <Field name={`verificationChecks.${index}.remarks`} className="form-input" />
                              </td>
                              {!isPrintMode && (
                                <td>
                                  <button type="button" onClick={() => remove(index)}>
                                    Remove
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </FieldArray>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Packing Checklist
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

export default FRM00376_PackingChecklist;
