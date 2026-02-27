// FRM01310_ODIAPRDataPack.jsx
// FRM-01310 – ODI Annual Performance (APR) Data Pack
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
  nameOfOverseasEntity: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "Audited Financial Statements",
  "Board Confirmation",
  "Supporting Documents"
];

const initialValues = {
  formId: "FRM-01310",
  date: "",
  department: "FEMA & RBI",
  function: "ODI / Overseas Investment",

  /* 1 Indian Entity */
  companyName: "",
  cin: "",
  pan: "",
  registeredOffice: "",
  authorizedDealerBank: "",
  financialYear: "",

  /* 2 Overseas Entity */
  nameOfOverseasEntity: "",
  country: "",
  businessActivity: "",
  dateOfInvestment: "",
  ownershipPercentage: "",

  /* 3 Financial Performance */
  totalAssets: "",
  totalLiabilities: "",
  netWorth: "",
  revenue: "",
  profitLoss: "",

  /* 4 Investment Position */
  equityContribution: "",
  loansExtended: "",
  guaranteesIssued: "",
  otherFinancialCommitment: "",

  /* 5 Compliance */
  aprFilingDueDate: "",
  filingStatus: "",
  regulatoryComplianceConfirmed: "",
  remarks: "",

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

const FRM01310_ODIAPRDataPack = () => {

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
    <ModernFormWrapper formId="FRM-01310" title="ODI Annual Performance (APR) Data Pack">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("ODI APR Data Pack Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01310"
              title="FRM-01310 — ODI Annual Performance (APR) Data Pack"
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
                  {field(values,"financialYear","Financial Year")}
                </div>
              </div>

              {/* 2 Overseas Entity */}
              <div className="form-section">
                <h3 className="form-section-title">Overseas Entity Details</h3>
                <div className="form-fields">
                  {field(values,"nameOfOverseasEntity","Name of Overseas Entity")}
                  {field(values,"country","Country")}
                  {field(values,"businessActivity","Business Activity")}
                  {field(values,"dateOfInvestment","Date of Investment","date")}
                  {field(values,"ownershipPercentage","Ownership Percentage")}
                </div>
              </div>

              {/* 3 Financial Performance */}
              <div className="form-section">
                <h3 className="form-section-title">Financial Performance</h3>
                <div className="form-fields">
                  {field(values,"totalAssets","Total Assets")}
                  {field(values,"totalLiabilities","Total Liabilities")}
                  {field(values,"netWorth","Net Worth")}
                  {field(values,"revenue","Revenue")}
                  {field(values,"profitLoss","Profit / (Loss)")}
                </div>
              </div>

              {/* 4 Investment Position */}
              <div className="form-section">
                <h3 className="form-section-title">Investment Position</h3>
                <div className="form-fields">
                  {field(values,"equityContribution","Equity Contribution")}
                  {field(values,"loansExtended","Loans Extended")}
                  {field(values,"guaranteesIssued","Guarantees Issued")}
                  {field(values,"otherFinancialCommitment","Other Financial Commitment")}
                </div>
              </div>

              {/* 5 Compliance Confirmation */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Confirmation</h3>
                <div className="form-fields">
                  {field(values,"aprFilingDueDate","APR Filing Due Date","date")}
                  {field(values,"filingStatus","Filing Status")}
                  {field(values,"regulatoryComplianceConfirmed","Regulatory Compliance Confirmed")}
                  {field(values,"remarks","Remarks")}
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

              {/* 7 Sign-off */}
              <div className="form-section">
                <h3 className="form-section-title">Sign-off</h3>

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
                    Submit ODI APR Data Pack
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

export default FRM01310_ODIAPRDataPack;