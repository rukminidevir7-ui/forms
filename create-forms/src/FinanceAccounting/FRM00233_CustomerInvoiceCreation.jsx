// FRM00233_CustomerInvoiceCreation.jsx
// FRM-00233 – Customer Invoice Creation – Report / Record Form

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
  invoiceDate: Yup.string().required('Required'),
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
  taxIdGst: Yup.string().required('Required'),

  // 3. Invoice Details
  invoiceNumber: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),
  dueDate: Yup.string().required('Required'),
  paymentTerms: Yup.string().required('Required'),
  projectReference: Yup.string().required('Required'),
  salesOrderReference: Yup.string().required('Required'),

  // 4. Line Items (summary capture)
  lineItemsSummary: Yup.string().required('Required'),

  // 5. Tax & Totals
  subtotal: Yup.string().required('Required'),
  taxAmount: Yup.string().required('Required'),
  discount: Yup.string().required('Required'),
  totalAmount: Yup.string().required('Required'),

  // 6. Notes
  remarks: Yup.string().required('Required'),
  specialInstructions: Yup.string().required('Required'),

  // 7. Authorization
  preparedByAuthorization: Yup.string().required('Required'),
  billingReview: Yup.string().required('Required'),
  financeApproval: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  formId: '',
  invoiceDate: '',
  department: '',
  preparedBy: '',
  referenceNumber: '',
  priorityLevel: '',

  customerName: '',
  customerId: '',
  billingAddress: '',
  contactPerson: '',
  contactDetails: '',
  taxIdGst: '',

  invoiceNumber: '',
  currency: '',
  dueDate: '',
  paymentTerms: '',
  projectReference: '',
  salesOrderReference: '',

  lineItemsSummary: '',

  subtotal: '',
  taxAmount: '',
  discount: '',
  totalAmount: '',

  remarks: '',
  specialInstructions: '',

  preparedByAuthorization: '',
  billingReview: '',
  financeApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00233_CustomerInvoiceCreation = () => {

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
      formId="FRM-00233"
      title="Customer Invoice Creation – Report / Record Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Customer invoice recorded successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00233"
              title="Customer Invoice Creation"
              department="Finance & Accounting – Accounts Receivable"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'invoiceDate','Invoice Date','date')}
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
                  {field(values,'taxIdGst','Tax ID / GST')}
                </div>
              </div>

              {/* 3. Invoice Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Invoice Details</h3>
                <div className="form-fields">
                  {field(values,'invoiceNumber','Invoice Number')}
                  {field(values,'currency','Currency')}
                  {field(values,'dueDate','Due Date','date')}
                  {field(values,'paymentTerms','Payment Terms')}
                  {field(values,'projectReference','Project / Contract Reference')}
                  {field(values,'salesOrderReference','Sales Order')}
                </div>
              </div>

              {/* 4. Line Items */}
              <div className="form-section">
                <h3 className="form-section-title">4. Line Items</h3>
                <div className="form-fields">
                  {textarea(values,'lineItemsSummary','Description / Quantity / Unit Price / Amount')}
                </div>
              </div>

              {/* 5. Tax & Totals */}
              <div className="form-section">
                <h3 className="form-section-title">5. Tax & Totals</h3>
                <div className="form-fields">
                  {field(values,'subtotal','Subtotal','number')}
                  {field(values,'taxAmount','Tax Amount','number')}
                  {field(values,'discount','Discount','number')}
                  {field(values,'totalAmount','Total Amount','number')}
                </div>
              </div>

              {/* 6. Notes */}
              <div className="form-section">
                <h3 className="form-section-title">6. Notes</h3>
                <div className="form-fields">
                  {textarea(values,'remarks','Remarks')}
                  {textarea(values,'specialInstructions','Special Instructions')}
                </div>
              </div>

              {/* 7. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">7. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByAuthorization','Prepared By (Name)')}
                  {field(values,'billingReview','Billing / AR Review')}
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
                    Submit Customer Invoice
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

export default FRM00233_CustomerInvoiceCreation;
