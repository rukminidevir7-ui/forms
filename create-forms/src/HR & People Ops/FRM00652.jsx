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
  previousJobTitle: Yup.string(),
  previousDepartment: Yup.string(),
  previousWorkLocation: Yup.string(),
  newJobTitle: Yup.string(),
  newDepartment: Yup.string(),
  newWorkLocation: Yup.string(),
  approvedEffectiveDate: Yup.string(),
  dateOfRelievingFromPreviousRole: Yup.string(),
  dateOfJoiningNewRole: Yup.string(),
  salaryRevisionDetails: Yup.string(),
  reportingManagerOld: Yup.string(),
  reportingManagerNew: Yup.string(),
  hrConfirmationRecordClosureDate: Yup.string(),
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  formId: 'FRM-00652',
  employeeFullName: '',
  employeeID: '',
  previousJobTitle: '',
  previousDepartment: '',
  previousWorkLocation: '',
  newJobTitle: '',
  newDepartment: '',
  newWorkLocation: '',
  approvedEffectiveDate: '',
  dateOfRelievingFromPreviousRole: '',
  dateOfJoiningNewRole: '',
  salaryRevisionDetails: '',
  reportingManagerOld: '',
  reportingManagerNew: '',
  hrConfirmationRecordClosureDate: '',
  customFields: [],
  signatures: { hrRecord: { type: '', data: '', name: '' } }
};

const FRM00652 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue) => (
    <ModernA4Template formId="FRM-00652" title="Transfer/Relocation – Report/Record" department="HR & People Ops">

      <div className="form-section">
        <h3 className="form-section-title">Employee Information</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label required">Employee Full Name</label>{isPrintMode ? <div className="print-value">{values.employeeFullName || '___________________'}</div> : <Field name="employeeFullName" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label required">Employee ID</label>{isPrintMode ? <div className="print-value">{values.employeeID || '___________________'}</div> : <Field name="employeeID" className="form-input"/>}</div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Previous Position Details</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label">Previous Job Title</label>{isPrintMode ? <div className="print-value">{values.previousJobTitle || '___________________'}</div> : <Field name="previousJobTitle" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">Previous Department</label>{isPrintMode ? <div className="print-value">{values.previousDepartment || '___________________'}</div> : <Field name="previousDepartment" className="form-input"/>}</div>
          </div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Previous Work Location</label>{isPrintMode ? <div className="print-value">{values.previousWorkLocation || '___________________'}</div> : <Field name="previousWorkLocation" className="form-input"/>}</div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">New Position Details</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label">New Job Title</label>{isPrintMode ? <div className="print-value">{values.newJobTitle || '___________________'}</div> : <Field name="newJobTitle" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">New Department</label>{isPrintMode ? <div className="print-value">{values.newDepartment || '___________________'}</div> : <Field name="newDepartment" className="form-input"/>}</div>
          </div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">New Work Location</label>{isPrintMode ? <div className="print-value">{values.newWorkLocation || '___________________'}</div> : <Field name="newWorkLocation" className="form-input"/>}</div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Transfer Timeline</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label">Approved Effective Date</label>{isPrintMode ? <div className="print-value">{values.approvedEffectiveDate || '___________________'}</div> : <Field name="approvedEffectiveDate" type="date" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">Date of Relieving from Previous Role</label>{isPrintMode ? <div className="print-value">{values.dateOfRelievingFromPreviousRole || '___________________'}</div> : <Field name="dateOfRelievingFromPreviousRole" type="date" className="form-input"/>}</div>
          </div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Date of Joining New Role</label>{isPrintMode ? <div className="print-value">{values.dateOfJoiningNewRole || '___________________'}</div> : <Field name="dateOfJoiningNewRole" type="date" className="form-input"/>}</div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Salary & Reporting</h3>
        <div className="form-fields">
          <div className="form-field"><label className="form-label">Salary Revision Details</label>{isPrintMode ? <div className="print-value">{values.salaryRevisionDetails || '___________________'}</div> : <Field name="salaryRevisionDetails" as="textarea" className="form-input" style={{ minHeight: '60px' }}/>}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field"><label className="form-label">Reporting Manager (Old)</label>{isPrintMode ? <div className="print-value">{values.reportingManagerOld || '___________________'}</div> : <Field name="reportingManagerOld" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">Reporting Manager (New)</label>{isPrintMode ? <div className="print-value">{values.reportingManagerNew || '___________________'}</div> : <Field name="reportingManagerNew" className="form-input"/>}</div>
          </div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">HR Confirmation & Record Closure Date</label>{isPrintMode ? <div className="print-value">{values.hrConfirmationRecordClosureDate || '___________________'}</div> : <Field name="hrConfirmationRecordClosureDate" type="date" className="form-input"/>}</div>
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
        <h3 className="form-section-title">HR Record Keeper</h3>
        {!isPrintMode ? (
          <div className="form-fields">
            <SignatureComponent name="HR Record Keeper" onChange={(sig) => setFieldValue('signatures.hrRecord', sig)} value={values.signatures.hrRecord} />
            <div style={{ marginTop: '15px' }}><label className="form-label">Name (Print)</label><Field name="signatures.hrRecord.name" className="form-input"/></div>
          </div>
        ) : (
          <div className="print-signatures">{values.signatures.hrRecord?.data && <img src={values.signatures.hrRecord.data} alt="Signature" style={{ maxHeight: 80 }} />}</div>
        )}
      </div>

      {!isPrintMode && (<div className="form-actions"><button type="submit" className="btn-submit">💾 Save Form</button></div>)}

    </ModernA4Template>
  );

  return (
    <ModernFormWrapper formId="FRM-00652" title="Transfer/Relocation – Report/Record">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => { console.log('Submit FRM00652', values); alert('Saved'); }}>
        {({ values, setFieldValue }) => (<Form>{renderFormContent(values, setFieldValue)}</Form>)}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00652;
