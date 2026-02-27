// FRM01196_BankGuaranteeRequest.jsx
// FRM-01196 – Bank Guarantee Request
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
  requestedBy: Yup.string().required("Required"),
  guaranteeType: Yup.string().required("Required"),
  guaranteeAmount: Yup.string().required("Required"),
  validityTo: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01196",
  date: "",
  department: "Trade Compliance",
  function: "Imports (India)",
  referenceNumber: "",
  businessUnit: "",
  requestedBy: "",
  currency: "",

  guaranteeType: "",
  guaranteeAmount: "",
  validityFrom: "",
  validityTo: "",
  issuingBank: "",
  beneficiary: "",

  purposeOfGuarantee: "",
  contractReference: "",
  description: "",
  supportingDocuments: "",

  collateralRequired: "",
  riskAssessment: "",
  bankCharges: "",
  remarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01196_BankGuaranteeRequest = () => {

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
      formId="FRM-01196"
      title="Bank Guarantee Request"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Bank Guarantee Request Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01196"
              title="BANK GUARANTEE REQUEST"
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
                  {field(values,"requestedBy","Requested By")}
                  {field(values,"currency","Currency")}
                </div>
              </div>

              {/* GUARANTEE DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Guarantee Details</h3>
                <div className="form-fields">
                  {field(values,"guaranteeType","Guarantee Type")}
                  {field(values,"guaranteeAmount","Guarantee Amount")}
                  {field(values,"validityFrom","Validity From","date")}
                  {field(values,"validityTo","Validity To","date")}
                  {field(values,"issuingBank","Issuing Bank")}
                  {field(values,"beneficiary","Beneficiary")}
                </div>
              </div>

              {/* PURPOSE DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Purpose Details</h3>
                <div className="form-fields">
                  {field(values,"purposeOfGuarantee","Purpose of Guarantee")}
                  {field(values,"contractReference","Contract / Reference")}
                  {field(values,"description","Description")}
                  {field(values,"supportingDocuments","Supporting Documents")}
                </div>
              </div>

              {/* RISK AND CHARGES */}
              <div className="form-section">
                <h3 className="form-section-title">Risk and Charges</h3>
                <div className="form-fields">
                  {field(values,"collateralRequired","Collateral Required")}
                  {field(values,"riskAssessment","Risk Assessment")}
                  {field(values,"bankCharges","Bank Charges")}
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
                    Submit Bank Guarantee Request
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

export default FRM01196_BankGuaranteeRequest;