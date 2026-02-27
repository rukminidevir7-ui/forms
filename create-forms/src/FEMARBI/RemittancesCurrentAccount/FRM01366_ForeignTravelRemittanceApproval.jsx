// FRM01366_ForeignTravelRemittanceApproval.jsx
// FRM-01366 – Foreign Travel Remittance Approval
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
  pan: Yup.string().required("Required"),
  destinationCountry: Yup.string().required("Required"),
  amount: Yup.string().required("Required"),
  currency: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "Travel Approval",
  "Travel Itinerary",
  "Passport Copy",
  "Supporting Documents"
];

const initialValues = {
  formId: "FRM-01366",
  date: "",
  department: "FEMA & RBI",
  function: "Remittances & Current Account",

  /* 1. Applicant Details */
  applicantName: "",
  employeePassportNo: "",
  departmentCompany: "",
  pan: "",
  authorizedDealerBank: "",
  approvalDate: "",

  /* 2. Travel Details */
  purposeOfTravel: "",
  destinationCountry: "",
  travelStartDate: "",
  travelEndDate: "",
  travelCategory: "",

  /* 3. Remittance Details */
  amount: "",
  currency: "",
  purposeCode: "",
  modeOfPayment: "",
  proposedRemittanceDate: "",

  /* 4. Compliance Check */
  applicableFEMARegulation: "",
  lrsApplicabilityChecked: "",
  limitAvailabilityConfirmed: "",
  documentationVerified: "",
  remarks: "",

  /* Attachments */
  mandatoryAttachments: mandatoryDocuments.map(doc => ({
    documentName: doc,
    status: "",
    file: null,
    remarks: ""
  })),
  customAttachments: [],

  /* Authorization */
  approvalRoles: [
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  approvalStatus: "",
  comments: "",

  attachments: [],
  customFields: []
};

/* ================= COMPONENT ================= */

const FRM01366_ForeignTravelRemittanceApproval = () => {

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
    <ModernFormWrapper formId="FRM-01366" title="Foreign Travel Remittance Approval">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Foreign Travel Remittance Approval Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01366"
              title="FRM-01366 — Foreign Travel Remittance Approval"
              department="FEMA & RBI (Foreign Exchange) | Remittances & Current Account"
            >

              {/* 1. Applicant Details */}
              <div className="form-section">
                <h3 className="form-section-title">Applicant Details</h3>
                <div className="form-fields">
                  {field(values,"applicantName","Applicant Name")}
                  {field(values,"employeePassportNo","Employee ID / Passport No")}
                  {field(values,"departmentCompany","Department / Company")}
                  {field(values,"pan","PAN")}
                  {field(values,"authorizedDealerBank","Authorized Dealer Bank")}
                  {field(values,"approvalDate","Approval Date","date")}
                </div>
              </div>

              {/* 2. Travel Details */}
              <div className="form-section">
                <h3 className="form-section-title">Travel Details</h3>
                <div className="form-fields">
                  {field(values,"purposeOfTravel","Purpose of Travel")}
                  {field(values,"destinationCountry","Destination Country")}
                  {field(values,"travelStartDate","Travel Start Date","date")}
                  {field(values,"travelEndDate","Travel End Date","date")}
                  {field(values,"travelCategory","Travel Category (Business/Personal)")}
                </div>
              </div>

              {/* 3. Remittance Details */}
              <div className="form-section">
                <h3 className="form-section-title">Remittance Details</h3>
                <div className="form-fields">
                  {field(values,"amount","Amount")}
                  {field(values,"currency","Currency")}
                  {field(values,"purposeCode","Purpose Code")}
                  {field(values,"modeOfPayment","Mode of Payment")}
                  {field(values,"proposedRemittanceDate","Proposed Remittance Date","date")}
                </div>
              </div>

              {/* 4. Compliance Check */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Check</h3>
                <div className="form-fields">
                  {field(values,"applicableFEMARegulation","Applicable FEMA Regulation")}
                  {field(values,"lrsApplicabilityChecked","LRS Applicability Checked")}
                  {field(values,"limitAvailabilityConfirmed","Limit Availability Confirmed")}
                  {field(values,"documentationVerified","Documentation Verified")}
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

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>

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
                    Submit Travel Remittance Approval
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

export default FRM01366_ForeignTravelRemittanceApproval;