// FRM00658_GrievanceIntake.jsx
// FRM-00658 – Grievance Intake – Request / Initiation Form

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

  // Employee Information
  employeeFullName: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  departmentName: Yup.string().required('Required'),
  jobTitle: Yup.string().required('Required'),
  reportingManagerName: Yup.string().required('Required'),

  // Grievance Details
  grievanceType: Yup.string().required('Required'),
  incidentDate: Yup.string().required('Required'),
  incidentLocation: Yup.string().required('Required'),
  personInvolved: Yup.string().required('Required'),
  grievanceDescription: Yup.string().required('Required'),

  // Additional Details
  previousComplaintRaised: Yup.string().required('Required'),
  supportingEvidenceAttached: Yup.string().required('Required'),
  desiredResolution: Yup.string().required('Required'),
  confidentialityRequest: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  employeeFullName: '',
  employeeId: '',
  departmentName: '',
  jobTitle: '',
  reportingManagerName: '',

  grievanceType: '',
  incidentDate: '',
  incidentLocation: '',
  personInvolved: '',
  grievanceDescription: '',

  previousComplaintRaised: '',
  supportingEvidenceAttached: '',
  desiredResolution: '',
  confidentialityRequest: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00658_GrievanceIntake = () => {

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
      formId="FRM-00658"
      title="Grievance Intake – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Grievance submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00658"
              title="Grievance Intake – Request / Initiation"
              department="HR & People Ops"
            >

              {/* Employee Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Employee Information</h3>
                <div className="form-fields">
                  {field(values,'employeeFullName','Employee Full Name')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'departmentName','Department')}
                  {field(values,'jobTitle','Job Title')}
                  {field(values,'reportingManagerName','Reporting Manager Name')}
                </div>
              </div>

              {/* Grievance Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Grievance Details</h3>
                <div className="form-fields">
                  {select(values,'grievanceType','Type of Grievance',[
                    'Workplace Harassment',
                    'Discrimination',
                    'Compensation Issue',
                    'Policy Violation',
                    'Managerial Concern',
                    'Peer Conflict',
                    'Other'
                  ])}
                  {field(values,'incidentDate','Date of Incident','date')}
                  {field(values,'incidentLocation','Location of Incident')}
                  {field(values,'personInvolved','Person(s) Involved')}
                  {textarea(values,'grievanceDescription','Detailed Description of Grievance')}
                </div>
              </div>

              {/* Additional Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Additional Details</h3>
                <div className="form-fields">
                  {select(values,'previousComplaintRaised','Previous Complaint Raised',['Yes','No'])}
                  {select(values,'supportingEvidenceAttached','Supporting Evidence Attached',['Yes','No'])}
                  {textarea(values,'desiredResolution','Desired Resolution')}
                  {select(values,'confidentialityRequest','Confidentiality Request',['Yes','No'])}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Grievance
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

export default FRM00658_GrievanceIntake;
