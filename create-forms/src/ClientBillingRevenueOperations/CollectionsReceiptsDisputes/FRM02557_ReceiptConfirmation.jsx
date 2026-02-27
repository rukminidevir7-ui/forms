// FRM02557_02559_ReceiptConfirmationUniversal.jsx
// FRM-02557–02559 – Receipt Confirmation — Universal Form
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
  receiptReferenceNo: Yup.string().required("Required"),
  receiptDate: Yup.date().required("Required"),
  clientName: Yup.string().required("Required"),
  paymentAmount: Yup.number().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02557-02559",
  department: "Client Billing & Revenue Operations",
  function: "Collections, Receipts & Disputes",

  /* 1. Receipt Details */
  receiptReferenceNo: "",
  receiptDate: "",
  receivedBy: "",
  businessUnit: "",
  receiptMethod: "",

  /* 2. Client Details */
  clientName: "",
  clientCode: "",
  contactPerson: "",
  email: "",

  /* 3. Payment Details */
  invoiceNo: "",
  invoiceDate: "",
  paymentAmount: "",
  currency: "",
  paymentReference: "",
  valueDate: "",

  /* 4. Allocation Details */
  allocatedAmount: "",
  unappliedAmount: "",
  allocationNotes: "",

  /* 5. Supporting Information */
  supportingDocumentsAttached: "",
  bankConfirmationReference: "",
  remarks: "",

  /* 6. Approval & Sign-off */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02557_02559_ReceiptConfirmationUniversal = () => {

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

  const field = (values, name, label, type="text") => (
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
            />
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-02557-02559" title="Receipt Confirmation">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Receipt Confirmation Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02557-02559"
              title="FRM-02557–02559 — Receipt Confirmation — Universal Form"
              department="Client Billing & Revenue Operations | Collections, Receipts & Disputes"
            >

              {/* 1. Receipt Details */}
              <div className="form-section">
                <h3 className="form-section-title">Receipt Details</h3>
                <div className="form-fields">
                  {field(values,"receiptReferenceNo","Receipt Reference No")}
                  {field(values,"receiptDate","Receipt Date","date")}
                  {field(values,"receivedBy","Received By")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"receiptMethod","Receipt Method (Bank / Wire / Cheque / Cash)")}
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
                  {field(values,"invoiceNo","Invoice No")}
                  {field(values,"invoiceDate","Invoice Date","date")}
                  {field(values,"paymentAmount","Payment Amount","number")}
                  {field(values,"currency","Currency")}
                  {field(values,"paymentReference","Payment Reference / Transaction ID")}
                  {field(values,"valueDate","Value Date","date")}
                </div>
              </div>

              {/* 4. Allocation Details */}
              <div className="form-section">
                <h3 className="form-section-title">Allocation Details</h3>
                <div className="form-fields">
                  {field(values,"allocatedAmount","Allocated Amount","number")}
                  {field(values,"unappliedAmount","Unapplied Amount","number")}
                  {field(values,"allocationNotes","Allocation Notes","textarea")}
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
                  {field(values,"remarks","Remarks","textarea")}
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
                    Submit Receipt Confirmation
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

export default FRM02557_02559_ReceiptConfirmationUniversal;