// FRM02515_BillingExceptionApproval.jsx
// FRM-02515 – Billing Exception Approval
// Enterprise Grade – Client Billing & Revenue Operations – Billing Setup & Master Data

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePrintMode } from "../../PrintModeContext";
import ModernFormWrapper from "../../components/ModernFormWrapper";
import ModernA4Template from "../../components/ModernA4Template";
import ApprovalSignatureBlock from "../../components/ApprovalSignatureBlock";
import FormCustomFields from "../../components/FormCustomFields";
import FormAttachments from "../../components/FormAttachments";
import "../../styles/FRM00611.css";

/* ================= VALIDATION ================= */

const validationSchema = Yup.object({
  exceptionReferenceNo: Yup.string().required("Required"),
  requestDate: Yup.date().required("Required"),
  clientName: Yup.string().required("Required"),
  decision: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02515",
  department: "Client Billing & Revenue Operations",
  function: "Billing Setup & Master Data",

  /* 1. Reference Details */
  exceptionReferenceNo: "",
  requestDate: "",
  clientName: "",
  clientCode: "",
  projectName: "",

  /* 2. Exception Table (Dynamic) */
  exceptionItems: [
    {
      exceptionType: "",
      description: "",
      affectedBillingArea: "",
      requestedEffectiveDate: "",
      reasonForException: "",
      dynamicFields: {}
    }
  ],

  /* 3. Impact Assessment */
  financialImpact: "",
  revenueRecognitionImpact: "",
  customerImpact: "",
  riskLevel: "",

  /* 4. Decision */
  decision: "",
  conditions: "",
  approvalComments: "",

  /* 5. Sign-off */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: "",

  customFields: []
};

/* ================= COMPONENT ================= */

const FRM02515_BillingExceptionApproval = () => {

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
    <ModernFormWrapper formId="FRM-02515" title="Billing Exception Approval">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Billing Exception Approval Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02515"
              title="FRM-02515 — Billing Exception Approval"
              department="Client Billing & Revenue Operations | Billing Setup & Master Data"
            >

              {/* 1. Reference Details */}
              <div className="form-section">
                <h3 className="form-section-title">Reference Details</h3>
                <div className="form-fields">
                  {field(values,"exceptionReferenceNo","Exception Reference No")}
                  {field(values,"requestDate","Request Date","date")}
                  {field(values,"clientName","Client Name")}
                  {field(values,"clientCode","Client Code")}
                  {field(values,"projectName","Project / Contract")}
                </div>
              </div>

              {/* 2. Exception Details Table */}
              <div className="form-section">
                <h3 className="form-section-title">Exception Details</h3>

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
                        setFieldValue("exceptionItems", [
                          ...values.exceptionItems,
                          {
                            exceptionType:"",
                            description:"",
                            affectedBillingArea:"",
                            requestedEffectiveDate:"",
                            reasonForException:"",
                            dynamicFields:{}
                          }
                        ])
                      }
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="exceptionItems">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Exception Type</th>
                          <th>Description</th>
                          <th>Affected Billing Area</th>
                          <th>Requested Effective Date</th>
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
                        {values.exceptionItems.map((row,index)=>(
                          <tr key={index}>
                            <td><Field name={`exceptionItems.${index}.exceptionType`} className="form-input"/></td>
                            <td><Field name={`exceptionItems.${index}.description`} className="form-input"/></td>
                            <td><Field name={`exceptionItems.${index}.affectedBillingArea`} className="form-input"/></td>
                            <td><Field name={`exceptionItems.${index}.requestedEffectiveDate`} type="date" className="form-input"/></td>
                            <td><Field name={`exceptionItems.${index}.reasonForException`} className="form-input"/></td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field
                                  name={`exceptionItems.${index}.dynamicFields.${col.key}`}
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
                  {field(values,"revenueRecognitionImpact","Revenue Recognition Impact")}
                  {field(values,"customerImpact","Customer Impact")}
                  {field(values,"riskLevel","Risk Level (Low/Medium/High)")}
                </div>
              </div>

              {/* 4. Decision */}
              <div className="form-section">
                <h3 className="form-section-title">Decision</h3>
                <div className="form-fields">
                  {field(values,"decision","Decision (Approved / Rejected / Conditional)")}
                  {field(values,"conditions","Conditions (if any)")}
                  {field(values,"approvalComments","Approval Comments")}
                </div>
              </div>
              <FormCustomFields values={values} />
              <FormAttachments values={values} />

              {/* 5. Sign-off */}
              <div className="form-section">
                <h3 className="form-section-title">Sign-off</h3>

                <div className="three-column-signatures">
                  {values.approvalRoles.map((role,index)=>(
                    <ApprovalSignatureBlock
                      key={index}
                      roleName={role.roleName}
                      value={role.data}
                      allowRoleEdit={!isPrintMode}
                    />
                  ))}
                </div>

                {field(values,"approvalDate","Approval Date","date")}
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Billing Exception Approval
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

export default FRM02515_BillingExceptionApproval;