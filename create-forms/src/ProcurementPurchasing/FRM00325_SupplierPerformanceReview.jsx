// FRM00325_SupplierPerformanceReview.jsx
// FRM-00325 – Supplier Performance Review – Request / Initiation Form

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
  reviewDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  reviewedBy: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  reviewPeriod: Yup.string().required('Required'),

  // 2. Supplier Details
  supplierName: Yup.string().required('Required'),
  supplierId: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
  contractReference: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),

  // 3. Performance Metrics (1–5)
  qualityPerformanceScore: Yup.number().min(1).max(5).required('Required'),
  qualityPerformanceComments: Yup.string().required('Required'),
  deliveryPerformanceScore: Yup.number().min(1).max(5).required('Required'),
  deliveryPerformanceComments: Yup.string().required('Required'),
  costPerformanceScore: Yup.number().min(1).max(5).required('Required'),
  costPerformanceComments: Yup.string().required('Required'),
  servicePerformanceScore: Yup.number().min(1).max(5).required('Required'),
  servicePerformanceComments: Yup.string().required('Required'),
  compliancePerformanceScore: Yup.number().min(1).max(5).required('Required'),
  compliancePerformanceComments: Yup.string().required('Required'),

  // 4. Review Summary
  overallRating: Yup.number().min(1).max(5).required('Required'),
  keyAchievements: Yup.string().required('Required'),
  issuesIdentified: Yup.string().required('Required'),
  improvementPlan: Yup.string().required('Required'),

  // 5. Risk & Actions
  riskLevel: Yup.string().required('Required'),
  correctiveActions: Yup.string().required('Required'),
  followUpDate: Yup.string().required('Required'),

  // 6. Authorization
  reviewerApproval: Yup.string().required('Required'),
  procurementReview: Yup.string().required('Required'),
  departmentApproval: Yup.string().required('Required'),
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

  reviewDate: '',
  department: '',
  reviewedBy: '',
  referenceNumber: '',
  reviewPeriod: '',

  supplierName: '',
  supplierId: '',
  category: '',
  contractReference: '',
  location: '',
  contactPerson: '',

  qualityPerformanceScore: '',
  qualityPerformanceComments: '',
  deliveryPerformanceScore: '',
  deliveryPerformanceComments: '',
  costPerformanceScore: '',
  costPerformanceComments: '',
  servicePerformanceScore: '',
  servicePerformanceComments: '',
  compliancePerformanceScore: '',
  compliancePerformanceComments: '',

  overallRating: '',
  keyAchievements: '',
  issuesIdentified: '',
  improvementPlan: '',

  riskLevel: '',
  correctiveActions: '',
  followUpDate: '',

  reviewerApproval: '',
  procurementReview: '',
  departmentApproval: '',
  managementApproval: '',
  approvalComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00325_SupplierPerformanceReview = () => {

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
      formId="FRM-00325"
      title="Supplier Performance Review – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Supplier performance review submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00325"
              title="Supplier Performance Review"
              department="Procurement & Purchasing – Supplier Management"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'reviewDate','Review Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'reviewedBy','Reviewed By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {field(values,'reviewPeriod','Review Period')}
                </div>
              </div>

              {/* 2. Supplier Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Supplier Details</h3>
                <div className="form-fields">
                  {field(values,'supplierName','Supplier Name')}
                  {field(values,'supplierId','Supplier ID')}
                  {field(values,'category','Category')}
                  {field(values,'contractReference','Contract / PO Reference')}
                  {field(values,'location','Location')}
                  {field(values,'contactPerson','Contact Person')}
                </div>
              </div>

              {/* 3. Performance Metrics */}
              <div className="form-section">
                <h3 className="form-section-title">3. Performance Metrics</h3>
                <div className="form-fields">
                  {field(values,'qualityPerformanceScore','Quality Performance (1–5)','number')}
                  {textarea(values,'qualityPerformanceComments','Comments')}
                  {field(values,'deliveryPerformanceScore','Delivery Performance (1–5)','number')}
                  {textarea(values,'deliveryPerformanceComments','Comments')}
                  {field(values,'costPerformanceScore','Cost Performance (1–5)','number')}
                  {textarea(values,'costPerformanceComments','Comments')}
                  {field(values,'servicePerformanceScore','Service / Support (1–5)','number')}
                  {textarea(values,'servicePerformanceComments','Comments')}
                  {field(values,'compliancePerformanceScore','Compliance Performance (1–5)','number')}
                  {textarea(values,'compliancePerformanceComments','Comments')}
                </div>
              </div>

              {/* 4. Review Summary */}
              <div className="form-section">
                <h3 className="form-section-title">4. Review Summary</h3>
                <div className="form-fields">
                  {field(values,'overallRating','Overall Rating (1–5)','number')}
                  {textarea(values,'keyAchievements','Key Achievements')}
                  {textarea(values,'issuesIdentified','Issues Identified')}
                  {textarea(values,'improvementPlan','Improvement Plan')}
                </div>
              </div>

              {/* 5. Risk & Actions */}
              <div className="form-section">
                <h3 className="form-section-title">5. Risk & Actions</h3>
                <div className="form-fields">
                  {select(values,'riskLevel','Risk Level',['Low','Medium','High','Critical'])}
                  {textarea(values,'correctiveActions','Corrective Actions')}
                  {field(values,'followUpDate','Follow-up Date','date')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'reviewerApproval','Reviewed By (Name & Signature)')}
                  {field(values,'procurementReview','Procurement Review')}
                  {field(values,'departmentApproval','Department Approval')}
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
                    Submit Performance Review
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

export default FRM00325_SupplierPerformanceReview;
