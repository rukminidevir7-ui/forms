// FRM02568_PaymentReconciliationWorkingUniversal.jsx
// FRM-02568 – Payment Reconciliation Working — Universal Form
// Enterprise Grade – Client Billing & Revenue Operations – Collections, Receipts & Disputes

import React, { useState, useEffect } from "react";
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
  reconciliationReferenceNo: Yup.string().required("Required"),
  reconciliationDate: Yup.date().required("Required"),
  clientName: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02568",
  department: "Client Billing & Revenue Operations",
  function: "Collections, Receipts & Disputes",

  /* 1. Context */
  reconciliationReferenceNo: "",
  reconciliationDate: "",
  businessUnit: "",
  period: "",
  preparedBy: "",

  /* 2. Client Details */
  clientName: "",
  clientCode: "",
  accountLedger: "",

  /* 3. Reconciliation Lines */
  reconLines: [
    {
      lineNo: "",
      transactionDate: "",
      reference: "",
      description: "",
      debit: "",
      credit: "",
      balance: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  /* 4. Summary */
  openingBalance: "",
  totalDebits: "",
  totalCredits: "",
  closingBalance: "",
  differencesIdentified: "",

  /* 5. Notes & Sign-off */
  notes: "",
  approvalRoles: [
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02568_PaymentReconciliationWorkingUniversal = () => {

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

  const calculateSummary = (values, setFieldValue) => {
    const totalDebits = values.reconLines.reduce(
      (sum, row) => sum + Number(row.debit || 0), 0
    );
    const totalCredits = values.reconLines.reduce(
      (sum, row) => sum + Number(row.credit || 0), 0
    );
    const opening = Number(values.openingBalance || 0);
    const closing = opening + totalDebits - totalCredits;

    setFieldValue("totalDebits", totalDebits.toFixed(2));
    setFieldValue("totalCredits", totalCredits.toFixed(2));
    setFieldValue("closingBalance", closing.toFixed(2));
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
    <ModernFormWrapper formId="FRM-02568" title="Payment Reconciliation Working">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Reconciliation Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => {

          useEffect(() => {
            calculateSummary(values, setFieldValue);
          }, [values.reconLines, values.openingBalance]);

          return (
            <Form>

              <ModernA4Template
                formId="FRM-02568"
                title="FRM-02568 — Payment Reconciliation Working — Universal Form"
                department="Client Billing & Revenue Operations | Collections, Receipts & Disputes"
              >

                {/* 1. Context */}
                <div className="form-section">
                  <h3 className="form-section-title">Reconciliation Context</h3>
                  <div className="form-fields">
                    {field(values,"reconciliationReferenceNo","Reference No")}
                    {field(values,"reconciliationDate","Reconciliation Date","date")}
                    {field(values,"businessUnit","Business Unit")}
                    {field(values,"period","Period")}
                    {field(values,"preparedBy","Prepared By")}
                  </div>
                </div>

                {/* 2. Client Details */}
                <div className="form-section">
                  <h3 className="form-section-title">Client Details</h3>
                  <div className="form-fields">
                    {field(values,"clientName","Client Name")}
                    {field(values,"clientCode","Client Code")}
                    {field(values,"accountLedger","Account / Ledger")}
                  </div>
                </div>

                {/* 3. Reconciliation Details */}
                <div className="form-section">
                  <h3 className="form-section-title">Reconciliation Details</h3>

                  {!isPrintMode && (
                    <div style={{ marginBottom:15 }}>
                      <button type="button" className="btn-submit" onClick={addColumn}>
                        + Add Column
                      </button>
                      <button
                        type="button"
                        className="btn-submit"
                        style={{ marginLeft:10 }}
                        onClick={()=>setFieldValue("reconLines",[
                          ...values.reconLines,
                          {
                            lineNo:"",
                            transactionDate:"",
                            reference:"",
                            description:"",
                            debit:"",
                            credit:"",
                            balance:"",
                            remarks:"",
                            dynamicFields:{}
                          }
                        ])}
                      >
                        + Add Row
                      </button>
                    </div>
                  )}

                  <FieldArray name="reconLines">
                    {({ remove }) => (
                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Line No</th>
                            <th>Transaction Date</th>
                            <th>Reference</th>
                            <th>Description</th>
                            <th>Debit</th>
                            <th>Credit</th>
                            <th>Balance</th>
                            <th>Remarks</th>
                            {dynamicColumns.map(col=>(
                              <th key={col.key}>{col.label}</th>
                            ))}
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {values.reconLines.map((row,index)=>(
                            <tr key={index}>
                              <td><Field name={`reconLines.${index}.lineNo`} className="form-input"/></td>
                              <td><Field type="date" name={`reconLines.${index}.transactionDate`} className="form-input"/></td>
                              <td><Field name={`reconLines.${index}.reference`} className="form-input"/></td>
                              <td><Field name={`reconLines.${index}.description`} className="form-input"/></td>
                              <td><Field type="number" name={`reconLines.${index}.debit`} className="form-input"/></td>
                              <td><Field type="number" name={`reconLines.${index}.credit`} className="form-input"/></td>
                              <td><Field name={`reconLines.${index}.balance`} className="form-input"/></td>
                              <td><Field name={`reconLines.${index}.remarks`} className="form-input"/></td>
                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field name={`reconLines.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

                {/* 4. Summary */}
                <div className="form-section">
                  <h3 className="form-section-title">Summary</h3>
                  <div className="form-fields">
                    {field(values,"openingBalance","Opening Balance","number")}
                    {field(values,"totalDebits","Total Debits")}
                    {field(values,"totalCredits","Total Credits")}
                    {field(values,"closingBalance","Closing Balance")}
                    {field(values,"differencesIdentified","Differences Identified")}
                  </div>
                </div>

                <FormAttachments values={values} />
                <FormCustomFields values={values} />

                {/* 5. Sign-off */}
                <div className="form-section">
                  <h3 className="form-section-title">Notes & Sign-off</h3>
                  <div className="form-fields">
                    {field(values,"notes","Notes")}
                  </div>

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
                      Submit Reconciliation
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

export default FRM02568_PaymentReconciliationWorkingUniversal;