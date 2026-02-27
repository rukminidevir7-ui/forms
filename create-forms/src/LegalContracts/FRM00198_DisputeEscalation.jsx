// FRM00198_DisputeEscalation.jsx
// FRM-00198 – Dispute Escalation – Request / Initiation Form

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

  // 1. Basic Information
  requestDate: Yup.string().required('Required'),
  departmentFunction: Yup.string().required('Required'),
  requestedBy: Yup.string().required('Required'),
  referenceId: Yup.string().required('Required'),
  contactDetails: Yup.string().required('Required'),
  escalationLevel: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // 2. Parties Involved
  partyOne: Yup.string().required('Required'),
  partyTwo: Yup.string().required('Required'),
  departmentEntity: Yup.string().required('Required'),
  relationship: Yup.string().required('Required'),
  partiesContactDetails: Yup.string().required('Required'),
  disputeLocation: Yup.string().required('Required'),

  // 3. Dispute Details
  subjectOfDispute: Yup.string().required('Required'),
  backgroundSummary: Yup.string().required('Required'),
  dateOfOccurrence: Yup.string().required('Required'),

  // 4. Impact Assessment
  operationalImpact: Yup.string().required('Required'),
  financialImpact: Yup.string().required('Required'),
  legalComplianceImpact: Yup.string().required('Required'),

  // 5. Actions Taken
  actionsTaken: Yup.string().required('Required'),
  proposedResolution: Yup.string().required('Required'),
  escalationReason: Yup.string().required('Required'),

  // 6. Risk Assessment
  keyRisksIdentified: Yup.string().required('Required'),
  mitigationMeasures: Yup.string().required('Required'),

  // 7. Authorization
  requestedByConfirmation: Yup.string().required('Required'),
  businessHrApproval: Yup.string().required('Required'),
  legalApproval: Yup.string().required('Required'),
  managementApproval: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  requestDate: '',
  departmentFunction: '',
  requestedBy: '',
  referenceId: '',
  contactDetails: '',
  escalationLevel: '',
  priorityLevel: '',

  partyOne: '',
  partyTwo: '',
  departmentEntity: '',
  relationship: '',
  partiesContactDetails: '',
  disputeLocation: '',

  subjectOfDispute: '',
  backgroundSummary: '',
  dateOfOccurrence: '',

  operationalImpact: '',
  financialImpact: '',
  legalComplianceImpact: '',

  actionsTaken: '',
  proposedResolution: '',
  escalationReason: '',

  keyRisksIdentified: '',
  mitigationMeasures: '',

  requestedByConfirmation: '',
  businessHrApproval: '',
  legalApproval: '',
  managementApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00198_DisputeEscalation = () => {

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
      formId="FRM-00198"
      title="Dispute Escalation – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Dispute Escalation submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00198"
              title="Dispute Escalation"
              department="Legal & Contracts – Employment Legal"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'departmentFunction','Department / Function')}
                  {field(values,'requestedBy','Requested By')}
                  {field(values,'referenceId','Employee ID / Reference')}
                  {field(values,'contactDetails','Contact Details')}
                  {select(values,'escalationLevel','Escalation Level',['Level 1 – Business','Level 2 – HR','Level 3 – Legal','Level 4 – Executive'])}
                  {select(values,'priorityLevel','Priority',['Standard','High','Urgent','Critical'])}
                </div>
              </div>

              {/* 2. Parties Involved */}
              <div className="form-section">
                <h3 className="form-section-title">2. Parties Involved</h3>
                <div className="form-fields">
                  {field(values,'partyOne','Party 1')}
                  {field(values,'partyTwo','Party 2')}
                  {field(values,'departmentEntity','Department / Entity')}
                  {field(values,'relationship','Relationship')}
                  {field(values,'partiesContactDetails','Contact Details')}
                  {field(values,'disputeLocation','Location')}
                </div>
              </div>

              {/* 3. Dispute Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Dispute Details</h3>
                <div className="form-fields">
                  {field(values,'subjectOfDispute','Subject of Dispute')}
                  {textarea(values,'backgroundSummary','Background Summary')}
                  {field(values,'dateOfOccurrence','Date of Occurrence','date')}
                </div>
              </div>

              {/* 4. Impact Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">4. Impact Assessment</h3>
                <div className="form-fields">
                  {textarea(values,'operationalImpact','Operational Impact')}
                  {textarea(values,'financialImpact','Financial Impact')}
                  {textarea(values,'legalComplianceImpact','Legal / Compliance Impact')}
                </div>
              </div>

              {/* 5. Actions Taken */}
              <div className="form-section">
                <h3 className="form-section-title">5. Actions Taken</h3>
                <div className="form-fields">
                  {textarea(values,'actionsTaken','Actions Taken So Far')}
                  {textarea(values,'proposedResolution','Proposed Resolution')}
                  {textarea(values,'escalationReason','Escalation Reason')}
                </div>
              </div>

              {/* 6. Risk Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">6. Risk Assessment</h3>
                <div className="form-fields">
                  {textarea(values,'keyRisksIdentified','Key Risks Identified')}
                  {textarea(values,'mitigationMeasures','Mitigation Measures')}
                </div>
              </div>

              {/* 7. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">7. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requestedByConfirmation','Requested By (Name)')}
                  {field(values,'businessHrApproval','Business / HR Approval')}
                  {field(values,'legalApproval','Legal Approval')}
                  {field(values,'managementApproval','Management Approval')}
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
                    Submit Dispute Escalation
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

export default FRM00198_DisputeEscalation;
