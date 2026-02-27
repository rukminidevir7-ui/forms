// FRM00550_DatabaseAccessRequest.jsx
// FRM-00550 – Database Access Request Form

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

  requestDate: Yup.string().required('Required'),
  requestNo: Yup.string().required('Required'),

  employeeName: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  designation: Yup.string().required('Required'),
  managerName: Yup.string().required('Required'),
  emailId: Yup.string().email('Invalid Email').required('Required'),

  databaseName: Yup.string().required('Required'),
  environment: Yup.string().required('Required'),
  accessType: Yup.string().required('Required'),
  schemaTables: Yup.string().required('Required'),
  justification: Yup.string().required('Required'),
  accessStartDate: Yup.string().required('Required'),

  dataClassification: Yup.string().required('Required'),
  approvalRequired: Yup.string().required('Required'),
  riskLevel: Yup.string().required('Required'),

  requestedBySignature: Yup.object(),
  managerSignature: Yup.object(),
  dbaSignature: Yup.object(),

  additionalSignatures: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {

  requestDate: '',
  requestNo: '',

  employeeName: '',
  employeeId: '',
  department: '',
  designation: '',
  managerName: '',
  emailId: '',

  databaseName: '',
  environment: '',
  accessType: '',
  schemaTables: '',
  justification: '',
  accessStartDate: '',
  accessEndDate: '',

  dataClassification: '',
  approvalRequired: '',
  riskLevel: '',
  remarks: '',

  requestedBySignature: {},
  managerSignature: {},
  dbaSignature: {},

  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00550_DatabaseAccessRequest = () => {

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
          <Field as="textarea" name={name} className="form-textarea" rows="3" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-00550" title="Database Access Request Form">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Database Access Request submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00550"
              title="DATABASE ACCESS REQUEST FORM"
              department="IT & Systems – Application & Data"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'requestNo','Request No')}
                </div>
              </div>

              {/* 2. User Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. User Details</h3>
                <div className="form-fields">
                  {field(values,'employeeName','Employee Name')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'department','Department')}
                  {field(values,'designation','Designation')}
                  {field(values,'managerName','Manager Name')}
                  {field(values,'emailId','Email ID','email')}
                </div>
              </div>

              {/* 3. Database Access Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Database Access Details</h3>
                <div className="form-fields">
                  {field(values,'databaseName','Database Name')}

                  {selectField(values,'environment','Environment',
                    ['Production','UAT','Development'])}

                  {selectField(values,'accessType','Access Type',
                    ['Read','Write','Admin'])}

                  {textarea(values,'schemaTables','Schema / Tables')}
                  {textarea(values,'justification','Business Justification')}
                  {field(values,'accessStartDate','Access Start Date','date')}
                  {field(values,'accessEndDate','Access End Date','date')}
                </div>
              </div>

              {/* 4. Security & Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">4. Security & Compliance</h3>
                <div className="form-fields">
                  {selectField(values,'dataClassification','Data Classification',
                    ['Public','Internal','Confidential','Restricted'])}

                  {selectField(values,'approvalRequired','Approval Required',
                    ['Yes','No'])}

                  {selectField(values,'riskLevel','Risk Level',
                    ['Low','Medium','High','Critical'])}

                  {textarea(values,'remarks','Remarks')}
                </div>
              </div>

              {/* 5. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>

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
                      label="Manager Approval"
                      value={values.managerSignature || {}}
                      onChange={(val) => setFieldValue("managerSignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="DBA / IT Approval"
                      value={values.dbaSignature || {}}
                      onChange={(val) => setFieldValue("dbaSignature", val)}
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
                    Submit Database Access Request
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

export default FRM00550_DatabaseAccessRequest;
