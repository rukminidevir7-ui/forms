// FRM01413_CustomsAppealPack.jsx
// FRM-01413–01415 – Customs Appeal Pack
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
  appealReferenceNumber: Yup.string().required("Required"),
  originalOrderRef: Yup.string().required("Required"),
  entityName: Yup.string().required("Required"),
  orderDate: Yup.date().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01413-01415",
  department: "Customs & Trade (Advanced)",
  function: "Customs Operations",

  /* 1. Reference Details */
  appealReferenceNumber: "",
  originalOrderRef: "",
  departmentName: "",
  preparedBy: "",
  date: "",

  /* 2. Entity & Case Details */
  entityName: "",
  iecNumber: "",
  gstin: "",
  orderAuthority: "",
  orderDate: "",
  amountInvolved: "",

  /* 3. Grounds of Appeal */
  summaryOfCase: "",
  groundsForAppeal: "",
  legalProvisionsReferenced: "",
  reliefSought: "",

  /* 4. Supporting Documents */
  documentsAttached: "",
  evidenceSummary: "",
  additionalNotes: "",

  /* 5. Risk & Assessment */
  riskLevel: "",
  potentialExposure: "",
  recommendedStrategy: "",

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

const FRM01413_CustomsAppealPack = () => {

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
    <ModernFormWrapper formId="FRM-01413-01415" title="Customs Appeal Pack">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Customs Appeal Pack Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01413–01415"
            title="FRM-01413–01415 — Customs Appeal Pack"
            department="Customs & Trade (Advanced) | Customs Operations"
          >

          {/* 1. Reference Details */}
          <div className="form-section">
            <h3 className="form-section-title">Reference Details</h3>
            <div className="form-fields">
              {field(values,"appealReferenceNumber","Appeal Reference Number")}
              {field(values,"originalOrderRef","Original Order / Notice Ref")}
              {field(values,"departmentName","Department")}
              {field(values,"preparedBy","Prepared By")}
              {field(values,"date","Date","date")}
            </div>
          </div>

          {/* 2. Entity & Case Details */}
          <div className="form-section">
            <h3 className="form-section-title">Entity & Case Details</h3>
            <div className="form-fields">
              {field(values,"entityName","Entity Name")}
              {field(values,"iecNumber","IEC Number")}
              {field(values,"gstin","GSTIN")}
              {field(values,"orderAuthority","Order Authority")}
              {field(values,"orderDate","Order Date","date")}
              {field(values,"amountInvolved","Amount Involved")}
            </div>
          </div>

          {/* 3. Grounds of Appeal */}
          <div className="form-section">
            <h3 className="form-section-title">Grounds of Appeal</h3>
            <div className="form-fields">
              {field(values,"summaryOfCase","Summary of Case","text",true)}
              {field(values,"groundsForAppeal","Grounds for Appeal","text",true)}
              {field(values,"legalProvisionsReferenced","Legal Provisions Referenced","text",true)}
              {field(values,"reliefSought","Relief Sought","text",true)}
            </div>
          </div>

          {/* 4. Supporting Documents */}
          <div className="form-section">
            <h3 className="form-section-title">Supporting Documents</h3>
            <div className="form-fields">
              {field(values,"documentsAttached","Documents Attached")}
              {field(values,"evidenceSummary","Evidence Summary","text",true)}
              {field(values,"additionalNotes","Additional Notes","text",true)}
            </div>
          </div>

          {/* 5. Risk & Assessment */}
          <div className="form-section">
            <h3 className="form-section-title">Risk & Assessment</h3>
            <div className="form-fields">
              {field(values,"riskLevel","Risk Level")}
              {field(values,"potentialExposure","Potential Exposure")}
              {field(values,"recommendedStrategy","Recommended Strategy","text",true)}
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
                  <option>Approved for Filing</option>
                  <option>Revision Required</option>
                  <option>Not Recommended</option>
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
                Submit Appeal Pack
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

export default FRM01413_CustomsAppealPack;