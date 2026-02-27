// FRM01041_HedgingProposal.jsx
// FRM-01041 / 01042 / 01043 – Hedging Proposal
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
  businessUnit: Yup.string().required("Required"),
  exposureAmount: Yup.number().required("Required"),
  proposedInstrument: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01041 / 01042 / 01043",
  date: "",
  department: "Treasury & Funding",
  function: "Cash, Banking & Payments",
  referenceNumber: "",
  location: "",

  businessUnit: "",
  currency: "",
  proposalType: "",
  priority: "",

  /* Exposure Details */
  exposureType: "",
  underlyingReference: "",
  exposureAmount: "",
  exposureCurrency: "",
  exposureDate: "",

  /* Hedging Strategy */
  proposedInstrument: "",
  hedgeRatio: "",
  tenor: "",
  indicativeRate: "",
  counterparty: "",

  /* Risk Assessment */
  riskIdentified: "",
  impactAnalysis: "",
  limitCheckCompleted: "",
  complianceCheckCompleted: "",

  /* Financial Impact */
  estimatedCost: "",
  mtmSensitivity: "",
  budgetImpact: "",
  remarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01041_HedgingProposal = () => {

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
      formId="FRM-01041"
      title="Hedging Proposal"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Hedging Proposal Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01041 / 01042 / 01043"
              title="HEDGING PROPOSAL"
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
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"currency","Currency")}
                  {field(values,"proposalType","Proposal Type")}
                  {field(values,"priority","Priority")}
                </div>
              </div>

              {/* EXPOSURE DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Exposure Details</h3>
                <div className="form-fields">
                  {field(values,"exposureType","Exposure Type")}
                  {field(values,"underlyingReference","Underlying Reference")}
                  {field(values,"exposureAmount","Exposure Amount","number")}
                  {field(values,"exposureCurrency","Exposure Currency")}
                  {field(values,"exposureDate","Exposure Date","date")}
                </div>
              </div>

              {/* HEDGING STRATEGY */}
              <div className="form-section">
                <h3 className="form-section-title">Hedging Strategy</h3>
                <div className="form-fields">
                  {field(values,"proposedInstrument","Proposed Instrument")}
                  {field(values,"hedgeRatio","Hedge Ratio")}
                  {field(values,"tenor","Tenor")}
                  {field(values,"indicativeRate","Indicative Rate","number")}
                  {field(values,"counterparty","Counterparty")}
                </div>
              </div>

              {/* RISK ASSESSMENT */}
              <div className="form-section">
                <h3 className="form-section-title">Risk Assessment</h3>
                <div className="form-fields">

                  {field(values,"riskIdentified","Risk Identified")}
                  {field(values,"impactAnalysis","Impact Analysis")}

                  <div className="form-field">
                    <label className="form-label">Limit Check Completed</label>
                    <Field as="select" name="limitCheckCompleted" className="form-input">
                      <option value="">Select</option>
                      <option>Yes</option>
                      <option>No</option>
                    </Field>
                  </div>

                  <div className="form-field">
                    <label className="form-label">Compliance Check Completed</label>
                    <Field as="select" name="complianceCheckCompleted" className="form-input">
                      <option value="">Select</option>
                      <option>Yes</option>
                      <option>No</option>
                    </Field>
                  </div>

                </div>
              </div>

              {/* FINANCIAL IMPACT */}
              <div className="form-section">
                <h3 className="form-section-title">Financial Impact</h3>
                <div className="form-fields">
                  {field(values,"estimatedCost","Estimated Cost","number")}
                  {field(values,"mtmSensitivity","MTM Sensitivity")}
                  {field(values,"budgetImpact","Budget Impact")}
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
                    Submit Hedging Proposal
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

export default FRM01041_HedgingProposal;