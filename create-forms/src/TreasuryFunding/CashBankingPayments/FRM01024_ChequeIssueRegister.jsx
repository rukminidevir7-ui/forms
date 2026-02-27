// FRM01024_ChequeIssueRegister.jsx
// FRM-01024 – Cheque Issue Register
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
  accountNumber: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01024",
  date: "",
  department: "Treasury & Funding",
  function: "Cash, Banking & Payments",

  bankName: "",
  accountNumber: "",
  currency: "",
  location: "",

  chequeDetails: [
    {
      chequeNo: "",
      chequeDate: "",
      payeeName: "",
      amount: "",
      purpose: "",
      issuedBy: "",
      status: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01024_ChequeIssueRegister = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= CALCULATIONS ================= */

  const calculateTotals = (rows) => {
    const totalCheques = rows.length;
    const totalAmount = rows.reduce(
      (sum, row) => sum + (Number(row.amount) || 0), 0
    );
    const cancelledCheques = rows.filter(
      row => row.status === "Cancelled"
    ).length;

    return { totalCheques, totalAmount, cancelledCheques };
  };

  /* ================= COLUMN FUNCTIONS ================= */

  const addColumn = () => {
    const name = prompt("Enter New Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g, "");
    if (dynamicColumns.find(col => col.key === key)) return;
    setDynamicColumns([...dynamicColumns, { key, label: name }]);
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
    <ModernFormWrapper
      formId="FRM-01024"
      title="Cheque Issue Register"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Cheque Issue Register Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => {

          const totals = calculateTotals(values.chequeDetails);

          return (
            <Form>

              <ModernA4Template
                formId="FRM-01024"
                title="CHEQUE ISSUE REGISTER"
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
                    {field(values,"location","Location")}
                  </div>
                </div>

                {/* CHEQUE ISSUE DETAILS */}
                <div className="form-section">
                  <h3 className="form-section-title">Cheque Issue Details</h3>

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
                          setFieldValue("chequeDetails", [
                            ...values.chequeDetails,
                            {
                              chequeNo:"",
                              chequeDate:"",
                              payeeName:"",
                              amount:"",
                              purpose:"",
                              issuedBy:"",
                              status:"",
                              remarks:"",
                              dynamicFields:{}
                            }
                          ])
                        }
                      >
                        + Add Cheque
                      </button>
                    </div>
                  )}

                  <FieldArray name="chequeDetails">
                    {({ remove }) => (
                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Cheque No</th>
                            <th>Cheque Date</th>
                            <th>Payee Name</th>
                            <th>Amount</th>
                            <th>Purpose</th>
                            <th>Issued By</th>
                            <th>Status</th>
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
                          {values.chequeDetails.map((row,index)=>(
                            <tr key={index}>
                              <td><Field name={`chequeDetails.${index}.chequeNo`} className="form-input"/></td>
                              <td><Field name={`chequeDetails.${index}.chequeDate`} type="date" className="form-input"/></td>
                              <td><Field name={`chequeDetails.${index}.payeeName`} className="form-input"/></td>
                              <td><Field name={`chequeDetails.${index}.amount`} type="number" className="form-input"/></td>
                              <td><Field name={`chequeDetails.${index}.purpose`} className="form-input"/></td>
                              <td><Field name={`chequeDetails.${index}.issuedBy`} className="form-input"/></td>
                              <td>
                                <Field as="select" name={`chequeDetails.${index}.status`} className="form-input">
                                  <option value="">Select</option>
                                  <option>Issued</option>
                                  <option>Cleared</option>
                                  <option>Cancelled</option>
                                </Field>
                              </td>
                              <td><Field name={`chequeDetails.${index}.remarks`} className="form-input"/></td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field name={`chequeDetails.${index}.dynamicFields.${col.key}`} className="form-input"/>
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
                    <div className="print-value">Total Cheques Issued: {totals.totalCheques}</div>
                    <div className="print-value">Total Amount: {totals.totalAmount}</div>
                    <div className="print-value">Cancelled Cheques: {totals.cancelledCheques}</div>
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
                      Submit Cheque Register
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

export default FRM01024_ChequeIssueRegister;