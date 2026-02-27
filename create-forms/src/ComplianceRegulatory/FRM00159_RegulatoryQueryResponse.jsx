// FRM00159_RegulatoryQueryResponse.jsx
// FRM-00159 – Regulatory Query Response – Request / Authorization Form

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
  departmentFunction: Yup.string().required('Required'),
  requestedBy: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  queryType: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // Query Details
  regulatoryAuthority: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  queryReceivedDate: Yup.string().required('Required'),
  responseDueDate: Yup.string().required('Required'),
  subject: Yup.string().required('Required'),
  queryDescription: Yup.string().required('Required'),

  // Response Preparation
  responseSummary: Yup.string().required('Required'),
  keyPointsAddressed: Yup.string().required('Required'),
  supportingAnalysis: Yup.string().required('Required'),

  // Review & Validation
  reviewedBy: Yup.string().required('Required'),
  validationMethod: Yup.string().required('Required'),
  issuesIdentified: Yup.string().required('Required'),

  // Authorization
  preparedByAuthorization: Yup.string().required('Required'),
  complianceApproval: Yup.string().required('Required'),
  managementApproval: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  requestDate: '',
  departmentFunction: '',
  requestedBy: '',
  employeeId: '',
  contactNumber: '',
  queryType: '',
  priorityLevel: '',

  regulatoryAuthority: '',
  referenceNumber: '',
  queryReceivedDate: '',
  responseDueDate: '',
  subject: '',
  queryDescription: '',

  responseSummary: '',
  keyPointsAddressed: '',
  supportingAnalysis: '',

  reviewedBy: '',
  validationMethod: '',
  issuesIdentified: '',

  preparedByAuthorization: '',
  complianceApproval: '',
  managementApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00159_RegulatoryQueryResponse = () => {

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
      formId="FRM-00159"
      title="Regulatory Query Response – Request / Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Regulatory query response submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00159"
              title="Regulatory Query Response"
              department="Compliance & Regulatory – Regulatory Filings"
            >

              {/* Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'requestDate','Date','date')}
                  {field(values,'departmentFunction','Department / Function')}
                  {field(values,'requestedBy','Requested By')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'contactNumber','Contact')}
                  {select(values,'queryType','Query Type',['Clarification','Notice','Deficiency Letter','Investigation Query','Information Request'])}
                  {select(values,'priorityLevel','Priority',['Low','Medium','High','Critical'])}
                </div>
              </div>

              {/* Query Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Query Details</h3>
                <div className="form-fields">
                  {field(values,'regulatoryAuthority','Regulatory Authority')}
                  {field(values,'referenceNumber','Reference No.')}
                  {field(values,'queryReceivedDate','Query Received Date','date')}
                  {field(values,'responseDueDate','Response Due Date','date')}
                  {field(values,'subject','Subject')}
                  {textarea(values,'queryDescription','Query Description')}
                </div>
              </div>

              {/* Response Preparation */}
              <div className="form-section">
                <h3 className="form-section-title">3. Response Preparation</h3>
                <div className="form-fields">
                  {textarea(values,'responseSummary','Response Summary')}
                  {textarea(values,'keyPointsAddressed','Key Points Addressed')}
                  {textarea(values,'supportingAnalysis','Supporting Analysis')}
                </div>
              </div>

              {/* Review & Validation */}
              <div className="form-section">
                <h3 className="form-section-title">4. Review & Validation</h3>
                <div className="form-fields">
                  {field(values,'reviewedBy','Reviewed By')}
                  {field(values,'validationMethod','Validation Method')}
                  {textarea(values,'issuesIdentified','Issues / Risks Identified')}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByAuthorization','Prepared By')}
                  {field(values,'complianceApproval','Compliance Approval')}
                  {field(values,'managementApproval','Management Approval')}
                  {field(values,'approvalDate','Approval Date','date')}
                  {textarea(values,'approvalComments','Comments')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Regulatory Query Response
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

export default FRM00159_RegulatoryQueryResponse;
