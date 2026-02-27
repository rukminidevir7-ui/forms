// FRM00814_WorkInProgressValuation.jsx
// FRM-00814 – Work-in-Progress Valuation – Request / Initiation
// Enterprise Grade – Auto WIP Calculation + Structured Layout + Numeric Enforcement

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
  valuationId: Yup.string().required("Required"),
  valuationDate: Yup.string().required("Required"),
  costingPeriod: Yup.string().required("Required"),
  projectOrder: Yup.string().required("Required"),
  productItem: Yup.string().required("Required"),
  locationPlant: Yup.string().required("Required"),
  openingWip: Yup.number().typeError("Must be number").required("Required"),
  costsIncurred: Yup.number().typeError("Must be number").required("Required"),
  costCompleted: Yup.number().typeError("Must be number").required("Required"),
  preparedBy: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  companyName: "",
  department: "",
  valuationId: "",
  valuationDate: "",
  costingPeriod: "",
  projectOrder: "",
  productItem: "",
  locationPlant: "",

  openingWip: "",
  costsIncurred: "",
  costCompleted: "",
  closingWip: "",

  valuationMethod: "",
  basisAssumptions: "",
  impactAssessment: "",

  preparedBy: "",
  approvalDate: "",

  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00814_WorkInProgressValuation = () => {

  const { isPrintMode } = usePrintMode();

  const calculateClosingWip = (values) => {
    const opening = parseFloat(values.openingWip) || 0;
    const incurred = parseFloat(values.costsIncurred) || 0;
    const completed = parseFloat(values.costCompleted) || 0;

    return (opening + incurred - completed).toFixed(2);
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
      formId="FRM-00814"
      title="Work-in-Progress Valuation – Request"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("WIP Valuation Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00814"
              title="WORK-IN-PROGRESS VALUATION"
              department="Finance & Accounting – Costing & Management Accounting"
            >

              {/* ================= MAIN FORM ================= */}
              <div className="form-section">
                <h3 className="form-section-title">WIP Valuation Details</h3>
                <div className="form-fields">

                  {renderField(values,"companyName","Company Name")}
                  {renderField(values,"department","Department")}
                  {renderField(values,"valuationId","Valuation ID")}
                  {renderField(values,"valuationDate","Valuation Date","date")}
                  {renderField(values,"costingPeriod","Costing Period")}
                  {renderField(values,"projectOrder","Project / Production Order")}
                  {renderField(values,"productItem","Product / Item")}
                  {renderField(values,"locationPlant","Location / Plant")}

                  <Field
                    name="openingWip"
                    type="number"
                    className="form-input"
                    placeholder="Opening WIP Value"
                    onBlur={()=>{
                      const total = calculateClosingWip(values);
                      setFieldValue("closingWip", total);
                    }}
                  />
                  <ErrorMessage name="openingWip" component="div" className="form-error"/>

                  <Field
                    name="costsIncurred"
                    type="number"
                    className="form-input"
                    placeholder="Costs Incurred During Period"
                    onBlur={()=>{
                      const total = calculateClosingWip(values);
                      setFieldValue("closingWip", total);
                    }}
                  />
                  <ErrorMessage name="costsIncurred" component="div" className="form-error"/>

                  <Field
                    name="costCompleted"
                    type="number"
                    className="form-input"
                    placeholder="Cost of Goods Completed"
                    onBlur={()=>{
                      const total = calculateClosingWip(values);
                      setFieldValue("closingWip", total);
                    }}
                  />
                  <ErrorMessage name="costCompleted" component="div" className="form-error"/>

                  {isPrintMode
                    ? <div className="print-value">Closing WIP: {values.closingWip}</div>
                    : <Field name="closingWip" readOnly className="form-input" placeholder="Closing WIP Value"/>}

                  {renderField(values,"valuationMethod","Valuation Method")}
                  {renderField(values,"basisAssumptions","Basis / Assumptions")}
                  {renderField(values,"impactAssessment","Impact Assessment")}
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
                    Submit WIP Valuation
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

export default FRM00814_WorkInProgressValuation;
