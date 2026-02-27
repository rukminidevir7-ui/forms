// FRM02587_BillingVarianceExplanation.jsx
// FRM-02587 – Billing Variance Explanation
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
  varianceReferenceNo: Yup.string().required("Required"),
  reviewPeriod: Yup.string().required("Required"),
  businessUnit: Yup.string().required("Required"),
  clientName: Yup.string().required("Required"),
  invoiceNo: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02587",
  department: "Client Billing & Revenue Operations",
  function: "Revenue Assurance & Controls",

  /* 1. Reference */
  varianceReferenceNo: "",
  reviewPeriod: "",
  businessUnit: "",
  preparedBy: "",
  date: "",

  /* 2. Billing Context */
  clientName: "",
  clientCode: "",
  invoiceNo: "",
  invoiceDate: "",
  expectedAmount: "",
  actualAmount: "",

  /* 3. Variance Analysis */
  varianceAmount: "",
  variancePercentage: "",
  varianceCategory: "",
  rootCause: "",
  impact: "",

  /* 4. Explanation */
  detailedExplanation: "",
  supportingInformation: "",
  correctiveAction: "",

  /* 5. Approval */
  approvalRoles: [
    { roleName:"Reviewed By", data:{} },
    { roleName:"Approved By", data:{} }
  ],
  approvalDate: "",
  comments: ""
};

/* ================= COMPONENT ================= */

const FRM02587_BillingVarianceExplanation = () => {

  const { isPrintMode } = usePrintMode();

  const calculateVariance = (values,setFieldValue)=>{
    const expected = Number(values.expectedAmount || 0);
    const actual = Number(values.actualAmount || 0);

    const variance = actual - expected;
    const percentage = expected !== 0 
      ? ((variance / expected) * 100).toFixed(2)
      : 0;

    setFieldValue("varianceAmount", variance.toFixed(2));
    setFieldValue("variancePercentage", percentage);
  };

  const field = (values,name,label,type="text",onBlurHandler=null)=>(
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name]||"_________"}</div>
        : <>
            <Field name={name} type={type} className="form-input" onBlur={onBlurHandler}/>
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return(
    <ModernFormWrapper formId="FRM-02587" title="Billing Variance Explanation">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Billing Variance Explanation Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>{

        useEffect(()=>{
          calculateVariance(values,setFieldValue);
        },[values.expectedAmount, values.actualAmount]);

        return(
        <Form>
          <ModernA4Template
            formId="FRM-02587"
            title="FRM-02587 — Billing Variance Explanation"
            department="Client Billing & Revenue Operations | Revenue Assurance & Controls"
          >

          {/* 1. Reference */}
          <div className="form-section">
            <h3 className="form-section-title">Reference Details</h3>
            <div className="form-fields">
              {field(values,"varianceReferenceNo","Variance Reference No")}
              {field(values,"reviewPeriod","Review Period")}
              {field(values,"businessUnit","Business Unit")}
              {field(values,"preparedBy","Prepared By")}
              {field(values,"date","Date","date")}
            </div>
          </div>

          {/* 2. Billing Context */}
          <div className="form-section">
            <h3 className="form-section-title">Billing Context</h3>
            <div className="form-fields">
              {field(values,"clientName","Client Name")}
              {field(values,"clientCode","Client Code")}
              {field(values,"invoiceNo","Invoice No")}
              {field(values,"invoiceDate","Invoice Date","date")}
              {field(values,"expectedAmount","Expected Amount","number",
                ()=>calculateVariance(values,setFieldValue))}
              {field(values,"actualAmount","Actual Amount","number",
                ()=>calculateVariance(values,setFieldValue))}
            </div>
          </div>

          {/* 3. Variance Analysis */}
          <div className="form-section">
            <h3 className="form-section-title">Variance Analysis</h3>
            <div className="form-fields">
              {field(values,"varianceAmount","Variance Amount")}
              {field(values,"variancePercentage","Variance Percentage (%)")}
              {field(values,"varianceCategory","Variance Category")}
              {field(values,"rootCause","Root Cause")}
              {field(values,"impact","Impact")}
            </div>
          </div>

          {/* 4. Explanation */}
          <div className="form-section">
            <h3 className="form-section-title">Explanation & Notes</h3>
            <div className="form-fields">
              {field(values,"detailedExplanation","Detailed Explanation")}
              {field(values,"supportingInformation","Supporting Information")}
              {field(values,"correctiveAction","Corrective Action")}
            </div>
          </div>

          <FormAttachments values={values}/>
          <FormCustomFields values={values}/>

          {/* 5. Approval */}
          <div className="form-section">
            <h3 className="form-section-title">Approval & Sign-off</h3>

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
                      <button type="button" onClick={()=>remove(index)}>Remove</button>}
                  </div>
                ))}
              </div>
              </>
            )}
            </FieldArray>

            {field(values,"approvalDate","Approval Date","date")}
            {field(values,"comments","Comments")}
          </div>

          {!isPrintMode &&
            <div className="form-actions">
              <button type="submit" className="btn-submit">
                Submit Billing Variance Explanation
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

export default FRM02587_BillingVarianceExplanation;