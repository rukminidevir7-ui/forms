// FRM00204_VendorInvoiceIntake.jsx
// FRM-00204 – Vendor Invoice Intake – Report / Record Form

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
  formId: Yup.string().required('Required'),
  dateReceived: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  receivedBy: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // Vendor Details
  vendorName: Yup.string().required('Required'),
  vendorId: Yup.string().required('Required'),
  vendorAddress: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  vendorEmailPhone: Yup.string().required('Required'),
  taxIdGst: Yup.string().required('Required'),

  // Invoice Details
  invoiceNumber: Yup.string().required('Required'),
  invoiceDate: Yup.string().required('Required'),
  invoiceAmount: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),
  purchaseOrderNumber: Yup.string().required('Required'),
  dueDate: Yup.string().required('Required'),

  // Description
  goodsServicesDescription: Yup.string().required('Required'),
  billingPeriod: Yup.string().required('Required'),
  costCenterGlCode: Yup.string().required('Required'),

  // Tax & Payment Details
  taxAmount: Yup.string().required('Required'),
  taxType: Yup.string().required('Required'),
  totalPayableAmount: Yup.string().required('Required'),
  paymentMethod: Yup.string().required('Required'),
  bankDetailsVerified: Yup.string().required('Required'),
  paymentTerms: Yup.string().required('Required'),

  // Review & Authorization
  checkedByAp: Yup.string().required('Required'),
  businessApproval: Yup.string().required('Required'),
  financeApproval: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  formId: '',
  dateReceived: '',
  department: '',
  receivedBy: '',
  referenceNumber: '',
  priorityLevel: '',

  vendorName: '',
  vendorId: '',
  vendorAddress: '',
  contactPerson: '',
  vendorEmailPhone: '',
  taxIdGst: '',

  invoiceNumber: '',
  invoiceDate: '',
  invoiceAmount: '',
  currency: '',
  purchaseOrderNumber: '',
  dueDate: '',

  goodsServicesDescription: '',
  billingPeriod: '',
  costCenterGlCode: '',

  taxAmount: '',
  taxType: '',
  totalPayableAmount: '',
  paymentMethod: '',
  bankDetailsVerified: '',
  paymentTerms: '',

  checkedByAp: '',
  businessApproval: '',
  financeApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00204_VendorInvoiceIntake = () => {

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
      formId="FRM-00204"
      title="Vendor Invoice Intake – Report / Record Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Vendor invoice recorded successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00204"
              title="Vendor Invoice Intake"
              department="Finance & Accounting – Accounts Payable"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'dateReceived','Date Received','date')}
                  {field(values,'department','Department')}
                  {field(values,'receivedBy','Received By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {select(values,'priorityLevel','Priority Level',['Low','Medium','High','Urgent'])}
                </div>
              </div>

              {/* 2. Vendor Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Vendor Details</h3>
                <div className="form-fields">
                  {field(values,'vendorName','Vendor Name')}
                  {field(values,'vendorId','Vendor ID')}
                  {field(values,'vendorAddress','Vendor Address')}
                  {field(values,'contactPerson','Contact Person')}
                  {field(values,'vendorEmailPhone','Email / Phone')}
                  {field(values,'taxIdGst','Tax ID / GST Number')}
                </div>
              </div>

              {/* 3. Invoice Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Invoice Details</h3>
                <div className="form-fields">
                  {field(values,'invoiceNumber','Invoice Number')}
                  {field(values,'invoiceDate','Invoice Date','date')}
                  {field(values,'invoiceAmount','Invoice Amount','number')}
                  {field(values,'currency','Currency')}
                  {field(values,'purchaseOrderNumber','Purchase Order Number')}
                  {field(values,'dueDate','Due Date','date')}
                </div>
              </div>

              {/* 4. Description */}
              <div className="form-section">
                <h3 className="form-section-title">4. Description</h3>
                <div className="form-fields">
                  {textarea(values,'goodsServicesDescription','Description of Goods / Services')}
                  {field(values,'billingPeriod','Billing Period')}
                  {field(values,'costCenterGlCode','Cost Center / GL Code')}
                </div>
              </div>

              {/* 5. Tax & Payment Details */}
              <div className="form-section">
                <h3 className="form-section-title">5. Tax & Payment Details</h3>
                <div className="form-fields">
                  {field(values,'taxAmount','Tax Amount','number')}
                  {field(values,'taxType','Tax Type')}
                  {field(values,'totalPayableAmount','Total Payable Amount','number')}
                  {select(values,'paymentMethod','Payment Method',['Bank Transfer','Cheque','NEFT','RTGS','UPI'])}
                  {select(values,'bankDetailsVerified','Bank Details Verified',['Yes','No'])}
                  {field(values,'paymentTerms','Payment Terms')}
                </div>
              </div>

              {/* 6. Review & Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Review & Authorization</h3>
                <div className="form-fields">
                  {field(values,'checkedByAp','Checked By (Accounts Payable)')}
                  {field(values,'businessApproval','Business Approval')}
                  {field(values,'financeApproval','Finance Approval')}
                  {field(values,'approvalDate','Approval Date','date')}
                  {textarea(values,'approvalComments','Comments')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Vendor Invoice Intake
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

export default FRM00204_VendorInvoiceIntake;
