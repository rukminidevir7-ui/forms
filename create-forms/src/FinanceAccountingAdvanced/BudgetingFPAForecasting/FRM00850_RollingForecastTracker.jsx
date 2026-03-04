// FRM00850_RollingForecastTracker.jsx
// FRM-00850 – Rolling Forecast Tracker – Log / Register
// Enterprise Governance Grade

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
  formId: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  forecastId: Yup.string().required("Required"),
  forecastPeriod: Yup.string().required("Required"),
  preparedBy: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "",
  department: "",
  process: "",
  formType: "",
  version: "",
  effectiveDate: "",

  forecastId: "",
  forecastPeriod: "",
  forecastCycle: "",
  versionNumber: "",
  revisionNumber: "",
  forecastStatus: "",

  businessUnit: "",
  division: "",
  costCenter: "",
  project: "",
  location: "",

  revenueForecast: "",
  opexForecast: "",
  capexForecast: "",
  grossMarginForecast: "",
  ebitdaForecast: "",
  cashFlowForecast: "",
  totalForecastAmount: "",

  previousForecastAmount: "",
  currentForecastAmount: "",
  varianceAmount: "",
  variancePercent: "",
  varianceReason: "",

  keyAssumptions: "",
  keyDrivers: "",
  risksIdentified: "",
  opportunitiesIdentified: "",
  externalFactors: "",

  preparedDate: "",
  submissionDate: "",
  reviewDate: "",
  approvalDate: "",
  nextUpdateDate: "",

  preparedBy: "",
  reviewedBy: "",
  approvedBy: "",

  changeDescription: "",
  changeReason: "",
  impactAssessment: "",
  complianceCheck: "",
  auditReferenceId: "",
  comments: "",
  financeComments: "",
  managementComments: "",
  additionalNotes: "",

  preparedSignature: {},
  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00850_RollingForecastTracker = () => {

  const { isPrintMode } = usePrintMode();

  const calculateVariance = (previous, current) => {
    const p = parseFloat(previous) || 0;
    const c = parseFloat(current) || 0;
    const variance = c - p;
    const percent = p !== 0 ? ((variance / p) * 100).toFixed(2) : 0;
    return { variance: variance.toFixed(2), percent };
  };

  const renderField = (values, name, label, type="text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || "_________"}</div>
      ) : (
        <>
          <Field name={name} type={type} className="form-input" />
          <ErrorMessage name={name} component="div" className="form-error"/>
        </>
      )}
    </div>
  );

  return (
    <ModernFormWrapper
      formId="FRM-00850"
      title="Rolling Forecast Tracker"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Rolling Forecast Tracker Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00850"
              title="ROLLING FORECAST TRACKER"
              department="Finance & Accounting – Budgeting, FP&A & Forecasting"
            >

              {/* ================= CORE INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Core Information</h3>
                <div className="form-fields">
                  {renderField(values,"formId","Form ID")}
                  {renderField(values,"department","Department")}
                  {renderField(values,"process","Process")}
                  {renderField(values,"formType","Form Type")}
                  {renderField(values,"version","Version")}
                  {renderField(values,"effectiveDate","Effective Date","date")}
                </div>
              </div>

              {/* ================= FINANCIAL SUMMARY ================= */}
<div className="form-section">
  <h3 className="form-section-title">Financial Summary</h3>
  <div className="form-fields">

    {renderField(values,"revenueForecast","Revenue Forecast","number")}
    {renderField(values,"opexForecast","Opex Forecast","number")}
    {renderField(values,"capexForecast","Capex Forecast","number")}
    {renderField(values,"grossMarginForecast","Gross Margin Forecast","number")}
    {renderField(values,"ebitdaForecast","EBITDA Forecast","number")}
    {renderField(values,"cashFlowForecast","Cash Flow Forecast","number")}
    {renderField(values,"totalForecastAmount","Total Forecast Amount","number")}

  </div>
</div>
              {/* ================= VARIANCE TRACKING ================= */}
<div className="form-section">
  <h3 className="form-section-title">Variance Tracking</h3>
  <div className="form-fields">

    {renderField(values,"previousForecastAmount","Previous Forecast Amount","number")}

    <div className="form-field">
      <label className="form-label">Current Forecast Amount</label>
      {isPrintMode ? (
        <div className="print-value">{values.currentForecastAmount || "_________"}</div>
      ) : (
        <>
          <Field
            name="currentForecastAmount"
            type="number"
            className="form-input"
            onBlur={(e)=>{
              const result = calculateVariance(
                values.previousForecastAmount,
                e.target.value
              );
              setFieldValue("varianceAmount",result.variance);
              setFieldValue("variancePercent",result.percent);
            }}
          />
        </>
      )}
    </div>

    {renderField(values,"varianceAmount","Variance Amount","number")}
    {renderField(values,"variancePercent","Variance %","number")}
    {renderField(values,"varianceReason","Variance Reason")}

  </div>
</div>

             {/* ================= ASSUMPTIONS ================= */}
<div className="form-section">
  <h3 className="form-section-title">Assumptions & Drivers</h3>
  <div className="form-fields">

    {renderField(values,"keyAssumptions","Key Assumptions")}
    {renderField(values,"keyDrivers","Key Business Drivers")}
    {renderField(values,"risksIdentified","Risks Identified")}
    {renderField(values,"opportunitiesIdentified","Opportunities Identified")}
    {renderField(values,"externalFactors","External Factors")}

  </div>
</div>{/* ================= GOVERNANCE ================= */}
<div className="form-section">
  <h3 className="form-section-title">Governance & Compliance</h3>
  <div className="form-fields">

    {renderField(values,"changeDescription","Change Description")}
    {renderField(values,"changeReason","Change Reason")}
    {renderField(values,"impactAssessment","Impact Assessment")}
    {renderField(values,"complianceCheck","Compliance Check")}
    {renderField(values,"auditReferenceId","Audit Reference ID")}
    {renderField(values,"comments","Comments")}
    {renderField(values,"financeComments","Finance Comments")}
    {renderField(values,"managementComments","Management Comments")}
    {renderField(values,"additionalNotes","Additional Notes")}

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
                    label="Prepared By"
                    value={values.preparedSignature}
                    onChange={(val)=>setFieldValue("preparedSignature",val)}
                  />
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
              <div className="form-section">
                {!isPrintMode && (
                  <button
                    type="button"
                    className="btn-submit"
                    onClick={()=>
                      setFieldValue("additionalSignatures",
                        [...values.additionalSignatures,{data:{}}])
                    }
                  >
                    + Add Custom Signature
                  </button>
                )}

                {values.additionalSignatures.map((sig,index)=>(
                  <div key={index} style={{ marginTop:10 }}>
                    <ApprovalSignatureBlock
                      label={`Custom Signature ${index+1}`}
                      value={sig.data || {}}
                      onChange={(val)=>
                        setFieldValue(`additionalSignatures.${index}.data`,val)
                      }
                    />
                    {!isPrintMode && (
                      <button
                        type="button"
                        onClick={()=>{
                          const updated = values.additionalSignatures.filter((_,i)=>i!==index);
                          setFieldValue("additionalSignatures",updated);
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* ================= SUBMIT ================= */}
              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Rolling Forecast Tracker
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

export default FRM00850_RollingForecastTracker;
