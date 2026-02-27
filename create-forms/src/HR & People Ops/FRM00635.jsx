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
  position: Yup.string().required('Position is required'),
  reason: Yup.string().required('Reason for Rejection is required'),
  approvalStatus: Yup.string().required('Approval Status is required'),
  approvedBy: Yup.string().required('Approved By is required'),
  approvalDate: Yup.string().required('Approval Date is required')
  ,
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  candidateName: '',
  position: '',
  reason: '',
  approvalStatus: '',
  approvedBy: '',
  approvalDate: '',
  remarks: '',
  customFields: [],
  signatures: { approvedBy: { type: '', data: '', name: '' } }
};

const FRM00635 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue) => (
    <ModernA4Template
      formId="FRM-00635"
      title="Candidate Rejection Communication – Approval"
      department="HR & People Ops"
    >

      {/* Candidate Details */}
      <div className="form-section">
        <h3 className="form-section-title">Candidate Details</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            
            <div className="form-field">
              <label className="form-label required">Candidate Name</label>
              {isPrintMode ? (
                <div className="print-value">{values.candidateName || '___________________'}</div>
              ) : (
                <>
                  <Field name="candidateName" type="text" className="form-input" />
                  <ErrorMessage name="candidateName" component="div" style={{ color: '#ff0000', fontSize: '12px' }} />
                </>
              )}
            </div>

            <div className="form-field">
              <label className="form-label required">Position</label>
              {isPrintMode ? (
                <div className="print-value">{values.position || '___________________'}</div>
              ) : (
                <>
                  <Field name="position" type="text" className="form-input" />
                  <ErrorMessage name="position" component="div" style={{ color: '#ff0000', fontSize: '12px' }} />
                </>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Rejection Reason */}
      <div className="form-section">
        <h3 className="form-section-title">Rejection Details</h3>
        <div className="form-fields">
          
          <div className="form-field">
            <label className="form-label required">Reason for Rejection</label>
            {isPrintMode ? (
              <div className="print-value">{values.reason || '___________________'}</div>
            ) : (
              <>
                <Field name="reason" as="textarea" rows="3" className="form-input" />
                <ErrorMessage name="reason" component="div" style={{ color: '#ff0000', fontSize: '12px' }} />
              </>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>

            <div className="form-field">
              <label className="form-label required">Approval Status</label>
              {isPrintMode ? (
                <div className="print-value">{values.approvalStatus || '___________________'}</div>
              ) : (
                <>
                  <Field name="approvalStatus" as="select" className="form-input">
                    <option value="">Select</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="On Hold">On Hold</option>
                  </Field>
                  <ErrorMessage name="approvalStatus" component="div" style={{ color: '#ff0000', fontSize: '12px' }} />
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
                  <ErrorMessage name="approvalDate" component="div" style={{ color: '#ff0000', fontSize: '12px' }} />
                </>
              )}
            </div>

          </div>

          <div className="form-field" style={{ marginTop: '15px' }}>
            <label className="form-label">Remarks</label>
            {isPrintMode ? (
              <div className="print-value">{values.remarks || '___________________'}</div>
            ) : (
              <Field name="remarks" as="textarea" rows="2" className="form-input" />
            )}
          </div>

        </div>
      </div>

      {/* Approval Details */}
      <div className="form-section">
        <h3 className="form-section-title">Approval Authority</h3>
        <div className="form-fields">
          
          <div className="form-field">
            <label className="form-label required">Approved By</label>
            {isPrintMode ? (
              <div className="print-value">{values.approvedBy || '___________________'}</div>
            ) : (
              <>
                <Field name="approvedBy" type="text" className="form-input" />
                <ErrorMessage name="approvedBy" component="div" style={{ color: '#ff0000', fontSize: '12px' }} />
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

    </ModernA4Template>
  );

  return (
    <ModernFormWrapper>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Submit FRM00635 Approval', values);
          alert('Saved');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            {renderFormContent(values, setFieldValue)}
          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00635;
