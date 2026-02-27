// FRM01002_TaxAuditDataRequestLog.jsx
// FRM-01002 – Tax Audit Data Request Log
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
  auditFirm: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01002",
  date: "",
  department: "Tax & Statutory (India)",
  function: "Income Tax – Tax Audit",
  financialYear: "",
  assessmentYear: "",
  referenceNumber: "",
  location: "",
  auditFirm: "",
  auditPeriod: "",

  dataRequests: [
    {
      requestId: "",
      requestDescription: "",
      requestedBy: "",
      requestDate: "",
      owner: "",
      dueDate: "",
      status: "",
      remarks: ""
    }
  ],

  notes: "",
  generalRemarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01002_TaxAuditDataRequestLog = () => {

  const { isPrintMode } = usePrintMode();

  const calculateSummary = (requests) => {
    const total = requests.length;
    const open = requests.filter(r => r.status !== "Closed").length;
    const closed = requests.filter(r => r.status === "Closed").length;
    return { total, open, closed };
  };

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
      formId="FRM-01002"
      title="Tax Audit Data Request Log"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Tax Audit Data Request Log Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => {

          const summary = calculateSummary(values.dataRequests);

          return (
            <Form>

              <ModernA4Template
                formId="FRM-01002"
                title="TAX AUDIT DATA REQUEST LOG"
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
                    {field(values,"auditFirm","Audit Firm / Auditor")}
                    {field(values,"auditPeriod","Audit Period")}
                  </div>
                </div>

                {/* DATA REQUEST LOG TABLE */}
                <div className="form-section">
                  <h3 className="form-section-title">Data Request Details (Log Table)</h3>

                  <FieldArray name="dataRequests">
                    {({ push, remove }) => (
                      <>
                        {!isPrintMode && (
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={() =>
                              push({
                                requestId: "",
                                requestDescription: "",
                                requestedBy: "",
                                requestDate: "",
                                owner: "",
                                dueDate: "",
                                status: "",
                                remarks: ""
                              })
                            }
                            style={{ marginBottom: 15 }}
                          >
                            + Add Request
                          </button>
                        )}

                        <table className="items-table">
                          <thead>
                            <tr>
                              <th>Request ID</th>
                              <th>Description</th>
                              <th>Requested By</th>
                              <th>Request Date</th>
                              <th>Owner</th>
                              <th>Due Date</th>
                              <th>Status</th>
                              <th>Remarks</th>
                              {!isPrintMode && <th>Action</th>}
                            </tr>
                          </thead>
                          <tbody>
                            {values.dataRequests.map((row,index)=>(
                              <tr key={index}>
                                <td><Field name={`dataRequests.${index}.requestId`} className="form-input"/></td>
                                <td><Field name={`dataRequests.${index}.requestDescription`} className="form-input"/></td>
                                <td><Field name={`dataRequests.${index}.requestedBy`} className="form-input"/></td>
                                <td><Field name={`dataRequests.${index}.requestDate`} type="date" className="form-input"/></td>
                                <td><Field name={`dataRequests.${index}.owner`} className="form-input"/></td>
                                <td><Field name={`dataRequests.${index}.dueDate`} type="date" className="form-input"/></td>
                                <td>
                                  <Field as="select" name={`dataRequests.${index}.status`} className="form-input">
                                    <option value="">Select</option>
                                    <option>Open</option>
                                    <option>In Progress</option>
                                    <option>Closed</option>
                                  </Field>
                                </td>
                                <td><Field name={`dataRequests.${index}.remarks`} className="form-input"/></td>
                                {!isPrintMode && (
                                  <td>
                                    <button type="button" onClick={()=>remove(index)}>Remove</button>
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

                {/* SUMMARY */}
                <div className="form-section">
                  <h3 className="form-section-title">Summary</h3>
                  <div className="form-fields">
                    <div className="print-value">Total Requests: {summary.total}</div>
                    <div className="print-value">Open Requests: {summary.open}</div>
                    <div className="print-value">Closed Requests: {summary.closed}</div>
                  </div>
                </div>

                {/* NOTES */}
                <div className="form-section">
                  <h3 className="form-section-title">Notes</h3>
                  <div className="form-fields">
                    {field(values,"notes","Notes")}
                    {field(values,"generalRemarks","General Remarks")}
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
                      Submit Tax Audit Data Log
                    </button>
                  </div>
                )}

              </ModernA4Template>

            </Form>
          );
        }}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM01002_TaxAuditDataRequestLog;