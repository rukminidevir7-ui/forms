// FRM00254_StatementOfAccount.jsx
// FRM-00254 – Statement of Account – Report / Record Form

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
  statementDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  statementPeriod: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),

  // 2. Customer Details
  customerName: Yup.string().required('Required'),
  customerId: Yup.string().required('Required'),
  billingAddress: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  contactDetails: Yup.string().required('Required'),
  accountManager: Yup.string().required('Required'),

  // 3. Account Summary
  openingBalance: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),
  totalDebits: Yup.string().required('Required'),
  totalCredits: Yup.string().required('Required'),
  closingBalance: Yup.string().required('Required'),
  outstandingAmount: Yup.string().required('Required'),

  // 4. Transaction Details (summary capture)
  transactionSummary: Yup.string().required('Required'),

  // 5. Notes
  remarks: Yup.string().required('Required'),
  specialInstructions: Yup.string().required('Required'),

  // 6. Authorization
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
  statementDate: '',
  department: '',
  preparedBy: '',
  statementPeriod: '',
  referenceNumber: '',

  customerName: '',
  customerId: '',
  billingAddress: '',
  contactPerson: '',
  contactDetails: '',
  accountManager: '',

  openingBalance: '',
  currency: '',
  totalDebits: '',
  totalCredits: '',
  closingBalance: '',
  outstandingAmount: '',

  transactionSummary: '',

  remarks: '',
  specialInstructions: '',

  preparedByAuthorization: '',
  arReview: '',
  financeApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00254_StatementOfAccount = () => {

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

  return (

    <ModernFormWrapper
      formId="FRM-00254"
      title="Statement of Account – Report / Record Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Statement of Account generated successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00254"
              title="Statement of Account"
              department="Finance & Accounting – Accounts Receivable"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'statementDate','Statement Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'statementPeriod','Statement Period')}
                  {field(values,'referenceNumber','Reference Number')}
                </div>
              </div>

              {/* 2. Customer Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Customer Details</h3>
                <div className="form-fields">
                  {field(values,'customerName','Customer Name')}
                  {field(values,'customerId','Customer ID')}
                  {field(values,'billingAddress','Billing Address')}
                  {field(values,'contactPerson','Contact Person')}
                  {field(values,'contactDetails','Email / Phone')}
                  {field(values,'accountManager','Account Manager')}
                </div>
              </div>

              {/* 3. Account Summary */}
              <div className="form-section">
                <h3 className="form-section-title">3. Account Summary</h3>
                <div className="form-fields">
                  {field(values,'openingBalance','Opening Balance','number')}
                  {field(values,'currency','Currency')}
                  {field(values,'totalDebits','Total Debits','number')}
                  {field(values,'totalCredits','Total Credits','number')}
                  {field(values,'closingBalance','Closing Balance','number')}
                  {field(values,'outstandingAmount','Outstanding Amount','number')}
                </div>
              </div>

              {/* 4. Transaction Details */}
              <div className="form-section">
                <h3 className="form-section-title">4. Transaction Details</h3>
                <div className="form-fields">
                  {textarea(values,'transactionSummary','Date / Reference / Description / Debit / Credit / Balance')}
                </div>
              </div>

              {/* 5. Notes */}
              <div className="form-section">
                <h3 className="form-section-title">5. Notes</h3>
                <div className="form-fields">
                  {textarea(values,'remarks','Remarks')}
                  {textarea(values,'specialInstructions','Special Instructions')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
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
                    Generate Statement of Account
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

export default FRM00254_StatementOfAccount;
