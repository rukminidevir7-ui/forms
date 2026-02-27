// FRM00301_EmergencyProcurement.jsx
// FRM-00301 – Emergency Procurement – Request / Initiation Form

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
  procurementCategory: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),
  requiredByDate: Yup.string().required('Required'),

  // 2. Emergency Details
  natureOfEmergency: Yup.string().required('Required'),
  businessImpact: Yup.string().required('Required'),
  justificationForException: Yup.string().required('Required'),

  // 3. Vendor Details
  proposedVendor: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().required('Required'),
  vendorAddress: Yup.string().required('Required'),
  country: Yup.string().required('Required'),

  // 4. Item / Service Details
  itemDescription: Yup.string().required('Required'),
  quantity: Yup.number().typeError('Must be a number').required('Required'),
  unitCost: Yup.number().typeError('Must be a number').required('Required'),
  totalCost: Yup.number().typeError('Must be a number').required('Required'),

  // 5. Financial Summary
  estimatedTotalAmount: Yup.number().typeError('Must be a number').required('Required'),
  currency: Yup.string().required('Required'),
  budgetConfirmed: Yup.string().required('Required'),
  glAccount: Yup.string().required('Required'),

  // 6. Risk & Mitigation
  risksIdentified: Yup.string().required('Required'),
  mitigationPlan: Yup.string().required('Required'),

  // 7. Authorization
  requesterApproval: Yup.string().required('Required'),
  departmentHeadApproval: Yup.string().required('Required'),
  procurementReview: Yup.string().required('Required'),
  financeApproval: Yup.string().required('Required'),
  managementApproval: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  // 8. Supporting Information
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
  procurementCategory: '',
  priorityLevel: '',
  requiredByDate: '',

  natureOfEmergency: '',
  businessImpact: '',
  justificationForException: '',

  proposedVendor: '',
  contactPerson: '',
  email: '',
  phone: '',
  vendorAddress: '',
  country: '',

  itemDescription: '',
  quantity: '',
  unitCost: '',
  totalCost: '',

  estimatedTotalAmount: '',
  currency: '',
  budgetConfirmed: '',
  glAccount: '',

  risksIdentified: '',
  mitigationPlan: '',

  requesterApproval: '',
  departmentHeadApproval: '',
  procurementReview: '',
  financeApproval: '',
  managementApproval: '',
  approvalComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00301_EmergencyProcurement = () => {

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
      formId="FRM-00301"
      title="Emergency Procurement – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Emergency procurement request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00301"
              title="Emergency Procurement"
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
                  {field(values,'procurementCategory','Procurement Category')}
                  {select(values,'priorityLevel','Priority Level',['High','Critical','Immediate'])}
                  {field(values,'requiredByDate','Required By Date','date')}
                </div>
              </div>

              {/* 2. Emergency Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Emergency Details</h3>
                <div className="form-fields">
                  {textarea(values,'natureOfEmergency','Nature of Emergency')}
                  {textarea(values,'businessImpact','Business Impact')}
                  {textarea(values,'justificationForException','Reason Standard Process Cannot Be Followed')}
                </div>
              </div>

              {/* 3. Vendor Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Vendor Details</h3>
                <div className="form-fields">
                  {field(values,'proposedVendor','Proposed Vendor')}
                  {field(values,'contactPerson','Contact Person')}
                  {field(values,'email','Email','email')}
                  {field(values,'phone','Phone')}
                  {textarea(values,'vendorAddress','Address')}
                  {field(values,'country','Country')}
                </div>
              </div>

              {/* 4. Item / Service Details */}
              <div className="form-section">
                <h3 className="form-section-title">4. Item / Service Details</h3>
                <div className="form-fields">
                  {textarea(values,'itemDescription','Description')}
                  {field(values,'quantity','Quantity','number')}
                  {field(values,'unitCost','Unit Cost','number')}
                  {field(values,'totalCost','Total','number')}
                </div>
              </div>

              {/* 5. Financial Summary */}
              <div className="form-section">
                <h3 className="form-section-title">5. Financial Summary</h3>
                <div className="form-fields">
                  {field(values,'estimatedTotalAmount','Estimated Total Amount','number')}
                  {field(values,'currency','Currency')}
                  {select(values,'budgetConfirmed','Budget Availability Confirmed',['Yes','No'])}
                  {field(values,'glAccount','GL Account')}
                </div>
              </div>

              {/* 6. Risk & Mitigation */}
              <div className="form-section">
                <h3 className="form-section-title">6. Risk & Mitigation</h3>
                <div className="form-fields">
                  {textarea(values,'risksIdentified','Risks Identified')}
                  {textarea(values,'mitigationPlan','Mitigation Plan')}
                </div>
              </div>

              {/* 7. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">7. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requesterApproval','Requested By (Name & Signature)')}
                  {field(values,'departmentHeadApproval','Department Head Approval')}
                  {field(values,'procurementReview','Procurement Review')}
                  {field(values,'financeApproval','Finance Approval')}
                  {field(values,'managementApproval','Management Approval')}
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
                    Submit Emergency Procurement
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

export default FRM00301_EmergencyProcurement;
