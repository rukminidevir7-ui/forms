// FRM00444_DriverTrainingRecord.jsx
// FRM-00444 – Driver Training Record – Request / Initiation Form

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

  // Driver Details
  employeeName: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  department: Yup.string().required('Required'),

  // Training Details
  trainingTitle: Yup.string().required('Required'),
  trainingType: Yup.string().required('Required'),
  trainerName: Yup.string().required('Required'),
  trainingDate: Yup.string().required('Required'),
  trainingDuration: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  trainingObjectives: Yup.string().required('Required'),

  // Outcome
  trainingOutcome: Yup.string().required('Required'),

  // Authorization
  preparedBy: Yup.string().required('Required'),
  reviewedBy: Yup.string().required('Required'),
  approvedBy: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  employeeName: '',
  employeeId: '',
  department: '',

  trainingTitle: '',
  trainingType: '',
  trainerName: '',
  trainingDate: '',
  trainingDuration: '',
  location: '',
  trainingObjectives: '',

  trainingOutcome: '',

  preparedBy: '',
  reviewedBy: '',
  approvedBy: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00444_DriverTrainingRecord = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type = 'text') => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
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
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '_________'}</div>
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
        <div className="print-value">{values[name] || '_________'}</div>
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
      formId="FRM-00444"
      title="Driver Training Record – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Driver training record submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00444"
              title="Driver Training Record"
              department="Fleet & Transport – Compliance & Permits"
            >

              {/* Driver Details */}
              <div className="form-section">
                <h3 className="form-section-title">1. Employee / Driver Details</h3>
                <div className="form-fields">
                  {field(values,'employeeName','Employee / Driver Name')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'department','Department')}
                </div>
              </div>

              {/* Training Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Training Details</h3>
                <div className="form-fields">
                  {field(values,'trainingTitle','Training Title')}
                  {select(values,'trainingType','Training Type',[
                    'Induction',
                    'Refresher',
                    'Safety',
                    'Defensive Driving',
                    'Regulatory Compliance',
                    'Technical'
                  ])}
                  {field(values,'trainerName','Trainer / Instructor')}
                  {field(values,'trainingDate','Training Date','date')}
                  {field(values,'trainingDuration','Training Duration')}
                  {field(values,'location','Location')}
                  {textarea(values,'trainingObjectives','Training Objectives')}
                </div>
              </div>

              {/* Outcome */}
              <div className="form-section">
                <h3 className="form-section-title">3. Training Outcome / Assessment</h3>
                <div className="form-fields">
                  {textarea(values,'trainingOutcome','Training Outcome / Assessment')}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">4. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'reviewedBy','Reviewed By')}
                  {field(values,'approvedBy','Approved By')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Training Record
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

export default FRM00444_DriverTrainingRecord;
