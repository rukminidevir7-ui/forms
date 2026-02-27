// FRM00977_GSTRefundApplicationChecklist.jsx
// FRM-00977 – GST Refund Application Checklist
// Enterprise Grade – Tax & Statutory (India) – GST Compliance

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
  referenceNumber: Yup.string().required("Required"),
  gstin: Yup.string().required("Required"),
  refundType: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00977",
  date: "",
  department: "Tax & Statutory (India)",
  function: "GST Compliance",
  refundPeriodFrom: "",
  refundPeriodTo: "",
  referenceNumber: "",
  location: "",
  gstin: "",
  legalName: "",

  /* Refund Details */
  refundType: "",
  arn: "",
  refundAmount: "",
  currency: "",

  /* Dynamic Checklist */
  checklistItems: [
    { item: "GST Returns Filed", status: "" },
    { item: "Refund Application Filed", status: "" },
    { item: "Statement of Invoices Attached", status: "" },
    { item: "Bank Account Details Verified", status: "" },
    { item: "Undertaking / Declaration Attached", status: "" },
    { item: "Supporting Working Papers", status: "" },
    { item: "CA Certificate (if applicable)", status: "" },
    { item: "Reconciliation Statement Attached", status: "" }
  ],

  /* Observations */
  keyObservations: "",
  deficiencies: "",

  /* Authorization */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM00977_GSTRefundApplicationChecklist = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const field = (values, name, label, type = "text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : <>
            <Field name={name} type={type} className="form-input"/>
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper
      formId="FRM-00977"
      title="GST Refund Application Checklist"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("GST Refund Application Checklist Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00977"
              title="GST REFUND APPLICATION CHECKLIST"
              department="Tax & Statutory (India) – GST Compliance"
            >

              {/* GENERAL INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"date","Date","date")}
                  {field(values,"department","Department")}
                  {field(values,"function","Function")}
                  {field(values,"refundPeriodFrom","Refund Period From","date")}
                  {field(values,"refundPeriodTo","Refund Period To","date")}
                  {field(values,"referenceNumber","Reference Number")}
                  {field(values,"location","Location")}
                  {field(values,"gstin","GSTIN")}
                  {field(values,"legalName","Legal Name")}
                </div>
              </div>

              {/* REFUND DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Refund Details</h3>
                <div className="form-fields">
                  {field(values,"refundType","Refund Type")}
                  {field(values,"arn","Application Reference Number (ARN)")}
                  {field(values,"refundAmount","Refund Amount","number")}
                  {field(values,"currency","Currency")}
                </div>
              </div>

              {/* DOCUMENT CHECKLIST */}
              <div className="form-section">
                <h3 className="form-section-title">Document Checklist</h3>

                <FieldArray name="checklistItems">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={()=>push({ item: "New Checklist Item", status: "" })}
                        >
                          + Add Checklist Item
                        </button>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Checklist Item</th>
                            <th>Status (Yes / No / NA)</th>
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {values.checklistItems.map((row,index)=>(
                            <tr key={index}>
                              <td>
                                {isPrintMode
                                  ? row.item
                                  : <Field
                                      name={`checklistItems.${index}.item`}
                                      className="form-input"
                                    />
                                }
                              </td>
                              <td>
                                <Field
                                  as="select"
                                  name={`checklistItems.${index}.status`}
                                  className="form-input"
                                >
                                  <option value="">Select</option>
                                  <option>Yes</option>
                                  <option>No</option>
                                  <option>NA</option>
                                </Field>
                              </td>
                              {!isPrintMode && (
                                <td>
                                  <button
                                    type="button"
                                    onClick={()=>remove(index)}
                                  >
                                    Remove
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </FieldArray>
              </div>

              {/* OBSERVATIONS */}
              <div className="form-section">
                <h3 className="form-section-title">Observations</h3>
                <div className="form-fields">
                  {field(values,"keyObservations","Key Observations")}
                  {field(values,"deficiencies","Deficiencies / Issues")}
                </div>
              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* AUTHORIZATION */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>

                <FieldArray name="approvalRoles">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={()=>push({ roleName: "New Role", data: {} })}
                        >
                          + Add Role
                        </button>
                      )}

                      <div className="three-column-signatures">
                        {values.approvalRoles.map((role,index)=>(
                          <div key={index}>
                            <ApprovalSignatureBlock
                              roleName={role.roleName}
                              value={role.data}
                              allowRoleEdit={!isPrintMode}
                              onRoleNameChange={(newName)=>
                                setFieldValue(`approvalRoles.${index}.roleName`,newName)
                              }
                              onChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.data`,val)
                              }
                            />
                            {!isPrintMode && (
                              <button
                                type="button"
                                className="btn-remove-role"
                                onClick={()=>remove(index)}
                              >
                                Remove Role
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </FieldArray>
              </div>

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit GST Refund Checklist
                  </button>
                </div>
              )}

            </ModernA4Template>

          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00977_GSTRefundApplicationChecklist;