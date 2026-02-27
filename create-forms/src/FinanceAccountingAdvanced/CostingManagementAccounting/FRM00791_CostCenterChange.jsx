// FRM00791_CostCenterChange.jsx
// FRM-00791 – Cost Center Change – Request / Initiation
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

/* ================= VALIDATION ================= */

const validationSchema = Yup.object({
  companyName: Yup.string().required("Required"),
  requestId: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  requestDate: Yup.string().required("Required"),
  effectiveDate: Yup.string().required("Required"),
  costCenterName: Yup.string().required("Required"),
  costCenterCode: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Only alphanumeric allowed")
    .required("Required"),
  preparedBy: Yup.string().required("Required"),
  preparedDate: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  companyName: "",
  requestId: "",
  department: "",
  requestDate: "",
  effectiveDate: "",

  costCenterName: "",
  costCenterCode: "",
  businessUnit: "",
  location: "",
  costCenterOwner: "",

  changes: [
    {
      fieldChanged: "",
      currentValue: "",
      proposedValue: "",
      reasonForChange: "",
      impactAssessment: "",
      effectiveFrom: "",
      dynamicFields: {}
    }
  ],

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

const FRM00791_CostCenterChange = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

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
    <ModernFormWrapper formId="FRM-00791" title="Cost Center Change – Request">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Cost Center Change Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>
            <ModernA4Template
              formId="FRM-00791"
              title="COST CENTER CHANGE REQUEST"
              department="Finance & Accounting – Costing & Management Accounting"
            >

              {/* CONTROL HEADER */}
              <div className="form-section">
                <h3 className="form-section-title">Control Header</h3>
                <div className="form-fields">
                  {renderField(values,"companyName","Company Name")}
                  {renderField(values,"requestId","Request ID")}
                  {renderField(values,"department","Department / Process")}
                  {renderField(values,"requestDate","Request Date","date")}
                  {renderField(values,"effectiveDate","Effective Date","date")}
                </div>
              </div>

              {/* CURRENT COST CENTER DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Current Cost Center Details</h3>
                <div className="form-fields">
                  {renderField(values,"costCenterName","Cost Center Name")}
                  {renderField(values,"costCenterCode","Cost Center Code")}
                  {renderField(values,"businessUnit","Business Unit / Department")}
                  {renderField(values,"location","Location")}
                  {renderField(values,"costCenterOwner","Cost Center Owner")}
                </div>
              </div>

              {/* PROPOSED CHANGES */}
              <div className="form-section">
                <h3 className="form-section-title">Proposed Changes</h3>

                <FieldArray name="changes">
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
                              fieldChanged:"",
                              currentValue:"",
                              proposedValue:"",
                              reasonForChange:"",
                              impactAssessment:"",
                              effectiveFrom:"",
                              dynamicFields:{}
                            })}
                          >
                            + Add Change Line
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Field Changed</th>
                            <th>Current Value</th>
                            <th>Proposed Value</th>
                            <th>Reason</th>
                            <th>Impact</th>
                            <th>Effective From</th>
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
                          {values.changes.map((row,index)=>(
                            <tr key={index}>
                              <td><Field name={`changes.${index}.fieldChanged`} className="form-input"/></td>
                              <td><Field name={`changes.${index}.currentValue`} className="form-input"/></td>
                              <td><Field name={`changes.${index}.proposedValue`} className="form-input"/></td>
                              <td><Field name={`changes.${index}.reasonForChange`} className="form-input"/></td>
                              <td><Field name={`changes.${index}.impactAssessment`} className="form-input"/></td>
                              <td><Field name={`changes.${index}.effectiveFrom`} type="date" className="form-input"/></td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field name={`changes.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* CONTROL & DOCUMENTATION */}
              <div className="form-section">
                <h3 className="form-section-title">Control & Documentation</h3>
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

                <div style={{marginTop:20}}>
                  <ApprovalSignatureBlock
                    label="CFO Approval"
                    value={values.cfoSignature}
                    onChange={(val)=>setFieldValue("cfoSignature",val)}
                  />
                </div>

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
                    Submit Cost Center Change
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

export default FRM00791_CostCenterChange;
