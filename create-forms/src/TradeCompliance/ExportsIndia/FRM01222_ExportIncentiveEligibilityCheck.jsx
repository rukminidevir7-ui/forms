// FRM01222_ExportIncentiveEligibilityCheck.jsx
// FRM-01222 / 01223 / 01224 – Export Incentive Eligibility Check
// Enterprise Grade – Trade Compliance – Exports (India)

import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
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
  customerName: Yup.string().required("Required"),
  productDescription: Yup.string().required("Required"),
  hsCode: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01222", // Change to 01223 / 01224 if needed
  date: "",
  department: "Trade Compliance",
  function: "Exports (India)",

  referenceNumber: "",
  businessUnit: "",
  preparedBy: "",
  location: "",

  customerName: "",
  productDescription: "",
  hsCode: "",
  destinationCountry: "",
  invoiceValue: "",

  applicableScheme: "",
  eligibilityCriteriaMet: "",
  schemeRate: "",
  estimatedIncentiveAmount: "",
  supportingReferences: "",

  documentationComplete: "",
  regulatoryComplianceStatus: "",
  riskAssessment: "",
  complianceRemarks: "",

  eligibilityStatus: "",
  approvedIncentiveAmount: "",
  effectiveDate: "",
  conditions: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01222_ExportIncentiveEligibilityCheck = () => {

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
      formId={initialValues.formId}
      title="Export Incentive Eligibility Check"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Export Incentive Eligibility Check Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId={initialValues.formId}
              title="EXPORT INCENTIVE ELIGIBILITY CHECK"
              department="Trade Compliance – Exports (India)"
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
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"preparedBy","Prepared By")}
                  {field(values,"location","Location")}
                </div>
              </div>

              {/* EXPORT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Export Details</h3>
                <div className="form-fields">
                  {field(values,"customerName","Customer Name")}
                  {field(values,"productDescription","Product Description")}
                  {field(values,"hsCode","HS Code")}
                  {field(values,"destinationCountry","Destination Country")}
                  {field(values,"invoiceValue","Invoice Value","number")}
                </div>
              </div>

              {/* INCENTIVE SCHEME DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Incentive Scheme Details</h3>
                <div className="form-fields">
                  {field(values,"applicableScheme","Applicable Scheme")}
                  {field(values,"eligibilityCriteriaMet","Eligibility Criteria Met")}
                  {field(values,"schemeRate","Scheme Rate")}
                  {field(values,"estimatedIncentiveAmount","Estimated Incentive Amount","number")}
                  {field(values,"supportingReferences","Supporting References")}
                </div>
              </div>

              {/* COMPLIANCE REVIEW */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Review</h3>
                <div className="form-fields">
                  {field(values,"documentationComplete","Documentation Complete")}
                  {field(values,"regulatoryComplianceStatus","Regulatory Compliance Status")}
                  {field(values,"riskAssessment","Risk Assessment")}
                  {field(values,"complianceRemarks","Remarks")}
                </div>
              </div>

              {/* DECISION */}
              <div className="form-section">
                <h3 className="form-section-title">Decision</h3>
                <div className="form-fields">
                  {field(values,"eligibilityStatus","Eligibility Status")}
                  {field(values,"approvedIncentiveAmount","Approved Incentive Amount","number")}
                  {field(values,"effectiveDate","Effective Date","date")}
                  {field(values,"conditions","Conditions")}
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
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Incentive Eligibility Check
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

export default FRM01222_ExportIncentiveEligibilityCheck;