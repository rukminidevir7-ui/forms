// FRM00614_InterviewFeedback.jsx
// FRM-SPECIAL-INTERVIEW-FEEDBACK – Interview Feedback – Request & Approval

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

  // Section 1 – Approval Information
  interviewReferenceNumber: Yup.string().required('Required'),
  candidateName: Yup.string().required('Required'),
  approvingAuthorityName: Yup.string().required('Required'),
  approvalDecision: Yup.string().required('Required'),
  decisionComments: Yup.string().required('Required'),
  nextAction: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),

  // Section 2 – Final Record Information
  positionTitle: Yup.string().required('Required'),
  interviewRoundsCompleted: Yup.number().required('Required'),
  overallRating: Yup.number().min(1).max(5).required('Required'),
  finalDecisionRecord: Yup.string().required('Required'),
  approvedBy: Yup.string().required('Required'),
  decisionDate: Yup.string().required('Required'),
  recruitmentStatus: Yup.string().required('Required'),
  hrRemarks: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  interviewReferenceNumber: '',
  candidateName: '',
  approvingAuthorityName: '',
  approvalDecision: '',
  decisionComments: '',
  nextAction: '',
  approvalDate: '',

  positionTitle: '',
  interviewRoundsCompleted: '',
  overallRating: '',
  finalDecisionRecord: '',
  approvedBy: '',
  decisionDate: '',
  recruitmentStatus: '',
  hrRemarks: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00614_InterviewFeedback = () => {

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
      formId="FRM-SPECIAL-INTERVIEW-FEEDBACK"
      title="Interview Feedback – Request & Approval"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Interview feedback submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-SPECIAL-INTERVIEW-FEEDBACK"
              title="Interview Feedback – Request & Approval"
              department="HR & Talent Acquisition"
            >

              {/* Section 1 – Approval Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Approval Information</h3>
                <div className="form-fields">
                  {field(values,'interviewReferenceNumber','Interview Reference No.')}
                  {field(values,'candidateName','Candidate Name')}
                  {field(values,'approvingAuthorityName','Approving Authority Name')}
                  {select(values,'approvalDecision','Final Decision (Approval Section)',['Approved','Rejected','On Hold'])}
                  {textarea(values,'decisionComments','Decision Comments')}
                  {select(values,'nextAction','Next Action',['Issue Offer','Schedule Additional Round','Reject Candidate','Keep in Pipeline'])}
                  {field(values,'approvalDate','Approval Date','date')}
                </div>
              </div>

              {/* Section 2 – Final Record Information */}
              <div className="form-section">
                <h3 className="form-section-title">2. Final Record Information</h3>
                <div className="form-fields">
                  {field(values,'positionTitle','Position / Job Title')}
                  {field(values,'interviewRoundsCompleted','Interview Rounds Completed','number')}
                  {select(values,'overallRating','Overall Rating (1–5)',['1','2','3','4','5'])}
                  {select(values,'finalDecisionRecord','Final Decision (Record Section)',['Selected','Rejected','On Hold'])}
                  {field(values,'approvedBy','Approved By')}
                  {field(values,'decisionDate','Decision Date','date')}
                  {select(values,'recruitmentStatus','Recruitment Status',['Offer Released','Offer Accepted','Offer Declined','Position Closed'])}
                  {textarea(values,'hrRemarks','HR Remarks')}
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

export default FRM00614_InterviewFeedback;
