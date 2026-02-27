// FRM00310_PurchaseOrderChange.jsx
// FRM-00310 – Purchase Order Change – Request / Initiation Form

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
  requestDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  requestedBy: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  originalPONumber: Yup.string().required('Required'),
  changeType: Yup.string().required('Required'),
  priority: Yup.string().required('Required'),

  // 2. Vendor Details
  vendorName: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().required('Required'),

  // 3. Change Details
  reasonForChange: Yup.string().required('Required'),
  changeDescription: Yup.string().required('Required'),
  costImpactDescription: Yup.string().required('Required'),
  deliveryImpactDescription: Yup.string().required('Required'),

  // 4. Revised Item / Cost Details
  itemService: Yup.string().required('Required'),
  originalQuantity: Yup.number().typeError('Must be a number').required('Required'),
  revisedQuantity: Yup.number().typeError('Must be a number').required('Required'),
  originalValue: Yup.number().typeError('Must be a number').required('Required'),
  revisedValue: Yup.number().typeError('Must be a number').required('Required'),

  // 5. Financial Impact Summary
  originalPOValue: Yup.number().typeError('Must be a number').required('Required'),
  revisedPOValue: Yup.number().typeError('Must be a number').required('Required'),
  varianceAmount: Yup.number().typeError('Must be a number').required('Required'),
  budgetConfirmed: Yup.string().required('Required'),

  // 6. Authorization
  requesterApproval: Yup.string().required('Required'),
  procurementReview: Yup.string().required('Required'),
  departmentApproval: Yup.string().required('Required'),
  financeApproval: Yup.string().required('Required'),
  authorizedSignatory: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  // 7. Supporting Information
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
  referenceNumber: '',
  originalPONumber: '',
  changeType: '',
  priority: '',

  vendorName: '',
  contactPerson: '',
  email: '',
  phone: '',

  reasonForChange: '',
  changeDescription: '',
  costImpactDescription: '',
  deliveryImpactDescription: '',

  itemService: '',
  originalQuantity: '',
  revisedQuantity: '',
  originalValue: '',
  revisedValue: '',

  originalPOValue: '',
  revisedPOValue: '',
  varianceAmount: '',
  budgetConfirmed: '',

  requesterApproval: '',
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

const FRM00310_PurchaseOrderChange = () => {

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
      formId="FRM-00310"
      title="Purchase Order Change – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Purchase order change request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00310"
              title="Purchase Order Change"
              department="Procurement & Purchasing – Requisitions & Sourcing"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'requestedBy','Requested By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {field(values,'originalPONumber','Original PO Number')}
                  {select(values,'changeType','Change Type',['Quantity Change','Price Change','Delivery Change','Scope Change','Other'])}
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
                </div>
              </div>

              {/* 3. Change Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Change Details</h3>
                <div className="form-fields">
                  {textarea(values,'reasonForChange','Reason for Change')}
                  {textarea(values,'changeDescription','Description of Change')}
                  {textarea(values,'costImpactDescription','Impact on Cost')}
                  {textarea(values,'deliveryImpactDescription','Impact on Delivery')}
                </div>
              </div>

              {/* 4. Revised Item / Cost Details */}
              <div className="form-section">
                <h3 className="form-section-title">4. Revised Item / Cost Details</h3>
                <div className="form-fields">
                  {field(values,'itemService','Item / Service')}
                  {field(values,'originalQuantity','Original Qty','number')}
                  {field(values,'revisedQuantity','Revised Qty','number')}
                  {field(values,'originalValue','Original Value','number')}
                  {field(values,'revisedValue','Revised Value','number')}
                </div>
              </div>

              {/* 5. Financial Impact Summary */}
              <div className="form-section">
                <h3 className="form-section-title">5. Financial Impact Summary</h3>
                <div className="form-fields">
                  {field(values,'originalPOValue','Original PO Value','number')}
                  {field(values,'revisedPOValue','Revised PO Value','number')}
                  {field(values,'varianceAmount','Variance Amount','number')}
                  {select(values,'budgetConfirmed','Budget Availability Confirmed',['Yes','No'])}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requesterApproval','Requested By (Name & Signature)')}
                  {field(values,'procurementReview','Procurement Review')}
                  {field(values,'departmentApproval','Department Approval')}
                  {field(values,'financeApproval','Finance Approval')}
                  {field(values,'authorizedSignatory','Authorized Signatory')}
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
                    Submit PO Change Request
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

export default FRM00310_PurchaseOrderChange;
