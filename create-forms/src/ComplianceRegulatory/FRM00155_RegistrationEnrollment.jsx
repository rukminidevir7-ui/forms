// FRM00155_RegistrationEnrollment.jsx
// FRM-00155 – Registration / Enrollment – Request / Authorization Form

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
  requestType: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // Registration Details
  registrationName: Yup.string().required('Required'),
  regulatoryAuthority: Yup.string().required('Required'),
  applicableRegulation: Yup.string().required('Required'),
  registrationType: Yup.string().required('Required'),
  effectiveDate: Yup.string().required('Required'),
  validityPeriod: Yup.string().required('Required'),

  // Purpose & Scope
  purposeJustification: Yup.string().required('Required'),
  scope: Yup.string().required('Required'),
  keyRequirements: Yup.string().required('Required'),

  // Preparation & Review
  responsibleOwner: Yup.string().required('Required'),
  preparationNotes: Yup.string().required('Required'),
  reviewedBy: Yup.string().required('Required'),

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
  requestType: '',
  priorityLevel: '',

  registrationName: '',
  regulatoryAuthority: '',
  applicableRegulation: '',
  registrationType: '',
  effectiveDate: '',
  validityPeriod: '',

  purposeJustification: '',
  scope: '',
  keyRequirements: '',

  responsibleOwner: '',
  preparationNotes: '',
  reviewedBy: '',

  requestedByAuthorization: '',
  complianceApproval: '',
  managementApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00155_RegistrationEnrollment = () => {

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
      formId="FRM-00155"
      title="Registration / Enrollment – Request / Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Registration / Enrollment request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00155"
              title="Registration / Enrollment"
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
                  {select(values,'requestType','Request Type',['New Registration','Renewal Enrollment','Amendment','Cancellation','Migration'])}
                  {select(values,'priorityLevel','Priority',['Low','Medium','High','Critical'])}
                </div>
              </div>

              {/* Registration Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Registration Details</h3>
                <div className="form-fields">
                  {field(values,'registrationName','Registration / Program Name')}
                  {field(values,'regulatoryAuthority','Regulatory Authority / Body')}
                  {field(values,'applicableRegulation','Applicable Regulation / Scheme')}
                  {field(values,'registrationType','Registration Type')}
                  {field(values,'effectiveDate','Effective Date','date')}
                  {field(values,'validityPeriod','Validity Period')}
                </div>
              </div>

              {/* Purpose & Scope */}
              <div className="form-section">
                <h3 className="form-section-title">3. Purpose & Scope</h3>
                <div className="form-fields">
                  {textarea(values,'purposeJustification','Purpose / Justification')}
                  {textarea(values,'scope','Scope')}
                  {textarea(values,'keyRequirements','Key Requirements')}
                </div>
              </div>

              {/* Preparation & Review */}
              <div className="form-section">
                <h3 className="form-section-title">4. Preparation & Review</h3>
                <div className="form-fields">
                  {field(values,'responsibleOwner','Responsible Owner')}
                  {textarea(values,'preparationNotes','Preparation Steps / Notes')}
                  {field(values,'reviewedBy','Reviewed By')}
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
                    Submit Registration / Enrollment
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

export default FRM00155_RegistrationEnrollment;
