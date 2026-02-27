// FRM02541_DraftInvoiceReviewUniversal.jsx
// FRM-02541 – Draft Invoice Review — Universal Form
// Enterprise Grade – Client Billing & Revenue Operations – Invoicing (T&M, Milestone, Usage)

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
  draftInvoiceNo: Yup.string().required("Required"),
  reviewDate: Yup.date().required("Required"),
  decision: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02541",
  department: "Client Billing & Revenue Operations",
  function: "Invoicing (T&M, Milestone, Usage)",

  /* 1. Invoice Reference */
  draftInvoiceNo: "",
  invoiceDate: "",
  billingPeriod: "",
  reviewDate: "",

  /* 2. Client / Project Details */
  clientName: "",
  clientCode: "",
  projectName: "",
  projectCode: "",
  businessUnit: "",

  /* 3. Invoice Summary */
  subtotal: "",
  adjustments: "",
  taxes: "",
  totalInvoiceAmount: "",
  currency: "",

  /* 4. Review Checklist */
  reviewChecklist: [
    { reviewItem: "Rate validation completed", status: "", comments: "", dynamicFields: {} },
    { reviewItem: "Quantity/Hours verified", status: "", comments: "", dynamicFields: {} },
    { reviewItem: "Tax validation completed", status: "", comments: "", dynamicFields: {} },
    { reviewItem: "PO/Contract reference verified", status: "", comments: "", dynamicFields: {} },
    { reviewItem: "Supporting documents verified", status: "", comments: "", dynamicFields: {} }
  ],

  /* 5. Review Comments */
  reviewerComments: "",
  issuesIdentified: "",
  actionRequired: "",

  /* 6. Decision */
  decision: "",
  decisionNotes: "",

  /* 7. Sign-off */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02541_DraftInvoiceReviewUniversal = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const columnName = prompt("Enter New Column Name");
    if (!columnName) return;
    const key = columnName.replace(/\s+/g, "");
    if (dynamicColumns.find(col => col.key === key)) return alert("Column exists");
    setDynamicColumns([...dynamicColumns, { key, label: columnName }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
  };

  const calculateTotal = (values, setFieldValue) => {
    const subtotal = Number(values.subtotal || 0);
    const adjustments = Number(values.adjustments || 0);
    const taxes = Number(values.taxes || 0);
    const total = subtotal + adjustments + taxes;
    setFieldValue("totalInvoiceAmount", total.toFixed(2));
  };

  const field = (values, name, label, type="text", onBlurHandler=null) => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : <>
            <Field 
              name={name} 
              type={type} 
              className="form-input"
              onBlur={onBlurHandler}
            />
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-02541" title="Draft Invoice Review">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Draft Invoice Review Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02541"
              title="FRM-02541 — Draft Invoice Review — Universal Form"
              department="Client Billing & Revenue Operations | Invoicing (T&M, Milestone, Usage)"
            >

              {/* 1. Invoice Reference */}
              <div className="form-section">
                <h3 className="form-section-title">Invoice Reference</h3>
                <div className="form-fields">
                  {field(values,"draftInvoiceNo","Draft Invoice No")}
                  {field(values,"invoiceDate","Invoice Date","date")}
                  {field(values,"billingPeriod","Billing Period")}
                  {field(values,"reviewDate","Review Date","date")}
                </div>
              </div>

              {/* 2. Client / Project Details */}
              <div className="form-section">
                <h3 className="form-section-title">Client / Project Details</h3>
                <div className="form-fields">
                  {field(values,"clientName","Client Name")}
                  {field(values,"clientCode","Client Code")}
                  {field(values,"projectName","Project / Contract Name")}
                  {field(values,"projectCode","Project Code")}
                  {field(values,"businessUnit","Business Unit")}
                </div>
              </div>

              {/* 3. Invoice Summary */}
              <div className="form-section">
                <h3 className="form-section-title">Invoice Summary</h3>
                <div className="form-fields">
                  {field(values,"subtotal","Subtotal","number",()=>calculateTotal(values,setFieldValue))}
                  {field(values,"adjustments","Adjustments","number",()=>calculateTotal(values,setFieldValue))}
                  {field(values,"taxes","Taxes","number",()=>calculateTotal(values,setFieldValue))}
                  {field(values,"totalInvoiceAmount","Total Invoice Amount")}
                  {field(values,"currency","Currency")}
                </div>
              </div>

              {/* 4. Review Checklist */}
              <div className="form-section">
                <h3 className="form-section-title">Review Checklist</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom:15 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>
                    <button
                      type="button"
                      className="btn-submit"
                      style={{ marginLeft:10 }}
                      onClick={()=>setFieldValue("reviewChecklist",[
                        ...values.reviewChecklist,
                        { reviewItem:"New Review Item", status:"", comments:"", dynamicFields:{} }
                      ])}
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="reviewChecklist">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Review Item</th>
                          <th>Status</th>
                          <th>Comments</th>
                          {dynamicColumns.map(col=>(
                            <th key={col.key}>{col.label}</th>
                          ))}
                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {values.reviewChecklist.map((row,index)=>(
                          <tr key={index}>
                            <td>{row.reviewItem}</td>
                            <td>
                              <Field as="select" name={`reviewChecklist.${index}.status`} className="form-input">
                                <option value="">Select</option>
                                <option>Completed</option>
                                <option>Pending</option>
                                <option>Issue</option>
                              </Field>
                            </td>
                            <td>
                              <Field name={`reviewChecklist.${index}.comments`} className="form-input"/>
                            </td>
                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`reviewChecklist.${index}.dynamicFields.${col.key}`} className="form-input"/>
                              </td>
                            ))}
                            {!isPrintMode &&
                              <td>
                                <button type="button" onClick={()=>remove(index)}>Remove</button>
                              </td>}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>
              </div>

              {/* 5. Review Comments */}
              <div className="form-section">
                <h3 className="form-section-title">Review Comments</h3>
                <div className="form-fields">
                  {field(values,"reviewerComments","Reviewer Comments")}
                  {field(values,"issuesIdentified","Issues Identified")}
                  {field(values,"actionRequired","Action Required")}
                </div>
              </div>

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {/* 6. Decision */}
              <div className="form-section">
                <h3 className="form-section-title">Decision</h3>
                <div className="form-fields">
                  {field(values,"decision","Decision (Approved / Changes Required / Rejected)")}
                  {field(values,"decisionNotes","Decision Notes")}
                </div>
              </div>

              {/* 7. Sign-off */}
              <div className="form-section">
                <h3 className="form-section-title">Sign-off</h3>

                <FieldArray name="approvalRoles">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode &&
                        <button type="button" className="btn-submit"
                          onClick={()=>push({ roleName:"New Role", data:{} })}>
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
                              onRoleNameChange={(val)=>setFieldValue(`approvalRoles.${index}.roleName`,val)}
                              onChange={(val)=>setFieldValue(`approvalRoles.${index}.data`,val)}
                            />
                            {!isPrintMode &&
                              <button type="button" onClick={()=>remove(index)}>Remove</button>}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </FieldArray>

                {field(values,"approvalDate","Approval Date","date")}
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Draft Invoice Review
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

export default FRM02541_DraftInvoiceReviewUniversal;