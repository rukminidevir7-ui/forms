// FRM00197_LegalNotice.jsx
// FRM-00197 – Legal Notice – Request / Authorization Form

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
  departmentFunction: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  referenceId: Yup.string().required('Required'),
  contactDetails: Yup.string().required('Required'),
  noticeType: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // 2. Sender & Recipient Details
  senderName: Yup.string().required('Required'),
  recipientName: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  emailPhone: Yup.string().required('Required'),
  jurisdiction: Yup.string().required('Required'),

  // 3. Notice Details
  subjectOfNotice: Yup.string().required('Required'),
  referenceAgreement: Yup.string().required('Required'),
  incidentDate: Yup.string().required('Required'),

  // 4. Description & Claims
  summaryOfFacts: Yup.string().required('Required'),
  claimsDemands: Yup.string().required('Required'),
  responseDeadline: Yup.string().required('Required'),

  // 5. Legal Considerations
  applicableLawsClauses: Yup.string().required('Required'),
  potentialConsequences: Yup.string().required('Required'),
  specialInstructions: Yup.string(),

  // 6. Risk Assessment
  keyRisksIdentified: Yup.string().required('Required'),
  mitigationNotes: Yup.string().required('Required'),

  // 7. Authorization
  preparedByConfirmation: Yup.string().required('Required'),
  businessHrApproval: Yup.string().required('Required'),
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
  referenceId: '',
  contactDetails: '',
  noticeType: '',
  priorityLevel: '',

  senderName: '',
  recipientName: '',
  address: '',
  contactPerson: '',
  emailPhone: '',
  jurisdiction: '',

  subjectOfNotice: '',
  referenceAgreement: '',
  incidentDate: '',

  summaryOfFacts: '',
  claimsDemands: '',
  responseDeadline: '',

  applicableLawsClauses: '',
  potentialConsequences: '',
  specialInstructions: '',

  keyRisksIdentified: '',
  mitigationNotes: '',

  preparedByConfirmation: '',
  businessHrApproval: '',
  legalApproval: '',
  managementApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00197_LegalNotice = () => {

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
      formId="FRM-00197"
      title="Legal Notice – Request / Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Legal Notice form submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00197"
              title="Legal Notice"
              department="Legal & Contracts – Employment Legal"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'departmentFunction','Department / Function')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'referenceId','Employee ID / Reference')}
                  {field(values,'contactDetails','Contact Details')}
                  {select(values,'noticeType','Notice Type',['Demand Notice','Breach Notice','Termination Notice','Show Cause Notice','Legal Claim Notice'])}
                  {select(values,'priorityLevel','Priority',['Standard','High','Urgent'])}
                </div>
              </div>

              {/* 2. Sender & Recipient Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Sender & Recipient Details</h3>
                <div className="form-fields">
                  {field(values,'senderName','Sender (Organization / Individual)')}
                  {field(values,'recipientName','Recipient (Organization / Individual)')}
                  {field(values,'address','Address')}
                  {field(values,'contactPerson','Contact Person')}
                  {field(values,'emailPhone','Email / Phone')}
                  {field(values,'jurisdiction','Country / Jurisdiction')}
                </div>
              </div>

              {/* 3. Notice Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Notice Details</h3>
                <div className="form-fields">
                  {field(values,'subjectOfNotice','Subject of Notice')}
                  {field(values,'referenceAgreement','Reference Agreement / Matter')}
                  {field(values,'incidentDate','Date of Incident / Cause','date')}
                </div>
              </div>

              {/* 4. Description & Claims */}
              <div className="form-section">
                <h3 className="form-section-title">4. Description & Claims</h3>
                <div className="form-fields">
                  {textarea(values,'summaryOfFacts','Summary of Facts')}
                  {textarea(values,'claimsDemands','Claims / Demands')}
                  {field(values,'responseDeadline','Response Deadline','date')}
                </div>
              </div>

              {/* 5. Legal Considerations */}
              <div className="form-section">
                <h3 className="form-section-title">5. Legal Considerations</h3>
                <div className="form-fields">
                  {textarea(values,'applicableLawsClauses','Applicable Laws / Clauses')}
                  {textarea(values,'potentialConsequences','Potential Consequences')}
                  {textarea(values,'specialInstructions','Special Instructions')}
                </div>
              </div>

              {/* 6. Risk Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">6. Risk Assessment</h3>
                <div className="form-fields">
                  {textarea(values,'keyRisksIdentified','Key Risks Identified')}
                  {textarea(values,'mitigationNotes','Mitigation Notes')}
                </div>
              </div>

              {/* 7. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">7. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByConfirmation','Prepared By (Name)')}
                  {field(values,'businessHrApproval','Business / HR Approval')}
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
                    Submit Legal Notice
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

export default FRM00197_LegalNotice;
