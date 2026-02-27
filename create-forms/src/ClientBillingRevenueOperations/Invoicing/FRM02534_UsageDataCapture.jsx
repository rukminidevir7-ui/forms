// FRM02534_UsageDataCaptureUniversal.jsx
// FRM-02534 – Usage Data Capture — Universal Form
// Enterprise Grade – Client Billing & Revenue Operations – Invoicing (T&M, Milestone, Usage)

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
  billingPeriod: Yup.string().required("Required"),
  currency: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02534",
  department: "Client Billing & Revenue Operations",
  function: "Invoicing (T&M, Milestone, Usage)",

  /* 1. Client / Contract Details */
  clientName: "",
  clientCode: "",
  projectName: "",
  projectCode: "",
  businessUnit: "",
  billingPeriod: "",

  /* 2. Usage Details */
  usageItems: [
    {
      usageDate: "",
      serviceItem: "",
      description: "",
      unitOfMeasure: "",
      quantity: "",
      rate: "",
      amount: "",
      dynamicFields: {}
    }
  ],

  /* 3. Usage Summary */
  totalQuantity: "",
  subtotal: "",
  taxes: "",
  totalAmount: "",
  currency: "",

  /* 4. Supporting Information */
  sourceSystem: "",
  supportingFilesAttached: "",
  remarks: "",

  /* 5. Review & Approval */
  reviewedQuantity: "",
  exceptionsIdentified: "",
  reviewerComments: "",
  decision: "",

  /* 6. Sign-off */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02534_UsageDataCaptureUniversal = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const columnName = prompt("Enter New Column Name");
    if (!columnName) return;
    const key = columnName.replace(/\s+/g, "");
    if (dynamicColumns.find(col => col.key === key)) return alert("Column exists");
    setDynamicColumns([...dynamicColumns, { key, label: columnName }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
  };

  const calculateSummary = (values, setFieldValue) => {
    let totalQty = 0;
    let subtotal = 0;

    values.usageItems.forEach(item => {
      const qty = Number(item.quantity || 0);
      const rate = Number(item.rate || 0);
      totalQty += qty;
      subtotal += qty * rate;
    });

    const tax = Number(values.taxes || 0);
    const total = subtotal + tax;

    setFieldValue("totalQuantity", totalQty.toFixed(2));
    setFieldValue("subtotal", subtotal.toFixed(2));
    setFieldValue("totalAmount", total.toFixed(2));
  };

  const field = (values, name, label, type="text", onBlurHandler=null) => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : <>
            <Field 
              name={name} 
              type={type} 
              className="form-input"
              onBlur={onBlurHandler}
            />
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-02534" title="Usage Data Capture">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Usage Data Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02534"
              title="FRM-02534 — Usage Data Capture — Universal Form"
              department="Client Billing & Revenue Operations | Invoicing (T&M, Milestone, Usage)"
            >

              {/* 1. Client / Contract Details */}
              <div className="form-section">
                <h3 className="form-section-title">Client / Contract Details</h3>
                <div className="form-fields">
                  {field(values,"clientName","Client Name")}
                  {field(values,"clientCode","Client Code")}
                  {field(values,"projectName","Project / Contract Name")}
                  {field(values,"projectCode","Project Code")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"billingPeriod","Billing Period")}
                </div>
              </div>

              {/* 2. Usage Details */}
              <div className="form-section">
                <h3 className="form-section-title">Usage Details</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom:15 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>
                    <button
                      type="button"
                      className="btn-submit"
                      style={{ marginLeft:10 }}
                      onClick={()=>setFieldValue("usageItems",[
                        ...values.usageItems,
                        { usageDate:"", serviceItem:"", description:"", unitOfMeasure:"", quantity:"", rate:"", amount:"", dynamicFields:{} }
                      ])}
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="usageItems">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Usage Date</th>
                          <th>Service / Item</th>
                          <th>Description</th>
                          <th>Unit of Measure</th>
                          <th>Quantity</th>
                          <th>Rate</th>
                          <th>Amount</th>
                          {dynamicColumns.map(col=>(
                            <th key={col.key}>{col.label}</th>
                          ))}
                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {values.usageItems.map((row,index)=>(
                          <tr key={index}>
                            <td><Field type="date" name={`usageItems.${index}.usageDate`} className="form-input"/></td>
                            <td><Field name={`usageItems.${index}.serviceItem`} className="form-input"/></td>
                            <td><Field name={`usageItems.${index}.description`} className="form-input"/></td>
                            <td><Field name={`usageItems.${index}.unitOfMeasure`} className="form-input"/></td>
                            <td>
                              <Field
                                name={`usageItems.${index}.quantity`}
                                className="form-input"
                                onBlur={()=>calculateSummary(values,setFieldValue)}
                              />
                            </td>
                            <td>
                              <Field
                                name={`usageItems.${index}.rate`}
                                className="form-input"
                                onBlur={()=>calculateSummary(values,setFieldValue)}
                              />
                            </td>
                            <td className="print-value">
                              {(Number(row.quantity||0)*Number(row.rate||0)).toFixed(2)}
                            </td>
                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`usageItems.${index}.dynamicFields.${col.key}`} className="form-input"/>
                              </td>
                            ))}
                            {!isPrintMode &&
                              <td>
                                <button type="button" onClick={()=>remove(index)}>Remove</button>
                              </td>}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>
              </div>

              {/* 3. Usage Summary */}
              <div className="form-section">
                <h3 className="form-section-title">Usage Summary</h3>
                <div className="form-fields">
                  {field(values,"totalQuantity","Total Quantity")}
                  {field(values,"subtotal","Subtotal")}
                  {field(values,"taxes","Taxes","number",
                    ()=>calculateSummary(values,setFieldValue))}
                  {field(values,"totalAmount","Total Amount")}
                  {field(values,"currency","Currency")}
                </div>
              </div>

              {/* 4. Supporting Information */}
              <div className="form-section">
                <h3 className="form-section-title">Supporting Information</h3>
                <div className="form-fields">
                  {field(values,"sourceSystem","Source System / Data Reference")}
                  {field(values,"supportingFilesAttached","Supporting Files Attached")}
                  {field(values,"remarks","Remarks")}
                </div>
              </div>

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {/* 5. Review & Approval */}
              <div className="form-section">
                <h3 className="form-section-title">Review & Approval</h3>
                <div className="form-fields">
                  {field(values,"reviewedQuantity","Reviewed Quantity")}
                  {field(values,"exceptionsIdentified","Exceptions Identified")}
                  {field(values,"reviewerComments","Reviewer Comments")}
                  {field(values,"decision","Decision (Approved / Rejected / Revision Required)")}
                </div>
              </div>

              {/* 6. Sign-off */}
              <div className="form-section">
                <h3 className="form-section-title">Sign-off</h3>

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
                              <button type="button" onClick={()=>remove(index)}>Remove</button>}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </FieldArray>

                {field(values,"approvalDate","Approval Date","date")}
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Usage Data
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

export default FRM02534_UsageDataCaptureUniversal;