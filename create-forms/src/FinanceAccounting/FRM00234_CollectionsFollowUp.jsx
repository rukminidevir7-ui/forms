// FRM00234_CollectionsFollowUp.jsx
// FRM-00234 – Collections Follow-up – Request / Initiation Form

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
  followUpDate: Yup.string().required('Required'),
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

  // 3. Outstanding Details
  invoiceNumber: Yup.string().required('Required'),
  invoiceDate: Yup.string().required('Required'),
  dueDate: Yup.string().required('Required'),
  outstandingAmount: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),
  agingBucket: Yup.string().required('Required'),

  // 4. Follow-up History
  lastContactDate: Yup.string().required('Required'),
  contactMethod: Yup.string().required('Required'),
  discussionSummary: Yup.string().required('Required'),

  // 5. Action Plan
  nextFollowUpDate: Yup.string().required('Required'),
  proposedAction: Yup.string().required('Required'),
  expectedCollectionDate: Yup.string().required('Required'),

  // 6. Risk Assessment
  collectionRiskLevel: Yup.string().required('Required'),
  escalationRequired: Yup.string().required('Required'),
  remarks: Yup.string().required('Required'),

  // 7. Authorization
  preparedByAuthorization: Yup.string().required('Required'),
  collectionsReview: Yup.string().required('Required'),
  financeApproval: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  formId: '',
  followUpDate: '',
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
  outstandingAmount: '',
  currency: '',
  agingBucket: '',

  lastContactDate: '',
  contactMethod: '',
  discussionSummary: '',

  nextFollowUpDate: '',
  proposedAction: '',
  expectedCollectionDate: '',

  collectionRiskLevel: '',
  escalationRequired: '',
  remarks: '',

  preparedByAuthorization: '',
  collectionsReview: '',
  financeApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00234_CollectionsFollowUp = () => {

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
      formId="FRM-00234"
      title="Collections Follow-up – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Collections follow-up submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00234"
              title="Collections Follow-up"
              department="Finance & Accounting – Accounts Receivable"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'followUpDate','Date','date')}
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

              {/* 3. Outstanding Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Outstanding Details</h3>
                <div className="form-fields">
                  {field(values,'invoiceNumber','Invoice Number')}
                  {field(values,'invoiceDate','Invoice Date','date')}
                  {field(values,'dueDate','Due Date','date')}
                  {field(values,'outstandingAmount','Outstanding Amount','number')}
                  {field(values,'currency','Currency')}
                  {field(values,'agingBucket','Aging Bucket')}
                </div>
              </div>

              {/* 4. Follow-up History */}
              <div className="form-section">
                <h3 className="form-section-title">4. Follow-up History</h3>
                <div className="form-fields">
                  {field(values,'lastContactDate','Last Contact Date','date')}
                  {field(values,'contactMethod','Contact Method')}
                  {textarea(values,'discussionSummary','Summary of Discussion')}
                </div>
              </div>

              {/* 5. Action Plan */}
              <div className="form-section">
                <h3 className="form-section-title">5. Action Plan</h3>
                <div className="form-fields">
                  {field(values,'nextFollowUpDate','Next Follow-up Date','date')}
                  {textarea(values,'proposedAction','Proposed Action')}
                  {field(values,'expectedCollectionDate','Expected Collection Date','date')}
                </div>
              </div>

              {/* 6. Risk Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">6. Risk Assessment</h3>
                <div className="form-fields">
                  {select(values,'collectionRiskLevel','Collection Risk Level',['Low','Medium','High','Critical'])}
                  {select(values,'escalationRequired','Escalation Required',['Yes','No'])}
                  {textarea(values,'remarks','Remarks')}
                </div>
              </div>

              {/* 7. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">7. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByAuthorization','Prepared By (Name)')}
                  {field(values,'collectionsReview','Collections / AR Review')}
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
                    Submit Collections Follow-up
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

export default FRM00234_CollectionsFollowUp;
