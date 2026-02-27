// FRM02511_RateCardChangeRequest.jsx
// FRM-02511 – Rate Card Change Request
// Enterprise Grade – Client Billing & Revenue Operations – Billing Setup & Master Data

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePrintMode } from "../../PrintModeContext";
import ModernFormWrapper from "../../components/ModernFormWrapper";
import ModernA4Template from "../../components/ModernA4Template";
import ApprovalSignatureBlock from "../../components/ApprovalSignatureBlock";
import FormCustomFields from "../../components/FormCustomFields";
import "../../styles/FRM00611.css";

/* ================= VALIDATION ================= */

const validationSchema = Yup.object({
  clientName: Yup.string().required("Required"),
  clientCode: Yup.string().required("Required"),
  projectName: Yup.string().required("Required"),
  requestDate: Yup.date().required("Required"),
  reasonForChange: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02511",
  department: "Client Billing & Revenue Operations",
  function: "Billing Setup & Master Data",

  /* 1. Client Details */
  clientName: "",
  clientCode: "",
  projectName: "",
  businessUnit: "",
  requestDate: "",
  referenceNo: "",

  /* 2. Current Rate Details */
  currentRates: [
    { service: "", unit: "", rate: "", currency: "", remarks: "", dynamicFields: {} }
  ],

  /* 3. Proposed Change */
  proposedRates: [
    { service: "", unit: "", rate: "", currency: "", effectiveDate: "", remarks: "", dynamicFields: {} }
  ],

  /* 4. Reason & Impact */
  reasonForChange: "",
  financialImpact: "",
  customerCommunicationRequired: "",
  remarks: "",

  /* Approval */
  approvalRoles: [
    { roleName: "Requested By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: "",

  customFields: []
};

/* ================= COMPONENT ================= */

const FRM02511_RateCardChangeRequest = () => {

  const { isPrintMode } = usePrintMode();

  const [currentColumns, setCurrentColumns] = useState([]);
  const [proposedColumns, setProposedColumns] = useState([]);

  /* ===== COLUMN HANDLERS ===== */

  const addColumn = (type) => {
    const columnName = prompt("Enter New Column Name");
    if (!columnName) return;

    const key = columnName.replace(/\s+/g, "");

    if (type === "current") {
      if (currentColumns.find(col => col.key === key)) return alert("Column exists");
      setCurrentColumns([...currentColumns, { key, label: columnName }]);
    } else {
      if (proposedColumns.find(col => col.key === key)) return alert("Column exists");
      setProposedColumns([...proposedColumns, { key, label: columnName }]);
    }
  };

  const removeColumn = (type, key) => {
    if (type === "current")
      setCurrentColumns(currentColumns.filter(col => col.key !== key));
    else
      setProposedColumns(proposedColumns.filter(col => col.key !== key));
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
    <ModernFormWrapper formId="FRM-02511" title="Rate Card Change Request">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Rate Card Change Request Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02511"
              title="FRM-02511 — Rate Card Change Request"
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
                  {field(values,"requestDate","Request Date","date")}
                  {field(values,"referenceNo","Reference No")}
                </div>
              </div>

              {/* 2. CURRENT RATE TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">Current Rate Details</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 10 }}>
                    <button type="button" className="btn-submit" onClick={()=>addColumn("current")}>+ Add Column</button>
                    <button
                      type="button"
                      className="btn-submit"
                      style={{ marginLeft: 10 }}
                      onClick={() =>
                        setFieldValue("currentRates", [
                          ...values.currentRates,
                          { service:"", unit:"", rate:"", currency:"", remarks:"", dynamicFields:{} }
                        ])
                      }
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="currentRates">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Service</th>
                          <th>Unit</th>
                          <th>Current Rate</th>
                          <th>Currency</th>
                          <th>Remarks</th>

                          {currentColumns.map(col => (
                            <th key={col.key}>
                              {col.label}
                              {!isPrintMode &&
                                <button type="button" onClick={()=>removeColumn("current", col.key)}>x</button>}
                            </th>
                          ))}

                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {values.currentRates.map((row,index)=>(
                          <tr key={index}>
                            <td><Field name={`currentRates.${index}.service`} className="form-input"/></td>
                            <td><Field name={`currentRates.${index}.unit`} className="form-input"/></td>
                            <td><Field name={`currentRates.${index}.rate`} type="number" className="form-input"/></td>
                            <td><Field name={`currentRates.${index}.currency`} className="form-input"/></td>
                            <td><Field name={`currentRates.${index}.remarks`} className="form-input"/></td>

                            {currentColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`currentRates.${index}.dynamicFields.${col.key}`} className="form-input"/>
                              </td>
                            ))}

                            {!isPrintMode &&
                              <td><button type="button" onClick={()=>remove(index)}>Remove</button></td>
                            }
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>
              </div>

              {/* 3. PROPOSED RATE TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">Proposed Change</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 10 }}>
                    <button type="button" className="btn-submit" onClick={()=>addColumn("proposed")}>+ Add Column</button>
                    <button
                      type="button"
                      className="btn-submit"
                      style={{ marginLeft: 10 }}
                      onClick={() =>
                        setFieldValue("proposedRates", [
                          ...values.proposedRates,
                          { service:"", unit:"", rate:"", currency:"", effectiveDate:"", remarks:"", dynamicFields:{} }
                        ])
                      }
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="proposedRates">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Service</th>
                          <th>Unit</th>
                          <th>Proposed Rate</th>
                          <th>Currency</th>
                          <th>Effective Date</th>
                          <th>Remarks</th>

                          {proposedColumns.map(col => (
                            <th key={col.key}>
                              {col.label}
                              {!isPrintMode &&
                                <button type="button" onClick={()=>removeColumn("proposed", col.key)}>x</button>}
                            </th>
                          ))}

                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {values.proposedRates.map((row,index)=>(
                          <tr key={index}>
                            <td><Field name={`proposedRates.${index}.service`} className="form-input"/></td>
                            <td><Field name={`proposedRates.${index}.unit`} className="form-input"/></td>
                            <td><Field name={`proposedRates.${index}.rate`} type="number" className="form-input"/></td>
                            <td><Field name={`proposedRates.${index}.currency`} className="form-input"/></td>
                            <td><Field name={`proposedRates.${index}.effectiveDate`} type="date" className="form-input"/></td>
                            <td><Field name={`proposedRates.${index}.remarks`} className="form-input"/></td>

                            {proposedColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`proposedRates.${index}.dynamicFields.${col.key}`} className="form-input"/>
                              </td>
                            ))}

                            {!isPrintMode &&
                              <td><button type="button" onClick={()=>remove(index)}>Remove</button></td>
                            }
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>
              </div>

              {/* 4. Reason & Impact */}
              <div className="form-section">
                <h3 className="form-section-title">Reason & Impact</h3>
                <div className="form-fields">
                  {field(values,"reasonForChange","Reason for Change")}
                  {field(values,"financialImpact","Financial Impact")}
                  {field(values,"customerCommunicationRequired","Customer Communication Required (Yes/No)")}
                  {field(values,"remarks","Remarks")}
                </div>
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
                    Submit Rate Card Change Request
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

export default FRM02511_RateCardChangeRequest;