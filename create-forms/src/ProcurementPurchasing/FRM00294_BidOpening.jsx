// FRM00294_BidOpening.jsx
// FRM-00294 – Bid Opening – Request / Initiation Form

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
  openingDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  openingTime: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  rfqReference: Yup.string().required('Required'),
  procurementCategory: Yup.string().required('Required'),
  location: Yup.string().required('Required'),

  // 2. Bid Opening Committee
  committeeChair: Yup.string().required('Required'),
  chairDesignation: Yup.string().required('Required'),
  memberOne: Yup.string().required('Required'),
  memberOneDesignation: Yup.string().required('Required'),
  memberTwo: Yup.string().required('Required'),
  memberTwoDesignation: Yup.string().required('Required'),
  observerName: Yup.string(),
  observerDesignation: Yup.string(),

  // 3. Bid Receipt Summary
  totalBidsReceived: Yup.number().typeError('Must be a number').required('Required'),
  lateSubmissions: Yup.number().typeError('Must be a number').required('Required'),
  bidsOpened: Yup.number().typeError('Must be a number').required('Required'),
  bidsRejected: Yup.number().typeError('Must be a number').required('Required'),

  // 4. Bid Details
  vendorName: Yup.string().required('Required'),
  bidReference: Yup.string().required('Required'),
  bidAmount: Yup.number().typeError('Must be a number').required('Required'),
  currency: Yup.string().required('Required'),
  bidRemarks: Yup.string().required('Required'),

  // 5. Observations
  openingObservations: Yup.string().required('Required'),
  issuesNoted: Yup.string().required('Required'),

  // 6. Authorization
  chairSignature: Yup.string().required('Required'),
  memberSignatures: Yup.string().required('Required'),
  procurementConfirmation: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  // 7. Supporting Information
  supportingDocuments: Yup.string(),
  additionalNotes: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  openingDate: '',
  department: '',
  openingTime: '',
  referenceNumber: '',
  rfqReference: '',
  procurementCategory: '',
  location: '',

  committeeChair: '',
  chairDesignation: '',
  memberOne: '',
  memberOneDesignation: '',
  memberTwo: '',
  memberTwoDesignation: '',
  observerName: '',
  observerDesignation: '',

  totalBidsReceived: '',
  lateSubmissions: '',
  bidsOpened: '',
  bidsRejected: '',

  vendorName: '',
  bidReference: '',
  bidAmount: '',
  currency: '',
  bidRemarks: '',

  openingObservations: '',
  issuesNoted: '',

  chairSignature: '',
  memberSignatures: '',
  procurementConfirmation: '',
  approvalComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00294_BidOpening = () => {

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

  const select = (values, name, label, options) => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '___________________'}</div>
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
      formId="FRM-00294"
      title="Bid Opening – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Bid opening record submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00294"
              title="Bid Opening"
              department="Procurement & Purchasing – Requisitions & Sourcing"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'openingDate','Opening Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'openingTime','Opening Time','time')}
                  {field(values,'referenceNumber','Reference Number')}
                  {field(values,'rfqReference','RFQ/RFP Reference')}
                  {field(values,'procurementCategory','Procurement Category')}
                  {field(values,'location','Location')}
                </div>
              </div>

              {/* 2. Bid Opening Committee */}
              <div className="form-section">
                <h3 className="form-section-title">2. Bid Opening Committee</h3>
                <div className="form-fields">
                  {field(values,'committeeChair','Committee Chair')}
                  {field(values,'chairDesignation','Designation')}
                  {field(values,'memberOne','Member 1')}
                  {field(values,'memberOneDesignation','Designation')}
                  {field(values,'memberTwo','Member 2')}
                  {field(values,'memberTwoDesignation','Designation')}
                  {field(values,'observerName','Observer (if any)')}
                  {field(values,'observerDesignation','Designation')}
                </div>
              </div>

              {/* 3. Bid Receipt Summary */}
              <div className="form-section">
                <h3 className="form-section-title">3. Bid Receipt Summary</h3>
                <div className="form-fields">
                  {field(values,'totalBidsReceived','Total Bids Received','number')}
                  {field(values,'lateSubmissions','Late Submissions','number')}
                  {field(values,'bidsOpened','Bids Opened','number')}
                  {field(values,'bidsRejected','Bids Rejected','number')}
                </div>
              </div>

              {/* 4. Bid Details */}
              <div className="form-section">
                <h3 className="form-section-title">4. Bid Details</h3>
                <div className="form-fields">
                  {field(values,'vendorName','Vendor Name')}
                  {field(values,'bidReference','Bid Reference')}
                  {field(values,'bidAmount','Amount','number')}
                  {field(values,'currency','Currency')}
                  {textarea(values,'bidRemarks','Remarks')}
                </div>
              </div>

              {/* 5. Observations */}
              <div className="form-section">
                <h3 className="form-section-title">5. Observations</h3>
                <div className="form-fields">
                  {textarea(values,'openingObservations','Opening Observations')}
                  {textarea(values,'issuesNoted','Issues / Deviations Noted')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'chairSignature','Committee Chair Signature')}
                  {field(values,'memberSignatures','Member Signatures')}
                  {field(values,'procurementConfirmation','Procurement Confirmation')}
                  {textarea(values,'approvalComments','Comments')}
                </div>
              </div>

              {/* 7. Supporting Information */}
              <div className="form-section">
                <h3 className="form-section-title">7. Supporting Information</h3>
                <div className="form-fields">
                  {textarea(values,'supportingDocuments','Supporting Documents')}
                  {textarea(values,'additionalNotes','Additional Notes')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Bid Opening Record
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

export default FRM00294_BidOpening;
