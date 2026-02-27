// FRM00415_TripRequest.jsx
// FRM-00415 – Trip Request – Request / Initiation Form

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

  // 2. Trip Details
  tripPurpose: Yup.string().required('Required'),
  pickupLocation: Yup.string().required('Required'),
  destination: Yup.string().required('Required'),
  tripDate: Yup.string().required('Required'),
  tripTime: Yup.string().required('Required'),
  estimatedDuration: Yup.string().required('Required'),

  // 3. Passenger / Load Details
  numberOfPassengers: Yup.number().typeError('Must be a number').required('Required'),
  passengerNames: Yup.string().required('Required'),
  loadDetails: Yup.string().required('Required'),
  specialInstructions: Yup.string().required('Required'),

  // 4. Vehicle Requirements
  vehicleTypeRequired: Yup.string().required('Required'),
  driverRequired: Yup.string().required('Required'),
  preferredVehicleNumber: Yup.string().required('Required'),
  fuelArrangement: Yup.string().required('Required'),
  costCenter: Yup.string().required('Required'),

  // 5. Attachments
  supportingDocumentsAttached: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),

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

  tripPurpose: '',
  pickupLocation: '',
  destination: '',
  tripDate: '',
  tripTime: '',
  estimatedDuration: '',

  numberOfPassengers: '',
  passengerNames: '',
  loadDetails: '',
  specialInstructions: '',

  vehicleTypeRequired: '',
  driverRequired: '',
  preferredVehicleNumber: '',
  fuelArrangement: '',
  costCenter: '',

  supportingDocumentsAttached: '',
  referenceNumber: '',

  preparedBy: '',
  reviewedBy: '',
  approvedBy: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00415_TripRequest = () => {

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
      formId="FRM-00415"
      title="Trip Request – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Trip request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00415"
              title="Trip Request"
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

              {/* 2. Trip Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Trip Details</h3>
                <div className="form-fields">
                  {textarea(values,'tripPurpose','Purpose of Trip')}
                  {field(values,'pickupLocation','Pickup Location')}
                  {field(values,'destination','Destination')}
                  {field(values,'tripDate','Trip Date','date')}
                  {field(values,'tripTime','Trip Time','time')}
                  {field(values,'estimatedDuration','Estimated Duration')}
                </div>
              </div>

              {/* 3. Passenger / Load Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Passenger / Load Details</h3>
                <div className="form-fields">
                  {field(values,'numberOfPassengers','Number of Passengers','number')}
                  {textarea(values,'passengerNames','Passenger Names')}
                  {textarea(values,'loadDetails','Material / Load Details')}
                  {textarea(values,'specialInstructions','Special Instructions')}
                </div>
              </div>

              {/* 4. Vehicle Requirements */}
              <div className="form-section">
                <h3 className="form-section-title">4. Vehicle Requirements</h3>
                <div className="form-fields">
                  {select(values,'vehicleTypeRequired','Vehicle Type Required',['Car','SUV','Van','Truck','Bus','Other'])}
                  {select(values,'driverRequired','Driver Required',['Yes','No'])}
                  {field(values,'preferredVehicleNumber','Preferred Vehicle No')}
                  {select(values,'fuelArrangement','Fuel Arrangement',['Company Provided','Self Arranged','Fuel Card','Other'])}
                  {field(values,'costCenter','Cost Center')}
                </div>
              </div>

              {/* 5. Attachments */}
              <div className="form-section">
                <h3 className="form-section-title">5. Attachments</h3>
                <div className="form-fields">
                  {select(values,'supportingDocumentsAttached','Supporting Documents Attached',['Yes','No'])}
                  {field(values,'referenceNumber','Reference No')}
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
                    Submit Trip Request
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

export default FRM00415_TripRequest;
