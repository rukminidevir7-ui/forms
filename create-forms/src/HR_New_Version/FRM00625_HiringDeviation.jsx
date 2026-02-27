// FRM00625_HiringDeviation.jsx
// FRM-00625 – Hiring Deviation – Request & Approval Form

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

  // Section 1 – Request / Initiation
  requesterName: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  positionJobTitle: Yup.string().required('Required'),
  candidateName: Yup.string().required('Required'),
  typeOfHiringDeviation: Yup.string().required('Required'),
  policyProcessDeviated: Yup.string().required('Required'),
  reasonForDeviation: Yup.string().required('Required'),
  businessJustification: Yup.string().required('Required'),
  riskImpactOfDeviation: Yup.string().required('Required'),
  proposedMitigationControl: Yup.string().required('Required'),
  requiredByDate: Yup.string().required('Required'),

  // Section 2 – Deviation Details
  isOneTimeDeviation: Yup.string().required('Required'),
  deviationDuration: Yup.string().required('Required'),
  hasFinancialImpact: Yup.string().required('Required'),
  estimatedCostImpact: Yup.string().required('Required'),
  externalApprovalRequired: Yup.string().required('Required'),

  // Section 3 – Approval
  deviationReferenceNumber: Yup.string().required('Required'),
  approvingAuthorityName: Yup.string().required('Required'),
  approvalStatus: Yup.string().required('Required'),
  budgetAvailability: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  requesterName: '',
  department: '',
  positionJobTitle: '',
  candidateName: '',
  typeOfHiringDeviation: '',
  policyProcessDeviated: '',
  reasonForDeviation: '',
  businessJustification: '',
  riskImpactOfDeviation: '',
  proposedMitigationControl: '',
  requiredByDate: '',

  isOneTimeDeviation: '',
  deviationDuration: '',
  hasFinancialImpact: '',
  estimatedCostImpact: '',
  externalApprovalRequired: '',

  deviationReferenceNumber: '',
  approvingAuthorityName: '',
  approvalStatus: '',
  budgetAvailability: '',
  approvalComments: '',
  approvalDate: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00625_HiringDeviation = () => {

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
      formId="FRM-00625"
      title="Hiring Deviation – Request & Approval Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Hiring deviation submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00625"
              title="Hiring Deviation – Request & Approval"
              department="HR & Talent Acquisition"
            >

              {/* Section 1 – Request Details */}
              <div className="form-section">
                <h3 className="form-section-title">1. Request / Initiation Details</h3>
                <div className="form-fields">
                  {field(values,'requesterName','Requester Name')}
                  {field(values,'department','Department')}
                  {field(values,'positionJobTitle','Position / Job Title')}
                  {field(values,'candidateName','Candidate Name')}
                  {field(values,'typeOfHiringDeviation','Type of Hiring Deviation')}
                  {textarea(values,'policyProcessDeviated','Policy / Process Being Deviated')}
                  {textarea(values,'reasonForDeviation','Reason for Deviation')}
                  {textarea(values,'businessJustification','Business Justification')}
                  {textarea(values,'riskImpactOfDeviation','Risk / Impact of Deviation')}
                  {textarea(values,'proposedMitigationControl','Proposed Mitigation / Control')}
                  {field(values,'requiredByDate','Required By Date','date')}
                </div>
              </div>

              {/* Section 2 – Deviation Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Deviation Details</h3>
                <div className="form-fields">
                  {select(values,'isOneTimeDeviation','Is this a one-time deviation?',['Yes','No'])}
                  {field(values,'deviationDuration','Duration / Period of Deviation')}
                  {select(values,'hasFinancialImpact','Any Financial Impact?',['Yes','No'])}
                  {field(values,'estimatedCostImpact','Estimated Cost Impact')}
                  {select(values,'externalApprovalRequired','External Approval Required?',['Yes','No'])}
                </div>
              </div>

              {/* Section 3 – Approval */}
              <div className="form-section">
                <h3 className="form-section-title">3. Approval / Authorization Details</h3>
                <div className="form-fields">
                  {field(values,'deviationReferenceNumber','Deviation Reference Number')}
                  {field(values,'approvingAuthorityName','Approving Authority Name')}
                  {select(values,'approvalStatus','Approval Status',['Approved','Rejected','On Hold'])}
                  {select(values,'budgetAvailability','Budget Availability',['Yes','No','NA'])}
                  {textarea(values,'approvalComments','Approval Decision / Comments')}
                  {field(values,'approvalDate','Approval Date','date')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Form
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

export default FRM00625_HiringDeviation;
