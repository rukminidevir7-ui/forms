// FRM00610_VendorDPAChecklist.jsx
// FRM-00610 – Vendor DPA Checklist

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
  companyName: Yup.string().required('Required'),
  vendorName: Yup.string().required('Required'),
  assessmentDate: Yup.string().required('Required'),
  assessmentId: Yup.string().required('Required'),
  businessOwner: Yup.string().required('Required'),
  reviewer: Yup.string().required('Required'),

  checklistItems: Yup.array().min(1, 'At least one checklist item required'),

  overallStatus: Yup.string().required('Required'),
  keyRisks: Yup.string().required('Required'),

  assessedSignature: Yup.object(),
  privacySignature: Yup.object(),
  approvalSignature: Yup.object(),

  additionalSignatures: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {
  companyName: '',
  vendorName: '',
  assessmentDate: '',
  assessmentId: '',
  businessOwner: '',
  reviewer: '',

  checklistItems: [
    {
      domain: '',
      item: '',
      compliance: '',
      evidence: '',
      remarks: '',
      dynamicFields: {}
    }
  ],

  overallStatus: '',
  keyRisks: '',
  remediation: '',
  targetDate: '',

  assessedSignature: {},
  privacySignature: {},
  approvalSignature: {},

  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00610_VendorDPAChecklist = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const columnName = prompt("Enter New Field Name");
    if (!columnName) return;

    const key = columnName.replace(/\s+/g, '');

    if (dynamicColumns.find(col => col.key === key)) {
      alert("Field already exists");
      return;
    }

    setDynamicColumns([...dynamicColumns, { key, label: columnName }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
  };

  return (
    <ModernFormWrapper formId="FRM-00610" title="Vendor DPA Checklist">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Vendor DPA Checklist submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00610"
              title="VENDOR DPA CHECKLIST"
              department="Data Protection & Privacy"
            >

              {/* 1. Assessment Details */}
              <div className="form-section">
                <h3 className="form-section-title">1. Assessment Details</h3>
                <div className="form-fields">
                  <Field name="companyName" className="form-input" placeholder="Company Name" />
                  <Field name="vendorName" className="form-input" placeholder="Vendor Name" />
                  <Field type="date" name="assessmentDate" className="form-input" />
                  <Field name="assessmentId" className="form-input" placeholder="Assessment ID" />
                  <Field name="businessOwner" className="form-input" placeholder="Business Owner" />
                  <Field name="reviewer" className="form-input" placeholder="Reviewer" />
                </div>
              </div>

              {/* 2. Control Checklist */}
              <div className="form-section">
                <h3 className="form-section-title">2. Control Checklist</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 15 }}>
                    <button
                      type="button"
                      className="btn-submit"
                      onClick={addColumn}
                    >
                      + Add Field
                    </button>
                  </div>
                )}

                <FieldArray name="checklistItems">
                  {({ push, remove }) => (
                    <>

                      {!isPrintMode && (
                        <div style={{ marginBottom: 20 }}>
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={() =>
                              push({
                                domain: '',
                                item: '',
                                compliance: '',
                                evidence: '',
                                remarks: '',
                                dynamicFields: {}
                              })
                            }
                          >
                            + Add Checklist Item
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Control Domain</th>
                            <th>Checklist Item</th>
                            <th>Compliance</th>
                            <th>Evidence</th>
                            <th>Remarks</th>

                            {dynamicColumns.map(col => (
                              <th key={col.key}>
                                {col.label}
                                {!isPrintMode && (
                                  <button
                                    type="button"
                                    style={{ marginLeft: 8 }}
                                    onClick={() => removeColumn(col.key)}
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
                          {values.checklistItems.map((row, index) => (
                            <tr key={index}>
                              <td><Field name={`checklistItems.${index}.domain`} className="form-input" /></td>
                              <td><Field name={`checklistItems.${index}.item`} className="form-input" /></td>
                              <td><Field name={`checklistItems.${index}.compliance`} className="form-input" /></td>
                              <td><Field name={`checklistItems.${index}.evidence`} className="form-input" /></td>
                              <td><Field name={`checklistItems.${index}.remarks`} className="form-input" /></td>

                              {dynamicColumns.map(col => (
                                <td key={col.key}>
                                  <Field
                                    name={`checklistItems.${index}.dynamicFields.${col.key}`}
                                    className="form-input"
                                  />
                                </td>
                              ))}

                              {!isPrintMode && (
                                <td>
                                  <button
                                    type="button"
                                    style={{ padding: "6px 12px" }}
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

              {/* 3. Summary */}
              <div className="form-section">
                <h3 className="form-section-title">3. Summary</h3>
                <div className="form-fields">
                  <Field as="select" name="overallStatus" className="form-input">
                    <option value="">Overall Status</option>
                    <option>Compliant</option>
                    <option>Partially Compliant</option>
                    <option>Non-Compliant</option>
                  </Field>
                  <Field as="textarea" name="keyRisks" className="form-textarea" rows="3" placeholder="Key Risks" />
                  <Field as="textarea" name="remediation" className="form-textarea" rows="3" placeholder="Remediation" />
                  <Field type="date" name="targetDate" className="form-input" />
                </div>
              </div>

              {/* 4. Sign-Off */}
              <div className="form-section">
                <h3 className="form-section-title">4. Sign-Off</h3>

                <div className="three-column-signatures">

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Assessed By"
                      value={values.assessedSignature || {}}
                      onChange={(val) => setFieldValue("assessedSignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Privacy Review"
                      value={values.privacySignature || {}}
                      onChange={(val) => setFieldValue("privacySignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Approval"
                      value={values.approvalSignature || {}}
                      onChange={(val) => setFieldValue("approvalSignature", val)}
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
                          <div key={index} style={{ marginBottom: 30 }}>
                            <ApprovalSignatureBlock
                              label={`Custom Signature ${index + 1}`}
                              value={sig.data || {}}
                              onChange={(val) =>
                                setFieldValue(`additionalSignatures.${index}.data`, val)
                              }
                            />
                            {!isPrintMode && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                              >
                                Remove
                              </button>
                            )}
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
                    Submit Checklist
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

export default FRM00610_VendorDPAChecklist;
