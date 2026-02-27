// FRM00823_ScrapCostAnalysis.jsx
// FRM-00823 – Scrap Cost Analysis – Request / Initiation
// Enterprise Grade – Auto Scrap Cost Calculation + Numeric Enforcement

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
  companyName: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  analysisId: Yup.string().required("Required"),
  analysisDate: Yup.string().required("Required"),
  costingPeriod: Yup.string().required("Required"),
  plantLocation: Yup.string().required("Required"),
  productProcess: Yup.string().required("Required"),
  scrapCategory: Yup.string().required("Required"),
  standardScrapQty: Yup.number().typeError("Must be number").required("Required"),
  actualScrapQty: Yup.number().typeError("Must be number").required("Required"),
  scrapRate: Yup.number().typeError("Must be number").required("Required"),
  preparedBy: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  companyName: "",
  department: "",
  analysisId: "",
  analysisDate: "",
  costingPeriod: "",
  plantLocation: "",
  productProcess: "",
  scrapCategory: "",

  standardScrapQty: "",
  actualScrapQty: "",
  scrapRate: "",
  totalScrapCost: "",

  rootCause: "",
  correctiveAction: "",
  financialImpact: "",
  operationalImpact: "",

  preparedBy: "",
  approvalDate: "",

  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00823_ScrapCostAnalysis = () => {

  const { isPrintMode } = usePrintMode();

  const calculateTotalScrapCost = (values) => {
    const qty = parseFloat(values.actualScrapQty) || 0;
    const rate = parseFloat(values.scrapRate) || 0;
    return (qty * rate).toFixed(2);
  };

  const renderField = (values, name, label, type="text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || "_________"}</div>
      ) : (
        <>
          <Field name={name} type={type} className="form-input"/>
          <ErrorMessage name={name} component="div" className="form-error"/>
        </>
      )}
    </div>
  );

  return (
    <ModernFormWrapper
      formId="FRM-00823"
      title="Scrap Cost Analysis – Request"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Scrap Cost Analysis Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00823"
              title="SCRAP COST ANALYSIS"
              department="Finance & Accounting – Costing & Management Accounting"
            >

              {/* ================= MAIN FORM ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Scrap Analysis Details</h3>
                <div className="form-fields">

                  {renderField(values,"companyName","Company Name")}
                  {renderField(values,"department","Department")}
                  {renderField(values,"analysisId","Analysis ID")}
                  {renderField(values,"analysisDate","Analysis Date","date")}
                  {renderField(values,"costingPeriod","Costing Period")}
                  {renderField(values,"plantLocation","Plant / Location")}
                  {renderField(values,"productProcess","Product / Process")}
                  {renderField(values,"scrapCategory","Scrap Category")}

                  <Field name="standardScrapQty" type="number" className="form-input" placeholder="Standard Scrap Quantity"/>
                  <ErrorMessage name="standardScrapQty" component="div" className="form-error"/>

                  <Field
                    name="actualScrapQty"
                    type="number"
                    className="form-input"
                    placeholder="Actual Scrap Quantity"
                    onBlur={()=>{
                      const total = calculateTotalScrapCost(values);
                      setFieldValue("totalScrapCost", total);
                    }}
                  />
                  <ErrorMessage name="actualScrapQty" component="div" className="form-error"/>

                  <Field
                    name="scrapRate"
                    type="number"
                    className="form-input"
                    placeholder="Scrap Rate / Value"
                    onBlur={()=>{
                      const total = calculateTotalScrapCost(values);
                      setFieldValue("totalScrapCost", total);
                    }}
                  />
                  <ErrorMessage name="scrapRate" component="div" className="form-error"/>

                  {isPrintMode
                    ? <div className="print-value">Total Scrap Cost: {values.totalScrapCost}</div>
                    : <Field name="totalScrapCost" readOnly className="form-input" placeholder="Total Scrap Cost"/>}

                  {renderField(values,"rootCause","Root Cause")}
                  {renderField(values,"correctiveAction","Corrective / Preventive Action")}
                  {renderField(values,"financialImpact","Financial Impact")}
                  {renderField(values,"operationalImpact","Operational Impact")}
                  {renderField(values,"preparedBy","Prepared By")}
                  {renderField(values,"approvalDate","Approval Date","date")}

                </div>
              </div>

              {/* ================= CUSTOM FIELDS ================= */}
              <FormCustomFields values={values}/>

              {/* ================= ATTACHMENTS ================= */}
              <FormAttachments values={values}/>

              {/* ================= SIGNATURES ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Signatures</h3>

                <div className="three-column-signatures">
                  <ApprovalSignatureBlock
                    label="Reviewed By"
                    value={values.reviewedSignature}
                    onChange={(val)=>setFieldValue("reviewedSignature",val)}
                  />
                  <ApprovalSignatureBlock
                    label="Approved By"
                    value={values.approvedSignature}
                    onChange={(val)=>setFieldValue("approvedSignature",val)}
                  />
                </div>
              </div>

              {/* ================= CUSTOM SIGNATURES ================= */}
              <FieldArray name="additionalSignatures">
                {({ push, remove })=>(
                  <>
                    {!isPrintMode && (
                      <button type="button" className="btn-submit" onClick={()=>push({data:{}})}>
                        + Add Custom Signature
                      </button>
                    )}
                    {values.additionalSignatures.map((sig,index)=>(
                      <div key={index}>
                        <ApprovalSignatureBlock
                          label={`Custom Signature ${index+1}`}
                          value={sig.data||{}}
                          onChange={(val)=>setFieldValue(`additionalSignatures.${index}.data`,val)}
                        />
                        {!isPrintMode && (
                          <button type="button" onClick={()=>remove(index)}>Remove</button>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </FieldArray>

              {/* ================= SUBMIT ================= */}
              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Scrap Analysis
                  </button>
                </div>
              )}

            </ModernA4Template>

          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00823_ScrapCostAnalysis;
