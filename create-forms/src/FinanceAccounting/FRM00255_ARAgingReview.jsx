// FRM00255_ARAgingReview.jsx
// FRM-00255 – AR Aging Review – Request / Initiation Form

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

  // 2. Aging Summary
  totalReceivables: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),
  bucket0to30: Yup.string().required('Required'),
  bucket31to60: Yup.string().required('Required'),
  bucket61to90: Yup.string().required('Required'),
  bucket90Plus: Yup.string().required('Required'),

  // 3. Key Customers
  keyCustomersSummary: Yup.string().required('Required'),

  // 4. Analysis & Observations
  keyObservations: Yup.string().required('Required'),
  majorOverdueReasons: Yup.string().required('Required'),
  creditRiskAssessment: Yup.string().required('Required'),

  // 5. Action Plan
  immediateActions: Yup.string().required('Required'),
  followUpRequired: Yup.string().required('Required'),
  targetResolutionDate: Yup.string().required('Required'),

  // 6. Authorization
  preparedByAuthorization: Yup.string().required('Required'),
  arReview: Yup.string().required('Required'),
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

  totalReceivables: '',
  currency: '',
  bucket0to30: '',
  bucket31to60: '',
  bucket61to90: '',
  bucket90Plus: '',

  keyCustomersSummary: '',

  keyObservations: '',
  majorOverdueReasons: '',
  creditRiskAssessment: '',

  immediateActions: '',
  followUpRequired: '',
  targetResolutionDate: '',

  preparedByAuthorization: '',
  arReview: '',
  financeApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00255_ARAgingReview = () => {

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
          <Field as="textarea" name={name} className="form-textarea" rows="4" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (

    <ModernFormWrapper
      formId="FRM-00255"
      title="AR Aging Review – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('AR Aging Review submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00255"
              title="AR Aging Review"
              department="Finance & Accounting – Accounts Receivable"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'reviewDate','Review Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'reviewPeriod','Review Period')}
                  {field(values,'referenceNumber','Reference Number')}
                </div>
              </div>

              {/* 2. Aging Summary */}
              <div className="form-section">
                <h3 className="form-section-title">2. Aging Summary</h3>
                <div className="form-fields">
                  {field(values,'totalReceivables','Total Receivables','number')}
                  {field(values,'currency','Currency')}
                  {field(values,'bucket0to30','0–30 Days','number')}
                  {field(values,'bucket31to60','31–60 Days','number')}
                  {field(values,'bucket61to90','61–90 Days','number')}
                  {field(values,'bucket90Plus','90+ Days','number')}
                </div>
              </div>

              {/* 3. Key Customers */}
              <div className="form-section">
                <h3 className="form-section-title">3. Key Customers</h3>
                <div className="form-fields">
                  {textarea(values,'keyCustomersSummary','Customer Name / Outstanding Amount / Aging Bucket / Remarks')}
                </div>
              </div>

              {/* 4. Analysis & Observations */}
              <div className="form-section">
                <h3 className="form-section-title">4. Analysis & Observations</h3>
                <div className="form-fields">
                  {textarea(values,'keyObservations','Key Observations')}
                  {textarea(values,'majorOverdueReasons','Major Overdue Reasons')}
                  {textarea(values,'creditRiskAssessment','Credit Risk Assessment')}
                </div>
              </div>

              {/* 5. Action Plan */}
              <div className="form-section">
                <h3 className="form-section-title">5. Action Plan</h3>
                <div className="form-fields">
                  {textarea(values,'immediateActions','Immediate Actions')}
                  {textarea(values,'followUpRequired','Follow-up Required')}
                  {field(values,'targetResolutionDate','Target Resolution Date','date')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByAuthorization','Prepared By (Name)')}
                  {field(values,'arReview','AR Review')}
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
                    Submit AR Aging Review
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

export default FRM00255_ARAgingReview;
