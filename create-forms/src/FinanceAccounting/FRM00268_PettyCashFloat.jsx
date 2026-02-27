// FRM00268_PettyCashFloat.jsx
// FRM-00268 – Petty Cash Float – Request / Initiation Form

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
  requestedBy: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),

  // 2. Float Details
  requestType: Yup.string().required('Required'),
  purpose: Yup.string().required('Required'),
  requestedAmount: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),
  effectiveDate: Yup.string().required('Required'),
  custodianName: Yup.string().required('Required'),

  // 3. Denomination Plan
  denominationPlan: Yup.string().required('Required'),

  // 4. Control Checks
  floatLimitApproved: Yup.string().required('Required'),
  custodianAcknowledgement: Yup.string().required('Required'),
  securityMeasuresConfirmed: Yup.string().required('Required'),

  // 5. Remarks
  remarks: Yup.string().required('Required'),
  exceptionsConditions: Yup.string().required('Required'),

  // 6. Authorization
  requestedByAuthorization: Yup.string().required('Required'),
  pettyCashCustodian: Yup.string().required('Required'),
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
  requestedBy: '',
  location: '',
  referenceNumber: '',

  requestType: '',
  purpose: '',
  requestedAmount: '',
  currency: '',
  effectiveDate: '',
  custodianName: '',

  denominationPlan: '',

  floatLimitApproved: '',
  custodianAcknowledgement: '',
  securityMeasuresConfirmed: '',

  remarks: '',
  exceptionsConditions: '',

  requestedByAuthorization: '',
  pettyCashCustodian: '',
  treasuryFinanceReview: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00268_PettyCashFloat = () => {

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
      formId="FRM-00268"
      title="Petty Cash Float – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Petty cash float request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00268"
              title="Petty Cash Float"
              department="Finance & Accounting – Treasury & Banking"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'requestedBy','Requested By')}
                  {field(values,'location','Location')}
                  {field(values,'referenceNumber','Reference Number')}
                </div>
              </div>

              {/* 2. Float Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Float Details</h3>
                <div className="form-fields">
                  {select(values,'requestType','Type of Request',['New Float','Increase Float','Decrease Float','Temporary Float','Permanent Float'])}
                  {textarea(values,'purpose','Purpose')}
                  {field(values,'requestedAmount','Requested Float Amount','number')}
                  {field(values,'currency','Currency')}
                  {field(values,'effectiveDate','Effective Date','date')}
                  {field(values,'custodianName','Custodian Name')}
                </div>
              </div>

              {/* 3. Denomination Plan */}
              <div className="form-section">
                <h3 className="form-section-title">3. Denomination Plan</h3>
                <div className="form-fields">
                  {textarea(values,'denominationPlan','Denomination / Quantity / Total')}
                </div>
              </div>

              {/* 4. Control Checks */}
              <div className="form-section">
                <h3 className="form-section-title">4. Control Checks</h3>
                <div className="form-fields">
                  {select(values,'floatLimitApproved','Float Limit Approved',['Yes','No'])}
                  {select(values,'custodianAcknowledgement','Custodian Acknowledgement',['Yes','No'])}
                  {select(values,'securityMeasuresConfirmed','Security Measures Confirmed',['Yes','No'])}
                </div>
              </div>

              {/* 5. Remarks */}
              <div className="form-section">
                <h3 className="form-section-title">5. Remarks</h3>
                <div className="form-fields">
                  {textarea(values,'remarks','Remarks')}
                  {textarea(values,'exceptionsConditions','Exceptions / Conditions')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requestedByAuthorization','Requested By (Name)')}
                  {field(values,'pettyCashCustodian','Petty Cash Custodian')}
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
                    Submit Petty Cash Float Request
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

export default FRM00268_PettyCashFloat;
