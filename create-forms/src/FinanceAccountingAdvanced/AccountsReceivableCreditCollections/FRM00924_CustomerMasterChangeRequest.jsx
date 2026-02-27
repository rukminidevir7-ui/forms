// FRM00924_CustomerMasterChangeRequest.jsx
// FRM-00924 – Customer Master Change Request (Request / Initiation)
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
  changeRequestType: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00924",
  version: "1.0",
  date: "",
  department: "Finance & Accounting (Advanced)",
  functionName: "Accounts Receivable, Credit & Collections",
  referenceNumber: "",
  location: "",
  changeRequestType: "",
  effectiveDate: "",

  /* Customer Identification */
  customerName: "",
  customerId: "",
  accountNumber: "",
  businessAddress: "",

  /* Change Details Table */
  changeDetails: [
    {
      fieldName: "",
      currentValue: "",
      proposedValue: "",
      reasonForChange: "",
      impactAssessment: "",
      dynamicFields: {}
    }
  ],

  /* Contact Information */
  contactPerson: "",
  phone: "",
  email: "",
  taxId: "",

  /* Attachments */
  supportingDocsAttached: "",
  documentReference: "",

  /* Audit Trail */
  createdOn: "",
  lastUpdatedOn: "",
  documentOwner: "",

  /* Signatures */
  requestedSignature: {},
  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00924_CustomerMasterChangeRequest = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const name = prompt("Enter Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g, "");
    if (dynamicColumns.find(col => col.key === key)) return;
    setDynamicColumns([...dynamicColumns, { key, label: name }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
  };

  return (
    <ModernFormWrapper
      formId="FRM-00924"
      title="Customer Master Change Request"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Customer Master Change Request Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00924"
              title="CUSTOMER MASTER CHANGE REQUEST"
              department="Finance & Accounting (Advanced) – Accounts Receivable, Credit & Collections"
            >

              {/* ================= GENERAL INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  <Field name="date" type="date" className="form-input"/>
                  <Field name="referenceNumber" placeholder="Reference Number" className="form-input"/>
                  <Field name="location" placeholder="Location" className="form-input"/>
                  <Field name="changeRequestType" placeholder="Change Request Type" className="form-input"/>
                  <Field name="effectiveDate" type="date" className="form-input"/>
                </div>
              </div>

              {/* ================= CUSTOMER IDENTIFICATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Customer Identification</h3>
                <div className="form-fields">
                  <Field name="customerName" placeholder="Customer Name" className="form-input"/>
                  <Field name="customerId" placeholder="Customer ID" className="form-input"/>
                  <Field name="accountNumber" placeholder="Account Number" className="form-input"/>
                  <Field name="businessAddress" placeholder="Business Address" className="form-input"/>
                </div>
              </div>

              {/* ================= CHANGE DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Change Details</h3>

                <FieldArray name="changeDetails">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode && (
                        <div style={{display:"flex",gap:"10px",marginBottom:10}}>
                          <button type="button" className="btn-submit" onClick={addColumn}>
                            + Add Column
                          </button>
                          <button type="button" className="btn-submit"
                            onClick={()=>push({
                              fieldName:"",
                              currentValue:"",
                              proposedValue:"",
                              reasonForChange:"",
                              impactAssessment:"",
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
                            <th>Field to be Changed</th>
                            <th>Current Value</th>
                            <th>Proposed Value</th>
                            <th>Reason for Change</th>
                            <th>Impact Assessment</th>

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
                          {values.changeDetails.map((item,index)=>(
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td><Field name={`changeDetails.${index}.fieldName`} className="form-input"/></td>
                              <td><Field name={`changeDetails.${index}.currentValue`} className="form-input"/></td>
                              <td><Field name={`changeDetails.${index}.proposedValue`} className="form-input"/></td>
                              <td><Field name={`changeDetails.${index}.reasonForChange`} className="form-input"/></td>
                              <td><Field name={`changeDetails.${index}.impactAssessment`} className="form-input"/></td>

                              {dynamicColumns.map(col=>(
                                <td key={col.key}>
                                  <Field
                                    name={`changeDetails.${index}.dynamicFields.${col.key}`}
                                    className="form-input"
                                  />
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

              {/* ================= CONTACT INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Contact Information</h3>
                <div className="form-fields">
                  <Field name="contactPerson" placeholder="Contact Person" className="form-input"/>
                  <Field name="phone" placeholder="Phone" className="form-input"/>
                  <Field name="email" placeholder="Email" className="form-input"/>
                  <Field name="taxId" placeholder="Tax ID / GST" className="form-input"/>
                </div>
              </div>

              {/* ================= ATTACHMENTS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Attachments</h3>
                <div className="form-fields">
                  <Field name="supportingDocsAttached" placeholder="Supporting Documents Attached (Y/N)" className="form-input"/>
                  <Field name="documentReference" placeholder="Document Reference" className="form-input"/>
                </div>
              </div>

              {/* ================= AUDIT TRAIL ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Audit Trail</h3>
                <div className="form-fields">
                  <Field name="createdOn" type="date" className="form-input"/>
                  <Field name="lastUpdatedOn" type="date" className="form-input"/>
                  <Field name="documentOwner" placeholder="Document Owner" className="form-input"/>
                </div>
              </div>

              <FormCustomFields values={values}/>
              <FormAttachments values={values}/>

              {/* ================= AUTHORIZATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>
                <div className="three-column-signatures">
                  <ApprovalSignatureBlock
                    label="Requested By"
                    value={values.requestedSignature}
                    onChange={(val)=>setFieldValue("requestedSignature",val)}
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
                    Submit Customer Master Change Request
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

export default FRM00924_CustomerMasterChangeRequest;