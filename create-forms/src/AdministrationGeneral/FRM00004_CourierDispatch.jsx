// FRM00004_CourierDispatch.jsx
// FRM-00004 – Courier / Dispatch Request & Authorization Form

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

  // Basic Information
  requestDate: Yup.string().required('Required'),
  departmentName: Yup.string().required('Required'),
  requesterName: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  dispatchType: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // Sender Details
  senderName: Yup.string().required('Required'),
  senderAddress: Yup.string().required('Required'),
  senderCity: Yup.string().required('Required'),
  senderState: Yup.string().required('Required'),
  senderPinCode: Yup.string().required('Required'),
  senderContact: Yup.string().required('Required'),

  // Receiver Details
  receiverName: Yup.string().required('Required'),
  receiverAddress: Yup.string().required('Required'),
  receiverCity: Yup.string().required('Required'),
  receiverState: Yup.string().required('Required'),
  receiverPinCode: Yup.string().required('Required'),
  receiverContact: Yup.string().required('Required'),

  // Shipment Details
  itemDescription: Yup.string().required('Required'),
  numberOfPackages: Yup.number().required('Required'),
  shipmentWeight: Yup.string().required('Required'),
  shipmentMode: Yup.string().required('Required'),

  // Authorization
  requestedBy: Yup.string().required('Required'),
  reviewedBy: Yup.string().required('Required'),
  approvedBy: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  // Supporting Information
  supportingDocuments: Yup.string(),

  // Reusable Sections
  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  requestDate: '',
  departmentName: '',
  requesterName: '',
  employeeId: '',
  contactNumber: '',
  dispatchType: '',
  priorityLevel: '',

  senderName: '',
  senderAddress: '',
  senderCity: '',
  senderState: '',
  senderPinCode: '',
  senderContact: '',

  receiverName: '',
  receiverAddress: '',
  receiverCity: '',
  receiverState: '',
  receiverPinCode: '',
  receiverContact: '',

  itemDescription: '',
  numberOfPackages: '',
  shipmentWeight: '',
  shipmentMode: '',

  requestedBy: '',
  reviewedBy: '',
  approvedBy: '',
  approvalDate: '',
  approvalComments: '',

  supportingDocuments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00004_CourierDispatch = () => {

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
      <label className="form-label">{label}</label>
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
      formId="FRM-00004"
      title="Courier / Dispatch Request & Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Courier / Dispatch request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00004"
              title="Courier / Dispatch – Request & Authorization"
              department="Administration & General – Office Administration"
            >

              {/* Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'departmentName','Department Name')}
                  {field(values,'requesterName','Requester Name')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'contactNumber','Contact Number')}
                  {select(values,'dispatchType','Dispatch Type',['Domestic','International','Internal Office Transfer'])}
                  {select(values,'priorityLevel','Priority Level',['Low','Medium','High','Urgent'])}
                </div>
              </div>

              {/* Sender & Receiver */}
              <div className="form-section">
                <h3 className="form-section-title">2. Sender & Receiver Details</h3>
                <div className="form-fields">
                  {field(values,'senderName','Sender Name')}
                  {field(values,'receiverName','Receiver Name')}
                  {textarea(values,'senderAddress','Sender Address')}
                  {textarea(values,'receiverAddress','Receiver Address')}
                  {field(values,'senderCity','Sender City')}
                  {field(values,'receiverCity','Receiver City')}
                  {field(values,'senderState','Sender State')}
                  {field(values,'receiverState','Receiver State')}
                  {field(values,'senderPinCode','Sender PIN Code')}
                  {field(values,'receiverPinCode','Receiver PIN Code')}
                  {field(values,'senderContact','Sender Contact')}
                  {field(values,'receiverContact','Receiver Contact')}
                </div>
              </div>

              {/* Shipment Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Shipment Details</h3>
                <div className="form-fields">
                  {textarea(values,'itemDescription','Item Description')}
                  {field(values,'numberOfPackages','Number of Packages','number')}
                  {field(values,'shipmentWeight','Total Weight')}
                  {select(values,'shipmentMode','Mode of Shipment',['Air','Surface','Courier Partner','Hand Delivery'])}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">4. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requestedBy','Requested By (Name)')}
                  {field(values,'reviewedBy','Reviewed By')}
                  {field(values,'approvedBy','Approved By')}
                  {field(values,'approvalDate','Approval Date','date')}
                  {textarea(values,'approvalComments','Comments / Remarks')}
                </div>
              </div>

              {/* Supporting Information */}
              <div className="form-section">
                <h3 className="form-section-title">5. Supporting Information</h3>
                <div className="form-fields">
                  {textarea(values,'supportingDocuments','Supporting Documents / Additional Notes')}
                </div>
              </div>

              {/* Reusable Components */}
              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Form
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

export default FRM00004_CourierDispatch;
