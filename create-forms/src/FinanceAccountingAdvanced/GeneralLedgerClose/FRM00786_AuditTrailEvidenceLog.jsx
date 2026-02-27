// FRM00786_AuditTrailEvidenceLog.jsx
// FRM-00786 – Audit Trail Evidence Log – Checklist / Log
// Enterprise Grade – Dynamic + Compliance + Sign-Off + Custom Signatures

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
  companyName: Yup.string().required("Required"),
  logId: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  logDate: Yup.string().required("Required"),
  periodCovered: Yup.string().required("Required"),
  preparedBy: Yup.string().required("Required"),
  preparedDate: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  companyName: "",
  logId: "",
  department: "",
  logDate: "",
  periodCovered: "",

  evidenceLog: [
    {
      controlArea: "",
      evidenceDescription: "",
      documentReference: "",
      owner: "",
      status: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  preparedBy: "",
  preparedDate: "",
  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00786_AuditTrailEvidenceLog = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= Dynamic Column Logic ================= */

  const addColumn = () => {
    const columnName = prompt("Enter New Column Name");
    if (!columnName) return;

    const key = columnName.replace(/\s+/g, "");
    if (dynamicColumns.find(col => col.key === key)) {
      alert("Field already exists");
      return;
    }

    setDynamicColumns([...dynamicColumns, { key, label: columnName }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
  };

  const renderField = (values, name, label, type="text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || "_________"}</div>
      ) : (
        <>
          <Field name={name} type={type} className="form-input"/>
          <ErrorMessage name={name} component="div" className="form-error"/>
        </>
      )}
    </div>
  );

  return (
    <ModernFormWrapper
      formId="FRM-00786"
      title="Audit Trail Evidence Log"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Audit Trail Evidence Log Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00786"
              title="AUDIT TRAIL EVIDENCE LOG"
              department="Finance & Accounting – General Ledger & Close"
            >

              {/* CONTROL HEADER */}
              <div className="form-section">
                <h3 className="form-section-title">Control Header</h3>
                <div className="form-fields">
                  {renderField(values,"companyName","Company Name")}
                  {renderField(values,"logId","Log ID")}
                  {renderField(values,"department","Department / Process")}
                  {renderField(values,"logDate","Log Date","date")}
                  {renderField(values,"periodCovered","Period Covered")}
                </div>
              </div>

              {/* EVIDENCE LOG TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">Evidence Log</h3>

                <FieldArray name="evidenceLog">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode && (
                        <div style={{display:"flex",gap:"10px",marginBottom:10}}>
                          <button type="button" className="btn-submit" onClick={addColumn}>
                            + Add Custom Column
                          </button>
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={()=>push({
                              controlArea:"",
                              evidenceDescription:"",
                              documentReference:"",
                              owner:"",
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
                            <th>Sl. No.</th>
                            <th>Control / Process Area</th>
                            <th>Evidence Description</th>
                            <th>Document Reference</th>
                            <th>Owner</th>
                            <th>Status</th>
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
                          {values.evidenceLog.map((row,index)=>(
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td><Field name={`evidenceLog.${index}.controlArea`} className="form-input"/></td>
                              <td><Field name={`evidenceLog.${index}.evidenceDescription`} className="form-input"/></td>
                              <td><Field name={`evidenceLog.${index}.documentReference`} className="form-input"/></td>
                              <td><Field name={`evidenceLog.${index}.owner`} className="form-input"/></td>

                              <td>
                                {!isPrintMode ? (
                                  <Field as="select" name={`evidenceLog.${index}.status`} className="form-input">
                                    <option value="">Select</option>
                                    <option>Available</option>
                                    <option>Pending</option>
                                    <option>Not Available</option>
                                  </Field>
                                ) : (
                                  <div className="print-value">{row.status}</div>
                                )}
                              </td>

                              <td><Field name={`evidenceLog.${index}.remarks`} className="form-input"/></td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field name={`evidenceLog.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* SIGN-OFF */}
              <div className="form-section">
                <h3 className="form-section-title">Sign-off</h3>

                <div className="form-fields">
                  {renderField(values,"preparedBy","Prepared By")}
                  {renderField(values,"preparedDate","Prepared Date","date")}
                </div>

                <div className="three-column-signatures" style={{marginTop:20}}>
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

                {/* Custom Signatures */}
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

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Evidence Log
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

export default FRM00786_AuditTrailEvidenceLog;
