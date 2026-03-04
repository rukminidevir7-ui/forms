// FRM01838_HotWorkPermit.jsx
// FRM-01838 / 01839 / 01840 – Hot Work Permit
// Enterprise Grade – Permit to Work (PTW) System

import React from "react";
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
  permitNumber: Yup.string().required("Required"),
  dateOfIssue: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01838",
  permitNumber: "",
  department: "HSE / EHS",
  businessUnit: "",
  siteLocation: "",
  exactWorkLocation: "",
  dateOfIssue: "",
  validFromDate: "",
  validFromTime: "",
  validToDate: "",
  validToTime: "",
  hotWorkType: "",
  status: "",

  workDescription: "",
  reasonForWork: "",
  workSupervisor: "",
  contractorName: "",
  numberOfWorkers: "",

  controlChecklist: [
    { controlItem: "Combustible materials removed", verified: "", remarks: "" },
    { controlItem: "Fire extinguisher available", verified: "", remarks: "" },
    { controlItem: "Fire watch assigned", verified: "", remarks: "" },
    { controlItem: "Gas cylinders secured", verified: "", remarks: "" },
    { controlItem: "Area barricaded", verified: "", remarks: "" },
    { controlItem: "Ventilation adequate", verified: "", remarks: "" },
    { controlItem: "Gas test conducted", verified: "", remarks: "" },
    { controlItem: "Emergency route clear", verified: "", remarks: "" }
  ],

  gasTesterName: "",
  gasTestDate: "",
  gasTestTime: "",
  oxygenLevel: "",
  flammableGasLevel: "",
  toxicGasLevel: "",
  gasTestResult: "",

  flameResistantClothing: "",
  weldingShield: "",
  handGloves: "",
  respiratoryProtection: "",
  additionalPPE: "",

  applicableActRule: "",
  regulatoryAuthority: "",
  confinedSpace: "",

  approvalRoles: [
    { roleName: "Requested By", data: {} },
    { roleName: "Fire Watch Name", data: {} },
    { roleName: "Reviewed By (HSE)", data: {} },
    { roleName: "Approved By (Area In-Charge)", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01838_HotWorkPermit = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values,name,label,type="text",textarea=false)=>(
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : textarea
          ? <Field as="textarea" name={name} className="form-input" rows="3"/>
          : <Field name={name} type={type} className="form-input"/>
      }
      <ErrorMessage name={name} component="div" className="form-error"/>
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-01838" title="Hot Work Permit">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Hot Work Permit Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-01838"
              title="HOT WORK PERMIT"
              department="HSE / EHS – Permit to Work System"
            >

              {/* ================= GENERAL PERMIT INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">General Permit Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"permitNumber","Permit Number")}
                  {field(values,"department","Department")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"siteLocation","Site / Location")}
                  {field(values,"exactWorkLocation","Exact Work Location")}
                  {field(values,"dateOfIssue","Date of Issue","date")}
                  {field(values,"validFromDate","Valid From (Date)","date")}
                  {field(values,"validFromTime","Valid From (Time)","time")}
                  {field(values,"validToDate","Valid To (Date)","date")}
                  {field(values,"validToTime","Valid To (Time)","time")}

                  <div className="form-field">
                    <label className="form-label">Type of Hot Work</label>
                    {isPrintMode
                      ? <div className="print-value">{values.hotWorkType || "-"}</div>
                      : <Field as="select" name="hotWorkType" className="form-input">
                          <option value="">Select</option>
                          <option>Welding</option>
                          <option>Cutting</option>
                          <option>Grinding</option>
                          <option>Other</option>
                        </Field>
                    }
                  </div>

                  {field(values,"status","Status")}
                </div>
              </div>

              {/* ================= WORK DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Work Details</h3>
                <div className="form-fields">
                  {field(values,"workDescription","Description of Work","text",true)}
                  {field(values,"reasonForWork","Reason for Hot Work","text",true)}
                  {field(values,"workSupervisor","Work Supervisor Name")}
                  {field(values,"contractorName","Contractor Name")}
                  {field(values,"numberOfWorkers","Number of Workers Involved")}
                </div>
              </div>

              {/* ================= FIRE & CONTROL CHECKLIST ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Fire & Hazard Control Checklist</h3>

                <FieldArray name="controlChecklist">
                  {({ remove, push })=>(
                    <>
                      {!isPrintMode &&
                        <button
                          type="button"
                          className="btn-submit"
                          style={{marginBottom:10}}
                          onClick={()=>push({ controlItem:"", verified:"", remarks:"" })}
                        >
                          + Add Row
                        </button>
                      }

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Sl No</th>
                            <th>Control Item</th>
                            <th>Verified</th>
                            <th>Remarks</th>
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {values.controlChecklist.map((row,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td>
                                {isPrintMode
                                  ? row.controlItem
                                  : <Field name={`controlChecklist.${index}.controlItem`} className="form-input"/>
                                }
                              </td>
                              <td>
                                {isPrintMode
                                  ? row.verified || "-"
                                  : <Field as="select"
                                      name={`controlChecklist.${index}.verified`}
                                      className="form-input">
                                      <option value="">Select</option>
                                      <option>Yes</option>
                                      <option>No</option>
                                    </Field>
                                }
                              </td>
                              <td>
                                {isPrintMode
                                  ? row.remarks || "-"
                                  : <Field as="textarea"
                                      name={`controlChecklist.${index}.remarks`}
                                      className="form-input"/>
                                }
                              </td>
                              {!isPrintMode &&
                                <td>
                                  <button type="button" onClick={()=>remove(index)}>Remove</button>
                                </td>
                              }
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </FieldArray>
              </div>

              {/* ================= GAS TESTING ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Gas Testing Details</h3>
                <div className="form-fields">
                  {field(values,"gasTesterName","Gas Tester Name")}
                  {field(values,"gasTestDate","Gas Test Date","date")}
                  {field(values,"gasTestTime","Gas Test Time","time")}
                  {field(values,"oxygenLevel","Oxygen Level (%)")}
                  {field(values,"flammableGasLevel","Flammable Gas Level (%)")}
                  {field(values,"toxicGasLevel","Toxic Gas Level")}

                  <div className="form-field">
                    <label className="form-label">Gas Test Result</label>
                    {isPrintMode
                      ? <div className="print-value">{values.gasTestResult || "-"}</div>
                      : <Field as="select" name="gasTestResult" className="form-input">
                          <option value="">Select</option>
                          <option>Safe</option>
                          <option>Unsafe</option>
                        </Field>
                    }
                  </div>
                </div>
              </div>

              {/* ================= PPE REQUIREMENTS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">PPE & Safety Requirements</h3>
                <div className="form-fields">
                  {["flameResistantClothing","weldingShield","handGloves","respiratoryProtection"]
                    .map(fieldName=>(
                      <div className="form-field" key={fieldName}>
                        <label className="form-label">
                          {fieldName.replace(/([A-Z])/g,' $1')}
                        </label>
                        {isPrintMode
                          ? <div className="print-value">{values[fieldName] || "-"}</div>
                          : <Field as="select" name={fieldName} className="form-input">
                              <option value="">Select</option>
                              <option>Yes</option>
                              <option>No</option>
                            </Field>
                        }
                      </div>
                  ))}
                  {field(values,"additionalPPE","Additional PPE Required")}
                </div>
              </div>

              {/* ================= COMPLIANCE ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Reference</h3>
                <div className="form-fields">
                  {field(values,"applicableActRule","Applicable Act / Rule")}
                  {field(values,"regulatoryAuthority","Regulatory Authority")}

                  <div className="form-field">
                    <label className="form-label">Confined Space</label>
                    {isPrintMode
                      ? <div className="print-value">{values.confinedSpace || "-"}</div>
                      : <Field as="select" name="confinedSpace" className="form-input">
                          <option value="">Select</option>
                          <option>Yes</option>
                          <option>No</option>
                        </Field>
                    }
                  </div>
                </div>
              </div>

              <FormCustomFields values={values}/>
              <FormAttachments values={values}/>

              {/* ================= AUTHORIZATION ================= */}
              <div className="form-section">
                <FieldArray name="approvalRoles">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode &&
                        <button type="button" className="btn-submit"
                          onClick={()=>push({roleName:"New Role",data:{}})}>
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
              </div>

            </ModernA4Template>
          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM01838_HotWorkPermit;