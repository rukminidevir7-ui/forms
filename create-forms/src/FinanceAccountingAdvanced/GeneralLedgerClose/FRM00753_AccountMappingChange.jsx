// FRM00753_AccountMappingChange.jsx
// FRM-00753 – Account Mapping Change (Request / Initiation Form – Enterprise Grade)

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

  mappingType: Yup.string().required("Required"),
  sourceCode: Yup.string().required("Required"),
  sourceDescription: Yup.string().required("Required"),
  targetCode: Yup.string().required("Required"),
  targetDescription: Yup.string().required("Required"),
  financialImpact: Yup.string().required("Required"),

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

  mappingType: "",
  sourceCode: "",
  sourceDescription: "",
  targetCode: "",
  targetDescription: "",
  financialImpact: "",

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

const FRM00753_AccountMappingChange = () => {

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
      formId="FRM-00753"
      title="Account Mapping Change – Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("Account Mapping Change Request Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00753"
              title="ACCOUNT MAPPING CHANGE REQUEST"
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

              {/* MAPPING DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Mapping Details</h3>
                <div className="form-fields">

                  {!isPrintMode ? (
                    <div className="form-field">
                      <label className="form-label">Mapping Type</label>
                      <Field as="select" name="mappingType" className="form-input">
                        <option value="">Select</option>
                        <option>GL</option>
                        <option>Sub-ledger</option>
                        <option>Cost Center</option>
                        <option>Segment</option>
                      </Field>
                    </div>
                  ) : (
                    <div className="print-value">{values.mappingType}</div>
                  )}

                  {renderField(values,"sourceCode","Source Code")}
                  {renderField(values,"sourceDescription","Source Description")}
                  {renderField(values,"targetCode","Target Code")}
                  {renderField(values,"targetDescription","Target Description")}
                  {renderField(values,"financialImpact","Financial Statement Impact")}

                </div>
              </div>

              {/* BUSINESS JUSTIFICATION */}
              <div className="form-section">
                <h3 className="form-section-title">Business Justification</h3>
                <div className="form-fields">
                  {renderField(values,"reasonForChange","Reason for Change")}
                  {renderField(values,"impactAnalysis","Impact Analysis")}
                  {renderField(values,"systemsAffected","Systems / Interfaces Affected")}
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
                    Submit Mapping Change
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

export default FRM00753_AccountMappingChange;
