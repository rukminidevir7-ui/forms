// FRM00322_SupplierEvaluation.jsx
// FRM-00322 – Supplier Evaluation – Request / Initiation Form

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
  evaluationDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  evaluatedBy: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  evaluationPeriod: Yup.string().required('Required'),

  // 2. Supplier Details
  supplierName: Yup.string().required('Required'),
  supplierId: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
  contractReference: Yup.string().required('Required'),
  location: Yup.string().required('Required'),

  // 3. Performance Evaluation (Scores 1–5)
  qualityScore: Yup.number().min(1).max(5).required('Required'),
  qualityComments: Yup.string().required('Required'),
  deliveryScore: Yup.number().min(1).max(5).required('Required'),
  deliveryComments: Yup.string().required('Required'),
  costScore: Yup.number().min(1).max(5).required('Required'),
  costComments: Yup.string().required('Required'),
  responsivenessScore: Yup.number().min(1).max(5).required('Required'),
  responsivenessComments: Yup.string().required('Required'),
  complianceScore: Yup.number().min(1).max(5).required('Required'),
  complianceComments: Yup.string().required('Required'),

  // 4. Overall Assessment
  overallScore: Yup.number().min(1).max(5).required('Required'),
  strengths: Yup.string().required('Required'),
  improvementAreas: Yup.string().required('Required'),
  recommendation: Yup.string().required('Required'),

  // 5. Risk & Compliance
  riskRating: Yup.string().required('Required'),
  complianceIssues: Yup.string().required('Required'),
  correctiveActions: Yup.string().required('Required'),

  // 6. Authorization
  evaluatorApproval: Yup.string().required('Required'),
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

  evaluationDate: '',
  department: '',
  evaluatedBy: '',
  referenceNumber: '',
  evaluationPeriod: '',

  supplierName: '',
  supplierId: '',
  contactPerson: '',
  category: '',
  contractReference: '',
  location: '',

  qualityScore: '',
  qualityComments: '',
  deliveryScore: '',
  deliveryComments: '',
  costScore: '',
  costComments: '',
  responsivenessScore: '',
  responsivenessComments: '',
  complianceScore: '',
  complianceComments: '',

  overallScore: '',
  strengths: '',
  improvementAreas: '',
  recommendation: '',

  riskRating: '',
  complianceIssues: '',
  correctiveActions: '',

  evaluatorApproval: '',
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

const FRM00322_SupplierEvaluation = () => {

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
      formId="FRM-00322"
      title="Supplier Evaluation – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Supplier evaluation submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00322"
              title="Supplier Evaluation"
              department="Procurement & Purchasing – Supplier Management"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'evaluationDate','Evaluation Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'evaluatedBy','Evaluated By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {field(values,'evaluationPeriod','Evaluation Period')}
                </div>
              </div>

              {/* 2. Supplier Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Supplier Details</h3>
                <div className="form-fields">
                  {field(values,'supplierName','Supplier Name')}
                  {field(values,'supplierId','Supplier ID')}
                  {field(values,'contactPerson','Contact Person')}
                  {field(values,'category','Category')}
                  {field(values,'contractReference','Contract / PO Reference')}
                  {field(values,'location','Location')}
                </div>
              </div>

              {/* 3. Performance Evaluation */}
              <div className="form-section">
                <h3 className="form-section-title">3. Performance Evaluation</h3>
                <div className="form-fields">
                  {field(values,'qualityScore','Quality of Goods / Services (1–5)','number')}
                  {textarea(values,'qualityComments','Comments')}
                  {field(values,'deliveryScore','Delivery Timeliness (1–5)','number')}
                  {textarea(values,'deliveryComments','Comments')}
                  {field(values,'costScore','Cost Competitiveness (1–5)','number')}
                  {textarea(values,'costComments','Comments')}
                  {field(values,'responsivenessScore','Responsiveness (1–5)','number')}
                  {textarea(values,'responsivenessComments','Comments')}
                  {field(values,'complianceScore','Compliance (1–5)','number')}
                  {textarea(values,'complianceComments','Comments')}
                </div>
              </div>

              {/* 4. Overall Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">4. Overall Assessment</h3>
                <div className="form-fields">
                  {field(values,'overallScore','Overall Score (1–5)','number')}
                  {textarea(values,'strengths','Strengths')}
                  {textarea(values,'improvementAreas','Areas for Improvement')}
                  {select(values,'recommendation','Recommendation',['Continue','Review','Discontinue'])}
                </div>
              </div>

              {/* 5. Risk & Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">5. Risk & Compliance</h3>
                <div className="form-fields">
                  {select(values,'riskRating','Risk Rating',['Low','Medium','High','Critical'])}
                  {textarea(values,'complianceIssues','Compliance Issues Identified')}
                  {textarea(values,'correctiveActions','Corrective Actions Required')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'evaluatorApproval','Evaluated By (Name & Signature)')}
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
                    Submit Supplier Evaluation
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

export default FRM00322_SupplierEvaluation;
