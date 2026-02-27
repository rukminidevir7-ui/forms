// FRM01281_FCGPRFilingDataPack.jsx
// FRM-01281 – FC-GPR Filing Data Pack
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
  totalAmount: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "Valuation Certificate",
  "Board Resolution",
  "FIRC / Bank Advice",
  "KYC Documents",
  "Other Supporting Documents"
];

const initialValues = {
  formId: "FRM-01281",
  date: "",
  department: "FEMA & RBI",
  function: "FDI / Inbound Investment",

  /* 1 */
  companyName: "",
  cin: "",
  pan: "",
  registeredOffice: "",
  sector: "",
  authorizedDealerBank: "",
  formReferenceNo: "",
  filingDate: "",

  /* 2 */
  typeOfSecurity: "",
  numberOfSecurities: "",
  faceValue: "",
  issuePrice: "",
  totalAmount: "",
  dateOfAllotment: "",
  investmentRoute: "",

  /* 3 */
  investorName: "",
  countryOfIncorporation: "",
  address: "",
  investorType: "",
  percentageHoldingPostIssue: "",

  /* 4 */
  sectoralCapCompliance: "",
  pricingGuidelinesCompliance: "",
  boardApprovalDate: "",
  valuationCertificateDate: "",
  kycCompleted: "",
  fircReference: "",

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
    { roleName: "Authorized Signatory", data: {} }
  ],

  workflowStatus: "",
  comments: "",

  attachments: [],
  customFields: []
};

/* ================= COMPONENT ================= */

const FRM01281_FCGPRFilingDataPack = () => {

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
    <ModernFormWrapper formId="FRM-01281" title="FC-GPR Filing Data Pack">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("FC-GPR Filing Data Pack Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01281"
              title="FRM-01281 — FC-GPR Filing Data Pack"
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
                  {field(values,"sector","Sector / Industry")}
                  {field(values,"authorizedDealerBank","Authorized Dealer Bank")}
                  {field(values,"formReferenceNo","Form Reference No")}
                  {field(values,"filingDate","Filing Date","date")}
                </div>
              </div>

              {/* 2 */}
              <div className="form-section">
                <h3 className="form-section-title">Investment Details</h3>
                <div className="form-fields">
                  {field(values,"typeOfSecurity","Type of Security Issued")}
                  {field(values,"numberOfSecurities","Number of Securities")}
                  {field(values,"faceValue","Face Value")}
                  {field(values,"issuePrice","Issue Price")}
                  {field(values,"totalAmount","Total Amount")}
                  {field(values,"dateOfAllotment","Date of Allotment","date")}
                  {field(values,"investmentRoute","Investment Route (Automatic / Approval)")}
                </div>
              </div>

              {/* 3 */}
              <div className="form-section">
                <h3 className="form-section-title">Investor Details</h3>
                <div className="form-fields">
                  {field(values,"investorName","Investor Name")}
                  {field(values,"countryOfIncorporation","Country of Incorporation")}
                  {field(values,"address","Address")}
                  {field(values,"investorType","Investor Type")}
                  {field(values,"percentageHoldingPostIssue","Percentage Holding Post Issue")}
                </div>
              </div>

              {/* 4 */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Details</h3>
                <div className="form-fields">
                  {field(values,"sectoralCapCompliance","Sectoral Cap Compliance")}
                  {field(values,"pricingGuidelinesCompliance","Pricing Guidelines Compliance")}
                  {field(values,"boardApprovalDate","Board Approval Date","date")}
                  {field(values,"valuationCertificateDate","Valuation Certificate Date","date")}
                  {field(values,"kycCompleted","KYC Completed")}
                  {field(values,"fircReference","FIRC / Bank Advice Reference")}
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
                <h3 className="form-section-title">Declaration & Sign-off</h3>

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
                    Submit FC-GPR Filing
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

export default FRM01281_FCGPRFilingDataPack;