// FRM01375_RemittanceRegisterUpdate.jsx
// FRM-01375 – Remittance Register Update
// Enterprise Grade – FEMA & RBI – Remittances & Current Account

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { usePrintMode } from "../../PrintModeContext";
import ModernFormWrapper from "../../components/ModernFormWrapper";
import ModernA4Template from "../../components/ModernA4Template";
import ApprovalSignatureBlock from "../../components/ApprovalSignatureBlock";
import "../../styles/FRM00611.css";

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01375",
  department: "FEMA & RBI",
  function: "Remittances & Current Account",

  /* 1. Organization Information */
  companyName: "",
  cin: "",
  pan: "",
  authorizedDealerBank: "",
  registerPeriod: "",
  maintainedBy: "",

  /* 2. Register Entries */
  registerEntries: [
    {
      date: "",
      referenceNo: "",
      counterparty: "",
      country: "",
      natureOfRemittance: "",
      amount: "",
      currency: "",
      purposeCode: "",
      status: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  /* 3. Notes */
  generalNotes: "",

  /* 4. Sign-off */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ]
};

/* ================= COMPONENT ================= */

const FRM01375_RemittanceRegisterUpdate = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

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
        : <Field name={name} type={type} className="form-input"/>
      }
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-01375" title="Remittance Register Update">
      <Formik
        initialValues={initialValues}
        onSubmit={(values)=>{
          console.log(values);
          alert("Remittance Register Updated Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01375"
              title="FRM-01375 — Remittance Register Update"
              department="FEMA & RBI (Foreign Exchange) | Remittances & Current Account"
            >

              {/* 1. Organization Information */}
              <div className="form-section">
                <h3 className="form-section-title">Organization Information</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"pan","PAN")}
                  {field(values,"authorizedDealerBank","Authorized Dealer Bank")}
                  {field(values,"registerPeriod","Register Period")}
                  {field(values,"maintainedBy","Maintained By")}
                </div>
              </div>

              {/* 2. Register Entries */}
              <div className="form-section">
                <h3 className="form-section-title">Register Entries</h3>

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
                        setFieldValue("registerEntries", [
                          ...values.registerEntries,
                          {
                            date: "",
                            referenceNo: "",
                            counterparty: "",
                            country: "",
                            natureOfRemittance: "",
                            amount: "",
                            currency: "",
                            purposeCode: "",
                            status: "",
                            remarks: "",
                            dynamicFields: {}
                          }
                        ])
                      }
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="registerEntries">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Reference No</th>
                          <th>Counterparty</th>
                          <th>Country</th>
                          <th>Nature of Remittance</th>
                          <th>Amount</th>
                          <th>Currency</th>
                          <th>Purpose Code</th>
                          <th>Status</th>
                          <th>Remarks</th>

                          {dynamicColumns.map(col => (
                            <th key={col.key}>
                              {col.label}
                              {!isPrintMode &&
                                <button type="button" onClick={()=>removeColumn(col.key)}> x </button>
                              }
                            </th>
                          ))}

                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>

                      <tbody>
                        {values.registerEntries.map((row,index)=>(
                          <tr key={index}>
                            <td><Field name={`registerEntries.${index}.date`} type="date" className="form-input"/></td>
                            <td><Field name={`registerEntries.${index}.referenceNo`} className="form-input"/></td>
                            <td><Field name={`registerEntries.${index}.counterparty`} className="form-input"/></td>
                            <td><Field name={`registerEntries.${index}.country`} className="form-input"/></td>
                            <td><Field name={`registerEntries.${index}.natureOfRemittance`} className="form-input"/></td>
                            <td><Field name={`registerEntries.${index}.amount`} className="form-input"/></td>
                            <td><Field name={`registerEntries.${index}.currency`} className="form-input"/></td>
                            <td><Field name={`registerEntries.${index}.purposeCode`} className="form-input"/></td>
                            <td><Field name={`registerEntries.${index}.status`} className="form-input"/></td>
                            <td><Field name={`registerEntries.${index}.remarks`} className="form-input"/></td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`registerEntries.${index}.dynamicFields.${col.key}`} className="form-input"/>
                              </td>
                            ))}

                            {!isPrintMode &&
                              <td>
                                <button type="button" onClick={()=>remove(index)}>Remove</button>
                              </td>
                            }
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>

              </div>

              {/* 3. Notes */}
              <div className="form-section">
                <h3 className="form-section-title">Notes</h3>
                {field(values,"generalNotes","General Notes")}
              </div>

              {/* 4. Sign-off */}
              <div className="form-section">
                <h3 className="form-section-title">Sign-off</h3>

                <FieldArray name="approvalRoles">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode &&
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={()=>push({ roleName:"New Role", data:{} })}
                        >
                          + Add Role
                        </button>
                      }

                      <div className="three-column-signatures">
                        {values.approvalRoles.map((role,index)=>(
                          <div key={index}>
                            <ApprovalSignatureBlock
                              roleName={role.roleName}
                              value={role.data}
                              allowRoleEdit={true}
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
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Save Remittance Register
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

export default FRM01375_RemittanceRegisterUpdate;