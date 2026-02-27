// FRM00994_TransferPricingDataCapture.jsx
// FRM-00994 – Transfer Pricing Data Capture
// Enterprise Grade – Tax & Statutory (India) – Income Tax (Transfer Pricing)

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
  legalName: Yup.string().required("Required"),
  associatedEnterpriseName: Yup.string().required("Required"),
  transactionValue: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00994",
  date: "",
  department: "Tax & Statutory (India)",
  function: "Income Tax – Transfer Pricing",
  referenceNumber: "",
  location: "",
  financialYear: "",
  assessmentYear: "",
  businessUnit: "",
  preparedFor: "",

  /* Entity Details */
  legalName: "",
  pan: "",
  cin: "",
  country: "",
  contactPerson: "",
  phone: "",
  email: "",

  /* Transaction Details */
  associatedEnterpriseName: "",
  countryOfAE: "",
  natureOfTransaction: "",
  transactionDescription: "",
  transactionValue: "",
  currency: "",

  /* Method Selection */
  mostAppropriateMethod: "",
  comparableCompanies: "",
  armsLengthRange: "",
  basisJustification: "",

  /* Financial Summary */
  operatingRevenue: "",
  operatingCost: "",
  profitLevelIndicator: "",
  adjustmentRequired: "",

  /* Risk & Remarks */
  riskAssessment: "",
  keyObservations: "",
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

const FRM00994_TransferPricingDataCapture = () => {

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
      formId="FRM-00994"
      title="Transfer Pricing Data Capture"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Transfer Pricing Data Capture Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00994"
              title="TRANSFER PRICING DATA CAPTURE"
              department="Tax & Statutory (India) – Income Tax (Transfer Pricing)"
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
                  {field(values,"assessmentYear","Assessment Year")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"preparedFor","Prepared For")}
                </div>
              </div>

              {/* ENTITY DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Entity Details</h3>
                <div className="form-fields">
                  {field(values,"legalName","Legal Name")}
                  {field(values,"pan","PAN")}
                  {field(values,"cin","CIN / Registration No")}
                  {field(values,"country","Country")}
                  {field(values,"contactPerson","Contact Person")}
                  {field(values,"phone","Phone")}
                  {field(values,"email","Email")}
                </div>
              </div>

              {/* TRANSACTION DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Transaction Details</h3>
                <div className="form-fields">
                  {field(values,"associatedEnterpriseName","Associated Enterprise Name")}
                  {field(values,"countryOfAE","Country of AE")}
                  {field(values,"natureOfTransaction","Nature of International Transaction")}
                  {field(values,"transactionDescription","Transaction Description")}
                  {field(values,"transactionValue","Transaction Value","number")}
                  {field(values,"currency","Currency")}
                </div>
              </div>

              {/* METHOD SELECTION */}
              <div className="form-section">
                <h3 className="form-section-title">Method Selection</h3>
                <div className="form-fields">
                  {field(values,"mostAppropriateMethod","Most Appropriate Method")}
                  {field(values,"comparableCompanies","Comparable Companies Identified")}
                  {field(values,"armsLengthRange","Arm’s Length Range")}
                  {field(values,"basisJustification","Basis / Justification")}
                </div>
              </div>

              {/* FINANCIAL SUMMARY */}
              <div className="form-section">
                <h3 className="form-section-title">Financial Summary</h3>
                <div className="form-fields">
                  {field(values,"operatingRevenue","Operating Revenue","number")}
                  {field(values,"operatingCost","Operating Cost","number")}
                  {field(values,"profitLevelIndicator","Profit Level Indicator (PLI)")}
                  {field(values,"adjustmentRequired","Adjustment Required")}
                </div>
              </div>

              {/* RISK & REMARKS */}
              <div className="form-section">
                <h3 className="form-section-title">Risk & Remarks</h3>
                <div className="form-fields">
                  {field(values,"riskAssessment","Risk Assessment")}
                  {field(values,"keyObservations","Key Observations")}
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
                    Submit Transfer Pricing Data
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

export default FRM00994_TransferPricingDataCapture;