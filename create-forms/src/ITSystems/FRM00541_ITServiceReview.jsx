// FRM00541_ITServiceReview.jsx
// FRM-00541 / FRM-00542 – IT Service Review Form

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

  reviewPeriod: Yup.string().required('Required'),
  reviewDate: Yup.string().required('Required'),
  reviewId: Yup.string().required('Required'),

  serviceName: Yup.string().required('Required'),
  serviceOwner: Yup.string().required('Required'),
  businessUnit: Yup.string().required('Required'),
  location: Yup.string().required('Required'),

  serviceAvailability: Yup.string().required('Required'),
  incidentSummary: Yup.string().required('Required'),
  slaCompliance: Yup.string().required('Required'),
  userSatisfaction: Yup.string().required('Required'),

  keyRisks: Yup.string().required('Required'),
  improvementOpportunities: Yup.string().required('Required'),
  actionPlan: Yup.string().required('Required'),
  targetCompletionDate: Yup.string().required('Required'),

  reviewedBySignature: Yup.object(),
  managerSignature: Yup.object(),
  itHeadSignature: Yup.object(),

  additionalSignatures: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {

  reviewPeriod: '',
  reviewDate: '',
  reviewId: '',

  serviceName: '',
  serviceOwner: '',
  businessUnit: '',
  location: '',

  serviceAvailability: '',
  incidentSummary: '',
  slaCompliance: '',
  userSatisfaction: '',

  keyRisks: '',
  improvementOpportunities: '',
  actionPlan: '',
  targetCompletionDate: '',
  remarks: '',

  reviewedBySignature: {},
  managerSignature: {},
  itHeadSignature: {},

  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00541_ITServiceReview = () => {

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

  const textarea = (values, name, label) => (
    <div className="form-field full-width">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '_________'}</div>
      ) : (
        <>
          <Field as="textarea" name={name} className="form-textarea" rows="3" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-00541" title="IT Service Review – Request & Approval">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('IT Service Review submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00541"
              title="IT SERVICE REVIEW – REQUEST & APPROVAL FORM"
              department="IT & Systems – IT Service Management"
            >

              {/* 1. Review Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Review Information</h3>
                <div className="form-fields">
                  {field(values,'reviewPeriod','Review Period')}
                  {field(values,'reviewDate','Review Date','date')}
                  {field(values,'reviewId','Review ID')}
                </div>
              </div>

              {/* 2. Service Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Service Details</h3>
                <div className="form-fields">
                  {field(values,'serviceName','Service Name')}
                  {field(values,'serviceOwner','Service Owner')}
                  {field(values,'businessUnit','Business Unit')}
                  {field(values,'location','Location')}
                </div>
              </div>

              {/* 3. Performance Review */}
              <div className="form-section">
                <h3 className="form-section-title">3. Performance Review</h3>
                <div className="form-fields">
                  {field(values,'serviceAvailability','Service Availability')}
                  {textarea(values,'incidentSummary','Incident Summary')}
                  {field(values,'slaCompliance','SLA Compliance')}
                  {field(values,'userSatisfaction','User Satisfaction')}
                </div>
              </div>

              {/* 4. Risks & Improvements */}
              <div className="form-section">
                <h3 className="form-section-title">4. Risks & Improvements</h3>
                <div className="form-fields">
                  {textarea(values,'keyRisks','Key Risks Identified')}
                  {textarea(values,'improvementOpportunities','Improvement Opportunities')}
                  {textarea(values,'actionPlan','Action Plan')}
                  {field(values,'targetCompletionDate','Target Completion Date','date')}
                  {textarea(values,'remarks','Remarks')}
                </div>
              </div>

              {/* 5. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>

                <div className="three-column-signatures">
                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Reviewed By"
                      value={values.reviewedBySignature || {}}
                      onChange={(val) => setFieldValue("reviewedBySignature", val)}
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
                      label="IT Head"
                      value={values.itHeadSignature || {}}
                      onChange={(val) => setFieldValue("itHeadSignature", val)}
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
                    Submit IT Service Review
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

export default FRM00541_ITServiceReview;
