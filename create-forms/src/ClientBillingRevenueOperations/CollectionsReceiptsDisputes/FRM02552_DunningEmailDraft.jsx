// FRM02552_DunningEmailDraftUniversal.jsx
// FRM-02552 – Dunning Email Draft — Universal Form
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
  draftReferenceNo: Yup.string().required("Required"),
  draftDate: Yup.date().required("Required"),
  clientName: Yup.string().required("Required"),
  invoiceNo: Yup.string().required("Required"),
  outstandingAmount: Yup.number().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02552",
  department: "Client Billing & Revenue Operations",
  function: "Collections, Receipts & Disputes",

  /* 1. Reference Details */
  draftReferenceNo: "",
  draftDate: "",
  preparedBy: "",
  dunningLevel: "",

  /* 2. Client Details */
  clientName: "",
  clientCode: "",
  contactPerson: "",
  email: "",

  /* 3. Outstanding Details */
  invoiceNo: "",
  invoiceDate: "",
  dueDate: "",
  outstandingAmount: "",
  currency: "",
  agingBucket: "",

  /* 4. Email Content */
  emailSubject: "",
  emailBody: "",
  attachments: "",

  /* 5. Review & Approval */
  remarks: "",
  approvalRoles: [
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02552_DunningEmailDraftUniversal = () => {

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
            <Field as={type === "textarea" ? "textarea" : "input"}
                   name={name}
                   type={type !== "textarea" ? type : undefined}
                   className="form-input"
            />
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-02552" title="Dunning Email Draft">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Dunning Email Draft Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02552"
              title="FRM-02552 — Dunning Email Draft — Universal Form"
              department="Client Billing & Revenue Operations | Collections, Receipts & Disputes"
            >

              {/* 1. Reference Details */}
              <div className="form-section">
                <h3 className="form-section-title">Reference Details</h3>
                <div className="form-fields">
                  {field(values,"draftReferenceNo","Draft Reference No")}
                  {field(values,"draftDate","Draft Date","date")}
                  {field(values,"preparedBy","Prepared By")}
                  {field(values,"dunningLevel","Dunning Level")}
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

              {/* 3. Outstanding Details */}
              <div className="form-section">
                <h3 className="form-section-title">Outstanding Details</h3>
                <div className="form-fields">
                  {field(values,"invoiceNo","Invoice No")}
                  {field(values,"invoiceDate","Invoice Date","date")}
                  {field(values,"dueDate","Due Date","date")}
                  {field(values,"outstandingAmount","Outstanding Amount","number")}
                  {field(values,"currency","Currency")}
                  {field(values,"agingBucket","Aging Bucket")}
                </div>
              </div>

              {/* 4. Email Content */}
              <div className="form-section">
                <h3 className="form-section-title">Email Content</h3>

                {!isPrintMode &&
                  <button type="button" className="btn-submit" onClick={addField}>
                    + Add Custom Field
                  </button>
                }

                <div className="form-fields">
                  {field(values,"emailSubject","Email Subject")}
                  {field(values,"emailBody","Email Body","textarea")}
                  {field(values,"attachments","Attachments")}
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

              {/* 5. Review & Approval */}
              <div className="form-section">
                <h3 className="form-section-title">Review & Approval</h3>

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
                {field(values,"remarks","Remarks")}
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Dunning Draft
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

export default FRM02552_DunningEmailDraftUniversal;