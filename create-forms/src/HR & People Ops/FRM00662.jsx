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
  reportingManagerName: Yup.string(),
  resignationDate: Yup.string(),
  lastWorkingDay: Yup.string(),
  reasonForLeavingPrimary: Yup.string(),
  reasonForLeavingSecondary: Yup.string(),
  interviewPreferredMode: Yup.string(),
  interviewPreferredDate: Yup.string(),
  willingToRejoinInFuture: Yup.string(),
  feedbackOnManager: Yup.string(),
  feedbackOnOrganization: Yup.string(),
  employeeSignatureDate: Yup.string(),
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  formId: 'FRM-00662',
  employeeFullName: '',
  employeeID: '',
  department: '',
  jobTitle: '',
  reportingManagerName: '',
  resignationDate: '',
  lastWorkingDay: '',
  reasonForLeavingPrimary: '',
  reasonForLeavingSecondary: '',
  interviewPreferredMode: '',
  interviewPreferredDate: '',
  willingToRejoinInFuture: '',
  feedbackOnManager: '',
  feedbackOnOrganization: '',
  employeeSignatureDate: '',
  customFields: [],
  signatures: { employee: { type: '', data: '', name: '' } }
};

const FRM00662 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue) => (
    <ModernA4Template formId="FRM-00662" title="Exit Interview – Request/Initiation Form" department="HR & People Ops">
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
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Reporting Manager Name</label>{isPrintMode ? <div className="print-value">{values.reportingManagerName || '___________________'}</div> : <Field name="reportingManagerName" className="form-input"/>}</div>
        </div>
      </div>
      <div className="form-section">
        <h3 className="form-section-title">Exit Details</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label">Resignation Date</label>{isPrintMode ? <div className="print-value">{values.resignationDate || '___________________'}</div> : <Field name="resignationDate" type="date" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">Last Working Day</label>{isPrintMode ? <div className="print-value">{values.lastWorkingDay || '___________________'}</div> : <Field name="lastWorkingDay" type="date" className="form-input"/>}</div>
          </div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Primary Reason for Leaving</label>{isPrintMode ? <div className="print-value">{values.reasonForLeavingPrimary || '___________________'}</div> : <Field name="reasonForLeavingPrimary" as="select" className="form-input"><option value="">Select</option><option value="Better Opportunity">Better Opportunity</option><option value="Higher Salary">Higher Salary</option><option value="Career Growth">Career Growth</option><option value="Work-Life Balance">Work-Life Balance</option><option value="Relocation">Relocation</option><option value="Other">Other</option></Field>}</div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Secondary Reason for Leaving</label>{isPrintMode ? <div className="print-value">{values.reasonForLeavingSecondary || '___________________'}</div> : <Field name="reasonForLeavingSecondary" as="textarea" className="form-input" style={{ minHeight: '60px' }}/>}</div>
        </div>
      </div>
      <div className="form-section">
        <h3 className="form-section-title">Interview Preferences</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label">Interview Preferred Mode</label>{isPrintMode ? <div className="print-value">{values.interviewPreferredMode || '___________________'}</div> : <Field name="interviewPreferredMode" as="select" className="form-input"><option value="">Select</option><option value="In-Person">In-Person</option><option value="Phone">Phone</option><option value="Video Call">Video Call</option><option value="Email">Email</option></Field>}</div>
            <div className="form-field"><label className="form-label">Interview Preferred Date</label>{isPrintMode ? <div className="print-value">{values.interviewPreferredDate || '___________________'}</div> : <Field name="interviewPreferredDate" type="date" className="form-input"/>}</div>
          </div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Willing to Rejoin in Future (Yes/No)</label>{isPrintMode ? <div className="print-value">{values.willingToRejoinInFuture || '___________________'}</div> : <Field name="willingToRejoinInFuture" as="select" className="form-input"><option value="">Select</option><option value="Yes">Yes</option><option value="No">No</option><option value="Maybe">Maybe</option></Field>}</div>
        </div>
      </div>
      <div className="form-section">
        <h3 className="form-section-title">Feedback</h3>
        <div className="form-fields">
          <div className="form-field"><label className="form-label">Feedback on Manager</label>{isPrintMode ? <div className="print-value">{values.feedbackOnManager || '___________________'}</div> : <Field name="feedbackOnManager" as="textarea" className="form-input" style={{ minHeight: '70px' }}/>}</div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Feedback on Organization</label>{isPrintMode ? <div className="print-value">{values.feedbackOnOrganization || '___________________'}</div> : <Field name="feedbackOnOrganization" as="textarea" className="form-input" style={{ minHeight: '70px' }}/>}</div>
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
        <h3 className="form-section-title">Employee Signature</h3>
        {!isPrintMode ? (
          <div className="form-fields">
            <SignatureComponent name="Employee" onChange={(sig) => setFieldValue('signatures.employee', sig)} value={values.signatures.employee} />
            <div style={{ marginTop: '15px' }}><label className="form-label">Employee Signature Date</label><Field name="employeeSignatureDate" type="date" className="form-input"/></div>
          </div>
        ) : (
          <div className="print-signatures">{values.signatures.employee?.data && <img src={values.signatures.employee.data} alt="Signature" style={{ maxHeight: 80 }} />}</div>
        )}
      </div>
      {!isPrintMode && (<div className="form-actions"><button type="submit" className="btn-submit">💾 Save Form</button></div>)}
    </ModernA4Template>
  );

  return (
    <ModernFormWrapper formId="FRM-00662" title="Exit Interview – Request/Initiation Form">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => { console.log('Submit FRM00662', values); alert('Saved'); }}>
        {({ values, setFieldValue }) => (<Form>{renderFormContent(values, setFieldValue)}</Form>)}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00662;
