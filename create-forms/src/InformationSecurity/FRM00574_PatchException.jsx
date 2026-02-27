// FRM00574_PatchException.jsx
// FRM-00574 / FRM-00575 – Patch Exception Form

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
  exceptionId: Yup.string().required('Required'),
  requestDate: Yup.string().required('Required'),

  assetName: Yup.string().required('Required'),
  assetOwner: Yup.string().required('Required'),
  environment: Yup.string().required('Required'),
  location: Yup.string().required('Required'),

  patchName: Yup.string().required('Required'),
  vendorSource: Yup.string().required('Required'),
  releaseDate: Yup.string().required('Required'),
  affectedVersion: Yup.string().required('Required'),
  reasonForException: Yup.string().required('Required'),

  riskDescription: Yup.string().required('Required'),
  businessImpact: Yup.string().required('Required'),
  compensatingControls: Yup.string().required('Required'),
  riskRating: Yup.string().required('Required'),

  exceptionStartDate: Yup.string().required('Required'),
  exceptionEndDate: Yup.string().required('Required'),
  reviewFrequency: Yup.string().required('Required'),
  nextReviewDate: Yup.string().required('Required'),

  policyReference: Yup.string().required('Required'),
  riskAcceptanceRequired: Yup.string().required('Required'),
  approvalAuthority: Yup.string().required('Required'),
  status: Yup.string().required('Required'),

  requestedBySignature: Yup.object(),
  securityManagerSignature: Yup.object(),
  riskOwnerSignature: Yup.object(),

  additionalSignatures: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {

  companyName: '',
  exceptionId: '',
  requestDate: '',

  assetName: '',
  assetOwner: '',
  environment: '',
  location: '',

  patchName: '',
  vendorSource: '',
  releaseDate: '',
  affectedVersion: '',
  reasonForException: '',

  riskDescription: '',
  businessImpact: '',
  compensatingControls: '',
  riskRating: '',

  exceptionStartDate: '',
  exceptionEndDate: '',
  reviewFrequency: '',
  nextReviewDate: '',

  policyReference: '',
  riskAcceptanceRequired: '',
  approvalAuthority: '',
  status: '',
  remarks: '',

  requestedBySignature: {},
  securityManagerSignature: {},
  riskOwnerSignature: {},

  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00574_PatchException = () => {

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
    <ModernFormWrapper formId="FRM-00574" title="Patch Exception – Request & Approval">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Patch Exception submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00574"
              title="PATCH EXCEPTION – REQUEST & APPROVAL FORM"
              department="Information Security – Security Operations"
            >

              {/* 1. Basic Info */}
              <div className="form-section">
                <h3 className="form-section-title">1. Exception Information</h3>
                <div className="form-fields">
                  {field(values,'companyName','Company Name')}
                  {field(values,'exceptionId','Exception ID')}
                  {field(values,'requestDate','Request Date','date')}
                </div>
              </div>

              {/* 2. Asset Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Asset Details</h3>
                <div className="form-fields">
                  {field(values,'assetName','Asset / System Name')}
                  {field(values,'assetOwner','Asset Owner')}

                  {selectField(values,'environment','Environment',
                    ['Production','UAT','Development','Staging'])}

                  {field(values,'location','Location')}
                </div>
              </div>

              {/* 3. Patch Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Patch Details</h3>
                <div className="form-fields">
                  {field(values,'patchName','Patch / Update Name')}
                  {field(values,'vendorSource','Vendor / Source')}
                  {field(values,'releaseDate','Release Date','date')}
                  {field(values,'affectedVersion','Affected Version')}
                  {textarea(values,'reasonForException','Reason for Exception')}
                </div>
              </div>

              {/* 4. Risk Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">4. Risk Assessment</h3>
                <div className="form-fields">
                  {textarea(values,'riskDescription','Risk Description')}
                  {textarea(values,'businessImpact','Business Impact')}
                  {textarea(values,'compensatingControls','Compensating Controls')}

                  {selectField(values,'riskRating','Risk Rating',
                    ['Critical','High','Medium','Low'])}
                </div>
              </div>

              {/* 5. Exception Timeline */}
              <div className="form-section">
                <h3 className="form-section-title">5. Exception Timeline</h3>
                <div className="form-fields">
                  {field(values,'exceptionStartDate','Exception Start Date','date')}
                  {field(values,'exceptionEndDate','Exception End Date','date')}

                  {selectField(values,'reviewFrequency','Review Frequency',
                    ['Monthly','Quarterly','Bi-Annual','Annual'])}

                  {field(values,'nextReviewDate','Next Review Date','date')}
                </div>
              </div>

              {/* 6. Compliance & Governance */}
              <div className="form-section">
                <h3 className="form-section-title">6. Compliance & Governance</h3>
                <div className="form-fields">
                  {field(values,'policyReference','Policy Reference')}

                  {selectField(values,'riskAcceptanceRequired','Risk Acceptance Required',
                    ['Yes','No'])}

                  {field(values,'approvalAuthority','Approval Authority')}

                  {selectField(values,'status','Status',
                    ['Pending','Approved','Rejected','Expired','Closed'])}

                  {textarea(values,'remarks','Remarks')}
                </div>
              </div>

              {/* 7. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">7. Authorization</h3>

                <div className="three-column-signatures">
                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Requested By"
                      value={values.requestedBySignature || {}}
                      onChange={(val) => setFieldValue("requestedBySignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Security Manager Approval"
                      value={values.securityManagerSignature || {}}
                      onChange={(val) => setFieldValue("securityManagerSignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Risk Owner Approval"
                      value={values.riskOwnerSignature || {}}
                      onChange={(val) => setFieldValue("riskOwnerSignature", val)}
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
                    Submit Patch Exception
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

export default FRM00574_PatchException;
