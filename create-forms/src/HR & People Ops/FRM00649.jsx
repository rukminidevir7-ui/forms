import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import SignatureComponent from '../components/SignatureComponent';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({
  formId: Yup.string().required('Form ID is required'),
  employeeFullName: Yup.string().required('Employee Full Name is required'),
  employeeID: Yup.string().required('Employee ID is required'),
  currentJobTitle: Yup.string().required('Current Job Title is required'),
  currentDepartment: Yup.string().required('Current Department is required'),
  proposedJobTitle: Yup.string().required('Proposed Job Title is required'),
  proposedDepartment: Yup.string().required('Proposed Department is required'),
  dateOfJoining: Yup.string().required('Date of Joining is required'),
  yearsInCurrentRole: Yup.string(),
  lastPerformanceRating: Yup.string(),
  keyAchievements: Yup.string(),
  leadershipSkillAssessment: Yup.string(),
  proposedEffectiveDate: Yup.string(),
  proposedRevisedSalary: Yup.string(),
  reportingManagerName: Yup.string(),
  hrReviewRemarks: Yup.string(),
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  formId: 'FRM-00649',
  employeeFullName: '',
  employeeID: '',
  currentJobTitle: '',
  currentDepartment: '',
  proposedJobTitle: '',
  proposedDepartment: '',
  dateOfJoining: '',
  yearsInCurrentRole: '',
  lastPerformanceRating: '',
  keyAchievements: '',
  leadershipSkillAssessment: '',
  proposedEffectiveDate: '',
  proposedRevisedSalary: '',
  reportingManagerName: '',
  hrReviewRemarks: '',
  customFields: [],
  signatures: { recordKeeper: { type: '', data: '', name: '' } }
};

const FRM00649 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue) => (
    <ModernA4Template formId="FRM-00649" title="Promotion Recommendation – Report/Record" department="HR & People Ops">

      <div className="form-section">
        <h3 className="form-section-title">Employee Information</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label required">Employee Full Name</label>{isPrintMode ? <div className="print-value">{values.employeeFullName || '___________________'}</div> : <Field name="employeeFullName" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label required">Employee ID</label>{isPrintMode ? <div className="print-value">{values.employeeID || '___________________'}</div> : <Field name="employeeID" className="form-input"/>}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field"><label className="form-label required">Date of Joining</label>{isPrintMode ? <div className="print-value">{values.dateOfJoining || '___________________'}</div> : <Field name="dateOfJoining" type="date" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">Years in Current Role</label>{isPrintMode ? <div className="print-value">{values.yearsInCurrentRole || '___________________'}</div> : <Field name="yearsInCurrentRole" className="form-input"/>}</div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Current Position Details</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label required">Current Job Title</label>{isPrintMode ? <div className="print-value">{values.currentJobTitle || '___________________'}</div> : <Field name="currentJobTitle" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label required">Current Department</label>{isPrintMode ? <div className="print-value">{values.currentDepartment || '___________________'}</div> : <Field name="currentDepartment" className="form-input"/>}</div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Promotion Details</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label required">Proposed Job Title (Promotion To)</label>{isPrintMode ? <div className="print-value">{values.proposedJobTitle || '___________________'}</div> : <Field name="proposedJobTitle" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label required">Proposed Department</label>{isPrintMode ? <div className="print-value">{values.proposedDepartment || '___________________'}</div> : <Field name="proposedDepartment" className="form-input"/>}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field"><label className="form-label">Proposed Effective Date of Promotion</label>{isPrintMode ? <div className="print-value">{values.proposedEffectiveDate || '___________________'}</div> : <Field name="proposedEffectiveDate" type="date" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">Proposed Revised Salary</label>{isPrintMode ? <div className="print-value">{values.proposedRevisedSalary || '___________________'}</div> : <Field name="proposedRevisedSalary" className="form-input"/>}</div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Performance & Assessment</h3>
        <div className="form-fields">
          <div className="form-field"><label className="form-label">Last Performance Rating</label>{isPrintMode ? <div className="print-value">{values.lastPerformanceRating || '___________________'}</div> : <Field name="lastPerformanceRating" className="form-input"/>}</div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Key Achievements Summary</label>{isPrintMode ? <div className="print-value">{values.keyAchievements || '___________________'}</div> : <Field name="keyAchievements" as="textarea" className="form-input" style={{ minHeight: '80px' }}/>}</div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Leadership/Skill Competency Assessment</label>{isPrintMode ? <div className="print-value">{values.leadershipSkillAssessment || '___________________'}</div> : <Field name="leadershipSkillAssessment" as="textarea" className="form-input" style={{ minHeight: '80px' }}/>}</div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Authorization & Remarks</h3>
        <div className="form-fields">
          <div className="form-field"><label className="form-label">Reporting Manager Name</label>{isPrintMode ? <div className="print-value">{values.reportingManagerName || '___________________'}</div> : <Field name="reportingManagerName" className="form-input"/>}</div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">HR Review Remarks</label>{isPrintMode ? <div className="print-value">{values.hrReviewRemarks || '___________________'}</div> : <Field name="hrReviewRemarks" as="textarea" className="form-input" style={{ minHeight: '80px' }}/>}</div>
        </div>
      </div>

      {!isPrintMode && (
        <div className="form-section">
          <h3 className="form-section-title">➕ Additional Custom Fields</h3>
          <FieldArray name="customFields">{(helpers) => (
            <div>
              {values.customFields && values.customFields.map((f, i) => (
                <div key={f.id || i} className="custom-field-row">
                  <div className="form-field"><Field name={`customFields.${i}.fieldName`} className="form-input" placeholder="Field Name"/></div>
                  <div className="form-field" style={{ flex: 2 }}><Field name={`customFields.${i}.fieldValue`} className="form-input" placeholder="Field Value"/></div>
                  <button type="button" className="btn-remove" onClick={() => helpers.remove(i)}>✕ Remove</button>
                </div>
              ))}
              <button type="button" className="btn-add-field" onClick={() => helpers.push({ id: Math.random().toString(36).slice(2), fieldName: '', fieldValue: '' })}>➕ Add Field</button>
            </div>
          )}</FieldArray>
        </div>
      )}

      <div className="form-section">
        <h3 className="form-section-title">Record Keeper</h3>
        {!isPrintMode ? (
          <div className="form-fields">
            <SignatureComponent name="Record Keeper" onChange={(sig) => setFieldValue('signatures.recordKeeper', sig)} value={values.signatures.recordKeeper} />
            <div style={{ marginTop: '15px' }}><label className="form-label">Name (Print)</label><Field name="signatures.recordKeeper.name" className="form-input"/></div>
          </div>
        ) : (
          <div className="print-signatures">{values.signatures.recordKeeper?.data && <img src={values.signatures.recordKeeper.data} alt="Signature" style={{ maxHeight: 80 }} />}</div>
        )}
      </div>

      {!isPrintMode && (<div className="form-actions"><button type="submit" className="btn-submit">💾 Save Form</button></div>)}

    </ModernA4Template>
  );

  return (
    <ModernFormWrapper formId="FRM-00649" title="Promotion Recommendation – Report/Record">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => { console.log('Submit FRM00649', values); alert('Saved'); }}>
        {({ values, setFieldValue }) => (<Form>{renderFormContent(values, setFieldValue)}</Form>)}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00649;
