// FRM00750_ChartOfAccountsChange.jsx
// FRM-00750 – Chart of Accounts Change (Request / Initiation Form – Enterprise Grade)

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
  changeRequestId: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  requestDate: Yup.string().required("Required"),
  effectiveDate: Yup.string().required("Required"),

  changeType: Yup.string().required("Required"),
  accountCode: Yup.string().required("Required"),
  accountName: Yup.string().required("Required"),
  accountCategory: Yup.string().required("Required"),
  financialStatementMapping: Yup.string().required("Required"),

  reasonForChange: Yup.string().required("Required"),
  impactAnalysis: Yup.string().required("Required"),
  riskAssessment: Yup.string().required("Required"),

  requestedBy: Yup.string().required("Required"),
  preparedDate: Yup.string().required("Required")

});

const initialValues = {

  companyName: "",
  changeRequestId: "",
  department: "",
  requestDate: "",
  effectiveDate: "",

  changeType: "",
  accountCode: "",
  accountName: "",
  accountCategory: "",
  financialStatementMapping: "",
  costCenterImpact: "",
  taxImpact: "",

  reasonForChange: "",
  impactAnalysis: "",
  systemsAffected: "",
  riskAssessment: "",

  supportingDocuments: false,
  policyReference: "",
  requestedBy: "",
  preparedDate: "",

  reviewedSignature: {},
  financeManagerSignature: {},
  financeControllerSignature: {},
  erpAdminSignature: {},

  attachments: [],
  customFields: []
};

const FRM00750_ChartOfAccountsChange = () => {

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
      formId="FRM-00750"
      title="Chart of Accounts Change – Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("Chart of Accounts Change Request Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00750"
              title="CHART OF ACCOUNTS CHANGE REQUEST"
              department="Finance & Accounting – General Ledger & Close"
            >

              {/* CONTROL HEADER */}
              <div className="form-section">
                <h3 className="form-section-title">Control Header</h3>
                <div className="form-fields">
                  {renderField(values,"companyName","Company Name")}
                  {renderField(values,"changeRequestId","Change Request ID")}
                  {renderField(values,"department","Department / Process")}
                  {renderField(values,"requestDate","Request Date","date")}
                  {renderField(values,"effectiveDate","Effective Date","date")}
                </div>
              </div>

              {/* CHANGE DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Change Details</h3>
                <div className="form-fields">

                  {!isPrintMode ? (
                    <div className="form-field">
                      <label className="form-label">Change Type</label>
                      <Field as="select" name="changeType" className="form-input">
                        <option value="">Select</option>
                        <option>New</option>
                        <option>Modify</option>
                        <option>Deactivate</option>
                      </Field>
                    </div>
                  ) : (
                    <div className="print-value">{values.changeType}</div>
                  )}

                  {renderField(values,"accountCode","Account Code")}
                  {renderField(values,"accountName","Account Name")}

                  {!isPrintMode ? (
                    <div className="form-field">
                      <label className="form-label">Account Category</label>
                      <Field as="select" name="accountCategory" className="form-input">
                        <option value="">Select</option>
                        <option>Asset</option>
                        <option>Liability</option>
                        <option>Equity</option>
                        <option>Revenue</option>
                        <option>Expense</option>
                      </Field>
                    </div>
                  ) : (
                    <div className="print-value">{values.accountCategory}</div>
                  )}

                  {renderField(values,"financialStatementMapping","Financial Statement Mapping")}
                  {renderField(values,"costCenterImpact","Cost Center / Segment Impact")}
                  {renderField(values,"taxImpact","Tax Impact (Yes/No & Description)")}

                </div>
              </div>

              {/* BUSINESS JUSTIFICATION */}
              <div className="form-section">
                <h3 className="form-section-title">Business Justification</h3>
                <div className="form-fields">
                  {renderField(values,"reasonForChange","Reason for Change")}
                  {renderField(values,"impactAnalysis","Impact Analysis")}
                  {renderField(values,"systemsAffected","Systems / Reports Affected")}
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
                    label="ERP Admin Update Confirmation"
                    value={values.erpAdminSignature}
                    onChange={(val) => setFieldValue("erpAdminSignature", val)}
                  />

                </div>
              </div>

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Change Request
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

export default FRM00750_ChartOfAccountsChange;
