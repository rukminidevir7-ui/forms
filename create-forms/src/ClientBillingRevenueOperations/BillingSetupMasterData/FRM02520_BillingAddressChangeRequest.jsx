// FRM02520_BillingAddressChangeRequest.jsx
// FRM-02520 – Billing Address Change Request
// Enterprise Grade – Client Billing & Revenue Operations – Billing Setup & Master Data

import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { usePrintMode } from "../../PrintModeContext";
import ModernFormWrapper from "../../components/ModernFormWrapper";
import ModernA4Template from "../../components/ModernA4Template";
import ApprovalSignatureBlock from "../../components/ApprovalSignatureBlock";
import FormAttachments from "../../components/FormAttachments";
import "../../styles/FRM00611.css";

/* ================= VALIDATION ================= */

const validationSchema = Yup.object({
  clientName: Yup.string().required("Required"),
  requestDate: Yup.date().required("Required"),
  effectiveDate: Yup.date().required("Required"),
  reasonForChange: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02520",
  department: "Client Billing & Revenue Operations",
  function: "Billing Setup & Master Data",

  /* 1. Client Details */
  clientName: "",
  clientCode: "",
  legalEntityName: "",
  country: "",
  requestDate: "",
  referenceNo: "",

  /* 2. Current Billing Address */
  currentAddressLine1: "",
  currentAddressLine2: "",
  currentCity: "",
  currentState: "",
  currentPostalCode: "",
  currentCountry: "",

  /* 3. Proposed Billing Address */
  proposedAddressLine1: "",
  proposedAddressLine2: "",
  proposedCity: "",
  proposedState: "",
  proposedPostalCode: "",
  proposedCountry: "",
  effectiveDate: "",
  reasonForChange: "",

  /* 4. Impact Assessment */
  taxImpact: "",
  invoiceImpact: "",
  customerCommunication: "",
  remarks: "",

  /* 5. Workflow */
  approvalRoles: [
    { roleName: "Requested By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02520_BillingAddressChangeRequest = () => {

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
    <ModernFormWrapper formId="FRM-02520" title="Billing Address Change Request">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Billing Address Change Request Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02520"
              title="FRM-02520 — Billing Address Change Request"
              department="Client Billing & Revenue Operations | Billing Setup & Master Data"
            >

              {/* 1. Client Details */}
              <div className="form-section">
                <h3 className="form-section-title">Client Details</h3>
                <div className="form-fields">
                  {field(values,"clientName","Client Name")}
                  {field(values,"clientCode","Client Code")}
                  {field(values,"legalEntityName","Legal Entity Name")}
                  {field(values,"country","Country")}
                  {field(values,"requestDate","Request Date","date")}
                  {field(values,"referenceNo","Reference No")}
                </div>
              </div>

              {/* 2. Current Billing Address */}
              <div className="form-section">
                <h3 className="form-section-title">Current Billing Address</h3>
                <div className="form-fields">
                  {field(values,"currentAddressLine1","Address Line 1")}
                  {field(values,"currentAddressLine2","Address Line 2")}
                  {field(values,"currentCity","City")}
                  {field(values,"currentState","State / Province")}
                  {field(values,"currentPostalCode","Postal Code")}
                  {field(values,"currentCountry","Country")}
                </div>
              </div>

              {/* 3. Proposed Billing Address */}
              <div className="form-section">
                <h3 className="form-section-title">Proposed Billing Address</h3>
                <div className="form-fields">
                  {field(values,"proposedAddressLine1","Address Line 1")}
                  {field(values,"proposedAddressLine2","Address Line 2")}
                  {field(values,"proposedCity","City")}
                  {field(values,"proposedState","State / Province")}
                  {field(values,"proposedPostalCode","Postal Code")}
                  {field(values,"proposedCountry","Country")}
                  {field(values,"effectiveDate","Effective Date","date")}
                  {field(values,"reasonForChange","Reason for Change")}
                </div>
              </div>

              {/* 4. Impact Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">Impact Assessment</h3>
                <div className="form-fields">
                  {field(values,"taxImpact","Tax Impact")}
                  {field(values,"invoiceImpact","Invoice Impact")}
                  {field(values,"customerCommunication","Customer Communication Required")}
                  {field(values,"remarks","Remarks")}
                </div>
              </div>

              {/* Attachments */}
              <div className="form-section">
                <FormAttachments values={values} />
              </div>

              {/* 5. Approval */}
              {/* 5. Approval */}
<div className="form-section">
  <h3 className="form-section-title">Approval</h3>

  <FieldArray name="approvalRoles">
    {({ push, remove }) => (
      <>
        {!isPrintMode && (
          <button
            type="button"
            className="btn-submit"
            onClick={() => push({ roleName: "New Role", data: {} })}
            style={{ marginBottom: 15 }}
          >
            + Add Role
          </button>
        )}

        <div className="three-column-signatures">
          {values.approvalRoles.map((role, index) => (
            <div key={index} style={{ position: "relative" }}>

              <ApprovalSignatureBlock
                roleName={role.roleName}
                value={role.data}
                allowRoleEdit={!isPrintMode}
                onRoleNameChange={(val) =>
                  setFieldValue(`approvalRoles.${index}.roleName`, val)
                }
                onChange={(val) =>
                  setFieldValue(`approvalRoles.${index}.data`, val)
                }
              />

              {!isPrintMode && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  style={{
                    marginTop: 5,
                    background: "#e53935",
                    color: "#fff",
                    border: "none",
                    padding: "4px 8px",
                    cursor: "pointer"
                  }}
                >
                  Remove
                </button>
              )}

            </div>
          ))}
        </div>
      </>
    )}
  </FieldArray>

  {field(values, "approvalDate", "Approval Date", "date")}
</div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Billing Address Change
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

export default FRM02520_BillingAddressChangeRequest;