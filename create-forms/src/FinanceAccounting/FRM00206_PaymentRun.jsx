// FRM00206_PaymentRun.jsx
// FRM-00206 – Payment Run – Request / Initiation Form

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

  // Basic Information
  formId: Yup.string().required('Required'),
  runDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // Payment Run Details
  paymentRunId: Yup.string().required('Required'),
  paymentMethod: Yup.string().required('Required'),
  bankAccount: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),
  totalAmount: Yup.string().required('Required'),
  numberOfPayments: Yup.string().required('Required'),

  // Payment Scope
  vendorGroup: Yup.string().required('Required'),
  paymentPeriod: Yup.string().required('Required'),
  selectionCriteria: Yup.string().required('Required'),

  // Control Checks
  invoicesVerified: Yup.string().required('Required'),
  approvalsCompleted: Yup.string().required('Required'),
  duplicateCheckDone: Yup.string().required('Required'),
  bankDetailsVerified: Yup.string().required('Required'),
  fundsAvailabilityConfirmed: Yup.string().required('Required'),

  // Risk & Notes
  keyRisksIdentified: Yup.string().required('Required'),
  exceptions: Yup.string().required('Required'),
  remarks: Yup.string().required('Required'),

  // Authorization
  preparedByAuthorization: Yup.string().required('Required'),
  accountsPayableApproval: Yup.string().required('Required'),
  financeApproval: Yup.string().required('Required'),
  treasuryApproval: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  formId: '',
  runDate: '',
  department: '',
  preparedBy: '',
  referenceNumber: '',
  priorityLevel: '',

  paymentRunId: '',
  paymentMethod: '',
  bankAccount: '',
  currency: '',
  totalAmount: '',
  numberOfPayments: '',

  vendorGroup: '',
  paymentPeriod: '',
  selectionCriteria: '',

  invoicesVerified: '',
  approvalsCompleted: '',
  duplicateCheckDone: '',
  bankDetailsVerified: '',
  fundsAvailabilityConfirmed: '',

  keyRisksIdentified: '',
  exceptions: '',
  remarks: '',

  preparedByAuthorization: '',
  accountsPayableApproval: '',
  financeApproval: '',
  treasuryApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00206_PaymentRun = () => {

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
      formId="FRM-00206"
      title="Payment Run – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Payment run request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00206"
              title="Payment Run"
              department="Finance & Accounting – Accounts Payable"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'runDate','Run Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {select(values,'priorityLevel','Priority Level',['Low','Medium','High','Urgent'])}
                </div>
              </div>

              {/* 2. Payment Run Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Payment Run Details</h3>
                <div className="form-fields">
                  {field(values,'paymentRunId','Payment Run ID')}
                  {select(values,'paymentMethod','Payment Method',['Bank Transfer','Cheque','NEFT','RTGS','Bulk Upload'])}
                  {field(values,'bankAccount','Bank Account')}
                  {field(values,'currency','Currency')}
                  {field(values,'totalAmount','Total Amount','number')}
                  {field(values,'numberOfPayments','Number of Payments','number')}
                </div>
              </div>

              {/* 3. Payment Scope */}
              <div className="form-section">
                <h3 className="form-section-title">3. Payment Scope</h3>
                <div className="form-fields">
                  {field(values,'vendorGroup','Vendor / Beneficiary Group')}
                  {field(values,'paymentPeriod','Payment Period')}
                  {textarea(values,'selectionCriteria','Selection Criteria')}
                </div>
              </div>

              {/* 4. Control Checks */}
              <div className="form-section">
                <h3 className="form-section-title">4. Control Checks</h3>
                <div className="form-fields">
                  {select(values,'invoicesVerified','Invoices Verified',['Yes','No'])}
                  {select(values,'approvalsCompleted','Approvals Completed',['Yes','No'])}
                  {select(values,'duplicateCheckDone','Duplicate Check Done',['Yes','No'])}
                  {select(values,'bankDetailsVerified','Bank Details Verified',['Yes','No'])}
                  {select(values,'fundsAvailabilityConfirmed','Funds Availability Confirmed',['Yes','No'])}
                </div>
              </div>

              {/* 5. Risk & Notes */}
              <div className="form-section">
                <h3 className="form-section-title">5. Risk & Notes</h3>
                <div className="form-fields">
                  {textarea(values,'keyRisksIdentified','Key Risks Identified')}
                  {textarea(values,'exceptions','Exceptions')}
                  {textarea(values,'remarks','Remarks')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByAuthorization','Prepared By (Name)')}
                  {field(values,'accountsPayableApproval','Accounts Payable Approval')}
                  {field(values,'financeApproval','Finance Approval')}
                  {field(values,'treasuryApproval','Treasury Approval')}
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
                    Submit Payment Run Request
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

export default FRM00206_PaymentRun;
