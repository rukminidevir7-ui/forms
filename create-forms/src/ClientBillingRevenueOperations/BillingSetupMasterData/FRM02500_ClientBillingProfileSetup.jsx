// FRM02500_ClientBillingProfileSetup.jsx
// FRM-02500 – Client Billing Profile Setup
// Enterprise Grade – Client Billing & Revenue Operations – Billing Setup & Master Data

import React from "react";
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
  legalEntityName: Yup.string().required("Required"),
  billingCurrency: Yup.string().required("Required"),
  billingCycle: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "Client KYC Documents",
  "Contract / Agreement",
  "Tax Registration Documents",
  "Supporting Documents"
];

const initialValues = {
  formId: "FRM-02500",
  department: "Client Billing & Revenue Operations",
  function: "Billing Setup & Master Data",

  /* 1. Client Information */
  clientName: "",
  clientCode: "",
  legalEntityName: "",
  panTaxId: "",
  gstVat: "",
  registeredAddress: "",
  country: "",

  /* 2. Billing Configuration */
  billingCurrency: "",
  billingCycle: "",
  invoiceMethod: "",
  paymentTerms: "",
  creditLimit: "",
  billingContactName: "",
  billingContactEmail: "",

  /* 3. Revenue & Accounting Mapping */
  revenueGLAccount: "",
  receivableAccount: "",
  costCenter: "",
  businessUnit: "",
  taxCode: "",

  /* 4. Compliance & Documentation */
  kycCompleted: "",
  contractReference: "",
  remarks: "",

  /* Attachments */
  mandatoryAttachments: mandatoryDocuments.map(doc => ({
    documentName: doc,
    status: "",
    file: null,
    remarks: ""
  })),
  customAttachments: [],

  /* Approval */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  approvalDate: "",

  attachments: [],
  customFields: []
};

/* ================= COMPONENT ================= */

const FRM02500_ClientBillingProfileSetup = () => {

  const { isPrintMode } = usePrintMode();

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
    <ModernFormWrapper formId="FRM-02500" title="Client Billing Profile Setup">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Client Billing Profile Setup Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02500"
              title="FRM-02500 — Client Billing Profile Setup"
              department="Client Billing & Revenue Operations | Billing Setup & Master Data"
            >

              {/* 1. Client Information */}
              <div className="form-section">
                <h3 className="form-section-title">Client Information</h3>
                <div className="form-fields">
                  {field(values,"clientName","Client Name")}
                  {field(values,"clientCode","Client Code")}
                  {field(values,"legalEntityName","Legal Entity Name")}
                  {field(values,"panTaxId","PAN / Tax ID")}
                  {field(values,"gstVat","GSTIN / VAT")}
                  {field(values,"registeredAddress","Registered Address")}
                  {field(values,"country","Country")}
                </div>
              </div>

              {/* 2. Billing Configuration */}
              <div className="form-section">
                <h3 className="form-section-title">Billing Configuration</h3>
                <div className="form-fields">
                  {field(values,"billingCurrency","Billing Currency")}
                  {field(values,"billingCycle","Billing Cycle (Monthly/Quarterly/etc)")}
                  {field(values,"invoiceMethod","Invoice Method")}
                  {field(values,"paymentTerms","Payment Terms (Days)")}
                  {field(values,"creditLimit","Credit Limit")}
                  {field(values,"billingContactName","Billing Contact Name")}
                  {field(values,"billingContactEmail","Billing Contact Email","email")}
                </div>
              </div>

              {/* 3. Revenue & Accounting Mapping */}
              <div className="form-section">
                <h3 className="form-section-title">Revenue & Accounting Mapping</h3>
                <div className="form-fields">
                  {field(values,"revenueGLAccount","Revenue GL Account")}
                  {field(values,"receivableAccount","Receivable Account")}
                  {field(values,"costCenter","Cost Center")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"taxCode","Tax Code")}
                </div>
              </div>

              {/* 4. Compliance & Documentation */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance & Documentation</h3>
                <div className="form-fields">
                  {field(values,"kycCompleted","KYC Completed")}
                  {field(values,"contractReference","Contract / Agreement Reference")}
                  {field(values,"remarks","Remarks")}
                </div>
              </div>

              {/* ATTACHMENTS */}
              <div className="form-section">

                <FormAttachments values={values} />

                <FieldArray name="mandatoryAttachments">
                  {() => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Document</th>
                          <th>Status</th>
                          <th>Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {values.mandatoryAttachments.map((doc,index)=>(
                          <tr key={index}>
                            <td>{doc.documentName}</td>
                            <td>
                              <Field
                                as="select"
                                name={`mandatoryAttachments.${index}.status`}
                                className="form-input"
                              >
                                <option value="">Select</option>
                                <option>YES</option>
                                <option>NO</option>
                                <option>NA</option>
                              </Field>
                            </td>
                            <td>
                              <Field
                                name={`mandatoryAttachments.${index}.remarks`}
                                className="form-input"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>

              </div>

              <FormCustomFields values={values} />

              {/* 5. Approval */}
              <div className="form-section">
                <h3 className="form-section-title">Approval</h3>

                <FieldArray name="approvalRoles">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode &&
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={()=>push({ roleName:"New Role", data:{} })}
                        >
                          + Add Role
                        </button>
                      }

                      <div className="three-column-signatures">
                        {values.approvalRoles.map((role,index)=>(
                          <div key={index}>
                            <ApprovalSignatureBlock
                              roleName={role.roleName}
                              value={role.data}
                              allowRoleEdit={true}
                              onRoleNameChange={(val)=>setFieldValue(`approvalRoles.${index}.roleName`,val)}
                              onChange={(val)=>setFieldValue(`approvalRoles.${index}.data`,val)}
                            />
                            {!isPrintMode &&
                              <button type="button" onClick={()=>remove(index)}>
                                Remove
                              </button>
                            }
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
                    Submit Billing Profile Setup
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

export default FRM02500_ClientBillingProfileSetup;