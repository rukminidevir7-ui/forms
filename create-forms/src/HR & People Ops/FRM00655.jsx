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
  typeOfMisconduct: Yup.string(),
  dateOfIncident: Yup.string(),
  locationOfIncident: Yup.string(),
  detailedDescriptionOfIncident: Yup.string(),
  witnessNames: Yup.string(),
  previousWarningsIssued: Yup.string(),
  supportingEvidenceAttached: Yup.string(),
  immediateActionTaken: Yup.string(),
  recommendedDisciplinaryAction: Yup.string(),
  initiatorSignatureDate: Yup.string(),
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  formId: 'FRM-00655',
  employeeFullName: '',
  employeeID: '',
  department: '',
  jobTitle: '',
  reportingManagerName: '',
  typeOfMisconduct: '',
  dateOfIncident: '',
  locationOfIncident: '',
  detailedDescriptionOfIncident: '',
  witnessNames: '',
  previousWarningsIssued: '',
  supportingEvidenceAttached: '',
  immediateActionTaken: '',
  recommendedDisciplinaryAction: '',
  initiatorSignatureDate: '',
  customFields: [],
  signatures: { initiator: { type: '', data: '', name: '' } }
};

const FRM00655 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue) => (
    <ModernA4Template formId="FRM-00655" title="Disciplinary Action – Request/Initiation Form" department="HR & People Ops">

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
        <h3 className="form-section-title">Incident Details</h3>
        <div className="form-fields">
          <div className="form-field"><label className="form-label">Type of Misconduct (Policy Violation/Performance/Behavior/etc.)</label>{isPrintMode ? <div className="print-value">{values.typeOfMisconduct || '___________________'}</div> : <Field name="typeOfMisconduct" as="select" className="form-input"><option value="">Select</option><option value="Policy Violation">Policy Violation</option><option value="Performance">Performance</option><option value="Behavior">Behavior</option><option value="Attendance">Attendance</option><option value="Other">Other</option></Field>}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field"><label className="form-label">Date of Incident</label>{isPrintMode ? <div className="print-value">{values.dateOfIncident || '___________________'}</div> : <Field name="dateOfIncident" type="date" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">Location of Incident</label>{isPrintMode ? <div className="print-value">{values.locationOfIncident || '___________________'}</div> : <Field name="locationOfIncident" className="form-input"/>}</div>
          </div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Detailed Description of Incident</label>{isPrintMode ? <div className="print-value">{values.detailedDescriptionOfIncident || '___________________'}</div> : <Field name="detailedDescriptionOfIncident" as="textarea" className="form-input" style={{ minHeight: '100px' }}/>}</div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Evidence & History</h3>
        <div className="form-fields">
          <div className="form-field"><label className="form-label">Witness Name(s) (If Any)</label>{isPrintMode ? <div className="print-value">{values.witnessNames || '___________________'}</div> : <Field name="witnessNames" className="form-input"/>}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field"><label className="form-label">Previous Warnings Issued (Yes/No)</label>{isPrintMode ? <div className="print-value">{values.previousWarningsIssued || '___________________'}</div> : <Field name="previousWarningsIssued" as="select" className="form-input"><option value="">Select</option><option value="Yes">Yes</option><option value="No">No</option></Field>}</div>
            <div className="form-field"><label className="form-label">Supporting Evidence Attached (Yes/No)</label>{isPrintMode ? <div className="print-value">{values.supportingEvidenceAttached || '___________________'}</div> : <Field name="supportingEvidenceAttached" as="select" className="form-input"><option value="">Select</option><option value="Yes">Yes</option><option value="No">No</option></Field>}</div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Action & Recommendation</h3>
        <div className="form-fields">
          <div className="form-field"><label className="form-label">Immediate Action Taken (If Any)</label>{isPrintMode ? <div className="print-value">{values.immediateActionTaken || '___________________'}</div> : <Field name="immediateActionTaken" as="textarea" className="form-input" style={{ minHeight: '70px' }}/>}</div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Recommended Disciplinary Action</label>{isPrintMode ? <div className="print-value">{values.recommendedDisciplinaryAction || '___________________'}</div> : <Field name="recommendedDisciplinaryAction" as="textarea" className="form-input" style={{ minHeight: '70px' }}/>}</div>
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
        <h3 className="form-section-title">Initiator Signature</h3>
        {!isPrintMode ? (
          <div className="form-fields">
            <SignatureComponent name="Initiator" onChange={(sig) => setFieldValue('signatures.initiator', sig)} value={values.signatures.initiator} />
            <div style={{ marginTop: '15px' }}><label className="form-label">Signature Date</label><Field name="initiatorSignatureDate" type="date" className="form-input"/></div>
          </div>
        ) : (
          <div className="print-signatures">{values.signatures.initiator?.data && <img src={values.signatures.initiator.data} alt="Signature" style={{ maxHeight: 80 }} />}</div>
        )}
      </div>

      {!isPrintMode && (<div className="form-actions"><button type="submit" className="btn-submit">💾 Save Form</button></div>)}

    </ModernA4Template>
  );

  return (
    <ModernFormWrapper formId="FRM-00655" title="Disciplinary Action – Request/Initiation Form">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => { console.log('Submit FRM00655', values); alert('Saved'); }}>
        {({ values, setFieldValue }) => (<Form>{renderFormContent(values, setFieldValue)}</Form>)}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00655;
