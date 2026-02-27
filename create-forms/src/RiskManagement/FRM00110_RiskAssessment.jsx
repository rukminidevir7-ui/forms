// FRM00110_RiskAssessment.jsx
// FRM-00110 – Risk Assessment – Checklist Form

import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
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
  assessmentDate: Yup.string().required('Required'),
  departmentFunction: Yup.string().required('Required'),
  assessorName: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  assessmentScope: Yup.string().required('Required'),
  assessmentPeriod: Yup.string().required('Required'),

  // Checklist
  checklistItems: Yup.array().of(
    Yup.object({
      riskArea: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      status: Yup.string().required('Required'),
      remarks: Yup.string()
    })
  ),

  // Summary
  overallRiskLevel: Yup.string().required('Required'),
  keyObservations: Yup.string().required('Required'),
  recommendedActions: Yup.string().required('Required'),

  // Authorization
  assessedBy: Yup.string().required('Required'),
  reviewedBy: Yup.string().required('Required'),
  approvedBy: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  assessmentDate: '',
  departmentFunction: '',
  assessorName: '',
  employeeId: '',
  contactNumber: '',
  assessmentScope: '',
  assessmentPeriod: '',

  checklistItems: [
    { riskArea: '', description: '', status: '', remarks: '' }
  ],

  overallRiskLevel: '',
  keyObservations: '',
  recommendedActions: '',

  assessedBy: '',
  reviewedBy: '',
  approvedBy: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00110_RiskAssessment = () => {

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
      formId="FRM-00110"
      title="Risk Assessment – Checklist Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Risk assessment checklist submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00110"
              title="Risk Assessment – Checklist"
              department="Risk Management – Enterprise Risk"
            >

              {/* Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'assessmentDate','Date','date')}
                  {field(values,'departmentFunction','Department / Function')}
                  {field(values,'assessorName','Assessor Name')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'contactNumber','Contact')}
                  {field(values,'assessmentScope','Assessment Scope')}
                  {field(values,'assessmentPeriod','Assessment Period')}
                </div>
              </div>

              {/* Checklist Section */}
              <div className="form-section">
                <h3 className="form-section-title">2. Risk Assessment Checklist</h3>

                <FieldArray name="checklistItems">
                  {({ push, remove }) => (
                    <div>
                      {values.checklistItems.map((item, index) => (
                        <div key={index} className="form-section" style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
                          <div className="form-fields">
                            {field(values,`checklistItems.${index}.riskArea`,'Risk Area / Item')}
                            {textarea(values,`checklistItems.${index}.description`,'Description')}
                            {select(values,`checklistItems.${index}.status`,'Status',['Yes','No'])}
                            {textarea(values,`checklistItems.${index}.remarks`,'Remarks')}
                          </div>
                          {!isPrintMode && (
                            <button type="button" className="btn-remove" onClick={() => remove(index)}>Remove</button>
                          )}
                        </div>
                      ))}
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-add-field"
                          onClick={() => push({ riskArea: '', description: '', status: '', remarks: '' })}
                        >
                          Add Checklist Item
                        </button>
                      )}
                    </div>
                  )}
                </FieldArray>
              </div>

              {/* Summary */}
              <div className="form-section">
                <h3 className="form-section-title">3. Summary</h3>
                <div className="form-fields">
                  {select(values,'overallRiskLevel','Overall Risk Level',['Low','Medium','High','Critical'])}
                  {textarea(values,'keyObservations','Key Observations')}
                  {textarea(values,'recommendedActions','Recommended Actions')}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">4. Authorization</h3>
                <div className="form-fields">
                  {field(values,'assessedBy','Assessed By')}
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
                    Submit Assessment
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

export default FRM00110_RiskAssessment;
