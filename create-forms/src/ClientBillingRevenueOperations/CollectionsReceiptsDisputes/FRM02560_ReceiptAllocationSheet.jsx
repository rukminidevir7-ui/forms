// FRM02560_02562_ReceiptAllocationSheetUniversal.jsx
// FRM-02560–02562 – Receipt Allocation Sheet — Universal Form
// Enterprise Grade – Client Billing & Revenue Operations – Collections, Receipts & Disputes

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
  receiptReferenceNo: Yup.string().required("Required"),
  receiptDate: Yup.date().required("Required"),
  clientName: Yup.string().required("Required"),
  totalReceiptAmount: Yup.number().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02560-02562",
  department: "Client Billing & Revenue Operations",
  function: "Collections, Receipts & Disputes",

  /* 1. Receipt Information */
  receiptReferenceNo: "",
  receiptDate: "",
  clientName: "",
  clientCode: "",
  businessUnit: "",
  currency: "",
  totalReceiptAmount: "",

  /* 2. Allocation Details */
  allocationLines: [
    {
      lineNo: "",
      invoiceNo: "",
      invoiceDate: "",
      invoiceAmount: "",
      allocatedAmount: "",
      balanceAmount: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  /* 3. Unapplied / Adjustment Details */
  unappliedAmount: "",
  reasonForUnapplied: "",
  adjustmentReference: "",

  /* 4. Supporting Information */
  supportingDocumentsAttached: "",
  bankReference: "",
  notes: "",

  /* 5. Approval & Sign-off */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02560_02562_ReceiptAllocationSheetUniversal = () => {

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

  const calculateBalance = (values, setFieldValue, index) => {
    const invoiceAmt = Number(values.allocationLines[index].invoiceAmount || 0);
    const allocatedAmt = Number(values.allocationLines[index].allocatedAmount || 0);
    const balance = invoiceAmt - allocatedAmt;
    setFieldValue(`allocationLines.${index}.balanceAmount`, balance.toFixed(2));
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
    <ModernFormWrapper formId="FRM-02560-02562" title="Receipt Allocation Sheet">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Receipt Allocation Sheet Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02560-02562"
              title="FRM-02560–02562 — Receipt Allocation Sheet — Universal Form"
              department="Client Billing & Revenue Operations | Collections, Receipts & Disputes"
            >

              {/* 1. Receipt Information */}
              <div className="form-section">
                <h3 className="form-section-title">Receipt Information</h3>
                <div className="form-fields">
                  {field(values,"receiptReferenceNo","Receipt Reference No")}
                  {field(values,"receiptDate","Receipt Date","date")}
                  {field(values,"clientName","Client Name")}
                  {field(values,"clientCode","Client Code")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"currency","Currency")}
                  {field(values,"totalReceiptAmount","Total Receipt Amount","number")}
                </div>
              </div>

              {/* 2. Allocation Details */}
              <div className="form-section">
                <h3 className="form-section-title">Allocation Details</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom:15 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>
                    <button
                      type="button"
                      className="btn-submit"
                      style={{ marginLeft:10 }}
                      onClick={()=>setFieldValue("allocationLines",[
                        ...values.allocationLines,
                        {
                          lineNo:"",
                          invoiceNo:"",
                          invoiceDate:"",
                          invoiceAmount:"",
                          allocatedAmount:"",
                          balanceAmount:"",
                          remarks:"",
                          dynamicFields:{}
                        }
                      ])}
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="allocationLines">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Line No</th>
                          <th>Invoice No</th>
                          <th>Invoice Date</th>
                          <th>Invoice Amount</th>
                          <th>Allocated Amount</th>
                          <th>Balance Amount</th>
                          <th>Remarks</th>
                          {dynamicColumns.map(col=>(
                            <th key={col.key}>{col.label}</th>
                          ))}
                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {values.allocationLines.map((row,index)=>(
                          <tr key={index}>
                            <td><Field name={`allocationLines.${index}.lineNo`} className="form-input"/></td>
                            <td><Field name={`allocationLines.${index}.invoiceNo`} className="form-input"/></td>
                            <td><Field type="date" name={`allocationLines.${index}.invoiceDate`} className="form-input"/></td>
                            <td>
                              <Field
                                type="number"
                                name={`allocationLines.${index}.invoiceAmount`}
                                className="form-input"
                                onBlur={()=>calculateBalance(values,setFieldValue,index)}
                              />
                            </td>
                            <td>
                              <Field
                                type="number"
                                name={`allocationLines.${index}.allocatedAmount`}
                                className="form-input"
                                onBlur={()=>calculateBalance(values,setFieldValue,index)}
                              />
                            </td>
                            <td><Field name={`allocationLines.${index}.balanceAmount`} className="form-input" readOnly/></td>
                            <td><Field name={`allocationLines.${index}.remarks`} className="form-input"/></td>
                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`allocationLines.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* 3. Unapplied / Adjustment Details */}
              <div className="form-section">
                <h3 className="form-section-title">Unapplied / Adjustment Details</h3>
                <div className="form-fields">
                  {field(values,"unappliedAmount","Unapplied Amount","number")}
                  {field(values,"reasonForUnapplied","Reason for Unapplied")}
                  {field(values,"adjustmentReference","Adjustment Reference")}
                </div>
              </div>

              {/* 4. Supporting Information */}
              <div className="form-section">
                <h3 className="form-section-title">Supporting Information</h3>
                <div className="form-fields">
                  {field(values,"supportingDocumentsAttached","Supporting Documents Attached")}
                  {field(values,"bankReference","Bank Reference / Transaction ID")}
                  {field(values,"notes","Notes")}
                </div>
              </div>

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {/* 5. Approval & Sign-off */}
              <div className="form-section">
                <h3 className="form-section-title">Approval & Sign-off</h3>

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
                    Submit Allocation Sheet
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

export default FRM02560_02562_ReceiptAllocationSheetUniversal;