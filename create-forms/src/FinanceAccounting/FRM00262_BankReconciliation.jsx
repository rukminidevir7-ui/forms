// FRM00262_BankReconciliation.jsx
// FRM-00262 – Bank Reconciliation – Request / Initiation Form

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormAttachments from '../components/FormAttachments';
import FormCustomFields from '../components/FormCustomFields';
import FormSignatures from '../components/FormSignatures';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({

  // 1. Basic Information
  formId: Yup.string().required('Required'),
  reconciliationDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  reconciliationPeriod: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),

  // 2. Bank Account Details
  bankName: Yup.string().required('Required'),
  branchName: Yup.string().required('Required'),
  accountNumber: Yup.string().required('Required'),
  accountName: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),
  glAccountCode: Yup.string().required('Required'),

  // 3. Balance Summary
  bankStatementBalance: Yup.string().required('Required'),
  bookBalance: Yup.string().required('Required'),
  adjustedBankBalance: Yup.string().required('Required'),
  adjustedBookBalance: Yup.string().required('Required'),
  varianceAmount: Yup.string().required('Required'),
  reconciliationStatus: Yup.string().required('Required'),

  // 4. Reconciling Items
  reconcilingItemsSummary: Yup.string().required('Required'),

  // 5. Analysis & Notes
  keyObservations: Yup.string().required('Required'),
  unusualItems: Yup.string().required('Required'),
  resolutionActions: Yup.string().required('Required'),

  // 6. Authorization
  preparedByAuthorization: Yup.string().required('Required'),
  treasuryFinanceReview: Yup.string().required('Required'),
  financeApproval: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  formId: '',
  reconciliationDate: '',
  department: '',
  preparedBy: '',
  reconciliationPeriod: '',
  referenceNumber: '',

  bankName: '',
  branchName: '',
  accountNumber: '',
  accountName: '',
  currency: '',
  glAccountCode: '',

  bankStatementBalance: '',
  bookBalance: '',
  adjustedBankBalance: '',
  adjustedBookBalance: '',
  varianceAmount: '',
  reconciliationStatus: '',

  reconcilingItemsSummary: '',

  keyObservations: '',
  unusualItems: '',
  resolutionActions: '',

  preparedByAuthorization: '',
  treasuryFinanceReview: '',
  financeApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00262_BankReconciliation = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type = 'text') => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '___________________'}</div>
      ) : (
        <>
          <Field name={name} type={type} className="form-input" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  const textarea = (values, name, label) => (
    <div className="form-field full-width">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '___________________'}</div>
      ) : (
        <>
          <Field as="textarea" name={name} className="form-textarea" rows="4" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  const select = (values, name, label, options) => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '___________________'}</div>
      ) : (
        <>
          <Field as="select" name={name} className="form-input">
            <option value="">-- Select --</option>
            {options.map(o => <option key={o} value={o}>{o}</option>)}
          </Field>
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (

    <ModernFormWrapper
      formId="FRM-00262"
      title="Bank Reconciliation – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Bank reconciliation submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00262"
              title="Bank Reconciliation"
              department="Finance & Accounting – Treasury & Banking"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'reconciliationDate','Reconciliation Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'reconciliationPeriod','Reconciliation Period')}
                  {field(values,'referenceNumber','Reference Number')}
                </div>
              </div>

              {/* 2. Bank Account Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Bank Account Details</h3>
                <div className="form-fields">
                  {field(values,'bankName','Bank Name')}
                  {field(values,'branchName','Branch')}
                  {field(values,'accountNumber','Account Number')}
                  {field(values,'accountName','Account Name')}
                  {field(values,'currency','Currency')}
                  {field(values,'glAccountCode','GL Account Code')}
                </div>
              </div>

              {/* 3. Balance Summary */}
              <div className="form-section">
                <h3 className="form-section-title">3. Balance Summary</h3>
                <div className="form-fields">
                  {field(values,'bankStatementBalance','Bank Statement Balance','number')}
                  {field(values,'bookBalance','Book Balance','number')}
                  {field(values,'adjustedBankBalance','Adjusted Bank Balance','number')}
                  {field(values,'adjustedBookBalance','Adjusted Book Balance','number')}
                  {field(values,'varianceAmount','Variance','number')}
                  {select(values,'reconciliationStatus','Status',['Matched','Variance Identified','Pending Review','Escalated'])}
                </div>
              </div>

              {/* 4. Reconciling Items */}
              <div className="form-section">
                <h3 className="form-section-title">4. Reconciling Items</h3>
                <div className="form-fields">
                  {textarea(values,'reconcilingItemsSummary','Description / Amount / Type / Remarks')}
                </div>
              </div>

              {/* 5. Analysis & Notes */}
              <div className="form-section">
                <h3 className="form-section-title">5. Analysis & Notes</h3>
                <div className="form-fields">
                  {textarea(values,'keyObservations','Key Observations')}
                  {textarea(values,'unusualItems','Unusual Items / Risks')}
                  {textarea(values,'resolutionActions','Resolution Actions')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByAuthorization','Prepared By (Name)')}
                  {field(values,'treasuryFinanceReview','Treasury / Finance Review')}
                  {field(values,'financeApproval','Finance Approval')}
                  {field(values,'approvalDate','Approval Date','date')}
                  {textarea(values,'approvalComments','Comments')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Bank Reconciliation
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

export default FRM00262_BankReconciliation;
