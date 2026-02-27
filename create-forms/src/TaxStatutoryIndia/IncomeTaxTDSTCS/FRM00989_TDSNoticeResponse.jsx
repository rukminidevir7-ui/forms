// FRM00989_TDSNoticeResponse.jsx
// FRM-00989 – TDS Notice Response
// Enterprise Grade – Tax & Statutory (India) – Income Tax & TDS/TCS

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
  legalName: Yup.string().required("Required"),
  noticeReferenceNumber: Yup.string().required("Required"),
  proposedResponse: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00989",
  date: "",
  department: "Tax & Statutory (India)",
  function: "Income Tax & TDS/TCS",
  referenceNumber: "",
  location: "",
  tan: "",
  legalName: "",

  /* Notice Details */
  noticeReferenceNumber: "",
  noticeDate: "",
  issuingAuthority: "",
  section: "",
  responseDueDate: "",

  /* Issue Summary */
  summaryOfNotice: "",
  keyIssuesIdentified: "",

  /* Response Details */
  proposedResponse: "",
  supportingArguments: "",
  legalReferences: "",

  /* Financial Impact */
  demandAmount: "",
  interestPenalty: "",
  totalExposure: "",

  /* Authorization Workflow */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM00989_TDSNoticeResponse = () => {

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
    <ModernFormWrapper
      formId="FRM-00989"
      title="TDS Notice Response"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("TDS Notice Response Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00989"
              title="TDS NOTICE RESPONSE"
              department="Tax & Statutory (India) – Income Tax & TDS/TCS"
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
                  {field(values,"tan","TAN")}
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
                  {field(values,"section","Section")}
                  {field(values,"responseDueDate","Response Due Date","date")}
                </div>
              </div>

              {/* ISSUE SUMMARY */}
              <div className="form-section">
                <h3 className="form-section-title">Issue Summary</h3>
                <div className="form-fields">
                  {field(values,"summaryOfNotice","Summary of Notice")}
                  {field(values,"keyIssuesIdentified","Key Issues Identified")}
                </div>
              </div>

              {/* RESPONSE DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Response Details</h3>
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
                  {field(values,"demandAmount","Demand Amount","number")}
                  {field(values,"interestPenalty","Interest / Penalty","number")}
                  {field(values,"totalExposure","Total Exposure","number")}
                </div>
              </div>

              {/* ATTACHMENTS & CUSTOM FIELDS */}
              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* AUTHORIZATION */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>

                <FieldArray name="approvalRoles">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={()=>push({ roleName:"New Role", data:{} })}
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
                              onRoleNameChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.roleName`,val)
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
                    Submit TDS Notice Response
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

export default FRM00989_TDSNoticeResponse;