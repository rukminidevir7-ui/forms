import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import SignatureComponent from '../components/SignatureComponent';
import '../styles/FRM00612.css';

/* =========================
   Validation Schema
========================= */
const validationSchema = Yup.object({
  requisitionRefNo: Yup.string().required('Requisition Reference No. is required'),
  approvingAuthorityName: Yup.string().required('Approving Authority Name is required'),
  approvalStatus: Yup.string().required('Approval Status is required'),
  approvalDecision: Yup.string().required('Approval Decision / Comments is required'),
  approvedManpowerCount: Yup.string().required('Approved Manpower Count is required'),
  budgetAvailability: Yup.string().required('Budget Availability is required'),
  approvalDate: Yup.string().required('Approval Date is required'),
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
  approvingAuthorityName: '',
  approvalStatus: '',
  approvalDecision: '',
  approvedManpowerCount: '',
  budgetAvailability: '',
  approvalDate: '',
  customFields: [],
  signatures: {
    approver: { type: '', data: '', name: '' },
    witness: { type: '', data: '', name: '' }
  }
};

const FRM00612 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue, errors, touched) => (
    <ModernA4Template formId="FRM-00612" title="Manpower Approval Form" department="HR & People Ops">
      {/* REQUISITION & APPROVAL INFORMATION */}
      <div className="form-section">
        <h3 className="form-section-title">Approval Information</h3>
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
            <label className="form-label required">Approving Authority Name</label>
            {isPrintMode ? (
              <div className="print-value">{values.approvingAuthorityName || '___________________'}</div>
            ) : (
              <>
                <Field
                  name="approvingAuthorityName"
                  className="form-input"
                  placeholder="Enter approving authority name"
                />
                <ErrorMessage name="approvingAuthorityName" component="div" className="form-error" />
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
                  <option value="Rejected">Rejected</option>
                  <option value="On Hold">On Hold</option>
                </Field>
                <ErrorMessage name="approvalStatus" component="div" className="form-error" />
              </>
            )}
          </div>

          <div className="form-field full-width">
            <label className="form-label required">Approval Decision / Comments</label>
            {isPrintMode ? (
              <div className="print-value">{values.approvalDecision || '___________________'}</div>
            ) : (
              <>
                <Field
                  name="approvalDecision"
                  as="textarea"
                  className="form-textarea"
                  placeholder="Provide approval decision and comments"
                  rows="3"
                />
                <ErrorMessage name="approvalDecision" component="div" className="form-error" />
              </>
            )}
          </div>

          <div className="form-field">
            <label className="form-label required">Approved Manpower Count</label>
            {isPrintMode ? (
              <div className="print-value">{values.approvedManpowerCount || '___________________'}</div>
            ) : (
              <>
                <Field
                  name="approvedManpowerCount"
                  type="number"
                  className="form-input"
                  placeholder="Enter number of approved positions"
                />
                <ErrorMessage name="approvedManpowerCount" component="div" className="form-error" />
              </>
            )}
          </div>

          <div className="form-field">
            <label className="form-label required">Budget Availability</label>
            {isPrintMode ? (
              <div className="print-value">{values.budgetAvailability || '___________________'}</div>
            ) : (
              <>
                <Field
                  name="budgetAvailability"
                  as="select"
                  className="form-input"
                >
                  <option value="">-- Select Option --</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Field>
                <ErrorMessage name="budgetAvailability" component="div" className="form-error" />
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

      {/* SIGNATURES */}
      <div className="form-section signatures-section">
        <h3 className="form-section-title">✍️ Digital Signatures & Approvals</h3>

        {!isPrintMode && (
          <div className="signatures-container">
            <SignatureComponent
              name="Approved By (Manager)"
              onChange={(sig) => setFieldValue('signatures.approver', sig)}
              value={values.signatures.approver}
            />
            <SignatureComponent
              name="Witnessed By (HR)"
              onChange={(sig) => setFieldValue('signatures.witness', sig)}
              value={values.signatures.witness}
            />
          </div>
        )}

        {isPrintMode && (
          <div className="print-signatures">
            {['approver', 'witness'].map((role) => (
              <div key={role} className="print-signature-box">
                <div className="sig-name">
                  {role === 'approver' && 'Approved By (Manager)'}
                  {role === 'witness' && 'Witnessed By (HR)'}
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
    <ModernFormWrapper formId="FRM-00612" title="Manpower Approval Form">
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

export default FRM00612;