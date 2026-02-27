// FRM00175_StatementOfWork.jsx
// FRM-00175 – Statement of Work – Request / Authorization Form

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
  preparedBy: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  contactDetails: Yup.string().required('Required'),
  sowType: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // Project / Engagement Details
  projectName: Yup.string().required('Required'),
  clientCounterparty: Yup.string().required('Required'),
  projectManager: Yup.string().required('Required'),
  businessUnit: Yup.string().required('Required'),
  projectLocation: Yup.string().required('Required'),
  referenceAgreement: Yup.string().required('Required'),

  // Scope & Deliverables
  scopeOfWork: Yup.string().required('Required'),
  keyDeliverables: Yup.string().required('Required'),
  milestones: Yup.string().required('Required'),

  // Timeline & Resources
  startDate: Yup.string().required('Required'),
  endDate: Yup.string().required('Required'),
  resourceRequirements: Yup.string().required('Required'),
  dependencies: Yup.string().required('Required'),

  // Commercial Terms
  pricingModel: Yup.string().required('Required'),
  estimatedCost: Yup.string().required('Required'),
  paymentMilestones: Yup.string().required('Required'),
  contractCurrency: Yup.string().required('Required'),

  // Risk & Compliance
  keyRisks: Yup.string().required('Required'),
  complianceRequirements: Yup.string().required('Required'),
  assumptionsConstraints: Yup.string().required('Required'),

  // Authorization
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
  sowType: '',
  priorityLevel: '',

  projectName: '',
  clientCounterparty: '',
  projectManager: '',
  businessUnit: '',
  projectLocation: '',
  referenceAgreement: '',

  scopeOfWork: '',
  keyDeliverables: '',
  milestones: '',

  startDate: '',
  endDate: '',
  resourceRequirements: '',
  dependencies: '',

  pricingModel: '',
  estimatedCost: '',
  paymentMilestones: '',
  contractCurrency: '',

  keyRisks: '',
  complianceRequirements: '',
  assumptionsConstraints: '',

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

const FRM00175_StatementOfWork = () => {

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
      formId="FRM-00175"
      title="Statement of Work – Request / Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Statement of Work form submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00175"
              title="Statement of Work (SOW)"
              department="Legal & Contracts – Contracting"
            >

              {/* Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'departmentFunction','Department / Function')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'contactDetails','Contact Details')}
                  {select(values,'sowType','SOW Type',['New Engagement','Change Order','Renewal','Extension'])}
                  {select(values,'priorityLevel','Priority',['Standard','High','Urgent'])}
                </div>
              </div>

              {/* Project / Engagement Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Project / Engagement Details</h3>
                <div className="form-fields">
                  {field(values,'projectName','Project / Engagement Name')}
                  {field(values,'clientCounterparty','Client / Counterparty')}
                  {field(values,'projectManager','Project Manager')}
                  {field(values,'businessUnit','Business Unit')}
                  {field(values,'projectLocation','Project Location')}
                  {field(values,'referenceAgreement','Reference Master Agreement')}
                </div>
              </div>

              {/* Scope & Deliverables */}
              <div className="form-section">
                <h3 className="form-section-title">3. Scope & Deliverables</h3>
                <div className="form-fields">
                  {textarea(values,'scopeOfWork','Scope of Work')}
                  {textarea(values,'keyDeliverables','Key Deliverables')}
                  {textarea(values,'milestones','Milestones')}
                </div>
              </div>

              {/* Timeline & Resources */}
              <div className="form-section">
                <h3 className="form-section-title">4. Timeline & Resources</h3>
                <div className="form-fields">
                  {field(values,'startDate','Start Date','date')}
                  {field(values,'endDate','End Date','date')}
                  {textarea(values,'resourceRequirements','Resource Requirements')}
                  {textarea(values,'dependencies','Dependencies')}
                </div>
              </div>

              {/* Commercial Terms */}
              <div className="form-section">
                <h3 className="form-section-title">5. Commercial Terms</h3>
                <div className="form-fields">
                  {select(values,'pricingModel','Pricing Model',['Fixed Price','Time & Material','Milestone-Based','Retainer'])}
                  {field(values,'estimatedCost','Estimated Contract Value')}
                  {textarea(values,'paymentMilestones','Payment Milestones')}
                  {field(values,'contractCurrency','Currency')}
                </div>
              </div>

              {/* Risk & Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">6. Risk & Compliance</h3>
                <div className="form-fields">
                  {textarea(values,'keyRisks','Key Risks Identified')}
                  {textarea(values,'complianceRequirements','Compliance Requirements')}
                  {textarea(values,'assumptionsConstraints','Assumptions / Constraints')}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">7. Authorization</h3>
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
                    Submit Statement of Work
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

export default FRM00175_StatementOfWork;
