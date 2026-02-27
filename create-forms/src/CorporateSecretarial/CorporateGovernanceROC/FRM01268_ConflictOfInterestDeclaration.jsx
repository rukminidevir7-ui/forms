// FRM01268_ConflictOfInterestDeclaration.jsx
// Conflict of Interest Declaration – Universal Form
// Enterprise Grade – Corporate & Secretarial – Governance & ROC

import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
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
  name: Yup.string().required("Required"),
  natureOfConflict: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01268",
  department: "Corporate & Secretarial",
  function: "Corporate Governance & ROC",

  formReferenceNo: "",
  companyName: "",
  cin: "",
  departmentName: "",
  declarationDate: "",
  preparedBy: "",

  name: "",
  employeeDirectorId: "",
  designation: "",
  declarantDepartment: "",
  contactDetails: "",

  natureOfConflict: "",
  relatedPartyEntityName: "",
  relationshipDescription: "",
  transactionSituationDescription: "",
  potentialImpact: "",
  mitigationMeasuresProposed: "",

  declarationConfirmation: "",

  supportingDocuments: "",
  disclosureForms: "",
  otherSupportingDocuments: "",

  comments: "",

  approvalRoles: [
    { roleName: "Declared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01268_ConflictOfInterestDeclaration = () => {

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
      formId="FRM-01268"
      title="Conflict of Interest Declaration"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Conflict of Interest Declaration Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01268"
              title="CONFLICT OF INTEREST DECLARATION"
              department="Corporate & Secretarial – Governance & ROC"
            >

              {/* GENERAL INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">1. General Information</h3>
                <div className="form-fields">
                  {field(values,"formReferenceNo","Form Reference No")}
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"departmentName","Department")}
                  {field(values,"declarationDate","Declaration Date","date")}
                  {field(values,"preparedBy","Prepared By")}
                </div>
              </div>

              {/* DECLARANT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">2. Declarant Details</h3>
                <div className="form-fields">
                  {field(values,"name","Name")}
                  {field(values,"employeeDirectorId","Employee / Director ID")}
                  {field(values,"designation","Designation")}
                  {field(values,"declarantDepartment","Department")}
                  {field(values,"contactDetails","Contact Details")}
                </div>
              </div>

              {/* CONFLICT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">3. Conflict Details</h3>
                <div className="form-fields">
                  {field(values,"natureOfConflict","Nature of Conflict")}
                  {field(values,"relatedPartyEntityName","Related Party / Entity Name")}
                  {field(values,"relationshipDescription","Relationship Description")}
                  {field(values,"transactionSituationDescription","Transaction / Situation Description")}
                  {field(values,"potentialImpact","Potential Impact")}
                  {field(values,"mitigationMeasuresProposed","Mitigation Measures Proposed")}
                </div>
              </div>

              {/* DECLARATION */}
              <div className="form-section">
                <h3 className="form-section-title">4. Declaration</h3>
                <div className="form-fields">
                  <div className="form-field">
                    <label className="form-label">
                      I confirm that the information provided is true and complete to the best of my knowledge
                    </label>
                    {isPrintMode
                      ? <div className="print-value">
                          {values.declarationConfirmation ? "Confirmed" : "Not Confirmed"}
                        </div>
                      :
                        <Field
                          type="checkbox"
                          name="declarationConfirmation"
                        />
                    }
                  </div>
                </div>
              </div>

              {/* ATTACHMENTS */}
              <div className="form-section">
                <h3 className="form-section-title">5. Attachments</h3>
                <div className="form-fields">
                  {field(values,"supportingDocuments","Supporting Documents")}
                  {field(values,"disclosureForms","Disclosure Forms")}
                  {field(values,"otherSupportingDocuments","Other Supporting Documents")}
                </div>
              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* REVIEW & APPROVAL */}
              <div className="form-section">
                <h3 className="form-section-title">6. Review and Approval</h3>

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

                <div className="form-fields" style={{ marginTop: 20 }}>
                  {field(values,"comments","Comments")}
                </div>

              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Conflict Declaration
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

export default FRM01268_ConflictOfInterestDeclaration;