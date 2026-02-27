// FRM00637_NewHireConfirmation.jsx
// FRM-00637 – New Hire Confirmation – Request & Approval Form

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

  // Section 1 – Request / Initiation
  requesterName: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  positionJobTitle: Yup.string().required('Required'),
  candidateEmployeeName: Yup.string().required('Required'),
  offerRequisitionRefNo: Yup.string().required('Required'),
  employmentType: Yup.string().required('Required'),
  proposedJoiningDate: Yup.string().required('Required'),
  reportingManagerName: Yup.string().required('Required'),
  workLocation: Yup.string().required('Required'),
  offeredCTC: Yup.string().required('Required'),
  businessUnitProject: Yup.string().required('Required'),

  // Section 2 – Confirmation Details
  joiningStatus: Yup.string().required('Required'),
  documentsSubmitted: Yup.string().required('Required'),
  backgroundVerificationStatus: Yup.string().required('Required'),
  medicalChecksCompleted: Yup.string().required('Required'),
  exceptionDeviation: Yup.string().required('Required'),
  hrRemarks: Yup.string().required('Required'),

  // Section 3 – Approval
  newHireConfirmationRefNo: Yup.string().required('Required'),
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
  positionJobTitle: '',
  candidateEmployeeName: '',
  offerRequisitionRefNo: '',
  employmentType: '',
  proposedJoiningDate: '',
  reportingManagerName: '',
  workLocation: '',
  offeredCTC: '',
  businessUnitProject: '',

  joiningStatus: '',
  documentsSubmitted: '',
  backgroundVerificationStatus: '',
  medicalChecksCompleted: '',
  exceptionDeviation: '',
  hrRemarks: '',

  newHireConfirmationRefNo: '',
  approvingAuthorityName: '',
  approvalStatus: '',
  approvalComments: '',
  approvalDate: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00637_NewHireConfirmation = () => {

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
      formId="FRM-00637"
      title="New Hire Confirmation – Request & Approval Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('New Hire Confirmation submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00637"
              title="New Hire Confirmation – Request & Approval"
              department="HR & People Ops"
            >

              {/* Section 1 */}
              <div className="form-section">
                <h3 className="form-section-title">1. Request / Initiation Details</h3>
                <div className="form-fields">
                  {field(values,'requesterName','Requester Name')}
                  {field(values,'department','Department')}
                  {field(values,'positionJobTitle','Position / Job Title')}
                  {field(values,'candidateEmployeeName','Candidate / Employee Name')}
                  {field(values,'offerRequisitionRefNo','Offer / Requisition Reference Number')}
                  {select(values,'employmentType','Employment Type',['Permanent','Contract','Intern','Consultant'])}
                  {field(values,'proposedJoiningDate','Proposed Date of Joining','date')}
                  {field(values,'reportingManagerName','Reporting Manager Name')}
                  {field(values,'workLocation','Work Location')}
                  {field(values,'offeredCTC','Offered CTC / Compensation')}
                  {field(values,'businessUnitProject','Business Unit / Project')}
                </div>
              </div>

              {/* Section 2 */}
              <div className="form-section">
                <h3 className="form-section-title">2. New Hire Confirmation Details</h3>
                <div className="form-fields">
                  {select(values,'joiningStatus','Joining Status',['Joined','Deferred','Not Joined'])}
                  {select(values,'documentsSubmitted','Documents Submitted',['Yes','No'])}
                  {select(values,'backgroundVerificationStatus','Background Verification Status',['Completed','In Progress','Not Started'])}
                  {select(values,'medicalChecksCompleted','Medical / Other Checks Completed',['Yes','No','NA'])}
                  {textarea(values,'exceptionDeviation','Any Exception / Deviation')}
                  {textarea(values,'hrRemarks','Remarks by HR / Recruitment Team')}
                </div>
              </div>

              {/* Section 3 */}
              <div className="form-section">
                <h3 className="form-section-title">3. Approval / Authorization Details</h3>
                <div className="form-fields">
                  {field(values,'newHireConfirmationRefNo','New Hire Confirmation Reference Number')}
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

export default FRM00637_NewHireConfirmation;
