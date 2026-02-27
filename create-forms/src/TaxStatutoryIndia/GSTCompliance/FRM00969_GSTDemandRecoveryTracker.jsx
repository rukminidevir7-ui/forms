// FRM00969_GSTDemandRecoveryTracker.jsx
// FRM-00969 – GST Demand / Recovery Tracker
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
  demandId: Yup.string().required("Required"),
  taxAmount: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00969",
  date: "",
  department: "Tax & Statutory (India)",
  function: "GST Compliance",
  referenceNumber: "",
  location: "",

  /* Demand Details */
  demandId: "",
  noticeReferenceNumber: "",
  demandDate: "",
  issuingAuthority: "",
  sectionRule: "",

  /* Financial Details */
  taxAmount: "",
  currency: "",
  interestAmount: "",
  penaltyAmount: "",
  totalDemand: "",
  recoveredAmount: "",
  outstandingAmount: "",

  /* Recovery Tracking */
  recoveryStatus: "",
  priority: "",
  assignedTo: "",
  targetClosureDate: "",
  recoveryNotes: "",
  actualClosureDate: "",

  /* Additional Notes */
  notes: "",
  comments: "",
  supportingReference: "",

  /* Authorization Roles */
  approvalRoles: [
    { roleName: "Logged By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM00969_GSTDemandRecoveryTracker = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type = "text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : <>
            <Field name={name} type={type} className="form-input" />
            <ErrorMessage name={name} component="div" className="form-error" />
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper
      formId="FRM-00969"
      title="GST Demand / Recovery Tracker"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("GST Demand / Recovery Tracker Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00969"
              title="GST DEMAND / RECOVERY TRACKER"
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
                </div>
              </div>

              {/* DEMAND DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Demand Details</h3>
                <div className="form-fields">
                  {field(values,"demandId","Demand ID")}
                  {field(values,"noticeReferenceNumber","Notice Reference Number")}
                  {field(values,"demandDate","Demand Date","date")}
                  {field(values,"issuingAuthority","Issuing Authority")}
                  {field(values,"sectionRule","Section / Rule")}
                </div>
              </div>

              {/* FINANCIAL DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Financial Details</h3>
                <div className="form-fields">
                  {field(values,"taxAmount","Tax Amount","number")}
                  {field(values,"currency","Currency")}
                  {field(values,"interestAmount","Interest Amount","number")}
                  {field(values,"penaltyAmount","Penalty Amount","number")}
                  {field(values,"totalDemand","Total Demand","number")}
                  {field(values,"recoveredAmount","Recovered Amount","number")}
                  {field(values,"outstandingAmount","Outstanding Amount","number")}
                </div>
              </div>

              {/* RECOVERY TRACKING */}
              <div className="form-section">
                <h3 className="form-section-title">Recovery Tracking</h3>
                <div className="form-fields">
                  {field(values,"recoveryStatus","Recovery Status")}
                  {field(values,"priority","Priority")}
                  {field(values,"assignedTo","Assigned To")}
                  {field(values,"targetClosureDate","Target Closure Date","date")}
                  {field(values,"recoveryNotes","Recovery Notes")}
                  {field(values,"actualClosureDate","Actual Closure Date","date")}
                </div>
              </div>

              {/* NOTES */}
              <div className="form-section">
                <h3 className="form-section-title">Notes</h3>
                <div className="form-fields">
                  {field(values,"notes","Notes")}
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
                          onClick={() => push({ roleName: "New Role", data: {} })}
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
                    Submit GST Demand / Recovery Tracker
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

export default FRM00969_GSTDemandRecoveryTracker;