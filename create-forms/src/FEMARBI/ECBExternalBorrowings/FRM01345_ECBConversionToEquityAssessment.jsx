// FRM01345_ECBConversionToEquityAssessment.jsx
// FRM-01345 – ECB Conversion to Equity Assessment Checklist
// Enterprise Grade – FEMA & RBI – ECB / External Borrowings

import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
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
});

/* ================= DEFAULT CHECKLIST ITEMS ================= */

const defaultChecklistItems = [
  "Eligibility under ECB guidelines verified",
  "Pricing guidelines compliance confirmed",
  "Valuation certificate obtained",
  "Board/shareholder approvals obtained",
  "Sectoral caps compliance confirmed",
  "FEMA regulations compliance verified",
  "All-in-cost implications reviewed",
  "Regulatory filings identified",
  "Accounting treatment assessed",
  "Tax implications evaluated"
];

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01345",
  department: "FEMA & RBI",
  function: "ECB / External Borrowings",

  companyName: "",
  cin: "",
  pan: "",
  authorizedDealerBank: "",
  checklistDate: "",
  preparedBy: "",

  lenderName: "",
  loanReference: "",
  currency: "",
  outstandingBalance: "",
  conversionAmount: "",
  proposedConversionDate: "",

  checklistItems: defaultChecklistItems.map(text => ({
    item: text,
    status: "",
    remarks: ""
  })),

  observations: [
    { title: "Key Observations", value: "" },
    { title: "Compliance Gaps", value: "" },
    { title: "Actions Required", value: "" }
  ],

  approvalRoles: [
    { roleName: "Prepared By (Name & Signature)", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  customFields: []
};

/* ================= COMPONENT ================= */

const FRM01345_ECBConversionToEquityAssessment = () => {

  const { isPrintMode } = usePrintMode();

  return (
    <ModernFormWrapper formId="FRM-01345" title="ECB Conversion to Equity Assessment Checklist">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("ECB Conversion to Equity Assessment Submitted Successfully");
        }}
      >
        {({ values }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01345"
              title="FRM-01345 — ECB Conversion to Equity Assessment Checklist"
              department="FEMA & RBI (Foreign Exchange) | ECB / External Borrowings"
            >

              {/* 1 Organization Information */}
              <div className="form-section">
                <h3 className="form-section-title">Organization Information</h3>
                <div className="form-fields">
                  <Field name="companyName" placeholder="Company Name" className="form-input"/>
                  <Field name="cin" placeholder="CIN" className="form-input"/>
                  <Field name="pan" placeholder="PAN" className="form-input"/>
                  <Field name="authorizedDealerBank" placeholder="Authorized Dealer Bank" className="form-input"/>
                  <Field name="checklistDate" type="date" className="form-input"/>
                  <Field name="preparedBy" placeholder="Prepared By" className="form-input"/>
                </div>
              </div>

              {/* 2 Loan Details */}
              <div className="form-section">
                <h3 className="form-section-title">Loan Details</h3>
                <div className="form-fields">
                  <Field name="lenderName" placeholder="Lender Name" className="form-input"/>
                  <Field name="loanReference" placeholder="Loan Reference" className="form-input"/>
                  <Field name="currency" placeholder="Currency" className="form-input"/>
                  <Field name="outstandingBalance" placeholder="Outstanding Balance" className="form-input"/>
                  <Field name="conversionAmount" placeholder="Conversion Amount" className="form-input"/>
                  <Field name="proposedConversionDate" type="date" className="form-input"/>
                </div>
              </div>

              {/* 3 Conversion Compliance Checklist */}
              <div className="form-section">
                <h3 className="form-section-title">Conversion Compliance Checklist</h3>

                <FieldArray name="checklistItems">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <div style={{ marginBottom: "10px" }}>
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={() => push({ item: "", status: "", remarks: "" })}
                          >
                            + Add Checklist Item
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Item</th>
                            <th>Yes / No / NA</th>
                            <th>Remarks</th>
                          </tr>
                        </thead>

                        <tbody>
                          {values.checklistItems.map((row, index) => (
                            <tr key={index}>
                              <td>
                                <Field
                                  name={`checklistItems.${index}.item`}
                                  className="form-input"
                                />
                              </td>

                              <td>
                                <Field
                                  as="select"
                                  name={`checklistItems.${index}.status`}
                                  className="form-input"
                                >
                                  <option value="">Select</option>
                                  <option>YES</option>
                                  <option>NO</option>
                                  <option>NA</option>
                                </Field>
                              </td>

                              <td>
                                <Field
                                  name={`checklistItems.${index}.remarks`}
                                  className="form-input"
                                />
                              </td>

                              {!isPrintMode && (
                                <td>
                                  <button type="button" onClick={() => remove(index)}>
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

              {/* 4 Observations */}
              <div className="form-section">
                <h3 className="form-section-title">Observations</h3>

                <FieldArray name="observations">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <div style={{ marginBottom: "10px" }}>
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={() => push({ title: "New Observation", value: "" })}
                          >
                            + Add Observation
                          </button>
                        </div>
                      )}

                      {values.observations.map((obs, index) => (
                        <div key={index} className="form-field">
                          <Field name={`observations.${index}.title`} className="form-input"/>
                          <Field name={`observations.${index}.value`} className="form-input"/>
                          {!isPrintMode && (
                            <button type="button" onClick={() => remove(index)}>
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </FieldArray>
              </div>

              <FormCustomFields values={values} />

              {/* 5 Sign-off */}
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
                              allowRoleEdit={!isPrintMode}
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
                    Submit ECB Conversion to Equity Assessment
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

export default FRM01345_ECBConversionToEquityAssessment;