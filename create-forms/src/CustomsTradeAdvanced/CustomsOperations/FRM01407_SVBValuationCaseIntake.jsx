// FRM01407_SVBValuationCaseIntake.jsx
// FRM-01407 – SVB (Valuation) Case Intake
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
  requestReferenceNo: Yup.string().required("Required"),
  requestDate: Yup.date().required("Required"),
  importerName: Yup.string().required("Required"),
  iecNumber: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01407",
  department: "Customs & Trade (Advanced)",
  function: "Customs Operations",

  /* 1. Request Details */
  requestReferenceNo: "",
  requestDate: "",
  preparedBy: "",
  departmentName: "",
  businessUnit: "",

  /* 2. Importer Details */
  importerName: "",
  iecNumber: "",
  gstin: "",
  address: "",
  contactPerson: "",

  /* 3. Transaction Details */
  relatedPartyInvolved: "",
  natureOfRelationship: "",
  goodsDescription: "",
  countryOfOrigin: "",
  valuationConcern: "",

  /* 4. Case Details */
  reasonForSVBCase: "",
  supportingDocuments: "",
  riskIndicators: "",
  additionalNotes: "",

  /* 5. Approval */
  approvalRoles: [
    { roleName: "Requested By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM01407_SVBValuationCaseIntake = () => {

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
    <ModernFormWrapper formId="FRM-01407" title="SVB (Valuation) Case Intake">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("SVB Valuation Case Intake Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01407"
            title="FRM-01407 — SVB (Valuation) Case Intake"
            department="Customs & Trade (Advanced) | Customs Operations"
          >

          {/* 1. Request Details */}
          <div className="form-section">
            <h3 className="form-section-title">Request Details</h3>
            <div className="form-fields">
              {field(values,"requestReferenceNo","Request Reference No")}
              {field(values,"requestDate","Request Date","date")}
              {field(values,"preparedBy","Prepared By")}
              {field(values,"departmentName","Department")}
              {field(values,"businessUnit","Business Unit")}
            </div>
          </div>

          {/* 2. Importer Details */}
          <div className="form-section">
            <h3 className="form-section-title">Importer Details</h3>
            <div className="form-fields">
              {field(values,"importerName","Importer Name")}
              {field(values,"iecNumber","IEC Number")}
              {field(values,"gstin","GSTIN")}
              {field(values,"address","Address","text",true)}
              {field(values,"contactPerson","Contact Person")}
            </div>
          </div>

          {/* 3. Transaction Details */}
          <div className="form-section">
            <h3 className="form-section-title">Transaction Details</h3>
            <div className="form-fields">

              <div className="form-field">
                <label className="form-label">Related Party Involved (Yes/No)</label>
                {!isPrintMode ? (
                  <Field as="select" name="relatedPartyInvolved" className="form-input">
                    <option value="">Select</option>
                    <option>Yes</option>
                    <option>No</option>
                  </Field>
                ) : (
                  <div className="print-value">{values.relatedPartyInvolved || "_________"}</div>
                )}
              </div>

              {field(values,"natureOfRelationship","Nature of Relationship")}
              {field(values,"goodsDescription","Goods Description","text",true)}
              {field(values,"countryOfOrigin","Country of Origin")}
              {field(values,"valuationConcern","Valuation Concern","text",true)}
            </div>
          </div>

          {/* 4. Case Details */}
          <div className="form-section">
            <h3 className="form-section-title">Case Details</h3>
            <div className="form-fields">
              {field(values,"reasonForSVBCase","Reason for SVB Case","text",true)}
              {field(values,"supportingDocuments","Supporting Documents")}
              {field(values,"riskIndicators","Risk Indicators","text",true)}
              {field(values,"additionalNotes","Additional Notes","text",true)}
            </div>
          </div>

          <FormAttachments values={values}/>
          <FormCustomFields values={values}/>

          {/* 5. Approval */}
          <div className="form-section">
            <h3 className="form-section-title">Approval</h3>

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
                Submit SVB Case Intake
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

export default FRM01407_SVBValuationCaseIntake;