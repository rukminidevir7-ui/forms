// FRM01200_ImportShipmentTracking.jsx
// FRM-01200 / 01201 / 01202 – Import Shipment Tracking
// Enterprise Grade – Trade Compliance – Imports (India)

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
  supplierName: Yup.string().required("Required"),
  shipmentReference: Yup.string().required("Required"),
  currentStatus: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01200",
  date: "",
  department: "Trade Compliance",
  function: "Imports (India)",
  referenceNumber: "",
  location: "",
  businessUnit: "",
  preparedBy: "",

  transactionReference: "",
  currency: "",

  supplierName: "",
  importerBuyer: "",
  countryOfOrigin: "",
  incoterm: "",
  modeOfTransport: "",

  shipmentReference: "",
  containerAwbBlNo: "",
  forwarderName: "",
  portOfLoading: "",
  portOfDischarge: "",
  estimatedDepartureDate: "",
  estimatedArrivalDate: "",
  currentStatus: "",

  bookingConfirmed: "",
  cargoPickedUp: "",
  customsCleared: "",
  inTransit: "",
  arrivedAtDestination: "",
  delivered: "",

  delayIssueDescription: "",
  impactAssessment: "",
  correctiveAction: "",
  remarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01200_ImportShipmentTracking = () => {

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
      formId="FRM-01200"
      title="Import Shipment Tracking"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Import Shipment Tracking Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01200"
              title="IMPORT SHIPMENT TRACKING"
              department="Trade Compliance – Imports (India)"
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
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"preparedBy","Prepared By")}
                  {field(values,"transactionReference","Transaction Reference")}
                  {field(values,"currency","Currency")}
                </div>
              </div>

              {/* SHIPMENT OVERVIEW */}
              <div className="form-section">
                <h3 className="form-section-title">Shipment Overview</h3>
                <div className="form-fields">
                  {field(values,"supplierName","Supplier Name")}
                  {field(values,"importerBuyer","Importer / Buyer")}
                  {field(values,"countryOfOrigin","Country of Origin")}
                  {field(values,"incoterm","Incoterm")}
                  {field(values,"modeOfTransport","Mode of Transport")}
                </div>
              </div>

              {/* TRACKING DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Tracking Details</h3>
                <div className="form-fields">
                  {field(values,"shipmentReference","Shipment Reference")}
                  {field(values,"containerAwbBlNo","Container / AWB / BL No")}
                  {field(values,"forwarderName","Forwarder Name")}
                  {field(values,"portOfLoading","Port of Loading")}
                  {field(values,"portOfDischarge","Port of Discharge")}
                  {field(values,"estimatedDepartureDate","Estimated Departure Date","date")}
                  {field(values,"estimatedArrivalDate","Estimated Arrival Date","date")}
                  {field(values,"currentStatus","Current Status")}
                </div>
              </div>

              {/* KEY MILESTONES */}
              <div className="form-section">
                <h3 className="form-section-title">Key Milestones</h3>
                <div className="form-fields">
                  {field(values,"bookingConfirmed","Booking Confirmed")}
                  {field(values,"cargoPickedUp","Cargo Picked Up")}
                  {field(values,"customsCleared","Customs Cleared")}
                  {field(values,"inTransit","In Transit")}
                  {field(values,"arrivedAtDestination","Arrived at Destination")}
                  {field(values,"delivered","Delivered")}
                </div>
              </div>

              {/* ISSUES AND ACTIONS */}
              <div className="form-section">
                <h3 className="form-section-title">Issues and Actions</h3>
                <div className="form-fields">
                  {field(values,"delayIssueDescription","Delay / Issue Description")}
                  {field(values,"impactAssessment","Impact Assessment")}
                  {field(values,"correctiveAction","Corrective Action")}
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
                              allowRoleEdit={!isPrintMode}
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
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Import Shipment Tracking
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

export default FRM01200_ImportShipmentTracking;