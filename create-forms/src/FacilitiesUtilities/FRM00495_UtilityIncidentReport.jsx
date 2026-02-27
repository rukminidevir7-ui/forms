// FRM00495_UtilityIncidentReport.jsx
// FRM-00495 / 00496 / 00497 – Utility Incident Report – Unified Form

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

  siteName: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  incidentDate: Yup.string().required('Required'),
  incidentTime: Yup.string().required('Required'),
  incidentRefNo: Yup.string().required('Required'),

  utilityType: Yup.string().required('Required'),
  affectedArea: Yup.string().required('Required'),
  incidentDescription: Yup.string().required('Required'),
  immediateActions: Yup.string().required('Required'),

  serviceDisruptionDuration: Yup.string().required('Required'),
  rootCause: Yup.string().required('Required'),
  correctiveActions: Yup.string().required('Required'),

  preparedBy: Yup.string().required('Required'),

  signatures: Yup.array(),
  attachments: Yup.array(),
  customFields: Yup.array()

});

const initialValues = {

  formId: 'FRM-00495 / 00496 / 00497',
  department: 'Facilities & Utilities',
  process: 'Utilities',

  siteName: '',
  location: '',
  incidentDate: '',
  incidentTime: '',
  incidentRefNo: '',

  utilityType: '',
  affectedArea: '',
  incidentDescription: '',
  immediateActions: '',
  reportedBy: '',

  serviceDisruptionDuration: '',
  safetyImpact: '',
  operationalImpact: '',
  environmentalImpact: '',
  rootCause: '',
  correctiveActions: '',
  preventiveActions: '',

  preparedBy: '',
  designation: '',
  preparedDate: '',

  signatures: [],
  attachments: [],
  customFields: []

};

const FRM00495_UtilityIncidentReport = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type = 'text', required = false) => (
    <div className="form-field">
      <label className={`form-label ${required ? 'required' : ''}`}>
        {label}
      </label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '_________'}</div>
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
      <label className="form-label">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '_________'}</div>
      ) : (
        <Field as="textarea" name={name} className="form-textarea" rows="3" />
      )}
    </div>
  );

  return (

    <ModernFormWrapper
      formId="FRM-00495"
      title="Utility Incident Report – Unified Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Utility Incident Report submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00495"
              title="UTILITY INCIDENT – REQUEST & APPROVAL"
              department="Facilities & Utilities – Utilities"
            >

              {/* HEADER DETAILS */}
              <div className="form-section">
                <div className="form-fields">
                  {field(values,'formId','Form Nos')}
                  {field(values,'department','Department')}
                  {field(values,'process','Process')}
                  {field(values,'siteName','Site / Facility Name','text',true)}
                  {field(values,'location','Location','text',true)}
                  {field(values,'incidentDate','Incident Date','date',true)}
                  {field(values,'incidentTime','Incident Time','time',true)}
                  {field(values,'incidentRefNo','Incident Reference No','text',true)}
                </div>
              </div>

              {/* INCIDENT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Incident Details</h3>
                <div className="form-fields">
                  {field(values,'utilityType','Utility Type (Power/Water/Air/etc.)','text',true)}
                  {field(values,'affectedArea','Area / Equipment Affected','text',true)}
                  {textarea(values,'incidentDescription','Description of Incident')}
                  {textarea(values,'immediateActions','Immediate Actions Taken')}
                  {field(values,'reportedBy','Reported By')}
                </div>
              </div>

              {/* IMPACT ASSESSMENT */}
              <div className="form-section">
                <h3 className="form-section-title">Impact Assessment</h3>
                <div className="form-fields">
                  {field(values,'serviceDisruptionDuration','Service Disruption Duration','text',true)}
                  {textarea(values,'safetyImpact','Safety Impact')}
                  {textarea(values,'operationalImpact','Operational Impact')}
                  {textarea(values,'environmentalImpact','Environmental Impact')}
                  {textarea(values,'rootCause','Root Cause Analysis')}
                  {textarea(values,'correctiveActions','Corrective Actions')}
                  {textarea(values,'preventiveActions','Preventive Actions')}
                </div>
              </div>

              {/* ATTACHMENTS */}
              <div className="form-section">
                <h3 className="form-section-title">Attachments</h3>
                {isPrintMode
                  ? <div className="print-value">
                      {values.attachments?.length > 0 ? 'Documents Attached' : '________________'}
                    </div>
                  : <FormAttachments values={values} />}
              </div>

              {/* AUTHORIZATION */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '20px'
                }}>
                  <FormSignatures role="Prepared By" values={values} setFieldValue={setFieldValue} />
                  <FormSignatures role="Reviewed By" values={values} setFieldValue={setFieldValue} />
                  <FormSignatures role="Approved By" values={values} setFieldValue={setFieldValue} />
                </div>

              </div>

              {/* CUSTOM FIELDS */}
              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Incident Report
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

export default FRM00495_UtilityIncidentReport;
