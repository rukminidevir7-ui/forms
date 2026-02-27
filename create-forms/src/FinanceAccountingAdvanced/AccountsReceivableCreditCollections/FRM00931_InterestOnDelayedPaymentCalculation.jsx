// FRM00931_InterestOnDelayedPaymentCalculation.jsx
// FRM-00931 / 00932 / 00933 – Interest on Delayed Payment
// Enterprise Grade – Accounts Receivable, Credit & Collections

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
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
  customerName: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00931 / FRM-00932 / FRM-00933",
  formType: "Initiation",
  version: "1.0",
  date: "",
  department: "Finance & Accounting (Advanced)",
  functionName: "Accounts Receivable, Credit & Collections",
  referenceNumber: "",
  location: "",

  /* Customer Details */
  customerName: "",
  customerId: "",
  accountNumber: "",
  businessAddress: "",

  /* Invoice & Interest Table */
  invoices: [
    {
      invoiceNumber: "",
      invoiceDate: "",
      dueDate: "",
      daysDelayed: "",
      outstandingAmount: "",
      currency: "",
      interestRate: "",
      calculationMethod: "",
      interestPeriod: "",
      interestAmount: "",
      totalAmountPayable: "",
      dynamicFields: {}
    }
  ],

  /* Justification */
  reasonNotes: "",
  supportingReference: "",

  /* Audit Trail */
  createdOn: "",
  lastUpdatedOn: "",
  documentOwner: "",

  preparedSignature: {},
  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00931_InterestOnDelayedPaymentCalculation = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const name = prompt("Enter Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");
    if (dynamicColumns.find(col=>col.key===key)) return;
    setDynamicColumns([...dynamicColumns,{ key, label:name }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col=>col.key!==key));
  };

  return (
    <ModernFormWrapper
      formId="FRM-00931"
      title="Interest on Delayed Payment"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Interest Calculation Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId={values.formId}
              title="INTEREST ON DELAYED PAYMENT"
              department="Finance & Accounting (Advanced) – Accounts Receivable, Credit & Collections"
            >

              {/* ================= GENERAL INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  <Field name="formType" as="select" className="form-input">
                    <option value="Initiation">Initiation</option>
                    <option value="Authorization">Authorization</option>
                    <option value="Record">Record</option>
                  </Field>
                  <Field name="date" type="date" className="form-input"/>
                  <Field name="referenceNumber" placeholder="Reference Number" className="form-input"/>
                  <Field name="location" placeholder="Location" className="form-input"/>
                </div>
              </div>

              {/* ================= CUSTOMER DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Customer Details</h3>
                <div className="form-fields">
                  <Field name="customerName" placeholder="Customer Name" className="form-input"/>
                  <Field name="customerId" placeholder="Customer ID" className="form-input"/>
                  <Field name="accountNumber" placeholder="Account Number" className="form-input"/>
                  <Field name="businessAddress" placeholder="Business Address" className="form-input"/>
                </div>
              </div>

              {/* ================= INVOICE & INTEREST TABLE ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Invoice & Interest Calculation</h3>

                <FieldArray name="invoices">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode && (
                        <div style={{display:"flex",gap:"10px",marginBottom:10}}>
                          <button type="button" className="btn-submit" onClick={addColumn}>
                            + Add Column
                          </button>
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={()=>push({
                              invoiceNumber:"",
                              invoiceDate:"",
                              dueDate:"",
                              daysDelayed:"",
                              outstandingAmount:"",
                              currency:"",
                              interestRate:"",
                              calculationMethod:"",
                              interestPeriod:"",
                              interestAmount:"",
                              totalAmountPayable:"",
                              dynamicFields:{}
                            })}
                          >
                            + Add Invoice
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Sl No</th>
                            <th>Invoice No</th>
                            <th>Invoice Date</th>
                            <th>Due Date</th>
                            <th>Days Delayed</th>
                            <th>Outstanding</th>
                            <th>Currency</th>
                            <th>Interest %</th>
                            <th>Method</th>
                            <th>Interest Period</th>
                            <th>Interest Amount</th>
                            <th>Total Payable</th>

                            {dynamicColumns.map(col=>(
                              <th key={col.key}>
                                {col.label}
                                {!isPrintMode && (
                                  <button type="button" onClick={()=>removeColumn(col.key)}>x</button>
                                )}
                              </th>
                            ))}

                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {values.invoices.map((item,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td><Field name={`invoices.${index}.invoiceNumber`} className="form-input"/></td>
                              <td><Field name={`invoices.${index}.invoiceDate`} type="date" className="form-input"/></td>
                              <td><Field name={`invoices.${index}.dueDate`} type="date" className="form-input"/></td>
                              <td><Field name={`invoices.${index}.daysDelayed`} type="number" className="form-input"/></td>
                              <td><Field name={`invoices.${index}.outstandingAmount`} type="number" className="form-input"/></td>
                              <td><Field name={`invoices.${index}.currency`} className="form-input"/></td>
                              <td><Field name={`invoices.${index}.interestRate`} type="number" className="form-input"/></td>
                              <td><Field name={`invoices.${index}.calculationMethod`} className="form-input"/></td>
                              <td><Field name={`invoices.${index}.interestPeriod`} className="form-input"/></td>
                              <td><Field name={`invoices.${index}.interestAmount`} type="number" className="form-input"/></td>
                              <td><Field name={`invoices.${index}.totalAmountPayable`} type="number" className="form-input"/></td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field name={`invoices.${index}.dynamicFields.${col.key}`} className="form-input"/>
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
                    </>
                  )}
                </FieldArray>
              </div>

              {/* ================= JUSTIFICATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Justification</h3>
                <div className="form-fields">
                  <Field name="reasonNotes" placeholder="Reason / Notes" className="form-input"/>
                  <Field name="supportingReference" placeholder="Supporting Reference" className="form-input"/>
                </div>
              </div>

              <FormCustomFields values={values}/>
              <FormAttachments values={values}/>

              {/* ================= AUTHORIZATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>
                <div className="three-column-signatures">
                  <ApprovalSignatureBlock
                    label="Prepared By"
                    value={values.preparedSignature}
                    onChange={(val)=>setFieldValue("preparedSignature",val)}
                  />
                  <ApprovalSignatureBlock
                    label="Reviewed By"
                    value={values.reviewedSignature}
                    onChange={(val)=>setFieldValue("reviewedSignature",val)}
                  />
                  <ApprovalSignatureBlock
                    label="Approved By"
                    value={values.approvedSignature}
                    onChange={(val)=>setFieldValue("approvedSignature",val)}
                  />
                </div>
              </div>

              {/* ================= ADDITIONAL SIGNATURES ================= */}
              <FieldArray name="additionalSignatures">
                {({ push, remove })=>(
                  <>
                    {!isPrintMode && (
                      <button type="button" className="btn-submit"
                        onClick={()=>push({data:{}})}>
                        + Add Additional Signature
                      </button>
                    )}
                    {values.additionalSignatures.map((sig,index)=>(
                      <div key={index} style={{marginTop:15}}>
                        <ApprovalSignatureBlock
                          label={`Additional Signature ${index+1}`}
                          value={sig.data || {}}
                          onChange={(val)=>setFieldValue(`additionalSignatures.${index}.data`,val)}
                        />
                        {!isPrintMode && (
                          <button type="button" onClick={()=>remove(index)}>
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </FieldArray>

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Interest Calculation
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

export default FRM00931_InterestOnDelayedPaymentCalculation;