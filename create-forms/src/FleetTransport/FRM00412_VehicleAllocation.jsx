// FRM00412_VehicleAllocation.jsx
// FRM-00412 – Vehicle Allocation – Request / Initiation Form

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

  // 2. Requirement Details
  allocationPurpose: Yup.string().required('Required'),
  pickupLocation: Yup.string().required('Required'),
  dropLocation: Yup.string().required('Required'),
  requiredDate: Yup.string().required('Required'),
  requiredTime: Yup.string().required('Required'),
  duration: Yup.string().required('Required'),

  // 3. Vehicle Details
  vehicleTypeRequired: Yup.string().required('Required'),
  specialRequirements: Yup.string().required('Required'),
  driverRequired: Yup.string().required('Required'),
  fuelArrangement: Yup.string().required('Required'),
  costCenter: Yup.string().required('Required'),

  // 4. Allocation Information
  allocatedVehicleNumber: Yup.string().required('Required'),
  driverName: Yup.string().required('Required'),
  driverContact: Yup.string().required('Required'),
  allocationDate: Yup.string().required('Required'),
  allocationRemarks: Yup.string().required('Required'),

  // 5. Attachments
  supportingDocumentsAttached: Yup.string().required('Required'),
  approvalReference: Yup.string().required('Required'),

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

  allocationPurpose: '',
  pickupLocation: '',
  dropLocation: '',
  requiredDate: '',
  requiredTime: '',
  duration: '',

  vehicleTypeRequired: '',
  specialRequirements: '',
  driverRequired: '',
  fuelArrangement: '',
  costCenter: '',

  allocatedVehicleNumber: '',
  driverName: '',
  driverContact: '',
  allocationDate: '',
  allocationRemarks: '',

  supportingDocumentsAttached: '',
  approvalReference: '',

  preparedBy: '',
  reviewedBy: '',
  approvedBy: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00412_VehicleAllocation = () => {

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
      formId="FRM-00412"
      title="Vehicle Allocation – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Vehicle allocation request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00412"
              title="Vehicle Allocation"
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

              {/* 2. Requirement Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Requirement Details</h3>
                <div className="form-fields">
                  {textarea(values,'allocationPurpose','Purpose of Allocation')}
                  {field(values,'pickupLocation','Pickup Location')}
                  {field(values,'dropLocation','Drop Location')}
                  {field(values,'requiredDate','Required Date','date')}
                  {field(values,'requiredTime','Required Time','time')}
                  {field(values,'duration','Duration')}
                </div>
              </div>

              {/* 3. Vehicle Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Vehicle Details</h3>
                <div className="form-fields">
                  {select(values,'vehicleTypeRequired','Vehicle Type Required',['Car','SUV','Van','Truck','Bus','Other'])}
                  {textarea(values,'specialRequirements','Special Requirements')}
                  {select(values,'driverRequired','Driver Required',['Yes','No'])}
                  {select(values,'fuelArrangement','Fuel Arrangement',['Company Provided','Self Arranged','Fuel Card','Other'])}
                  {field(values,'costCenter','Cost Center')}
                </div>
              </div>

              {/* 4. Allocation Information */}
              <div className="form-section">
                <h3 className="form-section-title">4. Allocation Information</h3>
                <div className="form-fields">
                  {field(values,'allocatedVehicleNumber','Allocated Vehicle No')}
                  {field(values,'driverName','Driver Name')}
                  {field(values,'driverContact','Driver Contact')}
                  {field(values,'allocationDate','Allocation Date','date')}
                  {textarea(values,'allocationRemarks','Remarks')}
                </div>
              </div>

              {/* 5. Attachments */}
              <div className="form-section">
                <h3 className="form-section-title">5. Attachments</h3>
                <div className="form-fields">
                  {select(values,'supportingDocumentsAttached','Supporting Documents Attached',['Yes','No'])}
                  {field(values,'approvalReference','Approval Reference')}
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
                    Submit Vehicle Allocation
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

export default FRM00412_VehicleAllocation;
