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
  summaryOfAllegation: Yup.string(),
  investigationConductedBy: Yup.string(),
  investigationFindingsSummary: Yup.string(),
  policyClauseViolated: Yup.string(),
  severityLevel: Yup.string(),
  recommendedAction: Yup.string(),
  finalApprovedDisciplinaryAction: Yup.string(),
  effectiveDate: Yup.string(),
  hrRepresentativeName: Yup.string(),
  approvingAuthorityName: Yup.string(),
  approvalSignatureDate: Yup.string(),
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  formId: 'FRM-00656',
  employeeFullName: '',
  employeeID: '',
  department: '',
  jobTitle: '',
  summaryOfAllegation: '',
  investigationConductedBy: '',
  investigationFindingsSummary: '',
  policyClauseViolated: '',
  severityLevel: '',
  recommendedAction: '',
  finalApprovedDisciplinaryAction: '',
  effectiveDate: '',
  hrRepresentativeName: '',
  approvingAuthorityName: '',
  approvalSignatureDate: '',
  customFields: [],
  signatures: { approver: { type: '', data: '', name: '' } }
};

const FRM00656 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue) => (
    <ModernA4Template formId="FRM-00656" title="Disciplinary Action – Approval/Authorization Form" department="HR & People Ops">
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
        <h3 className="form-section-title">Case Details</h3>
        <div className="form-fields">
          <div className="form-field"><label className="form-label">Summary of Allegation</label>{isPrintMode ? <div className="print-value">{values.summaryOfAllegation || '___________________'}</div> : <Field name="summaryOfAllegation" as="textarea" className="form-input" style={{ minHeight: '80px' }}/>}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field"><label className="form-label">Investigation Conducted By</label>{isPrintMode ? <div className="print-value">{values.investigationConductedBy || '___________________'}</div> : <Field name="investigationConductedBy" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">Policy Clause Violated</label>{isPrintMode ? <div className="print-value">{values.policyClauseViolated || '___________________'}</div> : <Field name="policyClauseViolated" className="form-input"/>}</div>
          </div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Investigation Findings Summary</label>{isPrintMode ? <div className="print-value">{values.investigationFindingsSummary || '___________________'}</div> : <Field name="investigationFindingsSummary" as="textarea" className="form-input" style={{ minHeight: '80px' }}/>}</div>
        </div>
      </div>
      <div className="form-section">
        <h3 className="form-section-title">Severity & Disciplinary Action</h3>
        <div className="form-fields">
          <div className="form-field"><label className="form-label">Severity Level (Minor/Major/Critical)</label>{isPrintMode ? <div className="print-value">{values.severityLevel || '___________________'}</div> : <Field name="severityLevel" as="select" className="form-input"><option value="">Select</option><option value="Minor">Minor</option><option value="Major">Major</option><option value="Critical">Critical</option></Field>}</div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Recommended Action</label>{isPrintMode ? <div className="print-value">{values.recommendedAction || '___________________'}</div> : <Field name="recommendedAction" as="textarea" className="form-input" style={{ minHeight: '70px' }}/>}</div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Final Approved Disciplinary Action</label>{isPrintMode ? <div className="print-value">{values.finalApprovedDisciplinaryAction || '___________________'}</div> : <Field name="finalApprovedDisciplinaryAction" as="textarea" className="form-input" style={{ minHeight: '70px' }}/>}</div>
        </div>
      </div>
      <div className="form-section">
        <h3 className="form-section-title">Authorization</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label">Effective Date of Action</label>{isPrintMode ? <div className="print-value">{values.effectiveDate || '___________________'}</div> : <Field name="effectiveDate" type="date" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">HR Representative Name</label>{isPrintMode ? <div className="print-value">{values.hrRepresentativeName || '___________________'}</div> : <Field name="hrRepresentativeName" className="form-input"/>}</div>
          </div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Approving Authority Name</label>{isPrintMode ? <div className="print-value">{values.approvingAuthorityName || '___________________'}</div> : <Field name="approvingAuthorityName" className="form-input"/>}</div>
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
            <div style={{ marginTop: '15px' }}><label className="form-label">Approval Signature Date</label><Field name="approvalSignatureDate" type="date" className="form-input"/></div>
          </div>
        ) : (
          <div className="print-signatures">{values.signatures.approver?.data && <img src={values.signatures.approver.data} alt="Signature" style={{ maxHeight: 80 }} />}</div>
        )}
      </div>
      {!isPrintMode && (<div className="form-actions"><button type="submit" className="btn-submit">💾 Save Form</button></div>)}
    </ModernA4Template>
  );

  return (
    <ModernFormWrapper formId="FRM-00656" title="Disciplinary Action – Approval/Authorization Form">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => { console.log('Submit FRM00656', values); alert('Saved'); }}>
        {({ values, setFieldValue }) => (<Form>{renderFormContent(values, setFieldValue)}</Form>)}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00656;
