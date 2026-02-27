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
  candidateFullName: Yup.string().required('Candidate Full Name is required'),
  candidateIDApplicationID: Yup.string().required('Candidate ID / Application ID is required'),
  positionDesignation: Yup.string().required('Position / Designation is required'),
  department: Yup.string().required('Department is required'),
  typeOfDeviationApproved: Yup.string().required('Type of Deviation is required'),
  approvedDeviationDetails: Yup.string().required('Approved Deviation Details is required'),
  justificationSummary: Yup.string().required('Justification Summary is required'),
  approvalAuthorityName: Yup.string().required('Approval Authority Name is required'),
  approvalDate: Yup.string().required('Approval Date is required'),
  deviationStatus: Yup.string().required('Deviation Status is required'),
  effectiveFromDate: Yup.string().required('Effective From Date is required'),
  remarksConditions: Yup.string(),
  recordCreatedDate: Yup.string().required('Record Created Date is required'),
  customFields: Yup.array().of(
    Yup.object({
      fieldName: Yup.string(),
      fieldValue: Yup.string()
    })
  )
});

const initialValues = {
  candidateFullName: '',
  candidateIDApplicationID: '',
  positionDesignation: '',
  department: '',
  typeOfDeviationApproved: '',
  approvedDeviationDetails: '',
  justificationSummary: '',
  approvalAuthorityName: '',
  approvalDate: '',
  deviationStatus: '',
  effectiveFromDate: '',
  remarksConditions: '',
  recordCreatedDate: '',
  customFields: [],
  signatures: {
    recordPreparedBy: { type: '', data: '', name: '' },
    approvedBy: { type: '', data: '', name: '' }
  }
};

