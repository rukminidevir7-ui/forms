// FRM02547_BillingAdjustmentRequestUniversal.jsx
// FRM-02547 – Billing Adjustment Request — Universal Form
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
  adjustmentReferenceNo: Yup.string().required("Required"),
  requestDate: Yup.date().required("Required"),
  clientName: Yup.string().required("Required"),
  adjustmentAmount: Yup.number().required("Required"),
  currency: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02547",
  department: "Client Billing & Revenue Operations",
  function: "Invoicing (T&M, Milestone, Usage)",

  /* 1. Request Details */
  adjustmentReferenceNo: "",
  requestDate: "",
  requestedBy: "",
  businessUnit: "",

  /* 2. Client / Invoice Details */
  clientName: "",
  clientCode: "",
  invoiceNo: "",
  invoiceDate: "",
  billingPeriod: "",

  /* 3. Adjustment Details */
  adjustmentType: "",
  reasonForAdjustment: "",
  effectiveDate: "",
  impactArea: "",

  /* 4. Amount Impact */
  originalAmount: "",
  adjustmentAmount: "",
  revisedAmount: "",
  currency: "",
  remarks: "",

  /* 5. Supporting Information */
  supportingDocumentsAttached: "",
  approvalReference: "",

  /* 6. Approval */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02547_BillingAdjustmentRequestUniversal = () => {

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

  const calculateRevisedAmount = (values, setFieldValue) => {
    const original = Number(values.originalAmount || 0);
    const adjustment = Number(values.adjustmentAmount || 0);
    const revised = original + adjustment;
    setFieldValue("revisedAmount", revised.toFixed(2));
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
    <ModernFormWrapper formId="FRM-02547" title="Billing Adjustment Request">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Billing Adjustment Request Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02547"
              title="FRM-02547 — Billing Adjustment Request — Universal Form"
              department="Client Billing & Revenue Operations | Invoicing (T&M, Milestone, Usage)"
            >

              {/* 1. Request Details */}
              <div className="form-section">
                <h3 className="form-section-title">Request Details</h3>
                <div className="form-fields">
                  {field(values,"adjustmentReferenceNo","Adjustment Reference No")}
                  {field(values,"requestDate","Request Date","date")}
                  {field(values,"requestedBy","Requested By")}
                  {field(values,"businessUnit","Business Unit")}
                </div>
              </div>

              {/* 2. Client / Invoice Details */}
              <div className="form-section">
                <h3 className="form-section-title">Client / Invoice Details</h3>
                <div className="form-fields">
                  {field(values,"clientName","Client Name")}
                  {field(values,"clientCode","Client Code")}
                  {field(values,"invoiceNo","Invoice No")}
                  {field(values,"invoiceDate","Invoice Date","date")}
                  {field(values,"billingPeriod","Billing Period")}
                </div>
              </div>

              {/* 3. Adjustment Details */}
              <div className="form-section">
                <h3 className="form-section-title">Adjustment Details</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 15 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Additional Field
                    </button>
                  </div>
                )}

                <div className="form-fields">
                  {field(values,"adjustmentType","Adjustment Type")}
                  {field(values,"reasonForAdjustment","Reason for Adjustment")}
                  {field(values,"effectiveDate","Effective Date","date")}
                  {field(values,"impactArea","Impact Area")}
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

              {/* 4. Amount Impact */}
              <div className="form-section">
                <h3 className="form-section-title">Amount Impact</h3>
                <div className="form-fields">
                  {field(values,"originalAmount","Original Amount","number",
                    ()=>calculateRevisedAmount(values,setFieldValue))}
                  {field(values,"adjustmentAmount","Adjustment Amount","number",
                    ()=>calculateRevisedAmount(values,setFieldValue))}
                  {field(values,"revisedAmount","Revised Amount")}
                  {field(values,"currency","Currency")}
                  {field(values,"remarks","Remarks")}
                </div>
              </div>

              {/* 5. Supporting Information */}
              <div className="form-section">
                <h3 className="form-section-title">Supporting Information</h3>
                <div className="form-fields">
                  {field(values,"supportingDocumentsAttached","Supporting Documents Attached")}
                  {field(values,"approvalReference","Approval Reference")}
                </div>
              </div>

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {/* 6. Approval */}
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
                    Submit Billing Adjustment Request
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

export default FRM02547_BillingAdjustmentRequestUniversal;