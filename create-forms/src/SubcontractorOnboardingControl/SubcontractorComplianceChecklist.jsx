// SubcontractorComplianceChecklist.jsx
// FRM-01122 – Subcontractor Compliance Checklist

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
  checklistDate: Yup.string().required('Required'),

  // Statutory Compliance
  companyRegistrationValid: Yup.string().required('Required'),
  gstRegistrationValid: Yup.string().required('Required'),
  panAvailable: Yup.string().required('Required'),
  tradeLicenseValid: Yup.string().required('Required'),
  pfRegistrationAvailable: Yup.string().required('Required'),
  esiRegistrationAvailable: Yup.string().required('Required'),

  // Safety & Quality
  hsePolicySubmitted: Yup.string().required('Required'),
  safetyTrainingRecordsAvailable: Yup.string().required('Required'),
  riskAssessmentCompleted: Yup.string().required('Required'),
  qualityPolicySubmitted: Yup.string().required('Required'),
  incidentReportingSystemAvailable: Yup.string().required('Required'),

  // Contract Compliance
  signedContractAvailable: Yup.string().required('Required'),
  scopeOfWorkApproved: Yup.string().required('Required'),
  insuranceValid: Yup.string().required('Required'),
  mobilizationApproved: Yup.string().required('Required'),

  // Remarks
  comments: Yup.string().required('Required'),

  // Verification
  checkedBy: Yup.string().required('Required'),
  checkerDesignation: Yup.string().required('Required'),
  checkedDate: Yup.string().required('Required'),

  // Approval
  approvedBy: Yup.string().required('Required'),
  approverDesignation: Yup.string().required('Required'),
  approvedDate: Yup.string().required('Required'),

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
  checklistDate: '',

  companyRegistrationValid: '',
  gstRegistrationValid: '',
  panAvailable: '',
  tradeLicenseValid: '',
  pfRegistrationAvailable: '',
  esiRegistrationAvailable: '',

  hsePolicySubmitted: '',
  safetyTrainingRecordsAvailable: '',
  riskAssessmentCompleted: '',
  qualityPolicySubmitted: '',
  incidentReportingSystemAvailable: '',

  signedContractAvailable: '',
  scopeOfWorkApproved: '',
  insuranceValid: '',
  mobilizationApproved: '',

  comments: '',

  checkedBy: '',
  checkerDesignation: '',
  checkedDate: '',

  approvedBy: '',
  approverDesignation: '',
  approvedDate: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const SubcontractorComplianceChecklist = () => {

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

  const select = (values, name, label) => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '___________________'}</div>
      ) : (
        <>
          <Field as="select" name={name} className="form-input">
            <option value="">-- Select --</option>
            {yesNo.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </Field>
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

  return (

    <ModernFormWrapper
      formId="FRM-01122"
      title="Subcontractor Compliance Checklist"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Compliance checklist submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-01122"
              title="Subcontractor Compliance Checklist"
              department="Subcontractor & Contracting"
            >

              {/* Subcontractor Information */}
              <div className="form-section">
                <h3 className="form-section-title">Subcontractor Information</h3>
                <div className="form-fields">
                  {field(values,'companyName','Company Name')}
                  {field(values,'projectName','Project Name')}
                  {field(values,'projectLocation','Project Location')}
                  {field(values,'contactPerson','Contact Person')}
                  {field(values,'checklistDate','Checklist Date','date')}
                </div>
              </div>

              {/* Statutory Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">Statutory Compliance</h3>
                <div className="form-fields">
                  {select(values,'companyRegistrationValid','Company Registration Valid')}
                  {select(values,'gstRegistrationValid','GST Registration Valid')}
                  {select(values,'panAvailable','PAN Available')}
                  {select(values,'tradeLicenseValid','Trade License Valid')}
                  {select(values,'pfRegistrationAvailable','PF Registration Available')}
                  {select(values,'esiRegistrationAvailable','ESI Registration Available')}
                </div>
              </div>

              {/* Safety & Quality */}
              <div className="form-section">
                <h3 className="form-section-title">Safety & Quality Compliance</h3>
                <div className="form-fields">
                  {select(values,'hsePolicySubmitted','HSE Policy Submitted')}
                  {select(values,'safetyTrainingRecordsAvailable','Safety Training Records Available')}
                  {select(values,'riskAssessmentCompleted','Risk Assessment Completed')}
                  {select(values,'qualityPolicySubmitted','Quality Policy Submitted')}
                  {select(values,'incidentReportingSystemAvailable','Incident Reporting System Available')}
                </div>
              </div>

              {/* Contract Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">Contract Compliance</h3>
                <div className="form-fields">
                  {select(values,'signedContractAvailable','Signed Contract Available')}
                  {select(values,'scopeOfWorkApproved','Scope of Work Approved')}
                  {select(values,'insuranceValid','Insurance Valid')}
                  {select(values,'mobilizationApproved','Mobilization Approved')}
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
                  {field(values,'checkedBy','Checked By (Name)')}
                  {field(values,'checkerDesignation','Designation')}
                  {field(values,'checkedDate','Date','date')}
                </div>
              </div>

              {/* Approval */}
              <div className="form-section">
                <h3 className="form-section-title">Approval</h3>
                <div className="form-fields">
                  {field(values,'approvedBy','Approved By (Name)')}
                  {field(values,'approverDesignation','Designation')}
                  {field(values,'approvedDate','Date','date')}
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

export default SubcontractorComplianceChecklist;
