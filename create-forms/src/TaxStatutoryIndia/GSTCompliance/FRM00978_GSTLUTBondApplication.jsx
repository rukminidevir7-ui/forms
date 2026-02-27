// FRM00978_GSTLUTBondApplication.jsx
// FRM-00978 – GST LUT / Bond Application (Request / Initiation)
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
  applicationType: Yup.string().required("Required"),
  financialYear: Yup.string().required("Required"),
  legalNameOfBusiness: Yup.string().required("Required"),
  gstin: Yup.string().required("Required"),
  estimatedExportValue: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00978",
  date: "",
  department: "Tax & Statutory (India)",
  function: "GST Compliance",
  referenceNumber: "",
  location: "",

  applicationType: "",
  financialYear: "",

  /* Applicant Details */
  legalNameOfBusiness: "",
  tradeName: "",
  gstin: "",
  pan: "",
  businessAddress: "",
  contactPerson: "",
  phone: "",
  email: "",

  /* Application Details */
  reasonForApplication: "",
  exportType: "",
  estimatedExportValue: "",
  currency: "",
  previousReference: "",

  /* Declaration */
  declarationStatement: "",

  /* Attachments */
  supportingDocumentsAttached: "",
  documentReference: "",

  /* Authorization */
  approvalRoles: [
    { roleName: "Requested By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM00978_GSTLUTBondApplication = () => {

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
      formId="FRM-00978"
      title="GST LUT / Bond Application"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("GST LUT / Bond Application Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00978"
              title="GST LUT / BOND APPLICATION (REQUEST / INITIATION)"
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
                  {field(values,"applicationType","Application Type (LUT/Bond)")}
                  {field(values,"financialYear","Financial Year")}
                </div>
              </div>

              {/* APPLICANT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Applicant Details</h3>
                <div className="form-fields">
                  {field(values,"legalNameOfBusiness","Legal Name of Business")}
                  {field(values,"tradeName","Trade Name")}
                  {field(values,"gstin","GSTIN")}
                  {field(values,"pan","PAN")}
                  {field(values,"businessAddress","Business Address")}
                  {field(values,"contactPerson","Contact Person")}
                  {field(values,"phone","Phone")}
                  {field(values,"email","Email","email")}
                </div>
              </div>

              {/* APPLICATION DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Application Details</h3>
                <div className="form-fields">
                  {field(values,"reasonForApplication","Reason for Application")}
                  {field(values,"exportType","Export Type (Goods/Services)")}
                  {field(values,"estimatedExportValue","Estimated Export Value","number")}
                  {field(values,"currency","Currency")}
                  {field(values,"previousReference","Previous LUT/Bond Reference (if any)")}
                </div>
              </div>

              {/* DECLARATION */}
              <div className="form-section">
                <h3 className="form-section-title">Declaration</h3>
                <div className="form-fields">
                  {field(values,"declarationStatement","Declaration Statement")}
                </div>
              </div>

              {/* ATTACHMENTS */}
              <div className="form-section">
                <h3 className="form-section-title">Attachments</h3>
                <div className="form-fields">
                  {field(values,"supportingDocumentsAttached","Supporting Documents Attached (Yes/No)")}
                  {field(values,"documentReference","Document Reference")}
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
                    Submit GST LUT / Bond Application
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

export default FRM00978_GSTLUTBondApplication;