// FRM01810_HSEManagementReviewMinutes.jsx
// FRM-01810 – HSE Management Review Minutes
// Enterprise Grade – HSE Governance & Legal Compliance

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
  reviewDate: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01810",
  reviewDate: "",
  reviewPeriodCovered: "",
  locationVenue: "",
  meetingType: "",
  status: "",

  companyName: "",
  plantSiteName: "",
  chairpersonName: "",
  hseHeadName: "",

  attendance: [
    { name:"", designation:"", department:"", role:"", signature:"" }
  ],

  agendaItems: [
    {
      agendaItem:"",
      discussionSummary:"",
      decisionTaken:"",
      responsiblePerson:"",
      targetDate:"",
      agendaStatus:"",
      remarks:"",
      dynamicFields:{}
    }
  ],

  objectivesStatus:"",
  kpiOverview:"",
  incidentAnalysis:"",
  auditSummary:"",
  complianceOverview:"",
  budgetReview:"",

  improvementAreas:"",
  correctiveActions:"",
  preventiveActions:"",
  strategicDecisions:"",

  applicableActRule:"",
  regulatoryAuthority:"",
  complianceReference:"",

  supportingDocsAttached:"",
  slidesAttached:"",
  uploadReferenceId:"",

  approvalRoles:[
    { roleName:"Prepared By", data:{} },
    { roleName:"Reviewed By (HSE Head)", data:{} },
    { roleName:"Approved By (Top Management)", data:{} }
  ],

  attachments:[],
  customFields:[]
};

