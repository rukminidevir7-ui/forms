// FRM00817_InventoryValuationWorking.jsx
// FRM-00817 – Inventory Valuation Working – Report / Record
// Enterprise Grade – Auto Closing Calculation + Structured Layout + Numeric Enforcement

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
  warehouseLocation: Yup.string().required("Required"),
  inventoryCategory: Yup.string().required("Required"),
  openingInventory: Yup.number().typeError("Must be number").required("Required"),
  purchases: Yup.number().typeError("Must be number").required("Required"),
  issues: Yup.number().typeError("Must be number").required("Required"),
  adjustments: Yup.number().typeError("Must be number").required("Required"),
  preparedBy: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  companyName: "",
  department: "",
  valuationId: "",
  valuationDate: "",
  costingPeriod: "",
  warehouseLocation: "",
  inventoryCategory: "",

  openingInventory: "",
  purchases: "",
  issues: "",
  adjustments: "",
  closingInventory: "",

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

const FRM00817_InventoryValuationWorking = () => {

  const { isPrintMode } = usePrintMode();

  const calculateClosingInventory = (values) => {
    const opening = parseFloat(values.openingInventory) || 0;
    const purchases = parseFloat(values.purchases) || 0;
    const issues = parseFloat(values.issues) || 0;
    const adjustments = parseFloat(values.adjustments) || 0;

    return (opening + purchases - issues + adjustments).toFixed(2);
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
      formId="FRM-00817"
      title="Inventory Valuation Working – Report"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Inventory Valuation Recorded Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00817"
              title="INVENTORY VALUATION WORKING"
              department="Finance & Accounting – Costing & Management Accounting"
            >

              {/* ================= MAIN FORM ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Inventory Valuation Details</h3>
                <div className="form-fields">

                  {renderField(values,"companyName","Company Name")}
                  {renderField(values,"department","Department")}
                  {renderField(values,"valuationId","Valuation ID")}
                  {renderField(values,"valuationDate","Valuation Date","date")}
                  {renderField(values,"costingPeriod","Costing Period")}
                  {renderField(values,"warehouseLocation","Warehouse / Location")}
                  {renderField(values,"inventoryCategory","Inventory Category")}

                  <Field
                    name="openingInventory"
                    type="number"
                    className="form-input"
                    placeholder="Opening Inventory Value"
                    onBlur={()=>{
                      const total = calculateClosingInventory(values);
                      setFieldValue("closingInventory", total);
                    }}
                  />
                  <ErrorMessage name="openingInventory" component="div" className="form-error"/>

                  <Field
                    name="purchases"
                    type="number"
                    className="form-input"
                    placeholder="Purchases / Additions"
                    onBlur={()=>{
                      const total = calculateClosingInventory(values);
                      setFieldValue("closingInventory", total);
                    }}
                  />
                  <ErrorMessage name="purchases" component="div" className="form-error"/>

                  <Field
                    name="issues"
                    type="number"
                    className="form-input"
                    placeholder="Issues / Consumption"
                    onBlur={()=>{
                      const total = calculateClosingInventory(values);
                      setFieldValue("closingInventory", total);
                    }}
                  />
                  <ErrorMessage name="issues" component="div" className="form-error"/>

                  <Field
                    name="adjustments"
                    type="number"
                    className="form-input"
                    placeholder="Adjustments"
                    onBlur={()=>{
                      const total = calculateClosingInventory(values);
                      setFieldValue("closingInventory", total);
                    }}
                  />
                  <ErrorMessage name="adjustments" component="div" className="form-error"/>

                  {isPrintMode
                    ? <div className="print-value">Closing Inventory: {values.closingInventory}</div>
                    : <Field name="closingInventory" readOnly className="form-input" placeholder="Closing Inventory Value"/>}

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
                    Save Inventory Valuation
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

export default FRM00817_InventoryValuationWorking;
