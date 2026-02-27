// FRM00420_FuelConsumptionReview.jsx
// FRM-00420 – Fuel Consumption Review – Request / Initiation Form

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
  requestedBy: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),

  // 2. Vehicle Information
  vehicleNumber: Yup.string().required('Required'),
  vehicleType: Yup.string().required('Required'),
  driverName: Yup.string().required('Required'),
  driverContact: Yup.string().required('Required'),
  odometerStart: Yup.number().typeError('Must be a number').required('Required'),
  odometerEnd: Yup.number().typeError('Must be a number').required('Required'),

  // 3. Fuel Usage Details
  fuelType: Yup.string().required('Required'),
  totalFuelIssued: Yup.number().typeError('Must be a number').required('Required'),
  distanceCovered: Yup.number().typeError('Must be a number').required('Required'),
  fuelEfficiency: Yup.number().typeError('Must be a number').required('Required'),
  reviewPeriodFrom: Yup.string().required('Required'),
  reviewPeriodTo: Yup.string().required('Required'),

  // 4. Analysis
  expectedConsumption: Yup.number().typeError('Must be a number').required('Required'),
  actualConsumption: Yup.number().typeError('Must be a number').required('Required'),
  variance: Yup.number().typeError('Must be a number').required('Required'),
  varianceReason: Yup.string().required('Required'),

  // 5. Remarks
  remarks: Yup.string().required('Required'),

  // 6. Authorization
  preparedBy: Yup.string().required('Required'),
  reviewedBy: Yup.string().required('Required'),
  approvedBy: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  requestId: '',
  requestDate: '',
  requestedBy: '',
  department: '',
  contactNumber: '',
  email: '',

  vehicleNumber: '',
  vehicleType: '',
  driverName: '',
  driverContact: '',
  odometerStart: '',
  odometerEnd: '',

  fuelType: '',
  totalFuelIssued: '',
  distanceCovered: '',
  fuelEfficiency: '',
  reviewPeriodFrom: '',
  reviewPeriodTo: '',

  expectedConsumption: '',
  actualConsumption: '',
  variance: '',
  varianceReason: '',

  remarks: '',

  preparedBy: '',
  reviewedBy: '',
  approvedBy: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00420_FuelConsumptionReview = () => {

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
      formId="FRM-00420"
      title="Fuel Consumption Review – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Fuel consumption review submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00420"
              title="Fuel Consumption Review"
              department="Fleet & Transport – Fleet Operations"
            >

              {/* 1. Request Details */}
              <div className="form-section">
                <h3 className="form-section-title">1. Request Details</h3>
                <div className="form-fields">
                  {field(values,'requestId','Request ID')}
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'requestedBy','Requested By')}
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
                  {field(values,'driverName','Driver Name')}
                  {field(values,'driverContact','Driver Contact')}
                  {field(values,'odometerStart','Odometer Start','number')}
                  {field(values,'odometerEnd','Odometer End','number')}
                </div>
              </div>

              {/* 3. Fuel Usage Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Fuel Usage Details</h3>
                <div className="form-fields">
                  {select(values,'fuelType','Fuel Type',['Petrol','Diesel','CNG','Electric','Other'])}
                  {field(values,'totalFuelIssued','Total Fuel Issued','number')}
                  {field(values,'distanceCovered','Distance Covered','number')}
                  {field(values,'fuelEfficiency','Fuel Efficiency (km/unit)','number')}
                  {field(values,'reviewPeriodFrom','Review Period From','date')}
                  {field(values,'reviewPeriodTo','Review Period To','date')}
                </div>
              </div>

              {/* 4. Analysis */}
              <div className="form-section">
                <h3 className="form-section-title">4. Analysis</h3>
                <div className="form-fields">
                  {field(values,'expectedConsumption','Expected Consumption','number')}
                  {field(values,'actualConsumption','Actual Consumption','number')}
                  {field(values,'variance','Variance','number')}
                  {textarea(values,'varianceReason','Reason for Variance')}
                </div>
              </div>

              {/* 5. Remarks */}
              <div className="form-section">
                <h3 className="form-section-title">5. Remarks</h3>
                <div className="form-fields">
                  {textarea(values,'remarks','Remarks / Notes')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Review
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

export default FRM00420_FuelConsumptionReview;
