// FRM00271_ChequeIssue.jsx
// FRM-00271 – Cheque Issue – Request / Initiation Form

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
  requestDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  requestedBy: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  priority: Yup.string().required('Required'),

  // 2. Payee Details
  payeeName: Yup.string().required('Required'),
  vendorId: Yup.string().required('Required'),
  payeeAddress: Yup.string().required('Required'),
  contactDetails: Yup.string().required('Required'),

  // 3. Payment Details
  bankName: Yup.string().required('Required'),
  accountNumber: Yup.string().required('Required'),
  chequeAmount: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),
  paymentPurpose: Yup.string().required('Required'),
  invoiceReference: Yup.string().required('Required'),
  requiredIssueDate: Yup.string().required('Required'),
  deliveryMethod: Yup.string().required('Required'),

  // 4. Control Checks
  documentsVerified: Yup.string().required('Required'),
  budgetConfirmed: Yup.string().required('Required'),
  approvalRequired: Yup.string().required('Required'),

  // 5. Authorization
  requestedByAuthorization: Yup.string().required('Required'),
  treasuryReview: Yup.string().required('Required'),
  financeApproval: Yup.string().required('Required'),
  authorizedSignatory: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  formId: '',
  requestDate: '',
  department: '',
  requestedBy: '',
  referenceNumber: '',
  priority: '',

  payeeName: '',
  vendorId: '',
  payeeAddress: '',
  contactDetails: '',

  bankName: '',
  accountNumber: '',
  chequeAmount: '',
  currency: '',
  paymentPurpose: '',
  invoiceReference: '',
  requiredIssueDate: '',
  deliveryMethod: '',

  documentsVerified: '',
  budgetConfirmed: '',
  approvalRequired: '',

  requestedByAuthorization: '',
  treasuryReview: '',
  financeApproval: '',
  authorizedSignatory: '',
  approvalDate: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00271_ChequeIssue = () => {

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
      formId="FRM-00271"
      title="Cheque Issue – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Cheque issue request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00271"
              title="Cheque Issue"
              department="Finance & Accounting – Treasury & Banking"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'requestedBy','Requested By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {select(values,'priority','Priority',['Low','Medium','High','Urgent'])}
                </div>
              </div>

              {/* 2. Payee Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Payee Details</h3>
                <div className="form-fields">
                  {field(values,'payeeName','Payee Name')}
                  {field(values,'vendorId','Vendor / Party ID')}
                  {textarea(values,'payeeAddress','Address')}
                  {field(values,'contactDetails','Contact Details')}
                </div>
              </div>

              {/* 3. Payment Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Payment Details</h3>
                <div className="form-fields">
                  {field(values,'bankName','Bank Name')}
                  {field(values,'accountNumber','Account Number')}
                  {field(values,'chequeAmount','Cheque Amount','number')}
                  {field(values,'currency','Currency')}
                  {textarea(values,'paymentPurpose','Payment Purpose')}
                  {field(values,'invoiceReference','Invoice / Reference')}
                  {field(values,'requiredIssueDate','Required Issue Date','date')}
                  {select(values,'deliveryMethod','Delivery Method',['Hand Delivery','Courier','Registered Post','Direct Collection','Other'])}
                </div>
              </div>

              {/* 4. Control Checks */}
              <div className="form-section">
                <h3 className="form-section-title">4. Control Checks</h3>
                <div className="form-fields">
                  {select(values,'documentsVerified','Supporting Documents Verified',['Yes','No'])}
                  {select(values,'budgetConfirmed','Budget Availability Confirmed',['Yes','No'])}
                  {select(values,'approvalRequired','Approval Required',['Yes','No'])}
                </div>
              </div>

              {/* 5. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requestedByAuthorization','Requested By (Name)')}
                  {field(values,'treasuryReview','Treasury Review')}
                  {field(values,'financeApproval','Finance Approval')}
                  {field(values,'authorizedSignatory','Authorized Signatory')}
                  {field(values,'approvalDate','Approval Date','date')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Cheque Issue Request
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

export default FRM00271_ChequeIssue;
