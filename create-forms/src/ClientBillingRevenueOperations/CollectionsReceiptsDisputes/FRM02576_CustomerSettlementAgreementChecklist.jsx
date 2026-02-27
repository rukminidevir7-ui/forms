// FRM02576_CustomerSettlementAgreementChecklistUniversal.jsx
// FRM-02576 – Customer Settlement Agreement Checklist — Universal Form
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
  agreementReferenceNo: Yup.string().required("Required"),
  clientName: Yup.string().required("Required"),
  agreementDate: Yup.date().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02576",
  department: "Client Billing & Revenue Operations",
  function: "Collections, Receipts & Disputes",

  /* 1. Agreement Context */
  agreementReferenceNo: "",
  clientName: "",
  clientCode: "",
  agreementDate: "",
  businessUnit: "",

  /* 2. Settlement Checklist */
  checklistItems: [
    { item: "Signed settlement agreement obtained", requirement: "", status: "", remarks: "", dynamicFields: {} },
    { item: "Outstanding balance confirmed", requirement: "", status: "", remarks: "", dynamicFields: {} },
    { item: "Settlement amount agreed", requirement: "", status: "", remarks: "", dynamicFields: {} },
    { item: "Payment schedule defined", requirement: "", status: "", remarks: "", dynamicFields: {} },
    { item: "Legal review completed", requirement: "", status: "", remarks: "", dynamicFields: {} },
    { item: "Finance approval obtained", requirement: "", status: "", remarks: "", dynamicFields: {} },
    { item: "Customer confirmation received", requirement: "", status: "", remarks: "", dynamicFields: {} },
    { item: "Supporting documents attached", requirement: "", status: "", remarks: "", dynamicFields: {} }
  ],

  /* 3. Overall Assessment */
  checklistCompletionStatus: "",
  keyRisksObservations: "",
  notes: "",

  /* 4. Sign-off */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02576_CustomerSettlementAgreementChecklist = () => {

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
    <ModernFormWrapper formId="FRM-02576" title="Customer Settlement Agreement Checklist">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Settlement Checklist Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02576"
              title="FRM-02576 — Customer Settlement Agreement Checklist — Universal Form"
              department="Client Billing & Revenue Operations | Collections, Receipts & Disputes"
            >

              {/* 1. Agreement Context */}
              <div className="form-section">
                <h3 className="form-section-title">Agreement Context</h3>
                <div className="form-fields">
                  {field(values,"agreementReferenceNo","Agreement Reference No")}
                  {field(values,"clientName","Client Name")}
                  {field(values,"clientCode","Client Code")}
                  {field(values,"agreementDate","Agreement Date","date")}
                  {field(values,"businessUnit","Business Unit")}
                </div>
              </div>

              {/* 2. Settlement Checklist */}
              <div className="form-section">
                <h3 className="form-section-title">Settlement Checklist</h3>

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
                        { item:"New Item", requirement:"", status:"", remarks:"", dynamicFields:{} }
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
                          <th>Item</th>
                          <th>Requirement</th>
                          <th>Status (Yes/No/NA)</th>
                          <th>Remarks</th>
                          {dynamicColumns.map(col=>(
                            <th key={col.key}>{col.label}</th>
                          ))}
                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {values.checklistItems.map((row,index)=>(
                          <tr key={index}>
                            <td><Field name={`checklistItems.${index}.item`} className="form-input"/></td>
                            <td><Field name={`checklistItems.${index}.requirement`} className="form-input"/></td>
                            <td>
                              <Field as="select" name={`checklistItems.${index}.status`} className="form-input">
                                <option value="">Select</option>
                                <option>Yes</option>
                                <option>No</option>
                                <option>NA</option>
                              </Field>
                            </td>
                            <td><Field name={`checklistItems.${index}.remarks`} className="form-input"/></td>
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

              {/* 3. Overall Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">Overall Assessment</h3>
                <div className="form-fields">
                  {field(values,"checklistCompletionStatus","Checklist Completion Status")}
                  {field(values,"keyRisksObservations","Key Risks / Observations","text")}
                  {field(values,"notes","Notes","text")}
                </div>
              </div>

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {/* 4. Sign-off */}
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

                {field(values,"approvalDate","Date","date")}
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Settlement Checklist
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

export default FRM02576_CustomerSettlementAgreementChecklist;