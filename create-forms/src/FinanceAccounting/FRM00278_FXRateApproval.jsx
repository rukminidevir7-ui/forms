// FRM00278_FXRateApproval.jsx
// FRM-00278 – FX Rate Approval – Approval / Authorization Form

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
  date: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  purpose: Yup.string().required('Required'),

  // 2. FX Details
  currencyPair: Yup.string().required('Required'),
  transactionType: Yup.string().required('Required'),
  proposedFxRate: Yup.string().required('Required'),
  marketRate: Yup.string().required('Required'),
  notionalAmount: Yup.string().required('Required'),
  valueDate: Yup.string().required('Required'),
  counterpartyBank: Yup.string().required('Required'),
  fxPurpose: Yup.string().required('Required'),

  // 3. Cash Position Summary
  openingCashBalance: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),
  projectedInflows: Yup.string().required('Required'),
  projectedOutflows: Yup.string().required('Required'),
  netCashPosition: Yup.string().required('Required'),
  closingBalance: Yup.string().required('Required'),

  // 4. Forecast Details
  forecastSummary: Yup.string().required('Required'),

  // 5. Risk & Assumptions
  riskAssessment: Yup.string().required('Required'),
  keyAssumptions: Yup.string().required('Required'),
  varianceJustification: Yup.string().required('Required'),

  // 6. Authorization
  preparedByAuthorization: Yup.string().required('Required'),
  treasuryReview: Yup.string().required('Required'),
  financeApproval: Yup.string().required('Required'),
  authorizedSignatory: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  formId: '',
  date: '',
  department: '',
  preparedBy: '',
  referenceNumber: '',
  purpose: '',

  currencyPair: '',
  transactionType: '',
  proposedFxRate: '',
  marketRate: '',
  notionalAmount: '',
  valueDate: '',
  counterpartyBank: '',
  fxPurpose: '',

  openingCashBalance: '',
  currency: '',
  projectedInflows: '',
  projectedOutflows: '',
  netCashPosition: '',
  closingBalance: '',

  forecastSummary: '',

  riskAssessment: '',
  keyAssumptions: '',
  varianceJustification: '',

  preparedByAuthorization: '',
  treasuryReview: '',
  financeApproval: '',
  authorizedSignatory: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00278_FXRateApproval = () => {

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
      formId="FRM-00278"
      title="FX Rate Approval – Approval / Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('FX Rate & Treasury Forecast submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00278"
              title="FX Rate & Treasury Forecast"
              department="Finance & Accounting – Treasury & Banking"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'date','Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {textarea(values,'purpose','Purpose')}
                </div>
              </div>

              {/* 2. FX Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. FX Details</h3>
                <div className="form-fields">
                  {field(values,'currencyPair','Currency Pair (e.g., USD/INR)')}
                  {select(values,'transactionType','Transaction Type',['Spot','Forward','Swap','Hedge','Other'])}
                  {field(values,'proposedFxRate','Proposed FX Rate')}
                  {field(values,'marketRate','Market Rate')}
                  {field(values,'notionalAmount','Notional Amount','number')}
                  {field(values,'valueDate','Value Date','date')}
                  {field(values,'counterpartyBank','Counterparty / Bank')}
                  {textarea(values,'fxPurpose','Purpose')}
                </div>
              </div>

              {/* 3. Cash Position Summary */}
              <div className="form-section">
                <h3 className="form-section-title">3. Cash Position Summary</h3>
                <div className="form-fields">
                  {field(values,'openingCashBalance','Opening Cash Balance','number')}
                  {field(values,'currency','Currency')}
                  {field(values,'projectedInflows','Projected Inflows','number')}
                  {field(values,'projectedOutflows','Projected Outflows','number')}
                  {field(values,'netCashPosition','Net Cash Position','number')}
                  {field(values,'closingBalance','Closing Balance','number')}
                </div>
              </div>

              {/* 4. Forecast Details */}
              <div className="form-section">
                <h3 className="form-section-title">4. Forecast Details</h3>
                <div className="form-fields">
                  {textarea(values,'forecastSummary','Date / Description / Inflows / Outflows / Balance')}
                </div>
              </div>

              {/* 5. Risk & Assumptions */}
              <div className="form-section">
                <h3 className="form-section-title">5. Risk & Assumptions</h3>
                <div className="form-fields">
                  {textarea(values,'riskAssessment','Risk Assessment')}
                  {textarea(values,'keyAssumptions','Key Assumptions')}
                  {textarea(values,'varianceJustification','Variance Justification')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByAuthorization','Prepared By (Name)')}
                  {field(values,'treasuryReview','Treasury Review')}
                  {field(values,'financeApproval','Finance Approval')}
                  {field(values,'authorizedSignatory','Authorized Signatory')}
                  {textarea(values,'approvalComments','Comments')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit FX Rate Approval
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

export default FRM00278_FXRateApproval;
