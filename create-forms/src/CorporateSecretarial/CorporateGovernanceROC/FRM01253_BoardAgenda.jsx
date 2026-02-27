// FRM01253_BoardAgenda.jsx
// FRM-01253 – Board Agenda
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
  meetingDate: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01253",
  department: "Corporate & Secretarial",
  function: "Corporate Governance & ROC",

  companyName: "",
  cin: "",
  meetingDate: "",
  meetingTime: "",
  venueMode: "",
  chairperson: "",

  agendaItems: [
    { topic: "", presenter: "", notes: "", dynamicFields: {} },
    { topic: "", presenter: "", notes: "", dynamicFields: {} }
  ],

  documentsAttached: "",
  referenceNotes: "",
  comments: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01253_BoardAgenda = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

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
      formId="FRM-01253"
      title="Board Agenda"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Board Agenda Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01253"
              title="BOARD AGENDA"
              department="Corporate & Secretarial – Governance & ROC"
            >

              {/* MEETING REFERENCE */}
              <div className="form-section">
                <h3 className="form-section-title">1. Meeting Reference</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"meetingDate","Meeting Date","date")}
                  {field(values,"meetingTime","Meeting Time","time")}
                  {field(values,"venueMode","Venue / Mode")}
                  {field(values,"chairperson","Chairperson")}
                </div>
              </div>

              {/* DETAILED AGENDA TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">2. Detailed Agenda</h3>

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
                          { topic: "", presenter: "", notes: "", dynamicFields: {} }
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
                          <th>Item No.</th>
                          <th>Agenda Topic</th>
                          <th>Presenter</th>
                          <th>Notes / Expected Outcome</th>

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
                              <Field name={`agendaItems.${index}.topic`} className="form-input"/>
                            </td>
                            <td>
                              <Field name={`agendaItems.${index}.presenter`} className="form-input"/>
                            </td>
                            <td>
                              <Field name={`agendaItems.${index}.notes`} className="form-input"/>
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

              {/* SUPPORTING DOCUMENTS */}
              <div className="form-section">
                <h3 className="form-section-title">3. Supporting Documents</h3>
                <div className="form-fields">
                  {field(values,"documentsAttached","Documents Attached")}
                  {field(values,"referenceNotes","Reference Notes")}
                </div>
              </div>

              {/* APPROVAL */}
              <div className="form-section">
                <h3 className="form-section-title">4. Approval</h3>

                <FieldArray name="approvalRoles">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode &&
                        <button type="button" className="btn-submit" onClick={()=>push({ roleName:"New Role", data:{} })}>
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
                              <button type="button" onClick={()=>remove(index)}>Remove</button>
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

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Board Agenda
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

export default FRM01253_BoardAgenda;