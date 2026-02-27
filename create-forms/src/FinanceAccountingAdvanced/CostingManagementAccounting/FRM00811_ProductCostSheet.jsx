// FRM00811_ProductCostSheet.jsx
// FRM-00811 – Product Cost Sheet – Request / Initiation
// Enterprise Grade – Auto Total + Structured Layout + Numeric Enforcement

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
  costSheetId: Yup.string().required("Required"),
  costingPeriod: Yup.string().required("Required"),
  effectiveDate: Yup.string().required("Required"),
  productName: Yup.string().required("Required"),
  productCode: Yup.string().required("Required"),
  materialCost: Yup.number().typeError("Must be number").required("Required"),
  labourCost: Yup.number().typeError("Must be number").required("Required"),
  overheadCost: Yup.number().typeError("Must be number").required("Required"),
  otherCosts: Yup.number().typeError("Must be number").required("Required"),
  preparedBy: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  companyName: "",
  department: "",
  costSheetId: "",
  costingPeriod: "",
  effectiveDate: "",
  productName: "",
  productCode: "",
  plantLocation: "",

  materialCost: "",
  labourCost: "",
  overheadCost: "",
  otherCosts: "",
  totalCost: "",

  costingMethod: "",
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

const FRM00811_ProductCostSheet = () => {

  const { isPrintMode } = usePrintMode();

  const calculateTotal = (values) => {
    const m = parseFloat(values.materialCost) || 0;
    const l = parseFloat(values.labourCost) || 0;
    const o = parseFloat(values.overheadCost) || 0;
    const other = parseFloat(values.otherCosts) || 0;

    return (m + l + o + other).toFixed(2);
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
      formId="FRM-00811"
      title="Product Cost Sheet – Request"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Product Cost Sheet Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00811"
              title="PRODUCT COST SHEET"
              department="Finance & Accounting – Costing & Management Accounting"
            >

              {/* ================= MAIN FORM ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Product Cost Sheet Details</h3>
                <div className="form-fields">

                  {renderField(values,"companyName","Company Name")}
                  {renderField(values,"department","Department")}
                  {renderField(values,"costSheetId","Cost Sheet ID")}
                  {renderField(values,"costingPeriod","Costing Period")}
                  {renderField(values,"effectiveDate","Effective Date","date")}
                  {renderField(values,"productName","Product / Item Name")}
                  {renderField(values,"productCode","Product Code")}
                  {renderField(values,"plantLocation","Plant / Location")}

                  <Field
                    name="materialCost"
                    type="number"
                    className="form-input"
                    placeholder="Material Cost"
                    onBlur={()=>{
                      const total = calculateTotal(values);
                      setFieldValue("totalCost", total);
                    }}
                  />
                  <ErrorMessage name="materialCost" component="div" className="form-error"/>

                  <Field
                    name="labourCost"
                    type="number"
                    className="form-input"
                    placeholder="Labour Cost"
                    onBlur={()=>{
                      const total = calculateTotal(values);
                      setFieldValue("totalCost", total);
                    }}
                  />
                  <ErrorMessage name="labourCost" component="div" className="form-error"/>

                  <Field
                    name="overheadCost"
                    type="number"
                    className="form-input"
                    placeholder="Overhead Cost"
                    onBlur={()=>{
                      const total = calculateTotal(values);
                      setFieldValue("totalCost", total);
                    }}
                  />
                  <ErrorMessage name="overheadCost" component="div" className="form-error"/>

                  <Field
                    name="otherCosts"
                    type="number"
                    className="form-input"
                    placeholder="Other Costs"
                    onBlur={()=>{
                      const total = calculateTotal(values);
                      setFieldValue("totalCost", total);
                    }}
                  />
                  <ErrorMessage name="otherCosts" component="div" className="form-error"/>

                  {isPrintMode
                    ? <div className="print-value">Total Cost: {values.totalCost}</div>
                    : <Field name="totalCost" readOnly className="form-input" placeholder="Total Cost"/>}

                  {renderField(values,"costingMethod","Costing Method")}
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
                    Submit Product Cost Sheet
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

export default FRM00811_ProductCostSheet;
