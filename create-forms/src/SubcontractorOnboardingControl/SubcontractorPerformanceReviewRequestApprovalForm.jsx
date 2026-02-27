// SubcontractorPerformanceReviewRequestApprovalForm.jsx
// FRM-01123 / FRM-01124 – Subcontractor Performance Review Form

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

const ratingOptions = ['Excellent','Good','Average','Poor'];

const validationSchema = Yup.object({

  // Subcontractor Info
  companyName: Yup.string().required('Required'),
  projectName: Yup.string().required('Required'),
  projectLocation: Yup.string().required('Required'),
  reviewPeriod: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),

  // Performance
  qualityOfWork: Yup.string().required('Required'),
  scheduleAdherence: Yup.string().required('Required'),
  safetyPerformance: Yup.string().required('Required'),
  resourceManagement: Yup.string().required('Required'),
  communicationCoordination: Yup.string().required('Required'),
  complianceWithContract: Yup.string().required('Required'),

  // Overall
  overallRating: Yup.string().required('Required'),
  keyStrengths: Yup.string().required('Required'),
  areasForImprovement: Yup.string().required('Required'),
  correctiveActionsRequired: Yup.string().required('Required'),

  // Reviewer
  reviewerName: Yup.string().required('Required'),
  reviewerDesignation: Yup.string().required('Required'),
  reviewDate: Yup.string().required('Required'),

  // Approval
  approverName: Yup.string().required('Required'),
  approverDesignation: Yup.string().required('Required'),
  approvalDecision: Yup.string().required('Required'),
  approvalRemarks: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  companyName: '',
  projectName: '',
  projectLocation: '',
  reviewPeriod: '',
  contactPerson: '',

  qualityOfWork: '',
  scheduleAdherence: '',
  safetyPerformance: '',
  resourceManagement: '',
  communicationCoordination: '',
  complianceWithContract: '',

  overallRating: '',
  keyStrengths: '',
  areasForImprovement: '',
  correctiveActionsRequired: '',

  reviewerName: '',
  reviewerDesignation: '',
  reviewDate: '',

  approverName: '',
  approverDesignation: '',
  approvalDecision: '',
  approvalRemarks: '',
  approvalDate: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const SubcontractorPerformanceReviewRequestApprovalForm = () => {

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

  const select = (values, name, label, options) => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '___________________'}</div>
      ) : (
        <>
          <Field as="select" name={name} className="form-input">
            <option value="">-- Select --</option>
            {options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </Field>
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
      formId="FRM-01123 / FRM-01124"
      title="Subcontractor Performance Review Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Performance review submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-01123 / FRM-01124"
              title="Subcontractor Performance Review"
              department="Subcontractor & Contracting"
            >

              {/* Subcontractor Info */}
              <div className="form-section">
                <h3 className="form-section-title">Subcontractor Information</h3>
                <div className="form-fields">
                  {field(values,'companyName','Company Name')}
                  {field(values,'projectName','Project Name')}
                  {field(values,'projectLocation','Project Location')}
                  {field(values,'reviewPeriod','Review Period')}
                  {field(values,'contactPerson','Contact Person')}
                </div>
              </div>

              {/* Performance Evaluation */}
              <div className="form-section">
                <h3 className="form-section-title">Performance Evaluation</h3>
                <div className="form-fields">
                  {select(values,'qualityOfWork','Quality of Work',ratingOptions)}
                  {select(values,'scheduleAdherence','Schedule Adherence',ratingOptions)}
                  {select(values,'safetyPerformance','Safety Performance',ratingOptions)}
                  {select(values,'resourceManagement','Resource Management',ratingOptions)}
                  {select(values,'communicationCoordination','Communication & Coordination',ratingOptions)}
                  {select(values,'complianceWithContract','Compliance with Contract',ratingOptions)}
                </div>
              </div>

              {/* Overall Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">Overall Assessment</h3>
                <div className="form-fields">
                  {select(values,'overallRating','Overall Rating',ratingOptions)}
                  {textarea(values,'keyStrengths','Key Strengths')}
                  {textarea(values,'areasForImprovement','Areas for Improvement')}
                  {textarea(values,'correctiveActionsRequired','Corrective Actions Required')}
                </div>
              </div>

              {/* Reviewer Declaration */}
              <div className="form-section">
                <h3 className="form-section-title">Reviewer Declaration</h3>
                <div className="form-fields">
                  {field(values,'reviewerName','Reviewed By (Name)')}
                  {field(values,'reviewerDesignation','Designation')}
                  {field(values,'reviewDate','Date','date')}
                </div>
              </div>

              {/* Approval */}
              <div className="form-section">
                <h3 className="form-section-title">Approval / Authorization</h3>
                <div className="form-fields">
                  {field(values,'approverName','Approver Name')}
                  {field(values,'approverDesignation','Designation')}
                  {select(values,'approvalDecision','Approved / Rejected',['Approved','Rejected'])}
                  {textarea(values,'approvalRemarks','Remarks')}
                  {field(values,'approvalDate','Date','date')}
                </div>
              </div>

              {/* Universal Components */}
              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Performance Review
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

export default SubcontractorPerformanceReviewRequestApprovalForm;
