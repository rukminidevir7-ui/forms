// FRM01004_TaxLitigationCaseFile.jsx
// FRM-01004 – Tax Litigation Case File
// Enterprise Grade – Tax & Statutory (India) – Income Tax Litigation

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
  financialYear: Yup.string().required("Required"),
  legalName: Yup.string().required("Required"),
  caseId: Yup.string().required("Required"),
  totalExposure: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01004",
  date: "",
  department: "Tax & Statutory (India)",
  function: "Income Tax – Litigation",
  financialYear: "",
  assessmentYear: "",
  referenceNumber: "",
  location: "",
  casePriority: "",
  caseStatus: "",

  /* Entity Details */
  legalName: "",
  pan: "",
  businessUnit: "",
  contactPerson: "",
  phone: "",
  email: "",

  /* Case Details */
  caseId: "",
  noticeReference: "",
  authorityCourt: "",
  section: "",
  issueSummary: "",
  keyDates: "",

  /* Financial Exposure */
  taxDemand: "",
  interest: "",
  penalty: "",
  totalExposure: "",
  provisionMade: "",

  /* Legal Strategy */
  legalPositionSummary: "",
  externalCounsel: "",
  nextAction: "",
  riskAssessment: "",

  /* Attachments */
  supportingDocumentsAttached: "",
  documentReference: "",

  /* Authorization */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01004_TaxLitigationCaseFile = () => {

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
      formId="FRM-01004"
      title="Tax Litigation Case File"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Tax Litigation Case File Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01004"
              title="TAX LITIGATION CASE FILE"
              department="Tax & Statutory (India) – Income Tax"
            >

              {/* GENERAL INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"date","Date","date")}
                  {field(values,"department","Department")}
                  {field(values,"function","Function")}
                  {field(values,"financialYear","Financial Year")}
                  {field(values,"assessmentYear","Assessment Year")}
                  {field(values,"referenceNumber","Reference Number")}
                  {field(values,"location","Location")}

                  <div className="form-field">
                    <label className="form-label">Case Priority</label>
                    {isPrintMode ? (
                      <div className="print-value">{values.casePriority || "_________"}</div>
                    ) : (
                      <Field as="select" name="casePriority" className="form-input">
                        <option value="">Select</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Critical</option>
                      </Field>
                    )}
                  </div>

                  <div className="form-field">
                    <label className="form-label">Case Status</label>
                    {isPrintMode ? (
                      <div className="print-value">{values.caseStatus || "_________"}</div>
                    ) : (
                      <Field as="select" name="caseStatus" className="form-input">
                        <option value="">Select</option>
                        <option>Open</option>
                        <option>Under Review</option>
                        <option>Appeal Filed</option>
                        <option>Closed</option>
                      </Field>
                    )}
                  </div>

                </div>
              </div>

              {/* ENTITY DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Entity Details</h3>
                <div className="form-fields">
                  {field(values,"legalName","Legal Name")}
                  {field(values,"pan","PAN")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"contactPerson","Contact Person")}
                  {field(values,"phone","Phone")}
                  {field(values,"email","Email")}
                </div>
              </div>

              {/* CASE DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Case Details</h3>
                <div className="form-fields">
                  {field(values,"caseId","Case ID")}
                  {field(values,"noticeReference","Notice / Order Reference")}
                  {field(values,"authorityCourt","Authority / Court")}
                  {field(values,"section","Section")}
                  {field(values,"issueSummary","Issue Summary")}
                  {field(values,"keyDates","Key Dates (Notice / Hearing)")}
                </div>
              </div>

              {/* FINANCIAL EXPOSURE */}
              <div className="form-section">
                <h3 className="form-section-title">Financial Exposure</h3>
                <div className="form-fields">
                  {field(values,"taxDemand","Tax Demand","number")}
                  {field(values,"interest","Interest","number")}
                  {field(values,"penalty","Penalty","number")}
                  {field(values,"totalExposure","Total Exposure","number")}
                  {field(values,"provisionMade","Provision Made","number")}
                </div>
              </div>

              {/* LEGAL STRATEGY */}
              <div className="form-section">
                <h3 className="form-section-title">Legal Strategy</h3>
                <div className="form-fields">
                  {field(values,"legalPositionSummary","Legal Position Summary")}
                  {field(values,"externalCounsel","External Counsel")}
                  {field(values,"nextAction","Next Action")}
                  {field(values,"riskAssessment","Risk Assessment")}
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
                    Submit Tax Litigation Case File
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

export default FRM01004_TaxLitigationCaseFile;