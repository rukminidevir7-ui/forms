// FRM02516_POMappingValidationUniversal.jsx
// FRM-02516 – PO Mapping & Validation — Universal Form
// Enterprise Grade – Client Billing & Revenue Operations – Billing Setup & Master Data

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
  clientName: Yup.string().required("Required"),
  poNumber: Yup.string().required("Required"),
  approvalStatus: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02516",
  department: "Client Billing & Revenue Operations",
  function: "Billing Setup & Master Data",

  /* 1. Client / Project Details */
  clientName: "",
  clientCode: "",
  projectName: "",
  businessUnit: "",
  referenceNo: "",
  requestDate: "",

  /* 2. Purchase Order Details */
  poNumber: "",
  poDate: "",
  customerName: "",
  poCurrency: "",
  poTotalValue: "",
  validityPeriod: "",

  /* 3. Mapping Details */
  mappingItems: [
    {
      serviceItem: "",
      billingCode: "",
      rate: "",
      currency: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  /* 4. Validation Checks */
  scopeMatch: "",
  rateMatch: "",
  currencyMatch: "",
  complianceCheck: "",
  validationRemarks: "",

  /* 5. Documentation */
  mandatoryAttachments: [
    { documentName: "Signed PO Copy", status: "", remarks: "" },
    { documentName: "Rate Card / Contract", status: "", remarks: "" },
    { documentName: "Scope of Work (SOW)", status: "", remarks: "" }
  ],

  /* 6. Workflow */
  approvalRoles: [
    { roleName: "Initiated By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalStatus: "",
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02516_POMappingValidationUniversal = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ---------- Dynamic Column ---------- */

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
    <ModernFormWrapper formId="FRM-02516" title="PO Mapping & Validation — Universal Form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("PO Mapping & Validation Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02516"
              title="FRM-02516 — PO Mapping & Validation — Universal Form"
              department="Client Billing & Revenue Operations | Billing Setup & Master Data"
            >

              {/* 1. Client / Project Details */}
              <div className="form-section">
                <h3 className="form-section-title">Client / Project Details</h3>
                <div className="form-fields">
                  {field(values,"clientName","Client Name")}
                  {field(values,"clientCode","Client Code")}
                  {field(values,"projectName","Project / Contract Name")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"referenceNo","Reference No")}
                  {field(values,"requestDate","Request Date","date")}
                </div>
              </div>

              {/* 2. Purchase Order Details */}
              <div className="form-section">
                <h3 className="form-section-title">Purchase Order Details</h3>
                <div className="form-fields">
                  {field(values,"poNumber","PO Number")}
                  {field(values,"poDate","PO Date","date")}
                  {field(values,"customerName","Customer Name")}
                  {field(values,"poCurrency","PO Currency")}
                  {field(values,"poTotalValue","PO Total Value")}
                  {field(values,"validityPeriod","Validity Period")}
                </div>
              </div>

              {/* 3. Mapping Details */}
              <div className="form-section">
                <h3 className="form-section-title">Mapping Details</h3>

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
                        setFieldValue("mappingItems", [
                          ...values.mappingItems,
                          {
                            serviceItem: "",
                            billingCode: "",
                            rate: "",
                            currency: "",
                            remarks: "",
                            dynamicFields: {}
                          }
                        ])
                      }
                    >
                      + Add Line Item
                    </button>
                  </div>
                )}

                <FieldArray name="mappingItems">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Service / Item</th>
                          <th>Billing Code</th>
                          <th>Rate</th>
                          <th>Currency</th>
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
                        {values.mappingItems.map((row,index)=>(
                          <tr key={index}>
                            <td><Field name={`mappingItems.${index}.serviceItem`} className="form-input"/></td>
                            <td><Field name={`mappingItems.${index}.billingCode`} className="form-input"/></td>
                            <td><Field name={`mappingItems.${index}.rate`} className="form-input"/></td>
                            <td><Field name={`mappingItems.${index}.currency`} className="form-input"/></td>
                            <td><Field name={`mappingItems.${index}.remarks`} className="form-input"/></td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`mappingItems.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

            <FormCustomFields values={values} />
              {/* 5. Documentation (unchanged) */}
              
              <div className="form-section">
                <FormAttachments values={values} />
                <FieldArray name="mandatoryAttachments">
                  {() => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Document</th>
                          <th>Status</th>
                          <th>Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {values.mandatoryAttachments.map((doc,index)=>(
                          <tr key={index}>
                            <td>{doc.documentName}</td>
                            <td>
                              <Field as="select"
                                name={`mandatoryAttachments.${index}.status`}
                                className="form-input">
                                <option value="">Select</option>
                                <option>YES</option>
                                <option>NO</option>
                                <option>NA</option>
                              </Field>
                            </td>
                            <td>
                              <Field name={`mandatoryAttachments.${index}.remarks`} className="form-input"/>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>
              </div>

              {/* 6. Workflow & Approval */}
              <div className="form-section">
                <h3 className="form-section-title">Workflow & Approval</h3>

                <FieldArray name="approvalRoles">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode &&
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={()=>push({ roleName:"New Role", data:{} })}
                        >
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

                {field(values,"approvalStatus","Approval Status")}
                {field(values,"approvalDate","Approval Date","date")}
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit PO Mapping & Validation
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

export default FRM02516_POMappingValidationUniversal;