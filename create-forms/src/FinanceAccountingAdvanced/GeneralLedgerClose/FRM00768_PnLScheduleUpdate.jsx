// FRM00768_PnLScheduleUpdate.jsx
// FRM-00768 – P&L Schedule Update – Request / Initiation Form
// Enterprise Grade – Dynamic + Compliance + Custom Signatures

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

/* ==========================
   VALIDATION
========================== */

const validationSchema = Yup.object({
  companyName: Yup.string().required("Required"),
  requestId: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  requestDate: Yup.string().required("Required"),
  reportingPeriod: Yup.string().required("Required"),
  preparedBy: Yup.string().required("Required"),
  preparedDate: Yup.string().required("Required")
});

/* ==========================
   INITIAL VALUES
========================== */

const initialValues = {
  companyName: "",
  requestId: "",
  department: "",
  requestDate: "",
  reportingPeriod: "",

  schedule: [
    {
      lineItem: "",
      accountCode: "",
      costCenter: "",
      budgetAmount: "",
      actualAmount: "",
      variance: "",
      materialityThreshold: "",
      supportingReference: "",
      dynamicFields: {}
    }
  ],

  explanation: "",
  rootCause: "",
  impactAssessment: "",
  actionPlan: "",
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

const FRM00768_PnLScheduleUpdate = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ==========================
     Dynamic Column Logic
  ========================== */

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

  /* ==========================
     Auto Variance Calculation
  ========================== */

  const calculateVariance = (budget, actual) => {
    const b = parseFloat(budget) || 0;
    const a = parseFloat(actual) || 0;
    return (a - b).toFixed(2);
  };

  const renderField = (values, name, label, type="text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || "_________"}</div>
      ) : (
        <>
          <Field name={name} type={type} className="form-input" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-00768" title="P&L Schedule Update – Initiation">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("P&L Schedule Update Initiated Successfully");
        }}
      >
        {({ values, setFieldValue }) => (

          <Form>
            <ModernA4Template
              formId="FRM-00768"
              title="P&L SCHEDULE UPDATE – REQUEST"
              department="Finance & Accounting – General Ledger & Close"
            >

              {/* CONTROL HEADER */}
              <div className="form-section">
                <h3 className="form-section-title">Control Header</h3>
                <div className="form-fields">
                  {renderField(values,"companyName","Company Name")}
                  {renderField(values,"requestId","Request ID")}
                  {renderField(values,"department","Department / Process")}
                  {renderField(values,"requestDate","Request Date","date")}
                  {renderField(values,"reportingPeriod","Reporting Period")}
                </div>
              </div>

              {/* SCHEDULE DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">P&L Schedule Details</h3>

                <FieldArray name="schedule">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <div style={{ display:"flex", gap:"10px", marginBottom:10 }}>
                          <button type="button" className="btn-submit" onClick={addColumn}>
                            + Add Custom Column
                          </button>
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={() =>
                              push({
                                lineItem:"",
                                accountCode:"",
                                costCenter:"",
                                budgetAmount:"",
                                actualAmount:"",
                                variance:"",
                                materialityThreshold:"",
                                supportingReference:"",
                                dynamicFields:{}
                              })
                            }
                          >
                            + Add Line Item
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>P&L Line Item</th>
                            <th>Account Code</th>
                            <th>Cost Center</th>
                            <th>Budget</th>
                            <th>Actual</th>
                            <th>Variance</th>
                            <th>Materiality</th>
                            <th>Supporting Ref</th>
                            {dynamicColumns.map(col => (
                              <th key={col.key}>
                                {col.label}
                                {!isPrintMode && (
                                  <button type="button" onClick={() => removeColumn(col.key)}>x</button>
                                )}
                              </th>
                            ))}
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {values.schedule.map((row,index)=>(
                            <tr key={index}>
                              <td><Field name={`schedule.${index}.lineItem`} className="form-input"/></td>
                              <td><Field name={`schedule.${index}.accountCode`} className="form-input"/></td>
                              <td><Field name={`schedule.${index}.costCenter`} className="form-input"/></td>

                              <td>
                                <Field
                                  name={`schedule.${index}.budgetAmount`}
                                  type="number"
                                  className="form-input"
                                />
                              </td>

                              <td>
                                <Field
                                  name={`schedule.${index}.actualAmount`}
                                  type="number"
                                  className="form-input"
                                  onBlur={(e)=>{
                                    const variance = calculateVariance(
                                      row.budgetAmount,
                                      e.target.value
                                    );
                                    setFieldValue(`schedule.${index}.variance`,variance);
                                  }}
                                />
                              </td>

                              <td>
                                {isPrintMode
                                  ? <div className="print-value">{row.variance}</div>
                                  : <Field name={`schedule.${index}.variance`} readOnly className="form-input"/>}
                              </td>

                              <td><Field name={`schedule.${index}.materialityThreshold`} className="form-input"/></td>
                              <td><Field name={`schedule.${index}.supportingReference`} className="form-input"/></td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field name={`schedule.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* VARIANCE ANALYSIS */}
              <div className="form-section">
                <h3 className="form-section-title">Variance Analysis</h3>
                <div className="form-fields">
                  {renderField(values,"explanation","Explanation")}
                  {renderField(values,"rootCause","Root Cause")}
                  {renderField(values,"impactAssessment","Impact Assessment")}
                  {renderField(values,"actionPlan","Action Plan")}
                  {renderField(values,"status","Status")}
                </div>
              </div>

              {/* CONTROL & COMPLIANCE */}
              <div className="form-section">
                <h3 className="form-section-title">Control & Compliance</h3>
                <div className="form-fields">
                  {renderField(values,"supportingDocumentsIndicator","Supporting Documents (Yes/No)")}
                  {renderField(values,"policyReference","Policy Reference")}
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

                <div style={{ marginTop:10 }}>
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
                            <button type="button" onClick={()=>remove(index)}>Remove</button>
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
                    Submit P&L Update Request
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

export default FRM00768_PnLScheduleUpdate;
