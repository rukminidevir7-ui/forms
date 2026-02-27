// FRM00794_CostAllocationBasis.jsx
// FRM-00794 – Cost Allocation Basis – Request / Initiation
// Enterprise Grade – Allocation Governance + Compliance + Custom Signatures

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
  requestId: Yup.string()
    .matches(/^[a-zA-Z0-9-]+$/, "Only alphanumeric allowed")
    .required("Required"),
  department: Yup.string().required("Required"),
  requestDate: Yup.string().required("Required"),
  effectiveDate: Yup.string().required("Required"),
  allocationName: Yup.string().required("Required"),
  estimatedAllocationAmount: Yup.number()
    .typeError("Must be a number")
    .required("Required"),
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

  allocationName: "",
  costPool: "",
  sourceCostCenters: "",
  receivingCostCenters: "",
  allocationMethod: "",
  driverBasis: "",
  frequency: "",
  effectivePeriod: "",

  estimatedAllocationAmount: "",
  rationale: "",
  impactAssessment: "",
  controlConsiderations: "",
  status: "",

  supportingDocumentsIndicator: "",
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

const FRM00794_CostAllocationBasis = () => {

  const { isPrintMode } = usePrintMode();

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
      formId="FRM-00794"
      title="Cost Allocation Basis – Request"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Cost Allocation Basis Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00794"
              title="COST ALLOCATION BASIS REQUEST"
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

              {/* ALLOCATION DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Allocation Details</h3>
                <div className="form-fields">
                  {renderField(values,"allocationName","Allocation Name")}
                  {renderField(values,"costPool","Cost Pool")}
                  {renderField(values,"sourceCostCenters","Source Cost Centers")}
                  {renderField(values,"receivingCostCenters","Receiving Cost Centers")}
                  {renderField(values,"allocationMethod","Allocation Method")}
                  {renderField(values,"driverBasis","Driver / Basis")}
                  {renderField(values,"frequency","Frequency")}
                  {renderField(values,"effectivePeriod","Effective Period")}
                </div>
              </div>

              {/* FINANCIAL IMPACT & CONTROLS */}
              <div className="form-section">
                <h3 className="form-section-title">Financial Impact & Controls</h3>
                <div className="form-fields">

                  {renderField(values,"estimatedAllocationAmount","Estimated Allocation Amount","number")}
                  {renderField(values,"rationale","Rationale")}
                  {renderField(values,"impactAssessment","Impact Assessment")}
                  {renderField(values,"controlConsiderations","Control Considerations")}

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
                  {renderField(values,"supportingDocumentsIndicator","Supporting Documents (Yes/No)")}
                  {renderField(values,"policyReference","Policy Reference")}
                  {renderField(values,"preparedBy","Prepared By")}
                  {renderField(values,"preparedDate","Prepared Date","date")}
                </div>
              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* APPROVAL WORKFLOW */}
              <div className="form-section">
                <h3 className="form-section-title">Approval Workflow</h3>

                <div className="three-column-signatures">
                  <ApprovalSignatureBlock
                    label="Reviewed By"
                    value={values.reviewedSignature}
                    onChange={(val)=>setFieldValue("reviewedSignature",val)}
                  />
                  <ApprovalSignatureBlock
                    label="Finance Manager"
                    value={values.financeManagerSignature}
                    onChange={(val)=>setFieldValue("financeManagerSignature",val)}
                  />
                  <ApprovalSignatureBlock
                    label="Finance Controller"
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
                    Submit Allocation Request
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

export default FRM00794_CostAllocationBasis;
