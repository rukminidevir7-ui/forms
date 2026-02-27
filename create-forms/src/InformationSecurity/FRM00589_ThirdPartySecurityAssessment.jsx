// FRM00589_ThirdPartySecurityAssessment.jsx
// FRM-00589 – Third-Party Security Assessment – Checklist

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
  assessmentType: Yup.string().required('Required'),

  checklist: Yup.array().of(
    Yup.object().shape({
      controlDomain: Yup.string().required('Required'),
      assessmentItem: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      complianceStatus: Yup.string().required('Required'),
      riskRating: Yup.string().required('Required'),
      evidenceReference: Yup.string(),
      remarks: Yup.string(),
      dynamicFields: Yup.object()
    })
  ).min(1, 'At least one assessment item required'),

  overallRiskRating: Yup.string().required('Required'),
  keyFindings: Yup.string().required('Required'),
  remediationRequired: Yup.string().required('Required'),
  targetCompletionDate: Yup.string().required('Required'),

  assessedBySignature: Yup.object(),
  infoSecSignature: Yup.object(),
  businessOwnerSignature: Yup.object(),

  additionalSignatures: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array()
});

const FRM00589_ThirdPartySecurityAssessment = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const columnName = prompt('Enter New Field Name');
    if (!columnName) return;
    const key = columnName.replace(/\s+/g, '');
    if (dynamicColumns.find(col => col.key === key)) return;
    setDynamicColumns([...dynamicColumns, { key, label: columnName }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
  };

  const initialValues = {
    companyName: '',
    vendorName: '',
    assessmentDate: '',
    assessmentType: '',
    checklist: [
      {
        controlDomain: '',
        assessmentItem: '',
        description: '',
        complianceStatus: '',
        riskRating: '',
        evidenceReference: '',
        remarks: '',
        dynamicFields: {}
      }
    ],
    overallRiskRating: '',
    keyFindings: '',
    remediationRequired: '',
    targetCompletionDate: '',
    assessedBySignature: {},
    infoSecSignature: {},
    businessOwnerSignature: {},
    additionalSignatures: [],
    customFields: [],
    attachments: []
  };

  return (
    <ModernFormWrapper formId="FRM-00589" title="Third-Party Security Assessment – Checklist">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Third-Party Security Assessment submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00589"
              title="THIRD-PARTY SECURITY ASSESSMENT – CHECKLIST"
              department="Information Security – Security Operations"
            >

              {/* Header */}
              <div className="form-section">
                <div className="form-fields">
                  <div className="form-field">
                    <label className="form-label required">Company Name</label>
                    <Field name="companyName" className="form-input" />
                  </div>

                  <div className="form-field">
                    <label className="form-label required">Vendor / Third Party Name</label>
                    <Field name="vendorName" className="form-input" />
                  </div>

                  <div className="form-field">
                    <label className="form-label required">Assessment Date</label>
                    <Field name="assessmentDate" type="date" className="form-input" />
                  </div>

                  <div className="form-field">
                    <label className="form-label required">Assessment Type</label>
                    <Field as="select" name="assessmentType" className="form-input">
                      <option value="">Select</option>
                      <option value="Initial">Initial</option>
                      <option value="Periodic">Periodic</option>
                      <option value="Renewal">Renewal</option>
                      <option value="Others">Others</option>
                    </Field>
                  </div>
                </div>
              </div>

              {/* Dynamic Column Controls */}
              {!isPrintMode && (
                <div style={{ marginBottom: 20 }}>
                  <button type="button" className="btn-submit" onClick={addColumn}>
                    + Add Field
                  </button>
                </div>
              )}

              {/* Checklist Table */}
              <div className="form-section">
                <FieldArray name="checklist">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <div style={{ marginBottom: 20 }}>
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={() =>
                              push({
                                controlDomain: '',
                                assessmentItem: '',
                                description: '',
                                complianceStatus: '',
                                riskRating: '',
                                evidenceReference: '',
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
                            <th>Control Domain</th>
                            <th>Assessment Item</th>
                            <th>Description</th>
                            <th>Compliance</th>
                            <th>Risk Rating</th>
                            <th>Evidence</th>
                            <th>Remarks</th>

                            {dynamicColumns.map(col => (
                              <th key={col.key}>
                                {col.label}
                                {!isPrintMode && (
                                  <button
                                    type="button"
                                    onClick={() => removeColumn(col.key)}
                                    style={{ marginLeft: 5 }}
                                  >x</button>
                                )}
                              </th>
                            ))}

                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {values.checklist.map((row, index) => (
                            <tr key={index}>
                              <td><Field name={`checklist.${index}.controlDomain`} className="form-input" /></td>
                              <td><Field name={`checklist.${index}.assessmentItem`} className="form-input" /></td>
                              <td><Field name={`checklist.${index}.description`} className="form-input" /></td>
                              <td>
                                <Field as="select" name={`checklist.${index}.complianceStatus`} className="form-input">
                                  <option value="">Select</option>
                                  <option value="Yes">Yes</option>
                                  <option value="No">No</option>
                                  <option value="Partial">Partial</option>
                                  <option value="Others">Others</option>
                                </Field>
                              </td>
                              <td>
                                <Field as="select" name={`checklist.${index}.riskRating`} className="form-input">
                                  <option value="">Select</option>
                                  <option value="Low">Low</option>
                                  <option value="Medium">Medium</option>
                                  <option value="High">High</option>
                                  <option value="Critical">Critical</option>
                                </Field>
                              </td>
                              <td><Field name={`checklist.${index}.evidenceReference`} className="form-input" /></td>
                              <td><Field name={`checklist.${index}.remarks`} className="form-input" /></td>

                              {dynamicColumns.map(col => (
                                <td key={col.key}>
                                  <Field name={`checklist.${index}.dynamicFields.${col.key}`} className="form-input" />
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

              {/* Summary Section */}
              <div className="form-section">
                <div className="form-fields">
                  <div className="form-field">
                    <label className="form-label required">Overall Risk Rating</label>
                    <Field name="overallRiskRating" className="form-input" />
                  </div>
                  <div className="form-field">
                    <label className="form-label required">Key Findings</label>
                    <Field name="keyFindings" className="form-input" />
                  </div>
                  <div className="form-field">
                    <label className="form-label required">Remediation Required</label>
                    <Field name="remediationRequired" className="form-input" />
                  </div>
                  <div className="form-field">
                    <label className="form-label required">Target Completion Date</label>
                    <Field name="targetCompletionDate" type="date" className="form-input" />
                  </div>
                </div>
              </div>

              {/* Sign-Off */}
              <div className="form-section">
                <div className="three-column-signatures">
                  <ApprovalSignatureBlock
                    label="Assessed By"
                    value={values.assessedBySignature || {}}
                    onChange={(val) => setFieldValue("assessedBySignature", val)}
                  />
                  <ApprovalSignatureBlock
                    label="Information Security Review"
                    value={values.infoSecSignature || {}}
                    onChange={(val) => setFieldValue("infoSecSignature", val)}
                  />
                  <ApprovalSignatureBlock
                    label="Business Owner Approval"
                    value={values.businessOwnerSignature || {}}
                    onChange={(val) => setFieldValue("businessOwnerSignature", val)}
                  />
                </div>
              </div>

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Assessment
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

export default FRM00589_ThirdPartySecurityAssessment;
