// FRM00247_CustomerLedgerReview.jsx
// FRM-00247 – Customer Ledger Review – Request / Initiation Form

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
  reviewDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  reviewPeriod: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),

  // 2. Customer Details
  customerName: Yup.string().required('Required'),
  customerId: Yup.string().required('Required'),
  accountManager: Yup.string().required('Required'),
  region: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),
  ledgerBalance: Yup.string().required('Required'),

  // 3. Ledger Summary
  openingBalance: Yup.string().required('Required'),
  closingBalance: Yup.string().required('Required'),
  totalDebits: Yup.string().required('Required'),
  totalCredits: Yup.string().required('Required'),
  outstandingAmount: Yup.string().required('Required'),
  agingBucket: Yup.string().required('Required'),

  // 4. Key Transactions (summary level capture)
  keyTransactionsSummary: Yup.string().required('Required'),

  // 5. Observations
  keyObservations: Yup.string().required('Required'),
  issuesIdentified: Yup.string().required('Required'),
  riskAssessment: Yup.string().required('Required'),

  // 6. Action Plan
  correctiveActions: Yup.string().required('Required'),
  responsiblePerson: Yup.string().required('Required'),
  targetResolutionDate: Yup.string().required('Required'),

  // 7. Authorization
  preparedByAuthorization: Yup.string().required('Required'),
  arReview: Yup.string().required('Required'),
  financeApproval: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  formId: '',
  reviewDate: '',
  department: '',
  preparedBy: '',
  reviewPeriod: '',
  referenceNumber: '',

  customerName: '',
  customerId: '',
  accountManager: '',
  region: '',
  currency: '',
  ledgerBalance: '',

  openingBalance: '',
  closingBalance: '',
  totalDebits: '',
  totalCredits: '',
  outstandingAmount: '',
  agingBucket: '',

  keyTransactionsSummary: '',

  keyObservations: '',
  issuesIdentified: '',
  riskAssessment: '',

  correctiveActions: '',
  responsiblePerson: '',
  targetResolutionDate: '',

  preparedByAuthorization: '',
  arReview: '',
  financeApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00247_CustomerLedgerReview = () => {

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
          <Field as="textarea" name={name} className="form-textarea" rows="3" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (

    <ModernFormWrapper
      formId="FRM-00247"
      title="Customer Ledger Review – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Customer ledger review submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00247"
              title="Customer Ledger Review"
              department="Finance & Accounting – Accounts Receivable"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'reviewDate','Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'reviewPeriod','Review Period')}
                  {field(values,'referenceNumber','Reference Number')}
                </div>
              </div>

              {/* 2. Customer Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Customer Details</h3>
                <div className="form-fields">
                  {field(values,'customerName','Customer Name')}
                  {field(values,'customerId','Customer ID')}
                  {field(values,'accountManager','Account Manager')}
                  {field(values,'region','Region')}
                  {field(values,'currency','Currency')}
                  {field(values,'ledgerBalance','Ledger Balance','number')}
                </div>
              </div>

              {/* 3. Ledger Summary */}
              <div className="form-section">
                <h3 className="form-section-title">3. Ledger Summary</h3>
                <div className="form-fields">
                  {field(values,'openingBalance','Opening Balance','number')}
                  {field(values,'closingBalance','Closing Balance','number')}
                  {field(values,'totalDebits','Total Debits','number')}
                  {field(values,'totalCredits','Total Credits','number')}
                  {field(values,'outstandingAmount','Outstanding Amount','number')}
                  {field(values,'agingBucket','Aging Bucket')}
                </div>
              </div>

              {/* 4. Key Transactions */}
              <div className="form-section">
                <h3 className="form-section-title">4. Key Transactions</h3>
                <div className="form-fields">
                  {textarea(values,'keyTransactionsSummary','Date / Description / Debit / Credit / Balance')}
                </div>
              </div>

              {/* 5. Observations */}
              <div className="form-section">
                <h3 className="form-section-title">5. Observations</h3>
                <div className="form-fields">
                  {textarea(values,'keyObservations','Key Observations')}
                  {textarea(values,'issuesIdentified','Issues Identified')}
                  {textarea(values,'riskAssessment','Risk Assessment')}
                </div>
              </div>

              {/* 6. Action Plan */}
              <div className="form-section">
                <h3 className="form-section-title">6. Action Plan</h3>
                <div className="form-fields">
                  {textarea(values,'correctiveActions','Corrective Actions')}
                  {field(values,'responsiblePerson','Responsible Person')}
                  {field(values,'targetResolutionDate','Target Resolution Date','date')}
                </div>
              </div>

              {/* 7. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">7. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByAuthorization','Prepared By (Name)')}
                  {field(values,'arReview','AR Review')}
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
                    Submit Customer Ledger Review
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

export default FRM00247_CustomerLedgerReview;
