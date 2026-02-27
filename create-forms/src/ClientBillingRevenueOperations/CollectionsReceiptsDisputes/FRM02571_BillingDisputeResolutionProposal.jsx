// FRM02571_BillingDisputeResolutionProposalUniversal.jsx
// FRM-02571 – Billing Dispute Resolution Proposal — Universal Form
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
  proposalReferenceNo: Yup.string().required("Required"),
  disputeReferenceNo: Yup.string().required("Required"),
  clientName: Yup.string().required("Required"),
  invoiceNo: Yup.string().required("Required"),
  resolutionType: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02571",
  department: "Client Billing & Revenue Operations",
  function: "Collections, Receipts & Disputes",

  /* 1. Reference Details */
  proposalReferenceNo: "",
  disputeReferenceNo: "",
  proposalDate: "",
  preparedBy: "",
  businessUnit: "",

  /* 2. Client & Invoice Details */
  clientName: "",
  clientCode: "",
  invoiceNo: "",
  invoiceDate: "",
  invoiceAmount: "",
  disputedAmount: "",
  currency: "",

  /* 3. Issue Summary */
  issueDescription: "",
  rootCause: "",
  impact: "",
  riskLevel: "",

  /* 4. Proposed Resolution */
  resolutionType: "",
  proposedAdjustmentAmount: "",
  revisedAmount: "",
  actionsRequired: "",
  targetResolutionDate: "",

  /* 5. Supporting Information */
  supportingDocumentsAttached: "",
  stakeholderComments: "",
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

const FRM02571_BillingDisputeResolutionProposalUniversal = () => {

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

  const calculateRevisedAmount = (values, setFieldValue) => {
    const invoiceAmt = Number(values.invoiceAmount || 0);
    const adjustment = Number(values.proposedAdjustmentAmount || 0);
    const revised = invoiceAmt - adjustment;
    setFieldValue("revisedAmount", revised.toFixed(2));
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
    <ModernFormWrapper formId="FRM-02571" title="Billing Dispute Resolution Proposal">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Resolution Proposal Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02571"
              title="FRM-02571 — Billing Dispute Resolution Proposal — Universal Form"
              department="Client Billing & Revenue Operations | Collections, Receipts & Disputes"
            >

              {/* 1. Reference Details */}
              <div className="form-section">
                <h3 className="form-section-title">Reference Details</h3>
                <div className="form-fields">
                  {field(values,"proposalReferenceNo","Proposal Reference No")}
                  {field(values,"disputeReferenceNo","Dispute Reference No")}
                  {field(values,"proposalDate","Proposal Date","date")}
                  {field(values,"preparedBy","Prepared By")}
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
                    ()=>calculateRevisedAmount(values,setFieldValue))}
                  {field(values,"disputedAmount","Disputed Amount","number")}
                  {field(values,"currency","Currency")}
                </div>
              </div>

              {/* 3. Issue Summary */}
              <div className="form-section">
                <h3 className="form-section-title">Issue Summary</h3>
                <div className="form-fields">
                  {field(values,"issueDescription","Issue Description","textarea")}
                  {field(values,"rootCause","Root Cause","textarea")}
                  {field(values,"impact","Impact","textarea")}
                  {field(values,"riskLevel","Risk Level")}
                </div>
              </div>

              {/* 4. Proposed Resolution */}
              <div className="form-section">
                <h3 className="form-section-title">Proposed Resolution</h3>

                {!isPrintMode &&
                  <button type="button" className="btn-submit" onClick={addField}>
                    + Add Custom Field
                  </button>
                }

                <div className="form-fields">
                  {field(values,"resolutionType","Resolution Type")}
                  {field(values,"proposedAdjustmentAmount","Proposed Adjustment Amount","number",
                    ()=>calculateRevisedAmount(values,setFieldValue))}
                  {field(values,"revisedAmount","Revised Amount")}
                  {field(values,"actionsRequired","Actions Required","textarea")}
                  {field(values,"targetResolutionDate","Target Resolution Date","date")}
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

              {/* 5. Supporting Information */}
              <div className="form-section">
                <h3 className="form-section-title">Supporting Information</h3>
                <div className="form-fields">
                  {field(values,"supportingDocumentsAttached","Supporting Documents Attached")}
                  {field(values,"stakeholderComments","Stakeholder Comments","textarea")}
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
                    Submit Resolution Proposal
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

export default FRM02571_BillingDisputeResolutionProposalUniversal;