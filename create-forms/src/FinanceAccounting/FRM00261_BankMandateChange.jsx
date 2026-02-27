// FRM00261_BankMandateChange.jsx
// FRM-00261 – Bank Mandate Change – Report / Record Form

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
  preparedBy: Yup.string().required('Required'),
  entityName: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),

  // 2. Bank Account Details
  bankName: Yup.string().required('Required'),
  branchName: Yup.string().required('Required'),
  accountNumber: Yup.string().required('Required'),
  accountType: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),
  accountName: Yup.string().required('Required'),

  // 3. Change Details
  changeType: Yup.string().required('Required'),
  currentMandateDetails: Yup.string().required('Required'),
  proposedMandateDetails: Yup.string().required('Required'),
  effectiveDate: Yup.string().required('Required'),

  // 4. Updated Signatories
  updatedSignatories: Yup.string().required('Required'),

  // 5. Compliance Checks
  supportingDocsVerified: Yup.string().required('Required'),
  managementApprovalRequired: Yup.string().required('Required'),
  bankNotificationCompleted: Yup.string().required('Required'),

  // 6. Authorization
  preparedByAuthorization: Yup.string().required('Required'),
  treasuryReview: Yup.string().required('Required'),
  financeApproval: Yup.string().required('Required'),
  managementApproval: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  formId: '',
  requestDate: '',
  department: '',
  preparedBy: '',
  entityName: '',
  referenceNumber: '',

  bankName: '',
  branchName: '',
  accountNumber: '',
  accountType: '',
  currency: '',
  accountName: '',

  changeType: '',
  currentMandateDetails: '',
  proposedMandateDetails: '',
  effectiveDate: '',

  updatedSignatories: '',

  supportingDocsVerified: '',
  managementApprovalRequired: '',
  bankNotificationCompleted: '',

  preparedByAuthorization: '',
  treasuryReview: '',
  financeApproval: '',
  managementApproval: '',
  approvalDate: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00261_BankMandateChange = () => {

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
      formId="FRM-00261"
      title="Bank Mandate Change – Report / Record Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Bank mandate change recorded successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00261"
              title="Bank Mandate Change"
              department="Finance & Accounting – Treasury & Banking"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'entityName','Entity / Company Name')}
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
                  {field(values,'accountType','Account Type')}
                  {field(values,'currency','Currency')}
                  {field(values,'accountName','Account Name')}
                </div>
              </div>

              {/* 3. Change Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Change Details</h3>
                <div className="form-fields">
                  {select(values,'changeType','Type of Change',['Add Signatory','Remove Signatory','Change Signing Authority','Change Account Name','Update Mandate Structure','Other'])}
                  {textarea(values,'currentMandateDetails','Current Mandate Details')}
                  {textarea(values,'proposedMandateDetails','Proposed Mandate Details')}
                  {field(values,'effectiveDate','Effective Date','date')}
                </div>
              </div>

              {/* 4. Updated Signatories */}
              <div className="form-section">
                <h3 className="form-section-title">4. Updated Signatories</h3>
                <div className="form-fields">
                  {textarea(values,'updatedSignatories','Signatory Name / Designation / ID / Employee No.')}
                </div>
              </div>

              {/* 5. Compliance Checks */}
              <div className="form-section">
                <h3 className="form-section-title">5. Compliance Checks</h3>
                <div className="form-fields">
                  {select(values,'supportingDocsVerified','Supporting Documents Verified',['Yes','No'])}
                  {select(values,'managementApprovalRequired','Management Approval Required',['Yes','No'])}
                  {select(values,'bankNotificationCompleted','Bank Notification Completed',['Yes','No'])}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByAuthorization','Prepared By (Name)')}
                  {field(values,'treasuryReview','Treasury Review')}
                  {field(values,'financeApproval','Finance Approval')}
                  {field(values,'managementApproval','Management Approval')}
                  {field(values,'approvalDate','Approval Date','date')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Bank Mandate Change
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

export default FRM00261_BankMandateChange;
