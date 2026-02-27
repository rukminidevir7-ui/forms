// FRM01034_TreasuryDailyPosition.jsx
// FRM-01034 / 01035 / 01036 – Treasury Daily Position
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
  businessUnit: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01034 / 01035 / 01036",
  date: "",
  department: "Treasury & Funding",
  function: "Cash, Banking & Payments",
  referenceNumber: "",
  location: "",
  currency: "",
  businessUnit: "",
  preparedTime: "",
  preparedBy: "",

  bankBalances: [
    {
      bankName: "",
      accountNumber: "",
      availableBalance: "",
      blockedAmount: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  openingBalance: "",
  receiptsToday: "",
  paymentsToday: "",

  investmentsBorrowings: [
    {
      type: "",
      institution: "",
      amount: "",
      maturityDate: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  keyObservations: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01034_TreasuryDailyPosition = () => {

  const { isPrintMode } = usePrintMode();
  const [bankColumns, setBankColumns] = useState([]);
  const [invColumns, setInvColumns] = useState([]);

  /* ================= COLUMN HANDLERS ================= */

  const addColumn = (type) => {
    const name = prompt("Enter Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");

    if (type === "bank") {
      if (bankColumns.find(c=>c.key===key)) return;
      setBankColumns([...bankColumns,{key,label:name}]);
    } else {
      if (invColumns.find(c=>c.key===key)) return;
      setInvColumns([...invColumns,{key,label:name}]);
    }
  };

  const removeColumn = (type,key) => {
    if (type==="bank")
      setBankColumns(bankColumns.filter(c=>c.key!==key));
    else
      setInvColumns(invColumns.filter(c=>c.key!==key));
  };

  /* ================= CALCULATIONS ================= */

  const calculateSummary = (values) => {

    const totalBank = values.bankBalances.reduce((sum,row)=>{
      const available = Number(row.availableBalance)||0;
      const blocked = Number(row.blockedAmount)||0;
      return sum + (available - blocked);
    },0);

    const totalCash =
      (Number(values.openingBalance)||0) +
      (Number(values.receiptsToday)||0) -
      (Number(values.paymentsToday)||0);

    const totalInvestments = values.investmentsBorrowings
      .filter(r=>r.type==="Investment")
      .reduce((sum,r)=>sum+(Number(r.amount)||0),0);

    const totalBorrowings = values.investmentsBorrowings
      .filter(r=>r.type==="Borrowing")
      .reduce((sum,r)=>sum+(Number(r.amount)||0),0);

    const netLiquidity = totalBank + totalCash + totalInvestments - totalBorrowings;

    return { totalBank, totalCash, totalInvestments, totalBorrowings, netLiquidity };
  };

  const field = (values,name,label,type="text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name]||"_________"}</div>
        : <>
            <Field name={name} type={type} className="form-input"/>
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper
      formId="FRM-01034"
      title="Treasury Daily Position"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Treasury Daily Position Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => {

          const summary = calculateSummary(values);

          return (
            <Form>

              <ModernA4Template
                formId="FRM-01034 / 01035 / 01036"
                title="TREASURY DAILY POSITION"
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
                    {field(values,"currency","Currency")}
                    {field(values,"businessUnit","Business Unit")}
                    {field(values,"preparedTime","Prepared Time","time")}
                    {field(values,"preparedBy","Prepared By")}
                  </div>
                </div>

                {/* BANK BALANCES */}
                <div className="form-section">
                  <h3 className="form-section-title">Bank Balances</h3>

                  {!isPrintMode && (
                    <div style={{marginBottom:15}}>
                      <button type="button" className="btn-submit"
                        onClick={()=>addColumn("bank")}>
                        + Add Column
                      </button>
                      <button type="button" className="btn-submit"
                        style={{marginLeft:10}}
                        onClick={()=>setFieldValue("bankBalances",
                          [...values.bankBalances,{
                            bankName:"",accountNumber:"",
                            availableBalance:"",blockedAmount:"",
                            remarks:"",dynamicFields:{}
                          }]
                        )}>
                        + Add Bank Row
                      </button>
                    </div>
                  )}

                  <FieldArray name="bankBalances">
                    {({ remove })=>(
                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Bank Name</th>
                            <th>Account Number</th>
                            <th>Available</th>
                            <th>Blocked</th>
                            <th>Net Balance</th>
                            <th>Remarks</th>
                            {bankColumns.map(col=>(
                              <th key={col.key}>
                                {col.label}
                                {!isPrintMode &&
                                  <button onClick={()=>removeColumn("bank",col.key)}>x</button>}
                              </th>
                            ))}
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {values.bankBalances.map((row,i)=>{
                            const net =
                              (Number(row.availableBalance)||0) -
                              (Number(row.blockedAmount)||0);

                            return (
                              <tr key={i}>
                                <td><Field name={`bankBalances.${i}.bankName`} className="form-input"/></td>
                                <td><Field name={`bankBalances.${i}.accountNumber`} className="form-input"/></td>
                                <td><Field name={`bankBalances.${i}.availableBalance`} type="number" className="form-input"/></td>
                                <td><Field name={`bankBalances.${i}.blockedAmount`} type="number" className="form-input"/></td>
                                <td className="print-value">{net}</td>
                                <td><Field name={`bankBalances.${i}.remarks`} className="form-input"/></td>

                                {bankColumns.map(col=>(
                                  <td key={col.key}>
                                    <Field name={`bankBalances.${i}.dynamicFields.${col.key}`}
                                      className="form-input"/>
                                  </td>
                                ))}

                                {!isPrintMode &&
                                  <td>
                                    <button type="button" onClick={()=>remove(i)}>
                                      Remove
                                    </button>
                                  </td>}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </FieldArray>
                </div>

                {/* CASH POSITION */}
                <div className="form-section">
                  <h3 className="form-section-title">Cash Position</h3>
                  <div className="form-fields">
                    {field(values,"openingBalance","Opening Balance","number")}
                    {field(values,"receiptsToday","Receipts Today","number")}
                    {field(values,"paymentsToday","Payments Today","number")}
                    <div className="print-value">
                      Closing Balance: {summary.totalCash}
                    </div>
                  </div>
                </div>

                {/* INVESTMENTS & BORROWINGS */}
                <div className="form-section">
                  <h3 className="form-section-title">Investments and Borrowings</h3>

                  {!isPrintMode && (
                    <div style={{marginBottom:15}}>
                      <button type="button" className="btn-submit"
                        onClick={()=>addColumn("inv")}>
                        + Add Column
                      </button>
                      <button type="button" className="btn-submit"
                        style={{marginLeft:10}}
                        onClick={()=>setFieldValue("investmentsBorrowings",
                          [...values.investmentsBorrowings,{
                            type:"",institution:"",
                            amount:"",maturityDate:"",
                            remarks:"",dynamicFields:{}
                          }]
                        )}>
                        + Add Row
                      </button>
                    </div>
                  )}

                  <FieldArray name="investmentsBorrowings">
                    {({ remove })=>(
                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Type</th>
                            <th>Institution</th>
                            <th>Amount</th>
                            <th>Maturity Date</th>
                            <th>Remarks</th>
                            {invColumns.map(col=>(
                              <th key={col.key}>
                                {col.label}
                                {!isPrintMode &&
                                  <button onClick={()=>removeColumn("inv",col.key)}>x</button>}
                              </th>
                            ))}
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {values.investmentsBorrowings.map((row,i)=>(
                            <tr key={i}>
                              <td>
                                <Field as="select"
                                  name={`investmentsBorrowings.${i}.type`}
                                  className="form-input">
                                  <option value="">Select</option>
                                  <option>Investment</option>
                                  <option>Borrowing</option>
                                </Field>
                              </td>
                              <td><Field name={`investmentsBorrowings.${i}.institution`} className="form-input"/></td>
                              <td><Field name={`investmentsBorrowings.${i}.amount`} type="number" className="form-input"/></td>
                              <td><Field name={`investmentsBorrowings.${i}.maturityDate`} type="date" className="form-input"/></td>
                              <td><Field name={`investmentsBorrowings.${i}.remarks`} className="form-input"/></td>

                              {invColumns.map(col=>(
                                <td key={col.key}>
                                  <Field name={`investmentsBorrowings.${i}.dynamicFields.${col.key}`}
                                    className="form-input"/>
                                </td>
                              ))}

                              {!isPrintMode &&
                                <td>
                                  <button type="button" onClick={()=>remove(i)}>
                                    Remove
                                  </button>
                                </td>}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </FieldArray>
                </div>

                {/* LIQUIDITY SUMMARY */}
                <div className="form-section">
                  <h3 className="form-section-title">Liquidity Summary</h3>
                  <div className="form-fields">
                    <div className="print-value">Total Bank Balance: {summary.totalBank}</div>
                    <div className="print-value">Total Cash: {summary.totalCash}</div>
                    <div className="print-value">Total Investments: {summary.totalInvestments}</div>
                    <div className="print-value">Total Borrowings: {summary.totalBorrowings}</div>
                    <div className="print-value">Net Liquidity Position: {summary.netLiquidity}</div>
                  </div>
                </div>

                {/* NOTES */}
                <div className="form-section">
                  <h3 className="form-section-title">Notes</h3>
                  <div className="form-fields">
                    {field(values,"keyObservations","Key Observations")}
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
                        {!isPrintMode &&
                          <button type="button" className="btn-submit"
                            onClick={()=>push({roleName:"New Role",data:{}})}>
                            + Add Role
                          </button>}
                        <div className="three-column-signatures">
                          {values.approvalRoles.map((role,i)=>(
                            <div key={i}>
                              <ApprovalSignatureBlock
                                roleName={role.roleName}
                                value={role.data}
                                allowRoleEdit={!isPrintMode}
                                onRoleNameChange={(val)=>
                                  setFieldValue(`approvalRoles.${i}.roleName`,val)}
                                onChange={(val)=>
                                  setFieldValue(`approvalRoles.${i}.data`,val)}
                              />
                              {!isPrintMode &&
                                <button type="button" onClick={()=>remove(i)}>
                                  Remove Role
                                </button>}
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
                      Submit Treasury Daily Position
                    </button>
                  </div>
                }

              </ModernA4Template>

            </Form>
          );
        }}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM01034_TreasuryDailyPosition;