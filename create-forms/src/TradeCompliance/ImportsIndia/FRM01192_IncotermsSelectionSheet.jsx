// FRM01192_IncotermsSelectionSheet.jsx
// FRM-01192 / 01193 / 01194 – Incoterms Selection Sheet
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
  selectedIncoterm: Yup.string().required("Required"),
  version: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01192",
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
  buyerImporter: "",
  countryOfOrigin: "",
  portOfLoading: "",
  portOfDischarge: "",
  modeOfTransport: "",

  selectedIncoterm: "",
  version: "",
  placeLocation: "",
  reasonForSelection: "",

  freightResponsibility: "",
  insuranceResponsibility: "",
  customsClearanceResponsibility: "",
  riskTransferPoint: "",

  keyConsiderations: "",
  specialConditions: "",
  remarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01192_IncotermsSelectionSheet = () => {

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
      formId="FRM-01192"
      title="Incoterms Selection Sheet"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Incoterms Selection Sheet Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01192"
              title="INCOTERMS SELECTION SHEET"
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

              {/* SHIPMENT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Shipment Details</h3>
                <div className="form-fields">
                  {field(values,"supplierName","Supplier Name")}
                  {field(values,"buyerImporter","Buyer / Importer")}
                  {field(values,"countryOfOrigin","Country of Origin")}
                  {field(values,"portOfLoading","Port of Loading")}
                  {field(values,"portOfDischarge","Port of Discharge")}
                  {field(values,"modeOfTransport","Mode of Transport")}
                </div>
              </div>

              {/* INCOTERMS SELECTION */}
              <div className="form-section">
                <h3 className="form-section-title">Incoterms Selection</h3>
                <div className="form-fields">
                  {field(values,"selectedIncoterm","Selected Incoterm")}
                  {field(values,"version","Version (e.g., 2020)")}
                  {field(values,"placeLocation","Place / Location")}
                  {field(values,"reasonForSelection","Reason for Selection")}
                </div>
              </div>

              {/* RISK AND COST ALLOCATION */}
              <div className="form-section">
                <h3 className="form-section-title">Risk and Cost Allocation</h3>
                <div className="form-fields">
                  {field(values,"freightResponsibility","Freight Responsibility")}
                  {field(values,"insuranceResponsibility","Insurance Responsibility")}
                  {field(values,"customsClearanceResponsibility","Customs Clearance Responsibility")}
                  {field(values,"riskTransferPoint","Risk Transfer Point")}
                </div>
              </div>

              {/* NOTES */}
              <div className="form-section">
                <h3 className="form-section-title">Notes</h3>
                <div className="form-fields">
                  {field(values,"keyConsiderations","Key Considerations")}
                  {field(values,"specialConditions","Special Conditions")}
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
                        <button type="button" className="btn-submit"
                          onClick={()=>push({ roleName:"New Role", data:{} })}>
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
                    Submit Incoterms Selection Sheet
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

export default FRM01192_IncotermsSelectionSheet;