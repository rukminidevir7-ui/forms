// FRM01007_TaxComplianceSignOff.jsx
// FRM-01007 – Tax Compliance Sign-Off
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
  financialYear: Yup.string().required("Required"),
  legalName: Yup.string().required("Required"),
  complianceArea: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01007",
  date: "",
  department: "Tax & Statutory (India)",
  function: "Income Tax & TDS/TCS",
  financialYear: "",
  assessmentYear: "",
  referenceNumber: "",
  location: "",
  compliancePeriodFrom: "",
  compliancePeriodTo: "",

  /* Entity Details */
  legalName: "",
  pan: "",
  businessUnit: "",
  preparedFor: "",

  /* Compliance Scope */
  complianceArea: "",
  keyFilingsCovered: "",
  checklistReference: "",
  exceptionsIdentified: "",

  /* Summary Assessment */
  overallComplianceStatus: "",
  keyRisks: "",
  mitigationActions: "",
  remarks: "",

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

const FRM01007_TaxComplianceSignOff = () => {

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
      formId="FRM-01007"
      title="Tax Compliance Sign-Off"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Tax Compliance Sign-Off Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01007"
              title="TAX COMPLIANCE SIGN-OFF"
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
                  {field(values,"financialYear","Financial Year")}
                  {field(values,"assessmentYear","Assessment Year")}
                  {field(values,"referenceNumber","Reference Number")}
                  {field(values,"location","Location")}
                  {field(values,"compliancePeriodFrom","Compliance Period From","date")}
                  {field(values,"compliancePeriodTo","Compliance Period To","date")}
                </div>
              </div>

              {/* ENTITY DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Entity Details</h3>
                <div className="form-fields">
                  {field(values,"legalName","Legal Name")}
                  {field(values,"pan","PAN")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"preparedFor","Prepared For")}
                </div>
              </div>

              {/* COMPLIANCE SCOPE */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Scope</h3>
                <div className="form-fields">
                  {field(values,"complianceArea","Compliance Area")}
                  {field(values,"keyFilingsCovered","Key Filings Covered")}
                  {field(values,"checklistReference","Checklist Reference")}
                  {field(values,"exceptionsIdentified","Exceptions Identified")}
                </div>
              </div>

              {/* SUMMARY ASSESSMENT */}
              <div className="form-section">
                <h3 className="form-section-title">Summary Assessment</h3>
                <div className="form-fields">

                  <div className="form-field">
                    <label className="form-label">Overall Compliance Status</label>
                    {isPrintMode ? (
                      <div className="print-value">{values.overallComplianceStatus || "_________"}</div>
                    ) : (
                      <Field as="select" name="overallComplianceStatus" className="form-input">
                        <option value="">Select</option>
                        <option>Compliant</option>
                        <option>Partially Compliant</option>
                        <option>Non-Compliant</option>
                        <option>Under Review</option>
                      </Field>
                    )}
                  </div>

                  {field(values,"keyRisks","Key Risks")}
                  {field(values,"mitigationActions","Mitigation Actions")}
                  {field(values,"remarks","Remarks")}
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
                    Submit Tax Compliance Sign-Off
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

export default FRM01007_TaxComplianceSignOff;