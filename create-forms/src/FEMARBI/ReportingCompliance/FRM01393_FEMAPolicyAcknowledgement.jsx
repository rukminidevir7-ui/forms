// FRM01393_FEMAPolicyAcknowledgement.jsx
// FRM-01393 – FEMA Policy Acknowledgement
// Enterprise Grade – FEMA & RBI – Reporting & Compliance

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
  policyName: Yup.string().required("Required"),
  policyVersion: Yup.string().required("Required"),
  employeeName: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01393",
  department: "FEMA & RBI Regulatory",
  function: "Reporting & Compliance",

  /* 1. Organization Details */
  companyName: "",
  cin: "",
  pan: "",
  policyName: "",
  policyVersion: "",
  effectiveDate: "",

  /* 2. Acknowledgement Details */
  employeeName: "",
  employeeId: "",
  departmentName: "",
  acknowledgementDate: "",
  modeOfAcknowledgement: "",

  /* 3. Declaration */
  declarationStatement:
    "I hereby acknowledge that I have read, understood, and agree to comply with the above-mentioned FEMA policy and its requirements.",
  declarationComments: "",

  /* 4. Approval */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: "",

  attachments: [],
  customFields: []
};

/* ================= COMPONENT ================= */

const FRM01393_FEMAPolicyAcknowledgement = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type="text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : <>
            <Field
              as={type === "textarea" ? "textarea" : "input"}
              name={name}
              type={type !== "textarea" ? type : undefined}
              className="form-input"
            />
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-01393" title="FEMA Policy Acknowledgement">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("FEMA Policy Acknowledgement Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01393"
              title="FRM-01393 — FEMA Policy Acknowledgement"
              department="FEMA & RBI Regulatory | Reporting & Compliance"
            >

              {/* 1. Organization Details */}
              <div className="form-section">
                <h3 className="form-section-title">Organization Details</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"pan","PAN")}
                  {field(values,"policyName","Policy Name")}
                  {field(values,"policyVersion","Policy Version")}
                  {field(values,"effectiveDate","Effective Date","date")}
                </div>
              </div>

              {/* 2. Acknowledgement Details */}
              <div className="form-section">
                <h3 className="form-section-title">Acknowledgement Details</h3>
                <div className="form-fields">
                  {field(values,"employeeName","Employee / Stakeholder Name")}
                  {field(values,"employeeId","Employee ID / Reference")}
                  {field(values,"departmentName","Department")}
                  {field(values,"acknowledgementDate","Acknowledgement Date","date")}
                  {field(values,"modeOfAcknowledgement","Mode of Acknowledgement (Email / Portal / Physical / Digital Sign)")}
                </div>
              </div>

              {/* 3. Declaration */}
              <div className="form-section">
                <h3 className="form-section-title">Declaration</h3>
                <div className="form-fields">
                  {field(values,"declarationStatement","Declaration Statement","textarea")}
                  {field(values,"declarationComments","Comments","textarea")}
                </div>
              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* 4. Approval */}
              <div className="form-section">
                <h3 className="form-section-title">Approval</h3>

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

                {field(values,"approvalDate","Approval Date","date")}
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Policy Acknowledgement
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

export default FRM01393_FEMAPolicyAcknowledgement;