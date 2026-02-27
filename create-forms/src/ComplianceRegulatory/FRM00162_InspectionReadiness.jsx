// FRM00162_InspectionReadiness.jsx
// FRM-00162 – Inspection Readiness – Checklist Form

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
  inspectionDate: Yup.string().required('Required'),
  departmentFunction: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  inspectionType: Yup.string().required('Required'),
  inspectionPeriod: Yup.string().required('Required'),

  // Checklist Details
  checklistReference: Yup.string().required('Required'),
  checklistDescription: Yup.string().required('Required'),
  checklistStatus: Yup.string().required('Required'),
  checklistRemarks: Yup.string().required('Required'),

  // Summary
  overallReadinessStatus: Yup.string().required('Required'),
  keyObservations: Yup.string().required('Required'),
  actionsRequired: Yup.string().required('Required'),

  // Authorization
  preparedByAuthorization: Yup.string().required('Required'),
  reviewedBy: Yup.string().required('Required'),
  approvedBy: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  inspectionDate: '',
  departmentFunction: '',
  preparedBy: '',
  employeeId: '',
  contactNumber: '',
  inspectionType: '',
  inspectionPeriod: '',

  checklistReference: '',
  checklistDescription: '',
  checklistStatus: '',
  checklistRemarks: '',

  overallReadinessStatus: '',
  keyObservations: '',
  actionsRequired: '',

  preparedByAuthorization: '',
  reviewedBy: '',
  approvedBy: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00162_InspectionReadiness = () => {

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
      formId="FRM-00162"
      title="Inspection Readiness – Checklist Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Inspection readiness checklist submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00162"
              title="Inspection Readiness Checklist"
              department="Compliance & Regulatory – Regulatory Filings"
            >

              {/* Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'inspectionDate','Date','date')}
                  {field(values,'departmentFunction','Department / Function')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'contactNumber','Contact')}
                  {select(values,'inspectionType','Inspection Type',['Internal Audit','Regulatory Inspection','Surprise Inspection','Certification Audit'])}
                  {field(values,'inspectionPeriod','Inspection Period')}
                </div>
              </div>

              {/* Checklist Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Inspection Checklist Details</h3>
                <div className="form-fields">
                  {field(values,'checklistReference','Checklist Item No.')}
                  {textarea(values,'checklistDescription','Checklist Item Description')}
                  {select(values,'checklistStatus','Status',['Yes','No','N.A.'])}
                  {textarea(values,'checklistRemarks','Remarks')}
                </div>
              </div>

              {/* Summary */}
              <div className="form-section">
                <h3 className="form-section-title">3. Summary</h3>
                <div className="form-fields">
                  {select(values,'overallReadinessStatus','Overall Readiness Status',['Ready','Partially Ready','Not Ready'])}
                  {textarea(values,'keyObservations','Key Observations')}
                  {textarea(values,'actionsRequired','Actions Required')}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">4. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByAuthorization','Prepared By')}
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
                    Submit Inspection Readiness Checklist
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

export default FRM00162_InspectionReadiness;
