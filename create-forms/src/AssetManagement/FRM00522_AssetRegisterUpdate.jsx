// FRM00522_AssetRegisterUpdate.jsx
// FRM-00522 – Asset Register Update Log

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

  location: Yup.string().required('Required'),
  logPeriod: Yup.string().required('Required'),
  maintainedByName: Yup.string().required('Required'),

  logs: Yup.array().of(
    Yup.object().shape({
      date: Yup.string().required('Required'),
      assetTagNo: Yup.string().required('Required'),
      assetDescription: Yup.string().required('Required'),
      updateType: Yup.string().required('Required'),
      referenceNo: Yup.string(),
      oldValue: Yup.string().required('Required'),
      newValue: Yup.string().required('Required'),
      updatedBy: Yup.string().required('Required'),
      remarks: Yup.string(),
      dynamicFields: Yup.object()
    })
  ).min(1, 'At least one log entry required'),

  maintainedSignature: Yup.object(),
  reviewedSignature: Yup.object(),

  additionalSignatures: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {

  location: '',
  logPeriod: '',
  maintainedByName: '',

  logs: [
    {
      date: '',
      assetTagNo: '',
      assetDescription: '',
      updateType: '',
      referenceNo: '',
      oldValue: '',
      newValue: '',
      updatedBy: '',
      remarks: '',
      dynamicFields: {}
    }
  ],

  maintainedSignature: {},
  reviewedSignature: {},

  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00522_AssetRegisterUpdate = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const columnName = prompt('Enter New Log Field');
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
    <ModernFormWrapper formId="FRM-00522" title="Asset Register Update Log">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Asset Register Update submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00522"
              title="ASSET REGISTER UPDATE LOG"
              department="Asset Management – Asset Lifecycle"
            >

              {/* 1. Log Info */}
              <div className="form-section">
                <h3 className="form-section-title">1. Log Information</h3>
                <div className="form-fields">
                  {field(values,'location','Location')}
                  {field(values,'logPeriod','Log Period')}
                  {field(values,'maintainedByName','Maintained By')}
                </div>
              </div>

              {/* 2. Log Entries */}
              <div className="form-section">
                <h3 className="form-section-title">2. Register Update Entries</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 15 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Log Field
                    </button>
                  </div>
                )}

                <FieldArray name="logs">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <div style={{ marginBottom: 20 }}>
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={() =>
                              push({
                                date: '',
                                assetTagNo: '',
                                assetDescription: '',
                                updateType: '',
                                referenceNo: '',
                                oldValue: '',
                                newValue: '',
                                updatedBy: '',
                                remarks: '',
                                dynamicFields: {}
                              })
                            }
                          >
                            + Add Entry
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Asset ID / Tag No</th>
                            <th>Asset Description</th>
                            <th>Update Type</th>
                            <th>Reference No</th>
                            <th>Old Value</th>
                            <th>New Value</th>
                            <th>Updated By</th>
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
                          {values.logs.map((row, index) => (
                            <tr key={index}>
                              <td><Field name={`logs.${index}.date`} type="date" className="form-input" /></td>
                              <td><Field name={`logs.${index}.assetTagNo`} className="form-input" /></td>
                              <td><Field name={`logs.${index}.assetDescription`} className="form-input" /></td>
                              <td><Field name={`logs.${index}.updateType`} className="form-input" /></td>
                              <td><Field name={`logs.${index}.referenceNo`} className="form-input" /></td>
                              <td><Field name={`logs.${index}.oldValue`} className="form-input" /></td>
                              <td><Field name={`logs.${index}.newValue`} className="form-input" /></td>
                              <td><Field name={`logs.${index}.updatedBy`} className="form-input" /></td>
                              <td><Field name={`logs.${index}.remarks`} className="form-input" /></td>

                              {dynamicColumns.map(col => (
                                <td key={col.key}>
                                  <Field name={`logs.${index}.dynamicFields.${col.key}`} className="form-input" />
                                </td>
                              ))}

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

              {/* 3. Signatures */}
              <div className="form-section">
                <h3 className="form-section-title">3. Authorization</h3>

                <div className="three-column-signatures">

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Maintained By"
                      value={values.maintainedSignature || {}}
                      onChange={(val) => setFieldValue("maintainedSignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Reviewed By"
                      value={values.reviewedSignature || {}}
                      onChange={(val) => setFieldValue("reviewedSignature", val)}
                    />
                  </div>

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
                    Submit Register Update
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

export default FRM00522_AssetRegisterUpdate;
