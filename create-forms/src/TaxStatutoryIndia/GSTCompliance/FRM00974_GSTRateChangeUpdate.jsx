// FRM00974_GSTRateChangeUpdate.jsx
// FRM-00974 – GST Rate Change Update
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
  currentGSTRate: Yup.string().required("Required"),
  proposedGSTRate: Yup.string().required("Required"),
  effectiveDate: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00974",
  date: "",
  department: "Tax & Statutory (India)",
  function: "GST Compliance",
  referenceNumber: "",
  location: "",
  changeType: "",
  priority: "",

  /* Item / Service Details */
  itemServiceName: "",
  description: "",
  hsnSacCode: "",
  businessUnit: "",

  /* Rate Change Details */
  currentGSTRate: "",
  proposedGSTRate: "",
  effectiveDate: "",
  notificationReference: "",
  reasonForChange: "",

  /* Impact Assessment */
  financialImpact: "",
  systemImpact: "",
  complianceRisk: "",

  /* Implementation Plan */
  updateRequiredInSystems: "",
  responsibleOwner: "",
  targetImplementationDate: "",

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

const FRM00974_GSTRateChangeUpdate = () => {

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
      formId="FRM-00974"
      title="GST Rate Change Update"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("GST Rate Change Update Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00974"
              title="GST RATE CHANGE UPDATE"
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
                  {field(values,"changeType","Change Type")}
                  {field(values,"priority","Priority")}
                </div>
              </div>

              {/* ITEM / SERVICE DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Item / Service Details</h3>
                <div className="form-fields">
                  {field(values,"itemServiceName","Item / Service Name")}
                  {field(values,"description","Description")}
                  {field(values,"hsnSacCode","HSN/SAC Code")}
                  {field(values,"businessUnit","Business Unit")}
                </div>
              </div>

              {/* RATE CHANGE DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Rate Change Details</h3>
                <div className="form-fields">
                  {field(values,"currentGSTRate","Current GST Rate (%)","number")}
                  {field(values,"proposedGSTRate","Proposed GST Rate (%)","number")}
                  {field(values,"effectiveDate","Effective Date","date")}
                  {field(values,"notificationReference","Notification / Circular Reference")}
                  {field(values,"reasonForChange","Reason for Change")}
                </div>
              </div>

              {/* IMPACT ASSESSMENT */}
              <div className="form-section">
                <h3 className="form-section-title">Impact Assessment</h3>
                <div className="form-fields">
                  {field(values,"financialImpact","Financial Impact")}
                  {field(values,"systemImpact","System Impact")}
                  {field(values,"complianceRisk","Compliance Risk")}
                </div>
              </div>

              {/* IMPLEMENTATION PLAN */}
              <div className="form-section">
                <h3 className="form-section-title">Implementation Plan</h3>
                <div className="form-fields">
                  {field(values,"updateRequiredInSystems","Update Required In Systems")}
                  {field(values,"responsibleOwner","Responsible Owner")}
                  {field(values,"targetImplementationDate","Target Implementation Date","date")}
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
                    Submit GST Rate Change Update
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

export default FRM00974_GSTRateChangeUpdate;