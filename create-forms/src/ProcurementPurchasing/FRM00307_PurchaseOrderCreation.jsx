// FRM00307_PurchaseOrderCreation.jsx
// FRM-00307 – Purchase Order Creation – Request / Initiation Form

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
  poDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  purchaseRequisitionRef: Yup.string().required('Required'),
  procurementCategory: Yup.string().required('Required'),
  priority: Yup.string().required('Required'),

  // 2. Vendor Details
  vendorName: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().required('Required'),
  vendorAddress: Yup.string().required('Required'),
  country: Yup.string().required('Required'),

  // 3. Order Details
  orderDate: Yup.string().required('Required'),
  deliveryDate: Yup.string().required('Required'),
  deliveryLocation: Yup.string().required('Required'),
  shippingMethod: Yup.string().required('Required'),
  paymentTerms: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),

  // 4. Item Details
  itemService: Yup.string().required('Required'),
  quantity: Yup.number().typeError('Must be a number').required('Required'),
  unitOfMeasure: Yup.string().required('Required'),
  unitPrice: Yup.number().typeError('Must be a number').required('Required'),
  totalAmount: Yup.number().typeError('Must be a number').required('Required'),

  // 5. Financial Summary
  subtotal: Yup.number().typeError('Must be a number').required('Required'),
  taxes: Yup.number().typeError('Must be a number').required('Required'),
  totalOrderValue: Yup.number().typeError('Must be a number').required('Required'),
  budgetConfirmed: Yup.string().required('Required'),

  // 6. Terms & Conditions
  specialTerms: Yup.string().required('Required'),
  notes: Yup.string().required('Required'),

  // 7. Authorization
  preparedByApproval: Yup.string().required('Required'),
  procurementReview: Yup.string().required('Required'),
  departmentApproval: Yup.string().required('Required'),
  financeApproval: Yup.string().required('Required'),
  authorizedSignatory: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  // 8. Supporting Information
  supportingDocuments: Yup.string(),
  additionalNotes: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  poDate: '',
  department: '',
  preparedBy: '',
  referenceNumber: '',
  purchaseRequisitionRef: '',
  procurementCategory: '',
  priority: '',

  vendorName: '',
  contactPerson: '',
  email: '',
  phone: '',
  vendorAddress: '',
  country: '',

  orderDate: '',
  deliveryDate: '',
  deliveryLocation: '',
  shippingMethod: '',
  paymentTerms: '',
  currency: '',

  itemService: '',
  quantity: '',
  unitOfMeasure: '',
  unitPrice: '',
  totalAmount: '',

  subtotal: '',
  taxes: '',
  totalOrderValue: '',
  budgetConfirmed: '',

  specialTerms: '',
  notes: '',

  preparedByApproval: '',
  procurementReview: '',
  departmentApproval: '',
  financeApproval: '',
  authorizedSignatory: '',
  approvalComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00307_PurchaseOrderCreation = () => {

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
      formId="FRM-00307"
      title="Purchase Order Creation – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Purchase order request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00307"
              title="Purchase Order Creation"
              department="Procurement & Purchasing – Requisitions & Sourcing"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'poDate','Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {field(values,'purchaseRequisitionRef','Purchase Requisition Ref')}
                  {field(values,'procurementCategory','Procurement Category')}
                  {select(values,'priority','Priority',['Low','Medium','High','Urgent'])}
                </div>
              </div>

              {/* 2. Vendor Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Vendor Details</h3>
                <div className="form-fields">
                  {field(values,'vendorName','Vendor Name')}
                  {field(values,'contactPerson','Contact Person')}
                  {field(values,'email','Email','email')}
                  {field(values,'phone','Phone')}
                  {textarea(values,'vendorAddress','Address')}
                  {field(values,'country','Country')}
                </div>
              </div>

              {/* 3. Order Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Order Details</h3>
                <div className="form-fields">
                  {field(values,'orderDate','Order Date','date')}
                  {field(values,'deliveryDate','Delivery Date','date')}
                  {field(values,'deliveryLocation','Delivery Location')}
                  {field(values,'shippingMethod','Shipping Method')}
                  {field(values,'paymentTerms','Payment Terms')}
                  {field(values,'currency','Currency')}
                </div>
              </div>

              {/* 4. Item Details */}
              <div className="form-section">
                <h3 className="form-section-title">4. Item Details</h3>
                <div className="form-fields">
                  {field(values,'itemService','Item / Service')}
                  {field(values,'quantity','Quantity','number')}
                  {field(values,'unitOfMeasure','Unit')}
                  {field(values,'unitPrice','Unit Price','number')}
                  {field(values,'totalAmount','Total','number')}
                </div>
              </div>

              {/* 5. Financial Summary */}
              <div className="form-section">
                <h3 className="form-section-title">5. Financial Summary</h3>
                <div className="form-fields">
                  {field(values,'subtotal','Subtotal','number')}
                  {field(values,'taxes','Taxes','number')}
                  {field(values,'totalOrderValue','Total Order Value','number')}
                  {select(values,'budgetConfirmed','Budget Availability Confirmed',['Yes','No'])}
                </div>
              </div>

              {/* 6. Terms & Conditions */}
              <div className="form-section">
                <h3 className="form-section-title">6. Terms & Conditions</h3>
                <div className="form-fields">
                  {textarea(values,'specialTerms','Special Terms')}
                  {textarea(values,'notes','Notes')}
                </div>
              </div>

              {/* 7. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">7. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByApproval','Prepared By (Name & Signature)')}
                  {field(values,'procurementReview','Procurement Review')}
                  {field(values,'departmentApproval','Department Approval')}
                  {field(values,'financeApproval','Finance Approval')}
                  {field(values,'authorizedSignatory','Authorized Signatory')}
                  {textarea(values,'approvalComments','Comments')}
                </div>
              </div>

              {/* 8. Supporting Information */}
              <div className="form-section">
                <h3 className="form-section-title">8. Supporting Information</h3>
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
                    Submit Purchase Order
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

export default FRM00307_PurchaseOrderCreation;
