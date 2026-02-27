// FRM00640_EmployeeDataChange.jsx
// FRM-00640 – Employee Data Change – Request & Approval Form

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormAttachments from '../components/FormAttachments';
import FormCustomFields from '../components/FormCustomFields';
import FormSignatures from '../components/FormSignatures';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({

  // Section 1 – Request Details
  requesterName: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  employeeName: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  currentDesignation: Yup.string().required('Required'),
  businessUnitLocation: Yup.string().required('Required'),
  typeOfDataChange: Yup.string().required('Required'),
  reasonForDataChange: Yup.string().required('Required'),
  effectiveDateOfChange: Yup.string().required('Required'),
  supportingDocumentsAttached: Yup.string().required('Required'),

  // Section 2 – Change Details
  fieldsToBeUpdated: Yup.string().required('Required'),
  currentValue: Yup.string().required('Required'),
  proposedNewValue: Yup.string().required('Required'),
  impactArea: Yup.string().required('Required'),
  hrOperationsRemarks: Yup.string().required('Required'),

  // Section 3 – Approval
  employeeDataChangeReferenceNumber: Yup.string().required('Required'),
  approvingAuthorityName: Yup.string().required('Required'),
  approvalStatus: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  requesterName: '',
  department: '',
  employeeName: '',
  employeeId: '',
  currentDesignation: '',
  businessUnitLocation: '',
  typeOfDataChange: '',
  reasonForDataChange: '',
  effectiveDateOfChange: '',
  supportingDocumentsAttached: '',

  fieldsToBeUpdated: '',
  currentValue: '',
  proposedNewValue: '',
  impactArea: '',
  hrOperationsRemarks: '',

  employeeDataChangeReferenceNumber: '',
  approvingAuthorityName: '',
  approvalStatus: '',
  approvalComments: '',
  approvalDate: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00640_EmployeeDataChange = () => {

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

  const select = (values, name, label, options) => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '___________________'}</div>
      ) : (
        <>
          <Field as="select" name={name} className="form-input">
            <option value="">-- Select --</option>
            {options.map(o => <option key={o} value={o}>{o}</option>)}
          </Field>
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (

    <ModernFormWrapper
      formId="FRM-00640"
      title="Employee Data Change – Request & Approval Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Employee Data Change submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00640"
              title="Employee Data Change – Request & Approval"
              department="HR & People Ops"
            >

              {/* Section 1 */}
              <div className="form-section">
                <h3 className="form-section-title">1. Request / Initiation Details</h3>
                <div className="form-fields">
                  {field(values,'requesterName','Requester Name')}
                  {field(values,'department','Department')}
                  {field(values,'employeeName','Employee Name')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'currentDesignation','Current Designation')}
                  {field(values,'businessUnitLocation','Business Unit / Location')}
                  {select(values,'typeOfDataChange','Type of Data Change',['Personal','Job','Compensation','Banking','Other'])}
                  {textarea(values,'reasonForDataChange','Reason for Data Change')}
                  {field(values,'effectiveDateOfChange','Effective Date of Change','date')}
                  {select(values,'supportingDocumentsAttached','Supporting Documents Attached',['Yes','No'])}
                </div>
              </div>

              {/* Section 2 */}
              <div className="form-section">
                <h3 className="form-section-title">2. Data Change Details</h3>
                <div className="form-fields">
                  {textarea(values,'fieldsToBeUpdated','Field(s) to be Updated')}
                  {textarea(values,'currentValue','Current Value')}
                  {textarea(values,'proposedNewValue','Proposed New Value')}
                  {field(values,'impactArea','Impact Area')}
                  {textarea(values,'hrOperationsRemarks','Remarks by HR Operations Team')}
                </div>
              </div>

              {/* Section 3 */}
              <div className="form-section">
                <h3 className="form-section-title">3. Approval / Authorization Details</h3>
                <div className="form-fields">
                  {field(values,'employeeDataChangeReferenceNumber','Employee Data Change Reference Number')}
                  {field(values,'approvingAuthorityName','Approving Authority Name')}
                  {select(values,'approvalStatus','Approval Status',['Approved','Rejected','On Hold'])}
                  {textarea(values,'approvalComments','Approval Decision / Comments')}
                  {field(values,'approvalDate','Approval Date','date')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Form
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

export default FRM00640_EmployeeDataChange;
