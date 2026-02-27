// FRM00970_HSNSACClassificationApproval.jsx
// FRM-00970 – HSN/SAC Classification Approval
// Enterprise Grade – Tax & Statutory (India) – GST Compliance

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
  referenceNumber: Yup.string().required("Required"),
  itemServiceName: Yup.string().required("Required"),
  proposedHSNSACCode: Yup.string().required("Required"),
  gstRate: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00970",
  date: "",
  department: "Tax & Statutory (India)",
  function: "GST Compliance",
  referenceNumber: "",
  location: "",
  requestReference: "",
  priority: "",

  /* Item / Service Details */
  itemServiceName: "",
  description: "",
  businessUnit: "",
  nature: "",

  /* Classification Details */
  proposedHSNSACCode: "",
  gstRate: "",
  effectiveDate: "",
  basisJustification: "",

  /* Impact Assessment */
  financialImpact: "",
  complianceImpact: "",
  riskAssessment: "",

  /* Remarks */
  comments: "",
  supportingReference: "",

  /* Authorization */
  approvalRoles: [
    { roleName: "Requested By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM00970_HSNSACClassificationApproval = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type = "text") => (
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
      formId="FRM-00970"
      title="HSN/SAC Classification Approval"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("HSN/SAC Classification Approval Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00970"
              title="HSN/SAC CLASSIFICATION APPROVAL"
              department="Tax & Statutory (India) – GST Compliance"
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
                  {field(values,"requestReference","Request Reference")}
                  {field(values,"priority","Priority")}
                </div>
              </div>

              {/* ITEM / SERVICE DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Item / Service Details</h3>
                <div className="form-fields">
                  {field(values,"itemServiceName","Item / Service Name")}
                  {field(values,"description","Description")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"nature","Nature (Goods/Service)")}
                </div>
              </div>

              {/* CLASSIFICATION DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Classification Details</h3>
                <div className="form-fields">
                  {field(values,"proposedHSNSACCode","Proposed HSN/SAC Code")}
                  {field(values,"gstRate","GST Rate (%)","number")}
                  {field(values,"effectiveDate","Effective Date","date")}
                  {field(values,"basisJustification","Basis / Justification")}
                </div>
              </div>

              {/* IMPACT ASSESSMENT */}
              <div className="form-section">
                <h3 className="form-section-title">Impact Assessment</h3>
                <div className="form-fields">
                  {field(values,"financialImpact","Financial Impact")}
                  {field(values,"complianceImpact","Compliance Impact")}
                  {field(values,"riskAssessment","Risk Assessment")}
                </div>
              </div>

              {/* REMARKS */}
              <div className="form-section">
                <h3 className="form-section-title">Remarks</h3>
                <div className="form-fields">
                  {field(values,"comments","Comments")}
                  {field(values,"supportingReference","Supporting Reference")}
                </div>
              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* AUTHORIZATION */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>

                <FieldArray name="approvalRoles">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={()=>push({ roleName: "New Role", data: {} })}
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
                              onRoleNameChange={(newName)=>
                                setFieldValue(`approvalRoles.${index}.roleName`,newName)
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
                    Submit HSN/SAC Classification Approval
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

export default FRM00970_HSNSACClassificationApproval;