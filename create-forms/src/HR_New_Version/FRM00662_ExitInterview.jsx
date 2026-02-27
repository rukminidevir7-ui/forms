// FRM00662_ExitInterview.jsx
// FRM-00662 – Exit Interview – Request & Approval

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormCustomFields from '../components/FormCustomFields';
import FormSignatures from '../components/FormSignatures';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({

  // Section 1 – Request Details
  requesterName: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  employeeName: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  designation: Yup.string().required('Required'),
  businessUnitLocation: Yup.string().required('Required'),
  lastWorkingDate: Yup.string().required('Required'),
  reasonForExitAsPerEmployee: Yup.string().required('Required'),
  reportingManagerName: Yup.string().required('Required'),
  employeeContactDetails: Yup.string().required('Required'),
  proposedExitInterviewDate: Yup.string().required('Required'),

  // Section 2 – Interview Details
  overallExperience: Yup.string().required('Required'),
  reasonForLeavingSummary: Yup.string().required('Required'),
  roleWorkSatisfactionFeedback: Yup.string().required('Required'),
  managerTeamFeedback: Yup.string().required('Required'),
  workEnvironmentCultureFeedback: Yup.string().required('Required'),
  compensationBenefitsFeedback: Yup.string().required('Required'),
  considerRejoining: Yup.string().required('Required'),
  improvementSuggestions: Yup.string().required('Required'),
  hrInterviewerRemarks: Yup.string().required('Required'),

  // Section 3 – Approval
  exitInterviewReferenceNumber: Yup.string().required('Required'),
  approvingAuthorityName: Yup.string().required('Required'),
  approvalStatus: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),

  customFields: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  requesterName: '',
  department: '',
  employeeName: '',
  employeeId: '',
  designation: '',
  businessUnitLocation: '',
  lastWorkingDate: '',
  reasonForExitAsPerEmployee: '',
  reportingManagerName: '',
  employeeContactDetails: '',
  proposedExitInterviewDate: '',

  overallExperience: '',
  reasonForLeavingSummary: '',
  roleWorkSatisfactionFeedback: '',
  managerTeamFeedback: '',
  workEnvironmentCultureFeedback: '',
  compensationBenefitsFeedback: '',
  considerRejoining: '',
  improvementSuggestions: '',
  hrInterviewerRemarks: '',

  exitInterviewReferenceNumber: '',
  approvingAuthorityName: '',
  approvalStatus: '',
  approvalComments: '',
  approvalDate: '',

  customFields: [],
  signatures: []

};

const FRM00662_ExitInterview = () => {

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
      formId="FRM-00662"
      title="Exit Interview – Request & Approval"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('FRM-00662 Exit Interview Submitted Successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00662"
              title="Exit Interview – Request & Approval"
              department="HR & People Ops"
            >

              {/* Section 1 */}
              <div className="form-section">
                <h3 className="form-section-title">1. Employee Exit Details</h3>
                <div className="form-fields">
                  {field(values,'requesterName','Requester Name')}
                  {field(values,'department','Department')}
                  {field(values,'employeeName','Employee Name')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'designation','Designation')}
                  {field(values,'businessUnitLocation','Business Unit / Location')}
                  {field(values,'lastWorkingDate','Last Working Date','date')}
                  {textarea(values,'reasonForExitAsPerEmployee','Reason for Exit (as per employee)')}
                  {field(values,'reportingManagerName','Reporting Manager Name')}
                  {field(values,'employeeContactDetails','Employee Contact Details')}
                  {field(values,'proposedExitInterviewDate','Proposed Interview Date','date')}
                </div>
              </div>

              {/* Section 2 */}
              <div className="form-section">
                <h3 className="form-section-title">2. Exit Interview Feedback</h3>
                <div className="form-fields">
                  {textarea(values,'overallExperience','Overall Experience')}
                  {textarea(values,'reasonForLeavingSummary','Reason for Leaving (Summary)')}
                  {textarea(values,'roleWorkSatisfactionFeedback','Role / Work Satisfaction')}
                  {textarea(values,'managerTeamFeedback','Manager / Team Feedback')}
                  {textarea(values,'workEnvironmentCultureFeedback','Work Environment / Culture')}
                  {textarea(values,'compensationBenefitsFeedback','Compensation / Benefits')}
                  {select(values,'considerRejoining','Consider Rejoining?',['Yes','No'])}
                  {textarea(values,'improvementSuggestions','Improvement Suggestions')}
                  {textarea(values,'hrInterviewerRemarks','HR / Interviewer Remarks')}
                </div>
              </div>

              {/* Section 3 */}
              <div className="form-section">
                <h3 className="form-section-title">3. Approval / Authorization</h3>
                <div className="form-fields">
                  {field(values,'exitInterviewReferenceNumber','Reference Number')}
                  {field(values,'approvingAuthorityName','Approving Authority')}
                  {select(values,'approvalStatus','Approval Status',['Approved','Rejected','On Hold'])}
                  {textarea(values,'approvalComments','Approval Comments')}
                  {field(values,'approvalDate','Approval Date','date')}
                </div>
              </div>

              <FormCustomFields values={values} />
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

export default FRM00662_ExitInterview;
