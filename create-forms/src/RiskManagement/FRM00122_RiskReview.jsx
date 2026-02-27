// FRM00122_RiskReview.jsx
// FRM-00122 – Risk Review – Request / Authorization Form

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
  reviewDate: Yup.string().required('Required'),
  departmentFunction: Yup.string().required('Required'),
  reviewInitiatedBy: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  reviewType: Yup.string().required('Required'),
  reviewPeriod: Yup.string().required('Required'),

  // Risk Details
  riskId: Yup.string().required('Required'),
  riskTitle: Yup.string().required('Required'),
  riskOwner: Yup.string().required('Required'),
  currentRiskRating: Yup.string().required('Required'),
  lastReviewDate: Yup.string().required('Required'),
  nextReviewDate: Yup.string().required('Required'),

  // Review Findings
  reviewFindingsSummary: Yup.string().required('Required'),
  changesInRiskLevel: Yup.string().required('Required'),
  issuesConcernsIdentified: Yup.string().required('Required'),

  // Recommendations
  recommendedActions: Yup.string().required('Required'),
  actionOwner: Yup.string().required('Required'),
  targetCompletionDate: Yup.string().required('Required'),

  // Authorization
  reviewedByAuthorization: Yup.string().required('Required'),
  riskOwnerConfirmation: Yup.string().required('Required'),
  managementApproval: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  reviewDate: '',
  departmentFunction: '',
  reviewInitiatedBy: '',
  employeeId: '',
  contactNumber: '',
  reviewType: '',
  reviewPeriod: '',

  riskId: '',
  riskTitle: '',
  riskOwner: '',
  currentRiskRating: '',
  lastReviewDate: '',
  nextReviewDate: '',

  reviewFindingsSummary: '',
  changesInRiskLevel: '',
  issuesConcernsIdentified: '',

  recommendedActions: '',
  actionOwner: '',
  targetCompletionDate: '',

  reviewedByAuthorization: '',
  riskOwnerConfirmation: '',
  managementApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00122_RiskReview = () => {

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
      formId="FRM-00122"
      title="Risk Review – Request / Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Risk review submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00122"
              title="Risk Review – Enterprise Risk"
              department="Risk Management – Enterprise Risk"
            >

              {/* Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'reviewDate','Date','date')}
                  {field(values,'departmentFunction','Department / Function')}
                  {field(values,'reviewInitiatedBy','Review Initiated By')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'contactNumber','Contact')}
                  {select(values,'reviewType','Review Type',['Periodic Review','Ad-Hoc Review','Post-Incident Review','Annual Review'])}
                  {field(values,'reviewPeriod','Review Period')}
                </div>
              </div>

              {/* Risk Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Risk Details</h3>
                <div className="form-fields">
                  {field(values,'riskId','Risk ID')}
                  {field(values,'riskTitle','Risk Title')}
                  {field(values,'riskOwner','Risk Owner')}
                  {field(values,'currentRiskRating','Current Risk Rating')}
                  {field(values,'lastReviewDate','Last Review Date','date')}
                  {field(values,'nextReviewDate','Next Review Date','date')}
                </div>
              </div>

              {/* Review Findings */}
              <div className="form-section">
                <h3 className="form-section-title">3. Review Findings</h3>
                <div className="form-fields">
                  {textarea(values,'reviewFindingsSummary','Summary of Review Findings')}
                  {textarea(values,'changesInRiskLevel','Changes in Risk Level')}
                  {textarea(values,'issuesConcernsIdentified','Issues / Concerns Identified')}
                </div>
              </div>

              {/* Recommendations */}
              <div className="form-section">
                <h3 className="form-section-title">4. Recommendations</h3>
                <div className="form-fields">
                  {textarea(values,'recommendedActions','Recommended Actions')}
                  {field(values,'actionOwner','Action Owner')}
                  {field(values,'targetCompletionDate','Target Completion Date','date')}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'reviewedByAuthorization','Reviewed By')}
                  {field(values,'riskOwnerConfirmation','Risk Owner Confirmation')}
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
                    Submit Risk Review
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

export default FRM00122_RiskReview;
