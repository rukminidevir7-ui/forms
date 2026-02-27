// FRM02513_BillingMilestoneSetup.jsx
// FRM-02513 – Billing Milestone Setup
// Enterprise Grade – Client Billing & Revenue Operations – Billing Setup & Master Data

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
  clientName: Yup.string().required("Required"),
  clientCode: Yup.string().required("Required"),
  projectName: Yup.string().required("Required"),
  effectiveDate: Yup.date().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02513",
  department: "Client Billing & Revenue Operations",
  function: "Billing Setup & Master Data",

  /* 1. Client Details */
  clientName: "",
  clientCode: "",
  projectName: "",
  businessUnit: "",
  referenceNo: "",
  effectiveDate: "",

  /* 2. Milestone Table */
  milestones: [
    {
      milestoneName: "",
      description: "",
      triggerEvent: "",
      billingAmount: "",
      currency: "",
      dueDate: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  /* 3. Billing Conditions */
  billingMethod: "",
  taxTreatment: "",
  invoiceTriggerBasis: "",
  partialBillingAllowed: "",
  remarks: "",

  /* 4. Documentation */
  contractReference: "",

  /* 5. Approval */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: "",

  attachments: [],
  customFields: []
};

/* ================= COMPONENT ================= */

const FRM02513_BillingMilestoneSetup = () => {

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
    <ModernFormWrapper formId="FRM-02513" title="Billing Milestone Setup">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Billing Milestone Setup Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02513"
              title="FRM-02513 — Billing Milestone Setup"
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
                  {field(values,"referenceNo","Reference No")}
                  {field(values,"effectiveDate","Effective Date","date")}
                </div>
              </div>

              {/* 2. MILESTONE TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">Milestone Details</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 15 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>

                    <button
                      type="button"
                      className="btn-submit"
                      style={{ marginLeft: 10 }}
                      onClick={() =>
                        setFieldValue("milestones", [
                          ...values.milestones,
                          {
                            milestoneName:"",
                            description:"",
                            triggerEvent:"",
                            billingAmount:"",
                            currency:"",
                            dueDate:"",
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

                <FieldArray name="milestones">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Milestone Name</th>
                          <th>Description</th>
                          <th>Trigger Event</th>
                          <th>Billing Amount</th>
                          <th>Currency</th>
                          <th>Due Date</th>
                          <th>Remarks</th>

                          {dynamicColumns.map(col => (
                            <th key={col.key}>
                              {col.label}
                              {!isPrintMode &&
                                <button type="button" onClick={()=>removeColumn(col.key)}>x</button>
                              }
                            </th>
                          ))}

                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>

                      <tbody>
                        {values.milestones.map((row,index)=>(
                          <tr key={index}>
                            <td><Field name={`milestones.${index}.milestoneName`} className="form-input"/></td>
                            <td><Field name={`milestones.${index}.description`} className="form-input"/></td>
                            <td><Field name={`milestones.${index}.triggerEvent`} className="form-input"/></td>
                            <td><Field name={`milestones.${index}.billingAmount`} type="number" className="form-input"/></td>
                            <td><Field name={`milestones.${index}.currency`} className="form-input"/></td>
                            <td><Field name={`milestones.${index}.dueDate`} type="date" className="form-input"/></td>
                            <td><Field name={`milestones.${index}.remarks`} className="form-input"/></td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field
                                  name={`milestones.${index}.dynamicFields.${col.key}`}
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

              {/* 3. Billing Conditions */}
              <div className="form-section">
                <h3 className="form-section-title">Billing Conditions</h3>
                <div className="form-fields">
                  {field(values,"billingMethod","Billing Method")}
                  {field(values,"taxTreatment","Tax Treatment")}
                  {field(values,"invoiceTriggerBasis","Invoice Trigger Basis")}
                  {field(values,"partialBillingAllowed","Partial Billing Allowed (Yes/No)")}
                  {field(values,"remarks","Remarks")}
                </div>
              </div>

              {/* 4. Documentation */}
              <div className="form-section">
                <h3 className="form-section-title">Documentation</h3>
                {field(values,"contractReference","Contract Reference")}
                <FormAttachments values={values} />
              </div>

              <FormCustomFields values={values} />

              {/* 5. Approval */}
              <div className="form-section">
                <h3 className="form-section-title">Approval</h3>

                <FieldArray name="approvalRoles">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode &&
                        <button type="button" className="btn-submit" onClick={()=>push({ roleName:"New Role", data:{} })}>
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
                              <button type="button" onClick={()=>remove(index)}>Remove</button>
                            }
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
                    Submit Billing Milestone Setup
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

export default FRM02513_BillingMilestoneSetup;