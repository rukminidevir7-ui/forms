// FRM00531_ITChangeRequest.jsx
// FRM-00531 – IT Change Request Form

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
  changeRequestNo: Yup.string().required('Required'),

  employeeName: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  designation: Yup.string().required('Required'),
  emailId: Yup.string().email('Invalid Email').required('Required'),
  contactNo: Yup.string().required('Required'),

  changeCategory: Yup.string().required('Required'),
  systemName: Yup.string().required('Required'),
  changeDescription: Yup.string().required('Required'),
  justification: Yup.string().required('Required'),
  priority: Yup.string().required('Required'),
  proposedDate: Yup.string().required('Required'),

  businessImpact: Yup.string().required('Required'),
  riskLevel: Yup.string().required('Required'),
  downtimeRequired: Yup.string().required('Required'),
  backoutPlan: Yup.string().required('Required'),

  reviewedBy: Yup.string().required('Required'),
  approvalStatus: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),

  requestedBySignature: Yup.object(),
  managerSignature: Yup.object(),
  changeManagerSignature: Yup.object(),

  additionalSignatures: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {

  requestDate: '',
  changeRequestNo: '',

  employeeName: '',
  employeeId: '',
  department: '',
  designation: '',
  emailId: '',
  contactNo: '',

  changeCategory: '',
  systemName: '',
  changeDescription: '',
  justification: '',
  priority: '',
  proposedDate: '',

  businessImpact: '',
  riskLevel: '',
  downtimeRequired: '',
  backoutPlan: '',

  reviewedBy: '',
  approvalStatus: '',
  approvalDate: '',
  remarks: '',

  requestedBySignature: {},
  managerSignature: {},
  changeManagerSignature: {},

  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00531_ITChangeRequest = () => {

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
    <ModernFormWrapper formId="FRM-00531" title="IT Change Request Form">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('IT Change Request submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00531"
              title="IT CHANGE REQUEST FORM"
              department="IT & Systems – IT Service Management"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'changeRequestNo','Change Request No')}
                </div>
              </div>

              {/* 2. Requestor Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Requestor Details</h3>
                <div className="form-fields">
                  {field(values,'employeeName','Employee Name')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'department','Department')}
                  {field(values,'designation','Designation')}
                  {field(values,'emailId','Email ID','email')}
                  {field(values,'contactNo','Contact No')}
                </div>
              </div>

              {/* 3. Change Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Change Details</h3>
                <div className="form-fields">
                  {field(values,'changeCategory','Change Category')}
                  {field(values,'systemName','System / Application')}
                  {textarea(values,'changeDescription','Description of Change')}
                  {textarea(values,'justification','Reason / Justification')}
                  {field(values,'priority','Priority')}
                  {field(values,'proposedDate','Proposed Implementation Date','date')}
                </div>
              </div>

              {/* 4. Impact & Risk Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">4. Impact & Risk Assessment</h3>
                <div className="form-fields">
                  {textarea(values,'businessImpact','Business Impact')}
                  {field(values,'riskLevel','Risk Level')}
                  {field(values,'downtimeRequired','Downtime Required')}
                  {textarea(values,'backoutPlan','Backout Plan')}
                </div>
              </div>

              {/* 5. CAB / Approval Details */}
              <div className="form-section">
                <h3 className="form-section-title">5. CAB / Approval Details</h3>
                <div className="form-fields">
                  {field(values,'reviewedBy','Reviewed By')}
                  {field(values,'approvalStatus','Approval Status')}
                  {field(values,'approvalDate','Approval Date','date')}
                  {textarea(values,'remarks','Remarks')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>

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
                      label="IT Change Manager"
                      value={values.changeManagerSignature || {}}
                      onChange={(val) => setFieldValue("changeManagerSignature", val)}
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
                    Submit IT Change Request
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

export default FRM00531_ITChangeRequest;
