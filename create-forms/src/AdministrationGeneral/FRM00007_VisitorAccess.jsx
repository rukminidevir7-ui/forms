// FRM00007_VisitorAccess.jsx
// FRM-00007 – Visitor Access Request & Authorization Form

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
  visitDate: Yup.string().required('Required'),
  visitTime: Yup.string().required('Required'),

  // Visitor Details
  visitorName: Yup.string().required('Required'),
  organizationName: Yup.string().required('Required'),
  visitPurpose: Yup.string().required('Required'),
  idType: Yup.string().required('Required'),
  idNumber: Yup.string().required('Required'),
  visitorContact: Yup.string().required('Required'),

  // Visit Logistics
  hostName: Yup.string().required('Required'),
  visitLocation: Yup.string().required('Required'),
  accessLevel: Yup.string().required('Required'),
  expectedDuration: Yup.string().required('Required'),

  // Authorization
  requestedBy: Yup.string().required('Required'),
  securityReviewBy: Yup.string().required('Required'),
  approvedBy: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  // Supporting Information
  supportingDocuments: Yup.string(),

  // Reusable Sections
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
  visitDate: '',
  visitTime: '',

  visitorName: '',
  organizationName: '',
  visitPurpose: '',
  idType: '',
  idNumber: '',
  visitorContact: '',

  hostName: '',
  visitLocation: '',
  accessLevel: '',
  expectedDuration: '',

  requestedBy: '',
  securityReviewBy: '',
  approvedBy: '',
  approvalDate: '',
  approvalComments: '',

  supportingDocuments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00007_VisitorAccess = () => {

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
      formId="FRM-00007"
      title="Visitor Access Request & Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Your details submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00007"
              title="Visitor Access – Request & Authorization"
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
                  {field(values,'visitDate','Visit Date','date')}
                  {field(values,'visitTime','Visit Time','time')}
                </div>
              </div>

              {/* Visitor Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Visitor Details</h3>
                <div className="form-fields">
                  {field(values,'visitorName','Visitor Name')}
                  {field(values,'organizationName','Organization')}
                  {textarea(values,'visitPurpose','Purpose of Visit')}
                  {select(values,'idType','ID Type',['Aadhaar','Passport','Driving License','Company ID','Other'])}
                  {field(values,'idNumber','ID Number')}
                  {field(values,'visitorContact','Visitor Contact')}
                </div>
              </div>

              {/* Visit Logistics */}
              <div className="form-section">
                <h3 className="form-section-title">3. Visit Logistics</h3>
                <div className="form-fields">
                  {field(values,'hostName','Host Name')}
                  {field(values,'visitLocation','Location to Visit')}
                  {select(values,'accessLevel','Access Level',['General','Restricted','High Security'])}
                  {field(values,'expectedDuration','Expected Duration')}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">4. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requestedBy','Requested By (Name)')}
                  {field(values,'securityReviewBy','Security Review By')}
                  {field(values,'approvedBy','Approved By')}
                  {field(values,'approvalDate','Approval Date','date')}
                  {textarea(values,'approvalComments','Comments / Remarks')}
                </div>
              </div>

              {/* Supporting Information */}
              <div className="form-section">
                <h3 className="form-section-title">5. Supporting Information</h3>
                <div className="form-fields">
                  {textarea(values,'supportingDocuments','Supporting Documents / Additional Notes')}
                </div>
              </div>

              {/* Reusable Components */}
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

export default FRM00007_VisitorAccess;
