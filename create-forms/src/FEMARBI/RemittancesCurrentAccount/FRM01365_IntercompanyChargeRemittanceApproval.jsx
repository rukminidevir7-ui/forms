// FRM01365_IntercompanyChargeRemittanceApproval.jsx
// FRM-01365 – Intercompany Charge Remittance Approval
// Enterprise Grade – FEMA & RBI – Remittances & Current Account

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
  counterpartyName: Yup.string().required("Required"),
  natureOfCharge: Yup.string().required("Required"),
  amount: Yup.string().required("Required"),
  currency: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "Intercompany Agreement",
  "Invoice / Statement",
  "Transfer Pricing Documentation",
  "Regulatory Approvals"
];

const initialValues = {
  formId: "FRM-01365",
  date: "",
  department: "FEMA & RBI",
  function: "Remittances & Current Account",

  /* 1. Company Details */
  companyName: "",
  cin: "",
  pan: "",
  registeredAddress: "",
  authorizedDealerBank: "",
  approvalDate: "",

  /* 2. Counterparty Details */
  counterpartyName: "",
  relationship: "",
  country: "",
  bankName: "",
  bankAccount: "",
  swiftCode: "",

  /* 3. Charge Details */
  natureOfCharge: "",
  agreementReference: "",
  periodCovered: "",
  amount: "",
  currency: "",

  /* 4. Compliance & Transfer Pricing Review */
  applicableFEMARegulation: "",
  transferPricingCompliance: "",
  armsLengthConfirmation: "",
  purposeCode: "",
  documentationVerified: "",

  /* Attachments */
  mandatoryAttachments: mandatoryDocuments.map(doc => ({
    documentName: doc,
    status: "",
    file: null,
    remarks: ""
  })),
  customAttachments: [],

  /* Authorization */
  approvalRoles: [
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  approvalStatus: "",
  comments: "",

  attachments: [],
  customFields: []
};

/* ================= COMPONENT ================= */

const FRM01365_IntercompanyChargeRemittanceApproval = () => {

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
    <ModernFormWrapper formId="FRM-01365" title="Intercompany Charge Remittance Approval">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Intercompany Charge Remittance Approval Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01365"
              title="FRM-01365 — Intercompany Charge Remittance Approval"
              department="FEMA & RBI (Foreign Exchange) | Remittances & Current Account"
            >

              {/* 1. Company Details */}
              <div className="form-section">
                <h3 className="form-section-title">Company Details</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"pan","PAN")}
                  {field(values,"registeredAddress","Registered Address")}
                  {field(values,"authorizedDealerBank","Authorized Dealer Bank")}
                  {field(values,"approvalDate","Approval Date","date")}
                </div>
              </div>

              {/* 2. Counterparty Details */}
              <div className="form-section">
                <h3 className="form-section-title">Counterparty Details</h3>
                <div className="form-fields">
                  {field(values,"counterpartyName","Counterparty Name")}
                  {field(values,"relationship","Relationship (Parent/Subsidiary/Affiliate)")}
                  {field(values,"country","Country")}
                  {field(values,"bankName","Bank Name")}
                  {field(values,"bankAccount","Bank Account / IBAN")}
                  {field(values,"swiftCode","SWIFT Code")}
                </div>
              </div>

              {/* 3. Charge Details */}
              <div className="form-section">
                <h3 className="form-section-title">Charge Details</h3>
                <div className="form-fields">
                  {field(values,"natureOfCharge","Nature of Charge (Management/Service/Other)")}
                  {field(values,"agreementReference","Agreement Reference")}
                  {field(values,"periodCovered","Period Covered")}
                  {field(values,"amount","Amount")}
                  {field(values,"currency","Currency")}
                </div>
              </div>

              {/* 4. Compliance & Transfer Pricing Review */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance & Transfer Pricing Review</h3>
                <div className="form-fields">
                  {field(values,"applicableFEMARegulation","Applicable FEMA Regulation")}
                  {field(values,"transferPricingCompliance","Transfer Pricing Compliance")}
                  {field(values,"armsLengthConfirmation","Arm’s Length Confirmation")}
                  {field(values,"purposeCode","Purpose Code")}
                  {field(values,"documentationVerified","Documentation Verified")}
                </div>
              </div>

              {/* ATTACHMENTS */}
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
                              <Field
                                as="select"
                                name={`mandatoryAttachments.${index}.status`}
                                className="form-input"
                              >
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

              <FormCustomFields values={values} />

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>

                <FieldArray name="approvalRoles">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode &&
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={()=>push({ roleName:"New Role", data:{} })}
                        >
                          + Add Role
                        </button>
                      }

                      <div className="three-column-signatures">
                        {values.approvalRoles.map((role,index)=>(
                          <div key={index}>
                            <ApprovalSignatureBlock
                              roleName={role.roleName}
                              value={role.data}
                              allowRoleEdit={true}
                              onRoleNameChange={(val)=>setFieldValue(`approvalRoles.${index}.roleName`,val)}
                              onChange={(val)=>setFieldValue(`approvalRoles.${index}.data`,val)}
                            />
                            {!isPrintMode &&
                              <button type="button" onClick={()=>remove(index)}>
                                Remove
                              </button>
                            }
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </FieldArray>

                {field(values,"approvalStatus","Approval Status")}
                {field(values,"comments","Comments")}
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Intercompany Charge Approval
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

export default FRM01365_IntercompanyChargeRemittanceApproval;