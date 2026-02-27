// FRM02508_RateCardSetup.jsx
// FRM-02508 – Rate Card Setup
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
  clientCode: Yup.string().required("Required"),
  projectName: Yup.string().required("Required"),
  effectiveDate: Yup.date().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02508",
  department: "Client Billing & Revenue Operations",
  function: "Billing Setup & Master Data",

  /* 1. Client / Project Details */
  clientName: "",
  clientCode: "",
  projectName: "",
  businessUnit: "",
  effectiveDate: "",
  referenceNo: "",

  /* 2. Rate Card Table */
  rateItems: [
    {
      service: "",
      unit: "",
      rate: "",
      currency: "",
      taxCode: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  /* 3. Pricing Conditions */
  pricingBasis: "",
  discountStructure: "",
  volumeTierPricing: "",
  minimumBillingRequirement: "",
  specialConditions: "",

  /* 4. Documentation */
  contractReference: "",
  remarks: "",

  /* 5. Workflow */
  approvalRoles: [
    { roleName: "Initiated By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalStatus: "",
  comments: "",

  attachments: [],
  customFields: []
};

/* ================= COMPONENT ================= */

const FRM02508_RateCardSetup = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ===== ADD COLUMN ===== */
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

  /* ===== REMOVE COLUMN ===== */
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
    <ModernFormWrapper formId="FRM-02508" title="Rate Card Setup">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Rate Card Setup Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02508"
              title="FRM-02508 — Rate Card Setup"
              department="Client Billing & Revenue Operations | Billing Setup & Master Data"
            >

              {/* 1. Client Details */}
              <div className="form-section">
                <h3 className="form-section-title">Client / Project Details</h3>
                <div className="form-fields">
                  {field(values,"clientName","Client Name")}
                  {field(values,"clientCode","Client Code")}
                  {field(values,"projectName","Project / Contract Name")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"effectiveDate","Effective Date","date")}
                  {field(values,"referenceNo","Reference No")}
                </div>
              </div>

              {/* 2. RATE CARD TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">Rate Card Details</h3>

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
                        setFieldValue("rateItems", [
                          ...values.rateItems,
                          {
                            service: "",
                            unit: "",
                            rate: "",
                            currency: "",
                            taxCode: "",
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

                <FieldArray name="rateItems">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Service / Item</th>
                          <th>Unit</th>
                          <th>Rate</th>
                          <th>Currency</th>
                          <th>Tax Code</th>
                          <th>Remarks</th>

                          {dynamicColumns.map(col => (
                            <th key={col.key}>
                              {col.label}
                              {!isPrintMode &&
                                <button type="button" onClick={()=>removeColumn(col.key)}> x </button>
                              }
                            </th>
                          ))}

                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>

                      <tbody>
                        {values.rateItems.map((row,index)=>(
                          <tr key={index}>
                            <td><Field name={`rateItems.${index}.service`} className="form-input"/></td>
                            <td><Field name={`rateItems.${index}.unit`} className="form-input"/></td>
                            <td><Field name={`rateItems.${index}.rate`} type="number" className="form-input"/></td>
                            <td><Field name={`rateItems.${index}.currency`} className="form-input"/></td>
                            <td><Field name={`rateItems.${index}.taxCode`} className="form-input"/></td>
                            <td><Field name={`rateItems.${index}.remarks`} className="form-input"/></td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field
                                  name={`rateItems.${index}.dynamicFields.${col.key}`}
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

              {/* 3. Pricing Conditions */}
              <div className="form-section">
                <h3 className="form-section-title">Pricing Conditions</h3>
                <div className="form-fields">
                  {field(values,"pricingBasis","Pricing Basis")}
                  {field(values,"discountStructure","Discount Structure")}
                  {field(values,"volumeTierPricing","Volume / Tier Pricing")}
                  {field(values,"minimumBillingRequirement","Minimum Billing Requirement")}
                  {field(values,"specialConditions","Special Conditions")}
                </div>
              </div>

              <FormCustomFields values={values} />

              {/* Approval */}
              <div className="form-section">
                <h3 className="form-section-title">Workflow & Approval</h3>

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
                    Submit Rate Card Setup
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

export default FRM02508_RateCardSetup;