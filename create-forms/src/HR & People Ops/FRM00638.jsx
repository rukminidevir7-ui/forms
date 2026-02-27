import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import SignatureComponent from '../components/SignatureComponent';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({
  candidateName: Yup.string().required('Candidate Name is required'),
  employeeID: Yup.string(),
  position: Yup.string().required('Position is required'),
  department: Yup.string().required('Department is required'),
  dateOfJoining: Yup.string().required('Date of Joining is required'),
  offeredCTC: Yup.string().required('Offered CTC is required'),
  reportingManager: Yup.string().required('Reporting Manager is required'),
  employmentType: Yup.string().required('Employment Type is required')
  ,
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  candidateName: '',
  employeeID: '',
  position: '',
  department: '',
  dateOfJoining: '',
  offeredCTC: '',
  reportingManager: '',
  employmentType: '',
  probationPeriod: '',
  workLocation: '',
  requestedBy: '',
  customFields: [],
  attachments: {
    pan: null, aadhaar: null, bankDetails: null, pfDeclaration: null, esicDeclaration: null, form11: null, educationCertificates: null, relievingLetter: null, bgvReport: null, signedOffer: null, signedAgreement: null
  },
  signatures: { requestedBy: { type: '', data: '', name: '' } }
};

const FRM00638 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue) => (
    <ModernA4Template formId="FRM-00638" title="New Hire Confirmation – Request" department="HR & People Ops">
      <div className="form-section">
        <h3 className="form-section-title">Basic Details</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field">
              <label className="form-label required">Candidate Name</label>
              {isPrintMode ? <div className="print-value">{values.candidateName || '___________________'}</div> : (
                <>
                  <Field name="candidateName" type="text" className="form-input" />
                  <ErrorMessage name="candidateName" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
            <div className="form-field">
              <label className="form-label">Employee ID (if generated)</label>
              {isPrintMode ? <div className="print-value">{values.employeeID || '___________________'}</div> : (
                <Field name="employeeID" type="text" className="form-input" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Job Details</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field">
              <label className="form-label required">Position / Designation</label>
              {isPrintMode ? <div className="print-value">{values.position || '___________________'}</div> : (
                <Field name="position" type="text" className="form-input" />
              )}
            </div>
            <div className="form-field">
              <label className="form-label required">Department</label>
              {isPrintMode ? <div className="print-value">{values.department || '___________________'}</div> : (
                <Field name="department" type="text" className="form-input" />
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field">
              <label className="form-label required">Date of Joining</label>
              {isPrintMode ? <div className="print-value">{values.dateOfJoining || '___________________'}</div> : (
                <Field name="dateOfJoining" type="date" className="form-input" />
              )}
            </div>
            <div className="form-field">
              <label className="form-label required">Offered CTC</label>
              {isPrintMode ? <div className="print-value">{values.offeredCTC || '___________________'}</div> : (
                <Field name="offeredCTC" type="text" className="form-input" />
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field">
              <label className="form-label required">Reporting Manager</label>
              {isPrintMode ? <div className="print-value">{values.reportingManager || '___________________'}</div> : (
                <Field name="reportingManager" type="text" className="form-input" />
              )}
            </div>
            <div className="form-field">
              <label className="form-label required">Employment Type</label>
              {isPrintMode ? <div className="print-value">{values.employmentType || '___________________'}</div> : (
                <Field name="employmentType" as="select" className="form-input">
                  <option value="">Select</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Contract">Contract</option>
                </Field>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Legal / Government Documents</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">PAN Card</label>
            {isPrintMode ? <div className="print-value">{values.attachments.pan ? 'Attached' : 'Not attached'}</div> : (
              <input type="file" accept=".pdf,.jpg,.png" onChange={(e) => setFieldValue('attachments.pan', e.currentTarget.files[0])} />
            )}
          </div>
          <div className="form-field" style={{ marginTop: '15px' }}>
            <label className="form-label required">Aadhaar Card</label>
            {isPrintMode ? <div className="print-value">{values.attachments.aadhaar ? 'Attached' : 'Not attached'}</div> : (
              <input type="file" accept=".pdf,.jpg,.png" onChange={(e) => setFieldValue('attachments.aadhaar', e.currentTarget.files[0])} />
            )}
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Additional Attachments</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label">Bank Account Details</label>
            {isPrintMode ? <div className="print-value">{values.attachments.bankDetails ? 'Attached' : 'Not attached'}</div> : (
              <input type="file" accept=".pdf,.jpg" onChange={(e) => setFieldValue('attachments.bankDetails', e.currentTarget.files[0])} />
            )}
          </div>
          <div className="form-field" style={{ marginTop: '15px' }}>
            <label className="form-label">Signed Offer Letter</label>
            {isPrintMode ? <div className="print-value">{values.attachments.signedOffer ? 'Attached' : 'Not attached'}</div> : (
              <input type="file" accept=".pdf,.docx" onChange={(e) => setFieldValue('attachments.signedOffer', e.currentTarget.files[0])} />
            )}
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Request</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Requested By (HR)</label>
            {isPrintMode ? <div className="print-value">{values.requestedBy || '___________________'}</div> : (
              <Field name="requestedBy" type="text" className="form-input" />
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
                    <button type="button" className="btn-add-field" onClick={() => push({ id: Math.random().toString(36).slice(2), fieldName: '', fieldValue: '' })}>➕ Add Field</button>
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

        {!isPrintMode && (
          <div className="form-section">
            <h3 className="form-section-title">Signature</h3>
            <div className="form-fields">
              <SignatureComponent label="Requested By Signature" onChange={(data) => setFieldValue('signatures.requestedBy.data', data)} />
              <div style={{ marginTop: '15px' }}>
                <label className="form-label">Name (Print)</label>
                <Field name="signatures.requestedBy.name" type="text" className="form-input" placeholder="Enter name" />
              </div>
            </div>
          </div>
        )}
    </ModernA4Template>
  );

  return (
    <ModernFormWrapper>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => { console.log('Submit FRM00638', values); alert('Saved'); }}>
        {({ values, setFieldValue }) => (
          <Form>
            {renderFormContent(values, setFieldValue)}
          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00638;
