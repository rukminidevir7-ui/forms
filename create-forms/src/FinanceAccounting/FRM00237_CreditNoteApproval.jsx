// FRM00237_CreditNoteApproval.jsx
// FRM-00237 – Credit Note Approval – Approval / Authorization Form

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
  transactionDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  transactionType: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // 2. Customer Details
  customerName: Yup.string().required('Required'),
  customerId: Yup.string().required('Required'),
  billingAddress: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  contactDetails: Yup.string().required('Required'),
  accountManager: Yup.string().required('Required'),

  // 3. Transaction Details
  documentNumber: Yup.string().required('Required'),
  documentDate: Yup.string().required('Required'),
  relatedReference: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),
  transactionAmount: Yup.string().required('Required'),
  reasonPurpose: Yup.string().required('Required'),

  // 4. Financial Impact
  revenueImpact: Yup.string().required('Required'),
  glAccountCode: Yup.string().required('Required'),
  adjustmentRequired: Yup.string().required('Required'),

  // 5. Justification
  businessJustification: Yup.string().required('Required'),
  supportingExplanation: Yup.string().required('Required'),

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
  transactionDate: '',
  department: '',
  preparedBy: '',
  transactionType: '',
  referenceNumber: '',
  priorityLevel: '',

  customerName: '',
  customerId: '',
  billingAddress: '',
  contactPerson: '',
  contactDetails: '',
  accountManager: '',

  documentNumber: '',
  documentDate: '',
  relatedReference: '',
  currency: '',
  transactionAmount: '',
  reasonPurpose: '',

  revenueImpact: '',
  glAccountCode: '',
  adjustmentRequired: '',

  businessJustification: '',
  supportingExplanation: '',

  preparedByAuthorization: '',
  arBillingReview: '',
  financeApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00237_CreditNoteApproval = () => {

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
      formId="FRM-00237"
      title="Credit Note Approval – Approval / Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Credit Note / Customer Advance approval submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00237"
              title="Credit Note / Customer Advance Approval"
              department="Finance & Accounting – Accounts Receivable"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'transactionDate','Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'preparedBy','Prepared By')}
                  {select(values,'transactionType','Transaction Type',['Credit Note','Customer Advance'])}
                  {field(values,'referenceNumber','Reference Number')}
                  {select(values,'priorityLevel','Priority Level',['Low','Medium','High','Critical'])}
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

              {/* 3. Transaction Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Transaction Details</h3>
                <div className="form-fields">
                  {field(values,'documentNumber','Document Number')}
                  {field(values,'documentDate','Document Date','date')}
                  {field(values,'relatedReference','Related Invoice / Reference')}
                  {field(values,'currency','Currency')}
                  {field(values,'transactionAmount','Amount','number')}
                  {textarea(values,'reasonPurpose','Reason / Purpose')}
                </div>
              </div>

              {/* 4. Financial Impact */}
              <div className="form-section">
                <h3 className="form-section-title">4. Financial Impact</h3>
                <div className="form-fields">
                  {textarea(values,'revenueImpact','Revenue Impact')}
                  {field(values,'glAccountCode','GL / Account Code')}
                  {select(values,'adjustmentRequired','Adjustment Required',['Yes','No'])}
                </div>
              </div>

              {/* 5. Justification */}
              <div className="form-section">
                <h3 className="form-section-title">5. Justification</h3>
                <div className="form-fields">
                  {textarea(values,'businessJustification','Business Justification')}
                  {textarea(values,'supportingExplanation','Supporting Explanation')}
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
                    Submit Credit Note Approval
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

export default FRM00237_CreditNoteApproval;
