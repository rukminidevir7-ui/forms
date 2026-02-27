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
  typeOfGrievance: Yup.string(),
  dateOfIncident: Yup.string(),
  locationOfIncident: Yup.string(),
  personInvolved: Yup.string(),
  detailedDescriptionOfGrievance: Yup.string(),
  previousComplaintRaised: Yup.string(),
  supportingEvidenceAttached: Yup.string(),
  desiredResolution: Yup.string(),
  confidentialityRequest: Yup.string(),
  employeeSignatureDate: Yup.string(),
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  formId: 'FRM-00658',
  employeeFullName: '',
  employeeID: '',
  department: '',
  jobTitle: '',
  reportingManagerName: '',
  typeOfGrievance: '',
  dateOfIncident: '',
  locationOfIncident: '',
  personInvolved: '',
  detailedDescriptionOfGrievance: '',
  previousComplaintRaised: '',
  supportingEvidenceAttached: '',
  desiredResolution: '',
  confidentialityRequest: '',
  employeeSignatureDate: '',
  customFields: [],
  signatures: { employee: { type: '', data: '', name: '' } }
};

const FRM00658 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue) => (
    <ModernA4Template formId="FRM-00658" title="Grievance Intake – Request/Initiation Form" department="HR & People Ops">
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
        <h3 className="form-section-title">Grievance Details</h3>
        <div className="form-fields">
          <div className="form-field"><label className="form-label">Type of Grievance</label>{isPrintMode ? <div className="print-value">{values.typeOfGrievance || '___________________'}</div> : <Field name="typeOfGrievance" as="select" className="form-input"><option value="">Select</option><option value="Compensation">Compensation</option><option value="Workplace Harassment">Workplace Harassment</option><option value="Discrimination">Discrimination</option><option value="Work Conditions">Work Conditions</option><option value="Other">Other</option></Field>}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field"><label className="form-label">Date of Incident</label>{isPrintMode ? <div className="print-value">{values.dateOfIncident || '___________________'}</div> : <Field name="dateOfIncident" type="date" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">Location of Incident</label>{isPrintMode ? <div className="print-value">{values.locationOfIncident || '___________________'}</div> : <Field name="locationOfIncident" className="form-input"/>}</div>
          </div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Person Involved</label>{isPrintMode ? <div className="print-value">{values.personInvolved || '___________________'}</div> : <Field name="personInvolved" className="form-input"/>}</div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Detailed Description of Grievance</label>{isPrintMode ? <div className="print-value">{values.detailedDescriptionOfGrievance || '___________________'}</div> : <Field name="detailedDescriptionOfGrievance" as="textarea" className="form-input" style={{ minHeight: '100px' }}/>}</div>
        </div>
      </div>
      <div className="form-section">
        <h3 className="form-section-title">Additional Details</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label">Previous Complaint Raised (Yes/No)</label>{isPrintMode ? <div className="print-value">{values.previousComplaintRaised || '___________________'}</div> : <Field name="previousComplaintRaised" as="select" className="form-input"><option value="">Select</option><option value="Yes">Yes</option><option value="No">No</option></Field>}</div>
            <div className="form-field"><label className="form-label">Supporting Evidence Attached (Yes/No)</label>{isPrintMode ? <div className="print-value">{values.supportingEvidenceAttached || '___________________'}</div> : <Field name="supportingEvidenceAttached" as="select" className="form-input"><option value="">Select</option><option value="Yes">Yes</option><option value="No">No</option></Field>}</div>
          </div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Desired Resolution</label>{isPrintMode ? <div className="print-value">{values.desiredResolution || '___________________'}</div> : <Field name="desiredResolution" as="textarea" className="form-input" style={{ minHeight: '70px' }}/>}</div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Confidentiality Request (Yes/No)</label>{isPrintMode ? <div className="print-value">{values.confidentialityRequest || '___________________'}</div> : <Field name="confidentialityRequest" as="select" className="form-input"><option value="">Select</option><option value="Yes">Yes</option><option value="No">No</option></Field>}</div>
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
    <ModernFormWrapper formId="FRM-00658" title="Grievance Intake – Request/Initiation Form">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => { console.log('Submit FRM00658', values); alert('Saved'); }}>
        {({ values, setFieldValue }) => (<Form>{renderFormContent(values, setFieldValue)}</Form>)}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00658;
