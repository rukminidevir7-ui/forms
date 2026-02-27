// FRM00265_CashHandling.jsx
// FRM-00265 – Cash Handling – Request / Initiation Form

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
  requestDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),

  // 2. Cash Activity Details
  activityType: Yup.string().required('Required'),
  purpose: Yup.string().required('Required'),
  amount: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),
  handlingDate: Yup.string().required('Required'),
  cashCustodian: Yup.string().required('Required'),

  // 3. Denomination Details (summary capture)
  denominationSummary: Yup.string().required('Required'),

  // 4. Control Checks
  cashCountVerified: Yup.string().required('Required'),
  dualControlApplied: Yup.string().required('Required'),
  securityMeasuresFollowed: Yup.string().required('Required'),

  // 5. Remarks / Observations
  remarks: Yup.string().required('Required'),
  exceptionsIssues: Yup.string().required('Required'),

  // 6. Authorization
  preparedByAuthorization: Yup.string().required('Required'),
  custodianConfirmation: Yup.string().required('Required'),
  treasuryFinanceReview: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  formId: '',
  requestDate: '',
  department: '',
  preparedBy: '',
  location: '',
  referenceNumber: '',

  activityType: '',
  purpose: '',
  amount: '',
  currency: '',
  handlingDate: '',
  cashCustodian: '',

  denominationSummary: '',

  cashCountVerified: '',
  dualControlApplied: '',
  securityMeasuresFollowed: '',

  remarks: '',
  exceptionsIssues: '',

  preparedByAuthorization: '',
  custodianConfirmation: '',
  treasuryFinanceReview: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00265_CashHandling = () => {

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
      formId="FRM-00265"
      title="Cash Handling – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Cash handling request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00265"
              title="Cash Handling"
              department="Finance & Accounting – Treasury & Banking"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'location','Location')}
                  {field(values,'referenceNumber','Reference Number')}
                </div>
              </div>

              {/* 2. Cash Activity Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Cash Activity Details</h3>
                <div className="form-fields">
                  {select(values,'activityType','Type of Activity',['Cash Withdrawal','Cash Deposit','Cash Transfer','Petty Cash Replenishment','Cash Collection','Other'])}
                  {textarea(values,'purpose','Purpose')}
                  {field(values,'amount','Amount','number')}
                  {field(values,'currency','Currency')}
                  {field(values,'handlingDate','Date of Handling','date')}
                  {field(values,'cashCustodian','Cash Custodian')}
                </div>
              </div>

              {/* 3. Denomination Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Denomination Details</h3>
                <div className="form-fields">
                  {textarea(values,'denominationSummary','Denomination / Quantity / Total')}
                </div>
              </div>

              {/* 4. Control Checks */}
              <div className="form-section">
                <h3 className="form-section-title">4. Control Checks</h3>
                <div className="form-fields">
                  {select(values,'cashCountVerified','Cash Count Verified',['Yes','No'])}
                  {select(values,'dualControlApplied','Dual Control Applied',['Yes','No'])}
                  {select(values,'securityMeasuresFollowed','Security Measures Followed',['Yes','No'])}
                </div>
              </div>

              {/* 5. Remarks / Observations */}
              <div className="form-section">
                <h3 className="form-section-title">5. Remarks / Observations</h3>
                <div className="form-fields">
                  {textarea(values,'remarks','Remarks')}
                  {textarea(values,'exceptionsIssues','Exceptions / Issues')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByAuthorization','Prepared By (Name)')}
                  {field(values,'custodianConfirmation','Cash Custodian')}
                  {field(values,'treasuryFinanceReview','Treasury / Finance Review')}
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
                    Submit Cash Handling Request
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

export default FRM00265_CashHandling;
