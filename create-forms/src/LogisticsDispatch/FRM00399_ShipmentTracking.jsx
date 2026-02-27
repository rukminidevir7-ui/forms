// FRM00399_ShipmentTracking.jsx
// FRM-00399 – Shipment Tracking – Request / Initiation Form

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

  trackingDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  requestedBy: Yup.string().required('Required'),
  contactDetails: Yup.string().required('Required'),
  referenceNo: Yup.string().required('Required'),

  shipmentId: Yup.string().required('Required'),
  orderInvoiceNo: Yup.string().required('Required'),
  origin: Yup.string().required('Required'),
  destination: Yup.string().required('Required'),
  transportMode: Yup.string().required('Required'),
  carrier: Yup.string().required('Required'),
  dispatchDate: Yup.string().required('Required'),
  expectedDeliveryDate: Yup.string().required('Required'),

  currentStatus: Yup.string().required('Required'),
  lastKnownLocation: Yup.string().required('Required'),
  trackingRemarks: Yup.string(),

  transportDocument: Yup.string(),
  proofOfDispatch: Yup.string(),
  otherAttachments: Yup.string(),

  preparedBy: Yup.string().required('Required'),
  reviewedBy: Yup.string(),
  approvedBy: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  trackingDate: '',
  department: '',
  requestedBy: '',
  contactDetails: '',
  referenceNo: '',

  shipmentId: '',
  orderInvoiceNo: '',
  origin: '',
  destination: '',
  transportMode: '',
  carrier: '',
  dispatchDate: '',
  expectedDeliveryDate: '',

  currentStatus: '',
  lastKnownLocation: '',
  trackingRemarks: '',

  transportDocument: '',
  proofOfDispatch: '',
  otherAttachments: '',

  preparedBy: '',
  reviewedBy: '',
  approvedBy: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00399_ShipmentTracking = () => {

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

  const textarea = (values, name, label) => (
    <div className="form-field full-width">
      <label className="form-label">{label}</label>
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
      formId="FRM-00399"
      title="Shipment Tracking – Request / Initiation Form"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Shipment Tracking submitted successfully');
        }}
      >
        {({ values }) => (
          <Form>
            <ModernA4Template
              formId="FRM-00399"
              title="Shipment Tracking"
              department="Logistics & Dispatch – Transportation & Dispatch"
            >

              {/* Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">Basic Information</h3>
                <div className="form-fields">
                  {field(values,'trackingDate','Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'requestedBy','Requested By')}
                  {field(values,'contactDetails','Contact Details')}
                  {field(values,'referenceNo','Reference No.')}
                </div>
              </div>

              {/* Shipment Details */}
              <div className="form-section">
                <h3 className="form-section-title">Shipment Details</h3>
                <div className="form-fields">
                  {field(values,'shipmentId','Shipment ID')}
                  {field(values,'orderInvoiceNo','Order / Invoice No.')}
                  {field(values,'origin','Origin')}
                  {field(values,'destination','Destination')}
                  {field(values,'transportMode','Transport Mode')}
                  {field(values,'carrier','Carrier / Transporter')}
                  {field(values,'dispatchDate','Dispatch Date','date')}
                  {field(values,'expectedDeliveryDate','Expected Delivery Date','date')}
                </div>
              </div>

              {/* Tracking Updates */}
              <div className="form-section">
                <h3 className="form-section-title">Tracking Updates</h3>
                <div className="form-fields">
                  {field(values,'currentStatus','Current Status')}
                  {field(values,'lastKnownLocation','Last Known Location')}
                  {textarea(values,'trackingRemarks','Remarks / Notes')}
                </div>
              </div>

              {/* Attachments / Supporting Documents */}
              <div className="form-section">
                <h3 className="form-section-title">Attachments / Supporting Documents</h3>
                <div className="form-fields">
                  {field(values,'transportDocument','Transport Document')}
                  {field(values,'proofOfDispatch','Proof of Dispatch')}
                  {field(values,'otherAttachments','Other Attachments')}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'reviewedBy','Reviewed By')}
                  {field(values,'approvedBy','Approved By')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Shipment Tracking
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

export default FRM00399_ShipmentTracking;
