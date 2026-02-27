// FRM00128_ProjectRisk.jsx
// FRM-00128 – Project Risk – Request / Authorization Form

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
  assessmentDate: Yup.string().required('Required'),
  projectName: Yup.string().required('Required'),
  projectId: Yup.string().required('Required'),
  departmentFunction: Yup.string().required('Required'),
  requestedBy: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  assessmentType: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // Project Details
  projectManager: Yup.string().required('Required'),
  projectStartDate: Yup.string().required('Required'),
  projectEndDate: Yup.string().required('Required'),
  projectPhase: Yup.string().required('Required'),
  keyStakeholders: Yup.string().required('Required'),

  // Risk Identification
  riskTitle: Yup.string().required('Required'),
  riskCategory: Yup.string().required('Required'),
  riskDescription: Yup.string().required('Required'),
  potentialCauses: Yup.string().required('Required'),
  potentialImpact: Yup.string().required('Required'),

  // Risk Assessment
  likelihood: Yup.string().required('Required'),
  impact: Yup.string().required('Required'),
  riskRating: Yup.string().required('Required'),
  existingControls: Yup.string().required('Required'),
  recommendedActions: Yup.string().required('Required'),

  // Ownership & Timeline
  riskOwner: Yup.string().required('Required'),
  targetDate: Yup.string().required('Required'),
  monitoringMethod: Yup.string().required('Required'),
  reviewFrequency: Yup.string().required('Required'),

  // Authorization
  requestedByAuthorization: Yup.string().required('Required'),
  projectManagerApproval: Yup.string().required('Required'),
  riskOwnerApproval: Yup.string().required('Required'),
  managementApproval: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  assessmentDate: '',
  projectName: '',
  projectId: '',
  departmentFunction: '',
  requestedBy: '',
  employeeId: '',
  contactNumber: '',
  assessmentType: '',
  priorityLevel: '',

  projectManager: '',
  projectStartDate: '',
  projectEndDate: '',
  projectPhase: '',
  keyStakeholders: '',

  riskTitle: '',
  riskCategory: '',
  riskDescription: '',
  potentialCauses: '',
  potentialImpact: '',

  likelihood: '',
  impact: '',
  riskRating: '',
  existingControls: '',
  recommendedActions: '',

  riskOwner: '',
  targetDate: '',
  monitoringMethod: '',
  reviewFrequency: '',

  requestedByAuthorization: '',
  projectManagerApproval: '',
  riskOwnerApproval: '',
  managementApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00128_ProjectRisk = () => {

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
      formId="FRM-00128"
      title="Project Risk – Request / Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Project risk assessment submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00128"
              title="Project Risk Assessment"
              department="Risk Management – Enterprise Risk"
            >

              {/* Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'assessmentDate','Date','date')}
                  {field(values,'projectName','Project Name')}
                  {field(values,'projectId','Project ID')}
                  {field(values,'departmentFunction','Department / Function')}
                  {field(values,'requestedBy','Requested By')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'contactNumber','Contact')}
                  {select(values,'assessmentType','Assessment Type',['Initial Risk Assessment','Phase Review','Periodic Review','Change Impact Assessment'])}
                  {select(values,'priorityLevel','Priority',['Low','Medium','High','Critical'])}
                </div>
              </div>

              {/* Project Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Project Details</h3>
                <div className="form-fields">
                  {field(values,'projectManager','Project Manager')}
                  {field(values,'projectStartDate','Project Start Date','date')}
                  {field(values,'projectEndDate','Project End Date','date')}
                  {field(values,'projectPhase','Project Phase')}
                  {textarea(values,'keyStakeholders','Key Stakeholders')}
                </div>
              </div>

              {/* Risk Identification */}
              <div className="form-section">
                <h3 className="form-section-title">3. Risk Identification</h3>
                <div className="form-fields">
                  {field(values,'riskTitle','Risk Title')}
                  {select(values,'riskCategory','Risk Category',['Operational','Financial','Compliance','Strategic','IT / Cyber','Reputational'])}
                  {textarea(values,'riskDescription','Risk Description')}
                  {textarea(values,'potentialCauses','Potential Causes')}
                  {textarea(values,'potentialImpact','Potential Impact')}
                </div>
              </div>

              {/* Risk Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">4. Risk Assessment</h3>
                <div className="form-fields">
                  {select(values,'likelihood','Likelihood',['Low','Medium','High','Very High'])}
                  {select(values,'impact','Impact',['Low','Medium','High','Very High'])}
                  {field(values,'riskRating','Risk Rating')}
                  {textarea(values,'existingControls','Existing Controls')}
                  {textarea(values,'recommendedActions','Recommended Actions')}
                </div>
              </div>

              {/* Ownership & Timeline */}
              <div className="form-section">
                <h3 className="form-section-title">5. Ownership & Timeline</h3>
                <div className="form-fields">
                  {field(values,'riskOwner','Risk Owner')}
                  {field(values,'targetDate','Target Date','date')}
                  {field(values,'monitoringMethod','Monitoring Method')}
                  {select(values,'reviewFrequency','Review Frequency',['Monthly','Quarterly','Bi-Annually','Annually'])}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requestedByAuthorization','Requested By')}
                  {field(values,'projectManagerApproval','Project Manager Approval')}
                  {field(values,'riskOwnerApproval','Risk Owner Approval')}
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
                    Submit Project Risk
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

export default FRM00128_ProjectRisk;
