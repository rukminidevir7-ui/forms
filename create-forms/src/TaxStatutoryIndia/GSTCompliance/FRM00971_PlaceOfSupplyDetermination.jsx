// FRM00971_PlaceOfSupplyDetermination.jsx
// FRM-00971 – Place of Supply Determination
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
  legalNameOfSupplier: Yup.string().required("Required"),
  recipientName: Yup.string().required("Required"),
  transactionValue: Yup.string().required("Required"),
  placeOfSupplyDetermined: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00971",
  date: "",
  department: "Tax & Statutory (India)",
  function: "GST Compliance",
  referenceNumber: "",
  location: "",
  requestType: "",
  priority: "",

  /* Business Details */
  legalNameOfSupplier: "",
  supplierGSTIN: "",
  recipientName: "",
  recipientGSTIN: "",
  businessUnit: "",

  /* Transaction Details */
  natureOfSupply: "",
  transactionDescription: "",
  invoiceContractReference: "",
  transactionValue: "",
  currency: "",
  proposedSupplyDate: "",

  /* Determination Analysis */
  applicableGSTProvision: "",
  placeOfSupplyDetermined: "",
  basisJustification: "",
  taxTypeApplicable: "",

  /* Impact Assessment */
  financialImpact: "",
  complianceRisk: "",
  remarks: "",

  /* Attachments */
  supportingDocumentsAttached: "",
  documentReference: "",

  /* Authorization */
  approvalRoles: [
    { roleName: "Requested By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM00971_PlaceOfSupplyDetermination = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type = "text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : <>
            <Field name={name} type={type} className="form-input" />
            <ErrorMessage name={name} component="div" className="form-error" />
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper
      formId="FRM-00971"
      title="Place of Supply Determination"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("Place of Supply Determination Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00971"
              title="PLACE OF SUPPLY DETERMINATION"
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

              {/* BUSINESS DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Business Details</h3>
                <div className="form-fields">
                  {field(values,"legalNameOfSupplier","Legal Name of Supplier")}
                  {field(values,"supplierGSTIN","Supplier GSTIN")}
                  {field(values,"recipientName","Recipient Name")}
                  {field(values,"recipientGSTIN","Recipient GSTIN")}
                  {field(values,"businessUnit","Business Unit")}
                </div>
              </div>

              {/* TRANSACTION DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Transaction Details</h3>
                <div className="form-fields">
                  {field(values,"natureOfSupply","Nature of Supply (Goods/Services)")}
                  {field(values,"transactionDescription","Transaction Description")}
                  {field(values,"invoiceContractReference","Invoice / Contract Reference")}
                  {field(values,"transactionValue","Transaction Value","number")}
                  {field(values,"currency","Currency")}
                  {field(values,"proposedSupplyDate","Proposed Supply Date","date")}
                </div>
              </div>

              {/* DETERMINATION ANALYSIS */}
              <div className="form-section">
                <h3 className="form-section-title">Determination Analysis</h3>
                <div className="form-fields">
                  {field(values,"applicableGSTProvision","Applicable GST Provision / Section")}
                  {field(values,"placeOfSupplyDetermined","Place of Supply Determined")}
                  {field(values,"basisJustification","Basis / Justification")}
                  {field(values,"taxTypeApplicable","Tax Type Applicable (IGST/CGST/SGST)")}
                </div>
              </div>

              {/* IMPACT ASSESSMENT */}
              <div className="form-section">
                <h3 className="form-section-title">Impact Assessment</h3>
                <div className="form-fields">
                  {field(values,"financialImpact","Financial Impact")}
                  {field(values,"complianceRisk","Compliance Risk")}
                  {field(values,"remarks","Remarks")}
                </div>
              </div>

              {/* ATTACHMENTS */}
              <div className="form-section">
                <h3 className="form-section-title">Attachments</h3>
                <div className="form-fields">
                  {field(values,"supportingDocumentsAttached","Supporting Documents Attached (Yes/No)")}
                  {field(values,"documentReference","Document Reference")}
                </div>
              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* AUTHORIZATION */}
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
                    Submit Place of Supply Determination
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

export default FRM00971_PlaceOfSupplyDetermination;