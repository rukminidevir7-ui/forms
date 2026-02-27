// FRM01023_BankReconciliationWorking.jsx
// FRM-01023 – Bank Reconciliation Working
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
  bankName: Yup.string().required("Required"),
  accountNumber: Yup.string().required("Required"),
  currency: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01023",
  date: "",
  department: "Treasury & Funding",
  function: "Cash, Banking & Payments",

  bankName: "",
  accountNumber: "",
  currency: "",
  periodFrom: "",
  periodTo: "",
  referenceNumber: "",

  bankBalance: "",
  bookBalance: "",

  reconciliationItems: [
    { description: "", amount: "", remarks: "", dynamicFields: {} }
  ],

  remarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01023_BankReconciliationWorking = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= CALCULATIONS ================= */

  const calculateAdjustments = (rows) =>
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
    <ModernFormWrapper
      formId="FRM-01023"
      title="Bank Reconciliation Working"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Bank Reconciliation Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => {

          const totalAdjustments = calculateAdjustments(values.reconciliationItems);
          const reconciledBalance =
            (Number(values.bankBalance) || 0) + totalAdjustments;

          return (
            <Form>

              <ModernA4Template
                formId="FRM-01023"
                title="BANK RECONCILIATION WORKING"
                department="Treasury & Funding – Cash, Banking & Payments"
              >

                {/* GENERAL INFORMATION */}
                <div className="form-section">
                  <h3 className="form-section-title">General Information</h3>
                  <div className="form-fields">
                    {field(values,"formId","Form ID")}
                    {field(values,"date","Date","date")}
                    {field(values,"bankName","Bank Name")}
                    {field(values,"accountNumber","Account Number")}
                    {field(values,"currency","Currency")}
                    {field(values,"periodFrom","Period From","date")}
                    {field(values,"periodTo","Period To","date")}
                    {field(values,"referenceNumber","Reference Number")}
                  </div>
                </div>

                {/* RECONCILIATION ITEMS */}
                <div className="form-section">
                  <h3 className="form-section-title">Reconciliation Items</h3>

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
                          setFieldValue("reconciliationItems", [
                            ...values.reconciliationItems,
                            { description:"", amount:"", remarks:"", dynamicFields:{} }
                          ])
                        }
                      >
                        + Add Item
                      </button>
                    </div>
                  )}

                  <FieldArray name="reconciliationItems">
                    {({ remove }) => (
                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Description</th>
                            <th>Amount (+/-)</th>
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
                          {values.reconciliationItems.map((row,index)=>(
                            <tr key={index}>
                              <td>
                                <Field name={`reconciliationItems.${index}.description`} className="form-input"/>
                              </td>
                              <td>
                                <Field name={`reconciliationItems.${index}.amount`} type="number" className="form-input"/>
                              </td>
                              <td>
                                <Field name={`reconciliationItems.${index}.remarks`} className="form-input"/>
                              </td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field name={`reconciliationItems.${index}.dynamicFields.${col.key}`} className="form-input"/>
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
                    {field(values,"bankBalance","Balance as per Bank Statement","number")}
                    {field(values,"bookBalance","Balance as per Books","number")}
                    <div className="print-value">
                      Total Adjustments: {totalAdjustments}
                    </div>
                    <div className="print-value">
                      Reconciled Balance: {reconciledBalance}
                    </div>
                  </div>
                </div>

                {/* NOTES */}
                <div className="form-section">
                  <h3 className="form-section-title">Notes</h3>
                  <div className="form-fields">
                    {field(values,"remarks","Remarks")}
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
                      Submit Bank Reconciliation
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

export default FRM01023_BankReconciliationWorking;