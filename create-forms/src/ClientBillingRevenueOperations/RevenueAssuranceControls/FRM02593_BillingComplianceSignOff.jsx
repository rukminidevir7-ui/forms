// FRM02593_BillingComplianceSignOff.jsx
// FRM-02593 – Billing Compliance Sign-off
// Enterprise Grade – Client Billing & Revenue Operations – Revenue Assurance & Controls

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
  signoffReferenceNo: Yup.string().required("Required"),
  periodCovered: Yup.string().required("Required"),
  businessUnit: Yup.string().required("Required"),
  date: Yup.date().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02593",
  department: "Client Billing & Revenue Operations",
  function: "Revenue Assurance & Controls",

  /* 1. Reference Details */
  signoffReferenceNo: "",
  periodCovered: "",
  businessUnit: "",
  preparedBy: "",
  date: "",

  /* 2. Scope */
  processesReviewed: "",
  systemsCovered: "",
  policiesReferenced: "",
  reviewMethodology: "",

  /* 3. Compliance Assessment */
  overallComplianceStatus: "",
  keyFindings: "",
  exceptionsNoted: "",
  riskLevel: "",

  /* 4. Recommendations */
  correctiveActions: "",
  processImprovements: "",
  followUpRequired: "",

  /* 5. Final Sign-off */
  approvalRoles: [
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: "",
  comments: ""
};

/* ================= COMPONENT ================= */

const FRM02593_BillingComplianceSignOff = () => {

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
    <ModernFormWrapper formId="FRM-02593" title="Billing Compliance Sign-off">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Billing Compliance Sign-off Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-02593"
            title="FRM-02593 — Billing Compliance Sign-off"
            department="Client Billing & Revenue Operations | Revenue Assurance & Controls"
          >

          {/* 1. Reference Details */}
          <div className="form-section">
            <h3 className="form-section-title">Reference Details</h3>
            <div className="form-fields">
              {field(values,"signoffReferenceNo","Sign-off Reference No")}
              {field(values,"periodCovered","Period Covered")}
              {field(values,"businessUnit","Business Unit")}
              {field(values,"preparedBy","Prepared By")}
              {field(values,"date","Date","date")}
            </div>
          </div>

          {/* 2. Scope of Compliance Review */}
          <div className="form-section">
            <h3 className="form-section-title">Scope of Compliance Review</h3>
            <div className="form-fields">
              {field(values,"processesReviewed","Processes Reviewed")}
              {field(values,"systemsCovered","Systems Covered")}
              {field(values,"policiesReferenced","Policies Referenced")}
              {field(values,"reviewMethodology","Review Methodology")}
            </div>
          </div>

          {/* 3. Compliance Assessment */}
          <div className="form-section">
            <h3 className="form-section-title">Compliance Assessment</h3>
            <div className="form-fields">

              <div className="form-field">
                <label className="form-label">Overall Compliance Status</label>
                {!isPrintMode ? (
                  <Field as="select" name="overallComplianceStatus" className="form-input">
                    <option value="">Select</option>
                    <option>Compliant</option>
                    <option>Partially Compliant</option>
                    <option>Non-Compliant</option>
                  </Field>
                ) : (
                  <div className="print-value">
                    {values.overallComplianceStatus || "_________"}
                  </div>
                )}
              </div>

              {field(values,"keyFindings","Key Findings")}
              {field(values,"exceptionsNoted","Exceptions Noted")}
              {field(values,"riskLevel","Risk Level")}
            </div>
          </div>

          {/* 4. Recommendations */}
          <div className="form-section">
            <h3 className="form-section-title">Recommendations</h3>
            <div className="form-fields">
              {field(values,"correctiveActions","Corrective Actions")}
              {field(values,"processImprovements","Process Improvements")}
              {field(values,"followUpRequired","Follow-up Required")}
            </div>
          </div>

          <FormAttachments values={values}/>
          <FormCustomFields values={values}/>

          {/* 5. Final Sign-off */}
          <div className="form-section">
            <h3 className="form-section-title">Final Sign-off</h3>

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

            {field(values,"approvalDate","Approval Date","date")}
            {field(values,"comments","Comments")}
          </div>

          {!isPrintMode &&
            <div className="form-actions">
              <button type="submit" className="btn-submit">
                Submit Compliance Sign-off
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

export default FRM02593_BillingComplianceSignOff;