// FRM01009_AuthorizedSignatoryUpdate.jsx
// FRM-01009 / 01010 / 01011 – Authorized Signatory Update
// Enterprise Grade – Treasury & Funding – Cash, Banking & Payments

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
  legalEntityName: Yup.string().required("Required"),
  bankName: Yup.string().required("Required"),
  requestType: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01009 / 01010 / 01011",
  date: "",
  department: "Treasury & Funding",
  function: "Cash, Banking & Payments",
  referenceNumber: "",
  location: "",

  requestType: "",
  priority: "",
  effectiveDate: "",
  bankName: "",

  /* Entity Details */
  legalEntityName: "",
  accountNumber: "",
  branch: "",
  currency: "",

  /* Current Signatory */
  currentName: "",
  currentDesignation: "",
  currentAuthorityLevel: "",
  currentStatus: "",

  /* Proposed Signatory */
  proposedName: "",
  proposedDesignation: "",
  proposedPAN: "",
  proposedContactNumber: "",
  proposedEmail: "",
  proposedAuthorityLevel: "",

  /* Change Details */
  changeType: "",
  reasonForChange: "",
  supportingDocsAttached: "",
  remarks: "",

  /* Authorization Roles */
  approvalRoles: [
    { roleName: "Requested By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01009_AuthorizedSignatoryUpdate = () => {

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
    <ModernFormWrapper
      formId="FRM-01009"
      title="Authorized Signatory Update"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Authorized Signatory Update Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01009 / 01010 / 01011"
              title="AUTHORIZED SIGNATORY UPDATE"
              department="Treasury & Funding – Cash, Banking & Payments"
            >

              {/* GENERAL INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"date","Date","date")}
                  {field(values,"department","Department")}
                  {field(values,"function","Function")}
                  {field(values,"referenceNumber","Reference Number")}
                  {field(values,"location","Location")}
                  {field(values,"requestType","Request Type")}
                  {field(values,"priority","Priority")}
                  {field(values,"effectiveDate","Effective Date","date")}
                  {field(values,"bankName","Bank Name")}
                </div>
              </div>

              {/* ENTITY DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Entity Details</h3>
                <div className="form-fields">
                  {field(values,"legalEntityName","Legal Entity Name")}
                  {field(values,"accountNumber","Account Number")}
                  {field(values,"branch","Branch")}
                  {field(values,"currency","Currency")}
                </div>
              </div>

              {/* CURRENT SIGNATORY */}
              <div className="form-section">
                <h3 className="form-section-title">Current Signatory Details</h3>
                <div className="form-fields">
                  {field(values,"currentName","Name")}
                  {field(values,"currentDesignation","Designation")}
                  {field(values,"currentAuthorityLevel","Signing Authority Level")}
                  {field(values,"currentStatus","Status")}
                </div>
              </div>

              {/* PROPOSED SIGNATORY */}
              <div className="form-section">
                <h3 className="form-section-title">Proposed Signatory Details</h3>
                <div className="form-fields">
                  {field(values,"proposedName","Name")}
                  {field(values,"proposedDesignation","Designation")}
                  {field(values,"proposedPAN","PAN / ID")}
                  {field(values,"proposedContactNumber","Contact Number")}
                  {field(values,"proposedEmail","Email")}
                  {field(values,"proposedAuthorityLevel","Signing Authority Level")}
                </div>
              </div>

              {/* CHANGE DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Change Details</h3>
                <div className="form-fields">
                  {field(values,"changeType","Type of Change (Add/Remove/Modify)")}
                  {field(values,"reasonForChange","Reason for Change")}
                  {field(values,"supportingDocsAttached","Supporting Documents Attached (Yes/No)")}
                  {field(values,"remarks","Remarks")}
                </div>
              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* AUTHORIZATION */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>

                <FieldArray name="approvalRoles">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={()=>push({ roleName:"New Role", data:{} })}
                        >
                          + Add Role
                        </button>
                      )}

                      <div className="three-column-signatures">
                        {values.approvalRoles.map((role,index)=>(
                          <div key={index}>
                            <ApprovalSignatureBlock
                              roleName={role.roleName}
                              value={role.data}
                              allowRoleEdit={!isPrintMode}
                              onRoleNameChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.roleName`,val)
                              }
                              onChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.data`,val)
                              }
                            />
                            {!isPrintMode && (
                              <button
                                type="button"
                                className="btn-remove-role"
                                onClick={()=>remove(index)}
                              >
                                Remove Role
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </FieldArray>
              </div>

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Authorized Signatory Update
                  </button>
                </div>
              )}

            </ModernA4Template>

          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM01009_AuthorizedSignatoryUpdate;