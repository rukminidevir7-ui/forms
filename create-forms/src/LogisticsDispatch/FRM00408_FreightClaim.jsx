// FRM00408_FreightClaim.jsx
// FRM-00408 – Freight Claim – Request / Initiation Form

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
  department: Yup.string().required('Required'),
  contactNo: Yup.string().required('Required'),
  email: Yup.string().required('Required'),

  shipmentReference: Yup.string().required('Required'),
  dispatchLocation: Yup.string().required('Required'),
  deliveryLocation: Yup.string().required('Required'),
  transporterName: Yup.string().required('Required'),
  vehicleNo: Yup.string().required('Required'),
  driverName: Yup.string().required('Required'),
  driverContact: Yup.string().required('Required'),

  claimType: Yup.string().required('Required'),
  incidentDate: Yup.string().required('Required'),
  issueDescription: Yup.string().required('Required'),
  claimAmount: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),

  packagesAffected: Yup.string().required('Required'),
  estimatedLoss: Yup.string().required('Required'),
  customerImpact: Yup.string().required('Required'),
  insuranceApplicable: Yup.string().required('Required'),

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
  department: '',
  contactNo: '',
  email: '',

  shipmentReference: '',
  dispatchLocation: '',
  deliveryLocation: '',
  transporterName: '',
  vehicleNo: '',
  driverName: '',
  driverContact: '',

  claimType: '',
  incidentDate: '',
  issueDescription: '',
  claimAmount: '',
  currency: '',

  packagesAffected: '',
  estimatedLoss: '',
  customerImpact: '',
  insuranceApplicable: '',

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

const FRM00408_FreightClaim = () => {

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
      formId="FRM-00408"
      title="Freight Claim – Request / Initiation Form"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Freight Claim submitted successfully');
        }}
      >
        {({ values }) => (
          <Form>
            <ModernA4Template
              formId="FRM-00408"
              title="Freight Claim"
              department="Logistics & Dispatch – Transportation & Dispatch"
            >

              {/* 1. Request Details */}
              <div className="form-section">
                <h3 className="form-section-title">1. Request Details</h3>
                <div className="form-fields">
                  {field(values,'requestId','Request ID')}
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'requestedBy','Requested By')}
                  {field(values,'department','Department')}
                  {field(values,'contactNo','Contact No')}
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
                  {field(values,'vehicleNo','Vehicle No')}
                  {field(values,'driverName','Driver Name')}
                  {field(values,'driverContact','Driver Contact')}
                </div>
              </div>

              {/* 3. Claim Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Claim Details</h3>
                <div className="form-fields">
                  {select(values,'claimType','Claim Type',['Damage','Loss','Delay','Other'])}
                  {field(values,'incidentDate','Date of Incident','date')}
                  {textarea(values,'issueDescription','Description of Issue')}
                  {field(values,'claimAmount','Claim Amount')}
                  {field(values,'currency','Currency')}
                </div>
              </div>

              {/* 4. Supporting Information */}
              <div className="form-section">
                <h3 className="form-section-title">4. Supporting Information</h3>
                <div className="form-fields">
                  {field(values,'packagesAffected','Number of Packages Affected')}
                  {field(values,'estimatedLoss','Estimated Loss')}
                  {select(values,'customerImpact','Customer Impact',['Yes','No'])}
                  {select(values,'insuranceApplicable','Insurance Applicable',['Yes','No'])}
                </div>
              </div>

              {/* 5. Attachments */}
              <div className="form-section">
                <h3 className="form-section-title">5. Attachments</h3>
                <div className="form-fields">
                  {select(values,'photosAttached','Photos Attached',['Yes','No'])}
                  {select(values,'supportingDocsAttached','Supporting Documents Attached',['Yes','No'])}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
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
                    Submit Freight Claim
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

export default FRM00408_FreightClaim;
