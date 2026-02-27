// FRM01037_FXDealRequest.jsx
// FRM-01037 – FX Deal Request
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
  dealType: Yup.string().required("Required"),
  buyCurrency: Yup.string().required("Required"),
  sellCurrency: Yup.string().required("Required"),
  dealAmount: Yup.number().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01037",
  date: "",
  department: "Treasury & Funding",
  function: "Cash, Banking & Payments",
  referenceNumber: "",
  location: "",
  requestType: "",
  priority: "",
  dealDate: "",
  valueDate: "",

  dealType: "",
  buyCurrency: "",
  sellCurrency: "",
  dealAmount: "",
  indicativeRate: "",
  purposeOfDeal: "",

  counterpartyName: "",
  dealerContact: "",
  quoteReference: "",

  hedgingRequirement: "",
  exposureReference: "",
  limitCheckCompleted: "",
  remarks: "",

  approvalRoles: [
    { roleName: "Requested By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01037_FXDealRequest = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values,name,label,type="text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name]||"_________"}</div>
        : <>
            <Field name={name} type={type} className="form-input"/>
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper
      formId="FRM-01037"
      title="FX Deal Request"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("FX Deal Request Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01037"
              title="FX DEAL REQUEST"
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
                  {field(values,"requestType","Request Type")}
                  {field(values,"priority","Priority")}
                  {field(values,"dealDate","Deal Date","date")}
                  {field(values,"valueDate","Value Date","date")}
                </div>
              </div>

              {/* DEAL DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Deal Details</h3>
                <div className="form-fields">

                  <div className="form-field">
                    <label className="form-label">Deal Type</label>
                    {isPrintMode ? (
                      <div className="print-value">{values.dealType}</div>
                    ) : (
                      <Field as="select" name="dealType" className="form-input">
                        <option value="">Select</option>
                        <option>Spot</option>
                        <option>Forward</option>
                        <option>Swap</option>
                      </Field>
                    )}
                  </div>

                  <div className="form-field">
                    <label className="form-label">Buy Currency</label>
                    <Field as="select" name="buyCurrency" className="form-input">
                      <option value="">Select</option>
                      <option>USD</option>
                      <option>EUR</option>
                      <option>INR</option>
                      <option>GBP</option>
                      <option>JPY</option>
                    </Field>
                  </div>

                  <div className="form-field">
                    <label className="form-label">Sell Currency</label>
                    <Field as="select" name="sellCurrency" className="form-input">
                      <option value="">Select</option>
                      <option>USD</option>
                      <option>EUR</option>
                      <option>INR</option>
                      <option>GBP</option>
                      <option>JPY</option>
                    </Field>
                  </div>

                  {field(values,"dealAmount","Deal Amount","number")}
                  {field(values,"indicativeRate","Indicative Rate","number")}
                  {field(values,"purposeOfDeal","Purpose of Deal")}

                </div>
              </div>

              {/* COUNTERPARTY DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Counterparty Details</h3>
                <div className="form-fields">
                  {field(values,"counterpartyName","Bank / Counterparty Name")}
                  {field(values,"dealerContact","Dealer Contact")}
                  {field(values,"quoteReference","Quote Reference")}
                </div>
              </div>

              {/* RISK & COMPLIANCE */}
              <div className="form-section">
                <h3 className="form-section-title">Risk and Compliance</h3>
                <div className="form-fields">

                  <div className="form-field">
                    <label className="form-label">Hedging Requirement</label>
                    <Field as="select" name="hedgingRequirement" className="form-input">
                      <option value="">Select</option>
                      <option>Yes</option>
                      <option>No</option>
                    </Field>
                  </div>

                  {field(values,"exposureReference","Exposure Reference")}

                  <div className="form-field">
                    <label className="form-label">Limit Check Completed</label>
                    <Field as="select" name="limitCheckCompleted" className="form-input">
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
                        <button type="button" className="btn-submit"
                          onClick={()=>push({roleName:"New Role",data:{}})}>
                          + Add Role
                        </button>
                      }

                      <div className="three-column-signatures">
                        {values.approvalRoles.map((role,i)=>(
                          <div key={i}>
                            <ApprovalSignatureBlock
                              roleName={role.roleName}
                              value={role.data}
                              allowRoleEdit={!isPrintMode}
                              onRoleNameChange={(val)=>
                                setFieldValue(`approvalRoles.${i}.roleName`,val)}
                              onChange={(val)=>
                                setFieldValue(`approvalRoles.${i}.data`,val)}
                            />
                            {!isPrintMode &&
                              <button type="button" onClick={()=>remove(i)}>
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
                    Submit FX Deal Request
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

export default FRM01037_FXDealRequest;