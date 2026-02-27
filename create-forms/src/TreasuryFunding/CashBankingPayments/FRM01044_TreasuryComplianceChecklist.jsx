// FRM01044_TreasuryComplianceChecklist.jsx
// FRM-01044 – Treasury Compliance Checklist
// Enterprise Grade – Treasury & Funding – Cash, Banking & Payments

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
  compliancePeriodFrom: Yup.string().required("Required"),
  compliancePeriodTo: Yup.string().required("Required"),
  businessUnit: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01044",
  date: "",
  department: "Treasury & Funding",
  function: "Cash, Banking & Payments",
  referenceNumber: "",
  location: "",
  compliancePeriodFrom: "",
  compliancePeriodTo: "",
  businessUnit: "",
  currency: "",

  complianceItems: [
    { item: "Bank Reconciliations Completed", status: "", remarks: "", dynamicFields: {} },
    { item: "Cash Counts Performed", status: "", remarks: "", dynamicFields: {} },
    { item: "Payment Approvals Verified", status: "", remarks: "", dynamicFields: {} },
    { item: "Bank Limits Monitored", status: "", remarks: "", dynamicFields: {} },
    { item: "Liquidity Position Reviewed", status: "", remarks: "", dynamicFields: {} },
    { item: "FX Exposure Reviewed", status: "", remarks: "", dynamicFields: {} },
    { item: "Hedge Documentation Updated", status: "", remarks: "", dynamicFields: {} },
    { item: "Policy Compliance Confirmed", status: "", remarks: "", dynamicFields: {} },
    { item: "Exception Logs Reviewed", status: "", remarks: "", dynamicFields: {} },
    { item: "Management Review Completed", status: "", remarks: "", dynamicFields: {} }
  ],

  overallComplianceStatus: "",
  keyIssuesIdentified: "",
  correctiveActions: "",
  remarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01044_TreasuryComplianceChecklist = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= COLUMN FUNCTIONS ================= */

  const addColumn = () => {
    const columnName = prompt("Enter New Column Name");
    if (!columnName) return;

    const key = columnName.replace(/\s+/g, "");
    if (dynamicColumns.find(col => col.key === key)) {
      alert("Column already exists");
      return;
    }

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
    <ModernFormWrapper
      formId="FRM-01044"
      title="Treasury Compliance Checklist"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Treasury Compliance Checklist Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01044"
              title="TREASURY COMPLIANCE CHECKLIST"
              department="Treasury & Funding – Cash, Banking & Payments"
            >

              {/* GENERAL INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"date","Date","date")}
                  {field(values,"referenceNumber","Reference Number")}
                  {field(values,"location","Location")}
                  {field(values,"compliancePeriodFrom","Compliance Period From","date")}
                  {field(values,"compliancePeriodTo","Compliance Period To","date")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"currency","Currency")}
                </div>
              </div>

              {/* COMPLIANCE ITEMS */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Items</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 15 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>

                    <button
                      type="button"
                      className="btn-submit"
                      style={{ marginLeft: 10 }}
                      onClick={() =>
                        setFieldValue("complianceItems", [
                          ...values.complianceItems,
                          { item: "", status: "", remarks: "", dynamicFields: {} }
                        ])
                      }
                    >
                      + Add Compliance Item
                    </button>
                  </div>
                )}

                <FieldArray name="complianceItems">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Item Description</th>
                          <th>Status (Yes/No)</th>
                          <th>Remarks</th>

                          {dynamicColumns.map(col => (
                            <th key={col.key}>
                              {col.label}
                              {!isPrintMode && (
                                <button
                                  type="button"
                                  onClick={() => removeColumn(col.key)}
                                  style={{ marginLeft: 5 }}
                                >
                                  x
                                </button>
                              )}
                            </th>
                          ))}

                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>

                      <tbody>
                        {values.complianceItems.map((row,index)=>(
                          <tr key={index}>
                            <td>
                              <Field
                                name={`complianceItems.${index}.item`}
                                className="form-input"
                              />
                            </td>

                            <td>
                              <Field
                                as="select"
                                name={`complianceItems.${index}.status`}
                                className="form-input"
                              >
                                <option value="">Select</option>
                                <option>Yes</option>
                                <option>No</option>
                              </Field>
                            </td>

                            <td>
                              <Field
                                name={`complianceItems.${index}.remarks`}
                                className="form-input"
                              />
                            </td>

                            {dynamicColumns.map(col => (
                              <td key={col.key}>
                                <Field
                                  name={`complianceItems.${index}.dynamicFields.${col.key}`}
                                  className="form-input"
                                />
                              </td>
                            ))}

                            {!isPrintMode && (
                              <td>
                                <button type="button" onClick={()=>remove(index)}>
                                  Remove
                                </button>
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>
              </div>

              {/* COMPLIANCE SUMMARY */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Summary</h3>
                <div className="form-fields">
                  {field(values,"overallComplianceStatus","Overall Compliance Status")}
                  {field(values,"keyIssuesIdentified","Key Issues Identified")}
                  {field(values,"correctiveActions","Corrective Actions")}
                  {field(values,"remarks","Remarks")}
                </div>
              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* AUTHORIZATION */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>

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
                              onRoleNameChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.roleName`,val)}
                              onChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.data`,val)}
                            />
                            {!isPrintMode &&
                              <button type="button" onClick={()=>remove(index)}>
                                Remove Role
                              </button>
                            }
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </FieldArray>
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Treasury Compliance Checklist
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

export default FRM01044_TreasuryComplianceChecklist;