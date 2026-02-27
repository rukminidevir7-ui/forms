// FRM00426_VehicleMaintenanceRequest.jsx
// FRM-00426 – Vehicle Maintenance Request – Request / Initiation Form

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
  makeModel: Yup.string().required('Required'),
  odometerReading: Yup.number().typeError('Must be a number').required('Required'),
  lastServiceDate: Yup.string().required('Required'),

  // 3. Maintenance Details
  maintenanceType: Yup.string().required('Required'),
  issueDescription: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),
  preferredServiceDate: Yup.string().required('Required'),

  // 4. Service Provider Details
  serviceProviderName: Yup.string().required('Required'),
  serviceContactPerson: Yup.string().required('Required'),
  serviceContactNumber: Yup.string().required('Required'),
  estimatedCost: Yup.number().typeError('Must be a number').required('Required'),

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
  makeModel: '',
  odometerReading: '',
  lastServiceDate: '',

  maintenanceType: '',
  issueDescription: '',
  priorityLevel: '',
  preferredServiceDate: '',

  serviceProviderName: '',
  serviceContactPerson: '',
  serviceContactNumber: '',
  estimatedCost: '',

  preparedBy: '',
  reviewedBy: '',
  approvedBy: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00426_VehicleMaintenanceRequest = () => {

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
      formId="FRM-00426"
      title="Vehicle Maintenance Request – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Vehicle maintenance request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00426"
              title="Vehicle Maintenance Request"
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
                  {field(values,'makeModel','Make / Model')}
                  {field(values,'odometerReading','Odometer Reading','number')}
                  {field(values,'lastServiceDate','Last Service Date','date')}
                </div>
              </div>

              {/* 3. Maintenance Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Maintenance Details</h3>
                <div className="form-fields">
                  {select(values,'maintenanceType','Maintenance Type',['Routine','Repair','Breakdown'])}
                  {textarea(values,'issueDescription','Issue Description')}
                  {select(values,'priorityLevel','Priority Level',['Low','Medium','High','Critical'])}
                  {field(values,'preferredServiceDate','Preferred Service Date','date')}
                </div>
              </div>

              {/* 4. Service Provider Details */}
              <div className="form-section">
                <h3 className="form-section-title">4. Service Provider Details</h3>
                <div className="form-fields">
                  {field(values,'serviceProviderName','Service Provider Name')}
                  {field(values,'serviceContactPerson','Contact Person')}
                  {field(values,'serviceContactNumber','Contact Number')}
                  {field(values,'estimatedCost','Estimated Cost','number')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedBy','Prepared By (Name/Signature/Date)')}
                  {field(values,'reviewedBy','Reviewed By (Name/Signature/Date)')}
                  {field(values,'approvedBy','Approved By (Name/Signature/Date)')}
                </div>
              </div>

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Maintenance Request
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

export default FRM00426_VehicleMaintenanceRequest;
