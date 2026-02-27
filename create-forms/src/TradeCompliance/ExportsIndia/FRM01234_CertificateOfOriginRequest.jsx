// FRM01234_CertificateOfOriginRequest.jsx
// FRM-01234 – Certificate of Origin Request
// Enterprise Grade – Trade Compliance – Exports (India)

import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
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
  exporterName: Yup.string().required("Required"),
  descriptionOfGoods: Yup.string().required("Required"),
  invoiceNumber: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01234",
  date: "",
  department: "Trade Compliance",
  function: "Exports (India)",

  referenceNumber: "",
  businessUnit: "",
  preparedBy: "",
  location: "",

  exporterName: "",
  iecNumber: "",
  gstin: "",
  address: "",

  customerConsignee: "",
  countryOfDestination: "",
  portOfLoading: "",
  portOfDischarge: "",
  modeOfTransport: "",

  descriptionOfGoods: "",
  hsCode: "",
  quantity: "",
  invoiceNumber: "",
  invoiceDate: "",
  countryOfOrigin: "",

  declarationStatement: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01234_CertificateOfOriginRequest = () => {

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
    <ModernFormWrapper
      formId="FRM-01234"
      title="Certificate of Origin Request"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Certificate of Origin Request Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01234"
              title="CERTIFICATE OF ORIGIN REQUEST"
              department="Trade Compliance – Exports (India)"
            >

              {/* GENERAL INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"date","Date","date")}
                  {field(values,"department","Department")}
                  {field(values,"function","Function")}
                  {field(values,"referenceNumber","Reference Number")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"preparedBy","Prepared By")}
                  {field(values,"location","Location")}
                </div>
              </div>

              {/* EXPORTER DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Exporter Details</h3>
                <div className="form-fields">
                  {field(values,"exporterName","Exporter Name")}
                  {field(values,"iecNumber","IEC Number")}
                  {field(values,"gstin","GSTIN")}
                  {field(values,"address","Address")}
                </div>
              </div>

              {/* SHIPMENT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Shipment Details</h3>
                <div className="form-fields">
                  {field(values,"customerConsignee","Customer / Consignee")}
                  {field(values,"countryOfDestination","Country of Destination")}
                  {field(values,"portOfLoading","Port of Loading")}
                  {field(values,"portOfDischarge","Port of Discharge")}
                  {field(values,"modeOfTransport","Mode of Transport")}
                </div>
              </div>

              {/* GOODS DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Goods Details</h3>
                <div className="form-fields">
                  {field(values,"descriptionOfGoods","Description of Goods")}
                  {field(values,"hsCode","HS Code")}
                  {field(values,"quantity","Quantity")}
                  {field(values,"invoiceNumber","Invoice Number")}
                  {field(values,"invoiceDate","Invoice Date","date")}
                  {field(values,"countryOfOrigin","Country of Origin")}
                </div>
              </div>

              {/* DECLARATION */}
              <div className="form-section">
                <h3 className="form-section-title">Declaration</h3>
                <div className="form-fields">
                  {field(values,"declarationStatement","Declaration Statement")}
                </div>
              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* APPROVAL */}
              <div className="form-section">
                <h3 className="form-section-title">Approval</h3>

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
                    Submit Certificate of Origin Request
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

export default FRM01234_CertificateOfOriginRequest;