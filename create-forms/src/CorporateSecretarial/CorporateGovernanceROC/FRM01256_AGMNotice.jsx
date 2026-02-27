// FRM01256_AGMNotice.jsx
// FRM-01256 – AGM Notice
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
  agmDate: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01256",
  department: "Corporate & Secretarial",
  function: "Corporate Governance & ROC",

  companyName: "",
  cin: "",
  registeredOfficeAddress: "",
  noticeDate: "",

  agmDate: "",
  agmTime: "",
  venueMode: "",
  chairperson: "",
  quorumRequirement: "",

  agendaItems: [
    { description: "", dynamicFields: {} },
    { description: "", dynamicFields: {} }
  ],

  eVotingDetails: "",
  bookClosureRecordDate: "",
  proxyInstructions: "",
  otherInstructions: "",

  comments: "",

  approvalRoles: [
    { roleName: "Issued By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01256_AGMNotice = () => {

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
    <ModernFormWrapper formId="FRM-01256" title="AGM Notice">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("AGM Notice Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01256"
              title="AGM NOTICE"
              department="Corporate & Secretarial – Governance & ROC"
            >

              {/* COMPANY DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">1. Company Details</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"registeredOfficeAddress","Registered Office Address")}
                  {field(values,"noticeDate","Notice Date","date")}
                </div>
              </div>

              {/* MEETING DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">2. Meeting Details</h3>
                <div className="form-fields">
                  {field(values,"agmDate","AGM Date","date")}
                  {field(values,"agmTime","AGM Time","time")}
                  {field(values,"venueMode","Venue / Mode")}
                  {field(values,"chairperson","Chairperson")}
                  {field(values,"quorumRequirement","Quorum Requirement")}
                </div>
              </div>

              {/* AGENDA TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">3. Agenda Items</h3>

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
                        setFieldValue("agendaItems", [
                          ...values.agendaItems,
                          { description: "", dynamicFields: {} }
                        ])
                      }
                    >
                      + Add Agenda Item
                    </button>
                  </div>
                )}

                <FieldArray name="agendaItems">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Sl. No.</th>
                          <th>Agenda Description</th>
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
                        {values.agendaItems.map((row,index)=>(
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <Field name={`agendaItems.${index}.description`} className="form-input"/>
                            </td>
                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`agendaItems.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* NOTES */}
              <div className="form-section">
                <h3 className="form-section-title">4. Notes to Members</h3>
                <div className="form-fields">
                  {field(values,"eVotingDetails","E-voting Details")}
                  {field(values,"bookClosureRecordDate","Book Closure / Record Date")}
                  {field(values,"proxyInstructions","Proxy Instructions")}
                  {field(values,"otherInstructions","Other Instructions")}
                </div>
              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* AUTHORIZATION WITH DYNAMIC ROLES */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>

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
                              <button
                                type="button"
                                onClick={()=>remove(index)}
                              >
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
                    Submit AGM Notice
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

export default FRM01256_AGMNotice;