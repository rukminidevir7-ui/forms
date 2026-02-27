// FRM01355_PurposeCodeSelection.jsx
// FRM-01355 – Purpose Code Selection (Universal Form)
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
  applicantName: Yup.string().required("Required"),
  cinPan: Yup.string().required("Required"),
  natureOfTransaction: Yup.string().required("Required"),
  amount: Yup.string().required("Required"),
  currency: Yup.string().required("Required"),
  selectedPurposeCode: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "Invoice / Agreement",
  "Transaction Details",
  "Regulatory References",
  "Supporting Documents"
];

const initialValues = {
  formId: "FRM-01355",
  date: "",
  department: "FEMA & RBI",
  function: "Remittances & Current Account",

  /* 1. Applicant Details */
  applicantName: "",
  cinPan: "",
  registeredAddress: "",
  authorizedDealerBank: "",
  formReferenceNo: "",
  selectionDate: "",

  /* 2. Transaction Details */
  natureOfTransaction: "",
  amount: "",
  currency: "",
  beneficiaryCountry: "",
  briefDescription: "",

  /* 3. Purpose Code Assessment */
  selectedPurposeCode: "",
  purposeCodeDescription: "",
  justificationForSelection: "",
  alternativeCodesConsidered: "",

  /* 4. Regulatory Review */
  applicableFEMARegulation: "",
  complianceConfirmed: "",
  approvalsRequired: "",
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

const FRM01355_PurposeCodeSelection = () => {

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
    <ModernFormWrapper formId="FRM-01355" title="Purpose Code Selection">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Purpose Code Selection Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01355"
              title="FRM-01355 — Purpose Code Selection — Universal Form"
              department="FEMA & RBI (Foreign Exchange) | Remittances & Current Account"
            >

              {/* 1. Applicant Details */}
              <div className="form-section">
                <h3 className="form-section-title">Applicant Details</h3>
                <div className="form-fields">
                  {field(values,"applicantName","Applicant Name / Company")}
                  {field(values,"cinPan","CIN / PAN")}
                  {field(values,"registeredAddress","Registered Address")}
                  {field(values,"authorizedDealerBank","Authorized Dealer Bank")}
                  {field(values,"formReferenceNo","Form Reference No")}
                  {field(values,"selectionDate","Selection Date","date")}
                </div>
              </div>

              {/* 2. Transaction Details */}
              <div className="form-section">
                <h3 className="form-section-title">Transaction Details</h3>
                <div className="form-fields">
                  {field(values,"natureOfTransaction","Nature of Transaction")}
                  {field(values,"amount","Amount")}
                  {field(values,"currency","Currency")}
                  {field(values,"beneficiaryCountry","Beneficiary Country")}
                  {field(values,"briefDescription","Brief Description")}
                </div>
              </div>

              {/* 3. Purpose Code Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">Purpose Code Assessment</h3>
                <div className="form-fields">
                  {field(values,"selectedPurposeCode","Selected Purpose Code")}
                  {field(values,"purposeCodeDescription","Purpose Code Description")}
                  {field(values,"justificationForSelection","Justification for Selection")}
                  {field(values,"alternativeCodesConsidered","Alternative Codes Considered")}
                </div>
              </div>

              {/* 4. Regulatory Review */}
              <div className="form-section">
                <h3 className="form-section-title">Regulatory Review</h3>
                <div className="form-fields">
                  {field(values,"applicableFEMARegulation","Applicable FEMA Regulation")}
                  {field(values,"complianceConfirmed","Compliance Confirmed")}
                  {field(values,"approvalsRequired","Approvals Required")}
                  {field(values,"remarks","Remarks")}
                </div>
              </div>

              {/* ATTACHMENTS – SAME ENTERPRISE STRUCTURE */}
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

              {/* WORKFLOW & APPROVAL */}
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
                              allowRoleEdit={!isPrintMode}
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
                    Submit Purpose Code Selection
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

export default FRM01355_PurposeCodeSelection;