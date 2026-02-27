// FRM01055_FacilityUtilizationRequest.jsx
// FRM-01055 – Facility Utilization Request
// Enterprise Grade – Treasury & Funding – Lending, Borrowing & Credit Facilities

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
  borrowerName: Yup.string().required("Required"),
  facilityReference: Yup.string().required("Required"),
  requestedDrawdownAmount: Yup.string().required("Required"),
  utilizationDate: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01055",
  date: "",
  department: "Treasury & Funding",
  function: "Lending, Borrowing & Credit Facilities",
  referenceNumber: "",
  location: "",
  borrowerName: "",
  facilityReference: "",
  businessUnit: "",
  currency: "",

  /* Utilization Details */
  facilityType: "",
  sanctionedLimit: "",
  requestedDrawdownAmount: "",
  availableLimit: "",
  utilizationDate: "",
  purposeOfUtilization: "",

  /* Repayment Plan */
  repaymentSource: "",
  expectedRepaymentDate: "",
  interestRate: "",
  repaymentTerms: "",

  /* Risk & Compliance */
  covenantComplianceConfirmed: "",
  limitCheckCompleted: "",
  remarks: "",

  /* Authorization */
  approvalRoles: [
    { roleName: "Requested By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01055_FacilityUtilizationRequest = () => {

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
      formId="FRM-01055"
      title="Facility Utilization Request"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Facility Utilization Request Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01055"
              title="FACILITY UTILIZATION REQUEST"
              department="Treasury & Funding – Lending, Borrowing & Credit Facilities"
            >

              {/* GENERAL INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"date","Date","date")}
                  {field(values,"referenceNumber","Reference Number")}
                  {field(values,"location","Location")}
                  {field(values,"borrowerName","Borrower Name")}
                  {field(values,"facilityReference","Facility Reference")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"currency","Currency")}
                </div>
              </div>

              {/* UTILIZATION DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Utilization Details</h3>
                <div className="form-fields">
                  {field(values,"facilityType","Facility Type")}
                  {field(values,"sanctionedLimit","Sanctioned Limit","number")}
                  {field(values,"requestedDrawdownAmount","Requested Drawdown Amount","number")}
                  {field(values,"availableLimit","Available Limit","number")}
                  {field(values,"utilizationDate","Utilization Date","date")}
                  {field(values,"purposeOfUtilization","Purpose of Utilization")}
                </div>
              </div>

              {/* REPAYMENT PLAN */}
              <div className="form-section">
                <h3 className="form-section-title">Repayment Plan</h3>
                <div className="form-fields">
                  {field(values,"repaymentSource","Repayment Source")}
                  {field(values,"expectedRepaymentDate","Expected Repayment Date","date")}
                  {field(values,"interestRate","Interest Rate (%)","number")}
                  {field(values,"repaymentTerms","Repayment Terms")}
                </div>
              </div>

              {/* RISK & COMPLIANCE */}
              <div className="form-section">
                <h3 className="form-section-title">Risk & Compliance</h3>
                <div className="form-fields">
                  <div className="form-field">
                    <label className="form-label">Covenant Compliance Confirmed</label>
                    <Field as="select" name="covenantComplianceConfirmed" className="form-input">
                      <option value="">Select</option>
                      <option>Yes</option>
                      <option>No</option>
                    </Field>
                  </div>

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
                    Submit Facility Utilization Request
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

export default FRM01055_FacilityUtilizationRequest;