// FRM00788_CostCenterCreation.jsx
// FRM-00788 – Cost Center Creation – Request / Initiation
// Enterprise Grade – Numeric Validation + Compliance + Custom Signatures

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
  costCenterName: Yup.string().required("Required"),
  proposedCostCenterCode: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Only alphanumeric allowed")
    .required("Required"),
  estimatedAnnualBudget: Yup.number()
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

  costCenterName: "",
  proposedCostCenterCode: "",
  businessUnit: "",
  location: "",
  costCenterOwner: "",
  managerResponsible: "",
  purposeDescription: "",
  budgetOwner: "",

  estimatedAnnualBudget: "",
  costCategory: "",
  parentCostCenter: "",
  internalOrderLinkage: "",
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

const FRM00788_CostCenterCreation = () => {

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
      formId="FRM-00788"
      title="Cost Center Creation – Request"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Cost Center Creation Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00788"
              title="COST CENTER CREATION REQUEST"
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

              {/* COST CENTER DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Cost Center Details</h3>
                <div className="form-fields">
                  {renderField(values,"costCenterName","Cost Center Name")}
                  {renderField(values,"proposedCostCenterCode","Proposed Cost Center Code")}
                  {renderField(values,"businessUnit","Business Unit / Department")}
                  {renderField(values,"location","Location")}
                  {renderField(values,"costCenterOwner","Cost Center Owner")}
                  {renderField(values,"managerResponsible","Manager Responsible")}
                  {renderField(values,"purposeDescription","Purpose / Description")}
                  {renderField(values,"budgetOwner","Budget Owner")}
                </div>
              </div>

              {/* FINANCIAL & CONTROL INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">Financial & Control Information</h3>
                <div className="form-fields">

                  {renderField(values,"estimatedAnnualBudget","Estimated Annual Budget","number")}
                  {renderField(values,"costCategory","Cost Category")}
                  {renderField(values,"parentCostCenter","Hierarchy / Parent Cost Center")}
                  {renderField(values,"internalOrderLinkage","Internal Order Linkage")}
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

              {/* CONTROL & DOCUMENTATION */}
              <div className="form-section">
                <h3 className="form-section-title">Control & Documentation</h3>
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
                            <button type="button" onClick={()=>remove(index)}>
                              Remove
                            </button>
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
                    Submit Cost Center Creation
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

export default FRM00788_CostCenterCreation;
