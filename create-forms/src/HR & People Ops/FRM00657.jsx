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
  typeOfDisciplinaryActionTaken: Yup.string(),
  dateOfIncident: Yup.string(),
  dateOfInvestigationCompletion: Yup.string(),
  finalDecisionDate: Yup.string(),
  effectiveDateOfAction: Yup.string(),
  suspensionPeriodIfApplicable: Yup.string(),
  terminationDateIfApplicable: Yup.string(),
  employeeAcknowledgmentStatus: Yup.string(),
  appealSubmitted: Yup.string(),
  caseClosureDate: Yup.string(),
  hrRecordUpdatedByDate: Yup.string(),
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  formId: 'FRM-00657',
  employeeFullName: '',
  employeeID: '',
  department: '',
  jobTitle: '',
  typeOfDisciplinaryActionTaken: '',
  dateOfIncident: '',
  dateOfInvestigationCompletion: '',
  finalDecisionDate: '',
  effectiveDateOfAction: '',
  suspensionPeriodIfApplicable: '',
  terminationDateIfApplicable: '',
  employeeAcknowledgmentStatus: '',
  appealSubmitted: '',
  caseClosureDate: '',
  hrRecordUpdatedByDate: '',
  customFields: [],
  signatures: { hrRecord: { type: '', data: '', name: '' } }
};

const FRM00657 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue) => (
    <ModernA4Template formId="FRM-00657" title="Disciplinary Action – Report/Record" department="HR & People Ops">

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
        <h3 className="form-section-title">Disciplinary Action Details</h3>
        <div className="form-fields">
          <div className="form-field"><label className="form-label">Type of Disciplinary Action Taken</label>{isPrintMode ? <div className="print-value">{values.typeOfDisciplinaryActionTaken || '___________________'}</div> : <Field name="typeOfDisciplinaryActionTaken" as="select" className="form-input"><option value="">Select</option><option value="Verbal Warning">Verbal Warning</option><option value="Written Warning">Written Warning</option><option value="Suspension">Suspension</option><option value="Demotion">Demotion</option><option value="Termination">Termination</option><option value="Other">Other</option></Field>}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field"><label className="form-label">Date of Incident</label>{isPrintMode ? <div className="print-value">{values.dateOfIncident || '___________________'}</div> : <Field name="dateOfIncident" type="date" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">Date of Investigation Completion</label>{isPrintMode ? <div className="print-value">{values.dateOfInvestigationCompletion || '___________________'}</div> : <Field name="dateOfInvestigationCompletion" type="date" className="form-input"/>}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field"><label className="form-label">Final Decision Date</label>{isPrintMode ? <div className="print-value">{values.finalDecisionDate || '___________________'}</div> : <Field name="finalDecisionDate" type="date" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">Effective Date of Action</label>{isPrintMode ? <div className="print-value">{values.effectiveDateOfAction || '___________________'}</div> : <Field name="effectiveDateOfAction" type="date" className="form-input"/>}</div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Employment Status</h3>
        <div className="form-fields">
          <div className="form-field"><label className="form-label">Suspension Period (If Applicable)</label>{isPrintMode ? <div className="print-value">{values.suspensionPeriodIfApplicable || '___________________'}</div> : <Field name="suspensionPeriodIfApplicable" className="form-input"/>}</div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Termination Date (If Applicable)</label>{isPrintMode ? <div className="print-value">{values.terminationDateIfApplicable || '___________________'}</div> : <Field name="terminationDateIfApplicable" type="date" className="form-input"/>}</div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Acknowledgment & Appeal</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label">Employee Acknowledgment Status</label>{isPrintMode ? <div className="print-value">{values.employeeAcknowledgmentStatus || '___________________'}</div> : <Field name="employeeAcknowledgmentStatus" as="select" className="form-input"><option value="">Select</option><option value="Acknowledged">Acknowledged</option><option value="Not Acknowledged">Not Acknowledged</option><option value="Pending">Pending</option></Field>}</div>
            <div className="form-field"><label className="form-label">Appeal Submitted (Yes/No)</label>{isPrintMode ? <div className="print-value">{values.appealSubmitted || '___________________'}</div> : <Field name="appealSubmitted" as="select" className="form-input"><option value="">Select</option><option value="Yes">Yes</option><option value="No">No</option></Field>}</div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Case Closure</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label">Case Closure Date</label>{isPrintMode ? <div className="print-value">{values.caseClosureDate || '___________________'}</div> : <Field name="caseClosureDate" type="date" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">HR Record Updated By & Date</label>{isPrintMode ? <div className="print-value">{values.hrRecordUpdatedByDate || '___________________'}</div> : <Field name="hrRecordUpdatedByDate" className="form-input"/>}</div>
          </div>
        </div>
      </div>

      {!isPrintMode && (
        <div className="form-section">
          <h3 className="form-section-title">Additional Custom Fields</h3>
          <FieldArray name="customFields">{(helpers) => (
            <div>
              {values.customFields && values.customFields.map((f, i) => (
                <div key={f.id || i} className="custom-field-row">
                  <div className="form-field"><Field name={`customFields.${i}.fieldName`} className="form-input" placeholder="Field Name"/></div>
                  <div className="form-field" style={{ flex: 2 }}><Field name={`customFields.${i}.fieldValue`} className="form-input" placeholder="Field Value"/></div>
                  <button type="button" className="btn-remove" onClick={() => helpers.remove(i)}>Remove</button>
                </div>
              ))}
              <button type="button" className="btn-add-field" onClick={() => helpers.push({ id: Math.random().toString(36).slice(2), fieldName: '', fieldValue: '' })}>Add Field</button>
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

      {!isPrintMode && (<div className="form-actions"><button type="submit" className="btn-submit">Save Form</button></div>)}

    </ModernA4Template>
  );

  return (
    <ModernFormWrapper formId="FRM-00657" title="Disciplinary Action – Report/Record">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => { console.log('Submit FRM00657', values); alert('Saved'); }}>
        {({ values, setFieldValue }) => (<Form>{renderFormContent(values, setFieldValue)}</Form>)}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00657;
