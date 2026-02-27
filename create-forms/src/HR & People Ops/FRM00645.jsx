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
  employeeID: Yup.string().required('Employee ID is required'),
  employeeName: Yup.string().required('Employee Name is required'),
  department: Yup.string().required('Department is required'),
  designation: Yup.string().required('Designation is required'),
  dateOfJoining: Yup.string().required('Date of Joining is required'),
  probationStartDate: Yup.string().required('Probation Start Date is required'),
  probationEndDate: Yup.string().required('Probation End Date is required'),
  finalReviewDate: Yup.string().required('Final Review Date is required'),
  finalPerformanceRating: Yup.string(),
  finalDecision: Yup.string().required('Final Decision is required'),
  salaryBefore: Yup.string(),
  salaryAfter: Yup.string(),
  confirmationLetterRef: Yup.string(),
  recordCreatedDate: Yup.string().required('Record Created Date is required'),
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  formId: '',
  employeeID: '',
  employeeName: '',
  department: '',
  designation: '',
  dateOfJoining: '',
  probationStartDate: '',
  probationEndDate: '',
  finalReviewDate: '',
  finalPerformanceRating: '',
  finalDecision: '',
  salaryBefore: '',
  salaryAfter: '',
  confirmationLetterRef: '',
  recordCreatedDate: '',
  customFields: [],
  signatures: { recordKeeper: { type: '', data: '', name: '' } }
};

const FRM00645 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue) => (
    <ModernA4Template formId="FRM-00645" title="Probation Review – Report / Record" department="HR & People Ops">
      <div className="form-section">
        <h3 className="form-section-title">Record Header</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Form ID</label>
            {isPrintMode ? <div className="print-value">{values.formId || '___________________'}</div> : <Field name="formId" className="form-input" />}
          </div>
          <div className="form-field">
            <label className="form-label required">Employee ID</label>
            {isPrintMode ? <div className="print-value">{values.employeeID || '___________________'}</div> : <Field name="employeeID" className="form-input" />}
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Employee & Probation</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field">
              <label className="form-label required">Employee Name</label>
              {isPrintMode ? <div className="print-value">{values.employeeName || '___________________'}</div> : <Field name="employeeName" className="form-input" />}
            </div>
            <div className="form-field">
              <label className="form-label required">Department</label>
              {isPrintMode ? <div className="print-value">{values.department || '___________________'}</div> : <Field name="department" className="form-input" />}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field">
              <label className="form-label required">Designation</label>
              {isPrintMode ? <div className="print-value">{values.designation || '___________________'}</div> : <Field name="designation" className="form-input" />}
            </div>
            <div className="form-field">
              <label className="form-label required">Date of Joining</label>
              {isPrintMode ? <div className="print-value">{values.dateOfJoining || '___________________'}</div> : <Field name="dateOfJoining" type="date" className="form-input" />}
            </div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Probation Review Summary</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Probation Start Date</label>
            {isPrintMode ? <div className="print-value">{values.probationStartDate || '___________________'}</div> : <Field name="probationStartDate" type="date" className="form-input" />}
          </div>
          <div className="form-field">
            <label className="form-label required">Probation End Date</label>
            {isPrintMode ? <div className="print-value">{values.probationEndDate || '___________________'}</div> : <Field name="probationEndDate" type="date" className="form-input" />}
          </div>
          <div className="form-field" style={{ marginTop: '15px' }}>
            <label className="form-label required">Final Review Date</label>
            {isPrintMode ? <div className="print-value">{values.finalReviewDate || '___________________'}</div> : <Field name="finalReviewDate" type="date" className="form-input" />}
          </div>

          <div className="form-field" style={{ marginTop: '15px' }}>
            <label className="form-label">Final Performance Rating</label>
            {isPrintMode ? <div className="print-value">{values.finalPerformanceRating || '___________________'}</div> : <Field name="finalPerformanceRating" className="form-input" />}
          </div>

          <div className="form-field" style={{ marginTop: '15px' }}>
            <label className="form-label required">Final Decision</label>
            {isPrintMode ? <div className="print-value">{values.finalDecision || '___________________'}</div> : (
              <Field name="finalDecision" as="select" className="form-input">
                <option value="">Select</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Extended">Extended</option>
                <option value="Terminated">Terminated</option>
              </Field>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field">
              <label className="form-label">Salary Before Confirmation</label>
              {isPrintMode ? <div className="print-value">{values.salaryBefore || '___________________'}</div> : <Field name="salaryBefore" className="form-input" />}
            </div>
            <div className="form-field">
              <label className="form-label">Salary After Confirmation</label>
              {isPrintMode ? <div className="print-value">{values.salaryAfter || '___________________'}</div> : <Field name="salaryAfter" className="form-input" />}
            </div>
          </div>

          <div className="form-field" style={{ marginTop: '15px' }}>
            <label className="form-label">Confirmation Letter Reference Number</label>
            {isPrintMode ? <div className="print-value">{values.confirmationLetterRef || '___________________'}</div> : <Field name="confirmationLetterRef" className="form-input" />}
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
        <h3 className="form-section-title">Record Keeper</h3>
        {!isPrintMode ? (
          <div className="form-fields">
            <SignatureComponent name="Record Keeper" onChange={(sig) => setFieldValue('signatures.recordKeeper', sig)} value={values.signatures.recordKeeper} />
            <div style={{ marginTop: '15px' }}>
              <label className="form-label">Name (Print)</label>
              <Field name="signatures.recordKeeper.name" className="form-input" />
            </div>
          </div>
        ) : (
          <div className="print-signatures">{values.signatures.recordKeeper?.data && <img src={values.signatures.recordKeeper.data} alt="Signature" style={{ maxHeight: 80 }} />}</div>
        )}
      </div>

      {!isPrintMode && (
        <div className="form-actions"><button type="submit" className="btn-submit">💾 Save Form</button></div>
      )}
    </ModernA4Template>
  );

  return (
    <ModernFormWrapper formId="FRM-00645" title="Probation Review – Report / Record">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => { console.log('Submit FRM00645', values); alert('Saved'); }}>
        {({ values, setFieldValue }) => (
          <Form>{renderFormContent(values, setFieldValue)}</Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00645;
