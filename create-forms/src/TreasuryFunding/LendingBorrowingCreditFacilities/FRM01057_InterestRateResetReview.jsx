// FRM01057_InterestRateResetReview.jsx
// FRM-01057 – Interest Rate Reset Review
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
  currentInterestRate: Yup.string().required("Required"),
  nextResetDate: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01057",
  date: "",
  department: "Treasury & Funding",
  function: "Lending, Borrowing & Credit Facilities",
  referenceNumber: "",
  location: "",
  borrowerName: "",
  facilityReference: "",
  businessUnit: "",
  currency: "",

  /* Facility Details */
  facilityType: "",
  outstandingAmount: "",
  currentInterestRate: "",
  benchmarkRate: "",
  spread: "",
  nextResetDate: "",

  /* Reset Analysis */
  proposedNewRate: "",
  changeInRate: "",
  interestImpact: "",
  reasonForChange: "",

  /* Financial Impact */
  estimatedInterestCostChange: "",
  cashflowImpact: "",
  budgetImpact: "",
  remarks: "",

  /* Compliance */
  covenantComplianceConfirmed: "",
  documentationUpdated: "",
  approvalRequired: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01057_InterestRateResetReview = () => {

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
      formId="FRM-01057"
      title="Interest Rate Reset Review"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Interest Rate Reset Review Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01057"
              title="INTEREST RATE RESET REVIEW"
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

              {/* FACILITY DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Facility Details</h3>
                <div className="form-fields">
                  {field(values,"facilityType","Facility Type")}
                  {field(values,"outstandingAmount","Outstanding Amount","number")}
                  {field(values,"currentInterestRate","Current Interest Rate (%)","number")}
                  {field(values,"benchmarkRate","Benchmark Rate (%)","number")}
                  {field(values,"spread","Spread (%)","number")}
                  {field(values,"nextResetDate","Next Reset Date","date")}
                </div>
              </div>

              {/* RESET ANALYSIS */}
              <div className="form-section">
                <h3 className="form-section-title">Reset Analysis</h3>
                <div className="form-fields">
                  {field(values,"proposedNewRate","Proposed New Rate (%)","number")}
                  {field(values,"changeInRate","Change in Rate (%)","number")}
                  {field(values,"interestImpact","Interest Impact")}
                  {field(values,"reasonForChange","Reason for Change")}
                </div>
              </div>

              {/* FINANCIAL IMPACT */}
              <div className="form-section">
                <h3 className="form-section-title">Financial Impact</h3>
                <div className="form-fields">
                  {field(values,"estimatedInterestCostChange","Estimated Interest Cost Change","number")}
                  {field(values,"cashflowImpact","Cashflow Impact")}
                  {field(values,"budgetImpact","Budget Impact")}
                  {field(values,"remarks","Remarks")}
                </div>
              </div>

              {/* COMPLIANCE CHECKS */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Checks</h3>
                <div className="form-fields">
                  {yesNoField("covenantComplianceConfirmed","Covenant Compliance Confirmed")}
                  {yesNoField("documentationUpdated","Documentation Updated")}
                  {yesNoField("approvalRequired","Approval Required")}
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
                    Submit Interest Rate Reset Review
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

export default FRM01057_InterestRateResetReview;