// FRM01795_HSEBudgetProposal.jsx
// FRM-01795 / 01796 / 01797 – HSE Budget Proposal (Universal)
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
  financialYear: Yup.string().required("Required"),
  budgetType: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01795",
  date: "",
  department: "HSE / EHS",
  businessUnit: "",
  siteLocation: "",
  financialYear: "",
  proposalDate: "",
  budgetType: "",
  status: "",

  companyName: "",
  plantSiteName: "",
  hseHeadName: "",
  financeRepresentativeName: "",

  budgetItems: [
    {
      budgetCategory: "",
      description: "",
      legalRequirementLinked: "",
      riskLevel: "",
      estimatedCost: "",
      approvedCost: "",
      costCenter: "",
      plannedQuarter: "",
      vendor: "",
      justification: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  totalEstimatedBudget: "",
  totalApprovedBudget: "",
  budgetVariance: "",
  fundingSource: "",

  majorRiskAddressed: "",
  complianceObligationReference: "",
  impactIfNotApproved: "",

  supportingDocumentsAttached: "",
  quotationAttached: "",
  uploadReferenceId: "",

  approvalRoles: [
    { roleName: "Prepared By (HSE)", data: {} },
    { roleName: "Reviewed By (Finance)", data: {} },
    { roleName: "Approved By (Management)", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01795_HSEBudgetProposal = () => {

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
    <ModernFormWrapper formId="FRM-01795" title="HSE Budget Proposal">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("HSE Budget Proposal Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01795"
              title="HSE BUDGET PROPOSAL"
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
                  {field(values,"financialYear","Financial Year")}
                  {field(values,"proposalDate","Proposal Date","date")}
                  <div className="form-field">
                    <label className="form-label">Budget Type (CAPEX / OPEX)</label>
                    <Field as="select" name="budgetType" className="form-input">
                      <option value="">Select</option>
                      <option>CAPEX</option>
                      <option>OPEX</option>
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
                  {field(values,"financeRepresentativeName","Finance Representative Name")}
                </div>
              </div>

              {/* Budget Table */}
              <div className="form-section">
                <h3 className="form-section-title">Budget Line Item Details</h3>

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
                        setFieldValue("budgetItems", [
                          ...values.budgetItems,
                          {
                            budgetCategory:"",
                            description:"",
                            legalRequirementLinked:"",
                            riskLevel:"",
                            estimatedCost:"",
                            approvedCost:"",
                            costCenter:"",
                            plannedQuarter:"",
                            vendor:"",
                            justification:"",
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
<FieldArray name="budgetItems">
  {({ remove }) => (
    <table className="items-table">
      <thead>
        <tr>
          <th>Sl No</th>
          <th>Category</th>
          <th>Description</th>
          <th>Legal Linked</th>
          <th>Risk Level</th>
          <th>Estimated Cost</th>
          <th>Approved Cost</th>
          <th>Cost Center</th>
          <th>Planned Quarter</th>
          <th>Vendor</th>
          <th>Justification</th>
          <th>Remarks</th>
          {dynamicColumns.map(col => (
            <th key={col.key}>{col.label}</th>
          ))}
          {!isPrintMode && <th>Action</th>}
        </tr>
      </thead>

      <tbody>
        {values.budgetItems.map((row, index) => (
          <tr key={index}>
            <td>{index + 1}</td>

            {/* CATEGORY */}
            <td>
              {isPrintMode ? (
                row.budgetCategory || "-"
              ) : (
                <Field
                  as="select"
                  name={`budgetItems.${index}.budgetCategory`}
                  className="form-input"
                >
                  <option value="">Select</option>
                  <option>Training</option>
                  <option>PPE</option>
                  <option>Audit</option>
                  <option>Equipment</option>
                  <option>Compliance</option>
                </Field>
              )}
            </td>

            {/* DESCRIPTION */}
            <td>
              {isPrintMode ? (
                row.description || "-"
              ) : (
                <Field
                  as="textarea"
                  name={`budgetItems.${index}.description`}
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
                  name={`budgetItems.${index}.legalRequirementLinked`}
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
              "riskLevel",
              "estimatedCost",
              "approvedCost",
              "costCenter",
              "plannedQuarter",
              "vendor",
              "justification",
              "remarks"
            ].map(fieldName => (
              <td key={fieldName}>
                {isPrintMode ? (
                  row[fieldName] || "-"
                ) : fieldName === "justification" || fieldName === "remarks" ? (
                  <Field
                    as="textarea"
                    name={`budgetItems.${index}.${fieldName}`}
                    className="form-input"
                  />
                ) : (
                  <Field
                    name={`budgetItems.${index}.${fieldName}`}
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
                      name={`budgetItems.${index}.dynamicFields.${col.key}`}
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

              {/* Financial Summary */}
              <div className="form-section">
                <h3 className="form-section-title">Financial Summary</h3>
                <div className="form-fields">
                  {field(values,"totalEstimatedBudget","Total Estimated Budget")}
                  {field(values,"totalApprovedBudget","Total Approved Budget")}
                  {field(values,"budgetVariance","Budget Variance")}
                  {field(values,"fundingSource","Funding Source")}
                </div>
              </div>

              {/* Risk & Compliance Justification */}
              <div className="form-section">
                <h3 className="form-section-title">Risk & Compliance Justification</h3>
                <div className="form-fields">
                  {field(values,"majorRiskAddressed","Major Risk Addressed","text",true)}
                  {field(values,"complianceObligationReference","Compliance Obligation Reference","text",true)}
                  {field(values,"impactIfNotApproved","Impact if Not Approved","text",true)}
                </div>
              </div>

              {/* Custom Fields */}
              <FormCustomFields values={values}/>

              {/* Attachments */}
              <div className="form-section">
                <FormAttachments values={values}/>
                <div className="form-fields">
                  {field(values,"supportingDocumentsAttached","Supporting Documents Attached (Yes/No)")}
                  {field(values,"quotationAttached","Quotation Attached (Yes/No)")}
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
                    Submit HSE Budget Proposal
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

export default FRM01795_HSEBudgetProposal;