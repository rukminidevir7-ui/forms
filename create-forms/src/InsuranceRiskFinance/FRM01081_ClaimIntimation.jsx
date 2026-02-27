// FRM01081_ClaimIntimation.jsx
// FRM-01081 / 01082 / 01083 – Claim Intimation
// Enterprise Grade – Insurance & Risk Finance – Insurance Management

import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { usePrintMode } from "../PrintModeContext";
import ModernFormWrapper from "../components/ModernFormWrapper";
import ModernA4Template from "../components/ModernA4Template";
import FormAttachments from "../components/FormAttachments";
import FormCustomFields from "../components/FormCustomFields";
import ApprovalSignatureBlock from "../components/ApprovalSignatureBlock";
import "../styles/FRM00611.css";

/* ================= VALIDATION ================= */

const validationSchema = Yup.object({
  claimReference: Yup.string().required("Required"),
  policyNumber: Yup.string().required("Required"),
  dateOfIncident: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01081",
  date: "",
  department: "Insurance & Risk Finance",
  function: "Insurance Management",
  referenceNumber: "",
  location: "",
  businessUnit: "",
  claimReference: "",
  reportedBy: "",
  contactDetails: "",

  policyNumber: "",
  insurerName: "",
  policyType: "",
  policyPeriodFrom: "",
  policyPeriodTo: "",

  dateOfIncident: "",
  locationOfIncident: "",
  typeOfLoss: "",
  descriptionOfIncident: "",
  estimatedLossAmount: "",

  immediateActionsTaken: "",
  authoritiesNotified: "",
  documentsAttached: "",
  additionalRemarks: "",

  initialAssessment: "",
  claimStatus: "",
  nextSteps: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01081_ClaimIntimation = () => {

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
      formId="FRM-01081"
      title="Claim Intimation"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Claim Intimation Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-01081"
              title="CLAIM INTIMATION"
              department="Insurance & Risk Finance – Insurance Management"
            >

              {/* GENERAL INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"date","Date","date")}
                  {field(values,"referenceNumber","Reference Number")}
                  {field(values,"location","Location")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"claimReference","Claim Reference")}
                  {field(values,"reportedBy","Reported By")}
                  {field(values,"contactDetails","Contact Details")}
                </div>
              </div>

              {/* POLICY DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Policy Details</h3>
                <div className="form-fields">
                  {field(values,"policyNumber","Policy Number")}
                  {field(values,"insurerName","Insurer Name")}
                  {field(values,"policyType","Policy Type")}
                  {field(values,"policyPeriodFrom","Policy Period From","date")}
                  {field(values,"policyPeriodTo","Policy Period To","date")}
                </div>
              </div>

              {/* CLAIM DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Claim Details</h3>
                <div className="form-fields">
                  {field(values,"dateOfIncident","Date of Incident","date")}
                  {field(values,"locationOfIncident","Location of Incident")}
                  {field(values,"typeOfLoss","Type of Loss")}
                  {field(values,"descriptionOfIncident","Description of Incident")}
                  {field(values,"estimatedLossAmount","Estimated Loss Amount","number")}
                </div>
              </div>

              {/* SUPPORTING INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">Supporting Information</h3>
                <div className="form-fields">
                  {field(values,"immediateActionsTaken","Immediate Actions Taken")}
                  {field(values,"authoritiesNotified","Authorities Notified")}
                  {field(values,"documentsAttached","Documents Attached")}
                  {field(values,"additionalRemarks","Additional Remarks")}
                </div>
              </div>

              {/* PROCESSING */}
              <div className="form-section">
                <h3 className="form-section-title">Processing</h3>
                <div className="form-fields">
                  {field(values,"initialAssessment","Initial Assessment")}
                  {field(values,"claimStatus","Claim Status")}
                  {field(values,"nextSteps","Next Steps")}
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
                              <button
                                type="button"
                                className="btn-remove-role"
                                onClick={()=>remove(index)}
                              >
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
                    Submit Claim Intimation
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

export default FRM01081_ClaimIntimation;
