// FRM00423_DriverDutyRoster.jsx
// FRM-00423 – Driver Duty Roster – Log / Register Form

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

  // 1. Roster Details
  rosterId: Yup.string().required('Required'),
  rosterDate: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),

  // 2. Driver Information
  driverName: Yup.string().required('Required'),
  driverId: Yup.string().required('Required'),
  licenseNumber: Yup.string().required('Required'),
  driverContact: Yup.string().required('Required'),
  shift: Yup.string().required('Required'),

  // 3. Duty Assignment
  vehicleNumber: Yup.string().required('Required'),
  routeArea: Yup.string().required('Required'),
  dutyStartTime: Yup.string().required('Required'),
  dutyEndTime: Yup.string().required('Required'),
  reportingLocation: Yup.string().required('Required'),

  // 4. Schedule Period
  scheduleFromDate: Yup.string().required('Required'),
  scheduleToDate: Yup.string().required('Required'),
  workingDays: Yup.string().required('Required'),
  offDays: Yup.string().required('Required'),

  // 5. Remarks
  remarks: Yup.string().required('Required'),

  // 6. Authorization
  rosterPreparedBy: Yup.string().required('Required'),
  rosterReviewedBy: Yup.string().required('Required'),
  rosterApprovedBy: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  rosterId: '',
  rosterDate: '',
  preparedBy: '',
  department: '',
  contactNumber: '',

  driverName: '',
  driverId: '',
  licenseNumber: '',
  driverContact: '',
  shift: '',

  vehicleNumber: '',
  routeArea: '',
  dutyStartTime: '',
  dutyEndTime: '',
  reportingLocation: '',

  scheduleFromDate: '',
  scheduleToDate: '',
  workingDays: '',
  offDays: '',

  remarks: '',

  rosterPreparedBy: '',
  rosterReviewedBy: '',
  rosterApprovedBy: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00423_DriverDutyRoster = () => {

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
      formId="FRM-00423"
      title="Driver Duty Roster – Log / Register"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Driver duty roster submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00423"
              title="Driver Duty Roster"
              department="Fleet & Transport – Fleet Operations"
            >

              {/* 1. Roster Details */}
              <div className="form-section">
                <h3 className="form-section-title">1. Roster Details</h3>
                <div className="form-fields">
                  {field(values,'rosterId','Roster ID')}
                  {field(values,'rosterDate','Roster Date','date')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'department','Department')}
                  {field(values,'contactNumber','Contact No')}
                </div>
              </div>

              {/* 2. Driver Information */}
              <div className="form-section">
                <h3 className="form-section-title">2. Driver Information</h3>
                <div className="form-fields">
                  {field(values,'driverName','Driver Name')}
                  {field(values,'driverId','Driver ID')}
                  {field(values,'licenseNumber','License No')}
                  {field(values,'driverContact','Contact Number')}
                  {select(values,'shift','Shift',['Morning','Evening','Night','General','Rotational'])}
                </div>
              </div>

              {/* 3. Duty Assignment */}
              <div className="form-section">
                <h3 className="form-section-title">3. Duty Assignment</h3>
                <div className="form-fields">
                  {field(values,'vehicleNumber','Vehicle No')}
                  {field(values,'routeArea','Route / Area')}
                  {field(values,'dutyStartTime','Duty Start Time','time')}
                  {field(values,'dutyEndTime','Duty End Time','time')}
                  {field(values,'reportingLocation','Reporting Location')}
                </div>
              </div>

              {/* 4. Schedule Period */}
              <div className="form-section">
                <h3 className="form-section-title">4. Schedule Period</h3>
                <div className="form-fields">
                  {field(values,'scheduleFromDate','From Date','date')}
                  {field(values,'scheduleToDate','To Date','date')}
                  {field(values,'workingDays','Working Days')}
                  {field(values,'offDays','Off Days')}
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
                  {field(values,'rosterPreparedBy','Prepared By (Name/Signature/Date)')}
                  {field(values,'rosterReviewedBy','Reviewed By (Name/Signature/Date)')}
                  {field(values,'rosterApprovedBy','Approved By (Name/Signature/Date)')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Roster
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

export default FRM00423_DriverDutyRoster;
