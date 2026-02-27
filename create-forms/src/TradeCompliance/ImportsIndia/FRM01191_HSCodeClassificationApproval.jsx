// FRM01191_HSCodeClassificationApproval.jsx
// FRM-01191 – HS Code Classification Approval
// Enterprise Grade – Trade Compliance – Imports (India)

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
  productName: Yup.string().required("Required"),
  proposedHsCode: Yup.string().required("Required"),
  approvalStatus: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01191",
  date: "",
  department: "Trade Compliance",
  function: "Imports (India)",
  referenceNumber: "",
  location: "",
  businessUnit: "",
  requestedBy: "",

  productName: "",
  productDescription: "",
  manufacturer: "",
  countryOfOrigin: "",
  materialComposition: "",

  proposedHsCode: "",
  hsCodeDescription: "",
  basisOfClassification: "",
  supportingReferences: "",

  dutyRate: "",
  restrictionsConditions: "",
  licensingRequirement: "",
  complianceRemarks: "",

  approvalStatus: "",
  approvedHsCode: "",
  conditions: "",
  decisionComments: "",

  approvalRoles: [
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01191_HSCodeClassificationApproval = () => {

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
      formId="FRM-01191"
      title="HS Code Classification Approval"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("HS Code Classification Approval Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01191"
              title="HS CODE CLASSIFICATION APPROVAL"
              department="Trade Compliance – Imports (India)"
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
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"requestedBy","Requested By")}
                </div>
              </div>

              {/* PRODUCT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Product Details</h3>
                <div className="form-fields">
                  {field(values,"productName","Product Name")}
                  {field(values,"productDescription","Product Description")}
                  {field(values,"manufacturer","Manufacturer")}
                  {field(values,"countryOfOrigin","Country of Origin")}
                  {field(values,"materialComposition","Material Composition")}
                </div>
              </div>

              {/* CLASSIFICATION DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Classification Details</h3>
                <div className="form-fields">
                  {field(values,"proposedHsCode","Proposed HS Code")}
                  {field(values,"hsCodeDescription","HS Code Description")}
                  {field(values,"basisOfClassification","Basis of Classification")}
                  {field(values,"supportingReferences","Supporting References")}
                </div>
              </div>

              {/* COMPLIANCE CHECK */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Check</h3>
                <div className="form-fields">
                  {field(values,"dutyRate","Duty Rate")}
                  {field(values,"restrictionsConditions","Restrictions / Conditions")}
                  {field(values,"licensingRequirement","Licensing Requirement")}
                  {field(values,"complianceRemarks","Remarks")}
                </div>
              </div>

              {/* DECISION */}
              <div className="form-section">
                <h3 className="form-section-title">Decision</h3>
                <div className="form-fields">
                  {field(values,"approvalStatus","Approval Status")}
                  {field(values,"approvedHsCode","Approved HS Code")}
                  {field(values,"conditions","Conditions")}
                  {field(values,"decisionComments","Comments")}
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
                        <button type="button" className="btn-submit"
                          onClick={()=>push({ roleName:"New Role", data:{} })}>
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
                    Submit HS Code Classification Approval
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

export default FRM01191_HSCodeClassificationApproval;