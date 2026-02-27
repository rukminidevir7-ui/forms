// FRM01261_DirectorAppointmentPack.jsx
// Director Appointment Pack – Universal Form
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
  directorName: Yup.string().required("Required"),
  dateOfAppointment: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01261",
  department: "Corporate & Secretarial",
  function: "Corporate Governance & ROC",

  formReferenceNo: "",
  companyName: "",
  cin: "",
  departmentName: "",
  date: "",
  preparedBy: "",

  directorName: "",
  din: "",
  designation: "",
  directorType: "",
  dateOfAppointment: "",
  contactDetails: "",

  purposeOfAppointment: "",
  backgroundSummary: "",
  effectiveDate: "",
  impactNotes: "",

  complianceChecklist: [
    { item: "Consent to act received", status: "", remarks: "", dynamicFields: {} },
    { item: "DIN verification completed", status: "", remarks: "", dynamicFields: {} },
    { item: "Disclosure of interest obtained", status: "", remarks: "", dynamicFields: {} },
    { item: "Board approval obtained", status: "", remarks: "", dynamicFields: {} }
  ],

  consentLetter: "",
  identityProof: "",
  boardResolutionCopy: "",
  regulatoryForms: "",
  otherSupportingDocuments: "",

  finalComments: "",

  approvalRoles: [
    { roleName: "Requested By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01261_DirectorAppointmentPack = () => {

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
      formId="FRM-01261"
      title="Director Appointment Pack"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Director Appointment Pack Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01261"
              title="DIRECTOR APPOINTMENT PACK"
              department="Corporate & Secretarial – Governance & ROC"
            >

              {/* GENERAL INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">1. General Information</h3>
                <div className="form-fields">
                  {field(values,"formReferenceNo","Form Reference No")}
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"departmentName","Department")}
                  {field(values,"date","Date","date")}
                  {field(values,"preparedBy","Prepared By")}
                </div>
              </div>

              {/* DIRECTOR DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">2. Director Details</h3>
                <div className="form-fields">
                  {field(values,"directorName","Director Name")}
                  {field(values,"din","DIN")}
                  {field(values,"designation","Designation")}

                  <div className="form-field">
                    <label className="form-label">Type</label>
                    {isPrintMode
                      ? <div className="print-value">{values.directorType || "_________"}</div>
                      :
                        <Field as="select" name="directorType" className="form-input">
                          <option value="">Select</option>
                          <option>Executive</option>
                          <option>Non-Executive</option>
                          <option>Independent</option>
                        </Field>
                    }
                  </div>

                  {field(values,"dateOfAppointment","Date of Appointment","date")}
                  {field(values,"contactDetails","Contact Details")}
                </div>
              </div>

              {/* JUSTIFICATION */}
              <div className="form-section">
                <h3 className="form-section-title">3. Justification / Details</h3>
                <div className="form-fields">
                  {field(values,"purposeOfAppointment","Purpose of Appointment")}
                  {field(values,"backgroundSummary","Background Summary")}
                  {field(values,"effectiveDate","Effective Date","date")}
                  {field(values,"impactNotes","Impact / Notes")}
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
                  {field(values,"consentLetter","Consent Letter")}
                  {field(values,"identityProof","Identity & Address Proof")}
                  {field(values,"boardResolutionCopy","Board Resolution Copy")}
                  {field(values,"regulatoryForms","Regulatory Forms")}
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
                  {field(values,"finalComments","Final Comments")}
                </div>

              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Director Appointment Pack
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

export default FRM01261_DirectorAppointmentPack;