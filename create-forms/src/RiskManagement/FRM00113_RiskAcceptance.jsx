// FRM00113_RiskAcceptance.jsx
// FRM-00113 – Risk Acceptance – Request / Authorization Form

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
  departmentFunction: Yup.string().required('Required'),
  requesterName: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  acceptanceType: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // Risk Details
  riskId: Yup.string().required('Required'),
  riskTitle: Yup.string().required('Required'),
  riskDescription: Yup.string().required('Required'),
  riskOwner: Yup.string().required('Required'),
  currentRiskRating: Yup.string().required('Required'),

  // Justification
  reasonForAcceptance: Yup.string().required('Required'),
  businessJustification: Yup.string().required('Required'),
  potentialImpact: Yup.string().required('Required'),

  // Conditions & Monitoring
  conditionsLimitations: Yup.string().required('Required'),
  monitoringMethod: Yup.string().required('Required'),
  reviewDate: Yup.string().required('Required'),

  // Authorization
  requestedByAuthorization: Yup.string().required('Required'),
  riskOwnerApproval: Yup.string().required('Required'),
  managementApproval: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  requestDate: '',
  departmentFunction: '',
  requesterName: '',
  employeeId: '',
  contactNumber: '',
  acceptanceType: '',
  priorityLevel: '',

  riskId: '',
  riskTitle: '',
  riskDescription: '',
  riskOwner: '',
  currentRiskRating: '',

  reasonForAcceptance: '',
  businessJustification: '',
  potentialImpact: '',

  conditionsLimitations: '',
  monitoringMethod: '',
  reviewDate: '',

  requestedByAuthorization: '',
  riskOwnerApproval: '',
  managementApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00113_RiskAcceptance = () => {

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
      formId="FRM-00113"
      title="Risk Acceptance – Request / Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Risk acceptance request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00113"
              title="Risk Acceptance – Enterprise Risk"
              department="Risk Management – Enterprise Risk"
            >

              {/* Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'requestDate','Date','date')}
                  {field(values,'departmentFunction','Department / Function')}
                  {field(values,'requesterName','Requester Name')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'contactNumber','Contact')}
                  {select(values,'acceptanceType','Acceptance Type',['Temporary Acceptance','Permanent Acceptance','Conditional Acceptance'])}
                  {select(values,'priorityLevel','Priority',['Low','Medium','High','Critical'])}
                </div>
              </div>

              {/* Risk Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Risk Details</h3>
                <div className="form-fields">
                  {field(values,'riskId','Risk ID')}
                  {field(values,'riskTitle','Risk Title')}
                  {textarea(values,'riskDescription','Risk Description')}
                  {field(values,'riskOwner','Risk Owner')}
                  {field(values,'currentRiskRating','Current Risk Rating')}
                </div>
              </div>

              {/* Justification */}
              <div className="form-section">
                <h3 className="form-section-title">3. Justification</h3>
                <div className="form-fields">
                  {textarea(values,'reasonForAcceptance','Reason for Acceptance')}
                  {textarea(values,'businessJustification','Business Justification')}
                  {textarea(values,'potentialImpact','Potential Impact')}
                </div>
              </div>

              {/* Conditions & Monitoring */}
              <div className="form-section">
                <h3 className="form-section-title">4. Conditions & Monitoring</h3>
                <div className="form-fields">
                  {textarea(values,'conditionsLimitations','Conditions / Limitations')}
                  {field(values,'monitoringMethod','Monitoring Method')}
                  {field(values,'reviewDate','Review Date','date')}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requestedByAuthorization','Requested By')}
                  {field(values,'riskOwnerApproval','Risk Owner Approval')}
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
                    Submit Acceptance Request
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

export default FRM00113_RiskAcceptance;
