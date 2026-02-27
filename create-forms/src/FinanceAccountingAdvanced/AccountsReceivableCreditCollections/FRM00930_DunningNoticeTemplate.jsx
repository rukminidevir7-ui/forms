// FRM00930_DunningNoticeTemplate.jsx
// FRM-00930 – Dunning Notice (Internal Template)
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
  customerName: Yup.string().required("Required"),
  noticeLevel: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00930",
  version: "1.0",
  date: "",
  department: "Finance & Accounting (Advanced)",
  functionName: "Accounts Receivable, Credit & Collections",
  referenceNumber: "",
  noticeLevel: "",

  /* Customer Details */
  customerName: "",
  customerId: "",
  businessAddress: "",
  contactPerson: "",
  phone: "",
  email: "",

  /* Invoice Table */
  invoices: [
    {
      invoiceNumber: "",
      invoiceDate: "",
      dueDate: "",
      daysOverdue: "",
      outstandingAmount: "",
      currency: "",
      dynamicFields: {}
    }
  ],

  /* Notice Content */
  noticeMessage: "",
  paymentInstructions: "",
  escalationNote: "",

  /* Follow-up */
  nextFollowUpDate: "",
  assignedTo: "",
  comments: "",

  /* Audit Trail */
  createdOn: "",
  lastUpdatedOn: "",
  documentOwner: "",

  preparedSignature: {},
  reviewedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00930_DunningNoticeTemplate = () => {

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
      formId="FRM-00930"
      title="Dunning Notice (Internal Template)"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Dunning Notice Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00930"
              title="DUNNING NOTICE"
              department="Finance & Accounting (Advanced) – Accounts Receivable, Credit & Collections"
            >

              {/* ================= GENERAL INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  <Field name="date" type="date" className="form-input"/>
                  <Field name="referenceNumber" placeholder="Reference Number" className="form-input"/>
                  <Field name="noticeLevel" placeholder="Notice Level" className="form-input"/>
                </div>
              </div>

              {/* ================= CUSTOMER DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Customer Details</h3>
                <div className="form-fields">
                  <Field name="customerName" placeholder="Customer Name" className="form-input"/>
                  <Field name="customerId" placeholder="Customer ID" className="form-input"/>
                  <Field name="businessAddress" placeholder="Business Address" className="form-input"/>
                  <Field name="contactPerson" placeholder="Contact Person" className="form-input"/>
                  <Field name="phone" placeholder="Phone" className="form-input"/>
                  <Field name="email" placeholder="Email" className="form-input"/>
                </div>
              </div>

              {/* ================= INVOICE DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Invoice Details</h3>

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
                              daysOverdue:"",
                              outstandingAmount:"",
                              currency:"",
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
                            <th>Invoice Number</th>
                            <th>Invoice Date</th>
                            <th>Due Date</th>
                            <th>Days Overdue</th>
                            <th>Outstanding Amount</th>
                            <th>Currency</th>

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
                              <td><Field name={`invoices.${index}.daysOverdue`} type="number" className="form-input"/></td>
                              <td><Field name={`invoices.${index}.outstandingAmount`} type="number" className="form-input"/></td>
                              <td><Field name={`invoices.${index}.currency`} className="form-input"/></td>

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

              {/* ================= NOTICE CONTENT ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Notice Content</h3>
                <div className="form-fields">
                  <Field name="noticeMessage" placeholder="Notice Message" className="form-input"/>
                  <Field name="paymentInstructions" placeholder="Payment Instructions" className="form-input"/>
                  <Field name="escalationNote" placeholder="Escalation Note" className="form-input"/>
                </div>
              </div>

              {/* ================= FOLLOW-UP ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Follow-up</h3>
                <div className="form-fields">
                  <Field name="nextFollowUpDate" type="date" className="form-input"/>
                  <Field name="assignedTo" placeholder="Assigned To" className="form-input"/>
                  <Field name="comments" placeholder="Comments" className="form-input"/>
                </div>
              </div>

              {/* ================= AUDIT TRAIL ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Audit Trail</h3>
                <div className="form-fields">
                  <Field name="createdOn" type="date" className="form-input"/>
                  <Field name="lastUpdatedOn" type="date" className="form-input"/>
                  <Field name="documentOwner" className="form-input"/>
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
                    Submit Dunning Notice
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

export default FRM00930_DunningNoticeTemplate;