const FRM00627 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue, errors, touched) => (
    <ModernA4Template formId="FRM-00627" title="Hiring Deviation – Report/Record Form" department="HR & People Ops">
      {/* CANDIDATE INFORMATION */}
      <div className="form-section">
        <h3 className="form-section-title">👤 Candidate Information</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Candidate Full Name</label>
            {isPrintMode ? (
              <div className="print-value">{values.candidateFullName || '___________________'}</div>
            ) : (
              <>
                <Field name="candidateFullName" className="form-input" placeholder="Enter candidate full name" />
                <ErrorMessage name="candidateFullName" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Candidate ID / Application ID</label>
            {isPrintMode ? (
              <div className="print-value">{values.candidateIDApplicationID || '___________________'}</div>
            ) : (
              <>
                <Field name="candidateIDApplicationID" className="form-input" placeholder="Enter ID/Application ID" />
                <ErrorMessage name="candidateIDApplicationID" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Position / Designation</label>
            {isPrintMode ? (
              <div className="print-value">{values.positionDesignation || '___________________'}</div>
            ) : (
              <>
                <Field name="positionDesignation" className="form-input" placeholder="Enter position/designation" />
                <ErrorMessage name="positionDesignation" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Department</label>
            {isPrintMode ? (
              <div className="print-value">{values.department || '___________________'}</div>
            ) : (
              <>
                <Field name="department" className="form-input" placeholder="Enter department" />
                <ErrorMessage name="department" component="div" className="form-error" />
              </>
            )}
          </div>
        </div>
      </div>

      {/* DEVIATION RECORD */}
      <div className="form-section">
        <h3 className="form-section-title">Approved Deviation Record</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Type of Deviation Approved</label>
            {isPrintMode ? (
              <div className="print-value">{values.typeOfDeviationApproved || '___________________'}</div>
            ) : (
              <>
                <Field name="typeOfDeviationApproved" className="form-input" placeholder="Enter type of deviation" />
                <ErrorMessage name="typeOfDeviationApproved" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field full-width">
            <label className="form-label required">Approved Deviation Details</label>
            {isPrintMode ? (
              <div className="print-value">{values.approvedDeviationDetails || '___________________'}</div>
            ) : (
              <>
                <Field name="approvedDeviationDetails" as="textarea" className="form-textarea" placeholder="Enter approved deviation details" rows="2" />
                <ErrorMessage name="approvedDeviationDetails" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field full-width">
            <label className="form-label required">Justification Summary</label>
            {isPrintMode ? (
              <div className="print-value">{values.justificationSummary || '___________________'}</div>
            ) : (
              <>
                <Field name="justificationSummary" as="textarea" className="form-textarea" placeholder="Enter justification summary" rows="2" />
                <ErrorMessage name="justificationSummary" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Deviation Status</label>
            {isPrintMode ? (
              <div className="print-value">{values.deviationStatus || '___________________'}</div>
            ) : (
              <>
                <Field name="deviationStatus" as="select" className="form-input">
                  <option value="">-- Select Status --</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </Field>
                <ErrorMessage name="deviationStatus" component="div" className="form-error" />
              </>
            )}
          </div>
        </div>
      </div>

      {/* APPROVAL & DATES */}
      <div className="form-section">
        <h3 className="form-section-title">✅ Approval Details</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Approval Authority Name</label>
            {isPrintMode ? (
              <div className="print-value">{values.approvalAuthorityName || '___________________'}</div>
            ) : (
              <>
                <Field name="approvalAuthorityName" className="form-input" placeholder="Enter approval authority name" />
                <ErrorMessage name="approvalAuthorityName" component="div" className="form-error" />
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
          <div className="form-field">
            <label className="form-label required">Effective From Date</label>
            {isPrintMode ? (
              <div className="print-value">{values.effectiveFromDate || '___________________'}</div>
            ) : (
              <>
                <Field name="effectiveFromDate" type="date" className="form-input" />
                <ErrorMessage name="effectiveFromDate" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Record Created Date</label>
            {isPrintMode ? (
              <div className="print-value">{values.recordCreatedDate || '___________________'}</div>
            ) : (
              <>
                <Field name="recordCreatedDate" type="date" className="form-input" />
                <ErrorMessage name="recordCreatedDate" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field full-width">
            <label className="form-label">Remarks / Conditions</label>
            {isPrintMode ? (
              <div className="print-value">{values.remarksConditions || '___________________'}</div>
            ) : (
              <>
                <Field name="remarksConditions" as="textarea" className="form-textarea" placeholder="Enter remarks and conditions" rows="2" />
                <ErrorMessage name="remarksConditions" component="div" className="form-error" />
              </>
            )}
          </div>
        </div>
      </div>

      {/* ADDITIONAL CUSTOM FIELDS */}
      {!isPrintMode && (
        <div className="form-section">
          <h3 className="form-section-title">Additional Custom Fields</h3>
          <FieldArray name="customFields">
            {(fieldArrayProps) => {
              const { push, remove, form } = fieldArrayProps;
              const { values: formValues } = form;
              const { customFields } = formValues;
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
                      <button type="button" className="btn-remove" onClick={() => remove(index)}>Remove</button>
                    </div>
                  ))}
                  <button type="button" className="btn-add-field" onClick={() => push({ id: uuidv4(), fieldName: '', fieldValue: '' })}>Add Field</button>
                </div>
              );
            }}
          </FieldArray>
        </div>
      )}

      {isPrintMode && values.customFields && values.customFields.length > 0 && (
        <div className="form-section">
          <h3 className="form-section-title">Additional Fields</h3>
          <div className="form-fields">
            {values.customFields.map((field, index) => (
              <div key={index} className="form-field full-width custom-field-print">
                <strong>{field.fieldName}:</strong> {field.fieldValue || '___________________'}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SIGNATURES */}
      <div className="form-section signatures-section">
        <h3 className="form-section-title">✍️ Digital Signatures</h3>
        {!isPrintMode && (
          <div className="signatures-container">
            <SignatureComponent name="Record Prepared By" onChange={(sig) => setFieldValue('signatures.recordPreparedBy', sig)} value={values.signatures.recordPreparedBy} />
            <SignatureComponent name="Approved By" onChange={(sig) => setFieldValue('signatures.approvedBy', sig)} value={values.signatures.approvedBy} />
          </div>
        )}
        {isPrintMode && (
          <div className="print-signatures">
            {['recordPreparedBy', 'approvedBy'].map((role) => (
              <div key={role} className="print-signature-box">
                <div className="sig-name">{role === 'recordPreparedBy' ? 'Record Prepared By' : 'Approved By'}</div>
                <div className="sig-space">
                  {values.signatures[role]?.data && <img src={values.signatures[role].data} alt={`Signature`} className="print-sig-image" style={{ maxWidth: '100%', maxHeight: '80px' }} />}
                </div>
                <div className="sig-line"></div>
                <div className="sig-date">{values.signatures[role]?.name && `Name: ${values.signatures[role].name}`}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SUBMIT BUTTON */}
      {!isPrintMode && (
        <div className="form-actions">
          <button type="submit" className="btn-submit">Save Form</button>
        </div>
      )}
    </ModernA4Template>
  );

  return (
    <ModernFormWrapper formId="FRM-00627" title="Hiring Deviation – Report/Record Form">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => console.log('Form submitted:', values)} >
        {({ values, setFieldValue, errors, touched }) => <Form>{renderFormContent(values, setFieldValue, errors, touched)}</Form>}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00627;
