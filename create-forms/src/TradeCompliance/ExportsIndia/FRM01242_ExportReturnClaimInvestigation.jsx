// FRM01242_ExportReturnClaimInvestigation.jsx
// FRM-01242 / 01243 / 01244 – Export Return / Claim Investigation
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
  claimType: Yup.string().required("Required"),
  issueSummary: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01242", // Change to 01243 / 01244 if needed
  date: "",
  department: "Trade Compliance",
  function: "Exports (India)",

  referenceNumber: "",
  businessUnit: "",
  preparedBy: "",
  location: "",

  customerName: "",
  invoiceNumber: "",
  shipmentReference: "",
  claimType: "",
  claimReferenceNumber: "",
  investigationStartDate: "",

  issueSummary: "",
  initialFindings: "",

  rootCauseAnalysis: "",
  supportingEvidence: "",
  impactAssessment: "",
  correctiveActions: "",

  resolutionStatus: "",
  recommendedAction: "",
  closureDate: "",
  remarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01242_ExportReturnClaimInvestigation = () => {

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
      title="Export Return / Claim Investigation"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Export Return / Claim Investigation Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId={initialValues.formId}
              title="EXPORT RETURN / CLAIM INVESTIGATION"
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

              {/* CASE DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Case Details</h3>
                <div className="form-fields">
                  {field(values,"customerName","Customer Name")}
                  {field(values,"invoiceNumber","Invoice Number")}
                  {field(values,"shipmentReference","Shipment Reference")}
                  {field(values,"claimType","Claim Type")}
                  {field(values,"claimReferenceNumber","Claim Reference Number")}
                  {field(values,"investigationStartDate","Investigation Start Date","date")}
                </div>
              </div>

              {/* ISSUE DESCRIPTION */}
              <div className="form-section">
                <h3 className="form-section-title">Issue Description</h3>
                <div className="form-fields">
                  {field(values,"issueSummary","Issue Summary")}
                  {field(values,"initialFindings","Initial Findings")}
                </div>
              </div>

              {/* INVESTIGATION DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Investigation Details</h3>
                <div className="form-fields">
                  {field(values,"rootCauseAnalysis","Root Cause Analysis")}
                  {field(values,"supportingEvidence","Supporting Evidence")}
                  {field(values,"impactAssessment","Impact Assessment")}
                  {field(values,"correctiveActions","Corrective Actions")}
                </div>
              </div>

              {/* OUTCOME */}
              <div className="form-section">
                <h3 className="form-section-title">Outcome</h3>
                <div className="form-fields">
                  {field(values,"resolutionStatus","Resolution Status")}
                  {field(values,"recommendedAction","Recommended Action")}
                  {field(values,"closureDate","Closure Date","date")}
                  {field(values,"remarks","Remarks")}
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
                    Submit Investigation Report
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

export default FRM01242_ExportReturnClaimInvestigation;