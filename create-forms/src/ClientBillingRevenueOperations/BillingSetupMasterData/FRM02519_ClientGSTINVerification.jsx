// FRM02519_ClientGSTINVerificationUniversal.jsx
// FRM-02519 – Client GSTIN / Tax ID Verification Checklist — Universal Form
// Enterprise Grade – Client Billing & Revenue Operations – Billing Setup & Master Data

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
  gstin: Yup.string().required("Required"),
  verificationResult: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02519",
  department: "Client Billing & Revenue Operations",
  function: "Billing Setup & Master Data",

  /* 1. Client Details */
  clientName: "",
  clientCode: "",
  legalEntityName: "",
  country: "",
  gstin: "",
  verificationDate: "",

  /* 2. Verification Checklist */
  checklistItems: [
    { checkItem: "GSTIN format validation completed", status: "", remarks: "", dynamicFields:{} },
    { checkItem: "GSTIN status active on government portal", status: "", remarks: "", dynamicFields:{} },
    { checkItem: "Legal name matches registration", status: "", remarks: "", dynamicFields:{} },
    { checkItem: "Registered address matches records", status: "", remarks: "", dynamicFields:{} },
    { checkItem: "PAN validation completed", status: "", remarks: "", dynamicFields:{} },
    { checkItem: "Tax jurisdiction confirmed", status: "", remarks: "", dynamicFields:{} },
    { checkItem: "Supporting documents verified", status: "", remarks: "", dynamicFields:{} },
    { checkItem: "Duplicate check completed", status: "", remarks: "", dynamicFields:{} }
  ],

  /* 3. Documents Reviewed */
  documentsReviewed: [
    { documentName: "GST Certificate", value: "" },
    { documentName: "PAN Copy", value: "" },
    { documentName: "Address Proof", value: "" },
    { documentName: "Other Supporting Documents", value: "" }
  ],

  /* 4. Verification Outcome */
  verificationResult: "",
  comments: "",

  /* 5. Sign-off */
  approvalRoles: [
    { roleName: "Verified By", data: {} },
    { roleName: "Reviewed By", data: {} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02519_ClientGSTINVerificationUniversal = () => {

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

  const field = (values, name, label, type="text") => (
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
    <ModernFormWrapper formId="FRM-02519" title="Client GSTIN / Tax ID Verification Checklist">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("GSTIN Verification Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02519"
              title="FRM-02519 — Client GSTIN / Tax ID Verification Checklist"
              department="Client Billing & Revenue Operations | Billing Setup & Master Data"
            >

              {/* 1. Client Details */}
              <div className="form-section">
                <h3 className="form-section-title">Client Details</h3>
                <div className="form-fields">
                  {field(values,"clientName","Client Name")}
                  {field(values,"clientCode","Client Code")}
                  {field(values,"legalEntityName","Legal Entity Name")}
                  {field(values,"country","Country")}
                  {field(values,"gstin","GSTIN / Tax ID")}
                  {field(values,"verificationDate","Verification Date","date")}
                </div>
              </div>

              {/* 2. Verification Checklist */}
              <div className="form-section">
                <h3 className="form-section-title">Verification Checklist</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom:15 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>

                    <button
                      type="button"
                      className="btn-submit"
                      style={{ marginLeft:10 }}
                      onClick={()=>setFieldValue("checklistItems",[
                        ...values.checklistItems,
                        { checkItem:"", status:"", remarks:"", dynamicFields:{} }
                      ])}
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="checklistItems">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Check Item</th>
                          <th>Status (Yes/No)</th>
                          <th>Remarks</th>

                          {dynamicColumns.map(col=>(
                            <th key={col.key}>
                              {col.label}
                              {!isPrintMode &&
                                <button type="button" onClick={()=>removeColumn(col.key)}>x</button>}
                            </th>
                          ))}

                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>

                      <tbody>
                        {values.checklistItems.map((row,index)=>(
                          <tr key={index}>
                            <td>
                              <Field name={`checklistItems.${index}.checkItem`} className="form-input"/>
                            </td>
                            <td>
                              <Field as="select" name={`checklistItems.${index}.status`} className="form-input">
                                <option value="">Select</option>
                                <option>Yes</option>
                                <option>No</option>
                              </Field>
                            </td>
                            <td>
                              <Field name={`checklistItems.${index}.remarks`} className="form-input"/>
                            </td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`checklistItems.${index}.dynamicFields.${col.key}`} className="form-input"/>
                              </td>
                            ))}

                            {!isPrintMode &&
                              <td>
                                <button type="button" onClick={()=>remove(index)}>Remove</button>
                              </td>}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>
              </div>

              {/* 3. Documents Reviewed */}
              <FormAttachments values={values} />
              <div className="form-section">
                <FieldArray name="documentsReviewed">
                  {() => (
                    <table className="items-table">
                      <tbody>
                        {values.documentsReviewed.map((doc,index)=>(
                          <tr key={index}>
                            <td>{doc.documentName}</td>
                            <td>
                              <Field name={`documentsReviewed.${index}.value`} className="form-input"/>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>
              </div>

              <FormCustomFields values={values} />

              {/* 4. Verification Outcome */}
              <div className="form-section">
                <h3 className="form-section-title">Verification Outcome</h3>
                {field(values,"verificationResult","Verification Result")}
                {field(values,"comments","Comments")}
              </div>

              {/* 5. Sign-off (Editable Roles) */}
              <div className="form-section">
                <h3 className="form-section-title">Sign-off</h3>

                <FieldArray name="approvalRoles">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode &&
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={()=>push({ roleName:"New Role", data:{} })}
                        >
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
                              <button type="button" onClick={()=>remove(index)}>
                                Remove
                              </button>
                            }
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
                    Submit GSTIN Verification
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

export default FRM02519_ClientGSTINVerificationUniversal;