// FRM01008_BankAccountOpeningChecklist.jsx
// FRM-01008 – Bank Account Opening Checklist
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
  legalEntityName: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01008",
  date: "",
  department: "Treasury & Funding",
  function: "Cash, Banking & Payments",
  referenceNumber: "",
  location: "",

  bankName: "",
  branch: "",
  accountType: "",
  currency: "",

  legalEntityName: "",
  registeredAddress: "",
  pan: "",
  cin: "",
  authorizedSignatory: "",

  checklistItems: [
    {
      item: "Board Resolution",
      available: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  generalRemarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01008_BankAccountOpeningChecklist = () => {

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

    // Initialize field for existing rows
    const updatedRows = values.checklistItems.map(row => ({
      ...row,
      dynamicFields: {
        ...row.dynamicFields,
        [key]: ""
      }
    }));

    setFieldValue("checklistItems", updatedRows);
  };

  /* ================= REMOVE COLUMN ================= */

  const removeColumn = (key, values, setFieldValue) => {

    const updatedRows = values.checklistItems.map(row => {
      const updatedDynamic = { ...row.dynamicFields };
      delete updatedDynamic[key];
      return { ...row, dynamicFields: updatedDynamic };
    });

    setFieldValue("checklistItems", updatedRows);
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
      formId="FRM-01008"
      title="Bank Account Opening Checklist"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Bank Account Opening Checklist Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01008"
              title="BANK ACCOUNT OPENING CHECKLIST"
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
                  {field(values,"bankName","Bank Name")}
                  {field(values,"branch","Branch")}
                  {field(values,"accountType","Account Type")}
                  {field(values,"currency","Currency")}
                </div>
              </div>

              {/* ENTITY DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Entity Details</h3>
                <div className="form-fields">
                  {field(values,"legalEntityName","Legal Entity Name")}
                  {field(values,"registeredAddress","Registered Address")}
                  {field(values,"pan","PAN")}
                  {field(values,"cin","CIN / Registration No")}
                  {field(values,"authorizedSignatory","Authorized Signatory")}
                </div>
              </div>

              {/* CHECKLIST */}
              <div className="form-section">
                <h3 className="form-section-title">Checklist Items</h3>

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
                        setFieldValue("checklistItems", [
                          ...values.checklistItems,
                          {
                            item: "",
                            available: "",
                            remarks: "",
                            dynamicFields: {}
                          }
                        ])
                      }
                    >
                      + Add Checklist Item
                    </button>
                  </div>
                )}

                <FieldArray name="checklistItems">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Item Description</th>
                          <th>Available (Yes/No)</th>
                          <th>Remarks</th>

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
                        {values.checklistItems.map((row,index)=>(
                          <tr key={index}>
                            <td>
                              <Field
                                name={`checklistItems.${index}.item`}
                                className="form-input"
                              />
                            </td>

                            <td>
                              <Field
                                as="select"
                                name={`checklistItems.${index}.available`}
                                className="form-input"
                              >
                                <option value="">Select</option>
                                <option>Yes</option>
                                <option>No</option>
                              </Field>
                            </td>

                            <td>
                              <Field
                                name={`checklistItems.${index}.remarks`}
                                className="form-input"
                              />
                            </td>

                            {dynamicColumns.map(col => (
                              <td key={col.key}>
                                <Field
                                  name={`checklistItems.${index}.dynamicFields.${col.key}`}
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
                  {field(values,"generalRemarks","General Remarks")}
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
                    Submit Bank Account Opening Checklist
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

export default FRM01008_BankAccountOpeningChecklist;