// DemobilizationChecklist.jsx
// FRM-01114 – Demobilization Checklist

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

const yesNoOptions = ['Yes', 'No'];

const validationSchema = Yup.object({

  // Project Information
  projectName: Yup.string().required('Required'),
  projectLocation: Yup.string().required('Required'),
  clientName: Yup.string().required('Required'),
  subcontractorName: Yup.string().required('Required'),
  demobilizationDate: Yup.string().required('Required'),

  // Checklist
  workCompleted: Yup.string().required('Required'),
  clientAcceptance: Yup.string().required('Required'),
  siteCleared: Yup.string().required('Required'),
  materialsReturned: Yup.string().required('Required'),
  equipmentRemoved: Yup.string().required('Required'),
  temporaryFacilitiesRemoved: Yup.string().required('Required'),
  safetyClearance: Yup.string().required('Required'),
  permitsClosed: Yup.string().required('Required'),
  finalMeasurements: Yup.string().required('Required'),
  pendingIssuesDocumented: Yup.string().required('Required'),

  // Commercial Closure
  finalInvoiceSubmitted: Yup.string().required('Required'),
  finalPaymentStatus: Yup.string().required('Required'),
  retentionDeductions: Yup.string().required('Required'),

  // Remarks
  comments: Yup.string().required('Required'),

  // Reusable
  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  projectName: '',
  projectLocation: '',
  clientName: '',
  subcontractorName: '',
  demobilizationDate: '',

  workCompleted: '',
  clientAcceptance: '',
  siteCleared: '',
  materialsReturned: '',
  equipmentRemoved: '',
  temporaryFacilitiesRemoved: '',
  safetyClearance: '',
  permitsClosed: '',
  finalMeasurements: '',
  pendingIssuesDocumented: '',

  finalInvoiceSubmitted: '',
  finalPaymentStatus: '',
  retentionDeductions: '',

  comments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const DemobilizationChecklist = () => {

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

  const yesNoField = (values, name, label) => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '___________________'}</div>
      ) : (
        <>
          <Field as="select" name={name} className="form-input">
            <option value="">-- Select --</option>
            {yesNoOptions.map(opt => (
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
      formId="FRM-01114"
      title="Demobilization Checklist"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Demobilization checklist saved successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-01114"
              title="Demobilization Checklist"
              department="Subcontractor & Contracting"
            >

              {/* Project Information */}
              <div className="form-section">
                <h3 className="form-section-title">Project Information</h3>
                <div className="form-fields">
                  {field(values,'projectName','Project Name')}
                  {field(values,'projectLocation','Project Location')}
                  {field(values,'clientName','Client Name')}
                  {field(values,'subcontractorName','Subcontractor Name')}
                  {field(values,'demobilizationDate','Demobilization Date','date')}
                </div>
              </div>

              {/* Checklist */}
              <div className="form-section">
                <h3 className="form-section-title">Demobilization Checklist</h3>
                <div className="form-fields">
                  {yesNoField(values,'workCompleted','All work completed as per scope')}
                  {yesNoField(values,'clientAcceptance','Client acceptance obtained')}
                  {yesNoField(values,'siteCleared','Site cleared and cleaned')}
                  {yesNoField(values,'materialsReturned','All materials returned / accounted')}
                  {yesNoField(values,'equipmentRemoved','Equipment removed from site')}
                  {yesNoField(values,'temporaryFacilitiesRemoved','Temporary facilities removed')}
                  {yesNoField(values,'safetyClearance','Safety clearance obtained')}
                  {yesNoField(values,'permitsClosed','All permits closed')}
                  {yesNoField(values,'finalMeasurements','Final measurements completed')}
                  {yesNoField(values,'pendingIssuesDocumented','Pending issues documented')}
                </div>
              </div>

              {/* Commercial Closure */}
              <div className="form-section">
                <h3 className="form-section-title">Commercial Closure</h3>
                <div className="form-fields">
                  {yesNoField(values,'finalInvoiceSubmitted','Final invoice submitted')}
                  {field(values,'finalPaymentStatus','Final payment status')}
                  {field(values,'retentionDeductions','Retention / Deductions')}
                </div>
              </div>

              {/* Remarks */}
              <div className="form-section">
                <h3 className="form-section-title">Remarks</h3>
                <div className="form-fields">
                  {textarea(values,'comments','Comments')}
                </div>
              </div>

              {/* Reusable Universal Components */}
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

export default DemobilizationChecklist;
