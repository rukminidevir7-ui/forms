// FRM01376_FLAReturnDataCapture.jsx
// FRM-01376 – FLA Return Data Capture
// Enterprise Grade – FEMA & RBI – Reporting & Compliance

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
  financialYear: Yup.string().required("Required"),
  typeOfInvestment: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "Financial Statements",
  "Investment Schedules",
  "Reconciliation Statements",
  "Supporting Evidence"
];

const initialValues = {
  formId: "FRM-01376",
  department: "FEMA & RBI Regulatory",
  function: "Reporting & Compliance",

  /* 1. Entity Details */
  companyName: "",
  cin: "",
  pan: "",
  registeredAddress: "",
  contactPerson: "",
  contactEmail: "",
  financialYear: "",
  formReferenceNo: "",

  /* 2. Investment Summary */
  typeOfInvestment: "",
  openingBalance: "",
  additionsDuringYear: "",
  reductionsDuringYear: "",
  closingBalance: "",
  currency: "",

  /* 3. Equity & Debt Details */
  equityCapital: "",
  preferenceCapital: "",
  loans: "",
  tradeCredit: "",
  otherCapital: "",

  /* 4. Counterparty Details */
  counterpartyName: "",
  country: "",
  relationship: "",
  percentageHolding: "",

  /* 5. Compliance Confirmation */
  dataVerified: "",
  reconciliationCompleted: "",
  supportingDocumentsAvailable: "",
  remarks: "",

  /* Attachments */
  mandatoryAttachments: mandatoryDocuments.map(doc => ({
    documentName: doc,
    status: "",
    remarks: ""
  })),

  customAttachments: [],

  /* Approval */
  approvalRoles: [
    { roleName: "Initiated By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  approvalDate: "",

  attachments: [],
  customFields: []
};

/* ================= COMPONENT ================= */

const FRM01376_FLAReturnDataCapture = () => {

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
    <ModernFormWrapper formId="FRM-01376" title="FLA Return Data Capture">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("FLA Return Data Capture Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01376"
              title="FRM-01376 — FLA Return Data Capture"
              department="FEMA & RBI Regulatory | Reporting & Compliance"
            >

              {/* 1. Entity Details */}
              <div className="form-section">
                <h3 className="form-section-title">Entity Details</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"pan","PAN")}
                  {field(values,"registeredAddress","Registered Address")}
                  {field(values,"contactPerson","Contact Person")}
                  {field(values,"contactEmail","Contact Email","email")}
                  {field(values,"financialYear","Financial Year")}
                  {field(values,"formReferenceNo","Form Reference No")}
                </div>
              </div>

              {/* 2. Investment Summary */}
              <div className="form-section">
                <h3 className="form-section-title">Investment Summary</h3>
                <div className="form-fields">
                  {field(values,"typeOfInvestment","Type of Investment (FDI/ODI/Other)")}
                  {field(values,"openingBalance","Opening Balance")}
                  {field(values,"additionsDuringYear","Additions During Year")}
                  {field(values,"reductionsDuringYear","Reductions During Year")}
                  {field(values,"closingBalance","Closing Balance")}
                  {field(values,"currency","Currency")}
                </div>
              </div>

              {/* 3. Equity & Debt Details */}
              <div className="form-section">
                <h3 className="form-section-title">Equity & Debt Details</h3>
                <div className="form-fields">
                  {field(values,"equityCapital","Equity Capital")}
                  {field(values,"preferenceCapital","Preference Capital")}
                  {field(values,"loans","Loans")}
                  {field(values,"tradeCredit","Trade Credit")}
                  {field(values,"otherCapital","Other Capital")}
                </div>
              </div>

              {/* 4. Counterparty Details */}
              <div className="form-section">
                <h3 className="form-section-title">Counterparty Details</h3>
                <div className="form-fields">
                  {field(values,"counterpartyName","Investor / Subsidiary Name")}
                  {field(values,"country","Country")}
                  {field(values,"relationship","Relationship")}
                  {field(values,"percentageHolding","Percentage Holding (%)")}
                </div>
              </div>

              {/* 5. Compliance Confirmation */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Confirmation</h3>
                <div className="form-fields">
                  {field(values,"dataVerified","Data Verified (Yes/No)")}
                  {field(values,"reconciliationCompleted","Reconciliation Completed (Yes/No)")}
                  {field(values,"supportingDocumentsAvailable","Supporting Documents Available (Yes/No)")}
                  {field(values,"remarks","Remarks")}
                </div>
              </div>

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

              {/* Approval */}
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

                {field(values,"approvalDate","Approval Date","date")}
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit FLA Return Data
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

export default FRM01376_FLAReturnDataCapture;