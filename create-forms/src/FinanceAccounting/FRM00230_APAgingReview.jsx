// FRM00230_APAgingReview.jsx
// FRM-00230 – AP Aging Review – Request / Initiation Form

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
  priorityLevel: Yup.string().required('Required'),

  // 2. Aging Summary
  totalPayables: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),
  bucket0to30: Yup.string().required('Required'),
  bucket31to60: Yup.string().required('Required'),
  bucket61to90: Yup.string().required('Required'),
  bucket90Plus: Yup.string().required('Required'),

  // 3. Key Vendors / Accounts (summary level capture)
  keyVendorsSummary: Yup.string().required('Required'),

  // 4. Analysis & Observations
  keyObservations: Yup.string().required('Required'),
  majorOverdueReasons: Yup.string().required('Required'),
  riskAssessment: Yup.string().required('Required'),

  // 5. Action Plan
  immediateActions: Yup.string().required('Required'),
  followUpRequired: Yup.string().required('Required'),
  targetResolutionDate: Yup.string().required('Required'),

  // 6. Authorization
  preparedByAuthorization: Yup.string().required('Required'),
  accountsPayableReview: Yup.string().required('Required'),
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
  priorityLevel: '',

  totalPayables: '',
  currency: '',
  bucket0to30: '',
  bucket31to60: '',
  bucket61to90: '',
  bucket90Plus: '',

  keyVendorsSummary: '',

  keyObservations: '',
  majorOverdueReasons: '',
  riskAssessment: '',

  immediateActions: '',
  followUpRequired: '',
  targetResolutionDate: '',

  preparedByAuthorization: '',
  accountsPayableReview: '',
  financeApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00230_APAgingReview = () => {

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
      formId="FRM-00230"
      title="AP Aging Review – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('AP Aging Review submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00230"
              title="AP Aging Review"
              department="Finance & Accounting – Accounts Payable"
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
                  {select(values,'priorityLevel','Priority Level',['Low','Medium','High','Critical'])}
                </div>
              </div>

              {/* 2. Aging Summary */}
              <div className="form-section">
                <h3 className="form-section-title">2. Aging Summary</h3>
                <div className="form-fields">
                  {field(values,'totalPayables','Total Payables','number')}
                  {field(values,'currency','Currency')}
                  {field(values,'bucket0to30','0–30 Days','number')}
                  {field(values,'bucket31to60','31–60 Days','number')}
                  {field(values,'bucket61to90','61–90 Days','number')}
                  {field(values,'bucket90Plus','90+ Days','number')}
                </div>
              </div>

              {/* 3. Key Vendors / Accounts */}
              <div className="form-section">
                <h3 className="form-section-title">3. Key Vendors / Accounts</h3>
                <div className="form-fields">
                  {textarea(values,'keyVendorsSummary','Vendor Name / Outstanding Amount / Aging Bucket / Remarks')}
                </div>
              </div>

              {/* 4. Analysis & Observations */}
              <div className="form-section">
                <h3 className="form-section-title">4. Analysis & Observations</h3>
                <div className="form-fields">
                  {textarea(values,'keyObservations','Key Observations')}
                  {textarea(values,'majorOverdueReasons','Major Overdue Reasons')}
                  {textarea(values,'riskAssessment','Risk Assessment')}
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
                  {field(values,'accountsPayableReview','Accounts Payable Review')}
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
                    Submit AP Aging Review
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

export default FRM00230_APAgingReview;
