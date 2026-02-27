// FRM00180_TerminationNotice.jsx
// FRM-00180 – Termination Notice – Request / Authorization Form

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
  preparedBy: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  contactDetails: Yup.string().required('Required'),
  terminationType: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // 2. Agreement / Contract Details
  contractName: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  counterpartyName: Yup.string().required('Required'),
  contractEffectiveDate: Yup.string().required('Required'),
  terminationEffectiveDate: Yup.string().required('Required'),
  noticePeriod: Yup.string().required('Required'),

  // 3. Termination Details
  terminationReason: Yup.string().required('Required'),
  terminationClauseReference: Yup.string().required('Required'),
  summaryOfCircumstances: Yup.string().required('Required'),

  // 4. Obligations & Actions
  outstandingObligations: Yup.string().required('Required'),
  settlementDetails: Yup.string().required('Required'),
  transitionHandoverRequirements: Yup.string().required('Required'),

  // 5. Risk & Compliance
  keyRisksIdentified: Yup.string().required('Required'),
  complianceLegalConsiderations: Yup.string().required('Required'),
  disputeRiskAssessment: Yup.string().required('Required'),

  // 6. Authorization
  preparedByConfirmation: Yup.string().required('Required'),
  businessApproval: Yup.string().required('Required'),
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
  preparedBy: '',
  employeeId: '',
  contactDetails: '',
  terminationType: '',
  priorityLevel: '',

  contractName: '',
  referenceNumber: '',
  counterpartyName: '',
  contractEffectiveDate: '',
  terminationEffectiveDate: '',
  noticePeriod: '',

  terminationReason: '',
  terminationClauseReference: '',
  summaryOfCircumstances: '',

  outstandingObligations: '',
  settlementDetails: '',
  transitionHandoverRequirements: '',

  keyRisksIdentified: '',
  complianceLegalConsiderations: '',
  disputeRiskAssessment: '',

  preparedByConfirmation: '',
  businessApproval: '',
  legalApproval: '',
  managementApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00180_TerminationNotice = () => {

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
      formId="FRM-00180"
      title="Termination Notice – Request / Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Termination Notice form submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00180"
              title="Termination Notice"
              department="Legal & Contracts – Contracting"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'departmentFunction','Department / Function')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'contactDetails','Contact Details')}
                  {select(values,'terminationType','Termination Type',['For Convenience','For Cause','Mutual Termination','Expiry'])}
                  {select(values,'priorityLevel','Priority',['Standard','High','Urgent'])}
                </div>
              </div>

              {/* 2. Agreement / Contract Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Agreement / Contract Details</h3>
                <div className="form-fields">
                  {field(values,'contractName','Agreement / Contract Name')}
                  {field(values,'referenceNumber','Reference Number')}
                  {field(values,'counterpartyName','Counterparty')}
                  {field(values,'contractEffectiveDate','Original Effective Date','date')}
                  {field(values,'terminationEffectiveDate','Termination Effective Date','date')}
                  {field(values,'noticePeriod','Notice Period (Days)')}
                </div>
              </div>

              {/* 3. Termination Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Termination Details</h3>
                <div className="form-fields">
                  {textarea(values,'terminationReason','Reason for Termination')}
                  {field(values,'terminationClauseReference','Termination Clause Reference')}
                  {textarea(values,'summaryOfCircumstances','Summary of Circumstances')}
                </div>
              </div>

              {/* 4. Obligations & Actions */}
              <div className="form-section">
                <h3 className="form-section-title">4. Obligations & Actions</h3>
                <div className="form-fields">
                  {textarea(values,'outstandingObligations','Outstanding Obligations')}
                  {textarea(values,'settlementDetails','Settlement / Final Payment Details')}
                  {textarea(values,'transitionHandoverRequirements','Transition / Handover Requirements')}
                </div>
              </div>

              {/* 5. Risk & Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">5. Risk & Compliance</h3>
                <div className="form-fields">
                  {textarea(values,'keyRisksIdentified','Key Risks Identified')}
                  {textarea(values,'complianceLegalConsiderations','Compliance / Legal Considerations')}
                  {textarea(values,'disputeRiskAssessment','Dispute Risk Assessment')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByConfirmation','Prepared By (Name)')}
                  {field(values,'businessApproval','Business Approval')}
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
                    Submit Termination Notice
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

export default FRM00180_TerminationNotice;
