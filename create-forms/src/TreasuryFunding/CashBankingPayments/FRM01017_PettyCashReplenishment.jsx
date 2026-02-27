// FRM01017_PettyCashReplenishment.jsx
// FRM-01017 – Petty Cash Replenishment
// Enterprise Grade – Treasury & Funding – Cash, Banking & Payments

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
  pettyCashLocation: Yup.string().required("Required"),
  currency: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01017",
  date: "",
  department: "Treasury & Funding",
  function: "Cash, Banking & Payments",
  referenceNumber: "",
  location: "",

  pettyCashLocation: "",
  currency: "",
  requestedAmount: "",
  replenishmentMethod: "",

  custodianName: "",
  employeeId: "",
  custodianDepartment: "",
  contactNumber: "",

  expenseSummary: [
    { category: "", amount: "", voucherRef: "", remarks: "", dynamicFields: {} }
  ],

  cashOnHand: "",
  explanation: "",

  approvalRoles: [
    { roleName: "Requested By", data: {} },
    { roleName: "Verified By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01017_PettyCashReplenishment = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= CALCULATIONS ================= */

  const calculateTotalExpenses = (rows) =>
    rows.reduce((sum, row) => sum + (Number(row.amount) || 0), 0);

  /* ================= COLUMN FUNCTIONS ================= */

  const addColumn = () => {
    const name = prompt("Enter New Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");
    if (dynamicColumns.find(col=>col.key===key)) return;
    setDynamicColumns([...dynamicColumns,{key,label:name}]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col=>col.key!==key));
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
    <ModernFormWrapper formId="FRM-01017" title="Petty Cash Replenishment">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Petty Cash Replenishment Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => {

          const totalExpenses = calculateTotalExpenses(values.expenseSummary);
          const replenishmentAmount =
            totalExpenses - (Number(values.cashOnHand) || 0);

          return (
            <Form>

              <ModernA4Template
                formId="FRM-01017"
                title="PETTY CASH REPLENISHMENT"
                department="Treasury & Funding – Cash, Banking & Payments"
              >

                {/* GENERAL INFORMATION */}
                <div className="form-section">
                  <h3 className="form-section-title">General Information</h3>
                  <div className="form-fields">
                    {field(values,"formId","Form ID")}
                    {field(values,"date","Date","date")}
                    {field(values,"referenceNumber","Reference Number")}
                    {field(values,"location","Location")}
                    {field(values,"pettyCashLocation","Petty Cash Location")}
                    {field(values,"currency","Currency")}
                    {field(values,"requestedAmount","Requested Amount","number")}
                    {field(values,"replenishmentMethod","Replenishment Method")}
                  </div>
                </div>

                {/* CUSTODIAN DETAILS */}
                <div className="form-section">
                  <h3 className="form-section-title">Custodian Details</h3>
                  <div className="form-fields">
                    {field(values,"custodianName","Custodian Name")}
                    {field(values,"employeeId","Employee ID")}
                    {field(values,"custodianDepartment","Department")}
                    {field(values,"contactNumber","Contact Number")}
                  </div>
                </div>

                {/* EXPENSE SUMMARY TABLE */}
                <div className="form-section">
                  <h3 className="form-section-title">Expense Summary</h3>

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
                          setFieldValue("expenseSummary", [
                            ...values.expenseSummary,
                            { category:"", amount:"", voucherRef:"", remarks:"", dynamicFields:{} }
                          ])
                        }
                      >
                        + Add Expense
                      </button>
                    </div>
                  )}

                  <FieldArray name="expenseSummary">
                    {({ remove }) => (
                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Expense Category</th>
                            <th>Amount</th>
                            <th>Voucher Reference</th>
                            <th>Remarks</th>

                            {dynamicColumns.map(col=>(
                              <th key={col.key}>
                                {col.label}
                                {!isPrintMode && (
                                  <button type="button" onClick={()=>removeColumn(col.key)}>x</button>
                                )}
                              </th>
                            ))}

                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {values.expenseSummary.map((row,index)=>(
                            <tr key={index}>
                              <td>
                                <Field name={`expenseSummary.${index}.category`} className="form-input"/>
                              </td>
                              <td>
                                <Field name={`expenseSummary.${index}.amount`} type="number" className="form-input"/>
                              </td>
                              <td>
                                <Field name={`expenseSummary.${index}.voucherRef`} className="form-input"/>
                              </td>
                              <td>
                                <Field name={`expenseSummary.${index}.remarks`} className="form-input"/>
                              </td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field name={`expenseSummary.${index}.dynamicFields.${col.key}`} className="form-input"/>
                                </td>
                              ))}

                              {!isPrintMode && (
                                <td>
                                  <button type="button" onClick={()=>remove(index)}>
                                    Remove
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </FieldArray>
                </div>

                {/* SUMMARY */}
                <div className="form-section">
                  <h3 className="form-section-title">Summary</h3>
                  <div className="form-fields">
                    <div className="print-value">Total Expenses: {totalExpenses}</div>
                    {field(values,"cashOnHand","Cash on Hand","number")}
                    <div className="print-value">
                      Replenishment Amount Requested: {replenishmentAmount}
                    </div>
                    {field(values,"explanation","Explanation / Notes")}
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
                          <button type="button" className="btn-submit"
                            onClick={()=>push({ roleName:"New Role", data:{} })}>
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
                                  setFieldValue(`approvalRoles.${index}.roleName`,val)}
                                onChange={(val)=>
                                  setFieldValue(`approvalRoles.${index}.data`,val)}
                              />
                              {!isPrintMode && (
                                <button type="button" onClick={()=>remove(index)}>
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
                      Submit Petty Cash Replenishment
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

export default FRM01017_PettyCashReplenishment;