// FRM01291_ResidentToNonResidentTransferReview.jsx
// FRM-01291 – Resident to Non-Resident Transfer Review
// Enterprise Grade – FEMA & RBI – FDI / Inbound Investment

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
  companyName: Yup.string().required("Required"),
  cin: Yup.string().required("Required"),
  pan: Yup.string().required("Required"),
  totalConsideration: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "Transfer Agreement",
  "Valuation Certificate",
  "KYC Documents",
  "Regulatory References",
  "Other Supporting Documents"
];

const initialValues = {
  formId: "FRM-01291",
  date: "",
  department: "FEMA & RBI",
  function: "FDI / Inbound Investment",

  /* 1 */
  companyName: "",
  cin: "",
  pan: "",
  registeredOffice: "",
  authorizedDealerBank: "",
  sector: "",
  applicableRegulation: "",
  formReferenceNo: "",

  /* 2 */
  natureOfTransfer: "",
  typeOfSecurity: "",
  numberOfSecurities: "",
  transferPricePerSecurity: "",
  totalConsideration: "",
  proposedTransferDate: "",

  /* 3 Resident Transferor */
  residentName: "",
  residentPAN: "",
  residentAddress: "",
  residentCategory: "",
  residentContactDetails: "",

  /* 4 Non-Resident Transferee */
  nonResidentName: "",
  nonResidentCountry: "",
  nonResidentAddress: "",
  nonResidentEntityType: "",
  nonResidentContactDetails: "",

  /* 5 Compliance */
  pricingGuidelinesCompliance: "",
  sectoralCapCompliance: "",
  valuationCertificateDate: "",
  kycCompleted: "",
  approvalRouteDetermined: "",
  regulatoryConditionsMet: "",

  /* 6 Risk */
  riskLevel: "",
  keyObservations: "",
  complianceGaps: "",
  recommendations: "",

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

const FRM01291_ResidentToNonResidentTransferReview = () => {

  const { isPrintMode } = usePrintMode();

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
    <ModernFormWrapper formId="FRM-01291" title="Resident to Non-Resident Transfer Review">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Resident to Non-Resident Transfer Review Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01291"
              title="FRM-01291 — Resident to Non-Resident Transfer Review"
              department="FEMA & RBI (Foreign Exchange) | FDI / Inbound Investment"
            >

              {/* 1 */}
              <div className="form-section">
                <h3 className="form-section-title">Organization & Regulatory Identification</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"pan","PAN")}
                  {field(values,"registeredOffice","Registered Office Address")}
                  {field(values,"authorizedDealerBank","Authorized Dealer Bank")}
                  {field(values,"sector","Sector / Industry")}
                  {field(values,"applicableRegulation","Applicable Regulation")}
                  {field(values,"formReferenceNo","Form Reference No")}
                </div>
              </div>

              {/* 2 */}
              <div className="form-section">
                <h3 className="form-section-title">Transfer Overview</h3>
                <div className="form-fields">
                  {field(values,"natureOfTransfer","Nature of Transfer")}
                  {field(values,"typeOfSecurity","Type of Security")}
                  {field(values,"numberOfSecurities","Number of Securities")}
                  {field(values,"transferPricePerSecurity","Transfer Price per Security")}
                  {field(values,"totalConsideration","Total Consideration")}
                  {field(values,"proposedTransferDate","Proposed Transfer Date","date")}
                </div>
              </div>

              {/* 3 */}
              <div className="form-section">
                <h3 className="form-section-title">Transferor (Resident) Details</h3>
                <div className="form-fields">
                  {field(values,"residentName","Name")}
                  {field(values,"residentPAN","PAN")}
                  {field(values,"residentAddress","Address")}
                  {field(values,"residentCategory","Category (Individual/Company)")}
                  {field(values,"residentContactDetails","Contact Details")}
                </div>
              </div>

              {/* 4 */}
              <div className="form-section">
                <h3 className="form-section-title">Transferee (Non-Resident) Details</h3>
                <div className="form-fields">
                  {field(values,"nonResidentName","Name")}
                  {field(values,"nonResidentCountry","Country")}
                  {field(values,"nonResidentAddress","Address")}
                  {field(values,"nonResidentEntityType","Entity Type")}
                  {field(values,"nonResidentContactDetails","Contact Details")}
                </div>
              </div>

              {/* 5 */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Evaluation</h3>
                <div className="form-fields">
                  {field(values,"pricingGuidelinesCompliance","Pricing Guidelines Compliance")}
                  {field(values,"sectoralCapCompliance","Sectoral Cap Compliance")}
                  {field(values,"valuationCertificateDate","Valuation Certificate Date","date")}
                  {field(values,"kycCompleted","KYC Completed")}
                  {field(values,"approvalRouteDetermined","Approval Route Determined")}
                  {field(values,"regulatoryConditionsMet","Regulatory Conditions Met")}
                </div>
              </div>

              {/* 6 */}
              <div className="form-section">
                <h3 className="form-section-title">Risk & Observations</h3>
                <div className="form-fields">
                  {field(values,"riskLevel","Risk Level (Low / Medium / High)")}
                  {field(values,"keyObservations","Key Observations")}
                  {field(values,"complianceGaps","Compliance Gaps")}
                  {field(values,"recommendations","Recommendations")}
                </div>
              </div>

              {/* Custom Fields */}
              <FormCustomFields values={values} />

              {/* 7 Attachments */}
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

              {/* 8 Workflow */}
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
                    Submit Transfer Review
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

export default FRM01291_ResidentToNonResidentTransferReview;