// FRM02537_UsageDataValidationUniversal.jsx
// FRM-02537 – Usage Data Validation — Universal Form
// Enterprise Grade – Client Billing & Revenue Operations – Invoicing (T&M, Milestone, Usage)

import React, { useState } from "react";
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
  validationReferenceNo: Yup.string().required("Required"),
  validationDate: Yup.date().required("Required"),
  overallStatus: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02537",
  department: "Client Billing & Revenue Operations",
  function: "Invoicing (T&M, Milestone, Usage)",

  /* 1. Reference Details */
  validationReferenceNo: "",
  validationDate: "",
  billingPeriod: "",
  sourceSystem: "",

  /* 2. Client / Contract Details */
  clientName: "",
  clientCode: "",
  projectName: "",
  projectCode: "",
  businessUnit: "",

  /* 3. Validation Details */
  validationItems: [
    {
      usageItem: "",
      validationRule: "",
      expectedValue: "",
      actualValue: "",
      variance: "",
      status: "",
      dynamicFields: {}
    }
  ],

  /* 4. Validation Summary */
  totalRecordsChecked: "",
  totalExceptions: "",
  overallStatus: "",
  remarks: "",

  /* 5. Supporting Information */
  supportingFilesAttached: "",
  exceptionDetailsAttached: "",

  /* 6. Review & Approval */
  reviewerComments: "",
  decision: "",
  conditions: "",

  /* 7. Sign-off */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02537_UsageDataValidationUniversal = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const columnName = prompt("Enter New Column Name");
    if (!columnName) return;
    const key = columnName.replace(/\s+/g, "");
    if (dynamicColumns.find(col => col.key === key)) return alert("Column exists");
    setDynamicColumns([...dynamicColumns, { key, label: columnName }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
  };

  const calculateVariance = (values, index, setFieldValue) => {
    const expected = Number(values.validationItems[index].expectedValue || 0);
    const actual = Number(values.validationItems[index].actualValue || 0);
    const variance = actual - expected;
    setFieldValue(`validationItems.${index}.variance`, variance.toFixed(2));
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
    <ModernFormWrapper formId="FRM-02537" title="Usage Data Validation">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Usage Data Validation Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02537"
              title="FRM-02537 — Usage Data Validation — Universal Form"
              department="Client Billing & Revenue Operations | Invoicing (T&M, Milestone, Usage)"
            >

              {/* 1. Reference Details */}
              <div className="form-section">
                <h3 className="form-section-title">Reference Details</h3>
                <div className="form-fields">
                  {field(values,"validationReferenceNo","Validation Reference No")}
                  {field(values,"validationDate","Validation Date","date")}
                  {field(values,"billingPeriod","Billing Period")}
                  {field(values,"sourceSystem","Source System")}
                </div>
              </div>

              {/* 2. Client / Contract Details */}
              <div className="form-section">
                <h3 className="form-section-title">Client / Contract Details</h3>
                <div className="form-fields">
                  {field(values,"clientName","Client Name")}
                  {field(values,"clientCode","Client Code")}
                  {field(values,"projectName","Project / Contract Name")}
                  {field(values,"projectCode","Project Code")}
                  {field(values,"businessUnit","Business Unit")}
                </div>
              </div>

              {/* 3. Validation Details */}
              <div className="form-section">
                <h3 className="form-section-title">Validation Details</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom:15 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>
                    <button
                      type="button"
                      className="btn-submit"
                      style={{ marginLeft:10 }}
                      onClick={()=>setFieldValue("validationItems",[
                        ...values.validationItems,
                        { usageItem:"", validationRule:"", expectedValue:"", actualValue:"", variance:"", status:"", dynamicFields:{} }
                      ])}
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="validationItems">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Usage Item</th>
                          <th>Validation Rule</th>
                          <th>Expected Value</th>
                          <th>Actual Value</th>
                          <th>Variance</th>
                          <th>Status</th>
                          {dynamicColumns.map(col=>(
                            <th key={col.key}>{col.label}</th>
                          ))}
                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {values.validationItems.map((row,index)=>(
                          <tr key={index}>
                            <td><Field name={`validationItems.${index}.usageItem`} className="form-input"/></td>
                            <td><Field name={`validationItems.${index}.validationRule`} className="form-input"/></td>
                            <td>
                              <Field
                                name={`validationItems.${index}.expectedValue`}
                                className="form-input"
                                onBlur={()=>calculateVariance(values,index,setFieldValue)}
                              />
                            </td>
                            <td>
                              <Field
                                name={`validationItems.${index}.actualValue`}
                                className="form-input"
                                onBlur={()=>calculateVariance(values,index,setFieldValue)}
                              />
                            </td>
                            <td className="print-value">{row.variance}</td>
                            <td>
                              <Field as="select" name={`validationItems.${index}.status`} className="form-input">
                                <option value="">Select</option>
                                <option>Match</option>
                                <option>Variance</option>
                                <option>Error</option>
                              </Field>
                            </td>
                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`validationItems.${index}.dynamicFields.${col.key}`} className="form-input"/>
                              </td>
                            ))}
                            {!isPrintMode &&
                              <td>
                                <button type="button" onClick={()=>remove(index)}>Remove</button>
                              </td>}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>
              </div>

              {/* 4. Validation Summary */}
              <div className="form-section">
                <h3 className="form-section-title">Validation Summary</h3>
                <div className="form-fields">
                  {field(values,"totalRecordsChecked","Total Records Checked")}
                  {field(values,"totalExceptions","Total Exceptions")}
                  {field(values,"overallStatus","Overall Status")}
                  {field(values,"remarks","Remarks")}
                </div>
              </div>

              {/* 5. Supporting Information */}
              <div className="form-section">
                <h3 className="form-section-title">Supporting Information</h3>
                <div className="form-fields">
                  {field(values,"supportingFilesAttached","Supporting Files Attached")}
                  {field(values,"exceptionDetailsAttached","Exception Details Attached")}
                </div>
              </div>

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {/* 6. Review & Approval */}
              <div className="form-section">
                <h3 className="form-section-title">Review & Approval</h3>
                <div className="form-fields">
                  {field(values,"reviewerComments","Reviewer Comments")}
                  {field(values,"decision","Decision (Approved / Rejected / Revision Required)")}
                  {field(values,"conditions","Conditions (if any)")}
                </div>
              </div>

              {/* 7. Sign-off */}
              <div className="form-section">
                <h3 className="form-section-title">Sign-off</h3>

                <FieldArray name="approvalRoles">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode &&
                        <button type="button" className="btn-submit"
                          onClick={()=>push({ roleName:"New Role", data:{} })}>
                          + Add Role
                        </button>
                      }

                      <div className="three-column-signatures">
                        {values.approvalRoles.map((role,index)=>(
                          <div key={index}>
                            <ApprovalSignatureBlock
                              roleName={role.roleName}
                              value={role.data}
                              allowRoleEdit={!isPrintMode}
                              onRoleNameChange={(val)=>setFieldValue(`approvalRoles.${index}.roleName`,val)}
                              onChange={(val)=>setFieldValue(`approvalRoles.${index}.data`,val)}
                            />
                            {!isPrintMode &&
                              <button type="button" onClick={()=>remove(index)}>Remove</button>}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </FieldArray>

                {field(values,"approvalDate","Approval Date","date")}
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Validation
                  </button>
                </div>
              }

            </ModernA4Template>
          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM02537_UsageDataValidationUniversal;