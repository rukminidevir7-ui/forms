// FRM01049_CreditAppraisalMemo.jsx
// FRM-01049 – Credit Appraisal Memo
// Enterprise Grade – Treasury & Funding – Lending, Borrowing & Credit Facilities

import React, { useState } from "react";
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
  businessUnit: Yup.string().required("Required"),
  facilityType: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01049",
  date: "",
  department: "Treasury & Funding",
  function: "Lending, Borrowing & Credit Facilities",
  referenceNumber: "",
  location: "",
  borrowerName: "",
  loanReference: "",
  businessUnit: "",
  currency: "",

  /* Borrower Profile */
  businessDescription: "",
  industry: "",
  yearsInOperation: "",
  managementOverview: "",

  /* Financial Analysis */
  financialMetrics: [
    { metric: "Revenue", value: "" },
    { metric: "EBITDA", value: "" },
    { metric: "Net Profit", value: "" },
    { metric: "Debt Levels", value: "" },
    { metric: "Key Ratios", value: "" }
  ],

  /* Facility Details */
  facilityType: "",
  amount: "",
  tenor: "",
  repaymentTerms: "",
  interestRate: "",

  /* Risk Assessment */
  riskItems: [
    { risk: "Key Risks", details: "" },
    { risk: "Mitigation Measures", details: "" },
    { risk: "Credit Rating", details: "" },
    { risk: "Covenants", details: "" }
  ],

  /* Recommendation */
  decision: "",
  conditions: "",
  remarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01049_CreditAppraisalMemo = () => {

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
      formId="FRM-01049"
      title="Credit Appraisal Memo"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Credit Appraisal Memo Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01049"
              title="CREDIT APPRAISAL MEMO"
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
                  {field(values,"loanReference","Loan Reference")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"currency","Currency")}
                </div>
              </div>

              {/* BORROWER PROFILE */}
              <div className="form-section">
                <h3 className="form-section-title">Borrower Profile</h3>
                <div className="form-fields">
                  {field(values,"businessDescription","Business Description")}
                  {field(values,"industry","Industry")}
                  {field(values,"yearsInOperation","Years in Operation")}
                  {field(values,"managementOverview","Management Overview")}
                </div>
              </div>

              {/* FINANCIAL ANALYSIS */}
              <div className="form-section">
                <h3 className="form-section-title">Financial Analysis</h3>

                <FieldArray name="financialMetrics">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode &&
                        <button
                          type="button"
                          className="btn-submit"
                          style={{ marginBottom: 15 }}
                          onClick={()=>push({ metric:"", value:"" })}
                        >
                          + Add Financial Metric
                        </button>
                      }

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Metric</th>
                            <th>Value</th>
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {values.financialMetrics.map((row,index)=>(
                            <tr key={index}>
                              <td>
                                <Field name={`financialMetrics.${index}.metric`} className="form-input"/>
                              </td>
                              <td>
                                <Field name={`financialMetrics.${index}.value`} className="form-input"/>
                              </td>
                              {!isPrintMode &&
                                <td>
                                  <button type="button" onClick={()=>remove(index)}>
                                    Remove
                                  </button>
                                </td>
                              }
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </FieldArray>
              </div>

              {/* FACILITY DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Facility Details</h3>
                <div className="form-fields">
                  {field(values,"facilityType","Facility Type")}
                  {field(values,"amount","Amount")}
                  {field(values,"tenor","Tenor")}
                  {field(values,"repaymentTerms","Repayment Terms")}
                  {field(values,"interestRate","Interest Rate")}
                </div>
              </div>

              {/* RISK ASSESSMENT */}
              <div className="form-section">
                <h3 className="form-section-title">Risk Assessment</h3>

                <FieldArray name="riskItems">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode &&
                        <button
                          type="button"
                          className="btn-submit"
                          style={{ marginBottom: 15 }}
                          onClick={()=>push({ risk:"", details:"" })}
                        >
                          + Add Risk Item
                        </button>
                      }

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Risk Area</th>
                            <th>Details</th>
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {values.riskItems.map((row,index)=>(
                            <tr key={index}>
                              <td>
                                <Field name={`riskItems.${index}.risk`} className="form-input"/>
                              </td>
                              <td>
                                <Field name={`riskItems.${index}.details`} className="form-input"/>
                              </td>
                              {!isPrintMode &&
                                <td>
                                  <button type="button" onClick={()=>remove(index)}>
                                    Remove
                                  </button>
                                </td>
                              }
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </FieldArray>
              </div>

              {/* RECOMMENDATION */}
              <div className="form-section">
                <h3 className="form-section-title">Recommendation</h3>
                <div className="form-fields">
                  {field(values,"decision","Decision")}
                  {field(values,"conditions","Conditions")}
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
                    Submit Credit Appraisal Memo
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

export default FRM01049_CreditAppraisalMemo;