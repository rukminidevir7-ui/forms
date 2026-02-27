// FRM00991_TCSApplicabilityCheck.jsx
// FRM-00991 – TCS Applicability Check
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
  legalName: Yup.string().required("Required"),
  transactionDescription: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00991",
  date: "",
  department: "Tax & Statutory (India)",
  function: "Income Tax – TDS/TCS",
  referenceNumber: "",
  location: "",
  requestType: "",
  priority: "",
  financialYear: "",
  tan: "",

  /* Entity Details */
  legalName: "",
  pan: "",
  businessUnit: "",
  contactPerson: "",
  phone: "",
  email: "",

  /* Transaction Details */
  natureOfTransaction: "",
  buyerName: "",
  buyerPan: "",
  transactionDescription: "",
  estimatedTransactionValue: "",
  currency: "",
  transactionDate: "",

  /* Applicability Analysis */
  applicableSection: "",
  thresholdLimit: "",
  tcsApplicable: "",
  applicableRate: "",
  basisJustification: "",

  /* Impact Assessment */
  financialImpact: "",
  complianceRisk: "",
  remarks: "",

  /* Attachments */
  supportingDocumentsAttached: "",
  documentReference: "",

  /* Authorization Workflow */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM00991_TCSApplicabilityCheck = () => {

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
      formId="FRM-00991"
      title="TCS Applicability Check"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("TCS Applicability Check Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00991"
              title="TCS APPLICABILITY CHECK"
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
                  {field(values,"requestType","Request Type")}
                  {field(values,"priority","Priority")}
                  {field(values,"financialYear","Financial Year")}
                  {field(values,"tan","TAN")}
                </div>
              </div>

              {/* ENTITY DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Entity Details</h3>
                <div className="form-fields">
                  {field(values,"legalName","Legal Name")}
                  {field(values,"pan","PAN")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"contactPerson","Contact Person")}
                  {field(values,"phone","Phone")}
                  {field(values,"email","Email")}
                </div>
              </div>

              {/* TRANSACTION DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Transaction Details</h3>
                <div className="form-fields">
                  {field(values,"natureOfTransaction","Nature of Transaction")}
                  {field(values,"buyerName","Customer / Buyer Name")}
                  {field(values,"buyerPan","PAN of Buyer")}
                  {field(values,"transactionDescription","Transaction Description")}
                  {field(values,"estimatedTransactionValue","Estimated Transaction Value","number")}
                  {field(values,"currency","Currency")}
                  {field(values,"transactionDate","Transaction Date","date")}
                </div>
              </div>

              {/* APPLICABILITY ANALYSIS */}
              <div className="form-section">
                <h3 className="form-section-title">Applicability Analysis</h3>
                <div className="form-fields">
                  {field(values,"applicableSection","Applicable Section (206C etc.)")}
                  {field(values,"thresholdLimit","Threshold Limit","number")}

                  <div className="form-field">
                    <label className="form-label">TCS Applicable</label>
                    {isPrintMode ? (
                      <div className="print-value">{values.tcsApplicable || "_________"}</div>
                    ) : (
                      <Field as="select" name="tcsApplicable" className="form-input">
                        <option value="">Select</option>
                        <option>Yes</option>
                        <option>No</option>
                      </Field>
                    )}
                  </div>

                  {field(values,"applicableRate","Applicable Rate (%)","number")}
                  {field(values,"basisJustification","Basis / Justification")}
                </div>
              </div>

              {/* IMPACT ASSESSMENT */}
              <div className="form-section">
                <h3 className="form-section-title">Impact Assessment</h3>
                <div className="form-fields">
                  {field(values,"financialImpact","Financial Impact")}
                  {field(values,"complianceRisk","Compliance Risk")}
                  {field(values,"remarks","Remarks")}
                </div>
              </div>

              {/* ATTACHMENTS SECTION */}
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
                    Submit TCS Applicability Check
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

export default FRM00991_TCSApplicabilityCheck;