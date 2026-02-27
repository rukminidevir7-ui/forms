// FRM01313_OverseasJVWOSRegisterUpdate.jsx
// FRM-01313 – Overseas JV/WOS Register Update Log
// Enterprise Grade – FEMA & RBI – ODI / Overseas Investment

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
  companyName: Yup.string().required("Required"),
  cin: Yup.string().required("Required"),
  pan: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "Board Resolution",
  "Regulatory Filing Proof",
  "Supporting Documents"
];

const initialValues = {
  formId: "FRM-01313",
  date: "",
  department: "FEMA & RBI",
  function: "ODI / Overseas Investment",

  /* 1 */
  companyName: "",
  cin: "",
  pan: "",
  authorizedDealerBank: "",
  financialYear: "",
  preparedBy: "",

  /* 2 Register Table */
  registerRows: [
    {
      overseasEntityName: "",
      country: "",
      entityType: "",
      dateOfUpdate: "",
      natureOfChange: "",
      referenceNo: "",
      updatedBy: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  /* 3 */
  keyObservations: "",
  pendingActions: "",

  mandatoryAttachments: mandatoryDocuments.map(doc => ({
    documentName: doc,
    status: "",
    file: null,
    remarks: ""
  })),

  customAttachments: [],
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  workflowStatus: "",
  comments: "",
  attachments: [],
  customFields: []
};

/* ================= COMPONENT ================= */

const FRM01313_OverseasJVWOSRegisterUpdate = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

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
    <ModernFormWrapper formId="FRM-01313" title="Overseas JV/WOS Register Update Log">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("JV/WOS Register Update Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01313"
              title="FRM-01313 — Overseas JV/WOS Register Update Log"
              department="FEMA & RBI (Foreign Exchange) | ODI / Overseas Investment"
            >

              {/* 1 Organization */}
              <div className="form-section">
                <h3 className="form-section-title">Organization Information</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"pan","PAN")}
                  {field(values,"authorizedDealerBank","Authorized Dealer Bank")}
                  {field(values,"financialYear","Financial Year")}
                  {field(values,"preparedBy","Prepared By")}
                </div>
              </div>

              {/* 2 Register Log */}
              <div className="form-section">
                <h3 className="form-section-title">JV/WOS Register Update Log</h3>

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
                        setFieldValue("registerRows", [
                          ...values.registerRows,
                          {
                            overseasEntityName: "",
                            country: "",
                            entityType: "",
                            dateOfUpdate: "",
                            natureOfChange: "",
                            referenceNo: "",
                            updatedBy: "",
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

                <FieldArray name="registerRows">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Overseas Entity Name</th>
                          <th>Country</th>
                          <th>Type (JV/WOS)</th>
                          <th>Date of Update</th>
                          <th>Nature of Change</th>
                          <th>Reference No.</th>
                          <th>Updated By</th>
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
                        {values.registerRows.map((row,index)=>(
                          <tr key={index}>
                            <td><Field name={`registerRows.${index}.overseasEntityName`} className="form-input"/></td>
                            <td><Field name={`registerRows.${index}.country`} className="form-input"/></td>
                            <td><Field name={`registerRows.${index}.entityType`} className="form-input"/></td>
                            <td><Field type="date" name={`registerRows.${index}.dateOfUpdate`} className="form-input"/></td>
                            <td><Field name={`registerRows.${index}.natureOfChange`} className="form-input"/></td>
                            <td><Field name={`registerRows.${index}.referenceNo`} className="form-input"/></td>
                            <td><Field name={`registerRows.${index}.updatedBy`} className="form-input"/></td>
                            <td><Field name={`registerRows.${index}.remarks`} className="form-input"/></td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`registerRows.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* 3 Notes */}
              <div className="form-section">
                <h3 className="form-section-title">Notes</h3>
                <div className="form-fields">
                  {field(values,"keyObservations","Key Observations")}
                  {field(values,"pendingActions","Pending Actions")}
                </div>
              </div>

              {/* Custom Fields */}
              <FormCustomFields values={values} />

              {/* Attachments */}
              <div className="form-section">
                <FormAttachments values={values} />
              </div>

              {/* Sign-off */}
              <div className="form-section">
                <h3 className="form-section-title">Sign-off</h3>
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
                    Submit JV/WOS Register Update
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

export default FRM01313_OverseasJVWOSRegisterUpdate;