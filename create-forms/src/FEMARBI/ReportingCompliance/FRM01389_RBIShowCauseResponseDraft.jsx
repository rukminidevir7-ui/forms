// FRM01389_RBIShowCauseResponseDraft.jsx
// FRM-01389 – RBI Show Cause Response Draft
// Enterprise Grade – FEMA & RBI – Reporting & Compliance

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
  companyName: Yup.string().required("Required"),
  cin: Yup.string().required("Required"),
  pan: Yup.string().required("Required"),
  referenceNo: Yup.string().required("Required"),
  rbiNoticeReference: Yup.string().required("Required"),
  descriptionOfAllegation: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01389",
  department: "FEMA & RBI Regulatory",
  function: "Reporting & Compliance",

  /* 1. Organization Details */
  companyName: "",
  cin: "",
  pan: "",
  registeredAddress: "",
  referenceNo: "",
  date: "",

  /* 2. Notice Details */
  rbiNoticeReference: "",
  noticeDate: "",
  subject: "",
  regulationSection: "",
  authorityDepartment: "",

  /* 3. Summary of Issue */
  descriptionOfAllegation: "",
  periodInvolved: "",
  transactionReferences: "",

  /* 4. Detailed Response */
  factsBackground: "",
  companyExplanation: "",
  legalPosition: "",
  supportingArguments: "",

  /* 6. Declaration */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  declarationComments: "",

  attachments: [],
  customFields: []
};

/* ================= COMPONENT ================= */

const FRM01389_RBIShowCauseResponseDraft = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type="text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : <>
            <Field
              as={type === "textarea" ? "textarea" : "input"}
              name={name}
              type={type !== "textarea" ? type : undefined}
              className="form-input"
            />
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-01389" title="RBI Show Cause Response Draft">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("RBI Show Cause Response Draft Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01389"
              title="FRM-01389 — RBI Show Cause Response Draft"
              department="FEMA & RBI Regulatory | Reporting & Compliance"
            >

              {/* 1. Organization Details */}
              <div className="form-section">
                <h3 className="form-section-title">Organization Details</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"pan","PAN")}
                  {field(values,"registeredAddress","Registered Address","textarea")}
                  {field(values,"referenceNo","Reference No")}
                  {field(values,"date","Date","date")}
                </div>
              </div>

              {/* 2. Notice Details */}
              <div className="form-section">
                <h3 className="form-section-title">Notice Details</h3>
                <div className="form-fields">
                  {field(values,"rbiNoticeReference","RBI Notice Reference")}
                  {field(values,"noticeDate","Notice Date","date")}
                  {field(values,"subject","Subject")}
                  {field(values,"regulationSection","Regulation / Section")}
                  {field(values,"authorityDepartment","Authority / Department")}
                </div>
              </div>

              {/* 3. Summary of Issue */}
              <div className="form-section">
                <h3 className="form-section-title">Summary of Issue</h3>
                <div className="form-fields">
                  {field(values,"descriptionOfAllegation","Description of Allegation","textarea")}
                  {field(values,"periodInvolved","Period Involved")}
                  {field(values,"transactionReferences","Transactions / References","textarea")}
                </div>
              </div>

              {/* 4. Detailed Response */}
              <div className="form-section">
                <h3 className="form-section-title">Detailed Response</h3>
                <div className="form-fields">
                  {field(values,"factsBackground","Facts and Background","textarea")}
                  {field(values,"companyExplanation","Company Explanation","textarea")}
                  {field(values,"legalPosition","Legal / Regulatory Position","textarea")}
                  {field(values,"supportingArguments","Supporting Arguments","textarea")}
                </div>
              </div>

              {/* 5. Supporting Documents */}
              <div className="form-section">
                <h3 className="form-section-title">Supporting Documents</h3>
                <FormAttachments values={values} />
              </div>

              <FormCustomFields values={values} />

              {/* 6. Declaration */}
              <div className="form-section">
                <h3 className="form-section-title">Declaration</h3>

                <FieldArray name="approvalRoles">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode &&
                        <button type="button" className="btn-submit" onClick={()=>push({ roleName:"New Role", data:{} })}>
                          + Add Role
                        </button>
                      }

                      <div className="three-column-signatures">
                        {values.approvalRoles.map((role,index)=>(
                          <div key={index}>
                            <ApprovalSignatureBlock
                              roleName={role.roleName}
                              value={role.data}
                              allowRoleEdit={!isPrintMode}
                              onRoleNameChange={(val)=>setFieldValue(`approvalRoles.${index}.roleName`,val)}
                              onChange={(val)=>setFieldValue(`approvalRoles.${index}.data`,val)}
                            />
                            {!isPrintMode &&
                              <button type="button" onClick={()=>remove(index)}>Remove</button>
                            }
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </FieldArray>

                {field(values,"declarationComments","Comments","textarea")}
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Show Cause Response Draft
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

export default FRM01389_RBIShowCauseResponseDraft;