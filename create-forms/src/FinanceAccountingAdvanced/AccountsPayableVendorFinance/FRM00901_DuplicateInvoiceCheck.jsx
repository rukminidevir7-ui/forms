// FRM00901_DuplicateInvoiceCheck.jsx
// FRM-00901 – Duplicate Invoice Check – Review / Approval
// Enterprise Grade – Accounts Payable & Vendor Finance

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
  referenceNo: Yup.string().required("Required"),
  vendorName: Yup.string().required("Required"),
  invoiceNumber: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00901",
  version: "1.0",
  date: "",

  department: "Finance & Accounting",
  preparedBy: "",
  referenceNo: "",
  status: "",

  /* Invoice Details */
  vendorName: "",
  invoiceNumber: "",
  invoiceDate: "",
  invoiceAmount: "",
  currency: "",
  poNumber: "",

  /* Duplicate Check */
  checkMethod: "",
  systemReference: "",
  duplicateFound: "",
  remarks: "",

  /* Comparison Table (Optional Multiple Matches) */
  comparisonInvoices: [
    {
      comparedInvoiceNumber: "",
      comparedInvoiceDate: "",
      comparedAmount: "",
      comparedCurrency: "",
      matchStatus: "",
      dynamicFields: {}
    }
  ],

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

const FRM00901_DuplicateInvoiceCheck = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const name = prompt("Enter Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");
    if (dynamicColumns.find(col=>col.key===key)) return;
    setDynamicColumns([...dynamicColumns,{key,label:name}]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col=>col.key!==key));
  };

  return (
    <ModernFormWrapper
      formId="FRM-00901"
      title="Duplicate Invoice Check"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Duplicate Invoice Check Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00901"
              title="DUPLICATE INVOICE CHECK"
              department="Finance & Accounting – Accounts Payable & Vendor Finance"
            >

              {/* ================= DOCUMENT INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Document Information</h3>
                <div className="form-fields">
                  <Field name="date" type="date" className="form-input"/>
                  <Field name="department" className="form-input"/>
                  <Field name="preparedBy" placeholder="Prepared By" className="form-input"/>
                  <Field name="referenceNo" placeholder="Reference No" className="form-input"/>
                  <Field name="status" placeholder="Status" className="form-input"/>
                </div>
              </div>

              {/* ================= INVOICE DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Invoice Details</h3>
                <div className="form-fields">
                  <Field name="vendorName" placeholder="Vendor Name" className="form-input"/>
                  <Field name="invoiceNumber" placeholder="Invoice Number" className="form-input"/>
                  <Field name="invoiceDate" type="date" className="form-input"/>
                  <Field name="invoiceAmount" type="number" placeholder="Invoice Amount" className="form-input"/>
                  <Field name="currency" placeholder="Currency" className="form-input"/>
                  <Field name="poNumber" placeholder="PO Number" className="form-input"/>
                </div>
              </div>

              {/* ================= DUPLICATE CHECK DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Duplicate Check Details</h3>
                <div className="form-fields">
                  <Field name="checkMethod" placeholder="Check Method" className="form-input"/>
                  <Field name="systemReference" placeholder="System Reference" className="form-input"/>
                  <Field as="select" name="duplicateFound" className="form-input">
                    <option value="">Duplicate Found?</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </Field>
                  <Field name="remarks" placeholder="Remarks" className="form-input"/>
                </div>
              </div>

              {/* ================= COMPARISON INVOICES ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Comparison Invoices (If Any)</h3>

                <FieldArray name="comparisonInvoices">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode && (
                        <div style={{display:"flex",gap:"10px",marginBottom:10}}>
                          <button type="button" className="btn-submit" onClick={addColumn}>+ Add Column</button>
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={()=>push({
                              comparedInvoiceNumber:"",
                              comparedInvoiceDate:"",
                              comparedAmount:"",
                              comparedCurrency:"",
                              matchStatus:"",
                              dynamicFields:{}
                            })}
                          >
                            + Add Row
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Sl No</th>
                            <th>Invoice Number</th>
                            <th>Invoice Date</th>
                            <th>Amount</th>
                            <th>Currency</th>
                            <th>Match Status</th>
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
                          {values.comparisonInvoices.map((row,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td><Field name={`comparisonInvoices.${index}.comparedInvoiceNumber`} className="form-input"/></td>
                              <td><Field name={`comparisonInvoices.${index}.comparedInvoiceDate`} type="date" className="form-input"/></td>
                              <td><Field name={`comparisonInvoices.${index}.comparedAmount`} type="number" className="form-input"/></td>
                              <td><Field name={`comparisonInvoices.${index}.comparedCurrency`} className="form-input"/></td>
                              <td><Field name={`comparisonInvoices.${index}.matchStatus`} className="form-input"/></td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field name={`comparisonInvoices.${index}.dynamicFields.${col.key}`} className="form-input"/>
                                </td>
                              ))}

                              {!isPrintMode && (
                                <td>
                                  <button type="button" onClick={()=>remove(index)}>Remove</button>
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

              {/* ================= APPROVAL WORKFLOW ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Approval Workflow</h3>
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
                      <button type="button" className="btn-submit" onClick={()=>push({data:{}})}>
                        + Add Custom Signature
                      </button>
                    )}
                    {values.additionalSignatures.map((sig,index)=>(
                      <div key={index}>
                        <ApprovalSignatureBlock
                          label={`Custom Signature ${index+1}`}
                          value={sig.data||{}}
                          onChange={(val)=>setFieldValue(`additionalSignatures.${index}.data`,val)}
                        />
                        {!isPrintMode && (
                          <button type="button" onClick={()=>remove(index)}>Remove</button>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </FieldArray>

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Duplicate Invoice Check
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

export default FRM00901_DuplicateInvoiceCheck;
