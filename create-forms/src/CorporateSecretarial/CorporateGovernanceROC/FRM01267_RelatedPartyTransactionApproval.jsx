// FRM01267_RelatedPartyTransactionApproval.jsx
// FRM-01267 – Related Party Transaction Approval
// Enterprise Grade – Corporate & Secretarial – Governance & ROC

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
  companyName: Yup.string().required("Required"),
  relatedPartyName: Yup.string().required("Required"),
  natureOfTransaction: Yup.string().required("Required"),
  transactionValue: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01267",
  department: "Corporate & Secretarial",
  function: "Corporate Governance & ROC",

  companyName: "",
  cin: "",
  departmentName: "",
  date: "",
  referenceNo: "",
  preparedBy: "",

  relatedPartyName: "",
  relationshipType: "",
  panIdentification: "",
  address: "",
  contactDetails: "",

  natureOfTransaction: "",
  transactionValue: "",
  currency: "",
  durationPeriod: "",
  businessJustification: "",
  armsLengthConfirmation: "",

  complianceChecklist: [
    { item: "Disclosure of interest obtained", status: "", remarks: "", dynamicFields: {} },
    { item: "Audit committee review completed", status: "", remarks: "", dynamicFields: {} },
    { item: "Board approval required/obtained", status: "", remarks: "", dynamicFields: {} },
    { item: "Regulatory compliance verified", status: "", remarks: "", dynamicFields: {} }
  ],

  supportingAgreements: "",
  valuationBenchmarking: "",
  approvalNotes: "",
  otherSupportingDocuments: "",

  comments: "",

  approvalRoles: [
    { roleName: "Requested By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01267_RelatedPartyTransactionApproval = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const columnName = prompt("Enter New Column Name");
    if (!columnName) return;
    const key = columnName.replace(/\s+/g, "");
    if (dynamicColumns.find(col => col.key === key)) return;
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
      formId="FRM-01267"
      title="Related Party Transaction Approval"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Related Party Transaction Approval Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01267"
              title="RELATED PARTY TRANSACTION APPROVAL"
              department="Corporate & Secretarial – Governance & ROC"
            >

              {/* GENERAL INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">1. General Information</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"departmentName","Department")}
                  {field(values,"date","Date","date")}
                  {field(values,"referenceNo","Reference No")}
                  {field(values,"preparedBy","Prepared By")}
                </div>
              </div>

              {/* RELATED PARTY DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">2. Related Party Details</h3>
                <div className="form-fields">
                  {field(values,"relatedPartyName","Related Party Name")}
                  {field(values,"relationshipType","Relationship Type")}
                  {field(values,"panIdentification","PAN / Identification")}
                  {field(values,"address","Address")}
                  {field(values,"contactDetails","Contact Details")}
                </div>
              </div>

              {/* TRANSACTION DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">3. Transaction Details</h3>
                <div className="form-fields">
                  {field(values,"natureOfTransaction","Nature of Transaction")}
                  {field(values,"transactionValue","Transaction Value")}
                  {field(values,"currency","Currency")}
                  {field(values,"durationPeriod","Duration / Period")}
                  {field(values,"businessJustification","Business Justification")}
                  {field(values,"armsLengthConfirmation","Arm’s Length Confirmation")}
                </div>
              </div>

              {/* COMPLIANCE CHECKLIST */}
              <div className="form-section">
                <h3 className="form-section-title">4. Compliance Checklist</h3>

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
                        setFieldValue("complianceChecklist", [
                          ...values.complianceChecklist,
                          { item: "", status: "", remarks: "", dynamicFields: {} }
                        ])
                      }
                    >
                      + Add Item
                    </button>
                  </div>
                )}

                <FieldArray name="complianceChecklist">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Yes / No / NA</th>
                          <th>Remarks</th>

                          {dynamicColumns.map(col => (
                            <th key={col.key}>
                              {col.label}
                              {!isPrintMode &&
                                <button type="button" onClick={()=>removeColumn(col.key)}>x</button>
                              }
                            </th>
                          ))}

                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>

                      <tbody>
                        {values.complianceChecklist.map((row,index)=>(
                          <tr key={index}>
                            <td>
                              <Field name={`complianceChecklist.${index}.item`} className="form-input"/>
                            </td>
                            <td>
                              <Field as="select"
                                name={`complianceChecklist.${index}.status`}
                                className="form-input">
                                <option value="">Select</option>
                                <option>Yes</option>
                                <option>No</option>
                                <option>NA</option>
                              </Field>
                            </td>
                            <td>
                              <Field name={`complianceChecklist.${index}.remarks`} className="form-input"/>
                            </td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`complianceChecklist.${index}.dynamicFields.${col.key}`} className="form-input"/>
                              </td>
                            ))}

                            {!isPrintMode &&
                              <td>
                                <button type="button" onClick={()=>remove(index)}>Remove</button>
                              </td>
                            }
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>
              </div>

              {/* ATTACHMENTS */}
              <div className="form-section">
                <h3 className="form-section-title">5. Attachments</h3>
                <div className="form-fields">
                  {field(values,"supportingAgreements","Supporting Agreements")}
                  {field(values,"valuationBenchmarking","Valuation / Benchmarking")}
                  {field(values,"approvalNotes","Approval Notes")}
                  {field(values,"otherSupportingDocuments","Other Supporting Documents")}
                </div>
              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* APPROVAL WORKFLOW */}
              <div className="form-section">
                <h3 className="form-section-title">6. Approval Workflow</h3>

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

                <div className="form-fields" style={{ marginTop: 20 }}>
                  {field(values,"comments","Comments")}
                </div>

              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit RPT Approval
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

export default FRM01267_RelatedPartyTransactionApproval;