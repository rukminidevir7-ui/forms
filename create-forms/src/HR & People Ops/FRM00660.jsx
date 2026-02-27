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
  approvedLastWorkingDay: Yup.string(),
  noticePeriodServed: Yup.string(),
  assetReturnStatus: Yup.string(),
  itAccessRevocationStatus: Yup.string(),
  financeClearanceStatus: Yup.string(),
  adminClearanceStatus: Yup.string(),
  leaveEncashmentApproved: Yup.string(),
  finalSettlementAmount: Yup.string(),
  exitType: Yup.string(),
  hrRepresentativeName: Yup.string(),
  approvalSignatureDate: Yup.string(),
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  formId: 'FRM-00660',
  employeeFullName: '',
  employeeID: '',
  department: '',
  jobTitle: '',
  approvedLastWorkingDay: '',
  noticePeriodServed: '',
  assetReturnStatus: '',
  itAccessRevocationStatus: '',
  financeClearanceStatus: '',
  adminClearanceStatus: '',
  leaveEncashmentApproved: '',
  finalSettlementAmount: '',
  exitType: '',
  hrRepresentativeName: '',
  approvalSignatureDate: '',
  customFields: [],
  signatures: { approver: { type: '', data: '', name: '' } }
};

const FRM00660 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue) => (
    <ModernA4Template formId="FRM-00660" title="Exit Clearance – Approval/Authorization Form" department="HR & People Ops">
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
        <h3 className="form-section-title">Exit Details</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field"><label className="form-label">Approved Last Working Day</label>{isPrintMode ? <div className="print-value">{values.approvedLastWorkingDay || '___________________'}</div> : <Field name="approvedLastWorkingDay" type="date" className="form-input"/>}</div>
            <div className="form-field"><label className="form-label">Exit Type</label>{isPrintMode ? <div className="print-value">{values.exitType || '___________________'}</div> : <Field name="exitType" as="select" className="form-input"><option value="">Select</option><option value="Resignation">Resignation</option><option value="Termination">Termination</option><option value="Retirement">Retirement</option><option value="Contract End">Contract End</option></Field>}</div>
          </div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Notice Period Served (Yes/No)</label>{isPrintMode ? <div className="print-value">{values.noticePeriodServed || '___________________'}</div> : <Field name="noticePeriodServed" as="select" className="form-input"><option value="">Select</option><option value="Yes">Yes</option><option value="No">No</option></Field>}</div>
        </div>
      </div>
      <div className="form-section">
        <h3 className="form-section-title">Clearance Status</h3>
        <div className="form-fields">
          <div className="form-field"><label className="form-label">Asset Return Status</label>{isPrintMode ? <div className="print-value">{values.assetReturnStatus || '___________________'}</div> : <Field name="assetReturnStatus" as="select" className="form-input"><option value="">Select</option><option value="Returned">Returned</option><option value="Pending">Pending</option><option value="N/A">N/A</option></Field>}</div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">IT Access Revocation Status</label>{isPrintMode ? <div className="print-value">{values.itAccessRevocationStatus || '___________________'}</div> : <Field name="itAccessRevocationStatus" as="select" className="form-input"><option value="">Select</option><option value="Revoked">Revoked</option><option value="Pending">Pending</option><option value="N/A">N/A</option></Field>}</div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Finance Clearance Status</label>{isPrintMode ? <div className="print-value">{values.financeClearanceStatus || '___________________'}</div> : <Field name="financeClearanceStatus" as="select" className="form-input"><option value="">Select</option><option value="Cleared">Cleared</option><option value="Pending">Pending</option><option value="Not Required">Not Required</option></Field>}</div>
          <div className="form-field" style={{ marginTop: '15px' }}><label className="form-label">Admin Clearance Status</label>{isPrintMode ? <div className="print-value">{values.adminClearanceStatus || '___________________'}</div> : <Field name="adminClearanceStatus" as="select" className="form-input"><option value="">Select</option><option value="Cleared">Cleared</option><option value="Pending">Pending</option><option value="Not Required">Not Required</option></Field>}</div>
        </div>
      </div>
      <div className="form-section">
        <h3 className="form-section-title">Settlement & Authorization</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field">
              <label className="form-label">Leave Encashment Approved (Yes/No)</label>
              {isPrintMode ? (
                <div className="print-value">{values.leaveEncashmentApproved || '___________________'}</div>
              ) : (
                <Field name="leaveEncashmentApproved" as="select" className="form-input">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Field>
              )}
            </div>
            <div className="form-field">
              <label className="form-label">Final Settlement Amount</label>
              {isPrintMode ? (
                <div className="print-value">{values.finalSettlementAmount || '___________________'}</div>
              ) : (
                <Field name="finalSettlementAmount" className="form-input" placeholder="Amount" />
              )}
            </div>
          </div>
          <div className="form-field" style={{ marginTop: '15px' }}>
            <label className="form-label">HR Representative Name</label>
            {isPrintMode ? (
              <div className="print-value">{values.hrRepresentativeName || '___________________'}</div>
            ) : (
              <Field name="hrRepresentativeName" className="form-input" />
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
        <h3 className="form-section-title">Approval Signature</h3>
        {!isPrintMode ? (
          <div className="form-fields">
            <SignatureComponent name="Approving Authority" onChange={(sig) => setFieldValue('signatures.approver', sig)} value={values.signatures.approver} />
            <div style={{ marginTop: '15px' }}><label className="form-label">Approval Signature Date</label><Field name="approvalSignatureDate" type="date" className="form-input"/></div>
          </div>
        ) : (
          <div className="print-signatures">{values.signatures.approver?.data && <img src={values.signatures.approver.data} alt="Signature" style={{ maxHeight: 80 }} />}</div>
        )}
      </div>
      {!isPrintMode && (<div className="form-actions"><button type="submit" className="btn-submit">💾 Save Form</button></div>)}
    </ModernA4Template>
  );

  return (
    <ModernFormWrapper formId="FRM-00660" title="Exit Clearance – Approval/Authorization Form">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => { console.log('Submit FRM00660', values); alert('Saved'); }}>
        {({ values, setFieldValue }) => (<Form>{renderFormContent(values, setFieldValue)}</Form>)}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00660;
