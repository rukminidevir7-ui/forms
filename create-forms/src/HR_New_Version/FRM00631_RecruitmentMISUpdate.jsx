// FRM00631_RecruitmentMISUpdate.jsx
// FRM-00631 – Recruitment MIS Update – Request & Approval Form

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

  // Section 1 – Request / Initiation Details
  requesterName: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  positionJobTitle: Yup.string().required('Required'),
  misReportName: Yup.string().required('Required'),
  typeOfUpdate: Yup.string().required('Required'),
  moduleProcessArea: Yup.string().required('Required'),
  descriptionOfChange: Yup.string().required('Required'),
  businessJustification: Yup.string().required('Required'),
  impactArea: Yup.string().required('Required'),
  priority: Yup.string().required('Required'),
  requestedCompletionDate: Yup.string().required('Required'),

  // Section 2 – MIS Update Details
  currentDataIssue: Yup.string().required('Required'),
  expectedOutput: Yup.string().required('Required'),
  dataDependencyImpact: Yup.string().required('Required'),
  testingRequired: Yup.string().required('Required'),
  hrMisRemarks: Yup.string().required('Required'),

  // Section 3 – Approval Details
  misUpdateReferenceNumber: Yup.string().required('Required'),
  approvingAuthorityName: Yup.string().required('Required'),
  approvalStatus: Yup.string().required('Required'),
  approvedScopeConditions: Yup.string().required('Required'),
  resourceAvailability: Yup.string().required('Required'),
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
  misReportName: '',
  typeOfUpdate: '',
  moduleProcessArea: '',
  descriptionOfChange: '',
  businessJustification: '',
  impactArea: '',
  priority: '',
  requestedCompletionDate: '',

  currentDataIssue: '',
  expectedOutput: '',
  dataDependencyImpact: '',
  testingRequired: '',
  hrMisRemarks: '',

  misUpdateReferenceNumber: '',
  approvingAuthorityName: '',
  approvalStatus: '',
  approvedScopeConditions: '',
  resourceAvailability: '',
  approvalComments: '',
  approvalDate: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00631_RecruitmentMISUpdate = () => {

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
      formId="FRM-00631"
      title="Recruitment MIS Update – Request & Approval Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Recruitment MIS Update submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00631"
              title="Recruitment MIS Update – Request & Approval"
              department="HR & Talent Acquisition"
            >

              {/* Section 1 */}
              <div className="form-section">
                <h3 className="form-section-title">1. Request / Initiation Details</h3>
                <div className="form-fields">
                  {field(values,'requesterName','Requester Name')}
                  {field(values,'department','Department')}
                  {field(values,'positionJobTitle','Position / Job Title')}
                  {field(values,'misReportName','MIS / Report Name')}
                  {select(values,'typeOfUpdate','Type of Update',['New Field','Correction','Enhancement','Deletion'])}
                  {field(values,'moduleProcessArea','Module / Process Area')}
                  {textarea(values,'descriptionOfChange','Description of Change Required')}
                  {textarea(values,'businessJustification','Business Justification')}
                  {field(values,'impactArea','Impact Area')}
                  {select(values,'priority','Priority',['Low','Medium','High'])}
                  {field(values,'requestedCompletionDate','Requested Completion Date','date')}
                </div>
              </div>

              {/* Section 2 */}
              <div className="form-section">
                <h3 className="form-section-title">2. MIS Update Details</h3>
                <div className="form-fields">
                  {textarea(values,'currentDataIssue','Current Data Issue / Limitation')}
                  {textarea(values,'expectedOutput','Expected Output / Result After Update')}
                  {select(values,'dataDependencyImpact','Data Dependency / Source System Impact',['Yes','No'])}
                  {select(values,'testingRequired','Testing / Validation Required',['Yes','No'])}
                  {textarea(values,'hrMisRemarks','Remarks by HR / MIS Team')}
                </div>
              </div>

              {/* Section 3 */}
              <div className="form-section">
                <h3 className="form-section-title">3. Approval / Authorization Details</h3>
                <div className="form-fields">
                  {field(values,'misUpdateReferenceNumber','MIS Update Reference Number')}
                  {field(values,'approvingAuthorityName','Approving Authority Name')}
                  {select(values,'approvalStatus','Approval Status',['Approved','Rejected','On Hold'])}
                  {textarea(values,'approvedScopeConditions','Approved Scope / Conditions')}
                  {select(values,'resourceAvailability','Resource / Effort Availability',['Yes','No'])}
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

export default FRM00631_RecruitmentMISUpdate;
