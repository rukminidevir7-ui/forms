// FRM00620_ReferenceCheck.jsx
// FRM-00620 – Candidate Reference Check & Approval Form

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

  // Section 1 – Position & Requirement Details
  requesterName: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  positionJobTitle: Yup.string().required('Required'),
  typeOfRequirement: Yup.string().required('Required'),
  employmentType: Yup.string().required('Required'),
  reasonForRequirement: Yup.string().required('Required'),
  requiredSkills: Yup.string().required('Required'),
  educationalQualification: Yup.string().required('Required'),
  experienceRequired: Yup.number().required('Required'),
  proposedSalaryCTC: Yup.string().required('Required'),
  requiredByDate: Yup.string().required('Required'),

  // Section 2 – Candidate & Reference Information
  candidateName: Yup.string().required('Required'),
  referencePersonName: Yup.string().required('Required'),
  referenceOrganization: Yup.string().required('Required'),
  referenceContactNumber: Yup.string().required('Required'),
  relationshipWithCandidate: Yup.string().required('Required'),

  // Section 3 – Approval Details
  requisitionReferenceNumber: Yup.string().required('Required'),
  approvingAuthorityName: Yup.string().required('Required'),
  approvalStatus: Yup.string().required('Required'),
  approvedManpowerCount: Yup.number().required('Required'),
  budgetAvailability: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  requesterName: '',
  department: '',
  positionJobTitle: '',
  typeOfRequirement: '',
  employmentType: '',
  reasonForRequirement: '',
  requiredSkills: '',
  educationalQualification: '',
  experienceRequired: '',
  proposedSalaryCTC: '',
  requiredByDate: '',

  candidateName: '',
  referencePersonName: '',
  referenceOrganization: '',
  referenceContactNumber: '',
  relationshipWithCandidate: '',

  requisitionReferenceNumber: '',
  approvingAuthorityName: '',
  approvalStatus: '',
  approvedManpowerCount: '',
  budgetAvailability: '',
  approvalComments: '',
  approvalDate: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00620_ReferenceCheck = () => {

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
      formId="FRM-00620"
      title="Candidate Reference Check & Approval Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Reference check form submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00620"
              title="Candidate Reference Check & Approval"
              department="HR & Talent Acquisition"
            >

              {/* Section 1 – Position & Requirement Details */}
              <div className="form-section">
                <h3 className="form-section-title">1. Position & Requirement Details</h3>
                <div className="form-fields">
                  {field(values,'requesterName','Requester Name')}
                  {field(values,'department','Department')}
                  {field(values,'positionJobTitle','Position / Job Title')}
                  {select(values,'typeOfRequirement','Type of Requirement',['New','Replacement','Temporary'])}
                  {select(values,'employmentType','Employment Type',['Permanent','Contract','Temporary','Internship'])}
                  {textarea(values,'reasonForRequirement','Reason for Requirement')}
                  {textarea(values,'requiredSkills','Required Skills / Competencies')}
                  {field(values,'educationalQualification','Educational Qualification')}
                  {field(values,'experienceRequired','Experience Required (Years)','number')}
                  {field(values,'proposedSalaryCTC','Proposed Salary / CTC')}
                  {field(values,'requiredByDate','Required By Date','date')}
                </div>
              </div>

              {/* Section 2 – Candidate & Reference Information */}
              <div className="form-section">
                <h3 className="form-section-title">2. Candidate & Reference Information</h3>
                <div className="form-fields">
                  {field(values,'candidateName','Candidate Name')}
                  {field(values,'referencePersonName','Reference Person Name')}
                  {field(values,'referenceOrganization','Reference Organization')}
                  {field(values,'referenceContactNumber','Reference Contact Number')}
                  {field(values,'relationshipWithCandidate','Relationship with Candidate')}
                </div>
              </div>

              {/* Section 3 – Approval Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Approval Details</h3>
                <div className="form-fields">
                  {field(values,'requisitionReferenceNumber','Requisition Reference Number')}
                  {field(values,'approvingAuthorityName','Approving Authority Name')}
                  {select(values,'approvalStatus','Approval Status',['Approved','Rejected','On Hold'])}
                  {field(values,'approvedManpowerCount','Approved Manpower Count','number')}
                  {select(values,'budgetAvailability','Budget Availability',['Yes','No'])}
                  {textarea(values,'approvalComments','Approval Comments')}
                  {field(values,'approvalDate','Approval Date','date')}
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

export default FRM00620_ReferenceCheck;
