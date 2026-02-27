// FRM00169_ComplianceIncident.jsx
// FRM-00169 – Compliance Incident – Request / Authorization Form

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
  reportDate: Yup.string().required('Required'),
  departmentFunction: Yup.string().required('Required'),
  reportedBy: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  incidentCategory: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // Incident Details
  incidentTitle: Yup.string().required('Required'),
  incidentDate: Yup.string().required('Required'),
  locationProcess: Yup.string().required('Required'),
  detectedBy: Yup.string().required('Required'),
  incidentDescription: Yup.string().required('Required'),
  immediateActionsTaken: Yup.string().required('Required'),

  // Impact Assessment
  impactType: Yup.string().required('Required'),
  severityLevel: Yup.string().required('Required'),
  regulatoryImplications: Yup.string().required('Required'),

  // Root Cause & Actions
  rootCauseAnalysis: Yup.string().required('Required'),
  correctiveActions: Yup.string().required('Required'),
  preventiveActions: Yup.string().required('Required'),

  // Authorization
  reportedByAuthorization: Yup.string().required('Required'),
  complianceReview: Yup.string().required('Required'),
  managementApproval: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  reportDate: '',
  departmentFunction: '',
  reportedBy: '',
  employeeId: '',
  contactNumber: '',
  incidentCategory: '',
  priorityLevel: '',

  incidentTitle: '',
  incidentDate: '',
  locationProcess: '',
  detectedBy: '',
  incidentDescription: '',
  immediateActionsTaken: '',

  impactType: '',
  severityLevel: '',
  regulatoryImplications: '',

  rootCauseAnalysis: '',
  correctiveActions: '',
  preventiveActions: '',

  reportedByAuthorization: '',
  complianceReview: '',
  managementApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00169_ComplianceIncident = () => {

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
      formId="FRM-00169"
      title="Compliance Incident – Request / Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Compliance incident reported successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00169"
              title="Compliance Incident"
              department="Compliance & Regulatory – Regulatory Filings"
            >

              {/* Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'reportDate','Date','date')}
                  {field(values,'departmentFunction','Department / Function')}
                  {field(values,'reportedBy','Reported By')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'contactNumber','Contact')}
                  {select(values,'incidentCategory','Incident Category',['Regulatory Breach','Control Failure','Data Breach','Late Filing','Policy Violation','Fraud / Misconduct'])}
                  {select(values,'priorityLevel','Priority',['Low','Medium','High','Critical'])}
                </div>
              </div>

              {/* Incident Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Incident Details</h3>
                <div className="form-fields">
                  {field(values,'incidentTitle','Incident Title')}
                  {field(values,'incidentDate','Incident Date','date')}
                  {field(values,'locationProcess','Location / Process')}
                  {field(values,'detectedBy','Detected By')}
                  {textarea(values,'incidentDescription','Incident Description')}
                  {textarea(values,'immediateActionsTaken','Immediate Actions Taken')}
                </div>
              </div>

              {/* Impact Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">3. Impact Assessment</h3>
                <div className="form-fields">
                  {select(values,'impactType','Impact Type',['Financial','Regulatory','Operational','Reputational','Legal'])}
                  {select(values,'severityLevel','Severity Level',['Low','Medium','High','Critical'])}
                  {textarea(values,'regulatoryImplications','Regulatory Implications')}
                </div>
              </div>

              {/* Root Cause & Actions */}
              <div className="form-section">
                <h3 className="form-section-title">4. Root Cause & Actions</h3>
                <div className="form-fields">
                  {textarea(values,'rootCauseAnalysis','Root Cause Analysis')}
                  {textarea(values,'correctiveActions','Corrective Actions')}
                  {textarea(values,'preventiveActions','Preventive Actions')}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'reportedByAuthorization','Reported By')}
                  {field(values,'complianceReview','Compliance Review')}
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
                    Submit Compliance Incident
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

export default FRM00169_ComplianceIncident;
