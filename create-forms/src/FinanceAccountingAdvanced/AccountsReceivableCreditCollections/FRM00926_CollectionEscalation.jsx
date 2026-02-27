// FRM00926_CollectionEscalation.jsx
// FRM-00926 / 00927 / 00928 – Collection Escalation
// Enterprise Grade – Accounts Receivable, Credit & Collections

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
  referenceNumber: Yup.string().required("Required"),
  customerName: Yup.string().required("Required"),
  outstandingAmount: Yup.string().required("Required"),
  escalationLevel: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00926 / FRM-00927 / FRM-00928",
  version: "1.0",
  date: "",
  department: "Finance & Accounting (Advanced)",
  functionName: "Accounts Receivable, Credit & Collections",
  referenceNumber: "",
  location: "",
  escalationLevel: "",
  priority: "",

  /* Customer Details */
  customerName: "",
  customerId: "",
  accountNumber: "",
  businessAddress: "",
  contactPerson: "",
  phone: "",

  /* Escalation Details */
  outstandingAmount: "",
  currency: "",
  dueDate: "",
  daysPastDue: "",
  reasonForEscalation: "",
  previousActionsTaken: "",

  /* Risk & Impact */
  riskLevel: "",
  businessImpact: "",
  impactDescription: "",

  /* Action Plan Table */
  actionPlan: [
    {
      recommendedAction: "",
      targetResolutionDate: "",
      comments: "",
      dynamicFields: {}
    }
  ],

  /* Attachments */
  supportingDocsAttached: "",
  documentReference: "",

  /* Audit Trail */
  createdOn: "",
  lastUpdatedOn: "",
  documentOwner: "",

  requestedSignature: {},
  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00926_CollectionEscalation = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const name = prompt("Enter Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");
    if (dynamicColumns.find(col => col.key === key)) return;
    setDynamicColumns([...dynamicColumns,{ key, label:name }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col=>col.key!==key));
  };

  return (
    <ModernFormWrapper
      formId="FRM-00926"
      title="Collection Escalation"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Collection Escalation Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00926 / 00927 / 00928"
              title="COLLECTION ESCALATION"
              department="Finance & Accounting (Advanced) – Accounts Receivable, Credit & Collections"
            >

              {/* ================= GENERAL INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  <Field name="date" type="date" className="form-input"/>
                  <Field name="referenceNumber" placeholder="Reference Number" className="form-input"/>
                  <Field name="location" placeholder="Location" className="form-input"/>
                  <Field name="escalationLevel" placeholder="Escalation Level" className="form-input"/>
                  <Field name="priority" placeholder="Priority" className="form-input"/>
                </div>
              </div>

              {/* ================= CUSTOMER DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Customer Details</h3>
                <div className="form-fields">
                  <Field name="customerName" placeholder="Customer Name" className="form-input"/>
                  <Field name="customerId" placeholder="Customer ID" className="form-input"/>
                  <Field name="accountNumber" placeholder="Account Number" className="form-input"/>
                  <Field name="businessAddress" placeholder="Business Address" className="form-input"/>
                  <Field name="contactPerson" placeholder="Contact Person" className="form-input"/>
                  <Field name="phone" placeholder="Phone" className="form-input"/>
                </div>
              </div>

              {/* ================= ESCALATION DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Escalation Details</h3>
                <div className="form-fields">
                  <Field name="outstandingAmount" type="number" placeholder="Outstanding Amount" className="form-input"/>
                  <Field name="currency" placeholder="Currency" className="form-input"/>
                  <Field name="dueDate" type="date" className="form-input"/>
                  <Field name="daysPastDue" type="number" placeholder="Days Past Due" className="form-input"/>
                  <Field name="reasonForEscalation" placeholder="Reason for Escalation" className="form-input"/>
                  <Field name="previousActionsTaken" placeholder="Previous Actions Taken" className="form-input"/>
                </div>
              </div>

              {/* ================= RISK & IMPACT ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Risk & Impact</h3>
                <div className="form-fields">
                  <Field name="riskLevel" placeholder="Risk Level" className="form-input"/>
                  <Field name="businessImpact" placeholder="Business Impact" className="form-input"/>
                  <Field name="impactDescription" placeholder="Impact Description" className="form-input"/>
                </div>
              </div>

              {/* ================= ACTION PLAN ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Action Plan</h3>

                <FieldArray name="actionPlan">
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
                              recommendedAction:"",
                              targetResolutionDate:"",
                              comments:"",
                              dynamicFields:{}
                            })}
                          >
                            + Add Action
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Sl No</th>
                            <th>Recommended Action</th>
                            <th>Target Resolution Date</th>
                            <th>Comments / Notes</th>

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
                          {values.actionPlan.map((item,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td>
                                <Field name={`actionPlan.${index}.recommendedAction`} className="form-input"/>
                              </td>
                              <td>
                                <Field name={`actionPlan.${index}.targetResolutionDate`} type="date" className="form-input"/>
                              </td>
                              <td>
                                <Field name={`actionPlan.${index}.comments`} className="form-input"/>
                              </td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field
                                    name={`actionPlan.${index}.dynamicFields.${col.key}`}
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

              {/* ================= ATTACHMENTS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Attachments</h3>
                <div className="form-fields">
                  <Field name="supportingDocsAttached" placeholder="Supporting Documents Attached (Y/N)" className="form-input"/>
                  <Field name="documentReference" placeholder="Document Reference" className="form-input"/>
                </div>
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

              {/* ================= AUTHORIZATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>
                <div className="three-column-signatures">
                  <ApprovalSignatureBlock
                    label="Requested By"
                    value={values.requestedSignature}
                    onChange={(val)=>setFieldValue("requestedSignature",val)}
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
                      <button type="button" className="btn-submit"
                        onClick={()=>push({data:{}})}>
                        + Add Additional Signature
                      </button>
                    )}
                    {values.additionalSignatures.map((sig,index)=>(
                      <div key={index} style={{marginTop:15}}>
                        <ApprovalSignatureBlock
                          label={`Additional Signature ${index+1}`}
                          value={sig.data || {}}
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
                    Submit Collection Escalation
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

export default FRM00926_CollectionEscalation;