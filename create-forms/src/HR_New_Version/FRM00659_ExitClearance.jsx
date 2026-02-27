// FRM00659_ExitClearance.jsx
// FRM-00659 – Exit Clearance – Request & Approval

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormCustomFields from '../components/FormCustomFields';
import FormSignatures from '../components/FormSignatures';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({

  // Section 1 – Employee Exit Details
  requesterName: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  employeeName: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  designation: Yup.string().required('Required'),
  businessUnitLocation: Yup.string().required('Required'),
  lastWorkingDate: Yup.string().required('Required'),
  reasonForExit: Yup.string().required('Required'),
  reportingManagerName: Yup.string().required('Required'),
  employeeContactDetails: Yup.string().required('Required'),

  // Section 2 – Clearance Checklist
  itAssetsReturned: Yup.string().required('Required'),
  idAccessCardReturned: Yup.string().required('Required'),
  knowledgeTransferCompleted: Yup.string().required('Required'),
  handoverCompleted: Yup.string().required('Required'),
  pendingRecoveries: Yup.string().required('Required'),
  hrOperationsRemarks: Yup.string().required('Required'),

  // Section 3 – Approval
  exitClearanceReferenceNumber: Yup.string().required('Required'),
  approvingAuthorityName: Yup.string().required('Required'),
  approvalStatus: Yup.string().required('Required'),
  finalClearanceDecision: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),

  customFields: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  requesterName: '',
  department: '',
  employeeName: '',
  employeeId: '',
  designation: '',
  businessUnitLocation: '',
  lastWorkingDate: '',
  reasonForExit: '',
  reportingManagerName: '',
  employeeContactDetails: '',

  itAssetsReturned: '',
  idAccessCardReturned: '',
  knowledgeTransferCompleted: '',
  handoverCompleted: '',
  pendingRecoveries: '',
  hrOperationsRemarks: '',

  exitClearanceReferenceNumber: '',
  approvingAuthorityName: '',
  approvalStatus: '',
  finalClearanceDecision: '',
  approvalComments: '',
  approvalDate: '',

  customFields: [],
  signatures: []

};

const FRM00659_ExitClearance = () => {

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
      formId="FRM-00659"
      title="Exit Clearance – Request & Approval"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('FRM-00659 Exit Clearance Submitted Successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00659"
              title="Exit Clearance – Request & Approval"
              department="HR & People Ops"
            >

              {/* Section 1 */}
              <div className="form-section">
                <h3 className="form-section-title">1. Employee Exit Details</h3>
                <div className="form-fields">
                  {field(values,'requesterName','Requester Name')}
                  {field(values,'department','Department')}
                  {field(values,'employeeName','Employee Name')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'designation','Designation')}
                  {field(values,'businessUnitLocation','Business Unit / Location')}
                  {field(values,'lastWorkingDate','Last Working Date','date')}
                  {textarea(values,'reasonForExit','Reason for Exit')}
                  {field(values,'reportingManagerName','Reporting Manager')}
                  {field(values,'employeeContactDetails','Employee Contact Details')}
                </div>
              </div>

              {/* Section 2 */}
              <div className="form-section">
                <h3 className="form-section-title">2. Exit Clearance Checklist</h3>
                <div className="form-fields">
                  {select(values,'itAssetsReturned','IT Assets Returned',['Yes','No','NA'])}
                  {select(values,'idAccessCardReturned','ID Card / Access Card Returned',['Yes','No','NA'])}
                  {select(values,'knowledgeTransferCompleted','Knowledge Transfer Completed',['Yes','No','NA'])}
                  {select(values,'handoverCompleted','Handover Completed',['Yes','No','NA'])}
                  {textarea(values,'pendingRecoveries','Pending Recoveries (if any)')}
                  {textarea(values,'hrOperationsRemarks','HR Operations Remarks')}
                </div>
              </div>

              {/* Section 3 */}
              <div className="form-section">
                <h3 className="form-section-title">3. Approval / Authorization</h3>
                <div className="form-fields">
                  {field(values,'exitClearanceReferenceNumber','Exit Clearance Reference Number')}
                  {field(values,'approvingAuthorityName','Approving Authority Name')}
                  {select(values,'approvalStatus','Approval Status',['Approved','Rejected','On Hold'])}
                  {textarea(values,'finalClearanceDecision','Final Clearance Decision')}
                  {textarea(values,'approvalComments','Approval Comments')}
                  {field(values,'approvalDate','Approval Date','date')}
                </div>
              </div>

              <FormCustomFields values={values} />
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

export default FRM00659_ExitClearance;
