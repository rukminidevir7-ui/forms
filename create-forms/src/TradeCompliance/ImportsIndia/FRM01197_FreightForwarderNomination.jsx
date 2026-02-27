// FRM01197_FreightForwarderNomination.jsx
// FRM-01197 / 01198 / 01199 – Freight Forwarder Nomination
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
  forwarderName: Yup.string().required("Required"),
  nominationStatus: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01197",
  date: "",
  department: "Trade Compliance",
  function: "Imports (India)",
  referenceNumber: "",
  location: "",
  businessUnit: "",
  requestedBy: "",

  transactionReference: "",
  currency: "",

  supplierName: "",
  importerBuyer: "",
  countryOfOrigin: "",
  portOfLoading: "",
  portOfDischarge: "",
  modeOfTransport: "",

  forwarderName: "",
  company: "",
  contactPerson: "",
  phoneEmail: "",
  officeLocation: "",

  selectionCriteria: "",
  serviceCapability: "",
  costCompetitiveness: "",
  complianceStatus: "",
  riskAssessment: "",

  nominationStatus: "",
  effectiveDate: "",
  conditions: "",
  remarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01197_FreightForwarderNomination = () => {

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
      formId="FRM-01197"
      title="Freight Forwarder Nomination"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Freight Forwarder Nomination Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01197"
              title="FREIGHT FORWARDER NOMINATION"
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
                  {field(values,"requestedBy","Requested By")}
                  {field(values,"transactionReference","Transaction Reference")}
                  {field(values,"currency","Currency")}
                </div>
              </div>

              {/* SHIPMENT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Shipment Details</h3>
                <div className="form-fields">
                  {field(values,"supplierName","Supplier Name")}
                  {field(values,"importerBuyer","Importer / Buyer")}
                  {field(values,"countryOfOrigin","Country of Origin")}
                  {field(values,"portOfLoading","Port of Loading")}
                  {field(values,"portOfDischarge","Port of Discharge")}
                  {field(values,"modeOfTransport","Mode of Transport")}
                </div>
              </div>

              {/* FORWARDER DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Forwarder Details</h3>
                <div className="form-fields">
                  {field(values,"forwarderName","Forwarder Name")}
                  {field(values,"company","Company")}
                  {field(values,"contactPerson","Contact Person")}
                  {field(values,"phoneEmail","Phone / Email")}
                  {field(values,"officeLocation","Office Location")}
                </div>
              </div>

              {/* EVALUATION */}
              <div className="form-section">
                <h3 className="form-section-title">Evaluation</h3>
                <div className="form-fields">
                  {field(values,"selectionCriteria","Selection Criteria")}
                  {field(values,"serviceCapability","Service Capability")}
                  {field(values,"costCompetitiveness","Cost Competitiveness")}
                  {field(values,"complianceStatus","Compliance Status")}
                  {field(values,"riskAssessment","Risk Assessment")}
                </div>
              </div>

              {/* OUTCOME */}
              <div className="form-section">
                <h3 className="form-section-title">Outcome</h3>
                <div className="form-fields">
                  {field(values,"nominationStatus","Nomination Status")}
                  {field(values,"effectiveDate","Effective Date","date")}
                  {field(values,"conditions","Conditions")}
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
                    Submit Freight Forwarder Nomination
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

export default FRM01197_FreightForwarderNomination;