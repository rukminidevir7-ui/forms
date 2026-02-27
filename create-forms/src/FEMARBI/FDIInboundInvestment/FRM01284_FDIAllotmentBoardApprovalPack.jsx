// FRM01284_FDIAllotmentBoardApprovalPack.jsx
// FRM-01284 – FDI Allotment Board Approval Pack
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
  "Board Resolution Copy",
  "Valuation Certificate",
  "FIRC / Bank Advice",
  "KYC Documents",
  "Other Supporting Documents"
];

const initialValues = {
  formId: "FRM-01284",
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
  approvalDate: "",

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
  country: "",
  investorType: "",
  postIssueHolding: "",
  fircReference: "",

  /* 4 */
  sectoralCapVerified: "",
  pricingGuidelinesComplied: "",
  valuationCertificateDate: "",
  kycCompleted: "",
  regulatoryConditionsMet: "",

  /* 5 */
  meetingDate: "",
  resolutionReference: "",
  keyDecisions: "",

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

const FRM01284_FDIAllotmentBoardApprovalPack = () => {

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
    <ModernFormWrapper formId="FRM-01284" title="FDI Allotment Board Approval Pack">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("FDI Allotment Board Approval Pack Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01284"
              title="FRM-01284 — FDI Allotment Board Approval Pack"
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
                  {field(values,"approvalDate","Approval Date","date")}
                </div>
              </div>

              {/* 2 */}
              <div className="form-section">
                <h3 className="form-section-title">Allotment Details</h3>
                <div className="form-fields">
                  {field(values,"typeOfSecurity","Type of Security")}
                  {field(values,"numberOfSecurities","Number of Securities")}
                  {field(values,"faceValue","Face Value")}
                  {field(values,"issuePrice","Issue Price")}
                  {field(values,"totalAmount","Total Amount")}
                  {field(values,"dateOfAllotment","Date of Allotment","date")}
                  {field(values,"investmentRoute","Investment Route")}
                </div>
              </div>

              {/* 3 */}
              <div className="form-section">
                <h3 className="form-section-title">Investor Summary</h3>
                <div className="form-fields">
                  {field(values,"investorName","Investor Name")}
                  {field(values,"country","Country")}
                  {field(values,"investorType","Investor Type")}
                  {field(values,"postIssueHolding","Post-Issue Holding (%)")}
                  {field(values,"fircReference","FIRC / Bank Reference")}
                </div>
              </div>

              {/* 4 */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Confirmation</h3>
                <div className="form-fields">
                  {field(values,"sectoralCapVerified","Sectoral Cap Verified")}
                  {field(values,"pricingGuidelinesComplied","Pricing Guidelines Complied")}
                  {field(values,"valuationCertificateDate","Valuation Certificate Date","date")}
                  {field(values,"kycCompleted","KYC Completed")}
                  {field(values,"regulatoryConditionsMet","Regulatory Conditions Met")}
                </div>
              </div>

              {/* 5 */}
              <div className="form-section">
                <h3 className="form-section-title">Board Resolution Summary</h3>
                <div className="form-fields">
                  {field(values,"meetingDate","Meeting Date","date")}
                  {field(values,"resolutionReference","Resolution Reference")}
                  {field(values,"keyDecisions","Key Decisions")}
                </div>
              </div>

              {/* Custom Fields */}
              <FormCustomFields values={values} />

              {/* 6 Attachments */}
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

              {/* 7 Approval */}
              <div className="form-section">
                <h3 className="form-section-title">Approval & Sign-off</h3>

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
                    Submit Board Approval Pack
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

export default FRM01284_FDIAllotmentBoardApprovalPack;