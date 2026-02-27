// FRM00981_TDSDeductionWorking.jsx
// FRM-00981 – TDS Deduction Working
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
  deducteeName: Yup.string().required("Required"),
  pan: Yup.string().required("Required"),
  grossAmount: Yup.string().required("Required"),
  totalTDSDeducted: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00981",
  date: "",
  department: "Tax & Statutory (India)",
  function: "Income Tax – TDS/TCS",
  periodFrom: "",
  periodTo: "",
  referenceNumber: "",
  location: "",

  /* Deductee Details */
  deducteeName: "",
  pan: "",
  category: "",
  natureOfPayment: "",

  /* Payment Details */
  paymentReference: "",
  paymentDate: "",
  grossAmount: "",
  currency: "",

  /* TDS Calculation */
  applicableSection: "",
  tdsRate: "",
  tdsAmount: "",
  surchargeCess: "",
  totalTDSDeducted: "",

  /* Deposit Details */
  challanReference: "",
  depositDate: "",
  bankName: "",

  /* Notes */
  remarks: "",
  supportingReference: "",

  /* Authorization */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM00981_TDSDeductionWorking = () => {

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
      formId="FRM-00981"
      title="TDS Deduction Working"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("TDS Deduction Working Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00981"
              title="TDS DEDUCTION WORKING"
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
                  {field(values,"periodFrom","Period From","date")}
                  {field(values,"periodTo","Period To","date")}
                  {field(values,"referenceNumber","Reference Number")}
                  {field(values,"location","Location")}
                </div>
              </div>

              {/* DEDUCTEE DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Deductee Details</h3>
                <div className="form-fields">
                  {field(values,"deducteeName","Deductee Name")}
                  {field(values,"pan","PAN")}
                  {field(values,"category","Category (Individual/Company/etc.)")}
                  {field(values,"natureOfPayment","Nature of Payment")}
                </div>
              </div>

              {/* PAYMENT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Payment Details</h3>
                <div className="form-fields">
                  {field(values,"paymentReference","Invoice / Payment Reference")}
                  {field(values,"paymentDate","Payment Date","date")}
                  {field(values,"grossAmount","Gross Amount","number")}
                  {field(values,"currency","Currency")}
                </div>
              </div>

              {/* TDS CALCULATION */}
              <div className="form-section">
                <h3 className="form-section-title">TDS Calculation</h3>
                <div className="form-fields">
                  {field(values,"applicableSection","Applicable Section")}
                  {field(values,"tdsRate","TDS Rate (%)","number")}
                  {field(values,"tdsAmount","TDS Amount","number")}
                  {field(values,"surchargeCess","Surcharge / Cess","number")}
                  {field(values,"totalTDSDeducted","Total TDS Deducted","number")}
                </div>
              </div>

              {/* DEPOSIT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Deposit Details</h3>
                <div className="form-fields">
                  {field(values,"challanReference","Challan Reference")}
                  {field(values,"depositDate","Deposit Date","date")}
                  {field(values,"bankName","Bank Name")}
                </div>
              </div>

              {/* NOTES */}
              <div className="form-section">
                <h3 className="form-section-title">Notes</h3>
                <div className="form-fields">
                  {field(values,"remarks","Remarks")}
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
                    Submit TDS Deduction Working
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

export default FRM00981_TDSDeductionWorking;