// FRM00172_NDAMutual.jsx
// FRM-00172 – NDA (Mutual) – Request / Authorization Form

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
  organizationName: Yup.string().required('Required'),
  counterpartyName: Yup.string().required('Required'),
  counterpartyAddress: Yup.string().required('Required'),
  counterpartyContactPerson: Yup.string().required('Required'),
  counterpartyEmailPhone: Yup.string().required('Required'),
  counterpartyJurisdiction: Yup.string().required('Required'),

  // Agreement Scope
  ndaPurpose: Yup.string().required('Required'),
  confidentialInformationScope: Yup.string().required('Required'),
  keyObligationsSummary: Yup.string().required('Required'),

  // Terms & Duration
  effectiveDate: Yup.string().required('Required'),
  expirationDate: Yup.string().required('Required'),
  confidentialityPeriod: Yup.string().required('Required'),
  governingLaw: Yup.string().required('Required'),

  // Review & Validation
  legalReviewer: Yup.string().required('Required'),
  riskAssessmentSummary: Yup.string().required('Required'),
  specialClauses: Yup.string(),

  // Authorization
  preparedByConfirmation: Yup.string().required('Required'),
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

  organizationName: '',
  counterpartyName: '',
  counterpartyAddress: '',
  counterpartyContactPerson: '',
  counterpartyEmailPhone: '',
  counterpartyJurisdiction: '',

  ndaPurpose: '',
  confidentialInformationScope: '',
  keyObligationsSummary: '',

  effectiveDate: '',
  expirationDate: '',
  confidentialityPeriod: '',
  governingLaw: '',

  legalReviewer: '',
  riskAssessmentSummary: '',
  specialClauses: '',

  preparedByConfirmation: '',
  legalApproval: '',
  managementApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00172_NDAMutual = () => {

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
      formId="FRM-00172"
      title="NDA (Mutual) – Request / Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('NDA (Mutual) form submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00172"
              title="Mutual Non-Disclosure Agreement (NDA)"
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
                  {field(values,'organizationName','Organization Name')}
                  {field(values,'counterpartyName','Counterparty Legal Name')}
                  {field(values,'counterpartyAddress','Counterparty Registered Address')}
                  {field(values,'counterpartyContactPerson','Counterparty Contact Person')}
                  {field(values,'counterpartyEmailPhone','Counterparty Email / Phone')}
                  {field(values,'counterpartyJurisdiction','Country / Jurisdiction')}
                </div>
              </div>

              {/* Agreement Scope */}
              <div className="form-section">
                <h3 className="form-section-title">3. Agreement Scope</h3>
                <div className="form-fields">
                  {textarea(values,'ndaPurpose','Purpose of NDA')}
                  {textarea(values,'confidentialInformationScope','Scope of Confidential Information')}
                  {textarea(values,'keyObligationsSummary','Key Obligations Summary')}
                </div>
              </div>

              {/* Terms & Duration */}
              <div className="form-section">
                <h3 className="form-section-title">4. Terms & Duration</h3>
                <div className="form-fields">
                  {field(values,'effectiveDate','Effective Date','date')}
                  {field(values,'expirationDate','Expiration Date','date')}
                  {field(values,'confidentialityPeriod','Confidentiality Period (Years)')}
                  {field(values,'governingLaw','Governing Law / Jurisdiction')}
                </div>
              </div>

              {/* Review & Validation */}
              <div className="form-section">
                <h3 className="form-section-title">5. Review & Validation</h3>
                <div className="form-fields">
                  {field(values,'legalReviewer','Reviewed By (Legal)')}
                  {textarea(values,'riskAssessmentSummary','Risk Assessment Summary')}
                  {textarea(values,'specialClauses','Special Clauses / Notes')}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByConfirmation','Prepared By (Name)')}
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
                    Submit NDA (Mutual)
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

export default FRM00172_NDAMutual;
