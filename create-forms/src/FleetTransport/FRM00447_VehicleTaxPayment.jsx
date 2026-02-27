// FRM00447_VehicleTaxPayment.jsx
// FRM-00447 – Vehicle Tax Payment – Request / Initiation Form

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
  vehicleType: Yup.string().required('Required'),
  departmentLocation: Yup.string().required('Required'),
  ownerName: Yup.string().required('Required'),

  taxPeriodFrom: Yup.string().required('Required'),
  taxPeriodTo: Yup.string().required('Required'),

  amount: Yup.number().typeError('Must be a number').required('Required'),
  paymentMode: Yup.string().required('Required'),
  transactionReference: Yup.string().required('Required'),
  paymentDate: Yup.string().required('Required'),

  remarks: Yup.string().required('Required'),

  preparedBy: Yup.string().required('Required'),
  reviewedBy: Yup.string().required('Required'),
  approvedBy: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  vehicleNumber: '',
  vehicleType: '',
  departmentLocation: '',
  ownerName: '',

  taxPeriodFrom: '',
  taxPeriodTo: '',

  amount: '',
  paymentMode: '',
  transactionReference: '',
  paymentDate: '',

  remarks: '',

  preparedBy: '',
  reviewedBy: '',
  approvedBy: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00447_VehicleTaxPayment = () => {

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

  const select = (values, name, label, options) => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '_________'}</div>
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
      formId="FRM-00447"
      title="Vehicle Tax Payment – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Vehicle tax payment submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00447"
              title="Vehicle Tax Payment"
              department="Fleet & Transport – Compliance & Permits"
            >

              {/* Vehicle Details */}
              <div className="form-section">
                <h3 className="form-section-title">1. Vehicle Details</h3>
                <div className="form-fields">
                  {field(values,'vehicleNumber','Vehicle Number')}
                  {field(values,'vehicleType','Vehicle Type')}
                  {field(values,'departmentLocation','Department / Location')}
                  {field(values,'ownerName','Owner Name')}
                </div>
              </div>

              {/* Tax Period */}
              <div className="form-section">
                <h3 className="form-section-title">2. Tax Period</h3>
                <div className="form-fields">
                  {field(values,'taxPeriodFrom','Tax Period From','date')}
                  {field(values,'taxPeriodTo','Tax Period To','date')}
                </div>
              </div>

              {/* Payment Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Payment Details</h3>
                <div className="form-fields">
                  {field(values,'amount','Amount','number')}
                  {select(values,'paymentMode','Payment Mode',[
                    'Online Transfer',
                    'Cheque',
                    'Cash',
                    'UPI',
                    'Other'
                  ])}
                  {field(values,'transactionReference','Transaction Reference')}
                  {field(values,'paymentDate','Payment Date','date')}
                </div>
              </div>

              {/* Remarks */}
              <div className="form-section">
                <h3 className="form-section-title">4. Remarks</h3>
                <div className="form-fields">
                  {textarea(values,'remarks','Remarks')}
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
                    Submit Tax Payment
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

export default FRM00447_VehicleTaxPayment;
