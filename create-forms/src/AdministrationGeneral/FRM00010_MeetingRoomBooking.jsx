// FRM00010_MeetingRoomBooking.jsx
// FRM-00010 – Meeting Room Booking Request & Authorization Form

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

  // Basic Information
  requestDate: Yup.string().required('Required'),
  departmentName: Yup.string().required('Required'),
  requesterName: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  meetingDate: Yup.string().required('Required'),
  meetingTime: Yup.string().required('Required'),

  // Meeting Details
  meetingTitle: Yup.string().required('Required'),
  meetingType: Yup.string().required('Required'),
  numberOfAttendees: Yup.number().required('Required'),
  roomRequired: Yup.string().required('Required'),
  startTime: Yup.string().required('Required'),
  endTime: Yup.string().required('Required'),
  meetingAgenda: Yup.string().required('Required'),

  // Facilities
  projectorRequired: Yup.string().required('Required'),
  videoConferencingRequired: Yup.string().required('Required'),
  whiteboardRequired: Yup.string().required('Required'),
  conferencePhoneRequired: Yup.string().required('Required'),
  otherRequirements: Yup.string(),

  // Authorization
  requestedBy: Yup.string().required('Required'),
  reviewedBy: Yup.string().required('Required'),
  approvedBy: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  // Supporting
  supportingDocuments: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  requestDate: '',
  departmentName: '',
  requesterName: '',
  employeeId: '',
  contactNumber: '',
  meetingDate: '',
  meetingTime: '',

  meetingTitle: '',
  meetingType: '',
  numberOfAttendees: '',
  roomRequired: '',
  startTime: '',
  endTime: '',
  meetingAgenda: '',

  projectorRequired: '',
  videoConferencingRequired: '',
  whiteboardRequired: '',
  conferencePhoneRequired: '',
  otherRequirements: '',

  requestedBy: '',
  reviewedBy: '',
  approvedBy: '',
  approvalDate: '',
  approvalComments: '',

  supportingDocuments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00010_MeetingRoomBooking = () => {

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
      <label className="form-label">{label}</label>
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
      formId="FRM-00010"
      title="Meeting Room Booking Request & Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Meeting room booking submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00010"
              title="Meeting Room Booking – Request & Authorization"
              department="Administration & General – Office Administration"
            >

              {/* Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'departmentName','Department Name')}
                  {field(values,'requesterName','Requester Name')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'contactNumber','Contact Number')}
                  {field(values,'meetingDate','Meeting Date','date')}
                  {field(values,'meetingTime','Meeting Time','time')}
                </div>
              </div>

              {/* Meeting Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Meeting Details</h3>
                <div className="form-fields">
                  {field(values,'meetingTitle','Meeting Title')}
                  {select(values,'meetingType','Meeting Type',['Internal','Client','Vendor','Board Meeting','Training'])}
                  {field(values,'numberOfAttendees','Number of Attendees','number')}
                  {field(values,'roomRequired','Room Required')}
                  {field(values,'startTime','Start Time','time')}
                  {field(values,'endTime','End Time','time')}
                  {textarea(values,'meetingAgenda','Purpose / Agenda')}
                </div>
              </div>

              {/* Facilities */}
              <div className="form-section">
                <h3 className="form-section-title">3. Facilities Required</h3>
                <div className="form-fields">
                  {select(values,'projectorRequired','Projector Required',['Yes','No'])}
                  {select(values,'videoConferencingRequired','Video Conferencing Required',['Yes','No'])}
                  {select(values,'whiteboardRequired','Whiteboard Required',['Yes','No'])}
                  {select(values,'conferencePhoneRequired','Conference Phone Required',['Yes','No'])}
                  {textarea(values,'otherRequirements','Other Requirements')}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">4. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requestedBy','Requested By (Name)')}
                  {field(values,'reviewedBy','Reviewed By')}
                  {field(values,'approvedBy','Approved By')}
                  {field(values,'approvalDate','Approval Date','date')}
                  {textarea(values,'approvalComments','Comments / Remarks')}
                </div>
              </div>

              {/* Supporting */}
              <div className="form-section">
                <h3 className="form-section-title">5. Supporting Information</h3>
                <div className="form-fields">
                  {textarea(values,'supportingDocuments','Supporting Documents / Additional Notes')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Form
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

export default FRM00010_MeetingRoomBooking;
