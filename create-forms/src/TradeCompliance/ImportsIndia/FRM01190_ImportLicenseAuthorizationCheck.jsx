// FRM01190_ImportLicenseAuthorizationCheck.jsx
// FRM-01190 – Import License / Authorization Check
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
  importerName: Yup.string().required("Required"),
  supplierName: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01190",
  date: "",
  department: "Trade Compliance",
  function: "Imports (India)",
  referenceNumber: "",
  location: "",
  businessUnit: "",
  reviewedBy: "",

  importerName: "",
  iecNumber: "",
  supplierName: "",
  countryOfOrigin: "",
  portOfImport: "",

  licenseType: "",
  licenseNumber: "",
  issuingAuthority: "",
  validityFrom: "",
  validityTo: "",
  coverageDescription: "",

  complianceItems: [
    { item: "HS Code Verified", status: "", remarks: "", dynamicFields: {} },
    { item: "Restricted / Prohibited Check Completed", status: "", remarks: "", dynamicFields: {} },
    { item: "Import Policy Conditions Reviewed", status: "", remarks: "", dynamicFields: {} },
    { item: "License Validity Confirmed", status: "", remarks: "", dynamicFields: {} },
    { item: "Port Restrictions Verified", status: "", remarks: "", dynamicFields: {} }
  ],

  approvalStatus: "",
  conditions: "",
  decisionComments: "",

  approvalRoles: [
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01190_ImportLicenseAuthorizationCheck = () => {

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
      formId="FRM-01190"
      title="Import License / Authorization Check"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Import License / Authorization Check Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01190"
              title="IMPORT LICENSE / AUTHORIZATION CHECK"
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
                  {field(values,"referenceNumber","Reference Number")}
                  {field(values,"location","Location")}
                  {field(values,"businessUnit","Business Unit")}
                </div>
              </div>

              {/* IMPORT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Import Details</h3>
                <div className="form-fields">
                  {field(values,"importerName","Importer Name")}
                  {field(values,"iecNumber","IEC Number")}
                  {field(values,"supplierName","Supplier Name")}
                  {field(values,"countryOfOrigin","Country of Origin")}
                  {field(values,"portOfImport","Port of Import")}
                </div>
              </div>

              {/* LICENSE DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">License / Authorization Details</h3>
                <div className="form-fields">
                  {field(values,"licenseType","License Type")}
                  {field(values,"licenseNumber","License Number")}
                  {field(values,"issuingAuthority","Issuing Authority")}
                  {field(values,"validityFrom","Validity From","date")}
                  {field(values,"validityTo","Validity To","date")}
                  {field(values,"coverageDescription","Coverage Description")}
                </div>
              </div>

              {/* COMPLIANCE CHECK TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Check</h3>

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
                        setFieldValue("complianceItems", [
                          ...values.complianceItems,
                          { item: "", status: "", remarks: "", dynamicFields: {} }
                        ])
                      }
                    >
                      + Add Compliance Item
                    </button>
                  </div>
                )}

                <FieldArray name="complianceItems">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Compliance Item</th>
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
                        {values.complianceItems.map((row,index)=>(
                          <tr key={index}>
                            <td>
                              <Field name={`complianceItems.${index}.item`} className="form-input"/>
                            </td>
                            <td>
                              <Field as="select"
                                name={`complianceItems.${index}.status`}
                                className="form-input">
                                <option value="">Select</option>
                                <option>Compliant</option>
                                <option>Non-Compliant</option>
                                <option>NA</option>
                              </Field>
                            </td>
                            <td>
                              <Field name={`complianceItems.${index}.remarks`} className="form-input"/>
                            </td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`complianceItems.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* DECISION */}
              <div className="form-section">
                <h3 className="form-section-title">Decision</h3>
                <div className="form-fields">
                  {field(values,"approvalStatus","Approval Status")}
                  {field(values,"conditions","Conditions")}
                  {field(values,"decisionComments","Comments")}
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
                    Submit Import License Check
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

export default FRM01190_ImportLicenseAuthorizationCheck;