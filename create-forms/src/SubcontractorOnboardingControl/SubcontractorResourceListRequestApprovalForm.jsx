// SubcontractorResourceListRequestApprovalForm.jsx
// FRM-01115 / FRM-01116 – Subcontractor Resource List Form

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

  // Project Info
  projectName: Yup.string().required('Required'),
  projectLocation: Yup.string().required('Required'),
  clientName: Yup.string().required('Required'),
  submissionDate: Yup.string().required('Required'),

  // Subcontractor
  companyName: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  phoneNumber: Yup.string().required('Required'),
  emailId: Yup.string().email('Invalid').required('Required'),

  // Resource Details
  resourceType: Yup.string().required('Required'),
  resourceDescription: Yup.string().required('Required'),
  quantity: Yup.string().required('Required'),
  qualificationSpecification: Yup.string().required('Required'),
  deploymentStartDate: Yup.string().required('Required'),
  deploymentEndDate: Yup.string().required('Required'),

  // Remarks
  comments: Yup.string().required('Required'),

  // Request
  requestedBy: Yup.string().required('Required'),
  requesterDesignation: Yup.string().required('Required'),
  requestDate: Yup.string().required('Required'),

  // Approval
  reviewedBy: Yup.string().required('Required'),
  reviewerDesignation: Yup.string().required('Required'),
  approvalStatus: Yup.string().required('Required'),
  approvalRemarks: Yup.string().required('Required'),
  approverName: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),

  // Universal components
  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  projectName: '',
  projectLocation: '',
  clientName: '',
  submissionDate: '',

  companyName: '',
  contactPerson: '',
  phoneNumber: '',
  emailId: '',

  resourceType: '',
  resourceDescription: '',
  quantity: '',
  qualificationSpecification: '',
  deploymentStartDate: '',
  deploymentEndDate: '',

  comments: '',

  requestedBy: '',
  requesterDesignation: '',
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

const SubcontractorResourceListRequestApprovalForm = () => {

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
            {options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </Field>
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (

    <ModernFormWrapper
      formId="FRM-01115 / FRM-01116"
      title="Subcontractor Resource List Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Resource list form submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-01115 / FRM-01116"
              title="Subcontractor Resource List Request / Approval Form"
              department="Subcontractor & Contracting"
            >

              {/* Project Info */}
              <div className="form-section">
                <h3 className="form-section-title">Project Information</h3>
                <div className="form-fields">
                  {field(values,'projectName','Project Name')}
                  {field(values,'projectLocation','Project Location')}
                  {field(values,'clientName','Client Name')}
                  {field(values,'submissionDate','Submission Date','date')}
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

              {/* Resource Details */}
              <div className="form-section">
                <h3 className="form-section-title">Resource Details</h3>
                <div className="form-fields">
                  {select(values,'resourceType','Resource Type',['Manpower','Equipment'])}
                  {field(values,'resourceDescription','Resource Name / Description')}
                  {field(values,'quantity','Quantity')}
                  {field(values,'qualificationSpecification','Qualification / Specification')}
                  {field(values,'deploymentStartDate','Deployment Start Date','date')}
                  {field(values,'deploymentEndDate','Deployment End Date','date')}
                </div>
              </div>

              {/* Remarks */}
              <div className="form-section">
                <h3 className="form-section-title">Remarks / Notes</h3>
                <div className="form-fields">
                  {textarea(values,'comments','Comments')}
                </div>
              </div>

              {/* Requestor */}
              <div className="form-section">
                <h3 className="form-section-title">Requestor Declaration</h3>
                <div className="form-fields">
                  {field(values,'requestedBy','Requested By (Name)')}
                  {field(values,'requesterDesignation','Designation')}
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

              {/* Universal Components */}
              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Resource List
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

export default SubcontractorResourceListRequestApprovalForm;
