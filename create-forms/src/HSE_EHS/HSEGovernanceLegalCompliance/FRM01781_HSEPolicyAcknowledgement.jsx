// FRM01781_HSEPolicyAcknowledgement.jsx
// FRM-01781 – HSE Policy Acknowledgement
// Enterprise Grade – HSE Governance & Legal Compliance

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
  department: Yup.string().required("Required"),
  employeeName: Yup.string().required("Required"),
  employeeId: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01781",
  date: "",
  department: "HSE / EHS",
  businessUnit: "",
  siteLocation: "",
  policyVersion: "",
  effectiveDate: "",
  status: "",

  companyName: "",
  corporateOfficeAddress: "",
  plantSiteName: "",
  hseOfficerName: "",

  employeeName: "",
  employeeId: "",
  designation: "",
  employeeDepartment: "",
  dateOfJoining: "",
  workLocation: "",

  policyReceiptConfirmation: "",
  policyUnderstandingConfirmation: "",
  complianceCommitment: "",

  inductionCompleted: "",
  lastTrainingDate: "",
  policyExplainedBy: "",
  communicationMode: "",

  applicableLegislation: "",
  regulatoryAuthority: "",
  internalPolicyReferenceNumber: "",

  policyCopyAttached: "",
  trainingSheetAttached: "",
  uploadReferenceId: "",

  approvalRoles: [
    { roleName: "Employee Signature", data: {} },
    { roleName: "Reviewed By (HSE Officer)", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01781_HSEPolicyAcknowledgement = () => {

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
      formId="FRM-01781"
      title="HSE Policy Acknowledgement"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("HSE Policy Acknowledgement Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01781"
              title="HSE POLICY ACKNOWLEDGEMENT"
              department="HSE / EHS – Governance & Legal Compliance"
            >

              {/* General Information */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"date","Date","date")}
                  {field(values,"department","Department")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"siteLocation","Site / Location")}
                  {field(values,"policyVersion","Policy Version")}
                  {field(values,"effectiveDate","Effective Date","date")}
                  {field(values,"status","Status")}
                </div>
              </div>

              {/* Organization Details */}
              <div className="form-section">
                <h3 className="form-section-title">Organization Details</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"corporateOfficeAddress","Corporate Office Address")}
                  {field(values,"plantSiteName","Plant / Site Name")}
                  {field(values,"hseOfficerName","HSE Officer Name")}
                </div>
              </div>

              {/* Employee Details */}
              <div className="form-section">
                <h3 className="form-section-title">Employee Details</h3>
                <div className="form-fields">
                  {field(values,"employeeName","Employee Name")}
                  {field(values,"employeeId","Employee ID")}
                  {field(values,"designation","Designation")}
                  {field(values,"employeeDepartment","Department")}
                  {field(values,"dateOfJoining","Date of Joining","date")}
                  {field(values,"workLocation","Work Location")}
                </div>
              </div>

              {/* Policy Acknowledgement Statement */}
              <div className="form-section">
                <h3 className="form-section-title">Policy Acknowledgement Statement</h3>
                <div className="form-fields">
                  {field(values,"policyReceiptConfirmation","Confirmation of Receipt of HSE Policy")}
                  {field(values,"policyUnderstandingConfirmation","Confirmation of Understanding of HSE Requirements")}
                  {field(values,"complianceCommitment","Commitment to Comply with HSE Rules & Legal Obligations")}
                </div>
              </div>

              {/* Training & Communication */}
              <div className="form-section">
                <h3 className="form-section-title">Training & Communication</h3>
                <div className="form-fields">
                  {field(values,"inductionCompleted","HSE Induction Completed (Yes/No)")}
                  {field(values,"lastTrainingDate","Last HSE Training Date","date")}
                  {field(values,"policyExplainedBy","Policy Explained By")}
                  {field(values,"communicationMode","Mode of Communication")}
                </div>
              </div>

              {/* Legal & Compliance Reference */}
              <div className="form-section">
                <h3 className="form-section-title">Legal & Compliance Reference</h3>
                <div className="form-fields">
                  {field(values,"applicableLegislation","Applicable HSE Legislation")}
                  {field(values,"regulatoryAuthority","Regulatory Authority")}
                  {field(values,"internalPolicyReferenceNumber","Internal HSE Policy Reference Number")}
                </div>
              </div>

             {/* Custom Fields */}
              <FormCustomFields values={values}/> 
             {/* Attachments */}
               <div className="form-section">
              <FormAttachments values={values}/>
                <div className="form-fields">
                  {field(values,"policyCopyAttached","Policy Copy Attached (Yes/No)")}
                  {field(values,"trainingSheetAttached","Training Attendance Sheet Attached (Yes/No)")}
                  {field(values,"uploadReferenceId","Upload Reference ID")}
                </div>
              </div>
        
              {/* Approval Section */}
              <div className="form-section">
                <h3 className="form-section-title">Approval</h3>

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
                              <button
                                type="button"
                                onClick={()=>remove(index)}
                              >
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
                    Submit HSE Policy Acknowledgement
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

export default FRM01781_HSEPolicyAcknowledgement;