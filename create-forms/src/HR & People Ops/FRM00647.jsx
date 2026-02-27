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
  referenceFormId: Yup.string().required('Reference Request Form ID is required'),
  employeeID: Yup.string().required('Employee ID is required'),
  employeeName: Yup.string().required('Employee Name is required'),
  department: Yup.string().required('Department is required'),
  designation: Yup.string().required('Designation is required'),
  dateOfJoining: Yup.string().required('Date of Joining is required'),
  recommendedConfirmationDate: Yup.string(),
  managerRecommendation: Yup.string().required('Manager Recommendation is required'),
  hrReviewComments: Yup.string(),
  finalDecision: Yup.string().required('Final Decision is required'),
  effectiveConfirmationDate: Yup.string(),
  salaryRevisionApproved: Yup.string(),
  approvingAuthority: Yup.string().required('Approving Authority is required'),
  approvalDate: Yup.string().required('Approval Date is required'),
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  formId: '',
  referenceFormId: '',
  employeeID: '',
  employeeName: '',
  department: '',
  designation: '',
  dateOfJoining: '',
  recommendedConfirmationDate: '',
  managerRecommendation: '',
  hrReviewComments: '',
  finalDecision: '',
  effectiveConfirmationDate: '',
  salaryRevisionApproved: '',
  approvingAuthority: '',
  approvalDate: '',
  customFields: [],
  signatures: { approver: { type: '', data: '', name: '' } }
};

const FRM00647 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue) => (
    <ModernA4Template formId="FRM-00647" title="Confirmation – Approval / Authorization" department="HR & People Ops">

      <div className="form-section">
        <h3 className="form-section-title">Reference & Employee</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Form ID</label>
            {isPrintMode ? <div className="print-value">{values.formId || '___________________'}</div> : <Field name="formId" className="form-input" />}
          </div>
          <div className="form-field">
            <label className="form-label required">Reference Request Form ID</label>
            {isPrintMode ? <div className="print-value">{values.referenceFormId || '___________________'}</div> : <Field name="referenceFormId" className="form-input" />}
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Employee Info</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label required">Employee ID</label>{isPrintMode ? <div className="print-value">{values.employeeID || '___________________'}</div> : <Field name="employeeID" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label required">Employee Name</label>{isPrintMode ? <div className="print-value">{values.employeeName || '___________________'}</div> : <Field name="employeeName" className="form-input"/>}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field"><label className="form-label required">Department</label>{isPrintMode ? <div className="print-value">{values.department || '___________________'}</div> : <Field name="department" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label required">Designation</label>{isPrintMode ? <div className="print-value">{values.designation || '___________________'}</div> : <Field name="designation" className="form-input"/>}</div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Recommendations & Decision</h3>
        <div className="form-fields">
          <div className="form-field"><label className="form-label">Recommended Confirmation Date</label>{isPrintMode ? <div className="print-value">{values.recommendedConfirmationDate || '___________________'}</div> : <Field name="recommendedConfirmationDate" type="date" className="form-input"/>}</div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label required">Manager Recommendation</label>{isPrintMode ? <div className="print-value">{values.managerRecommendation || '___________________'}</div> : <Field name="managerRecommendation" className="form-input"/>}</div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">HR Review Comments</label>{isPrintMode ? <div className="print-value">{values.hrReviewComments || '___________________'}</div> : <Field name="hrReviewComments" as="textarea" rows="2" className="form-input"/>}</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field"><label className="form-label required">Final Decision</label>{isPrintMode ? <div className="print-value">{values.finalDecision || '___________________'}</div> : <Field name="finalDecision" as="select" className="form-input"><option value="">Select</option><option value="Approved">Approved</option><option value="Rejected">Rejected</option><option value="On Hold">On Hold</option></Field>}</div>
            <div className="form-field"><label className="form-label">Effective Confirmation Date</label>{isPrintMode ? <div className="print-value">{values.effectiveConfirmationDate || '___________________'}</div> : <Field name="effectiveConfirmationDate" type="date" className="form-input"/>}</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field"><label className="form-label">Salary Revision Approved</label>{isPrintMode ? <div className="print-value">{values.salaryRevisionApproved || '___________________'}</div> : <Field name="salaryRevisionApproved" as="select" className="form-input"><option value="">Select</option><option value="Yes">Yes</option><option value="No">No</option></Field>}</div>
            <div className="form-field"><label className="form-label required">Approving Authority Name</label>{isPrintMode ? <div className="print-value">{values.approvingAuthority || '___________________'}</div> : <Field name="approvingAuthority" className="form-input"/>}</div>
          </div>

          <div style={{ marginTop: '15px' }}><label className="form-label required">Approval Date</label>{isPrintMode ? <div className="print-value">{values.approvalDate || '___________________'}</div> : <Field name="approvalDate" type="date" className="form-input"/>}</div>
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
        <h3 className="form-section-title">Approver Signature</h3>
        {!isPrintMode ? (
          <div className="form-fields">
            <SignatureComponent name="Approver" onChange={(sig) => setFieldValue('signatures.approver', sig)} value={values.signatures.approver} />
            <div style={{ marginTop: '15px' }}><label className="form-label">Name (Print)</label><Field name="signatures.approver.name" className="form-input"/></div>
          </div>
        ) : (
          <div className="print-signatures">{values.signatures.approver?.data && <img src={values.signatures.approver.data} alt="Signature" style={{ maxHeight: 80 }} />}</div>
        )}
      </div>

      {!isPrintMode && (<div className="form-actions"><button type="submit" className="btn-submit">💾 Save Form</button></div>)}

    </ModernA4Template>
  );

  return (
    <ModernFormWrapper formId="FRM-00647" title="Confirmation – Approval / Authorization">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => { console.log('Submit FRM00647', values); alert('Saved'); }}>
        {({ values, setFieldValue }) => (<Form>{renderFormContent(values, setFieldValue)}</Form>)}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00647;
