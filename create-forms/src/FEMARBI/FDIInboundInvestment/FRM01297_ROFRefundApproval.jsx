// FRM01297_ROFRefundApproval.jsx
// FRM-01297 – ROF / Refund Approval
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
  refundAmount: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "Bank Advice / FIRC",
  "Transaction Documents",
  "Approval Notes",
  "Other Supporting Documents"
];

const initialValues = {
  formId: "FRM-01297",
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
  formReferenceNo: "",
  approvalDate: "",

  /* 2 */
  natureOfRefund: "",
  originalTransactionReference: "",
  refundAmount: "",
  currency: "",
  dateOfOriginalReceipt: "",
  proposedRefundDate: "",

  /* 3 */
  investorName: "",
  investorCountry: "",
  investorAddress: "",
  investorEntityType: "",
  investorContactDetails: "",

  /* 4 */
  regulatoryConditionsVerified: "",
  bankConfirmationObtained: "",
  fircReference: "",
  approvalsRequiredIdentified: "",
  supportingDocumentsVerified: "",

  /* 5 */
  reasonForRefund: "",
  impactAssessment: "",
  additionalRemarks: "",

  mandatoryAttachments: mandatoryDocuments.map(doc => ({
    documentName: doc,
    status: "",
    file: null,
    remarks: ""
  })),

  customAttachments: [],

  approvalRoles: [
    { roleName: "Requested By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  workflowStatus: "",
  comments: "",

  attachments: [],
  customFields: []
};

/* ================= COMPONENT ================= */

const FRM01297_ROFRefundApproval = () => {

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
    <ModernFormWrapper formId="FRM-01297" title="ROF / Refund Approval">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Refund / ROF Approval Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01297"
              title="FRM-01297 — ROF / Refund Approval"
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
                  {field(values,"formReferenceNo","Form Reference No")}
                  {field(values,"approvalDate","Approval Date","date")}
                </div>
              </div>

              {/* 2 */}
              <div className="form-section">
                <h3 className="form-section-title">Refund / ROF Details</h3>
                <div className="form-fields">
                  {field(values,"natureOfRefund","Nature of Refund (Excess Subscription / Cancellation / Others)")}
                  {field(values,"originalTransactionReference","Original Transaction Reference")}
                  {field(values,"refundAmount","Refund Amount")}
                  {field(values,"currency","Currency")}
                  {field(values,"dateOfOriginalReceipt","Date of Original Receipt","date")}
                  {field(values,"proposedRefundDate","Proposed Refund Date","date")}
                </div>
              </div>

              {/* 3 */}
              <div className="form-section">
                <h3 className="form-section-title">Investor / Remitter Details</h3>
                <div className="form-fields">
                  {field(values,"investorName","Name")}
                  {field(values,"investorCountry","Country")}
                  {field(values,"investorAddress","Address")}
                  {field(values,"investorEntityType","Entity Type")}
                  {field(values,"investorContactDetails","Contact Details")}
                </div>
              </div>

              {/* 4 */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Confirmation</h3>
                <div className="form-fields">
                  {field(values,"regulatoryConditionsVerified","Regulatory Conditions Verified")}
                  {field(values,"bankConfirmationObtained","Bank Confirmation Obtained")}
                  {field(values,"fircReference","FIRC Reference")}
                  {field(values,"approvalsRequiredIdentified","Approvals Required Identified")}
                  {field(values,"supportingDocumentsVerified","Supporting Documents Verified")}
                </div>
              </div>

              {/* 5 */}
              <div className="form-section">
                <h3 className="form-section-title">Justification & Remarks</h3>
                <div className="form-fields">
                  {field(values,"reasonForRefund","Reason for Refund")}
                  {field(values,"impactAssessment","Impact Assessment")}
                  {field(values,"additionalRemarks","Additional Remarks")}
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
                    Submit Refund Approval
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

export default FRM01297_ROFRefundApproval;