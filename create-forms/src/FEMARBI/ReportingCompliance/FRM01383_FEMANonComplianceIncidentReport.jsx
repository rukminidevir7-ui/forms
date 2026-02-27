// FRM01383_FEMANonComplianceIncidentReport.jsx
// FRM-01383 – FEMA Non-Compliance Incident Report
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
  incidentDate: Yup.string().required("Required"),
  typeOfNonCompliance: Yup.string().required("Required"),
  description: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01383",
  department: "FEMA & RBI Regulatory",
  function: "Reporting & Compliance",

  /* 1. Organization Details */
  companyName: "",
  cin: "",
  pan: "",
  registeredAddress: "",
  formReferenceNo: "",
  incidentDate: "",
  detectedDate: "",

  /* 2. Incident Details */
  typeOfNonCompliance: "",
  regulationImpacted: "",
  description: "",
  departmentFunction: "",
  responsibleOwner: "",

  /* 3. Transaction / Case Reference */
  transactionReference: "",
  amount: "",
  currency: "",
  counterparty: "",
  country: "",

  /* 4. Impact Assessment */
  financialImpact: "",
  regulatoryImpact: "",
  operationalImpact: "",
  reputationalImpact: "",
  riskLevel: "",

  /* 5. Root Cause Analysis */
  rootCause: "",
  controlGap: "",
  contributingFactors: "",

  /* 6. Corrective & Preventive Actions */
  immediateAction: "",
  correctiveActionPlan: "",
  preventiveMeasures: "",
  targetClosureDate: "",
  status: "",

  /* 8. Workflow & Approval */
  approvalRoles: [
    { roleName: "Initiated By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalStatus: "",
  comments: "",

  attachments: [],
  customFields: []
};

/* ================= COMPONENT ================= */

const FRM01383_FEMANonComplianceIncidentReport = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type="text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : <>
            <Field as={type === "textarea" ? "textarea" : "input"}
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
    <ModernFormWrapper formId="FRM-01383" title="FEMA Non-Compliance Incident Report">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("FEMA Non-Compliance Incident Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01383"
              title="FRM-01383 — FEMA Non-Compliance Incident Report"
              department="FEMA & RBI Regulatory | Reporting & Compliance"
            >

              {/* 1. Organization Details */}
              <div className="form-section">
                <h3 className="form-section-title">Organization Details</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"pan","PAN")}
                  {field(values,"registeredAddress","Registered Address")}
                  {field(values,"formReferenceNo","Form Reference No")}
                  {field(values,"incidentDate","Incident Date","date")}
                  {field(values,"detectedDate","Detected Date","date")}
                </div>
              </div>

              {/* 2. Incident Details */}
              <div className="form-section">
                <h3 className="form-section-title">Incident Details</h3>
                <div className="form-fields">
                  {field(values,"typeOfNonCompliance","Type of Non-Compliance")}
                  {field(values,"regulationImpacted","Regulation Impacted")}
                  {field(values,"description","Description of Incident","textarea")}
                  {field(values,"departmentFunction","Department / Function")}
                  {field(values,"responsibleOwner","Responsible Owner")}
                </div>
              </div>

              {/* 3. Transaction Reference */}
              <div className="form-section">
                <h3 className="form-section-title">Transaction / Case Reference</h3>
                <div className="form-fields">
                  {field(values,"transactionReference","Transaction Reference")}
                  {field(values,"amount","Amount")}
                  {field(values,"currency","Currency")}
                  {field(values,"counterparty","Counterparty")}
                  {field(values,"country","Country")}
                </div>
              </div>

              {/* 4. Impact Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">Impact Assessment</h3>
                <div className="form-fields">
                  {field(values,"financialImpact","Financial Impact","textarea")}
                  {field(values,"regulatoryImpact","Regulatory Impact","textarea")}
                  {field(values,"operationalImpact","Operational Impact","textarea")}
                  {field(values,"reputationalImpact","Reputational Impact","textarea")}
                  {field(values,"riskLevel","Risk Level (Low/Medium/High/Critical)")}
                </div>
              </div>

              {/* 5. Root Cause */}
              <div className="form-section">
                <h3 className="form-section-title">Root Cause Analysis</h3>
                <div className="form-fields">
                  {field(values,"rootCause","Root Cause","textarea")}
                  {field(values,"controlGap","Control Gap Identified","textarea")}
                  {field(values,"contributingFactors","Contributing Factors","textarea")}
                </div>
              </div>

              {/* 6. Corrective & Preventive Actions */}
              <div className="form-section">
                <h3 className="form-section-title">Corrective & Preventive Actions</h3>
                <div className="form-fields">
                  {field(values,"immediateAction","Immediate Action Taken","textarea")}
                  {field(values,"correctiveActionPlan","Corrective Action Plan","textarea")}
                  {field(values,"preventiveMeasures","Preventive Measures","textarea")}
                  {field(values,"targetClosureDate","Target Closure Date","date")}
                  {field(values,"status","Status (Open/In Progress/Closed)")}
                </div>
              </div>

              {/* 7. Supporting Documents */}
              <div className="form-section">
                <h3 className="form-section-title">Supporting Documents</h3>
                <FormAttachments values={values}/>
              </div>

              <FormCustomFields values={values}/>

              {/* 8. Workflow & Approval */}
              <div className="form-section">
                <h3 className="form-section-title">Workflow & Approval</h3>

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

                {field(values,"approvalStatus","Approval Status")}
                {field(values,"comments","Comments","textarea")}
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Incident Report
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

export default FRM01383_FEMANonComplianceIncidentReport;