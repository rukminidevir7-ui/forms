// FRM01287_DownstreamInvestmentAssessment.jsx
// FRM-01287 – Downstream Investment Assessment Checklist
// Enterprise Grade – FEMA & RBI – FDI / Inbound Investment

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
  investingEntityName: Yup.string().required("Required"),
  pan: Yup.string().required("Required"),
  investeeEntityName: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "Investment Proposal Note",
  "Financial / Valuation Documents",
  "Regulatory References",
  "Other Supporting Documents"
];

const initialValues = {
  formId: "FRM-01287",
  date: "",
  department: "FEMA & RBI",
  function: "FDI / Inbound Investment",

  /* 1 */
  investingEntityName: "",
  cin: "",
  pan: "",
  sector: "",
  assessmentDate: "",
  formReferenceNo: "",
  preparedBy: "",

  /* 2 */
  investeeEntityName: "",
  country: "",
  businessActivity: "",
  proposedInvestmentAmount: "",
  currency: "",
  percentageHolding: "",
  dateOfInvestment: "",

  /* 3 Checklist */
  complianceItems: [
    { item: "Investing entity qualifies as foreign owned/controlled", status: "", remarks: "", dynamicFields: {} },
    { item: "Sector eligibility verified", status: "", remarks: "", dynamicFields: {} },
    { item: "Sectoral cap compliance confirmed", status: "", remarks: "", dynamicFields: {} },
    { item: "Automatic / Approval route determined", status: "", remarks: "", dynamicFields: {} },
    { item: "Pricing guidelines compliance verified", status: "", remarks: "", dynamicFields: {} },
    { item: "Valuation obtained where required", status: "", remarks: "", dynamicFields: {} },
    { item: "Funding source verified", status: "", remarks: "", dynamicFields: {} },
    { item: "Reporting requirements identified", status: "", remarks: "", dynamicFields: {} },
    { item: "Timeline compliance ensured", status: "", remarks: "", dynamicFields: {} },
  ],

  /* 4 */
  riskLevel: "",
  keyObservations: "",
  complianceGapsIdentified: "",
  recommendedActions: "",

  mandatoryAttachments: mandatoryDocuments.map(doc => ({
    documentName: doc,
    status: "",
    file: null,
    remarks: ""
  })),

  customAttachments: [],

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  workflowStatus: "",
  comments: "",
  attachments: [],
  customFields: []
};

/* ================= COMPONENT ================= */

const FRM01287_DownstreamInvestmentAssessment = () => {

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
    <ModernFormWrapper formId="FRM-01287" title="Downstream Investment Assessment Checklist">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Downstream Investment Assessment Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01287"
              title="FRM-01287 — Downstream Investment Assessment Checklist"
              department="FEMA & RBI (Foreign Exchange) | FDI / Inbound Investment"
            >

              {/* 1 */}
              <div className="form-section">
                <h3 className="form-section-title">Organization & Investment Information</h3>
                <div className="form-fields">
                  {field(values,"investingEntityName","Investing Entity Name")}
                  {field(values,"cin","CIN / Registration No")}
                  {field(values,"pan","PAN")}
                  {field(values,"sector","Sector / Industry")}
                  {field(values,"assessmentDate","Assessment Date","date")}
                  {field(values,"formReferenceNo","Form Reference No")}
                  {field(values,"preparedBy","Prepared By")}
                </div>
              </div>

              {/* 2 */}
              <div className="form-section">
                <h3 className="form-section-title">Downstream Investment Details</h3>
                <div className="form-fields">
                  {field(values,"investeeEntityName","Investee Entity Name")}
                  {field(values,"country","Country")}
                  {field(values,"businessActivity","Business Activity")}
                  {field(values,"proposedInvestmentAmount","Proposed Investment Amount")}
                  {field(values,"currency","Currency")}
                  {field(values,"percentageHolding","Percentage Holding")}
                  {field(values,"dateOfInvestment","Date of Investment","date")}
                </div>
              </div>

              {/* 3 Checklist */}
              <div className="form-section">
                <h3 className="form-section-title">Regulatory Compliance Checklist</h3>

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
                        setFieldValue("complianceItems", [
                          ...values.complianceItems,
                          { item: "", status: "", remarks: "", dynamicFields: {} }
                        ])
                      }
                    >
                      + Add Item
                    </button>
                  </div>
                )}

                <FieldArray name="complianceItems">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Status (Yes/No/NA)</th>
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
                        {values.complianceItems.map((row,index)=>(
                          <tr key={index}>
                            <td>
                              <Field name={`complianceItems.${index}.item`} className="form-input"/>
                            </td>
                            <td>
                              <Field as="select"
                                name={`complianceItems.${index}.status`}
                                className="form-input">
                                <option value="">Select</option>
                                <option>Yes</option>
                                <option>No</option>
                                <option>NA</option>
                              </Field>
                            </td>
                            <td>
                              <Field name={`complianceItems.${index}.remarks`} className="form-input"/>
                            </td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`complianceItems.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* 4 Risk */}
              <div className="form-section">
                <h3 className="form-section-title">Risk & Observations</h3>
                <div className="form-fields">
                  {field(values,"riskLevel","Risk Level (Low / Medium / High)")}
                  {field(values,"keyObservations","Key Observations")}
                  {field(values,"complianceGapsIdentified","Compliance Gaps Identified")}
                  {field(values,"recommendedActions","Recommended Actions")}
                </div>
              </div>

              {/* Custom Fields */}
              <FormCustomFields values={values} />

              {/* 5 Attachments */}
              <div className="form-section">
                <FormAttachments values={values} />

                <FieldArray name="mandatoryAttachments">
                  {() => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Document</th>
                          <th>Status</th>
                          <th>Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {values.mandatoryAttachments.map((doc,index)=>(
                          <tr key={index}>
                            <td>{doc.documentName}</td>
                            <td>
                              <Field as="select"
                                name={`mandatoryAttachments.${index}.status`}
                                className="form-input">
                                <option value="">Select</option>
                                <option>YES</option>
                                <option>NO</option>
                                <option>NA</option>
                              </Field>
                            </td>
                            <td>
                              <Field name={`mandatoryAttachments.${index}.remarks`} className="form-input"/>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>
              </div>

              {/* 6 Sign-off */}
              <div className="form-section">
                <h3 className="form-section-title">Sign-off</h3>

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
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Downstream Assessment
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

export default FRM01287_DownstreamInvestmentAssessment;