// FRM00244_ARReconciliation.jsx
// FRM-00244 – AR Reconciliation – Request / Initiation Form

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
  reconciliationPeriod: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),

  // 2. Account Summary
  openingBalance: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),
  totalInvoices: Yup.string().required('Required'),
  totalReceipts: Yup.string().required('Required'),
  adjustments: Yup.string().required('Required'),
  closingBalance: Yup.string().required('Required'),

  // 3. Reconciliation Items
  reconciliationItems: Yup.string().required('Required'),

  // 4. Variance Analysis
  varianceIdentified: Yup.string().required('Required'),
  varianceReason: Yup.string().required('Required'),
  resolutionRequired: Yup.string().required('Required'),

  // 5. Action Plan
  correctiveActions: Yup.string().required('Required'),
  responsiblePerson: Yup.string().required('Required'),
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
  date: '',
  department: '',
  preparedBy: '',
  reconciliationPeriod: '',
  referenceNumber: '',

  openingBalance: '',
  currency: '',
  totalInvoices: '',
  totalReceipts: '',
  adjustments: '',
  closingBalance: '',

  reconciliationItems: '',

  varianceIdentified: '',
  varianceReason: '',
  resolutionRequired: '',

  correctiveActions: '',
  responsiblePerson: '',
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

const FRM00244_ARReconciliation = () => {

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
      formId="FRM-00244"
      title="AR Reconciliation – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('AR reconciliation submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00244"
              title="AR Reconciliation"
              department="Finance & Accounting – Accounts Receivable"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'date','Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'reconciliationPeriod','Reconciliation Period')}
                  {field(values,'referenceNumber','Reference Number')}
                </div>
              </div>

              {/* 2. Account Summary */}
              <div className="form-section">
                <h3 className="form-section-title">2. Account Summary</h3>
                <div className="form-fields">
                  {field(values,'openingBalance','Opening Balance','number')}
                  {field(values,'currency','Currency')}
                  {field(values,'totalInvoices','Total Invoices','number')}
                  {field(values,'totalReceipts','Total Receipts','number')}
                  {field(values,'adjustments','Adjustments','number')}
                  {field(values,'closingBalance','Closing Balance','number')}
                </div>
              </div>

              {/* 3. Reconciliation Items */}
              <div className="form-section">
                <h3 className="form-section-title">3. Reconciliation Items</h3>
                <div className="form-fields">
                  {textarea(values,'reconciliationItems','Description / Amount / Type / Remarks')}
                </div>
              </div>

              {/* 4. Variance Analysis */}
              <div className="form-section">
                <h3 className="form-section-title">4. Variance Analysis</h3>
                <div className="form-fields">
                  {textarea(values,'varianceIdentified','Variance Identified')}
                  {textarea(values,'varianceReason','Reason for Variance')}
                  {textarea(values,'resolutionRequired','Resolution Required')}
                </div>
              </div>

              {/* 5. Action Plan */}
              <div className="form-section">
                <h3 className="form-section-title">5. Action Plan</h3>
                <div className="form-fields">
                  {textarea(values,'correctiveActions','Corrective Actions')}
                  {field(values,'responsiblePerson','Responsible Person')}
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
                    Submit AR Reconciliation
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

export default FRM00244_ARReconciliation;
