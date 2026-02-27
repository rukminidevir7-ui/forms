// FRM00436_PUCRenewal.jsx
// FRM-00436 – PUC Renewal – Request / Initiation Form

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

  // Request Details
  requestDate: Yup.string().required('Required'),
  requestedBy: Yup.string().required('Required'),

  // Vehicle Details
  vehicleNumber: Yup.string().required('Required'),
  vehicleType: Yup.string().required('Required'),

  // PUC Details
  currentPucExpiryDate: Yup.string().required('Required'),
  testingCenterName: Yup.string().required('Required'),
  emissionLevel: Yup.string().required('Required'),
  renewalDueDate: Yup.string().required('Required'),
  remarks: Yup.string().required('Required'),

  // Authorization
  preparedBy: Yup.string().required('Required'),
  reviewedBy: Yup.string().required('Required'),
  approvedBy: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  requestDate: '',
  requestedBy: '',

  vehicleNumber: '',
  vehicleType: '',

  currentPucExpiryDate: '',
  testingCenterName: '',
  emissionLevel: '',
  renewalDueDate: '',
  remarks: '',

  preparedBy: '',
  reviewedBy: '',
  approvedBy: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00436_PUCRenewal = () => {

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

  return (

    <ModernFormWrapper
      formId="FRM-00436"
      title="PUC Renewal – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('PUC renewal request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00436"
              title="PUC Renewal"
              department="Fleet & Transport – Compliance & Permits"
            >

              {/* Request Details */}
              <div className="form-section">
                <h3 className="form-section-title">1. Request Details</h3>
                <div className="form-fields">
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'requestedBy','Requested By')}
                </div>
              </div>

              {/* Vehicle Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Vehicle Details</h3>
                <div className="form-fields">
                  {field(values,'vehicleNumber','Vehicle Number')}
                  {field(values,'vehicleType','Vehicle Type')}
                </div>
              </div>

              {/* PUC Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. PUC Details</h3>
                <div className="form-fields">
                  {field(values,'currentPucExpiryDate','Current PUC Expiry Date','date')}
                  {field(values,'testingCenterName','Testing Center Name')}
                  {field(values,'emissionLevel','Emission Level')}
                  {field(values,'renewalDueDate','Renewal Due Date','date')}
                  {textarea(values,'remarks','Remarks')}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">4. Authorization</h3>
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
                    Submit PUC Renewal
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

export default FRM00436_PUCRenewal;
