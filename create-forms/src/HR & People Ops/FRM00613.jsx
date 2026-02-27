import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import SignatureComponent from '../components/SignatureComponent';
import '../styles/FRM00613.css';

/* =========================
   Validation Schema
========================= */
const validationSchema = Yup.object({
  requisitionRefNo: Yup.string().required('Requisition Reference No. is required'),
  requestingDepartment: Yup.string().required('Requesting Department is required'),
  positionJobTitle: Yup.string().required('Position / Job Title is required'),
  numbersOfPositionsApproved: Yup.string().required('Number of Positions Approved is required'),
  typeOfRequirement: Yup.string().required('Type of Requirement is required'),
  approvalStatus: Yup.string().required('Approval Status is required'),
  approvedBy: Yup.string().required('Approved By is required'),
  approvalDate: Yup.string().required('Approval Date is required'),
  budgetConfirmation: Yup.string().required('Budget Confirmation is required'),
  recruitmentStatus: Yup.string().required('Recruitment Status is required'),
  candidateNames: Yup.string(),
  datePositionClosed: Yup.string(),
  remarksHRNotes: Yup.string(),
  customFields: Yup.array().of(
    Yup.object({
      fieldName: Yup.string(),
      fieldValue: Yup.string()
    })
  )
});

/* =========================
   Initial Values
========================= */
const initialValues = {
  requisitionRefNo: '',
  requestingDepartment: '',
  positionJobTitle: '',
  numbersOfPositionsApproved: '',
  typeOfRequirement: '',
  approvalStatus: '',
  approvedBy: '',
  approvalDate: '',
  budgetConfirmation: '',
  recruitmentStatus: '',
  candidateNames: '',
  datePositionClosed: '',
  remarksHRNotes: '',
  customFields: [],
  signatures: {
    recruiter: { type: '', data: '', name: '' },
    hrManager: { type: '', data: '', name: '' }
  }
};

