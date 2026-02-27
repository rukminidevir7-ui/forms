// FRM00378_DispatchChecklist.jsx
// FRM-00378 – Dispatch Checklist – Checklist (Dynamic Columns Enabled)

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

const defaultVerificationChecks = [
  "Dispatch list verified",
  "Correct items loaded",
  "Quantity verified",
  "Packaging integrity checked",
  "Labeling completed",
  "Documentation included",
  "Seal applied and verified",
  "Vehicle condition checked",
  "System entry completed",
  "Safety procedures followed"
];

const validationSchema = Yup.object({

  checklistDate: Yup.string().required('Required'),
  warehouseLocation: Yup.string().required('Required'),
  dispatchReference: Yup.string().required('Required'),
  checkedBy: Yup.string().required('Required'),
  shiftTime: Yup.string().required('Required'),

  shipmentItems: Yup.array().of(
    Yup.object().shape({
      orderNo: Yup.string().required('Required'),
      customerDestination: Yup.string().required('Required'),
      itemDescription: Yup.string().required('Required'),
      itemCode: Yup.string().required('Required'),
      quantityDispatched: Yup.number().required('Required'),
      vehicleShipmentId: Yup.string().required('Required'),
      dynamicFields: Yup.object()
    })
  ).min(1, 'At least one shipment item required'),

  verificationChecks: Yup.array().of(
    Yup.object().shape({
      checkItem: Yup.string().required('Required'),
      status: Yup.string().required('Required'),
      remarks: Yup.string()
    })
  ).min(1, 'At least one verification check required'),

  performedBy: Yup.string().required('Required'),
  supervisorApproval: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {
  checklistDate: '',
  warehouseLocation: '',
  dispatchReference: '',
  checkedBy: '',
  shiftTime: '',

  shipmentItems: [
    {
      orderNo: '',
      customerDestination: '',
      itemDescription: '',
      itemCode: '',
      quantityDispatched: '',
      vehicleShipmentId: '',
      dynamicFields: {}
    }
  ],

  verificationChecks: defaultVerificationChecks.map(item => ({
    checkItem: item,
    status: '',
    remarks: ''
  })),

  performedBy: '',
  supervisorApproval: '',

  customFields: [],
  attachments: [],
  signatures: []
};

const FRM00378_DispatchChecklist = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const name = prompt("Enter New Shipment Field Name");
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
      formId="FRM-00378"
      title="Dispatch Checklist – Checklist"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Dispatch Checklist submitted successfully');
        }}
      >
        {({ values }) => (
          <Form>
            <ModernA4Template
              formId="FRM-00378"
              title="Dispatch Checklist"
              department="Inventory & Warehousing – Warehouse Control"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  <Field name="checklistDate" type="date" className="form-input" />
                  <Field name="warehouseLocation" className="form-input" />
                  <Field name="dispatchReference" className="form-input" />
                  <Field name="checkedBy" className="form-input" />
                  <Field name="shiftTime" className="form-input" />
                </div>
              </div>

              {/* 2. Shipment Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Shipment Details</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: '15px' }}>
                    <button
                      type="button"
                      className="btn-submit"
                      onClick={addColumn}
                      style={{ marginRight: '15px' }}
                    >
                      + Add Shipment Field
                    </button>

                    <FieldArray name="shipmentItems">
                      {({ push }) => (
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={() =>
                            push({
                              orderNo: '',
                              customerDestination: '',
                              itemDescription: '',
                              itemCode: '',
                              quantityDispatched: '',
                              vehicleShipmentId: '',
                              dynamicFields: {}
                            })
                          }
                        >
                          + Add Shipment Item
                        </button>
                      )}
                    </FieldArray>
                  </div>
                )}

                <FieldArray name="shipmentItems">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Order No.</th>
                          <th>Customer / Destination</th>
                          <th>Item Description</th>
                          <th>Item Code</th>
                          <th>Quantity Dispatched</th>
                          <th>Vehicle / Shipment ID</th>

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
                        {values.shipmentItems.map((item, index) => (
                          <tr key={index}>
                            <td><Field name={`shipmentItems.${index}.orderNo`} className="form-input" /></td>
                            <td><Field name={`shipmentItems.${index}.customerDestination`} className="form-input" /></td>
                            <td><Field name={`shipmentItems.${index}.itemDescription`} className="form-input" /></td>
                            <td><Field name={`shipmentItems.${index}.itemCode`} className="form-input" /></td>
                            <td><Field name={`shipmentItems.${index}.quantityDispatched`} type="number" className="form-input" /></td>
                            <td><Field name={`shipmentItems.${index}.vehicleShipmentId`} className="form-input" /></td>

                            {dynamicColumns.map(col => (
                              <td key={col.key}>
                                <Field
                                  name={`shipmentItems.${index}.dynamicFields.${col.key}`}
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
                <h3 className="form-section-title">3. Dispatch Verification Checks</h3>

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
                            + Add Verification Item
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
                          {values.verificationChecks.map((row, index) => (
                            <tr key={index}>
                              <td><Field name={`verificationChecks.${index}.checkItem`} className="form-input" /></td>
                              <td><Field type="radio" name={`verificationChecks.${index}.status`} value="Yes" /></td>
                              <td><Field type="radio" name={`verificationChecks.${index}.status`} value="No" /></td>
                              <td><Field name={`verificationChecks.${index}.remarks`} className="form-input" /></td>
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
                    Submit Dispatch Checklist
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

export default FRM00378_DispatchChecklist;
