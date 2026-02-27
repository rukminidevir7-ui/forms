// FRM00783_PriorPeriodAdjustment.jsx
// FRM-00783 – Prior Period Adjustment – Request / Initiation
// Enterprise Grade – Dynamic + Auto Difference + Compliance + Custom Signatures

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
  adjustmentId: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  requestDate: Yup.string().required("Required"),
  affectedPeriod: Yup.string().required("Required"),
  preparedBy: Yup.string().required("Required"),
  preparedDate: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  companyName: "",
  adjustmentId: "",
  department: "",
  requestDate: "",
  affectedPeriod: "",

  adjustments: [
    {
      accountName: "",
      glCode: "",
      originalAmount: "",
      adjustedAmount: "",
      difference: "",
      journalReference: "",
      reasonForAdjustment: "",
      supportingReference: "",
      dynamicFields: {}
    }
  ],

  financialStatementImpact: "",
  taxImpact: "",
  disclosureRequirement: "",
  rootCause: "",
  correctiveAction: "",
  status: "",

  supportingDocumentsIndicator: "",
  policyReference: "",
  preparedBy: "",
  preparedDate: "",

  reviewedSignature: {},
  financeManagerSignature: {},
  financeControllerSignature: {},
  cfoSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00783_PriorPeriodAdjustment = () => {

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

  /* ================= Difference Calculation ================= */

  const calculateDifference = (original, adjusted) => {
    const o = parseFloat(original) || 0;
    const a = parseFloat(adjusted) || 0;
    return (a - o).toFixed(2);
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
      formId="FRM-00783"
      title="Prior Period Adjustment – Request"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Prior Period Adjustment Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00783"
              title="PRIOR PERIOD ADJUSTMENT"
              department="Finance & Accounting – General Ledger & Close"
            >

              {/* CONTROL HEADER */}
              <div className="form-section">
                <h3 className="form-section-title">Control Header</h3>
                <div className="form-fields">
                  {renderField(values,"companyName","Company Name")}
                  {renderField(values,"adjustmentId","Adjustment ID")}
                  {renderField(values,"department","Department / Process")}
                  {renderField(values,"requestDate","Request Date","date")}
                  {renderField(values,"affectedPeriod","Affected Period")}
                </div>
              </div>

              {/* ADJUSTMENT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Adjustment Details</h3>

                <FieldArray name="adjustments">
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
                              accountName:"",
                              glCode:"",
                              originalAmount:"",
                              adjustedAmount:"",
                              difference:"",
                              journalReference:"",
                              reasonForAdjustment:"",
                              supportingReference:"",
                              dynamicFields:{}
                            })}
                          >
                            + Add Line
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Account Name</th>
                            <th>GL Code</th>
                            <th>Original Amount</th>
                            <th>Adjusted Amount</th>
                            <th>Difference</th>
                            <th>Journal Ref</th>
                            <th>Reason</th>
                            <th>Supporting Ref</th>
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
                          {values.adjustments.map((row,index)=>(
                            <tr key={index}>
                              <td><Field name={`adjustments.${index}.accountName`} className="form-input"/></td>
                              <td><Field name={`adjustments.${index}.glCode`} className="form-input"/></td>

                              <td>
                                <Field
                                  name={`adjustments.${index}.originalAmount`}
                                  type="number"
                                  className="form-input"
                                />
                              </td>

                              <td>
                                <Field
                                  name={`adjustments.${index}.adjustedAmount`}
                                  type="number"
                                  className="form-input"
                                  onBlur={(e)=>{
                                    const diff = calculateDifference(
                                      row.originalAmount,
                                      e.target.value
                                    );
                                    setFieldValue(`adjustments.${index}.difference`, diff);
                                  }}
                                />
                              </td>

                              <td>
                                {isPrintMode
                                  ? <div className="print-value">{row.difference}</div>
                                  : <Field name={`adjustments.${index}.difference`} readOnly className="form-input"/>}
                              </td>

                              <td><Field name={`adjustments.${index}.journalReference`} className="form-input"/></td>
                              <td><Field name={`adjustments.${index}.reasonForAdjustment`} className="form-input"/></td>
                              <td><Field name={`adjustments.${index}.supportingReference`} className="form-input"/></td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field name={`adjustments.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* IMPACT ASSESSMENT */}
              <div className="form-section">
                <h3 className="form-section-title">Impact Assessment</h3>
                <div className="form-fields">
                  {renderField(values,"financialStatementImpact","Financial Statement Impact")}
                  {renderField(values,"taxImpact","Tax Impact")}
                  {renderField(values,"disclosureRequirement","Disclosure Requirement")}
                  {renderField(values,"rootCause","Root Cause")}
                  {renderField(values,"correctiveAction","Corrective Action")}
                  {renderField(values,"status","Status")}
                </div>
              </div>

              {/* CONTROL & COMPLIANCE */}
              <div className="form-section">
                <h3 className="form-section-title">Control & Compliance</h3>
                <div className="form-fields">
                  {renderField(values,"supportingDocumentsIndicator","Supporting Documents (Yes/No)")}
                  {renderField(values,"policyReference","Policy / Accounting Standard Reference")}
                  {renderField(values,"preparedBy","Prepared By")}
                  {renderField(values,"preparedDate","Prepared Date","date")}
                </div>
              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* APPROVAL WORKFLOW */}
              <div className="form-section">
                <h3 className="form-section-title">Approval Workflow</h3>

                <div className="three-column-signatures">
                  <ApprovalSignatureBlock
                    label="Reviewed By"
                    value={values.reviewedSignature}
                    onChange={(val)=>setFieldValue("reviewedSignature",val)}
                  />
                  <ApprovalSignatureBlock
                    label="Finance Manager"
                    value={values.financeManagerSignature}
                    onChange={(val)=>setFieldValue("financeManagerSignature",val)}
                  />
                  <ApprovalSignatureBlock
                    label="Finance Controller"
                    value={values.financeControllerSignature}
                    onChange={(val)=>setFieldValue("financeControllerSignature",val)}
                  />
                </div>

                <div style={{marginTop:10}}>
                  <ApprovalSignatureBlock
                    label="CFO Approval"
                    value={values.cfoSignature}
                    onChange={(val)=>setFieldValue("cfoSignature",val)}
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

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Adjustment
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

export default FRM00783_PriorPeriodAdjustment;
