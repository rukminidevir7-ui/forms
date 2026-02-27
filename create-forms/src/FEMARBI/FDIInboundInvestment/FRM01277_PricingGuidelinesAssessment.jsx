// FRM01277_PricingGuidelinesAssessment.jsx
// FRM-01277 – Pricing Guidelines Assessment Checklist
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
  companyName: Yup.string().required("Required"),
  cin: Yup.string().required("Required"),
  pan: Yup.string().required("Required"),
  proposedAmount: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "Valuation Certificate",
  "Financial Statements",
  "Pricing Working Papers",
  "Other Supporting Documents"
];

const initialValues = {
  formId: "FRM-01277",
  date: "",
  department: "FEMA & RBI",
  function: "FDI / Inbound Investment",

  /* 1. Organization & Regulatory Identification */
  companyName: "",
  cin: "",
  pan: "",
  sector: "",
  applicableRegulation: "",
  formReferenceNo: "",
  assessmentDate: "",

  /* 2. Investment Context */
  natureOfInstrument: "",
  transactionType: "",
  proposedAmount: "",
  currency: "",
  investorName: "",

  /* 3. Pricing Compliance Checklist */
 /* 3. Pricing Compliance Checklist */
complianceItems: [
  { 
    item: "Valuation method identified as per regulation", 
    status: "", 
    remarks: "", 
    dynamicFields: {} 
  },
  { 
    item: "Valuation certificate obtained from authorized valuer", 
    status: "", 
    remarks: "", 
    dynamicFields: {} 
  },
  { 
    item: "Fair value determined as per applicable rules", 
    status: "", 
    remarks: "", 
    dynamicFields: {} 
  },
  { 
    item: "Issue price not lower than fair value", 
    status: "", 
    remarks: "", 
    dynamicFields: {} 
  },
  { 
    item: "Transfer price compliant with pricing norms", 
    status: "", 
    remarks: "", 
    dynamicFields: {} 
  },
  { 
    item: "Supporting financials reviewed", 
    status: "", 
    remarks: "", 
    dynamicFields: {} 
  },
  { 
    item: "Exchange rate applied correctly", 
    status: "", 
    remarks: "", 
    dynamicFields: {} 
  },
  { 
    item: "Documentation retained for audit", 
    status: "", 
    remarks: "", 
    dynamicFields: {} 
  }
],

  /* 4. Risk & Observations */
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

const FRM01277_PricingGuidelinesAssessment = () => {

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
    <ModernFormWrapper formId="FRM-01277" title="Pricing Guidelines Assessment Checklist">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Pricing Guidelines Assessment Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01277"
              title="FRM-01277 — Pricing Guidelines Assessment Checklist"
              department="FEMA & RBI (Foreign Exchange) | FDI / Inbound Investment"
            >

              {/* 1 */}
              <div className="form-section">
                <h3 className="form-section-title">Organization & Regulatory Identification</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"pan","PAN / Tax ID")}
                  {field(values,"sector","Sector / Industry")}
                  {field(values,"applicableRegulation","Applicable Regulation")}
                  {field(values,"formReferenceNo","Form Reference No")}
                  {field(values,"assessmentDate","Assessment Date","date")}
                </div>
              </div>

              {/* 2 */}
              <div className="form-section">
                <h3 className="form-section-title">Investment Context</h3>
                <div className="form-fields">
                  {field(values,"natureOfInstrument","Nature of Instrument (Equity/CCPS/CCD)")}
                  {field(values,"transactionType","Type of Transaction (Issue/Transfer)")}
                  {field(values,"proposedAmount","Proposed Amount")}
                  {field(values,"currency","Currency")}
                  {field(values,"investorName","Investor Name")}
                </div>
              </div>

              {/* 3 Compliance Table */}
              <div className="form-section">
                <h3 className="form-section-title">Pricing Compliance Checklist</h3>

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

              {/* 4 */}
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

              {/* Attachments — SAME STRUCTURE */}
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

              {/* Approval */}
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
                    Submit Pricing Assessment
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

export default FRM01277_PricingGuidelinesAssessment;