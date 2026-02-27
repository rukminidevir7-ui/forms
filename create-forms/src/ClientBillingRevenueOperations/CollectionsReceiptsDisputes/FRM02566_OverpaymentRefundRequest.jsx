// FRM02566_02567_OverpaymentRefundUniversal.jsx
// FRM-02566–02567 – Overpayment Refund — Universal Form
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
  requestReferenceNo: Yup.string().required("Required"),
  requestDate: Yup.date().required("Required"),
  clientName: Yup.string().required("Required"),
  receivedAmount: Yup.number().required("Required"),
  invoiceAmount: Yup.number().required("Required"),
  refundAmount: Yup.number().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02566-02567",
  department: "Client Billing & Revenue Operations",
  function: "Collections, Receipts & Disputes",

  /* 1. Request Details */
  requestReferenceNo: "",
  requestDate: "",
  requestedBy: "",
  businessUnit: "",
  priority: "",

  /* 2. Client Details */
  clientName: "",
  clientCode: "",
  contactPerson: "",
  email: "",

  /* 3. Payment Details */
  originalInvoiceNo: "",
  invoiceAmount: "",
  receivedAmount: "",
  overpaymentAmount: "",
  currency: "",
  paymentReference: "",
  paymentDate: "",

  /* 4. Refund Details */
  refundMethod: "",
  bankName: "",
  accountName: "",
  accountNumber: "",
  swiftIfsc: "",
  refundAmount: "",
  reasonForRefund: "",

  /* 5. Supporting Information */
  supportingDocumentsAttached: "",
  bankConfirmationReference: "",
  notes: "",

  /* 6. Approval */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02566_OverpaymentRefundUniversal = () => {

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

  const calculateOverpayment = (values, setFieldValue) => {
    const invoiceAmt = Number(values.invoiceAmount || 0);
    const receivedAmt = Number(values.receivedAmount || 0);
    const overAmt = receivedAmt - invoiceAmt;
    setFieldValue("overpaymentAmount", overAmt.toFixed(2));
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
    <ModernFormWrapper formId="FRM-02566-02567" title="Overpayment Refund">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Overpayment Refund Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02566-02567"
              title="FRM-02566–02567 — Overpayment Refund — Universal Form"
              department="Client Billing & Revenue Operations | Collections, Receipts & Disputes"
            >

              {/* 1. Request Details */}
              <div className="form-section">
                <h3 className="form-section-title">Request Details</h3>
                <div className="form-fields">
                  {field(values,"requestReferenceNo","Request Reference No")}
                  {field(values,"requestDate","Request Date","date")}
                  {field(values,"requestedBy","Requested By")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"priority","Priority")}
                </div>
              </div>

              {/* 2. Client Details */}
              <div className="form-section">
                <h3 className="form-section-title">Client Details</h3>
                <div className="form-fields">
                  {field(values,"clientName","Client Name")}
                  {field(values,"clientCode","Client Code")}
                  {field(values,"contactPerson","Contact Person")}
                  {field(values,"email","Email","email")}
                </div>
              </div>

              {/* 3. Payment Details */}
              <div className="form-section">
                <h3 className="form-section-title">Payment Details</h3>
                <div className="form-fields">
                  {field(values,"originalInvoiceNo","Original Invoice No")}
                  {field(values,"invoiceAmount","Invoice Amount","number",
                    ()=>calculateOverpayment(values,setFieldValue))}
                  {field(values,"receivedAmount","Received Amount","number",
                    ()=>calculateOverpayment(values,setFieldValue))}
                  {field(values,"overpaymentAmount","Overpayment Amount")}
                  {field(values,"currency","Currency")}
                  {field(values,"paymentReference","Payment Reference")}
                  {field(values,"paymentDate","Payment Date","date")}
                </div>
              </div>

              {/* 4. Refund Details */}
              <div className="form-section">
                <h3 className="form-section-title">Refund Details</h3>
                <div className="form-fields">
                  {field(values,"refundMethod","Refund Method")}
                  {field(values,"bankName","Bank Name")}
                  {field(values,"accountName","Account Name")}
                  {field(values,"accountNumber","Account Number / IBAN")}
                  {field(values,"swiftIfsc","SWIFT / IFSC")}
                  {field(values,"refundAmount","Refund Amount","number")}
                  {field(values,"reasonForRefund","Reason for Refund","textarea")}
                </div>
              </div>

              {/* 5. Supporting Information */}
              <div className="form-section">
                <h3 className="form-section-title">Supporting Information</h3>

                {!isPrintMode &&
                  <button type="button" className="btn-submit" onClick={addField}>
                    + Add Custom Field
                  </button>
                }

                <div className="form-fields">
                  {field(values,"supportingDocumentsAttached","Supporting Documents Attached")}
                  {field(values,"bankConfirmationReference","Bank Confirmation Reference")}
                  {field(values,"notes","Notes","textarea")}
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

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {/* 6. Approval & Sign-off */}
              <div className="form-section">
                <h3 className="form-section-title">Approval & Sign-off</h3>

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
                    Submit Refund Request
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

export default FRM02566_OverpaymentRefundUniversal;