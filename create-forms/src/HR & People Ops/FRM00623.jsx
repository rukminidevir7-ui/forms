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
  positionDesignationOffered: Yup.string().required('Position / Designation Offered is required'),
  department: Yup.string().required('Department is required'),
  offeredCTCSalaryPackage: Yup.string().required('Offered CTC / Salary Package is required'),
  employmentType: Yup.string().required('Employment Type is required'),
  proposedJoiningDate: Yup.string().required('Proposed Joining Date is required'),
  hiringManagerName: Yup.string().required('Hiring Manager Name is required'),
  approvalAuthorityName: Yup.string().required('Approval Authority Name is required'),
  offerApprovalStatus: Yup.string().required('Offer Approval Status is required'),
  approvalDate: Yup.string().required('Approval Date is required'),
  approvalRemarks: Yup.string(),
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  candidateFullName: '',
  candidateIDApplicationID: '',
  positionDesignationOffered: '',
  department: '',
  offeredCTCSalaryPackage: '',
  employmentType: '',
  proposedJoiningDate: '',
  hiringManagerName: '',
  approvalAuthorityName: '',
  offerApprovalStatus: '',
  approvalDate: '',
  approvalRemarks: '',
  customFields: [],
  signatures: {
    approvalAuthority: { type: '', data: '', name: '' }
  }
};

const FRM00623 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue, errors, touched) => (
    <ModernA4Template formId="FRM-00623" title="Offer Approval – Approval / Authorization Form" department="HR & People Ops">
      <div className="form-section">
        <h3 className="form-section-title">👤 Candidate Information</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Candidate Full Name</label>
            {isPrintMode ? (
              <div className="print-value">{values.candidateFullName || '___________________'}</div>
            ) : (
              <>
                <Field name="candidateFullName" className="form-input" placeholder="Enter candidate name" />
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
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">💼 Offer Details</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Position / Designation Offered</label>
            {isPrintMode ? (
              <div className="print-value">{values.positionDesignationOffered || '___________________'}</div>
            ) : (
              <>
                <Field name="positionDesignationOffered" className="form-input" placeholder="E.g., Senior Developer, Manager" />
                <ErrorMessage name="positionDesignationOffered" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Department</label>
            {isPrintMode ? (
              <div className="print-value">{values.department || '___________________'}</div>
            ) : (
              <>
                <Field name="department" className="form-input" placeholder="E.g., IT, HR, Finance" />
                <ErrorMessage name="department" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Offered CTC / Salary Package</label>
            {isPrintMode ? (
              <div className="print-value">{values.offeredCTCSalaryPackage || '___________________'}</div>
            ) : (
              <>
                <Field name="offeredCTCSalaryPackage" className="form-input" placeholder="E.g., ₹1,500,000" />
                <ErrorMessage name="offeredCTCSalaryPackage" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Employment Type</label>
            {isPrintMode ? (
              <div className="print-value">{values.employmentType || '___________________'}</div>
            ) : (
              <>
                <Field name="employmentType" as="select" className="form-input">
                  <option value="">-- Select Type --</option>
                  <option value="Permanent">Permanent</option>
                  <option value="Contract">Contract</option>
                  <option value="Intern">Intern</option>
                </Field>
                <ErrorMessage name="employmentType" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Proposed Joining Date</label>
            {isPrintMode ? (
              <div className="print-value">{values.proposedJoiningDate || '___________________'}</div>
            ) : (
              <>
                <Field name="proposedJoiningDate" type="date" className="form-input" />
                <ErrorMessage name="proposedJoiningDate" component="div" className="form-error" />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">✍️ Approval Details</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Hiring Manager Name</label>
            {isPrintMode ? (
              <div className="print-value">{values.hiringManagerName || '___________________'}</div>
            ) : (
              <>
                <Field name="hiringManagerName" className="form-input" placeholder="Enter hiring manager name" />
                <ErrorMessage name="hiringManagerName" component="div" className="form-error" />
              </>
            )}
          </div>
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
            <label className="form-label required">Offer Approval Status</label>
            {isPrintMode ? (
              <div className="print-value">{values.offerApprovalStatus || '___________________'}</div>
            ) : (
              <>
                <Field name="offerApprovalStatus" as="select" className="form-input">
                  <option value="">-- Select Status --</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="On Hold">On Hold</option>
                </Field>
                <ErrorMessage name="offerApprovalStatus" component="div" className="form-error" />
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
            <label className="form-label">Approval Remarks</label>
            {isPrintMode ? (
              <div className="print-value">{values.approvalRemarks || '___________________'}</div>
            ) : (
              <>
                <Field name="approvalRemarks" as="textarea" className="form-textarea" placeholder="Enter any remarks" rows="4" />
                <ErrorMessage name="approvalRemarks" component="div" className="form-error" />
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
        <h3 className="form-section-title">✍️ Authorization</h3>
        {!isPrintMode && (
          <div className="signatures-container">
            <SignatureComponent name="Approval Authority" onChange={(sig) => setFieldValue('signatures.approvalAuthority', sig)} value={values.signatures.approvalAuthority} />
          </div>
        )}
        {isPrintMode && (
          <div className="print-signatures">
            <div className="print-signature-box">
              <div className="sig-name">Approval Authority</div>
              <div className="sig-space">
                {values.signatures.approvalAuthority?.data && <img src={values.signatures.approvalAuthority.data} alt="Signature" className="print-sig-image" style={{ maxWidth: '100%', maxHeight: '80px' }} />}
              </div>
              <div className="sig-line"></div>
              <div className="sig-date">{values.signatures.approvalAuthority?.name && `Name: ${values.signatures.approvalAuthority.name}`}</div>
            </div>
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
    <ModernFormWrapper formId="FRM-00623" title="Offer Approval – Approval / Authorization Form">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => { console.log('Form submitted:', values); alert('✅ Form saved successfully!'); }}>
        {({ values, setFieldValue, errors, touched }) => (
          <Form>{renderFormContent(values, setFieldValue, errors, touched)}</Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00623;