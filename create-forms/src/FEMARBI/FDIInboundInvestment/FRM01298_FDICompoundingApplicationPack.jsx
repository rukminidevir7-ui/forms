// FRM01298_FDICompoundingApplicationPack.jsx
// FRM-01298 – Compounding Application Pack (FDI)
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
  typeOfNonCompliance: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "Supporting Documents",
  "Correspondence with Regulator",
  "Transaction Documents",
  "Internal Notes",
  "Other Supporting Documents"
];

const initialValues = {
  formId: "FRM-01298",
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
  requestDate: "",

  /* 2 */
  typeOfNonCompliance: "",
  relevantRegulation: "",
  periodOfContravention: "",
  dateOfDetection: "",
  briefDescription: "",

  /* 3 */
  natureOfTransaction: "",
  amountInvolved: "",
  currency: "",
  transactionDates: "",
  relatedFilingReference: "",

  /* 4 */
  rootCauseAnalysis: "",
  correctiveActionTaken: "",
  preventiveMeasures: "",

  /* 5 */
  whetherContraventionContinuing: "",
  stepsForRegularization: "",
  regulatoryCommunicationReference: "",

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

const FRM01298_FDICompoundingApplicationPack = () => {

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
    <ModernFormWrapper formId="FRM-01298" title="Compounding Application Pack (FDI)">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Compounding Application Pack Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01298"
              title="FRM-01298 — Compounding Application Pack (FDI)"
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
                  {field(values,"requestDate","Request Date","date")}
                </div>
              </div>

              {/* 2 */}
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

              {/* 3 */}
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

              {/* 4 */}
              <div className="form-section">
                <h3 className="form-section-title">Root Cause & Corrective Actions</h3>
                <div className="form-fields">
                  {field(values,"rootCauseAnalysis","Root Cause Analysis")}
                  {field(values,"correctiveActionTaken","Corrective Action Taken")}
                  {field(values,"preventiveMeasures","Preventive Measures")}
                </div>
              </div>

              {/* 5 */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Status</h3>
                <div className="form-fields">
                  {field(values,"whetherContraventionContinuing","Whether Contravention Continuing")}
                  {field(values,"stepsForRegularization","Steps Taken for Regularization")}
                  {field(values,"regulatoryCommunicationReference","Regulatory Communication Reference")}
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

              {/* 7 Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>

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
                    Submit Compounding Application
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

export default FRM01298_FDICompoundingApplicationPack;