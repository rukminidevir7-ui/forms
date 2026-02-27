// FRM00800_StandardCostSetup.jsx
// FRM-00800 – Standard Cost Setup – Report / Record
// Enterprise Grade – Auto Calculation + Compliance + Custom Signatures

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
  costingPeriod: Yup.string().required("Required"),
  effectiveDate: Yup.string().required("Required"),
  productItem: Yup.string().required("Required"),
  costElement: Yup.string().required("Required"),
  materialCost: Yup.number().typeError("Must be number").required("Required"),
  laborCost: Yup.number().typeError("Must be number").required("Required"),
  overheadCost: Yup.number().typeError("Must be number").required("Required"),
  preparedBy: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  companyName: "",
  department: "",
  costingPeriod: "",
  effectiveDate: "",
  productItem: "",
  costElement: "",
  materialCost: "",
  laborCost: "",
  overheadCost: "",
  totalStandardCost: "",
  basisAssumptions: "",

  preparedBy: "",
  reviewedSignature: {},
  approvedSignature: {},
  approvalDate: "",
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00800_StandardCostSetup = () => {

  const { isPrintMode } = usePrintMode();

  const calculateTotal = (material, labor, overhead) => {
    const m = parseFloat(material) || 0;
    const l = parseFloat(labor) || 0;
    const o = parseFloat(overhead) || 0;
    return (m + l + o).toFixed(2);
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
      formId="FRM-00800"
      title="Standard Cost Setup – Report"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Standard Cost Setup Recorded Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00800"
              title="STANDARD COST SETUP RECORD"
              department="Finance & Accounting – Costing & Management Accounting"
            >

              {/* BASIC INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">Standard Cost Setup</h3>
                <div className="form-fields">
                  {renderField(values,"companyName","Company Name")}
                  {renderField(values,"department","Department")}
                  {renderField(values,"costingPeriod","Costing Period")}
                  {renderField(values,"effectiveDate","Effective Date","date")}
                  {renderField(values,"productItem","Product / Item")}
                  {renderField(values,"costElement","Cost Element")}
                </div>
              </div>

              {/* COST DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Cost Components</h3>
                <div className="form-fields">

                  <Field
                    name="materialCost"
                    type="number"
                    className="form-input"
                    placeholder="Material Cost"
                    onBlur={(e)=>{
                      const total = calculateTotal(
                        e.target.value,
                        values.laborCost,
                        values.overheadCost
                      );
                      setFieldValue("totalStandardCost", total);
                    }}
                  />
                  <ErrorMessage name="materialCost" component="div" className="form-error"/>

                  <Field
                    name="laborCost"
                    type="number"
                    className="form-input"
                    placeholder="Labor Cost"
                    onBlur={(e)=>{
                      const total = calculateTotal(
                        values.materialCost,
                        e.target.value,
                        values.overheadCost
                      );
                      setFieldValue("totalStandardCost", total);
                    }}
                  />
                  <ErrorMessage name="laborCost" component="div" className="form-error"/>

                  <Field
                    name="overheadCost"
                    type="number"
                    className="form-input"
                    placeholder="Overhead Cost"
                    onBlur={(e)=>{
                      const total = calculateTotal(
                        values.materialCost,
                        values.laborCost,
                        e.target.value
                      );
                      setFieldValue("totalStandardCost", total);
                    }}
                  />
                  <ErrorMessage name="overheadCost" component="div" className="form-error"/>

                  {isPrintMode
                    ? <div className="print-value">Total Standard Cost: {values.totalStandardCost}</div>
                    : <Field name="totalStandardCost" readOnly className="form-input" placeholder="Total Standard Cost"/>}

                  {renderField(values,"basisAssumptions","Basis / Assumptions")}

                </div>
              </div>

              {/* SIGN-OFF */}
              <div className="form-section">
                <h3 className="form-section-title">Sign-Off</h3>
                <div className="form-fields">
                  {renderField(values,"preparedBy","Prepared By")}
                  {renderField(values,"approvalDate","Approval Date","date")}
                </div>

                <div className="three-column-signatures" style={{marginTop:20}}>
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

                {/* Custom Signatures */}
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

              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Save Standard Cost Record
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

export default FRM00800_StandardCostSetup;
