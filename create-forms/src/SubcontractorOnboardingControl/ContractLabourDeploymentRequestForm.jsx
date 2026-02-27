// ContractLabourDeploymentRequestForm.jsx
// FRM-01131 – Contract Labour Deployment Request Form

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

  // Project Info
  projectName: Yup.string().required('Required'),
  projectLocation: Yup.string().required('Required'),
  clientName: Yup.string().required('Required'),
  requiredDeploymentDate: Yup.string().required('Required'),

  // Contractor Details
  companyName: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  phoneNumber: Yup.string().required('Required'),
  emailId: Yup.string().email('Invalid Email').required('Required'),

  // Labour Details
  typeOfWork: Yup.string().required('Required'),
  skillCategory: Yup.string().required('Required'),
  numberOfWorkers: Yup.string().required('Required'),
  workingHours: Yup.string().required('Required'),
  deploymentStartDate: Yup.string().required('Required'),
  deploymentEndDate: Yup.string().required('Required'),

  // Compliance
  statutoryComplianceRequired: Yup.string().required('Required'),
  safetyInductionRequired: Yup.string().required('Required'),
  ppeRequirements: Yup.string().required('Required'),

  // Verification
  verifiedBy: Yup.string().required('Required'),
  verificationDate: Yup.string().required('Required'),
  verificationRemarks: Yup.string().required('Required'),

  // Declaration
  requestedByName: Yup.string().required('Required'),
  designation: Yup.string().required('Required'),
  requestDate: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  projectName: '',
  projectLocation: '',
  clientName: '',
  requiredDeploymentDate: '',

  companyName: '',
  contactPerson: '',
  phoneNumber: '',
  emailId: '',

  typeOfWork: '',
  skillCategory: '',
  numberOfWorkers: '',
  workingHours: '',
  deploymentStartDate: '',
  deploymentEndDate: '',

  statutoryComplianceRequired: '',
  safetyInductionRequired: '',
  ppeRequirements: '',

  verifiedBy: '',
  verificationDate: '',
  verificationRemarks: '',

  requestedByName: '',
  designation: '',
  requestDate: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const ContractLabourDeploymentRequestForm = () => {

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
      formId="FRM-01131"
      title="Contract Labour Deployment Request Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Contract Labour Deployment Request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-01131"
              title="Contract Labour Deployment Request Form"
              department="Subcontractor & Contracting"
            >

              {/* 1. Project Info */}
              <div className="form-section">
                <h3 className="form-section-title">Project Information</h3>
                <div className="form-fields">
                  {field(values,'projectName','Project Name')}
                  {field(values,'projectLocation','Project Location')}
                  {field(values,'clientName','Client Name')}
                  {field(values,'requiredDeploymentDate','Required Deployment Date','date')}
                </div>
              </div>

              {/* 2. Contractor Details */}
              <div className="form-section">
                <h3 className="form-section-title">Contractor / Subcontractor Details</h3>
                <div className="form-fields">
                  {field(values,'companyName','Company Name')}
                  {field(values,'contactPerson','Contact Person')}
                  {field(values,'phoneNumber','Phone Number')}
                  {field(values,'emailId','Email ID')}
                </div>
              </div>

              {/* 3. Labour Details */}
              <div className="form-section">
                <h3 className="form-section-title">Labour Requirement Details</h3>
                <div className="form-fields">
                  {field(values,'typeOfWork','Type of Work')}
                  {select(values,'skillCategory','Skill Category',['Skilled','Semi-skilled','Unskilled'])}
                  {field(values,'numberOfWorkers','Number of Workers Required')}
                  {field(values,'workingHours','Working Hours / Shift Details')}
                  {field(values,'deploymentStartDate','Deployment Start Date','date')}
                  {field(values,'deploymentEndDate','Deployment End Date','date')}
                </div>
              </div>

              {/* 4. Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Requirements</h3>
                <div className="form-fields">
                  {field(values,'statutoryComplianceRequired','Statutory Compliance Required (PF/ESI/Labour License)')}
                  {select(values,'safetyInductionRequired','Safety Induction Required',['Yes','No'])}
                  {field(values,'ppeRequirements','PPE Requirements')}
                </div>
              </div>

              {/* 5. Attachments Section */}
              <FormAttachments values={values} />

              {/* 6. Verification */}
              <div className="form-section">
                <h3 className="form-section-title">Verification</h3>
                <div className="form-fields">
                  {field(values,'verifiedBy','Verified By')}
                  {field(values,'verificationDate','Verification Date','date')}
                  {textarea(values,'verificationRemarks','Remarks')}
                </div>
              </div>

              {/* 7. Declaration */}
              <div className="form-section">
                <h3 className="form-section-title">Request Declaration</h3>
                <div className="form-fields">
                  {field(values,'requestedByName','Requested By (Name)')}
                  {field(values,'designation','Designation')}
                  {field(values,'requestDate','Date','date')}
                </div>
              </div>

              {/* Universal Components */}
              <FormCustomFields values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Request
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

export default ContractLabourDeploymentRequestForm;
