// FRM00503_AssetTagging.jsx
// FRM-00503 – Asset Tagging – Request & Approval Form

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

  taggingDate: Yup.string().required('Required'),
  requestNo: Yup.string().required('Required'),
  projectCostCenter: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  requestedBy: Yup.string().required('Required'),

  items: Yup.array().of(
    Yup.object().shape({
      assetDescription: Yup.string().required('Required'),
      category: Yup.string().required('Required'),
      assetId: Yup.string().required('Required'),
      tagNo: Yup.string().required('Required'),
      serialNo: Yup.string(),
      itemLocation: Yup.string(),
      custodian: Yup.string(),
      remarks: Yup.string(),
      dynamicFields: Yup.object()
    })
  ).min(1, 'At least one item required'),

  taggedBy: Yup.string().required('Required'),
  verifiedBy: Yup.string().required('Required'),
  verificationDate: Yup.string().required('Required'),
  status: Yup.string().required('Required'),

  preparedBy: Yup.object(),
  checkedBy: Yup.object(),
  approvedBy: Yup.object(),
  assetController: Yup.object(),

  additionalSignatures: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {

  taggingDate: '',
  requestNo: '',
  projectCostCenter: '',
  location: '',
  requestedBy: '',

  items: [
    {
      assetDescription: '',
      category: '',
      assetId: '',
      tagNo: '',
      serialNo: '',
      itemLocation: '',
      custodian: '',
      remarks: '',
      dynamicFields: {}
    }
  ],

  taggedBy: '',
  verifiedBy: '',
  verificationDate: '',
  status: '',
  overallRemarks: '',

  preparedBy: {},
  checkedBy: {},
  approvedBy: {},
  assetController: {},

  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00503_AssetTagging = () => {

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
    <ModernFormWrapper formId="FRM-00503" title="Asset Tagging – Request & Approval Form">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Asset Tagging submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00503"
              title="ASSET TAGGING – REQUEST & APPROVAL FORM"
              department="Asset Management – Asset Lifecycle"
            >

              {/* 1. Basic Info */}
              <div className="form-section">
                <h3 className="form-section-title">1. Tagging Information</h3>
                <div className="form-fields">
                  {field(values,'taggingDate','Tagging Date','date')}
                  {field(values,'requestNo','Request No')}
                  {field(values,'projectCostCenter','Project / Cost Center')}
                  {field(values,'location','Location')}
                  {field(values,'requestedBy','Requested By')}
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
                                assetId: '',
                                tagNo: '',
                                serialNo: '',
                                itemLocation: '',
                                custodian: '',
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
                            <th>Asset ID</th>
                            <th>Tag No</th>
                            <th>Serial No</th>
                            <th>Location</th>
                            <th>Custodian</th>
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
                              <td><Field name={`items.${index}.assetId`} className="form-input" /></td>
                              <td><Field name={`items.${index}.tagNo`} className="form-input" /></td>
                              <td><Field name={`items.${index}.serialNo`} className="form-input" /></td>
                              <td><Field name={`items.${index}.itemLocation`} className="form-input" /></td>
                              <td><Field name={`items.${index}.custodian`} className="form-input" /></td>
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

              {/* 3. Verification */}
              <div className="form-section">
                <h3 className="form-section-title">3. Verification Details</h3>
                <div className="form-fields">
                  {field(values,'taggedBy','Tagged By')}
                  {field(values,'verifiedBy','Verified By')}
                  {field(values,'verificationDate','Verification Date','date')}
                  {field(values,'status','Status')}
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
                    label="Asset Controller"
                    value={values.assetController || {}}
                    onChange={(val) => setFieldValue("assetController", val)}
                  />
                </div>

                {/* Custom Signatures */}
                <div style={{ marginTop: 30 }}>
                  <FieldArray name="additionalSignatures">
                    {({ push, remove }) => (
                      <>
                        {!isPrintMode && (
                          <button
                            type="button"
                            className="btn-submit"
                            style={{ marginBottom: 20 }}
                            onClick={() => push({ data: {} })}
                          >
                            + Add Custom Signature
                          </button>
                        )}

                        {values.additionalSignatures.map((sig, index) => (
                          <div key={index} style={{ marginBottom: 30, position: "relative" }}>
                            {!isPrintMode && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                style={{
                                  position: "absolute",
                                  right: 0,
                                  top: 0,
                                  background: "red",
                                  color: "#fff",
                                  border: "none",
                                  padding: "5px 10px",
                                  cursor: "pointer"
                                }}
                              >
                                Remove
                              </button>
                            )}

                            <ApprovalSignatureBlock
                              label={`Custom Signature ${index + 1}`}
                              value={sig.data || {}}
                              onChange={(val) =>
                                setFieldValue(`additionalSignatures.${index}.data`, val)
                              }
                            />
                          </div>
                        ))}
                      </>
                    )}
                  </FieldArray>
                </div>

              </div>

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Asset Tagging
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

export default FRM00503_AssetTagging;
