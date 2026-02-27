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
  initiationDate: Yup.string().required('Date of Initiation is required'),
  employeeID: Yup.string().required('Employee ID is required'),
  employeeFullName: Yup.string().required('Employee Full Name is required'),
  department: Yup.string().required('Department is required'),
  designation: Yup.string().required('Designation is required'),
  dateOfJoining: Yup.string().required('Date of Joining is required'),
  probationEndDate: Yup.string().required('Probation End Date is required'),
  reportingManager: Yup.string().required('Reporting Manager is required'),
  attendanceSummary: Yup.string(),
  performanceRating: Yup.string(),
  keyPerformanceSummary: Yup.string(),
  strengths: Yup.string(),
  areasOfImprovement: Yup.string(),
  managerRecommendation: Yup.string().required('Manager Recommendation is required'),
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  formId: '',
  initiationDate: '',
  employeeID: '',
  employeeFullName: '',
  department: '',
  designation: '',
  dateOfJoining: '',
  probationEndDate: '',
  reportingManager: '',
  attendanceSummary: '',
  performanceRating: '',
  keyPerformanceSummary: '',
  strengths: '',
  areasOfImprovement: '',
  managerRecommendation: '',
  customFields: [],
  signatures: { manager: { type: '', data: '', name: '' } }
};

