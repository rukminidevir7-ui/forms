// FRM00999_AdvanceTaxComputation.jsx
// FRM-00999 – Advance Tax Computation
// Enterprise Grade – Tax & Statutory (India) – Income Tax

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
  financialYear: Yup.string().required("Required"),
  legalName: Yup.string().required("Required"),
  totalEstimatedIncome: Yup.string().required("Required"),
  estimatedTaxLiability: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00999",
  date: "",
  department: "Tax & Statutory (India)",
  function: "Income Tax – Advance Tax",
  financialYear: "",
  assessmentYear: "",
  referenceNumber: "",
  location: "",
  computationType: "",
  priority: "",

  /* Entity Details */
  legalName: "",
  pan: "",
  businessUnit: "",
  preparedFor: "",
  contactPerson: "",
  phone: "",
  email: "",

  /* Income Summary */
  estimatedBusinessIncome: "",
  otherIncome: "",
  totalEstimatedIncome: "",
  deductionsExemptions: "",
  taxableIncome: "",

  /* Tax Calculation */
  applicableTaxRate: "",
  estimatedTaxLiability: "",
  tdsTcsCredit: "",
  netAdvanceTaxPayable: "",

  /* Installments */
  dueDate1: "",
  amount1: "",
  dueDate2: "",
  amount2: "",
  dueDate3: "",
  amount3: "",
  dueDate4: "",
  amount4: "",

  /* Remarks */
  keyAssumptions: "",
  remarks: "",

  /* Attachments */
  supportingDocumentsAttached: "",
  documentReference: "",

  /* Authorization */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM00999_AdvanceTaxComputation = () => {

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
      formId="FRM-00999"
      title="Advance Tax Computation"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Advance Tax Computation Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00999"
              title="ADVANCE TAX COMPUTATION"
              department="Tax & Statutory (India) – Income Tax"
            >

              {/* GENERAL INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"date","Date","date")}
                  {field(values,"department","Department")}
                  {field(values,"function","Function")}
                  {field(values,"financialYear","Financial Year")}
                  {field(values,"assessmentYear","Assessment Year")}
                  {field(values,"referenceNumber","Reference Number")}
                  {field(values,"location","Location")}
                  {field(values,"computationType","Computation Type")}
                  {field(values,"priority","Priority")}
                </div>
              </div>

              {/* ENTITY DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Entity Details</h3>
                <div className="form-fields">
                  {field(values,"legalName","Legal Name")}
                  {field(values,"pan","PAN")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"preparedFor","Prepared For")}
                  {field(values,"contactPerson","Contact Person")}
                  {field(values,"phone","Phone")}
                  {field(values,"email","Email")}
                </div>
              </div>

              {/* INCOME SUMMARY */}
              <div className="form-section">
                <h3 className="form-section-title">Income Summary</h3>
                <div className="form-fields">
                  {field(values,"estimatedBusinessIncome","Estimated Business Income","number")}
                  {field(values,"otherIncome","Other Income","number")}
                  {field(values,"totalEstimatedIncome","Total Estimated Income","number")}
                  {field(values,"deductionsExemptions","Deductions / Exemptions","number")}
                  {field(values,"taxableIncome","Taxable Income","number")}
                </div>
              </div>

              {/* TAX CALCULATION */}
              <div className="form-section">
                <h3 className="form-section-title">Tax Calculation</h3>
                <div className="form-fields">
                  {field(values,"applicableTaxRate","Applicable Tax Rate (%)","number")}
                  {field(values,"estimatedTaxLiability","Estimated Tax Liability","number")}
                  {field(values,"tdsTcsCredit","Less: TDS / TCS Credit","number")}
                  {field(values,"netAdvanceTaxPayable","Net Advance Tax Payable","number")}
                </div>
              </div>

              {/* INSTALLMENT SCHEDULE */}
              <div className="form-section">
                <h3 className="form-section-title">Installment Schedule</h3>
                <div className="form-fields">
                  {field(values,"dueDate1","Due Date 1","date")}
                  {field(values,"amount1","Amount 1","number")}
                  {field(values,"dueDate2","Due Date 2","date")}
                  {field(values,"amount2","Amount 2","number")}
                  {field(values,"dueDate3","Due Date 3","date")}
                  {field(values,"amount3","Amount 3","number")}
                  {field(values,"dueDate4","Due Date 4","date")}
                  {field(values,"amount4","Amount 4","number")}
                </div>
              </div>

              {/* ASSUMPTIONS & REMARKS */}
              <div className="form-section">
                <h3 className="form-section-title">Assumptions & Remarks</h3>
                <div className="form-fields">
                  {field(values,"keyAssumptions","Key Assumptions")}
                  {field(values,"remarks","Remarks")}
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
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode && (
                        <button type="button"
                          className="btn-submit"
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
                              <button
                                type="button"
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
                    Submit Advance Tax Computation
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

export default FRM00999_AdvanceTaxComputation;