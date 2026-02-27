// MobilizationRequestForm.jsx
// FRM-01113 – Mobilization Request Form

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

  // Project Information
  projectName: Yup.string().required('Required'),
  projectLocation: Yup.string().required('Required'),
  clientName: Yup.string().required('Required'),
  mobilizationRequiredDate: Yup.string().required('Required'),

  // Subcontractor Details
  companyName: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  phoneNumber: Yup.string().required('Required'),
  emailId: Yup.string().email('Invalid').required('Required'),

  // Mobilization Details
  scopeOfMobilization: Yup.string().required('Required'),
  manpowerRequirement: Yup.string().required('Required'),
  equipmentResourcesRequired: Yup.string().required('Required'),
  siteFacilitiesRequired: Yup.string().required('Required'),
  logisticsRequirements: Yup.string().required('Required'),
  estimatedMobilizationCost: Yup.string().required('Required'),

  // Risks / Compliance
  safetyRequirements: Yup.string().required('Required'),
  permitsRequired: Yup.string().required('Required'),
  keyRisks: Yup.string().required('Required'),

  // Declaration
  requestedBy: Yup.string().required('Required'),
  designation: Yup.string().required('Required'),
  requestDate: Yup.string().required('Required'),

  // Reusable Sections
  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  projectName: '',
  projectLocation: '',
  clientName: '',
  mobilizationRequiredDate: '',

  companyName: '',
  contactPerson: '',
  phoneNumber: '',
  emailId: '',

  scopeOfMobilization: '',
  manpowerRequirement: '',
  equipmentResourcesRequired: '',
  siteFacilitiesRequired: '',
  logisticsRequirements: '',
  estimatedMobilizationCost: '',

  safetyRequirements: '',
  permitsRequired: '',
  keyRisks: '',

  requestedBy: '',
  designation: '',
  requestDate: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const MobilizationRequestForm = () => {

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

  return (

    <ModernFormWrapper
      formId="FRM-01113"
      title="Mobilization Request Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Mobilization request form saved successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-01113"
              title="Mobilization Request Form"
              department="Subcontractor & Contracting"
            >

              {/* Project Information */}
              <div className="form-section">
                <h3 className="form-section-title">Project Information</h3>
                <div className="form-fields">
                  {field(values,'projectName','Project Name')}
                  {field(values,'projectLocation','Project Location')}
                  {field(values,'clientName','Client Name')}
                  {field(values,'mobilizationRequiredDate','Mobilization Required Date','date')}
                </div>
              </div>

              {/* Subcontractor Details */}
              <div className="form-section">
                <h3 className="form-section-title">Subcontractor Details</h3>
                <div className="form-fields">
                  {field(values,'companyName','Company Name')}
                  {field(values,'contactPerson','Contact Person')}
                  {field(values,'phoneNumber','Phone Number')}
                  {field(values,'emailId','Email ID')}
                </div>
              </div>

              {/* Mobilization Details */}
              <div className="form-section">
                <h3 className="form-section-title">Mobilization Details</h3>
                <div className="form-fields">
                  {textarea(values,'scopeOfMobilization','Scope of Mobilization')}
                  {textarea(values,'manpowerRequirement','Manpower Requirement')}
                  {textarea(values,'equipmentResourcesRequired','Equipment / Resources Required')}
                  {textarea(values,'siteFacilitiesRequired','Site Facilities Required')}
                  {textarea(values,'logisticsRequirements','Logistics Requirements')}
                  {field(values,'estimatedMobilizationCost','Estimated Mobilization Cost')}
                </div>
              </div>

              {/* Risks / Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">Risks / Compliance</h3>
                <div className="form-fields">
                  {textarea(values,'safetyRequirements','Safety Requirements')}
                  {textarea(values,'permitsRequired','Permits Required')}
                  {textarea(values,'keyRisks','Key Risks')}
                </div>
              </div>

              {/* Declaration */}
              <div className="form-section">
                <h3 className="form-section-title">Request Declaration</h3>
                <div className="form-fields">
                  {field(values,'requestedBy','Requested By')}
                  {field(values,'designation','Designation')}
                  {field(values,'requestDate','Date','date')}
                </div>
              </div>

              {/* Reusable Universal Components */}
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

export default MobilizationRequestForm;
