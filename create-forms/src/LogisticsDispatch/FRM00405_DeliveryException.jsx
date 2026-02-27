// FRM00405_DeliveryException.jsx
// FRM-00405 – Delivery Exception – Request / Initiation Form

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

  requestId: Yup.string().required('Required'),
  requestDate: Yup.string().required('Required'),
  requestedBy: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  email: Yup.string().required('Required'),

  shipmentReference: Yup.string().required('Required'),
  dispatchLocation: Yup.string().required('Required'),
  deliveryLocation: Yup.string().required('Required'),
  transporterName: Yup.string().required('Required'),
  vehicleNumber: Yup.string().required('Required'),
  driverName: Yup.string().required('Required'),
  driverContact: Yup.string().required('Required'),

  exceptionType: Yup.string().required('Required'),
  exceptionDate: Yup.string().required('Required'),
  exceptionTime: Yup.string().required('Required'),
  issueDescription: Yup.string().required('Required'),

  packagesAffected: Yup.string().required('Required'),
  estimatedImpact: Yup.string().required('Required'),
  customerImpact: Yup.string().required('Required'),
  serviceDisruption: Yup.string().required('Required'),

  immediateAction: Yup.string(),
  correctiveAction: Yup.string(),

  photosAttached: Yup.string().required('Required'),
  supportingDocsAttached: Yup.string().required('Required'),

  preparedBy: Yup.string().required('Required'),
  preparedDate: Yup.string().required('Required'),
  reviewedBy: Yup.string(),
  reviewedDate: Yup.string(),
  approvedBy: Yup.string(),
  approvedDate: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  requestId: '',
  requestDate: '',
  requestedBy: '',
  employeeId: '',
  department: '',
  contactNumber: '',
  email: '',

  shipmentReference: '',
  dispatchLocation: '',
  deliveryLocation: '',
  transporterName: '',
  vehicleNumber: '',
  driverName: '',
  driverContact: '',

  exceptionType: '',
  exceptionDate: '',
  exceptionTime: '',
  issueDescription: '',

  packagesAffected: '',
  estimatedImpact: '',
  customerImpact: '',
  serviceDisruption: '',

  immediateAction: '',
  correctiveAction: '',

  photosAttached: '',
  supportingDocsAttached: '',

  preparedBy: '',
  preparedDate: '',
  reviewedBy: '',
  reviewedDate: '',
  approvedBy: '',
  approvedDate: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00405_DeliveryException = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type = 'text') => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || '___________________'}</div>
        : <>
            <Field name={name} type={type} className="form-input" />
            <ErrorMessage name={name} component="div" className="form-error" />
          </>
      }
    </div>
  );

  const select = (values, name, label, options) => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || '___________________'}</div>
        : <>
            <Field as="select" name={name} className="form-input">
              <option value="">-- Select --</option>
              {options.map(o => (
                <option key={o} value={o}>{o}</option>
              ))}
            </Field>
            <ErrorMessage name={name} component="div" className="form-error" />
          </>
      }
    </div>
  );

  const textarea = (values, name, label) => (
    <div className="form-field full-width">
      <label className="form-label required">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || '___________________'}</div>
        : <>
            <Field as="textarea" name={name} className="form-textarea" rows="3" />
            <ErrorMessage name={name} component="div" className="form-error" />
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper
      formId="FRM-00405"
      title="Delivery Exception – Request / Initiation Form"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Delivery Exception submitted successfully');
        }}
      >
        {({ values }) => (
          <Form>
            <ModernA4Template
              formId="FRM-00405"
              title="Delivery Exception"
              department="Logistics & Dispatch – Transportation & Dispatch"
            >

              {/* 1. Request Details */}
              <div className="form-section">
                <h3 className="form-section-title">1. Request Details</h3>
                <div className="form-fields">
                  {field(values,'requestId','Request ID')}
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'requestedBy','Requested By')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'department','Department')}
                  {field(values,'contactNumber','Contact Number')}
                  {field(values,'email','Email')}
                </div>
              </div>

              {/* 2. Shipment Information */}
              <div className="form-section">
                <h3 className="form-section-title">2. Shipment Information</h3>
                <div className="form-fields">
                  {field(values,'shipmentReference','Shipment Reference No')}
                  {field(values,'dispatchLocation','Dispatch Location')}
                  {field(values,'deliveryLocation','Delivery Location')}
                  {field(values,'transporterName','Transporter Name')}
                  {field(values,'vehicleNumber','Vehicle Number')}
                  {field(values,'driverName','Driver Name')}
                  {field(values,'driverContact','Driver Contact')}
                </div>
              </div>

              {/* 3. Exception Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Exception Details</h3>
                <div className="form-fields">
                  {field(values,'exceptionType','Exception Type')}
                  {field(values,'exceptionDate','Date of Exception','date')}
                  {field(values,'exceptionTime','Time of Exception','time')}
                  {textarea(values,'issueDescription','Description of Issue')}
                </div>
              </div>

              {/* 4. Impact Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">4. Impact Assessment</h3>
                <div className="form-fields">
                  {field(values,'packagesAffected','Number of Packages Affected')}
                  {field(values,'estimatedImpact','Estimated Loss / Impact')}
                  {select(values,'customerImpact','Customer Impact',['Yes','No'])}
                  {select(values,'serviceDisruption','Service Disruption',['Yes','No'])}
                </div>
              </div>

              {/* 5. Immediate Action Taken */}
              <div className="form-section">
                <h3 className="form-section-title">5. Immediate Action Taken</h3>
                <div className="form-fields">
                  {textarea(values,'immediateAction','Immediate Action Taken')}
                </div>
              </div>

              {/* 6. Corrective / Preventive Action */}
              <div className="form-section">
                <h3 className="form-section-title">6. Corrective / Preventive Action</h3>
                <div className="form-fields">
                  {textarea(values,'correctiveAction','Corrective / Preventive Action')}
                </div>
              </div>

              {/* 7. Attachments */}
              <div className="form-section">
                <h3 className="form-section-title">7. Attachments</h3>
                <div className="form-fields">
                  {select(values,'photosAttached','Photos Attached',['Yes','No'])}
                  {select(values,'supportingDocsAttached','Supporting Documents Attached',['Yes','No'])}
                </div>
              </div>

              {/* 8. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">8. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'preparedDate','Prepared Date','date')}
                  {field(values,'reviewedBy','Reviewed By')}
                  {field(values,'reviewedDate','Reviewed Date','date')}
                  {field(values,'approvedBy','Approved By')}
                  {field(values,'approvedDate','Approved Date','date')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Delivery Exception
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

export default FRM00405_DeliveryException;
