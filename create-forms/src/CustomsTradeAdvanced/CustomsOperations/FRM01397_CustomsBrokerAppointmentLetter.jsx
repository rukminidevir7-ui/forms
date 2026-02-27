// FRM01397_CustomsBrokerAppointmentLetter.jsx
// FRM-01397 – Customs Broker Appointment Letter
// Enterprise Grade – Customs & Trade (Advanced) – Customs Operations

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
  iecNumber: Yup.string().required("Required"),
  gstin: Yup.string().required("Required"),
  brokerName: Yup.string().required("Required"),
  licenseNumber: Yup.string().required("Required"),
  effectiveDate: Yup.date().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01397",
  department: "Customs & Trade (Advanced)",
  function: "Customs Operations",

  /* 1. Company Details */
  companyName: "",
  iecNumber: "",
  gstin: "",
  registeredAddress: "",
  authorizedSignatory: "",

  /* 2. Broker Details */
  brokerName: "",
  licenseNumber: "",
  brokerFirm: "",
  brokerAddress: "",
  contactDetails: "",

  /* 3. Appointment Scope */
  effectiveDate: "",
  scopeOfServices: "",
  portsCovered: "",
  validityPeriod: "",
  specialInstructions: "",

  /* 4. Declaration */
  declarationText:
    "We hereby appoint the above-mentioned customs broker to act on our behalf for customs clearance and related activities as per applicable laws and regulations.",

  /* 5. Sign-off */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: "",
  companySeal: ""
};

/* ================= COMPONENT ================= */

const FRM01397_CustomsBrokerAppointmentLetter = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type="text", multiline=false) => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || "_________"}</div>
      ) : (
        <>
          {multiline ? (
            <Field as="textarea" name={name} className="form-input"/>
          ) : (
            <Field name={name} type={type} className="form-input"/>
          )}
          <ErrorMessage name={name} component="div" className="form-error"/>
        </>
      )}
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-01397" title="Customs Broker Appointment Letter">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Customs Broker Appointment Letter Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01397"
            title="FRM-01397 — Customs Broker Appointment Letter"
            department="Customs & Trade (Advanced) | Customs Operations"
          >

          {/* 1. Company Details */}
          <div className="form-section">
            <h3 className="form-section-title">Company Details</h3>
            <div className="form-fields">
              {field(values,"companyName","Company Name")}
              {field(values,"iecNumber","IEC Number")}
              {field(values,"gstin","GSTIN")}
              {field(values,"registeredAddress","Registered Address","text",true)}
              {field(values,"authorizedSignatory","Authorized Signatory")}
            </div>
          </div>

          {/* 2. Customs Broker Details */}
          <div className="form-section">
            <h3 className="form-section-title">Customs Broker Details</h3>
            <div className="form-fields">
              {field(values,"brokerName","Broker Name")}
              {field(values,"licenseNumber","License Number")}
              {field(values,"brokerFirm","Broker Firm")}
              {field(values,"brokerAddress","Address","text",true)}
              {field(values,"contactDetails","Contact Details")}
            </div>
          </div>

          {/* 3. Appointment Scope */}
          <div className="form-section">
            <h3 className="form-section-title">Appointment Scope</h3>
            <div className="form-fields">
              {field(values,"effectiveDate","Effective Date","date")}
              {field(values,"scopeOfServices","Scope of Services","text",true)}
              {field(values,"portsCovered","Ports Covered")}
              {field(values,"validityPeriod","Validity Period")}
              {field(values,"specialInstructions","Special Instructions","text",true)}
            </div>
          </div>

          {/* 4. Declaration */}
          <div className="form-section">
            <h3 className="form-section-title">Declaration</h3>
            <div className="form-fields">
              {field(values,"declarationText","Declaration","text",true)}
            </div>
          </div>

          <FormAttachments values={values}/>
          <FormCustomFields values={values}/>

          {/* 5. Sign-off */}
          <div className="form-section">
            <h3 className="form-section-title">Sign-off</h3>

            <FieldArray name="approvalRoles">
            {({push,remove})=>(
              <>
              {!isPrintMode &&
                <button
                  type="button"
                  className="btn-submit"
                  onClick={()=>push({roleName:"New Role",data:{}})}
                >
                  + Add Role
                </button>}

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
                      <button type="button" onClick={()=>remove(index)}>
                        Remove
                      </button>}
                  </div>
                ))}
              </div>
              </>
            )}
            </FieldArray>

            {field(values,"approvalDate","Date","date")}

            <div className="form-field">
              <label className="form-label">Company Seal</label>
              {isPrintMode
                ? <div className="print-value">[Company Seal]</div>
                : <Field name="companySeal" className="form-input" placeholder="Seal Reference / Upload via Attachments"/>}
            </div>

          </div>

          {!isPrintMode &&
            <div className="form-actions">
              <button type="submit" className="btn-submit">
                Submit Appointment Letter
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

export default FRM01397_CustomsBrokerAppointmentLetter;