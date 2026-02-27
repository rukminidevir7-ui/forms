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
  currentWorkLocation: Yup.string().required('Current Work Location is required'),
  requestedTransferType: Yup.string().required('Requested Transfer Type is required'),
  requestedNewDepartment: Yup.string().required('Requested New Department is required'),
  requestedNewLocation: Yup.string().required('Requested New Location is required'),
  reasonForTransferRelocation: Yup.string(),
  preferredEffectiveDate: Yup.string(),
  currentReportingManagerName: Yup.string(),
  proposedReportingManagerName: Yup.string(),
  relocationAssistanceRequired: Yup.string(),
  employeeContactNumber: Yup.string(),
  employeeSignatureDate: Yup.string(),
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  formId: 'FRM-00650',
  employeeFullName: '',
  employeeID: '',
  currentJobTitle: '',
  currentDepartment: '',
  currentWorkLocation: '',
  requestedTransferType: '',
  requestedNewDepartment: '',
  requestedNewLocation: '',
  reasonForTransferRelocation: '',
  preferredEffectiveDate: '',
  currentReportingManagerName: '',
  proposedReportingManagerName: '',
  relocationAssistanceRequired: '',
  employeeContactNumber: '',
  employeeSignatureDate: '',
  customFields: [],
  signatures: { employee: { type: '', data: '', name: '' } }
};

const FRM00650 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue) => (
    <ModernA4Template formId="FRM-00650" title="Transfer/Relocation – Request/Initiation Form" department="HR & People Ops">

      <div className="form-section">
        <h3 className="form-section-title">Employee Information</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label required">Employee Full Name</label>{isPrintMode ? <div className="print-value">{values.employeeFullName || '___________________'}</div> : <Field name="employeeFullName" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label required">Employee ID</label>{isPrintMode ? <div className="print-value">{values.employeeID || '___________________'}</div> : <Field name="employeeID" className="form-input"/>}</div>
          </div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Employee Contact Number</label>{isPrintMode ? <div className="print-value">{values.employeeContactNumber || '___________________'}</div> : <Field name="employeeContactNumber" className="form-input"/>}</div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Current Position Details</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label required">Current Job Title</label>{isPrintMode ? <div className="print-value">{values.currentJobTitle || '___________________'}</div> : <Field name="currentJobTitle" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label required">Current Department</label>{isPrintMode ? <div className="print-value">{values.currentDepartment || '___________________'}</div> : <Field name="currentDepartment" className="form-input"/>}</div>
          </div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label required">Current Work Location</label>{isPrintMode ? <div className="print-value">{values.currentWorkLocation || '___________________'}</div> : <Field name="currentWorkLocation" className="form-input"/>}</div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Transfer/Relocation Request</h3>
        <div className="form-fields">
          <div className="form-field"><label className="form-label required">Requested Transfer Type (Internal / Relocation)</label>{isPrintMode ? <div className="print-value">{values.requestedTransferType || '___________________'}</div> : <Field name="requestedTransferType" as="select" className="form-input"><option value="">Select</option><option value="Internal">Internal</option><option value="Relocation">Relocation</option></Field>}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field"><label className="form-label required">Requested New Department</label>{isPrintMode ? <div className="print-value">{values.requestedNewDepartment || '___________________'}</div> : <Field name="requestedNewDepartment" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label required">Requested New Location</label>{isPrintMode ? <div className="print-value">{values.requestedNewLocation || '___________________'}</div> : <Field name="requestedNewLocation" className="form-input"/>}</div>
          </div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Reason for Transfer/Relocation</label>{isPrintMode ? <div className="print-value">{values.reasonForTransferRelocation || '___________________'}</div> : <Field name="reasonForTransferRelocation" as="textarea" className="form-input" style={{ minHeight: '80px' }}/>}</div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Request Details</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label">Preferred Effective Date</label>{isPrintMode ? <div className="print-value">{values.preferredEffectiveDate || '___________________'}</div> : <Field name="preferredEffectiveDate" type="date" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">Relocation Assistance Required (Yes/No)</label>{isPrintMode ? <div className="print-value">{values.relocationAssistanceRequired || '___________________'}</div> : <Field name="relocationAssistanceRequired" as="select" className="form-input"><option value="">Select</option><option value="Yes">Yes</option><option value="No">No</option></Field>}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field"><label className="form-label">Current Reporting Manager Name</label>{isPrintMode ? <div className="print-value">{values.currentReportingManagerName || '___________________'}</div> : <Field name="currentReportingManagerName" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">Proposed Reporting Manager Name</label>{isPrintMode ? <div className="print-value">{values.proposedReportingManagerName || '___________________'}</div> : <Field name="proposedReportingManagerName" className="form-input"/>}</div>
          </div>
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
            <div style={{ marginTop: '15px' }}><label className="form-label">Signature Date</label><Field name="employeeSignatureDate" type="date" className="form-input"/></div>
          </div>
        ) : (
          <div className="print-signatures">{values.signatures.employee?.data && <img src={values.signatures.employee.data} alt="Signature" style={{ maxHeight: 80 }} />}</div>
        )}
      </div>

      {!isPrintMode && (<div className="form-actions"><button type="submit" className="btn-submit">💾 Save Form</button></div>)}

    </ModernA4Template>
  );

  return (
    <ModernFormWrapper formId="FRM-00650" title="Transfer/Relocation – Request/Initiation Form">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => { console.log('Submit FRM00650', values); alert('Saved'); }}>
        {({ values, setFieldValue }) => (<Form>{renderFormContent(values, setFieldValue)}</Form>)}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00650;
