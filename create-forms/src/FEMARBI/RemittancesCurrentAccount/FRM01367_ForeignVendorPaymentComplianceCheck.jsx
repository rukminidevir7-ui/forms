// FRM01367_ForeignVendorPaymentComplianceCheck.jsx
// FRM-01367 – Foreign Vendor Payment Compliance Check
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
  vendorName: Yup.string().required("Required"),
  amount: Yup.string().required("Required"),
  currency: Yup.string().required("Required"),
  purposeCode: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "Invoice / Agreement",
  "KYC Documents",
  "Tax Documents",
  "Regulatory Approvals"
];

const initialValues = {
  formId: "FRM-01367",
  date: "",
  department: "FEMA & RBI",
  function: "Remittances & Current Account",

  /* 1. Company Details */
  companyName: "",
  cin: "",
  pan: "",
  registeredAddress: "",
  authorizedDealerBank: "",
  formReferenceNo: "",
  assessmentDate: "",

  /* 2. Vendor Details */
  vendorName: "",
  country: "",
  bankName: "",
  bankAccount: "",
  swiftCode: "",
  vendorAddress: "",

  /* 3. Payment Details */
  natureOfPayment: "",
  agreementInvoiceReference: "",
  amount: "",
  currency: "",
  purposeCode: "",
  proposedPaymentDate: "",

  /* 4. Compliance Assessment */
  applicableFEMARegulation: "",
  permissibilityConfirmed: "",
  documentationComplete: "",
  taxComplianceConfirmed: "",
  sanctionsScreeningCompleted: "",
  remarks: "",

  /* Attachments */
  mandatoryAttachments: mandatoryDocuments.map(doc => ({
    documentName: doc,
    status: "",
    file: null,
    remarks: ""
  })),
  customAttachments: [],

  /* Workflow */
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

const FRM01367_ForeignVendorPaymentComplianceCheck = () => {

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
    <ModernFormWrapper formId="FRM-01367" title="Foreign Vendor Payment Compliance Check">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Foreign Vendor Payment Compliance Check Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01367"
              title="FRM-01367 — Foreign Vendor Payment Compliance Check — Universal Form"
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
                  {field(values,"formReferenceNo","Form Reference No")}
                  {field(values,"assessmentDate","Assessment Date","date")}
                </div>
              </div>

              {/* 2. Vendor Details */}
              <div className="form-section">
                <h3 className="form-section-title">Vendor Details</h3>
                <div className="form-fields">
                  {field(values,"vendorName","Vendor Name")}
                  {field(values,"country","Country")}
                  {field(values,"bankName","Bank Name")}
                  {field(values,"bankAccount","Bank Account / IBAN")}
                  {field(values,"swiftCode","SWIFT Code")}
                  {field(values,"vendorAddress","Vendor Address")}
                </div>
              </div>

              {/* 3. Payment Details */}
              <div className="form-section">
                <h3 className="form-section-title">Payment Details</h3>
                <div className="form-fields">
                  {field(values,"natureOfPayment","Nature of Payment")}
                  {field(values,"agreementInvoiceReference","Agreement / Invoice Reference")}
                  {field(values,"amount","Amount")}
                  {field(values,"currency","Currency")}
                  {field(values,"purposeCode","Purpose Code")}
                  {field(values,"proposedPaymentDate","Proposed Payment Date","date")}
                </div>
              </div>

              {/* 4. Compliance Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Assessment</h3>
                <div className="form-fields">
                  {field(values,"applicableFEMARegulation","Applicable FEMA Regulation")}
                  {field(values,"permissibilityConfirmed","Permissibility Confirmed")}
                  {field(values,"documentationComplete","Documentation Complete")}
                  {field(values,"taxComplianceConfirmed","Tax Compliance Confirmed")}
                  {field(values,"sanctionsScreeningCompleted","Sanctions Screening Completed")}
                  {field(values,"remarks","Remarks")}
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

              {/* 6. Workflow & Approval */}
              <div className="form-section">
                <h3 className="form-section-title">Workflow & Approval</h3>

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

                {field(values,"workflowStatus","Workflow Status")}
                {field(values,"comments","Comments")}
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Compliance Check
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

export default FRM01367_ForeignVendorPaymentComplianceCheck;