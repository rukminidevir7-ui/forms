// FRM00025_KeyAccessCardIssue.jsx
// FRM-00025 – Key / Access Card Issue Request & Authorization Form

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

  // Basic Information
  requestDate: Yup.string().required('Required'),
  departmentName: Yup.string().required('Required'),
  requesterName: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  requestType: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // Holder Details
  employeeName: Yup.string().required('Required'),
  designation: Yup.string().required('Required'),
  employeeDepartment: Yup.string().required('Required'),
  workLocation: Yup.string().required('Required'),
  reportingManager: Yup.string().required('Required'),
  holderContact: Yup.string().required('Required'),

  // Key / Card Details
  cardType: Yup.string().required('Required'),
  accessLevel: Yup.string().required('Required'),
  cardNumber: Yup.string().required('Required'),
  validityPeriod: Yup.string().required('Required'),
  accessArea: Yup.string().required('Required'),
  replacementReason: Yup.string(),

  // Authorization
  requestedBy: Yup.string().required('Required'),
  securityVerificationBy: Yup.string().required('Required'),
  approvedBy: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  // Supporting
  supportingDocuments: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  requestDate: '',
  departmentName: '',
  requesterName: '',
  employeeId: '',
  contactNumber: '',
  requestType: '',
  priorityLevel: '',

  employeeName: '',
  designation: '',
  employeeDepartment: '',
  workLocation: '',
  reportingManager: '',
  holderContact: '',

  cardType: '',
  accessLevel: '',
  cardNumber: '',
  validityPeriod: '',
  accessArea: '',
  replacementReason: '',

  requestedBy: '',
  securityVerificationBy: '',
  approvedBy: '',
  approvalDate: '',
  approvalComments: '',

  supportingDocuments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00025_KeyAccessCardIssue = () => {

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
      <label className="form-label">{label}</label>
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
      formId="FRM-00025"
      title="Key / Access Card Issue Request & Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Key / Access Card request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00025"
              title="Key / Access Card Issue – Request & Authorization"
              department="Administration & General – Office Administration"
            >

              {/* Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'departmentName','Department Name')}
                  {field(values,'requesterName','Requester Name')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'contactNumber','Contact')}
                  {select(values,'requestType','Request Type',['New Issue','Replacement','Reactivation'])}
                  {select(values,'priorityLevel','Priority Level',['Low','Medium','High','Urgent'])}
                </div>
              </div>

              {/* Holder Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Holder Details</h3>
                <div className="form-fields">
                  {field(values,'employeeName','Employee Name')}
                  {field(values,'designation','Designation')}
                  {field(values,'employeeDepartment','Department')}
                  {field(values,'workLocation','Location')}
                  {field(values,'reportingManager','Manager Name')}
                  {field(values,'holderContact','Contact')}
                </div>
              </div>

              {/* Key / Card Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Key / Card Details</h3>
                <div className="form-fields">
                  {select(values,'cardType','Key / Card Type',['Physical Key','Access Card','Biometric Access'])}
                  {select(values,'accessLevel','Access Level',['General','Restricted','High Security'])}
                  {field(values,'cardNumber','Key / Card Number')}
                  {field(values,'validityPeriod','Validity Period')}
                  {field(values,'accessArea','Area / Door Access')}
                  {textarea(values,'replacementReason','Replacement Reason (if applicable)')}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">4. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requestedBy','Requested By (Name)')}
                  {field(values,'securityVerificationBy','Security Verification')}
                  {field(values,'approvedBy','Approved By')}
                  {field(values,'approvalDate','Approval Date','date')}
                  {textarea(values,'approvalComments','Comments')}
                </div>
              </div>

              {/* Supporting */}
              <div className="form-section">
                <h3 className="form-section-title">5. Supporting Information</h3>
                <div className="form-fields">
                  {textarea(values,'supportingDocuments','Supporting Documents / Additional Notes')}
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

export default FRM00025_KeyAccessCardIssue;
