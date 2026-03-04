// FRM01834_LiftingPlan.jsx
// FRM-01834 – Lifting Plan
// Enterprise Grade – HSE Lifting & Rigging Control

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
  liftingPlanId: Yup.string().required("Required"),
  dateOfLift: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01834",
  liftingPlanId: "",
  department: "HSE / EHS",
  businessUnit: "",
  siteLocation: "",
  dateOfLift: "",
  timeOfLift: "",
  liftCategory: "",
  workPermitNumber: "",
  status: "",

  loadDescription: "",
  loadWeight: "",
  loadDimensions: "",
  centerOfGravity: "",
  loadStability: "",

  craneType: "",
  equipmentId: "",
  swlCapacity: "",
  boomConfiguration: "",
  inspectionValid: "",
  operatorName: "",
  operatorLicenseValid: "",

  riggingDetails: [
    {
      riggingEquipment: "",
      capacity: "",
      inspectionStatus: "",
      colorCodeVerified: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  hazardsIdentified: "",
  groundConditionVerified: "",
  barricadingRequired: "",
  weatherSuitable: "",
  communicationMethod: "",
  emergencyPlanAvailable: "",

  liftSupervisor: "",
  riggerName: "",
  signalmanName: "",
  safetyOfficerName: "",

  applicableActRule: "",
  regulatoryAuthority: "",
  thirdPartyInspection: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By (HSE)", data: {} },
    { roleName: "Approved By (Project / Plant Head)", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01834_LiftingPlan = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const columnName = prompt("Enter New Column Name");
    if (!columnName) return;
    const key = columnName.replace(/\s+/g, '');
    if (dynamicColumns.find(col => col.key === key)) return;
    setDynamicColumns([...dynamicColumns, { key, label: columnName }]);
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
    <ModernFormWrapper formId="FRM-01834" title="Lifting Plan">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Lifting Plan Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>
            <ModernA4Template
              formId="FRM-01834"
              title="LIFTING PLAN"
              department="HSE / EHS – Lifting Operations"
            >

              {/* ================= GENERAL INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"liftingPlanId","Lifting Plan ID")}
                  {field(values,"department","Department")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"siteLocation","Site / Location")}
                  {field(values,"dateOfLift","Date of Lift","date")}
                  {field(values,"timeOfLift","Time of Lift","time")}

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

                  {field(values,"workPermitNumber","Work Permit Number")}
                  {field(values,"status","Status")}
                </div>
              </div>

              {/* ================= LOAD DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Load Details</h3>
                <div className="form-fields">
                  {field(values,"loadDescription","Description of Load","text",true)}
                  {field(values,"loadWeight","Weight of Load (kg/tons)")}
                  {field(values,"loadDimensions","Dimensions of Load")}
                  
                  <div className="form-field">
                    <label className="form-label">Center of Gravity Identified</label>
                    {isPrintMode
                      ? <div className="print-value">{values.centerOfGravity || "-"}</div>
                      : <Field as="select" name="centerOfGravity" className="form-input">
                          <option value="">Select</option>
                          <option>Yes</option>
                          <option>No</option>
                        </Field>
                    }
                  </div>

                  {field(values,"loadStability","Load Stability Condition")}
                </div>
              </div>

              {/* ================= EQUIPMENT DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Lifting Equipment Details</h3>
                <div className="form-fields">
                  {field(values,"craneType","Crane Type / Equipment Name")}
                  {field(values,"equipmentId","Equipment ID Number")}
                  {field(values,"swlCapacity","SWL / Capacity")}
                  {field(values,"boomConfiguration","Boom Length / Configuration")}

                  {["inspectionValid","operatorLicenseValid"].map(fieldName=>(
                    <div className="form-field" key={fieldName}>
                      <label className="form-label">
                        {fieldName==="inspectionValid"
                          ? "Inspection Certificate Valid"
                          : "Operator License Valid"}
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

                  {field(values,"operatorName","Operator Name")}
                </div>
              </div>

              {/* ================= RIGGING TABLE ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Rigging & Accessories Details</h3>

                {!isPrintMode && (
                  <button
                    type="button"
                    className="btn-submit"
                    style={{marginBottom:10}}
                    onClick={()=>setFieldValue("riggingDetails",[
                      ...values.riggingDetails,
                      {
                        riggingEquipment:"",
                        capacity:"",
                        inspectionStatus:"",
                        colorCodeVerified:"",
                        remarks:"",
                        dynamicFields:{}
                      }
                    ])}
                  >
                    + Add Row
                  </button>
                )}

                <FieldArray name="riggingDetails">
                  {({ remove })=>(
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
                  )}
                </FieldArray>
              </div>

              {/* ================= HAZARD & CONTROL ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Hazard & Control Measures</h3>
                <div className="form-fields">
                  {field(values,"hazardsIdentified","Hazards Identified","text",true)}

                  {["groundConditionVerified","barricadingRequired","weatherSuitable","emergencyPlanAvailable"]
                    .map(fieldName=>(
                      <div className="form-field" key={fieldName}>
                        <label className="form-label">
                          {fieldName==="groundConditionVerified"?"Ground Condition Verified":
                           fieldName==="barricadingRequired"?"Barricading Required":
                           fieldName==="weatherSuitable"?"Weather Condition Suitable":
                           "Emergency Plan Available"}
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

                  {field(values,"communicationMethod","Communication Method (Hand Signals / Radio)")}
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

              {/* ================= LEGAL ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Legal & Compliance Reference</h3>
                <div className="form-fields">
                  {field(values,"applicableActRule","Applicable Act / Rule")}
                  {field(values,"regulatoryAuthority","Regulatory Authority")}
                  <div className="form-field">
                    <label className="form-label">Third Party Inspection Required</label>
                    {isPrintMode
                      ? <div className="print-value">{values.thirdPartyInspection || "-"}</div>
                      : <Field as="select" name="thirdPartyInspection" className="form-input">
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

export default FRM01834_LiftingPlan;