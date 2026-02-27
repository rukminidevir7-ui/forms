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
  dateOfExit: Yup.string(),
  exitType: Yup.string(),
  finalSettlementDate: Yup.string(),
  finalSettlementAmountPaid: Yup.string(),
  assetHandoverCompletionDate: Yup.string(),
  systemAccessDisabledDate: Yup.string(),
  experienceLetterIssued: Yup.string(),
  relievingLetterIssued: Yup.string(),
  exitClearanceStatus: Yup.string(),
  hrRecordUpdatedBy: Yup.string(),
  recordClosureDate: Yup.string(),
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  formId: 'FRM-00661',
  employeeFullName: '',
  employeeID: '',
  department: '',
  jobTitle: '',
  dateOfExit: '',
  exitType: '',
  finalSettlementDate: '',
  finalSettlementAmountPaid: '',
  assetHandoverCompletionDate: '',
  systemAccessDisabledDate: '',
  experienceLetterIssued: '',
  relievingLetterIssued: '',
  exitClearanceStatus: '',
  hrRecordUpdatedBy: '',
  recordClosureDate: '',
  customFields: [],
  signatures: { hrRep: { type: '', data: '', name: '' } }
};

const FRM00661 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue) => (
    <ModernA4Template formId="FRM-00661" title="Exit Clearance – Report/Record Form" department="HR & People Ops">
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
        <h3 className="form-section-title">Exit Record Details</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label">Date of Exit</label>{isPrintMode ? <div className="print-value">{values.dateOfExit || '___________________'}</div> : <Field name="dateOfExit" type="date" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">Exit Type</label>{isPrintMode ? <div className="print-value">{values.exitType || '___________________'}</div> : <Field name="exitType" as="select" className="form-input"><option value="">Select</option><option value="Resignation">Resignation</option><option value="Termination">Termination</option><option value="Retirement">Retirement</option><option value="Contract End">Contract End</option></Field>}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field"><label className="form-label">Final Settlement Date</label>{isPrintMode ? <div className="print-value">{values.finalSettlementDate || '___________________'}</div> : <Field name="finalSettlementDate" type="date" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">Final Settlement Amount Paid</label>{isPrintMode ? <div className="print-value">{values.finalSettlementAmountPaid || '___________________'}</div> : <Field name="finalSettlementAmountPaid" className="form-input" placeholder="Amount"/>}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field"><label className="form-label">Asset Handover Completion Date</label>{isPrintMode ? <div className="print-value">{values.assetHandoverCompletionDate || '___________________'}</div> : <Field name="assetHandoverCompletionDate" type="date" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">System Access Disabled Date</label>{isPrintMode ? <div className="print-value">{values.systemAccessDisabledDate || '___________________'}</div> : <Field name="systemAccessDisabledDate" type="date" className="form-input"/>}</div>
          </div>
        </div>
      </div>
      <div className="form-section">
        <h3 className="form-section-title">Documentation Status</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label">Experience Letter Issued (Yes/No)</label>{isPrintMode ? <div className="print-value">{values.experienceLetterIssued || '___________________'}</div> : <Field name="experienceLetterIssued" as="select" className="form-input"><option value="">Select</option><option value="Yes">Yes</option><option value="No">No</option></Field>}</div>
            <div className="form-field"><label className="form-label">Relieving Letter Issued (Yes/No)</label>{isPrintMode ? <div className="print-value">{values.relievingLetterIssued || '___________________'}</div> : <Field name="relievingLetterIssued" as="select" className="form-input"><option value="">Select</option><option value="Yes">Yes</option><option value="No">No</option></Field>}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field"><label className="form-label">Exit Clearance Status</label>{isPrintMode ? <div className="print-value">{values.exitClearanceStatus || '___________________'}</div> : <Field name="exitClearanceStatus" as="select" className="form-input"><option value="">Select</option><option value="Cleared">Cleared</option><option value="Pending">Pending</option><option value="Not Cleared">Not Cleared</option></Field>}</div>
            <div className="form-field"><label className="form-label">HR Record Updated By</label>{isPrintMode ? <div className="print-value">{values.hrRecordUpdatedBy || '___________________'}</div> : <Field name="hrRecordUpdatedBy" className="form-input"/>}</div>
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
    <ModernFormWrapper formId="FRM-00661" title="Exit Clearance – Report/Record Form">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => { console.log('Submit FRM00661', values); alert('Saved'); }}>
        {({ values, setFieldValue }) => (<Form>{renderFormContent(values, setFieldValue)}</Form>)}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00661;
