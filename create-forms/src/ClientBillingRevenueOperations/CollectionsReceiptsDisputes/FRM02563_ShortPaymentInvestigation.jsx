// FRM02563_02565_ShortPaymentInvestigationUniversal.jsx
// FRM-02563–02565 – Short Payment Investigation — Universal Form
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
  investigationReferenceNo: Yup.string().required("Required"),
  investigationDate: Yup.date().required("Required"),
  clientName: Yup.string().required("Required"),
  invoiceAmount: Yup.number().required("Required"),
  receivedAmount: Yup.number().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02563-02565",
  department: "Client Billing & Revenue Operations",
  function: "Collections, Receipts & Disputes",

  /* 1. Investigation Details */
  investigationReferenceNo: "",
  investigationDate: "",
  initiatedBy: "",
  businessUnit: "",
  priorityLevel: "",

  /* 2. Client & Invoice Details */
  clientName: "",
  clientCode: "",
  invoiceNo: "",
  invoiceDate: "",
  invoiceAmount: "",
  receivedAmount: "",
  shortPaidAmount: "",
  currency: "",

  /* 3. Investigation Summary */
  reasonForShortPayment: "",
  customerExplanation: "",
  internalFindings: "",
  riskImpact: "",

  /* 4. Resolution Plan */
  proposedResolution: "",
  adjustmentRequired: "",
  responsibleOwner: "",
  targetResolutionDate: "",

  /* 5. Supporting Information */
  supportingDocumentsAttached: "",
  customerCommunicationReference: "",
  notes: "",

  /* 6. Approval & Sign-off */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02563_ShortPaymentInvestigationUniversal = () => {

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

  const calculateShortPay = (values, setFieldValue) => {
    const invoiceAmt = Number(values.invoiceAmount || 0);
    const receivedAmt = Number(values.receivedAmount || 0);
    const shortAmt = invoiceAmt - receivedAmt;
    setFieldValue("shortPaidAmount", shortAmt.toFixed(2));
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
    <ModernFormWrapper formId="FRM-02563-02565" title="Short Payment Investigation">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Short Payment Investigation Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02563-02565"
              title="FRM-02563–02565 — Short Payment Investigation — Universal Form"
              department="Client Billing & Revenue Operations | Collections, Receipts & Disputes"
            >

              {/* 1. Investigation Details */}
              <div className="form-section">
                <h3 className="form-section-title">Investigation Details</h3>
                <div className="form-fields">
                  {field(values,"investigationReferenceNo","Investigation Reference No")}
                  {field(values,"investigationDate","Investigation Date","date")}
                  {field(values,"initiatedBy","Initiated By")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"priorityLevel","Priority Level")}
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
                    ()=>calculateShortPay(values,setFieldValue))}
                  {field(values,"receivedAmount","Received Amount","number",
                    ()=>calculateShortPay(values,setFieldValue))}
                  {field(values,"shortPaidAmount","Short Paid Amount")}
                  {field(values,"currency","Currency")}
                </div>
              </div>

              {/* 3. Investigation Summary */}
              <div className="form-section">
                <h3 className="form-section-title">Investigation Summary</h3>

                {!isPrintMode &&
                  <button type="button" className="btn-submit" onClick={addField}>
                    + Add Custom Field
                  </button>
                }

                <div className="form-fields">
                  {field(values,"reasonForShortPayment","Reason for Short Payment","textarea")}
                  {field(values,"customerExplanation","Customer Explanation","textarea")}
                  {field(values,"internalFindings","Internal Findings","textarea")}
                  {field(values,"riskImpact","Risk / Impact","textarea")}
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

              {/* 4. Resolution Plan */}
              <div className="form-section">
                <h3 className="form-section-title">Resolution Plan</h3>
                <div className="form-fields">
                  {field(values,"proposedResolution","Proposed Resolution","textarea")}
                  <div className="form-field">
                    <label className="form-label">Adjustment Required (Yes/No)</label>
                    <Field as="select" name="adjustmentRequired" className="form-input">
                      <option value="">Select</option>
                      <option>Yes</option>
                      <option>No</option>
                    </Field>
                  </div>
                  {field(values,"responsibleOwner","Responsible Owner")}
                  {field(values,"targetResolutionDate","Target Resolution Date","date")}
                </div>
              </div>

              {/* 5. Supporting Information */}
              <div className="form-section">
                <h3 className="form-section-title">Supporting Information</h3>
                <div className="form-fields">
                  {field(values,"supportingDocumentsAttached","Supporting Documents Attached")}
                  {field(values,"customerCommunicationReference","Customer Communication Reference")}
                  {field(values,"notes","Notes","textarea")}
                </div>
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
                    Submit Investigation
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

export default FRM02563_ShortPaymentInvestigationUniversal;