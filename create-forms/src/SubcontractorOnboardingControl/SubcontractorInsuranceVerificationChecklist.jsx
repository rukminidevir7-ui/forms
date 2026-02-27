// SubcontractorInsuranceVerificationChecklist.jsx
// FRM-01121 – Subcontractor Insurance Verification Checklist

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

const yesNo = ['Yes','No'];

const validationSchema = Yup.object({

  // Subcontractor Info
  companyName: Yup.string().required('Required'),
  projectName: Yup.string().required('Required'),
  projectLocation: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  verificationDate: Yup.string().required('Required'),

  // Insurance Details
  insuranceProviderName: Yup.string().required('Required'),
  policyNumber: Yup.string().required('Required'),
  insuranceType: Yup.string().required('Required'),
  coverageAmount: Yup.string().required('Required'),
  policyStartDate: Yup.string().required('Required'),
  policyExpiryDate: Yup.string().required('Required'),

  // Checklist
  validCertificateAvailable: Yup.string().required('Required'),
  coverageMeetsRequirement: Yup.string().required('Required'),
  validityCoversProjectDuration: Yup.string().required('Required'),
  endorsementsVerified: Yup.string().required('Required'),
  insuranceCopyAttached: Yup.string().required('Required'),

  // Remarks
  comments: Yup.string().required('Required'),

  // Verification
  verifiedBy: Yup.string().required('Required'),
  verifierDesignation: Yup.string().required('Required'),
  verificationSignDate: Yup.string().required('Required'),

  // Approval
  approvedBy: Yup.string().required('Required'),
  approverDesignation: Yup.string().required('Required'),
  approvalSignDate: Yup.string().required('Required'),

  // Universal Components
  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  companyName: '',
  projectName: '',
  projectLocation: '',
  contactPerson: '',
  verificationDate: '',

  insuranceProviderName: '',
  policyNumber: '',
  insuranceType: '',
  coverageAmount: '',
  policyStartDate: '',
  policyExpiryDate: '',

  validCertificateAvailable: '',
  coverageMeetsRequirement: '',
  validityCoversProjectDuration: '',
  endorsementsVerified: '',
  insuranceCopyAttached: '',

  comments: '',

  verifiedBy: '',
  verifierDesignation: '',
  verificationSignDate: '',

  approvedBy: '',
  approverDesignation: '',
  approvalSignDate: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const SubcontractorInsuranceVerificationChecklist = () => {

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
            {options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </Field>
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (

    <ModernFormWrapper
      formId="FRM-01121"
      title="Subcontractor Insurance Verification Checklist"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Insurance verification checklist submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-01121"
              title="Subcontractor Insurance Verification Checklist"
              department="Subcontractor & Contracting"
            >

              {/* Subcontractor Info */}
              <div className="form-section">
                <h3 className="form-section-title">Subcontractor Information</h3>
                <div className="form-fields">
                  {field(values,'companyName','Company Name')}
                  {field(values,'projectName','Project Name')}
                  {field(values,'projectLocation','Project Location')}
                  {field(values,'contactPerson','Contact Person')}
                  {field(values,'verificationDate','Verification Date','date')}
                </div>
              </div>

              {/* Insurance Details */}
              <div className="form-section">
                <h3 className="form-section-title">Insurance Details</h3>
                <div className="form-fields">
                  {field(values,'insuranceProviderName','Insurance Provider Name')}
                  {field(values,'policyNumber','Policy Number')}
                  {field(values,'insuranceType','Insurance Type (Workmen/Third Party/All Risk)')}
                  {field(values,'coverageAmount','Coverage Amount')}
                  {field(values,'policyStartDate','Policy Start Date','date')}
                  {field(values,'policyExpiryDate','Policy Expiry Date','date')}
                </div>
              </div>

              {/* Verification Checklist */}
              <div className="form-section">
                <h3 className="form-section-title">Verification Checklist</h3>
                <div className="form-fields">
                  {select(values,'validCertificateAvailable','Valid insurance certificate available',yesNo)}
                  {select(values,'coverageMeetsRequirement','Coverage meets contract requirements',yesNo)}
                  {select(values,'validityCoversProjectDuration','Policy validity covers project duration',yesNo)}
                  {select(values,'endorsementsVerified','Endorsements verified',yesNo)}
                  {select(values,'insuranceCopyAttached','Insurance copy attached',yesNo)}
                </div>
              </div>

              {/* Remarks */}
              <div className="form-section">
                <h3 className="form-section-title">Remarks</h3>
                <div className="form-fields">
                  {textarea(values,'comments','Comments')}
                </div>
              </div>

              {/* Verification */}
              <div className="form-section">
                <h3 className="form-section-title">Verification</h3>
                <div className="form-fields">
                  {field(values,'verifiedBy','Verified By (Name)')}
                  {field(values,'verifierDesignation','Designation')}
                  {field(values,'verificationSignDate','Date','date')}
                </div>
              </div>

              {/* Approval */}
              <div className="form-section">
                <h3 className="form-section-title">Approval</h3>
                <div className="form-fields">
                  {field(values,'approvedBy','Approved By (Name)')}
                  {field(values,'approverDesignation','Designation')}
                  {field(values,'approvalSignDate','Date','date')}
                </div>
              </div>

              {/* Universal Components */}
              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Checklist
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

export default SubcontractorInsuranceVerificationChecklist;
