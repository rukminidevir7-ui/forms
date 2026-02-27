// FRM00797_OverheadAbsorptionRate.jsx
// FRM-00797 – Overhead Absorption Rate – Request / Initiation
// Enterprise Grade – Auto Calculation + Numeric Validation + Custom Signatures

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
  requestId: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  requestDate: Yup.string().required("Required"),
  effectiveDate: Yup.string().required("Required"),
  budgetedOverheads: Yup.number().typeError("Must be number").required("Required"),
  budgetedActivityLevel: Yup.number().typeError("Must be number").required("Required"),
  preparedBy: Yup.string().required("Required"),
  preparedDate: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  companyName: "",
  requestId: "",
  department: "",
  requestDate: "",
  effectiveDate: "",

  costPoolName: "",
  costCentersIncluded: "",
  absorptionMethod: "",
  driverBase: "",
  budgetedOverheads: "",
  budgetedActivityLevel: "",
  calculatedRate: "",
  frequency: "",
  effectivePeriod: "",

  impactProductCosting: "",
  impactMargins: "",
  assumptions: "",
  risksControls: "",
  status: "",

  supportingDocuments: "",
  policyReference: "",
  preparedBy: "",
  preparedDate: "",

  reviewedSignature: {},
  financeManagerSignature: {},
  financeControllerSignature: {},
  cfoSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00797_OverheadAbsorptionRate = () => {

  const { isPrintMode } = usePrintMode();

  const calculateRate = (overheads, activity) => {
    const o = parseFloat(overheads) || 0;
    const a = parseFloat(activity) || 0;
    if (a === 0) return 0;
    return (o / a).toFixed(4);
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
      formId="FRM-00797"
      title="Overhead Absorption Rate – Request"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Overhead Absorption Rate Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00797"
              title="OVERHEAD ABSORPTION RATE REQUEST"
              department="Finance & Accounting – Costing & Management Accounting"
            >

              {/* CONTROL HEADER */}
              <div className="form-section">
                <h3 className="form-section-title">Control Header</h3>
                <div className="form-fields">
                  {renderField(values,"companyName","Company Name")}
                  {renderField(values,"requestId","Request ID")}
                  {renderField(values,"department","Department / Process")}
                  {renderField(values,"requestDate","Request Date","date")}
                  {renderField(values,"effectiveDate","Effective Date","date")}
                </div>
              </div>

              {/* OVERHEAD RATE DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Overhead Rate Details</h3>
                <div className="form-fields">

                  {renderField(values,"costPoolName","Cost Pool Name")}
                  {renderField(values,"costCentersIncluded","Cost Centers Included")}
                  {renderField(values,"absorptionMethod","Absorption Method")}
                  {renderField(values,"driverBase","Driver / Allocation Base")}

                  <Field
                    name="budgetedOverheads"
                    type="number"
                    className="form-input"
                    placeholder="Budgeted Overheads"
                    onBlur={(e)=>{
                      const rate = calculateRate(
                        e.target.value,
                        values.budgetedActivityLevel
                      );
                      setFieldValue("calculatedRate", rate);
                    }}
                  />
                  <ErrorMessage name="budgetedOverheads" component="div" className="form-error"/>

                  <Field
                    name="budgetedActivityLevel"
                    type="number"
                    className="form-input"
                    placeholder="Budgeted Activity Level"
                    onBlur={(e)=>{
                      const rate = calculateRate(
                        values.budgetedOverheads,
                        e.target.value
                      );
                      setFieldValue("calculatedRate", rate);
                    }}
                  />
                  <ErrorMessage name="budgetedActivityLevel" component="div" className="form-error"/>

                  {isPrintMode
                    ? <div className="print-value">Calculated Rate: {values.calculatedRate}</div>
                    : <Field name="calculatedRate" readOnly className="form-input" placeholder="Calculated Rate"/>}

                  {renderField(values,"frequency","Frequency")}
                  {renderField(values,"effectivePeriod","Effective Period")}
                </div>
              </div>

              {/* FINANCIAL IMPACT & ASSESSMENT */}
              <div className="form-section">
                <h3 className="form-section-title">Financial Impact & Assessment</h3>
                <div className="form-fields">
                  {renderField(values,"impactProductCosting","Impact on Product Costing")}
                  {renderField(values,"impactMargins","Impact on Margins")}
                  {renderField(values,"assumptions","Assumptions")}
                  {renderField(values,"risksControls","Risks / Controls")}

                  {!isPrintMode ? (
                    <Field as="select" name="status" className="form-input">
                      <option value="">Status</option>
                      <option>Draft</option>
                      <option>Pending Approval</option>
                      <option>Approved</option>
                      <option>Rejected</option>
                    </Field>
                  ) : (
                    <div className="print-value">{values.status}</div>
                  )}
                </div>
              </div>

              {/* DOCUMENTATION & COMPLIANCE */}
              <div className="form-section">
                <h3 className="form-section-title">Documentation & Compliance</h3>
                <div className="form-fields">
                  {renderField(values,"supportingDocuments","Supporting Documents Attached (Y/N)")}
                  {renderField(values,"policyReference","Policy Reference")}
                  {renderField(values,"preparedBy","Prepared By")}
                  {renderField(values,"preparedDate","Prepared Date","date")}
                </div>
              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* APPROVAL WORKFLOW */}
              <div className="form-section">
                <h3 className="form-section-title">Approvals</h3>

                <div className="three-column-signatures">
                  <ApprovalSignatureBlock
                    label="Reviewed By"
                    value={values.reviewedSignature}
                    onChange={(val)=>setFieldValue("reviewedSignature",val)}
                  />
                  <ApprovalSignatureBlock
                    label="Finance Manager Approval"
                    value={values.financeManagerSignature}
                    onChange={(val)=>setFieldValue("financeManagerSignature",val)}
                  />
                  <ApprovalSignatureBlock
                    label="Finance Controller Approval"
                    value={values.financeControllerSignature}
                    onChange={(val)=>setFieldValue("financeControllerSignature",val)}
                  />
                </div>

                <div style={{marginTop:20}}>
                  <ApprovalSignatureBlock
                    label="CFO Approval"
                    value={values.cfoSignature}
                    onChange={(val)=>setFieldValue("cfoSignature",val)}
                  />
                </div>

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

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Overhead Rate Request
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

export default FRM00797_OverheadAbsorptionRate;
