import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import SignatureComponent from '../components/SignatureComponent';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({
  interviewRefNo: Yup.string().required('Interview Reference No. is required'),
  candidateName: Yup.string().required('Candidate Name is required'),
  approvingAuthorityName: Yup.string().required('Approving Authority Name is required'),
  finalDecision: Yup.string().required('Final Decision is required'),
  decisionComments: Yup.string().required('Decision Comments is required'),
  nextAction: Yup.string().required('Next Action is required'),
  approvalDate: Yup.string().required('Approval Date is required'),
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  interviewRefNo: '',
  candidateName: '',
  approvingAuthorityName: '',
  finalDecision: '',
  decisionComments: '',
  nextAction: '',
  approvalDate: '',
  customFields: [],
  signatures: {
    hiringManager: { type: '', data: '', name: '' },
    hrHead: { type: '', data: '', name: '' }
  }
};

const FRM00615 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue, errors, touched) => (
    <ModernA4Template formId="FRM-00615" title="Interview Feedback – Approval/Authorization Form" department="HR & People Ops">
      <div className="form-section">
        <h3 className="form-section-title">📋 Approval Information</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Interview Reference No.</label>
            {isPrintMode ? (
              <div className="print-value">{values.interviewRefNo || '___________________'}</div>
            ) : (
              <>
                <Field name="interviewRefNo" className="form-input" placeholder="e.g., INT-001-2024" />
                <ErrorMessage name="interviewRefNo" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Candidate Name</label>
            {isPrintMode ? (
              <div className="print-value">{values.candidateName || '___________________'}</div>
            ) : (
              <>
                <Field name="candidateName" className="form-input" placeholder="Enter candidate name" />
                <ErrorMessage name="candidateName" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Approving Authority Name</label>
            {isPrintMode ? (
              <div className="print-value">{values.approvingAuthorityName || '___________________'}</div>
            ) : (
              <>
                <Field name="approvingAuthorityName" className="form-input" placeholder="Enter approving authority name" />
                <ErrorMessage name="approvingAuthorityName" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Final Decision</label>
            {isPrintMode ? (
              <div className="print-value">{values.finalDecision || '___________________'}</div>
            ) : (
              <>
                <Field name="finalDecision" as="select" className="form-input">
                  <option value="">-- Select Decision --</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="On Hold">On Hold</option>
                </Field>
                <ErrorMessage name="finalDecision" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field full-width">
            <label className="form-label required">Decision Comments</label>
            {isPrintMode ? (
              <div className="print-value">{values.decisionComments || '___________________'}</div>
            ) : (
              <>
                <Field name="decisionComments" as="textarea" className="form-textarea" placeholder="Add decision comments" rows="2" />
                <ErrorMessage name="decisionComments" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Next Action</label>
            {isPrintMode ? (
              <div className="print-value">{values.nextAction || '___________________'}</div>
            ) : (
              <>
                <Field name="nextAction" as="select" className="form-input">
                  <option value="">-- Select Action --</option>
                  <option value="Offer">Offer</option>
                  <option value="Next Round">Next Round</option>
                  <option value="Reject">Reject</option>
                </Field>
                <ErrorMessage name="nextAction" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Approval Date</label>
            {isPrintMode ? (
              <div className="print-value">{values.approvalDate || '___________________'}</div>
            ) : (
              <>
                <Field name="approvalDate" type="date" className="form-input" />
                <ErrorMessage name="approvalDate" component="div" className="form-error" />
              </>
            )}
          </div>
        </div>
      </div>

      {!isPrintMode && (
        <div className="form-section">
          <h3 className="form-section-title">➕ Additional Custom Fields</h3>
          <FieldArray name="customFields">
            {(fieldArrayProps) => {
              const { push, remove, form } = fieldArrayProps;
              const { values } = form;
              const { customFields } = values;
              return (
                <div>
                  {customFields.map((field, index) => (
                    <div key={field.id || index} className="custom-field-row">
                      <div className="form-field">
                        <Field name={`customFields.${index}.fieldName`} className="form-input" placeholder="Field Name" />
                      </div>
                      <div className="form-field" style={{ flex: 2 }}>
                        <Field name={`customFields.${index}.fieldValue`} className="form-input" placeholder="Field Value" />
                      </div>
                      <button type="button" className="btn-remove" onClick={() => remove(index)}>✕ Remove</button>
                    </div>
                  ))}
                  <button type="button" className="btn-add-field" onClick={() => push({ id: uuidv4(), fieldName: '', fieldValue: '' })}>➕ Add Field</button>
                </div>
              );
            }}
          </FieldArray>
        </div>
      )}

      {isPrintMode && values.customFields && values.customFields.length > 0 && (
        <div className="form-section">
          <h3 className="form-section-title">➕ Additional Fields</h3>
          <div className="form-fields">
            {values.customFields.map((field, index) => (
              <div key={index} className="form-field full-width custom-field-print">
                <strong>{field.fieldName}:</strong> {field.fieldValue || '___________________'}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="form-section signatures-section">
        <h3 className="form-section-title">✍️ Digital Signatures & Approvals</h3>
        {!isPrintMode && (
          <div className="signatures-container">
            <SignatureComponent name="Hiring Manager" onChange={(sig) => setFieldValue('signatures.hiringManager', sig)} value={values.signatures.hiringManager} />
            <SignatureComponent name="HR Head" onChange={(sig) => setFieldValue('signatures.hrHead', sig)} value={values.signatures.hrHead} />
          </div>
        )}
        {isPrintMode && (
          <div className="print-signatures">
            {['hiringManager', 'hrHead'].map((role) => (
              <div key={role} className="print-signature-box">
                <div className="sig-name">{role === 'hiringManager' ? 'Hiring Manager' : 'HR Head'}</div>
                <div className="sig-space">
                  {values.signatures[role]?.data && <img src={values.signatures[role].data} alt={`Signature - ${role}`} className="print-sig-image" style={{ maxWidth: '100%', maxHeight: '80px' }} />}
                </div>
                <div className="sig-line"></div>
                <div className="sig-date">{values.signatures[role]?.name && `Name: ${values.signatures[role].name}`}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {!isPrintMode && (
        <div className="form-actions">
          <button type="submit" className="btn-submit">💾 Save Form</button>
        </div>
      )}
    </ModernA4Template>
  );

  return (
    <ModernFormWrapper formId="FRM-00615" title="Interview Feedback – Approval/Authorization Form">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => { console.log('Form submitted:', values); alert('✅ Form saved successfully!'); }}>
        {({ values, setFieldValue, errors, touched }) => (
          <Form>{renderFormContent(values, setFieldValue, errors, touched)}</Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00615;