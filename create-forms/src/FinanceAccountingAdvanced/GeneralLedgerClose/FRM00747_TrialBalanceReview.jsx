// FRM00747_TrialBalanceReview.jsx
// FRM-00747 – Trial Balance Review (Initiation / Request Form – Enterprise Grade)

import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
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
  reviewId: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  reviewDate: Yup.string().required("Required"),
  accountingPeriod: Yup.string().required("Required"),
  preparedBy: Yup.string().required("Required"),
  businessUnit: Yup.string().required("Required"),
  currency: Yup.string().required("Required"),
  trialBalanceVersion: Yup.string().required("Required"),
  varianceThreshold: Yup.number().required("Required"),
  conclusion: Yup.string().required("Required")
});

const initialValues = {
  companyName: "",
  reviewId: "",
  department: "",
  reviewDate: "",
  accountingPeriod: "",

  preparedBy: "",
  businessUnit: "",
  currency: "",
  trialBalanceVersion: "",
  varianceThreshold: "",

  trialBalance: [
    {
      accountCode: "",
      accountDescription: "",
      openingBalance: "",
      debit: "",
      credit: "",
      closingBalance: "",
      variance: "",
      comments: ""
    }
  ],

  keyVariances: "",
  adjustmentsRequired: "",
  conclusion: "",

  reviewedSignature: {},
  financeManagerSignature: {},
  financeControllerSignature: {},

  attachments: [],
  customFields: []
};

const FRM00747_TrialBalanceReview = () => {

  const { isPrintMode } = usePrintMode();

  const calculateClosing = (row) => {
    const opening = Number(row.openingBalance || 0);
    const debit = Number(row.debit || 0);
    const credit = Number(row.credit || 0);
    return opening + debit - credit;
  };

  const calculateVariance = (row) => {
    const calculated = calculateClosing(row);
    const closing = Number(row.closingBalance || 0);
    return closing - calculated;
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
      formId="FRM-00747"
      title="Trial Balance Review – Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("Trial Balance Review Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00747"
              title="TRIAL BALANCE REVIEW"
              department="Finance & Accounting – General Ledger & Close"
            >

              {/* CONTROL HEADER */}
              <div className="form-section">
                <h3 className="form-section-title">Control Header</h3>
                <div className="form-fields">
                  {renderField(values,"companyName","Company Name")}
                  {renderField(values,"reviewId","Review ID")}
                  {renderField(values,"department","Department / Process")}
                  {renderField(values,"reviewDate","Review Date","date")}
                  {renderField(values,"accountingPeriod","Accounting Period")}
                </div>
              </div>

              {/* REVIEW CONTEXT */}
              <div className="form-section">
                <h3 className="form-section-title">Review Context</h3>
                <div className="form-fields">
                  {renderField(values,"preparedBy","Prepared By")}
                  {renderField(values,"businessUnit","Business Unit")}
                  {renderField(values,"currency","Currency")}
                  {renderField(values,"trialBalanceVersion","Trial Balance Version")}
                  {renderField(values,"varianceThreshold","Variance Threshold","number")}
                </div>
              </div>

              {/* TRIAL BALANCE TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">Trial Balance Review</h3>

                <FieldArray name="trialBalance">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          style={{ marginBottom: 20 }}
                          onClick={() =>
                            push({
                              accountCode:"",
                              accountDescription:"",
                              openingBalance:"",
                              debit:"",
                              credit:"",
                              closingBalance:"",
                              variance:"",
                              comments:""
                            })
                          }
                        >
                          + Add Account
                        </button>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Account Code</th>
                            <th>Description</th>
                            <th>Opening</th>
                            <th>Debit</th>
                            <th>Credit</th>
                            <th>Closing</th>
                            <th>Variance</th>
                            <th>Comments</th>
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {values.trialBalance.map((row, index) => {

                            const variance = calculateVariance(row);

                            return (
                              <tr key={index}>
                                <td><Field name={`trialBalance.${index}.accountCode`} className="form-input"/></td>
                                <td><Field name={`trialBalance.${index}.accountDescription`} className="form-input"/></td>
                                <td><Field name={`trialBalance.${index}.openingBalance`} type="number" className="form-input"/></td>
                                <td><Field name={`trialBalance.${index}.debit`} type="number" className="form-input"/></td>
                                <td><Field name={`trialBalance.${index}.credit`} type="number" className="form-input"/></td>
                                <td><Field name={`trialBalance.${index}.closingBalance`} type="number" className="form-input"/></td>

                                <td>
                                  <div className="print-value">
                                    {variance}
                                  </div>
                                </td>

                                <td><Field name={`trialBalance.${index}.comments`} className="form-input"/></td>

                                {!isPrintMode && (
                                  <td>
                                    <button type="button" onClick={() => remove(index)}>
                                      Remove
                                    </button>
                                  </td>
                                )}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </>
                  )}
                </FieldArray>
              </div>

              {/* REVIEW SUMMARY */}
              <div className="form-section">
                <h3 className="form-section-title">Review Summary</h3>
                <div className="form-fields">
                  {renderField(values,"keyVariances","Key Variances Identified")}
                  {renderField(values,"adjustmentsRequired","Adjustments Required")}
                  {renderField(values,"conclusion","Conclusion")}
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
                    Submit Trial Balance Review
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

export default FRM00747_TrialBalanceReview;
