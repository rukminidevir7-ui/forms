// FRM00950_00951_00952_CollectionsKPIReport.jsx
// FRM-00950 / 00951 / 00952 – Collections KPI Report
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
  kpiPeriodFrom: Yup.date().required("Required"),
  kpiPeriodTo: Yup.date().required("Required"),
  totalOutstanding: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00950 / 00951 / 00952",
  version: "1.0",
  date: "",
  department: "Finance & Accounting (Advanced)",
  function: "Accounts Receivable, Credit & Collections",
  kpiPeriodFrom: "",
  kpiPeriodTo: "",
  referenceNumber: "",
  location: "",

  /* KPI Summary */
  totalOutstanding: "",
  currency: "",
  totalCollections: "",
  collectionRate: "",
  dso: "",
  overduePercentage: "",

  /* Aging Analysis */
  currentBucket: "",
  bucket1to30: "",
  bucket31to60: "",
  bucket61to90: "",
  bucket90Plus: "",

  /* Performance Metrics */
  numberOfAccounts: "",
  activeCustomers: "",
  disputesCount: "",
  resolvedItems: "",
  writeOffs: "",
  recoveryAmount: "",

  /* Commentary */
  keyObservations: "",
  issuesRisks: "",
  actionPlan: "",

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

const FRM00950_CollectionsKPIReport = () => {

  const { isPrintMode } = usePrintMode();

  return (
    <ModernFormWrapper
      formId="FRM-00950"
      title="Collections KPI Report"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Collections KPI Report Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00950 / 00951 / 00952"
              title="COLLECTIONS KPI REPORT"
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
                  <Field name="kpiPeriodFrom" type="date" className="form-input"/>
                  <Field name="kpiPeriodTo" type="date" className="form-input"/>
                  <Field name="referenceNumber" placeholder="Reference Number" className="form-input"/>
                  <Field name="location" placeholder="Location" className="form-input"/>
                </div>
              </div>

              {/* ================= KPI SUMMARY ================= */}
              <div className="form-section">
                <h3 className="form-section-title">KPI Summary</h3>
                <div className="form-fields">
                  <Field name="totalOutstanding" type="number" placeholder="Total Outstanding" className="form-input"/>
                  <Field name="currency" placeholder="Currency" className="form-input"/>
                  <Field name="totalCollections" type="number" placeholder="Total Collections" className="form-input"/>
                  <Field name="collectionRate" type="number" placeholder="Collection Rate (%)" className="form-input"/>
                  <Field name="dso" type="number" placeholder="DSO (Days Sales Outstanding)" className="form-input"/>
                  <Field name="overduePercentage" type="number" placeholder="Overdue Percentage" className="form-input"/>
                </div>
              </div>

              {/* ================= AGING ANALYSIS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Aging Analysis</h3>
                <div className="form-fields">
                  <Field name="currentBucket" type="number" placeholder="Current Bucket" className="form-input"/>
                  <Field name="bucket1to30" type="number" placeholder="1–30 Days" className="form-input"/>
                  <Field name="bucket31to60" type="number" placeholder="31–60 Days" className="form-input"/>
                  <Field name="bucket61to90" type="number" placeholder="61–90 Days" className="form-input"/>
                  <Field name="bucket90Plus" type="number" placeholder="90+ Days" className="form-input"/>
                </div>
              </div>

              {/* ================= PERFORMANCE METRICS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Performance Metrics</h3>
                <div className="form-fields">
                  <Field name="numberOfAccounts" type="number" placeholder="Number of Accounts" className="form-input"/>
                  <Field name="activeCustomers" type="number" placeholder="Active Customers" className="form-input"/>
                  <Field name="disputesCount" type="number" placeholder="Disputes Count" className="form-input"/>
                  <Field name="resolvedItems" type="number" placeholder="Resolved Items" className="form-input"/>
                  <Field name="writeOffs" type="number" placeholder="Write-offs" className="form-input"/>
                  <Field name="recoveryAmount" type="number" placeholder="Recovery Amount" className="form-input"/>
                </div>
              </div>

              {/* ================= COMMENTARY ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Commentary</h3>
                <div className="form-fields">
                  <Field name="keyObservations" placeholder="Key Observations" className="form-input"/>
                  <Field name="issuesRisks" placeholder="Issues / Risks" className="form-input"/>
                  <Field name="actionPlan" placeholder="Action Plan" className="form-input"/>
                </div>
              </div>

              {/* ================= ATTACHMENTS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Attachments</h3>
                <div className="form-fields">
                  <Field name="supportingDocumentsAttached" as="select" className="form-input">
                    <option value="">Supporting Documents Attached?</option>
                    <option>Yes</option>
                    <option>No</option>
                  </Field>
                  <Field name="documentReference" placeholder="Document Reference" className="form-input"/>
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
                    Submit Collections KPI Report
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

export default FRM00950_CollectionsKPIReport;