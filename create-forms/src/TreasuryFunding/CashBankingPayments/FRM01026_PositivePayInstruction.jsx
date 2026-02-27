// FRM01026_PositivePayInstruction.jsx
// FRM-01026 – Positive Pay Instruction
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
  chequeDetails: Yup.array().min(1, "At least one cheque required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01026",
  date: "",
  department: "Treasury & Funding",
  function: "Cash, Banking & Payments",
  referenceNumber: "",
  location: "",

  bankName: "",
  accountNumber: "",
  currency: "",
  instructionDate: "",

  chequeDetails: [
    {
      chequeNo: "",
      chequeDate: "",
      payeeName: "",
      amount: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  declarationStatement:
    "The above cheque details are submitted for Positive Pay confirmation with the bank.",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Checked By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01026_PositivePayInstruction = () => {

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
      formId="FRM-01026"
      title="Positive Pay Instruction"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Positive Pay Instruction Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01026"
              title="POSITIVE PAY INSTRUCTION"
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
                  {field(values,"currency","Currency")}
                  {field(values,"instructionDate","Instruction Date","date")}
                </div>
              </div>

              {/* CHEQUE DETAILS TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">Cheque Details</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 15 }}>
                    <button
                      type="button"
                      className="btn-submit"
                      onClick={addColumn}
                    >
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
                            chequeNo: "",
                            chequeDate: "",
                            payeeName: "",
                            amount: "",
                            remarks: "",
                            dynamicFields: {}
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
                        {values.chequeDetails.map((row,index)=>(
                          <tr key={index}>
                            <td><Field name={`chequeDetails.${index}.chequeNo`} className="form-input"/></td>
                            <td><Field name={`chequeDetails.${index}.chequeDate`} type="date" className="form-input"/></td>
                            <td><Field name={`chequeDetails.${index}.payeeName`} className="form-input"/></td>
                            <td><Field name={`chequeDetails.${index}.amount`} type="number" className="form-input"/></td>
                            <td><Field name={`chequeDetails.${index}.remarks`} className="form-input"/></td>

                            {dynamicColumns.map(col => (
                              <td key={col.key}>
                                <Field
                                  name={`chequeDetails.${index}.dynamicFields.${col.key}`}
                                  className="form-input"
                                />
                              </td>
                            ))}

                            {!isPrintMode && (
                              <td>
                                <button
                                  type="button"
                                  onClick={()=>remove(index)}
                                >
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

              {/* DECLARATION */}
              <div className="form-section">
                <h3 className="form-section-title">Declaration</h3>
                <div className="form-fields">
                  {field(values,"declarationStatement","Statement")}
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
                    Submit Positive Pay Instruction
                  </button>
                </div>
              )}

            </ModernA4Template>

          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM01026_PositivePayInstruction;