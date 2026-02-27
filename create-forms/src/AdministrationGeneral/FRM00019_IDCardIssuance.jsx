// FRM00019_IDCardIssuance.jsx
// FRM-00019 – ID Card Issuance Request & Authorization Form

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

  // Employee Details
  employeeName: Yup.string().required('Required'),
  designation: Yup.string().required('Required'),
  employeeDepartment: Yup.string().required('Required'),
  dateOfJoining: Yup.string().required('Required'),
  workLocation: Yup.string().required('Required'),
  reportingManager: Yup.string().required('Required'),

  // Card Details
  cardType: Yup.string().required('Required'),
  validityPeriod: Yup.string().required('Required'),
  accessLevel: Yup.string().required('Required'),
  replacementReason: Yup.string(),

  // Authorization
  requestedBy: Yup.string().required('Required'),
  hrVerificationBy: Yup.string().required('Required'),
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
  dateOfJoining: '',
  workLocation: '',
  reportingManager: '',

  cardType: '',
  validityPeriod: '',
  accessLevel: '',
  replacementReason: '',

  requestedBy: '',
  hrVerificationBy: '',
  approvedBy: '',
  approvalDate: '',
  approvalComments: '',

  supportingDocuments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00019_IDCardIssuance = () => {

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
      formId="FRM-00019"
      title="ID Card Issuance Request & Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('ID Card request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00019"
              title="ID Card Issuance – Request & Authorization"
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

              {/* Employee Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Employee Details</h3>
                <div className="form-fields">
                  {field(values,'employeeName','Employee Name')}
                  {field(values,'designation','Designation')}
                  {field(values,'employeeDepartment','Department')}
                  {field(values,'dateOfJoining','Date of Joining','date')}
                  {field(values,'workLocation','Location')}
                  {field(values,'reportingManager','Manager Name')}
                </div>
              </div>

              {/* Card Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Card Details</h3>
                <div className="form-fields">
                  {select(values,'cardType','Card Type',['Permanent','Temporary','Visitor','Contractor'])}
                  {field(values,'validityPeriod','Validity Period')}
                  {select(values,'accessLevel','Access Level',['General','Restricted','High Security'])}
                  {textarea(values,'replacementReason','Replacement Reason (if applicable)')}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">4. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requestedBy','Requested By (Name)')}
                  {field(values,'hrVerificationBy','HR Verification')}
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

export default FRM00019_IDCardIssuance;
