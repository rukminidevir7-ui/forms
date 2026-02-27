// FRM01317_ODICompoundingPack.jsx
// FRM-01317 – ODI Compounding Pack — Universal Form
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
  typeOfNonCompliance: Yup.string().required("Required"),
  relevantRegulation: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "Compounding Application Draft",
  "Board Resolution",
  "Transaction Documents",
  "Regulatory Correspondence",
  "Calculation Sheet / Working",
  "Supporting Documents"
];

const initialValues = {
  formId: "FRM-01317",
  date: "",
  department: "FEMA & RBI",
  function: "ODI / Overseas Investment",

  /* 1 Organization */
  companyName: "",
  cin: "",
  pan: "",
  registeredOffice: "",
  authorizedDealerBank: "",
  sectorIndustry: "",
  formReferenceNo: "",
  applicationDate: "",

  /* 2 Nature of Contravention */
  typeOfNonCompliance: "",
  relevantRegulation: "",
  periodOfContravention: "",
  dateOfDetection: "",
  briefDescription: "",

  /* 3 Transaction Details */
  natureOfTransaction: "",
  amountInvolved: "",
  currency: "",
  transactionDates: "",
  relatedFilingReference: "",

  /* 4 Root Cause */
  rootCauseAnalysis: "",
  correctiveActionTaken: "",
  preventiveMeasures: "",

  /* 5 Compliance Status */
  whetherContraventionContinuing: "",
  stepsForRegularization: "",
  regulatoryCommunicationReference: "",

  /* 6 Impact */
  financialImpact: "",
  operationalImpact: "",
  regulatoryImpact: "",
  additionalRemarks: "",

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

const FRM01323_ODICompoundingPack = () => {

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
    <ModernFormWrapper formId="FRM-01317" title="ODI Compounding Pack — Universal Form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("ODI Compounding Pack Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01317"
              title="FRM-01317 — ODI Compounding Pack — Universal Form"
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
                  {field(values,"sectorIndustry","Sector / Industry")}
                  {field(values,"formReferenceNo","Form Reference No")}
                  {field(values,"applicationDate","Application Date","date")}
                </div>
              </div>

              {/* 2 Nature of Contravention */}
              <div className="form-section">
                <h3 className="form-section-title">Nature of Contravention</h3>
                <div className="form-fields">
                  {field(values,"typeOfNonCompliance","Type of Non-Compliance")}
                  {field(values,"relevantRegulation","Relevant Regulation / Provision")}
                  {field(values,"periodOfContravention","Period of Contravention")}
                  {field(values,"dateOfDetection","Date of Detection","date")}
                  {field(values,"briefDescription","Brief Description")}
                </div>
              </div>

              {/* 3 Transaction Details */}
              <div className="form-section">
                <h3 className="form-section-title">Transaction Details</h3>
                <div className="form-fields">
                  {field(values,"natureOfTransaction","Nature of Transaction")}
                  {field(values,"amountInvolved","Amount Involved")}
                  {field(values,"currency","Currency")}
                  {field(values,"transactionDates","Date(s) of Transaction")}
                  {field(values,"relatedFilingReference","Related Filing Reference")}
                </div>
              </div>

              {/* 4 Root Cause */}
              <div className="form-section">
                <h3 className="form-section-title">Root Cause & Corrective Actions</h3>
                <div className="form-fields">
                  {field(values,"rootCauseAnalysis","Root Cause Analysis")}
                  {field(values,"correctiveActionTaken","Corrective Action Taken")}
                  {field(values,"preventiveMeasures","Preventive Measures")}
                </div>
              </div>

              {/* 5 Compliance Status */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Status</h3>
                <div className="form-fields">
                  {field(values,"whetherContraventionContinuing","Whether Contravention Continuing")}
                  {field(values,"stepsForRegularization","Steps Taken for Regularization")}
                  {field(values,"regulatoryCommunicationReference","Regulatory Communication Reference")}
                </div>
              </div>

              {/* 6 Impact */}
              <div className="form-section">
                <h3 className="form-section-title">Impact Assessment</h3>
                <div className="form-fields">
                  {field(values,"financialImpact","Financial Impact")}
                  {field(values,"operationalImpact","Operational Impact")}
                  {field(values,"regulatoryImpact","Regulatory Impact")}
                  {field(values,"additionalRemarks","Additional Remarks")}
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
                    Submit ODI Compounding Pack
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

export default FRM01323_ODICompoundingPack;