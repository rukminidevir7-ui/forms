import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import SignatureComponent from '../components/SignatureComponent';
import '../styles/FRM00611.css';

/* =========================
   Validation Schema
========================= */
const validationSchema = Yup.object({
  requesterName: Yup.string().required('Requester name is required'),
  department: Yup.string().required('Department is required'),
  positionJobTitle: Yup.string().required('Position/Job Title is required'),
  typeOfRequirement: Yup.string().required('Type of Requirement is required'),
  reasonForRequirement: Yup.string().required('Reason for Requirement is required'),
  requiredSkills: Yup.string().required('Required Skills/Competencies is required'),
  educationalQualification: Yup.string().required('Educational Qualification is required'),
  experienceRequired: Yup.string().required('Experience Required is required'),
  proposedSalaryCTC: Yup.string().required('Proposed Salary/CTC is required'),
  requiredByDate: Yup.string().required('Required By Date is required'),
  employmentType: Yup.string().required('Employment Type is required'),
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
  requesterName: '',
  department: '',
  positionJobTitle: '',
  typeOfRequirement: '',
  reasonForRequirement: '',
  requiredSkills: '',
  educationalQualification: '',
  experienceRequired: '',
  proposedSalaryCTC: '',
  requiredByDate: '',
  employmentType: '',
  customFields: [],
  signatures: {
    hod: { type: '', data: '', name: '' },
    unit: { type: '', data: '', name: '' },
    hr: { type: '', data: '', name: '' }
  }
};

const FRM00611 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue, errors, touched) => (
    <ModernA4Template formId="FRM-00611" title="Manpower Requirement Form" department="HR & People Ops">
      {/* REQUESTER INFORMATION */}
      <div className="form-section">
        <h3 className="form-section-title">Requester Information</h3>
        <div className="form-fields">
          <div className="form-field full-width">
            <label className="form-label required">Requester Name</label>
            {isPrintMode ? (
              <div className="print-value">{values.requesterName || '___________________'}</div>
            ) : (
              <>
                <Field
                  name="requesterName"
                  className="form-input"
                  placeholder="Enter requester name"
                />
                <ErrorMessage name="requesterName" component="div" className="form-error" />
              </>
            )}
          </div>
        </div>
      </div>

      {/* MANPOWER DETAILS */}
      <div className="form-section">
        <h3 className="form-section-title">👥 Manpower Details</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Department</label>
            {isPrintMode ? (
              <div className="print-value">{values.department || '___________________'}</div>
            ) : (
              <>
                <Field
                  name="department"
                  className="form-input"
                  placeholder="e.g., IT, HR, Finance"
                />
                <ErrorMessage name="department" component="div" className="form-error" />
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
                  placeholder="e.g., Software Engineer, Project Manager"
                />
                <ErrorMessage name="positionJobTitle" component="div" className="form-error" />
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
            <label className="form-label required">Employment Type</label>
            {isPrintMode ? (
              <div className="print-value">{values.employmentType || '___________________'}</div>
            ) : (
              <>
                <Field
                  name="employmentType"
                  as="select"
                  className="form-input"
                >
                  <option value="">-- Select Option --</option>
                  <option value="Permanent">Permanent</option>
                  <option value="Contract">Contract</option>
                </Field>
                <ErrorMessage name="employmentType" component="div" className="form-error" />
              </>
            )}
          </div>

          <div className="form-field full-width">
            <label className="form-label required">Reason for Requirement</label>
            {isPrintMode ? (
              <div className="print-value">{values.reasonForRequirement || '___________________'}</div>
            ) : (
              <>
                <Field
                  name="reasonForRequirement"
                  as="textarea"
                  className="form-textarea"
                  placeholder="Explain the reason for this requirement"
                  rows="2"
                />
                <ErrorMessage name="reasonForRequirement" component="div" className="form-error" />
              </>
            )}
          </div>

          <div className="form-field full-width">
            <label className="form-label required">Required Skills / Competencies</label>
            {isPrintMode ? (
              <div className="print-value">{values.requiredSkills || '___________________'}</div>
            ) : (
              <>
                <Field
                  name="requiredSkills"
                  as="textarea"
                  className="form-textarea"
                  placeholder="List required skills and competencies"
                  rows="2"
                />
                <ErrorMessage name="requiredSkills" component="div" className="form-error" />
              </>
            )}
          </div>

          <div className="form-field full-width">
            <label className="form-label required">Educational Qualification</label>
            {isPrintMode ? (
              <div className="print-value">{values.educationalQualification || '___________________'}</div>
            ) : (
              <>
                <Field
                  name="educationalQualification"
                  as="textarea"
                  className="form-textarea"
                  placeholder="e.g., Bachelor's in Engineering, MBA, etc."
                  rows="2"
                />
                <ErrorMessage name="educationalQualification" component="div" className="form-error" />
              </>
            )}
          </div>

          <div className="form-field">
            <label className="form-label required">Experience Required (Years)</label>
            {isPrintMode ? (
              <div className="print-value">{values.experienceRequired || '___________________'}</div>
            ) : (
              <>
                <Field
                  name="experienceRequired"
                  className="form-input"
                  type="text"
                  placeholder="e.g., 5 years"
                />
                <ErrorMessage name="experienceRequired" component="div" className="form-error" />
              </>
            )}
          </div>

          <div className="form-field">
            <label className="form-label required">Proposed Salary / CTC</label>
            {isPrintMode ? (
              <div className="print-value">{values.proposedSalaryCTC || '___________________'}</div>
            ) : (
              <>
                <Field
                  name="proposedSalaryCTC"
                  className="form-input"
                  placeholder="e.g., 50,000 - 70,000"
                />
                <ErrorMessage name="proposedSalaryCTC" component="div" className="form-error" />
              </>
            )}
          </div>

          <div className="form-field">
            <label className="form-label required">Required By Date</label>
            {isPrintMode ? (
              <div className="print-value">{values.requiredByDate || '___________________'}</div>
            ) : (
              <>
                <Field
                  name="requiredByDate"
                  type="date"
                  className="form-input"
                />
                <ErrorMessage name="requiredByDate" component="div" className="form-error" />
              </>
            )}
          </div>
        </div>
      </div>

      {/* ADDITIONAL FIELDS - Custom Fields */}
      {!isPrintMode && (
        <div className="form-section">
          <h3 className="form-section-title">Additional Custom Fields</h3>
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
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn-add-field"
                    onClick={() => push({ id: uuidv4(), fieldName: '', fieldValue: '' })}
                  >
                    Add Field
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

      {/* SIGNATURES - Before Footer */}
      <div className="form-section signatures-section">
        <h3 className="form-section-title">✍️ Digital Signatures & Approvals</h3>

        {!isPrintMode && (
          <div className="signatures-container">
            <SignatureComponent
              name="Requested By (HOD)"
              onChange={(sig) => setFieldValue('signatures.hod', sig)}
              value={values.signatures.hod}
            />
            <SignatureComponent
              name="Authorized By (Unit Head)"
              onChange={(sig) => setFieldValue('signatures.unit', sig)}
              value={values.signatures.unit}
            />
            <SignatureComponent
              name="Received By (HR)"
              onChange={(sig) => setFieldValue('signatures.hr', sig)}
              value={values.signatures.hr}
            />
          </div>
        )}

        {isPrintMode && (
          <div className="print-signatures">
            {['hod', 'unit', 'hr'].map((role) => (
              <div key={role} className="print-signature-box">
                <div className="sig-name">
                  {role === 'hod' && 'Requested By (HOD)'}
                  {role === 'unit' && 'Authorized By (Unit Head)'}
                  {role === 'hr' && 'Received By (HR)'}
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
            Save Form
          </button>
        </div>
      )}
    </ModernA4Template>
  );

  return (
    <ModernFormWrapper formId="FRM-00611" title="Manpower Requirement Form">
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

export default FRM00611;
