// FRM00532_ITProblemRecord.jsx
// FRM-00532 – IT Problem – Request & Approval Form

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

  problemId: Yup.string().required('Required'),
  dateIdentified: Yup.string().required('Required'),
  reportedBy: Yup.string().required('Required'),

  systemName: Yup.string().required('Required'),
  businessUnit: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  priority: Yup.string().required('Required'),

  summary: Yup.string().required('Required'),
  detailedDescription: Yup.string().required('Required'),
  knownErrors: Yup.string().required('Required'),

  rootCause: Yup.string().required('Required'),
  correctiveAction: Yup.string().required('Required'),
  preventiveAction: Yup.string().required('Required'),
  targetClosureDate: Yup.string().required('Required'),

  assignedTo: Yup.string().required('Required'),
  status: Yup.string().required('Required'),

  reportedSignature: Yup.object(),
  managerSignature: Yup.object(),
  itManagerSignature: Yup.object(),

  additionalSignatures: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {

  problemId: '',
  dateIdentified: '',
  reportedBy: '',

  systemName: '',
  businessUnit: '',
  location: '',
  priority: '',

  summary: '',
  detailedDescription: '',
  knownErrors: '',

  rootCause: '',
  correctiveAction: '',
  preventiveAction: '',
  targetClosureDate: '',

  assignedTo: '',
  status: '',
  closureDate: '',
  remarks: '',

  reportedSignature: {},
  managerSignature: {},
  itManagerSignature: {},

  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00532_ITProblemRecord = () => {

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
    <ModernFormWrapper formId="FRM-00532" title="IT Problem – Request & Approval Form">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('IT Problem Record submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00532"
              title="IT PROBLEM – REQUEST & APPROVAL FORM"
              department="IT & Systems – IT Service Management"
            >

              {/* 1. Problem Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Problem Information</h3>
                <div className="form-fields">
                  {field(values,'problemId','Problem ID')}
                  {field(values,'dateIdentified','Date Identified','date')}
                  {field(values,'reportedBy','Reported By')}
                </div>
              </div>

              {/* 2. Affected Area Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Affected Area Details</h3>
                <div className="form-fields">
                  {field(values,'systemName','System / Application')}
                  {field(values,'businessUnit','Business Unit')}
                  {field(values,'location','Location')}
                  {field(values,'priority','Priority')}
                </div>
              </div>

              {/* 3. Problem Description */}
              <div className="form-section">
                <h3 className="form-section-title">3. Problem Description</h3>
                <div className="form-fields">
                  {textarea(values,'summary','Summary')}
                  {textarea(values,'detailedDescription','Detailed Description')}
                  {textarea(values,'knownErrors','Known Errors / Symptoms')}
                </div>
              </div>

              {/* 4. Analysis & Actions */}
              <div className="form-section">
                <h3 className="form-section-title">4. Analysis & Actions</h3>
                <div className="form-fields">
                  {textarea(values,'rootCause','Root Cause')}
                  {textarea(values,'correctiveAction','Corrective Action')}
                  {textarea(values,'preventiveAction','Preventive Action')}
                  {field(values,'targetClosureDate','Target Closure Date','date')}
                </div>
              </div>

              {/* 5. Tracking */}
              <div className="form-section">
                <h3 className="form-section-title">5. Tracking</h3>
                <div className="form-fields">
                  {field(values,'assignedTo','Assigned To')}
                  {field(values,'status','Status')}
                  {field(values,'closureDate','Closure Date','date')}
                  {textarea(values,'remarks','Remarks')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>

                <div className="three-column-signatures">

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Reported By"
                      value={values.reportedSignature || {}}
                      onChange={(val) => setFieldValue("reportedSignature", val)}
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
                      label="IT Manager"
                      value={values.itManagerSignature || {}}
                      onChange={(val) => setFieldValue("itManagerSignature", val)}
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
                    Submit IT Problem Record
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

export default FRM00532_ITProblemRecord;
