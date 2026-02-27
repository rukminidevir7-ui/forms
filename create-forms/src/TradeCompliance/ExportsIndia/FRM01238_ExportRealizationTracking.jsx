// FRM01238_ExportRealizationTracking.jsx
// FRM-01238 / 01239 / 01240 – Export Realization Tracking
// Enterprise Grade – Trade Compliance – Exports (India)

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
  referenceNumber: Yup.string().required("Required"),
  customerName: Yup.string().required("Required"),
  invoiceNumber: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01238", // Change if required
  date: "",
  department: "Trade Compliance",
  function: "Exports (India)",

  referenceNumber: "",
  businessUnit: "",
  preparedBy: "",
  location: "",

  customerName: "",
  invoiceNumber: "",
  invoiceDate: "",
  shippingBillNumber: "",
  shipmentDate: "",
  currency: "",
  invoiceValue: "",

  realizationStatus: "",
  amountRealized: "",
  realizationDate: "",
  bankName: "",
  bankReferenceNumber: "",
  outstandingAmount: "",

  brcFircReceived: "",
  rbiComplianceStatus: "",
  overdueStatus: "",
  followUpActions: "",
  remarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01238_ExportRealizationTracking = () => {

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
      formId={initialValues.formId}
      title="Export Realization Tracking"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Export Realization Tracking Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId={initialValues.formId}
              title="EXPORT REALIZATION TRACKING"
              department="Trade Compliance – Exports (India)"
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
                  {field(values,"preparedBy","Prepared By")}
                  {field(values,"location","Location")}
                </div>
              </div>

              {/* EXPORT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Export Details</h3>
                <div className="form-fields">
                  {field(values,"customerName","Customer Name")}
                  {field(values,"invoiceNumber","Invoice Number")}
                  {field(values,"invoiceDate","Invoice Date","date")}
                  {field(values,"shippingBillNumber","Shipping Bill Number")}
                  {field(values,"shipmentDate","Shipment Date","date")}
                  {field(values,"currency","Currency")}
                  {field(values,"invoiceValue","Invoice Value")}
                </div>
              </div>

              {/* REALIZATION DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Realization Details</h3>
                <div className="form-fields">
                  {field(values,"realizationStatus","Realization Status")}
                  {field(values,"amountRealized","Amount Realized")}
                  {field(values,"realizationDate","Realization Date","date")}
                  {field(values,"bankName","Bank Name")}
                  {field(values,"bankReferenceNumber","Bank Reference Number")}
                  {field(values,"outstandingAmount","Outstanding Amount")}
                </div>
              </div>

              {/* COMPLIANCE TRACKING */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Tracking</h3>
                <div className="form-fields">
                  {field(values,"brcFircReceived","BRC / FIRC Received")}
                  {field(values,"rbiComplianceStatus","RBI Compliance Status")}
                  {field(values,"overdueStatus","Overdue Status")}
                  {field(values,"followUpActions","Follow-up Actions")}
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
                        <button type="button" className="btn-submit" onClick={()=>push({ roleName:"New Role", data:{} })}>
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
                              <button type="button" onClick={()=>remove(index)}>Remove</button>
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
                    Submit Realization Tracking
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

export default FRM01238_ExportRealizationTracking;