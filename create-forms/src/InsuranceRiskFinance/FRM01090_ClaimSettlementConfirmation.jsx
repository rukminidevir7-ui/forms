// FRM01090_ClaimSettlementConfirmation.jsx
// FRM-01090 – Claim Settlement Confirmation
// Enterprise Grade – Insurance & Risk Finance – Insurance Management

import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
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
  claimAmount: Yup.string().required("Required"),
  approvedAmount: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01090",
  date: "",
  department: "Insurance & Risk Finance",
  function: "Insurance Management",
  referenceNumber: "",
  location: "",
  businessUnit: "",
  claimReference: "",
  preparedBy: "",
  contactDetails: "",

  policyNumber: "",
  insurerName: "",
  policyType: "",
  policyPeriodFrom: "",
  policyPeriodTo: "",

  dateOfLoss: "",
  claimAmount: "",
  approvedAmount: "",
  settlementDate: "",
  paymentReference: "",
  settlementMethod: "",

  varianceAmount: "",
  reasonForVariance: "",
  keyObservations: "",
  remarks: "",

  settlementStatus: "",
  documentsVerified: "",
  nextActions: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01090_ClaimSettlementConfirmation = () => {

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
      formId="FRM-01090"
      title="Claim Settlement Confirmation"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Claim Settlement Confirmation Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01090"
              title="CLAIM SETTLEMENT CONFIRMATION"
              department="Insurance & Risk Finance – Insurance Management"
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
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"claimReference","Claim Reference")}
                  {field(values,"preparedBy","Prepared By")}
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

              {/* SETTLEMENT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Settlement Details</h3>
                <div className="form-fields">
                  {field(values,"dateOfLoss","Date of Loss","date")}
                  {field(values,"claimAmount","Claim Amount","number")}
                  {field(values,"approvedAmount","Approved Amount","number")}
                  {field(values,"settlementDate","Settlement Date","date")}
                  {field(values,"paymentReference","Payment Reference")}
                  {field(values,"settlementMethod","Settlement Method")}
                </div>
              </div>

              {/* VARIANCE & NOTES */}
              <div className="form-section">
                <h3 className="form-section-title">Variance and Notes</h3>
                <div className="form-fields">
                  {field(values,"varianceAmount","Variance Amount","number")}
                  {field(values,"reasonForVariance","Reason for Variance")}
                  {field(values,"keyObservations","Key Observations")}
                  {field(values,"remarks","Remarks")}
                </div>
              </div>

              {/* CONFIRMATION */}
              <div className="form-section">
                <h3 className="form-section-title">Confirmation</h3>
                <div className="form-fields">
                  {field(values,"settlementStatus","Settlement Status")}
                  {field(values,"documentsVerified","Documents Verified")}
                  {field(values,"nextActions","Next Actions")}
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
                    Submit Claim Settlement Confirmation
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

export default FRM01090_ClaimSettlementConfirmation;