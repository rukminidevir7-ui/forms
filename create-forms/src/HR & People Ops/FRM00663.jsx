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
  exitInterviewConductedBy: Yup.string(),
  interviewDate: Yup.string(),
  keyFeedbackSummary: Yup.string(),
  retentionRiskIdentified: Yup.string(),
  counterOfferDiscussed: Yup.string(),
  workplaceConcernIdentified: Yup.string(),
  actionItemsIdentified: Yup.string(),
  escalationRequired: Yup.string(),
  hrRepresentativeName: Yup.string(),
  approvingAuthorityName: Yup.string(),
  approvalDate: Yup.string(),
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  formId: 'FRM-00663',
  employeeFullName: '',
  employeeID: '',
  department: '',
  jobTitle: '',
  exitInterviewConductedBy: '',
  interviewDate: '',
  keyFeedbackSummary: '',
  retentionRiskIdentified: '',
  counterOfferDiscussed: '',
  workplaceConcernIdentified: '',
  actionItemsIdentified: '',
  escalationRequired: '',
  hrRepresentativeName: '',
  approvingAuthorityName: '',
  approvalDate: '',
  customFields: [],
  signatures: { approver: { type: '', data: '', name: '' } }
};

const FRM00663 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue) => (
    <ModernA4Template formId="FRM-00663" title="Exit Interview – Approval/Authorization Form" department="HR & People Ops">
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
        <h3 className="form-section-title">Interview Details</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label">Exit Interview Conducted By</label>{isPrintMode ? <div className="print-value">{values.exitInterviewConductedBy || '___________________'}</div> : <Field name="exitInterviewConductedBy" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">Interview Date</label>{isPrintMode ? <div className="print-value">{values.interviewDate || '___________________'}</div> : <Field name="interviewDate" type="date" className="form-input"/>}</div>
          </div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Key Feedback Summary</label>{isPrintMode ? <div className="print-value">{values.keyFeedbackSummary || '___________________'}</div> : <Field name="keyFeedbackSummary" as="textarea" className="form-input" style={{ minHeight: '100px' }}/>}</div>
        </div>
      </div>
      <div className="form-section">
        <h3 className="form-section-title">Risk Assessment & Action Items</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label">Retention Risk Identified (Yes/No)</label>{isPrintMode ? <div className="print-value">{values.retentionRiskIdentified || '___________________'}</div> : <Field name="retentionRiskIdentified" as="select" className="form-input"><option value="">Select</option><option value="Yes">Yes</option><option value="No">No</option></Field>}</div>
            <div className="form-field"><label className="form-label">Counter Offer Discussed (Yes/No)</label>{isPrintMode ? <div className="print-value">{values.counterOfferDiscussed || '___________________'}</div> : <Field name="counterOfferDiscussed" as="select" className="form-input"><option value="">Select</option><option value="Yes">Yes</option><option value="No">No</option></Field>}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field"><label className="form-label">Workplace Concern Identified (Yes/No)</label>{isPrintMode ? <div className="print-value">{values.workplaceConcernIdentified || '___________________'}</div> : <Field name="workplaceConcernIdentified" as="select" className="form-input"><option value="">Select</option><option value="Yes">Yes</option><option value="No">No</option></Field>}</div>
            <div className="form-field"><label className="form-label">Escalation Required (Yes/No)</label>{isPrintMode ? <div className="print-value">{values.escalationRequired || '___________________'}</div> : <Field name="escalationRequired" as="select" className="form-input"><option value="">Select</option><option value="Yes">Yes</option><option value="No">No</option></Field>}</div>
          </div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Action Items Identified</label>{isPrintMode ? <div className="print-value">{values.actionItemsIdentified || '___________________'}</div> : <Field name="actionItemsIdentified" as="textarea" className="form-input" style={{ minHeight: '70px' }}/>}</div>
        </div>
      </div>
      <div className="form-section">
        <h3 className="form-section-title">Approval & Authorization</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label">HR Representative Name</label>{isPrintMode ? <div className="print-value">{values.hrRepresentativeName || '___________________'}</div> : <Field name="hrRepresentativeName" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">Approving Authority Name</label>{isPrintMode ? <div className="print-value">{values.approvingAuthorityName || '___________________'}</div> : <Field name="approvingAuthorityName" className="form-input"/>}</div>
          </div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Approval Date</label>{isPrintMode ? <div className="print-value">{values.approvalDate || '___________________'}</div> : <Field name="approvalDate" type="date" className="form-input"/>}</div>
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
        <h3 className="form-section-title">Approval Signature</h3>
        {!isPrintMode ? (
          <div className="form-fields">
            <SignatureComponent name="Approving Authority" onChange={(sig) => setFieldValue('signatures.approver', sig)} value={values.signatures.approver} />
          </div>
        ) : (
          <div className="print-signatures">{values.signatures.approver?.data && <img src={values.signatures.approver.data} alt="Signature" style={{ maxHeight: 80 }} />}</div>
        )}
      </div>
      {!isPrintMode && (<div className="form-actions"><button type="submit" className="btn-submit">💾 Save Form</button></div>)}
    </ModernA4Template>
  );

  return (
    <ModernFormWrapper formId="FRM-00663" title="Exit Interview – Approval/Authorization Form">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => { console.log('Submit FRM00663', values); alert('Saved'); }}>
        {({ values, setFieldValue }) => (<Form>{renderFormContent(values, setFieldValue)}</Form>)}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00663;
