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
  approvedNewDepartment: Yup.string(),
  approvedNewLocation: Yup.string(),
  approvedEffectiveDate: Yup.string(),
  approvedJobTitle: Yup.string(),
  salaryImpact: Yup.string(),
  revisedSalary: Yup.string(),
  relocationBenefitsApproved: Yup.string(),
  assetHandoverStatus: Yup.string(),
  knowledgeTransferCompletionStatus: Yup.string(),
  approvingAuthorityName: Yup.string(),
  finalHRAuthorizationDate: Yup.string(),
  recordCreatedDate: Yup.string(),
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  formId: 'FRM-00651',
  employeeFullName: '',
  employeeID: '',
  currentJobTitle: '',
  currentDepartment: '',
  approvedNewDepartment: '',
  approvedNewLocation: '',
  approvedEffectiveDate: '',
  approvedJobTitle: '',
  salaryImpact: '',
  revisedSalary: '',
  relocationBenefitsApproved: '',
  assetHandoverStatus: '',
  knowledgeTransferCompletionStatus: '',
  approvingAuthorityName: '',
  finalHRAuthorizationDate: '',
  recordCreatedDate: '',
  customFields: [],
  signatures: { approver: { type: '', data: '', name: '' } }
};

const FRM00651 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue) => (
    <ModernA4Template formId="FRM-00651" title="Transfer/Relocation – Approval/Authorization Form" department="HR & People Ops">

      <div className="form-section">
        <h3 className="form-section-title">Employee Information</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label required">Employee Full Name</label>{isPrintMode ? <div className="print-value">{values.employeeFullName || '___________________'}</div> : <Field name="employeeFullName" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label required">Employee ID</label>{isPrintMode ? <div className="print-value">{values.employeeID || '___________________'}</div> : <Field name="employeeID" className="form-input"/>}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field"><label className="form-label required">Current Job Title</label>{isPrintMode ? <div className="print-value">{values.currentJobTitle || '___________________'}</div> : <Field name="currentJobTitle" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label required">Current Department</label>{isPrintMode ? <div className="print-value">{values.currentDepartment || '___________________'}</div> : <Field name="currentDepartment" className="form-input"/>}</div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Approved Transfer Details</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label">Approved New Department</label>{isPrintMode ? <div className="print-value">{values.approvedNewDepartment || '___________________'}</div> : <Field name="approvedNewDepartment" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">Approved New Location</label>{isPrintMode ? <div className="print-value">{values.approvedNewLocation || '___________________'}</div> : <Field name="approvedNewLocation" className="form-input"/>}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field"><label className="form-label">Approved Effective Date</label>{isPrintMode ? <div className="print-value">{values.approvedEffectiveDate || '___________________'}</div> : <Field name="approvedEffectiveDate" type="date" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">Approved Job Title (If Changed)</label>{isPrintMode ? <div className="print-value">{values.approvedJobTitle || '___________________'}</div> : <Field name="approvedJobTitle" className="form-input"/>}</div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Compensation & Benefits</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label">Salary Impact (Increase/No Change/Adjustment)</label>{isPrintMode ? <div className="print-value">{values.salaryImpact || '___________________'}</div> : <Field name="salaryImpact" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">Revised Salary (If Applicable)</label>{isPrintMode ? <div className="print-value">{values.revisedSalary || '___________________'}</div> : <Field name="revisedSalary" className="form-input"/>}</div>
          </div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Relocation Benefits Approved</label>{isPrintMode ? <div className="print-value">{values.relocationBenefitsApproved || '___________________'}</div> : <Field name="relocationBenefitsApproved" as="textarea" className="form-input" style={{ minHeight: '60px' }}/>}</div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Handover & Knowledge Transfer</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label">Asset Handover Status</label>{isPrintMode ? <div className="print-value">{values.assetHandoverStatus || '___________________'}</div> : <Field name="assetHandoverStatus" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">Knowledge Transfer Completion Status</label>{isPrintMode ? <div className="print-value">{values.knowledgeTransferCompletionStatus || '___________________'}</div> : <Field name="knowledgeTransferCompletionStatus" className="form-input"/>}</div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Authorization</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label">Approving Authority Name</label>{isPrintMode ? <div className="print-value">{values.approvingAuthorityName || '___________________'}</div> : <Field name="approvingAuthorityName" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">Final HR Authorization & Date</label>{isPrintMode ? <div className="print-value">{values.finalHRAuthorizationDate || '___________________'}</div> : <Field name="finalHRAuthorizationDate" type="date" className="form-input"/>}</div>
          </div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Record Created Date</label>{isPrintMode ? <div className="print-value">{values.recordCreatedDate || '___________________'}</div> : <Field name="recordCreatedDate" type="date" className="form-input"/>}</div>
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
        <h3 className="form-section-title">Approver Signature</h3>
        {!isPrintMode ? (
          <div className="form-fields">
            <SignatureComponent name="Approving Authority" onChange={(sig) => setFieldValue('signatures.approver', sig)} value={values.signatures.approver} />
            <div style={{ marginTop: '15px' }}><label className="form-label">Name (Print)</label><Field name="signatures.approver.name" className="form-input"/></div>
          </div>
        ) : (
          <div className="print-signatures">{values.signatures.approver?.data && <img src={values.signatures.approver.data} alt="Signature" style={{ maxHeight: 80 }} />}</div>
        )}
      </div>

      {!isPrintMode && (<div className="form-actions"><button type="submit" className="btn-submit">💾 Save Form</button></div>)}

    </ModernA4Template>
  );

  return (
    <ModernFormWrapper formId="FRM-00651" title="Transfer/Relocation – Approval/Authorization Form">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => { console.log('Submit FRM00651', values); alert('Saved'); }}>
        {({ values, setFieldValue }) => (<Form>{renderFormContent(values, setFieldValue)}</Form>)}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00651;
