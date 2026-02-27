// FRM02512_RateCardChangeApproval.jsx
// FRM-02512 – Rate Card Change Approval
// Enterprise Grade – Client Billing & Revenue Operations – Billing Setup & Master Data

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePrintMode } from "../../PrintModeContext";
import ModernFormWrapper from "../../components/ModernFormWrapper";
import ModernA4Template from "../../components/ModernA4Template";
import ApprovalSignatureBlock from "../../components/ApprovalSignatureBlock";
import FormCustomFields from "../../components/FormCustomFields";
import "../../styles/FRM00611.css";

/* ================= VALIDATION ================= */

const validationSchema = Yup.object({
  requestReferenceNo: Yup.string().required("Required"),
  requestDate: Yup.date().required("Required"),
  clientName: Yup.string().required("Required"),
  decision: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02512",
  department: "Client Billing & Revenue Operations",
  function: "Billing Setup & Master Data",

  /* 1. Request Reference */
  requestReferenceNo: "",
  requestDate: "",
  clientName: "",
  clientCode: "",
  projectName: "",

  /* 2. Change Summary */
  changeItems: [
    {
      service: "",
      currentRate: "",
      proposedRate: "",
      effectiveDate: "",
      reasonForChange: "",
      dynamicFields: {}
    }
  ],

  /* 3. Impact Assessment */
  financialImpact: "",
  customerImpact: "",
  operationalImpact: "",
  riskLevel: "",

  /* 4. Approval Decision */
  decision: "",
  conditions: "",
  approvalComments: "",

  /* 5. Sign-off */
  approvalRoles: [
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: "",

  customFields: []
};

/* ================= COMPONENT ================= */

const FRM02512_RateCardChangeApproval = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ===== COLUMN HANDLERS ===== */

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
    <ModernFormWrapper formId="FRM-02512" title="Rate Card Change Approval">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Rate Card Change Approval Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02512"
              title="FRM-02512 — Rate Card Change Approval"
              department="Client Billing & Revenue Operations | Billing Setup & Master Data"
            >

              {/* 1. Request Reference */}
              <div className="form-section">
                <h3 className="form-section-title">Request Reference</h3>
                <div className="form-fields">
                  {field(values,"requestReferenceNo","Request Reference No")}
                  {field(values,"requestDate","Request Date","date")}
                  {field(values,"clientName","Client Name")}
                  {field(values,"clientCode","Client Code")}
                  {field(values,"projectName","Project / Contract Name")}
                </div>
              </div>

              {/* 2. Change Summary Table */}
              <div className="form-section">
                <h3 className="form-section-title">Change Summary</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 10 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>

                    <button
                      type="button"
                      className="btn-submit"
                      style={{ marginLeft: 10 }}
                      onClick={() =>
                        setFieldValue("changeItems", [
                          ...values.changeItems,
                          {
                            service:"",
                            currentRate:"",
                            proposedRate:"",
                            effectiveDate:"",
                            reasonForChange:"",
                            dynamicFields:{}
                          }
                        ])
                      }
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="changeItems">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Service / Item</th>
                          <th>Current Rate</th>
                          <th>Proposed Rate</th>
                          <th>Effective Date</th>
                          <th>Reason</th>

                          {dynamicColumns.map(col => (
                            <th key={col.key}>
                              {col.label}
                              {!isPrintMode &&
                                <button
                                  type="button"
                                  onClick={()=>removeColumn(col.key)}
                                >
                                  x
                                </button>
                              }
                            </th>
                          ))}

                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>

                      <tbody>
                        {values.changeItems.map((item,index)=>(
                          <tr key={index}>
                            <td>
                              <Field name={`changeItems.${index}.service`} className="form-input"/>
                            </td>
                            <td>
                              <Field name={`changeItems.${index}.currentRate`} type="number" className="form-input"/>
                            </td>
                            <td>
                              <Field name={`changeItems.${index}.proposedRate`} type="number" className="form-input"/>
                            </td>
                            <td>
                              <Field name={`changeItems.${index}.effectiveDate`} type="date" className="form-input"/>
                            </td>
                            <td>
                              <Field name={`changeItems.${index}.reasonForChange`} className="form-input"/>
                            </td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field
                                  name={`changeItems.${index}.dynamicFields.${col.key}`}
                                  className="form-input"
                                />
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

              {/* 3. Impact Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">Impact Assessment</h3>
                <div className="form-fields">
                  {field(values,"financialImpact","Financial Impact")}
                  {field(values,"customerImpact","Customer Impact")}
                  {field(values,"operationalImpact","Operational Impact")}
                  {field(values,"riskLevel","Risk Level (Low/Medium/High)")}
                </div>
              </div>

              {/* 4. Approval Decision */}
              <div className="form-section">
                <h3 className="form-section-title">Approval Decision</h3>
                <div className="form-fields">
                  {field(values,"decision","Decision (Approved / Rejected / Conditional)")}
                  {field(values,"conditions","Conditions (if any)")}
                  {field(values,"approvalComments","Approval Comments")}
                </div>
              </div>

              <FormCustomFields values={values} />

              {/* 5. Sign-off */}
              <div className="form-section">
                <h3 className="form-section-title">Sign-off</h3>

                <FieldArray name="approvalRoles">
                  {({ remove })=>(
                    <div className="three-column-signatures">
                      {values.approvalRoles.map((role,index)=>(
                        <div key={index}>
                          <ApprovalSignatureBlock
                            roleName={role.roleName}
                            value={role.data}
                            allowRoleEdit={!isPrintMode}
                          />
                          {!isPrintMode &&
                            <button type="button" onClick={()=>remove(index)}>
                              Remove
                            </button>
                          }
                        </div>
                      ))}
                    </div>
                  )}
                </FieldArray>

                {field(values,"approvalDate","Approval Date","date")}
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Rate Card Change Approval
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

export default FRM02512_RateCardChangeApproval;