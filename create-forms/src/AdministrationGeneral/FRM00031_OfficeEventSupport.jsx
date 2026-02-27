// FRM00031_OfficeEventSupport.jsx
// FRM-00031 – Office Event Support Request & Authorization Form

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
  eventDate: Yup.string().required('Required'),
  eventTime: Yup.string().required('Required'),

  // Event Details
  eventName: Yup.string().required('Required'),
  eventType: Yup.string().required('Required'),
  eventLocation: Yup.string().required('Required'),
  expectedAttendees: Yup.number().required('Required'),
  startTime: Yup.string().required('Required'),
  endTime: Yup.string().required('Required'),
  eventDescription: Yup.string().required('Required'),

  // Support Requirements
  logisticsSupport: Yup.string().required('Required'),
  itAvSupport: Yup.string().required('Required'),
  cateringRequired: Yup.string().required('Required'),
  seatingArrangement: Yup.string().required('Required'),
  securitySupport: Yup.string().required('Required'),
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
  eventDate: '',
  eventTime: '',

  eventName: '',
  eventType: '',
  eventLocation: '',
  expectedAttendees: '',
  startTime: '',
  endTime: '',
  eventDescription: '',

  logisticsSupport: '',
  itAvSupport: '',
  cateringRequired: '',
  seatingArrangement: '',
  securitySupport: '',
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

const FRM00031_OfficeEventSupport = () => {

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
      formId="FRM-00031"
      title="Office Event Support Request & Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Office event support request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00031"
              title="Office Event Support – Request & Authorization"
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
                  {field(values,'contactNumber','Contact')}
                  {field(values,'eventDate','Event Date','date')}
                  {field(values,'eventTime','Event Time','time')}
                </div>
              </div>

              {/* Event Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Event Details</h3>
                <div className="form-fields">
                  {field(values,'eventName','Event Name')}
                  {select(values,'eventType','Event Type',['Internal','Client','Vendor','Training','Corporate Event'])}
                  {field(values,'eventLocation','Location / Venue')}
                  {field(values,'expectedAttendees','Expected Attendees','number')}
                  {field(values,'startTime','Start Time','time')}
                  {field(values,'endTime','End Time','time')}
                  {textarea(values,'eventDescription','Purpose / Description')}
                </div>
              </div>

              {/* Support Requirements */}
              <div className="form-section">
                <h3 className="form-section-title">3. Support Requirements</h3>
                <div className="form-fields">
                  {select(values,'logisticsSupport','Logistics Support',['Yes','No'])}
                  {select(values,'itAvSupport','IT / AV Support',['Yes','No'])}
                  {select(values,'cateringRequired','Catering',['Yes','No'])}
                  {select(values,'seatingArrangement','Seating Arrangement',['Theatre','Classroom','Boardroom','U-Shape','Custom'])}
                  {select(values,'securitySupport','Security Support',['Yes','No'])}
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
                  {textarea(values,'approvalComments','Comments')}
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

export default FRM00031_OfficeEventSupport;
