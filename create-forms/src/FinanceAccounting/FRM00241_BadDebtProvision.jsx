// FRM00241_BadDebtProvision.jsx
// FRM-00241 – Bad Debt Provision – Request / Initiation Form

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
  formId: Yup.string().required('Required'),
  provisionDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  reviewPeriod: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),

  // 2. Customer / Account Details
  customerName: Yup.string().required('Required'),
  customerId: Yup.string().required('Required'),
  accountReference: Yup.string().required('Required'),
  agingBucket: Yup.string().required('Required'),
  outstandingAmount: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),

  // 3. Provision Details
  provisionMethod: Yup.string().required('Required'),
  provisionPercentage: Yup.string().required('Required'),
  provisionAmount: Yup.string().required('Required'),
  glAccountCode: Yup.string().required('Required'),
  priorProvision: Yup.string().required('Required'),
  netAdjustment: Yup.string().required('Required'),

  // 4. Assessment & Justification
  reasonForProvision: Yup.string().required('Required'),
  collectionEffortsSummary: Yup.string().required('Required'),
  riskAssessment: Yup.string().required('Required'),

  // 5. Impact Analysis
  pnlImpact: Yup.string().required('Required'),
  balanceSheetImpact: Yup.string().required('Required'),
  taxImpactConsideration: Yup.string().required('Required'),

  // 6. Authorization
  preparedByAuthorization: Yup.string().required('Required'),
  arCollectionsReview: Yup.string().required('Required'),
  financeApproval: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  formId: '',
  provisionDate: '',
  department: '',
  preparedBy: '',
  reviewPeriod: '',
  referenceNumber: '',

  customerName: '',
  customerId: '',
  accountReference: '',
  agingBucket: '',
  outstandingAmount: '',
  currency: '',

  provisionMethod: '',
  provisionPercentage: '',
  provisionAmount: '',
  glAccountCode: '',
  priorProvision: '',
  netAdjustment: '',

  reasonForProvision: '',
  collectionEffortsSummary: '',
  riskAssessment: '',

  pnlImpact: '',
  balanceSheetImpact: '',
  taxImpactConsideration: '',

  preparedByAuthorization: '',
  arCollectionsReview: '',
  financeApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00241_BadDebtProvision = () => {

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
      formId="FRM-00241"
      title="Bad Debt Provision – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Bad debt provision request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00241"
              title="Bad Debt Provision"
              department="Finance & Accounting – Accounts Receivable"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'provisionDate','Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'reviewPeriod','Review Period')}
                  {field(values,'referenceNumber','Reference Number')}
                </div>
              </div>

              {/* 2. Customer / Account Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Customer / Account Details</h3>
                <div className="form-fields">
                  {field(values,'customerName','Customer Name')}
                  {field(values,'customerId','Customer ID')}
                  {field(values,'accountReference','Invoice / Account Reference')}
                  {field(values,'agingBucket','Aging Bucket')}
                  {field(values,'outstandingAmount','Outstanding Amount','number')}
                  {field(values,'currency','Currency')}
                </div>
              </div>

              {/* 3. Provision Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Provision Details</h3>
                <div className="form-fields">
                  {select(values,'provisionMethod','Provision Method',['Specific Provision','General Provision','ECL Method','Write-off Recommendation'])}
                  {field(values,'provisionPercentage','Provision Percentage (%)','number')}
                  {field(values,'provisionAmount','Provision Amount','number')}
                  {field(values,'glAccountCode','GL / Account Code')}
                  {field(values,'priorProvision','Prior Provision (if any)','number')}
                  {field(values,'netAdjustment','Net Adjustment','number')}
                </div>
              </div>

              {/* 4. Assessment & Justification */}
              <div className="form-section">
                <h3 className="form-section-title">4. Assessment & Justification</h3>
                <div className="form-fields">
                  {textarea(values,'reasonForProvision','Reason for Provision')}
                  {textarea(values,'collectionEffortsSummary','Collection Efforts Summary')}
                  {textarea(values,'riskAssessment','Risk Assessment')}
                </div>
              </div>

              {/* 5. Impact Analysis */}
              <div className="form-section">
                <h3 className="form-section-title">5. Impact Analysis</h3>
                <div className="form-fields">
                  {textarea(values,'pnlImpact','P&L Impact')}
                  {textarea(values,'balanceSheetImpact','Balance Sheet Impact')}
                  {textarea(values,'taxImpactConsideration','Tax Impact Consideration')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByAuthorization','Prepared By (Name)')}
                  {field(values,'arCollectionsReview','AR / Collections Review')}
                  {field(values,'financeApproval','Finance Approval')}
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
                    Submit Bad Debt Provision
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

export default FRM00241_BadDebtProvision;
