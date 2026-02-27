// FRM00953_ARAgingActionPlan.jsx
// FRM-00953 – AR Aging Action Plan
// Enterprise Grade – Accounts Receivable, Credit & Collections

import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
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
  agingPeriodFrom: Yup.date().required("Required"),
  agingPeriodTo: Yup.date().required("Required"),
  totalOutstanding: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00953",
  version: "1.0",
  date: "",
  department: "Finance & Accounting (Advanced)",
  function: "Accounts Receivable, Credit & Collections",
  agingPeriodFrom: "",
  agingPeriodTo: "",
  referenceNumber: "",
  location: "",

  /* Aging Summary */
  totalOutstanding: "",
  currency: "",
  currentBucket: "",
  bucket1to30: "",
  bucket31to60: "",
  bucket61to90: "",
  bucket90Plus: "",

  /* Risk Assessment */
  highRiskAccounts: "",
  mediumRiskAccounts: "",
  lowRiskAccounts: "",

  /* Action Plan */
  collectionStrategy: "",
  priorityActions: "",
  responsibleTeamOwner: "",
  targetCompletionDate: "",

  /* Monitoring */
  progressStatus: "",
  keyRisksIssues: "",
  mitigationPlan: "",

  /* Authorization Workflow */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM00953_ARAgingActionPlan = () => {

  const { isPrintMode } = usePrintMode();

  return (
    <ModernFormWrapper
      formId="FRM-00953"
      title="AR Aging Action Plan"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("AR Aging Action Plan Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00953"
              title="AR AGING ACTION PLAN"
              department="Finance & Accounting (Advanced) – Accounts Receivable, Credit & Collections"
            >

              {/* ================= GENERAL INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  <Field name="formId" disabled className="form-input"/>
                  <Field name="date" type="date" className="form-input"/>
                  <Field name="department" className="form-input"/>
                  <Field name="function" className="form-input"/>
                  <Field name="agingPeriodFrom" type="date" className="form-input"/>
                  <Field name="agingPeriodTo" type="date" className="form-input"/>
                  <Field name="referenceNumber" placeholder="Reference Number" className="form-input"/>
                  <Field name="location" placeholder="Location" className="form-input"/>
                </div>
              </div>

              {/* ================= AGING SUMMARY ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Aging Summary</h3>
                <div className="form-fields">
                  <Field name="totalOutstanding" type="number" placeholder="Total Outstanding" className="form-input"/>
                  <Field name="currency" placeholder="Currency" className="form-input"/>
                  <Field name="currentBucket" type="number" placeholder="Current Bucket" className="form-input"/>
                  <Field name="bucket1to30" type="number" placeholder="1–30 Days" className="form-input"/>
                  <Field name="bucket31to60" type="number" placeholder="31–60 Days" className="form-input"/>
                  <Field name="bucket61to90" type="number" placeholder="61–90 Days" className="form-input"/>
                  <Field name="bucket90Plus" type="number" placeholder="90+ Days" className="form-input"/>
                </div>
              </div>

              {/* ================= RISK ASSESSMENT ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Risk Assessment</h3>
                <div className="form-fields">
                  <Field name="highRiskAccounts" placeholder="High Risk Accounts" className="form-input"/>
                  <Field name="mediumRiskAccounts" placeholder="Medium Risk Accounts" className="form-input"/>
                  <Field name="lowRiskAccounts" placeholder="Low Risk Accounts" className="form-input"/>
                </div>
              </div>

              {/* ================= ACTION PLAN ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Action Plan</h3>
                <div className="form-fields">
                  <Field name="collectionStrategy" placeholder="Collection Strategy" className="form-input"/>
                  <Field name="priorityActions" placeholder="Priority Actions" className="form-input"/>
                  <Field name="responsibleTeamOwner" placeholder="Responsible Team / Owner" className="form-input"/>
                  <Field name="targetCompletionDate" type="date" className="form-input"/>
                </div>
              </div>

              {/* ================= MONITORING ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Monitoring</h3>
                <div className="form-fields">
                  <Field name="progressStatus" placeholder="Progress Status" className="form-input"/>
                  <Field name="keyRisksIssues" placeholder="Key Risks / Issues" className="form-input"/>
                  <Field name="mitigationPlan" placeholder="Mitigation Plan" className="form-input"/>
                </div>
              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* ================= AUTHORIZATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>

                <FieldArray name="approvalRoles">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={() =>
                            push({ roleName: "New Role", data: {} })
                          }
                        >
                          + Add Role
                        </button>
                      )}

                      <div className="three-column-signatures">
                        {values.approvalRoles.map((role, index) => (
                          <div key={index}>
                            <ApprovalSignatureBlock
                              roleName={role.roleName}
                              value={role.data}
                              allowRoleEdit={!isPrintMode}
                              onRoleNameChange={(newName) =>
                                setFieldValue(`approvalRoles.${index}.roleName`, newName)
                              }
                              onChange={(val) =>
                                setFieldValue(`approvalRoles.${index}.data`, val)
                              }
                            />

                            {!isPrintMode && (
                              <button
                                type="button"
                                className="btn-remove-role"
                                onClick={() => remove(index)}
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
                    Submit AR Aging Action Plan
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

export default FRM00953_ARAgingActionPlan;