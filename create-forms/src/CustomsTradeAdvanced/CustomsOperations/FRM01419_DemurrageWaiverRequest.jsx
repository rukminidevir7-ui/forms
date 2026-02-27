// DemurrageWaiverRequestUniversalForm.jsx
// Demurrage / Waiver Request – Universal Form
// Enterprise Grade – Customs & Trade (Advanced) – Customs Operations

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
  requestId: Yup.string().required("Required"),
  entityName: Yup.string().required("Required"),
  type: Yup.string().required("Required"),
  reasonForRequest: Yup.string().required("Required"),
  amountInvolved: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "DEMURRAGE-WAIVER-UNIVERSAL",
  department: "Customs Operations",

  formReferenceNo: "",
  requestId: "",
  date: "",
  requestedBy: "",

  /* Entity & Shipment */
  entityName: "",
  iecGstin: "",
  portTerminal: "",
  documentNumber: "",
  containerDetails: "",

  /* Request Details */
  type: "",
  reasonForRequest: "",
  delayPeriod: "",
  amountInvolved: "",
  supportingJustification: "",

  /* Attachments */
  invoiceChargeNote: "",
  delayEvidence: "",
  correspondence: "",
  otherDocuments: "",

  /* Declaration */
  declarationStatement:
    "I confirm the details provided are accurate and supported by documents.",
  signature: "",
  name: "",
  declarationDate: "",

  /* Approval Workflow */
  approvalRoles: [
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM01419_DemurrageWaiverRequest = () => {

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
    <ModernFormWrapper formId="DEMURRAGE-WAIVER-UNIVERSAL" title="Demurrage / Waiver Request">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Demurrage / Waiver Request Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="DEMURRAGE-WAIVER"
            title="Demurrage / Waiver Request Form"
            department="Customs & Trade (Advanced) | Customs Operations"
          >

          {/* Form Info */}
          <div className="form-section">
            <h3 className="form-section-title">Form Information</h3>
            <div className="form-fields">
              {field(values,"formReferenceNo","Form Reference No")}
              {field(values,"requestId","Request ID")}
              {field(values,"date","Date","date")}
              {field(values,"requestedBy","Requested By")}
            </div>
          </div>

          {/* Entity & Shipment */}
          <div className="form-section">
            <h3 className="form-section-title">Entity & Shipment Details</h3>
            <div className="form-fields">
              {field(values,"entityName","Entity Name")}
              {field(values,"iecGstin","IEC / GSTIN")}
              {field(values,"portTerminal","Port / Terminal")}
              {field(values,"documentNumber","Bill of Entry / BL No")}
              {field(values,"containerDetails","Container / Consignment Details","text",true)}
            </div>
          </div>

          {/* Request Details */}
          <div className="form-section">
            <h3 className="form-section-title">Request Details</h3>
            <div className="form-fields">

              <div className="form-field">
                <label className="form-label">Type</label>
                {!isPrintMode ? (
                  <Field as="select" name="type" className="form-input">
                    <option value="">Select</option>
                    <option>Demurrage</option>
                    <option>Detention</option>
                    <option>Waiver</option>
                  </Field>
                ) : (
                  <div className="print-value">{values.type || "_________"}</div>
                )}
              </div>

              {field(values,"reasonForRequest","Reason for Request","text",true)}
              {field(values,"delayPeriod","Delay Period")}
              {field(values,"amountInvolved","Amount Involved")}
              {field(values,"supportingJustification","Supporting Justification","text",true)}
            </div>
          </div>

          {/* Attachments */}
          <div className="form-section">
            <h3 className="form-section-title">Attachments</h3>
            <div className="form-fields">
              {field(values,"invoiceChargeNote","Invoice / Charge Note")}
              {field(values,"delayEvidence","Delay Evidence")}
              {field(values,"correspondence","Correspondence")}
              {field(values,"otherDocuments","Other Documents")}
            </div>
          </div>

          <FormAttachments values={values}/>
          <FormCustomFields values={values}/>

          {/* Declaration */}
          <div className="form-section">
            <h3 className="form-section-title">Declaration</h3>
            <div className="form-fields">
              {field(values,"declarationStatement","Declaration Statement","text",true)}
              {field(values,"name","Name")}
              {field(values,"signature","Signature")}
              {field(values,"declarationDate","Date","date")}
            </div>
          </div>

          {/* Approval */}
          <div className="form-section">
            <h3 className="form-section-title">Approval & Sign-Off</h3>

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

            {field(values,"approvalDate","Approval Date","date")}
          </div>

          {!isPrintMode &&
            <div className="form-actions">
              <button type="submit" className="btn-submit">
                Submit Request
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

export default FRM01419_DemurrageWaiverRequest;