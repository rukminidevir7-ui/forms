// FRM01050_SanctionTermsReview.jsx
// FRM-01050 – Sanction Terms Review
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
  facilityType: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01050",
  date: "",
  department: "Treasury & Funding",
  function: "Lending, Borrowing & Credit Facilities",
  referenceNumber: "",
  location: "",
  borrowerName: "",
  facilityReference: "",
  businessUnit: "",
  currency: "",

  /* Facility Overview */
  facilityType: "",
  sanctionedAmount: "",
  tenor: "",
  interestRate: "",
  repaymentTerms: "",

  /* Sanction Terms Table */
  sanctionTerms: [
    { term: "Key Conditions", details: "", dynamicFields:{} },
    { term: "Covenants", details: "", dynamicFields:{} },
    { term: "Security / Collateral", details: "", dynamicFields:{} },
    { term: "Compliance Requirements", details: "", dynamicFields:{} }
  ],

  /* Review Outcome */
  reviewStatus: "",
  exceptionsNoted: "",
  actionsRequired: "",
  remarks: "",

  approvalRoles: [
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01050_SanctionTermsReview = () => {

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
      formId="FRM-01050"
      title="Sanction Terms Review"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Sanction Terms Review Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01050"
              title="SANCTION TERMS REVIEW"
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

              {/* FACILITY OVERVIEW */}
              <div className="form-section">
                <h3 className="form-section-title">Facility Overview</h3>
                <div className="form-fields">
                  {field(values,"facilityType","Facility Type")}
                  {field(values,"sanctionedAmount","Sanctioned Amount")}
                  {field(values,"tenor","Tenor")}
                  {field(values,"interestRate","Interest Rate")}
                  {field(values,"repaymentTerms","Repayment Terms")}
                </div>
              </div>

              {/* SANCTION TERMS TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">Sanction Terms</h3>

                {!isPrintMode && (
                  <div style={{marginBottom:15}}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>

                    <button
                      type="button"
                      className="btn-submit"
                      style={{marginLeft:10}}
                      onClick={()=>setFieldValue("sanctionTerms",[
                        ...values.sanctionTerms,
                        { term:"", details:"", dynamicFields:{} }
                      ])}
                    >
                      + Add Term
                    </button>
                  </div>
                )}

                <FieldArray name="sanctionTerms">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Term</th>
                          <th>Details</th>

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
                        {values.sanctionTerms.map((row,index)=>(
                          <tr key={index}>
                            <td>
                              <Field name={`sanctionTerms.${index}.term`} className="form-input"/>
                            </td>
                            <td>
                              <Field name={`sanctionTerms.${index}.details`} className="form-input"/>
                            </td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field
                                  name={`sanctionTerms.${index}.dynamicFields.${col.key}`}
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

              {/* REVIEW OUTCOME */}
              <div className="form-section">
                <h3 className="form-section-title">Review Outcome</h3>
                <div className="form-fields">
                  {field(values,"reviewStatus","Review Status")}
                  {field(values,"exceptionsNoted","Exceptions Noted")}
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
                    Submit Sanction Terms Review
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

export default FRM01050_SanctionTermsReview;