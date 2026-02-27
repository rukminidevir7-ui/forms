// FRM01020_CashAdvanceSettlement.jsx
// FRM-01020 – Cash Advance Settlement
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
  advanceReference: Yup.string().required("Required"),
  employeeName: Yup.string().required("Required"),
  currency: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01020",
  date: "",
  department: "Treasury & Funding",
  function: "Cash, Banking & Payments",
  referenceNumber: "",
  location: "",

  advanceReference: "",
  currency: "",
  advanceDate: "",
  settlementDate: "",

  employeeName: "",
  employeeId: "",
  employeeDepartment: "",
  purposeOfAdvance: "",

  advanceAmount: "",

  expenseDetails: [
    { category: "", amount: "", voucherRef: "", remarks: "", dynamicFields: {} }
  ],

  explanation: "",

  approvalRoles: [
    { roleName: "Requested By", data: {} },
    { roleName: "Verified By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01020_CashAdvanceSettlement = () => {

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
    <ModernFormWrapper formId="FRM-01020" title="Cash Advance Settlement">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Cash Advance Settlement Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => {

          const totalExpenses = calculateTotalExpenses(values.expenseDetails);
          const balance =
            (Number(values.advanceAmount) || 0) - totalExpenses;

          return (
            <Form>

              <ModernA4Template
                formId="FRM-01020"
                title="CASH ADVANCE SETTLEMENT"
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
                    {field(values,"advanceReference","Advance Reference")}
                    {field(values,"currency","Currency")}
                    {field(values,"advanceDate","Advance Date","date")}
                    {field(values,"settlementDate","Settlement Date","date")}
                  </div>
                </div>

                {/* EMPLOYEE DETAILS */}
                <div className="form-section">
                  <h3 className="form-section-title">Employee / Requester Details</h3>
                  <div className="form-fields">
                    {field(values,"employeeName","Name")}
                    {field(values,"employeeId","Employee ID")}
                    {field(values,"employeeDepartment","Department")}
                    {field(values,"purposeOfAdvance","Purpose of Advance")}
                  </div>
                </div>

                {/* EXPENSE TABLE */}
                <div className="form-section">
                  <h3 className="form-section-title">Expense Details</h3>

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
                          setFieldValue("expenseDetails", [
                            ...values.expenseDetails,
                            { category:"", amount:"", voucherRef:"", remarks:"", dynamicFields:{} }
                          ])
                        }
                      >
                        + Add Expense
                      </button>
                    </div>
                  )}

                  <FieldArray name="expenseDetails">
                    {({ remove }) => (
                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Expense Category</th>
                            <th>Amount</th>
                            <th>Voucher / Bill Ref</th>
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
                          {values.expenseDetails.map((row,index)=>(
                            <tr key={index}>
                              <td>
                                <Field name={`expenseDetails.${index}.category`} className="form-input"/>
                              </td>
                              <td>
                                <Field name={`expenseDetails.${index}.amount`} type="number" className="form-input"/>
                              </td>
                              <td>
                                <Field name={`expenseDetails.${index}.voucherRef`} className="form-input"/>
                              </td>
                              <td>
                                <Field name={`expenseDetails.${index}.remarks`} className="form-input"/>
                              </td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field name={`expenseDetails.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

                {/* SETTLEMENT SUMMARY */}
                <div className="form-section">
                  <h3 className="form-section-title">Settlement Summary</h3>
                  <div className="form-fields">
                    {field(values,"advanceAmount","Advance Amount","number")}
                    <div className="print-value">Total Expenses: {totalExpenses}</div>
                    <div className="print-value">
                      Balance Payable / Recoverable: {balance}
                    </div>
                    {field(values,"explanation","Explanation")}
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
                      Submit Cash Advance Settlement
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

export default FRM01020_CashAdvanceSettlement;