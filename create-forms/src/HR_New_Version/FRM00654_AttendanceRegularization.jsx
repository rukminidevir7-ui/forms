// FRM00654_AttendanceRegularization.jsx
// FRM-00654 – Attendance Regularization – Report / Record

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

  // Attendance Details
  attendanceDate: Yup.string().required('Required'),
  actualInTime: Yup.string().required('Required'),
  actualOutTime: Yup.string().required('Required'),

  // Discrepancy Details
  discrepancyReason: Yup.string().required('Required'),
  issueType: Yup.string().required('Required'),
  supportingDocumentsSubmitted: Yup.string().required('Required'),

  // Approval & Verification
  reportingManagerName: Yup.string().required('Required'),
  managerApprovalStatus: Yup.string().required('Required'),
  hrVerificationStatus: Yup.string().required('Required'),
  payrollImpact: Yup.string().required('Required'),
  finalRegularizationStatus: Yup.string().required('Required'),
  finalRegularizationDate: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  employeeFullName: '',
  employeeId: '',
  departmentName: '',
  jobTitle: '',

  attendanceDate: '',
  actualInTime: '',
  actualOutTime: '',

  discrepancyReason: '',
  issueType: '',
  supportingDocumentsSubmitted: '',

  reportingManagerName: '',
  managerApprovalStatus: '',
  hrVerificationStatus: '',
  payrollImpact: '',
  finalRegularizationStatus: '',
  finalRegularizationDate: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00654_AttendanceRegularization = () => {

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
      formId="FRM-00654"
      title="Attendance Regularization – Report / Record"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Attendance regularization record saved successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00654"
              title="Attendance Regularization – Record"
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
                </div>
              </div>

              {/* Attendance Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Attendance Details</h3>
                <div className="form-fields">
                  {field(values,'attendanceDate','Attendance Date','date')}
                  {field(values,'actualInTime','Actual In Time','time')}
                  {field(values,'actualOutTime','Actual Out Time','time')}
                </div>
              </div>

              {/* Discrepancy Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Discrepancy Details</h3>
                <div className="form-fields">
                  {textarea(values,'discrepancyReason','Reason for Attendance Discrepancy')}
                  {select(values,'issueType','Type of Issue',['Missed Punch','Late Login','Early Logout','System Error','On Duty','Work From Home'])}
                  {select(values,'supportingDocumentsSubmitted','Supporting Documents Submitted',['Yes','No'])}
                </div>
              </div>

              {/* Approval & Verification */}
              <div className="form-section">
                <h3 className="form-section-title">4. Approval & Verification</h3>
                <div className="form-fields">
                  {field(values,'reportingManagerName','Reporting Manager Name')}
                  {select(values,'managerApprovalStatus','Manager Approval Status',['Approved','Rejected','Pending'])}
                  {select(values,'hrVerificationStatus','HR Verification Status',['Verified','Rejected','Pending'])}
                  {select(values,'payrollImpact','Payroll Impact',['No Impact','Salary Deduction','Leave Adjustment','Overtime Credit'])}
                  {select(values,'finalRegularizationStatus','Final Regularization Status',['Regularized','Not Regularized','Escalated'])}
                  {field(values,'finalRegularizationDate','Final Regularization Date','date')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Save Record
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

export default FRM00654_AttendanceRegularization;
