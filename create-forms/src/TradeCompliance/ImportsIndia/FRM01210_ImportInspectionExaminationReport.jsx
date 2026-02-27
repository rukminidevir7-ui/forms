// FRM01210_ImportInspectionChecklist.jsx
// FRM-01210 – Import Inspection / Examination Checklist
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
  shipmentReference: Yup.string().required("Required"),
  inspectorName: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01210",
  date: "",
  department: "Trade Compliance",
  function: "Imports (India)",

  shipmentReference: "",
  billOfEntryNo: "",
  inspectionLocation: "",
  inspectorName: "",
  preparedBy: "",
  businessUnit: "",

  importerName: "",
  supplierExporter: "",
  portOfArrival: "",
  containerPackageNo: "",
  goodsDescription: "",

  checklistItems: [
    { item: "Packages Condition Verified", status: "", remarks: "", dynamicFields: {} },
    { item: "Seal Integrity Checked", status: "", remarks: "", dynamicFields: {} },
    { item: "Quantity Matches Documents", status: "", remarks: "", dynamicFields: {} },
    { item: "Description Matches Invoice", status: "", remarks: "", dynamicFields: {} },
    { item: "HS Code Verified", status: "", remarks: "", dynamicFields: {} },
    { item: "Physical Damage Observed", status: "", remarks: "", dynamicFields: {} },
    { item: "Markings and Labels Verified", status: "", remarks: "", dynamicFields: {} },
    { item: "Compliance with Regulations", status: "", remarks: "", dynamicFields: {} },
    { item: "Samples Collected (if required)", status: "", remarks: "", dynamicFields: {} },
    { item: "Photographic Evidence Captured", status: "", remarks: "", dynamicFields: {} },
    { item: "Inspection Completed", status: "", remarks: "", dynamicFields: {} }
  ],

  overallStatus: "",
  issuesIdentified: "",
  correctiveAction: "",
  summaryRemarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01210_ImportInspectionChecklist = () => {

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
      formId="FRM-01210"
      title="Import Inspection / Examination Checklist"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Import Inspection Checklist Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01210"
              title="IMPORT INSPECTION / EXAMINATION CHECKLIST"
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
                  <Field name="shipmentReference" className="form-input" placeholder="Shipment Reference"/>
                  <Field name="billOfEntryNo" className="form-input" placeholder="Bill of Entry No"/>
                  <Field name="inspectionLocation" className="form-input" placeholder="Inspection Location"/>
                  <Field name="inspectorName" className="form-input" placeholder="Inspector Name"/>
                  <Field name="preparedBy" className="form-input" placeholder="Prepared By"/>
                  <Field name="businessUnit" className="form-input" placeholder="Business Unit"/>
                </div>
              </div>

              {/* SHIPMENT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Shipment Details</h3>
                <div className="form-fields">
                  <Field name="importerName" className="form-input" placeholder="Importer Name"/>
                  <Field name="supplierExporter" className="form-input" placeholder="Supplier / Exporter"/>
                  <Field name="portOfArrival" className="form-input" placeholder="Port of Arrival"/>
                  <Field name="containerPackageNo" className="form-input" placeholder="Container / Package No"/>
                  <Field name="goodsDescription" className="form-input" placeholder="Goods Description"/>
                </div>
              </div>

              {/* CHECKLIST TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">Inspection Checklist</h3>

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
                      + Add Row
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
                                <button type="button" onClick={()=>remove(index)}>
                                  Remove
                                </button>
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
                <h3 className="form-section-title">Inspection Summary</h3>
                <div className="form-fields">
                  <Field name="overallStatus" className="form-input" placeholder="Overall Status"/>
                  <Field name="issuesIdentified" className="form-input" placeholder="Issues Identified"/>
                  <Field name="correctiveAction" className="form-input" placeholder="Corrective Action"/>
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
                              <button type="button" onClick={()=>remove(index)}>
                                Remove
                              </button>
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
                    Submit Inspection Checklist
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

export default FRM01210_ImportInspectionChecklist;