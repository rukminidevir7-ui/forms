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
  requestDate: Yup.string().required('Date of Request is required'),
  employeeID: Yup.string().required('Employee ID is required'),
  employeeFullName: Yup.string().required('Employee Full Name is required'),
  department: Yup.string().required('Department is required'),
  designation: Yup.string().required('Designation is required'),
  dateOfJoining: Yup.string().required('Date of Joining is required'),
  probationCompletionDate: Yup.string().required('Probation Completion Date is required'),
  reportingManager: Yup.string().required('Reporting Manager is required'),
  overallRating: Yup.number().min(1).max(5),
  keyAchievements: Yup.string(),
  attendanceStatus: Yup.string(),
  disciplinaryStatus: Yup.string(),
  recommendedEffectiveDate: Yup.string(),
  managerRecommendation: Yup.string().required('Manager Recommendation is required'),
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  formId: '',
  requestDate: '',
  employeeID: '',
  employeeFullName: '',
  department: '',
  designation: '',
  dateOfJoining: '',
  probationCompletionDate: '',
  reportingManager: '',
  overallRating: '',
  keyAchievements: '',
  attendanceStatus: '',
  disciplinaryStatus: '',
  recommendedEffectiveDate: '',
  managerRecommendation: '',
  customFields: [],
  signatures: { manager: { type: '', data: '', name: '' } }
};

const FRM00646 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue) => (
    <ModernA4Template formId="FRM-00646" title="Confirmation – Request / Initiation" department="HR & People Ops">

      <div className="form-section">
        <h3 className="form-section-title">Form Info</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Form ID</label>
            {isPrintMode ? <div className="print-value">{values.formId || '___________________'}</div> : (<><Field name="formId" className="form-input" /><ErrorMessage name="formId" component="div" className="form-error"/></>) }
          </div>
          <div className="form-field">
            <label className="form-label required">Date of Request</label>
            {isPrintMode ? <div className="print-value">{values.requestDate || '___________________'}</div> : (<Field name="requestDate" type="date" className="form-input" />)}
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Employee Details</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field">
              <label className="form-label required">Employee ID</label>
              {isPrintMode ? <div className="print-value">{values.employeeID || '___________________'}</div> : <Field name="employeeID" className="form-input"/>}
            </div>
            <div className="form-field">
              <label className="form-label required">Employee Full Name</label>
              {isPrintMode ? <div className="print-value">{values.employeeFullName || '___________________'}</div> : <Field name="employeeFullName" className="form-input"/>}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field">
              <label className="form-label required">Department</label>
              {isPrintMode ? <div className="print-value">{values.department || '___________________'}</div> : <Field name="department" className="form-input"/>}
            </div>
            <div className="form-field">
              <label className="form-label required">Designation</label>
              {isPrintMode ? <div className="print-value">{values.designation || '___________________'}</div> : <Field name="designation" className="form-input"/>}
            </div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Confirmation Details</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field">
              <label className="form-label required">Date of Joining</label>
              {isPrintMode ? <div className="print-value">{values.dateOfJoining || '___________________'}</div> : <Field name="dateOfJoining" type="date" className="form-input"/>}
            </div>
            <div className="form-field">
              <label className="form-label required">Probation Completion Date</label>
              {isPrintMode ? <div className="print-value">{values.probationCompletionDate || '___________________'}</div> : <Field name="probationCompletionDate" type="date" className="form-input"/>}
            </div>
          </div>

          <div style={{ marginTop: '15px' }}>
            <label className="form-label required">Reporting Manager Name</label>
            {isPrintMode ? <div className="print-value">{values.reportingManager || '___________________'}</div> : <Field name="reportingManager" className="form-input"/>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field">
              <label className="form-label">Overall Performance Rating (1-5)</label>
              {isPrintMode ? <div className="print-value">{values.overallRating || '___________________'}</div> : <Field name="overallRating" type="number" min="1" max="5" className="form-input"/>}
            </div>
            <div className="form-field">
              <label className="form-label">Attendance & Policy Compliance Status</label>
              {isPrintMode ? <div className="print-value">{values.attendanceStatus || '___________________'}</div> : <Field name="attendanceStatus" className="form-input"/>}
            </div>
          </div>

          <div style={{ marginTop: '15px' }}>
            <label className="form-label">Key Achievements During Probation</label>
            {isPrintMode ? <div className="print-value">{values.keyAchievements || '___________________'}</div> : <Field name="keyAchievements" as="textarea" rows="3" className="form-input"/>}
          </div>

          <div style={{ marginTop: '15px' }}>
            <label className="form-label">Disciplinary Record Status</label>
            {isPrintMode ? <div className="print-value">{values.disciplinaryStatus || '___________________'}</div> : (
              <Field name="disciplinaryStatus" as="select" className="form-input"><option value="">Select</option><option value="Clear">Clear</option><option value="Warning Issued">Warning Issued</option></Field>
            )}
          </div>

          <div style={{ marginTop: '15px' }}>
            <label className="form-label">Recommended Confirmation Effective Date</label>
            {isPrintMode ? <div className="print-value">{values.recommendedEffectiveDate || '___________________'}</div> : <Field name="recommendedEffectiveDate" type="date" className="form-input"/>}
          </div>

          <div style={{ marginTop: '15px' }}>
            <label className="form-label required">Manager Recommendation</label>
            {isPrintMode ? <div className="print-value">{values.managerRecommendation || '___________________'}</div> : (
              <Field name="managerRecommendation" as="select" className="form-input"><option value="">Select</option><option value="Confirm">Confirm</option><option value="Extend">Extend</option><option value="Hold">Hold</option></Field>
            )}
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
        <h3 className="form-section-title">Manager Signature</h3>
        {!isPrintMode ? (
          <div className="form-fields">
            <SignatureComponent name="Manager" onChange={(sig) => setFieldValue('signatures.manager', sig)} value={values.signatures.manager} />
            <div style={{ marginTop: '15px' }}><label className="form-label">Name (Print)</label><Field name="signatures.manager.name" className="form-input"/></div>
          </div>
        ) : (
          <div className="print-signatures">{values.signatures.manager?.data && <img src={values.signatures.manager.data} alt="Signature" style={{ maxHeight: 80 }} />}</div>
        )}
      </div>

      {!isPrintMode && (<div className="form-actions"><button type="submit" className="btn-submit">💾 Save Form</button></div>)}

    </ModernA4Template>
  );

  return (
    <ModernFormWrapper formId="FRM-00646" title="Confirmation – Request / Initiation">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => { console.log('Submit FRM00646', values); alert('Saved'); }}>
        {({ values, setFieldValue }) => (<Form>{renderFormContent(values, setFieldValue)}</Form>)}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00646;
