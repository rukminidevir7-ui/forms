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
  leaveType: Yup.string(),
  leaveStartDate: Yup.string(),
  leaveEndDate: Yup.string(),
  totalNumberOfLeaveDays: Yup.string(),
  reasonForLeave: Yup.string(),
  emergencyContactNumber: Yup.string(),
  workHandoverTo: Yup.string(),
  leaveBalanceAvailable: Yup.string(),
  reportingManagerName: Yup.string(),
  employeeSignatureDate: Yup.string(),
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  formId: 'FRM-00653',
  employeeFullName: '',
  employeeID: '',
  department: '',
  jobTitle: '',
  leaveType: '',
  leaveStartDate: '',
  leaveEndDate: '',
  totalNumberOfLeaveDays: '',
  reasonForLeave: '',
  emergencyContactNumber: '',
  workHandoverTo: '',
  leaveBalanceAvailable: '',
  reportingManagerName: '',
  employeeSignatureDate: '',
  customFields: [],
  signatures: { employee: { type: '', data: '', name: '' } }
};

const FRM00653 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue) => (
    <ModernA4Template formId="FRM-00653" title="Leave Application – Request/Initiation Form" department="HR & People Ops">

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
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Emergency Contact Number</label>{isPrintMode ? <div className="print-value">{values.emergencyContactNumber || '___________________'}</div> : <Field name="emergencyContactNumber" className="form-input"/>}</div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Leave Details</h3>
        <div className="form-fields">
          <div className="form-field"><label className="form-label">Leave Type (Casual/Sick/Earned/Maternity/etc.)</label>{isPrintMode ? <div className="print-value">{values.leaveType || '___________________'}</div> : <Field name="leaveType" as="select" className="form-input"><option value="">Select</option><option value="Casual">Casual</option><option value="Sick">Sick</option><option value="Earned">Earned</option><option value="Maternity">Maternity</option><option value="Paternity">Paternity</option><option value="Other">Other</option></Field>}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field"><label className="form-label">Leave Start Date</label>{isPrintMode ? <div className="print-value">{values.leaveStartDate || '___________________'}</div> : <Field name="leaveStartDate" type="date" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">Leave End Date</label>{isPrintMode ? <div className="print-value">{values.leaveEndDate || '___________________'}</div> : <Field name="leaveEndDate" type="date" className="form-input"/>}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field"><label className="form-label">Total Number of Leave Days</label>{isPrintMode ? <div className="print-value">{values.totalNumberOfLeaveDays || '___________________'}</div> : <Field name="totalNumberOfLeaveDays" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">Leave Balance Available</label>{isPrintMode ? <div className="print-value">{values.leaveBalanceAvailable || '___________________'}</div> : <Field name="leaveBalanceAvailable" className="form-input"/>}</div>
          </div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Reason for Leave</label>{isPrintMode ? <div className="print-value">{values.reasonForLeave || '___________________'}</div> : <Field name="reasonForLeave" as="textarea" className="form-input" style={{ minHeight: '80px' }}/>}</div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Work Handover & Manager</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label">Work Handover To (Employee Name)</label>{isPrintMode ? <div className="print-value">{values.workHandoverTo || '___________________'}</div> : <Field name="workHandoverTo" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">Reporting Manager Name</label>{isPrintMode ? <div className="print-value">{values.reportingManagerName || '___________________'}</div> : <Field name="reportingManagerName" className="form-input"/>}</div>
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
    <ModernFormWrapper formId="FRM-00653" title="Leave Application – Request/Initiation Form">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => { console.log('Submit FRM00653', values); alert('Saved'); }}>
        {({ values, setFieldValue }) => (<Form>{renderFormContent(values, setFieldValue)}</Form>)}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00653;
