// FRM01225_ShippingInstruction.jsx
// FRM-01225 / 01226 / 01227 – Shipping Instruction
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
  consignee: Yup.string().required("Required"),
  productDescription: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01225", // Change to 01226 / 01227 if needed
  date: "",
  department: "Trade Compliance",
  function: "Exports (India)",

  referenceNumber: "",
  businessUnit: "",
  preparedBy: "",
  location: "",

  customerName: "",
  consignee: "",
  notifyParty: "",
  destinationCountry: "",
  portOfLoading: "",
  portOfDischarge: "",

  productDescription: "",
  hsCode: "",
  quantity: "",
  packageType: "",
  grossWeight: "",
  netWeight: "",

  modeOfTransport: "",
  carrierShippingLine: "",
  incoterms: "",
  freightTerms: "",
  expectedShipmentDate: "",

  invoiceDetails: "",
  packingListInstructions: "",
  specialInstructions: "",
  remarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01225_ShippingInstruction = () => {

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
      formId={initialValues.formId}
      title="Shipping Instruction"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Shipping Instruction Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId={initialValues.formId}
              title="SHIPPING INSTRUCTION"
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

              {/* SHIPMENT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Shipment Details</h3>
                <div className="form-fields">
                  {field(values,"customerName","Customer Name")}
                  {field(values,"consignee","Consignee")}
                  {field(values,"notifyParty","Notify Party")}
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
                  {field(values,"netWeight","Net Weight")}
                </div>
              </div>

              {/* TRANSPORT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Transport Details</h3>
                <div className="form-fields">
                  {field(values,"modeOfTransport","Mode of Transport")}
                  {field(values,"carrierShippingLine","Carrier / Shipping Line")}
                  {field(values,"incoterms","Incoterms")}
                  {field(values,"freightTerms","Freight Terms")}
                  {field(values,"expectedShipmentDate","Expected Shipment Date","date")}
                </div>
              </div>

              {/* DOCUMENTATION INSTRUCTIONS */}
              <div className="form-section">
                <h3 className="form-section-title">Documentation Instructions</h3>
                <div className="form-fields">
                  {field(values,"invoiceDetails","Invoice Details")}
                  {field(values,"packingListInstructions","Packing List Instructions")}
                  {field(values,"specialInstructions","Special Instructions")}
                  {field(values,"remarks","Remarks")}
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
                    Submit Shipping Instruction
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

export default FRM01225_ShippingInstruction;