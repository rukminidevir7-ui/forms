// FRM01798_HSERiskRegisterUpdate.jsx
// FRM-01798 – HSE Risk Register Update Log
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
  updateDate: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01798",
  date: "",
  department: "HSE / EHS",
  businessUnit: "",
  siteLocation: "",
  updateDate: "",
  riskAssessmentMethod: "",
  status: "",

  companyName: "",
  plantSiteName: "",
  hseHeadName: "",

  riskEntries: [
    {
      hazardDescription: "",
      activityProcess: "",
      location: "",
      potentialConsequence: "",
      existingControls: "",
      likelihoodRating: "",
      severityRating: "",
      riskScore: "",
      riskLevel: "",
      additionalControls: "",
      responsiblePerson: "",
      targetDate: "",
      currentStatus: "",
      reviewDate: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  applicableActRule: "",
  regulatoryAuthority: "",
  complianceLinked: "",

  riskAssessmentSheetAttached: "",
  supportingDocumentsAttached: "",
  uploadReferenceId: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By (HSE Head)", data: {} },
    { roleName: "Approved By (Management Representative)", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01798_HSERiskRegisterUpdate = () => {

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
    <ModernFormWrapper formId="FRM-01798" title="HSE Risk Register Update Log">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("HSE Risk Register Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01798"
              title="HSE RISK REGISTER UPDATE LOG"
              department="HSE / EHS – Governance & Legal Compliance"
            >

              {/* General Information */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Log Number")}
                  {field(values,"date","Date","date")}
                  {field(values,"department","Department")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"siteLocation","Site / Location")}
                  {field(values,"updateDate","Update Date","date")}
                  <div className="form-field">
                    <label className="form-label">Risk Assessment Method</label>
                    <Field as="select" name="riskAssessmentMethod" className="form-input">
                      <option value="">Select</option>
                      <option>HIRA</option>
                      <option>JSA</option>
                      <option>HAZOP</option>
                      <option>Other</option>
                    </Field>
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
                  {field(values,"hseHeadName","HSE Head Name")}
                </div>
              </div>

              {/* Risk Register Table */}
              <div className="form-section">
                <h3 className="form-section-title">Risk Register Entries</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 10 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>
                    <button
                      type="button"
                      className="btn-submit"
                      style={{ marginLeft: 10 }}
                      onClick={() =>
                        setFieldValue("riskEntries", [
                          ...values.riskEntries,
                          {
                            hazardDescription:"",
                            activityProcess:"",
                            location:"",
                            potentialConsequence:"",
                            existingControls:"",
                            likelihoodRating:"",
                            severityRating:"",
                            riskScore:"",
                            riskLevel:"",
                            additionalControls:"",
                            responsiblePerson:"",
                            targetDate:"",
                            currentStatus:"",
                            reviewDate:"",
                            remarks:"",
                            dynamicFields:{}
                          }
                        ])
                      }
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="riskEntries">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Sl No</th>
                          <th>Hazard</th>
                          <th>Activity / Process</th>
                          <th>Location</th>
                          <th>Potential Consequence</th>
                          <th>Existing Controls</th>
                          <th>Likelihood</th>
                          <th>Severity</th>
                          <th>Risk Score</th>
                          <th>Risk Level</th>
                          <th>Additional Controls</th>
                          <th>Responsible</th>
                          <th>Target Date</th>
                          <th>Status</th>
                          <th>Review Date</th>
                          <th>Remarks</th>
                          {dynamicColumns.map(col=>(
                            <th key={col.key}>
                              {col.label}
                              {!isPrintMode &&
                                <button type="button" onClick={()=>removeColumn(col.key)}>x</button>}
                            </th>
                          ))}
                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>

                      <tbody>
                        {values.riskEntries.map((row,index)=>(
                          <tr key={index}>
                            <td>{index+1}</td>
                            <td><Field as="textarea" name={`riskEntries.${index}.hazardDescription`} className="form-input"/></td>
                            <td><Field name={`riskEntries.${index}.activityProcess`} className="form-input"/></td>
                            <td><Field name={`riskEntries.${index}.location`} className="form-input"/></td>
                            <td><Field as="textarea" name={`riskEntries.${index}.potentialConsequence`} className="form-input"/></td>
                            <td><Field as="textarea" name={`riskEntries.${index}.existingControls`} className="form-input"/></td>
                            <td><Field name={`riskEntries.${index}.likelihoodRating`} className="form-input"/></td>
                            <td><Field name={`riskEntries.${index}.severityRating`} className="form-input"/></td>
                            <td><Field name={`riskEntries.${index}.riskScore`} className="form-input"/></td>
                            <td>
                              <Field as="select" name={`riskEntries.${index}.riskLevel`} className="form-input">
                                <option value="">Select</option>
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                              </Field>
                            </td>
                            <td><Field as="textarea" name={`riskEntries.${index}.additionalControls`} className="form-input"/></td>
                            <td><Field name={`riskEntries.${index}.responsiblePerson`} className="form-input"/></td>
                            <td><Field type="date" name={`riskEntries.${index}.targetDate`} className="form-input"/></td>
                            <td><Field name={`riskEntries.${index}.currentStatus`} className="form-input"/></td>
                            <td><Field type="date" name={`riskEntries.${index}.reviewDate`} className="form-input"/></td>
                            <td><Field as="textarea" name={`riskEntries.${index}.remarks`} className="form-input"/></td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`riskEntries.${index}.dynamicFields.${col.key}`} className="form-input"/>
                              </td>
                            ))}

                            {!isPrintMode &&
                              <td><button type="button" onClick={()=>remove(index)}>Remove</button></td>}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>
              </div>

              {/* Legal Reference */}
              <div className="form-section">
                <h3 className="form-section-title">Legal & Compliance Reference</h3>
                <div className="form-fields">
                  {field(values,"applicableActRule","Applicable Act / Rule")}
                  {field(values,"regulatoryAuthority","Regulatory Authority")}
                  {field(values,"complianceLinked","Compliance Obligation Linked (Yes/No)")}
                </div>
              </div>

              {/* Custom Fields */}
              <FormCustomFields values={values}/>

              {/* Attachments */}
              <div className="form-section">
                <FormAttachments values={values}/>
                <div className="form-fields">
                  {field(values,"riskAssessmentSheetAttached","Risk Assessment Sheet Attached (Yes/No)")}
                  {field(values,"supportingDocumentsAttached","Supporting Documents Attached (Yes/No)")}
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
                    Submit HSE Risk Register
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

export default FRM01798_HSERiskRegisterUpdate;