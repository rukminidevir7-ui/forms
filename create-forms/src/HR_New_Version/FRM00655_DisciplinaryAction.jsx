// FRM00655_DisciplinaryAction.jsx
// FRM-00655 – Disciplinary Action – Request & Approval Form

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormCustomFields from '../components/FormCustomFields';
import FormAttachments from '../components/FormAttachments';
import FormSignatures from '../components/FormSignatures';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({

  // Section 1 – Incident & Employee Details
  requesterName: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  employeeName: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  designation: Yup.string().required('Required'),
  businessUnitLocation: Yup.string().required('Required'),
  reportingManagerName: Yup.string().required('Required'),
  typeOfMisconduct: Yup.string().required('Required'),
  incidentDates: Yup.string().required('Required'),
  incidentDescription: Yup.string().required('Required'),
  immediateActionTaken: Yup.string().required('Required'),

  // Section 2 – Investigation & Recommendation
  investigationRequired: Yup.string().required('Required'),
  investigationSummary: Yup.string().required('Required'),
  employeeExplanationReceived: Yup.string().required('Required'),
  recommendedDisciplinaryAction: Yup.string().required('Required'),
  proposedEffectiveDateOfAction: Yup.string().required('Required'),
  hrIrRemarks: Yup.string().required('Required'),

  // Section 3 – Approval
  disciplinaryActionReferenceNumber: Yup.string().required('Required'),
  approvingAuthorityName: Yup.string().required('Required'),
  approvalStatus: Yup.string().required('Required'),
  finalDisciplinaryDecision: Yup.string().required('Required'),
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
  designation: '',
  businessUnitLocation: '',
  reportingManagerName: '',
  typeOfMisconduct: '',
  incidentDates: '',
  incidentDescription: '',
  immediateActionTaken: '',

  investigationRequired: '',
  investigationSummary: '',
  employeeExplanationReceived: '',
  recommendedDisciplinaryAction: '',
  proposedEffectiveDateOfAction: '', 
  hrIrRemarks: '',

  disciplinaryActionReferenceNumber: '',
  approvingAuthorityName: '',
  approvalStatus: '',
  finalDisciplinaryDecision: '',
  approvalComments: '',
  approvalDate: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00655_DisciplinaryAction = () => {

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
      formId="FRM-00655"
      title="Disciplinary Action – Request & Approval"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('FRM-00655 Disciplinary Action Submitted Successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00655"
              title="Disciplinary Action – Request & Approval"
              department="HR & People Ops"
            >

              {/* Section 1 */}
              <div className="form-section">
                <h3 className="form-section-title">1. Incident & Employee Details</h3>
                <div className="form-fields">
                  {field(values,'requesterName','Requester Name')}
                  {field(values,'department','Department')}
                  {field(values,'employeeName','Employee Name')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'designation','Designation')}
                  {field(values,'businessUnitLocation','Business Unit / Location')}
                  {field(values,'reportingManagerName','Reporting Manager')}
                  {textarea(values,'typeOfMisconduct','Type of Misconduct / Policy Violation')}
                  {field(values,'incidentDates','Date(s) of Incident')}
                  {textarea(values,'incidentDescription','Incident Description')}
                  {textarea(values,'immediateActionTaken','Immediate Action Taken')}
                </div>
              </div>

              {/* Section 2 */}
              <div className="form-section">
                <h3 className="form-section-title">2. Investigation & Recommendation</h3>
                <div className="form-fields">
                  {select(values,'investigationRequired','Investigation Required',['Yes','No'])}
                  {textarea(values,'investigationSummary','Investigation Summary')}
                  {select(values,'employeeExplanationReceived','Employee Explanation Received',['Yes','No'])}
                  {textarea(values,'recommendedDisciplinaryAction','Recommended Disciplinary Action')}
                  {field(values,'proposedEffectiveDateOfAction','Proposed Effective Date','date')}
                  {textarea(values,'hrIrRemarks','HR / IR Remarks')}
                </div>
              </div>

              {/* Section 3 */}
              <div className="form-section">
                <h3 className="form-section-title">3. Approval / Authorization</h3>
                <div className="form-fields">
                  {field(values,'disciplinaryActionReferenceNumber','Disciplinary Action Reference Number')}
                  {field(values,'approvingAuthorityName','Approving Authority Name')}
                  {select(values,'approvalStatus','Approval Status',['Approved','Rejected','On Hold'])}
                  {textarea(values,'finalDisciplinaryDecision','Final Disciplinary Decision')}
                  {textarea(values,'approvalComments','Approval Comments')}
                  {field(values,'approvalDate','Approval Date','date')}
                </div>
              </div>

              <FormAttachments values={values} />
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

export default FRM00655_DisciplinaryAction;
