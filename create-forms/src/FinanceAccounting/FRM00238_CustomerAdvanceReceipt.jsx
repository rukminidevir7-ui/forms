// FRM00238_CustomerAdvanceReceipt.jsx
// FRM-00238 – Customer Advance Receipt – Request / Initiation Form

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
  receiptEntryDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // 2. Customer Details
  customerName: Yup.string().required('Required'),
  customerId: Yup.string().required('Required'),
  billingAddress: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  contactDetails: Yup.string().required('Required'),
  accountManager: Yup.string().required('Required'),

  // 3. Receipt Details
  receiptNumber: Yup.string().required('Required'),
  receiptDate: Yup.string().required('Required'),
  amountReceived: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),
  paymentMethod: Yup.string().required('Required'),
  bankReference: Yup.string().required('Required'),

  // 4. Allocation Details
  relatedReference: Yup.string().required('Required'),
  advanceType: Yup.string().required('Required'),
  expectedAdjustmentDate: Yup.string().required('Required'),

  // 5. Financial Impact
  glAccountCode: Yup.string().required('Required'),
  revenueRecognitionImpact: Yup.string().required('Required'),
  adjustmentRequired: Yup.string().required('Required'),

  // 6. Authorization
  preparedByAuthorization: Yup.string().required('Required'),
  arBillingReview: Yup.string().required('Required'),
  financeApproval: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  formId: '',
  receiptEntryDate: '',
  department: '',
  preparedBy: '',
  referenceNumber: '',
  priorityLevel: '',

  customerName: '',
  customerId: '',
  billingAddress: '',
  contactPerson: '',
  contactDetails: '',
  accountManager: '',

  receiptNumber: '',
  receiptDate: '',
  amountReceived: '',
  currency: '',
  paymentMethod: '',
  bankReference: '',

  relatedReference: '',
  advanceType: '',
  expectedAdjustmentDate: '',

  glAccountCode: '',
  revenueRecognitionImpact: '',
  adjustmentRequired: '',

  preparedByAuthorization: '',
  arBillingReview: '',
  financeApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00238_CustomerAdvanceReceipt = () => {

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
      formId="FRM-00238"
      title="Customer Advance Receipt – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Customer advance receipt submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00238"
              title="Customer Advance Receipt"
              department="Finance & Accounting – Accounts Receivable"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'receiptEntryDate','Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {select(values,'priorityLevel','Priority Level',['Low','Medium','High','Urgent'])}
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

              {/* 3. Receipt Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Receipt Details</h3>
                <div className="form-fields">
                  {field(values,'receiptNumber','Receipt Number')}
                  {field(values,'receiptDate','Receipt Date','date')}
                  {field(values,'amountReceived','Amount Received','number')}
                  {field(values,'currency','Currency')}
                  {select(values,'paymentMethod','Payment Method',['Bank Transfer','Cheque','RTGS','NEFT','UPI','Cash'])}
                  {field(values,'bankReference','Bank / Reference')}
                </div>
              </div>

              {/* 4. Allocation Details */}
              <div className="form-section">
                <h3 className="form-section-title">4. Allocation Details</h3>
                <div className="form-fields">
                  {field(values,'relatedReference','Related Invoice / Contract')}
                  {select(values,'advanceType','Advance Type',['Project Advance','Retainer','Milestone Advance','Security Deposit','Other'])}
                  {field(values,'expectedAdjustmentDate','Expected Adjustment Date','date')}
                </div>
              </div>

              {/* 5. Financial Impact */}
              <div className="form-section">
                <h3 className="form-section-title">5. Financial Impact</h3>
                <div className="form-fields">
                  {field(values,'glAccountCode','GL / Account Code')}
                  {textarea(values,'revenueRecognitionImpact','Revenue Recognition Impact')}
                  {select(values,'adjustmentRequired','Adjustment Required',['Yes','No'])}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByAuthorization','Prepared By (Name)')}
                  {field(values,'arBillingReview','AR / Billing Review')}
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
                    Submit Customer Advance Receipt
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

export default FRM00238_CustomerAdvanceReceipt;
