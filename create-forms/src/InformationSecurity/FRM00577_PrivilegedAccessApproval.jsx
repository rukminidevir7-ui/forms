// FRM00577_PrivilegedAccessApproval.jsx
// FRM-00577 – Privileged Access Approval Form

import React from 'react';
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
  requestId: Yup.string().required('Required'),
  requestDate: Yup.string().required('Required'),

  userName: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  designation: Yup.string().required('Required'),
  managerName: Yup.string().required('Required'),

  systemApplication: Yup.string().required('Required'),
  accessType: Yup.string().required('Required'),
  accessScope: Yup.string().required('Required'),
  environment: Yup.string().required('Required'),
  businessJustification: Yup.string().required('Required'),

  riskAssessment: Yup.string().required('Required'),
  compensatingControls: Yup.string().required('Required'),
  monitoringRequired: Yup.string().required('Required'),
  accessStartDate: Yup.string().required('Required'),
  accessEndDate: Yup.string().required('Required'),

  policyReference: Yup.string().required('Required'),
  sodCheck: Yup.string().required('Required'),
  approvalAuthority: Yup.string().required('Required'),
  status: Yup.string().required('Required'),

  requesterSignature: Yup.object(),
  managerSignature: Yup.object(),
  infoSecSignature: Yup.object(),

  additionalSignatures: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {

  companyName: '',
  requestId: '',
  requestDate: '',

  userName: '',
  employeeId: '',
  department: '',
  designation: '',
  managerName: '',

  systemApplication: '',
  accessType: '',
  accessScope: '',
  environment: '',
  businessJustification: '',

  riskAssessment: '',
  compensatingControls: '',
  monitoringRequired: '',
  accessStartDate: '',
  accessEndDate: '',

  policyReference: '',
  sodCheck: '',
  approvalAuthority: '',
  status: '',
  remarks: '',

  requesterSignature: {},
  managerSignature: {},
  infoSecSignature: {},

  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00577_PrivilegedAccessApproval = () => {

  const { isPrintMode } = usePrintMode();

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

  const selectField = (values, name, label, options) => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '_________'}</div>
      ) : (
        <>
          <Field as="select" name={name} className="form-input">
            <option value="">Select</option>
            {options.map((opt, idx) => (
              <option key={idx} value={opt}>{opt}</option>
            ))}
            <option value="Others">Others</option>
          </Field>
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  const textarea = (values, name, label) => (
    <div className="form-field full-width">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '_________'}</div>
      ) : (
        <>
          <Field as="textarea" name={name} className="form-textarea" rows="4" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-00577" title="Privileged Access Approval Form">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Privileged Access Approval submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00577"
              title="PRIVILEGED ACCESS APPROVAL FORM"
              department="Information Security – Security Operations"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Request Information</h3>
                <div className="form-fields">
                  {field(values,'companyName','Company Name')}
                  {field(values,'requestId','Request ID')}
                  {field(values,'requestDate','Request Date','date')}
                </div>
              </div>

              {/* 2. User Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. User Details</h3>
                <div className="form-fields">
                  {field(values,'userName','User Name')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'department','Department')}
                  {field(values,'designation','Designation')}
                  {field(values,'managerName','Manager Name')}
                </div>
              </div>

              {/* 3. Access Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Access Details</h3>
                <div className="form-fields">

                  {field(values,'systemApplication','System / Application')}

                  {selectField(values,'accessType','Access Type',
                    ['Admin','Root','DBA','Superuser','Privileged API Access'])}

                  {textarea(values,'accessScope','Access Scope')}

                  {selectField(values,'environment','Environment',
                    ['Production','UAT','Development','Staging'])}

                  {textarea(values,'businessJustification','Business Justification')}
                </div>
              </div>

              {/* 4. Risk & Controls */}
              <div className="form-section">
                <h3 className="form-section-title">4. Risk & Controls</h3>
                <div className="form-fields">
                  {textarea(values,'riskAssessment','Risk Assessment')}
                  {textarea(values,'compensatingControls','Compensating Controls')}

                  {selectField(values,'monitoringRequired','Monitoring Required',
                    ['Yes','No'])}

                  {field(values,'accessStartDate','Access Start Date','date')}
                  {field(values,'accessEndDate','Access End Date','date')}
                </div>
              </div>

              {/* 5. Compliance & Governance */}
              <div className="form-section">
                <h3 className="form-section-title">5. Compliance & Governance</h3>
                <div className="form-fields">
                  {field(values,'policyReference','Policy Reference')}

                  {selectField(values,'sodCheck','Segregation of Duties Check',
                    ['Completed','Not Required','Exception Approved'])}

                  {field(values,'approvalAuthority','Approval Authority')}

                  {selectField(values,'status','Status',
                    ['Pending','Approved','Rejected','Revoked','Expired'])}

                  {textarea(values,'remarks','Remarks')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>

                <div className="three-column-signatures">
                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Requester"
                      value={values.requesterSignature || {}}
                      onChange={(val) => setFieldValue("requesterSignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Manager Approval"
                      value={values.managerSignature || {}}
                      onChange={(val) => setFieldValue("managerSignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Information Security Approval"
                      value={values.infoSecSignature || {}}
                      onChange={(val) => setFieldValue("infoSecSignature", val)}
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
                    Submit Privileged Access Approval
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

export default FRM00577_PrivilegedAccessApproval;
