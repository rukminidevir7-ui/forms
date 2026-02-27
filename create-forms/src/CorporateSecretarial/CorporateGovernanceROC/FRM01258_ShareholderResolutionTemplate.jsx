// FRM01258_ShareholderResolutionTemplate.jsx
// FRM-01258 – Shareholder Resolution Template
// Enterprise Grade – Corporate & Secretarial – Governance & ROC

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
  resolutionDate: Yup.string().required("Required"),
  resolutionType: Yup.string().required("Required"),
  subjectTitle: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01258",
  department: "Corporate & Secretarial",
  function: "Corporate Governance & ROC",

  companyName: "",
  cin: "",
  registeredOfficeAddress: "",
  resolutionDate: "",
  resolutionType: "",

  subjectTitle: "",
  backgroundPurpose: "",
  resolutionText: "",

  votesFor: "",
  votesAgainst: "",
  abstained: "",
  resultStatus: "",

  noticeCopy: "",
  explanatoryStatement: "",
  otherSupportingDocuments: "",

  comments: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By (Authorized Signatory)", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01258_ShareholderResolutionTemplate = () => {

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
      formId="FRM-01258"
      title="Shareholder Resolution Template"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Shareholder Resolution Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01258"
              title="SHAREHOLDER RESOLUTION"
              department="Corporate & Secretarial – Governance & ROC"
            >

              {/* COMPANY DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">1. Company Details</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"registeredOfficeAddress","Registered Office Address")}
                  {field(values,"resolutionDate","Resolution Date","date")}

                  <div className="form-field">
                    <label className="form-label">Resolution Type</label>
                    {isPrintMode
                      ? <div className="print-value">{values.resolutionType || "_________"}</div>
                      :
                        <Field as="select" name="resolutionType" className="form-input">
                          <option value="">Select</option>
                          <option>Ordinary</option>
                          <option>Special</option>
                        </Field>
                    }
                  </div>

                </div>
              </div>

              {/* RESOLUTION DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">2. Resolution Details</h3>
                <div className="form-fields">
                  {field(values,"subjectTitle","Subject / Title")}
                  {field(values,"backgroundPurpose","Background / Purpose")}
                  {field(values,"resolutionText","Resolution Text")}
                </div>
              </div>

              {/* VOTING SUMMARY */}
              <div className="form-section">
                <h3 className="form-section-title">3. Voting Summary</h3>
                <div className="form-fields">
                  {field(values,"votesFor","Votes For","number")}
                  {field(values,"votesAgainst","Votes Against","number")}
                  {field(values,"abstained","Abstained","number")}

                  <div className="form-field">
                    <label className="form-label">Result</label>
                    {isPrintMode
                      ? <div className="print-value">{values.resultStatus || "_________"}</div>
                      :
                        <Field as="select" name="resultStatus" className="form-input">
                          <option value="">Select</option>
                          <option>Passed</option>
                          <option>Not Passed</option>
                        </Field>
                    }
                  </div>

                </div>
              </div>

              {/* SUPPORTING DOCUMENTS */}
              <div className="form-section">
                <h3 className="form-section-title">4. Supporting Documents</h3>
                <div className="form-fields">
                  {field(values,"noticeCopy","Notice Copy")}
                  {field(values,"explanatoryStatement","Explanatory Statement")}
                  {field(values,"otherSupportingDocuments","Other Supporting Documents")}
                </div>
              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* SIGN-OFF (DYNAMIC ROLES) */}
              <div className="form-section">
                <h3 className="form-section-title">5. Sign-off</h3>

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
                              allowRoleEdit={!isPrintMode}
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

                <div className="form-fields" style={{ marginTop: 20 }}>
                  {field(values,"comments","Comments")}
                </div>

              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Shareholder Resolution
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

export default FRM01258_ShareholderResolutionTemplate;