// FRM02573_02575_WriteOffProposalUniversal.jsx
// FRM-02573–02575 – Write-off Proposal — Universal Form
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
  proposalDate: Yup.date().required("Required"),
  clientName: Yup.string().required("Required"),
  invoiceNo: Yup.string().required("Required"),
  proposedWriteOffAmount: Yup.number().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02573-02575",
  department: "Client Billing & Revenue Operations",
  function: "Collections, Receipts & Disputes",

  /* 1. Proposal Details */
  proposalReferenceNo: "",
  proposalDate: "",
  initiatedBy: "",
  businessUnit: "",
  priorityLevel: "",

  /* 2. Client & Invoice Details */
  clientName: "",
  clientCode: "",
  invoiceNo: "",
  invoiceDate: "",
  invoiceAmount: "",
  outstandingAmount: "",
  currency: "",

  /* 3. Write-off Justification */
  reasonForWriteOff: "",
  collectionEffortsSummary: "",
  rootCause: "",
  riskImpact: "",

  /* 4. Financial Impact */
  proposedWriteOffAmount: "",
  provisionAvailable: "",
  netImpact: "",
  glAccount: "",
  effectiveDate: "",

  /* 5. Supporting Information */
  supportingDocumentsAttached: "",
  legalComplianceNotes: "",
  remarks: "",

  /* 6. Approval */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02573_WriteOffProposalUniversal = () => {

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

  const calculateNetImpact = (values, setFieldValue) => {
    const writeOff = Number(values.proposedWriteOffAmount || 0);
    const provision = Number(values.provisionAvailable || 0);
    const net = writeOff - provision;
    setFieldValue("netImpact", net.toFixed(2));
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
    <ModernFormWrapper formId="FRM-02573-02575" title="Write-off Proposal">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Write-off Proposal Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02573-02575"
              title="FRM-02573–02575 — Write-off Proposal — Universal Form"
              department="Client Billing & Revenue Operations | Collections, Receipts & Disputes"
            >

              {/* 1. Proposal Details */}
              <div className="form-section">
                <h3 className="form-section-title">Proposal Details</h3>
                <div className="form-fields">
                  {field(values,"proposalReferenceNo","Proposal Reference No")}
                  {field(values,"proposalDate","Proposal Date","date")}
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
                  {field(values,"invoiceAmount","Invoice Amount","number")}
                  {field(values,"outstandingAmount","Outstanding Amount","number")}
                  {field(values,"currency","Currency")}
                </div>
              </div>

              {/* 3. Write-off Justification */}
              <div className="form-section">
                <h3 className="form-section-title">Write-off Justification</h3>
                <div className="form-fields">
                  {field(values,"reasonForWriteOff","Reason for Write-off","textarea")}
                  {field(values,"collectionEffortsSummary","Collection Efforts Summary","textarea")}
                  {field(values,"rootCause","Root Cause","textarea")}
                  {field(values,"riskImpact","Risk / Impact","textarea")}
                </div>
              </div>

              {/* 4. Financial Impact */}
              <div className="form-section">
                <h3 className="form-section-title">Financial Impact</h3>

                {!isPrintMode &&
                  <button type="button" className="btn-submit" onClick={addField}>
                    + Add Custom Field
                  </button>
                }

                <div className="form-fields">
                  {field(values,"proposedWriteOffAmount","Proposed Write-off Amount","number",
                    ()=>calculateNetImpact(values,setFieldValue))}
                  {field(values,"provisionAvailable","Provision Available","number",
                    ()=>calculateNetImpact(values,setFieldValue))}
                  {field(values,"netImpact","Net Impact")}
                  {field(values,"glAccount","GL Account")}
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

              {/* 5. Supporting Information */}
              <div className="form-section">
                <h3 className="form-section-title">Supporting Information</h3>
                <div className="form-fields">
                  {field(values,"supportingDocumentsAttached","Supporting Documents Attached")}
                  {field(values,"legalComplianceNotes","Legal / Compliance Notes","textarea")}
                  {field(values,"remarks","Remarks","textarea")}
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
                    Submit Write-off Proposal
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

export default FRM02573_WriteOffProposalUniversal;