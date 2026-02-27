// FRM00988_LowerNilDeductionCertificateRegister.jsx
// FRM-00988 – Lower/Nil Deduction Certificate Register
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
  financialYear: Yup.string().required("Required"),
  tan: Yup.string().required("Required"),
  deducteeName: Yup.string().required("Required"),
  certificateNumber: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00988",
  date: "",
  department: "Tax & Statutory (India)",
  function: "Income Tax – TDS/TCS",
  referenceNumber: "",
  location: "",
  financialYear: "",
  tan: "",

  /* Certificate Details */
  deducteeName: "",
  pan: "",
  certificateNumber: "",
  section: "",
  certificateType: "",
  rateSpecified: "",
  issueDate: "",
  validityFrom: "",
  validityTo: "",

  /* Utilization Details */
  totalAmountCovered: "",
  amountUtilized: "",
  balanceAmount: "",
  status: "",

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

const FRM00988_LowerNilDeductionCertificateRegister = () => {

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
      formId="FRM-00988"
      title="Lower/Nil Deduction Certificate Register"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Lower/Nil Deduction Certificate Register Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00988"
              title="LOWER/NIL DEDUCTION CERTIFICATE REGISTER"
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

              {/* CERTIFICATE DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Certificate Details</h3>
                <div className="form-fields">
                  {field(values,"deducteeName","Deductee Name")}
                  {field(values,"pan","PAN")}
                  {field(values,"certificateNumber","Certificate Number")}
                  {field(values,"section","Section")}
                  
                  <div className="form-field">
                    <label className="form-label">Certificate Type</label>
                    {isPrintMode ? (
                      <div className="print-value">{values.certificateType || "_________"}</div>
                    ) : (
                      <Field as="select" name="certificateType" className="form-input">
                        <option value="">Select</option>
                        <option>Lower</option>
                        <option>Nil</option>
                      </Field>
                    )}
                  </div>

                  {field(values,"rateSpecified","Rate Specified (%)","number")}
                  {field(values,"issueDate","Issue Date","date")}
                  {field(values,"validityFrom","Validity From","date")}
                  {field(values,"validityTo","Validity To","date")}
                </div>
              </div>

              {/* UTILIZATION DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Utilization Details</h3>
                <div className="form-fields">
                  {field(values,"totalAmountCovered","Total Amount Covered","number")}
                  {field(values,"amountUtilized","Amount Utilized","number")}
                  {field(values,"balanceAmount","Balance Amount","number")}

                  <div className="form-field">
                    <label className="form-label">Status</label>
                    {isPrintMode ? (
                      <div className="print-value">{values.status || "_________"}</div>
                    ) : (
                      <Field as="select" name="status" className="form-input">
                        <option value="">Select</option>
                        <option>Active</option>
                        <option>Expired</option>
                        <option>Utilized</option>
                      </Field>
                    )}
                  </div>

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
                          onClick={()=>push({ roleName:"New Role", data:{} })}
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
                              onRoleNameChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.roleName`,val)
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
                    Submit Lower/Nil Deduction Certificate Register
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

export default FRM00988_LowerNilDeductionCertificateRegister;