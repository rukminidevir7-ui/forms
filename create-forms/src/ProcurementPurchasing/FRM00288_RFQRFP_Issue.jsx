// FRM00288_RFQRFP_Issue.jsx
// FRM-00288 – RFQ/RFP Issue – Request / Initiation Form

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
  issueDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  sourcingType: Yup.string().required('Required'),
  procurementCategory: Yup.string().required('Required'),
  submissionDueDate: Yup.string().required('Required'),

  // Project Overview
  projectName: Yup.string().required('Required'),
  businessObjective: Yup.string().required('Required'),
  scopeSummary: Yup.string().required('Required'),

  // Vendor Distribution
  vendorName: Yup.string().required('Required'),
  vendorContactEmail: Yup.string().email('Invalid email').required('Required'),
  vendorCountry: Yup.string().required('Required'),

  // Key Dates
  clarificationDeadline: Yup.string().required('Required'),
  submissionDeadline: Yup.string().required('Required'),
  evaluationPeriod: Yup.string().required('Required'),
  awardDate: Yup.string().required('Required'),
  expectedStartDate: Yup.string().required('Required'),

  // Evaluation Criteria
  technicalCriteria: Yup.string().required('Required'),
  commercialCriteria: Yup.string().required('Required'),
  scoringMethod: Yup.string().required('Required'),

  // Authorization
  preparedByApproval: Yup.string().required('Required'),
  procurementReview: Yup.string().required('Required'),
  departmentHeadApproval: Yup.string().required('Required'),
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

  issueDate: '',
  department: '',
  preparedBy: '',
  referenceNumber: '',
  sourcingType: '',
  procurementCategory: '',
  submissionDueDate: '',

  projectName: '',
  businessObjective: '',
  scopeSummary: '',

  vendorName: '',
  vendorContactEmail: '',
  vendorCountry: '',

  clarificationDeadline: '',
  submissionDeadline: '',
  evaluationPeriod: '',
  awardDate: '',
  expectedStartDate: '',

  technicalCriteria: '',
  commercialCriteria: '',
  scoringMethod: '',

  preparedByApproval: '',
  procurementReview: '',
  departmentHeadApproval: '',
  financeApproval: '',
  approvalComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00288_RFQRFP_Issue = () => {

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
      formId="FRM-00288"
      title="RFQ/RFP Issue – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('RFQ/RFP issue submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00288"
              title="RFQ / RFP Issue"
              department="Procurement & Purchasing – Requisitions & Sourcing"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'issueDate','Issue Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {select(values,'sourcingType','Sourcing Type',['RFQ','RFP'])}
                  {field(values,'procurementCategory','Procurement Category')}
                  {field(values,'submissionDueDate','Submission Due Date','date')}
                </div>
              </div>

              {/* 2. Project / Requirement Overview */}
              <div className="form-section">
                <h3 className="form-section-title">2. Project / Requirement Overview</h3>
                <div className="form-fields">
                  {field(values,'projectName','Project / Requirement Name')}
                  {textarea(values,'businessObjective','Business Objective')}
                  {textarea(values,'scopeSummary','Scope Summary')}
                </div>
              </div>

              {/* 3. Vendor Distribution List */}
              <div className="form-section">
                <h3 className="form-section-title">3. Vendor Distribution List</h3>
                <div className="form-fields">
                  {field(values,'vendorName','Vendor Name')}
                  {field(values,'vendorContactEmail','Contact Email','email')}
                  {field(values,'vendorCountry','Country')}
                </div>
              </div>

              {/* 4. Key Dates & Milestones */}
              <div className="form-section">
                <h3 className="form-section-title">4. Key Dates & Milestones</h3>
                <div className="form-fields">
                  {field(values,'clarificationDeadline','Clarification Deadline','date')}
                  {field(values,'submissionDeadline','Submission Deadline','date')}
                  {field(values,'evaluationPeriod','Evaluation Period')}
                  {field(values,'awardDate','Award Date','date')}
                  {field(values,'expectedStartDate','Expected Start Date','date')}
                </div>
              </div>

              {/* 5. Evaluation Criteria */}
              <div className="form-section">
                <h3 className="form-section-title">5. Evaluation Criteria</h3>
                <div className="form-fields">
                  {textarea(values,'technicalCriteria','Technical Criteria')}
                  {textarea(values,'commercialCriteria','Commercial Criteria')}
                  {textarea(values,'scoringMethod','Weighting / Scoring Method')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByApproval','Prepared By (Name & Signature)')}
                  {field(values,'procurementReview','Procurement Review')}
                  {field(values,'departmentHeadApproval','Department Head Approval')}
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
                    Submit RFQ / RFP Issue
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

export default FRM00288_RFQRFP_Issue;
