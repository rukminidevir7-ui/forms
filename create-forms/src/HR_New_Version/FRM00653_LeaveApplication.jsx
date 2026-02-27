// FRM00653_LeaveApplication.jsx
// FRM-00653 – Leave Application – Request / Initiation Form

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

  // Employee Information
  employeeFullName: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  departmentName: Yup.string().required('Required'),
  jobTitle: Yup.string().required('Required'),
  emergencyContactNumber: Yup.string().required('Required'),

  // Leave Details
  leaveType: Yup.string().required('Required'),
  leaveStartDate: Yup.string().required('Required'),
  leaveEndDate: Yup.string().required('Required'),
  totalLeaveDays: Yup.number().required('Required'),
  leaveBalanceAvailable: Yup.number().required('Required'),
  leaveReason: Yup.string().required('Required'),

  // Work Handover & Manager
  workHandoverTo: Yup.string().required('Required'),
  reportingManagerName: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  employeeFullName: '',
  employeeId: '',
  departmentName: '',
  jobTitle: '',
  emergencyContactNumber: '',

  leaveType: '',
  leaveStartDate: '',
  leaveEndDate: '',
  totalLeaveDays: '',
  leaveBalanceAvailable: '',
  leaveReason: '',

  workHandoverTo: '',
  reportingManagerName: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00653_LeaveApplication = () => {

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
      formId="FRM-00653"
      title="Leave Application – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Leave application submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00653"
              title="Leave Application – Request / Initiation"
              department="HR & People Ops"
            >

              {/* Employee Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Employee Information</h3>
                <div className="form-fields">
                  {field(values,'employeeFullName','Employee Full Name')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'departmentName','Department')}
                  {field(values,'jobTitle','Job Title')}
                  {field(values,'emergencyContactNumber','Emergency Contact Number')}
                </div>
              </div>

              {/* Leave Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Leave Details</h3>
                <div className="form-fields">
                  {select(values,'leaveType','Leave Type',['Casual Leave','Sick Leave','Earned Leave','Maternity Leave','Paternity Leave','Unpaid Leave','Compensatory Off'])}
                  {field(values,'leaveStartDate','Leave Start Date','date')}
                  {field(values,'leaveEndDate','Leave End Date','date')}
                  {field(values,'totalLeaveDays','Total Number of Leave Days','number')}
                  {field(values,'leaveBalanceAvailable','Leave Balance Available','number')}
                  {textarea(values,'leaveReason','Reason for Leave')}
                </div>
              </div>

              {/* Work Handover & Manager */}
              <div className="form-section">
                <h3 className="form-section-title">3. Work Handover & Manager Details</h3>
                <div className="form-fields">
                  {field(values,'workHandoverTo','Work Handover To (Employee Name)')}
                  {field(values,'reportingManagerName','Reporting Manager Name')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Application
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

export default FRM00653_LeaveApplication;
