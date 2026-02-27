// FRM00439_FitnessCertificate.jsx
// FRM-00439 – Fitness Certificate Renewal – Report / Record Form

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

  // Document Information
  formNumber: Yup.string().required('Required'),
  requestDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  requestedBy: Yup.string().required('Required'),

  // Vehicle & Certificate Details
  vehicleNumber: Yup.string().required('Required'),
  certificateExpiryDate: Yup.string().required('Required'),
  proposedRenewalDate: Yup.string().required('Required'),
  detailsJustification: Yup.string().required('Required'),

  // Authorization
  preparedBy: Yup.string().required('Required'),
  reviewedBy: Yup.string().required('Required'),
  approvedBy: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  formNumber: '',
  requestDate: '',
  department: '',
  requestedBy: '',

  vehicleNumber: '',
  certificateExpiryDate: '',
  proposedRenewalDate: '',
  detailsJustification: '',

  preparedBy: '',
  reviewedBy: '',
  approvedBy: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00439_FitnessCertificate = () => {

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
      formId="FRM-00439"
      title="Fitness Certificate Renewal – Report / Record"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Fitness certificate renewal record submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00439"
              title="Fitness Certificate Renewal"
              department="Fleet & Transport – Compliance & Permits"
            >

              {/* Document Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Document Information</h3>
                <div className="form-fields">
                  {field(values,'formNumber','Form Number')}
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'requestedBy','Requested By')}
                </div>
              </div>

              {/* Vehicle & Certificate Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Vehicle & Certificate Details</h3>
                <div className="form-fields">
                  {field(values,'vehicleNumber','Vehicle Number')}
                  {field(values,'certificateExpiryDate','Certificate Expiry Date','date')}
                  {field(values,'proposedRenewalDate','Proposed Renewal Date','date')}
                  {textarea(values,'detailsJustification','Details / Justification')}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">3. Authorization</h3>
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
                    Submit Record
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

export default FRM00439_FitnessCertificate;
