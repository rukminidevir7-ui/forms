// FRM00275_ForeignRemittance.jsx
// FRM-00275 – Foreign Remittance – Request / Initiation Form

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
  purposeCode: Yup.string().required('Required'),

  // 2. Beneficiary Details
  beneficiaryName: Yup.string().required('Required'),
  beneficiaryCountry: Yup.string().required('Required'),
  bankName: Yup.string().required('Required'),
  swiftCode: Yup.string().required('Required'),
  accountNumber: Yup.string().required('Required'),
  beneficiaryAddress: Yup.string().required('Required'),
  contactDetails: Yup.string().required('Required'),
  relationship: Yup.string().required('Required'),

  // 3. Remittance Details
  remittanceAmount: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),
  exchangeRate: Yup.string().required('Required'),
  inrEquivalent: Yup.string().required('Required'),
  paymentPurpose: Yup.string().required('Required'),
  invoiceReference: Yup.string().required('Required'),
  valueDate: Yup.string().required('Required'),
  chargesType: Yup.string().required('Required'),

  // 4. Compliance & Verification
  regulatoryDeclaration: Yup.string().required('Required'),
  kycVerification: Yup.string().required('Required'),
  documentsVerified: Yup.string().required('Required'),
  sanctionsScreening: Yup.string().required('Required'),

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
  purposeCode: '',

  beneficiaryName: '',
  beneficiaryCountry: '',
  bankName: '',
  swiftCode: '',
  accountNumber: '',
  beneficiaryAddress: '',
  contactDetails: '',
  relationship: '',

  remittanceAmount: '',
  currency: '',
  exchangeRate: '',
  inrEquivalent: '',
  paymentPurpose: '',
  invoiceReference: '',
  valueDate: '',
  chargesType: '',

  regulatoryDeclaration: '',
  kycVerification: '',
  documentsVerified: '',
  sanctionsScreening: '',

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

const FRM00275_ForeignRemittance = () => {

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
      formId="FRM-00275"
      title="Foreign Remittance – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Foreign remittance authorization submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00275"
              title="Foreign Remittance Authorization"
              department="Finance & Accounting – Treasury & Banking"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'authorizationDate','Authorization Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {field(values,'purposeCode','Purpose Code')}
                </div>
              </div>

              {/* 2. Beneficiary Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Beneficiary Details</h3>
                <div className="form-fields">
                  {field(values,'beneficiaryName','Beneficiary Name')}
                  {field(values,'beneficiaryCountry','Country')}
                  {field(values,'bankName','Bank Name')}
                  {field(values,'swiftCode','SWIFT Code')}
                  {field(values,'accountNumber','Account Number / IBAN')}
                  {textarea(values,'beneficiaryAddress','Address')}
                  {field(values,'contactDetails','Contact Details')}
                  {field(values,'relationship','Relationship')}
                </div>
              </div>

              {/* 3. Remittance Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Remittance Details</h3>
                <div className="form-fields">
                  {field(values,'remittanceAmount','Remittance Amount','number')}
                  {field(values,'currency','Currency')}
                  {field(values,'exchangeRate','Exchange Rate')}
                  {field(values,'inrEquivalent','INR Equivalent','number')}
                  {textarea(values,'paymentPurpose','Payment Purpose')}
                  {field(values,'invoiceReference','Invoice / Contract Reference')}
                  {field(values,'valueDate','Value Date','date')}
                  {select(values,'chargesType','Charges Type',['OUR','SHA','BEN'])}
                </div>
              </div>

              {/* 4. Compliance & Verification */}
              <div className="form-section">
                <h3 className="form-section-title">4. Compliance & Verification</h3>
                <div className="form-fields">
                  {select(values,'regulatoryDeclaration','Regulatory Declaration Completed',['Yes','No'])}
                  {select(values,'kycVerification','KYC / Beneficiary Verification',['Yes','No'])}
                  {select(values,'documentsVerified','Supporting Documents Verified',['Yes','No'])}
                  {select(values,'sanctionsScreening','Sanctions / Screening Check',['Yes','No'])}
                </div>
              </div>

              {/* 5. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByAuthorization','Prepared By (Name)')}
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
                    Submit Foreign Remittance
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

export default FRM00275_ForeignRemittance;
