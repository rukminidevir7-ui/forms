// FRM00147_ComplianceCalendar.jsx
// FRM-00147 – Compliance Calendar – Log / Register Form

import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormAttachments from '../components/FormAttachments';
import FormCustomFields from '../components/FormCustomFields';
import FormSignatures from '../components/FormSignatures';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({

  // Basic Information
  preparationDate: Yup.string().required('Required'),
  departmentFunction: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  periodCovered: Yup.string().required('Required'),
  version: Yup.string().required('Required'),

  // Schedule Details
  complianceSchedule: Yup.array().of(
    Yup.object().shape({
      complianceRequirement: Yup.string().required('Required'),
      regulatoryAuthority: Yup.string().required('Required'),
      dueDate: Yup.string().required('Required'),
      frequency: Yup.string().required('Required'),
      owner: Yup.string().required('Required'),
      status: Yup.string().required('Required'),
      remarks: Yup.string()
    })
  ).min(1, 'At least one compliance entry is required'),

  // Summary
  keyNotes: Yup.string().required('Required'),
  escalationsRisks: Yup.string().required('Required'),

  // Authorization
  preparedByAuthorization: Yup.string().required('Required'),
  reviewedBy: Yup.string().required('Required'),
  approvedBy: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  preparationDate: '',
  departmentFunction: '',
  preparedBy: '',
  employeeId: '',
  contactNumber: '',
  periodCovered: '',
  version: '',

  complianceSchedule: [
    {
      complianceRequirement: '',
      regulatoryAuthority: '',
      dueDate: '',
      frequency: '',
      owner: '',
      status: '',
      remarks: ''
    }
  ],

  keyNotes: '',
  escalationsRisks: '',

  preparedByAuthorization: '',
  reviewedBy: '',
  approvedBy: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00147_ComplianceCalendar = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type = 'text') => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '___________________'}</div>
      ) : (
        <>
          <Field name={name} type={type} className="form-input" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  const textarea = (values, name, label) => (
    <div className="form-field full-width">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '___________________'}</div>
      ) : (
        <>
          <Field as="textarea" name={name} className="form-textarea" rows="3" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (

    <ModernFormWrapper
      formId="FRM-00147"
      title="Compliance Calendar – Log / Register Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Compliance calendar saved successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00147"
              title="Compliance Calendar Register"
              department="Compliance & Regulatory – Regulatory Filings"
            >

              {/* Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'preparationDate','Date','date')}
                  {field(values,'departmentFunction','Department / Function')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'contactNumber','Contact')}
                  {field(values,'periodCovered','Period Covered')}
                  {field(values,'version','Version')}
                </div>
              </div>

              {/* Compliance Schedule Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Compliance Schedule Details</h3>

                {!isPrintMode && (
                  <FieldArray name="complianceSchedule">
                    {({ push, remove }) => (
                      <>
                        {values.complianceSchedule.map((entry, index) => (
                          <div key={index} className="form-section" style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '15px' }}>
                            <div className="form-fields">
                              <Field name={`complianceSchedule.${index}.complianceRequirement`} className="form-input" placeholder="Compliance Requirement" />
                              <Field name={`complianceSchedule.${index}.regulatoryAuthority`} className="form-input" placeholder="Regulatory Authority" />
                              <Field name={`complianceSchedule.${index}.dueDate`} type="date" className="form-input" />
                              <Field as="select" name={`complianceSchedule.${index}.frequency`} className="form-input">
                                <option value="">-- Frequency --</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Quarterly">Quarterly</option>
                                <option value="Half-Yearly">Half-Yearly</option>
                                <option value="Annually">Annually</option>
                                <option value="Ad-Hoc">Ad-Hoc</option>
                              </Field>
                              <Field name={`complianceSchedule.${index}.owner`} className="form-input" placeholder="Owner" />
                              <Field as="select" name={`complianceSchedule.${index}.status`} className="form-input">
                                <option value="">-- Status --</option>
                                <option value="Planned">Planned</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="Delayed">Delayed</option>
                              </Field>
                              <Field name={`complianceSchedule.${index}.remarks`} className="form-input" placeholder="Remarks" />
                            </div>
                            <button type="button" onClick={() => remove(index)} className="btn-remove">Remove</button>
                          </div>
                        ))}
                        <button type="button" onClick={() => push({
                          complianceRequirement: '',
                          regulatoryAuthority: '',
                          dueDate: '',
                          frequency: '',
                          owner: '',
                          status: '',
                          remarks: ''
                        })} className="btn-add-field">
                          Add Compliance Entry
                        </button>
                      </>
                    )}
                  </FieldArray>
                )}

                {isPrintMode && values.complianceSchedule.map((entry, index) => (
                  <div key={index} className="form-field full-width">
                    <strong>{index + 1}. {entry.complianceRequirement}</strong><br/>
                    Authority: {entry.regulatoryAuthority}<br/>
                    Due: {entry.dueDate} | Frequency: {entry.frequency}<br/>
                    Owner: {entry.owner} | Status: {entry.status}<br/>
                    Remarks: {entry.remarks || '—'}
                  </div>
                ))}

              </div>

              {/* Summary */}
              <div className="form-section">
                <h3 className="form-section-title">3. Summary</h3>
                <div className="form-fields">
                  {textarea(values,'keyNotes','Key Notes')}
                  {textarea(values,'escalationsRisks','Escalations / Risks')}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">4. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByAuthorization','Prepared By')}
                  {field(values,'reviewedBy','Reviewed By')}
                  {field(values,'approvedBy','Approved By')}
                  {field(values,'approvalDate','Approval Date','date')}
                  {textarea(values,'approvalComments','Comments')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Save Compliance Calendar
                  </button>
                </div>
              )}

            </ModernA4Template>

          </Form>

        )}

      </Formik>

    </ModernFormWrapper>

  );

};

export default FRM00147_ComplianceCalendar;
