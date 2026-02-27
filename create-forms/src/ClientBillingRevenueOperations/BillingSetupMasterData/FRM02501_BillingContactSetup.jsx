// FRM02501_BillingContactSetup.jsx
// FRM-02501 – Billing Contact Setup
// Enterprise Grade – Client Billing & Revenue Operations – Billing Setup & Master Data

import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePrintMode } from "../../PrintModeContext";
import ModernFormWrapper from "../../components/ModernFormWrapper";
import ModernA4Template from "../../components/ModernA4Template";
import ApprovalSignatureBlock from "../../components/ApprovalSignatureBlock";
import FormAttachments from "../../components/FormAttachments";
import FormCustomFields from "../../components/FormCustomFields";
import "../../styles/FRM00611.css";

/* ================= VALIDATION ================= */

const validationSchema = Yup.object({
  clientName: Yup.string().required("Required"),
  clientCode: Yup.string().required("Required"),
  legalEntity: Yup.string().required("Required"),
  contactName: Yup.string().required("Required"),
  emailAddress: Yup.string().email("Invalid email").required("Required")
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "KYC Verification Document",
  "Communication Consent",
  "Supporting Documents"
];

const initialValues = {
  formId: "FRM-02501",
  department: "Client Billing & Revenue Operations",
  function: "Billing Setup & Master Data",

  /* 1. Client Reference */
  clientName: "",
  clientCode: "",
  legalEntity: "",
  country: "",

  /* 2. Contact Details */
  contactName: "",
  designation: "",
  departmentName: "",
  emailAddress: "",
  phoneNumber: "",
  alternateContact: "",

  /* 3. Billing Preferences */
  primaryBillingContact: "",
  invoiceDeliveryMethod: "",
  invoiceEmail: "",
  notificationPreference: "",
  remarks: "",

  /* 4. Compliance */
  kycVerified: "",
  consentForCommunication: "",

  /* Attachments */
  mandatoryAttachments: mandatoryDocuments.map(doc => ({
    documentName: doc,
    status: "",
    file: null,
    remarks: ""
  })),
  customAttachments: [],

  /* Approval */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  approvalDate: "",

  attachments: [],
  customFields: []
};

/* ================= COMPONENT ================= */

const FRM02501_BillingContactSetup = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type="text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : <>
            <Field name={name} type={type} className="form-input"/>
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-02501" title="Billing Contact Setup">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Billing Contact Setup Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02501"
              title="FRM-02501 — Billing Contact Setup"
              department="Client Billing & Revenue Operations | Billing Setup & Master Data"
            >

              {/* 1. Client Reference */}
              <div className="form-section">
                <h3 className="form-section-title">Client Reference</h3>
                <div className="form-fields">
                  {field(values,"clientName","Client Name")}
                  {field(values,"clientCode","Client Code")}
                  {field(values,"legalEntity","Legal Entity")}
                  {field(values,"country","Country")}
                </div>
              </div>

              {/* 2. Contact Details */}
              <div className="form-section">
                <h3 className="form-section-title">Contact Details</h3>
                <div className="form-fields">
                  {field(values,"contactName","Contact Name")}
                  {field(values,"designation","Designation")}
                  {field(values,"departmentName","Department")}
                  {field(values,"emailAddress","Email Address","email")}
                  {field(values,"phoneNumber","Phone Number")}
                  {field(values,"alternateContact","Alternate Contact")}
                </div>
              </div>

              {/* 3. Billing Preferences */}
              <div className="form-section">
                <h3 className="form-section-title">Billing Preferences</h3>
                <div className="form-fields">
                  {field(values,"primaryBillingContact","Primary Billing Contact (Yes/No)")}
                  {field(values,"invoiceDeliveryMethod","Invoice Delivery Method")}
                  {field(values,"invoiceEmail","Invoice Email","email")}
                  {field(values,"notificationPreference","Notification Preference")}
                  {field(values,"remarks","Remarks")}
                </div>
              </div>

              {/* 4. Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance</h3>
                <div className="form-fields">
                  {field(values,"kycVerified","KYC Verified (Yes/No)")}
                  {field(values,"consentForCommunication","Consent for Communication (Yes/No)")}
                </div>
              </div>

              {/* ATTACHMENTS */}
              <div className="form-section">
                <FormAttachments values={values} />

                <FieldArray name="mandatoryAttachments">
                  {() => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Document</th>
                          <th>Status</th>
                          <th>Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {values.mandatoryAttachments.map((doc,index)=>(
                          <tr key={index}>
                            <td>{doc.documentName}</td>
                            <td>
                              <Field
                                as="select"
                                name={`mandatoryAttachments.${index}.status`}
                                className="form-input"
                              >
                                <option value="">Select</option>
                                <option>YES</option>
                                <option>NO</option>
                                <option>NA</option>
                              </Field>
                            </td>
                            <td>
                              <Field
                                name={`mandatoryAttachments.${index}.remarks`}
                                className="form-input"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>
              </div>

              <FormCustomFields values={values} />

              {/* 5. Approval */}
              <div className="form-section">
                <h3 className="form-section-title">Approval</h3>

                <FieldArray name="approvalRoles">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode &&
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={()=>push({ roleName:"New Role", data:{} })}
                        >
                          + Add Role
                        </button>
                      }

                      <div className="three-column-signatures">
                        {values.approvalRoles.map((role,index)=>(
                          <div key={index}>
                            <ApprovalSignatureBlock
                              roleName={role.roleName}
                              value={role.data}
                              allowRoleEdit={true}
                              onRoleNameChange={(val)=>setFieldValue(`approvalRoles.${index}.roleName`,val)}
                              onChange={(val)=>setFieldValue(`approvalRoles.${index}.data`,val)}
                            />
                            {!isPrintMode &&
                              <button type="button" onClick={()=>remove(index)}>
                                Remove
                              </button>
                            }
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </FieldArray>

                {field(values,"approvalDate","Approval Date","date")}
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Billing Contact Setup
                  </button>
                </div>
              }

            </ModernA4Template>
          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM02501_BillingContactSetup;