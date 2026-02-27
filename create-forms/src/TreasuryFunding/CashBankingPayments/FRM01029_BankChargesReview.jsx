// FRM01029_BankChargesReview.jsx
// FRM-01029 / 01030 / 01031 – Bank Charges Review
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
  formId: "FRM-01029 / 01030 / 01031",
  date: "",
  department: "Treasury & Funding",
  function: "Cash, Banking & Payments",
  referenceNumber: "",
  location: "",
  bankName: "",
  accountNumber: "",
  reviewPeriodFrom: "",
  reviewPeriodTo: "",

  chargeDetails: [
    {
      chargeType: "",
      transactionRef: "",
      amount: "",
      expectedAmount: "",
      variance: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  rootCause: "",
  actionRequired: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01029_BankChargesReview = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= COLUMN FUNCTIONS ================= */

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

  /* ================= CALCULATIONS ================= */

  const calculateTotals = (items) => {
    let totalActual = 0;
    let totalExpected = 0;

    items.forEach(row => {
      const actual = Number(row.amount) || 0;
      const expected = Number(row.expectedAmount) || 0;
      totalActual += actual;
      totalExpected += expected;
    });

    return {
      totalActual,
      totalExpected,
      totalVariance: totalActual - totalExpected
    };
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
      formId="FRM-01029"
      title="Bank Charges Review"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Bank Charges Review Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => {

          const totals = calculateTotals(values.chargeDetails);

          return (
            <Form>

              <ModernA4Template
                formId="FRM-01029 / 01030 / 01031"
                title="BANK CHARGES REVIEW"
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
                    {field(values,"bankName","Bank Name")}
                    {field(values,"accountNumber","Account Number")}
                    {field(values,"reviewPeriodFrom","Review Period From","date")}
                    {field(values,"reviewPeriodTo","Review Period To","date")}
                  </div>
                </div>

                {/* CHARGE DETAILS TABLE */}
                <div className="form-section">
                  <h3 className="form-section-title">Bank Charges Details</h3>

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
                          setFieldValue("chargeDetails", [
                            ...values.chargeDetails,
                            {
                              chargeType: "",
                              transactionRef: "",
                              amount: "",
                              expectedAmount: "",
                              variance: "",
                              remarks: "",
                              dynamicFields: {}
                            }
                          ])
                        }
                      >
                        + Add Charge
                      </button>
                    </div>
                  )}

                  <FieldArray name="chargeDetails">
                    {({ remove }) => (
                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Charge Type</th>
                            <th>Transaction Ref</th>
                            <th>Amount</th>
                            <th>Expected Amount</th>
                            <th>Variance</th>
                            <th>Remarks</th>

                            {dynamicColumns.map(col => (
                              <th key={col.key}>
                                {col.label}
                                {!isPrintMode && (
                                  <button
                                    type="button"
                                    onClick={() => removeColumn(col.key)}
                                    style={{ marginLeft: 5 }}
                                  >
                                    x
                                  </button>
                                )}
                              </th>
                            ))}

                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {values.chargeDetails.map((row,index)=>{
                            const variance =
                              (Number(row.amount)||0) -
                              (Number(row.expectedAmount)||0);

                            return (
                              <tr key={index}>
                                <td><Field name={`chargeDetails.${index}.chargeType`} className="form-input"/></td>
                                <td><Field name={`chargeDetails.${index}.transactionRef`} className="form-input"/></td>
                                <td><Field name={`chargeDetails.${index}.amount`} type="number" className="form-input"/></td>
                                <td><Field name={`chargeDetails.${index}.expectedAmount`} type="number" className="form-input"/></td>
                                <td className="print-value">{variance}</td>
                                <td><Field name={`chargeDetails.${index}.remarks`} className="form-input"/></td>

                                {dynamicColumns.map(col => (
                                  <td key={col.key}>
                                    <Field
                                      name={`chargeDetails.${index}.dynamicFields.${col.key}`}
                                      className="form-input"
                                    />
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
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </FieldArray>
                </div>

                {/* ANALYSIS */}
                <div className="form-section">
                  <h3 className="form-section-title">Analysis</h3>
                  <div className="form-fields">
                    <div className="print-value">Total Charges: {totals.totalActual}</div>
                    <div className="print-value">Total Expected Charges: {totals.totalExpected}</div>
                    <div className="print-value">Total Variance: {totals.totalVariance}</div>
                    {field(values,"rootCause","Root Cause")}
                    {field(values,"actionRequired","Action Required")}
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
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={()=>push({ roleName:"New Role", data:{} })}
                          >
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
                      Submit Bank Charges Review
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

export default FRM01029_BankChargesReview;