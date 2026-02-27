// FRM00176_ServiceLevelAgreement.jsx
// FRM-00176 – Service Level Agreement – Request / Authorization Form

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
  agreementType: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // Party Details
  companyLegalName: Yup.string().required('Required'),
  serviceProviderName: Yup.string().required('Required'),
  serviceProviderAddress: Yup.string().required('Required'),
  serviceProviderContactPerson: Yup.string().required('Required'),
  serviceProviderEmailPhone: Yup.string().required('Required'),
  serviceProviderJurisdiction: Yup.string().required('Required'),

  // Service Scope
  servicesCovered: Yup.string().required('Required'),
  serviceHoursCoverage: Yup.string().required('Required'),
  serviceLocations: Yup.string().required('Required'),

  // Service Levels & Metrics
  performanceMetrics: Yup.string().required('Required'),
  targetServiceLevels: Yup.string().required('Required'),
  measurementMethod: Yup.string().required('Required'),

  // Timeline & Review
  effectiveDate: Yup.string().required('Required'),
  reviewFrequency: Yup.string().required('Required'),
  expirationDate: Yup.string().required('Required'),
  escalationProcess: Yup.string().required('Required'),

  // Commercial Terms
  pricingModel: Yup.string().required('Required'),
  serviceCreditsPenalties: Yup.string().required('Required'),
  paymentTerms: Yup.string().required('Required'),
  contractCurrency: Yup.string().required('Required'),

  // Risk & Compliance
  keyRisks: Yup.string().required('Required'),
  complianceRequirements: Yup.string().required('Required'),
  assumptionsConstraints: Yup.string().required('Required'),

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
  agreementType: '',
  priorityLevel: '',

  companyLegalName: '',
  serviceProviderName: '',
  serviceProviderAddress: '',
  serviceProviderContactPerson: '',
  serviceProviderEmailPhone: '',
  serviceProviderJurisdiction: '',

  servicesCovered: '',
  serviceHoursCoverage: '',
  serviceLocations: '',

  performanceMetrics: '',
  targetServiceLevels: '',
  measurementMethod: '',

  effectiveDate: '',
  reviewFrequency: '',
  expirationDate: '',
  escalationProcess: '',

  pricingModel: '',
  serviceCreditsPenalties: '',
  paymentTerms: '',
  contractCurrency: '',

  keyRisks: '',
  complianceRequirements: '',
  assumptionsConstraints: '',

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

const FRM00176_ServiceLevelAgreement = () => {

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
      formId="FRM-00176"
      title="Service Level Agreement – Request / Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Service Level Agreement form submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00176"
              title="Service Level Agreement (SLA)"
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
                  {select(values,'agreementType','Agreement Type',['New SLA','Renewal','Amendment'])}
                  {select(values,'priorityLevel','Priority',['Standard','High','Urgent'])}
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

              {/* Service Scope */}
              <div className="form-section">
                <h3 className="form-section-title">3. Service Scope</h3>
                <div className="form-fields">
                  {textarea(values,'servicesCovered','Services Covered')}
                  {textarea(values,'serviceHoursCoverage','Service Hours / Coverage')}
                  {textarea(values,'serviceLocations','Service Locations')}
                </div>
              </div>

              {/* Service Levels & Metrics */}
              <div className="form-section">
                <h3 className="form-section-title">4. Service Levels & Metrics</h3>
                <div className="form-fields">
                  {textarea(values,'performanceMetrics','Performance Metrics / KPIs')}
                  {textarea(values,'targetServiceLevels','Target Service Levels')}
                  {textarea(values,'measurementMethod','Measurement Method')}
                </div>
              </div>

              {/* Timeline & Review */}
              <div className="form-section">
                <h3 className="form-section-title">5. Timeline & Review</h3>
                <div className="form-fields">
                  {field(values,'effectiveDate','Effective Date','date')}
                  {field(values,'reviewFrequency','Review Frequency')}
                  {field(values,'expirationDate','Expiration Date','date')}
                  {textarea(values,'escalationProcess','Escalation Process')}
                </div>
              </div>

              {/* Commercial Terms */}
              <div className="form-section">
                <h3 className="form-section-title">6. Commercial Terms</h3>
                <div className="form-fields">
                  {select(values,'pricingModel','Pricing Model',['Fixed Fee','Usage-Based','Tiered','Retainer'])}
                  {textarea(values,'serviceCreditsPenalties','Service Credits / Penalties')}
                  {textarea(values,'paymentTerms','Payment Terms')}
                  {field(values,'contractCurrency','Currency')}
                </div>
              </div>

              {/* Risk & Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">7. Risk & Compliance</h3>
                <div className="form-fields">
                  {textarea(values,'keyRisks','Key Risks Identified')}
                  {textarea(values,'complianceRequirements','Compliance Requirements')}
                  {textarea(values,'assumptionsConstraints','Assumptions / Constraints')}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">8. Authorization</h3>
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
                    Submit Service Level Agreement
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

export default FRM00176_ServiceLevelAgreement;
