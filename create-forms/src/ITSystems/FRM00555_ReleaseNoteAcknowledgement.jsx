// FRM00555_ReleaseNoteAcknowledgement.jsx
// FRM-00555 / FRM-00556 – Release Note Acknowledgement Form

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

  releaseVersion: Yup.string().required('Required'),
  releaseDate: Yup.string().required('Required'),
  acknowledgementId: Yup.string().required('Required'),

  applicationSystem: Yup.string().required('Required'),
  changeSummary: Yup.string().required('Required'),
  deploymentEnvironment: Yup.string().required('Required'),
  preparedByName: Yup.string().required('Required'),

  businessImpact: Yup.string().required('Required'),
  downtimeRequired: Yup.string().required('Required'),
  userActionRequired: Yup.string().required('Required'),
  rollbackPlan: Yup.string().required('Required'),

  reviewedByName: Yup.string().required('Required'),
  acknowledgementStatus: Yup.string().required('Required'),

  preparedBySignature: Yup.object(),
  managerSignature: Yup.object(),
  itHeadSignature: Yup.object(),

  additionalSignatures: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {

  releaseVersion: '',
  releaseDate: '',
  acknowledgementId: '',

  applicationSystem: '',
  changeSummary: '',
  deploymentEnvironment: '',
  preparedByName: '',

  businessImpact: '',
  downtimeRequired: '',
  userActionRequired: '',
  rollbackPlan: '',

  reviewedByName: '',
  comments: '',
  acknowledgementStatus: '',
  remarks: '',

  preparedBySignature: {},
  managerSignature: {},
  itHeadSignature: {},

  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00555_ReleaseNoteAcknowledgement = () => {

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
    <ModernFormWrapper formId="FRM-00555" title="Release Note Acknowledgement – Request & Approval">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Release Note Acknowledgement submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00555"
              title="RELEASE NOTE ACKNOWLEDGEMENT – REQUEST & APPROVAL FORM"
              department="IT & Systems – Application & Data"
            >

              {/* 1. Release Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Release Information</h3>
                <div className="form-fields">
                  {field(values,'releaseVersion','Release Version')}
                  {field(values,'releaseDate','Release Date','date')}
                  {field(values,'acknowledgementId','Acknowledgement ID')}
                </div>
              </div>

              {/* 2. Release Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Release Details</h3>
                <div className="form-fields">
                  {field(values,'applicationSystem','Application / System')}
                  {textarea(values,'changeSummary','Change Summary')}

                  {selectField(values,'deploymentEnvironment','Deployment Environment',
                    ['Production','UAT','Development','Staging'])}

                  {field(values,'preparedByName','Prepared By')}
                </div>
              </div>

              {/* 3. Impact Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">3. Impact Assessment</h3>
                <div className="form-fields">
                  {textarea(values,'businessImpact','Business Impact')}

                  {selectField(values,'downtimeRequired','Downtime Required',
                    ['Yes','No'])}

                  {textarea(values,'userActionRequired','User Action Required')}

                  {selectField(values,'rollbackPlan','Rollback Plan Available',
                    ['Yes','No'])}
                </div>
              </div>

              {/* 4. Acknowledgement */}
              <div className="form-section">
                <h3 className="form-section-title">4. Acknowledgement</h3>
                <div className="form-fields">
                  {field(values,'reviewedByName','Reviewed By')}
                  {textarea(values,'comments','Comments')}

                  {selectField(values,'acknowledgementStatus','Acknowledgement Status',
                    ['Approved','Approved with Conditions','Rejected','Pending'])}

                  {textarea(values,'remarks','Remarks')}
                </div>
              </div>

              {/* 5. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>

                <div className="three-column-signatures">
                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Prepared By"
                      value={values.preparedBySignature || {}}
                      onChange={(val) => setFieldValue("preparedBySignature", val)}
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
                      label="IT Head Approval"
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
                    Submit Release Note Acknowledgement
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

export default FRM00555_ReleaseNoteAcknowledgement;
