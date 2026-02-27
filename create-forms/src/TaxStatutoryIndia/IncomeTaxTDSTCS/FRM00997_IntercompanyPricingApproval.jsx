// FRM00997_IntercompanyPricingApproval.jsx
// FRM-00997 – Intercompany Pricing Approval
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
  entityName: Yup.string().required("Required"),
  financialYear: Yup.string().required("Required"),
  natureOfTransaction: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00997",
  date: "",
  department: "Tax & Statutory (India)",
  function: "Income Tax & TDS/TCS",
  referenceNumber: "",
  location: "",
  financialYear: "",
  businessUnit: "",

  /* Entity Details */
  entityName: "",
  pan: "",
  country: "",
  associatedEnterprise: "",

  /* Pricing Details */
  natureOfTransaction: "",
  pricingMethod: "",
  proposedPriceMargin: "",
  currency: "",
  effectiveDate: "",

  /* Financial Impact */
  expectedRevenueCostImpact: "",
  profitImpact: "",
  taxImpact: "",

  /* Risk & Justification */
  riskAssessment: "",
  basisJustification: "",
  remarks: "",

  /* Authorization Workflow */
  approvalRoles: [
    { roleName: "Requested By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM00997_IntercompanyPricingApproval = () => {

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
      formId="FRM-00997"
      title="Intercompany Pricing Approval"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Intercompany Pricing Approval Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00997"
              title="INTERCOMPANY PRICING APPROVAL"
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
                  {field(values,"referenceNumber","Reference Number")}
                  {field(values,"location","Location")}
                  {field(values,"financialYear","Financial Year")}
                  {field(values,"businessUnit","Business Unit")}
                </div>
              </div>

              {/* ENTITY DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Entity Details</h3>
                <div className="form-fields">
                  {field(values,"entityName","Entity Name")}
                  {field(values,"pan","PAN")}
                  {field(values,"country","Country")}
                  {field(values,"associatedEnterprise","Associated Enterprise")}
                </div>
              </div>

              {/* PRICING DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Pricing Details</h3>
                <div className="form-fields">
                  {field(values,"natureOfTransaction","Nature of Transaction")}
                  {field(values,"pricingMethod","Pricing Method")}
                  {field(values,"proposedPriceMargin","Proposed Price / Margin")}
                  {field(values,"currency","Currency")}
                  {field(values,"effectiveDate","Effective Date","date")}
                </div>
              </div>

              {/* FINANCIAL IMPACT */}
              <div className="form-section">
                <h3 className="form-section-title">Financial Impact</h3>
                <div className="form-fields">
                  {field(values,"expectedRevenueCostImpact","Expected Revenue / Cost Impact")}
                  {field(values,"profitImpact","Profit Impact")}
                  {field(values,"taxImpact","Tax Impact")}
                </div>
              </div>

              {/* RISK & JUSTIFICATION */}
              <div className="form-section">
                <h3 className="form-section-title">Risk & Justification</h3>
                <div className="form-fields">
                  {field(values,"riskAssessment","Risk Assessment")}
                  {field(values,"basisJustification","Basis / Justification")}
                  {field(values,"remarks","Remarks")}
                </div>
              </div>

              {/* ATTACHMENTS (CUSTOM COMPONENT ONLY) */}
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
                    Submit Intercompany Pricing Approval
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

export default FRM00997_IntercompanyPricingApproval;