// FRM00760_ReversalApproval.jsx
// FRM-00760 – Reversal Approval (Approval / Authorization Form – Enterprise Grade)

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
  approvalId: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  approvalDate: Yup.string().required("Required"),
  accountingPeriod: Yup.string().required("Required"),

  originalEntryReference: Yup.string().required("Required"),
  originalPostingDate: Yup.string().required("Required"),
  reversalType: Yup.string().required("Required"),
  reversalAmount: Yup.number().required("Required"),
  currency: Yup.string().required("Required"),
  reasonForReversal: Yup.string().required("Required"),
  impactAssessment: Yup.string().required("Required"),
  proposedReversalDate: Yup.string().required("Required"),

  requestedBy: Yup.string().required("Required"),
  preparedDate: Yup.string().required("Required")

});

const initialValues = {

  companyName: "",
  approvalId: "",
  department: "",
  approvalDate: "",
  accountingPeriod: "",

  originalEntryReference: "",
  originalPostingDate: "",
  reversalType: "",
  reversalAmount: "",
  currency: "",
  reasonForReversal: "",
  impactAssessment: "",
  proposedReversalDate: "",

  supportingDocumentsVerified: false,
  policyReference: "",
  requestedBy: "",
  preparedDate: "",

  reviewedSignature: {},
  financeManagerSignature: {},
  financeControllerSignature: {},
  postingAuthorizationSignature: {},

  attachments: [],
  customFields: []
};

const FRM00760_ReversalApproval = () => {

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
      formId="FRM-00760"
      title="Reversal Approval – Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("Reversal Approval Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00760"
              title="REVERSAL APPROVAL"
              department="Finance & Accounting – General Ledger & Close"
            >

              {/* CONTROL HEADER */}
              <div className="form-section">
                <h3 className="form-section-title">Control Header</h3>
                <div className="form-fields">
                  {renderField(values,"companyName","Company Name")}
                  {renderField(values,"approvalId","Approval ID")}
                  {renderField(values,"department","Department / Process")}
                  {renderField(values,"approvalDate","Approval Date","date")}
                  {renderField(values,"accountingPeriod","Accounting Period")}
                </div>
              </div>

              {/* REVERSAL DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Reversal Details</h3>
                <div className="form-fields">

                  {renderField(values,"originalEntryReference","Original Entry Reference")}
                  {renderField(values,"originalPostingDate","Original Posting Date","date")}

                  {!isPrintMode ? (
                    <div className="form-field">
                      <label className="form-label">Reversal Type</label>
                      <Field as="select" name="reversalType" className="form-input">
                        <option value="">Select</option>
                        <option>Accrual</option>
                        <option>Provision</option>
                        <option>Adjustment</option>
                      </Field>
                    </div>
                  ) : (
                    <div className="print-value">{values.reversalType}</div>
                  )}

                  {renderField(values,"reversalAmount","Reversal Amount","number")}
                  {renderField(values,"currency","Currency")}
                  {renderField(values,"reasonForReversal","Reason for Reversal")}
                  {renderField(values,"impactAssessment","Impact Assessment")}
                  {renderField(values,"proposedReversalDate","Proposed Reversal Date","date")}

                </div>
              </div>

              {/* CONTROL & COMPLIANCE */}
              <div className="form-section">
                <h3 className="form-section-title">Control & Compliance</h3>
                <div className="form-fields">

                  <div className="form-field">
                    <label className="form-label">Supporting Documents Verified</label>
                    {!isPrintMode ? (
                      <Field type="checkbox" name="supportingDocumentsVerified" />
                    ) : (
                      <div className="print-value">
                        {values.supportingDocumentsVerified ? "Yes" : "No"}
                      </div>
                    )}
                  </div>

                  {renderField(values,"policyReference","Policy Reference")}
                  {renderField(values,"requestedBy","Requested By")}
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

                  <ApprovalSignatureBlock
                    label="Posting Authorization"
                    value={values.postingAuthorizationSignature}
                    onChange={(val) => setFieldValue("postingAuthorizationSignature", val)}
                  />

                </div>
              </div>

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Reversal Approval
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

export default FRM00760_ReversalApproval;
