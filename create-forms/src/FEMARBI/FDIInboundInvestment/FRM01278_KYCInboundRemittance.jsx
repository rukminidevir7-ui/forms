// FRM01278_KYCInboundRemittance.jsx
// FRM-01278 – KYC for Inbound Remittance
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
  remittanceAmount: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "KYC Documents",
  "Bank Confirmation",
  "Transaction Advice",
  "Other Supporting Documents"
];

const initialValues = {
  formId: "FRM-01278",
  date: "",
  department: "FEMA & RBI",
  function: "FDI / Inbound Investment",

  /* 1. Organization & Regulatory Identification */
  companyName: "",
  cin: "",
  pan: "",
  registeredOffice: "",
  sector: "",
  applicableRegulation: "",
  governmentAuthorityReference: "",
  formReferenceNo: "",

  /* 2. Remittance Details */
  remittanceAmount: "",
  currency: "",
  dateOfReceipt: "",
  bankName: "",
  swiftReference: "",
  purposeOfRemittance: "",

  /* 3. Remitter / Investor Details */
  investorName: "",
  country: "",
  entityType: "",
  registrationNumber: "",
  address: "",
  contactDetails: "",

  /* 4. KYC Verification Checklist */
  complianceItems: [
    { item: "Identity documents verified", status: "", remarks: "", dynamicFields: {} },
    { item: "Address proof verified", status: "", remarks: "", dynamicFields: {} },
    { item: "Bank KYC confirmation obtained", status: "", remarks: "", dynamicFields: {} },
    { item: "Sanctions screening completed", status: "", remarks: "", dynamicFields: {} },
    { item: "PEP check completed", status: "", remarks: "", dynamicFields: {} },
    { item: "Source of funds verified", status: "", remarks: "", dynamicFields: {} },
  ],

  /* 5. Compliance & Risk Assessment */
  amlRiskLevel: "",
  complianceStatus: "",
  observations: "",
  recommendedActions: "",

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

const FRM01278_KYCInboundRemittance = () => {

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
    <ModernFormWrapper formId="FRM-01278" title="KYC for Inbound Remittance">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("KYC for Inbound Remittance Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01278"
              title="FRM-01278 — KYC for Inbound Remittance"
              department="FEMA & RBI (Foreign Exchange) | FDI / Inbound Investment"
            >

              {/* 1 */}
              <div className="form-section">
                <h3 className="form-section-title">Organization & Regulatory Identification</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"pan","PAN / Tax ID")}
                  {field(values,"registeredOffice","Registered Office Address")}
                  {field(values,"sector","Sector / Industry")}
                  {field(values,"applicableRegulation","Applicable Regulation")}
                  {field(values,"governmentAuthorityReference","Government Authority Reference")}
                  {field(values,"formReferenceNo","Form Reference No")}
                </div>
              </div>

              {/* 2 */}
              <div className="form-section">
                <h3 className="form-section-title">Remittance Details</h3>
                <div className="form-fields">
                  {field(values,"remittanceAmount","Remittance Amount")}
                  {field(values,"currency","Currency")}
                  {field(values,"dateOfReceipt","Date of Receipt","date")}
                  {field(values,"bankName","Bank Name")}
                  {field(values,"swiftReference","SWIFT / Transaction Reference")}
                  {field(values,"purposeOfRemittance","Purpose of Remittance")}
                </div>
              </div>

              {/* 3 */}
              <div className="form-section">
                <h3 className="form-section-title">Remitter / Investor Details</h3>
                <div className="form-fields">
                  {field(values,"investorName","Investor / Remitter Name")}
                  {field(values,"country","Country")}
                  {field(values,"entityType","Entity Type")}
                  {field(values,"registrationNumber","Registration Number")}
                  {field(values,"address","Address")}
                  {field(values,"contactDetails","Contact Details")}
                </div>
              </div>

              {/* 4 Checklist */}
              <div className="form-section">
                <h3 className="form-section-title">KYC Verification Checklist</h3>

                {!isPrintMode && (
                  <button
                    type="button"
                    className="btn-submit"
                    onClick={() =>
                      setFieldValue("complianceItems", [
                        ...values.complianceItems,
                        { item: "", status: "", remarks: "", dynamicFields: {} }
                      ])
                    }
                  >
                    + Add Item
                  </button>
                )}

                <FieldArray name="complianceItems">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Status (Yes/No/NA)</th>
                          <th>Remarks</th>
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

              {/* 5 */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance & Risk Assessment</h3>
                <div className="form-fields">
                  {field(values,"amlRiskLevel","AML Risk Level (Low / Medium / High)")}
                  {field(values,"complianceStatus","Compliance Status")}
                  {field(values,"observations","Observations")}
                  {field(values,"recommendedActions","Recommended Actions")}
                </div>
              </div>

              {/* Custom Fields */}
              <FormCustomFields values={values} />

              {/* Attachments */}
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
                <h3 className="form-section-title">Workflow & Approval</h3>

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
                    Submit KYC Assessment
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

export default FRM01278_KYCInboundRemittance;