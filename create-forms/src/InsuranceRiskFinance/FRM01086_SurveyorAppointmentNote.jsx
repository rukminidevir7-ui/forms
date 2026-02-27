// FRM01086_SurveyorAppointmentNote.jsx
// FRM-01086 – Surveyor Appointment Note
// Enterprise Grade – Insurance & Risk Finance – Insurance Management

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePrintMode } from "../PrintModeContext";
import ModernFormWrapper from "../components/ModernFormWrapper";
import ModernA4Template from "../components/ModernA4Template";
import FormAttachments from "../components/FormAttachments";
import FormCustomFields from "../components/FormCustomFields";
import ApprovalSignatureBlock from "../components/ApprovalSignatureBlock";
import { FieldArray } from "formik";
import "../styles/FRM00611.css";

/* ================= VALIDATION ================= */

const validationSchema = Yup.object({
  claimReference: Yup.string().required("Required"),
  surveyorName: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01086",
  date: "",
  department: "Insurance & Risk Finance",
  function: "Insurance Management",
  referenceNumber: "",
  location: "",
  businessUnit: "",
  claimReference: "",
  requestedBy: "",
  contactDetails: "",

  policyNumber: "",
  insurerName: "",
  policyType: "",
  policyPeriodFrom: "",
  policyPeriodTo: "",

  surveyorName: "",
  surveyorFirm: "",
  surveyorContact: "",
  appointmentDate: "",
  scopeOfAssignment: "",

  incidentDate: "",
  incidentLocation: "",
  typeOfLoss: "",
  estimatedLossAmount: "",
  specialInstructions: "",

  appointmentStatus: "",
  remarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01086_SurveyorAppointmentNote = () => {

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
      formId="FRM-01086"
      title="Surveyor Appointment Note"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Surveyor Appointment Note Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-01086"
              title="SURVEYOR APPOINTMENT NOTE"
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
                  {field(values,"claimReference","Claim Reference")}
                  {field(values,"requestedBy","Requested By")}
                  {field(values,"contactDetails","Contact Details")}
                </div>
              </div>

              {/* POLICY DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Policy Details</h3>
                <div className="form-fields">
                  {field(values,"policyNumber","Policy Number")}
                  {field(values,"insurerName","Insurer Name")}
                  {field(values,"policyType","Policy Type")}
                  {field(values,"policyPeriodFrom","Policy Period From","date")}
                  {field(values,"policyPeriodTo","Policy Period To","date")}
                </div>
              </div>

              {/* SURVEYOR DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Surveyor Details</h3>
                <div className="form-fields">
                  {field(values,"surveyorName","Surveyor Name")}
                  {field(values,"surveyorFirm","Firm / Company")}
                  {field(values,"surveyorContact","Contact Details")}
                  {field(values,"appointmentDate","Appointment Date","date")}
                  {field(values,"scopeOfAssignment","Scope of Assignment")}
                </div>
              </div>

              {/* ASSIGNMENT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Assignment Details</h3>
                <div className="form-fields">
                  {field(values,"incidentDate","Incident Date","date")}
                  {field(values,"incidentLocation","Location of Incident")}
                  {field(values,"typeOfLoss","Type of Loss")}
                  {field(values,"estimatedLossAmount","Estimated Loss Amount","number")}
                  {field(values,"specialInstructions","Special Instructions")}
                </div>
              </div>

              {/* PROCESSING */}
              <div className="form-section">
                <h3 className="form-section-title">Processing</h3>
                <div className="form-fields">
                  {field(values,"appointmentStatus","Appointment Status")}
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
                    Submit Surveyor Appointment Note
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

export default FRM01086_SurveyorAppointmentNote;