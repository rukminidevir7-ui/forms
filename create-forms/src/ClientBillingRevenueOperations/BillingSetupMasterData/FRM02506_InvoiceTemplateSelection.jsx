// FRM02506_InvoiceTemplateSelection.jsx
// FRM-02506 – Invoice Template Selection
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
  legalEntity: Yup.string().required("Required"),
  requestDate: Yup.date().required("Required"),
  invoiceTemplateName: Yup.string().required("Required"),
  templateCode: Yup.string().required("Required"),
  effectiveDate: Yup.date().required("Required")
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "Approved Invoice Template Copy",
  "Branding Guidelines (if applicable)",
  "Client Approval Email",
  "Supporting Documents"
];

const initialValues = {
  formId: "FRM-02506",
  department: "Client Billing & Revenue Operations",
  function: "Billing Setup & Master Data",

  /* 1. Client Details */
  clientName: "",
  clientCode: "",
  legalEntity: "",
  country: "",
  requestDate: "",
  referenceNo: "",

  /* 2. Template Selection */
  invoiceTemplateName: "",
  templateCode: "",
  language: "",
  currencyFormat: "",
  taxDisplayFormat: "",
  layoutType: "",

  /* 3. Configuration Details */
  defaultTemplate: "",
  customBrandingRequired: "",
  logoIncluded: "",
  additionalFieldsRequired: "",
  remarks: "",

  /* 4. Impact Assessment */
  systemImpact: "",
  customerCommunicationRequired: "",
  effectiveDate: "",

  /* Attachments */
  mandatoryAttachments: mandatoryDocuments.map(doc => ({
    documentName: doc,
    status: "",
    file: null,
    remarks: ""
  })),
  customAttachments: [],

  /* 5. Approval */
  approvalRoles: [
    { roleName: "Requested By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  approvalDate: "",

  attachments: [],
  customFields: []
};

/* ================= COMPONENT ================= */

const FRM02506_InvoiceTemplateSelection = () => {

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
    <ModernFormWrapper formId="FRM-02506" title="Invoice Template Selection">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Invoice Template Selection Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02506"
              title="FRM-02506 — Invoice Template Selection"
              department="Client Billing & Revenue Operations | Billing Setup & Master Data"
            >

              {/* 1. Client Details */}
              <div className="form-section">
                <h3 className="form-section-title">Client Details</h3>
                <div className="form-fields">
                  {field(values,"clientName","Client Name")}
                  {field(values,"clientCode","Client Code")}
                  {field(values,"legalEntity","Legal Entity")}
                  {field(values,"country","Country")}
                  {field(values,"requestDate","Request Date","date")}
                  {field(values,"referenceNo","Reference No")}
                </div>
              </div>

              {/* 2. Template Selection */}
              <div className="form-section">
                <h3 className="form-section-title">Template Selection</h3>
                <div className="form-fields">
                  {field(values,"invoiceTemplateName","Invoice Template Name")}
                  {field(values,"templateCode","Template Code")}
                  {field(values,"language","Language")}
                  {field(values,"currencyFormat","Currency Format")}
                  {field(values,"taxDisplayFormat","Tax Display Format")}
                  {field(values,"layoutType","Layout Type")}
                </div>
              </div>

              {/* 3. Configuration Details */}
              <div className="form-section">
                <h3 className="form-section-title">Configuration Details</h3>
                <div className="form-fields">
                  {field(values,"defaultTemplate","Default Template (Yes/No)")}
                  {field(values,"customBrandingRequired","Custom Branding Required (Yes/No)")}
                  {field(values,"logoIncluded","Logo Included (Yes/No)")}
                  {field(values,"additionalFieldsRequired","Additional Fields Required")}
                  {field(values,"remarks","Remarks")}
                </div>
              </div>

              {/* 4. Impact Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">Impact Assessment</h3>
                <div className="form-fields">
                  {field(values,"systemImpact","System Impact")}
                  {field(values,"customerCommunicationRequired","Customer Communication Required (Yes/No)")}
                  {field(values,"effectiveDate","Effective Date","date")}
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
                    Submit Invoice Template Selection
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

export default FRM02506_InvoiceTemplateSelection;