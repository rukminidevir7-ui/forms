// FRM00450_FastagReconciliation.jsx
// FRM-00450 – Toll / FASTag Reconciliation – Request / Initiation Form

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

  vehicleNumber: Yup.string().required('Required'),
  fastagAccountId: Yup.string().required('Required'),
  departmentLocation: Yup.string().required('Required'),

  reconciliationFrom: Yup.string().required('Required'),
  reconciliationTo: Yup.string().required('Required'),

  openingBalance: Yup.number().typeError('Must be a number').required('Required'),
  totalTollCharges: Yup.number().typeError('Must be a number').required('Required'),
  rechargeAmount: Yup.number().typeError('Must be a number').required('Required'),
  adjustments: Yup.number().typeError('Must be a number').required('Required'),
  closingBalance: Yup.number().typeError('Must be a number').required('Required'),

  exceptions: Yup.string().required('Required'),

  preparedBy: Yup.string().required('Required'),
  reviewedBy: Yup.string().required('Required'),
  approvedBy: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  vehicleNumber: '',
  fastagAccountId: '',
  departmentLocation: '',

  reconciliationFrom: '',
  reconciliationTo: '',

  openingBalance: '',
  totalTollCharges: '',
  rechargeAmount: '',
  adjustments: '',
  closingBalance: '',

  exceptions: '',

  preparedBy: '',
  reviewedBy: '',
  approvedBy: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00450_FastagReconciliation = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type = 'text') => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '_________'}</div>
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
        <div className="print-value">{values[name] || '_________'}</div>
      ) : (
        <>
          <Field as="textarea" name={name} className="form-textarea" rows="3" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (

    <ModernFormWrapper
      formId="FRM-00450"
      title="Toll / FASTag Reconciliation – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('FASTag reconciliation submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00450"
              title="Toll / FASTag Reconciliation"
              department="Fleet & Transport – Compliance & Permits"
            >

              {/* Vehicle & Account */}
              <div className="form-section">
                <h3 className="form-section-title">1. Vehicle & Account Details</h3>
                <div className="form-fields">
                  {field(values,'vehicleNumber','Vehicle Number')}
                  {field(values,'fastagAccountId','FASTag Account ID')}
                  {field(values,'departmentLocation','Department / Location')}
                </div>
              </div>

              {/* Reconciliation Period */}
              <div className="form-section">
                <h3 className="form-section-title">2. Reconciliation Period</h3>
                <div className="form-fields">
                  {field(values,'reconciliationFrom','Reconciliation Period From','date')}
                  {field(values,'reconciliationTo','Reconciliation Period To','date')}
                </div>
              </div>

              {/* Transaction Summary */}
              <div className="form-section">
                <h3 className="form-section-title">3. Transaction Summary</h3>
                <div className="form-fields">
                  {field(values,'openingBalance','Opening Balance','number')}
                  {field(values,'totalTollCharges','Total Toll Charges','number')}
                  {field(values,'rechargeAmount','Recharge Amount','number')}
                  {field(values,'adjustments','Adjustments','number')}
                  {field(values,'closingBalance','Closing Balance','number')}
                </div>
              </div>

              {/* Exceptions */}
              <div className="form-section">
                <h3 className="form-section-title">4. Exceptions / Variances</h3>
                <div className="form-fields">
                  {textarea(values,'exceptions','Exceptions / Variances')}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'reviewedBy','Reviewed By')}
                  {field(values,'approvedBy','Approved By')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Reconciliation
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

export default FRM00450_FastagReconciliation;
