// FRM01051_LoanAgreementReviewChecklist.jsx
// FRM-01051 – Loan Agreement Review Checklist
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
  businessUnit: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01051",
  date: "",
  department: "Treasury & Funding",
  function: "Lending, Borrowing & Credit Facilities",
  referenceNumber: "",
  location: "",
  borrowerName: "",
  facilityReference: "",
  businessUnit: "",
  currency: "",

  checklistItems: [
    { item: "Agreement Parties Verified", status: "", remarks: "", dynamicFields:{} },
    { item: "Facility Terms Match Sanction", status: "", remarks: "", dynamicFields:{} },
    { item: "Interest Rate Clause Verified", status: "", remarks: "", dynamicFields:{} },
    { item: "Repayment Schedule Reviewed", status: "", remarks: "", dynamicFields:{} },
    { item: "Covenants Clearly Defined", status: "", remarks: "", dynamicFields:{} },
    { item: "Security Documentation Attached", status: "", remarks: "", dynamicFields:{} },
    { item: "Default Clauses Reviewed", status: "", remarks: "", dynamicFields:{} },
    { item: "Legal Review Completed", status: "", remarks: "", dynamicFields:{} },
    { item: "Compliance Requirements Listed", status: "", remarks: "", dynamicFields:{} },
    { item: "Execution Copies Signed", status: "", remarks: "", dynamicFields:{} }
  ],

  overallStatus: "",
  keyIssuesIdentified: "",
  actionsRequired: "",
  remarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data:{} },
    { roleName: "Reviewed By", data:{} },
    { roleName: "Approved By", data:{} }
  ],

  attachments: [],
  customFields: []
};

const FRM01051_LoanAgreementReviewChecklist = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= COLUMN MANAGEMENT ================= */

  const addColumn = () => {
    const name = prompt("Enter New Column Name");
    if (!name) return;

    const key = name.replace(/\s+/g,"");
    if (dynamicColumns.find(col => col.key === key)) {
      alert("Column already exists");
      return;
    }

    setDynamicColumns([...dynamicColumns,{ key, label:name }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
  };

  const field = (values,name,label,type="text") => (
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
      formId="FRM-01051"
      title="Loan Agreement Review Checklist"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Loan Agreement Review Checklist Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01051"
              title="LOAN AGREEMENT REVIEW CHECKLIST"
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

              {/* CHECKLIST TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">Checklist Items</h3>

                {!isPrintMode && (
                  <div style={{marginBottom:15}}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>

                    <button
                      type="button"
                      className="btn-submit"
                      style={{marginLeft:10}}
                      onClick={()=>setFieldValue("checklistItems",[
                        ...values.checklistItems,
                        { item:"", status:"", remarks:"", dynamicFields:{} }
                      ])}
                    >
                      + Add Checklist Item
                    </button>
                  </div>
                )}

                <FieldArray name="checklistItems">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Item Description</th>
                          <th>Status (Yes/No)</th>
                          <th>Remarks</th>

                          {dynamicColumns.map(col=>(
                            <th key={col.key}>
                              {col.label}
                              {!isPrintMode &&
                                <button type="button" onClick={()=>removeColumn(col.key)}>x</button>
                              }
                            </th>
                          ))}

                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {values.checklistItems.map((row,index)=>(
                          <tr key={index}>
                            <td>
                              <Field name={`checklistItems.${index}.item`} className="form-input"/>
                            </td>
                            <td>
                              <Field as="select" name={`checklistItems.${index}.status`} className="form-input">
                                <option value="">Select</option>
                                <option>Yes</option>
                                <option>No</option>
                              </Field>
                            </td>
                            <td>
                              <Field name={`checklistItems.${index}.remarks`} className="form-input"/>
                            </td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field
                                  name={`checklistItems.${index}.dynamicFields.${col.key}`}
                                  className="form-input"
                                />
                              </td>
                            ))}

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
                  )}
                </FieldArray>
              </div>

              {/* CHECKLIST SUMMARY */}
              <div className="form-section">
                <h3 className="form-section-title">Checklist Summary</h3>
                <div className="form-fields">
                  {field(values,"overallStatus","Overall Status")}
                  {field(values,"keyIssuesIdentified","Key Issues Identified")}
                  {field(values,"actionsRequired","Actions Required")}
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
                    Submit Loan Agreement Review
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

export default FRM01051_LoanAgreementReviewChecklist;