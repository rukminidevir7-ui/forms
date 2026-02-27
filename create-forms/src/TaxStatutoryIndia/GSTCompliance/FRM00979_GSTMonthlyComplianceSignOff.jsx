// FRM00979_GSTMonthlyComplianceSignOff.jsx
// FRM-00979 – GST Monthly Compliance Sign-Off
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
  compliancePeriod: Yup.string().required("Required"),
  gstin: Yup.string().required("Required"),
  totalTaxLiability: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00979",
  date: "",
  department: "Tax & Statutory (India)",
  function: "GST Compliance",
  compliancePeriod: "",
  financialYear: "",
  referenceNumber: "",
  location: "",
  gstin: "",
  legalName: "",

  /* Compliance Summary */
  returnsFiled: "",
  taxPaymentsCompleted: "",
  reconciliationsCompleted: "",
  itcReviewCompleted: "",
  eInvoiceComplianceVerified: "",
  eWayBillComplianceVerified: "",

  /* Key Metrics */
  totalTaxLiability: "",
  currency: "",
  itcAvailed: "",
  netTaxPaid: "",

  /* Outstanding Issues */
  exceptionsNotes: "",
  keyExceptions: "",
  riskAreas: "",
  remarks: "",

  /* Declaration */
  declarationStatement: "",

  /* Authorization */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM00979_GSTMonthlyComplianceSignOff = () => {

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
      formId="FRM-00979"
      title="GST Monthly Compliance Sign-Off"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("GST Monthly Compliance Sign-Off Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00979"
              title="GST MONTHLY COMPLIANCE SIGN-OFF"
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
                  {field(values,"compliancePeriod","Compliance Period (Month)")}
                  {field(values,"financialYear","Financial Year")}
                  {field(values,"referenceNumber","Reference Number")}
                  {field(values,"location","Location")}
                  {field(values,"gstin","GSTIN")}
                  {field(values,"legalName","Legal Name")}
                </div>
              </div>

              {/* COMPLIANCE SUMMARY */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Summary</h3>
                <div className="form-fields">
                  {field(values,"returnsFiled","Returns Filed (GSTR-1 / GSTR-3B etc.)")}
                  {field(values,"taxPaymentsCompleted","Tax Payments Completed")}
                  {field(values,"reconciliationsCompleted","Reconciliations Completed")}
                  {field(values,"itcReviewCompleted","ITC Review Completed")}
                  {field(values,"eInvoiceComplianceVerified","E-Invoice Compliance Verified")}
                  {field(values,"eWayBillComplianceVerified","E-Way Bill Compliance Verified")}
                </div>
              </div>

              {/* KEY METRICS */}
              <div className="form-section">
                <h3 className="form-section-title">Key Metrics</h3>
                <div className="form-fields">
                  {field(values,"totalTaxLiability","Total Tax Liability","number")}
                  {field(values,"currency","Currency")}
                  {field(values,"itcAvailed","ITC Availed","number")}
                  {field(values,"netTaxPaid","Net Tax Paid","number")}
                </div>
              </div>

              {/* OUTSTANDING ISSUES */}
              <div className="form-section">
                <h3 className="form-section-title">Outstanding Issues</h3>
                <div className="form-fields">
                  {field(values,"exceptionsNotes","Exceptions / Notes")}
                  {field(values,"keyExceptions","Key Exceptions")}
                  {field(values,"riskAreas","Risk Areas")}
                  {field(values,"remarks","Remarks")}
                </div>
              </div>

              {/* DECLARATION */}
              <div className="form-section">
                <h3 className="form-section-title">Declaration</h3>
                <div className="form-fields">
                  {field(values,"declarationStatement","Declaration Statement")}
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
                    Submit GST Monthly Compliance Sign-Off
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

export default FRM00979_GSTMonthlyComplianceSignOff;