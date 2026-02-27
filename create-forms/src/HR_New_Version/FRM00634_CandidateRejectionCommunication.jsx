// FRM00634_CandidateRejectionCommunication.jsx
// FRM-00634 – Candidate Rejection Communication – Request & Approval Form

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
  requisitionReferenceNumber: Yup.string().required('Required'),
  candidateName: Yup.string().required('Required'),
  candidateContactDetails: Yup.string().required('Required'),
  hiringStage: Yup.string().required('Required'),
  rejectionReasonInternal: Yup.string().required('Required'),
  proposedCommunicationSummary: Yup.string().required('Required'),
  communicationChannel: Yup.string().required('Required'),
  proposedCommunicationDate: Yup.string().required('Required'),

  // Section 2 – Communication Details
  isStandardCommunication: Yup.string().required('Required'),
  legalComplianceReviewRequired: Yup.string().required('Required'),
  sensitiveContentInvolved: Yup.string().required('Required'),
  additionalInstructions: Yup.string().required('Required'),
  hrLeadRemarks: Yup.string().required('Required'),

  // Section 3 – Approval
  communicationReferenceNumber: Yup.string().required('Required'),
  approvingAuthorityName: Yup.string().required('Required'),
  approvalStatus: Yup.string().required('Required'),
  approvedCommunicationChannel: Yup.string().required('Required'),
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
  requisitionReferenceNumber: '',
  candidateName: '',
  candidateContactDetails: '',
  hiringStage: '',
  rejectionReasonInternal: '',
  proposedCommunicationSummary: '',
  communicationChannel: '',
  proposedCommunicationDate: '',

  isStandardCommunication: '',
  legalComplianceReviewRequired: '',
  sensitiveContentInvolved: '',
  additionalInstructions: '',
  hrLeadRemarks: '',

  communicationReferenceNumber: '',
  approvingAuthorityName: '',
  approvalStatus: '',
  approvedCommunicationChannel: '',
  approvalComments: '',
  approvalDate: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00634_CandidateRejectionCommunication = () => {

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
      formId="FRM-00634"
      title="Candidate Rejection Communication – Request & Approval Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Candidate Rejection Communication submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00634"
              title="Candidate Rejection Communication – Request & Approval"
              department="HR & Talent Acquisition"
            >

              {/* Section 1 */}
              <div className="form-section">
                <h3 className="form-section-title">1. Request / Initiation Details</h3>
                <div className="form-fields">
                  {field(values,'requesterName','Requester Name')}
                  {field(values,'department','Department')}
                  {field(values,'positionJobTitle','Position / Job Title')}
                  {field(values,'requisitionReferenceNumber','Requisition / Hiring Reference Number')}
                  {field(values,'candidateName','Candidate Name')}
                  {field(values,'candidateContactDetails','Candidate Email / Contact Number')}
                  {field(values,'hiringStage','Stage of Hiring Process')}
                  {textarea(values,'rejectionReasonInternal','Reason for Rejection (Internal)')}
                  {textarea(values,'proposedCommunicationSummary','Proposed Rejection Communication Summary')}
                  {select(values,'communicationChannel','Communication Channel',['Email','Portal','Phone','Other'])}
                  {field(values,'proposedCommunicationDate','Proposed Communication Date','date')}
                </div>
              </div>

              {/* Section 2 */}
              <div className="form-section">
                <h3 className="form-section-title">2. Communication Details</h3>
                <div className="form-fields">
                  {select(values,'isStandardCommunication','Is this a standard rejection communication?',['Yes','No'])}
                  {select(values,'legalComplianceReviewRequired','Legal / Compliance Review Required?',['Yes','No'])}
                  {select(values,'sensitiveContentInvolved','Sensitive Content Involved?',['Yes','No'])}
                  {textarea(values,'additionalInstructions','Additional Instructions for Recruiter / HR')}
                  {textarea(values,'hrLeadRemarks','Remarks by HR / Talent Acquisition Lead')}
                </div>
              </div>

              {/* Section 3 */}
              <div className="form-section">
                <h3 className="form-section-title">3. Approval / Authorization Details</h3>
                <div className="form-fields">
                  {field(values,'communicationReferenceNumber','Communication Reference Number')}
                  {field(values,'approvingAuthorityName','Approving Authority Name')}
                  {select(values,'approvalStatus','Approval Status',['Approved','Rejected','On Hold'])}
                  {field(values,'approvedCommunicationChannel','Approved Communication Channel')}
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

export default FRM00634_CandidateRejectionCommunication;
