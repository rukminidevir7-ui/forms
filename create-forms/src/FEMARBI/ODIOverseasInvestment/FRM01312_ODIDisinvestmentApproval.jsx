// FRM01312_ODIDisinvestmentApproval.jsx
// FRM-01312 – ODI Disinvestment Approval
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
  considerationAmount: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "Valuation Documents",
  "Transaction Agreement",
  "Board Approval Note",
  "Supporting Documents"
];

const initialValues = {
  formId: "FRM-01312",
  date: "",
  department: "FEMA & RBI",
  function: "ODI / Overseas Investment",

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
  nameOfOverseasEntity: "",
  country: "",
  typeOfDisinvestment: "",
  percentageToBeDivested: "",
  considerationAmount: "",
  currency: "",
  proposedDateOfDisinvestment: "",

  /* 3 Buyer Details */
  buyerName: "",
  buyerCountry: "",
  buyerAddress: "",
  buyerEntityType: "",
  buyerContactDetails: "",

  /* 4 Compliance */
  odiRegulationsCompliance: "",
  valuationRequirementMet: "",
  noOutstandingDues: "",
  regulatoryFilingsIdentified: "",
  approvalsRequired: "",

  /* 5 Rationale & Impact */
  reasonForDisinvestment: "",
  financialImpact: "",
  strategicImpact: "",
  additionalRemarks: "",

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

const FRM01312_ODIDisinvestmentApproval = () => {

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
    <ModernFormWrapper formId="FRM-01312" title="ODI Disinvestment Approval">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("ODI Disinvestment Approval Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01312"
              title="FRM-01312 — ODI Disinvestment Approval"
              department="FEMA & RBI (Foreign Exchange) | ODI / Overseas Investment"
            >

              {/* 1 Organization */}
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

              {/* 2 Disinvestment Details */}
              <div className="form-section">
                <h3 className="form-section-title">Disinvestment Details</h3>
                <div className="form-fields">
                  {field(values,"nameOfOverseasEntity","Name of Overseas Entity")}
                  {field(values,"country","Country")}
                  {field(values,"typeOfDisinvestment","Type of Disinvestment (Full/Partial)")}
                  {field(values,"percentageToBeDivested","Percentage to be Divested")}
                  {field(values,"considerationAmount","Consideration Amount")}
                  {field(values,"currency","Currency")}
                  {field(values,"proposedDateOfDisinvestment","Proposed Date of Disinvestment","date")}
                </div>
              </div>

              {/* 3 Buyer Details */}
              <div className="form-section">
                <h3 className="form-section-title">Buyer / Counterparty Details</h3>
                <div className="form-fields">
                  {field(values,"buyerName","Name")}
                  {field(values,"buyerCountry","Country")}
                  {field(values,"buyerAddress","Address")}
                  {field(values,"buyerEntityType","Entity Type")}
                  {field(values,"buyerContactDetails","Contact Details")}
                </div>
              </div>

              {/* 4 Regulatory Check */}
              <div className="form-section">
                <h3 className="form-section-title">Regulatory & Compliance Check</h3>
                <div className="form-fields">
                  {field(values,"odiRegulationsCompliance","ODI Regulations Compliance")}
                  {field(values,"valuationRequirementMet","Valuation Requirement Met")}
                  {field(values,"noOutstandingDues","No Outstanding Dues/Obligations")}
                  {field(values,"regulatoryFilingsIdentified","Regulatory Filings Identified")}
                  {field(values,"approvalsRequired","Approvals Required")}
                </div>
              </div>

              {/* 5 Rationale */}
              <div className="form-section">
                <h3 className="form-section-title">Rationale & Impact</h3>
                <div className="form-fields">
                  {field(values,"reasonForDisinvestment","Reason for Disinvestment")}
                  {field(values,"financialImpact","Financial Impact")}
                  {field(values,"strategicImpact","Strategic Impact")}
                  {field(values,"additionalRemarks","Additional Remarks")}
                </div>
              </div>

              {/* Custom Fields */}
              <FormCustomFields values={values} />

              {/* 6 Attachments */}
              <div className="form-section">
                <FormAttachments values={values} />
              </div>

              {/* 7 Sign-off */}
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
                    Submit ODI Disinvestment Approval
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

export default FRM01312_ODIDisinvestmentApproval;