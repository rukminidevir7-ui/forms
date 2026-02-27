// FRM01069_WorkingCapitalLimitReview.jsx
// FRM-01069 – Working Capital Limit Review
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
  sanctionedLimit: Yup.number().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01069",
  date: "",
  department: "Treasury & Funding",
  function: "Lending, Borrowing & Credit Facilities",
  referenceNumber: "",
  location: "",
  borrowerName: "",
  facilityReference: "",
  reviewPeriodFrom: "",
  reviewPeriodTo: "",

  /* Limit Details */
  sanctionedLimit: "",
  currentUtilization: "",
  availableLimit: "",
  peakUtilization: "",
  averageUtilization: "",

  /* Financial Performance */
  salesTurnover: "",
  inventoryLevel: "",
  receivables: "",
  payables: "",

  /* Assessment */
  adequacyOfLimit: "",
  riskAssessment: "",
  recommendedLimit: "",
  remarks: "",

  /* Authorization */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01069_WorkingCapitalLimitReview = () => {

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
      formId="FRM-01069"
      title="Working Capital Limit Review"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Working Capital Limit Review Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01069"
              title="WORKING CAPITAL LIMIT REVIEW"
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
                  {field(values,"reviewPeriodFrom","Review Period From","date")}
                  {field(values,"reviewPeriodTo","Review Period To","date")}
                </div>
              </div>

              {/* LIMIT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Limit Details</h3>
                <div className="form-fields">
                  {field(values,"sanctionedLimit","Sanctioned Limit","number")}
                  {field(values,"currentUtilization","Current Utilization","number")}
                  {field(values,"availableLimit","Available Limit","number")}
                  {field(values,"peakUtilization","Peak Utilization","number")}
                  {field(values,"averageUtilization","Average Utilization","number")}
                </div>
              </div>

              {/* FINANCIAL PERFORMANCE */}
              <div className="form-section">
                <h3 className="form-section-title">Financial Performance</h3>
                <div className="form-fields">
                  {field(values,"salesTurnover","Sales Turnover","number")}
                  {field(values,"inventoryLevel","Inventory Level","number")}
                  {field(values,"receivables","Receivables","number")}
                  {field(values,"payables","Payables","number")}
                </div>
              </div>

              {/* ASSESSMENT */}
              <div className="form-section">
                <h3 className="form-section-title">Assessment</h3>
                <div className="form-fields">
                  {field(values,"adequacyOfLimit","Adequacy of Limit")}
                  {field(values,"riskAssessment","Risk Assessment")}
                  {field(values,"recommendedLimit","Recommended Limit","number")}
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
                    Submit Working Capital Limit Review
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

export default FRM01069_WorkingCapitalLimitReview;