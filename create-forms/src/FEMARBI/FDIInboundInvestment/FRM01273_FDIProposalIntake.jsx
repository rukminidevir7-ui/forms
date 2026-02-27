// FRM01273_FDIProposalIntake.jsx
// FRM-01273 – FDI Proposal Intake
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
  investorName: Yup.string().required("Required"),
  proposedAmount: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "Investor KYC Documents",
  "Valuation Certificate",
  "Board / Internal Approvals",
  "Agreements",
  "Other Supporting Documents"
];

const initialValues = {
  formId: "FRM-01273",
  date: "",
  department: "FEMA & RBI",
  function: "FDI / Inbound Investment",

  /* 1. Organization & Regulatory Identification */
  companyName: "",
  cin: "",
  pan: "",
  registeredOffice: "",
  sector: "",
  governmentAuthorityReference: "",
  applicableLaw: "",
  formReferenceNo: "",

  /* 2. Project Context */
  projectName: "",
  projectLocation: "",
  clientAuthority: "",
  contractReference: "",
  phaseWorkPackage: "",

  /* 3. Investor Details */
  investorName: "",
  countryOfIncorporation: "",
  investorType: "",
  registrationNumber: "",
  contactDetails: "",

  /* 4. Investment Details */
  natureOfInvestment: "",
  proposedAmount: "",
  currency: "",
  equityPercentage: "",
  investmentRoute: "",
  proposedDate: "",

  /* 5. Business Purpose & Risk */
  purposeObjective: "",
  backgroundJustification: "",
  financialImpact: "",
  riskLevel: "",

  /* 6. Compliance Specific Fields */
  sectoralCapCompliance: "",
  pricingGuidelinesCompliance: "",
  kycCompleted: "",
  regulatoryApprovalsRequired: "",
  filingRequirement: "",
  dueDate: "",

  complianceItems: [
    { item: "", status: "", remarks: "", dynamicFields: {} }
  ],

  mandatoryAttachments: mandatoryDocuments.map(doc => ({
    documentName: doc,
    status: "",
    file: null,
    remarks: ""
  })),

  customAttachments: [],

  approvalRoles: [
    { roleName: "Initiated By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  workflowStatus: "",
  comments: "",

  attachments: [],
  customFields: []
};

/* ================= COMPONENT ================= */

const FRM01273_FDIProposalIntake = () => {

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
    <ModernFormWrapper formId="FRM-01273" title="FDI Proposal Intake">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("FDI Proposal Intake Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01273"
              title="FRM-01273 — FDI Proposal Intake"
              department="FEMA & RBI (Foreign Exchange) | FDI / Inbound Investment"
            >

              {/* 1. Organization & Regulatory Identification */}
              <div className="form-section">
                <h3 className="form-section-title">Organization & Regulatory Identification</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"pan","PAN / Tax ID")}
                  {field(values,"registeredOffice","Registered Office Address")}
                  {field(values,"sector","Sector / Industry")}
                  {field(values,"governmentAuthorityReference","Government Authority Reference")}
                  {field(values,"applicableLaw","Applicable Law / Regulation")}
                  {field(values,"formReferenceNo","Form Reference No")}
                </div>
              </div>

              {/* 2. Project Context */}
              <div className="form-section">
                <h3 className="form-section-title">Project / Infrastructure Context</h3>
                <div className="form-fields">
                  {field(values,"projectName","Project Name")}
                  {field(values,"projectLocation","Project Location (State/District)")}
                  {field(values,"clientAuthority","Client / Authority")}
                  {field(values,"contractReference","Contract / Tender Reference")}
                  {field(values,"phaseWorkPackage","Phase / Work Package")}
                </div>
              </div>

              {/* 3. Investor Details */}
              <div className="form-section">
                <h3 className="form-section-title">Investor Details</h3>
                <div className="form-fields">
                  {field(values,"investorName","Investor Name")}
                  {field(values,"countryOfIncorporation","Country of Incorporation")}
                  {field(values,"investorType","Investor Type")}
                  {field(values,"registrationNumber","Registration Number")}
                  {field(values,"contactDetails","Contact Details")}
                </div>
              </div>

              {/* 4. Investment Details */}
              <div className="form-section">
                <h3 className="form-section-title">Investment Details</h3>
                <div className="form-fields">
                  {field(values,"natureOfInvestment","Nature of Investment")}
                  {field(values,"proposedAmount","Proposed Amount")}
                  {field(values,"currency","Currency")}
                  {field(values,"equityPercentage","Equity Percentage")}
                  {field(values,"investmentRoute","Investment Route")}
                  {field(values,"proposedDate","Proposed Date","date")}
                </div>
              </div>

              {/* 5. Business Purpose & Risk */}
              <div className="form-section">
                <h3 className="form-section-title">Business Purpose & Risk</h3>
                <div className="form-fields">
                  {field(values,"purposeObjective","Purpose / Objective")}
                  {field(values,"backgroundJustification","Background / Justification")}
                  {field(values,"financialImpact","Financial Impact")}
                  {field(values,"riskLevel","Risk Level (Low/Medium/High)")}
                </div>
              </div>

              {/* 6. Compliance Details */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Details</h3>
                <div className="form-fields">
                  {field(values,"sectoralCapCompliance","Sectoral Cap Compliance")}
                  {field(values,"pricingGuidelinesCompliance","Pricing Guidelines Compliance")}
                  {field(values,"kycCompleted","KYC Completed")}
                  {field(values,"regulatoryApprovalsRequired","Regulatory Approvals Required")}
                  {field(values,"filingRequirement","Filing Requirement")}
                  {field(values,"dueDate","Due Date","date")}
                </div>
              </div>

                {/* YOUR EXISTING DYNAMIC TABLE REMAINS UNCHANGED */}
                {/* (Compliance Items Table code unchanged below this line) */}

              {/* 6. COMPLIANCE DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Details</h3>

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
                          <th>Compliance Item</th>
                          <th>Status</th>
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
                                <option>Compliant</option>
                                <option>Non-Compliant</option>
                                <option>Pending</option>
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
               <FormCustomFields values={values} />

              {/* 7. ATTACHMENTS */}
              <div className="form-section">
                {/* <h3 className="form-section-title">Attachments</h3> */}

 <FormAttachments values={values} />
                {/* Mandatory Attachments */}
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

               
               

                {/* Custom Fields Section */}
               
              </div>

              {/* APPROVAL */}
              <div className="form-section">
                <h3 className="form-section-title">Approval Workflow</h3>

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
                    Submit FDI Proposal
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

export default FRM01273_FDIProposalIntake;