// FRM00499_AssetProcurementApproval.jsx
// FRM-00499 – Asset Procurement Approval Form

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { usePrintMode } from "../PrintModeContext";
import ModernFormWrapper from "../components/ModernFormWrapper";
import ModernA4Template from "../components/ModernA4Template";
import FormAttachments from "../components/FormAttachments";
import FormCustomFields from "../components/FormCustomFields";
import ApprovalSignatureBlock from "../components/ApprovalSignatureBlock";
import "../styles/FRM00611.css";

const validationSchema = Yup.object({
  approvalDate: Yup.string().required("Required"),
  approvalRefNo: Yup.string().required("Required"),
  projectCostCenter: Yup.string().required("Required"),

  assetRequestNo: Yup.string().required("Required"),
  requestedBy: Yup.string().required("Required"),
  department: Yup.string().required("Required"),

  items: Yup.array().of(
    Yup.object().shape({
      assetDescription: Yup.string().required("Required"),
      category: Yup.string().required("Required"),
      quantity: Yup.number().required("Required"),
      estimatedCost: Yup.string().required("Required"),
      approvedCost: Yup.string().required("Required"),
      vendor: Yup.string().required("Required"),
      dynamicFields: Yup.object()
    })
  ).min(1, "At least one item required"),

  approvalConditions: Yup.string(),
  budgetConfirmation: Yup.string(),
  remarks: Yup.string(),

  reviewedBy: Yup.object(),
  approvedBy: Yup.object(),
  additionalSignatures: Yup.array(),

  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {
  approvalDate: "",
  approvalRefNo: "",
  projectCostCenter: "",

  assetRequestNo: "",
  requestedBy: "",
  department: "",

  items: [
    {
      assetDescription: "",
      category: "",
      quantity: "",
      estimatedCost: "",
      approvedCost: "",
      vendor: "",
      dynamicFields: {}
    }
  ],

  approvalConditions: "",
  budgetConfirmation: "",
  remarks: "",

  reviewedBy: {},
  approvedBy: {},
  additionalSignatures: [],

  customFields: [],
  attachments: []
};

const FRM00499_AssetProcurementApproval = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const columnName = prompt("Enter New Item Field");
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

  const field = (values, name, label, type = "text") => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || "_________"}</div>
      ) : (
        <>
          <Field name={name} type={type} className="form-input" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  const textarea = (values, name, label) => (
    <div className="form-field full-width">
      <label className="form-label">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || "_________"}</div>
      ) : (
        <>
          <Field as="textarea" name={name} className="form-textarea" rows="3" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (
    <ModernFormWrapper
      formId="FRM-00499"
      title="Asset Procurement Approval Form"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("Asset Procurement Approval submitted successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00499"
              title="ASSET PROCUREMENT APPROVAL FORM"
              department="Asset Management – Asset Lifecycle"
            >

              {/* 1. Approval Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Approval Information</h3>
                <div className="form-fields">
                  {field(values,"approvalDate","Approval Date","date")}
                  {field(values,"approvalRefNo","Approval Reference No")}
                  {field(values,"projectCostCenter","Project / Cost Center")}
                </div>
              </div>

              {/* 2. Request Reference Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Request Reference Details</h3>
                <div className="form-fields">
                  {field(values,"assetRequestNo","Asset Request No")}
                  {field(values,"requestedBy","Requested By")}
                  {field(values,"department","Department")}
                </div>
              </div>

              {/* 3. Item Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Item Details</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: "15px" }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Item Field
                    </button>
                  </div>
                )}

                <FieldArray name="items">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <div style={{ marginBottom: "20px" }}>
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={() =>
                              push({
                                assetDescription: "",
                                category: "",
                                quantity: "",
                                estimatedCost: "",
                                approvedCost: "",
                                vendor: "",
                                dynamicFields: {}
                              })
                            }
                          >
                            + Add Item
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Asset Description</th>
                            <th>Category</th>
                            <th>Qty</th>
                            <th>Estimated Cost</th>
                            <th>Approved Cost</th>
                            <th>Vendor</th>

                            {dynamicColumns.map(col => (
                              <th key={col.key}>
                                {col.label}
                                {!isPrintMode && (
                                  <button
                                    type="button"
                                    style={{ marginLeft: "8px" }}
                                    onClick={() => removeColumn(col.key)}
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
                          {values.items.map((row, index) => (
                            <tr key={index}>
                              <td><Field name={`items.${index}.assetDescription`} className="form-input" /></td>
                              <td><Field name={`items.${index}.category`} className="form-input" /></td>
                              <td><Field name={`items.${index}.quantity`} type="number" className="form-input" /></td>
                              <td><Field name={`items.${index}.estimatedCost`} className="form-input" /></td>
                              <td><Field name={`items.${index}.approvedCost`} className="form-input" /></td>
                              <td><Field name={`items.${index}.vendor`} className="form-input" /></td>

                              {dynamicColumns.map(col => (
                                <td key={col.key}>
                                  <Field name={`items.${index}.dynamicFields.${col.key}`} className="form-input" />
                                </td>
                              ))}

                              {!isPrintMode && (
                                <td>
                                  <button
                                    type="button"
                                    style={{ padding: "6px 12px" }}
                                    onClick={() => remove(index)}
                                  >
                                    Remove
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </FieldArray>
              </div>

              {/* 4. Approval Conditions */}
              <div className="form-section">
                <h3 className="form-section-title">4. Approval Details</h3>
                <div className="form-fields">
                  {textarea(values,"approvalConditions","Approval Conditions")}
                  {textarea(values,"budgetConfirmation","Budget Confirmation")}
                  {textarea(values,"remarks","Remarks")}
                </div>
              </div>

              {/* 5. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>

                <div className="three-column-signatures">

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Reviewed By"
                      value={values.reviewedBy || {}}
                      onChange={(val) => setFieldValue("reviewedBy", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Approved By"
                      value={values.approvedBy || {}}
                      onChange={(val) => setFieldValue("approvedBy", val)}
                    />
                  </div>

                </div>

                {/* Custom Signatures */}
                <div style={{ marginTop: "30px" }}>
                  <FieldArray name="additionalSignatures">
                    {({ push, remove }) => (
                      <>
                        {!isPrintMode && (
                          <button
                            type="button"
                            className="btn-submit"
                            style={{ marginBottom: "20px" }}
                            onClick={() => push({ label: "Custom Signature", data: {} })}
                          >
                            + Add Custom Signature
                          </button>
                        )}

                        {values.additionalSignatures.map((sig, index) => (
                          <div key={index} style={{ marginBottom: "30px", position: "relative" }}>
                            {!isPrintMode && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                style={{
                                  position: "absolute",
                                  right: 0,
                                  top: 0,
                                  background: "red",
                                  color: "#fff",
                                  border: "none",
                                  padding: "5px 10px",
                                  cursor: "pointer"
                                }}
                              >
                                Remove
                              </button>
                            )}

                            <ApprovalSignatureBlock
                              label={`Custom Signature ${index + 1}`}
                              value={sig.data || {}}
                              onChange={(val) =>
                                setFieldValue(`additionalSignatures.${index}.data`, val)
                              }
                            />
                          </div>
                        ))}
                      </>
                    )}
                  </FieldArray>
                </div>

              </div>

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Approval
                  </button>
                </div>
              )}

            </ModernA4Template>
          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00499_AssetProcurementApproval;
