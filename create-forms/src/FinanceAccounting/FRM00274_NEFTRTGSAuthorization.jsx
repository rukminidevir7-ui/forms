// FRM00274_NEFTRTGSAuthorization.jsx
// FRM-00274 – NEFT / RTGS Authorization – Approval / Authorization Form

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
  authorizationDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  transferType: Yup.string().required('Required'),

  // 2. Beneficiary Details
  beneficiaryName: Yup.string().required('Required'),
  beneficiaryCountry: Yup.string().required('Required'),
  bankName: Yup.string().required('Required'),
  branchName: Yup.string().required('Required'),
  accountNumber: Yup.string().required('Required'),
  bankCode: Yup.string().required('Required'),
  beneficiaryAddress: Yup.string().required('Required'),
  contactDetails: Yup.string().required('Required'),

  // 3. Payment / Transfer Details
  transferAmount: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),
  exchangeRate: Yup.string().required('Required'),
  inrEquivalent: Yup.string().required('Required'),
  paymentPurpose: Yup.string().required('Required'),
  purposeCode: Yup.string().required('Required'),
  invoiceReference: Yup.string().required('Required'),
  valueDate: Yup.string().required('Required'),
  chargesType: Yup.string().required('Required'),
  priority: Yup.string().required('Required'),

  // 4. Compliance & Control Checks
  kycCompleted: Yup.string().required('Required'),
  regulatoryDeclaration: Yup.string().required('Required'),
  documentsVerified: Yup.string().required('Required'),
  budgetConfirmed: Yup.string().required('Required'),

  // 5. Authorization
  preparedByAuthorization: Yup.string().required('Required'),
  treasuryReview: Yup.string().required('Required'),
  financeApproval: Yup.string().required('Required'),
  authorizedSignatory: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  formId: '',
  authorizationDate: '',
  department: '',
  preparedBy: '',
  referenceNumber: '',
  transferType: '',

  beneficiaryName: '',
  beneficiaryCountry: '',
  bankName: '',
  branchName: '',
  accountNumber: '',
  bankCode: '',
  beneficiaryAddress: '',
  contactDetails: '',

  transferAmount: '',
  currency: '',
  exchangeRate: '',
  inrEquivalent: '',
  paymentPurpose: '',
  purposeCode: '',
  invoiceReference: '',
  valueDate: '',
  chargesType: '',
  priority: '',

  kycCompleted: '',
  regulatoryDeclaration: '',
  documentsVerified: '',
  budgetConfirmed: '',

  preparedByAuthorization: '',
  treasuryReview: '',
  financeApproval: '',
  authorizedSignatory: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00274_NEFTRTGSAuthorization = () => {

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
      formId="FRM-00274"
      title="NEFT / RTGS Authorization – Approval / Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Bank transfer authorization submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00274"
              title="Unified Bank Transfer Authorization (NEFT / RTGS / Foreign)"
              department="Finance & Accounting – Treasury & Banking"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'authorizationDate','Request / Authorization Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'preparedBy','Prepared / Requested By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {select(values,'transferType','Transfer Type',['NEFT','RTGS','Foreign Remittance'])}
                </div>
              </div>

              {/* 2. Beneficiary Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Beneficiary Details</h3>
                <div className="form-fields">
                  {field(values,'beneficiaryName','Beneficiary Name')}
                  {field(values,'beneficiaryCountry','Country')}
                  {field(values,'bankName','Bank Name')}
                  {field(values,'branchName','Branch')}
                  {field(values,'accountNumber','Account Number / IBAN')}
                  {field(values,'bankCode','IFSC / SWIFT')}
                  {textarea(values,'beneficiaryAddress','Address')}
                  {field(values,'contactDetails','Contact Details')}
                </div>
              </div>

              {/* 3. Payment / Transfer Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Payment / Transfer Details</h3>
                <div className="form-fields">
                  {field(values,'transferAmount','Transfer Amount','number')}
                  {field(values,'currency','Currency')}
                  {field(values,'exchangeRate','Exchange Rate')}
                  {field(values,'inrEquivalent','INR Equivalent','number')}
                  {textarea(values,'paymentPurpose','Purpose of Payment')}
                  {field(values,'purposeCode','Purpose Code')}
                  {field(values,'invoiceReference','Invoice / Contract Reference')}
                  {field(values,'valueDate','Value Date','date')}
                  {select(values,'chargesType','Charges Type',['OUR','SHA','BEN'])}
                  {select(values,'priority','Priority',['Normal','High','Urgent'])}
                </div>
              </div>

              {/* 4. Compliance & Control Checks */}
              <div className="form-section">
                <h3 className="form-section-title">4. Compliance & Control Checks</h3>
                <div className="form-fields">
                  {select(values,'kycCompleted','KYC / Beneficiary Verification Completed',['Yes','No'])}
                  {select(values,'regulatoryDeclaration','Regulatory Declaration Completed (if foreign)',['Yes','No','Not Applicable'])}
                  {select(values,'documentsVerified','Supporting Documents Verified',['Yes','No'])}
                  {select(values,'budgetConfirmed','Budget / Approval Availability Confirmed',['Yes','No'])}
                </div>
              </div>

              {/* 5. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByAuthorization','Prepared / Requested By (Name)')}
                  {field(values,'treasuryReview','Treasury Review')}
                  {field(values,'financeApproval','Finance Approval')}
                  {field(values,'authorizedSignatory','Authorized Signatory')}
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
                    Submit Transfer Authorization
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

export default FRM00274_NEFTRTGSAuthorization;
