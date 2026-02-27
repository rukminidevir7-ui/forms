// FRM00611_ManpowerRequirementApproval.jsx
// FRM-00611 – Manpower Requirement & Approval Form

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

  // Section 1 – Requester Information
  requesterName: Yup.string().required('Required'),
  mobileNumber: Yup.string().required('Required'),
  emailAddress: Yup.string().email('Invalid email').required('Required'),
  qualifications: Yup.string().required('Required'),

  // Manpower Requirement Details
  departmentName: Yup.string().required('Required'),
  positionTitle: Yup.string().required('Required'),
  requirementType: Yup.string().required('Required'),
  employmentType: Yup.string().required('Required'),
  reasonForRequirement: Yup.string().required('Required'),
  requiredSkills: Yup.string().required('Required'),
  educationalQualification: Yup.string().required('Required'),
  experienceRequired: Yup.number().required('Required'),
  proposedCTC: Yup.string().required('Required'),
  requiredByDate: Yup.string().required('Required'),

  // Section 2 – Approval Details
  requisitionReferenceNumber: Yup.string().required('Required'),
  approvingAuthorityName: Yup.string().required('Required'),
  approvalStatus: Yup.string().required('Required'),
  approvedManpowerCount: Yup.number().required('Required'),
  budgetAvailability: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  requesterName: '',
  mobileNumber: '',
  emailAddress: '',
  qualifications: '',

  departmentName: '',
  positionTitle: '',
  requirementType: '',
  employmentType: '',
  reasonForRequirement: '',
  requiredSkills: '',
  educationalQualification: '',
  experienceRequired: '',
  proposedCTC: '',
  requiredByDate: '',

  requisitionReferenceNumber: '',
  approvingAuthorityName: '',
  approvalStatus: '',
  approvedManpowerCount: '',
  budgetAvailability: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00611_ManpowerRequirementApproval = () => {

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
      formId="FRM-00611"
      title="Manpower Requirement & Approval Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Manpower requirement submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00611"
              title="Manpower Requirement & Approval"
              department="HR & People Ops"
            >

              {/* Section 1 – Request Details */}
              <div className="form-section">
                <h3 className="form-section-title">1. Request Details</h3>
                <div className="form-fields">
                  {field(values,'requesterName','Requester Name')}
                  {field(values,'mobileNumber','Mobile Number')}
                  {field(values,'emailAddress','Email Address')}
                  {field(values,'qualifications','Requester Qualifications')}
                </div>
              </div>

              {/* Manpower Requirement */}
              <div className="form-section">
                <h3 className="form-section-title">2. Manpower Requirement</h3>
                <div className="form-fields">
                  {field(values,'departmentName','Department')}
                  {field(values,'positionTitle','Position / Job Title')}
                  {select(values,'requirementType','Type of Requirement',['New','Replacement','Temporary'])}
                  {select(values,'employmentType','Employment Type',['Permanent','Contract','Temporary','Internship'])}
                  {textarea(values,'reasonForRequirement','Reason for Requirement')}
                  {textarea(values,'requiredSkills','Required Skills / Competencies')}
                  {field(values,'educationalQualification','Educational Qualification')}
                  {field(values,'experienceRequired','Experience Required (Years)','number')}
                  {field(values,'proposedCTC','Proposed Salary / CTC')}
                  {field(values,'requiredByDate','Required By Date','date')}
                </div>
              </div>

              {/* Section 2 – Approval Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Approval Details</h3>
                <div className="form-fields">
                  {field(values,'requisitionReferenceNumber','Requisition Reference Number')}
                  {field(values,'approvingAuthorityName','Approving Authority Name')}
                  {select(values,'approvalStatus','Approval Status',['Approved','Rejected','On Hold'])}
                  {field(values,'approvedManpowerCount','Approved Manpower Count','number')}
                  {select(values,'budgetAvailability','Budget Availability',['Yes','No'])}
                  {field(values,'approvalDate','Approval Date','date')}
                  {textarea(values,'approvalComments','Approval Decision / Comments')}
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

export default FRM00611_ManpowerRequirementApproval;