const FRM00643 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue) => (
    <ModernA4Template formId="FRM-00643" title="Probation Review – Request / Initiation" department="HR & People Ops">
      <div className="form-section">
        <h3 className="form-section-title">Form Information</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Form ID</label>
            {isPrintMode ? <div className="print-value">{values.formId || '___________________'}</div> : (
              <>
                <Field name="formId" className="form-input" />
                <ErrorMessage name="formId" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Date of Initiation</label>
            {isPrintMode ? <div className="print-value">{values.initiationDate || '___________________'}</div> : (
              <>
                <Field name="initiationDate" type="date" className="form-input" />
                <ErrorMessage name="initiationDate" component="div" className="form-error" />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Employee Details</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field">
              <label className="form-label required">Employee ID</label>
              {isPrintMode ? <div className="print-value">{values.employeeID || '___________________'}</div> : (
                <Field name="employeeID" className="form-input" />
              )}
            </div>
            <div className="form-field">
              <label className="form-label required">Employee Full Name</label>
              {isPrintMode ? <div className="print-value">{values.employeeFullName || '___________________'}</div> : (
                <Field name="employeeFullName" className="form-input" />
              )}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field">
              <label className="form-label required">Department</label>
              {isPrintMode ? <div className="print-value">{values.department || '___________________'}</div> : (
                <Field name="department" className="form-input" />
              )}
            </div>
            <div className="form-field">
              <label className="form-label required">Designation</label>
              {isPrintMode ? <div className="print-value">{values.designation || '___________________'}</div> : (
                <Field name="designation" className="form-input" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Probation & Manager Review</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field">
              <label className="form-label required">Date of Joining</label>
              {isPrintMode ? <div className="print-value">{values.dateOfJoining || '___________________'}</div> : (
                <Field name="dateOfJoining" type="date" className="form-input" />
              )}
            </div>
            <div className="form-field">
              <label className="form-label required">Probation End Date</label>
              {isPrintMode ? <div className="print-value">{values.probationEndDate || '___________________'}</div> : (
                <Field name="probationEndDate" type="date" className="form-input" />
              )}
            </div>
          </div>

          <div style={{ marginTop: '15px' }}>
            <label className="form-label required">Reporting Manager Name</label>
            {isPrintMode ? <div className="print-value">{values.reportingManager || '___________________'}</div> : (
              <Field name="reportingManager" className="form-input" />
            )}
          </div>

          <div style={{ marginTop: '15px' }}>
            <label className="form-label">Attendance & Leave Summary</label>
            {isPrintMode ? <div className="print-value">{values.attendanceSummary || '___________________'}</div> : (
              <Field name="attendanceSummary" as="textarea" rows="3" className="form-input" />
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field">
              <label className="form-label">Performance Rating</label>
              {isPrintMode ? <div className="print-value">{values.performanceRating || '___________________'}</div> : (
                <Field name="performanceRating" className="form-input" />
              )}
            </div>
            <div className="form-field">
              <label className="form-label">Key Performance Summary</label>
              {isPrintMode ? <div className="print-value">{values.keyPerformanceSummary || '___________________'}</div> : (
                <Field name="keyPerformanceSummary" as="textarea" rows="2" className="form-input" />
              )}
            </div>
          </div>

          <div style={{ marginTop: '15px' }}>
            <label className="form-label">Strengths</label>
            {isPrintMode ? <div className="print-value">{values.strengths || '___________________'}</div> : (
              <Field name="strengths" as="textarea" rows="2" className="form-input" />
            )}
          </div>

          <div style={{ marginTop: '15px' }}>
            <label className="form-label">Areas of Improvement</label>
            {isPrintMode ? <div className="print-value">{values.areasOfImprovement || '___________________'}</div> : (
              <Field name="areasOfImprovement" as="textarea" rows="2" className="form-input" />
            )}
          </div>

          <div style={{ marginTop: '15px' }}>
            <label className="form-label required">Manager Recommendation</label>
            {isPrintMode ? <div className="print-value">{values.managerRecommendation || '___________________'}</div> : (
              <Field name="managerRecommendation" as="select" className="form-input">
                <option value="">Select</option>
                <option value="Confirm">Confirm</option>
                <option value="Extend">Extend</option>
                <option value="Terminate">Terminate</option>
              </Field>
            )}
          </div>
        </div>
      </div>

      {!isPrintMode && (
        <div className="form-section">
          <h3 className="form-section-title">➕ Additional Custom Fields</h3>
          <FieldArray name="customFields">
            {(arrayHelpers) => (
              <div>
                {values.customFields && values.customFields.map((f, idx) => (
                  <div key={f.id || idx} className="custom-field-row">
                    <div className="form-field"><Field name={`customFields.${idx}.fieldName`} className="form-input" placeholder="Field Name" /></div>
                    <div className="form-field" style={{ flex: 2 }}><Field name={`customFields.${idx}.fieldValue`} className="form-input" placeholder="Field Value" /></div>
                    <button type="button" className="btn-remove" onClick={() => arrayHelpers.remove(idx)}>✕ Remove</button>
                  </div>
                ))}
                <button type="button" className="btn-add-field" onClick={() => arrayHelpers.push({ id: Math.random().toString(36).slice(2), fieldName: '', fieldValue: '' })}>➕ Add Field</button>
              </div>
            )}
          </FieldArray>
        </div>
      )}

      <div className="form-section">
        <h3 className="form-section-title">Manager Signature</h3>
        {!isPrintMode ? (
          <div className="form-fields">
            <SignatureComponent name="Manager" onChange={(sig) => setFieldValue('signatures.manager', sig)} value={values.signatures.manager} />
            <div style={{ marginTop: '15px' }}>
              <label className="form-label">Name (Print)</label>
              <Field name="signatures.manager.name" className="form-input" />
            </div>
          </div>
        ) : (
          <div className="print-signatures">
            {values.signatures.manager?.data && <img src={values.signatures.manager.data} alt="Signature" style={{ maxHeight: 80 }} />}
          </div>
        )}
      </div>

      {!isPrintMode && (
        <div className="form-actions"><button type="submit" className="btn-submit">💾 Save Form</button></div>
      )}
    </ModernA4Template>
  );

  return (
    <ModernFormWrapper formId="FRM-00643" title="Probation Review – Request / Initiation">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => { console.log('Submit FRM00643', values); alert('Saved'); }}>
        {({ values, setFieldValue }) => (
          <Form>{renderFormContent(values, setFieldValue)}</Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00643;
