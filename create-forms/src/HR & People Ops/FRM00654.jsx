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
  attendanceDate: Yup.string(),
  actualInTime: Yup.string(),
  actualOutTime: Yup.string(),
  reasonForAttendanceDiscrepancy: Yup.string(),
  typeOfIssue: Yup.string(),
  supportingDocumentsSubmitted: Yup.string(),
  reportingManagerName: Yup.string(),
  managerApprovalStatus: Yup.string(),
  hrVerificationStatus: Yup.string(),
  payrollImpact: Yup.string(),
  finalRegularizationStatusDate: Yup.string(),
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  formId: 'FRM-00654',
  employeeFullName: '',
  employeeID: '',
  department: '',
  jobTitle: '',
  attendanceDate: '',
  actualInTime: '',
  actualOutTime: '',
  reasonForAttendanceDiscrepancy: '',
  typeOfIssue: '',
  supportingDocumentsSubmitted: '',
  reportingManagerName: '',
  managerApprovalStatus: '',
  hrVerificationStatus: '',
  payrollImpact: '',
  finalRegularizationStatusDate: '',
  customFields: [],
  signatures: { hrRecord: { type: '', data: '', name: '' } }
};

const FRM00654 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue) => (
    <ModernA4Template formId="FRM-00654" title="Attendance Regularization – Report/Record" department="HR & People Ops">

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
        <h3 className="form-section-title">Attendance Details</h3>
        <div className="form-fields">
          <div className="form-field"><label className="form-label">Attendance Date (To Be Regularized)</label>{isPrintMode ? <div className="print-value">{values.attendanceDate || '___________________'}</div> : <Field name="attendanceDate" type="date" className="form-input"/>}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field"><label className="form-label">Actual In Time</label>{isPrintMode ? <div className="print-value">{values.actualInTime || '___________________'}</div> : <Field name="actualInTime" type="time" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">Actual Out Time</label>{isPrintMode ? <div className="print-value">{values.actualOutTime || '___________________'}</div> : <Field name="actualOutTime" type="time" className="form-input"/>}</div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Discrepancy Details</h3>
        <div className="form-fields">
          <div className="form-field"><label className="form-label">Reason for Attendance Discrepancy</label>{isPrintMode ? <div className="print-value">{values.reasonForAttendanceDiscrepancy || '___________________'}</div> : <Field name="reasonForAttendanceDiscrepancy" as="textarea" className="form-input" style={{ minHeight: '80px' }}/>}</div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Type of Issue (Missed Punch/Late Entry/Early Exit)</label>{isPrintMode ? <div className="print-value">{values.typeOfIssue || '___________________'}</div> : <Field name="typeOfIssue" as="select" className="form-input"><option value="">Select</option><option value="Missed Punch">Missed Punch</option><option value="Late Entry">Late Entry</option><option value="Early Exit">Early Exit</option><option value="Other">Other</option></Field>}</div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Supporting Documents Submitted (Yes/No)</label>{isPrintMode ? <div className="print-value">{values.supportingDocumentsSubmitted || '___________________'}</div> : <Field name="supportingDocumentsSubmitted" as="select" className="form-input"><option value="">Select</option><option value="Yes">Yes</option><option value="No">No</option></Field>}</div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Approval & Verification</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label">Reporting Manager Name</label>{isPrintMode ? <div className="print-value">{values.reportingManagerName || '___________________'}</div> : <Field name="reportingManagerName" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">Manager Approval Status</label>{isPrintMode ? <div className="print-value">{values.managerApprovalStatus || '___________________'}</div> : <Field name="managerApprovalStatus" as="select" className="form-input"><option value="">Select</option><option value="Approved">Approved</option><option value="Rejected">Rejected</option><option value="Pending">Pending</option></Field>}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field"><label className="form-label">HR Verification Status</label>{isPrintMode ? <div className="print-value">{values.hrVerificationStatus || '___________________'}</div> : <Field name="hrVerificationStatus" as="select" className="form-input"><option value="">Select</option><option value="Verified">Verified</option><option value="Under Review">Under Review</option><option value="Rejected">Rejected</option></Field>}</div>
            <div className="form-field"><label className="form-label">Payroll Impact (Yes/No)</label>{isPrintMode ? <div className="print-value">{values.payrollImpact || '___________________'}</div> : <Field name="payrollImpact" as="select" className="form-input"><option value="">Select</option><option value="Yes">Yes</option><option value="No">No</option></Field>}</div>
          </div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Final Regularization Status & Date</label>{isPrintMode ? <div className="print-value">{values.finalRegularizationStatusDate || '___________________'}</div> : <Field name="finalRegularizationStatusDate" type="date" className="form-input"/>}</div>
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
    <ModernFormWrapper formId="FRM-00654" title="Attendance Regularization – Report/Record">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => { console.log('Submit FRM00654', values); alert('Saved'); }}>
        {({ values, setFieldValue }) => (<Form>{renderFormContent(values, setFieldValue)}</Form>)}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00654;
