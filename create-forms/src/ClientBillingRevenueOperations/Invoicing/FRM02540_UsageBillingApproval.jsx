// FRM02540_UsageBillingApprovalUniversal.jsx
// FRM-02540 – Usage Billing Approval — Universal Form
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
  approvalReferenceNo: Yup.string().required("Required"),
  billingPeriod: Yup.string().required("Required"),
  decision: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02540",
  department: "Client Billing & Revenue Operations",
  function: "Invoicing (T&M, Milestone, Usage)",

  /* 1. Reference Details */
  approvalReferenceNo: "",
  approvalDate: "",
  billingPeriod: "",
  invoiceReference: "",

  /* 2. Client / Contract Details */
  clientName: "",
  clientCode: "",
  projectName: "",
  projectCode: "",
  businessUnit: "",

  /* 3. Billing Summary */
  totalUsageAmount: "",
  adjustments: "",
  taxes: "",
  totalInvoiceAmount: "",
  currency: "",

  /* 4. Review Details */
  validationStatus: "",
  exceptionsIdentified: "",
  reviewerComments: "",

  /* 5. Approval Decision */
  decision: "",
  approvalNotes: "",
  conditions: "",

  /* 6. Sign-off */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalFinalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02540_UsageBillingApprovalUniversal = () => {

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

  const calculateInvoiceTotal = (values, setFieldValue) => {
    const usage = Number(values.totalUsageAmount || 0);
    const adj = Number(values.adjustments || 0);
    const tax = Number(values.taxes || 0);
    const total = usage + adj + tax;
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
    <ModernFormWrapper formId="FRM-02540" title="Usage Billing Approval">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Usage Billing Approval Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02540"
              title="FRM-02540 — Usage Billing Approval — Universal Form"
              department="Client Billing & Revenue Operations | Invoicing (T&M, Milestone, Usage)"
            >

              {/* 1. Reference Details */}
              <div className="form-section">
                <h3 className="form-section-title">Reference Details</h3>
                <div className="form-fields">
                  {field(values,"approvalReferenceNo","Approval Reference No")}
                  {field(values,"approvalDate","Approval Date","date")}
                  {field(values,"billingPeriod","Billing Period")}
                  {field(values,"invoiceReference","Invoice Reference")}
                </div>
              </div>

              {/* 2. Client / Contract Details */}
              <div className="form-section">
                <h3 className="form-section-title">Client / Contract Details</h3>
                <div className="form-fields">
                  {field(values,"clientName","Client Name")}
                  {field(values,"clientCode","Client Code")}
                  {field(values,"projectName","Project / Contract Name")}
                  {field(values,"projectCode","Project Code")}
                  {field(values,"businessUnit","Business Unit")}
                </div>
              </div>

              {/* 3. Billing Summary */}
              <div className="form-section">
                <h3 className="form-section-title">Billing Summary</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 15 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Additional Field
                    </button>
                  </div>
                )}

                <div className="form-fields">
                  {field(values,"totalUsageAmount","Total Usage Amount","number",
                    ()=>calculateInvoiceTotal(values,setFieldValue))}
                  {field(values,"adjustments","Adjustments","number",
                    ()=>calculateInvoiceTotal(values,setFieldValue))}
                  {field(values,"taxes","Taxes","number",
                    ()=>calculateInvoiceTotal(values,setFieldValue))}
                  {field(values,"totalInvoiceAmount","Total Invoice Amount")}
                  {field(values,"currency","Currency")}
                </div>

                {dynamicColumns.map(col=>(
                  <div key={col.key} className="form-field">
                    <label className="form-label">{col.label}</label>
                    <Field name={`dynamic_${col.key}`} className="form-input"/>
                    {!isPrintMode &&
                      <button type="button" onClick={()=>removeColumn(col.key)}>
                        Remove
                      </button>}
                  </div>
                ))}

              </div>

              {/* 4. Review Details */}
              <div className="form-section">
                <h3 className="form-section-title">Review Details</h3>
                <div className="form-fields">
                  {field(values,"validationStatus","Validation Status")}
                  {field(values,"exceptionsIdentified","Exceptions Identified")}
                  {field(values,"reviewerComments","Reviewer Comments")}
                </div>
              </div>

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {/* 5. Approval Decision */}
              <div className="form-section">
                <h3 className="form-section-title">Approval Decision</h3>
                <div className="form-fields">
                  {field(values,"decision","Decision (Approved / Rejected / Revision Required)")}
                  {field(values,"approvalNotes","Approval Notes")}
                  {field(values,"conditions","Conditions")}
                </div>
              </div>

              {/* 6. Sign-off */}
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

                {field(values,"approvalFinalDate","Approval Date","date")}
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Usage Billing Approval
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

export default FRM02540_UsageBillingApprovalUniversal;