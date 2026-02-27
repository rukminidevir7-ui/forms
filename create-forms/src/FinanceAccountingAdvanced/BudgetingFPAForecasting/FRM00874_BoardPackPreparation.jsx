// FRM00874_BoardPackPreparation.jsx
// FRM-00874 – Board Pack Preparation – Request / Initiation
// Enterprise Grade – Dynamic Checklist & Executive Summary

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
  meetingSession: Yup.string().required("Required"),
  meetingDate: Yup.string().required("Required"),
  preparedBy: Yup.string().required("Required"),
  submissionDate: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  meetingSession: "",
  meetingDate: "",
  preparedBy: "",
  submissionDate: "",
  version: "1.0",

  boardPackChecklist: [
    {
      section: "",
      documentName: "",
      owner: "",
      status: "",
      docVersion: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  executiveSummary: "",
  risksSensitiveMatters: "",

  preparedSignature: {},
  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00874_BoardPackPreparation = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= COLUMN LOGIC ================= */

  const addColumn = () => {
    const name = prompt("Enter Column Name");
    if (!name) return;

    const key = name.replace(/\s+/g,"");
    if (dynamicColumns.find(col => col.key === key)) return;

    setDynamicColumns([...dynamicColumns, { key, label: name }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
  };

  return (
    <ModernFormWrapper
      formId="FRM-00874"
      title="Board Pack Preparation"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Board Pack Preparation Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00874"
              title="BOARD PACK PREPARATION"
              department="Finance & Accounting – Budgeting, FP&A & Forecasting"
            >

              {/* ================= BASIC INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Basic Information</h3>
                <div className="form-fields">
                  <Field name="meetingSession" placeholder="Meeting / Board Session" className="form-input"/>
                  <Field name="meetingDate" type="date" className="form-input"/>
                  <Field name="preparedBy" placeholder="Prepared By" className="form-input"/>
                  <Field name="submissionDate" type="date" className="form-input"/>
                  <Field name="version" placeholder="Version" className="form-input"/>
                </div>
              </div>

              {/* ================= BOARD PACK CONTENTS CHECKLIST ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Board Pack Contents Checklist</h3>

                <FieldArray name="boardPackChecklist">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode && (
                        <div style={{display:"flex", gap:"10px", marginBottom:10}}>
                          <button type="button" className="btn-submit" onClick={addColumn}>
                            + Add Column
                          </button>

                          <button
                            type="button"
                            className="btn-submit"
                            onClick={()=>push({
                              section:"",
                              documentName:"",
                              owner:"",
                              status:"",
                              docVersion:"",
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
                            <th>Section</th>
                            <th>Document Name</th>
                            <th>Owner</th>
                            <th>Status</th>
                            <th>Version</th>
                            <th>Remarks</th>

                            {dynamicColumns.map(col=>(
                              <th key={col.key}>
                                {col.label}
                                {!isPrintMode && (
                                  <button type="button" onClick={()=>removeColumn(col.key)}>x</button>
                                )}
                              </th>
                            ))}

                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {values.boardPackChecklist.map((row,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>

                              <td>
                                <Field name={`boardPackChecklist.${index}.section`} className="form-input"/>
                              </td>

                              <td>
                                <Field name={`boardPackChecklist.${index}.documentName`} className="form-input"/>
                              </td>

                              <td>
                                <Field name={`boardPackChecklist.${index}.owner`} className="form-input"/>
                              </td>

                              <td>
                                <Field as="select" name={`boardPackChecklist.${index}.status`} className="form-input">
                                  <option value="">Select</option>
                                  <option>Draft</option>
                                  <option>In Progress</option>
                                  <option>Completed</option>
                                  <option>Pending</option>
                                </Field>
                              </td>

                              <td>
                                <Field name={`boardPackChecklist.${index}.docVersion`} className="form-input"/>
                              </td>

                              <td>
                                <Field name={`boardPackChecklist.${index}.remarks`} className="form-input"/>
                              </td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field
                                    name={`boardPackChecklist.${index}.dynamicFields.${col.key}`}
                                    className="form-input"
                                  />
                                </td>
                              ))}

                              {!isPrintMode && (
                                <td>
                                  <button type="button" onClick={()=>remove(index)}>Remove</button>
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

              {/* ================= EXECUTIVE SUMMARY ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Key Highlights / Executive Summary</h3>
                <Field name="executiveSummary" className="form-input"/>
              </div>

              {/* ================= RISKS / SENSITIVE MATTERS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Risks / Sensitive Matters</h3>
                <Field name="risksSensitiveMatters" className="form-input"/>
              </div>

              {/* ================= CUSTOM FIELDS ================= */}
              <FormCustomFields values={values}/>

              {/* ================= ATTACHMENTS ================= */}
              <FormAttachments values={values}/>

              {/* ================= APPROVAL WORKFLOW ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Approval Workflow</h3>
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
              </div>

              {/* ================= CUSTOM SIGNATURES ================= */}
              <FieldArray name="additionalSignatures">
                {({ push, remove })=>(
                  <>
                    {!isPrintMode && (
                      <button type="button" className="btn-submit" onClick={()=>push({data:{}})}>
                        + Add Custom Signature
                      </button>
                    )}
                    {values.additionalSignatures.map((sig,index)=>(
                      <div key={index}>
                        <ApprovalSignatureBlock
                          label={`Custom Signature ${index+1}`}
                          value={sig.data||{}}
                          onChange={(val)=>setFieldValue(`additionalSignatures.${index}.data`,val)}
                        />
                        {!isPrintMode && (
                          <button type="button" onClick={()=>remove(index)}>Remove</button>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </FieldArray>

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Board Pack Preparation
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

export default FRM00874_BoardPackPreparation;
