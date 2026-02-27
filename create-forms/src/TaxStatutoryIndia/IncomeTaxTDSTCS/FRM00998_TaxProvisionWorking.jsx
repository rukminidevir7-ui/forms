// FRM00998_TaxProvisionWorking.jsx
// FRM-00998 – Tax Provision Working
// Enterprise Grade – Tax & Statutory (India) – Income Tax & TDS/TCS

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
  legalName: Yup.string().required("Required"),
  financialYear: Yup.string().required("Required"),
  accountingProfitBeforeTax: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00998",
  date: "",
  department: "Tax & Statutory (India)",
  function: "Income Tax & TDS/TCS",
  periodFrom: "",
  periodTo: "",
  financialYear: "",
  assessmentYear: "",
  referenceNumber: "",
  location: "",

  /* Entity Details */
  legalName: "",
  pan: "",
  businessUnit: "",
  preparedFor: "",

  /* Profit & Loss Summary */
  accountingProfitBeforeTax: "",
  disallowances: "",
  allowableDeductions: "",
  taxableIncome: "",

  /* Tax Calculation */
  applicableTaxRate: "",
  currentTax: "",
  deferredTax: "",
  totalTaxProvision: "",

  /* Adjustments */
  priorPeriodAdjustments: "",
  matAmtCredit: "",
  otherAdjustments: "",

  /* Notes */
  keyAssumptions: "",
  remarks: "",

  /* Authorization Workflow */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM00998_TaxProvisionWorking = () => {

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
      formId="FRM-00998"
      title="Tax Provision Working"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Tax Provision Working Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00998"
              title="TAX PROVISION WORKING"
              department="Tax & Statutory (India) – Income Tax & TDS/TCS"
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
                  {field(values,"financialYear","Financial Year")}
                  {field(values,"assessmentYear","Assessment Year")}
                  {field(values,"referenceNumber","Reference Number")}
                  {field(values,"location","Location")}
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
                </div>
              </div>

              {/* PROFIT & LOSS SUMMARY */}
              <div className="form-section">
                <h3 className="form-section-title">Profit & Loss Summary</h3>
                <div className="form-fields">
                  {field(values,"accountingProfitBeforeTax","Accounting Profit Before Tax","number")}
                  {field(values,"disallowances","Add: Disallowances","number")}
                  {field(values,"allowableDeductions","Less: Allowable Deductions","number")}
                  {field(values,"taxableIncome","Taxable Income","number")}
                </div>
              </div>

              {/* TAX CALCULATION */}
              <div className="form-section">
                <h3 className="form-section-title">Tax Calculation</h3>
                <div className="form-fields">
                  {field(values,"applicableTaxRate","Applicable Tax Rate (%)","number")}
                  {field(values,"currentTax","Current Tax","number")}
                  {field(values,"deferredTax","Deferred Tax","number")}
                  {field(values,"totalTaxProvision","Total Tax Provision","number")}
                </div>
              </div>

              {/* ADJUSTMENTS */}
              <div className="form-section">
                <h3 className="form-section-title">Adjustments</h3>
                <div className="form-fields">
                  {field(values,"priorPeriodAdjustments","Prior Period Adjustments","number")}
                  {field(values,"matAmtCredit","MAT / AMT Credit","number")}
                  {field(values,"otherAdjustments","Other Adjustments","number")}
                </div>
              </div>

              {/* NOTES */}
              <div className="form-section">
                <h3 className="form-section-title">Notes</h3>
                <div className="form-fields">
                  {field(values,"keyAssumptions","Key Assumptions")}
                  {field(values,"remarks","Remarks")}
                </div>
              </div>

              {/* ATTACHMENTS & CUSTOM FIELDS */}
              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* AUTHORIZATION */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>

                <FieldArray name="approvalRoles">
                  {({ push, remove })=>(
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
                    Submit Tax Provision Working
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

export default FRM00998_TaxProvisionWorking;