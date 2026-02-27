// FRM00298_SingleSourceJustification.jsx
// FRM-00298 – Single Source Justification – Request / Initiation Form

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
  preparedBy: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  procurementCategory: Yup.string().required('Required'),
  projectRequirement: Yup.string().required('Required'),
  estimatedValue: Yup.number().typeError('Must be a number').required('Required'),

  // 2. Vendor Details
  proposedVendor: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().required('Required'),
  vendorAddress: Yup.string().required('Required'),
  country: Yup.string().required('Required'),

  // 3. Justification Details
  singleSourceReason: Yup.string().required('Required'),
  marketAnalysisSummary: Yup.string().required('Required'),
  technicalReasons: Yup.string().required('Required'),
  riskAssessment: Yup.string().required('Required'),

  // 4. Commercial Summary
  quotedAmount: Yup.number().typeError('Must be a number').required('Required'),
  currency: Yup.string().required('Required'),
  pricingBenchmark: Yup.string().required('Required'),
  costBreakdownAvailable: Yup.string().required('Required'),

  // 5. Impact & Risk
  impactIfNotApproved: Yup.string().required('Required'),
  mitigationPlan: Yup.string().required('Required'),

  // 6. Authorization
  preparedByApproval: Yup.string().required('Required'),
  departmentHeadApproval: Yup.string().required('Required'),
  procurementReview: Yup.string().required('Required'),
  financeApproval: Yup.string().required('Required'),
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
  preparedBy: '',
  referenceNumber: '',
  procurementCategory: '',
  projectRequirement: '',
  estimatedValue: '',

  proposedVendor: '',
  contactPerson: '',
  email: '',
  phone: '',
  vendorAddress: '',
  country: '',

  singleSourceReason: '',
  marketAnalysisSummary: '',
  technicalReasons: '',
  riskAssessment: '',

  quotedAmount: '',
  currency: '',
  pricingBenchmark: '',
  costBreakdownAvailable: '',

  impactIfNotApproved: '',
  mitigationPlan: '',

  preparedByApproval: '',
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

const FRM00298_SingleSourceJustification = () => {

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
      formId="FRM-00298"
      title="Single Source Justification – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Single source justification submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00298"
              title="Single Source Justification"
              department="Procurement & Purchasing – Requisitions & Sourcing"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'requestDate','Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {field(values,'procurementCategory','Procurement Category')}
                  {field(values,'projectRequirement','Project / Requirement')}
                  {field(values,'estimatedValue','Estimated Value','number')}
                </div>
              </div>

              {/* 2. Vendor Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Vendor Details</h3>
                <div className="form-fields">
                  {field(values,'proposedVendor','Proposed Vendor')}
                  {field(values,'contactPerson','Contact Person')}
                  {field(values,'email','Email','email')}
                  {field(values,'phone','Phone')}
                  {textarea(values,'vendorAddress','Address')}
                  {field(values,'country','Country')}
                </div>
              </div>

              {/* 3. Justification Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Justification Details</h3>
                <div className="form-fields">
                  {textarea(values,'singleSourceReason','Reason for Single Source')}
                  {textarea(values,'marketAnalysisSummary','Market Analysis Summary')}
                  {textarea(values,'technicalReasons','Technical / Compatibility Reasons')}
                  {textarea(values,'riskAssessment','Risk Assessment')}
                </div>
              </div>

              {/* 4. Commercial Summary */}
              <div className="form-section">
                <h3 className="form-section-title">4. Commercial Summary</h3>
                <div className="form-fields">
                  {field(values,'quotedAmount','Quoted Amount','number')}
                  {field(values,'currency','Currency')}
                  {textarea(values,'pricingBenchmark','Pricing Benchmark / Comparison')}
                  {select(values,'costBreakdownAvailable','Cost Breakdown Available',['Yes','No'])}
                </div>
              </div>

              {/* 5. Impact & Risk */}
              <div className="form-section">
                <h3 className="form-section-title">5. Impact & Risk</h3>
                <div className="form-fields">
                  {textarea(values,'impactIfNotApproved','Impact if Not Approved')}
                  {textarea(values,'mitigationPlan','Mitigation Plan')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByApproval','Prepared By (Name & Signature)')}
                  {field(values,'departmentHeadApproval','Department Head Approval')}
                  {field(values,'procurementReview','Procurement Review')}
                  {field(values,'financeApproval','Finance Approval')}
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
                    Submit Single Source Justification
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

export default FRM00298_SingleSourceJustification;
