// FRM01060_CovenantComplianceCertificate.jsx
// FRM-01060 – Covenant Compliance Certificate
// Enterprise Grade – Treasury & Funding – Lending, Borrowing & Credit Facilities

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
  borrowerName: Yup.string().required("Required"),
  facilityReference: Yup.string().required("Required"),
  reportingPeriodFrom: Yup.string().required("Required"),
  reportingPeriodTo: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01060",
  date: "",
  department: "Treasury & Funding",
  function: "Lending, Borrowing & Credit Facilities",
  referenceNumber: "",
  location: "",
  borrowerName: "",
  facilityReference: "",
  reportingPeriodFrom: "",
  reportingPeriodTo: "",

  covenantDetails: [
    {
      covenantRequirement: "",
      actual: "",
      status: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  overallComplianceStatus: "",
  exceptionsBreaches: "",
  correctiveActions: "",
  certificationRemarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Certified By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01060_CovenantComplianceCertificate = () => {

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

  const statusField = (name) => (
    <Field as="select" name={name} className="form-input">
      <option value="">Select</option>
      <option>Complied</option>
      <option>Not Complied</option>
      <option>Waived</option>
      <option>Not Applicable</option>
    </Field>
  );

  return (
    <ModernFormWrapper
      formId="FRM-01060"
      title="Covenant Compliance Certificate"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Covenant Compliance Certificate Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01060"
              title="COVENANT COMPLIANCE CERTIFICATE"
              department="Treasury & Funding – Lending, Borrowing & Credit Facilities"
            >

              {/* GENERAL INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"date","Date","date")}
                  {field(values,"referenceNumber","Reference Number")}
                  {field(values,"location","Location")}
                  {field(values,"borrowerName","Borrower Name")}
                  {field(values,"facilityReference","Facility Reference")}
                  {field(values,"reportingPeriodFrom","Reporting Period From","date")}
                  {field(values,"reportingPeriodTo","Reporting Period To","date")}
                </div>
              </div>

              {/* COVENANT DETAILS TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">Covenant Compliance Details</h3>

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
                        setFieldValue("covenantDetails", [
                          ...values.covenantDetails,
                          { covenantRequirement:"", actual:"", status:"", remarks:"", dynamicFields:{} }
                        ])
                      }
                    >
                      + Add Covenant
                    </button>
                  </div>
                )}

                <FieldArray name="covenantDetails">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Covenant Requirement</th>
                          <th>Actual</th>
                          <th>Status</th>
                          <th>Remarks</th>

                          {dynamicColumns.map(col => (
                            <th key={col.key}>
                              {col.label}
                              {!isPrintMode && (
                                <button
                                  type="button"
                                  onClick={()=>removeColumn(col.key)}
                                  style={{ marginLeft:5 }}
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
                        {values.covenantDetails.map((row,index)=>(
                          <tr key={index}>
                            <td>
                              <Field name={`covenantDetails.${index}.covenantRequirement`} className="form-input"/>
                            </td>
                            <td>
                              <Field name={`covenantDetails.${index}.actual`} className="form-input"/>
                            </td>
                            <td>
                              {statusField(`covenantDetails.${index}.status`)}
                            </td>
                            <td>
                              <Field name={`covenantDetails.${index}.remarks`} className="form-input"/>
                            </td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field
                                  name={`covenantDetails.${index}.dynamicFields.${col.key}`}
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

              {/* CERTIFICATION */}
              <div className="form-section">
                <h3 className="form-section-title">Certification</h3>
                <div className="form-fields">
                  {field(values,"overallComplianceStatus","Overall Compliance Status")}
                  {field(values,"exceptionsBreaches","Exceptions / Breaches")}
                  {field(values,"correctiveActions","Corrective Actions")}
                  {field(values,"certificationRemarks","Remarks")}
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
                              onRoleNameChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.roleName`,val)}
                              onChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.data`,val)}
                            />
                            {!isPrintMode &&
                              <button type="button" onClick={()=>remove(index)}>
                                Remove Role
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
                    Submit Covenant Compliance Certificate
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

export default FRM01060_CovenantComplianceCertificate;