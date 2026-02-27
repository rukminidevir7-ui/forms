// FRM00623_OfferApproval.jsx
// FRM-00623 – Offer Approval – Approval / Authorization Form

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

  // Candidate Information
  candidateFullName: Yup.string().required('Required'),
  candidateApplicationId: Yup.string().required('Required'),

  // Offer Details
  positionOffered: Yup.string().required('Required'),
  departmentName: Yup.string().required('Required'),
  offeredCTC: Yup.string().required('Required'),
  employmentType: Yup.string().required('Required'),
  proposedJoiningDate: Yup.string().required('Required'),

  // Approval Details
  hiringManagerName: Yup.string().required('Required'),
  approvalAuthorityName: Yup.string().required('Required'),
  offerApprovalStatus: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalRemarks: Yup.string().required('Required'),

  // Reusable Sections
  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  candidateFullName: '',
  candidateApplicationId: '',

  positionOffered: '',
  departmentName: '',
  offeredCTC: '',
  employmentType: '',
  proposedJoiningDate: '',

  hiringManagerName: '',
  approvalAuthorityName: '',
  offerApprovalStatus: '',
  approvalDate: '',
  approvalRemarks: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00623_OfferApproval = () => {

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
      formId="FRM-00623"
      title="Offer Approval – Approval / Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Offer approval submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00623"
              title="Offer Approval – Authorization"
              department="HR & People Ops"
            >

              {/* Candidate Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Candidate Information</h3>
                <div className="form-fields">
                  {field(values,'candidateFullName','Candidate Full Name')}
                  {field(values,'candidateApplicationId','Candidate ID / Application ID')}
                </div>
              </div>

              {/* Offer Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Offer Details</h3>
                <div className="form-fields">
                  {field(values,'positionOffered','Position / Designation Offered')}
                  {field(values,'departmentName','Department')}
                  {field(values,'offeredCTC','Offered CTC / Salary Package')}
                  {select(values,'employmentType','Employment Type',['Permanent','Contract','Internship','Consultant'])}
                  {field(values,'proposedJoiningDate','Proposed Joining Date','date')}
                </div>
              </div>

              {/* Approval Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Approval Details</h3>
                <div className="form-fields">
                  {field(values,'hiringManagerName','Hiring Manager Name')}
                  {field(values,'approvalAuthorityName','Approval Authority Name')}
                  {select(values,'offerApprovalStatus','Offer Approval Status',['Approved','Rejected','On Hold'])}
                  {field(values,'approvalDate','Approval Date','date')}
                  {textarea(values,'approvalRemarks','Approval Remarks')}
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

export default FRM00623_OfferApproval;
