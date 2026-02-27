// FRM01374_ADBankDocumentationChecklist.jsx
// FRM-01374 – AD Bank Documentation Checklist
// Enterprise Grade – FEMA & RBI – Remittances & Current Account

import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { usePrintMode } from "../../PrintModeContext";
import ModernFormWrapper from "../../components/ModernFormWrapper";
import ModernA4Template from "../../components/ModernA4Template";
import ApprovalSignatureBlock from "../../components/ApprovalSignatureBlock";
import FormCustomFields from "../../components/FormCustomFields";
import "../../styles/FRM00611.css";

/* ================= INITIAL VALUES ================= */

const checklistItems = [
  "Form A2",
  "Invoice / Agreement",
  "KYC Documents",
  "Purpose Code Confirmation",
  "Board / Internal Approval",
  "Regulatory Approval (if applicable)",
  "Tax Documents / Certificates",
  "Bank Instructions",
  "Supporting Documents"
];

const initialValues = {
  formId: "FRM-01374",
  department: "FEMA & RBI",
  function: "Remittances & Current Account",

  /* 1. Organization Details */
  companyName: "",
  cin: "",
  pan: "",
  authorizedDealerBank: "",
  checklistDate: "",
  referenceNo: "",

  /* 2. Documentation Checklist */
  checklist: checklistItems.map(item => ({
    documentName: item,
    available: "",
    verifiedBy: "",
    remarks: ""
  })),

  /* 3. Notes */
  generalNotes: "",

  /* 4. Sign-off */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  customFields: []
};

/* ================= COMPONENT ================= */

const FRM01374_ADBankDocumentationChecklist = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type="text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : <Field name={name} type={type} className="form-input"/>
      }
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-01374" title="AD Bank Documentation Checklist">
      <Formik
        initialValues={initialValues}
        onSubmit={(values)=>{
          console.log(values);
          alert("AD Bank Documentation Checklist Saved Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01374"
              title="FRM-01374 — AD Bank Documentation Checklist"
              department="FEMA & RBI (Foreign Exchange) | Remittances & Current Account"
            >

              {/* 1. Organization Details */}
              <div className="form-section">
                <h3 className="form-section-title">Organization Details</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"pan","PAN")}
                  {field(values,"authorizedDealerBank","Authorized Dealer Bank")}
                  {field(values,"checklistDate","Checklist Date","date")}
                  {field(values,"referenceNo","Reference No")}
                </div>
              </div>

              {/* 2. Documentation Checklist */}
              <div className="form-section">
                <h3 className="form-section-title">Documentation Checklist</h3>

                <FieldArray name="checklist">
                  {() => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Document</th>
                          <th>Available (Yes/No)</th>
                          <th>Verified By</th>
                          <th>Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {values.checklist.map((item,index)=>(
                          <tr key={index}>
                            <td>{item.documentName}</td>
                            <td>
                              <Field
                                as="select"
                                name={`checklist.${index}.available`}
                                className="form-input"
                              >
                                <option value="">Select</option>
                                <option>Yes</option>
                                <option>No</option>
                              </Field>
                            </td>
                            <td>
                              <Field
                                name={`checklist.${index}.verifiedBy`}
                                className="form-input"
                              />
                            </td>
                            <td>
                              <Field
                                name={`checklist.${index}.remarks`}
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

              {/* 3. Notes */}
              <div className="form-section">
                <h3 className="form-section-title">Notes</h3>
                {field(values,"generalNotes","General Notes")}
              </div>

              <FormCustomFields values={values} />

              {/* 4. Sign-off */}
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
                    Save Documentation Checklist
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

export default FRM01374_ADBankDocumentationChecklist;