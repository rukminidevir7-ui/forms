// FRM02507_BillingTermsConditionsApproval.jsx
// FRM-02507 – Billing Terms & Conditions Approval
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
  requestDate: Yup.date().required("Required"),
  termsVersion: Yup.string().required("Required"),
  effectiveDate: Yup.date().required("Required"),
  paymentTerms: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "Signed Contract / Agreement",
  "Approved T&C Document",
  "Client Approval Communication",
  "Supporting Documents"
];

const initialValues = {
  formId: "FRM-02507",
  department: "Client Billing & Revenue Operations",
  function: "Billing Setup & Master Data",

  /* 1. Client Details */
  clientName: "",
  clientCode: "",
  legalEntity: "",
  country: "",
  requestDate: "",
  referenceNo: "",

  /* 2. Terms Overview */
  termsVersion: "",
  effectiveDate: "",
  paymentTerms: "",
  creditTerms: "",
  penaltyLateFeeTerms: "",

  /* 3. Key Conditions */
  serviceScopeReference: "",
  pricingBasis: "",
  taxTreatment: "",
  terminationClauseSummary: "",
  specialConditions: "",

  /* 4. Documentation */
  contractReference: "",
  remarks: "",

  /* Attachments */
  mandatoryAttachments: mandatoryDocuments.map(doc => ({
    documentName: doc,
    status: "",
    file: null,
    remarks: ""
  })),
  customAttachments: [],

  /* 5. Approval */
  approvalRoles: [
    { roleName: "Requested By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  approvalDate: "",

  attachments: [],
  customFields: []
};

/* ================= COMPONENT ================= */

const FRM02507_BillingTermsConditionsApproval = () => {

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
    <ModernFormWrapper formId="FRM-02507" title="Billing Terms & Conditions Approval">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Billing Terms & Conditions Approval Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02507"
              title="FRM-02507 — Billing Terms & Conditions Approval"
              department="Client Billing & Revenue Operations | Billing Setup & Master Data"
            >

              {/* 1. Client Details */}
              <div className="form-section">
                <h3 className="form-section-title">Client Details</h3>
                <div className="form-fields">
                  {field(values,"clientName","Client Name")}
                  {field(values,"clientCode","Client Code")}
                  {field(values,"legalEntity","Legal Entity")}
                  {field(values,"country","Country")}
                  {field(values,"requestDate","Request Date","date")}
                  {field(values,"referenceNo","Reference No")}
                </div>
              </div>

              {/* 2. Terms Overview */}
              <div className="form-section">
                <h3 className="form-section-title">Terms Overview</h3>
                <div className="form-fields">
                  {field(values,"termsVersion","Terms Version")}
                  {field(values,"effectiveDate","Effective Date","date")}
                  {field(values,"paymentTerms","Payment Terms")}
                  {field(values,"creditTerms","Credit Terms")}
                  {field(values,"penaltyLateFeeTerms","Penalty / Late Fee Terms")}
                </div>
              </div>

              {/* 3. Key Conditions */}
              <div className="form-section">
                <h3 className="form-section-title">Key Conditions</h3>
                <div className="form-fields">
                  {field(values,"serviceScopeReference","Service Scope Reference")}
                  {field(values,"pricingBasis","Pricing Basis")}
                  {field(values,"taxTreatment","Tax Treatment")}
                  {field(values,"terminationClauseSummary","Termination Clause Summary")}
                  {field(values,"specialConditions","Special Conditions")}
                </div>
              </div>

              {/* 4. Documentation */}
              <div className="form-section">
                <h3 className="form-section-title">Documentation</h3>

                {field(values,"contractReference","Contract / Agreement Reference")}

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

                {field(values,"remarks","Remarks")}
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
                    Submit Billing T&C Approval
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

export default FRM02507_BillingTermsConditionsApproval;