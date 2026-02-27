// FRM01012_PaymentAuthorizationMatrix.jsx
// FRM-01012 – Payment Authorization Matrix
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
  businessUnit: Yup.string().required("Required"),
  effectiveFrom: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01012",
  date: "",
  department: "Treasury & Funding",
  function: "Cash, Banking & Payments",
  referenceNumber: "",
  location: "",
  effectiveFrom: "",
  effectiveTo: "",
  currency: "",
  businessUnit: "",

  matrixRows: [
    {
      paymentType: "",
      amountRange: "",
      level1: "",
      level2: "",
      level3: "",
      finalAuthority: "",
      dynamicFields: {}
    }
  ],

  exceptions: "",
  specialConditions: "",
  remarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01012_PaymentAuthorizationMatrix = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= ADD COLUMN ================= */

  const addColumn = (values, setFieldValue) => {
    const columnName = prompt("Enter New Column Name");
    if (!columnName) return;

    const key = columnName.replace(/\s+/g, "");
    if (dynamicColumns.find(col => col.key === key)) {
      alert("Column already exists");
      return;
    }

    setDynamicColumns([...dynamicColumns, { key, label: columnName }]);

    const updatedRows = values.matrixRows.map(row => ({
      ...row,
      dynamicFields: { ...row.dynamicFields, [key]: "" }
    }));

    setFieldValue("matrixRows", updatedRows);
  };

  const removeColumn = (key, values, setFieldValue) => {
    const updatedRows = values.matrixRows.map(row => {
      const updatedDynamic = { ...row.dynamicFields };
      delete updatedDynamic[key];
      return { ...row, dynamicFields: updatedDynamic };
    });

    setFieldValue("matrixRows", updatedRows);
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
    <ModernFormWrapper formId="FRM-01012" title="Payment Authorization Matrix">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Payment Authorization Matrix Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01012"
              title="PAYMENT AUTHORIZATION MATRIX"
              department="Treasury & Funding – Cash, Banking & Payments"
            >

              {/* GENERAL INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"date","Date","date")}
                  {field(values,"department","Department")}
                  {field(values,"function","Function")}
                  {field(values,"referenceNumber","Reference Number")}
                  {field(values,"location","Location")}
                  {field(values,"effectiveFrom","Effective From","date")}
                  {field(values,"effectiveTo","Effective To","date")}
                  {field(values,"currency","Currency")}
                  {field(values,"businessUnit","Business Unit")}
                </div>
              </div>

              {/* MATRIX TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization Matrix</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 15 }}>
                    <button
                      type="button"
                      className="btn-submit"
                      onClick={() => addColumn(values, setFieldValue)}
                    >
                      + Add Column
                    </button>

                    <button
                      type="button"
                      className="btn-submit"
                      style={{ marginLeft: 10 }}
                      onClick={() =>
                        setFieldValue("matrixRows", [
                          ...values.matrixRows,
                          {
                            paymentType: "",
                            amountRange: "",
                            level1: "",
                            level2: "",
                            level3: "",
                            finalAuthority: "",
                            dynamicFields: {}
                          }
                        ])
                      }
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="matrixRows">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Payment Type</th>
                          <th>Amount Range</th>
                          <th>Level 1</th>
                          <th>Level 2</th>
                          <th>Level 3</th>
                          <th>Final Authority</th>

                          {dynamicColumns.map(col => (
                            <th key={col.key}>
                              {col.label}
                              {!isPrintMode && (
                                <button
                                  type="button"
                                  onClick={() => removeColumn(col.key, values, setFieldValue)}
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
                        {values.matrixRows.map((row,index)=>(
                          <tr key={index}>
                            <td><Field name={`matrixRows.${index}.paymentType`} className="form-input"/></td>
                            <td><Field name={`matrixRows.${index}.amountRange`} className="form-input"/></td>
                            <td><Field name={`matrixRows.${index}.level1`} className="form-input"/></td>
                            <td><Field name={`matrixRows.${index}.level2`} className="form-input"/></td>
                            <td><Field name={`matrixRows.${index}.level3`} className="form-input"/></td>
                            <td><Field name={`matrixRows.${index}.finalAuthority`} className="form-input"/></td>

                            {dynamicColumns.map(col => (
                              <td key={col.key}>
                                <Field
                                  name={`matrixRows.${index}.dynamicFields.${col.key}`}
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
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>
              </div>

              {/* NOTES */}
              <div className="form-section">
                <h3 className="form-section-title">Notes</h3>
                <div className="form-fields">
                  {field(values,"exceptions","Exceptions")}
                  {field(values,"specialConditions","Special Conditions")}
                  {field(values,"remarks","Remarks")}
                </div>
              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* APPROVAL */}
              <div className="form-section">
                <h3 className="form-section-title">Approval</h3>

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
                                setFieldValue(`approvalRoles.${index}.roleName`,val)
                              }
                              onChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.data`,val)
                              }
                            />
                            {!isPrintMode && (
                              <button
                                type="button"
                                className="btn-remove-role"
                                onClick={()=>remove(index)}
                              >
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
                    Submit Authorization Matrix
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

export default FRM01012_PaymentAuthorizationMatrix;