// FRM00649_PromotionRecommendation.jsx
// FRM-00649 – Promotion Recommendation – Report / Record

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormCustomFields from '../components/FormCustomFields';
import FormAttachments from '../components/FormAttachments';
import FormSignatures from '../components/FormSignatures';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({

  employeeFullName: Yup.string().required('Required'),
  employeeID: Yup.string().required('Required'),
  dateOfJoining: Yup.string().required('Required'),

  currentJobTitle: Yup.string().required('Required'),
  currentDepartment: Yup.string().required('Required'),

  proposedJobTitle: Yup.string().required('Required'),
  proposedDepartment: Yup.string().required('Required'),
  proposedEffectiveDate: Yup.string().required('Required'),
  proposedRevisedSalary: Yup.string().required('Required'),

  yearsInCurrentRole: Yup.string().required('Required'),
  lastPerformanceRating: Yup.string().required('Required'),
  keyAchievements: Yup.string().required('Required'),
  leadershipSkillAssessment: Yup.string().required('Required'),

  reportingManagerName: Yup.string().required('Required'),
  hrReviewRemarks: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  employeeFullName: '',
  employeeID: '',
  dateOfJoining: '',

  currentJobTitle: '',
  currentDepartment: '',

  proposedJobTitle: '',
  proposedDepartment: '',
  proposedEffectiveDate: '',
  proposedRevisedSalary: '',

  yearsInCurrentRole: '',
  lastPerformanceRating: '',
  keyAchievements: '',
  leadershipSkillAssessment: '',

  reportingManagerName: '',
  hrReviewRemarks: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00649_PromotionRecommendation = () => {

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

  return (

    <ModernFormWrapper
      formId="FRM-00649"
      title="Promotion Recommendation – Report / Record"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('FRM-00649 Promotion Recommendation Saved Successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00649"
              title="Promotion Recommendation – Report / Record"
              department="HR & People Ops"
            >

              {/* Section 1 – Employee Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Employee Information</h3>
                <div className="form-fields">
                  {field(values,'employeeFullName','Employee Full Name')}
                  {field(values,'employeeID','Employee ID')}
                  {field(values,'dateOfJoining','Date of Joining','date')}
                  {field(values,'yearsInCurrentRole','Years in Current Role')}
                  {field(values,'lastPerformanceRating','Last Performance Rating')}
                </div>
              </div>

              {/* Section 2 – Current Position */}
              <div className="form-section">
                <h3 className="form-section-title">2. Current Position Details</h3>
                <div className="form-fields">
                  {field(values,'currentJobTitle','Current Job Title')}
                  {field(values,'currentDepartment','Current Department')}
                </div>
              </div>

              {/* Section 3 – Proposed Promotion Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Proposed Promotion Details</h3>
                <div className="form-fields">
                  {field(values,'proposedJobTitle','Proposed Job Title')}
                  {field(values,'proposedDepartment','Proposed Department')}
                  {field(values,'proposedEffectiveDate','Proposed Effective Date','date')}
                  {field(values,'proposedRevisedSalary','Proposed Revised Salary')}
                </div>
              </div>

              {/* Section 4 – Justification & Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">4. Justification & Assessment</h3>
                <div className="form-fields">
                  {textarea(values,'keyAchievements','Key Achievements')}
                  {textarea(values,'leadershipSkillAssessment','Leadership Skill Assessment')}
                </div>
              </div>

              {/* Section 5 – HR Review */}
              <div className="form-section">
                <h3 className="form-section-title">5. HR Review</h3>
                <div className="form-fields">
                  {field(values,'reportingManagerName','Reporting Manager Name')}
                  {textarea(values,'hrReviewRemarks','HR Review Remarks')}
                </div>
              </div>

              {/* Enterprise Components */}
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

export default FRM00649_PromotionRecommendation;
