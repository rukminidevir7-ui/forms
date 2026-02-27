// FRM02514_BillingScheduleApproval.jsx
// FRM-02514 – Billing Schedule Approval
// Enterprise Grade – Client Billing & Revenue Operations – Billing Setup & Master Data

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePrintMode } from "../../PrintModeContext";
import ModernFormWrapper from "../../components/ModernFormWrapper";
import ModernA4Template from "../../components/ModernA4Template";
import ApprovalSignatureBlock from "../../components/ApprovalSignatureBlock";
import FormCustomFields from "../../components/FormCustomFields";
import FormAttachments from "../../components/FormAttachments";
import "../../styles/FRM00611.css";

/* ================= VALIDATION ================= */

const validationSchema = Yup.object({
  clientName: Yup.string().required("Required"),
  clientCode: Yup.string().required("Required"),
  projectName: Yup.string().required("Required"),
  scheduleReferenceNo: Yup.string().required("Required"),
  decision: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02514",
  department: "Client Billing & Revenue Operations",
  function: "Billing Setup & Master Data",

  /* 1. Client Details */
  clientName: "",
  clientCode: "",
  projectName: "",
  businessUnit: "",
  scheduleReferenceNo: "",
  effectiveDate: "",

  /* 2. Billing Schedule Table */
  scheduleItems: [
    {
      scheduleLine: "",
      milestonePeriod: "",
      billingAmount: "",
      currency: "",
      plannedInvoiceDate: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  /* 3. Conditions */
  billingMethod: "",
  taxTreatment: "",
  invoiceTriggerBasis: "",
  specialConditions: "",

  /* 4. Approval Decision */
  decision: "",
  approvalComments: "",
  conditions: "",

  /* 5. Sign-off */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: "",

  customFields: []
};

/* ================= COMPONENT ================= */

const FRM02514_BillingScheduleApproval = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ===== COLUMN HANDLERS ===== */

  const addColumn = () => {
    const columnName = prompt("Enter New Column Name");
    if (!columnName) return;

    const key = columnName.replace(/\s+/g, "");

    if (dynamicColumns.find(col => col.key === key)) {
      alert("Column already exists");
      return;
    }

    setDynamicColumns([...dynamicColumns, { key, label: columnName }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
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
    <ModernFormWrapper formId="FRM-02514" title="Billing Schedule Approval">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Billing Schedule Approval Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02514"
              title="FRM-02514 — Billing Schedule Approval"
              department="Client Billing & Revenue Operations | Billing Setup & Master Data"
            >

              {/* 1. Client Details */}
              <div className="form-section">
                <h3 className="form-section-title">Client / Project Details</h3>
                <div className="form-fields">
                  {field(values,"clientName","Client Name")}
                  {field(values,"clientCode","Client Code")}
                  {field(values,"projectName","Project / Contract Name")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"scheduleReferenceNo","Schedule Reference No")}
                  {field(values,"effectiveDate","Effective Date","date")}
                </div>
              </div>

              {/* 2. BILLING SCHEDULE TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">Billing Schedule Details</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 10 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>

                    <button
                      type="button"
                      className="btn-submit"
                      style={{ marginLeft: 10 }}
                      onClick={() =>
                        setFieldValue("scheduleItems", [
                          ...values.scheduleItems,
                          {
                            scheduleLine:"",
                            milestonePeriod:"",
                            billingAmount:"",
                            currency:"",
                            plannedInvoiceDate:"",
                            remarks:"",
                            dynamicFields:{}
                          }
                        ])
                      }
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="scheduleItems">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Schedule Line</th>
                          <th>Milestone / Period</th>
                          <th>Billing Amount</th>
                          <th>Currency</th>
                          <th>Planned Invoice Date</th>
                          <th>Remarks</th>

                          {dynamicColumns.map(col => (
                            <th key={col.key}>
                              {col.label}
                              {!isPrintMode &&
                                <button
                                  type="button"
                                  onClick={()=>removeColumn(col.key)}
                                >
                                  x
                                </button>
                              }
                            </th>
                          ))}

                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>

                      <tbody>
                        {values.scheduleItems.map((row,index)=>(
                          <tr key={index}>
                            <td><Field name={`scheduleItems.${index}.scheduleLine`} className="form-input"/></td>
                            <td><Field name={`scheduleItems.${index}.milestonePeriod`} className="form-input"/></td>
                            <td><Field name={`scheduleItems.${index}.billingAmount`} type="number" className="form-input"/></td>
                            <td><Field name={`scheduleItems.${index}.currency`} className="form-input"/></td>
                            <td><Field name={`scheduleItems.${index}.plannedInvoiceDate`} type="date" className="form-input"/></td>
                            <td><Field name={`scheduleItems.${index}.remarks`} className="form-input"/></td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field
                                  name={`scheduleItems.${index}.dynamicFields.${col.key}`}
                                  className="form-input"
                                />
                              </td>
                            ))}

                            {!isPrintMode &&
                              <td>
                                <button type="button" onClick={()=>remove(index)}>
                                  Remove
                                </button>
                              </td>
                            }
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>
              </div>

              {/* 3. Conditions */}
              <div className="form-section">
                <h3 className="form-section-title">Conditions & Notes</h3>
                <div className="form-fields">
                  {field(values,"billingMethod","Billing Method")}
                  {field(values,"taxTreatment","Tax Treatment")}
                  {field(values,"invoiceTriggerBasis","Invoice Trigger Basis")}
                  {field(values,"specialConditions","Special Conditions")}
                </div>
              </div>

              {/* 4. Approval Decision */}
              <div className="form-section">
                <h3 className="form-section-title">Approval Decision</h3>
                <div className="form-fields">
                  {field(values,"decision","Decision (Approved / Rejected / Conditional)")}
                  {field(values,"approvalComments","Approval Comments")}
                  {field(values,"conditions","Conditions (if any)")}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />


              {/* 5. Sign-off */}
              <div className="form-section">
                <h3 className="form-section-title">Sign-off</h3>

                <div className="three-column-signatures">
                  {values.approvalRoles.map((role,index)=>(
                    <ApprovalSignatureBlock
                      key={index}
                      roleName={role.roleName}
                      value={role.data}
                      allowRoleEdit={!isPrintMode}
                    />
                  ))}
                </div>

                {field(values,"approvalDate","Approval Date","date")}
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Billing Schedule Approval
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

export default FRM02514_BillingScheduleApproval;