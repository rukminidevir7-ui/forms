// FRM00319_SupplierKYC.jsx
// FRM-00319 – Supplier KYC – Request / Initiation Form

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

  // 2. Supplier Identification
  supplierName: Yup.string().required('Required'),
  legalName: Yup.string().required('Required'),
  registrationNumber: Yup.string().required('Required'),
  taxIdPan: Yup.string().required('Required'),
  gstVatNumber: Yup.string().required('Required'),
  countryOfRegistration: Yup.string().required('Required'),

  // 3. Contact Details
  contactPerson: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().required('Required'),
  website: Yup.string().required('Required'),
  registeredAddress: Yup.string().required('Required'),
  operatingAddress: Yup.string().required('Required'),

  // 4. Ownership & Management
  ownershipType: Yup.string().required('Required'),
  directorsManagement: Yup.string().required('Required'),
  ultimateBeneficialOwner: Yup.string().required('Required'),

  // 5. Banking Details
  bankName: Yup.string().required('Required'),
  accountNumber: Yup.string().required('Required'),
  swiftIfscCode: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),

  // 6. Compliance Checks
  sanctionsScreening: Yup.string().required('Required'),
  pepCheck: Yup.string().required('Required'),
  riskRating: Yup.string().required('Required'),

  // 7. Authorization
  requesterApproval: Yup.string().required('Required'),
  complianceReview: Yup.string().required('Required'),
  procurementApproval: Yup.string().required('Required'),
  financeApproval: Yup.string().required('Required'),
  managementApproval: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  // 8. Supporting Information
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

  supplierName: '',
  legalName: '',
  registrationNumber: '',
  taxIdPan: '',
  gstVatNumber: '',
  countryOfRegistration: '',

  contactPerson: '',
  email: '',
  phone: '',
  website: '',
  registeredAddress: '',
  operatingAddress: '',

  ownershipType: '',
  directorsManagement: '',
  ultimateBeneficialOwner: '',

  bankName: '',
  accountNumber: '',
  swiftIfscCode: '',
  currency: '',

  sanctionsScreening: '',
  pepCheck: '',
  riskRating: '',

  requesterApproval: '',
  complianceReview: '',
  procurementApproval: '',
  financeApproval: '',
  managementApproval: '',
  approvalComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00319_SupplierKYC = () => {

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
      formId="FRM-00319"
      title="Supplier KYC – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Supplier KYC request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00319"
              title="Supplier KYC"
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
                </div>
              </div>

              {/* 2. Supplier Identification */}
              <div className="form-section">
                <h3 className="form-section-title">2. Supplier Identification</h3>
                <div className="form-fields">
                  {field(values,'supplierName','Supplier Name')}
                  {field(values,'legalName','Legal Name')}
                  {field(values,'registrationNumber','Registration Number')}
                  {field(values,'taxIdPan','Tax ID / PAN')}
                  {field(values,'gstVatNumber','GST / VAT Number')}
                  {field(values,'countryOfRegistration','Country of Registration')}
                </div>
              </div>

              {/* 3. Contact Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Contact Details</h3>
                <div className="form-fields">
                  {field(values,'contactPerson','Contact Person')}
                  {field(values,'email','Email','email')}
                  {field(values,'phone','Phone')}
                  {field(values,'website','Website')}
                  {textarea(values,'registeredAddress','Registered Address')}
                  {textarea(values,'operatingAddress','Operating Address')}
                </div>
              </div>

              {/* 4. Ownership & Management */}
              <div className="form-section">
                <h3 className="form-section-title">4. Ownership & Management</h3>
                <div className="form-fields">
                  {field(values,'ownershipType','Ownership Type')}
                  {textarea(values,'directorsManagement','Directors / Key Management')}
                  {field(values,'ultimateBeneficialOwner','Ultimate Beneficial Owner')}
                </div>
              </div>

              {/* 5. Banking Details */}
              <div className="form-section">
                <h3 className="form-section-title">5. Banking Details</h3>
                <div className="form-fields">
                  {field(values,'bankName','Bank Name')}
                  {field(values,'accountNumber','Account Number')}
                  {field(values,'swiftIfscCode','IFSC / SWIFT')}
                  {field(values,'currency','Currency')}
                </div>
              </div>

              {/* 6. Compliance Checks */}
              <div className="form-section">
                <h3 className="form-section-title">6. Compliance Checks</h3>
                <div className="form-fields">
                  {select(values,'sanctionsScreening','Sanctions Screening Completed',['Yes','No'])}
                  {select(values,'pepCheck','PEP Check',['Yes','No'])}
                  {select(values,'riskRating','Risk Rating',['Low','Medium','High','Critical'])}
                </div>
              </div>

              {/* 7. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">7. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requesterApproval','Requested By (Name & Signature)')}
                  {field(values,'complianceReview','Compliance Review')}
                  {field(values,'procurementApproval','Procurement Approval')}
                  {field(values,'financeApproval','Finance Approval')}
                  {field(values,'managementApproval','Management Approval')}
                  {textarea(values,'approvalComments','Comments')}
                </div>
              </div>

              {/* 8. Supporting Information */}
              <div className="form-section">
                <h3 className="form-section-title">8. Supporting Information</h3>
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
                    Submit Supplier KYC
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

export default FRM00319_SupplierKYC;
