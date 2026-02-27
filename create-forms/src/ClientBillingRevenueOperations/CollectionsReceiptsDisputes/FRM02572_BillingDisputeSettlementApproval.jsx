// FRM02572_BillingDisputeSettlementApprovalUniversal.jsx
// FRM-02572 – Billing Dispute Settlement Approval — Universal Form
// Enterprise Grade – Client Billing & Revenue Operations – Collections, Receipts & Disputes

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
  disputeReferenceNo: Yup.string().required("Required"),
  proposalReferenceNo: Yup.string().required("Required"),
  clientName: Yup.string().required("Required"),
  decision: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02572",
  department: "Client Billing & Revenue Operations",
  function: "Collections, Receipts & Disputes",

  /* 1. Reference Details */
  approvalReferenceNo: "",
  disputeReferenceNo: "",
  proposalReferenceNo: "",
  approvalDate: "",
  businessUnit: "",

  /* 2. Client & Invoice Details */
  clientName: "",
  clientCode: "",
  invoiceNo: "",
  invoiceDate: "",
  invoiceAmount: "",
  disputedAmount: "",
  currency: "",

  /* 3. Settlement Summary */
  settlementType: "",
  approvedAdjustmentAmount: "",
  revisedInvoiceAmount: "",
  financialImpact: "",
  effectiveDate: "",

  /* 4. Review Notes */
  reviewerComments: "",
  conditions: "",
  exceptions: "",

  /* 5. Decision */
  decision: "",
  approvalNotes: "",

  /* 6. Sign-off */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ]
};

/* ================= COMPONENT ================= */

const FRM02572_BillingDisputeSettlementApprovalUniversal = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicFields, setDynamicFields] = useState([]);

  const addField = () => {
    const fieldName = prompt("Enter New Field Name");
    if (!fieldName) return;
    const key = fieldName.replace(/\s+/g, "");
    if (dynamicFields.find(f => f.key === key)) return alert("Field exists");
    setDynamicFields([...dynamicFields, { key, label: fieldName }]);
  };

  const removeField = (key) => {
    setDynamicFields(dynamicFields.filter(f => f.key !== key));
  };

  const calculateRevisedInvoice = (values, setFieldValue) => {
    const invoiceAmt = Number(values.invoiceAmount || 0);
    const adjustment = Number(values.approvedAdjustmentAmount || 0);
    const revised = invoiceAmt - adjustment;
    setFieldValue("revisedInvoiceAmount", revised.toFixed(2));
    setFieldValue("financialImpact", adjustment.toFixed(2));
  };

  const field = (values, name, label, type="text", onBlurHandler=null) => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : <>
            <Field
              as={type === "textarea" ? "textarea" : "input"}
              type={type !== "textarea" ? type : undefined}
              name={name}
              className="form-input"
              onBlur={onBlurHandler}
            />
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-02572" title="Billing Dispute Settlement Approval">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Settlement Approval Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02572"
              title="FRM-02572 — Billing Dispute Settlement Approval — Universal Form"
              department="Client Billing & Revenue Operations | Collections, Receipts & Disputes"
            >

              {/* 1. Reference Details */}
              <div className="form-section">
                <h3 className="form-section-title">Reference Details</h3>
                <div className="form-fields">
                  {field(values,"approvalReferenceNo","Approval Reference No")}
                  {field(values,"disputeReferenceNo","Dispute Reference No")}
                  {field(values,"proposalReferenceNo","Proposal Reference No")}
                  {field(values,"approvalDate","Approval Date","date")}
                  {field(values,"businessUnit","Business Unit")}
                </div>
              </div>

              {/* 2. Client & Invoice Details */}
              <div className="form-section">
                <h3 className="form-section-title">Client & Invoice Details</h3>
                <div className="form-fields">
                  {field(values,"clientName","Client Name")}
                  {field(values,"clientCode","Client Code")}
                  {field(values,"invoiceNo","Invoice No")}
                  {field(values,"invoiceDate","Invoice Date","date")}
                  {field(values,"invoiceAmount","Invoice Amount","number",
                    ()=>calculateRevisedInvoice(values,setFieldValue))}
                  {field(values,"disputedAmount","Disputed Amount","number")}
                  {field(values,"currency","Currency")}
                </div>
              </div>

              {/* 3. Settlement Summary */}
              <div className="form-section">
                <h3 className="form-section-title">Settlement Summary</h3>

                {!isPrintMode &&
                  <button type="button" className="btn-submit" onClick={addField}>
                    + Add Custom Field
                  </button>
                }

                <div className="form-fields">
                  {field(values,"settlementType","Settlement Type")}
                  {field(values,"approvedAdjustmentAmount","Approved Adjustment Amount","number",
                    ()=>calculateRevisedInvoice(values,setFieldValue))}
                  {field(values,"revisedInvoiceAmount","Revised Invoice Amount")}
                  {field(values,"financialImpact","Financial Impact")}
                  {field(values,"effectiveDate","Effective Date","date")}
                </div>

                {dynamicFields.map(f=>(
                  <div key={f.key} className="form-field">
                    <label className="form-label">{f.label}</label>
                    <Field name={`dynamic_${f.key}`} className="form-input"/>
                    {!isPrintMode &&
                      <button type="button" onClick={()=>removeField(f.key)}>
                        Remove
                      </button>}
                  </div>
                ))}

              </div>

              {/* 4. Review Notes */}
              <div className="form-section">
                <h3 className="form-section-title">Review Notes</h3>
                <div className="form-fields">
                  {field(values,"reviewerComments","Reviewer Comments","textarea")}
                  {field(values,"conditions","Conditions","textarea")}
                  {field(values,"exceptions","Exceptions","textarea")}
                </div>
              </div>

              {/* 5. Decision */}
              <div className="form-section">
                <h3 className="form-section-title">Decision</h3>
                <div className="form-fields">
                  <div className="form-field">
                    <label className="form-label">Decision</label>
                    <Field as="select" name="decision" className="form-input">
                      <option value="">Select</option>
                      <option>Approved</option>
                      <option>Rejected</option>
                      <option>Rework</option>
                    </Field>
                  </div>
                  {field(values,"approvalNotes","Approval Notes","textarea")}
                </div>
              </div>

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

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

              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Settlement Approval
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

export default FRM02572_BillingDisputeSettlementApprovalUniversal;