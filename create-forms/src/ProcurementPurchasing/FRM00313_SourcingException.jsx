// FRM00313_SourcingException.jsx
// FRM-00313 – Sourcing Exception – Request / Initiation Form

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
  procurementCategory: Yup.string().required('Required'),
  priority: Yup.string().required('Required'),
  requiredByDate: Yup.string().required('Required'),

  // 2. Exception Details
  exceptionType: Yup.string().required('Required'),
  reasonForException: Yup.string().required('Required'),
  standardProcessBypassed: Yup.string().required('Required'),
  businessJustification: Yup.string().required('Required'),

  // 3. Vendor / Supplier Details
  vendorName: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().required('Required'),
  vendorAddress: Yup.string().required('Required'),
  country: Yup.string().required('Required'),

  // 4. Financial Summary
  estimatedAmount: Yup.number().typeError('Must be a number').required('Required'),
  currency: Yup.string().required('Required'),
  budgetConfirmed: Yup.string().required('Required'),
  costCenter: Yup.string().required('Required'),

  // 5. Risk Assessment
  risksIdentified: Yup.string().required('Required'),
  mitigationPlan: Yup.string().required('Required'),

  // 6. Authorization
  requesterApproval: Yup.string().required('Required'),
  procurementReview: Yup.string().required('Required'),
  departmentApproval: Yup.string().required('Required'),
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
  procurementCategory: '',
  priority: '',
  requiredByDate: '',

  exceptionType: '',
  reasonForException: '',
  standardProcessBypassed: '',
  businessJustification: '',

  vendorName: '',
  contactPerson: '',
  email: '',
  phone: '',
  vendorAddress: '',
  country: '',

  estimatedAmount: '',
  currency: '',
  budgetConfirmed: '',
  costCenter: '',

  risksIdentified: '',
  mitigationPlan: '',

  requesterApproval: '',
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

const FRM00313_SourcingException = () => {

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
      formId="FRM-00313"
      title="Sourcing Exception – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Sourcing exception request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00313"
              title="Sourcing Exception"
              department="Procurement & Purchasing – Requisitions & Sourcing"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'requestedBy','Requested By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {field(values,'procurementCategory','Procurement Category')}
                  {select(values,'priority','Priority',['Low','Medium','High','Urgent'])}
                  {field(values,'requiredByDate','Required By Date','date')}
                </div>
              </div>

              {/* 2. Exception Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Exception Details</h3>
                <div className="form-fields">
                  {select(values,'exceptionType','Type of Exception',['Single Source','Emergency','Limited Competition','Specification Restriction','Other'])}
                  {textarea(values,'reasonForException','Reason for Exception')}
                  {textarea(values,'standardProcessBypassed','Standard Process Bypassed')}
                  {textarea(values,'businessJustification','Business Justification')}
                </div>
              </div>

              {/* 3. Vendor / Supplier Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Vendor / Supplier Details</h3>
                <div className="form-fields">
                  {field(values,'vendorName','Vendor Name')}
                  {field(values,'contactPerson','Contact Person')}
                  {field(values,'email','Email','email')}
                  {field(values,'phone','Phone')}
                  {textarea(values,'vendorAddress','Address')}
                  {field(values,'country','Country')}
                </div>
              </div>

              {/* 4. Financial Summary */}
              <div className="form-section">
                <h3 className="form-section-title">4. Financial Summary</h3>
                <div className="form-fields">
                  {field(values,'estimatedAmount','Estimated Amount','number')}
                  {field(values,'currency','Currency')}
                  {select(values,'budgetConfirmed','Budget Availability Confirmed',['Yes','No'])}
                  {field(values,'costCenter','Cost Center')}
                </div>
              </div>

              {/* 5. Risk Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">5. Risk Assessment</h3>
                <div className="form-fields">
                  {textarea(values,'risksIdentified','Risks Identified')}
                  {textarea(values,'mitigationPlan','Mitigation Plan')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requesterApproval','Requested By (Name & Signature)')}
                  {field(values,'procurementReview','Procurement Review')}
                  {field(values,'departmentApproval','Department Approval')}
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
                    Submit Sourcing Exception
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

export default FRM00313_SourcingException;