const FRM00613 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue, errors, touched) => (
    <ModernA4Template formId="FRM-00613" title="Manpower Tracking Summary" department="HR & People Ops">
      {/* REQUISITION & TRACKING INFORMATION */}
      <div className="form-section">
        <h3 className="form-section-title">📋 Tracking Information</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Requisition Reference No.</label>
            {isPrintMode ? (
              <div className="print-value">{values.requisitionRefNo || '___________________'}</div>
            ) : (
              <>
                <Field
                  name="requisitionRefNo"
                  className="form-input"
                  placeholder="e.g., FR-001-2024"
                />
                <ErrorMessage name="requisitionRefNo" component="div" className="form-error" />
              </>
            )}
          </div>

          <div className="form-field">
            <label className="form-label required">Requesting Department</label>
            {isPrintMode ? (
              <div className="print-value">{values.requestingDepartment || '___________________'}</div>
            ) : (
              <>
                <Field
                  name="requestingDepartment"
                  className="form-input"
                  placeholder="e.g., IT, HR, Finance"
                />
                <ErrorMessage name="requestingDepartment" component="div" className="form-error" />
              </>
            )}
          </div>

          <div className="form-field">
            <label className="form-label required">Position / Job Title</label>
            {isPrintMode ? (
              <div className="print-value">{values.positionJobTitle || '___________________'}</div>
            ) : (
              <>
                <Field
                  name="positionJobTitle"
                  className="form-input"
                  placeholder="e.g., Software Engineer"
                />
                <ErrorMessage name="positionJobTitle" component="div" className="form-error" />
              </>
            )}
          </div>

          <div className="form-field">
            <label className="form-label required">Number of Positions Approved</label>
            {isPrintMode ? (
              <div className="print-value">{values.numbersOfPositionsApproved || '___________________'}</div>
            ) : (
              <>
                <Field
                  name="numbersOfPositionsApproved"
                  type="number"
                  className="form-input"
                  placeholder="Enter number"
                />
                <ErrorMessage name="numbersOfPositionsApproved" component="div" className="form-error" />
              </>
            )}
          </div>

          <div className="form-field">
            <label className="form-label required">Type of Requirement</label>
            {isPrintMode ? (
              <div className="print-value">{values.typeOfRequirement || '___________________'}</div>
            ) : (
              <>
                <Field
                  name="typeOfRequirement"
                  as="select"
                  className="form-input"
                >
                  <option value="">-- Select Option --</option>
                  <option value="New">New</option>
                  <option value="Replacement">Replacement</option>
                  <option value="Temporary">Temporary</option>
                </Field>
                <ErrorMessage name="typeOfRequirement" component="div" className="form-error" />
              </>
            )}
          </div>

          <div className="form-field">
            <label className="form-label required">Approval Status</label>
            {isPrintMode ? (
              <div className="print-value">{values.approvalStatus || '___________________'}</div>
            ) : (
              <>
                <Field
                  name="approvalStatus"
                  as="select"
                  className="form-input"
                >
                  <option value="">-- Select Status --</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                </Field>
                <ErrorMessage name="approvalStatus" component="div" className="form-error" />
              </>
            )}
          </div>

          <div className="form-field">
            <label className="form-label required">Approved By</label>
            {isPrintMode ? (
              <div className="print-value">{values.approvedBy || '___________________'}</div>
            ) : (
              <>
                <Field
                  name="approvedBy"
                  className="form-input"
                  placeholder="Enter approver name"
                />
                <ErrorMessage name="approvedBy" component="div" className="form-error" />
              </>
            )}
          </div>

          <div className="form-field">
            <label className="form-label required">Approval Date</label>
            {isPrintMode ? (
              <div className="print-value">{values.approvalDate || '___________________'}</div>
            ) : (
              <>
                <Field
                  name="approvalDate"
                  type="date"
                  className="form-input"
                />
                <ErrorMessage name="approvalDate" component="div" className="form-error" />
              </>
            )}
          </div>

          <div className="form-field">
            <label className="form-label required">Budget Confirmation</label>
            {isPrintMode ? (
              <div className="print-value">{values.budgetConfirmation || '___________________'}</div>
            ) : (
              <>
                <Field
                  name="budgetConfirmation"
                  as="select"
                  className="form-input"
                >
                  <option value="">-- Select Option --</option>
                  <option value="Approved">Approved</option>
                  <option value="Not Approved">Not Approved</option>
                </Field>
                <ErrorMessage name="budgetConfirmation" component="div" className="form-error" />
              </>
            )}
          </div>

          <div className="form-field">
            <label className="form-label required">Recruitment Status</label>
            {isPrintMode ? (
              <div className="print-value">{values.recruitmentStatus || '___________________'}</div>
            ) : (
              <>
                <Field
                  name="recruitmentStatus"
                  as="select"
                  className="form-input"
                >
                  <option value="">-- Select Status --</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </Field>
                <ErrorMessage name="recruitmentStatus" component="div" className="form-error" />
              </>
            )}
          </div>

          <div className="form-field full-width">
            <label className="form-label">Candidate Name(s) (if filled)</label>
            {isPrintMode ? (
              <div className="print-value">{values.candidateNames || '___________________'}</div>
            ) : (
              <>
                <Field
                  name="candidateNames"
                  as="textarea"
                  className="form-textarea"
                  placeholder="Enter candidate names (comma separated)"
                  rows="2"
                />
                <ErrorMessage name="candidateNames" component="div" className="form-error" />
              </>
            )}
          </div>

          <div className="form-field">
            <label className="form-label">Date Position Closed</label>
            {isPrintMode ? (
              <div className="print-value">{values.datePositionClosed || '___________________'}</div>
            ) : (
              <>
                <Field
                  name="datePositionClosed"
                  type="date"
                  className="form-input"
                />
                <ErrorMessage name="datePositionClosed" component="div" className="form-error" />
              </>
            )}
          </div>

          <div className="form-field full-width">
            <label className="form-label">Remarks / HR Notes</label>
            {isPrintMode ? (
              <div className="print-value">{values.remarksHRNotes || '___________________'}</div>
            ) : (
              <>
                <Field
                  name="remarksHRNotes"
                  as="textarea"
                  className="form-textarea"
                  placeholder="Add any remarks or notes"
                  rows="2"
                />
                <ErrorMessage name="remarksHRNotes" component="div" className="form-error" />
              </>
            )}
          </div>
        </div>
      </div>

      {/* ADDITIONAL FIELDS - Custom Fields */}
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
                        <Field
                          name={`customFields.${index}.fieldName`}
                          className="form-input"
                          placeholder="Field Name"
                        />
                      </div>
                      <div className="form-field" style={{ flex: 2 }}>
                        <Field
                          name={`customFields.${index}.fieldValue`}
                          className="form-input"
                          placeholder="Field Value"
                        />
                      </div>
                      <button
                        type="button"
                        className="btn-remove"
                        onClick={() => remove(index)}
                      >
                        ✕ Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn-add-field"
                    onClick={() => push({ id: uuidv4(), fieldName: '', fieldValue: '' })}
                  >
                    ➕ Add Field
                  </button>
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

      {/* SIGNATURES */}
      <div className="form-section signatures-section">
        <h3 className="form-section-title">✍️ Digital Signatures & Approvals</h3>

        {!isPrintMode && (
          <div className="signatures-container">
            <SignatureComponent
              name="Recruitment Coordinator"
              onChange={(sig) => setFieldValue('signatures.recruiter', sig)}
              value={values.signatures.recruiter}
            />
            <SignatureComponent
              name="HR Manager"
              onChange={(sig) => setFieldValue('signatures.hrManager', sig)}
              value={values.signatures.hrManager}
            />
          </div>
        )}

        {isPrintMode && (
          <div className="print-signatures">
            {['recruiter', 'hrManager'].map((role) => (
              <div key={role} className="print-signature-box">
                <div className="sig-name">
                  {role === 'recruiter' && 'Recruitment Coordinator'}
                  {role === 'hrManager' && 'HR Manager'}
                </div>
                <div className="sig-space">
                  {values.signatures[role]?.data && (
                    <img
                      src={values.signatures[role].data}
                      alt={`Signature - ${role}`}
                      className="print-sig-image"
                      style={{ maxWidth: '100%', maxHeight: '80px' }}
                    />
                  )}
                </div>
                <div className="sig-line"></div>
                <div className="sig-date">
                  {values.signatures[role]?.name && `Name: ${values.signatures[role].name}`}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SUBMIT BUTTON - Edit Mode Only */}
      {!isPrintMode && (
        <div className="form-actions">
          <button type="submit" className="btn-submit">
            💾 Save Form
          </button>
        </div>
      )}
    </ModernA4Template>
  );

  return (
    <ModernFormWrapper formId="FRM-00613" title="Manpower Tracking Summary">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Form submitted:', values);
          alert('✅ Form saved successfully!');
        }}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            {renderFormContent(values, setFieldValue, errors, touched)}
          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00613;