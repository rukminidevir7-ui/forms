// FRM00562_DataQualityIssue.jsx
// FRM-00562 / FRM-00563 – Data Quality Issue Form

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

  issueId: Yup.string().required('Required'),
  issueDate: Yup.string().required('Required'),

  sourceSystem: Yup.string().required('Required'),
  dataDomain: Yup.string().required('Required'),
  datasetTable: Yup.string().required('Required'),
  issueType: Yup.string().required('Required'),
  severity: Yup.string().required('Required'),

  issueDescription: Yup.string().required('Required'),
  businessImpact: Yup.string().required('Required'),
  evidence: Yup.string().required('Required'),

  rootCause: Yup.string().required('Required'),
  correctiveAction: Yup.string().required('Required'),
  preventiveAction: Yup.string().required('Required'),
  targetResolutionDate: Yup.string().required('Required'),

  assignedTo: Yup.string().required('Required'),
  status: Yup.string().required('Required'),

  reportedBySignature: Yup.object(),
  managerSignature: Yup.object(),
  dataOwnerSignature: Yup.object(),

  additionalSignatures: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {

  issueId: '',
  issueDate: '',

  sourceSystem: '',
  dataDomain: '',
  datasetTable: '',
  issueType: '',
  severity: '',

  issueDescription: '',
  businessImpact: '',
  evidence: '',

  rootCause: '',
  correctiveAction: '',
  preventiveAction: '',
  targetResolutionDate: '',

  assignedTo: '',
  status: '',
  closureDate: '',
  remarks: '',

  reportedBySignature: {},
  managerSignature: {},
  dataOwnerSignature: {},

  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00562_DataQualityIssue = () => {

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
    <ModernFormWrapper formId="FRM-00562" title="Data Quality Issue – Request & Approval">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Data Quality Issue submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00562"
              title="DATA QUALITY ISSUE – REQUEST & APPROVAL FORM"
              department="IT & Systems – Application & Data"
            >

              {/* 1. Issue Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Issue Information</h3>
                <div className="form-fields">
                  {field(values,'issueId','Issue ID')}
                  {field(values,'issueDate','Issue Date','date')}
                </div>
              </div>

              {/* 2. Issue Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Issue Details</h3>
                <div className="form-fields">
                  {field(values,'sourceSystem','Source System')}
                  {field(values,'dataDomain','Data Domain')}
                  {field(values,'datasetTable','Affected Dataset / Table')}

                  {selectField(values,'issueType','Issue Type',
                    ['Missing','Incorrect','Duplicate','Format Error','Integrity Issue'])}

                  {selectField(values,'severity','Severity',
                    ['Low','Medium','High','Critical'])}
                </div>
              </div>

              {/* 3. Description */}
              <div className="form-section">
                <h3 className="form-section-title">3. Description</h3>
                <div className="form-fields">
                  {textarea(values,'issueDescription','Issue Description')}
                  {textarea(values,'businessImpact','Business Impact')}
                  {textarea(values,'evidence','Sample Records / Evidence')}
                </div>
              </div>

              {/* 4. Resolution Plan */}
              <div className="form-section">
                <h3 className="form-section-title">4. Resolution Plan</h3>
                <div className="form-fields">
                  {textarea(values,'rootCause','Root Cause')}
                  {textarea(values,'correctiveAction','Corrective Action')}
                  {textarea(values,'preventiveAction','Preventive Action')}
                  {field(values,'targetResolutionDate','Target Resolution Date','date')}
                </div>
              </div>

              {/* 5. Tracking */}
              <div className="form-section">
                <h3 className="form-section-title">5. Tracking</h3>
                <div className="form-fields">
                  {field(values,'assignedTo','Assigned To')}

                  {selectField(values,'status','Status',
                    ['Open','In Progress','On Hold','Resolved','Closed'])}

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
                      value={values.reportedBySignature || {}}
                      onChange={(val) => setFieldValue("reportedBySignature", val)}
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
                      label="Data Owner Approval"
                      value={values.dataOwnerSignature || {}}
                      onChange={(val) => setFieldValue("dataOwnerSignature", val)}
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
                    Submit Data Quality Issue
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

export default FRM00562_DataQualityIssue;
