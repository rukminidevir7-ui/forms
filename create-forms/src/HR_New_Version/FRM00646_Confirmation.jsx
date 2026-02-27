// FRM00646_Confirmation.jsx
// FRM-00646 – Employee Confirmation – Request & Approval

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

  // Section 1
  requesterName: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  employeeName: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  designation: Yup.string().required('Required'),
  businessUnitLocation: Yup.string().required('Required'),
  dateOfJoining: Yup.string().required('Required'),
  probationEndDate: Yup.string().required('Required'),
  reportingManagerName: Yup.string().required('Required'),
  confirmationEffectiveDate: Yup.string().required('Required'),

  // Section 2
  probationReviewOutcomeSummary: Yup.string().required('Required'),
  performanceAssessmentSummary: Yup.string().required('Required'),
  behaviourCultureFitAssessment: Yup.string().required('Required'),
  attendanceDisciplineRecord: Yup.string().required('Required'),
  reviewerRecommendation: Yup.string().required('Required'),
  proposedNewProbationEndDate: Yup.string().required('Required'),
  reviewerRemarks: Yup.string().required('Required'),

  // Section 3
  employeeConfirmationReferenceNumber: Yup.string().required('Required'),
  approvingAuthorityName: Yup.string().required('Required'),
  finalDecision: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),
  effectiveDecisionDate: Yup.string().required('Required'),
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
  dateOfJoining: '',
  probationEndDate: '',
  reportingManagerName: '',
  confirmationEffectiveDate: '',

  probationReviewOutcomeSummary: '',
  performanceAssessmentSummary: '',
  behaviourCultureFitAssessment: '',
  attendanceDisciplineRecord: '',
  reviewerRecommendation: '',
  proposedNewProbationEndDate: '',
  reviewerRemarks: '',

  employeeConfirmationReferenceNumber: '',
  approvingAuthorityName: '',
  finalDecision: '',
  approvalComments: '',
  effectiveDecisionDate: '',
  approvalDate: '',

  customFields: [],
  signatures: []

};

const FRM00646_Confirmation = () => {

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
      formId="FRM-00646"
      title="Employee Confirmation – Request & Approval"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('FRM-00646 Employee Confirmation Submitted Successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00646"
              title="Employee Confirmation – Request & Approval"
              department="HR & People Ops"
            >

              {/* Section 1 */}
              <div className="form-section">
                <h3 className="form-section-title">1. Employee & Probation Details</h3>
                <div className="form-fields">
                  {field(values,'requesterName','Requester Name')}
                  {field(values,'department','Department')}
                  {field(values,'employeeName','Employee Name')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'designation','Designation')}
                  {field(values,'businessUnitLocation','Business Unit / Location')}
                  {field(values,'dateOfJoining','Date of Joining','date')}
                  {field(values,'probationEndDate','Probation End Date','date')}
                  {field(values,'reportingManagerName','Reporting Manager')}
                  {field(values,'confirmationEffectiveDate','Confirmation Effective Date','date')}
                </div>
              </div>

              {/* Section 2 */}
              <div className="form-section">
                <h3 className="form-section-title">2. Review & Recommendation</h3>
                <div className="form-fields">
                  {textarea(values,'probationReviewOutcomeSummary','Probation Review Outcome Summary')}
                  {textarea(values,'performanceAssessmentSummary','Performance Assessment Summary')}
                  {textarea(values,'behaviourCultureFitAssessment','Behaviour / Culture Fit Assessment')}
                  {textarea(values,'attendanceDisciplineRecord','Attendance / Discipline Record')}
                  {select(values,'reviewerRecommendation','Reviewer Recommendation',['Confirm','Extend'])}
                  {field(values,'proposedNewProbationEndDate','If Extended – New Probation End Date','date')}
                  {textarea(values,'reviewerRemarks','Reviewer Remarks')}
                </div>
              </div>

              {/* Section 3 */}
              <div className="form-section">
                <h3 className="form-section-title">3. Approval / Authorization</h3>
                <div className="form-fields">
                  {field(values,'employeeConfirmationReferenceNumber','Employee Confirmation Reference Number')}
                  {field(values,'approvingAuthorityName','Approving Authority Name')}
                  {select(values,'finalDecision','Final Decision',['Confirmed','Extended'])}
                  {textarea(values,'approvalComments','Approval Comments')}
                  {field(values,'effectiveDecisionDate','Effective Date of Decision','date')}
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

export default FRM00646_Confirmation;
