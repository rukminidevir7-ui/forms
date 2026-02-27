// FRM01424_BRCBERTTracking.jsx
// BRC / BERT Tracking – Universal Form
// Enterprise Grade – Customs & Trade (Advanced) – Export Benefits & Schemes

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
  formReferenceNo: Yup.string().required("Required"),
  trackingId: Yup.string().required("Required"),
  exporterName: Yup.string().required("Required"),
  shippingBillNo: Yup.string().required("Required"),
  status: Yup.string().required("Required"),
  decision: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01424",
  department: "Export Benefits & Schemes",

  formReferenceNo: "",
  trackingId: "",
  date: "",
  preparedBy: "",
  reviewedBy: "",

  /* Exporter Details */
  exporterName: "",
  iec: "",
  gstin: "",
  address: "",

  /* Shipment Details */
  shippingBillNo: "",
  shippingBillDate: "",
  invoiceNo: "",
  invoiceDate: "",
  fobValue: "",

  /* BRC / BERT Tracking */
  bankName: "",
  brcNo: "",
  bertReference: "",
  expectedRealizationDate: "",
  actualRealizationDate: "",
  amountRealized: "",
  status: "",
  actionsNotes: "",
  followUpRequired: "",
  remarks: "",

  /* Attachments */
  bankCertificate: "",
  bankAdvice: "",
  invoiceCopy: "",
  shippingBillCopy: "",
  otherDocuments: "",

  /* Decision */
  decision: "",
  comments: "",

  approvalRoles: [
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: "",
  signature: ""
};

/* ================= COMPONENT ================= */

const FRM01424_BRCBERTTracking = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values,name,label,type="text",multiline=false)=>(
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name]||"_________"}</div>
        : <>
            {multiline
              ? <Field as="textarea" name={name} className="form-input"/>
              : <Field name={name} type={type} className="form-input"/>
            }
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return(
    <ModernFormWrapper formId="FRM-01424" title="BRC / BERT Tracking Universal Form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("BRC / BERT Tracking Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01424"
            title="BRC / BERT Tracking Universal Form"
            department="Customs & Trade (Advanced) | Export Benefits & Schemes"
          >

          {/* Form Info */}
          <div className="form-section">
            <h3 className="form-section-title">Form Information</h3>
            <div className="form-fields">
              {field(values,"formReferenceNo","Form Reference No")}
              {field(values,"trackingId","Tracking ID")}
              {field(values,"date","Date","date")}
              {field(values,"preparedBy","Prepared By")}
              {field(values,"reviewedBy","Reviewed By")}
            </div>
          </div>

          {/* Exporter Details */}
          <div className="form-section">
            <h3 className="form-section-title">Exporter Details</h3>
            <div className="form-fields">
              {field(values,"exporterName","Exporter Name")}
              {field(values,"iec","IEC")}
              {field(values,"gstin","GSTIN")}
              {field(values,"address","Address","text",true)}
            </div>
          </div>

          {/* Shipment Details */}
          <div className="form-section">
            <h3 className="form-section-title">Shipment Details</h3>
            <div className="form-fields">
              {field(values,"shippingBillNo","Shipping Bill No")}
              {field(values,"shippingBillDate","Shipping Bill Date","date")}
              {field(values,"invoiceNo","Invoice No")}
              {field(values,"invoiceDate","Invoice Date","date")}
              {field(values,"fobValue","FOB Value")}
            </div>
          </div>

          {/* Tracking Details */}
          <div className="form-section">
            <h3 className="form-section-title">BRC / BERT Tracking Details</h3>
            <div className="form-fields">
              {field(values,"bankName","Bank Name")}
              {field(values,"brcNo","BRC / eBRC No")}
              {field(values,"bertReference","BERT Reference")}
              {field(values,"expectedRealizationDate","Expected Realization Date","date")}
              {field(values,"actualRealizationDate","Actual Realization Date","date")}
              {field(values,"amountRealized","Amount Realized")}
              
              <div className="form-field">
                <label className="form-label">Status</label>
                {!isPrintMode ? (
                  <Field as="select" name="status" className="form-input">
                    <option value="">Select</option>
                    <option>Pending</option>
                    <option>Realized</option>
                    <option>Partially Realized</option>
                    <option>Delayed</option>
                    <option>Overdue</option>
                  </Field>
                ) : (
                  <div className="print-value">{values.status || "_________"}</div>
                )}
              </div>

              {field(values,"actionsNotes","Actions / Notes","text",true)}
              {field(values,"followUpRequired","Follow-up Required")}
              {field(values,"remarks","Remarks","text",true)}
            </div>
          </div>

          {/* Attachments */}
          <div className="form-section">
            <h3 className="form-section-title">Attachments</h3>
            <div className="form-fields">
              {field(values,"bankCertificate","Bank Certificate")}
              {field(values,"bankAdvice","Bank Advice")}
              {field(values,"invoiceCopy","Invoice Copy")}
              {field(values,"shippingBillCopy","Shipping Bill Copy")}
              {field(values,"otherDocuments","Other Documents")}
            </div>
          </div>

          <FormAttachments values={values}/>
          <FormCustomFields values={values}/>

          {/* Decision */}
          <div className="form-section">
            <h3 className="form-section-title">Decision & Sign-Off</h3>

            <div className="form-field">
              <label className="form-label">Decision</label>
              {!isPrintMode ? (
                <Field as="select" name="decision" className="form-input">
                  <option value="">Select</option>
                  <option>Compliant</option>
                  <option>Requires Follow-up</option>
                  <option>Escalation Required</option>
                </Field>
              ) : (
                <div className="print-value">{values.decision || "_________"}</div>
              )}
            </div>

            {field(values,"comments","Comments","text",true)}

            <FieldArray name="approvalRoles">
            {({push,remove})=>(
              <>
              {!isPrintMode &&
                <button type="button" className="btn-submit"
                  onClick={()=>push({roleName:"New Role",data:{}})}>
                  + Add Role
                </button>}
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
                      </button>}
                  </div>
                ))}
              </div>
              </>
            )}
            </FieldArray>

            {field(values,"approvalDate","Date","date")}
            {field(values,"signature","Signature")}
          </div>

          {!isPrintMode &&
            <div className="form-actions">
              <button type="submit" className="btn-submit">
                Submit Tracking Form
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

export default FRM01424_BRCBERTTracking;