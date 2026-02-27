// FRM00304_RateContract.jsx
// FRM-00304 – Rate Contract – Request / Initiation Form

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
  contractDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  procurementCategory: Yup.string().required('Required'),
  contractPeriodFrom: Yup.string().required('Required'),
  contractPeriodTo: Yup.string().required('Required'),

  // 2. Vendor Details
  vendorName: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().required('Required'),
  vendorAddress: Yup.string().required('Required'),
  country: Yup.string().required('Required'),

  // 3. Contract Scope
  scopeSummary: Yup.string().required('Required'),
  applicableLocations: Yup.string().required('Required'),

  // 4. Rate Details
  itemService: Yup.string().required('Required'),
  unitRate: Yup.number().typeError('Must be a number').required('Required'),
  currency: Yup.string().required('Required'),
  rateRemarks: Yup.string().required('Required'),

  // 5. Commercial Terms
  paymentTerms: Yup.string().required('Required'),
  priceValidity: Yup.string().required('Required'),
  escalationTerms: Yup.string().required('Required'),

  // 6. Risk & Compliance
  keyRisks: Yup.string().required('Required'),
  complianceRequirements: Yup.string().required('Required'),

  // 7. Authorization
  preparedByApproval: Yup.string().required('Required'),
  procurementReview: Yup.string().required('Required'),
  departmentApproval: Yup.string().required('Required'),
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

  contractDate: '',
  department: '',
  preparedBy: '',
  referenceNumber: '',
  procurementCategory: '',
  contractPeriodFrom: '',
  contractPeriodTo: '',

  vendorName: '',
  contactPerson: '',
  email: '',
  phone: '',
  vendorAddress: '',
  country: '',

  scopeSummary: '',
  applicableLocations: '',

  itemService: '',
  unitRate: '',
  currency: '',
  rateRemarks: '',

  paymentTerms: '',
  priceValidity: '',
  escalationTerms: '',

  keyRisks: '',
  complianceRequirements: '',

  preparedByApproval: '',
  procurementReview: '',
  departmentApproval: '',
  financeApproval: '',
  managementApproval: '',
  approvalComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00304_RateContract = () => {

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
      formId="FRM-00304"
      title="Rate Contract – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Rate contract request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00304"
              title="Rate Contract"
              department="Procurement & Purchasing – Requisitions & Sourcing"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'contractDate','Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {field(values,'procurementCategory','Procurement Category')}
                  {field(values,'contractPeriodFrom','Contract Period From','date')}
                  {field(values,'contractPeriodTo','Contract Period To','date')}
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
                  {textarea(values,'vendorAddress','Address')}
                  {field(values,'country','Country')}
                </div>
              </div>

              {/* 3. Contract Scope */}
              <div className="form-section">
                <h3 className="form-section-title">3. Contract Scope</h3>
                <div className="form-fields">
                  {textarea(values,'scopeSummary','Scope Summary')}
                  {textarea(values,'applicableLocations','Applicable Locations / Departments')}
                </div>
              </div>

              {/* 4. Rate Details */}
              <div className="form-section">
                <h3 className="form-section-title">4. Rate Details</h3>
                <div className="form-fields">
                  {field(values,'itemService','Item / Service')}
                  {field(values,'unitRate','Unit Rate','number')}
                  {field(values,'currency','Currency')}
                  {textarea(values,'rateRemarks','Remarks')}
                </div>
              </div>

              {/* 5. Commercial Terms */}
              <div className="form-section">
                <h3 className="form-section-title">5. Commercial Terms</h3>
                <div className="form-fields">
                  {textarea(values,'paymentTerms','Payment Terms')}
                  {field(values,'priceValidity','Price Validity')}
                  {textarea(values,'escalationTerms','Escalation / Revision Terms')}
                </div>
              </div>

              {/* 6. Risk & Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">6. Risk & Compliance</h3>
                <div className="form-fields">
                  {textarea(values,'keyRisks','Key Risks')}
                  {textarea(values,'complianceRequirements','Compliance Requirements')}
                </div>
              </div>

              {/* 7. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">7. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByApproval','Prepared By (Name & Signature)')}
                  {field(values,'procurementReview','Procurement Review')}
                  {field(values,'departmentApproval','Department Approval')}
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
                    Submit Rate Contract Request
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

export default FRM00304_RateContract;
