import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import SignatureComponent from '../components/SignatureComponent';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({
  employeeID: Yup.string().required('Employee ID is required'),
  employeeName: Yup.string().required('Employee Name is required'),
  department: Yup.string().required('Department is required'),
  designation: Yup.string().required('Designation is required'),
  dateOfJoining: Yup.string().required('Date of Joining is required'),
  confirmationStatus: Yup.string().required('Confirmation Status is required')
  ,
  customFields: Yup.array().of(Yup.object({ fieldName: Yup.string(), fieldValue: Yup.string() }))
});

const initialValues = {
  employeeID: '',
  employeeName: '',
  department: '',
  designation: '',
  dateOfJoining: '',
  probationEndDate: '',
  confirmationStatus: '',
  payrollActivated: '',
  pfRegistered: '',
  esiRegistered: '',
  uanGenerated: '',
  recordCreatedDate: '',
  customFields: [],
  signatures: { recordKeeper: { type: '', data: '', name: '' } }
};

const FRM00639 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue) => (
    <ModernA4Template formId="FRM-00639" title="New Hire Confirmation – Report / Record" department="HR & People Ops">
      <div className="form-section">
        <h3 className="form-section-title">Employee Info</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field">
              <label className="form-label required">Employee ID</label>
              {isPrintMode ? <div className="print-value">{values.employeeID || '___________________'}</div> : (
                <Field name="employeeID" type="text" className="form-input" />
              )}
            </div>
            <div className="form-field">
              <label className="form-label required">Employee Name</label>
              {isPrintMode ? <div className="print-value">{values.employeeName || '___________________'}</div> : (
                <Field name="employeeName" type="text" className="form-input" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Employment Details</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field">
              <label className="form-label required">Department</label>
              {isPrintMode ? <div className="print-value">{values.department || '___________________'}</div> : (
                <Field name="department" type="text" className="form-input" />
              )}
            </div>
            <div className="form-field">
              <label className="form-label required">Designation</label>
              {isPrintMode ? <div className="print-value">{values.designation || '___________________'}</div> : (
                <Field name="designation" type="text" className="form-input" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Payroll & Compliance</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field">
              <label className="form-label required">Payroll Activated (Yes/No)</label>
              {isPrintMode ? <div className="print-value">{values.payrollActivated || '___________________'}</div> : (
                <Field name="payrollActivated" as="select" className="form-input">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Field>
              )}
            </div>
            <div className="form-field">
              <label className="form-label required">PF Registered (Yes/No)</label>
              {isPrintMode ? <div className="print-value">{values.pfRegistered || '___________________'}</div> : (
                <Field name="pfRegistered" as="select" className="form-input">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Field>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Record Metadata</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Record Created Date</label>
            {isPrintMode ? <div className="print-value">{values.recordCreatedDate || '___________________'}</div> : (
              <Field name="recordCreatedDate" type="date" className="form-input" />
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
          <h3 className="form-section-title">Record Keeper</h3>
          <div className="form-fields">
            <SignatureComponent label="Record Keeper Signature" onChange={(data) => setFieldValue('signatures.recordKeeper.data', data)} />
            <div style={{ marginTop: '15px' }}>
              <label className="form-label">Name (Print)</label>
              <Field name="signatures.recordKeeper.name" type="text" className="form-input" placeholder="Enter name" />
            </div>
          </div>
        </div>
      )}
    </ModernA4Template>
  );

  return (
    <ModernFormWrapper>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => { console.log('Submit FRM00639', values); alert('Saved'); }}>
        {({ values, setFieldValue }) => (
          <Form>
            {renderFormContent(values, setFieldValue)}
          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00639;
