// FRM00982_TDSPaymentProofLog.jsx
// FRM-00982 – TDS Payment Proof Log
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
  cin: Yup.string().required("Required"),
  totalAmountPaid: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00982",
  date: "",
  department: "Tax & Statutory (India)",
  function: "Income Tax – TDS/TCS",
  referenceNumber: "",
  location: "",
  financialYear: "",
  period: "",

  /* Payment Details */
  cin: "",
  bsrCode: "",
  challanDate: "",
  bankName: "",
  sectionCode: "",

  /* Amount Details */
  taxAmount: "",
  currency: "",
  interestAmount: "",
  penaltyAmount: "",
  totalAmountPaid: "",

  /* Proof Details */
  proofDocumentAttached: "",
  documentReference: "",
  uploadedBy: "",
  uploadDate: "",

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

const FRM00982_TDSPaymentProofLog = () => {

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
      formId="FRM-00982"
      title="TDS Payment Proof Log"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("TDS Payment Proof Log Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00982"
              title="TDS PAYMENT PROOF LOG"
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
                  {field(values,"period","Period")}
                </div>
              </div>

              {/* PAYMENT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Payment Details</h3>
                <div className="form-fields">
                  {field(values,"cin","Challan Identification Number (CIN)")}
                  {field(values,"bsrCode","BSR Code")}
                  {field(values,"challanDate","Challan Date","date")}
                  {field(values,"bankName","Bank Name")}
                  {field(values,"sectionCode","Section Code")}
                </div>
              </div>

              {/* AMOUNT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Amount Details</h3>
                <div className="form-fields">
                  {field(values,"taxAmount","Tax Amount","number")}
                  {field(values,"currency","Currency")}
                  {field(values,"interestAmount","Interest Amount","number")}
                  {field(values,"penaltyAmount","Penalty Amount","number")}
                  {field(values,"totalAmountPaid","Total Amount Paid","number")}
                </div>
              </div>

              {/* PROOF DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Proof Details</h3>
                <div className="form-fields">
                  <div className="form-field">
                    <label className="form-label">Proof Document Attached</label>
                    {isPrintMode ? (
                      <div className="print-value">{values.proofDocumentAttached || "_________"}</div>
                    ) : (
                      <Field as="select" name="proofDocumentAttached" className="form-input">
                        <option value="">Select</option>
                        <option>Yes</option>
                        <option>No</option>
                      </Field>
                    )}
                  </div>

                  {field(values,"documentReference","Document Reference")}
                  {field(values,"uploadedBy","Uploaded By")}
                  {field(values,"uploadDate","Upload Date","date")}
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
                    Submit TDS Payment Proof Log
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

export default FRM00982_TDSPaymentProofLog;