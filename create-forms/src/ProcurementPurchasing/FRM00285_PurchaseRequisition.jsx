// FRM00285_PurchaseRequisition.jsx
// FRM-00285 – Purchase Requisition – Request / Initiation Form

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
  department: Yup.string().required('Required'),
  requestedBy: Yup.string().required('Required'),
  costCenter: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  priority: Yup.string().required('Required'),
  requiredByDate: Yup.string().required('Required'),

  // Vendor Details
  suggestedVendor: Yup.string().required('Required'),
  vendorContact: Yup.string().required('Required'),
  vendorAddress: Yup.string().required('Required'),
  contractReference: Yup.string(),

  // Item / Service Details
  itemDescription: Yup.string().required('Required'),
  quantity: Yup.number().typeError('Must be a number').required('Required'),
  unitOfMeasure: Yup.string().required('Required'),
  estimatedUnitCost: Yup.number().typeError('Must be a number').required('Required'),
  estimatedTotalCost: Yup.number().typeError('Must be a number').required('Required'),

  // Financial Summary
  estimatedTotalAmount: Yup.number().typeError('Must be a number').required('Required'),
  currency: Yup.string().required('Required'),
  budgetConfirmed: Yup.string().required('Required'),
  glAccount: Yup.string().required('Required'),

  // Justification
  businessJustification: Yup.string().required('Required'),
  impactIfNotApproved: Yup.string().required('Required'),

  // Authorization
  requesterApproval: Yup.string().required('Required'),
  departmentHeadApproval: Yup.string().required('Required'),
  procurementReview: Yup.string().required('Required'),
  financeApproval: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  // Supporting Information
  supportingDocuments: Yup.string(),
  additionalNotes: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  requestDate: '',
  department: '',
  requestedBy: '',
  costCenter: '',
  referenceNumber: '',
  priority: '',
  requiredByDate: '',

  suggestedVendor: '',
  vendorContact: '',
  vendorAddress: '',
  contractReference: '',

  itemDescription: '',
  quantity: '',
  unitOfMeasure: '',
  estimatedUnitCost: '',
  estimatedTotalCost: '',

  estimatedTotalAmount: '',
  currency: '',
  budgetConfirmed: '',
  glAccount: '',

  businessJustification: '',
  impactIfNotApproved: '',

  requesterApproval: '',
  departmentHeadApproval: '',
  procurementReview: '',
  financeApproval: '',
  approvalComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00285_PurchaseRequisition = () => {

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
      formId="FRM-00285"
      title="Purchase Requisition – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Purchase requisition submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00285"
              title="Purchase Requisition"
              department="Procurement & Purchasing – Requisitions & Sourcing"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'requestedBy','Requested By')}
                  {field(values,'costCenter','Cost Center')}
                  {field(values,'referenceNumber','Reference Number')}
                  {select(values,'priority','Priority',['Low','Medium','High','Urgent'])}
                  {field(values,'requiredByDate','Required By Date','date')}
                </div>
              </div>

              {/* 2. Vendor / Supplier Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Vendor / Supplier Details</h3>
                <div className="form-fields">
                  {field(values,'suggestedVendor','Suggested Vendor')}
                  {field(values,'vendorContact','Vendor Contact')}
                  {field(values,'vendorAddress','Vendor Address')}
                  {field(values,'contractReference','Contract / Agreement Reference')}
                </div>
              </div>

              {/* 3. Item / Service Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Item / Service Details</h3>
                <div className="form-fields">
                  {textarea(values,'itemDescription','Item / Service Description')}
                  {field(values,'quantity','Quantity','number')}
                  {field(values,'unitOfMeasure','Unit of Measure')}
                  {field(values,'estimatedUnitCost','Estimated Unit Cost','number')}
                  {field(values,'estimatedTotalCost','Estimated Total','number')}
                </div>
              </div>

              {/* 4. Financial Summary */}
              <div className="form-section">
                <h3 className="form-section-title">4. Financial Summary</h3>
                <div className="form-fields">
                  {field(values,'estimatedTotalAmount','Estimated Total Amount','number')}
                  {field(values,'currency','Currency')}
                  {select(values,'budgetConfirmed','Budget Availability Confirmed',['Yes','No'])}
                  {field(values,'glAccount','GL Account')}
                </div>
              </div>

              {/* 5. Justification */}
              <div className="form-section">
                <h3 className="form-section-title">5. Justification</h3>
                <div className="form-fields">
                  {textarea(values,'businessJustification','Business Justification')}
                  {textarea(values,'impactIfNotApproved','Impact if Not Approved')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requesterApproval','Requested By (Name & Signature)')}
                  {field(values,'departmentHeadApproval','Department Head Approval')}
                  {field(values,'procurementReview','Procurement Review')}
                  {field(values,'financeApproval','Finance Approval')}
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
                    Submit Purchase Requisition
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

export default FRM00285_PurchaseRequisition;
