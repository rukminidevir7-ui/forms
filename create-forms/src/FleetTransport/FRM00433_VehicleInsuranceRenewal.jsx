// FRM00433_VehicleInsuranceRenewal.jsx
// FRM-00433 – Vehicle Insurance Renewal – Request / Initiation Form

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

  // Document Control
  formDate: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),

  // Vehicle Details
  vehicleNumber: Yup.string().required('Required'),
  vehicleType: Yup.string().required('Required'),
  makeModel: Yup.string().required('Required'),
  chassisNumber: Yup.string().required('Required'),
  engineNumber: Yup.string().required('Required'),

  // Insurance Details
  insuranceProvider: Yup.string().required('Required'),
  policyNumber: Yup.string().required('Required'),
  coverageType: Yup.string().required('Required'),
  expiryDate: Yup.string().required('Required'),
  renewalPremiumAmount: Yup.number().typeError('Must be a number').required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  formDate: '',
  preparedBy: '',
  location: '',
  referenceNumber: '',

  vehicleNumber: '',
  vehicleType: '',
  makeModel: '',
  chassisNumber: '',
  engineNumber: '',

  insuranceProvider: '',
  policyNumber: '',
  coverageType: '',
  expiryDate: '',
  renewalPremiumAmount: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00433_VehicleInsuranceRenewal = () => {

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
            {options.map(o => <option key={o} value={o}>{o}</option>)}
          </Field>
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (

    <ModernFormWrapper
      formId="FRM-00433"
      title="Vehicle Insurance Renewal – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Vehicle insurance renewal request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00433"
              title="Vehicle Insurance Renewal"
              department="Fleet & Transport – Compliance & Permits"
            >

              {/* Document Control */}
              <div className="form-section">
                <h3 className="form-section-title">1. Document Control</h3>
                <div className="form-fields">
                  {field(values,'formDate','Date','date')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'location','Location')}
                  {field(values,'referenceNumber','Reference No')}
                </div>
              </div>

              {/* Vehicle Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Vehicle Details</h3>
                <div className="form-fields">
                  {field(values,'vehicleNumber','Vehicle Number')}
                  {field(values,'vehicleType','Vehicle Type')}
                  {field(values,'makeModel','Make / Model')}
                  {field(values,'chassisNumber','Chassis Number')}
                  {field(values,'engineNumber','Engine Number')}
                </div>
              </div>

              {/* Insurance Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Insurance Details</h3>
                <div className="form-fields">
                  {field(values,'insuranceProvider','Insurance Provider')}
                  {field(values,'policyNumber','Policy Number')}
                  {select(values,'coverageType','Coverage Type',[
                    'Comprehensive',
                    'Third Party',
                    'Third Party + Add-ons',
                    'Fleet Insurance'
                  ])}
                  {field(values,'expiryDate','Expiry Date','date')}
                  {field(values,'renewalPremiumAmount','Renewal Premium Amount','number')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Insurance Renewal
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

export default FRM00433_VehicleInsuranceRenewal;
