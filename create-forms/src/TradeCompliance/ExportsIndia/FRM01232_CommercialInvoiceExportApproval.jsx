// FRM01232_CommercialInvoiceExportApproval.jsx
// FRM-01232 – Commercial Invoice (Export) Approval
// Enterprise Grade – Trade Compliance – Exports (India)

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
  referenceNumber: Yup.string().required("Required"),
  invoiceNumber: Yup.string().required("Required"),
  customerName: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01232",
  date: "",
  department: "Trade Compliance",
  function: "Exports (India)",

  referenceNumber: "",
  businessUnit: "",
  preparedBy: "",
  location: "",

  invoiceNumber: "",
  invoiceDate: "",
  customerName: "",
  consignee: "",
  currency: "",
  incoterms: "",

  lineItems: [
    {
      description: "",
      hsCode: "",
      quantity: "",
      unitPrice: "",
      amount: "",
      dynamicFields: {}
    }
  ],

  subtotal: "",
  taxAmount: "",
  totalInvoiceValue: "",
  remarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01232_CommercialInvoiceExportApproval = () => {

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
    <ModernFormWrapper
      formId="FRM-01232"
      title="Commercial Invoice (Export) Approval"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Commercial Invoice Approval Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01232"
              title="COMMERCIAL INVOICE (EXPORT) APPROVAL"
              department="Trade Compliance – Exports (India)"
            >

              {/* GENERAL INFO */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"date","Date","date")}
                  {field(values,"department","Department")}
                  {field(values,"function","Function")}
                  {field(values,"referenceNumber","Reference Number")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"preparedBy","Prepared By")}
                  {field(values,"location","Location")}
                </div>
              </div>

              {/* INVOICE DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Invoice Details</h3>
                <div className="form-fields">
                  {field(values,"invoiceNumber","Invoice Number")}
                  {field(values,"invoiceDate","Invoice Date","date")}
                  {field(values,"customerName","Customer Name")}
                  {field(values,"consignee","Consignee")}
                  {field(values,"currency","Currency")}
                  {field(values,"incoterms","Incoterms")}
                </div>
              </div>

              {/* LINE ITEMS TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">Line Items</h3>

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
                        setFieldValue("lineItems", [
                          ...values.lineItems,
                          {
                            description: "",
                            hsCode: "",
                            quantity: "",
                            unitPrice: "",
                            amount: "",
                            dynamicFields: {}
                          }
                        ])
                      }
                    >
                      + Add Item
                    </button>
                  </div>
                )}

                <FieldArray name="lineItems">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Item Description</th>
                          <th>HS Code</th>
                          <th>Qty</th>
                          <th>Unit Price</th>
                          <th>Amount</th>

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
                        {values.lineItems.map((row,index)=>(
                          <tr key={index}>
                            <td><Field name={`lineItems.${index}.description`} className="form-input"/></td>
                            <td><Field name={`lineItems.${index}.hsCode`} className="form-input"/></td>
                            <td><Field name={`lineItems.${index}.quantity`} className="form-input"/></td>
                            <td><Field name={`lineItems.${index}.unitPrice`} className="form-input"/></td>
                            <td><Field name={`lineItems.${index}.amount`} className="form-input"/></td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`lineItems.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* TOTALS */}
              <div className="form-section">
                <h3 className="form-section-title">Totals</h3>
                <div className="form-fields">
                  {field(values,"subtotal","Subtotal")}
                  {field(values,"taxAmount","Tax Amount")}
                  {field(values,"totalInvoiceValue","Total Invoice Value")}
                  {field(values,"remarks","Remarks")}
                </div>
              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* AUTHORIZATION */}
              <div className="form-section">
                <h3 className="form-section-title">Approval</h3>

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
                    Submit Invoice Approval
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

export default FRM01232_CommercialInvoiceExportApproval;