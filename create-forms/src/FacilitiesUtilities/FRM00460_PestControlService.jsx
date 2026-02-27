// FRM00460_PestControlServiceRequest.jsx
// FRM-00460 – Pest Control Service – Request / Initiation Form

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

  requestorName: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  facilityLocation: Yup.string().required('Required'),
  areaZone: Yup.string().required('Required'),
  serviceType: Yup.string().required('Required'),
  preferredDate: Yup.string().required('Required'),
  priority: Yup.string().required('Required'),
  issueDetails: Yup.string().required('Required'),

  serviceVendor: Yup.string(),
  treatmentType: Yup.string(),
  chemicalsUsed: Yup.string(),
  serviceDate: Yup.string(),

  attachments: Yup.array(),
  signatures: Yup.array(),
  customFields: Yup.array()

});

const initialValues = {

  requestorName: '',
  department: '',
  contactNumber: '',
  facilityLocation: '',
  areaZone: '',
  serviceType: '',
  preferredDate: '',
  priority: '',
  issueDetails: '',

  serviceVendor: '',
  treatmentType: '',
  chemicalsUsed: '',
  serviceDate: '',

  attachments: [],
  signatures: [],
  customFields: []

};

const FRM00460_PestControlServiceRequest = () => {

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
        <div className="print-value">{values[name] || '_________'}</div>
      ) : (
        <>
          <Field as="select" name={name} className="form-input">
            <option value="">-- Select --</option>
            {options.map(o => (
              <option key={o} value={o}>{o}</option>
            ))}
          </Field>
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (

    <ModernFormWrapper
      formId="FRM-00460"
      title="Pest Control Service – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Pest control service request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00460"
              title="Pest Control Service"
              department="Facilities & Utilities – Facilities Management"
            >

              {/* 1. Requestor Details */}
              <div className="form-section">
                <h3 className="form-section-title">1. Requestor Details</h3>
                <div className="form-fields">
                  {field(values,'requestorName','Requestor Name')}
                  {field(values,'department','Department')}
                  {field(values,'contactNumber','Contact Number')}
                </div>
              </div>

              {/* 2. Service Request Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Service Request Details</h3>
                <div className="form-fields">
                  {field(values,'facilityLocation','Facility / Location')}
                  {field(values,'areaZone','Area / Zone')}
                  {field(values,'serviceType','Service Type')}
                  {field(values,'preferredDate','Preferred Date','date')}
                  {select(values,'priority','Priority',['Low','Medium','High'])}
                </div>
              </div>

              {/* 3. Issue / Observation */}
              <div className="form-section">
                <h3 className="form-section-title">3. Issue / Observation Details</h3>
                <div className="form-fields">
                  {textarea(values,'issueDetails','Issue / Observation Details')}
                </div>
              </div>

              {/* 4. Service Execution Details */}
              <div className="form-section">
                <h3 className="form-section-title">4. Service Execution Details</h3>
                <div className="form-fields">
                  {field(values,'serviceVendor','Service Vendor')}
                  {field(values,'treatmentType','Treatment Type')}
                  {field(values,'chemicalsUsed','Chemicals Used')}
                  {field(values,'serviceDate','Service Date','date')}
                </div>
              </div>

              {/* 5. Attachments */}
              <div className="form-section">
                <h3 className="form-section-title">Attachments</h3>
                <div className="form-fields full-width">
                  {isPrintMode ? (
                    <div className="print-value">
                      {values.attachments?.length > 0
                        ? 'Documents Attached'
                        : '___________________'}
                    </div>
                  ) : (
                    <FormAttachments values={values} />
                  )}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '20px'
                }}>

                  <div>
                    <label className="form-label required">Prepared By</label>
                    <FormSignatures
                      values={values}
                      setFieldValue={setFieldValue}
                      role="Prepared By"
                    />
                  </div>

                  <div>
                    <label className="form-label required">Reviewed By</label>
                    <FormSignatures
                      values={values}
                      setFieldValue={setFieldValue}
                      role="Reviewed By"
                    />
                  </div>

                  <div>
                    <label className="form-label required">Approved By</label>
                    <FormSignatures
                      values={values}
                      setFieldValue={setFieldValue}
                      role="Approved By"
                    />
                  </div>

                </div>
              </div>

              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Pest Control Request
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

export default FRM00460_PestControlServiceRequest;
