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
  standardPolicyRequirement: Yup.string().required('Standard Policy Requirement is required'),
  proposedDeviationDetails: Yup.string().required('Proposed Deviation Details is required'),
  typeOfDeviation: Yup.string().required('Type of Deviation is required'),
  justificationForDeviation: Yup.string().required('Justification for Deviation is required'),
  impactAssessment: Yup.string().required('Impact Assessment is required'),
  requestedBy: Yup.string().required('Requested By is required'),
  requestDate: Yup.string().required('Request Date is required'),
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
  standardPolicyRequirement: '',
  proposedDeviationDetails: '',
  typeOfDeviation: '',
  justificationForDeviation: '',
  impactAssessment: '',
  requestedBy: '',
  requestDate: '',
  customFields: [],
  signatures: {
    requestedBy: { type: '', data: '', name: '' },
    approvedBy: { type: '', data: '', name: '' }
  }
};

const FRM00625 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue, errors, touched) => (
    <ModernA4Template formId="FRM-00625" title="Hiring Deviation – Request/Initiation Form" department="HR & People Ops">
      {/* CANDIDATE & POSITION INFORMATION */}
      <div className="form-section">
        <h3 className="form-section-title">👤 Candidate & Position Information</h3>
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
                <Field name="candidateIDApplicationID" className="form-input" placeholder="Enter candidate/application ID" />
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

      {/* DEVIATION DETAILS */}
      <div className="form-section">
        <h3 className="form-section-title">Deviation Details</h3>
        <div className="form-fields">
          <div className="form-field full-width">
            <label className="form-label required">Standard Policy Requirement</label>
            {isPrintMode ? (
              <div className="print-value">{values.standardPolicyRequirement || '___________________'}</div>
            ) : (
              <>
                <Field name="standardPolicyRequirement" as="textarea" className="form-textarea" placeholder="Describe standard policy requirement" rows="2" />
                <ErrorMessage name="standardPolicyRequirement" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field full-width">
            <label className="form-label required">Proposed Deviation Details</label>
            {isPrintMode ? (
              <div className="print-value">{values.proposedDeviationDetails || '___________________'}</div>
            ) : (
              <>
                <Field name="proposedDeviationDetails" as="textarea" className="form-textarea" placeholder="Describe proposed deviation details" rows="2" />
                <ErrorMessage name="proposedDeviationDetails" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Type of Deviation</label>
            {isPrintMode ? (
              <div className="print-value">{values.typeOfDeviation || '___________________'}</div>
            ) : (
              <>
                <Field name="typeOfDeviation" as="select" className="form-input">
                  <option value="">-- Select Type --</option>
                  <option value="CTC / Salary">CTC / Salary</option>
                  <option value="Experience">Experience</option>
                  <option value="Grade / Level">Grade / Level</option>
                  <option value="Notice Period">Notice Period</option>
                  <option value="Process Exception">Process Exception</option>
                  <option value="Other">Other</option>
                </Field>
                <ErrorMessage name="typeOfDeviation" component="div" className="form-error" />
              </>
            )}
          </div>
        </div>
      </div>

      {/* JUSTIFICATION & IMPACT */}
      <div className="form-section">
        <h3 className="form-section-title">📝 Justification & Impact</h3>
        <div className="form-fields">
          <div className="form-field full-width">
            <label className="form-label required">Justification for Deviation</label>
            {isPrintMode ? (
              <div className="print-value">{values.justificationForDeviation || '___________________'}</div>
            ) : (
              <>
                <Field name="justificationForDeviation" as="textarea" className="form-textarea" placeholder="Explain business justification" rows="3" />
                <ErrorMessage name="justificationForDeviation" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field full-width">
            <label className="form-label required">Impact Assessment (Cost / Risk / Business Need)</label>
            {isPrintMode ? (
              <div className="print-value">{values.impactAssessment || '___________________'}</div>
            ) : (
              <>
                <Field name="impactAssessment" as="textarea" className="form-textarea" placeholder="Describe cost, risk, and business impact" rows="3" />
                <ErrorMessage name="impactAssessment" component="div" className="form-error" />
              </>
            )}
          </div>
        </div>
      </div>

      {/* REQUEST INFORMATION */}
      <div className="form-section">
        <h3 className="form-section-title">🕐 Request Information</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Requested By (Hiring Manager / HR Name)</label>
            {isPrintMode ? (
              <div className="print-value">{values.requestedBy || '___________________'}</div>
            ) : (
              <>
                <Field name="requestedBy" className="form-input" placeholder="Enter requester name" />
                <ErrorMessage name="requestedBy" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Request Date</label>
            {isPrintMode ? (
              <div className="print-value">{values.requestDate || '___________________'}</div>
            ) : (
              <>
                <Field name="requestDate" type="date" className="form-input" />
                <ErrorMessage name="requestDate" component="div" className="form-error" />
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
        <h3 className="form-section-title">✍️ Digital Signatures & Approvals</h3>
        {!isPrintMode && (
          <div className="signatures-container">
            <SignatureComponent name="Requested By" onChange={(sig) => setFieldValue('signatures.requestedBy', sig)} value={values.signatures.requestedBy} />
            <SignatureComponent name="Approved By" onChange={(sig) => setFieldValue('signatures.approvedBy', sig)} value={values.signatures.approvedBy} />
          </div>
        )}
        {isPrintMode && (
          <div className="print-signatures">
            {['requestedBy', 'approvedBy'].map((role) => (
              <div key={role} className="print-signature-box">
                <div className="sig-name">{role === 'requestedBy' ? 'Requested By' : 'Approved By'}</div>
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

      {/* SUBMIT BUTTON */}
      {!isPrintMode && (
        <div className="form-actions">
          <button type="submit" className="btn-submit">Save Form</button>
        </div>
      )}
    </ModernA4Template>
  );

  return (
    <ModernFormWrapper formId="FRM-00625" title="Hiring Deviation – Request/Initiation Form">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => console.log('Form submitted:', values)} >
        {({ values, setFieldValue, errors, touched }) => <Form>{renderFormContent(values, setFieldValue, errors, touched)}</Form>}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00625;
