// FRM01045_LoanRequirementNote.jsx
// FRM-01045 / 01046 / 01047 – Loan Requirement Note
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
  businessUnit: Yup.string().required("Required"),
  purposeOfLoan: Yup.string().required("Required"),
  requestedAmount: Yup.number().required("Required"),
  proposedLender: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01045 / 01046 / 01047",
  date: "",
  department: "Treasury & Funding",
  function: "Lending, Borrowing & Credit Facilities",
  referenceNumber: "",
  location: "",
  businessUnit: "",
  currency: "",
  requestedBy: "",
  priority: "",

  /* Loan Details */
  purposeOfLoan: "",
  loanType: "",
  requestedAmount: "",
  proposedLender: "",
  tenor: "",
  repaymentFrequency: "",

  /* Financial Assessment */
  interestRate: "",
  estimatedInterestCost: "",
  collateralSecurity: "",
  covenantsConditions: "",

  /* Utilization Plan */
  utilizationDescription: "",
  expectedDrawdownDate: "",
  cashflowImpact: "",
  remarks: "",

  /* Risk Assessment */
  riskIdentified: "",
  mitigationMeasures: "",
  limitCheckCompleted: "",
  complianceCheckCompleted: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01045_LoanRequirementNote = () => {

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
      formId="FRM-01045"
      title="Loan Requirement Note"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Loan Requirement Note Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01045 / 01046 / 01047"
              title="LOAN REQUIREMENT NOTE"
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
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"currency","Currency")}
                  {field(values,"requestedBy","Requested By")}
                  {field(values,"priority","Priority")}
                </div>
              </div>

              {/* LOAN DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Loan Details</h3>
                <div className="form-fields">
                  {field(values,"purposeOfLoan","Purpose of Loan")}
                  {field(values,"loanType","Loan Type")}
                  {field(values,"requestedAmount","Requested Amount","number")}
                  {field(values,"proposedLender","Proposed Lender")}
                  {field(values,"tenor","Tenor")}
                  {field(values,"repaymentFrequency","Repayment Frequency")}
                </div>
              </div>

              {/* FINANCIAL ASSESSMENT */}
              <div className="form-section">
                <h3 className="form-section-title">Financial Assessment</h3>
                <div className="form-fields">
                  {field(values,"interestRate","Interest Rate (Indicative)","number")}
                  {field(values,"estimatedInterestCost","Estimated Interest Cost","number")}
                  {field(values,"collateralSecurity","Collateral / Security")}
                  {field(values,"covenantsConditions","Covenants / Conditions")}
                </div>
              </div>

              {/* UTILIZATION PLAN */}
              <div className="form-section">
                <h3 className="form-section-title">Utilization Plan</h3>
                <div className="form-fields">
                  {field(values,"utilizationDescription","Utilization Description")}
                  {field(values,"expectedDrawdownDate","Expected Drawdown Date","date")}
                  {field(values,"cashflowImpact","Cashflow Impact")}
                  {field(values,"remarks","Remarks")}
                </div>
              </div>

              {/* RISK ASSESSMENT */}
              <div className="form-section">
                <h3 className="form-section-title">Risk Assessment</h3>
                <div className="form-fields">

                  {field(values,"riskIdentified","Risk Identified")}
                  {field(values,"mitigationMeasures","Mitigation Measures")}

                  <div className="form-field">
                    <label className="form-label">Limit Check Completed</label>
                    <Field as="select" name="limitCheckCompleted" className="form-input">
                      <option value="">Select</option>
                      <option>Yes</option>
                      <option>No</option>
                    </Field>
                  </div>

                  <div className="form-field">
                    <label className="form-label">Compliance Check Completed</label>
                    <Field as="select" name="complianceCheckCompleted" className="form-input">
                      <option value="">Select</option>
                      <option>Yes</option>
                      <option>No</option>
                    </Field>
                  </div>

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
                    Submit Loan Requirement Note
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

export default FRM01045_LoanRequirementNote;