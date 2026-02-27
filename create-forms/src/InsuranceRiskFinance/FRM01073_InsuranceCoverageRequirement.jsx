// FRM01073_InsuranceCoverageRequirement.jsx
// FRM-01073 / 01074 / 01075 – Insurance Coverage Requirement
// Enterprise Grade – Insurance & Risk Finance – Insurance Management

import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormAttachments from '../components/FormAttachments';
import FormCustomFields from '../components/FormCustomFields';
import ApprovalSignatureBlock from "../components/ApprovalSignatureBlock";
import '../styles/FRM00611.css';

/* ================= VALIDATION ================= */

const validationSchema = Yup.object({
  businessUnit: Yup.string().required("Required"),
  insuranceType: Yup.string().required("Required"),
  sumInsured: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01073 / 01074 / 01075",
  date: "",
  department: "Insurance & Risk Finance",
  function: "Insurance Management",
  referenceNumber: "",
  location: "",
  businessUnit: "",
  riskCategory: "",
  requestedBy: "",
  currency: "",

  /* Coverage Details */
  insuranceType: "",
  coverageDescription: "",
  sumInsured: "",
  policyFrom: "",
  policyTo: "",
  insuredAssets: "",

  /* Risk Assessment */
  riskDescription: "",
  riskLevel: "",
  potentialImpact: "",
  mitigationMeasures: "",

  /* Cost & Budget */
  estimatedPremium: "",
  brokerInsurer: "",
  budgetAvailability: "",
  remarks: "",

  /* Compliance Checks */
  regulatoryRequirement: "",
  existingCoverageReviewed: "",
  approvalRequired: "",

  /* Authorization */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01073_InsuranceCoverageRequirement = () => {

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

  const selectField = (values, name, label, options=[]) => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : (
          <Field as="select" name={name} className="form-input">
            <option value="">Select</option>
            {options.map(opt => <option key={opt}>{opt}</option>)}
          </Field>
        )
      }
    </div>
  );

  return (
    <ModernFormWrapper
      formId="FRM-01073"
      title="Insurance Coverage Requirement"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Insurance Coverage Requirement Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01073 / 01074 / 01075"
              title="INSURANCE COVERAGE REQUIREMENT"
              department="Insurance & Risk Finance – Insurance Management"
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
                  {field(values,"riskCategory","Risk Category")}
                  {field(values,"requestedBy","Requested By")}
                  {field(values,"currency","Currency")}
                </div>
              </div>

              {/* COVERAGE DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Coverage Details</h3>
                <div className="form-fields">
                  {field(values,"insuranceType","Type of Insurance")}
                  {field(values,"coverageDescription","Coverage Description")}
                  {field(values,"sumInsured","Sum Insured","number")}
                  {field(values,"policyFrom","Policy Period From","date")}
                  {field(values,"policyTo","Policy Period To","date")}
                  {field(values,"insuredAssets","Insured Assets / Exposure")}
                </div>
              </div>

              {/* RISK ASSESSMENT */}
              <div className="form-section">
                <h3 className="form-section-title">Risk Assessment</h3>
                <div className="form-fields">
                  {field(values,"riskDescription","Risk Description")}
                  {selectField(values,"riskLevel","Risk Level",["Low","Medium","High","Critical"])}
                  {field(values,"potentialImpact","Potential Impact")}
                  {field(values,"mitigationMeasures","Mitigation Measures")}
                </div>
              </div>

              {/* COST & BUDGET */}
              <div className="form-section">
                <h3 className="form-section-title">Cost and Budget</h3>
                <div className="form-fields">
                  {field(values,"estimatedPremium","Estimated Premium","number")}
                  {field(values,"brokerInsurer","Broker / Insurer")}
                  {field(values,"budgetAvailability","Budget Availability")}
                  {field(values,"remarks","Remarks")}
                </div>
              </div>

              {/* COMPLIANCE CHECKS */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Checks</h3>
                <div className="form-fields">
                  {selectField(values,"regulatoryRequirement","Regulatory Requirement",["Yes","No"])}
                  {selectField(values,"existingCoverageReviewed","Existing Coverage Reviewed",["Yes","No"])}
                  {field(values,"approvalRequired","Approval Required")}
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
                              <button
                                type="button"
                                className="btn-remove-role"
                                onClick={()=>remove(index)}
                              >
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
                    Submit Coverage Requirement
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

export default FRM01073_InsuranceCoverageRequirement;