// FRM01013_CashHandlingSOPAcknowledgement.jsx
// FRM-01013 – Cash Handling SOP Acknowledgement
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
  employeeName: Yup.string().required("Required"),
  sopVersion: Yup.string().required("Required"),
  effectiveDate: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01013",
  date: "",
  department: "Treasury & Funding",
  function: "Cash, Banking & Payments",
  referenceNumber: "",
  location: "",

  sopVersion: "",
  effectiveDate: "",

  employeeName: "",
  employeeId: "",
  designation: "",
  employeeDepartment: "",
  contactNumber: "",
  email: "",

  acknowledgementStatement:
    "I acknowledge that I have read, understood, and agree to comply with the Cash Handling SOP and related internal controls.",

  trainingCompleted: "",
  complianceEffectiveFrom: "",
  remarks: "",

  approvalRoles: [
    { roleName: "Employee Signature", data: {} },
    { roleName: "Supervisor", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01013_CashHandlingSOPAcknowledgement = () => {

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
      formId="FRM-01013"
      title="Cash Handling SOP Acknowledgement"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Cash Handling SOP Acknowledgement Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01013"
              title="CASH HANDLING SOP ACKNOWLEDGEMENT"
              department="Treasury & Funding – Cash, Banking & Payments"
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
                  {field(values,"sopVersion","SOP Version")}
                  {field(values,"effectiveDate","Effective Date","date")}
                </div>
              </div>

              {/* EMPLOYEE DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Employee Details</h3>
                <div className="form-fields">
                  {field(values,"employeeName","Employee Name")}
                  {field(values,"employeeId","Employee ID")}
                  {field(values,"designation","Designation")}
                  {field(values,"employeeDepartment","Department")}
                  {field(values,"contactNumber","Contact Number")}
                  {field(values,"email","Email","email")}
                </div>
              </div>

              {/* ACKNOWLEDGEMENT STATEMENT */}
              <div className="form-section">
                <h3 className="form-section-title">Acknowledgement Statement</h3>
                <div className="form-fields">
                  {field(values,"acknowledgementStatement","Statement")}
                </div>
              </div>

              {/* COMPLIANCE CONFIRMATION */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Confirmation</h3>
                <div className="form-fields">
                  <div className="form-field">
                    <label className="form-label">Training Completed</label>
                    {isPrintMode
                      ? <div className="print-value">{values.trainingCompleted || "_________"}</div>
                      : (
                        <Field as="select" name="trainingCompleted" className="form-input">
                          <option value="">Select</option>
                          <option>Yes</option>
                          <option>No</option>
                        </Field>
                      )
                    }
                  </div>

                  {field(values,"complianceEffectiveFrom","Effective From","date")}
                  {field(values,"remarks","Remarks")}
                </div>
              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* SIGNATURES */}
              <div className="form-section">
                <h3 className="form-section-title">Signatures</h3>

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
                                setFieldValue(`approvalRoles.${index}.roleName`,val)
                              }
                              onChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.data`,val)
                              }
                            />
                            {!isPrintMode && (
                              <button
                                type="button"
                                className="btn-remove-role"
                                onClick={()=>remove(index)}
                              >
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
                    Submit SOP Acknowledgement
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

export default FRM01013_CashHandlingSOPAcknowledgement;