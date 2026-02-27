// FRM01038_FXDealConfirmation.jsx
// FRM-01038 / 01039 / 01040 – FX Deal Confirmation
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
  dealReference: Yup.string().required("Required"),
  dealType: Yup.string().required("Required"),
  dealAmount: Yup.number().required("Required"),
  dealRate: Yup.number().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01038 / 01039 / 01040",
  date: "",
  department: "Treasury & Funding",
  function: "Cash, Banking & Payments",
  referenceNumber: "",
  location: "",

  dealReference: "",
  tradeDate: "",
  valueDate: "",
  currencyPair: "",

  dealType: "",
  buyCurrency: "",
  sellCurrency: "",
  dealAmount: "",
  dealRate: "",
  counterparty: "",

  settlementAccount: "",
  bankName: "",
  swiftIfsc: "",
  intermediaryBank: "",

  dealMatched: "",
  limitCheckCompleted: "",
  complianceCheckCompleted: "",
  remarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01038_FXDealConfirmation = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values,name,label,type="text") => (
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
      formId="FRM-01038"
      title="FX Deal Confirmation"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("FX Deal Confirmation Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01038 / 01039 / 01040"
              title="FX DEAL CONFIRMATION"
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
                  {field(values,"dealReference","Deal Reference")}
                  {field(values,"tradeDate","Trade Date","date")}
                  {field(values,"valueDate","Value Date","date")}
                  {field(values,"currencyPair","Currency Pair")}
                </div>
              </div>

              {/* DEAL DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Deal Details</h3>
                <div className="form-fields">

                  <div className="form-field">
                    <label className="form-label">Deal Type</label>
                    <Field as="select" name="dealType" className="form-input">
                      <option value="">Select</option>
                      <option>Spot</option>
                      <option>Forward</option>
                      <option>Swap</option>
                    </Field>
                  </div>

                  {field(values,"buyCurrency","Buy Currency")}
                  {field(values,"sellCurrency","Sell Currency")}
                  {field(values,"dealAmount","Deal Amount","number")}
                  {field(values,"dealRate","Deal Rate","number")}
                  {field(values,"counterparty","Counterparty")}

                </div>
              </div>

              {/* SETTLEMENT INSTRUCTIONS */}
              <div className="form-section">
                <h3 className="form-section-title">Settlement Instructions</h3>
                <div className="form-fields">
                  {field(values,"settlementAccount","Settlement Account")}
                  {field(values,"bankName","Bank Name")}
                  {field(values,"swiftIfsc","SWIFT / IFSC")}
                  {field(values,"intermediaryBank","Intermediary Bank")}
                </div>
              </div>

              {/* VERIFICATION */}
              <div className="form-section">
                <h3 className="form-section-title">Verification</h3>
                <div className="form-fields">

                  <div className="form-field">
                    <label className="form-label">
                      Deal Matched with Counterparty
                    </label>
                    <Field as="select" name="dealMatched" className="form-input">
                      <option value="">Select</option>
                      <option>Yes</option>
                      <option>No</option>
                    </Field>
                  </div>

                  <div className="form-field">
                    <label className="form-label">
                      Limit Check Completed
                    </label>
                    <Field as="select" name="limitCheckCompleted" className="form-input">
                      <option value="">Select</option>
                      <option>Yes</option>
                      <option>No</option>
                    </Field>
                  </div>

                  <div className="form-field">
                    <label className="form-label">
                      Compliance Check Completed
                    </label>
                    <Field as="select" name="complianceCheckCompleted" className="form-input">
                      <option value="">Select</option>
                      <option>Yes</option>
                      <option>No</option>
                    </Field>
                  </div>

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
                              onRoleNameChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.roleName`,val)}
                              onChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.data`,val)}
                            />
                            {!isPrintMode &&
                              <button type="button" onClick={()=>remove(index)}>
                                Remove Role
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
                    Submit FX Deal Confirmation
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

export default FRM01038_FXDealConfirmation;