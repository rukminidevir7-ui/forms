// FRM01209_DutyPaymentAuthorization.jsx
// FRM-01209 – Duty Payment Authorization
// Enterprise Grade – Trade Compliance – Imports (India)

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
  billOfEntryNo: Yup.string().required("Required"),
  totalDutyAmount: Yup.string().required("Required"),
  paymentMode: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01209",
  date: "",
  department: "Trade Compliance",
  function: "Imports (India)",
  referenceNumber: "",
  businessUnit: "",
  requestedBy: "",
  location: "",

  billOfEntryNo: "",
  billOfEntryDate: "",
  importerName: "",
  customsBroker: "",
  port: "",

  assessableValue: "",
  totalDutyAmount: "",
  paymentMode: "",
  bankPaymentReference: "",
  dueDate: "",

  reasonForPayment: "",
  supportingDocuments: "",
  remarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01209_DutyPaymentAuthorization = () => {

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
      formId="FRM-01209"
      title="Duty Payment Authorization"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Duty Payment Authorization Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01209"
              title="DUTY PAYMENT AUTHORIZATION"
              department="Trade Compliance – Imports (India)"
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
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"requestedBy","Requested By")}
                  {field(values,"location","Location")}
                </div>
              </div>

              {/* IMPORT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Import Details</h3>
                <div className="form-fields">
                  {field(values,"billOfEntryNo","Bill of Entry No")}
                  {field(values,"billOfEntryDate","Bill of Entry Date","date")}
                  {field(values,"importerName","Importer Name")}
                  {field(values,"customsBroker","Customs Broker")}
                  {field(values,"port","Port")}
                </div>
              </div>

              {/* DUTY PAYMENT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Duty Payment Details</h3>
                <div className="form-fields">
                  {field(values,"assessableValue","Assessable Value")}
                  {field(values,"totalDutyAmount","Total Duty Amount")}
                  {field(values,"paymentMode","Payment Mode")}
                  {field(values,"bankPaymentReference","Bank / Payment Reference")}
                  {field(values,"dueDate","Due Date","date")}
                </div>
              </div>

              {/* JUSTIFICATION */}
              <div className="form-section">
                <h3 className="form-section-title">Justification</h3>
                <div className="form-fields">
                  {field(values,"reasonForPayment","Reason for Payment")}
                  {field(values,"supportingDocuments","Supporting Documents")}
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
                              onRoleNameChange={(val)=>setFieldValue(`approvalRoles.${index}.roleName`,val)}
                              onChange={(val)=>setFieldValue(`approvalRoles.${index}.data`,val)}
                            />
                            {!isPrintMode &&
                              <button type="button" onClick={()=>remove(index)}>
                                Remove
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
                    Submit Duty Payment Authorization
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

export default FRM01209_DutyPaymentAuthorization;