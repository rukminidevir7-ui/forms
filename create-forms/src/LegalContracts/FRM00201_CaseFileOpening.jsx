// FRM00201_CaseFileOpening.jsx
// FRM-00201 – Case File Opening – Request / Initiation Form

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
  caseType: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // 2. Case Details
  caseTitle: Yup.string().required('Required'),
  caseCategory: Yup.string().required('Required'),
  incidentDate: Yup.string().required('Required'),
  incidentLocation: Yup.string().required('Required'),
  businessUnit: Yup.string().required('Required'),
  caseOwner: Yup.string().required('Required'),

  // 3. Parties Involved
  primaryParty: Yup.string().required('Required'),
  secondaryParty: Yup.string(),
  departmentEntity: Yup.string().required('Required'),
  relationship: Yup.string().required('Required'),
  partiesContactDetails: Yup.string().required('Required'),
  jurisdiction: Yup.string().required('Required'),

  // 4. Case Description
  summaryOfMatter: Yup.string().required('Required'),
  keyIssuesIdentified: Yup.string().required('Required'),
  initialAssessment: Yup.string().required('Required'),

  // 5. Risk & Impact Assessment
  operationalImpact: Yup.string().required('Required'),
  financialImpact: Yup.string().required('Required'),
  legalComplianceImpact: Yup.string().required('Required'),

  // 6. Actions & Next Steps
  immediateActionsTaken: Yup.string().required('Required'),
  proposedNextSteps: Yup.string().required('Required'),
  requiredApprovals: Yup.string().required('Required'),

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
  caseType: '',
  priorityLevel: '',

  caseTitle: '',
  caseCategory: '',
  incidentDate: '',
  incidentLocation: '',
  businessUnit: '',
  caseOwner: '',

  primaryParty: '',
  secondaryParty: '',
  departmentEntity: '',
  relationship: '',
  partiesContactDetails: '',
  jurisdiction: '',

  summaryOfMatter: '',
  keyIssuesIdentified: '',
  initialAssessment: '',

  operationalImpact: '',
  financialImpact: '',
  legalComplianceImpact: '',

  immediateActionsTaken: '',
  proposedNextSteps: '',
  requiredApprovals: '',

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

const FRM00201_CaseFileOpening = () => {

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
      formId="FRM-00201"
      title="Case File Opening – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Case File Opening submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00201"
              title="Case File Opening"
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
                  {select(values,'caseType','Case Type',['Employment Dispute','Contractual Matter','Regulatory Issue','Litigation','Internal Investigation'])}
                  {select(values,'priorityLevel','Priority',['Standard','High','Urgent','Critical'])}
                </div>
              </div>

              {/* 2. Case Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Case Details</h3>
                <div className="form-fields">
                  {field(values,'caseTitle','Case Title')}
                  {field(values,'caseCategory','Case Category')}
                  {field(values,'incidentDate','Date of Incident','date')}
                  {field(values,'incidentLocation','Location')}
                  {field(values,'businessUnit','Business Unit')}
                  {field(values,'caseOwner','Case Owner')}
                </div>
              </div>

              {/* 3. Parties Involved */}
              <div className="form-section">
                <h3 className="form-section-title">3. Parties Involved</h3>
                <div className="form-fields">
                  {field(values,'primaryParty','Primary Party')}
                  {field(values,'secondaryParty','Secondary Party')}
                  {field(values,'departmentEntity','Department / Entity')}
                  {field(values,'relationship','Relationship')}
                  {field(values,'partiesContactDetails','Contact Details')}
                  {field(values,'jurisdiction','Jurisdiction')}
                </div>
              </div>

              {/* 4. Case Description */}
              <div className="form-section">
                <h3 className="form-section-title">4. Case Description</h3>
                <div className="form-fields">
                  {textarea(values,'summaryOfMatter','Summary of Matter')}
                  {textarea(values,'keyIssuesIdentified','Key Issues Identified')}
                  {textarea(values,'initialAssessment','Initial Assessment')}
                </div>
              </div>

              {/* 5. Risk & Impact Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">5. Risk & Impact Assessment</h3>
                <div className="form-fields">
                  {textarea(values,'operationalImpact','Operational Impact')}
                  {textarea(values,'financialImpact','Financial Impact')}
                  {textarea(values,'legalComplianceImpact','Legal / Compliance Impact')}
                </div>
              </div>

              {/* 6. Actions & Next Steps */}
              <div className="form-section">
                <h3 className="form-section-title">6. Actions & Next Steps</h3>
                <div className="form-fields">
                  {textarea(values,'immediateActionsTaken','Immediate Actions Taken')}
                  {textarea(values,'proposedNextSteps','Proposed Next Steps')}
                  {textarea(values,'requiredApprovals','Required Approvals')}
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
                    Submit Case File Opening
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

export default FRM00201_CaseFileOpening;
