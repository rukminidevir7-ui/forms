// FRM01214_ImportDemurrageClaim.jsx
// FRM-01214 / 01215 / 01216 – Import Demurrage Claim
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
  billOfEntryNo: Yup.string().required("Required"),
  reasonForDemurrage: Yup.string().required("Required"),
  demurrageAmount: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01214",
  date: "",
  department: "Trade Compliance",
  function: "Imports (India)",
  referenceNumber: "",
  businessUnit: "",
  preparedBy: "",
  location: "",

  billOfEntryNo: "",
  importerName: "",
  supplierExporter: "",
  portOfArrival: "",
  containerNo: "",
  shippingLineCarrier: "",

  reasonForDemurrage: "",
  freeDaysAllowed: "",
  delayPeriodDays: "",
  demurrageAmount: "",
  currency: "",

  rootCause: "",
  responsibleParty: "",
  supportingDocuments: "",
  remarks: "",

  proposedRecoveryAction: "",
  responsiblePerson: "",
  targetClosureDate: "",
  finalOutcome: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01214_ImportDemurrageClaim = () => {

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
      formId="FRM-01214"
      title="Import Demurrage Claim"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Import Demurrage Claim Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01214"
              title="IMPORT DEMURRAGE CLAIM"
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
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"preparedBy","Prepared By")}
                  {field(values,"location","Location")}
                </div>
              </div>

              {/* SHIPMENT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Shipment Details</h3>
                <div className="form-fields">
                  {field(values,"billOfEntryNo","Bill of Entry No")}
                  {field(values,"importerName","Importer Name")}
                  {field(values,"supplierExporter","Supplier / Exporter")}
                  {field(values,"portOfArrival","Port of Arrival")}
                  {field(values,"containerNo","Container No")}
                  {field(values,"shippingLineCarrier","Shipping Line / Carrier")}
                </div>
              </div>

              {/* DEMURRAGE DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Demurrage Details</h3>
                <div className="form-fields">
                  {field(values,"reasonForDemurrage","Reason for Demurrage")}
                  {field(values,"freeDaysAllowed","Free Days Allowed")}
                  {field(values,"delayPeriodDays","Delay Period (Days)")}
                  {field(values,"demurrageAmount","Demurrage Amount")}
                  {field(values,"currency","Currency")}
                </div>
              </div>

              {/* CLAIM JUSTIFICATION */}
              <div className="form-section">
                <h3 className="form-section-title">Claim Justification</h3>
                <div className="form-fields">
                  {field(values,"rootCause","Root Cause")}
                  {field(values,"responsibleParty","Responsible Party")}
                  {field(values,"supportingDocuments","Supporting Documents")}
                  {field(values,"remarks","Remarks")}
                </div>
              </div>

              {/* RESOLUTION AND ACTION */}
              <div className="form-section">
                <h3 className="form-section-title">Resolution and Action</h3>
                <div className="form-fields">
                  {field(values,"proposedRecoveryAction","Proposed Recovery Action")}
                  {field(values,"responsiblePerson","Responsible Person")}
                  {field(values,"targetClosureDate","Target Closure Date","date")}
                  {field(values,"finalOutcome","Final Outcome")}
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
                    Submit Demurrage Claim
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

export default FRM01214_ImportDemurrageClaim;