// FRM00332_SupplierBlacklisting.jsx
// FRM-00332 – Supplier Blacklisting – Request / Initiation Form

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
  relatedCaseReference: Yup.string().required('Required'),

  // 2. Supplier Details
  supplierName: Yup.string().required('Required'),
  supplierId: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  contractReference: Yup.string().required('Required'),

  // 3. Blacklisting Details
  blacklistingReason: Yup.string().required('Required'),
  incidentDescription: Yup.string().required('Required'),
  impactAssessment: Yup.string().required('Required'),

  // 4. Risk & Legal Considerations
  riskLevel: Yup.string().required('Required'),
  legalReviewRequired: Yup.string().required('Required'),
  recommendedDuration: Yup.string().required('Required'),

  // 5. Decision & Actions
  decisionSummary: Yup.string().required('Required'),
  effectiveDate: Yup.string().required('Required'),
  reviewDate: Yup.string().required('Required'),

  // 6. Authorization
  requesterApproval: Yup.string().required('Required'),
  procurementReview: Yup.string().required('Required'),
  legalApproval: Yup.string().required('Required'),
  managementApproval: Yup.string().required('Required'),
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
  relatedCaseReference: '',

  supplierName: '',
  supplierId: '',
  category: '',
  contactPerson: '',
  location: '',
  contractReference: '',

  blacklistingReason: '',
  incidentDescription: '',
  impactAssessment: '',

  riskLevel: '',
  legalReviewRequired: '',
  recommendedDuration: '',

  decisionSummary: '',
  effectiveDate: '',
  reviewDate: '',

  requesterApproval: '',
  procurementReview: '',
  legalApproval: '',
  managementApproval: '',
  approvalComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00332_SupplierBlacklisting = () => {

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
      formId="FRM-00332"
      title="Supplier Blacklisting – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Supplier blacklisting request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00332"
              title="Supplier Blacklisting"
              department="Procurement & Purchasing – Supplier Management"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'requestedBy','Requested By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {field(values,'relatedCaseReference','Related Case / Audit Ref')}
                </div>
              </div>

              {/* 2. Supplier Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Supplier Details</h3>
                <div className="form-fields">
                  {field(values,'supplierName','Supplier Name')}
                  {field(values,'supplierId','Supplier ID')}
                  {field(values,'category','Category')}
                  {field(values,'contactPerson','Contact Person')}
                  {field(values,'location','Location')}
                  {field(values,'contractReference','Contract / PO Reference')}
                </div>
              </div>

              {/* 3. Blacklisting Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Blacklisting Details</h3>
                <div className="form-fields">
                  {textarea(values,'blacklistingReason','Reason for Blacklisting')}
                  {textarea(values,'incidentDescription','Description of Incident / Non-Compliance')}
                  {textarea(values,'impactAssessment','Impact Assessment')}
                </div>
              </div>

              {/* 4. Risk & Legal Considerations */}
              <div className="form-section">
                <h3 className="form-section-title">4. Risk & Legal Considerations</h3>
                <div className="form-fields">
                  {select(values,'riskLevel','Risk Level',['Low','Medium','High','Critical'])}
                  {select(values,'legalReviewRequired','Legal Review Required',['Yes','No'])}
                  {field(values,'recommendedDuration','Recommended Duration of Blacklisting')}
                </div>
              </div>

              {/* 5. Decision & Actions */}
              <div className="form-section">
                <h3 className="form-section-title">5. Decision & Actions</h3>
                <div className="form-fields">
                  {textarea(values,'decisionSummary','Decision Summary')}
                  {field(values,'effectiveDate','Effective Date','date')}
                  {field(values,'reviewDate','Review Date','date')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requesterApproval','Requested By (Name & Signature)')}
                  {field(values,'procurementReview','Procurement Review')}
                  {field(values,'legalApproval','Legal Approval')}
                  {field(values,'managementApproval','Management Approval')}
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
                    Submit Blacklisting Request
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

export default FRM00332_SupplierBlacklisting;
