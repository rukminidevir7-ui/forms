// FRM00500_AssetReceipt.jsx
// FRM-00500 – Asset Receipt – Request & Approval Form

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormAttachments from '../components/FormAttachments';
import FormCustomFields from '../components/FormCustomFields';
import ApprovalSignatureBlock from "../components/ApprovalSignatureBlock";
import '../styles/FRM00611.css';

const validationSchema = Yup.object({

  receiptDate: Yup.string().required('Required'),
  receiptNo: Yup.string().required('Required'),
  purchaseOrderNo: Yup.string().required('Required'),
  vendor: Yup.string().required('Required'),
  projectCostCenter: Yup.string().required('Required'),

  items: Yup.array().of(
    Yup.object().shape({
      assetDescription: Yup.string().required('Required'),
      category: Yup.string().required('Required'),
      qtyOrdered: Yup.number().required('Required'),
      qtyReceived: Yup.number().required('Required'),
      condition: Yup.string().required('Required'),
      serialNo: Yup.string(),
      remarks: Yup.string(),
      dynamicFields: Yup.object()
    })
  ).min(1, 'At least one item required'),

  receivedBy: Yup.string().required('Required'),
  inspectedBy: Yup.string().required('Required'),
  inspectionDate: Yup.string().required('Required'),
  qualityStatus: Yup.string().required('Required'),

  preparedBy: Yup.object(),
  checkedBy: Yup.object(),
  approvedBy: Yup.object(),
  financeController: Yup.object(),

  additionalSignatures: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {

  receiptDate: '',
  receiptNo: '',
  purchaseOrderNo: '',
  vendor: '',
  projectCostCenter: '',

  items: [
    {
      assetDescription: '',
      category: '',
      qtyOrdered: '',
      qtyReceived: '',
      condition: '',
      serialNo: '',
      remarks: '',
      dynamicFields: {}
    }
  ],

  receivedBy: '',
  inspectedBy: '',
  inspectionDate: '',
  qualityStatus: '',
  overallRemarks: '',

  preparedBy: {},
  checkedBy: {},
  approvedBy: {},
  financeController: {},

  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00500_AssetReceipt = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const columnName = prompt('Enter New Item Field');
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
        <div className="print-value">{values[name] || '_________'}</div>
      ) : (
        <>
          <Field name={name} type={type} className="form-input" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-00500" title="Asset Receipt – Request & Approval Form">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Asset Receipt submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00500"
              title="ASSET RECEIPT – REQUEST & APPROVAL FORM"
              department="Asset Management – Asset Lifecycle"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Receipt Information</h3>
                <div className="form-fields">
                  {field(values,'receiptDate','Receipt Date','date')}
                  {field(values,'receiptNo','Receipt No')}
                  {field(values,'purchaseOrderNo','Purchase Order No')}
                  {field(values,'vendor','Vendor / Supplier')}
                  {field(values,'projectCostCenter','Project / Cost Center')}
                </div>
              </div>

              {/* 2. Asset Items */}
              <div className="form-section">
                <h3 className="form-section-title">2. Asset Items</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 15 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Item Field
                    </button>
                  </div>
                )}

                <FieldArray name="items">
                  {({ push, remove }) => (
                    <>

                      {!isPrintMode && (
                        <div style={{ marginBottom: 20 }}>
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={() =>
                              push({
                                assetDescription: '',
                                category: '',
                                qtyOrdered: '',
                                qtyReceived: '',
                                condition: '',
                                serialNo: '',
                                remarks: '',
                                dynamicFields: {}
                              })
                            }
                          >
                            + Add Item
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Asset Description</th>
                            <th>Category</th>
                            <th>Qty Ordered</th>
                            <th>Qty Received</th>
                            <th>Condition</th>
                            <th>Serial No / Tag</th>
                            <th>Remarks</th>

                            {dynamicColumns.map(col => (
                              <th key={col.key}>
                                {col.label}
                                {!isPrintMode && (
                                  <button
                                    type="button"
                                    style={{ marginLeft: 6 }}
                                    onClick={() => removeColumn(col.key)}
                                  >x</button>
                                )}
                              </th>
                            ))}

                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {values.items.map((row, index) => (
                            <tr key={index}>
                              <td><Field name={`items.${index}.assetDescription`} className="form-input" /></td>
                              <td><Field name={`items.${index}.category`} className="form-input" /></td>
                              <td><Field name={`items.${index}.qtyOrdered`} type="number" className="form-input" /></td>
                              <td><Field name={`items.${index}.qtyReceived`} type="number" className="form-input" /></td>
                              <td><Field name={`items.${index}.condition`} className="form-input" /></td>
                              <td><Field name={`items.${index}.serialNo`} className="form-input" /></td>
                              <td><Field name={`items.${index}.remarks`} className="form-input" /></td>

                              {dynamicColumns.map(col => (
                                <td key={col.key}>
                                  <Field name={`items.${index}.dynamicFields.${col.key}`} className="form-input" />
                                </td>
                              ))}

                              {!isPrintMode && (
                                <td>
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                  >
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

              {/* 3. Inspection Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Inspection Details</h3>
                <div className="form-fields">
                  {field(values,'receivedBy','Received By')}
                  {field(values,'inspectedBy','Inspected By')}
                  {field(values,'inspectionDate','Inspection Date','date')}
                  {field(values,'qualityStatus','Quality Check Status')}
                </div>
              </div>

              {/* 4. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">4. Authorization</h3>

                <div className="three-column-signatures">

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Prepared By"
                      value={values.preparedBy || {}}
                      onChange={(val) => setFieldValue("preparedBy", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Checked By"
                      value={values.checkedBy || {}}
                      onChange={(val) => setFieldValue("checkedBy", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Approved By"
                      value={values.approvedBy || {}}
                      onChange={(val) => setFieldValue("approvedBy", val)}
                    />
                  </div>

                </div>

                <div style={{ marginTop: 30 }}>
                  <ApprovalSignatureBlock
                    label="Finance / Asset Controller"
                    value={values.financeController || {}}
                    onChange={(val) => setFieldValue("financeController", val)}
                  />
                </div>

              </div>

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Asset Receipt
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

export default FRM00500_AssetReceipt;
