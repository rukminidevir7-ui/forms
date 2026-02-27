// FRM00904_APAgingActionPlan.jsx
// FRM-00904 – AP Aging Action Plan – Review / Approval
// Enterprise Grade – Accounts Payable & Vendor Finance

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
  preparedBy: Yup.string().required("Required"),
  periodFrom: Yup.string().required("Required"),
  periodTo: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00904",
  version: "1.0",
  effectiveDate: "",

  preparedBy: "",
  department: "Accounts Payable",
  confidentialityLevel: "",

  /* Reference Details */
  planReferenceNumber: "",
  periodFrom: "",
  periodTo: "",
  businessUnit: "",
  currency: "",
  erpDocumentId: "",

  /* Vendor Aging Summary */
  totalOutstanding: "",
  bucket0to30: "",
  bucket31to60: "",
  bucket61to90: "",
  bucket91to180: "",
  bucketAbove180: "",

  /* Action Plan Details */
  actionPlanItems: [
    {
      vendorName: "",
      invoiceNo: "",
      amount: "",
      agingBucket: "",
      issue: "",
      action: "",
      owner: "",
      targetDate: "",
      status: "",
      dynamicFields: {}
    }
  ],

  /* Audit Trail */
  createdOn: "",
  lastUpdatedOn: "",
  documentOwner: "",

  preparedSignature: {},
  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00904_APAgingActionPlan = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const name = prompt("Enter Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");
    if (dynamicColumns.find(col=>col.key===key)) return;
    setDynamicColumns([...dynamicColumns,{key,label:name}]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col=>col.key!==key));
  };

  return (
    <ModernFormWrapper
      formId="FRM-00904"
      title="AP Aging Action Plan"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("AP Aging Action Plan Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00904"
              title="AP AGING ACTION PLAN"
              department="Finance & Accounting – Accounts Payable"
            >

              {/* ================= DOCUMENT CONTROL ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Document Control</h3>
                <div className="form-fields">
                  <Field name="formId" className="form-input" disabled />
                  <Field name="version" className="form-input"/>
                  <Field name="effectiveDate" type="date" className="form-input"/>
                  <Field name="preparedBy" placeholder="Prepared By" className="form-input"/>
                  <Field name="department" className="form-input"/>
                  <Field name="confidentialityLevel" placeholder="Confidentiality Level" className="form-input"/>
                </div>
              </div>

              {/* ================= REFERENCE DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Reference Details</h3>
                <div className="form-fields">
                  <Field name="planReferenceNumber" placeholder="Plan Reference Number" className="form-input"/>
                  <Field name="periodFrom" type="date" className="form-input"/>
                  <Field name="periodTo" type="date" className="form-input"/>
                  <Field name="businessUnit" placeholder="Business Unit" className="form-input"/>
                  <Field name="currency" placeholder="Currency" className="form-input"/>
                  <Field name="erpDocumentId" placeholder="ERP Document ID" className="form-input"/>
                </div>
              </div>

              {/* ================= VENDOR AGING SUMMARY ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Vendor Aging Summary</h3>
                <div className="form-fields">
                  <Field name="totalOutstanding" type="number" placeholder="Total Outstanding" className="form-input"/>
                  <Field name="bucket0to30" type="number" placeholder="0–30 Days" className="form-input"/>
                  <Field name="bucket31to60" type="number" placeholder="31–60 Days" className="form-input"/>
                  <Field name="bucket61to90" type="number" placeholder="61–90 Days" className="form-input"/>
                  <Field name="bucket91to180" type="number" placeholder="91–180 Days" className="form-input"/>
                  <Field name="bucketAbove180" type="number" placeholder=">180 Days" className="form-input"/>
                </div>
              </div>

              {/* ================= ACTION PLAN DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Action Plan Details</h3>

                <FieldArray name="actionPlanItems">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode && (
                        <div style={{display:"flex",gap:"10px",marginBottom:10}}>
                          <button type="button" className="btn-submit" onClick={addColumn}>
                            + Add Column
                          </button>
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={()=>push({
                              vendorName:"",
                              invoiceNo:"",
                              amount:"",
                              agingBucket:"",
                              issue:"",
                              action:"",
                              owner:"",
                              targetDate:"",
                              status:"",
                              dynamicFields:{}
                            })}
                          >
                            + Add Item
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Sl No</th>
                            <th>Vendor</th>
                            <th>Invoice No</th>
                            <th>Amount</th>
                            <th>Aging Bucket</th>
                            <th>Issue</th>
                            <th>Action</th>
                            <th>Owner</th>
                            <th>Target Date</th>
                            <th>Status</th>

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
                          {values.actionPlanItems.map((item,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td><Field name={`actionPlanItems.${index}.vendorName`} className="form-input"/></td>
                              <td><Field name={`actionPlanItems.${index}.invoiceNo`} className="form-input"/></td>
                              <td><Field name={`actionPlanItems.${index}.amount`} type="number" className="form-input"/></td>
                              <td><Field name={`actionPlanItems.${index}.agingBucket`} className="form-input"/></td>
                              <td><Field name={`actionPlanItems.${index}.issue`} className="form-input"/></td>
                              <td><Field name={`actionPlanItems.${index}.action`} className="form-input"/></td>
                              <td><Field name={`actionPlanItems.${index}.owner`} className="form-input"/></td>
                              <td><Field name={`actionPlanItems.${index}.targetDate`} type="date" className="form-input"/></td>
                              <td><Field name={`actionPlanItems.${index}.status`} className="form-input"/></td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field
                                    name={`actionPlanItems.${index}.dynamicFields.${col.key}`}
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

              {/* ================= AUDIT TRAIL ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Audit Trail</h3>
                <div className="form-fields">
                  <Field name="createdOn" type="date" className="form-input"/>
                  <Field name="lastUpdatedOn" type="date" className="form-input"/>
                  <Field name="documentOwner" className="form-input"/>
                </div>
              </div>

              <FormCustomFields values={values}/>
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

              {/* ================= ADDITIONAL SIGNATURES ================= */}
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

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit AP Aging Action Plan
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

export default FRM00904_APAgingActionPlan;
