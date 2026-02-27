// FRM00967_GSTAuditChecklist.jsx
// FRM-00967 – GST Audit Checklist
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
  gstin: Yup.string().required("Required"),
  auditPeriodFrom: Yup.date().required("Required"),
  auditPeriodTo: Yup.date().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00967",
  date: "",
  department: "Tax & Statutory (India)",
  function: "GST Compliance",
  auditPeriodFrom: "",
  auditPeriodTo: "",
  referenceNumber: "",
  location: "",
  gstin: "",
  legalName: "",

  /* Dynamic Compliance Checklist */
  checklistItems: [
    { item: "GST Registration Validity", status: "" },
    { item: "Returns Filed on Time", status: "" },
    { item: "Tax Payments Reconciled", status: "" },
    { item: "Books vs Returns Reconciled", status: "" },
    { item: "ITC Eligibility Verified", status: "" },
    { item: "ITC Reversal Checked", status: "" },
    { item: "E-Invoice Compliance", status: "" },
    { item: "E-Way Bill Compliance", status: "" },
    { item: "Vendor GST Compliance Check", status: "" },
    { item: "HSN/SAC Classification Review", status: "" }
  ],

  /* Observations */
  keyFindings: "",
  nonComplianceAreas: "",
  riskRating: "",

  /* Action Plan */
  recommendedActions: "",
  responsibleOwner: "",
  targetClosureDate: "",

  /* Authorization */
  approvalRoles: [
    { roleName: "Audited By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM00967_GSTAuditChecklist = () => {

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
      formId="FRM-00967"
      title="GST Audit Checklist"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("GST Audit Checklist Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00967"
              title="GST AUDIT CHECKLIST"
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
                  {field(values,"auditPeriodFrom","Audit Period From","date")}
                  {field(values,"auditPeriodTo","Audit Period To","date")}
                  {field(values,"referenceNumber","Reference Number")}
                  {field(values,"location","Location")}
                  {field(values,"gstin","GSTIN")}
                  {field(values,"legalName","Legal Name")}
                </div>
              </div>

              {/* COMPLIANCE CHECKLIST */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Checklist</h3>

                <FieldArray name="checklistItems">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={()=>push({ item: "New Audit Item", status: "" })}
                        >
                          + Add Checklist Item
                        </button>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Audit Item</th>
                            <th>Status (Yes / No / NA)</th>
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {values.checklistItems.map((row,index)=>(
                            <tr key={index}>
                              <td>
                                {isPrintMode
                                  ? row.item
                                  : <Field
                                      name={`checklistItems.${index}.item`}
                                      className="form-input"
                                    />
                                }
                              </td>
                              <td>
                                <Field
                                  as="select"
                                  name={`checklistItems.${index}.status`}
                                  className="form-input"
                                >
                                  <option value="">Select</option>
                                  <option>Yes</option>
                                  <option>No</option>
                                  <option>NA</option>
                                </Field>
                              </td>
                              {!isPrintMode && (
                                <td>
                                  <button
                                    type="button"
                                    onClick={()=>remove(index)}
                                  >
                                    Remove
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </FieldArray>
              </div>

              {/* OBSERVATIONS */}
              <div className="form-section">
                <h3 className="form-section-title">Observations</h3>
                <div className="form-fields">
                  {field(values,"keyFindings","Key Findings")}
                  {field(values,"nonComplianceAreas","Non-Compliance Areas")}
                  {field(values,"riskRating","Risk Rating")}
                </div>
              </div>

              {/* ACTION PLAN */}
              <div className="form-section">
                <h3 className="form-section-title">Action Plan</h3>
                <div className="form-fields">
                  {field(values,"recommendedActions","Recommended Actions")}
                  {field(values,"responsibleOwner","Responsible Owner")}
                  {field(values,"targetClosureDate","Target Closure Date","date")}
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
                    Submit GST Audit Checklist
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

export default FRM00967_GSTAuditChecklist;