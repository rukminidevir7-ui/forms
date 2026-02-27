// FRM01423_ExportRealizationEvidencePack.jsx
// Export Realization Evidence Form – Universal
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
  evidenceId: Yup.string().required("Required"),
  exporterName: Yup.string().required("Required"),
  shippingBillNo: Yup.string().required("Required"),
  brcNo: Yup.string().required("Required"),
  amountRealized: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01423",
  department: "Export Benefits & Schemes",

  formReferenceNo: "",
  evidenceId: "",
  date: "",
  preparedBy: "",

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

  /* Realization Details */
  bankName: "",
  brcNo: "",
  realizationDate: "",
  amountRealized: "",
  currency: "",

  /* Attachments */
  brcCopy: "",
  bankAdvice: "",
  invoiceCopy: "",
  shippingBillCopy: "",
  otherEvidence: "",

  /* Workflow */
  approvalRoles: [
    { roleName: "Verified By", data: {} },
    { roleName: "Approved By", data: {} }
  ]
};

/* ================= COMPONENT ================= */

const FRM01423_ExportRealizationEvidencePack = () => {

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
    <ModernFormWrapper formId="FRM-01423" title="Export Realization Evidence Form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Export Realization Evidence Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01423"
            title="Export Realization Evidence Form"
            department="Customs & Trade (Advanced) | Export Benefits & Schemes"
          >

          {/* Form Info */}
          <div className="form-section">
            <h3 className="form-section-title">Form Information</h3>
            <div className="form-fields">
              {field(values,"formReferenceNo","Form Reference No")}
              {field(values,"evidenceId","Case / Evidence ID")}
              {field(values,"date","Date","date")}
              {field(values,"preparedBy","Prepared By")}
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

          {/* Realization Details */}
          <div className="form-section">
            <h3 className="form-section-title">Realization Details</h3>
            <div className="form-fields">
              {field(values,"bankName","Bank Name")}
              {field(values,"brcNo","BRC / eBRC No")}
              {field(values,"realizationDate","Realization Date","date")}
              {field(values,"amountRealized","Amount Realized")}
              {field(values,"currency","Currency")}
            </div>
          </div>

          {/* Attachments */}
          <div className="form-section">
            <h3 className="form-section-title">Attachments</h3>
            <div className="form-fields">
              {field(values,"brcCopy","Bank Realization Certificate")}
              {field(values,"bankAdvice","Bank Advice")}
              {field(values,"invoiceCopy","Invoice Copy")}
              {field(values,"shippingBillCopy","Shipping Bill Copy")}
              {field(values,"otherEvidence","Other Evidence")}
            </div>
          </div>

          <FormAttachments values={values}/>
          <FormCustomFields values={values}/>

          {/* Sign-Off (No Date / No Signature as requested) */}
          <div className="form-section">
            <h3 className="form-section-title">Sign-Off</h3>

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
          </div>

          {!isPrintMode &&
            <div className="form-actions">
              <button type="submit" className="btn-submit">
                Submit Evidence Pack
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

export default FRM01423_ExportRealizationEvidencePack;