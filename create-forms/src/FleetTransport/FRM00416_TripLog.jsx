// FRM00416_TripLog.jsx
// FRM-00416 – Trip Log – Log / Register Form

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

  // 1. Entry Details
  entryId: Yup.string().required('Required'),
  entryDate: Yup.string().required('Required'),
  recordedBy: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),

  // 2. Vehicle Information
  vehicleNumber: Yup.string().required('Required'),
  vehicleType: Yup.string().required('Required'),
  driverName: Yup.string().required('Required'),
  driverContact: Yup.string().required('Required'),
  odometerStart: Yup.number().typeError('Must be a number').required('Required'),
  odometerEnd: Yup.number().typeError('Must be a number').required('Required'),

  // 3. Trip Details
  tripDate: Yup.string().required('Required'),
  pickupLocation: Yup.string().required('Required'),
  destination: Yup.string().required('Required'),
  tripPurpose: Yup.string().required('Required'),
  distanceCovered: Yup.number().typeError('Must be a number').required('Required'),
  tripDuration: Yup.string().required('Required'),

  // 4. Fuel & Expenses
  fuelIssued: Yup.number().typeError('Must be a number').required('Required'),
  fuelCost: Yup.number().typeError('Must be a number').required('Required'),
  tollCharges: Yup.number().typeError('Must be a number').required('Required'),
  otherExpenses: Yup.number().typeError('Must be a number').required('Required'),
  totalCost: Yup.number().typeError('Must be a number').required('Required'),

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

  entryId: '',
  entryDate: '',
  recordedBy: '',
  department: '',
  contactNumber: '',

  vehicleNumber: '',
  vehicleType: '',
  driverName: '',
  driverContact: '',
  odometerStart: '',
  odometerEnd: '',

  tripDate: '',
  pickupLocation: '',
  destination: '',
  tripPurpose: '',
  distanceCovered: '',
  tripDuration: '',

  fuelIssued: '',
  fuelCost: '',
  tollCharges: '',
  otherExpenses: '',
  totalCost: '',

  remarks: '',

  preparedBy: '',
  reviewedBy: '',
  approvedBy: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00416_TripLog = () => {

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

  return (

    <ModernFormWrapper
      formId="FRM-00416"
      title="Trip Log – Log / Register"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Trip log entry submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00416"
              title="Trip Log"
              department="Fleet & Transport – Fleet Operations"
            >

              {/* 1. Entry Details */}
              <div className="form-section">
                <h3 className="form-section-title">1. Entry Details</h3>
                <div className="form-fields">
                  {field(values,'entryId','Entry ID')}
                  {field(values,'entryDate','Entry Date','date')}
                  {field(values,'recordedBy','Recorded By')}
                  {field(values,'department','Department')}
                  {field(values,'contactNumber','Contact No')}
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

              {/* 3. Trip Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Trip Details</h3>
                <div className="form-fields">
                  {field(values,'tripDate','Trip Date','date')}
                  {field(values,'pickupLocation','Pickup Location')}
                  {field(values,'destination','Destination')}
                  {textarea(values,'tripPurpose','Purpose of Trip')}
                  {field(values,'distanceCovered','Distance Covered','number')}
                  {field(values,'tripDuration','Trip Duration')}
                </div>
              </div>

              {/* 4. Fuel & Expenses */}
              <div className="form-section">
                <h3 className="form-section-title">4. Fuel & Expenses</h3>
                <div className="form-fields">
                  {field(values,'fuelIssued','Fuel Issued (Liters)','number')}
                  {field(values,'fuelCost','Fuel Cost','number')}
                  {field(values,'tollCharges','Toll Charges','number')}
                  {field(values,'otherExpenses','Other Expenses','number')}
                  {field(values,'totalCost','Total Cost','number')}
                </div>
              </div>

              {/* 5. Remarks */}
              <div className="form-section">
                <h3 className="form-section-title">5. Remarks</h3>
                <div className="form-fields">
                  {textarea(values,'remarks','Remarks / Notes')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedBy','Prepared By (Name/Signature/Date)')}
                  {field(values,'reviewedBy','Reviewed By (Name/Signature/Date)')}
                  {field(values,'approvedBy','Approved By (Name/Signature/Date)')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Trip Log
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

export default FRM00416_TripLog;
