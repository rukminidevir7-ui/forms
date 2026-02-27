// FRM01371_FEMAComplianceException.jsx
// FRM-01371 – FEMA Compliance Exception
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
  transactionReference: Yup.string().required("Required"),
  typeOfException: Yup.string().required("Required"),
  riskLevel: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "Supporting Evidence",
  "Regulatory Correspondence",
  "Internal Notes"
];

const initialValues = {
  formId: "FRM-01371",
  date: "",
  department: "FEMA & RBI",
  function: "Remittances & Current Account",

  /* 1. Organization Details */
  companyName: "",
  cin: "",
  pan: "",
  registeredAddress: "",
  authorizedDealerBank: "",
  formReferenceNo: "",
  exceptionDate: "",

  /* 2. Transaction / Case Details */
  transactionReference: "",
  natureOfTransaction: "",
  amount: "",
  currency: "",
  counterparty: "",
  country: "",

  /* 3. Exception Details */
  typeOfException: "",
  descriptionOfException: "",
  regulationImpacted: "",
  rootCause: "",
  riskLevel: "",

  /* 4. Impact Assessment */
  financialImpact: "",
  regulatoryImpact: "",
  operationalImpact: "",
  reputationalImpact: "",
  remarks: "",

  /* 5. Mitigation & Action Plan */
  correctiveAction: "",
  preventiveMeasures: "",
  responsibleOwner: "",
  targetClosureDate: "",
  status: "",

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

  approvalStatus: "",
  comments: "",

  attachments: [],
  customFields: []
};

/* ================= COMPONENT ================= */

const FRM01371_FEMAComplianceException = () => {

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
    <ModernFormWrapper formId="FRM-01371" title="FEMA Compliance Exception">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("FEMA Compliance Exception Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01371"
              title="FRM-01371 — FEMA Compliance Exception — Universal Form"
              department="FEMA & RBI (Foreign Exchange) | Remittances & Current Account"
            >

              {/* 1. Organization Details */}
              <div className="form-section">
                <h3 className="form-section-title">Organization Details</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"pan","PAN")}
                  {field(values,"registeredAddress","Registered Address")}
                  {field(values,"authorizedDealerBank","Authorized Dealer Bank")}
                  {field(values,"formReferenceNo","Form Reference No")}
                  {field(values,"exceptionDate","Exception Date","date")}
                </div>
              </div>

              {/* 2. Transaction / Case Details */}
              <div className="form-section">
                <h3 className="form-section-title">Transaction / Case Details</h3>
                <div className="form-fields">
                  {field(values,"transactionReference","Transaction Reference")}
                  {field(values,"natureOfTransaction","Nature of Transaction")}
                  {field(values,"amount","Amount")}
                  {field(values,"currency","Currency")}
                  {field(values,"counterparty","Counterparty")}
                  {field(values,"country","Country")}
                </div>
              </div>

              {/* 3. Exception Details */}
              <div className="form-section">
                <h3 className="form-section-title">Exception Details</h3>
                <div className="form-fields">
                  {field(values,"typeOfException","Type of Exception")}
                  {field(values,"descriptionOfException","Description of Exception")}
                  {field(values,"regulationImpacted","Regulation / Requirement Impacted")}
                  {field(values,"rootCause","Root Cause")}
                  {field(values,"riskLevel","Risk Level")}
                </div>
              </div>

              {/* 4. Impact Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">Impact Assessment</h3>
                <div className="form-fields">
                  {field(values,"financialImpact","Financial Impact")}
                  {field(values,"regulatoryImpact","Regulatory Impact")}
                  {field(values,"operationalImpact","Operational Impact")}
                  {field(values,"reputationalImpact","Reputational Impact")}
                  {field(values,"remarks","Remarks")}
                </div>
              </div>

              {/* 5. Mitigation & Action Plan */}
              <div className="form-section">
                <h3 className="form-section-title">Mitigation & Action Plan</h3>
                <div className="form-fields">
                  {field(values,"correctiveAction","Corrective Action")}
                  {field(values,"preventiveMeasures","Preventive Measures")}
                  {field(values,"responsibleOwner","Responsible Owner")}
                  {field(values,"targetClosureDate","Target Closure Date","date")}
                  {field(values,"status","Status")}
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

              {/* 7. Workflow & Approval */}
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

                {field(values,"approvalStatus","Approval Status")}
                {field(values,"comments","Comments")}
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Compliance Exception
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

export default FRM01371_FEMAComplianceException;