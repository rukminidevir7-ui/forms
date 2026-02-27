// FRM00131_OperationalRisk.jsx
// FRM-00131 – Operational Risk – Request / Authorization Form

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
  initiationDate: Yup.string().required('Required'),
  departmentUnit: Yup.string().required('Required'),
  initiatedBy: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  riskCategory: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // Risk Description
  riskTitle: Yup.string().required('Required'),
  processActivity: Yup.string().required('Required'),
  riskDescription: Yup.string().required('Required'),
  potentialCauses: Yup.string().required('Required'),
  potentialImpact: Yup.string().required('Required'),

  // Risk Assessment
  likelihood: Yup.string().required('Required'),
  impact: Yup.string().required('Required'),
  riskRating: Yup.string().required('Required'),
  controlEffectiveness: Yup.string().required('Required'),
  existingControls: Yup.string().required('Required'),

  // Mitigation Plan
  mitigationActions: Yup.string().required('Required'),
  actionOwner: Yup.string().required('Required'),
  targetDate: Yup.string().required('Required'),

  // Monitoring
  monitoringMethod: Yup.string().required('Required'),
  reviewFrequency: Yup.string().required('Required'),
  residualRiskRating: Yup.string().required('Required'),

  // Authorization
  initiatedByAuthorization: Yup.string().required('Required'),
  riskOwnerApproval: Yup.string().required('Required'),
  managementApproval: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  initiationDate: '',
  departmentUnit: '',
  initiatedBy: '',
  employeeId: '',
  contactNumber: '',
  riskCategory: '',
  priorityLevel: '',

  riskTitle: '',
  processActivity: '',
  riskDescription: '',
  potentialCauses: '',
  potentialImpact: '',

  likelihood: '',
  impact: '',
  riskRating: '',
  controlEffectiveness: '',
  existingControls: '',

  mitigationActions: '',
  actionOwner: '',
  targetDate: '',

  monitoringMethod: '',
  reviewFrequency: '',
  residualRiskRating: '',

  initiatedByAuthorization: '',
  riskOwnerApproval: '',
  managementApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00131_OperationalRisk = () => {

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
      formId="FRM-00131"
      title="Operational Risk – Request / Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Operational risk submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00131"
              title="Operational Risk Assessment"
              department="Risk Management – Enterprise Risk"
            >

              {/* Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'initiationDate','Date','date')}
                  {field(values,'departmentUnit','Department / Unit')}
                  {field(values,'initiatedBy','Initiated By')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'contactNumber','Contact')}
                  {select(values,'riskCategory','Risk Category',['Process Risk','People Risk','System Risk','Compliance Risk','Fraud Risk','Technology Risk'])}
                  {select(values,'priorityLevel','Priority',['Low','Medium','High','Critical'])}
                </div>
              </div>

              {/* Risk Description */}
              <div className="form-section">
                <h3 className="form-section-title">2. Risk Description</h3>
                <div className="form-fields">
                  {field(values,'riskTitle','Risk Title')}
                  {field(values,'processActivity','Process / Activity')}
                  {textarea(values,'riskDescription','Risk Description')}
                  {textarea(values,'potentialCauses','Potential Causes')}
                  {textarea(values,'potentialImpact','Potential Impact')}
                </div>
              </div>

              {/* Risk Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">3. Risk Assessment</h3>
                <div className="form-fields">
                  {select(values,'likelihood','Likelihood',['Low','Medium','High','Very High'])}
                  {select(values,'impact','Impact',['Low','Medium','High','Very High'])}
                  {field(values,'riskRating','Risk Rating')}
                  {select(values,'controlEffectiveness','Control Effectiveness',['Effective','Partially Effective','Ineffective'])}
                  {textarea(values,'existingControls','Existing Controls')}
                </div>
              </div>

              {/* Mitigation Plan */}
              <div className="form-section">
                <h3 className="form-section-title">4. Mitigation Plan</h3>
                <div className="form-fields">
                  {textarea(values,'mitigationActions','Mitigation Actions')}
                  {field(values,'actionOwner','Action Owner')}
                  {field(values,'targetDate','Target Date','date')}
                </div>
              </div>

              {/* Monitoring */}
              <div className="form-section">
                <h3 className="form-section-title">5. Monitoring</h3>
                <div className="form-fields">
                  {field(values,'monitoringMethod','Monitoring Method')}
                  {select(values,'reviewFrequency','Review Frequency',['Monthly','Quarterly','Bi-Annually','Annually'])}
                  {field(values,'residualRiskRating','Residual Risk Rating')}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'initiatedByAuthorization','Initiated By')}
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
                    Submit Operational Risk
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

export default FRM00131_OperationalRisk;
