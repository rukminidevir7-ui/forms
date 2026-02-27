// FRM00125_ThirdPartyRisk.jsx
// FRM-00125 – Third-Party Risk – Request / Authorization Form

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
  departmentFunction: Yup.string().required('Required'),
  requestedBy: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  assessmentType: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // Third-Party Details
  thirdPartyName: Yup.string().required('Required'),
  serviceProduct: Yup.string().required('Required'),
  businessOwner: Yup.string().required('Required'),
  engagementStartDate: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  criticalityLevel: Yup.string().required('Required'),

  // Risk Assessment
  riskCategory: Yup.string().required('Required'),
  inherentRiskLevel: Yup.string().required('Required'),
  keyRisksIdentified: Yup.string().required('Required'),
  existingControls: Yup.string().required('Required'),

  // Mitigation & Monitoring
  mitigationActions: Yup.string().required('Required'),
  monitoringMethod: Yup.string().required('Required'),
  reviewFrequency: Yup.string().required('Required'),

  // Authorization
  requestedByAuthorization: Yup.string().required('Required'),
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
  departmentFunction: '',
  requestedBy: '',
  employeeId: '',
  contactNumber: '',
  assessmentType: '',
  priorityLevel: '',

  thirdPartyName: '',
  serviceProduct: '',
  businessOwner: '',
  engagementStartDate: '',
  location: '',
  criticalityLevel: '',

  riskCategory: '',
  inherentRiskLevel: '',
  keyRisksIdentified: '',
  existingControls: '',

  mitigationActions: '',
  monitoringMethod: '',
  reviewFrequency: '',

  requestedByAuthorization: '',
  riskOwnerApproval: '',
  managementApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00125_ThirdPartyRisk = () => {

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
      formId="FRM-00125"
      title="Third-Party Risk – Request / Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Third-party risk assessment submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00125"
              title="Third-Party Risk Assessment"
              department="Risk Management – Enterprise Risk"
            >

              {/* Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'assessmentDate','Date','date')}
                  {field(values,'departmentFunction','Department / Function')}
                  {field(values,'requestedBy','Requested By')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'contactNumber','Contact')}
                  {select(values,'assessmentType','Assessment Type',['Initial Assessment','Periodic Review','Re-Assessment','Onboarding Assessment'])}
                  {select(values,'priorityLevel','Priority',['Low','Medium','High','Critical'])}
                </div>
              </div>

              {/* Third-Party Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Third-Party Details</h3>
                <div className="form-fields">
                  {field(values,'thirdPartyName','Third-Party Name')}
                  {field(values,'serviceProduct','Service / Product')}
                  {field(values,'businessOwner','Business Owner')}
                  {field(values,'engagementStartDate','Engagement Start Date','date')}
                  {field(values,'location','Location')}
                  {select(values,'criticalityLevel','Criticality Level',['Low','Medium','High','Critical'])}
                </div>
              </div>

              {/* Risk Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">3. Risk Assessment</h3>
                <div className="form-fields">
                  {select(values,'riskCategory','Risk Category',['Operational','Financial','Compliance','IT / Cyber','Reputational','Strategic'])}
                  {select(values,'inherentRiskLevel','Inherent Risk Level',['Low','Medium','High','Critical'])}
                  {textarea(values,'keyRisksIdentified','Key Risks Identified')}
                  {textarea(values,'existingControls','Existing Controls')}
                </div>
              </div>

              {/* Mitigation & Monitoring */}
              <div className="form-section">
                <h3 className="form-section-title">4. Mitigation & Monitoring</h3>
                <div className="form-fields">
                  {textarea(values,'mitigationActions','Mitigation Actions')}
                  {field(values,'monitoringMethod','Monitoring Method')}
                  {select(values,'reviewFrequency','Review Frequency',['Monthly','Quarterly','Bi-Annually','Annually'])}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requestedByAuthorization','Requested By')}
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
                    Submit Third-Party Risk Assessment
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

export default FRM00125_ThirdPartyRisk;
