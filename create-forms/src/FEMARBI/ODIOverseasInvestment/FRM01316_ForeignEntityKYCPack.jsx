// FRM01316_ForeignEntityKYCPack.jsx
// FRM-01316 – Foreign Entity KYC Pack
// Enterprise Grade – FEMA & RBI – ODI / Overseas Investment

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
  legalNameOfEntity: Yup.string().required("Required"),
  countryOfIncorporation: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "Certificate of Incorporation",
  "Ownership Structure Chart",
  "Identity Documents",
  "Bank Confirmation",
  "Supporting Documents"
];

const initialValues = {
  formId: "FRM-01316",
  date: "",
  department: "FEMA & RBI",
  function: "ODI / Overseas Investment",

  /* 1 Indian Entity */
  companyName: "",
  cin: "",
  pan: "",
  registeredOffice: "",
  authorizedDealerBank: "",
  formReferenceNo: "",
  kycDate: "",

  /* 2 Foreign Entity */
  legalNameOfEntity: "",
  countryOfIncorporation: "",
  registrationNumber: "",
  registeredAddress: "",
  businessActivity: "",
  entityType: "",

  /* 3 Ownership */
  ultimateBeneficialOwners: "",
  ownershipStructureSummary: "",
  directorsKeyManagement: "",

  /* 4 Banking */
  primaryBankName: "",
  bankCountry: "",
  bankAccountNumber: "",
  swiftRoutingCode: "",
  contactPerson: "",
  contactDetails: "",

  /* 5 Compliance */
  sanctionsScreeningCompleted: "",
  pepCheckCompleted: "",
  adverseMediaCheck: "",
  regulatoryRestrictionsIdentified: "",

  /* 6 Risk */
  riskRating: "",
  keyObservations: "",
  mitigationMeasures: "",

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

const FRM01316_ForeignEntityKYCPack = () => {

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
    <ModernFormWrapper formId="FRM-01316" title="Foreign Entity KYC Pack">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Foreign Entity KYC Pack Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01316"
              title="FRM-01316 — Foreign Entity KYC Pack"
              department="FEMA & RBI (Foreign Exchange) | ODI / Overseas Investment"
            >

              {/* 1 Indian Entity */}
              <div className="form-section">
                <h3 className="form-section-title">Indian Entity Details</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"pan","PAN")}
                  {field(values,"registeredOffice","Registered Office Address")}
                  {field(values,"authorizedDealerBank","Authorized Dealer Bank")}
                  {field(values,"formReferenceNo","Form Reference No")}
                  {field(values,"kycDate","KYC Date","date")}
                </div>
              </div>

              {/* 2 Foreign Entity */}
              <div className="form-section">
                <h3 className="form-section-title">Foreign Entity Identification</h3>
                <div className="form-fields">
                  {field(values,"legalNameOfEntity","Legal Name of Entity")}
                  {field(values,"countryOfIncorporation","Country of Incorporation")}
                  {field(values,"registrationNumber","Registration Number")}
                  {field(values,"registeredAddress","Registered Address")}
                  {field(values,"businessActivity","Business Activity")}
                  {field(values,"entityType","Entity Type")}
                </div>
              </div>

              {/* 3 Ownership */}
              <div className="form-section">
                <h3 className="form-section-title">Ownership & Control</h3>
                <div className="form-fields">
                  {field(values,"ultimateBeneficialOwners","Ultimate Beneficial Owner(s)")}
                  {field(values,"ownershipStructureSummary","Ownership Structure Summary")}
                  {field(values,"directorsKeyManagement","Directors / Key Management")}
                </div>
              </div>

              {/* 4 Banking */}
              <div className="form-section">
                <h3 className="form-section-title">Banking & Contact Details</h3>
                <div className="form-fields">
                  {field(values,"primaryBankName","Primary Bank Name")}
                  {field(values,"bankCountry","Bank Country")}
                  {field(values,"bankAccountNumber","Bank Account Number")}
                  {field(values,"swiftRoutingCode","SWIFT / Routing Code")}
                  {field(values,"contactPerson","Contact Person")}
                  {field(values,"contactDetails","Contact Details")}
                </div>
              </div>

              {/* 5 Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Checks</h3>
                <div className="form-fields">
                  {field(values,"sanctionsScreeningCompleted","Sanctions Screening Completed")}
                  {field(values,"pepCheckCompleted","PEP Check Completed")}
                  {field(values,"adverseMediaCheck","Adverse Media Check")}
                  {field(values,"regulatoryRestrictionsIdentified","Regulatory Restrictions Identified")}
                </div>
              </div>

              {/* 6 Risk */}
              <div className="form-section">
                <h3 className="form-section-title">Risk Assessment</h3>
                <div className="form-fields">
                  {field(values,"riskRating","Risk Rating (Low / Medium / High)")}
                  {field(values,"keyObservations","Key Observations")}
                  {field(values,"mitigationMeasures","Mitigation Measures")}
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
                              <Field
                                name={`mandatoryAttachments.${index}.remarks`}
                                className="form-input"
                              />
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
                    Submit Foreign Entity KYC Pack
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

export default FRM01316_ForeignEntityKYCPack;