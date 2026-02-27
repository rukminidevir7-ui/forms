// ScopeofWorkSubcontractorRequestApprovalForm.jsx
// FRM-01110 / FRM-01111 – Scope of Work for Subcontractor Form

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

  // Project Information
  projectName: Yup.string().required('Required'),
  projectLocation: Yup.string().required('Required'),
  clientName: Yup.string().required('Required'),
  projectStartDate: Yup.string().required('Required'),
  projectEndDate: Yup.string().required('Required'),

  // Subcontractor Details
  companyName: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  phoneNumber: Yup.string().required('Required'),
  emailId: Yup.string().email('Invalid').required('Required'),

  // Scope
  detailedScope: Yup.string().required('Required'),
  deliverables: Yup.string().required('Required'),
  milestonesTimeline: Yup.string().required('Required'),
  technicalRequirements: Yup.string().required('Required'),
  qualityRequirements: Yup.string().required('Required'),
  hseRequirements: Yup.string().required('Required'),

  // Commercial
  contractValue: Yup.string().required('Required'),
  paymentTerms: Yup.string().required('Required'),
  billingFrequency: Yup.string().required('Required'),

  // Risks
  keyRisks: Yup.string().required('Required'),
  assumptions: Yup.string().required('Required'),
  dependencies: Yup.string().required('Required'),

  // Requestor
  requestedBy: Yup.string().required('Required'),
  requestorDesignation: Yup.string().required('Required'),
  requestDate: Yup.string().required('Required'),

  // Approval
  reviewedBy: Yup.string().required('Required'),
  reviewerDesignation: Yup.string().required('Required'),
  approvalStatus: Yup.string().required('Required'),
  approvalRemarks: Yup.string().required('Required'),
  approverName: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),

  // Reusable Sections
  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  projectName: '',
  projectLocation: '',
  clientName: '',
  projectStartDate: '',
  projectEndDate: '',

  companyName: '',
  contactPerson: '',
  phoneNumber: '',
  emailId: '',

  detailedScope: '',
  deliverables: '',
  milestonesTimeline: '',
  technicalRequirements: '',
  qualityRequirements: '',
  hseRequirements: '',

  contractValue: '',
  paymentTerms: '',
  billingFrequency: '',

  keyRisks: '',
  assumptions: '',
  dependencies: '',

  requestedBy: '',
  requestorDesignation: '',
  requestDate: '',

  reviewedBy: '',
  reviewerDesignation: '',
  approvalStatus: '',
  approvalRemarks: '',
  approverName: '',
  approvalDate: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const ScopeofWorkSubcontractorRequestApprovalForm = () => {

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
      formId="FRM-01110 / FRM-01111"
      title="Scope of Work for Subcontractor Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Scope of Work form saved successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-01110 / FRM-01111"
              title="Scope of Work for Subcontractor"
              department="Subcontractor & Contracting"
            >

              {/* Project Information */}
              <div className="form-section">
                <h3 className="form-section-title">Project Information</h3>
                <div className="form-fields">
                  {field(values,'projectName','Project Name')}
                  {field(values,'projectLocation','Project Location')}
                  {field(values,'clientName','Client Name')}
                  {field(values,'projectStartDate','Project Start Date','date')}
                  {field(values,'projectEndDate','Project End Date','date')}
                </div>
              </div>

              {/* Subcontractor */}
              <div className="form-section">
                <h3 className="form-section-title">Subcontractor Details</h3>
                <div className="form-fields">
                  {field(values,'companyName','Company Name')}
                  {field(values,'contactPerson','Contact Person')}
                  {field(values,'phoneNumber','Phone Number')}
                  {field(values,'emailId','Email ID')}
                </div>
              </div>

              {/* Scope */}
              <div className="form-section">
                <h3 className="form-section-title">Scope of Work Description</h3>
                <div className="form-fields">
                  {textarea(values,'detailedScope','Detailed Scope')}
                  {textarea(values,'deliverables','Deliverables')}
                  {textarea(values,'milestonesTimeline','Milestones / Timeline')}
                  {textarea(values,'technicalRequirements','Technical Requirements')}
                  {textarea(values,'qualityRequirements','Quality Requirements')}
                  {textarea(values,'hseRequirements','HSE Requirements')}
                </div>
              </div>

              {/* Commercial */}
              <div className="form-section">
                <h3 className="form-section-title">Commercial Information</h3>
                <div className="form-fields">
                  {field(values,'contractValue','Contract Value / Estimated Cost')}
                  {field(values,'paymentTerms','Payment Terms')}
                  {field(values,'billingFrequency','Billing Frequency')}
                </div>
              </div>

              {/* Risks */}
              <div className="form-section">
                <h3 className="form-section-title">Risks / Assumptions / Dependencies</h3>
                <div className="form-fields">
                  {textarea(values,'keyRisks','Key Risks')}
                  {textarea(values,'assumptions','Assumptions')}
                  {textarea(values,'dependencies','Dependencies')}
                </div>
              </div>

              {/* Declaration */}
              <div className="form-section">
                <h3 className="form-section-title">Requestor Declaration</h3>
                <div className="form-fields">
                  {field(values,'requestedBy','Requested By')}
                  {field(values,'requestorDesignation','Designation')}
                  {field(values,'requestDate','Date','date')}
                </div>
              </div>

              {/* Approval */}
              <div className="form-section">
                <h3 className="form-section-title">Approval / Authorization</h3>
                <div className="form-fields">
                  {field(values,'reviewedBy','Reviewed By')}
                  {field(values,'reviewerDesignation','Designation')}
                  {select(values,'approvalStatus','Approved / Rejected',['Approved','Rejected'])}
                  {textarea(values,'approvalRemarks','Remarks')}
                  {field(values,'approverName','Approver Name')}
                  {field(values,'approvalDate','Date','date')}
                </div>
              </div>

              {/* Reusable Components */}
              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Form
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

export default ScopeofWorkSubcontractorRequestApprovalForm;
