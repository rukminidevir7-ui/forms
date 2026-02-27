// FRM00547_RolePermissionChange.jsx
// FRM-00547 / FRM-00548 – Role / Permission Change Form

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

  systemName: Yup.string().required('Required'),
  currentRole: Yup.string().required('Required'),
  requestedRole: Yup.string().required('Required'),
  changeType: Yup.string().required('Required'),
  justification: Yup.string().required('Required'),
  effectiveDate: Yup.string().required('Required'),

  sodCheck: Yup.string().required('Required'),
  riskLevel: Yup.string().required('Required'),
  approvalRequired: Yup.string().required('Required'),

  requestedBySignature: Yup.object(),
  managerSignature: Yup.object(),
  itSignature: Yup.object(),

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

  systemName: '',
  currentRole: '',
  requestedRole: '',
  changeType: '',
  justification: '',
  effectiveDate: '',

  sodCheck: '',
  riskLevel: '',
  approvalRequired: '',
  remarks: '',

  requestedBySignature: {},
  managerSignature: {},
  itSignature: {},

  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00547_RolePermissionChange = () => {

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
    <ModernFormWrapper formId="FRM-00547" title="Role / Permission Change – Request & Approval">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Role / Permission Change submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00547"
              title="ROLE / PERMISSION CHANGE – REQUEST & APPROVAL FORM"
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
                </div>
              </div>

              {/* 3. Access Change Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Access Change Details</h3>
                <div className="form-fields">
                  {field(values,'systemName','System / Application')}
                  {field(values,'currentRole','Current Role')}
                  {field(values,'requestedRole','Requested Role / Permission')}
                  {field(values,'changeType','Change Type (Add/Modify/Revoke)')}
                  {textarea(values,'justification','Business Justification')}
                  {field(values,'effectiveDate','Effective Date','date')}
                </div>
              </div>

              {/* 4. Risk & Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">4. Risk & Compliance</h3>
                <div className="form-fields">
                  {field(values,'sodCheck','Segregation of Duties Check')}
                  {field(values,'riskLevel','Risk Level')}
                  {field(values,'approvalRequired','Approval Required')}
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
                      label="IT Approval"
                      value={values.itSignature || {}}
                      onChange={(val) => setFieldValue("itSignature", val)}
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
                    Submit Role / Permission Change
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

export default FRM00547_RolePermissionChange;
