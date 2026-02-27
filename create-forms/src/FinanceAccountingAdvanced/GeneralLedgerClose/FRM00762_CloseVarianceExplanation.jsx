// FRM00762_CloseVarianceExplanation.jsx
// FRM-00762 – Close Variance Explanation (Initiation Form – Enterprise Grade)

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
  explanationId: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  explanationDate: Yup.string().required("Required"),
  accountingPeriod: Yup.string().required("Required"),

  financialArea: Yup.string().required("Required"),
  account: Yup.string().required("Required"),
  budgetAmount: Yup.number().required("Required"),
  actualAmount: Yup.number().required("Required"),
  materialityThreshold: Yup.number().required("Required"),

  varianceExplanation: Yup.string().required("Required"),
  rootCause: Yup.string().required("Required"),
  businessImpact: Yup.string().required("Required"),
  correctiveAction: Yup.string().required("Required"),
  preventiveAction: Yup.string().required("Required"),

  preparedBy: Yup.string().required("Required"),
  preparedDate: Yup.string().required("Required")

});

const initialValues = {

  companyName: "",
  explanationId: "",
  department: "",
  explanationDate: "",
  accountingPeriod: "",

  financialArea: "",
  account: "",
  budgetAmount: "",
  actualAmount: "",
  materialityThreshold: "",

  varianceExplanation: "",
  rootCause: "",
  businessImpact: "",
  correctiveAction: "",
  preventiveAction: "",

  supportingEvidence: false,
  reviewedWithManagement: false,
  preparedBy: "",
  preparedDate: "",

  reviewedSignature: {},
  financeManagerSignature: {},
  financeControllerSignature: {},

  attachments: [],
  customFields: []
};

const FRM00762_CloseVarianceExplanation = () => {

  const { isPrintMode } = usePrintMode();

  const calculateVariance = (budget, actual) => {
    return (Number(actual || 0) - Number(budget || 0));
  };

  const calculateVariancePercent = (budget, actual) => {
    if (!budget || Number(budget) === 0) return 0;
    return ((Number(actual || 0) - Number(budget || 0)) / Number(budget)) * 100;
  };

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
      formId="FRM-00762"
      title="Close Variance Explanation – Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("Close Variance Explanation Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => {

          const variance = calculateVariance(values.budgetAmount, values.actualAmount);
          const variancePercent = calculateVariancePercent(values.budgetAmount, values.actualAmount);

          return (
            <Form>

              <ModernA4Template
                formId="FRM-00762"
                title="CLOSE VARIANCE EXPLANATION"
                department="Finance & Accounting – General Ledger & Close"
              >

                {/* CONTROL HEADER */}
                <div className="form-section">
                  <h3 className="form-section-title">Control Header</h3>
                  <div className="form-fields">
                    {renderField(values,"companyName","Company Name")}
                    {renderField(values,"explanationId","Explanation ID")}
                    {renderField(values,"department","Department / Process")}
                    {renderField(values,"explanationDate","Date","date")}
                    {renderField(values,"accountingPeriod","Accounting Period")}
                  </div>
                </div>

                {/* VARIANCE DETAILS */}
                <div className="form-section">
                  <h3 className="form-section-title">Variance Details</h3>
                  <div className="form-fields">

                    {renderField(values,"financialArea","Financial Statement Area")}
                    {renderField(values,"account","Account / Cost Center")}
                    {renderField(values,"budgetAmount","Budget / Expected Amount","number")}
                    {renderField(values,"actualAmount","Actual Amount","number")}

                    <div className="form-field">
                      <label className="form-label">Variance Amount</label>
                      <div className="print-value">{variance}</div>
                    </div>

                    <div className="form-field">
                      <label className="form-label">Variance %</label>
                      <div className="print-value">{variancePercent.toFixed(2)}%</div>
                    </div>

                    {renderField(values,"materialityThreshold","Materiality Threshold","number")}

                  </div>
                </div>

                {/* EXPLANATION & ANALYSIS */}
                <div className="form-section">
                  <h3 className="form-section-title">Explanation & Analysis</h3>
                  <div className="form-fields">
                    {renderField(values,"varianceExplanation","Variance Explanation")}
                    {renderField(values,"rootCause","Root Cause")}
                    {renderField(values,"businessImpact","Business Impact")}
                    {renderField(values,"correctiveAction","Corrective Action")}
                    {renderField(values,"preventiveAction","Preventive Action")}
                  </div>
                </div>

                {/* CONTROL & COMPLIANCE */}
                <div className="form-section">
                  <h3 className="form-section-title">Control & Compliance</h3>
                  <div className="form-fields">

                    <div className="form-field">
                      <label className="form-label">Supporting Evidence Attached</label>
                      {!isPrintMode ? (
                        <Field type="checkbox" name="supportingEvidence" />
                      ) : (
                        <div className="print-value">
                          {values.supportingEvidence ? "Yes" : "No"}
                        </div>
                      )}
                    </div>

                    <div className="form-field">
                      <label className="form-label">Reviewed with Management</label>
                      {!isPrintMode ? (
                        <Field type="checkbox" name="reviewedWithManagement" />
                      ) : (
                        <div className="print-value">
                          {values.reviewedWithManagement ? "Yes" : "No"}
                        </div>
                      )}
                    </div>

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
                      Submit Variance Explanation
                    </button>
                  </div>
                )}

              </ModernA4Template>

            </Form>
          );
        }}
      </Formik>

    </ModernFormWrapper>
  );
};

export default FRM00762_CloseVarianceExplanation;
