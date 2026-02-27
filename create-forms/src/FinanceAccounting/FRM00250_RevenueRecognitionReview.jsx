// FRM00250_RevenueRecognitionReview.jsx
// FRM-00250 – Revenue Recognition Review – Request / Initiation Form

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
  reviewDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  reviewPeriod: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),

  // 2. Contract / Customer Details
  customerName: Yup.string().required('Required'),
  customerId: Yup.string().required('Required'),
  contractProjectName: Yup.string().required('Required'),
  contractNumber: Yup.string().required('Required'),
  revenueStream: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),

  // 3. Recognition Details
  recognitionMethod: Yup.string().required('Required'),
  performanceObligation: Yup.string().required('Required'),
  recognitionBasis: Yup.string().required('Required'),
  stageOfCompletion: Yup.string().required('Required'),
  revenueRecognizedToDate: Yup.string().required('Required'),
  currentPeriodRevenue: Yup.string().required('Required'),

  // 4. Financial Summary
  contractValue: Yup.string().required('Required'),
  billingToDate: Yup.string().required('Required'),
  deferredRevenue: Yup.string().required('Required'),
  unbilledRevenue: Yup.string().required('Required'),

  // 5. Assessment & Observations
  keyJudgments: Yup.string().required('Required'),
  complianceCheck: Yup.string().required('Required'),
  riskAssessment: Yup.string().required('Required'),

  // 6. Adjustments
  adjustmentRequired: Yup.string().required('Required'),
  adjustmentDetails: Yup.string().required('Required'),
  financialImpact: Yup.string().required('Required'),

  // 7. Authorization
  preparedByAuthorization: Yup.string().required('Required'),
  revenueArReview: Yup.string().required('Required'),
  financeApproval: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  formId: '',
  reviewDate: '',
  department: '',
  preparedBy: '',
  reviewPeriod: '',
  referenceNumber: '',

  customerName: '',
  customerId: '',
  contractProjectName: '',
  contractNumber: '',
  revenueStream: '',
  currency: '',

  recognitionMethod: '',
  performanceObligation: '',
  recognitionBasis: '',
  stageOfCompletion: '',
  revenueRecognizedToDate: '',
  currentPeriodRevenue: '',

  contractValue: '',
  billingToDate: '',
  deferredRevenue: '',
  unbilledRevenue: '',

  keyJudgments: '',
  complianceCheck: '',
  riskAssessment: '',

  adjustmentRequired: '',
  adjustmentDetails: '',
  financialImpact: '',

  preparedByAuthorization: '',
  revenueArReview: '',
  financeApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00250_RevenueRecognitionReview = () => {

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
      formId="FRM-00250"
      title="Revenue Recognition Review – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Revenue recognition review submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00250"
              title="Revenue Recognition Review"
              department="Finance & Accounting – Accounts Receivable"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'reviewDate','Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'reviewPeriod','Review Period')}
                  {field(values,'referenceNumber','Reference Number')}
                </div>
              </div>

              {/* 2. Contract / Customer Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Contract / Customer Details</h3>
                <div className="form-fields">
                  {field(values,'customerName','Customer Name')}
                  {field(values,'customerId','Customer ID')}
                  {field(values,'contractProjectName','Contract / Project Name')}
                  {field(values,'contractNumber','Contract Number')}
                  {field(values,'revenueStream','Revenue Stream')}
                  {field(values,'currency','Currency')}
                </div>
              </div>

              {/* 3. Recognition Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Recognition Details</h3>
                <div className="form-fields">
                  {select(values,'recognitionMethod','Recognition Method',['Over Time','Point in Time','Milestone Based','Percentage of Completion'])}
                  {textarea(values,'performanceObligation','Performance Obligation')}
                  {textarea(values,'recognitionBasis','Recognition Basis')}
                  {field(values,'stageOfCompletion','Stage of Completion (%)','number')}
                  {field(values,'revenueRecognizedToDate','Revenue Recognized To Date','number')}
                  {field(values,'currentPeriodRevenue','Current Period Revenue','number')}
                </div>
              </div>

              {/* 4. Financial Summary */}
              <div className="form-section">
                <h3 className="form-section-title">4. Financial Summary</h3>
                <div className="form-fields">
                  {field(values,'contractValue','Contract Value','number')}
                  {field(values,'billingToDate','Billing To Date','number')}
                  {field(values,'deferredRevenue','Deferred Revenue','number')}
                  {field(values,'unbilledRevenue','Unbilled Revenue','number')}
                </div>
              </div>

              {/* 5. Assessment & Observations */}
              <div className="form-section">
                <h3 className="form-section-title">5. Assessment & Observations</h3>
                <div className="form-fields">
                  {textarea(values,'keyJudgments','Key Judgments')}
                  {textarea(values,'complianceCheck','Compliance Check (Policy / Standard)')}
                  {textarea(values,'riskAssessment','Risk Assessment')}
                </div>
              </div>

              {/* 6. Adjustments */}
              <div className="form-section">
                <h3 className="form-section-title">6. Adjustments</h3>
                <div className="form-fields">
                  {select(values,'adjustmentRequired','Adjustment Required',['Yes','No'])}
                  {textarea(values,'adjustmentDetails','Adjustment Details')}
                  {textarea(values,'financialImpact','Impact on Financials')}
                </div>
              </div>

              {/* 7. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">7. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByAuthorization','Prepared By (Name)')}
                  {field(values,'revenueArReview','Revenue / AR Review')}
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
                    Submit Revenue Recognition Review
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

export default FRM00250_RevenueRecognitionReview;
