// FRM01066_RestructuringProposal.jsx
// FRM-01066 / 01067 / 01068 – Restructuring Proposal
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
  outstandingAmount: Yup.number().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01066 / 01067 / 01068",
  date: "",
  department: "Treasury & Funding",
  function: "Lending, Borrowing & Credit Facilities",
  referenceNumber: "",
  location: "",
  borrowerName: "",
  facilityReference: "",
  businessUnit: "",
  currency: "",

  /* Current Facility Position */
  facilityType: "",
  outstandingAmount: "",
  currentInterestRate: "",
  remainingTenor: "",
  currentRepaymentTerms: "",

  /* Proposed Changes */
  proposedStructure: "",
  revisedInterestRate: "",
  revisedTenor: "",
  revisedRepaymentTerms: "",
  additionalFundingRequired: "",

  /* Impact Analysis */
  financialImpact: "",
  cashflowImpact: "",
  riskAssessment: "",
  rationale: "",

  /* Compliance Checks */
  covenantImpactAssessed: "",
  approvalsRequired: "",
  documentationUpdatesRequired: "",

  /* Authorization */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01066_RestructuringProposal = () => {

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
      formId="FRM-01066"
      title="Restructuring Proposal"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Restructuring Proposal Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01066 / 01067 / 01068"
              title="RESTRUCTURING PROPOSAL"
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

              {/* CURRENT FACILITY POSITION */}
              <div className="form-section">
                <h3 className="form-section-title">Current Facility Position</h3>
                <div className="form-fields">
                  {field(values,"facilityType","Facility Type")}
                  {field(values,"outstandingAmount","Outstanding Amount","number")}
                  {field(values,"currentInterestRate","Current Interest Rate (%)","number")}
                  {field(values,"remainingTenor","Remaining Tenor")}
                  {field(values,"currentRepaymentTerms","Current Repayment Terms")}
                </div>
              </div>

              {/* PROPOSED CHANGES */}
              <div className="form-section">
                <h3 className="form-section-title">Proposed Changes</h3>
                <div className="form-fields">
                  {field(values,"proposedStructure","Proposed Structure")}
                  {field(values,"revisedInterestRate","Revised Interest Rate (%)","number")}
                  {field(values,"revisedTenor","Revised Tenor")}
                  {field(values,"revisedRepaymentTerms","Revised Repayment Terms")}
                  {field(values,"additionalFundingRequired","Additional Funding Required","number")}
                </div>
              </div>

              {/* IMPACT ANALYSIS */}
              <div className="form-section">
                <h3 className="form-section-title">Impact Analysis</h3>
                <div className="form-fields">
                  {field(values,"financialImpact","Financial Impact")}
                  {field(values,"cashflowImpact","Cashflow Impact")}
                  {field(values,"riskAssessment","Risk Assessment")}
                  {field(values,"rationale","Rationale")}
                </div>
              </div>

              {/* COMPLIANCE CHECKS */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Checks</h3>
                <div className="form-fields">
                  {field(values,"covenantImpactAssessed","Covenant Impact Assessed (Yes/No)")}
                  {field(values,"approvalsRequired","Approvals Required")}
                  {field(values,"documentationUpdatesRequired","Documentation Updates Required")}
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
                    Submit Restructuring Proposal
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

export default FRM01066_RestructuringProposal;