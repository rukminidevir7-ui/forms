// FRM00253_BillingDispute.jsx
// FRM-00253 – Billing Dispute – Report / Record Form

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
  disputeDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // 2. Customer Details
  customerName: Yup.string().required('Required'),
  customerId: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  contactDetails: Yup.string().required('Required'),
  accountManager: Yup.string().required('Required'),
  region: Yup.string().required('Required'),

  // 3. Invoice Details
  invoiceNumber: Yup.string().required('Required'),
  invoiceDate: Yup.string().required('Required'),
  dueDate: Yup.string().required('Required'),
  invoiceAmount: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),
  disputedAmount: Yup.string().required('Required'),

  // 4. Dispute Details
  disputeCategory: Yup.string().required('Required'),
  disputeDescription: Yup.string().required('Required'),
  supportingExplanation: Yup.string().required('Required'),

  // 5. Investigation & Findings
  investigationSummary: Yup.string().required('Required'),
  rootCause: Yup.string().required('Required'),
  impactAssessment: Yup.string().required('Required'),

  // 6. Resolution Plan
  resolutionAction: Yup.string().required('Required'),
  adjustmentRequired: Yup.string().required('Required'),
  expectedResolutionDate: Yup.string().required('Required'),

  // 7. Authorization
  preparedByAuthorization: Yup.string().required('Required'),
  billingArReview: Yup.string().required('Required'),
  financeApproval: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  formId: '',
  disputeDate: '',
  department: '',
  preparedBy: '',
  referenceNumber: '',
  priorityLevel: '',

  customerName: '',
  customerId: '',
  contactPerson: '',
  contactDetails: '',
  accountManager: '',
  region: '',

  invoiceNumber: '',
  invoiceDate: '',
  dueDate: '',
  invoiceAmount: '',
  currency: '',
  disputedAmount: '',

  disputeCategory: '',
  disputeDescription: '',
  supportingExplanation: '',

  investigationSummary: '',
  rootCause: '',
  impactAssessment: '',

  resolutionAction: '',
  adjustmentRequired: '',
  expectedResolutionDate: '',

  preparedByAuthorization: '',
  billingArReview: '',
  financeApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00253_BillingDispute = () => {

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
      formId="FRM-00253"
      title="Billing Dispute – Report / Record Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Billing dispute recorded successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00253"
              title="Billing Dispute"
              department="Finance & Accounting – Accounts Receivable"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'disputeDate','Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'preparedBy','Prepared By')}
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
                  {field(values,'contactPerson','Contact Person')}
                  {field(values,'contactDetails','Email / Phone')}
                  {field(values,'accountManager','Account Manager')}
                  {field(values,'region','Region')}
                </div>
              </div>

              {/* 3. Invoice Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Invoice Details</h3>
                <div className="form-fields">
                  {field(values,'invoiceNumber','Invoice Number')}
                  {field(values,'invoiceDate','Invoice Date','date')}
                  {field(values,'dueDate','Due Date','date')}
                  {field(values,'invoiceAmount','Invoice Amount','number')}
                  {field(values,'currency','Currency')}
                  {field(values,'disputedAmount','Disputed Amount','number')}
                </div>
              </div>

              {/* 4. Dispute Details */}
              <div className="form-section">
                <h3 className="form-section-title">4. Dispute Details</h3>
                <div className="form-fields">
                  {select(values,'disputeCategory','Dispute Category',['Pricing Error','Quantity Mismatch','Tax Discrepancy','Service Quality','Contract Interpretation','Other'])}
                  {textarea(values,'disputeDescription','Dispute Description')}
                  {textarea(values,'supportingExplanation','Supporting Explanation')}
                </div>
              </div>

              {/* 5. Investigation & Findings */}
              <div className="form-section">
                <h3 className="form-section-title">5. Investigation & Findings</h3>
                <div className="form-fields">
                  {textarea(values,'investigationSummary','Investigation Summary')}
                  {textarea(values,'rootCause','Root Cause')}
                  {textarea(values,'impactAssessment','Impact Assessment')}
                </div>
              </div>

              {/* 6. Resolution Plan */}
              <div className="form-section">
                <h3 className="form-section-title">6. Resolution Plan</h3>
                <div className="form-fields">
                  {textarea(values,'resolutionAction','Resolution Action')}
                  {select(values,'adjustmentRequired','Adjustment Required',['Yes','No'])}
                  {field(values,'expectedResolutionDate','Expected Resolution Date','date')}
                </div>
              </div>

              {/* 7. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">7. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByAuthorization','Prepared By (Name)')}
                  {field(values,'billingArReview','Billing / AR Review')}
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
                    Submit Billing Dispute
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

export default FRM00253_BillingDispute;
