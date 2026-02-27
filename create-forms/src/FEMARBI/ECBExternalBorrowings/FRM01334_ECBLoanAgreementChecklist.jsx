// FRM01334_ECBLoanAgreementChecklist.jsx
// FRM-01334 – ECB Loan Agreement Checklist
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
  cin: Yup.string().required("Required"),
  pan: Yup.string().required("Required"),
});

/* ================= DEFAULT CHECKLIST ITEMS ================= */

const defaultChecklist = [
  "Borrower and lender details correctly stated",
  "Facility amount and currency confirmed",
  "Interest rate and pricing terms verified",
  "Repayment schedule included",
  "Security / collateral terms included",
  "Covenants and conditions reviewed",
  "ECB regulatory clauses included",
  "All-in-cost compliance confirmed",
  "End-use clause compliant with regulations",
  "Events of default defined",
  "Governing law and jurisdiction specified",
  "Execution and signature blocks included"
];

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01334",
  department: "FEMA & RBI",
  function: "ECB / External Borrowings",

  /* 1 Organization */
  companyName: "",
  cin: "",
  pan: "",
  authorizedDealerBank: "",
  checklistDate: "",
  preparedBy: "",

  /* 2 Checklist */
  checklistItems: defaultChecklist.map(item => ({
    item,
    status: "",
    remarks: ""
  })),

  /* 3 Observations */
  observations: [
    { title: "Key Observations", value: "" },
    { title: "Compliance Gaps", value: "" },
    { title: "Actions Required", value: "" }
  ],

  /* 4 Sign-off */
  approvalRoles: [
    { roleName: "Prepared By (Name & Signature)", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  workflowStatus: "",
  comments: "",
  customFields: []
};

/* ================= COMPONENT ================= */

const FRM01334_ECBLoanAgreementChecklist = () => {

  const { isPrintMode } = usePrintMode();

  return (
    <ModernFormWrapper formId="FRM-01334" title="ECB Loan Agreement Checklist">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("ECB Loan Agreement Checklist Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01334"
              title="FRM-01334 — ECB Loan Agreement Checklist"
              department="FEMA & RBI (Foreign Exchange) | ECB / External Borrowings"
            >

              {/* 1 Organization */}
              <div className="form-section">
                <h3 className="form-section-title">Organization Information</h3>
                <div className="form-fields">
                  <Field name="companyName" placeholder="Company Name" className="form-input"/>
                  <ErrorMessage name="companyName" component="div" className="form-error"/>

                  <Field name="cin" placeholder="CIN" className="form-input"/>
                  <ErrorMessage name="cin" component="div" className="form-error"/>

                  <Field name="pan" placeholder="PAN" className="form-input"/>
                  <ErrorMessage name="pan" component="div" className="form-error"/>

                  <Field name="authorizedDealerBank" placeholder="Authorized Dealer Bank" className="form-input"/>
                  <Field name="checklistDate" type="date" className="form-input"/>
                  <Field name="preparedBy" placeholder="Prepared By" className="form-input"/>
                </div>
              </div>

              {/* 2 Checklist Table */}
              <div className="form-section">
                <h3 className="form-section-title">Loan Agreement Compliance Checklist</h3>

                <FieldArray name="checklistItems">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode &&
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={() => push({ item: "", status: "", remarks: "" })}
                        >
                          + Add Checklist Item
                        </button>
                      }

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Item</th>
                            <th>Yes / No / NA</th>
                            <th>Remarks</th>
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {values.checklistItems.map((item, index) => (
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
                              {!isPrintMode &&
                                <td>
                                  <button type="button" onClick={() => remove(index)}>
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

              {/* 3 Observations */}
              <div className="form-section">
                <h3 className="form-section-title">Observations</h3>

                <FieldArray name="observations">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode &&
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={() => push({ title: "New Observation", value: "" })}
                        >
                          + Add Observation Field
                        </button>
                      }

                      {values.observations.map((obs, index) => (
                        <div key={index} className="form-field">
                          <Field
                            name={`observations.${index}.title`}
                            className="form-input"
                          />
                          <Field
                            name={`observations.${index}.value`}
                            className="form-input"
                          />
                          {!isPrintMode &&
                            <button type="button" onClick={() => remove(index)}>
                              Remove
                            </button>
                          }
                        </div>
                      ))}
                    </>
                  )}
                </FieldArray>
              </div>

              <FormCustomFields values={values} />

              {/* 4 Sign-off (Editable Roles) */}
              <div className="form-section">
                <h3 className="form-section-title">Sign-off</h3>

                <FieldArray name="approvalRoles">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode &&
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={() => push({ roleName: "New Role", data: {} })}
                        >
                          + Add Role
                        </button>
                      }

                      <div className="three-column-signatures">
                        {values.approvalRoles.map((role, index) => (
                          <div key={index}>
                            <ApprovalSignatureBlock
                              roleName={role.roleName}
                              value={role.data}
                              allowRoleEdit={true}
                              onRoleNameChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.roleName`, val)
                              }
                              onChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.data`, val)
                              }
                            />
                            {!isPrintMode &&
                              <button type="button" onClick={() => remove(index)}>
                                Remove
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
                    Submit ECB Loan Agreement Checklist
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

export default FRM01334_ECBLoanAgreementChecklist;