// FRM01260_StatutoryRegisterUpdate.jsx
// FRM-01260 – Statutory Register Update Log
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
  registerType: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01260",
  department: "Corporate & Secretarial",
  function: "Corporate Governance & ROC",

  companyName: "",
  cin: "",
  registerType: "",
  periodFrom: "",
  periodTo: "",
  preparedBy: "",

  updateDetails: [
    { 
      date: "", 
      registerName: "", 
      natureOfUpdate: "", 
      referenceApproval: "", 
      updatedBy: "", 
      dynamicFields: {} 
    }
  ],

  approvalCopy: "",
  relatedFilings: "",
  otherSupportingDocuments: "",

  comments: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01260_StatutoryRegisterUpdate = () => {

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
      formId="FRM-01260"
      title="Statutory Register Update Log"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Statutory Register Update Log Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01260"
              title="STATUTORY REGISTER UPDATE LOG"
              department="Corporate & Secretarial – Governance & ROC"
            >

              {/* GENERAL INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">1. General Information</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"registerType","Register Type")}
                  {field(values,"periodFrom","Period From","date")}
                  {field(values,"periodTo","Period To","date")}
                  {field(values,"preparedBy","Prepared By")}
                </div>
              </div>

              {/* UPDATE DETAILS TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">2. Update Details</h3>

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
                        setFieldValue("updateDetails", [
                          ...values.updateDetails,
                          { 
                            date: "", 
                            registerName: "", 
                            natureOfUpdate: "", 
                            referenceApproval: "", 
                            updatedBy: "", 
                            dynamicFields: {} 
                          }
                        ])
                      }
                    >
                      + Add Entry
                    </button>
                  </div>
                )}

                <FieldArray name="updateDetails">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Register Name</th>
                          <th>Nature of Update</th>
                          <th>Reference / Approval</th>
                          <th>Updated By</th>

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
                        {values.updateDetails.map((row,index)=>(
                          <tr key={index}>
                            <td>
                              <Field name={`updateDetails.${index}.date`} type="date" className="form-input"/>
                            </td>
                            <td>
                              <Field name={`updateDetails.${index}.registerName`} className="form-input"/>
                            </td>
                            <td>
                              <Field name={`updateDetails.${index}.natureOfUpdate`} className="form-input"/>
                            </td>
                            <td>
                              <Field name={`updateDetails.${index}.referenceApproval`} className="form-input"/>
                            </td>
                            <td>
                              <Field name={`updateDetails.${index}.updatedBy`} className="form-input"/>
                            </td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`updateDetails.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* SUPPORTING DOCUMENTS */}
              <div className="form-section">
                <h3 className="form-section-title">3. Supporting Documents</h3>
                <div className="form-fields">
                  {field(values,"approvalCopy","Approval / Authorization Copy")}
                  {field(values,"relatedFilings","Related Filings or References")}
                  {field(values,"otherSupportingDocuments","Other Supporting Documents")}
                </div>
              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* SIGN-OFF */}
              <div className="form-section">
                <h3 className="form-section-title">4. Sign-off</h3>

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
                    Submit Register Update Log
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

export default FRM01260_StatutoryRegisterUpdate;