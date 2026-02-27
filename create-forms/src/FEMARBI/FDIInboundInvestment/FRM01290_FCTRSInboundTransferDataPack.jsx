// FRM01290_FCTRSInboundTransferDataPack.jsx
// FRM-01290 – Form FC-TRS (Inbound Transfer) Data Pack
// Enterprise Grade – FEMA & RBI – FDI / Inbound Investment

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
  companyName: Yup.string().required("Required"),
  cin: Yup.string().required("Required"),
  pan: Yup.string().required("Required"),
  totalTransferAmount: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "Transfer Agreement",
  "Valuation Certificate",
  "KYC Documents",
  "FIRC / Bank Advice",
  "Other Supporting Documents"
];

const initialValues = {
  formId: "FRM-01290",
  date: "",
  department: "FEMA & RBI",
  function: "FDI / Inbound Investment",

  /* 1 */
  companyName: "",
  cin: "",
  pan: "",
  registeredOffice: "",
  authorizedDealerBank: "",
  sector: "",
  formReferenceNo: "",
  filingDate: "",

  /* 2 */
  typeOfSecurity: "",
  numberOfSecuritiesTransferred: "",
  transferPricePerSecurity: "",
  totalTransferAmount: "",
  dateOfTransfer: "",
  natureOfTransfer: "",

  /* 3 */
  transferorName: "",
  transferorCountry: "",
  transferorAddress: "",
  transferorEntityType: "",
  transferorContactDetails: "",

  /* 4 */
  transfereeName: "",
  transfereeCountry: "",
  transfereeAddress: "",
  transfereeEntityType: "",
  transfereeContactDetails: "",

  /* 5 */
  pricingGuidelinesCompliance: "",
  sectoralCapCompliance: "",
  valuationCertificateDate: "",
  kycCompleted: "",
  fircReference: "",

  mandatoryAttachments: mandatoryDocuments.map(doc => ({
    documentName: doc,
    status: "",
    file: null,
    remarks: ""
  })),

  customAttachments: [],

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Authorized Signatory", data: {} }
  ],

  workflowStatus: "",
  comments: "",

  attachments: [],
  customFields: []
};

/* ================= COMPONENT ================= */

const FRM01290_FCTRSInboundTransferDataPack = () => {

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
    <ModernFormWrapper formId="FRM-01290" title="Form FC-TRS (Inbound Transfer) Data Pack">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("FC-TRS Inbound Transfer Data Pack Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01290"
              title="FRM-01290 — Form FC-TRS (Inbound Transfer) Data Pack"
              department="FEMA & RBI (Foreign Exchange) | FDI / Inbound Investment"
            >

              {/* 1 */}
              <div className="form-section">
                <h3 className="form-section-title">Organization & Regulatory Identification</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"pan","PAN")}
                  {field(values,"registeredOffice","Registered Office Address")}
                  {field(values,"authorizedDealerBank","Authorized Dealer Bank")}
                  {field(values,"sector","Sector / Industry")}
                  {field(values,"formReferenceNo","Form Reference No")}
                  {field(values,"filingDate","Filing Date","date")}
                </div>
              </div>

              {/* 2 */}
              <div className="form-section">
                <h3 className="form-section-title">Transfer Details</h3>
                <div className="form-fields">
                  {field(values,"typeOfSecurity","Type of Security")}
                  {field(values,"numberOfSecuritiesTransferred","Number of Securities Transferred")}
                  {field(values,"transferPricePerSecurity","Transfer Price per Security")}
                  {field(values,"totalTransferAmount","Total Transfer Amount")}
                  {field(values,"dateOfTransfer","Date of Transfer","date")}
                  {field(values,"natureOfTransfer","Nature of Transfer (Sale/Gift)")}
                </div>
              </div>

              {/* 3 */}
              <div className="form-section">
                <h3 className="form-section-title">Transferor Details</h3>
                <div className="form-fields">
                  {field(values,"transferorName","Transferor Name")}
                  {field(values,"transferorCountry","Country")}
                  {field(values,"transferorAddress","Address")}
                  {field(values,"transferorEntityType","Entity Type")}
                  {field(values,"transferorContactDetails","Contact Details")}
                </div>
              </div>

              {/* 4 */}
              <div className="form-section">
                <h3 className="form-section-title">Transferee Details</h3>
                <div className="form-fields">
                  {field(values,"transfereeName","Transferee Name")}
                  {field(values,"transfereeCountry","Country")}
                  {field(values,"transfereeAddress","Address")}
                  {field(values,"transfereeEntityType","Entity Type")}
                  {field(values,"transfereeContactDetails","Contact Details")}
                </div>
              </div>

              {/* 5 */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Details</h3>
                <div className="form-fields">
                  {field(values,"pricingGuidelinesCompliance","Pricing Guidelines Compliance")}
                  {field(values,"sectoralCapCompliance","Sectoral Cap Compliance")}
                  {field(values,"valuationCertificateDate","Valuation Certificate Date","date")}
                  {field(values,"kycCompleted","KYC Completed")}
                  {field(values,"fircReference","FIRC / Bank Reference")}
                </div>
              </div>

              {/* Custom Fields */}
              <FormCustomFields values={values} />

              {/* 6 Attachments */}
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
                              <Field as="select"
                                name={`mandatoryAttachments.${index}.status`}
                                className="form-input">
                                <option value="">Select</option>
                                <option>YES</option>
                                <option>NO</option>
                                <option>NA</option>
                              </Field>
                            </td>
                            <td>
                              <Field name={`mandatoryAttachments.${index}.remarks`} className="form-input"/>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>
              </div>

              {/* 7 Declaration */}
              <div className="form-section">
                <h3 className="form-section-title">Declaration & Sign-off</h3>

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
                    Submit FC-TRS Data Pack
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

export default FRM01290_FCTRSInboundTransferDataPack;