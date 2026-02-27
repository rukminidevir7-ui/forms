// FRM01211_ImportShortageDamageClaim.jsx
// FRM-01211 / 01212 / 01213 – Import Shortage / Damage Claim
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
  typeOfClaim: Yup.string().required("Required"),
  descriptionOfIssue: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01211",
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
  blAwbNumber: "",
  containerPackageNo: "",

  typeOfClaim: "",
  dateOfDiscovery: "",
  descriptionOfIssue: "",
  quantityAffected: "",
  estimatedLossValue: "",

  inspectionReportAvailable: "",
  photographsAttached: "",
  surveyorReport: "",
  otherDocuments: "",

  proposedAction: "",
  responsiblePerson: "",
  targetResolutionDate: "",
  remarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01211_ImportShortageDamageClaim = () => {

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
      formId="FRM-01211"
      title="Import Shortage / Damage Claim"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Import Shortage / Damage Claim Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01211"
              title="IMPORT SHORTAGE / DAMAGE CLAIM"
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
                  {field(values,"blAwbNumber","BL / AWB Number")}
                  {field(values,"containerPackageNo","Container / Package No")}
                </div>
              </div>

              {/* CLAIM DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Claim Details</h3>
                <div className="form-fields">
                  {field(values,"typeOfClaim","Type of Claim")}
                  {field(values,"dateOfDiscovery","Date of Discovery","date")}
                  {field(values,"descriptionOfIssue","Description of Issue")}
                  {field(values,"quantityAffected","Quantity Affected")}
                  {field(values,"estimatedLossValue","Estimated Loss Value")}
                </div>
              </div>

              {/* SUPPORTING DOCUMENTS */}
              <div className="form-section">
                <h3 className="form-section-title">Supporting Documents</h3>
                <div className="form-fields">
                  {field(values,"inspectionReportAvailable","Inspection Report Available")}
                  {field(values,"photographsAttached","Photographs Attached")}
                  {field(values,"surveyorReport","Surveyor Report")}
                  {field(values,"otherDocuments","Other Documents")}
                </div>
              </div>

              {/* ACTION AND RESOLUTION */}
              <div className="form-section">
                <h3 className="form-section-title">Action and Resolution</h3>
                <div className="form-fields">
                  {field(values,"proposedAction","Proposed Action")}
                  {field(values,"responsiblePerson","Responsible Person")}
                  {field(values,"targetResolutionDate","Target Resolution Date","date")}
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
                    Submit Shortage / Damage Claim
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

export default FRM01211_ImportShortageDamageClaim;