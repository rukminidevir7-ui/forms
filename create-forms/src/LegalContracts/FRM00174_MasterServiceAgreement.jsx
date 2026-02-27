// FRM00174_MasterServiceAgreement.jsx
// FRM-00174 – Master Service Agreement – Request / Authorization Form

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

  // Basic Information
  requestDate: Yup.string().required('Required'),
  departmentFunction: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  contactDetails: Yup.string().required('Required'),
  agreementPriority: Yup.string().required('Required'),

  // Party Details
  companyLegalName: Yup.string().required('Required'),
  serviceProviderName: Yup.string().required('Required'),
  serviceProviderAddress: Yup.string().required('Required'),
  serviceProviderContactPerson: Yup.string().required('Required'),
  serviceProviderEmailPhone: Yup.string().required('Required'),
  serviceProviderJurisdiction: Yup.string().required('Required'),

  // Agreement Scope
  scopeOfServices: Yup.string().required('Required'),
  keyDeliverables: Yup.string().required('Required'),
  serviceLevelsKPIs: Yup.string().required('Required'),

  // Commercial Terms
  effectiveDate: Yup.string().required('Required'),
  expirationDate: Yup.string().required('Required'),
  paymentTerms: Yup.string().required('Required'),
  contractValue: Yup.string().required('Required'),
  billingFrequency: Yup.string().required('Required'),
  contractCurrency: Yup.string().required('Required'),

  // Risk & Compliance
  keyRisksIdentified: Yup.string().required('Required'),
  complianceRequirements: Yup.string().required('Required'),
  insuranceLiabilityRequirements: Yup.string().required('Required'),

  // Review & Validation
  legalReviewer: Yup.string().required('Required'),
  riskAssessmentSummary: Yup.string().required('Required'),
  specialClauses: Yup.string(),

  // Authorization
  preparedByConfirmation: Yup.string().required('Required'),
  businessApproval: Yup.string().required('Required'),
  legalApproval: Yup.string().required('Required'),
  managementApproval: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  requestDate: '',
  departmentFunction: '',
  preparedBy: '',
  employeeId: '',
  contactDetails: '',
  agreementPriority: '',

  companyLegalName: '',
  serviceProviderName: '',
  serviceProviderAddress: '',
  serviceProviderContactPerson: '',
  serviceProviderEmailPhone: '',
  serviceProviderJurisdiction: '',

  scopeOfServices: '',
  keyDeliverables: '',
  serviceLevelsKPIs: '',

  effectiveDate: '',
  expirationDate: '',
  paymentTerms: '',
  contractValue: '',
  billingFrequency: '',
  contractCurrency: '',

  keyRisksIdentified: '',
  complianceRequirements: '',
  insuranceLiabilityRequirements: '',

  legalReviewer: '',
  riskAssessmentSummary: '',
  specialClauses: '',

  preparedByConfirmation: '',
  businessApproval: '',
  legalApproval: '',
  managementApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00174_MasterServiceAgreement = () => {

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
      formId="FRM-00174"
      title="Master Service Agreement – Request / Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Master Service Agreement form submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00174"
              title="Master Service Agreement (MSA)"
              department="Legal & Contracts – Contracting"
            >

              {/* Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'departmentFunction','Department / Function')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'contactDetails','Contact Details')}
                  {select(values,'agreementPriority','Priority',['Standard','High','Urgent'])}
                </div>
              </div>

              {/* Party Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Party Details</h3>
                <div className="form-fields">
                  {field(values,'companyLegalName','Company Legal Name')}
                  {field(values,'serviceProviderName','Service Provider / Counterparty')}
                  {field(values,'serviceProviderAddress','Registered Address')}
                  {field(values,'serviceProviderContactPerson','Contact Person')}
                  {field(values,'serviceProviderEmailPhone','Email / Phone')}
                  {field(values,'serviceProviderJurisdiction','Country / Jurisdiction')}
                </div>
              </div>

              {/* Agreement Scope */}
              <div className="form-section">
                <h3 className="form-section-title">3. Agreement Scope</h3>
                <div className="form-fields">
                  {textarea(values,'scopeOfServices','Scope of Services')}
                  {textarea(values,'keyDeliverables','Key Deliverables')}
                  {textarea(values,'serviceLevelsKPIs','Service Levels / KPIs')}
                </div>
              </div>

              {/* Commercial Terms */}
              <div className="form-section">
                <h3 className="form-section-title">4. Commercial Terms</h3>
                <div className="form-fields">
                  {field(values,'effectiveDate','Effective Date','date')}
                  {field(values,'expirationDate','Expiration Date','date')}
                  {textarea(values,'paymentTerms','Payment Terms')}
                  {field(values,'contractValue','Total Contract Value')}
                  {select(values,'billingFrequency','Billing Frequency',['Monthly','Quarterly','Milestone-Based','Annual'])}
                  {field(values,'contractCurrency','Currency')}
                </div>
              </div>

              {/* Risk & Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">5. Risk & Compliance</h3>
                <div className="form-fields">
                  {textarea(values,'keyRisksIdentified','Key Risks Identified')}
                  {textarea(values,'complianceRequirements','Compliance Requirements')}
                  {textarea(values,'insuranceLiabilityRequirements','Insurance / Liability Requirements')}
                </div>
              </div>

              {/* Review & Validation */}
              <div className="form-section">
                <h3 className="form-section-title">6. Review & Validation</h3>
                <div className="form-fields">
                  {field(values,'legalReviewer','Reviewed By (Legal)')}
                  {textarea(values,'riskAssessmentSummary','Risk Assessment Summary')}
                  {textarea(values,'specialClauses','Special Clauses / Notes')}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">7. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByConfirmation','Prepared By (Name)')}
                  {field(values,'businessApproval','Business Approval')}
                  {field(values,'legalApproval','Legal Approval')}
                  {field(values,'managementApproval','Management Approval')}
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
                    Submit Master Service Agreement
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

export default FRM00174_MasterServiceAgreement;
