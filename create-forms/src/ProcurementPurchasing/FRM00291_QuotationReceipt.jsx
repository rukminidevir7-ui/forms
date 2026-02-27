// FRM00291_QuotationReceipt.jsx
// FRM-00291 – Quotation Receipt – Request / Initiation Form

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
  receiptDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  receivedBy: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  rfqReference: Yup.string().required('Required'),
  procurementCategory: Yup.string().required('Required'),
  submissionMethod: Yup.string().required('Required'),

  // 2. Vendor Details
  vendorName: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  quotationNumber: Yup.string().required('Required'),

  // 3. Quotation Summary
  quotationDate: Yup.string().required('Required'),
  validityPeriod: Yup.string().required('Required'),
  totalQuotedAmount: Yup.number().typeError('Must be a number').required('Required'),
  currency: Yup.string().required('Required'),
  deliveryTimeline: Yup.string().required('Required'),
  paymentTerms: Yup.string().required('Required'),

  // 4. Item / Service Details
  itemDescription: Yup.string().required('Required'),
  quantity: Yup.number().typeError('Must be a number').required('Required'),
  unitPrice: Yup.number().typeError('Must be a number').required('Required'),
  totalAmount: Yup.number().typeError('Must be a number').required('Required'),

  // 5. Review Notes
  initialReviewNotes: Yup.string().required('Required'),
  exceptionsClarifications: Yup.string().required('Required'),

  // 6. Authorization
  receiverApproval: Yup.string().required('Required'),
  procurementReview: Yup.string().required('Required'),
  departmentConfirmation: Yup.string().required('Required'),
  financeReview: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  // 7. Supporting Information
  supportingDocuments: Yup.string(),
  additionalNotes: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  receiptDate: '',
  department: '',
  receivedBy: '',
  referenceNumber: '',
  rfqReference: '',
  procurementCategory: '',
  submissionMethod: '',

  vendorName: '',
  contactPerson: '',
  email: '',
  phone: '',
  country: '',
  quotationNumber: '',

  quotationDate: '',
  validityPeriod: '',
  totalQuotedAmount: '',
  currency: '',
  deliveryTimeline: '',
  paymentTerms: '',

  itemDescription: '',
  quantity: '',
  unitPrice: '',
  totalAmount: '',

  initialReviewNotes: '',
  exceptionsClarifications: '',

  receiverApproval: '',
  procurementReview: '',
  departmentConfirmation: '',
  financeReview: '',
  approvalComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00291_QuotationReceipt = () => {

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
      formId="FRM-00291"
      title="Quotation Receipt – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Quotation receipt submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00291"
              title="Quotation Receipt"
              department="Procurement & Purchasing – Requisitions & Sourcing"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'receiptDate','Receipt Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'receivedBy','Received By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {field(values,'rfqReference','RFQ/RFP Reference')}
                  {field(values,'procurementCategory','Procurement Category')}
                  {select(values,'submissionMethod','Submission Method',['Email','Online Portal','Physical Submission','Courier'])}
                </div>
              </div>

              {/* 2. Vendor Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Vendor Details</h3>
                <div className="form-fields">
                  {field(values,'vendorName','Vendor Name')}
                  {field(values,'contactPerson','Contact Person')}
                  {field(values,'email','Email','email')}
                  {field(values,'phone','Phone')}
                  {field(values,'country','Country')}
                  {field(values,'quotationNumber','Quotation Number')}
                </div>
              </div>

              {/* 3. Quotation Summary */}
              <div className="form-section">
                <h3 className="form-section-title">3. Quotation Summary</h3>
                <div className="form-fields">
                  {field(values,'quotationDate','Quotation Date','date')}
                  {field(values,'validityPeriod','Validity Period')}
                  {field(values,'totalQuotedAmount','Total Quoted Amount','number')}
                  {field(values,'currency','Currency')}
                  {field(values,'deliveryTimeline','Delivery Timeline')}
                  {field(values,'paymentTerms','Payment Terms')}
                </div>
              </div>

              {/* 4. Item / Service Details */}
              <div className="form-section">
                <h3 className="form-section-title">4. Item / Service Details</h3>
                <div className="form-fields">
                  {textarea(values,'itemDescription','Description')}
                  {field(values,'quantity','Quantity','number')}
                  {field(values,'unitPrice','Unit Price','number')}
                  {field(values,'totalAmount','Total','number')}
                </div>
              </div>

              {/* 5. Review Notes */}
              <div className="form-section">
                <h3 className="form-section-title">5. Review Notes</h3>
                <div className="form-fields">
                  {textarea(values,'initialReviewNotes','Initial Review Notes')}
                  {textarea(values,'exceptionsClarifications','Exceptions / Clarifications')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'receiverApproval','Received By (Name & Signature)')}
                  {field(values,'procurementReview','Procurement Review')}
                  {field(values,'departmentConfirmation','Department Confirmation')}
                  {field(values,'financeReview','Finance Review')}
                  {textarea(values,'approvalComments','Comments')}
                </div>
              </div>

              {/* 7. Supporting Information */}
              <div className="form-section">
                <h3 className="form-section-title">7. Supporting Information</h3>
                <div className="form-fields">
                  {textarea(values,'supportingDocuments','Supporting Documents')}
                  {textarea(values,'additionalNotes','Additional Notes')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Quotation Receipt
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

export default FRM00291_QuotationReceipt;
