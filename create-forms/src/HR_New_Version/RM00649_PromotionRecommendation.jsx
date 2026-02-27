// FRM00649_PromotionRecommendation.jsx
// FRM-00649 – Promotion Recommendation – Report/Record

import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import SignatureComponent from '../components/SignatureComponent';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({
  employeeFullName: Yup.string().required('Employee Full Name is required'),
  employeeID: Yup.string().required('Employee ID is required'),
  currentJobTitle: Yup.string().required('Current Job Title is required'),
  currentDepartment: Yup.string().required('Current Department is required'),
  proposedJobTitle: Yup.string().required('Proposed Job Title is required'),
  proposedDepartment: Yup.string().required('Proposed Department is required'),
  dateOfJoining: Yup.string().required('Date of Joining is required')
});

const initialValues = {
  employeeFullName: '',
  employeeID: '',
  currentJobTitle: '',
  currentDepartment: '',
  proposedJobTitle: '',
  proposedDepartment: '',
  dateOfJoining: '',
  yearsInCurrentRole: '',
  lastPerformanceRating: '',
  keyAchievements: '',
  leadershipSkillAssessment: '',
  proposedEffectiveDate: '',
  proposedRevisedSalary: '',
  reportingManagerName: '',
  hrReviewRemarks: '',
  customFields: [],
  signatures: { recordKeeper: { type: '', data: '', name: '' } }
};

const FRM00649_PromotionRecommendation = () => {
  const { isPrintMode } = usePrintMode();

  return (
    <ModernFormWrapper formId="FRM-00649" title="Promotion Recommendation – Report/Record">
      <Formik initialValues={initialValues} validationSchema={validationSchema}
        onSubmit={(values) => { console.log(values); alert('FRM-00649 Saved Successfully'); }}>
        {({ values, setFieldValue }) => (
          <Form>
            <ModernA4Template
              formId="FRM-00649"
              title="Promotion Recommendation – Report/Record"
              department="HR & People Ops"
            >

              <div className="form-section">
                <h3 className="form-section-title">Employee Information</h3>
                <Field name="employeeFullName" className="form-input" placeholder="Employee Full Name" />
                <Field name="employeeID" className="form-input" placeholder="Employee ID" />
                <Field name="dateOfJoining" type="date" className="form-input" />
              </div>

              <div className="form-section">
                <h3 className="form-section-title">Current Position</h3>
                <Field name="currentJobTitle" className="form-input" placeholder="Current Job Title" />
                <Field name="currentDepartment" className="form-input" placeholder="Current Department" />
              </div>

              <div className="form-section">
                <h3 className="form-section-title">Promotion Details</h3>
                <Field name="proposedJobTitle" className="form-input" placeholder="Proposed Job Title" />
                <Field name="proposedDepartment" className="form-input" placeholder="Proposed Department" />
                <Field name="proposedEffectiveDate" type="date" className="form-input" />
                <Field name="proposedRevisedSalary" className="form-input" placeholder="Revised Salary" />
              </div>

              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>
                <SignatureComponent
                  name="Record Keeper"
                  onChange={(sig) => setFieldValue('signatures.recordKeeper', sig)}
                  value={values.signatures.recordKeeper}
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-submit">Save Form</button>
              </div>

            </ModernA4Template>
          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00649_PromotionRecommendation;
