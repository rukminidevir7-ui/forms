// FRM02569_BillingDisputeIntakeUniversal.jsx
// FRM-02569 – Billing Dispute Intake (Client) — Universal Form
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
  disputeReferenceNo: Yup.string().required("Required"),
  disputeDate: Yup.date().required("Required"),
  clientName: Yup.string().required("Required"),
  invoiceNo: Yup.string().required("Required"),
  disputedAmount: Yup.number().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02569",
  department: "Client Billing & Revenue Operations",
  function: "Collections, Receipts & Disputes",

  /* 1. Dispute Reference */
  disputeReferenceNo: "",
  disputeDate: "",
  receivedVia: "",
  loggedBy: "",
  priority: "",

  /* 2. Client Details */
  clientName: "",
  clientCode: "",
  contactPerson: "",
  email: "",
  phone: "",

  /* 3. Invoice Details */
  invoiceNo: "",
  invoiceDate: "",
  invoiceAmount: "",
  disputedAmount: "",
  disputedPercentage: "",
  currency: "",
  dueDate: "",

  /* 4. Dispute Description */
  disputeCategory: "",
  disputeReason: "",
  clientExplanation: "",
  supportingEvidence: "",

  /* 5. Internal Assessment */
  assignedTo: "",
  initialAssessment: "",
  riskImpact: "",
  targetResolutionDate: "",

  /* 6. Sign-off */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02569_BillingDisputeIntakeUniversal = () => {

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

  const calculateDisputePercent = (values, setFieldValue) => {
    const invoiceAmt = Number(values.invoiceAmount || 0);
    const disputedAmt = Number(values.disputedAmount || 0);
    if (invoiceAmt > 0) {
      const percent = (disputedAmt / invoiceAmt) * 100;
      setFieldValue("disputedPercentage", percent.toFixed(2));
    }
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
    <ModernFormWrapper formId="FRM-02569" title="Billing Dispute Intake (Client)">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Billing Dispute Intake Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02569"
              title="FRM-02569 — Billing Dispute Intake (Client) — Universal Form"
              department="Client Billing & Revenue Operations | Collections, Receipts & Disputes"
            >

              {/* 1. Dispute Reference */}
              <div className="form-section">
                <h3 className="form-section-title">Dispute Reference</h3>
                <div className="form-fields">
                  {field(values,"disputeReferenceNo","Dispute Reference No")}
                  {field(values,"disputeDate","Dispute Date","date")}
                  {field(values,"receivedVia","Received Via")}
                  {field(values,"loggedBy","Logged By")}
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
                  {field(values,"phone","Phone")}
                </div>
              </div>

              {/* 3. Invoice Details */}
              <div className="form-section">
                <h3 className="form-section-title">Invoice Details</h3>
                <div className="form-fields">
                  {field(values,"invoiceNo","Invoice No")}
                  {field(values,"invoiceDate","Invoice Date","date")}
                  {field(values,"invoiceAmount","Invoice Amount","number",
                    ()=>calculateDisputePercent(values,setFieldValue))}
                  {field(values,"disputedAmount","Disputed Amount","number",
                    ()=>calculateDisputePercent(values,setFieldValue))}
                  {field(values,"disputedPercentage","Disputed %")}
                  {field(values,"currency","Currency")}
                  {field(values,"dueDate","Due Date","date")}
                </div>
              </div>

              {/* 4. Dispute Description */}
              <div className="form-section">
                <h3 className="form-section-title">Dispute Description</h3>

                {!isPrintMode &&
                  <button type="button" className="btn-submit" onClick={addField}>
                    + Add Custom Field
                  </button>
                }

                <div className="form-fields">
                  {field(values,"disputeCategory","Dispute Category")}
                  {field(values,"disputeReason","Dispute Reason","textarea")}
                  {field(values,"clientExplanation","Client Explanation","textarea")}
                  {field(values,"supportingEvidence","Supporting Evidence")}
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

              {/* 5. Internal Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">Internal Assessment</h3>
                <div className="form-fields">
                  {field(values,"assignedTo","Assigned To")}
                  {field(values,"initialAssessment","Initial Assessment","textarea")}
                  {field(values,"riskImpact","Risk / Impact","textarea")}
                  {field(values,"targetResolutionDate","Target Resolution Date","date")}
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

                {field(values,"approvalDate","Approval Date","date")}
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Dispute Intake
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

export default FRM02569_BillingDisputeIntakeUniversal;