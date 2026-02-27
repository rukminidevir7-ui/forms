// FRM00227_WithholdingTDSConfirmation.jsx
// FRM-00227 – Withholding / TDS Confirmation – Request / Initiation Form

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
  preparationDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // 2. Payee Details
  payeeName: Yup.string().required('Required'),
  vendorPan: Yup.string().required('Required'),
  payeeAddress: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  contactDetails: Yup.string().required('Required'),
  taxResidency: Yup.string().required('Required'),

  // 3. Transaction Details
  transactionReference: Yup.string().required('Required'),
  transactionDate: Yup.string().required('Required'),
  natureOfPayment: Yup.string().required('Required'),
  sectionCode: Yup.string().required('Required'),
  grossAmount: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),

  // 4. TDS Details
  tdsRate: Yup.string().required('Required'),
  tdsAmount: Yup.string().required('Required'),
  surchargeCess: Yup.string().required('Required'),
  totalTaxDeducted: Yup.string().required('Required'),
  lowerNilCertificate: Yup.string().required('Required'),

  // 5. Compliance Checks
  panVerified: Yup.string().required('Required'),
  sectionApplicabilityConfirmed: Yup.string().required('Required'),
  rateVerified: Yup.string().required('Required'),
  returnFilingImpactConsidered: Yup.string().required('Required'),

  // 6. Notes
  remarks: Yup.string().required('Required'),
  specialConsiderations: Yup.string().required('Required'),

  // 7. Authorization
  preparedByAuthorization: Yup.string().required('Required'),
  accountsPayableReview: Yup.string().required('Required'),
  taxFinanceApproval: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  formId: '',
  preparationDate: '',
  department: '',
  preparedBy: '',
  referenceNumber: '',
  priorityLevel: '',

  payeeName: '',
  vendorPan: '',
  payeeAddress: '',
  contactPerson: '',
  contactDetails: '',
  taxResidency: '',

  transactionReference: '',
  transactionDate: '',
  natureOfPayment: '',
  sectionCode: '',
  grossAmount: '',
  currency: '',

  tdsRate: '',
  tdsAmount: '',
  surchargeCess: '',
  totalTaxDeducted: '',
  lowerNilCertificate: '',

  panVerified: '',
  sectionApplicabilityConfirmed: '',
  rateVerified: '',
  returnFilingImpactConsidered: '',

  remarks: '',
  specialConsiderations: '',

  preparedByAuthorization: '',
  accountsPayableReview: '',
  taxFinanceApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00227_WithholdingTDSConfirmation = () => {

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
      formId="FRM-00227"
      title="Withholding / TDS Confirmation – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Withholding / TDS confirmation submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00227"
              title="Withholding / TDS Confirmation"
              department="Finance & Accounting – Accounts Payable"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'preparationDate','Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {select(values,'priorityLevel','Priority Level',['Low','Medium','High','Urgent'])}
                </div>
              </div>

              {/* 2. Payee Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Payee Details</h3>
                <div className="form-fields">
                  {field(values,'payeeName','Payee Name')}
                  {field(values,'vendorPan','Vendor ID / PAN')}
                  {field(values,'payeeAddress','Address')}
                  {field(values,'contactPerson','Contact Person')}
                  {field(values,'contactDetails','Email / Phone')}
                  {field(values,'taxResidency','Tax Residency')}
                </div>
              </div>

              {/* 3. Transaction Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Transaction Details</h3>
                <div className="form-fields">
                  {field(values,'transactionReference','Invoice / Payment Reference')}
                  {field(values,'transactionDate','Transaction Date','date')}
                  {field(values,'natureOfPayment','Nature of Payment')}
                  {field(values,'sectionCode','Section Code')}
                  {field(values,'grossAmount','Gross Amount','number')}
                  {field(values,'currency','Currency')}
                </div>
              </div>

              {/* 4. TDS Details */}
              <div className="form-section">
                <h3 className="form-section-title">4. TDS Details</h3>
                <div className="form-fields">
                  {field(values,'tdsRate','Applicable TDS Rate (%)','number')}
                  {field(values,'tdsAmount','TDS Amount','number')}
                  {field(values,'surchargeCess','Surcharge / Cess','number')}
                  {field(values,'totalTaxDeducted','Total Tax Deducted','number')}
                  {select(values,'lowerNilCertificate','Lower / Nil Certificate Available',['Yes','No'])}
                </div>
              </div>

              {/* 5. Compliance Checks */}
              <div className="form-section">
                <h3 className="form-section-title">5. Compliance Checks</h3>
                <div className="form-fields">
                  {select(values,'panVerified','PAN Verified',['Yes','No'])}
                  {select(values,'sectionApplicabilityConfirmed','Section Applicability Confirmed',['Yes','No'])}
                  {select(values,'rateVerified','Rate Verified',['Yes','No'])}
                  {select(values,'returnFilingImpactConsidered','Return Filing Impact Considered',['Yes','No'])}
                </div>
              </div>

              {/* 6. Notes */}
              <div className="form-section">
                <h3 className="form-section-title">6. Notes</h3>
                <div className="form-fields">
                  {textarea(values,'remarks','Remarks')}
                  {textarea(values,'specialConsiderations','Special Considerations')}
                </div>
              </div>

              {/* 7. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">7. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByAuthorization','Prepared By (Name)')}
                  {field(values,'accountsPayableReview','Accounts Payable Review')}
                  {field(values,'taxFinanceApproval','Tax / Finance Approval')}
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
                    Submit TDS Confirmation
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

export default FRM00227_WithholdingTDSConfirmation;
