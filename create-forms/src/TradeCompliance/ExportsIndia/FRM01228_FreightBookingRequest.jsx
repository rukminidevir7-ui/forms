// FRM01228_FreightBookingRequest.jsx
// FRM-01228 – Freight Booking Request
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
  customerName: Yup.string().required("Required"),
  productDescription: Yup.string().required("Required"),
  quantity: Yup.number().typeError("Must be a number")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01228",
  date: "",
  department: "Trade Compliance",
  function: "Exports (India)",

  referenceNumber: "",
  businessUnit: "",
  requestedBy: "",
  location: "",

  customerName: "",
  consignee: "",
  destinationCountry: "",
  portOfLoading: "",
  portOfDischarge: "",

  productDescription: "",
  hsCode: "",
  quantity: "",
  packageType: "",
  grossWeight: "",
  volumeCBM: "",

  modeOfTransport: "",
  preferredCarrier: "",
  incoterms: "",
  freightTerms: "",
  requestedShipmentDate: "",
  specialHandlingRequirements: "",

  comments: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01228_FreightBookingRequest = () => {

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
      formId="FRM-01228"
      title="Freight Booking Request"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Freight Booking Request Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01228"
              title="FREIGHT BOOKING REQUEST"
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
                  {field(values,"requestedBy","Requested By")}
                  {field(values,"location","Location")}
                </div>
              </div>

              {/* SHIPMENT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Shipment Details</h3>
                <div className="form-fields">
                  {field(values,"customerName","Customer Name")}
                  {field(values,"consignee","Consignee")}
                  {field(values,"destinationCountry","Destination Country")}
                  {field(values,"portOfLoading","Port of Loading")}
                  {field(values,"portOfDischarge","Port of Discharge")}
                </div>
              </div>

              {/* CARGO DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Cargo Details</h3>
                <div className="form-fields">
                  {field(values,"productDescription","Product Description")}
                  {field(values,"hsCode","HS Code")}
                  {field(values,"quantity","Quantity","number")}
                  {field(values,"packageType","Package Type")}
                  {field(values,"grossWeight","Gross Weight")}
                  {field(values,"volumeCBM","Volume (CBM)")}
                </div>
              </div>

              {/* BOOKING DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Booking Details</h3>
                <div className="form-fields">
                  {field(values,"modeOfTransport","Mode of Transport")}
                  {field(values,"preferredCarrier","Preferred Carrier")}
                  {field(values,"incoterms","Incoterms")}
                  {field(values,"freightTerms","Freight Terms")}
                  {field(values,"requestedShipmentDate","Requested Shipment Date","date")}
                  {field(values,"specialHandlingRequirements","Special Handling Requirements")}
                </div>
              </div>

              {/* REMARKS */}
              <div className="form-section">
                <h3 className="form-section-title">Remarks</h3>
                <div className="form-fields">
                  {field(values,"comments","Comments")}
                </div>
              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* AUTHORIZATION */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>

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
                    Submit Freight Booking Request
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

export default FRM01228_FreightBookingRequest;