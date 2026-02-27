// FRM00582_EndpointComplianceCheck.jsx
// FRM-00582 / FRM-00583 – Endpoint Compliance Check Form

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
  checkId: Yup.string().required('Required'),
  checkDate: Yup.string().required('Required'),

  deviceName: Yup.string().required('Required'),
  userOwner: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  operatingSystem: Yup.string().required('Required'),

  antivirusStatus: Yup.string().required('Required'),
  patchLevel: Yup.string().required('Required'),
  diskEncryption: Yup.string().required('Required'),
  firewallStatus: Yup.string().required('Required'),
  edrStatus: Yup.string().required('Required'),

  nonComplianceItems: Yup.string().required('Required'),
  riskLevel: Yup.string().required('Required'),
  businessImpact: Yup.string().required('Required'),

  correctiveActions: Yup.string().required('Required'),
  responsibleOwner: Yup.string().required('Required'),
  targetCompletionDate: Yup.string().required('Required'),
  status: Yup.string().required('Required'),

  policyReference: Yup.string().required('Required'),
  auditRequirement: Yup.string().required('Required'),
  nextReviewDate: Yup.string().required('Required'),

  checkedBySignature: Yup.object(),
  managerSignature: Yup.object(),
  infoSecSignature: Yup.object(),

  additionalSignatures: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {

  companyName: '',
  checkId: '',
  checkDate: '',

  deviceName: '',
  userOwner: '',
  department: '',
  location: '',
  operatingSystem: '',

  antivirusStatus: '',
  patchLevel: '',
  diskEncryption: '',
  firewallStatus: '',
  edrStatus: '',

  nonComplianceItems: '',
  riskLevel: '',
  businessImpact: '',

  correctiveActions: '',
  responsibleOwner: '',
  targetCompletionDate: '',
  status: '',

  policyReference: '',
  auditRequirement: '',
  nextReviewDate: '',
  remarks: '',

  checkedBySignature: {},
  managerSignature: {},
  infoSecSignature: {},

  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00582_EndpointComplianceCheck = () => {

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
    <ModernFormWrapper formId="FRM-00582" title="Endpoint Compliance Check – Request & Approval">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Endpoint Compliance Check submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00582"
              title="ENDPOINT COMPLIANCE CHECK – REQUEST & APPROVAL FORM"
              department="Information Security – Security Operations"
            >

              {/* 1. Basic Info */}
              <div className="form-section">
                <h3 className="form-section-title">1. Check Information</h3>
                <div className="form-fields">
                  {field(values,'companyName','Company Name')}
                  {field(values,'checkId','Check ID')}
                  {field(values,'checkDate','Check Date','date')}
                </div>
              </div>

              {/* 2. Endpoint Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Endpoint Details</h3>
                <div className="form-fields">
                  {field(values,'deviceName','Device Name / ID')}
                  {field(values,'userOwner','User / Owner')}
                  {field(values,'department','Department')}
                  {field(values,'location','Location')}
                  {field(values,'operatingSystem','Operating System')}
                </div>
              </div>

              {/* 3. Compliance Checks */}
              <div className="form-section">
                <h3 className="form-section-title">3. Compliance Checks</h3>
                <div className="form-fields">

                  {selectField(values,'antivirusStatus','Antivirus Status',
                    ['Up to Date','Outdated','Not Installed'])}

                  {selectField(values,'patchLevel','Patch Level',
                    ['Up to Date','Missing Critical Patches','Unknown'])}

                  {selectField(values,'diskEncryption','Disk Encryption',
                    ['Enabled','Disabled','Partially Enabled'])}

                  {selectField(values,'firewallStatus','Firewall Status',
                    ['Enabled','Disabled','Misconfigured'])}

                  {selectField(values,'edrStatus','EDR / Monitoring Agent',
                    ['Installed & Active','Installed but Inactive','Not Installed'])}
                </div>
              </div>

              {/* 4. Findings & Risk */}
              <div className="form-section">
                <h3 className="form-section-title">4. Findings & Risk</h3>
                <div className="form-fields">
                  {textarea(values,'nonComplianceItems','Non-Compliance Items')}

                  {selectField(values,'riskLevel','Risk Level',
                    ['Low','Medium','High','Critical'])}

                  {textarea(values,'businessImpact','Business Impact')}
                </div>
              </div>

              {/* 5. Remediation Plan */}
              <div className="form-section">
                <h3 className="form-section-title">5. Remediation Plan</h3>
                <div className="form-fields">
                  {textarea(values,'correctiveActions','Corrective Actions')}
                  {field(values,'responsibleOwner','Responsible Owner')}
                  {field(values,'targetCompletionDate','Target Completion Date','date')}

                  {selectField(values,'status','Status',
                    ['Open','In Progress','Resolved','Closed'])}
                </div>
              </div>

              {/* 6. Compliance & Governance */}
              <div className="form-section">
                <h3 className="form-section-title">6. Compliance & Governance</h3>
                <div className="form-fields">
                  {field(values,'policyReference','Policy Reference')}

                  {selectField(values,'auditRequirement','Audit Requirement',
                    ['Internal Audit','External Audit','Regulatory','None'])}

                  {field(values,'nextReviewDate','Next Review Date','date')}
                  {textarea(values,'remarks','Remarks')}
                </div>
              </div>

              {/* 7. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">7. Authorization</h3>

                <div className="three-column-signatures">
                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Checked By"
                      value={values.checkedBySignature || {}}
                      onChange={(val) => setFieldValue("checkedBySignature", val)}
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
                    Submit Endpoint Compliance Check
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

export default FRM00582_EndpointComplianceCheck;
