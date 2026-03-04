// FRM01835_CraneLiftingPermit.jsx
// FRM-01835 / 01836 / 01837 – Crane / Lifting Permit
// Enterprise Grade – HSE Permit to Work System

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
  formId: "FRM-01835",
  permitNumber: "",
  department: "HSE / EHS",
  businessUnit: "",
  siteLocation: "",
  dateOfIssue: "",
  validFromDate: "",
  validFromTime: "",
  validToDate: "",
  validToTime: "",
  liftCategory: "",
  status: "",

  liftingDescription: "",
  liftLocation: "",
  loadDescription: "",
  loadWeight: "",
  loadDimensions: "",
  centerOfGravityConfirmed: "",

  craneType: "",
  craneId: "",
  ratedCapacity: "",
  boomConfiguration: "",
  operatorName: "",
  operatorLicenseValid: "",
  craneInspectionValid: "",

  riggingDetails: [
    {
      riggingEquipment: "",
      capacity: "",
      inspectionStatus: "",
      colorCodeVerified: "",
      remarks: ""
    }
  ],

  barricadingProvided: "",
  groundConditionVerified: "",
  weatherSuitable: "",
  communicationEstablished: "",
  emergencyPlanAvailable: "",
  nearbyHazards: "",

  liftSupervisor: "",
  riggerName: "",
  signalmanName: "",
  safetyOfficerName: "",

  applicableActRule: "",
  regulatoryAuthority: "",
  thirdPartyCertification: "",

  approvalRoles: [
    { roleName: "Requested By", data: {} },
    { roleName: "Reviewed By (HSE)", data: {} },
    { roleName: "Approved By (Project / Plant Head)", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01835_CraneLiftingPermit = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type="text", textarea=false) => (
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
    <ModernFormWrapper formId="FRM-01835" title="Crane / Lifting Permit">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Crane / Lifting Permit Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>
            <ModernA4Template
              formId="FRM-01835"
              title="CRANE / LIFTING PERMIT"
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
                  {field(values,"dateOfIssue","Date of Issue","date")}
                  {field(values,"validFromDate","Valid From (Date)","date")}
                  {field(values,"validFromTime","Valid From (Time)","time")}
                  {field(values,"validToDate","Valid To (Date)","date")}
                  {field(values,"validToTime","Valid To (Time)","time")}

                  <div className="form-field">
                    <label className="form-label">Lift Category</label>
                    {isPrintMode
                      ? <div className="print-value">{values.liftCategory || "-"}</div>
                      : <Field as="select" name="liftCategory" className="form-input">
                          <option value="">Select</option>
                          <option>Routine</option>
                          <option>Critical</option>
                        </Field>
                    }
                  </div>

                  {field(values,"status","Status")}
                </div>
              </div>

              {/* ================= WORK & LOAD DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Work & Load Details</h3>
                <div className="form-fields">
                  {field(values,"liftingDescription","Description of Lifting Activity","text",true)}
                  {field(values,"liftLocation","Location of Lift")}
                  {field(values,"loadDescription","Load Description")}
                  {field(values,"loadWeight","Load Weight")}
                  {field(values,"loadDimensions","Load Dimensions")}

                  <div className="form-field">
                    <label className="form-label">Center of Gravity Confirmed</label>
                    {isPrintMode
                      ? <div className="print-value">{values.centerOfGravityConfirmed || "-"}</div>
                      : <Field as="select" name="centerOfGravityConfirmed" className="form-input">
                          <option value="">Select</option>
                          <option>Yes</option>
                          <option>No</option>
                        </Field>
                    }
                  </div>
                </div>
              </div>

              {/* ================= CRANE DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Crane & Equipment Details</h3>
                <div className="form-fields">
                  {field(values,"craneType","Crane Type / Model")}
                  {field(values,"craneId","Crane ID / Registration Number")}
                  {field(values,"ratedCapacity","Rated Capacity (SWL)")}
                  {field(values,"boomConfiguration","Boom Length / Configuration")}
                  {field(values,"operatorName","Operator Name")}

                  {["operatorLicenseValid","craneInspectionValid"].map(fieldName=>(
                    <div className="form-field" key={fieldName}>
                      <label className="form-label">
                        {fieldName==="operatorLicenseValid"
                          ? "Operator License Valid"
                          : "Crane Inspection Certificate Valid"}
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
                </div>
              </div>

              {/* ================= RIGGING TABLE ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Rigging & Accessories Details</h3>

                <FieldArray name="riggingDetails">
                  {({ remove, push })=>(
                    <>
                      {!isPrintMode &&
                        <button
                          type="button"
                          className="btn-submit"
                          style={{marginBottom:10}}
                          onClick={()=>push({
                            riggingEquipment:"",
                            capacity:"",
                            inspectionStatus:"",
                            colorCodeVerified:"",
                            remarks:""
                          })}
                        >
                          + Add Row
                        </button>
                      }

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Sl No</th>
                            <th>Rigging Equipment</th>
                            <th>Capacity</th>
                            <th>Inspection Status</th>
                            <th>Color Code Verified</th>
                            <th>Remarks</th>
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {values.riggingDetails.map((row,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td>
                                {isPrintMode ? row.riggingEquipment || "-" :
                                  <Field name={`riggingDetails.${index}.riggingEquipment`} className="form-input"/>
                                }
                              </td>
                              <td>
                                {isPrintMode ? row.capacity || "-" :
                                  <Field name={`riggingDetails.${index}.capacity`} className="form-input"/>
                                }
                              </td>
                              <td>
                                {isPrintMode ? row.inspectionStatus || "-" :
                                  <Field as="select" name={`riggingDetails.${index}.inspectionStatus`} className="form-input">
                                    <option value="">Select</option>
                                    <option>Valid</option>
                                    <option>Expired</option>
                                  </Field>
                                }
                              </td>
                              <td>
                                {isPrintMode ? row.colorCodeVerified || "-" :
                                  <Field as="select" name={`riggingDetails.${index}.colorCodeVerified`} className="form-input">
                                    <option value="">Select</option>
                                    <option>Yes</option>
                                    <option>No</option>
                                  </Field>
                                }
                              </td>
                              <td>
                                {isPrintMode ? row.remarks || "-" :
                                  <Field as="textarea" name={`riggingDetails.${index}.remarks`} className="form-input"/>
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

              {/* ================= SAFETY MEASURES ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Safety & Control Measures</h3>
                <div className="form-fields">
                  {["barricadingProvided","groundConditionVerified","weatherSuitable","communicationEstablished","emergencyPlanAvailable"]
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
                  {field(values,"nearbyHazards","Nearby Hazards Identified","text",true)}
                </div>
              </div>

              {/* ================= PERSONNEL ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Personnel Involved</h3>
                <div className="form-fields">
                  {field(values,"liftSupervisor","Lift Supervisor Name")}
                  {field(values,"riggerName","Rigger Name")}
                  {field(values,"signalmanName","Signalman Name")}
                  {field(values,"safetyOfficerName","Safety Officer Name")}
                </div>
              </div>

              {/* ================= COMPLIANCE ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Reference</h3>
                <div className="form-fields">
                  {field(values,"applicableActRule","Applicable Act / Rule")}
                  {field(values,"regulatoryAuthority","Regulatory Authority")}

                  <div className="form-field">
                    <label className="form-label">Third Party Certification Required</label>
                    {isPrintMode
                      ? <div className="print-value">{values.thirdPartyCertification || "-"}</div>
                      : <Field as="select" name="thirdPartyCertification" className="form-input">
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

export default FRM01835_CraneLiftingPermit;