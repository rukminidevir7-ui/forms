// FRM02502_TaxProfileSetupClient.jsx
// FRM-02502 – Tax Profile Setup (Client)
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
  country: Yup.string().required("Required"),
  panTaxId: Yup.string().required("Required"),
  gstVatNumber: Yup.string().required("Required"),
  defaultTaxCode: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "Tax Registration Certificate",
  "GST / VAT Certificate",
  "PAN / Tax ID Copy",
  "Supporting Documents"
];

const initialValues = {
  formId: "FRM-02502",
  department: "Client Billing & Revenue Operations",
  function: "Billing Setup & Master Data",

  /* 1. Client Details */
  clientName: "",
  clientCode: "",
  legalEntityName: "",
  country: "",
  registeredAddress: "",
  contactPerson: "",
  contactEmail: "",

  /* 2. Tax Identification */
  panTaxId: "",
  gstVatNumber: "",
  taxRegistrationType: "",
  placeOfSupply: "",
  taxResidencyStatus: "",

  /* 3. Tax Configuration */
  defaultTaxCode: "",
  withholdingTaxApplicable: "",
  withholdingTaxRate: "",
  reverseChargeApplicable: "",
  exemptionStatus: "",

  /* 4. Documentation */
  remarks: "",

  mandatoryAttachments: mandatoryDocuments.map(doc => ({
    documentName: doc,
    status: "",
    file: null,
    remarks: ""
  })),
  customAttachments: [],

  /* 5. Workflow & Approval */
  approvalRoles: [
    { roleName: "Initiated By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  approvalStatus: "",
  comments: "",
  approvalDate: "",

  attachments: [],
  customFields: []
};

/* ================= COMPONENT ================= */

const FRM02502_TaxProfileSetupClient = () => {

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
    <ModernFormWrapper formId="FRM-02502" title="Tax Profile Setup (Client)">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Tax Profile Setup Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02502"
              title="FRM-02502 — Tax Profile Setup (Client)"
              department="Client Billing & Revenue Operations | Billing Setup & Master Data"
            >

              {/* 1. Client Details */}
              <div className="form-section">
                <h3 className="form-section-title">Client Details</h3>
                <div className="form-fields">
                  {field(values,"clientName","Client Name")}
                  {field(values,"clientCode","Client Code")}
                  {field(values,"legalEntityName","Legal Entity Name")}
                  {field(values,"country","Country")}
                  {field(values,"registeredAddress","Registered Address")}
                  {field(values,"contactPerson","Contact Person")}
                  {field(values,"contactEmail","Contact Email","email")}
                </div>
              </div>

              {/* 2. Tax Identification */}
              <div className="form-section">
                <h3 className="form-section-title">Tax Identification</h3>
                <div className="form-fields">
                  {field(values,"panTaxId","PAN / Tax ID")}
                  {field(values,"gstVatNumber","GSTIN / VAT Number")}
                  {field(values,"taxRegistrationType","Tax Registration Type")}
                  {field(values,"placeOfSupply","Place of Supply")}
                  {field(values,"taxResidencyStatus","Tax Residency Status")}
                </div>
              </div>

              {/* 3. Tax Configuration */}
              <div className="form-section">
                <h3 className="form-section-title">Tax Configuration</h3>
                <div className="form-fields">
                  {field(values,"defaultTaxCode","Default Tax Code")}
                  {field(values,"withholdingTaxApplicable","Withholding Tax Applicable (Yes/No)")}
                  {field(values,"withholdingTaxRate","Withholding Tax Rate (%)","number")}
                  {field(values,"reverseChargeApplicable","Reverse Charge Applicable (Yes/No)")}
                  {field(values,"exemptionStatus","Exemption Status")}
                </div>
              </div>

              {/* 4. Documentation */}
              <div className="form-section">
                <h3 className="form-section-title">Documentation</h3>

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

                {field(values,"remarks","Remarks")}
              </div>

              {/* 5. Workflow & Approval */}
              <div className="form-section">
                <h3 className="form-section-title">Workflow & Approval</h3>

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

                {field(values,"approvalStatus","Approval Status")}
                {field(values,"comments","Comments")}
                {field(values,"approvalDate","Approval Date","date")}
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Tax Profile Setup
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

export default FRM02502_TaxProfileSetupClient;