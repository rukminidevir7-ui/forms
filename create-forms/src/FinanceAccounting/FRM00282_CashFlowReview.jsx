// FRM00282_CashFlowReview.jsx
// FRM-00282 – Cash Flow Review – Request / Initiation Form

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

  // 2. Cash Flow Summary
  openingBalance: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),
  totalInflows: Yup.string().required('Required'),
  totalOutflows: Yup.string().required('Required'),
  netCashFlow: Yup.string().required('Required'),
  closingBalance: Yup.string().required('Required'),

  // 3. Cash Flow Details
  cashFlowDetails: Yup.string().required('Required'),

  // 4. Analysis
  varianceAnalysis: Yup.string().required('Required'),
  keyObservations: Yup.string().required('Required'),
  risksIdentified: Yup.string().required('Required'),
  actionItems: Yup.string().required('Required'),

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
  reviewDate: '',
  department: '',
  preparedBy: '',
  reviewPeriod: '',
  referenceNumber: '',

  openingBalance: '',
  currency: '',
  totalInflows: '',
  totalOutflows: '',
  netCashFlow: '',
  closingBalance: '',

  cashFlowDetails: '',

  varianceAnalysis: '',
  keyObservations: '',
  risksIdentified: '',
  actionItems: '',

  preparedByAuthorization: '',
  treasuryReview: '',
  financeApproval: '',
  managementApproval: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00282_CashFlowReview = () => {

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
      formId="FRM-00282"
      title="Cash Flow Review – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Cash flow review submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00282"
              title="Cash Flow Review"
              department="Finance & Accounting – Treasury & Banking"
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

              {/* 2. Cash Flow Summary */}
              <div className="form-section">
                <h3 className="form-section-title">2. Cash Flow Summary</h3>
                <div className="form-fields">
                  {field(values,'openingBalance','Opening Balance','number')}
                  {field(values,'currency','Currency')}
                  {field(values,'totalInflows','Total Inflows','number')}
                  {field(values,'totalOutflows','Total Outflows','number')}
                  {field(values,'netCashFlow','Net Cash Flow','number')}
                  {field(values,'closingBalance','Closing Balance','number')}
                </div>
              </div>

              {/* 3. Cash Flow Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Cash Flow Details</h3>
                <div className="form-fields">
                  {textarea(values,'cashFlowDetails','Date / Description / Inflows / Outflows / Balance')}
                </div>
              </div>

              {/* 4. Analysis */}
              <div className="form-section">
                <h3 className="form-section-title">4. Analysis</h3>
                <div className="form-fields">
                  {textarea(values,'varianceAnalysis','Variance Analysis')}
                  {textarea(values,'keyObservations','Key Observations')}
                  {textarea(values,'risksIdentified','Risks Identified')}
                  {textarea(values,'actionItems','Action Items')}
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
                    Submit Cash Flow Review
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

export default FRM00282_CashFlowReview;
