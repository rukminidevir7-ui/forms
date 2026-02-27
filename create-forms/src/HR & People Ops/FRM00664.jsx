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
  department: Yup.string(),
  jobTitle: Yup.string(),
  exitDate: Yup.string(),
  primaryReasonForExit: Yup.string(),
  secondaryReasonForExit: Yup.string(),
  overallExperienceRating: Yup.string(),
  feedbackOnLeadership: Yup.string(),
  feedbackOnWorkEnvironment: Yup.string(),
  compensationSatisfactionLevel: Yup.string(),
  rehireEligibilityStatus: Yup.string(),
  improvementAreasIdentified: Yup.string(),
  hrRemarks: Yup.string(),
  recordClosureDate: Yup.string(),
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  formId: 'FRM-00664',
  employeeFullName: '',
  employeeID: '',
  department: '',
  jobTitle: '',
  exitDate: '',
  primaryReasonForExit: '',
  secondaryReasonForExit: '',
  overallExperienceRating: '',
  feedbackOnLeadership: '',
  feedbackOnWorkEnvironment: '',
  compensationSatisfactionLevel: '',
  rehireEligibilityStatus: '',
  improvementAreasIdentified: '',
  hrRemarks: '',
  recordClosureDate: '',
  customFields: [],
  signatures: { hrRep: { type: '', data: '', name: '' } }
};

const FRM00664 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue) => (
    <ModernA4Template formId="FRM-00664" title="Exit Interview – Report/Record Form" department="HR & People Ops">
      <div className="form-section">
        <h3 className="form-section-title">Employee Information</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label required">Employee Full Name</label>{isPrintMode ? <div className="print-value">{values.employeeFullName || '___________________'}</div> : <Field name="employeeFullName" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label required">Employee ID</label>{isPrintMode ? <div className="print-value">{values.employeeID || '___________________'}</div> : <Field name="employeeID" className="form-input"/>}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field"><label className="form-label">Department</label>{isPrintMode ? <div className="print-value">{values.department || '___________________'}</div> : <Field name="department" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">Job Title</label>{isPrintMode ? <div className="print-value">{values.jobTitle || '___________________'}</div> : <Field name="jobTitle" className="form-input"/>}</div>
          </div>
        </div>
      </div>
      <div className="form-section">
        <h3 className="form-section-title">Exit Record</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label">Exit Date</label>{isPrintMode ? <div className="print-value">{values.exitDate || '___________________'}</div> : <Field name="exitDate" type="date" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">Primary Reason for Exit</label>{isPrintMode ? <div className="print-value">{values.primaryReasonForExit || '___________________'}</div> : <Field name="primaryReasonForExit" as="select" className="form-input"><option value="">Select</option><option value="Better Opportunity">Better Opportunity</option><option value="Higher Salary">Higher Salary</option><option value="Career Growth">Career Growth</option><option value="Work-Life Balance">Work-Life Balance</option><option value="Relocation">Relocation</option><option value="Other">Other</option></Field>}</div>
          </div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Secondary Reason for Exit</label>{isPrintMode ? <div className="print-value">{values.secondaryReasonForExit || '___________________'}</div> : <Field name="secondaryReasonForExit" as="textarea" className="form-input" style={{ minHeight: '60px' }}/>}</div>
        </div>
      </div>
      <div className="form-section">
        <h3 className="form-section-title">Experience & Feedback Ratings</h3>
        <div className="form-fields">
          <div className="form-field"><label className="form-label">Overall Experience Rating (1-5)</label>{isPrintMode ? <div className="print-value">{values.overallExperienceRating || '___________________'}</div> : <Field name="overallExperienceRating" as="select" className="form-input"><option value="">Select</option><option value="1">1 - Very Poor</option><option value="2">2 - Poor</option><option value="3">3 - Average</option><option value="4">4 - Good</option><option value="5">5 - Excellent</option></Field>}</div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Feedback on Leadership</label>{isPrintMode ? <div className="print-value">{values.feedbackOnLeadership || '___________________'}</div> : <Field name="feedbackOnLeadership" as="textarea" className="form-input" style={{ minHeight: '60px' }}/>}</div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Feedback on Work Environment</label>{isPrintMode ? <div className="print-value">{values.feedbackOnWorkEnvironment || '___________________'}</div> : <Field name="feedbackOnWorkEnvironment" as="textarea" className="form-input" style={{ minHeight: '60px' }}/>}</div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Compensation Satisfaction Level (1-5)</label>{isPrintMode ? <div className="print-value">{values.compensationSatisfactionLevel || '___________________'}</div> : <Field name="compensationSatisfactionLevel" as="select" className="form-input"><option value="">Select</option><option value="1">1 - Very Dissatisfied</option><option value="2">2 - Dissatisfied</option><option value="3">3 - Neutral</option><option value="4">4 - Satisfied</option><option value="5">5 - Very Satisfied</option></Field>}</div>
        </div>
      </div>
      <div className="form-section">
        <h3 className="form-section-title">Rehire & Improvement</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label">Rehire Eligibility Status</label>{isPrintMode ? <div className="print-value">{values.rehireEligibilityStatus || '___________________'}</div> : <Field name="rehireEligibilityStatus" as="select" className="form-input"><option value="">Select</option><option value="Eligible">Eligible</option><option value="Not Eligible">Not Eligible</option><option value="Conditional">Conditional</option></Field>}</div>
          </div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Improvement Areas Identified</label>{isPrintMode ? <div className="print-value">{values.improvementAreasIdentified || '___________________'}</div> : <Field name="improvementAreasIdentified" as="textarea" className="form-input" style={{ minHeight: '70px' }}/>}</div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">HR Remarks</label>{isPrintMode ? <div className="print-value">{values.hrRemarks || '___________________'}</div> : <Field name="hrRemarks" as="textarea" className="form-input" style={{ minHeight: '70px' }}/>}</div>
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
        <h3 className="form-section-title">Record Closure</h3>
        <div className="form-fields">
          <div className="form-field"><label className="form-label">Record Closure Date</label>{isPrintMode ? <div className="print-value">{values.recordClosureDate || '___________________'}</div> : <Field name="recordClosureDate" type="date" className="form-input"/>}</div>
          {!isPrintMode && (
            <div style={{ marginTop: '15px' }}>
              <SignatureComponent name="HR Record Keeper" onChange={(sig) => setFieldValue('signatures.hrRep', sig)} value={values.signatures.hrRep} />
            </div>
          )}
          {isPrintMode && values.signatures.hrRep?.data && (
            <div className="print-signatures" style={{ marginTop: '15px' }}>
              <img src={values.signatures.hrRep.data} alt="Signature" style={{ maxHeight: 80 }} />
            </div>
          )}
        </div>
      </div>
      {!isPrintMode && (<div className="form-actions"><button type="submit" className="btn-submit">💾 Save Form</button></div>)}
    </ModernA4Template>
  );

  return (
    <ModernFormWrapper formId="FRM-00664" title="Exit Interview – Report/Record Form">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => { console.log('Submit FRM00664', values); alert('Saved'); }}>
        {({ values, setFieldValue }) => (<Form>{renderFormContent(values, setFieldValue)}</Form>)}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00664;
