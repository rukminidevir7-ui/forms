// FRM00279_TreasuryForecast.jsx
// FRM-00279 – Treasury Forecast – Request / Initiation Form

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
  authorizationDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  forecastPeriod: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),

  // 2. Cash Position Summary
  openingCashBalance: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),
  projectedInflows: Yup.string().required('Required'),
  projectedOutflows: Yup.string().required('Required'),
  netCashPosition: Yup.string().required('Required'),
  closingBalance: Yup.string().required('Required'),

  // 3. Forecast Details
  forecastDetails: Yup.string().required('Required'),

  // 4. Analysis & Assumptions
  keyAssumptions: Yup.string().required('Required'),
  risksSensitivities: Yup.string().required('Required'),
  varianceAnalysis: Yup.string().required('Required'),

  // 5. Authorization
  preparedByAuthorization: Yup.string().required('Required'),
  treasuryReview: Yup.string().required('Required'),
  financeApproval: Yup.string().required('Required'),
  managementApproval: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  formId: '',
  authorizationDate: '',
  department: '',
  preparedBy: '',
  forecastPeriod: '',
  referenceNumber: '',

  openingCashBalance: '',
  currency: '',
  projectedInflows: '',
  projectedOutflows: '',
  netCashPosition: '',
  closingBalance: '',

  forecastDetails: '',

  keyAssumptions: '',
  risksSensitivities: '',
  varianceAnalysis: '',

  preparedByAuthorization: '',
  treasuryReview: '',
  financeApproval: '',
  managementApproval: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00279_TreasuryForecast = () => {

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
      formId="FRM-00279"
      title="Treasury Forecast – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Treasury forecast submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00279"
              title="Treasury Forecast Authorization"
              department="Finance & Accounting – Treasury & Banking"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'authorizationDate','Authorization Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'forecastPeriod','Forecast Period')}
                  {field(values,'referenceNumber','Reference Number')}
                </div>
              </div>

              {/* 2. Cash Position Summary */}
              <div className="form-section">
                <h3 className="form-section-title">2. Cash Position Summary</h3>
                <div className="form-fields">
                  {field(values,'openingCashBalance','Opening Cash Balance','number')}
                  {field(values,'currency','Currency')}
                  {field(values,'projectedInflows','Projected Inflows','number')}
                  {field(values,'projectedOutflows','Projected Outflows','number')}
                  {field(values,'netCashPosition','Net Cash Position','number')}
                  {field(values,'closingBalance','Closing Balance','number')}
                </div>
              </div>

              {/* 3. Forecast Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Forecast Details</h3>
                <div className="form-fields">
                  {textarea(values,'forecastDetails','Date / Description / Inflows / Outflows / Balance')}
                </div>
              </div>

              {/* 4. Analysis & Assumptions */}
              <div className="form-section">
                <h3 className="form-section-title">4. Analysis & Assumptions</h3>
                <div className="form-fields">
                  {textarea(values,'keyAssumptions','Key Assumptions')}
                  {textarea(values,'risksSensitivities','Risks & Sensitivities')}
                  {textarea(values,'varianceAnalysis','Variance Analysis')}
                </div>
              </div>

              {/* 5. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByAuthorization','Prepared By (Name)')}
                  {field(values,'treasuryReview','Treasury Review')}
                  {field(values,'financeApproval','Finance Approval')}
                  {field(values,'managementApproval','Management Approval')}
                  {textarea(values,'approvalComments','Comments')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Treasury Forecast
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

export default FRM00279_TreasuryForecast;
