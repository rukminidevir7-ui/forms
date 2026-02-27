// FRM00453_OverloadingViolation.jsx
// FRM-00453 – Overloading Violation – Request / Initiation Form

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
  driverName: Yup.string().required('Required'),
  departmentLocation: Yup.string().required('Required'),

  incidentDate: Yup.string().required('Required'),
  incidentLocation: Yup.string().required('Required'),
  violationDetails: Yup.string().required('Required'),

  immediateAction: Yup.string().required('Required'),

  penaltyAmount: Yup.number().typeError('Must be a number').required('Required'),
  issuingAuthority: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  resolutionDate: Yup.string().required('Required'),

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
  driverName: '',
  departmentLocation: '',

  incidentDate: '',
  incidentLocation: '',
  violationDetails: '',

  immediateAction: '',

  penaltyAmount: '',
  issuingAuthority: '',
  referenceNumber: '',
  resolutionDate: '',

  preparedBy: '',
  reviewedBy: '',
  approvedBy: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00453_OverloadingViolation = () => {

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
      formId="FRM-00453"
      title="Overloading Violation – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Overloading violation submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00453"
              title="Overloading Violation"
              department="Fleet & Transport – Compliance & Permits"
            >

              {/* Vehicle & Driver Details */}
              <div className="form-section">
                <h3 className="form-section-title">1. Vehicle & Driver Details</h3>
                <div className="form-fields">
                  {field(values,'vehicleNumber','Vehicle Number')}
                  {field(values,'vehicleType','Vehicle Type')}
                  {field(values,'driverName','Driver Name')}
                  {field(values,'departmentLocation','Department / Location')}
                </div>
              </div>

              {/* Incident Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Incident Details</h3>
                <div className="form-fields">
                  {field(values,'incidentDate','Date of Incident','date')}
                  {field(values,'incidentLocation','Location of Incident')}
                  {textarea(values,'violationDetails','Violation Details')}
                </div>
              </div>

              {/* Immediate Action */}
              <div className="form-section">
                <h3 className="form-section-title">3. Immediate Action Taken</h3>
                <div className="form-fields">
                  {textarea(values,'immediateAction','Immediate Action Taken')}
                </div>
              </div>

              {/* Penalty & Resolution */}
              <div className="form-section">
                <h3 className="form-section-title">4. Penalty & Resolution</h3>
                <div className="form-fields">
                  {field(values,'penaltyAmount','Penalty Amount','number')}
                  {field(values,'issuingAuthority','Authority / Issuer')}
                  {field(values,'referenceNumber','Reference Number')}
                  {field(values,'resolutionDate','Resolution Date','date')}
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
                    Submit Violation Report
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

export default FRM00453_OverloadingViolation;
