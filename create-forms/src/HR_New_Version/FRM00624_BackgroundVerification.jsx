// FRM00624_PreEmploymentBackgroundVerificationInitiation.jsx
// FRM-00624 – Pre-Employment Background Verification Initiation Form

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
  initiationDate: Yup.string().required('Required'),
  departmentName: Yup.string().required('Required'),
  hrInitiatorName: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  verificationType: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // Candidate Details
  candidateFullName: Yup.string().required('Required'),
  candidateApplicationId: Yup.string().required('Required'),
  positionTitle: Yup.string().required('Required'),
  businessUnit: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  proposedJoiningDate: Yup.string().required('Required'),

  // Verification Scope
  addressVerification: Yup.string().required('Required'),
  employmentVerification: Yup.string().required('Required'),
  educationVerification: Yup.string().required('Required'),
  identityVerification: Yup.string().required('Required'),
  criminalBackgroundCheck: Yup.string().required('Required'),
  referenceCheck: Yup.string().required('Required'),
  consentFormReceived: Yup.string().required('Required'),

  // Vendor & Compliance
  backgroundVerificationVendor: Yup.string().required('Required'),
  complianceRequirement: Yup.string().required('Required'),
  remarks: Yup.string().required('Required'),

  // Authorization
  requestedBy: Yup.string().required('Required'),
  reviewedBy: Yup.string().required('Required'),
  approvedBy: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  initiationDate: '',
  departmentName: '',
  hrInitiatorName: '',
  employeeId: '',
  contactNumber: '',
  verificationType: '',
  priorityLevel: '',

  candidateFullName: '',
  candidateApplicationId: '',
  positionTitle: '',
  businessUnit: '',
  location: '',
  proposedJoiningDate: '',

  addressVerification: '',
  employmentVerification: '',
  educationVerification: '',
  identityVerification: '',
  criminalBackgroundCheck: '',
  referenceCheck: '',
  consentFormReceived: '',

  backgroundVerificationVendor: '',
  complianceRequirement: '',
  remarks: '',

  requestedBy: '',
  reviewedBy: '',
  approvedBy: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00624_BackgroundVerification = () => {

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
      formId="FRM-00624"
      title="Pre-Employment Background Verification Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Background verification initiation submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00624"
              title="Pre-Employment Background Verification Initiation"
              department="HR & People Ops"
            >

              {/* Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'initiationDate','Initiation Date','date')}
                  {field(values,'departmentName','Department Name')}
                  {field(values,'hrInitiatorName','HR Initiator Name')}
                  {field(values,'employeeId','HR Employee ID')}
                  {field(values,'contactNumber','Contact Number')}
                  {select(values,'verificationType','Verification Type',['Standard Check','Enhanced Check','Executive Level Check'])}
                  {select(values,'priorityLevel','Priority Level',['Low','Medium','High','Urgent'])}
                </div>
              </div>

              {/* Candidate Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Candidate Details</h3>
                <div className="form-fields">
                  {field(values,'candidateFullName','Candidate Full Name')}
                  {field(values,'candidateApplicationId','Application / Candidate ID')}
                  {field(values,'positionTitle','Position Title')}
                  {field(values,'businessUnit','Business Unit')}
                  {field(values,'location','Location')}
                  {field(values,'proposedJoiningDate','Proposed Joining Date','date')}
                </div>
              </div>

              {/* Verification Scope */}
              <div className="form-section">
                <h3 className="form-section-title">3. Verification Scope</h3>
                <div className="form-fields">
                  {select(values,'addressVerification','Address Verification',['Yes','No','NA'])}
                  {select(values,'employmentVerification','Employment History Verification',['Yes','No','NA'])}
                  {select(values,'educationVerification','Education Verification',['Yes','No','NA'])}
                  {select(values,'identityVerification','Identity Verification',['Yes','No','NA'])}
                  {select(values,'criminalBackgroundCheck','Criminal Background Check',['Yes','No','NA'])}
                  {select(values,'referenceCheck','Reference Check',['Yes','No','NA'])}
                  {select(values,'consentFormReceived','Candidate Consent Form Received',['Yes','No'])}
                </div>
              </div>

              {/* Vendor & Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">4. Vendor & Compliance</h3>
                <div className="form-fields">
                  {field(values,'backgroundVerificationVendor','Background Verification Vendor')}
                  {textarea(values,'complianceRequirement','Compliance / Policy Reference')}
                  {textarea(values,'remarks','Additional Remarks')}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requestedBy','Requested By (HR)')}
                  {field(values,'reviewedBy','Reviewed By')}
                  {field(values,'approvedBy','Approved By')}
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

export default FRM00624_BackgroundVerification;
