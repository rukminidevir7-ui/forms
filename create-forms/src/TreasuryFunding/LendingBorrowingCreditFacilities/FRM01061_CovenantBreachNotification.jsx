// FRM01061_CovenantBreachNotification.jsx
// FRM-01061 – Covenant Breach Notification
// Enterprise Grade – Treasury & Funding – Lending, Borrowing & Credit Facilities

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
  borrowerName: Yup.string().required("Required"),
  facilityReference: Yup.string().required("Required"),
  covenantName: Yup.string().required("Required"),
  breachDate: Yup.string().required("Required"),
  severityLevel: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01061",
  date: "",
  department: "Treasury & Funding",
  function: "Lending, Borrowing & Credit Facilities",
  referenceNumber: "",
  location: "",
  borrowerName: "",
  facilityReference: "",
  businessUnit: "",
  currency: "",

  /* Breach Details */
  covenantName: "",
  breachDate: "",
  requirement: "",
  actualValue: "",
  severityLevel: "",

  /* Impact Assessment */
  financialImpact: "",
  operationalImpact: "",
  riskLevel: "",
  impactRemarks: "",

  /* Corrective Actions */
  immediateActions: "",
  remediationPlan: "",
  expectedResolutionDate: "",
  owner: "",

  /* Communication */
  lenderNotified: "",
  internalNotified: "",
  communicationNotes: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01061_CovenantBreachNotification = () => {

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

  const yesNoField = (name, label) => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      <Field as="select" name={name} className="form-input">
        <option value="">Select</option>
        <option>Yes</option>
        <option>No</option>
      </Field>
    </div>
  );

  return (
    <ModernFormWrapper
      formId="FRM-01061"
      title="Covenant Breach Notification"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Covenant Breach Notification Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01061"
              title="COVENANT BREACH NOTIFICATION"
              department="Treasury & Funding – Lending, Borrowing & Credit Facilities"
            >

              {/* GENERAL INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"date","Date","date")}
                  {field(values,"referenceNumber","Reference Number")}
                  {field(values,"location","Location")}
                  {field(values,"borrowerName","Borrower Name")}
                  {field(values,"facilityReference","Facility Reference")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"currency","Currency")}
                </div>
              </div>

              {/* BREACH DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Breach Details</h3>
                <div className="form-fields">
                  {field(values,"covenantName","Covenant Name")}
                  {field(values,"breachDate","Breach Date","date")}
                  {field(values,"requirement","Requirement")}
                  {field(values,"actualValue","Actual Value")}
                  <div className="form-field">
                    <label className="form-label">Severity Level</label>
                    <Field as="select" name="severityLevel" className="form-input">
                      <option value="">Select</option>
                      <option>Low</option>
                      <option>Moderate</option>
                      <option>High</option>
                      <option>Critical</option>
                    </Field>
                  </div>
                </div>
              </div>

              {/* IMPACT ASSESSMENT */}
              <div className="form-section">
                <h3 className="form-section-title">Impact Assessment</h3>
                <div className="form-fields">
                  {field(values,"financialImpact","Financial Impact")}
                  {field(values,"operationalImpact","Operational Impact")}
                  <div className="form-field">
                    <label className="form-label">Risk Level</label>
                    <Field as="select" name="riskLevel" className="form-input">
                      <option value="">Select</option>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Severe</option>
                    </Field>
                  </div>
                  {field(values,"impactRemarks","Remarks")}
                </div>
              </div>

              {/* CORRECTIVE ACTIONS */}
              <div className="form-section">
                <h3 className="form-section-title">Corrective Actions</h3>
                <div className="form-fields">
                  {field(values,"immediateActions","Immediate Actions")}
                  {field(values,"remediationPlan","Proposed Remediation Plan")}
                  {field(values,"expectedResolutionDate","Expected Resolution Date","date")}
                  {field(values,"owner","Owner")}
                </div>
              </div>

              {/* COMMUNICATION */}
              <div className="form-section">
                <h3 className="form-section-title">Communication</h3>
                <div className="form-fields">
                  {yesNoField("lenderNotified","Lender Notified")}
                  {yesNoField("internalNotified","Internal Stakeholders Notified")}
                  {field(values,"communicationNotes","Notes")}
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
                              onRoleNameChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.roleName`,val)}
                              onChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.data`,val)}
                            />
                            {!isPrintMode &&
                              <button type="button" onClick={()=>remove(index)}>
                                Remove Role
                              </button>
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
                    Submit Covenant Breach Notification
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

export default FRM01061_CovenantBreachNotification;