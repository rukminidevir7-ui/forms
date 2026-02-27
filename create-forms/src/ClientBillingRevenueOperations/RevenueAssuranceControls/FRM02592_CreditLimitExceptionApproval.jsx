// FRM02592_CreditLimitExceptionApproval.jsx
// FRM-02592 – Credit Limit Exception Approval
// Enterprise Grade – Client Billing & Revenue Operations – Revenue Assurance & Controls

import React, { useEffect } from "react";
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
  requestDate: Yup.date().required("Required"),
  customerName: Yup.string().required("Required"),
  currentCreditLimit: Yup.number().required("Required"),
  proposedCreditLimit: Yup.number().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02592",
  department: "Client Billing & Revenue Operations",
  function: "Revenue Assurance & Controls",

  /* 1. Exception Reference */
  exceptionReferenceNo: "",
  requestDate: "",
  requestedBy: "",
  businessUnit: "",
  priorityLevel: "",

  /* 2. Customer Details */
  customerName: "",
  customerCode: "",
  industry: "",
  accountManager: "",

  /* 3. Credit Details */
  currentCreditLimit: "",
  proposedCreditLimit: "",
  outstandingBalance: "",
  creditUtilization: "",
  effectiveDate: "",

  /* 4. Justification */
  businessJustification: "",
  riskAssessment: "",
  financialExposure: "",
  mitigationMeasures: "",

  /* 5. Decision */
  decision: "",
  conditions: "",
  approvalNotes: "",

  /* 6. Sign-off */
  approvalRoles: [
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02592_CreditLimitExceptionApproval = () => {

  const { isPrintMode } = usePrintMode();

  const calculateUtilization = (values, setFieldValue) => {
    const limit = Number(values.currentCreditLimit || 0);
    const outstanding = Number(values.outstandingBalance || 0);

    const utilization = limit !== 0
      ? ((outstanding / limit) * 100).toFixed(2)
      : 0;

    setFieldValue("creditUtilization", utilization);
  };

  const field = (values, name, label, type="text", readOnly=false) => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : <>
            <Field
              name={name}
              type={type}
              className="form-input"
              readOnly={readOnly}
            />
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-02592" title="Credit Limit Exception Approval">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Credit Limit Exception Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>{

        useEffect(()=>{
          calculateUtilization(values,setFieldValue);
        },[values.currentCreditLimit, values.outstandingBalance]);

        return(
        <Form>
          <ModernA4Template
            formId="FRM-02592"
            title="FRM-02592 — Credit Limit Exception Approval"
            department="Client Billing & Revenue Operations | Revenue Assurance & Controls"
          >

          {/* 1. Exception Reference */}
          <div className="form-section">
            <h3 className="form-section-title">Exception Reference</h3>
            <div className="form-fields">
              {field(values,"exceptionReferenceNo","Exception Reference No")}
              {field(values,"requestDate","Request Date","date")}
              {field(values,"requestedBy","Requested By")}
              {field(values,"businessUnit","Business Unit")}
              {field(values,"priorityLevel","Priority Level")}
            </div>
          </div>

          {/* 2. Customer Details */}
          <div className="form-section">
            <h3 className="form-section-title">Customer Details</h3>
            <div className="form-fields">
              {field(values,"customerName","Customer Name")}
              {field(values,"customerCode","Customer Code")}
              {field(values,"industry","Industry")}
              {field(values,"accountManager","Account Manager")}
            </div>
          </div>

          {/* 3. Credit Details */}
          <div className="form-section">
            <h3 className="form-section-title">Credit Details</h3>
            <div className="form-fields">
              {field(values,"currentCreditLimit","Current Credit Limit","number")}
              {field(values,"proposedCreditLimit","Proposed Credit Limit","number")}
              {field(values,"outstandingBalance","Outstanding Balance","number")}
              {field(values,"creditUtilization","Credit Utilization %","number",true)}
              {field(values,"effectiveDate","Effective Date","date")}
            </div>
          </div>

          {/* 4. Justification & Risk */}
          <div className="form-section">
            <h3 className="form-section-title">Justification & Risk Assessment</h3>
            <div className="form-fields">
              {field(values,"businessJustification","Business Justification")}
              {field(values,"riskAssessment","Risk Assessment")}
              {field(values,"financialExposure","Financial Exposure")}
              {field(values,"mitigationMeasures","Mitigation Measures")}
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

              {field(values,"conditions","Conditions")}
              {field(values,"approvalNotes","Approval Notes")}
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
                Submit Credit Limit Exception
              </button>
            </div>
          }

          </ModernA4Template>
        </Form>
        );
      }}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM02592_CreditLimitExceptionApproval;