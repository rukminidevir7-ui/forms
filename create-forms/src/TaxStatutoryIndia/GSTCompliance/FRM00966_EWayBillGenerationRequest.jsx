// FRM00966_EWayBillGenerationRequest.jsx
// FRM-00966 – E-Way Bill Generation Request
// Enterprise Grade – Tax & Statutory (India) – GST Compliance

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
  referenceNumber: Yup.string().required("Required"),
  invoiceNumber: Yup.string().required("Required"),
  legalNameConsignor: Yup.string().required("Required"),
  legalNameConsignee: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00966",
  date: "",
  department: "Tax & Statutory (India)",
  function: "GST Compliance",
  referenceNumber: "",
  location: "",
  requestType: "",
  priority: "",

  /* Consignor */
  legalNameConsignor: "",
  gstinConsignor: "",
  addressConsignor: "",
  stateConsignor: "",
  pinCodeConsignor: "",

  /* Consignee */
  legalNameConsignee: "",
  gstinConsignee: "",
  addressConsignee: "",
  stateConsignee: "",
  pinCodeConsignee: "",

  /* Invoice */
  invoiceNumber: "",
  invoiceDate: "",
  invoiceValue: "",
  currency: "",
  taxableValue: "",
  totalTaxAmount: "",

  /* Transport */
  modeOfTransport: "",
  transporterName: "",
  transporterId: "",
  vehicleNumber: "",
  distanceKM: "",

  approvalRoles: [
    { roleName: "Requested By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM00966_EWayBillGenerationRequest = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type = "text") => (
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
    <ModernFormWrapper formId="FRM-00966" title="E-Way Bill Generation Request">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("E-Way Bill Generation Request Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00966"
              title="E-WAY BILL GENERATION REQUEST"
              department="Tax & Statutory (India) – GST Compliance"
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
                  {field(values,"location","Location")}
                  {field(values,"requestType","Request Type")}
                  {field(values,"priority","Priority")}
                </div>
              </div>

              {/* CONSIGNOR DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Consignor Details</h3>
                <div className="form-fields">
                  {field(values,"legalNameConsignor","Legal Name")}
                  {field(values,"gstinConsignor","GSTIN")}
                  {field(values,"addressConsignor","Address")}
                  {field(values,"stateConsignor","State")}
                  {field(values,"pinCodeConsignor","PIN Code")}
                </div>
              </div>

              {/* CONSIGNEE DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Consignee Details</h3>
                <div className="form-fields">
                  {field(values,"legalNameConsignee","Legal Name")}
                  {field(values,"gstinConsignee","GSTIN")}
                  {field(values,"addressConsignee","Address")}
                  {field(values,"stateConsignee","State")}
                  {field(values,"pinCodeConsignee","PIN Code")}
                </div>
              </div>

              {/* INVOICE DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Invoice Details</h3>
                <div className="form-fields">
                  {field(values,"invoiceNumber","Invoice Number")}
                  {field(values,"invoiceDate","Invoice Date","date")}
                  {field(values,"invoiceValue","Invoice Value","number")}
                  {field(values,"currency","Currency")}
                  {field(values,"taxableValue","Taxable Value","number")}
                  {field(values,"totalTaxAmount","Total Tax Amount","number")}
                </div>
              </div>

              {/* TRANSPORT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Transport Details</h3>
                <div className="form-fields">
                  {field(values,"modeOfTransport","Mode of Transport")}
                  {field(values,"transporterName","Transporter Name")}
                  {field(values,"transporterId","Transporter ID")}
                  {field(values,"vehicleNumber","Vehicle Number")}
                  {field(values,"distanceKM","Distance (KM)","number")}
                </div>
              </div>

              {/* ATTACHMENTS & CUSTOM FIELDS */}
              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* AUTHORIZATION WITH ADD/REMOVE ROLE */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>

                <FieldArray name="approvalRoles">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={()=>push({ roleName: "New Role", data: {} })}
                        >
                          + Add Role
                        </button>
                      )}

                      <div className="three-column-signatures">
                        {values.approvalRoles.map((role,index)=>(
                          <div key={index}>
                            <ApprovalSignatureBlock
                              roleName={role.roleName}
                              value={role.data}
                              allowRoleEdit={!isPrintMode}
                              onRoleNameChange={(newName)=>
                                setFieldValue(`approvalRoles.${index}.roleName`,newName)
                              }
                              onChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.data`,val)
                              }
                            />
                            {!isPrintMode && (
                              <button
                                type="button"
                                className="btn-remove-role"
                                onClick={()=>remove(index)}
                              >
                                Remove Role
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </FieldArray>
              </div>

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit E-Way Bill Request
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

export default FRM00966_EWayBillGenerationRequest;