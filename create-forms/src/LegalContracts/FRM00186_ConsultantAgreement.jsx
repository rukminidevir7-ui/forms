// FRM00186_ConsultantAgreement.jsx
// FRM-00186 – Consultant Agreement – Request / Authorization Form

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
  agreementType: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // 2. Consultant Details
  consultantName: Yup.string().required('Required'),
  consultantId: Yup.string(),
  consultantAddress: Yup.string().required('Required'),
  consultantContactPerson: Yup.string().required('Required'),
  consultantEmailPhone: Yup.string().required('Required'),
  consultantJurisdiction: Yup.string().required('Required'),

  // 3. Engagement Details
  engagementTitle: Yup.string().required('Required'),
  businessOwner: Yup.string().required('Required'),
  startDate: Yup.string().required('Required'),
  endDate: Yup.string().required('Required'),
  workLocationMode: Yup.string().required('Required'),
  reportingManager: Yup.string().required('Required'),

  // 4. Scope & Deliverables
  scopeOfServices: Yup.string().required('Required'),
  keyDeliverables: Yup.string().required('Required'),
  milestones: Yup.string().required('Required'),

  // 5. Commercial Terms
  feeStructure: Yup.string().required('Required'),
  estimatedValue: Yup.string().required('Required'),
  paymentTerms: Yup.string().required('Required'),
  billingFrequency: Yup.string().required('Required'),
  contractCurrency: Yup.string().required('Required'),
  expenseReimbursement: Yup.string().required('Required'),

  // 6. Obligations & Compliance
  keyObligations: Yup.string().required('Required'),
  confidentialityRequirements: Yup.string().required('Required'),
  complianceRequirements: Yup.string().required('Required'),

  // 7. Risk & Review
  keyRisksIdentified: Yup.string().required('Required'),
  businessReviewer: Yup.string().required('Required'),
  legalReviewer: Yup.string().required('Required'),

  // 8. Authorization
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
  agreementType: '',
  priorityLevel: '',

  consultantName: '',
  consultantId: '',
  consultantAddress: '',
  consultantContactPerson: '',
  consultantEmailPhone: '',
  consultantJurisdiction: '',

  engagementTitle: '',
  businessOwner: '',
  startDate: '',
  endDate: '',
  workLocationMode: '',
  reportingManager: '',

  scopeOfServices: '',
  keyDeliverables: '',
  milestones: '',

  feeStructure: '',
  estimatedValue: '',
  paymentTerms: '',
  billingFrequency: '',
  contractCurrency: '',
  expenseReimbursement: '',

  keyObligations: '',
  confidentialityRequirements: '',
  complianceRequirements: '',

  keyRisksIdentified: '',
  businessReviewer: '',
  legalReviewer: '',

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

const FRM00186_ConsultantAgreement = () => {

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
      formId="FRM-00186"
      title="Consultant Agreement – Request / Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Consultant Agreement form submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00186"
              title="Consultant Agreement"
              department="Legal & Contracts – Employment Legal"
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
                  {select(values,'agreementType','Agreement Type',['New Engagement','Renewal','Extension','Amendment'])}
                  {select(values,'priorityLevel','Priority',['Standard','High','Urgent'])}
                </div>
              </div>

              {/* 2. Consultant Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Consultant Details</h3>
                <div className="form-fields">
                  {field(values,'consultantName','Consultant Name / Firm')}
                  {field(values,'consultantId','Consultant ID (if applicable)')}
                  {field(values,'consultantAddress','Registered Address')}
                  {field(values,'consultantContactPerson','Contact Person')}
                  {field(values,'consultantEmailPhone','Email / Phone')}
                  {field(values,'consultantJurisdiction','Country / Jurisdiction')}
                </div>
              </div>

              {/* 3. Engagement Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Engagement Details</h3>
                <div className="form-fields">
                  {field(values,'engagementTitle','Engagement Title')}
                  {field(values,'businessOwner','Business Owner')}
                  {field(values,'startDate','Start Date','date')}
                  {field(values,'endDate','End Date','date')}
                  {field(values,'workLocationMode','Work Location / Mode')}
                  {field(values,'reportingManager','Reporting Manager')}
                </div>
              </div>

              {/* 4. Scope & Deliverables */}
              <div className="form-section">
                <h3 className="form-section-title">4. Scope & Deliverables</h3>
                <div className="form-fields">
                  {textarea(values,'scopeOfServices','Scope of Services')}
                  {textarea(values,'keyDeliverables','Key Deliverables')}
                  {textarea(values,'milestones','Milestones')}
                </div>
              </div>

              {/* 5. Commercial Terms */}
              <div className="form-section">
                <h3 className="form-section-title">5. Commercial Terms</h3>
                <div className="form-fields">
                  {textarea(values,'feeStructure','Fee Structure')}
                  {field(values,'estimatedValue','Estimated Engagement Value')}
                  {textarea(values,'paymentTerms','Payment Terms')}
                  {field(values,'billingFrequency','Billing Frequency')}
                  {field(values,'contractCurrency','Currency')}
                  {textarea(values,'expenseReimbursement','Expense Reimbursement Terms')}
                </div>
              </div>

              {/* 6. Obligations & Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">6. Obligations & Compliance</h3>
                <div className="form-fields">
                  {textarea(values,'keyObligations','Key Obligations')}
                  {textarea(values,'confidentialityRequirements','Confidentiality Requirements')}
                  {textarea(values,'complianceRequirements','Compliance Requirements')}
                </div>
              </div>

              {/* 7. Risk & Review */}
              <div className="form-section">
                <h3 className="form-section-title">7. Risk & Review</h3>
                <div className="form-fields">
                  {textarea(values,'keyRisksIdentified','Key Risks Identified')}
                  {field(values,'businessReviewer','Reviewed By (Business)')}
                  {field(values,'legalReviewer','Reviewed By (Legal)')}
                </div>
              </div>

              {/* 8. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">8. Authorization</h3>
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
                    Submit Consultant Agreement
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

export default FRM00186_ConsultantAgreement;
