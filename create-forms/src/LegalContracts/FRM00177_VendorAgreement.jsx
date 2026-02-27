// FRM00177_VendorAgreement.jsx
// FRM-00177 – Vendor Agreement – Request / Authorization Form

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

  // Vendor Details
  vendorLegalName: Yup.string().required('Required'),
  vendorId: Yup.string().required('Required'),
  vendorAddress: Yup.string().required('Required'),
  vendorContactPerson: Yup.string().required('Required'),
  vendorEmailPhone: Yup.string().required('Required'),
  vendorJurisdiction: Yup.string().required('Required'),

  // Scope of Goods / Services
  scopeOfSupply: Yup.string().required('Required'),
  keyDeliverables: Yup.string().required('Required'),
  serviceLevelsKPIs: Yup.string().required('Required'),

  // Commercial Terms
  effectiveDate: Yup.string().required('Required'),
  expirationDate: Yup.string().required('Required'),
  paymentTerms: Yup.string().required('Required'),
  contractValue: Yup.string().required('Required'),
  billingFrequency: Yup.string().required('Required'),
  contractCurrency: Yup.string().required('Required'),

  // Compliance & Risk
  complianceRequirements: Yup.string().required('Required'),
  keyRisksIdentified: Yup.string().required('Required'),
  insuranceLiabilityRequirements: Yup.string().required('Required'),

  // Review & Validation
  procurementReviewer: Yup.string().required('Required'),
  legalReviewer: Yup.string().required('Required'),
  specialClauses: Yup.string(),

  // Authorization
  preparedByConfirmation: Yup.string().required('Required'),
  businessApproval: Yup.string().required('Required'),
  procurementApproval: Yup.string().required('Required'),
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

  vendorLegalName: '',
  vendorId: '',
  vendorAddress: '',
  vendorContactPerson: '',
  vendorEmailPhone: '',
  vendorJurisdiction: '',

  scopeOfSupply: '',
  keyDeliverables: '',
  serviceLevelsKPIs: '',

  effectiveDate: '',
  expirationDate: '',
  paymentTerms: '',
  contractValue: '',
  billingFrequency: '',
  contractCurrency: '',

  complianceRequirements: '',
  keyRisksIdentified: '',
  insuranceLiabilityRequirements: '',

  procurementReviewer: '',
  legalReviewer: '',
  specialClauses: '',

  preparedByConfirmation: '',
  businessApproval: '',
  procurementApproval: '',
  legalApproval: '',
  managementApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00177_VendorAgreement = () => {

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
      formId="FRM-00177"
      title="Vendor Agreement – Request / Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Vendor Agreement form submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00177"
              title="Vendor Agreement"
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
                  {select(values,'agreementType','Agreement Type',['New Agreement','Renewal','Amendment'])}
                  {select(values,'priorityLevel','Priority',['Standard','High','Urgent'])}
                </div>
              </div>

              {/* Vendor Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Vendor Details</h3>
                <div className="form-fields">
                  {field(values,'vendorLegalName','Vendor Legal Name')}
                  {field(values,'vendorId','Vendor ID')}
                  {field(values,'vendorAddress','Registered Address')}
                  {field(values,'vendorContactPerson','Contact Person')}
                  {field(values,'vendorEmailPhone','Email / Phone')}
                  {field(values,'vendorJurisdiction','Country / Jurisdiction')}
                </div>
              </div>

              {/* Scope of Goods / Services */}
              <div className="form-section">
                <h3 className="form-section-title">3. Scope of Goods / Services</h3>
                <div className="form-fields">
                  {textarea(values,'scopeOfSupply','Scope of Goods / Services')}
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

              {/* Compliance & Risk */}
              <div className="form-section">
                <h3 className="form-section-title">5. Compliance & Risk</h3>
                <div className="form-fields">
                  {textarea(values,'complianceRequirements','Compliance Requirements')}
                  {textarea(values,'keyRisksIdentified','Key Risks Identified')}
                  {textarea(values,'insuranceLiabilityRequirements','Insurance / Liability Requirements')}
                </div>
              </div>

              {/* Review & Validation */}
              <div className="form-section">
                <h3 className="form-section-title">6. Review & Validation</h3>
                <div className="form-fields">
                  {field(values,'procurementReviewer','Reviewed By (Procurement)')}
                  {field(values,'legalReviewer','Reviewed By (Legal)')}
                  {textarea(values,'specialClauses','Special Clauses / Notes')}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">7. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByConfirmation','Prepared By (Name)')}
                  {field(values,'businessApproval','Business Approval')}
                  {field(values,'procurementApproval','Procurement Approval')}
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
                    Submit Vendor Agreement
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

export default FRM00177_VendorAgreement;
