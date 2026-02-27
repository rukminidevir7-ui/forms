// FRM01025_NEFTRTGSPaymentAuthorization.jsx
// FRM-01025 – NEFT / RTGS Payment Authorization
// Enterprise Grade – Treasury & Funding – Cash, Banking & Payments

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
  beneficiaryName: Yup.string().required("Required"),
  paymentAmount: Yup.number().required("Required"),
  currency: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01025",
  date: "",
  department: "Treasury & Funding",
  function: "Cash, Banking & Payments",
  referenceNumber: "",
  location: "",

  paymentType: "",
  currency: "",
  paymentDate: "",
  valueDate: "",

  beneficiaryName: "",
  bankName: "",
  branch: "",
  accountNumber: "",
  ifscCode: "",

  paymentAmount: "",
  purpose: "",
  invoiceReference: "",
  costCenter: "",

  controlChecks: [
    { item: "Supporting Documents Verified", status: "" },
    { item: "Budget Availability Confirmed", status: "" },
    { item: "Vendor Master Verified", status: "" }
  ],

  remarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Checked By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01025_NEFTRTGSPaymentAuthorization = () => {

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
      formId="FRM-01025"
      title="NEFT / RTGS Payment Authorization"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("NEFT/RTGS Payment Authorized Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01025"
              title="NEFT / RTGS PAYMENT AUTHORIZATION"
              department="Treasury & Funding – Cash, Banking & Payments"
            >

              {/* GENERAL INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"date","Date","date")}
                  {field(values,"referenceNumber","Reference Number")}
                  {field(values,"location","Location")}
                  {field(values,"paymentType","Payment Type (NEFT / RTGS)")}
                  {field(values,"currency","Currency")}
                  {field(values,"paymentDate","Payment Date","date")}
                  {field(values,"valueDate","Value Date","date")}
                </div>
              </div>

              {/* BENEFICIARY DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Beneficiary Details</h3>
                <div className="form-fields">
                  {field(values,"beneficiaryName","Beneficiary Name")}
                  {field(values,"bankName","Bank Name")}
                  {field(values,"branch","Branch")}
                  {field(values,"accountNumber","Account Number")}
                  {field(values,"ifscCode","IFSC Code")}
                </div>
              </div>

              {/* PAYMENT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Payment Details</h3>
                <div className="form-fields">
                  {field(values,"paymentAmount","Payment Amount","number")}
                  {field(values,"purpose","Purpose of Payment")}
                  {field(values,"invoiceReference","Invoice / Reference")}
                  {field(values,"costCenter","Cost Center / Project")}
                </div>
              </div>

              {/* CONTROL CHECKS */}
              <div className="form-section">
                <h3 className="form-section-title">Control Checks</h3>

                <FieldArray name="controlChecks">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          style={{ marginBottom: 15 }}
                          onClick={() => push({ item:"", status:"" })}
                        >
                          + Add Control Check
                        </button>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Check Item</th>
                            <th>Status (Yes / No)</th>
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {values.controlChecks.map((row,index)=>(
                            <tr key={index}>
                              <td>
                                <Field
                                  name={`controlChecks.${index}.item`}
                                  className="form-input"
                                />
                              </td>
                              <td>
                                <Field
                                  as="select"
                                  name={`controlChecks.${index}.status`}
                                  className="form-input"
                                >
                                  <option value="">Select</option>
                                  <option>Yes</option>
                                  <option>No</option>
                                </Field>
                              </td>
                              {!isPrintMode && (
                                <td>
                                  <button type="button" onClick={()=>remove(index)}>
                                    Remove
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </FieldArray>

                <div className="form-fields" style={{ marginTop: 15 }}>
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
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={()=>push({ roleName:"New Role", data:{} })}
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
                              onRoleNameChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.roleName`,val)}
                              onChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.data`,val)}
                            />
                            {!isPrintMode && (
                              <button type="button" onClick={()=>remove(index)}>
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
                    Submit Payment Authorization
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

export default FRM01025_NEFTRTGSPaymentAuthorization;