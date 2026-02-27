// FRM00205_InvoiceVerification.jsx
// FRM-00205 – Invoice Verification – Checklist Form

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
  verificationDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  verifiedBy: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // Invoice Details
  vendorName: Yup.string().required('Required'),
  invoiceNumber: Yup.string().required('Required'),
  invoiceDate: Yup.string().required('Required'),
  invoiceAmount: Yup.string().required('Required'),
  poNumber: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),

  // Verification Checklist
  poMatchCheck: Yup.string().required('Required'),
  grnMatchCheck: Yup.string().required('Required'),
  calculationCheck: Yup.string().required('Required'),
  taxVerificationCheck: Yup.string().required('Required'),
  vendorVerificationCheck: Yup.string().required('Required'),
  duplicateInvoiceCheck: Yup.string().required('Required'),
  approvalCheck: Yup.string().required('Required'),

  // Exceptions & Notes
  exceptionsIdentified: Yup.string().required('Required'),
  actionRequired: Yup.string().required('Required'),
  remarks: Yup.string().required('Required'),

  // Authorization
  verifiedByAuthorization: Yup.string().required('Required'),
  financeReview: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  formId: '',
  verificationDate: '',
  department: '',
  verifiedBy: '',
  referenceNumber: '',
  priorityLevel: '',

  vendorName: '',
  invoiceNumber: '',
  invoiceDate: '',
  invoiceAmount: '',
  poNumber: '',
  currency: '',

  poMatchCheck: '',
  grnMatchCheck: '',
  calculationCheck: '',
  taxVerificationCheck: '',
  vendorVerificationCheck: '',
  duplicateInvoiceCheck: '',
  approvalCheck: '',

  exceptionsIdentified: '',
  actionRequired: '',
  remarks: '',

  verifiedByAuthorization: '',
  financeReview: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00205_InvoiceVerification = () => {

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
      formId="FRM-00205"
      title="Invoice Verification – Checklist Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Invoice verification checklist submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00205"
              title="Invoice Verification"
              department="Finance & Accounting – Accounts Payable"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'verificationDate','Verification Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'verifiedBy','Verified By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {select(values,'priorityLevel','Priority Level',['Low','Medium','High','Urgent'])}
                </div>
              </div>

              {/* 2. Invoice Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Invoice Details</h3>
                <div className="form-fields">
                  {field(values,'vendorName','Vendor Name')}
                  {field(values,'invoiceNumber','Invoice Number')}
                  {field(values,'invoiceDate','Invoice Date','date')}
                  {field(values,'invoiceAmount','Invoice Amount','number')}
                  {field(values,'poNumber','PO Number')}
                  {field(values,'currency','Currency')}
                </div>
              </div>

              {/* 3. Verification Checklist */}
              <div className="form-section">
                <h3 className="form-section-title">3. Verification Checklist</h3>
                <div className="form-fields">
                  {select(values,'poMatchCheck','Invoice matches Purchase Order',['Yes','No'])}
                  {select(values,'grnMatchCheck','Invoice matches Goods Receipt / Service Confirmation',['Yes','No'])}
                  {select(values,'calculationCheck','Invoice calculations verified',['Yes','No'])}
                  {select(values,'taxVerificationCheck','Tax details verified',['Yes','No'])}
                  {select(values,'vendorVerificationCheck','Vendor details verified',['Yes','No'])}
                  {select(values,'duplicateInvoiceCheck','Duplicate invoice check completed',['Yes','No'])}
                  {select(values,'approvalCheck','Required approvals obtained',['Yes','No'])}
                </div>
              </div>

              {/* 4. Exceptions & Notes */}
              <div className="form-section">
                <h3 className="form-section-title">4. Exceptions & Notes</h3>
                <div className="form-fields">
                  {textarea(values,'exceptionsIdentified','Exceptions Identified')}
                  {textarea(values,'actionRequired','Action Required')}
                  {textarea(values,'remarks','Remarks')}
                </div>
              </div>

              {/* 5. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'verifiedByAuthorization','Verified By (Name)')}
                  {field(values,'financeReview','Finance Review')}
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
                    Submit Invoice Verification
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

export default FRM00205_InvoiceVerification;
