// FRM01189_ImportPurchaseOrderChecklist.jsx
// FRM-01189 – Import Purchase Order Checklist
// Enterprise Grade – Trade Compliance – Imports (India)

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
  poNumber: Yup.string().required("Required"),
  supplierName: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01189",
  date: "",
  department: "Trade Compliance",
  function: "Imports (India)",
  poNumber: "",
  referenceNumber: "",
  supplierName: "",
  countryOfSupplier: "",
  businessUnit: "",
  preparedBy: "",

  checklistItems: [
    { item: "Supplier Details Verified", status: "", remarks: "", dynamicFields: {} },
    { item: "PO Terms and Conditions Reviewed", status: "", remarks: "", dynamicFields: {} },
    { item: "Incoterms Confirmed", status: "", remarks: "", dynamicFields: {} },
    { item: "Currency and Pricing Verified", status: "", remarks: "", dynamicFields: {} },
    { item: "HS Code Confirmed", status: "", remarks: "", dynamicFields: {} },
    { item: "Import License Requirement Checked", status: "", remarks: "", dynamicFields: {} },
    { item: "Restricted Goods Screening Completed", status: "", remarks: "", dynamicFields: {} },
    { item: "Delivery Terms Confirmed", status: "", remarks: "", dynamicFields: {} },
    { item: "Compliance Requirements Reviewed", status: "", remarks: "", dynamicFields: {} },
    { item: "Approvals Obtained", status: "", remarks: "", dynamicFields: {} }
  ],

  overallStatus: "",
  pendingItems: "",
  comments: "",
  finalRemarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01189_ImportPurchaseOrderChecklist = () => {

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
      formId="FRM-01189"
      title="Import Purchase Order Checklist"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Import Purchase Order Checklist Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01189"
              title="IMPORT PURCHASE ORDER CHECKLIST"
              department="Trade Compliance – Imports (India)"
            >

              {/* GENERAL INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"date","Date","date")}
                  {field(values,"department","Department")}
                  {field(values,"function","Function")}
                  {field(values,"poNumber","PO Number")}
                  {field(values,"referenceNumber","Reference Number")}
                  {field(values,"supplierName","Supplier Name")}
                  {field(values,"countryOfSupplier","Country of Supplier")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"preparedBy","Prepared By")}
                </div>
              </div>

              {/* CHECKLIST TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">Checklist Items</h3>

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
                        setFieldValue("checklistItems", [
                          ...values.checklistItems,
                          { item: "", status: "", remarks: "", dynamicFields: {} }
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
                          <th>Status (Yes/No)</th>
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
                        {values.checklistItems.map((row,index)=>(
                          <tr key={index}>
                            <td>
                              <Field name={`checklistItems.${index}.item`} className="form-input"/>
                            </td>
                            <td>
                              <Field as="select"
                                name={`checklistItems.${index}.status`}
                                className="form-input">
                                <option value="">Select</option>
                                <option>Yes</option>
                                <option>No</option>
                              </Field>
                            </td>
                            <td>
                              <Field name={`checklistItems.${index}.remarks`} className="form-input"/>
                            </td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`checklistItems.${index}.dynamicFields.${col.key}`} className="form-input"/>
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
                <h3 className="form-section-title">Checklist Summary</h3>
                <div className="form-fields">
                  {field(values,"overallStatus","Overall Status")}
                  {field(values,"pendingItems","Pending Items")}
                  {field(values,"comments","Comments")}
                  {field(values,"finalRemarks","Remarks")}
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
                        <button type="button" className="btn-submit" onClick={()=>push({ roleName:"New Role", data:{} })}>
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
                    Submit Import Purchase Order Checklist
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

export default FRM01189_ImportPurchaseOrderChecklist;