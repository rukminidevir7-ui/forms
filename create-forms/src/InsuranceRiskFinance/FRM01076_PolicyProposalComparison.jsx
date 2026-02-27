// FRM01076_PolicyProposalComparison.jsx
// FRM-01076 – Policy Proposal Comparison
// Enterprise Grade – Insurance & Risk Finance – Insurance Management

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormAttachments from '../components/FormAttachments';
import FormCustomFields from '../components/FormCustomFields';
import ApprovalSignatureBlock from "../components/ApprovalSignatureBlock";
import '../styles/FRM00611.css';

/* ================= VALIDATION ================= */

const validationSchema = Yup.object({
  businessUnit: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01076",
  date: "",
  department: "Insurance & Risk Finance",
  function: "Insurance Management",
  referenceNumber: "",
  location: "",
  businessUnit: "",
  riskCategory: "",

  comparisonRows: [
    { criteria: "Insurer Name", proposal1: "", proposal2: "", proposal3: "", remarks: "", dynamicFields:{} },
    { criteria: "Coverage Type", proposal1: "", proposal2: "", proposal3: "", remarks: "", dynamicFields:{} },
    { criteria: "Sum Insured", proposal1: "", proposal2: "", proposal3: "", remarks: "", dynamicFields:{} },
    { criteria: "Premium", proposal1: "", proposal2: "", proposal3: "", remarks: "", dynamicFields:{} },
    { criteria: "Deductible", proposal1: "", proposal2: "", proposal3: "", remarks: "", dynamicFields:{} },
    { criteria: "Coverage Limits", proposal1: "", proposal2: "", proposal3: "", remarks: "", dynamicFields:{} },
    { criteria: "Exclusions", proposal1: "", proposal2: "", proposal3: "", remarks: "", dynamicFields:{} },
    { criteria: "Policy Term", proposal1: "", proposal2: "", proposal3: "", remarks: "", dynamicFields:{} },
    { criteria: "Claims History Consideration", proposal1: "", proposal2: "", proposal3: "", remarks: "", dynamicFields:{} }
  ],

  preferredProposal: "",
  justification: "",
  riskConsiderations: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01076_PolicyProposalComparison = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= ADD / REMOVE COLUMN ================= */

  const addColumn = () => {
    const name = prompt("Enter Additional Proposal Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");
    if (dynamicColumns.find(c => c.key === key)) return;
    setDynamicColumns([...dynamicColumns,{ key, label:name }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(c => c.key !== key));
  };

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
      formId="FRM-01076"
      title="Policy Proposal Comparison"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Policy Proposal Comparison Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-01076"
              title="POLICY PROPOSAL COMPARISON"
              department="Insurance & Risk Finance – Insurance Management"
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
                  {field(values,"riskCategory","Risk Category")}
                </div>
              </div>

              {/* POLICY COMPARISON TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">Policy Comparison</h3>

                {!isPrintMode && (
                  <div style={{marginBottom:15}}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Proposal Column
                    </button>

                    <button
                      type="button"
                      className="btn-submit"
                      style={{marginLeft:10}}
                      onClick={()=>setFieldValue("comparisonRows",[
                        ...values.comparisonRows,
                        { criteria:"", proposal1:"", proposal2:"", proposal3:"", remarks:"", dynamicFields:{} }
                      ])}
                    >
                      + Add Criteria Row
                    </button>
                  </div>
                )}

                <FieldArray name="comparisonRows">
                  {({ remove })=>(
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Criteria</th>
                          <th>Proposal 1</th>
                          <th>Proposal 2</th>
                          <th>Proposal 3</th>

                          {dynamicColumns.map(col=>(
                            <th key={col.key}>
                              {col.label}
                              {!isPrintMode && (
                                <button
                                  type="button"
                                  onClick={()=>removeColumn(col.key)}
                                  style={{marginLeft:5}}
                                >
                                  x
                                </button>
                              )}
                            </th>
                          ))}

                          <th>Remarks</th>
                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>

                      <tbody>
                        {values.comparisonRows.map((row,index)=>(
                          <tr key={index}>
                            <td>
                              <Field name={`comparisonRows.${index}.criteria`} className="form-input"/>
                            </td>
                            <td>
                              <Field name={`comparisonRows.${index}.proposal1`} className="form-input"/>
                            </td>
                            <td>
                              <Field name={`comparisonRows.${index}.proposal2`} className="form-input"/>
                            </td>
                            <td>
                              <Field name={`comparisonRows.${index}.proposal3`} className="form-input"/>
                            </td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field
                                  name={`comparisonRows.${index}.dynamicFields.${col.key}`}
                                  className="form-input"
                                />
                              </td>
                            ))}

                            <td>
                              <Field name={`comparisonRows.${index}.remarks`} className="form-input"/>
                            </td>

                            {!isPrintMode && (
                              <td>
                                <button type="button" onClick={()=>remove(index)}>
                                  Remove
                                </button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>
              </div>

              {/* OVERALL ASSESSMENT */}
              <div className="form-section">
                <h3 className="form-section-title">Overall Assessment</h3>
                <div className="form-fields">
                  {field(values,"preferredProposal","Preferred Proposal")}
                  {field(values,"justification","Justification")}
                  {field(values,"riskConsiderations","Risk Considerations")}
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
                    Submit Policy Comparison
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

export default FRM01076_PolicyProposalComparison;