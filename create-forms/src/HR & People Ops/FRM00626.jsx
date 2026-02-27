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
  positionDepartment: Yup.string().required('Position / Department is required'),
  typeOfDeviationRequested: Yup.string().required('Type of Deviation is required'),
  approvalStatus: Yup.string().required('Approval Status is required'),
  approvedByName: Yup.string().required('Approved By is required'),
  approvalDate: Yup.string().required('Approval Date is required'),
  approvalRemarksConditions: Yup.string(),
  customFields: Yup.array().of(
    Yup.object({
      fieldName: Yup.string(),
      fieldValue: Yup.string()
    })
  )
});

const initialValues = {
  candidateFullName: '',
  positionDepartment: '',
  typeOfDeviationRequested: '',
  approvalStatus: '',
  approvedByName: '',
  approvalDate: '',
  approvalRemarksConditions: '',
  customFields: [],
  signatures: {
    approvedBy: { type: '', data: '', name: '' }
  }
};

const FRM00626 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue, errors, touched) => (
    <ModernA4Template formId="FRM-00626" title="Hiring Deviation – Approval/Authorization Form" department="HR & People Ops">
      {/* CANDIDATE & REQUEST INFORMATION */}
      <div className="form-section">
        <h3 className="form-section-title">👤 Candidate Information</h3>
        <div className="form-fields">
          <div className="form-field full-width">
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
            <label className="form-label required">Position / Department</label>
            {isPrintMode ? (
              <div className="print-value">{values.positionDepartment || '___________________'}</div>
            ) : (
              <>
                <Field name="positionDepartment" className="form-input" placeholder="Enter position/department" />
                <ErrorMessage name="positionDepartment" component="div" className="form-error" />
              </>
            )}
          </div>
        </div>
      </div>

      {/* APPROVAL DETAILS */}
      <div className="form-section">
        <h3 className="form-section-title">Approval Details</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Type of Deviation Requested</label>
            {isPrintMode ? (
              <div className="print-value">{values.typeOfDeviationRequested || '___________________'}</div>
            ) : (
              <>
                <Field name="typeOfDeviationRequested" as="select" className="form-input">
                  <option value="">-- Select Type --</option>
                  <option value="CTC / Salary">CTC / Salary</option>
                  <option value="Experience">Experience</option>
                  <option value="Grade / Level">Grade / Level</option>
                  <option value="Notice Period">Notice Period</option>
                  <option value="Process Exception">Process Exception</option>
                  <option value="Other">Other</option>
                </Field>
                <ErrorMessage name="typeOfDeviationRequested" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Approval Status</label>
            {isPrintMode ? (
              <div className="print-value">{values.approvalStatus || '___________________'}</div>
            ) : (
              <>
                <Field name="approvalStatus" as="select" className="form-input">
                  <option value="">-- Select Status --</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="On Hold">On Hold</option>
                </Field>
                <ErrorMessage name="approvalStatus" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Approved By (Authority Name & Role)</label>
            {isPrintMode ? (
              <div className="print-value">{values.approvedByName || '___________________'}</div>
            ) : (
              <>
                <Field name="approvedByName" className="form-input" placeholder="Enter approver name and role" />
                <ErrorMessage name="approvedByName" component="div" className="form-error" />
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
          <div className="form-field full-width">
            <label className="form-label">Approval Remarks / Conditions</label>
            {isPrintMode ? (
              <div className="print-value">{values.approvalRemarksConditions || '___________________'}</div>
            ) : (
              <>
                <Field name="approvalRemarksConditions" as="textarea" className="form-textarea" placeholder="Enter remarks and conditions" rows="3" />
                <ErrorMessage name="approvalRemarksConditions" component="div" className="form-error" />
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
            <SignatureComponent name="Approved By" onChange={(sig) => setFieldValue('signatures.approvedBy', sig)} value={values.signatures.approvedBy} />
          </div>
        )}
        {isPrintMode && (
          <div className="print-signatures">
            <div className="print-signature-box">
              <div className="sig-name">Approved By</div>
              <div className="sig-space">
                {values.signatures.approvedBy?.data && <img src={values.signatures.approvedBy.data} alt="Signature" className="print-sig-image" style={{ maxWidth: '100%', maxHeight: '80px' }} />}
              </div>
              <div className="sig-line"></div>
              <div className="sig-date">{values.signatures.approvedBy?.name && `Name: ${values.signatures.approvedBy.name}`}</div>
            </div>
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
    <ModernFormWrapper formId="FRM-00626" title="Hiring Deviation – Approval/Authorization Form">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => console.log('Form submitted:', values)} >
        {({ values, setFieldValue, errors, touched }) => <Form>{renderFormContent(values, setFieldValue, errors, touched)}</Form>}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00626;
