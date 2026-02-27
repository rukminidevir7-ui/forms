// FRM00338_SupplierNDA.jsx
// FRM-00338 – Supplier NDA – Report / Record Form

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
  agreementDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  agreementType: Yup.string().required('Required'),

  // 2. Parties Information
  companyName: Yup.string().required('Required'),
  supplierName: Yup.string().required('Required'),
  companyAddress: Yup.string().required('Required'),
  supplierAddress: Yup.string().required('Required'),
  companyContact: Yup.string().required('Required'),
  supplierContact: Yup.string().required('Required'),

  // 3. Agreement Details
  effectiveDate: Yup.string().required('Required'),
  expiryDate: Yup.string().required('Required'),
  purposeOfDisclosure: Yup.string().required('Required'),
  confidentialInformationScope: Yup.string().required('Required'),

  // 4. Key Terms
  obligationsOfParties: Yup.string().required('Required'),
  permittedUse: Yup.string().required('Required'),
  terminationConditions: Yup.string().required('Required'),

  // 5. Authorization
  preparerApproval: Yup.string().required('Required'),
  legalReview: Yup.string().required('Required'),
  procurementApproval: Yup.string().required('Required'),
  managementApproval: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  // 6. Supporting Information
  supportingDocuments: Yup.string(),
  additionalNotes: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  agreementDate: '',
  department: '',
  preparedBy: '',
  referenceNumber: '',
  agreementType: '',

  companyName: '',
  supplierName: '',
  companyAddress: '',
  supplierAddress: '',
  companyContact: '',
  supplierContact: '',

  effectiveDate: '',
  expiryDate: '',
  purposeOfDisclosure: '',
  confidentialInformationScope: '',

  obligationsOfParties: '',
  permittedUse: '',
  terminationConditions: '',

  preparerApproval: '',
  legalReview: '',
  procurementApproval: '',
  managementApproval: '',
  approvalComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00338_SupplierNDA = () => {

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
      formId="FRM-00338"
      title="Supplier NDA – Report / Record"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Supplier NDA record submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00338"
              title="Supplier Non-Disclosure Agreement (NDA)"
              department="Procurement & Purchasing – Supplier Management"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'agreementDate','Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {select(values,'agreementType','Agreement Type',['Mutual NDA','Unilateral NDA','Project-Specific NDA','Master NDA'])}
                </div>
              </div>

              {/* 2. Parties Information */}
              <div className="form-section">
                <h3 className="form-section-title">2. Parties Information</h3>
                <div className="form-fields">
                  {field(values,'companyName','Company Name')}
                  {field(values,'supplierName','Supplier Name')}
                  {textarea(values,'companyAddress','Company Address')}
                  {textarea(values,'supplierAddress','Supplier Address')}
                  {field(values,'companyContact','Company Contact')}
                  {field(values,'supplierContact','Supplier Contact')}
                </div>
              </div>

              {/* 3. Agreement Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Agreement Details</h3>
                <div className="form-fields">
                  {field(values,'effectiveDate','Effective Date','date')}
                  {field(values,'expiryDate','Expiry Date','date')}
                  {textarea(values,'purposeOfDisclosure','Purpose of Disclosure')}
                  {textarea(values,'confidentialInformationScope','Confidential Information Scope')}
                </div>
              </div>

              {/* 4. Key Terms */}
              <div className="form-section">
                <h3 className="form-section-title">4. Key Terms</h3>
                <div className="form-fields">
                  {textarea(values,'obligationsOfParties','Obligations of Parties')}
                  {textarea(values,'permittedUse','Permitted Use')}
                  {textarea(values,'terminationConditions','Termination Conditions')}
                </div>
              </div>

              {/* 5. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparerApproval','Prepared By (Name & Signature)')}
                  {field(values,'legalReview','Legal Review')}
                  {field(values,'procurementApproval','Procurement Approval')}
                  {field(values,'managementApproval','Management Approval')}
                  {textarea(values,'approvalComments','Comments')}
                </div>
              </div>

              {/* 6. Supporting Information */}
              <div className="form-section">
                <h3 className="form-section-title">6. Supporting Information</h3>
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
                    Submit NDA Record
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

export default FRM00338_SupplierNDA;
