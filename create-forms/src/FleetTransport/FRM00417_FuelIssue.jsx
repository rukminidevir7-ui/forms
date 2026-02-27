// FRM00417_FuelIssue.jsx
// FRM-00417 – Fuel Issue – Request / Initiation Form

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

  // 1. Request Details
  requestId: Yup.string().required('Required'),
  requestDate: Yup.string().required('Required'),
  requestedBy: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),

  // 2. Vehicle Information
  vehicleNumber: Yup.string().required('Required'),
  vehicleType: Yup.string().required('Required'),
  driverName: Yup.string().required('Required'),
  driverContact: Yup.string().required('Required'),
  odometerReading: Yup.number().typeError('Must be a number').required('Required'),

  // 3. Fuel Details
  fuelType: Yup.string().required('Required'),
  quantityRequested: Yup.number().typeError('Must be a number').required('Required'),
  quantityIssued: Yup.number().typeError('Must be a number').required('Required'),
  fuelStation: Yup.string().required('Required'),
  issueDate: Yup.string().required('Required'),
  issueTime: Yup.string().required('Required'),

  // 4. Cost Information
  costPerUnit: Yup.number().typeError('Must be a number').required('Required'),
  totalCost: Yup.number().typeError('Must be a number').required('Required'),
  costCenter: Yup.string().required('Required'),
  paymentMethod: Yup.string().required('Required'),

  // 5. Remarks
  remarks: Yup.string().required('Required'),

  // 6. Attachments
  fuelReceiptAttached: Yup.string().required('Required'),
  supportingDocumentsAttached: Yup.string().required('Required'),

  // 7. Authorization
  preparedBy: Yup.string().required('Required'),
  reviewedBy: Yup.string().required('Required'),
  approvedBy: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  requestId: '',
  requestDate: '',
  requestedBy: '',
  department: '',
  contactNumber: '',
  email: '',

  vehicleNumber: '',
  vehicleType: '',
  driverName: '',
  driverContact: '',
  odometerReading: '',

  fuelType: '',
  quantityRequested: '',
  quantityIssued: '',
  fuelStation: '',
  issueDate: '',
  issueTime: '',

  costPerUnit: '',
  totalCost: '',
  costCenter: '',
  paymentMethod: '',

  remarks: '',

  fuelReceiptAttached: '',
  supportingDocumentsAttached: '',

  preparedBy: '',
  reviewedBy: '',
  approvedBy: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00417_FuelIssue = () => {

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
      formId="FRM-00417"
      title="Fuel Issue – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Fuel issue request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00417"
              title="Fuel Issue"
              department="Fleet & Transport – Fleet Operations"
            >

              {/* 1. Request Details */}
              <div className="form-section">
                <h3 className="form-section-title">1. Request Details</h3>
                <div className="form-fields">
                  {field(values,'requestId','Request ID')}
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'requestedBy','Requested By')}
                  {field(values,'department','Department')}
                  {field(values,'contactNumber','Contact No')}
                  {field(values,'email','Email','email')}
                </div>
              </div>

              {/* 2. Vehicle Information */}
              <div className="form-section">
                <h3 className="form-section-title">2. Vehicle Information</h3>
                <div className="form-fields">
                  {field(values,'vehicleNumber','Vehicle No')}
                  {field(values,'vehicleType','Vehicle Type')}
                  {field(values,'driverName','Driver Name')}
                  {field(values,'driverContact','Driver Contact')}
                  {field(values,'odometerReading','Odometer Reading','number')}
                </div>
              </div>

              {/* 3. Fuel Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Fuel Details</h3>
                <div className="form-fields">
                  {select(values,'fuelType','Fuel Type',['Petrol','Diesel','CNG','Electric','Other'])}
                  {field(values,'quantityRequested','Quantity Requested (Liters)','number')}
                  {field(values,'quantityIssued','Quantity Issued (Liters)','number')}
                  {field(values,'fuelStation','Fuel Station / Source')}
                  {field(values,'issueDate','Issue Date','date')}
                  {field(values,'issueTime','Issue Time','time')}
                </div>
              </div>

              {/* 4. Cost Information */}
              <div className="form-section">
                <h3 className="form-section-title">4. Cost Information</h3>
                <div className="form-fields">
                  {field(values,'costPerUnit','Cost per Unit','number')}
                  {field(values,'totalCost','Total Cost','number')}
                  {field(values,'costCenter','Cost Center')}
                  {select(values,'paymentMethod','Payment Method',['Fuel Card','Cash','Credit','Corporate Account','Other'])}
                </div>
              </div>

              {/* 5. Remarks */}
              <div className="form-section">
                <h3 className="form-section-title">5. Remarks</h3>
                <div className="form-fields">
                  {textarea(values,'remarks','Remarks / Notes')}
                </div>
              </div>

              {/* 6. Attachments */}
              <div className="form-section">
                <h3 className="form-section-title">6. Attachments</h3>
                <div className="form-fields">
                  {select(values,'fuelReceiptAttached','Fuel Receipt Attached',['Yes','No'])}
                  {select(values,'supportingDocumentsAttached','Supporting Documents Attached',['Yes','No'])}
                </div>
              </div>

              {/* 7. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">7. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedBy','Prepared By (Name/Signature/Date)')}
                  {field(values,'reviewedBy','Reviewed By (Name/Signature/Date)')}
                  {field(values,'approvedBy','Approved By (Name/Signature/Date)')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Fuel Issue
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

export default FRM00417_FuelIssue;
