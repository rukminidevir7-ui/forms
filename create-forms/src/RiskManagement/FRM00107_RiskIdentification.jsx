// FRM00107_RiskIdentification.jsx
// FRM-00107 – Risk Identification – Request / Initiation Form

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
  identificationDate: Yup.string().required('Required'),
  departmentFunction: Yup.string().required('Required'),
  requesterName: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  riskCategory: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // Risk Details
  riskTitle: Yup.string().required('Required'),
  riskAreaProcess: Yup.string().required('Required'),
  riskDescription: Yup.string().required('Required'),
  potentialCauses: Yup.string().required('Required'),
  potentialConsequences: Yup.string().required('Required'),

  // Risk Assessment
  likelihood: Yup.string().required('Required'),
  impact: Yup.string().required('Required'),
  riskRating: Yup.string().required('Required'),
  existingControls: Yup.string().required('Required'),
  recommendedActions: Yup.string().required('Required'),

  // Ownership & Timeline
  riskOwner: Yup.string().required('Required'),
  targetDate: Yup.string().required('Required'),
  monitoringMethod: Yup.string().required('Required'),
  reviewFrequency: Yup.string().required('Required'),

  // Authorization
  identifiedBy: Yup.string().required('Required'),
  reviewedBy: Yup.string().required('Required'),
  approvedBy: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  identificationDate: '',
  departmentFunction: '',
  requesterName: '',
  employeeId: '',
  contactNumber: '',
  riskCategory: '',
  priorityLevel: '',

  riskTitle: '',
  riskAreaProcess: '',
  riskDescription: '',
  potentialCauses: '',
  potentialConsequences: '',

  likelihood: '',
  impact: '',
  riskRating: '',
  existingControls: '',
  recommendedActions: '',

  riskOwner: '',
  targetDate: '',
  monitoringMethod: '',
  reviewFrequency: '',

  identifiedBy: '',
  reviewedBy: '',
  approvedBy: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00107_RiskIdentification = () => {

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
      formId="FRM-00107"
      title="Risk Identification – Request / Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Risk identification submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00107"
              title="Risk Identification – Enterprise Risk"
              department="Risk Management – Enterprise Risk"
            >

              {/* Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'identificationDate','Date','date')}
                  {field(values,'departmentFunction','Department / Function')}
                  {field(values,'requesterName','Requester Name')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'contactNumber','Contact')}
                  {select(values,'riskCategory','Risk Category',['Strategic','Operational','Financial','Compliance','Reputational','IT / Cyber','Project'])}
                  {select(values,'priorityLevel','Priority',['Low','Medium','High','Critical'])}
                </div>
              </div>

              {/* Risk Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Risk Details</h3>
                <div className="form-fields">
                  {field(values,'riskTitle','Risk Title')}
                  {field(values,'riskAreaProcess','Risk Area / Process')}
                  {textarea(values,'riskDescription','Risk Description')}
                  {textarea(values,'potentialCauses','Potential Causes')}
                  {textarea(values,'potentialConsequences','Potential Consequences')}
                </div>
              </div>

              {/* Risk Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">3. Risk Assessment</h3>
                <div className="form-fields">
                  {select(values,'likelihood','Likelihood',['Rare','Unlikely','Possible','Likely','Almost Certain'])}
                  {select(values,'impact','Impact',['Insignificant','Minor','Moderate','Major','Severe'])}
                  {field(values,'riskRating','Risk Rating')}
                  {textarea(values,'existingControls','Existing Controls')}
                  {textarea(values,'recommendedActions','Recommended Actions')}
                </div>
              </div>

              {/* Ownership & Timeline */}
              <div className="form-section">
                <h3 className="form-section-title">4. Ownership & Timeline</h3>
                <div className="form-fields">
                  {field(values,'riskOwner','Risk Owner')}
                  {field(values,'targetDate','Target Date','date')}
                  {field(values,'monitoringMethod','Monitoring Method')}
                  {select(values,'reviewFrequency','Review Frequency',['Monthly','Quarterly','Bi-Annually','Annually'])}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'identifiedBy','Identified By')}
                  {field(values,'reviewedBy','Reviewed By')}
                  {field(values,'approvedBy','Approved By')}
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
                    Submit Risk
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

export default FRM00107_RiskIdentification;
