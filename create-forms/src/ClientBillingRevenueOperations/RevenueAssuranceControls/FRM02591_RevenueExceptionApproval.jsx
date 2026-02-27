// FRM02591_RevenueExceptionApproval.jsx
// FRM-02591 – Revenue Exception Approval
// Enterprise Grade – Client Billing & Revenue Operations – Revenue Assurance & Controls

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
  exceptionReferenceNo: Yup.string().required("Required"),
  exceptionType: Yup.string().required("Required"),
  businessUnit: Yup.string().required("Required"),
  requestDate: Yup.date().required("Required"),
  clientName: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02591",
  department: "Client Billing & Revenue Operations",
  function: "Revenue Assurance & Controls",

  /* 1. Exception Reference */
  exceptionReferenceNo: "",
  exceptionType: "",
  businessUnit: "",
  requestedBy: "",
  requestDate: "",

  /* 2. Context */
  clientName: "",
  clientCode: "",
  projectContract: "",
  invoiceTransactionRef: "",
  amountImpacted: "",
  currency: "",

  /* 3. Description */
  descriptionOfException: "",
  justification: "",
  riskAssessment: "",
  financialImpact: "",

  /* 4. Mitigation */
  mitigationPlan: "",
  controlOverrides: "",
  monitoringPlan: "",

  /* 5. Decision */
  decision: "",
  approvalNotes: "",
  conditions: "",

  /* 6. Sign-off */
  approvalRoles: [
    { roleName:"Reviewed By", data:{} },
    { roleName:"Approved By", data:{} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02591_RevenueExceptionApproval = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values,name,label,type="text")=>(
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name]||"_________"}</div>
        : <>
            <Field name={name} type={type} className="form-input"/>
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return(
    <ModernFormWrapper formId="FRM-02591" title="Revenue Exception Approval">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Revenue Exception Approval Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-02591"
            title="FRM-02591 — Revenue Exception Approval"
            department="Client Billing & Revenue Operations | Revenue Assurance & Controls"
          >

          {/* 1. Exception Reference */}
          <div className="form-section">
            <h3 className="form-section-title">Exception Reference</h3>
            <div className="form-fields">
              {field(values,"exceptionReferenceNo","Exception Reference No")}
              {field(values,"exceptionType","Exception Type")}
              {field(values,"businessUnit","Business Unit")}
              {field(values,"requestedBy","Requested By")}
              {field(values,"requestDate","Request Date","date")}
            </div>
          </div>

          {/* 2. Context */}
          <div className="form-section">
            <h3 className="form-section-title">Context Details</h3>
            <div className="form-fields">
              {field(values,"clientName","Client Name")}
              {field(values,"clientCode","Client Code")}
              {field(values,"projectContract","Project / Contract")}
              {field(values,"invoiceTransactionRef","Invoice / Transaction Ref")}
              {field(values,"amountImpacted","Amount Impacted","number")}
              {field(values,"currency","Currency")}
            </div>
          </div>

          {/* 3. Description */}
          <div className="form-section">
            <h3 className="form-section-title">Exception Description</h3>
            <div className="form-fields">
              {field(values,"descriptionOfException","Description of Exception")}
              {field(values,"justification","Reason / Justification")}
              {field(values,"riskAssessment","Risk Assessment")}
              {field(values,"financialImpact","Financial Impact")}
            </div>
          </div>

          {/* 4. Mitigation */}
          <div className="form-section">
            <h3 className="form-section-title">Mitigation & Controls</h3>
            <div className="form-fields">
              {field(values,"mitigationPlan","Mitigation Plan")}
              {field(values,"controlOverrides","Control Overrides")}
              {field(values,"monitoringPlan","Monitoring Plan")}
            </div>
          </div>

          {/* 5. Decision */}
          <div className="form-section">
            <h3 className="form-section-title">Decision</h3>
            <div className="form-fields">
              <div className="form-field">
                <label className="form-label">Decision</label>
                {!isPrintMode ? (
                  <Field as="select" name="decision" className="form-input">
                    <option value="">Select</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                    <option>Conditional</option>
                  </Field>
                ) : (
                  <div className="print-value">{values.decision || "_________"}</div>
                )}
              </div>

              {field(values,"approvalNotes","Approval Notes")}
              {field(values,"conditions","Conditions")}
            </div>
          </div>

          <FormAttachments values={values}/>
          <FormCustomFields values={values}/>

          {/* 6. Sign-off */}
          <div className="form-section">
            <h3 className="form-section-title">Sign-off</h3>

            <FieldArray name="approvalRoles">
            {({push,remove})=>(
              <>
              {!isPrintMode &&
                <button
                  type="button"
                  className="btn-submit"
                  onClick={()=>push({roleName:"New Role",data:{}})}
                >
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
                Submit Revenue Exception
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

export default FRM02591_RevenueExceptionApproval;