// FRM00152_LicenseRenewal.jsx
// FRM-00152 – License Renewal – Request / Authorization Form

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
  departmentFunction: Yup.string().required('Required'),
  requestedBy: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  renewalType: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // License Details
  licenseName: Yup.string().required('Required'),
  licenseNumber: Yup.string().required('Required'),
  issuingAuthority: Yup.string().required('Required'),
  applicableRegulation: Yup.string().required('Required'),
  issueDate: Yup.string().required('Required'),
  expiryDate: Yup.string().required('Required'),

  // Renewal Details
  renewalDueDate: Yup.string().required('Required'),
  submissionMode: Yup.string().required('Required'),
  renewalRequirements: Yup.string().required('Required'),
  preparationNotes: Yup.string().required('Required'),

  // Review & Validation
  reviewedBy: Yup.string().required('Required'),
  validationMethod: Yup.string().required('Required'),
  issuesIdentified: Yup.string().required('Required'),

  // Authorization
  requestedByAuthorization: Yup.string().required('Required'),
  complianceApproval: Yup.string().required('Required'),
  managementApproval: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  requestDate: '',
  departmentFunction: '',
  requestedBy: '',
  employeeId: '',
  contactNumber: '',
  renewalType: '',
  priorityLevel: '',

  licenseName: '',
  licenseNumber: '',
  issuingAuthority: '',
  applicableRegulation: '',
  issueDate: '',
  expiryDate: '',

  renewalDueDate: '',
  submissionMode: '',
  renewalRequirements: '',
  preparationNotes: '',

  reviewedBy: '',
  validationMethod: '',
  issuesIdentified: '',

  requestedByAuthorization: '',
  complianceApproval: '',
  managementApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00152_LicenseRenewal = () => {

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
      formId="FRM-00152"
      title="License Renewal – Request / Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('License renewal request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00152"
              title="License Renewal"
              department="Compliance & Regulatory – Regulatory Filings"
            >

              {/* Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'requestDate','Date','date')}
                  {field(values,'departmentFunction','Department / Function')}
                  {field(values,'requestedBy','Requested By')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'contactNumber','Contact')}
                  {select(values,'renewalType','Renewal Type',['Standard Renewal','Late Renewal','Amendment with Renewal','Emergency Renewal'])}
                  {select(values,'priorityLevel','Priority',['Low','Medium','High','Critical'])}
                </div>
              </div>

              {/* License Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. License Details</h3>
                <div className="form-fields">
                  {field(values,'licenseName','License Name')}
                  {field(values,'licenseNumber','License Number')}
                  {field(values,'issuingAuthority','Issuing Authority')}
                  {field(values,'applicableRegulation','Applicable Regulation')}
                  {field(values,'issueDate','Issue Date','date')}
                  {field(values,'expiryDate','Expiry Date','date')}
                </div>
              </div>

              {/* Renewal Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Renewal Details</h3>
                <div className="form-fields">
                  {field(values,'renewalDueDate','Renewal Due Date','date')}
                  {select(values,'submissionMode','Submission Mode',['Online Portal','Physical Filing','Email Submission','API Submission'])}
                  {textarea(values,'renewalRequirements','Renewal Requirements')}
                  {textarea(values,'preparationNotes','Preparation Notes')}
                </div>
              </div>

              {/* Review & Validation */}
              <div className="form-section">
                <h3 className="form-section-title">4. Review & Validation</h3>
                <div className="form-fields">
                  {field(values,'reviewedBy','Reviewed By')}
                  {field(values,'validationMethod','Validation Method')}
                  {textarea(values,'issuesIdentified','Issues Identified')}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requestedByAuthorization','Requested By')}
                  {field(values,'complianceApproval','Compliance Approval')}
                  {field(values,'managementApproval','Management Approval')}
                  {field(values,'approvalDate','Approval Date','date')}
                  {textarea(values,'approvalComments','Comments')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit License Renewal
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

export default FRM00152_LicenseRenewal;
