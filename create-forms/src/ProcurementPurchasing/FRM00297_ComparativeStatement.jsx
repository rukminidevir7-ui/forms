// FRM00297_ComparativeStatement.jsx
// FRM-00297 – Comparative Statement (CS) – Report / Record

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
  reportDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  rfqReference: Yup.string().required('Required'),
  procurementCategory: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  evaluationMethod: Yup.string().required('Required'),

  // 2. Vendors Compared
  vendorName: Yup.string().required('Required'),
  bidReference: Yup.string().required('Required'),
  quotedAmount: Yup.number().typeError('Must be a number').required('Required'),
  currency: Yup.string().required('Required'),
  vendorRank: Yup.number().typeError('Must be a number').required('Required'),

  // 3. Technical Evaluation Summary
  technicalCriteria: Yup.string().required('Required'),
  complianceSummary: Yup.string().required('Required'),
  technicalScore: Yup.string().required('Required'),

  // 4. Commercial Evaluation Summary
  priceComparisonNotes: Yup.string().required('Required'),
  commercialDeviations: Yup.string().required('Required'),
  totalCostOwnershipNotes: Yup.string().required('Required'),

  // 5. Recommendation
  recommendedVendor: Yup.string().required('Required'),
  recommendationJustification: Yup.string().required('Required'),

  // 6. Authorization
  preparedByApproval: Yup.string().required('Required'),
  procurementReview: Yup.string().required('Required'),
  departmentApproval: Yup.string().required('Required'),
  financeApproval: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  // 7. Supporting Information
  supportingDocuments: Yup.string(),
  additionalNotes: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  reportDate: '',
  department: '',
  preparedBy: '',
  rfqReference: '',
  procurementCategory: '',
  referenceNumber: '',
  evaluationMethod: '',

  vendorName: '',
  bidReference: '',
  quotedAmount: '',
  currency: '',
  vendorRank: '',

  technicalCriteria: '',
  complianceSummary: '',
  technicalScore: '',

  priceComparisonNotes: '',
  commercialDeviations: '',
  totalCostOwnershipNotes: '',

  recommendedVendor: '',
  recommendationJustification: '',

  preparedByApproval: '',
  procurementReview: '',
  departmentApproval: '',
  financeApproval: '',
  approvalComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00297_ComparativeStatement = () => {

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
      formId="FRM-00297"
      title="Comparative Statement (CS) – Report / Record"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Comparative statement submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00297"
              title="Comparative Statement (CS)"
              department="Procurement & Purchasing – Requisitions & Sourcing"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'reportDate','Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'rfqReference','RFQ/RFP Reference')}
                  {field(values,'procurementCategory','Procurement Category')}
                  {field(values,'referenceNumber','Reference Number')}
                  {field(values,'evaluationMethod','Evaluation Method')}
                </div>
              </div>

              {/* 2. Vendors Compared */}
              <div className="form-section">
                <h3 className="form-section-title">2. Vendors Compared</h3>
                <div className="form-fields">
                  {field(values,'vendorName','Vendor Name')}
                  {field(values,'bidReference','Bid Reference')}
                  {field(values,'quotedAmount','Quoted Amount','number')}
                  {field(values,'currency','Currency')}
                  {field(values,'vendorRank','Rank','number')}
                </div>
              </div>

              {/* 3. Technical Evaluation Summary */}
              <div className="form-section">
                <h3 className="form-section-title">3. Technical Evaluation Summary</h3>
                <div className="form-fields">
                  {textarea(values,'technicalCriteria','Technical Criteria')}
                  {textarea(values,'complianceSummary','Compliance Summary')}
                  {field(values,'technicalScore','Score / Rating')}
                </div>
              </div>

              {/* 4. Commercial Evaluation Summary */}
              <div className="form-section">
                <h3 className="form-section-title">4. Commercial Evaluation Summary</h3>
                <div className="form-fields">
                  {textarea(values,'priceComparisonNotes','Price Comparison Notes')}
                  {textarea(values,'commercialDeviations','Commercial Deviations')}
                  {textarea(values,'totalCostOwnershipNotes','Total Cost of Ownership Notes')}
                </div>
              </div>

              {/* 5. Recommendation */}
              <div className="form-section">
                <h3 className="form-section-title">5. Recommendation</h3>
                <div className="form-fields">
                  {field(values,'recommendedVendor','Recommended Vendor')}
                  {textarea(values,'recommendationJustification','Justification')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByApproval','Prepared By (Name & Signature)')}
                  {field(values,'procurementReview','Procurement Review')}
                  {field(values,'departmentApproval','Department Approval')}
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
                    Submit Comparative Statement
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

export default FRM00297_ComparativeStatement;
