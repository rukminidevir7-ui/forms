// FRM01077_PolicyPurchaseApproval.jsx
// FRM-01077 – Policy Purchase Approval
// Enterprise Grade – Insurance & Risk Finance – Insurance Management

import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePrintMode } from "../PrintModeContext";
import ModernFormWrapper from "../components/ModernFormWrapper";
import ModernA4Template from "../components/ModernA4Template";
import FormAttachments from "../components/FormAttachments";
import FormCustomFields from "../components/FormCustomFields";
import ApprovalSignatureBlock from "../components/ApprovalSignatureBlock";
import "../styles/FRM00611.css";

/* ================= VALIDATION ================= */

const validationSchema = Yup.object({
  insurerName: Yup.string().required("Required"),
  policyType: Yup.string().required("Required"),
  premiumAmount: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01077",
  date: "",
  department: "Insurance & Risk Finance",
  function: "Insurance Management",
  referenceNumber: "",
  location: "",
  businessUnit: "",
  riskCategory: "",

  /* Policy Details */
  insurerName: "",
  policyType: "",
  coverageDescription: "",
  sumInsured: "",
  policyPeriodFrom: "",
  policyPeriodTo: "",

  /* Financial Details */
  premiumAmount: "",
  taxesCharges: "",
  totalCost: "",
  budgetAvailability: "",

  /* Risk Assessment */
  keyRisksCovered: "",
  coverageAdequacy: "",
  exclusionsNoted: "",
  remarks: "",

  /* Decision */
  approvalStatus: "",
  conditions: "",
  comments: "",

  /* Authorization */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01077_PolicyPurchaseApproval = () => {

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
      formId="FRM-01077"
      title="Policy Purchase Approval"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Policy Purchase Approval Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-01077"
              title="POLICY PURCHASE APPROVAL"
              department="Insurance & Risk Finance – Insurance Management"
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
                  {field(values,"riskCategory","Risk Category")}
                </div>
              </div>

              {/* POLICY DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Policy Details</h3>
                <div className="form-fields">
                  {field(values,"insurerName","Insurer Name")}
                  {field(values,"policyType","Policy Type")}
                  {field(values,"coverageDescription","Coverage Description")}
                  {field(values,"sumInsured","Sum Insured","number")}
                  {field(values,"policyPeriodFrom","Policy Period From","date")}
                  {field(values,"policyPeriodTo","Policy Period To","date")}
                </div>
              </div>

              {/* FINANCIAL DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Financial Details</h3>
                <div className="form-fields">
                  {field(values,"premiumAmount","Premium Amount","number")}
                  {field(values,"taxesCharges","Taxes and Charges","number")}
                  {field(values,"totalCost","Total Cost","number")}
                  {field(values,"budgetAvailability","Budget Availability")}
                </div>
              </div>

              {/* RISK ASSESSMENT */}
              <div className="form-section">
                <h3 className="form-section-title">Risk Assessment</h3>
                <div className="form-fields">
                  {field(values,"keyRisksCovered","Key Risks Covered")}
                  {field(values,"coverageAdequacy","Coverage Adequacy")}
                  {field(values,"exclusionsNoted","Exclusions Noted")}
                  {field(values,"remarks","Remarks")}
                </div>
              </div>

              {/* DECISION */}
              <div className="form-section">
                <h3 className="form-section-title">Decision</h3>
                <div className="form-fields">
                  {field(values,"approvalStatus","Approval Status")}
                  {field(values,"conditions","Conditions")}
                  {field(values,"comments","Comments")}
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
                    Submit Policy Purchase Approval
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

export default FRM01077_PolicyPurchaseApproval;