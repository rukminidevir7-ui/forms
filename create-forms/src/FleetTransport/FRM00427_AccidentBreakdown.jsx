// FRM00427_AccidentBreakdown.jsx
// FRM-00427 – Accident / Breakdown Report – Request / Initiation Form

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

  // 1. Request Details
  requestId: Yup.string().required('Required'),
  requestDate: Yup.string().required('Required'),
  reportedBy: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),

  // 2. Vehicle Information
  vehicleNumber: Yup.string().required('Required'),
  vehicleType: Yup.string().required('Required'),
  makeModel: Yup.string().required('Required'),
  driverName: Yup.string().required('Required'),
  driverContact: Yup.string().required('Required'),
  odometerReading: Yup.number().typeError('Must be a number').required('Required'),

  // 3. Incident Details
  incidentType: Yup.string().required('Required'),
  incidentDate: Yup.string().required('Required'),
  incidentTime: Yup.string().required('Required'),
  incidentLocation: Yup.string().required('Required'),
  incidentDescription: Yup.string().required('Required'),

  // 4. Damage / Impact Details
  damageDescription: Yup.string().required('Required'),
  injuries: Yup.string().required('Required'),
  thirdPartyInvolved: Yup.string().required('Required'),
  estimatedLossCost: Yup.number().typeError('Must be a number').required('Required'),

  // 5. Immediate Action Taken
  actionTaken: Yup.string().required('Required'),
  vehicleTowed: Yup.string().required('Required'),
  policeNotified: Yup.string().required('Required'),
  insuranceNotified: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  requestId: '',
  requestDate: '',
  reportedBy: '',
  department: '',
  contactNumber: '',
  email: '',

  vehicleNumber: '',
  vehicleType: '',
  makeModel: '',
  driverName: '',
  driverContact: '',
  odometerReading: '',

  incidentType: '',
  incidentDate: '',
  incidentTime: '',
  incidentLocation: '',
  incidentDescription: '',

  damageDescription: '',
  injuries: '',
  thirdPartyInvolved: '',
  estimatedLossCost: '',

  actionTaken: '',
  vehicleTowed: '',
  policeNotified: '',
  insuranceNotified: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00427_AccidentBreakdown = () => {

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
      formId="FRM-00427"
      title="Accident / Breakdown Report – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Accident / Breakdown report submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00427"
              title="Accident / Breakdown Report"
              department="Fleet & Transport – Fleet Operations"
            >

              {/* 1. Request Details */}
              <div className="form-section">
                <h3 className="form-section-title">1. Request Details</h3>
                <div className="form-fields">
                  {field(values,'requestId','Request ID')}
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'reportedBy','Reported By')}
                  {field(values,'department','Department')}
                  {field(values,'contactNumber','Contact No')}
                  {field(values,'email','Email','email')}
                </div>
              </div>

              {/* 2. Vehicle Information */}
              <div className="form-section">
                <h3 className="form-section-title">2. Vehicle Information</h3>
                <div className="form-fields">
                  {field(values,'vehicleNumber','Vehicle No')}
                  {field(values,'vehicleType','Vehicle Type')}
                  {field(values,'makeModel','Make / Model')}
                  {field(values,'driverName','Driver Name')}
                  {field(values,'driverContact','Driver Contact')}
                  {field(values,'odometerReading','Odometer Reading','number')}
                </div>
              </div>

              {/* 3. Incident Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Incident Details</h3>
                <div className="form-fields">
                  {select(values,'incidentType','Incident Type',['Accident','Breakdown'])}
                  {field(values,'incidentDate','Incident Date','date')}
                  {field(values,'incidentTime','Incident Time','time')}
                  {field(values,'incidentLocation','Location')}
                  {textarea(values,'incidentDescription','Description of Incident')}
                </div>
              </div>

              {/* 4. Damage / Impact Details */}
              <div className="form-section">
                <h3 className="form-section-title">4. Damage / Impact Details</h3>
                <div className="form-fields">
                  {textarea(values,'damageDescription','Damage Description')}
                  {select(values,'injuries','Injuries',['Yes','No'])}
                  {select(values,'thirdPartyInvolved','Third Party Involved',['Yes','No'])}
                  {field(values,'estimatedLossCost','Estimated Loss / Cost','number')}
                </div>
              </div>

              {/* 5. Immediate Action Taken */}
              <div className="form-section">
                <h3 className="form-section-title">5. Immediate Action Taken</h3>
                <div className="form-fields">
                  {textarea(values,'actionTaken','Action Taken')}
                  {select(values,'vehicleTowed','Vehicle Towed',['Yes','No'])}
                  {select(values,'policeNotified','Police Notified',['Yes','No'])}
                  {select(values,'insuranceNotified','Insurance Notified',['Yes','No'])}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Report
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

export default FRM00427_AccidentBreakdown;
