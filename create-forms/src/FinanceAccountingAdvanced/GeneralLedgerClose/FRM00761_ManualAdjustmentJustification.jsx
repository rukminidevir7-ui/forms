// FRM00761_ManualAdjustmentJustification.jsx
// FRM-00761 – Manual Adjustment Justification (Initiation Form – Enterprise Grade)

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

const validationSchema = Yup.object({

  companyName: Yup.string().required("Required"),
  adjustmentId: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  adjustmentDate: Yup.string().required("Required"),
  accountingPeriod: Yup.string().required("Required"),

  adjustmentType: Yup.string().required("Required"),
  referenceJournal: Yup.string().required("Required"),
  businessUnit: Yup.string().required("Required"),
  amount: Yup.number().required("Required"),
  currency: Yup.string().required("Required"),
  financialImpact: Yup.string().required("Required"),
  description: Yup.string().required("Required"),

  reason: Yup.string().required("Required"),
  rootCause: Yup.string().required("Required"),
  impactAssessment: Yup.string().required("Required"),
  correctiveAction: Yup.string().required("Required"),
  preventiveAction: Yup.string().required("Required"),

  preparedBy: Yup.string().required("Required"),
  preparedDate: Yup.string().required("Required")

});

const initialValues = {

  companyName: "",
  adjustmentId: "",
  department: "",
  adjustmentDate: "",
  accountingPeriod: "",

  adjustmentType: "",
  referenceJournal: "",
  businessUnit: "",
  amount: "",
  currency: "",
  financialImpact: "",
  description: "",

  reason: "",
  rootCause: "",
  impactAssessment: "",
  correctiveAction: "",
  preventiveAction: "",

  supportingDocuments: false,
  policyReference: "",
  preparedBy: "",
  preparedDate: "",

  reviewedSignature: {},
  financeManagerSignature: {},
  financeControllerSignature: {},

  attachments: [],
  customFields: []
};

const FRM00761_ManualAdjustmentJustification = () => {

  const { isPrintMode } = usePrintMode();

  const renderField = (values, name, label, type = "text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : <>
            <Field name={name} type={type} className="form-input" />
            <ErrorMessage name={name} component="div" className="form-error" />
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper
      formId="FRM-00761"
      title="Manual Adjustment Justification – Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("Manual Adjustment Justification Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00761"
              title="MANUAL ADJUSTMENT JUSTIFICATION"
              department="Finance & Accounting – General Ledger & Close"
            >

              {/* CONTROL HEADER */}
              <div className="form-section">
                <h3 className="form-section-title">Control Header</h3>
                <div className="form-fields">
                  {renderField(values,"companyName","Company Name")}
                  {renderField(values,"adjustmentId","Adjustment ID")}
                  {renderField(values,"department","Department / Process")}
                  {renderField(values,"adjustmentDate","Adjustment Date","date")}
                  {renderField(values,"accountingPeriod","Accounting Period")}
                </div>
              </div>

              {/* ADJUSTMENT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Adjustment Details</h3>
                <div className="form-fields">

                  {!isPrintMode ? (
                    <div className="form-field">
                      <label className="form-label">Adjustment Type</label>
                      <Field as="select" name="adjustmentType" className="form-input">
                        <option value="">Select</option>
                        <option>Error Correction</option>
                        <option>Reclass</option>
                        <option>True-up</option>
                        <option>Other</option>
                      </Field>
                    </div>
                  ) : (
                    <div className="print-value">{values.adjustmentType}</div>
                  )}

                  {renderField(values,"referenceJournal","Reference Journal / Entry Number")}
                  {renderField(values,"businessUnit","Business Unit / Cost Center")}
                  {renderField(values,"amount","Amount","number")}
                  {renderField(values,"currency","Currency")}
                  {renderField(values,"financialImpact","Impact on Financial Statements")}
                  {renderField(values,"description","Description / Narration")}

                </div>
              </div>

              {/* JUSTIFICATION & ANALYSIS */}
              <div className="form-section">
                <h3 className="form-section-title">Justification & Analysis</h3>
                <div className="form-fields">
                  {renderField(values,"reason","Reason for Adjustment")}
                  {renderField(values,"rootCause","Root Cause Analysis")}
                  {renderField(values,"impactAssessment","Impact Assessment")}
                  {renderField(values,"correctiveAction","Corrective Action")}
                  {renderField(values,"preventiveAction","Preventive Action")}
                </div>
              </div>

              {/* CONTROL & COMPLIANCE */}
              <div className="form-section">
                <h3 className="form-section-title">Control & Compliance</h3>
                <div className="form-fields">

                  <div className="form-field">
                    <label className="form-label">Supporting Documents Attached</label>
                    {!isPrintMode ? (
                      <Field type="checkbox" name="supportingDocuments" />
                    ) : (
                      <div className="print-value">
                        {values.supportingDocuments ? "Yes" : "No"}
                      </div>
                    )}
                  </div>

                  {renderField(values,"policyReference","Policy Reference")}
                  {renderField(values,"preparedBy","Prepared By")}
                  {renderField(values,"preparedDate","Prepared Date","date")}

                </div>
              </div>

              {/* ATTACHMENTS & CUSTOM FIELDS */}
              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {/* APPROVAL WORKFLOW */}
              <div className="form-section">
                <h3 className="form-section-title">Approval Workflow</h3>

                <div className="three-column-signatures">

                  <ApprovalSignatureBlock
                    label="Reviewed By"
                    value={values.reviewedSignature}
                    onChange={(val) => setFieldValue("reviewedSignature", val)}
                  />

                  <ApprovalSignatureBlock
                    label="Finance Manager Approval"
                    value={values.financeManagerSignature}
                    onChange={(val) => setFieldValue("financeManagerSignature", val)}
                  />

                  <ApprovalSignatureBlock
                    label="Finance Controller Approval"
                    value={values.financeControllerSignature}
                    onChange={(val) => setFieldValue("financeControllerSignature", val)}
                  />

                </div>
              </div>

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Adjustment Justification
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

export default FRM00761_ManualAdjustmentJustification;
