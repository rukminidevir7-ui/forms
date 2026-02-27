// FRM01080_EndorsementRequest.jsx
// FRM-01080 – Endorsement Request
// Enterprise Grade – Insurance & Risk Finance – Insurance Management

import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { usePrintMode } from "../PrintModeContext";
import ModernFormWrapper from "../components/ModernFormWrapper";
import ModernA4Template from "../components/ModernA4Template";
import FormAttachments from "../components/FormAttachments";
import FormCustomFields from "../components/FormCustomFields";
import ApprovalSignatureBlock from "../components/ApprovalSignatureBlock";
import "../styles/FRM00611.css";

/* ================= VALIDATION ================= */

const validationSchema = Yup.object({
  policyNumber: Yup.string().required("Required"),
  insurerName: Yup.string().required("Required"),
  endorsementType: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01080",
  date: "",
  department: "Insurance & Risk Finance",
  function: "Insurance Management",
  referenceNumber: "",
  location: "",
  businessUnit: "",
  requestorName: "",

  policyNumber: "",
  insurerName: "",
  policyType: "",
  policyPeriodFrom: "",
  policyPeriodTo: "",

  endorsementType: "",
  descriptionOfChange: "",
  effectiveDate: "",
  reasonForChange: "",

  impactOnCoverage: "",
  impactOnPremium: "",
  complianceImpact: "",
  remarks: "",

  approvalRoles: [
    { roleName: "Requested By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01080_EndorsementRequest = () => {

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
      formId="FRM-01080"
      title="Endorsement Request"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Endorsement Request Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-01080"
              title="ENDORSEMENT REQUEST"
              department="Insurance & Risk Finance – Insurance Management"
            >

              {/* GENERAL INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"date","Date","date")}
                  {field(values,"referenceNumber","Reference Number")}
                  {field(values,"location","Location")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"requestorName","Requestor Name")}
                </div>
              </div>

              {/* POLICY DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Policy Details</h3>
                <div className="form-fields">
                  {field(values,"policyNumber","Policy Number")}
                  {field(values,"insurerName","Insurer Name")}
                  {field(values,"policyType","Policy Type")}
                  {field(values,"policyPeriodFrom","Policy Period From","date")}
                  {field(values,"policyPeriodTo","Policy Period To","date")}
                </div>
              </div>

              {/* ENDORSEMENT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Endorsement Details</h3>
                <div className="form-fields">
                  {field(values,"endorsementType","Type of Endorsement")}
                  {field(values,"descriptionOfChange","Description of Change")}
                  {field(values,"effectiveDate","Effective Date","date")}
                  {field(values,"reasonForChange","Reason for Change")}
                </div>
              </div>

              {/* IMPACT ASSESSMENT */}
              <div className="form-section">
                <h3 className="form-section-title">Impact Assessment</h3>
                <div className="form-fields">
                  {field(values,"impactOnCoverage","Impact on Coverage")}
                  {field(values,"impactOnPremium","Impact on Premium")}
                  {field(values,"complianceImpact","Compliance Impact")}
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
                              allowRoleEdit={!isPrintMode}
                              onRoleNameChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.roleName`,val)}
                              onChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.data`,val)}
                            />
                            {!isPrintMode &&
                              <button
                                type="button"
                                className="btn-remove-role"
                                onClick={()=>remove(index)}
                              >
                                Remove Role
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
                    Submit Endorsement Request
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

export default FRM01080_EndorsementRequest;