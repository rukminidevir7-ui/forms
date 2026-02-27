// FRM00968_GSTNoticeResponseDraft.jsx
// FRM-00968 – GST Notice Response Draft
// Enterprise Grade – Tax & Statutory (India) – GST Compliance

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
  referenceNumber: Yup.string().required("Required"),
  gstin: Yup.string().required("Required"),
  noticeReferenceNumber: Yup.string().required("Required"),
  proposedResponse: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00968",
  date: "",
  department: "Tax & Statutory (India)",
  function: "GST Compliance",
  referenceNumber: "",
  location: "",
  gstin: "",
  legalName: "",

  /* Notice Details */
  noticeReferenceNumber: "",
  noticeDate: "",
  issuingAuthority: "",
  sectionRuleReferenced: "",
  responseDueDate: "",
  issueSummary: "",
  summaryOfNotice: "",
  keyIssuesIdentified: "",

  /* Response Draft */
  proposedResponse: "",
  supportingArguments: "",
  legalReferences: "",

  /* Financial Impact */
  taxDemandAmount: "",
  currency: "",
  interestPenalty: "",
  totalExposure: "",

  /* Attachments */
  supportingDocumentsAttached: "",
  documentReference: "",

  /* Authorization */
  approvalRoles: [
    { roleName: "Prepared By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM00968_GSTNoticeResponseDraft = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type = "text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : <>
            <Field name={name} type={type} className="form-input" />
            <ErrorMessage name={name} component="div" className="form-error" />
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-00968" title="GST Notice Response Draft">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("GST Notice Response Draft Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00968"
              title="GST NOTICE RESPONSE DRAFT"
              department="Tax & Statutory (India) – GST Compliance"
            >

              {/* GENERAL INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"date","Date","date")}
                  {field(values,"department","Department")}
                  {field(values,"function","Function")}
                  {field(values,"referenceNumber","Reference Number")}
                  {field(values,"location","Location")}
                  {field(values,"gstin","GSTIN")}
                  {field(values,"legalName","Legal Name")}
                </div>
              </div>

              {/* NOTICE DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Notice Details</h3>
                <div className="form-fields">
                  {field(values,"noticeReferenceNumber","Notice Reference Number")}
                  {field(values,"noticeDate","Notice Date","date")}
                  {field(values,"issuingAuthority","Issuing Authority")}
                  {field(values,"sectionRuleReferenced","Section / Rule Referenced")}
                  {field(values,"responseDueDate","Response Due Date","date")}
                  {field(values,"issueSummary","Issue Summary")}
                  {field(values,"summaryOfNotice","Summary of Notice")}
                  {field(values,"keyIssuesIdentified","Key Issues Identified")}
                </div>
              </div>

              {/* RESPONSE DRAFT */}
              <div className="form-section">
                <h3 className="form-section-title">Response Draft</h3>
                <div className="form-fields">
                  {field(values,"proposedResponse","Proposed Response")}
                  {field(values,"supportingArguments","Supporting Arguments")}
                  {field(values,"legalReferences","Legal References")}
                </div>
              </div>

              {/* FINANCIAL IMPACT */}
              <div className="form-section">
                <h3 className="form-section-title">Financial Impact</h3>
                <div className="form-fields">
                  {field(values,"taxDemandAmount","Tax Demand Amount","number")}
                  {field(values,"currency","Currency")}
                  {field(values,"interestPenalty","Interest / Penalty","number")}
                  {field(values,"totalExposure","Total Exposure","number")}
                </div>
              </div>

              {/* ATTACHMENTS */}
              <div className="form-section">
                <h3 className="form-section-title">Attachments</h3>
                <div className="form-fields">
                  {field(values,"supportingDocumentsAttached","Supporting Documents Attached (Yes/No)")}
                  {field(values,"documentReference","Document Reference")}
                </div>
              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* AUTHORIZATION */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>

                <FieldArray name="approvalRoles">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={() => push({ roleName: "New Role", data: {} })}
                        >
                          + Add Role
                        </button>
                      )}

                      <div className="three-column-signatures">
                        {values.approvalRoles.map((role,index)=>(
                          <div key={index}>
                            <ApprovalSignatureBlock
                              roleName={role.roleName}
                              value={role.data}
                              allowRoleEdit={!isPrintMode}
                              onRoleNameChange={(newName)=>
                                setFieldValue(`approvalRoles.${index}.roleName`,newName)
                              }
                              onChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.data`,val)
                              }
                            />

                            {!isPrintMode && (
                              <button
                                type="button"
                                className="btn-remove-role"
                                onClick={()=>remove(index)}
                              >
                                Remove Role
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </FieldArray>
              </div>

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit GST Notice Response
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

export default FRM00968_GSTNoticeResponseDraft;