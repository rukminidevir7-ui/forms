// FRM00822_CostingAuditChecklist.jsx
// FRM-00822 – Costing Audit Checklist – Checklist
// Enterprise Grade – Preloaded Controls + Dynamic Rows & Columns + Signature Workflow

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
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
  companyName: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  auditPeriod: Yup.string().required("Required"),
  auditDate: Yup.string().required("Required"),
  businessUnit: Yup.string().required("Required"),
  auditLead: Yup.string().required("Required")
});

/* ================= PRELOADED CHECKLIST ================= */

const initialChecklist = [
  { controlArea:"Cost Master Data", item:"Cost elements and rates validated", status:"", remarks:"", dynamicFields:{} },
  { controlArea:"Standard Costing", item:"Standard cost updated and approved", status:"", remarks:"", dynamicFields:{} },
  { controlArea:"Variance Analysis", item:"Variances reviewed and documented", status:"", remarks:"", dynamicFields:{} },
  { controlArea:"Overhead Allocation", item:"Allocation basis validated", status:"", remarks:"", dynamicFields:{} },
  { controlArea:"Inventory Valuation", item:"Valuation method consistent", status:"", remarks:"", dynamicFields:{} },
  { controlArea:"WIP Valuation", item:"WIP calculations verified", status:"", remarks:"", dynamicFields:{} },
  { controlArea:"Controls", item:"Approval workflows followed", status:"", remarks:"", dynamicFields:{} }
];

const initialValues = {
  companyName: "",
  department: "",
  auditPeriod: "",
  auditDate: "",
  businessUnit: "",
  auditLead: "",

  checklist: initialChecklist,

  preparedSignature: {},
  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00822_CostingAuditChecklist = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= COLUMN LOGIC ================= */

  const addColumn = () => {
    const columnName = prompt("Enter Column Name");
    if (!columnName) return;

    const key = columnName.replace(/\s+/g, "");
    if (dynamicColumns.find(col => col.key === key)) {
      alert("Column already exists");
      return;
    }

    setDynamicColumns([...dynamicColumns, { key, label: columnName }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
  };

  return (
    <ModernFormWrapper
      formId="FRM-00822"
      title="Costing Audit Checklist"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Costing Audit Checklist Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00822"
              title="COSTING AUDIT CHECKLIST"
              department="Finance & Accounting – Costing & Management Accounting"
            >

              {/* ================= MAIN FORM ================= */}
              <div className="form-section">
                <div className="form-fields">
                  <Field name="companyName" placeholder="Company Name" className="form-input"/>
                  <Field name="department" placeholder="Department" className="form-input"/>
                  <Field name="auditPeriod" placeholder="Audit Period" className="form-input"/>
                  <Field name="auditDate" type="date" className="form-input"/>
                  <Field name="businessUnit" placeholder="Business Unit / Plant" className="form-input"/>
                  <Field name="auditLead" placeholder="Audit Lead" className="form-input"/>
                </div>
              </div>

              {/* ================= CHECKLIST TABLE ================= */}
              <div className="form-section">

                <FieldArray name="checklist">
                  {({ push, remove })=>(
                    <>

                      {!isPrintMode && (
                        <div style={{ display:"flex", gap:"10px", marginBottom:10 }}>
                          <button type="button" className="btn-submit" onClick={addColumn}>
                            + Add Column
                          </button>

                          <button
                            type="button"
                            className="btn-submit"
                            onClick={()=>push({
                              controlArea:"",
                              item:"",
                              status:"",
                              remarks:"",
                              dynamicFields:{}
                            })}
                          >
                            + Add Row
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Sl No</th>
                            <th>Control Area</th>
                            <th>Checklist Item</th>
                            <th>Status (Y/N)</th>
                            <th>Remarks</th>

                            {dynamicColumns.map(col=>(
                              <th key={col.key}>
                                {col.label}
                                {!isPrintMode && (
                                  <button
                                    type="button"
                                    onClick={()=>removeColumn(col.key)}
                                  >
                                    x
                                  </button>
                                )}
                              </th>
                            ))}

                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {values.checklist.map((row,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>

                              <td>
                                <Field name={`checklist.${index}.controlArea`} className="form-input"/>
                              </td>

                              <td>
                                <Field name={`checklist.${index}.item`} className="form-input"/>
                              </td>

                              <td>
                                {!isPrintMode ? (
                                  <Field as="select" name={`checklist.${index}.status`} className="form-input">
                                    <option value="">Select</option>
                                    <option>Y</option>
                                    <option>N</option>
                                  </Field>
                                ) : (
                                  <div className="print-value">{row.status}</div>
                                )}
                              </td>

                              <td>
                                <Field name={`checklist.${index}.remarks`} className="form-input"/>
                              </td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field
                                    name={`checklist.${index}.dynamicFields.${col.key}`}
                                    className="form-input"
                                  />
                                </td>
                              ))}

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

                    </>
                  )}
                </FieldArray>

              </div>

              {/* ================= CUSTOM FIELDS ================= */}
              <FormCustomFields values={values}/>

              {/* ================= ATTACHMENTS ================= */}
              <FormAttachments values={values}/>

              {/* ================= SIGNATURE WORKFLOW ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Sign-Off Workflow</h3>

                <div className="three-column-signatures">
                  <ApprovalSignatureBlock
                    label="Prepared By"
                    value={values.preparedSignature}
                    onChange={(val)=>setFieldValue("preparedSignature",val)}
                  />

                  <ApprovalSignatureBlock
                    label="Reviewed By"
                    value={values.reviewedSignature}
                    onChange={(val)=>setFieldValue("reviewedSignature",val)}
                  />

                  <ApprovalSignatureBlock
                    label="Approved By"
                    value={values.approvedSignature}
                    onChange={(val)=>setFieldValue("approvedSignature",val)}
                  />
                </div>

                {/* ================= CUSTOM SIGNATURES ================= */}
                <FieldArray name="additionalSignatures">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          style={{ marginTop:10 }}
                          onClick={()=>push({data:{}})}
                        >
                          + Add Custom Signature
                        </button>
                      )}

                      {values.additionalSignatures.map((sig,index)=>(
                        <div key={index} style={{ marginTop:10 }}>
                          <ApprovalSignatureBlock
                            label={`Custom Signature ${index+1}`}
                            value={sig.data || {}}
                            onChange={(val)=>
                              setFieldValue(`additionalSignatures.${index}.data`,val)
                            }
                          />
                          {!isPrintMode && (
                            <button type="button" onClick={()=>remove(index)}>
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </FieldArray>

              </div>

              {/* ================= SUBMIT ================= */}
              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Audit Checklist
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

export default FRM00822_CostingAuditChecklist;
