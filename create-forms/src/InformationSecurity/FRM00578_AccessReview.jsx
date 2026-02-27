// FRM00578_AccessReview.jsx
// FRM-00578 / FRM-00579 – Access Review Form

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
  reviewId: Yup.string().required('Required'),
  reviewPeriod: Yup.string().required('Required'),

  systemApplication: Yup.string().required('Required'),
  businessUnit: Yup.string().required('Required'),
  environment: Yup.string().required('Required'),
  reviewType: Yup.string().required('Required'),

  totalUsersReviewed: Yup.number().required('Required'),
  privilegedAccounts: Yup.number().required('Required'),
  inactiveAccounts: Yup.number().required('Required'),
  sodConflicts: Yup.number().required('Required'),

  keyObservations: Yup.string().required('Required'),
  accessChangesRequired: Yup.string().required('Required'),
  accountsToBeRevoked: Yup.string().required('Required'),
  riskLevel: Yup.string().required('Required'),

  policyReference: Yup.string().required('Required'),
  auditRequirement: Yup.string().required('Required'),
  nextReviewDate: Yup.string().required('Required'),
  status: Yup.string().required('Required'),

  reviewedBySignature: Yup.object(),
  managerSignature: Yup.object(),
  infoSecSignature: Yup.object(),

  additionalSignatures: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {

  companyName: '',
  reviewId: '',
  reviewPeriod: '',

  systemApplication: '',
  businessUnit: '',
  environment: '',
  reviewType: '',

  totalUsersReviewed: '',
  privilegedAccounts: '',
  inactiveAccounts: '',
  sodConflicts: '',

  keyObservations: '',
  accessChangesRequired: '',
  accountsToBeRevoked: '',
  riskLevel: '',

  policyReference: '',
  auditRequirement: '',
  nextReviewDate: '',
  status: '',
  remarks: '',

  reviewedBySignature: {},
  managerSignature: {},
  infoSecSignature: {},

  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00578_AccessReview = () => {

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
    <ModernFormWrapper formId="FRM-00578" title="Access Review – Request & Approval">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Access Review submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00578"
              title=""
              department=""
            >

              {/* ===== ENTERPRISE HEADING BLOCK ===== */}
              <div style={{
                textAlign: "center",
                marginBottom: "30px",
                paddingBottom: "15px",
                borderBottom: "2px solid #1e3a8a"
              }}>
                <h2 style={{
                  margin: 0,
                  fontWeight: 700,
                  letterSpacing: "1px",
                  color: "#1e3a8a"
                }}>
                  ACCESS REVIEW – REQUEST & APPROVAL FORM
                </h2>

                <div style={{
                  marginTop: 8,
                  fontSize: "14px",
                  color: "#555"
                }}>
                  Information Security – Security Operations | FRM-00578
                </div>
              </div>

              {/* 1. Review Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Review Information</h3>
                <div className="form-fields">
                  {field(values,'companyName','Company Name')}
                  {field(values,'reviewId','Review ID')}
                  {field(values,'reviewPeriod','Review Period')}
                </div>
              </div>

              {/* 2. Scope Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Scope Details</h3>
                <div className="form-fields">
                  {field(values,'systemApplication','System / Application')}
                  {field(values,'businessUnit','Business Unit')}
                  {selectField(values,'environment','Environment',
                    ['Production','UAT','Development','Staging'])}
                  {selectField(values,'reviewType','Review Type',
                    ['Periodic','Ad-hoc'])}
                </div>
              </div>

              {/* 3. User Access Summary */}
              <div className="form-section">
                <h3 className="form-section-title">3. User Access Summary</h3>
                <div className="form-fields">
                  {field(values,'totalUsersReviewed','Total Users Reviewed','number')}
                  {field(values,'privilegedAccounts','Privileged Accounts','number')}
                  {field(values,'inactiveAccounts','Inactive Accounts Identified','number')}
                  {field(values,'sodConflicts','SoD Conflicts Identified','number')}
                </div>
              </div>

              {/* 4. Findings & Actions */}
              <div className="form-section">
                <h3 className="form-section-title">4. Findings & Actions</h3>
                <div className="form-fields">
                  {textarea(values,'keyObservations','Key Observations')}
                  {textarea(values,'accessChangesRequired','Access Changes Required')}
                  {textarea(values,'accountsToBeRevoked','Accounts to be Revoked')}
                  {selectField(values,'riskLevel','Risk Level',
                    ['Low','Medium','High','Critical'])}
                </div>
              </div>

              {/* 5. Compliance & Governance */}
              <div className="form-section">
                <h3 className="form-section-title">5. Compliance & Governance</h3>
                <div className="form-fields">
                  {field(values,'policyReference','Policy Reference')}
                  {selectField(values,'auditRequirement','Audit Requirement',
                    ['Internal Audit','External Audit','Regulatory','None'])}
                  {field(values,'nextReviewDate','Next Review Date','date')}
                  {selectField(values,'status','Status',
                    ['Pending','Completed','Action Required','Closed'])}
                  {textarea(values,'remarks','Remarks')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>

                <div className="three-column-signatures">
                  <ApprovalSignatureBlock
                    label="Reviewed By"
                    value={values.reviewedBySignature || {}}
                    onChange={(val) => setFieldValue("reviewedBySignature", val)}
                  />
                  <ApprovalSignatureBlock
                    label="Manager Approval"
                    value={values.managerSignature || {}}
                    onChange={(val) => setFieldValue("managerSignature", val)}
                  />
                  <ApprovalSignatureBlock
                    label="Information Security Approval"
                    value={values.infoSecSignature || {}}
                    onChange={(val) => setFieldValue("infoSecSignature", val)}
                  />
                </div>

                <FieldArray name="additionalSignatures">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          style={{ marginTop: 20 }}
                          onClick={() => push({ data: {} })}
                        >
                          + Add Custom Signature
                        </button>
                      )}

                      {values.additionalSignatures.map((sig, index) => (
                        <div key={index} style={{ marginTop: 20 }}>
                          <ApprovalSignatureBlock
                            label={`Custom Signature ${index + 1}`}
                            value={sig.data || {}}
                            onChange={(val) =>
                              setFieldValue(`additionalSignatures.${index}.data`, val)
                            }
                          />
                          {!isPrintMode && (
                            <button type="button" onClick={() => remove(index)}>
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </FieldArray>

              </div>

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Access Review
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

export default FRM00578_AccessReview;
