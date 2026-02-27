// FRM02533_MilestoneBillingRequestUniversal.jsx
// FRM-02533 – Milestone Billing Request — Universal Form
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
  clientName: Yup.string().required("Required"),
  milestoneName: Yup.string().required("Required"),
  milestoneAmount: Yup.number().required("Required"),
  currency: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02533",
  department: "Client Billing & Revenue Operations",
  function: "Invoicing (T&M, Milestone, Usage)",

  /* 1. Client / Project Details */
  clientName: "",
  clientCode: "",
  projectName: "",
  projectCode: "",
  businessUnit: "",
  requestDate: "",

  /* 2. Milestone Information */
  milestoneName: "",
  milestoneReference: "",
  completionDate: "",
  acceptanceDate: "",
  billingTrigger: "",

  /* 3. Billing Details */
  milestoneAmount: "",
  taxes: "",
  totalAmount: "",
  currency: "",
  poReference: "",

  /* 4. Supporting Documents */
  completionCertificateAttached: "",
  clientAcceptanceAttached: "",
  additionalRemarks: "",

  /* 5. Approval */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02533_MilestoneBillingRequestUniversal = () => {

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

  const calculateTotal = (values, setFieldValue) => {
    const amount = Number(values.milestoneAmount || 0);
    const tax = Number(values.taxes || 0);
    const total = amount + tax;
    setFieldValue("totalAmount", total.toFixed(2));
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
    <ModernFormWrapper formId="FRM-02533" title="Milestone Billing Request">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Milestone Billing Request Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02533"
              title="FRM-02533 — Milestone Billing Request"
              department="Client Billing & Revenue Operations | Invoicing (T&M, Milestone, Usage)"
            >

              {/* 1. Client / Project Details */}
              <div className="form-section">
                <h3 className="form-section-title">Client / Project Details</h3>
                <div className="form-fields">
                  {field(values,"clientName","Client Name")}
                  {field(values,"clientCode","Client Code")}
                  {field(values,"projectName","Project / Contract Name")}
                  {field(values,"projectCode","Project Code")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"requestDate","Request Date","date")}
                </div>
              </div>

              {/* 2. Milestone Information */}
              <div className="form-section">
                <h3 className="form-section-title">Milestone Information</h3>
                <div className="form-fields">
                  {field(values,"milestoneName","Milestone Name")}
                  {field(values,"milestoneReference","Milestone Reference")}
                  {field(values,"completionDate","Completion Date","date")}
                  {field(values,"acceptanceDate","Acceptance Date","date")}
                  {field(values,"billingTrigger","Billing Trigger")}
                </div>
              </div>

              {/* 3. Billing Details */}
              <div className="form-section">
                <h3 className="form-section-title">Billing Details</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 15 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Additional Field
                    </button>
                  </div>
                )}

                <div className="form-fields">
                  {field(values,"milestoneAmount","Milestone Amount","number",
                    ()=>calculateTotal(values,setFieldValue))}
                  {field(values,"taxes","Taxes","number",
                    ()=>calculateTotal(values,setFieldValue))}
                  {field(values,"totalAmount","Total Amount")}
                  {field(values,"currency","Currency")}
                  {field(values,"poReference","PO Reference")}
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

              {/* 4. Supporting Documents */}
              <div className="form-section">
                <h3 className="form-section-title">Supporting Documents</h3>
                <div className="form-fields">
                  {field(values,"completionCertificateAttached","Completion Certificate Attached")}
                  {field(values,"clientAcceptanceAttached","Client Acceptance Attached")}
                  {field(values,"additionalRemarks","Additional Remarks")}
                </div>
              </div>

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {/* 5. Approval */}
              <div className="form-section">
                <h3 className="form-section-title">Approval</h3>

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
                    Submit Milestone Billing Request
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

export default FRM02533_MilestoneBillingRequestUniversal;