// FRM01014_CashCountSheet.jsx
// FRM-01014 – Cash Count Sheet
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
  cashLocation: Yup.string().required("Required"),
  currency: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01014",
  date: "",
  department: "Treasury & Funding",
  function: "Cash, Banking & Payments",
  referenceNumber: "",
  location: "",
  cashLocation: "",
  currency: "",
  countType: "",
  countTime: "",

  denominations: [
    { denomination: 2000, count: "", dynamicFields: {} },
    { denomination: 500, count: "", dynamicFields: {} },
    { denomination: 200, count: "", dynamicFields: {} },
    { denomination: 100, count: "", dynamicFields: {} },
    { denomination: 50, count: "", dynamicFields: {} },
    { denomination: 20, count: "", dynamicFields: {} },
    { denomination: 10, count: "", dynamicFields: {} },
    { denomination: "Coins", count: "", dynamicFields: {} },
    { denomination: "Other", count: "", dynamicFields: {} }
  ],

  cashBalanceBooks: "",
  explanation: "",
  remarks: "",

  approvalRoles: [
    { roleName: "Counted By", data: {} },
    { roleName: "Verified By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01014_CashCountSheet = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= CALCULATIONS ================= */

  const calculatePhysicalTotal = (rows) =>
    rows.reduce((sum, row) => {
      const denom = Number(row.denomination);
      const count = Number(row.count);
      if (!isNaN(denom) && !isNaN(count)) {
        return sum + denom * count;
      }
      return sum;
    }, 0);

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
    <ModernFormWrapper formId="FRM-01014" title="Cash Count Sheet">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Cash Count Sheet Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => {

          const physicalTotal = calculatePhysicalTotal(values.denominations);
          const difference =
            physicalTotal - (Number(values.cashBalanceBooks) || 0);

          return (
            <Form>

              <ModernA4Template
                formId="FRM-01014"
                title="CASH COUNT SHEET"
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
                    {field(values,"cashLocation","Cash Location")}
                    {field(values,"currency","Currency")}
                    {field(values,"countType","Count Type (Routine/Surprise)")}
                    {field(values,"countTime","Count Time","time")}
                  </div>
                </div>

                {/* DENOMINATION TABLE */}
                <div className="form-section">
                  <h3 className="form-section-title">Cash Denomination Details</h3>

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
                          setFieldValue("denominations", [
                            ...values.denominations,
                            { denomination:"", count:"", dynamicFields:{} }
                          ])
                        }
                      >
                        + Add Row
                      </button>
                    </div>
                  )}

                  <FieldArray name="denominations">
                    {({ remove }) => (
                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Denomination</th>
                            <th>No. of Notes/Coins</th>
                            <th>Amount</th>

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
                          {values.denominations.map((row,index)=>{
                            const rowAmount =
                              !isNaN(Number(row.denomination)) &&
                              !isNaN(Number(row.count))
                                ? Number(row.denomination)*Number(row.count)
                                : "";

                            return (
                              <tr key={index}>
                                <td>
                                  <Field name={`denominations.${index}.denomination`} className="form-input"/>
                                </td>
                                <td>
                                  <Field name={`denominations.${index}.count`} type="number" className="form-input"/>
                                </td>
                                <td>{rowAmount}</td>

                                {dynamicColumns.map(col=>(
                                  <td key={col.key}>
                                    <Field name={`denominations.${index}.dynamicFields.${col.key}`} className="form-input"/>
                                  </td>
                                ))}

                                {!isPrintMode && (
                                  <td>
                                    <button type="button" onClick={()=>remove(index)}>Remove</button>
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

                {/* SUMMARY */}
                <div className="form-section">
                  <h3 className="form-section-title">Summary</h3>
                  <div className="form-fields">
                    <div className="print-value">Total Physical Cash: {physicalTotal}</div>
                    {field(values,"cashBalanceBooks","Cash Balance as per Books","number")}
                    <div className="print-value">
                      Difference (Excess/Short): {difference}
                    </div>
                    {field(values,"explanation","Explanation for Difference")}
                  </div>
                </div>

                {/* OBSERVATIONS */}
                <div className="form-section">
                  <h3 className="form-section-title">Observations</h3>
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
                      Submit Cash Count Sheet
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

export default FRM01014_CashCountSheet;