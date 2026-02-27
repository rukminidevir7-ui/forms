// FRM00838_BudgetReviewMeetingMinutes.jsx
// FRM-00838 – Budget Review Meeting Minutes – Report / Record
// Enterprise Grade – Structured Meeting Documentation

import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
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
  companyName: Yup.string().required("Required"),
  meetingDate: Yup.string().required("Required"),
  meetingTime: Yup.string().required("Required"),
  locationMode: Yup.string().required("Required"),
  budgetPeriod: Yup.string().required("Required"),
  chairperson: Yup.string().required("Required"),
  preparedSignature: Yup.object().required(),
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  companyName: "",
  meetingDate: "",
  meetingTime: "",
  locationMode: "",
  budgetPeriod: "",
  chairperson: "",

  attendees: "",
  agenda: "",
  keyDiscussions: "",
  decisionsTaken: "",
  actionItems: "",
  responsiblePersons: "",
  targetDates: "",

  preparedSignature: {},
  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00838_BudgetReviewMeetingMinutes = () => {

  const { isPrintMode } = usePrintMode();

  const renderField = (values, name, label, type="text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode ? (
        <div className="print-value">
          {values[name] || "________________________________"}
        </div>
      ) : (
        <>
          <Field name={name} type={type} className="form-input" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (
    <ModernFormWrapper
      formId="FRM-00838"
      title="Budget Review Meeting Minutes"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Budget Review Meeting Minutes Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00838"
              title="BUDGET REVIEW MEETING MINUTES"
              department="Finance & Accounting – Budgeting, FP&A & Forecasting"
            >

              {/* ================= MAIN FORM ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Meeting Details</h3>
                <div className="form-fields">

                  {renderField(values,"companyName","Company Name")}
                  {renderField(values,"meetingDate","Meeting Date","date")}
                  {renderField(values,"meetingTime","Meeting Time","time")}
                  {renderField(values,"locationMode","Location / Mode")}
                  {renderField(values,"budgetPeriod","Budget Period")}
                  {renderField(values,"chairperson","Chairperson")}

                  {renderField(values,"attendees","Attendees")}
                  {renderField(values,"agenda","Agenda")}
                  {renderField(values,"keyDiscussions","Key Discussions")}
                  {renderField(values,"decisionsTaken","Decisions Taken")}
                  {renderField(values,"actionItems","Action Items")}
                  {renderField(values,"responsiblePersons","Responsible Person(s)")}
                  {renderField(values,"targetDates","Target Dates")}

                </div>
              </div>

              {/* ================= CUSTOM FIELDS ================= */}
              <FormCustomFields values={values} />

              {/* ================= ATTACHMENTS ================= */}
              <FormAttachments values={values} />

              {/* ================= SIGNATURE WORKFLOW ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Approval Workflow</h3>

                <div className="three-column-signatures">
                  <ApprovalSignatureBlock
                    label="Prepared By"
                    value={values.preparedSignature}
                    onChange={(val)=>setFieldValue("preparedSignature",val)}
                  />

                  <ApprovalSignatureBlock
                    label="Reviewed By"
                    value={values.reviewedSignature}
                    onChange={(val)=>setFieldValue("reviewedSignature",val)}
                  />

                  <ApprovalSignatureBlock
                    label="Approved By"
                    value={values.approvedSignature}
                    onChange={(val)=>setFieldValue("approvedSignature",val)}
                  />
                </div>

                {/* ================= CUSTOM SIGNATURES ================= */}
                <FieldArray name="additionalSignatures">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          style={{ marginTop:20 }}
                          onClick={()=>push({data:{}})}
                        >
                          + Add Custom Signature
                        </button>
                      )}

                      {values.additionalSignatures.map((sig,index)=>(
                        <div key={index} style={{ marginTop:10 }}>
                          <ApprovalSignatureBlock
                            label={`Custom Signature ${index+1}`}
                            value={sig.data || {}}
                            onChange={(val)=>
                              setFieldValue(`additionalSignatures.${index}.data`,val)
                            }
                          />
                          {!isPrintMode && (
                            <button type="button" onClick={()=>remove(index)}>
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </FieldArray>

              </div>

              {/* ================= SUBMIT ================= */}
              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Meeting Minutes
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

export default FRM00838_BudgetReviewMeetingMinutes;
