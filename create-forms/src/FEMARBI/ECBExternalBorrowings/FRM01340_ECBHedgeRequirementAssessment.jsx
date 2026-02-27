// FRM01340_ECBHedgeRequirementAssessment.jsx
// FRM-01340 – ECB Hedge Requirement Assessment Checklist
// Enterprise Grade – FEMA & RBI – ECB / External Borrowings

import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePrintMode } from "../../PrintModeContext";
import ModernFormWrapper from "../../components/ModernFormWrapper";
import ModernA4Template from "../../components/ModernA4Template";
import ApprovalSignatureBlock from "../../components/ApprovalSignatureBlock";
import FormCustomFields from "../../components/FormCustomFields";
import "../../styles/FRM00611.css";

/* ================= VALIDATION ================= */

const validationSchema = Yup.object({
  companyName: Yup.string().required("Required"),
  lenderName: Yup.string().required("Required"),
});

/* ================= DEFAULT CHECKLIST ================= */

const defaultColumns = [
  { key: "item", label: "Item" },
  { key: "status", label: "Yes / No / NA" },
  { key: "remarks", label: "Remarks" }
];

const defaultChecklist = [
  "Applicable hedging regulations identified",
  "Minimum hedge percentage determined",
  "Hedge tenor aligned with loan maturity",
  "Eligible hedging instruments identified",
  "Hedge cost evaluated",
  "Counterparty eligibility verified",
  "Hedge documentation reviewed",
  "Ongoing monitoring mechanism defined",
  "Accounting treatment assessed",
  "Regulatory compliance confirmed"
];

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01340",
  department: "FEMA & RBI",
  function: "ECB / External Borrowings",

  companyName: "",
  cin: "",
  pan: "",
  authorizedDealerBank: "",
  businessUnit: "",
  formReferenceNo: "",
  checklistDate: "",
  preparedBy: "",

  lenderName: "",
  loanReference: "",
  currency: "",
  totalFacilityAmount: "",
  outstandingBalance: "",
  tenure: "",
  interestType: "",
  hedgePercentageRequired: "",
  hedgeCoverageAchieved: "",
  hedgeStartDate: "",
  hedgeEndDate: "",

  checklistColumns: defaultColumns,

  checklistItems: defaultChecklist.map(item => ({
    item,
    status: "",
    remarks: ""
  })),

  approvalRoles: [
    { roleName: "Prepared By (Name & Signature)", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  customFields: []
};

/* ================= COMPONENT ================= */

const FRM01340_ECBHedgeRequirementAssessment = () => {

  const { isPrintMode } = usePrintMode();

  return (
    <ModernFormWrapper formId="FRM-01340" title="ECB Hedge Requirement Assessment Checklist">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("ECB Hedge Requirement Assessment Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01340"
              title="FRM-01340 — ECB Hedge Requirement Assessment Checklist"
              department="FEMA & RBI (Foreign Exchange) | ECB / External Borrowings"
            >

              {/* 1 Organization */}
              <div className="form-section">
                <h3 className="form-section-title">Organization Information</h3>
                <div className="form-fields">
                  <Field name="companyName" className="form-input" placeholder="Company Name"/>
                  <Field name="cin" className="form-input" placeholder="CIN"/>
                  <Field name="pan" className="form-input" placeholder="PAN"/>
                  <Field name="authorizedDealerBank" className="form-input" placeholder="Authorized Dealer Bank"/>
                  <Field name="businessUnit" className="form-input" placeholder="Business Unit"/>
                  <Field name="formReferenceNo" className="form-input" placeholder="Form Reference No"/>
                  <Field name="checklistDate" type="date" className="form-input"/>
                  <Field name="preparedBy" className="form-input" placeholder="Prepared By"/>
                </div>
              </div>

              {/* 2 Loan Details */}
              <div className="form-section">
                <h3 className="form-section-title">Loan Details</h3>
                <div className="form-fields">
                  <Field name="lenderName" className="form-input" placeholder="Lender Name"/>
                  <Field name="loanReference" className="form-input" placeholder="Loan Reference"/>
                  <Field name="currency" className="form-input" placeholder="Currency"/>
                  <Field name="totalFacilityAmount" className="form-input" placeholder="Total Facility Amount"/>
                  <Field name="outstandingBalance" className="form-input" placeholder="Outstanding Balance"/>
                  <Field name="tenure" className="form-input" placeholder="Tenure"/>
                </div>
              </div>

              {/* 3 Dynamic Checklist */}
              <div className="form-section">
                <h3 className="form-section-title">Hedge Requirement Checklist</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: "10px" }}>
                    <button
                      type="button"
                      className="btn-submit"
                      onClick={() => {
                        const newKey = `col${Date.now()}`;
                        setFieldValue("checklistColumns", [
                          ...values.checklistColumns,
                          { key: newKey, label: "New Column" }
                        ]);

                        const updatedRows = values.checklistItems.map(row => ({
                          ...row,
                          [newKey]: ""
                        }));

                        setFieldValue("checklistItems", updatedRows);
                      }}
                    >
                      + Add Column
                    </button>
                  </div>
                )}

                <FieldArray name="checklistItems">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <div style={{ marginBottom: "10px" }}>
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={() => {
                              const newRow = {};
                              values.checklistColumns.forEach(col => {
                                newRow[col.key] = "";
                              });
                              push(newRow);
                            }}
                          >
                            + Add Checklist Row
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            {values.checklistColumns.map((col, colIndex) => (
                              <th key={col.key}>
                                {!isPrintMode ? (
                                  <>
                                    <Field
                                      name={`checklistColumns.${colIndex}.label`}
                                      className="form-input"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updatedColumns = values.checklistColumns.filter((_, i) => i !== colIndex);
                                        setFieldValue("checklistColumns", updatedColumns);

                                        const updatedRows = values.checklistItems.map(row => {
                                          const newRow = { ...row };
                                          delete newRow[col.key];
                                          return newRow;
                                        });

                                        setFieldValue("checklistItems", updatedRows);
                                      }}
                                    >
                                      X
                                    </button>
                                  </>
                                ) : col.label}
                              </th>
                            ))}
                            {!isPrintMode && <th>Remove</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {values.checklistItems.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {values.checklistColumns.map(col => (
                                <td key={col.key}>
                                  {col.key === "status" ? (
                                    <Field
                                      as="select"
                                      name={`checklistItems.${rowIndex}.${col.key}`}
                                      className="form-input"
                                    >
                                      <option value="">Select</option>
                                      <option>YES</option>
                                      <option>NO</option>
                                      <option>NA</option>
                                    </Field>
                                  ) : (
                                    <Field
                                      name={`checklistItems.${rowIndex}.${col.key}`}
                                      className="form-input"
                                    />
                                  )}
                                </td>
                              ))}
                              {!isPrintMode && (
                                <td>
                                  <button type="button" onClick={() => remove(rowIndex)}>
                                    Remove
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </FieldArray>
              </div>

              {/* 4 Sign-off (Add / Remove Role) */}
              <div className="form-section">
                <h3 className="form-section-title">Sign-off</h3>

                <FieldArray name="approvalRoles">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={() => push({ roleName: "New Role", data: {} })}
                        >
                          + Add Role
                        </button>
                      )}

                      <div className="three-column-signatures">
                        {values.approvalRoles.map((role, index) => (
                          <div key={index}>
                            <ApprovalSignatureBlock
                              roleName={role.roleName}
                              value={role.data}
                              allowRoleEdit={true}
                              onRoleNameChange={(val)=>setFieldValue(`approvalRoles.${index}.roleName`,val)}
                              onChange={(val)=>setFieldValue(`approvalRoles.${index}.data`,val)}
                            />
                            {!isPrintMode && (
                              <button type="button" onClick={() => remove(index)}>
                                Remove
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </FieldArray>
              </div>

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Hedge Requirement Assessment
                  </button>
                </div>
              )}

            </ModernA4Template>
          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM01340_ECBHedgeRequirementAssessment;