// FRM00316_SupplierOnboarding.jsx
// FRM-00316 – Supplier Onboarding – Request / Initiation Form

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
  supplierType: Yup.string().required('Required'),
  procurementCategory: Yup.string().required('Required'),
  priority: Yup.string().required('Required'),

  // 2. Supplier Details
  supplierName: Yup.string().required('Required'),
  legalName: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().required('Required'),
  website: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  country: Yup.string().required('Required'),

  // 3. Business Information
  taxRegistrationNumber: Yup.string().required('Required'),
  businessType: Yup.string().required('Required'),
  productsServices: Yup.string().required('Required'),
  yearsInBusiness: Yup.number().typeError('Must be a number').required('Required'),

  // 4. Banking Details
  bankName: Yup.string().required('Required'),
  accountNumber: Yup.string().required('Required'),
  swiftIfscCode: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),
  branchName: Yup.string().required('Required'),
  accountHolderName: Yup.string().required('Required'),

  // 5. Compliance & Risk
  complianceRequirements: Yup.string().required('Required'),
  riskAssessment: Yup.string().required('Required'),
  dueDiligenceCompleted: Yup.string().required('Required'),

  // 6. Authorization
  requesterApproval: Yup.string().required('Required'),
  procurementReview: Yup.string().required('Required'),
  complianceApproval: Yup.string().required('Required'),
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
  supplierType: '',
  procurementCategory: '',
  priority: '',

  supplierName: '',
  legalName: '',
  contactPerson: '',
  email: '',
  phone: '',
  website: '',
  address: '',
  country: '',

  taxRegistrationNumber: '',
  businessType: '',
  productsServices: '',
  yearsInBusiness: '',

  bankName: '',
  accountNumber: '',
  swiftIfscCode: '',
  currency: '',
  branchName: '',
  accountHolderName: '',

  complianceRequirements: '',
  riskAssessment: '',
  dueDiligenceCompleted: '',

  requesterApproval: '',
  procurementReview: '',
  complianceApproval: '',
  financeApproval: '',
  managementApproval: '',
  approvalComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00316_SupplierOnboarding = () => {

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
      formId="FRM-00316"
      title="Supplier Onboarding – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Supplier onboarding request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00316"
              title="Supplier Onboarding"
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
                  {select(values,'supplierType','Supplier Type',['Manufacturer','Distributor','Service Provider','Consultant','Contractor','Other'])}
                  {field(values,'procurementCategory','Procurement Category')}
                  {select(values,'priority','Priority',['Low','Medium','High','Urgent'])}
                </div>
              </div>

              {/* 2. Supplier Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Supplier Details</h3>
                <div className="form-fields">
                  {field(values,'supplierName','Supplier Name')}
                  {field(values,'legalName','Legal Name')}
                  {field(values,'contactPerson','Contact Person')}
                  {field(values,'email','Email','email')}
                  {field(values,'phone','Phone')}
                  {field(values,'website','Website')}
                  {textarea(values,'address','Address')}
                  {field(values,'country','Country')}
                </div>
              </div>

              {/* 3. Business Information */}
              <div className="form-section">
                <h3 className="form-section-title">3. Business Information</h3>
                <div className="form-fields">
                  {field(values,'taxRegistrationNumber','Tax ID / Registration No')}
                  {field(values,'businessType','Business Type')}
                  {textarea(values,'productsServices','Products / Services Provided')}
                  {field(values,'yearsInBusiness','Years in Business','number')}
                </div>
              </div>

              {/* 4. Banking Details */}
              <div className="form-section">
                <h3 className="form-section-title">4. Banking Details</h3>
                <div className="form-fields">
                  {field(values,'bankName','Bank Name')}
                  {field(values,'accountNumber','Account Number')}
                  {field(values,'swiftIfscCode','IFSC / SWIFT')}
                  {field(values,'currency','Currency')}
                  {field(values,'branchName','Branch')}
                  {field(values,'accountHolderName','Account Holder Name')}
                </div>
              </div>

              {/* 5. Compliance & Risk */}
              <div className="form-section">
                <h3 className="form-section-title">5. Compliance & Risk</h3>
                <div className="form-fields">
                  {textarea(values,'complianceRequirements','Compliance Requirements')}
                  {textarea(values,'riskAssessment','Risk Assessment')}
                  {select(values,'dueDiligenceCompleted','Due Diligence Completed',['Yes','No'])}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requesterApproval','Requested By (Name & Signature)')}
                  {field(values,'procurementReview','Procurement Review')}
                  {field(values,'complianceApproval','Compliance Approval')}
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
                    Submit Supplier Onboarding
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

export default FRM00316_SupplierOnboarding;
