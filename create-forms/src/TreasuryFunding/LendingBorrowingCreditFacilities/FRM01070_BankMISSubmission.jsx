// FRM01070_BankMISSubmission.jsx
// FRM-01070 – Bank MIS Submission
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
  misType: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01070",
  date: "",
  department: "Treasury & Funding",
  function: "Lending, Borrowing & Credit Facilities",
  referenceNumber: "",
  location: "",
  borrowerName: "",
  facilityReference: "",
  reportingPeriodFrom: "",
  reportingPeriodTo: "",

  /* Submission Details */
  misType: "",
  submissionFrequency: "",
  dueDate: "",
  submissionDate: "",
  submittedTo: "",

  /* Financial Highlights */
  salesRevenue: "",
  ebitda: "",
  outstandingDebt: "",
  cashBalance: "",

  /* Compliance */
  covenantsComplied: "",
  varianceExplained: "",
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

const FRM01070_BankMISSubmission = () => {

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
      formId="FRM-01070"
      title="Bank MIS Submission"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Bank MIS Submission Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01070"
              title="BANK MIS SUBMISSION"
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
                  {field(values,"reportingPeriodFrom","Reporting Period From","date")}
                  {field(values,"reportingPeriodTo","Reporting Period To","date")}
                </div>
              </div>

              {/* SUBMISSION DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Submission Details</h3>
                <div className="form-fields">
                  {field(values,"misType","MIS Type")}
                  {field(values,"submissionFrequency","Submission Frequency")}
                  {field(values,"dueDate","Due Date","date")}
                  {field(values,"submissionDate","Submission Date","date")}
                  {field(values,"submittedTo","Submitted To (Bank)")}
                </div>
              </div>

              {/* FINANCIAL HIGHLIGHTS */}
              <div className="form-section">
                <h3 className="form-section-title">Financial Highlights</h3>
                <div className="form-fields">
                  {field(values,"salesRevenue","Sales / Revenue","number")}
                  {field(values,"ebitda","EBITDA","number")}
                  {field(values,"outstandingDebt","Outstanding Debt","number")}
                  {field(values,"cashBalance","Cash Balance","number")}
                </div>
              </div>

              {/* COMPLIANCE */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance</h3>
                <div className="form-fields">
                  <div className="form-field">
                    <label className="form-label">Covenants Complied</label>
                    {isPrintMode
                      ? <div className="print-value">{values.covenantsComplied || "_________"}</div>
                      : (
                        <Field as="select" name="covenantsComplied" className="form-input">
                          <option value="">Select</option>
                          <option>Yes</option>
                          <option>No</option>
                        </Field>
                      )
                    }
                  </div>
                  {field(values,"varianceExplained","Variance Explained")}
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
                    Submit Bank MIS
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

export default FRM01070_BankMISSubmission;