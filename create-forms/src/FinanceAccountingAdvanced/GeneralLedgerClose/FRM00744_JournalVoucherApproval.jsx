// FRM00744_JournalVoucherApproval.jsx
// FRM-00744 – Journal Voucher Approval (Enterprise Grade)

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

const validationSchema = Yup.object({

  companyName: Yup.string().required("Required"),
  approvalId: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  approvalDate: Yup.string().required("Required"),
  jvNumber: Yup.string().required("Required"),

  jvDate: Yup.string().required("Required"),
  accountingPeriod: Yup.string().required("Required"),
  jvType: Yup.string().required("Required"),
  businessUnit: Yup.string().required("Required"),
  preparedBy: Yup.string().required("Required"),

  totalDebit: Yup.number().required("Required"),
  totalCredit: Yup.number().required("Required"),

  approvalDecision: Yup.string().required("Required"),
  effectivePostingDate: Yup.string().required("Required")

});

const initialValues = {

  companyName: "",
  approvalId: "",
  department: "",
  approvalDate: "",
  jvNumber: "",

  jvDate: "",
  accountingPeriod: "",
  jvType: "",
  businessUnit: "",
  preparedBy: "",
  totalDebit: "",
  totalCredit: "",
  difference: "",
  narration: "",

  checklist: {
    supportingDocs: false,
    accountCodesValidated: false,
    amountsBalanced: false,
    policyCompliance: false,
    approvalsVerified: false
  },

  approvalDecision: "",
  comments: "",
  effectivePostingDate: "",

  reviewedSignature: {},
  financeControllerSignature: {},
  authorizedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00744_JournalVoucherApproval = () => {

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
      formId="FRM-00744"
      title="Journal Voucher Approval"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const difference =
            Number(values.totalDebit || 0) -
            Number(values.totalCredit || 0);

          if (difference !== 0) {
            alert("Debit and Credit are not balanced.");
            return;
          }

          console.log(values);
          alert("Journal Voucher Approval Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => {

          const difference =
            Number(values.totalDebit || 0) -
            Number(values.totalCredit || 0);

          return (
            <Form>

              <ModernA4Template
                formId="FRM-00744"
                title="JOURNAL VOUCHER APPROVAL"
                department="Finance & Accounting – General Ledger Close"
              >

                {/* CONTROL HEADER */}
                <div className="form-section">
                  <h3 className="form-section-title">Control Header</h3>
                  <div className="form-fields">
                    {renderField(values,"companyName","Company Name")}
                    {renderField(values,"approvalId","Approval ID")}
                    {renderField(values,"department","Department / Process")}
                    {renderField(values,"approvalDate","Approval Date","date")}
                    {renderField(values,"jvNumber","JV Number")}
                  </div>
                </div>

                {/* JV SUMMARY */}
                <div className="form-section">
                  <h3 className="form-section-title">JV Summary</h3>
                  <div className="form-fields">
                    {renderField(values,"jvDate","JV Date","date")}
                    {renderField(values,"accountingPeriod","Accounting Period")}
                    {renderField(values,"jvType","JV Type")}
                    {renderField(values,"businessUnit","Business Unit / Cost Center")}
                    {renderField(values,"preparedBy","Prepared By")}
                    {renderField(values,"totalDebit","Total Debit","number")}
                    {renderField(values,"totalCredit","Total Credit","number")}

                    <div className="form-field">
                      <label className="form-label">Difference</label>
                      <div className="print-value">
                        {difference}
                      </div>
                    </div>

                    {renderField(values,"narration","Narration / Description")}
                  </div>
                </div>

                {/* APPROVAL CHECKLIST */}
                <div className="form-section">
                  <h3 className="form-section-title">Approval Checklist</h3>

                  <div className="form-fields">
                    {Object.keys(values.checklist).map((key) => (
                      <div key={key} className="form-field">
                        <label className="form-label">
                          {key.replace(/([A-Z])/g, " $1")}
                        </label>

                        {!isPrintMode ? (
                          <Field
                            type="checkbox"
                            name={`checklist.${key}`}
                          />
                        ) : (
                          <div className="print-value">
                            {values.checklist[key] ? "Yes" : "No"}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* DECISION */}
                <div className="form-section">
                  <h3 className="form-section-title">Decision</h3>

                  <div className="form-fields">

                    {!isPrintMode ? (
                      <div className="form-field">
                        <label className="form-label">Approval Decision</label>
                        <Field as="select" name="approvalDecision" className="form-input">
                          <option value="">Select</option>
                          <option>Approved</option>
                          <option>Rejected</option>
                          <option>Approved with Conditions</option>
                        </Field>
                      </div>
                    ) : (
                      <div className="print-value">{values.approvalDecision}</div>
                    )}

                    {renderField(values,"comments","Conditions / Comments")}
                    {renderField(values,"effectivePostingDate","Effective Posting Date","date")}

                  </div>
                </div>

                {/* ATTACHMENTS & CUSTOM FIELDS BEFORE SIGNATURES */}
                <div style={{ marginTop: 40 }}>
                  <FormAttachments values={values} />
                </div>

                <div style={{ marginTop: 25 }}>
                  <FormCustomFields values={values} />
                </div>

                {/* SIGN-OFF WORKFLOW */}
                <div className="form-section">
                  <h3 className="form-section-title">Sign-Off Workflow</h3>

                  <div className="three-column-signatures">

                    <ApprovalSignatureBlock
                      label="Reviewed By"
                      value={values.reviewedSignature}
                      onChange={(val) => setFieldValue("reviewedSignature", val)}
                    />

                    <ApprovalSignatureBlock
                      label="Finance Controller"
                      value={values.financeControllerSignature}
                      onChange={(val) => setFieldValue("financeControllerSignature", val)}
                    />

                    <ApprovalSignatureBlock
                      label="Authorized Signatory"
                      value={values.authorizedSignature}
                      onChange={(val) => setFieldValue("authorizedSignature", val)}
                    />

                  </div>

                  {/* Additional Signatures */}
                  <FieldArray name="additionalSignatures">
                    {({ push, remove }) => (
                      <>
                        {!isPrintMode && (
                          <button
                            type="button"
                            className="btn-submit"
                            style={{ marginTop: 25, marginBottom: 20 }}
                            onClick={() => push({ data: {} })}
                          >
                            + Add Additional Approval
                          </button>
                        )}

                        {values.additionalSignatures.map((sig, index) => (
                          <div key={index} style={{ marginBottom: 25 }}>
                            <ApprovalSignatureBlock
                              label={`Additional Approval ${index + 1}`}
                              value={sig.data || {}}
                              onChange={(val) =>
                                setFieldValue(`additionalSignatures.${index}.data`, val)
                              }
                            />

                            {!isPrintMode && (
                              <button type="button" onClick={() => remove(index)}>
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
                      Submit Approval
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

export default FRM00744_JournalVoucherApproval;