const FRM01810_HSEManagementReviewMinutes = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns,setDynamicColumns] = useState([]);

  const addColumn = () => {
    const columnName = prompt("Enter New Column Name");
    if(!columnName) return;
    const key = columnName.replace(/\s+/g,'');
    if(dynamicColumns.find(col=>col.key===key)) return;
    setDynamicColumns([...dynamicColumns,{key,label:columnName}]);
  };

  const removeColumn = (key)=>{
    setDynamicColumns(dynamicColumns.filter(col=>col.key!==key));
  };

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
    <ModernFormWrapper formId="FRM-01810" title="HSE Management Review Minutes">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("HSE Management Review Minutes Submitted Successfully");
        }}
      >
        {({ values,setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-01810"
              title="HSE MANAGEMENT REVIEW MINUTES"
              department="HSE / EHS – Governance & Legal Compliance"
            >

              {/* General Information */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"reviewDate","Review Date","date")}
                  {field(values,"reviewPeriodCovered","Review Period Covered")}
                  {field(values,"locationVenue","Location / Venue")}

                  <div className="form-field">
                    <label className="form-label">Meeting Type</label>
                    {isPrintMode
                      ? <div className="print-value">{values.meetingType || "-"}</div>
                      : <Field as="select" name="meetingType" className="form-input">
                          <option value="">Select</option>
                          <option>Annual</option>
                          <option>Half-Yearly</option>
                          <option>Special</option>
                        </Field>
                    }
                  </div>

                  {field(values,"status","Status")}
                </div>
              </div>

              {/* Organization Details */}
              <div className="form-section">
                <h3 className="form-section-title">Organization Details</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"plantSiteName","Plant / Site Name")}
                  {field(values,"chairpersonName","Chairperson Name")}
                  {field(values,"hseHeadName","HSE Head Name")}
                </div>
              </div>

              {/* Attendance Table */}
              <div className="form-section">
                <h3 className="form-section-title">Attendance Details</h3>

                {!isPrintMode &&
                  <button type="button" className="btn-submit"
                    onClick={()=>setFieldValue("attendance",
                      [...values.attendance,{name:"",designation:"",department:"",role:"",signature:""}]
                    )}>
                    + Add Row
                  </button>
                }

                <FieldArray name="attendance">
                  {({ remove })=>(
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Sl No</th>
                          <th>Name</th>
                          <th>Designation</th>
                          <th>Department</th>
                          <th>Role</th>
                          <th>Signature</th>
                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {values.attendance.map((row,index)=>(
                          <tr key={index}>
                            <td>{index+1}</td>
                            {["name","designation","department","role","signature"].map(fieldName=>(
                              <td key={fieldName}>
                                {isPrintMode
                                  ? row[fieldName] || "-"
                                  : <Field name={`attendance.${index}.${fieldName}`} className="form-input"/>
                                }
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

              {/* Agenda Table */}
              <div className="form-section">
                <h3 className="form-section-title">Review Agenda & Discussion</h3>

                {!isPrintMode && (
                  <div style={{marginBottom:10}}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>
                    <button type="button" className="btn-submit" style={{marginLeft:10}}
                      onClick={()=>setFieldValue("agendaItems",
                        [...values.agendaItems,{
                          agendaItem:"",
                          discussionSummary:"",
                          decisionTaken:"",
                          responsiblePerson:"",
                          targetDate:"",
                          agendaStatus:"",
                          remarks:"",
                          dynamicFields:{}
                        }]
                      )}>
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="agendaItems">
                  {({ remove })=>(
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Sl No</th>
                          <th>Agenda Item</th>
                          <th>Discussion</th>
                          <th>Decision</th>
                          <th>Responsible</th>
                          <th>Target Date</th>
                          <th>Status</th>
                          <th>Remarks</th>
                          {dynamicColumns.map(col=>(
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
                            <td>{index+1}</td>

                            {["agendaItem","discussionSummary","decisionTaken","responsiblePerson","remarks"].map(fieldName=>(
                              <td key={fieldName}>
                                {isPrintMode
                                  ? row[fieldName] || "-"
                                  : <Field as="textarea"
                                      name={`agendaItems.${index}.${fieldName}`}
                                      className="form-input"/>
                                }
                              </td>
                            ))}

                            <td>
                              {isPrintMode
                                ? row.targetDate || "-"
                                : <Field type="date"
                                    name={`agendaItems.${index}.targetDate`}
                                    className="form-input"/>
                              }
                            </td>

                            <td>
                              {isPrintMode
                                ? row.agendaStatus || "-"
                                : <Field as="select"
                                    name={`agendaItems.${index}.agendaStatus`}
                                    className="form-input">
                                    <option value="">Select</option>
                                    <option>Open</option>
                                    <option>Closed</option>
                                  </Field>
                              }
                            </td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                {isPrintMode
                                  ? row.dynamicFields?.[col.key] || "-"
                                  : <Field
                                      name={`agendaItems.${index}.dynamicFields.${col.key}`}
                                      className="form-input"/>
                                }
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

              {/* Performance Review Summary */}
              <div className="form-section">
                <h3 className="form-section-title">Performance Review Summary</h3>
                <div className="form-fields">
                  {field(values,"objectivesStatus","HSE Objectives Achievement Status","text",true)}
                  {field(values,"kpiOverview","KPI Performance Overview","text",true)}
                  {field(values,"incidentAnalysis","Incident & Near Miss Analysis","text",true)}
                  {field(values,"auditSummary","Audit Findings Summary","text",true)}
                  {field(values,"complianceOverview","Compliance Status Overview","text",true)}
                  {field(values,"budgetReview","Resource & Budget Review","text",true)}
                </div>
              </div>

              {/* Improvement Plan */}
              <div className="form-section">
                <h3 className="form-section-title">Improvement & Action Plan</h3>
                <div className="form-fields">
                  {field(values,"improvementAreas","Major Improvement Areas","text",true)}
                  {field(values,"correctiveActions","Corrective Actions Required","text",true)}
                  {field(values,"preventiveActions","Preventive Actions Required","text",true)}
                  {field(values,"strategicDecisions","Strategic Decisions","text",true)}
                </div>
              </div>

              {/* Legal Reference */}
              <div className="form-section">
                <h3 className="form-section-title">Legal & Compliance Reference</h3>
                <div className="form-fields">
                  {field(values,"applicableActRule","Applicable Act / Rule")}
                  {field(values,"regulatoryAuthority","Regulatory Authority")}
                  {field(values,"complianceReference","Compliance Obligation Reference")}
                </div>
              </div>

              <FormCustomFields values={values}/>

              {/* Attachments */}
              <div className="form-section">
                <FormAttachments values={values}/>
                <div className="form-fields">
                  {field(values,"supportingDocsAttached","Supporting Documents Attached (Yes/No)")}
                  {field(values,"slidesAttached","Presentation Slides Attached (Yes/No)")}
                  {field(values,"uploadReferenceId","Upload Reference ID")}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>
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

export default FRM01810_HSEManagementReviewMinutes;