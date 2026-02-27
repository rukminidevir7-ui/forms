// FRM01370_SanctionsAMLScreeningEvidence.jsx
// FRM-01370 – Sanctions / AML Screening Evidence
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
  screeningDate: Yup.string().required("Required"),
  counterpartyName: Yup.string().required("Required"),
  screeningTool: Yup.string().required("Required"),
  matchFound: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "Screening Screenshot / Report",
  "Supporting Notes",
  "Transaction Reference Documents"
];

const initialValues = {
  formId: "FRM-01370",
  date: "",
  department: "FEMA & RBI",
  function: "Remittances & Current Account",

  /* 1. Entity Details */
  companyName: "",
  cinPan: "",
  screeningDate: "",
  screeningReferenceNo: "",
  screeningConductedBy: "",

  /* 2. Counterparty Details */
  counterpartyName: "",
  country: "",
  relationship: "",
  transactionReference: "",

  /* 3. Screening Details */
  screeningTool: "",
  listsChecked: "",
  matchFound: "",
  riskRating: "",
  comments: "",

  /* 4. Evidence Details */
  screenshotReference: "",
  supportingNotes: "",

  /* Attachments */
  mandatoryAttachments: mandatoryDocuments.map(doc => ({
    documentName: doc,
    status: "",
    file: null,
    remarks: ""
  })),
  customAttachments: [],

  /* Sign-off */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

/* ================= COMPONENT ================= */

const FRM01370_SanctionsAMLScreeningEvidence = () => {

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
    <ModernFormWrapper formId="FRM-01370" title="Sanctions / AML Screening Evidence">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Sanctions / AML Screening Evidence Saved Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01370"
              title="FRM-01370 — Sanctions / AML Screening Evidence"
              department="FEMA & RBI (Foreign Exchange) | Remittances & Current Account"
            >

              {/* 1. Entity Details */}
              <div className="form-section">
                <h3 className="form-section-title">Entity Details</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cinPan","CIN / PAN")}
                  {field(values,"screeningDate","Screening Date","date")}
                  {field(values,"screeningReferenceNo","Screening Reference No")}
                  {field(values,"screeningConductedBy","Screening Conducted By")}
                </div>
              </div>

              {/* 2. Counterparty Details */}
              <div className="form-section">
                <h3 className="form-section-title">Counterparty Details</h3>
                <div className="form-fields">
                  {field(values,"counterpartyName","Counterparty Name")}
                  {field(values,"country","Country")}
                  {field(values,"relationship","Relationship")}
                  {field(values,"transactionReference","Transaction Reference")}
                </div>
              </div>

              {/* 3. Screening Details */}
              <div className="form-section">
                <h3 className="form-section-title">Screening Details</h3>
                <div className="form-fields">
                  {field(values,"screeningTool","Screening Tool / Database")}
                  {field(values,"listsChecked","Lists Checked (OFAC/UN/EU/Local)")}
                  {field(values,"matchFound","Match Found (Yes/No)")}
                  {field(values,"riskRating","Risk Rating")}
                  {field(values,"comments","Comments")}
                </div>
              </div>

              {/* 4. Evidence Details */}
              <div className="form-section">
                <h3 className="form-section-title">Evidence Details</h3>
                <div className="form-fields">
                  {field(values,"screenshotReference","Screenshot / Reference")}
                  {field(values,"supportingNotes","Supporting Notes")}
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

              {/* 5. Sign-off */}
              <div className="form-section">
                <h3 className="form-section-title">Sign-off</h3>

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

              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Save Screening Evidence
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

export default FRM01370_SanctionsAMLScreeningEvidence;