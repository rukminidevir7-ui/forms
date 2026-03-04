// FRM01799_HSEContractorSafetyRequirements.jsx
// FRM-01799 / 01800 / 01801 – HSE Contractor Safety Requirements (Universal)
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
  contractReferenceNumber: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01799",
  date: "",
  department: "HSE / EHS",
  businessUnit: "",
  siteLocation: "",
  contractReferenceNumber: "",
  projectName: "",
  startDate: "",
  endDate: "",
  status: "",

  contractorCompanyName: "",
  contractorAddress: "",
  contractorContactPerson: "",
  contactNumber: "",
  emailId: "",
  scopeOfWork: "",

  complianceEntries: [
    {
      requirementCategory: "",
      requirementDescription: "",
      legalRequirementLinked: "",
      documentSubmitted: "",
      verificationStatus: "",
      validTillDate: "",
      responsiblePerson: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  majorHazardsIdentified: "",
  controlMeasuresDefined: "",
  emergencyPlanAvailable: "",
  inductionCompleted: "",

  applicableActRule: "",
  regulatoryAuthority: "",
  complianceObligationReference: "",

  insuranceCertificateAttached: "",
  workPermitCopyAttached: "",
  trainingRecordsAttached: "",
  uploadReferenceId: "",

  approvalRoles: [
    { roleName: "Prepared By (HSE)", data: {} },
    { roleName: "Reviewed By (Project Manager)", data: {} },
    { roleName: "Approved By (Management)", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01799_HSEContractorSafetyRequirements = () => {

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
    <ModernFormWrapper formId="FRM-01799" title="HSE Contractor Safety Requirements">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("HSE Contractor Safety Requirements Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01799"
              title="HSE CONTRACTOR SAFETY REQUIREMENTS"
              department="HSE / EHS – Governance & Legal Compliance"
            >

              {/* General Information */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"date","Date","date")}
                  {field(values,"department","Department")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"siteLocation","Site / Location")}
                  {field(values,"contractReferenceNumber","Contract Reference Number")}
                  {field(values,"projectName","Project Name")}
                  {field(values,"startDate","Start Date","date")}
                  {field(values,"endDate","End Date","date")}
                  {field(values,"status","Status")}
                </div>
              </div>

              {/* Contractor Details */}
              <div className="form-section">
                <h3 className="form-section-title">Contractor Details</h3>
                <div className="form-fields">
                  {field(values,"contractorCompanyName","Contractor Company Name")}
                  {field(values,"contractorAddress","Contractor Address","text",true)}
                  {field(values,"contractorContactPerson","Contractor Contact Person")}
                  {field(values,"contactNumber","Contact Number")}
                  {field(values,"emailId","Email ID")}
                  {field(values,"scopeOfWork","Scope of Work","text",true)}
                </div>
              </div>

              {/* Compliance Table */}
              <div className="form-section">
                <h3 className="form-section-title">Contractor Safety Compliance Details</h3>

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
                        setFieldValue("complianceEntries", [
                          ...values.complianceEntries,
                          {
                            requirementCategory:"",
                            requirementDescription:"",
                            legalRequirementLinked:"",
                            documentSubmitted:"",
                            verificationStatus:"",
                            validTillDate:"",
                            responsiblePerson:"",
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

               <FieldArray name="complianceEntries">
  {({ remove }) => (
    <table className="items-table">
      <thead>
        <tr>
          <th>Sl No</th>
          <th>Category</th>
          <th>Description</th>
          <th>Legal Linked</th>
          <th>Document Submitted</th>
          <th>Verification Status</th>
          <th>Valid Till</th>
          <th>Responsible</th>
          <th>Remarks</th>
          {dynamicColumns.map(col => (
            <th key={col.key}>{col.label}</th>
          ))}
          {!isPrintMode && <th>Action</th>}
        </tr>
      </thead>

      <tbody>
        {values.complianceEntries.map((row, index) => (
          <tr key={index}>
            <td>{index + 1}</td>

            {/* CATEGORY */}
            <td>
              {isPrintMode ? (
                row.requirementCategory || "-"
              ) : (
                <Field
                  as="select"
                  name={`complianceEntries.${index}.requirementCategory`}
                  className="form-input"
                >
                  <option value="">Select</option>
                  <option>Training</option>
                  <option>PPE</option>
                  <option>Work Permit</option>
                  <option>Insurance</option>
                  <option>Medical</option>
                  <option>Others</option>
                </Field>
              )}
            </td>

            {/* DESCRIPTION */}
            <td>
              {isPrintMode ? (
                row.requirementDescription || "-"
              ) : (
                <Field
                  as="textarea"
                  name={`complianceEntries.${index}.requirementDescription`}
                  className="form-input"
                />
              )}
            </td>

            {/* LEGAL LINKED */}
            <td>
              {isPrintMode ? (
                row.legalRequirementLinked || "-"
              ) : (
                <Field
                  as="select"
                  name={`complianceEntries.${index}.legalRequirementLinked`}
                  className="form-input"
                >
                  <option value="">Select</option>
                  <option>Yes</option>
                  <option>No</option>
                </Field>
              )}
            </td>

            {/* DOCUMENT SUBMITTED */}
            <td>
              {isPrintMode ? (
                row.documentSubmitted || "-"
              ) : (
                <Field
                  as="select"
                  name={`complianceEntries.${index}.documentSubmitted`}
                  className="form-input"
                >
                  <option value="">Select</option>
                  <option>Yes</option>
                  <option>No</option>
                </Field>
              )}
            </td>

            {/* SIMPLE TEXT FIELDS */}
            {[
              "verificationStatus",
              "validTillDate",
              "responsiblePerson",
              "remarks"
            ].map(fieldName => (
              <td key={fieldName}>
                {isPrintMode ? (
                  row[fieldName] || "-"
                ) : fieldName === "remarks" ? (
                  <Field
                    as="textarea"
                    name={`complianceEntries.${index}.${fieldName}`}
                    className="form-input"
                  />
                ) : fieldName === "validTillDate" ? (
                  <Field
                    type="date"
                    name={`complianceEntries.${index}.${fieldName}`}
                    className="form-input"
                  />
                ) : (
                  <Field
                    name={`complianceEntries.${index}.${fieldName}`}
                    className="form-input"
                  />
                )}
              </td>
            ))}

            {/* DYNAMIC COLUMNS */}
            {dynamicColumns.map(col => (
              <td key={col.key}>
                {isPrintMode
                  ? row.dynamicFields?.[col.key] || "-"
                  : (
                    <Field
                      name={`complianceEntries.${index}.dynamicFields.${col.key}`}
                      className="form-input"
                    />
                  )
                }
              </td>
            ))}

            {!isPrintMode && (
              <td>
                <button type="button" onClick={() => remove(index)}>
                  Remove
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )}
</FieldArray>
              </div>

              {/* Risk & Safety Controls */}
              <div className="form-section">
                <h3 className="form-section-title">Risk & Safety Controls</h3>
                <div className="form-fields">
                  {field(values,"majorHazardsIdentified","Major Hazards Identified","text",true)}
                  {field(values,"controlMeasuresDefined","Control Measures Defined","text",true)}
                  {field(values,"emergencyPlanAvailable","Emergency Preparedness Plan Available (Yes/No)")}
                  {field(values,"inductionCompleted","Induction Training Completed (Yes/No)")}
                </div>
              </div>

              {/* Legal Reference */}
              <div className="form-section">
                <h3 className="form-section-title">Legal & Compliance Reference</h3>
                <div className="form-fields">
                  {field(values,"applicableActRule","Applicable Act / Rule")}
                  {field(values,"regulatoryAuthority","Regulatory Authority")}
                  {field(values,"complianceObligationReference","Compliance Obligation Reference")}
                </div>
              </div>

              {/* Custom Fields */}
              <FormCustomFields values={values}/>

              {/* Attachments */}
              <div className="form-section">
                <FormAttachments values={values}/>
                <div className="form-fields">
                  {field(values,"insuranceCertificateAttached","Insurance Certificate Attached (Yes/No)")}
                  {field(values,"workPermitCopyAttached","Work Permit Copy Attached (Yes/No)")}
                  {field(values,"trainingRecordsAttached","Training Records Attached (Yes/No)")}
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
                    Submit Contractor Safety Requirements
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

export default FRM01799_HSEContractorSafetyRequirements;