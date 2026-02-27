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
  resignationSubmissionDate: Yup.string(),
  lastWorkingDay: Yup.string(),
  noticePeriodDuration: Yup.string(),
  reasonForExit: Yup.string(),
  reportingManagerName: Yup.string(),
  companyAssetsIssued: Yup.string(),
  pendingTasksStatus: Yup.string(),
  knowledgeTransferPlan: Yup.string(),
  leaveBalanceDetails: Yup.string(),
  contactInformationAfterExit: Yup.string(),
  employeeSignatureDate: Yup.string(),
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  formId: 'FRM-00659',
  employeeFullName: '',
  employeeID: '',
  department: '',
  jobTitle: '',
  resignationSubmissionDate: '',
  lastWorkingDay: '',
  noticePeriodDuration: '',
  reasonForExit: '',
  reportingManagerName: '',
  companyAssetsIssued: '',
  pendingTasksStatus: '',
  knowledgeTransferPlan: '',
  leaveBalanceDetails: '',
  contactInformationAfterExit: '',
  employeeSignatureDate: '',
  customFields: [],
  signatures: { employee: { type: '', data: '', name: '' } }
};

const FRM00659 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue) => (
    <ModernA4Template formId="FRM-00659" title="Exit Clearance – Request/Initiation Form" department="HR & People Ops">
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
        <h3 className="form-section-title">Exit Details</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label">Resignation Submission Date</label>{isPrintMode ? <div className="print-value">{values.resignationSubmissionDate || '___________________'}</div> : <Field name="resignationSubmissionDate" type="date" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">Last Working Day</label>{isPrintMode ? <div className="print-value">{values.lastWorkingDay || '___________________'}</div> : <Field name="lastWorkingDay" type="date" className="form-input"/>}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field"><label className="form-label">Notice Period Duration</label>{isPrintMode ? <div className="print-value">{values.noticePeriodDuration || '___________________'}</div> : <Field name="noticePeriodDuration" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">Reporting Manager Name</label>{isPrintMode ? <div className="print-value">{values.reportingManagerName || '___________________'}</div> : <Field name="reportingManagerName" className="form-input"/>}</div>
          </div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Reason for Exit</label>{isPrintMode ? <div className="print-value">{values.reasonForExit || '___________________'}</div> : <Field name="reasonForExit" as="textarea" className="form-input" style={{ minHeight: '70px' }}/>}</div>
        </div>
      </div>
      <div className="form-section">
        <h3 className="form-section-title">Clearance Checklist</h3>
        <div className="form-fields">
          <div className="form-field"><label className="form-label">Company Assets Issued & Status</label>{isPrintMode ? <div className="print-value">{values.companyAssetsIssued || '___________________'}</div> : <Field name="companyAssetsIssued" as="textarea" className="form-input" style={{ minHeight: '60px' }}/>}</div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Pending Tasks Status</label>{isPrintMode ? <div className="print-value">{values.pendingTasksStatus || '___________________'}</div> : <Field name="pendingTasksStatus" as="textarea" className="form-input" style={{ minHeight: '60px' }}/>}</div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Knowledge Transfer Plan</label>{isPrintMode ? <div className="print-value">{values.knowledgeTransferPlan || '___________________'}</div> : <Field name="knowledgeTransferPlan" as="textarea" className="form-input" style={{ minHeight: '60px' }}/>}</div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Leave Balance Details</label>{isPrintMode ? <div className="print-value">{values.leaveBalanceDetails || '___________________'}</div> : <Field name="leaveBalanceDetails" className="form-input"/>}</div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Contact Information After Exit</label>{isPrintMode ? <div className="print-value">{values.contactInformationAfterExit || '___________________'}</div> : <Field name="contactInformationAfterExit" className="form-input" placeholder="Email/Phone/Address"/>}</div>
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
    <ModernFormWrapper formId="FRM-00659" title="Exit Clearance – Request/Initiation Form">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => { console.log('Submit FRM00659', values); alert('Saved'); }}>
        {({ values, setFieldValue }) => (<Form>{renderFormContent(values, setFieldValue)}</Form>)}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00659;
