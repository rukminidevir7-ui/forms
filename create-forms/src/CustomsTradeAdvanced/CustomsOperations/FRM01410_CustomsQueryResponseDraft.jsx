// FRM01410_CustomsQueryResponseDraft.jsx
// FRM-01410–01412 – Customs Query Response Draft
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
  referenceNumber: Yup.string().required("Required"),
  queryReference: Yup.string().required("Required"),
  entityName: Yup.string().required("Required"),
  receivedDate: Yup.date().required("Required"),
  dueDate: Yup.date().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01410-01412",
  department: "Customs & Trade (Advanced)",
  function: "Customs Operations",

  /* 1. Reference Details */
  referenceNumber: "",
  queryReference: "",
  departmentName: "",
  preparedBy: "",
  date: "",

  /* 2. Entity & Transaction Details */
  entityName: "",
  iecNumber: "",
  gstin: "",
  documentNumber: "",
  port: "",

  /* 3. Query Details */
  queryDescription: "",
  receivedDate: "",
  dueDate: "",
  authorityOffice: "",

  /* 4. Response Draft */
  responseSummary: "",
  detailedExplanation: "",
  supportingReferences: "",

  /* 5. Attachments */
  documentsAttached: "",
  additionalNotes: "",

  /* 6. Decision & Sign-off */
  decision: "",
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM01410_CustomsQueryResponseDraft = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type="text", multiline=false) => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || "_________"}</div>
      ) : (
        <>
          {multiline
            ? <Field as="textarea" name={name} className="form-input"/>
            : <Field name={name} type={type} className="form-input"/>
          }
          <ErrorMessage name={name} component="div" className="form-error"/>
        </>
      )}
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-01410-01412" title="Customs Query Response Draft">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Customs Query Response Draft Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01410–01412"
            title="FRM-01410–01412 — Customs Query Response Draft"
            department="Customs & Trade (Advanced) | Customs Operations"
          >

          {/* 1. Reference Details */}
          <div className="form-section">
            <h3 className="form-section-title">Reference Details</h3>
            <div className="form-fields">
              {field(values,"referenceNumber","Reference Number")}
              {field(values,"queryReference","Query Reference")}
              {field(values,"departmentName","Department")}
              {field(values,"preparedBy","Prepared By")}
              {field(values,"date","Date","date")}
            </div>
          </div>

          {/* 2. Entity & Transaction Details */}
          <div className="form-section">
            <h3 className="form-section-title">Entity & Transaction Details</h3>
            <div className="form-fields">
              {field(values,"entityName","Entity Name")}
              {field(values,"iecNumber","IEC Number")}
              {field(values,"gstin","GSTIN")}
              {field(values,"documentNumber","BoE / Shipping Bill Number")}
              {field(values,"port","Port")}
            </div>
          </div>

          {/* 3. Query Details */}
          <div className="form-section">
            <h3 className="form-section-title">Query Details</h3>
            <div className="form-fields">
              {field(values,"queryDescription","Query Description","text",true)}
              {field(values,"receivedDate","Received Date","date")}
              {field(values,"dueDate","Due Date","date")}
              {field(values,"authorityOffice","Authority / Office")}
            </div>
          </div>

          {/* 4. Response Draft */}
          <div className="form-section">
            <h3 className="form-section-title">Response Draft</h3>
            <div className="form-fields">
              {field(values,"responseSummary","Response Summary","text",true)}
              {field(values,"detailedExplanation","Detailed Explanation","text",true)}
              {field(values,"supportingReferences","Supporting References","text",true)}
            </div>
          </div>

          {/* 5. Attachments */}
          <div className="form-section">
            <h3 className="form-section-title">Attachments</h3>
            <div className="form-fields">
              {field(values,"documentsAttached","Documents Attached")}
              {field(values,"additionalNotes","Additional Notes","text",true)}
            </div>
          </div>

          <FormAttachments values={values}/>
          <FormCustomFields values={values}/>

          {/* 6. Decision & Sign-off */}
          <div className="form-section">
            <h3 className="form-section-title">Decision & Sign-off</h3>

            <div className="form-field">
              <label className="form-label">Decision</label>
              {!isPrintMode ? (
                <Field as="select" name="decision" className="form-input">
                  <option value="">Select</option>
                  <option>Approved for Submission</option>
                  <option>Revision Required</option>
                  <option>Rejected</option>
                </Field>
              ) : (
                <div className="print-value">{values.decision || "_________"}</div>
              )}
            </div>

            <FieldArray name="approvalRoles">
            {({push,remove})=>(
              <>
              {!isPrintMode &&
                <button type="button" className="btn-submit"
                  onClick={()=>push({roleName:"New Role",data:{}})}>
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
                      </button>}
                  </div>
                ))}
              </div>
              </>
            )}
            </FieldArray>

            {field(values,"approvalDate","Date","date")}
          </div>

          {!isPrintMode &&
            <div className="form-actions">
              <button type="submit" className="btn-submit">
                Submit Query Response Draft
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

export default FRM01410_CustomsQueryResponseDraft;