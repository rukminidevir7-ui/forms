// FRM01217_ImportRegisterUpdate.jsx
// FRM-01217 – Import Register Update
// Enterprise Grade – Trade Compliance – Imports (India)

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
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
  registerPeriod: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01217",
  date: "",
  department: "Trade Compliance",
  function: "Imports (India)",
  registerPeriod: "",
  businessUnit: "",
  preparedBy: "",
  location: "",

  registerEntries: [
    {
      entryNo: "",
      billOfEntryNo: "",
      entryDate: "",
      importer: "",
      supplier: "",
      hsCode: "",
      value: "",
      status: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  totalEntries: "",
  openItems: "",
  closedItems: "",
  summaryRemarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01217_ImportRegisterUpdate = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= COLUMN FUNCTIONS ================= */

  const addColumn = () => {
    const columnName = prompt("Enter Column Name");
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

  return (
    <ModernFormWrapper
      formId="FRM-01217"
      title="Import Register Update"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Import Register Update Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01217"
              title="IMPORT REGISTER UPDATE"
              department="Trade Compliance – Imports (India)"
            >

              {/* GENERAL INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  <Field name="formId" className="form-input" disabled />
                  <Field name="date" type="date" className="form-input" />
                  <Field name="department" className="form-input" />
                  <Field name="function" className="form-input" />
                  <Field name="registerPeriod" className="form-input" placeholder="Register Period"/>
                  <Field name="businessUnit" className="form-input" placeholder="Business Unit"/>
                  <Field name="preparedBy" className="form-input" placeholder="Prepared By"/>
                  <Field name="location" className="form-input" placeholder="Location"/>
                </div>
              </div>

              {/* REGISTER TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">Import Register Entries</h3>

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
                        setFieldValue("registerEntries", [
                          ...values.registerEntries,
                          {
                            entryNo: "",
                            billOfEntryNo: "",
                            entryDate: "",
                            importer: "",
                            supplier: "",
                            hsCode: "",
                            value: "",
                            status: "",
                            remarks: "",
                            dynamicFields: {}
                          }
                        ])
                      }
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="registerEntries">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Entry No</th>
                          <th>Bill of Entry No</th>
                          <th>Date</th>
                          <th>Importer</th>
                          <th>Supplier</th>
                          <th>HS Code</th>
                          <th>Value</th>
                          <th>Status</th>
                          <th>Remarks</th>

                          {dynamicColumns.map(col => (
                            <th key={col.key}>
                              {col.label}
                              {!isPrintMode &&
                                <button type="button" onClick={()=>removeColumn(col.key)}>x</button>
                              }
                            </th>
                          ))}

                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>

                      <tbody>
                        {values.registerEntries.map((row,index)=>(
                          <tr key={index}>
                            <td><Field name={`registerEntries.${index}.entryNo`} className="form-input"/></td>
                            <td><Field name={`registerEntries.${index}.billOfEntryNo`} className="form-input"/></td>
                            <td><Field type="date" name={`registerEntries.${index}.entryDate`} className="form-input"/></td>
                            <td><Field name={`registerEntries.${index}.importer`} className="form-input"/></td>
                            <td><Field name={`registerEntries.${index}.supplier`} className="form-input"/></td>
                            <td><Field name={`registerEntries.${index}.hsCode`} className="form-input"/></td>
                            <td><Field name={`registerEntries.${index}.value`} className="form-input"/></td>
                            <td><Field name={`registerEntries.${index}.status`} className="form-input"/></td>
                            <td><Field name={`registerEntries.${index}.remarks`} className="form-input"/></td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`registerEntries.${index}.dynamicFields.${col.key}`} className="form-input"/>
                              </td>
                            ))}

                            {!isPrintMode &&
                              <td>
                                <button type="button" onClick={()=>remove(index)}>Remove</button>
                              </td>
                            }
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
                  <Field name="totalEntries" className="form-input" placeholder="Total Entries"/>
                  <Field name="openItems" className="form-input" placeholder="Open Items"/>
                  <Field name="closedItems" className="form-input" placeholder="Closed Items"/>
                  <Field name="summaryRemarks" className="form-input" placeholder="Remarks"/>
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
                              <button type="button" onClick={()=>remove(index)}>Remove</button>
                            }
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
                    Submit Import Register Update
                  </button>
                </div>
              }

            </ModernA4Template>
          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM01217_ImportRegisterUpdate;