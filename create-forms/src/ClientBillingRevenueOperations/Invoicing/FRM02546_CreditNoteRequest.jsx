// FRM02546_CreditNoteRequestUniversal.jsx
// FRM-02546 – Credit Note Request — Universal Form
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
  requestReferenceNo: Yup.string().required("Required"),
  requestDate: Yup.date().required("Required"),
  clientName: Yup.string().required("Required"),
  creditAmount: Yup.number().required("Required"),
  currency: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02546",
  department: "Client Billing & Revenue Operations",
  function: "Invoicing (T&M, Milestone, Usage)",

  /* 1. Request Details */
  requestReferenceNo: "",
  requestDate: "",
  requestedBy: "",
  businessUnit: "",

  /* 2. Client / Invoice Details */
  clientName: "",
  clientCode: "",
  relatedInvoiceNo: "",
  invoiceDate: "",
  billingPeriod: "",

  /* 3. Credit Note Details */
  reasonForCreditNote: "",
  adjustmentType: "",
  currency: "",
  effectiveDate: "",

  /* 4. Amount Details */
  originalInvoiceAmount: "",
  creditAmount: "",
  taxes: "",
  totalCreditNoteAmount: "",
  remarks: "",

  /* 5. Supporting Information */
  supportingDocumentsAttached: "",
  approvalReference: "",

  /* 6. Sign-off */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02546_CreditNoteRequestUniversal = () => {

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
    const credit = Number(values.creditAmount || 0);
    const tax = Number(values.taxes || 0);
    const total = credit + tax;
    setFieldValue("totalCreditNoteAmount", total.toFixed(2));
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
    <ModernFormWrapper formId="FRM-02546" title="Credit Note Request">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Credit Note Request Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02546"
              title="FRM-02546 — Credit Note Request — Universal Form"
              department="Client Billing & Revenue Operations | Invoicing (T&M, Milestone, Usage)"
            >

              {/* 1. Request Details */}
              <div className="form-section">
                <h3 className="form-section-title">Request Details</h3>
                <div className="form-fields">
                  {field(values,"requestReferenceNo","Request Reference No")}
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
                  {field(values,"relatedInvoiceNo","Related Invoice No")}
                  {field(values,"invoiceDate","Invoice Date","date")}
                  {field(values,"billingPeriod","Billing Period")}
                </div>
              </div>

              {/* 3. Credit Note Details */}
              <div className="form-section">
                <h3 className="form-section-title">Credit Note Details</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 15 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Additional Field
                    </button>
                  </div>
                )}

                <div className="form-fields">
                  {field(values,"reasonForCreditNote","Reason for Credit Note")}
                  {field(values,"adjustmentType","Adjustment Type")}
                  {field(values,"currency","Currency")}
                  {field(values,"effectiveDate","Effective Date","date")}
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

              {/* 4. Amount Details */}
              <div className="form-section">
                <h3 className="form-section-title">Amount Details</h3>
                <div className="form-fields">
                  {field(values,"originalInvoiceAmount","Original Invoice Amount","number")}
                  {field(values,"creditAmount","Credit Amount","number",
                    ()=>calculateTotal(values,setFieldValue))}
                  {field(values,"taxes","Taxes","number",
                    ()=>calculateTotal(values,setFieldValue))}
                  {field(values,"totalCreditNoteAmount","Total Credit Note Amount")}
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
                    Submit Credit Note Request
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

export default FRM02546_CreditNoteRequestUniversal;