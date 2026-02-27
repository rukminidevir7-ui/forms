// FRM00990_TDSDemandTracker.jsx
// FRM-00990 – TDS Demand Tracker
// Enterprise Grade – Tax & Statutory (India) – Income Tax (TDS/TCS)

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
  tan: Yup.string().required("Required"),
  totalDemand: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00990",
  date: "",
  department: "Tax & Statutory (India)",
  function: "Income Tax – TDS/TCS",
  referenceNumber: "",
  location: "",
  financialYear: "",
  tan: "",

  /* Demand Details */
  demandId: "",
  noticeReferenceNumber: "",
  demandDate: "",
  section: "",
  issuingAuthority: "",

  /* Financial Details */
  taxAmount: "",
  currency: "",
  interestAmount: "",
  penaltyAmount: "",
  totalDemand: "",
  amountPaid: "",
  outstandingAmount: "",

  /* Tracking Details */
  demandStatus: "",
  priority: "",
  assignedTo: "",
  targetClosureDate: "",
  actualClosureDate: "",

  /* Notes */
  remarks: "",

  /* Authorization */
  approvalRoles: [
    { roleName: "Logged By", data: {} },
    { roleName: "Reviewed By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM00990_TDSDemandTracker = () => {

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
      formId="FRM-00990"
      title="TDS Demand Tracker"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("TDS Demand Tracker Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00990"
              title="TDS DEMAND TRACKER"
              department="Tax & Statutory (India) – Income Tax (TDS/TCS)"
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
                  {field(values,"financialYear","Financial Year")}
                  {field(values,"tan","TAN")}
                </div>
              </div>

              {/* DEMAND DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Demand Details</h3>
                <div className="form-fields">
                  {field(values,"demandId","Demand ID")}
                  {field(values,"noticeReferenceNumber","Notice Reference Number")}
                  {field(values,"demandDate","Demand Date","date")}
                  {field(values,"section","Section")}
                  {field(values,"issuingAuthority","Issuing Authority")}
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
                  {field(values,"amountPaid","Amount Paid","number")}
                  {field(values,"outstandingAmount","Outstanding Amount","number")}
                </div>
              </div>

              {/* TRACKING DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Tracking Details</h3>
                <div className="form-fields">

                  <div className="form-field">
                    <label className="form-label">Demand Status</label>
                    {isPrintMode ? (
                      <div className="print-value">{values.demandStatus || "_________"}</div>
                    ) : (
                      <Field as="select" name="demandStatus" className="form-input">
                        <option value="">Select</option>
                        <option>Open</option>
                        <option>Under Review</option>
                        <option>Closed</option>
                      </Field>
                    )}
                  </div>

                  <div className="form-field">
                    <label className="form-label">Priority</label>
                    {isPrintMode ? (
                      <div className="print-value">{values.priority || "_________"}</div>
                    ) : (
                      <Field as="select" name="priority" className="form-input">
                        <option value="">Select</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Critical</option>
                      </Field>
                    )}
                  </div>

                  {field(values,"assignedTo","Assigned To")}
                  {field(values,"targetClosureDate","Target Closure Date","date")}
                  {field(values,"actualClosureDate","Actual Closure Date","date")}
                </div>
              </div>

              {/* NOTES */}
              <div className="form-section">
                <h3 className="form-section-title">Notes</h3>
                <div className="form-fields">
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
                      {!isPrintMode && (
                        <button type="button" className="btn-submit"
                          onClick={()=>push({ roleName:"New Role", data:{} })}>
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
                              onRoleNameChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.roleName`,val)
                              }
                              onChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.data`,val)
                              }
                            />
                            {!isPrintMode && (
                              <button type="button"
                                className="btn-remove-role"
                                onClick={()=>remove(index)}>
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
                    Submit TDS Demand Tracker
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

export default FRM00990_TDSDemandTracker;