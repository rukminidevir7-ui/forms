// FRM00411_DispatchRegisterUpdate.jsx
// FRM-00411 – Dispatch Register Update – Log / Register Form

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

  entryId: Yup.string().required('Required'),
  entryDate: Yup.string().required('Required'),
  updatedBy: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  contactNo: Yup.string().required('Required'),

  dispatchReferenceNo: Yup.string().required('Required'),
  shipmentReferenceNo: Yup.string().required('Required'),
  dispatchLocation: Yup.string().required('Required'),
  deliveryLocation: Yup.string().required('Required'),
  transporterName: Yup.string().required('Required'),
  vehicleNo: Yup.string().required('Required'),

  dispatchStatus: Yup.string().required('Required'),
  dispatchDate: Yup.string().required('Required'),
  expectedDeliveryDate: Yup.string().required('Required'),
  actualDeliveryDate: Yup.string(),
  remarks: Yup.string(),

  numberOfPackages: Yup.string().required('Required'),
  totalWeight: Yup.string().required('Required'),
  specialInstructions: Yup.string(),

  documentsAttached: Yup.string().required('Required'),
  photosAttached: Yup.string().required('Required'),

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

  entryId: '',
  entryDate: '',
  updatedBy: '',
  department: '',
  contactNo: '',

  dispatchReferenceNo: '',
  shipmentReferenceNo: '',
  dispatchLocation: '',
  deliveryLocation: '',
  transporterName: '',
  vehicleNo: '',

  dispatchStatus: '',
  dispatchDate: '',
  expectedDeliveryDate: '',
  actualDeliveryDate: '',
  remarks: '',

  numberOfPackages: '',
  totalWeight: '',
  specialInstructions: '',

  documentsAttached: '',
  photosAttached: '',

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

const FRM00411_DispatchRegisterUpdate = () => {

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
      formId="FRM-00411"
      title="Dispatch Register Update – Log / Register"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Dispatch Register updated successfully');
        }}
      >
        {({ values }) => (
          <Form>
            <ModernA4Template
              formId="FRM-00411"
              title="Dispatch Register Update"
              department="Logistics & Dispatch – Transportation & Dispatch"
            >

              {/* 1. Entry Details */}
              <div className="form-section">
                <h3 className="form-section-title">1. Entry Details</h3>
                <div className="form-fields">
                  {field(values,'entryId','Entry ID')}
                  {field(values,'entryDate','Entry Date','date')}
                  {field(values,'updatedBy','Updated By')}
                  {field(values,'department','Department')}
                  {field(values,'contactNo','Contact No')}
                </div>
              </div>

              {/* 2. Dispatch Information */}
              <div className="form-section">
                <h3 className="form-section-title">2. Dispatch Information</h3>
                <div className="form-fields">
                  {field(values,'dispatchReferenceNo','Dispatch Reference No')}
                  {field(values,'shipmentReferenceNo','Shipment Reference No')}
                  {field(values,'dispatchLocation','Dispatch Location')}
                  {field(values,'deliveryLocation','Delivery Location')}
                  {field(values,'transporterName','Transporter Name')}
                  {field(values,'vehicleNo','Vehicle No')}
                </div>
              </div>

              {/* 3. Status Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Status Details</h3>
                <div className="form-fields">
                  {field(values,'dispatchStatus','Dispatch Status')}
                  {field(values,'dispatchDate','Dispatch Date','date')}
                  {field(values,'expectedDeliveryDate','Expected Delivery Date','date')}
                  {field(values,'actualDeliveryDate','Actual Delivery Date','date')}
                  {textarea(values,'remarks','Remarks')}
                </div>
              </div>

              {/* 4. Supporting Information */}
              <div className="form-section">
                <h3 className="form-section-title">4. Supporting Information</h3>
                <div className="form-fields">
                  {field(values,'numberOfPackages','Number of Packages')}
                  {field(values,'totalWeight','Total Weight')}
                  {textarea(values,'specialInstructions','Special Instructions')}
                </div>
              </div>

              {/* 5. Attachments */}
              <div className="form-section">
                <h3 className="form-section-title">5. Attachments</h3>
                <div className="form-fields">
                  {select(values,'documentsAttached','Documents Attached',['Yes','No'])}
                  {select(values,'photosAttached','Photos Attached',['Yes','No'])}
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
                    Submit Register Update
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

export default FRM00411_DispatchRegisterUpdate;
