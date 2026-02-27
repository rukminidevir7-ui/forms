// FRM00396_TransporterAllocation.jsx
// FRM-00396 – Transporter Allocation – Request / Initiation Form

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
  typeOfGoods: Yup.string().required('Required'),
  natureOfGoods: Yup.string().required('Required'),
  numberOfPackages: Yup.string().required('Required'),
  totalWeight: Yup.string().required('Required'),
  volume: Yup.string().required('Required'),
  requiredPickupDate: Yup.string().required('Required'),
  requiredDeliveryDate: Yup.string().required('Required'),

  modeOfTransport: Yup.string().required('Required'),
  vehicleTypeRequired: Yup.string().required('Required'),
  specialHandlingInstructions: Yup.string(),
  temperatureControlRequired: Yup.string().required('Required'),
  insuranceRequired: Yup.string().required('Required'),

  transporterName: Yup.string(),
  transporterContactPerson: Yup.string(),
  transporterContactNumber: Yup.string(),
  transporterEmail: Yup.string(),
  transporterCode: Yup.string(),

  estimatedFreightCost: Yup.string(),
  additionalCharges: Yup.string(),
  costCenter: Yup.string(),
  budgetApprovalReference: Yup.string(),

  justificationNotes: Yup.string(),

  preparedBy: Yup.string().required('Required'),
  preparedDate: Yup.string().required('Required'),
  reviewedBy: Yup.string(),
  reviewedDate: Yup.string(),
  approvedBy: Yup.string(),
  approvedDate: Yup.string(),

  allocatedTransporter: Yup.string(),
  vehicleNumber: Yup.string(),
  driverName: Yup.string(),
  driverContact: Yup.string(),
  dispatchConfirmationDate: Yup.string(),

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
  typeOfGoods: '',
  natureOfGoods: '',
  numberOfPackages: '',
  totalWeight: '',
  volume: '',
  requiredPickupDate: '',
  requiredDeliveryDate: '',

  modeOfTransport: '',
  vehicleTypeRequired: '',
  specialHandlingInstructions: '',
  temperatureControlRequired: '',
  insuranceRequired: '',

  transporterName: '',
  transporterContactPerson: '',
  transporterContactNumber: '',
  transporterEmail: '',
  transporterCode: '',

  estimatedFreightCost: '',
  additionalCharges: '',
  costCenter: '',
  budgetApprovalReference: '',

  justificationNotes: '',

  preparedBy: '',
  preparedDate: '',
  reviewedBy: '',
  reviewedDate: '',
  approvedBy: '',
  approvedDate: '',

  allocatedTransporter: '',
  vehicleNumber: '',
  driverName: '',
  driverContact: '',
  dispatchConfirmationDate: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00396_TransporterAllocation = () => {

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
      formId="FRM-00396"
      title="Transporter Allocation – Request / Initiation Form"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Transporter Allocation submitted successfully');
        }}
      >
        {({ values }) => (
          <Form>
            <ModernA4Template
              formId="FRM-00396"
              title="Transporter Allocation"
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
                  {field(values,'shipmentReference','Shipment Reference No.')}
                  {field(values,'dispatchLocation','Dispatch Location')}
                  {field(values,'deliveryLocation','Delivery Location')}
                  {field(values,'typeOfGoods','Type of Goods')}
                  {field(values,'natureOfGoods','Nature of Goods')}
                  {field(values,'numberOfPackages','Number of Packages')}
                  {field(values,'totalWeight','Total Weight')}
                  {field(values,'volume','Volume')}
                  {field(values,'requiredPickupDate','Required Pickup Date','date')}
                  {field(values,'requiredDeliveryDate','Required Delivery Date','date')}
                </div>
              </div>

              {/* 3. Transport Requirement Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Transport Requirement Details</h3>
                <div className="form-fields">
                  {field(values,'modeOfTransport','Mode of Transport')}
                  {field(values,'vehicleTypeRequired','Vehicle Type Required')}
                  {textarea(values,'specialHandlingInstructions','Special Handling Instructions')}
                  {field(values,'temperatureControlRequired','Temperature Control Required')}
                  {field(values,'insuranceRequired','Insurance Required')}
                </div>
              </div>

              {/* 4. Transporter Details */}
              <div className="form-section">
                <h3 className="form-section-title">4. Transporter Details</h3>
                <div className="form-fields">
                  {field(values,'transporterName','Transporter Name')}
                  {field(values,'transporterContactPerson','Transporter Contact Person')}
                  {field(values,'transporterContactNumber','Contact Number')}
                  {field(values,'transporterEmail','Email')}
                  {field(values,'transporterCode','Transporter Code / ID')}
                </div>
              </div>

              {/* 5. Cost Details */}
              <div className="form-section">
                <h3 className="form-section-title">5. Cost Details</h3>
                <div className="form-fields">
                  {field(values,'estimatedFreightCost','Estimated Freight Cost')}
                  {field(values,'additionalCharges','Additional Charges')}
                  {field(values,'costCenter','Cost Center')}
                  {field(values,'budgetApprovalReference','Budget Approval Reference')}
                </div>
              </div>

              {/* 6. Allocation Justification */}
              <div className="form-section">
                <h3 className="form-section-title">6. Allocation Justification</h3>
                <div className="form-fields">
                  {textarea(values,'justificationNotes','Justification Notes')}
                </div>
              </div>

              {/* 7. Approval Section */}
              <div className="form-section">
                <h3 className="form-section-title">7. Approval Section</h3>
                <div className="form-fields">
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'preparedDate','Prepared Date','date')}
                  {field(values,'reviewedBy','Reviewed By')}
                  {field(values,'reviewedDate','Reviewed Date','date')}
                  {field(values,'approvedBy','Approved By')}
                  {field(values,'approvedDate','Approved Date','date')}
                </div>
              </div>

              {/* 8. Final Allocation Confirmation */}
              <div className="form-section">
                <h3 className="form-section-title">8. Final Allocation Confirmation</h3>
                <div className="form-fields">
                  {field(values,'allocatedTransporter','Allocated Transporter')}
                  {field(values,'vehicleNumber','Vehicle Number')}
                  {field(values,'driverName','Driver Name')}
                  {field(values,'driverContact','Driver Contact')}
                  {field(values,'dispatchConfirmationDate','Dispatch Confirmation Date','date')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Transporter Allocation
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

export default FRM00396_TransporterAllocation;
