// FRM00335_SupplierPaymentTermsSetup.jsx
// FRM-00335 – Supplier Payment Terms Setup – Request / Initiation Form

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
  requestDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  requestedBy: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  supplierId: Yup.string().required('Required'),

  // 2. Supplier Details
  supplierName: Yup.string().required('Required'),
  legalName: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().required('Required'),

  // 3. Payment Terms Details
  paymentMethod: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),
  paymentTerms: Yup.string().required('Required'),
  creditLimit: Yup.number().typeError('Must be a number').required('Required'),
  earlyPaymentDiscount: Yup.string().required('Required'),
  latePaymentPenalty: Yup.string().required('Required'),

  // 4. Banking Reference
  bankName: Yup.string().required('Required'),
  accountNumber: Yup.string().required('Required'),
  swiftIfscCode: Yup.string().required('Required'),
  branch: Yup.string().required('Required'),

  // 5. Risk & Compliance
  riskAssessment: Yup.string().required('Required'),
  complianceRequirements: Yup.string().required('Required'),
  effectiveDate: Yup.string().required('Required'),

  // 6. Authorization
  requesterApproval: Yup.string().required('Required'),
  procurementReview: Yup.string().required('Required'),
  financeApproval: Yup.string().required('Required'),
  managementApproval: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  // 7. Supporting Information
  supportingDocuments: Yup.string(),
  additionalNotes: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  requestDate: '',
  department: '',
  requestedBy: '',
  referenceNumber: '',
  supplierId: '',

  supplierName: '',
  legalName: '',
  category: '',
  contactPerson: '',
  email: '',
  phone: '',

  paymentMethod: '',
  currency: '',
  paymentTerms: '',
  creditLimit: '',
  earlyPaymentDiscount: '',
  latePaymentPenalty: '',

  bankName: '',
  accountNumber: '',
  swiftIfscCode: '',
  branch: '',

  riskAssessment: '',
  complianceRequirements: '',
  effectiveDate: '',

  requesterApproval: '',
  procurementReview: '',
  financeApproval: '',
  managementApproval: '',
  approvalComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00335_SupplierPaymentTermsSetup = () => {

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
      formId="FRM-00335"
      title="Supplier Payment Terms Setup – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Supplier payment terms setup submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00335"
              title="Supplier Payment Terms Setup"
              department="Procurement & Purchasing – Supplier Management"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'requestedBy','Requested By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {field(values,'supplierId','Supplier ID')}
                </div>
              </div>

              {/* 2. Supplier Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Supplier Details</h3>
                <div className="form-fields">
                  {field(values,'supplierName','Supplier Name')}
                  {field(values,'legalName','Legal Name')}
                  {field(values,'category','Category')}
                  {field(values,'contactPerson','Contact Person')}
                  {field(values,'email','Email','email')}
                  {field(values,'phone','Phone')}
                </div>
              </div>

              {/* 3. Payment Terms Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Payment Terms Details</h3>
                <div className="form-fields">
                  {select(values,'paymentMethod','Payment Method',['Bank Transfer','Cheque','Wire Transfer','Online Payment','Other'])}
                  {field(values,'currency','Currency')}
                  {field(values,'paymentTerms','Payment Terms (e.g., Net 30)')}
                  {field(values,'creditLimit','Credit Limit','number')}
                  {field(values,'earlyPaymentDiscount','Early Payment Discount')}
                  {field(values,'latePaymentPenalty','Late Payment Penalty')}
                </div>
              </div>

              {/* 4. Banking Reference */}
              <div className="form-section">
                <h3 className="form-section-title">4. Banking Reference</h3>
                <div className="form-fields">
                  {field(values,'bankName','Bank Name')}
                  {field(values,'accountNumber','Account Number')}
                  {field(values,'swiftIfscCode','IFSC / SWIFT')}
                  {field(values,'branch','Branch')}
                </div>
              </div>

              {/* 5. Risk & Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">5. Risk & Compliance</h3>
                <div className="form-fields">
                  {textarea(values,'riskAssessment','Risk Assessment')}
                  {textarea(values,'complianceRequirements','Compliance Requirements')}
                  {field(values,'effectiveDate','Effective Date','date')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requesterApproval','Requested By (Name & Signature)')}
                  {field(values,'procurementReview','Procurement Review')}
                  {field(values,'financeApproval','Finance Approval')}
                  {field(values,'managementApproval','Management Approval')}
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
                    Submit Payment Terms Setup
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

export default FRM00335_SupplierPaymentTermsSetup;
