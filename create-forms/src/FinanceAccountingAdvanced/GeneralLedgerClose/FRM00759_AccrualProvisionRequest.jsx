// FRM00759_AccrualProvisionRequest.jsx
// FRM-00759 – Accrual / Provision Request (Request / Initiation Form – Enterprise Grade)

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
  requestId: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  requestDate: Yup.string().required("Required"),
  accountingPeriod: Yup.string().required("Required"),

  accrualType: Yup.string().required("Required"),
  expenseCategory: Yup.string().required("Required"),
  businessUnit: Yup.string().required("Required"),
  currency: Yup.string().required("Required"),
  amount: Yup.number().required("Required"),
  reversalDate: Yup.string().required("Required"),
  description: Yup.string().required("Required"),

  reason: Yup.string().required("Required"),
  methodology: Yup.string().required("Required"),
  riskAssessment: Yup.string().required("Required"),

  preparedBy: Yup.string().required("Required"),
  preparedDate: Yup.string().required("Required")

});

const initialValues = {

  companyName: "",
  requestId: "",
  department: "",
  requestDate: "",
  accountingPeriod: "",

  accrualType: "",
  expenseCategory: "",
  businessUnit: "",
  vendor: "",
  referenceDocument: "",
  currency: "",
  amount: "",
  reversalDate: "",
  description: "",

  reason: "",
  methodology: "",
  supportingEvidence: "",
  riskAssessment: "",

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

const FRM00759_AccrualProvisionRequest = () => {

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
      formId="FRM-00759"
      title="Accrual / Provision Request – Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("Accrual / Provision Request Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00759"
              title="ACCRUAL / PROVISION REQUEST"
              department="Finance & Accounting – General Ledger & Close"
            >

              {/* CONTROL HEADER */}
              <div className="form-section">
                <h3 className="form-section-title">Control Header</h3>
                <div className="form-fields">
                  {renderField(values,"companyName","Company Name")}
                  {renderField(values,"requestId","Request ID")}
                  {renderField(values,"department","Department / Process")}
                  {renderField(values,"requestDate","Request Date","date")}
                  {renderField(values,"accountingPeriod","Accounting Period")}
                </div>
              </div>

              {/* ACCRUAL / PROVISION DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Accrual / Provision Details</h3>
                <div className="form-fields">

                  {!isPrintMode ? (
                    <div className="form-field">
                      <label className="form-label">Type</label>
                      <Field as="select" name="accrualType" className="form-input">
                        <option value="">Select</option>
                        <option>Accrual</option>
                        <option>Provision</option>
                      </Field>
                    </div>
                  ) : (
                    <div className="print-value">{values.accrualType}</div>
                  )}

                  {renderField(values,"expenseCategory","Expense Category")}
                  {renderField(values,"businessUnit","Business Unit / Cost Center")}
                  {renderField(values,"vendor","Vendor / Counterparty")}
                  {renderField(values,"referenceDocument","Reference Document")}
                  {renderField(values,"currency","Currency")}
                  {renderField(values,"amount","Amount","number")}
                  {renderField(values,"reversalDate","Reversal Date","date")}
                  {renderField(values,"description","Description / Narration")}

                </div>
              </div>

              {/* BUSINESS JUSTIFICATION */}
              <div className="form-section">
                <h3 className="form-section-title">Business Justification</h3>
                <div className="form-fields">
                  {renderField(values,"reason","Reason for Accrual / Provision")}
                  {renderField(values,"methodology","Calculation Methodology")}
                  {renderField(values,"supportingEvidence","Supporting Evidence Description")}
                  {renderField(values,"riskAssessment","Risk Assessment")}
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
                    Submit Accrual / Provision Request
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

export default FRM00759_AccrualProvisionRequest;
