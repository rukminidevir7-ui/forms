// FRM00212_VendorCreditNote.jsx
// FRM-00212 – Vendor Credit Note – Request / Initiation Form

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
  priorityLevel: Yup.string().required('Required'),

  // 2. Vendor Details
  vendorName: Yup.string().required('Required'),
  vendorId: Yup.string().required('Required'),
  vendorAddress: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  vendorContact: Yup.string().required('Required'),
  taxIdGst: Yup.string().required('Required'),

  // 3. Credit Note Details
  creditNoteNumber: Yup.string().required('Required'),
  creditNoteDate: Yup.string().required('Required'),
  relatedInvoiceNumber: Yup.string().required('Required'),
  invoiceDate: Yup.string().required('Required'),
  creditAmount: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),

  // 4. Reason & Description
  reasonForCredit: Yup.string().required('Required'),
  adjustmentDescription: Yup.string().required('Required'),
  impactOnPayables: Yup.string().required('Required'),

  // 5. Accounting Details
  costCenterGlCode: Yup.string().required('Required'),
  taxAdjustmentAmount: Yup.string().required('Required'),
  netAdjustmentAmount: Yup.string().required('Required'),

  // 6. Review & Authorization
  requestedByAuthorization: Yup.string().required('Required'),
  accountsPayableApproval: Yup.string().required('Required'),
  financeApproval: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

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
  priorityLevel: '',

  vendorName: '',
  vendorId: '',
  vendorAddress: '',
  contactPerson: '',
  vendorContact: '',
  taxIdGst: '',

  creditNoteNumber: '',
  creditNoteDate: '',
  relatedInvoiceNumber: '',
  invoiceDate: '',
  creditAmount: '',
  currency: '',

  reasonForCredit: '',
  adjustmentDescription: '',
  impactOnPayables: '',

  costCenterGlCode: '',
  taxAdjustmentAmount: '',
  netAdjustmentAmount: '',

  requestedByAuthorization: '',
  accountsPayableApproval: '',
  financeApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00212_VendorCreditNote = () => {

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
      formId="FRM-00212"
      title="Vendor Credit Note – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Vendor credit note request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00212"
              title="Vendor Credit Note"
              department="Finance & Accounting – Accounts Payable"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'requestDate','Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'requestedBy','Requested By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {select(values,'priorityLevel','Priority Level',['Low','Medium','High','Urgent'])}
                </div>
              </div>

              {/* 2. Vendor Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Vendor Details</h3>
                <div className="form-fields">
                  {field(values,'vendorName','Vendor Name')}
                  {field(values,'vendorId','Vendor ID')}
                  {field(values,'vendorAddress','Address')}
                  {field(values,'contactPerson','Contact Person')}
                  {field(values,'vendorContact','Email / Phone')}
                  {field(values,'taxIdGst','Tax ID / GST')}
                </div>
              </div>

              {/* 3. Credit Note Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Credit Note Details</h3>
                <div className="form-fields">
                  {field(values,'creditNoteNumber','Credit Note Number')}
                  {field(values,'creditNoteDate','Credit Note Date','date')}
                  {field(values,'relatedInvoiceNumber','Related Invoice Number')}
                  {field(values,'invoiceDate','Invoice Date','date')}
                  {field(values,'creditAmount','Credit Amount','number')}
                  {field(values,'currency','Currency')}
                </div>
              </div>

              {/* 4. Reason & Description */}
              <div className="form-section">
                <h3 className="form-section-title">4. Reason & Description</h3>
                <div className="form-fields">
                  {textarea(values,'reasonForCredit','Reason for Credit')}
                  {textarea(values,'adjustmentDescription','Description of Adjustment')}
                  {textarea(values,'impactOnPayables','Impact on Payables')}
                </div>
              </div>

              {/* 5. Accounting Details */}
              <div className="form-section">
                <h3 className="form-section-title">5. Accounting Details</h3>
                <div className="form-fields">
                  {field(values,'costCenterGlCode','Cost Center / GL Code')}
                  {field(values,'taxAdjustmentAmount','Tax Adjustment Amount','number')}
                  {field(values,'netAdjustmentAmount','Net Adjustment Amount','number')}
                </div>
              </div>

              {/* 6. Review & Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Review & Authorization</h3>
                <div className="form-fields">
                  {field(values,'requestedByAuthorization','Requested By (Name)')}
                  {field(values,'accountsPayableApproval','Accounts Payable Approval')}
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
                    Submit Vendor Credit Note
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

export default FRM00212_VendorCreditNote;
