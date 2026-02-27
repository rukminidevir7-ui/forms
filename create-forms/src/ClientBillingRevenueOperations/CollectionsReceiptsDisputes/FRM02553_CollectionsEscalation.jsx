// FRM02553_02555_CollectionsEscalationUniversal.jsx
// FRM-02553–02555 – Collections Escalation — Universal Form
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
  escalationReferenceNo: Yup.string().required("Required"),
  escalationDate: Yup.date().required("Required"),
  clientName: Yup.string().required("Required"),
  outstandingAmount: Yup.number().required("Required"),
  escalationLevel: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02553-02555",
  department: "Client Billing & Revenue Operations",
  function: "Collections, Receipts & Disputes",

  /* 1. Escalation Details */
  escalationReferenceNo: "",
  escalationDate: "",
  initiatedBy: "",
  businessUnit: "",
  escalationLevel: "",

  /* 2. Client & Invoice Details */
  clientName: "",
  clientCode: "",
  invoiceNo: "",
  invoiceDate: "",
  dueDate: "",
  outstandingAmount: "",
  currency: "",

  /* 3. Escalation Reason & Summary */
  reasonForEscalation: "",
  summaryOfFollowups: "",
  riskAssessment: "",
  impact: "",

  /* 4. Action Plan */
  proposedAction: "",
  responsibleOwner: "",
  targetResolutionDate: "",
  escalationNotes: "",

  /* 5. Supporting Information */
  supportingDocumentsAttached: "",
  referenceCommunications: "",

  /* 6. Approval & Sign-off */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02553_CollectionsEscalationUniversal = () => {

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
    <ModernFormWrapper formId="FRM-02553-02555" title="Collections Escalation">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Collections Escalation Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02553-02555"
              title="FRM-02553–02555 — Collections Escalation — Universal Form"
              department="Client Billing & Revenue Operations | Collections, Receipts & Disputes"
            >

              {/* 1. Escalation Details */}
              <div className="form-section">
                <h3 className="form-section-title">Escalation Details</h3>
                <div className="form-fields">
                  {field(values,"escalationReferenceNo","Escalation Reference No")}
                  {field(values,"escalationDate","Escalation Date","date")}
                  {field(values,"initiatedBy","Initiated By")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"escalationLevel","Escalation Level (L1/L2/L3/Legal)")}
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
                  {field(values,"dueDate","Due Date","date")}
                  {field(values,"outstandingAmount","Outstanding Amount","number")}
                  {field(values,"currency","Currency")}
                </div>
              </div>

              {/* 3. Escalation Reason & Summary */}
              <div className="form-section">
                <h3 className="form-section-title">Escalation Reason & Summary</h3>

                {!isPrintMode &&
                  <button type="button" className="btn-submit" onClick={addField}>
                    + Add Custom Field
                  </button>
                }

                <div className="form-fields">
                  {field(values,"reasonForEscalation","Reason for Escalation","textarea")}
                  {field(values,"summaryOfFollowups","Summary of Follow-ups","textarea")}
                  {field(values,"riskAssessment","Risk Assessment","textarea")}
                  {field(values,"impact","Impact","textarea")}
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

              {/* 4. Action Plan */}
              <div className="form-section">
                <h3 className="form-section-title">Action Plan</h3>
                <div className="form-fields">
                  {field(values,"proposedAction","Proposed Action","textarea")}
                  {field(values,"responsibleOwner","Responsible Owner")}
                  {field(values,"targetResolutionDate","Target Resolution Date","date")}
                  {field(values,"escalationNotes","Escalation Notes","textarea")}
                </div>
              </div>

              {/* 5. Supporting Information */}
              <div className="form-section">
                <h3 className="form-section-title">Supporting Information</h3>
                <div className="form-fields">
                  {field(values,"supportingDocumentsAttached","Supporting Documents Attached")}
                  {field(values,"referenceCommunications","Reference Communications")}
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
                    Submit Escalation
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

export default FRM02553_CollectionsEscalationUniversal;