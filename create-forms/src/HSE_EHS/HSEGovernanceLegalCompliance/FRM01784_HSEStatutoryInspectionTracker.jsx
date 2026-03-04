// FRM01784_HSEStatutoryInspectionTracker.jsx
// FRM-01784 – HSE Statutory Inspection Tracker
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
  department: Yup.string().required("Required"),
  inspectionYear: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01784",
  date: "",
  department: "HSE / EHS",
  businessUnit: "",
  siteLocation: "",
  inspectionYear: "",
  status: "",

  companyName: "",
  corporateOfficeAddress: "",
  plantSiteName: "",
  hseManagerName: "",

  inspectionEntries: [
    {
      equipmentArea: "",
      applicableAct: "",
      inspectionType: "",
      frequency: "",
      lastInspectionDate: "",
      nextDueDate: "",
      inspectionAuthority: "",
      complianceStatus: "",
      findingsSummary: "",
      correctiveActionRequired: "",
      actionClosureDate: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  regulatoryAuthorityName: "",
  inspectionNoticeNumber: "",
  governmentCircularReference: "",

  inspectionReportAttached: "",
  complianceCertificateAttached: "",
  uploadReferenceId: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By (HSE Manager)", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01784_HSEStatutoryInspectionTracker = () => {

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

  const field = (values, name, label, type="text", isTextArea=false) => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : isTextArea
          ? <Field as="textarea" name={name} className="form-input" rows="3"/>
          : <Field name={name} type={type} className="form-input"/>
      }
      <ErrorMessage name={name} component="div" className="form-error"/>
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-01784" title="HSE Statutory Inspection Tracker">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("HSE Statutory Inspection Tracker Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01784"
              title="HSE STATUTORY INSPECTION TRACKER"
              department="HSE / EHS – Governance & Legal Compliance"
            >

              {/* General Information */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Checklist Number")}
                  {field(values,"date","Date","date")}
                  {field(values,"department","Department")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"siteLocation","Site / Location")}
                  {field(values,"inspectionYear","Inspection Year")}
                  {field(values,"status","Status")}
                </div>
              </div>

              {/* Organization Details */}
              <div className="form-section">
                <h3 className="form-section-title">Organization Details</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"corporateOfficeAddress","Corporate Office Address","text",true)}
                  {field(values,"plantSiteName","Plant / Site Name")}
                  {field(values,"hseManagerName","HSE Manager Name")}
                </div>
              </div>

              {/* Inspection Table */}
              <div className="form-section">
                <h3 className="form-section-title">Statutory Inspection Details</h3>

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
                        setFieldValue("inspectionEntries", [
                          ...values.inspectionEntries,
                          {
                            equipmentArea: "",
                            applicableAct: "",
                            inspectionType: "",
                            frequency: "",
                            lastInspectionDate: "",
                            nextDueDate: "",
                            inspectionAuthority: "",
                            complianceStatus: "",
                            findingsSummary: "",
                            correctiveActionRequired: "",
                            actionClosureDate: "",
                            remarks: "",
                            dynamicFields: {}
                          }
                        ])
                      }
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="inspectionEntries">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Equipment / Area</th>
                          <th>Applicable Act</th>
                          <th>Inspection Type</th>
                          <th>Frequency</th>
                          <th>Last Inspection</th>
                          <th>Next Due</th>
                          <th>Inspection Authority</th>
                          <th>Compliance Status</th>
                          <th>Findings Summary</th>
                          <th>Corrective Action</th>
                          <th>Closure Date</th>
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
                        {values.inspectionEntries.map((row,index)=>(
                          <tr key={index}>
                            <td><Field as="textarea" name={`inspectionEntries.${index}.equipmentArea`} className="form-input"/></td>
                            <td><Field as="textarea" name={`inspectionEntries.${index}.applicableAct`} className="form-input"/></td>
                            <td><Field as="select" name={`inspectionEntries.${index}.inspectionType`} className="form-input">
                              <option value="">Select</option>
                              <option>Internal</option>
                              <option>External</option>
                            </Field></td>
                            <td><Field name={`inspectionEntries.${index}.frequency`} className="form-input"/></td>
                            <td><Field type="date" name={`inspectionEntries.${index}.lastInspectionDate`} className="form-input"/></td>
                            <td><Field type="date" name={`inspectionEntries.${index}.nextDueDate`} className="form-input"/></td>
                            <td><Field name={`inspectionEntries.${index}.inspectionAuthority`} className="form-input"/></td>
                            <td><Field name={`inspectionEntries.${index}.complianceStatus`} className="form-input"/></td>
                            <td><Field as="textarea" name={`inspectionEntries.${index}.findingsSummary`} className="form-input"/></td>
                            <td><Field as="select" name={`inspectionEntries.${index}.correctiveActionRequired`} className="form-input">
                              <option value="">Select</option>
                              <option>Yes</option>
                              <option>No</option>
                            </Field></td>
                            <td><Field type="date" name={`inspectionEntries.${index}.actionClosureDate`} className="form-input"/></td>
                            <td><Field as="textarea" name={`inspectionEntries.${index}.remarks`} className="form-input"/></td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`inspectionEntries.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* Regulatory Reference */}
              <div className="form-section">
                <h3 className="form-section-title">Regulatory Authority Reference</h3>
                <div className="form-fields">
                  {field(values,"regulatoryAuthorityName","Regulatory Authority Name")}
                  {field(values,"inspectionNoticeNumber","Inspection Notice Number")}
                  {field(values,"governmentCircularReference","Government Circular Reference")}
                </div>
              </div>

              {/* Custom Fields */}
              <FormCustomFields values={values}/>

              {/* Attachments */}
              <div className="form-section">
                <FormAttachments values={values}/>
                <div className="form-fields">
                  {field(values,"inspectionReportAttached","Inspection Report Copy Attached (Yes/No)")}
                  {field(values,"complianceCertificateAttached","Compliance Certificate Attached (Yes/No)")}
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
                          onClick={()=>push({ roleName:"New Role", data:{} })}>
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

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit HSE Statutory Inspection Tracker
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

export default FRM01784_HSEStatutoryInspectionTracker;