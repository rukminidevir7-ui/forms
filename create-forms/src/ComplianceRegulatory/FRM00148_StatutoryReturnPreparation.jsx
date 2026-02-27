// FRM00148_StatutoryReturnPreparation.jsx
// FRM-00148 – Statutory Return Preparation – Request / Authorization Form

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
  returnType: Yup.string().required('Required'),
  filingPeriod: Yup.string().required('Required'),

  // Statutory Details
  regulatoryAuthority: Yup.string().required('Required'),
  applicableLaw: Yup.string().required('Required'),
  returnName: Yup.string().required('Required'),
  dueDate: Yup.string().required('Required'),
  frequency: Yup.string().required('Required'),
  submissionMode: Yup.string().required('Required'),

  // Preparation Details
  dataSources: Yup.string().required('Required'),
  responsibleOwner: Yup.string().required('Required'),
  preparationNotes: Yup.string().required('Required'),

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
  returnType: '',
  filingPeriod: '',

  regulatoryAuthority: '',
  applicableLaw: '',
  returnName: '',
  dueDate: '',
  frequency: '',
  submissionMode: '',

  dataSources: '',
  responsibleOwner: '',
  preparationNotes: '',

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

const FRM00148_StatutoryReturnPreparation = () => {

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
      formId="FRM-00148"
      title="Statutory Return Preparation – Request / Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Statutory return preparation submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00148"
              title="Statutory Return Preparation"
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
                  {select(values,'returnType','Return Type',['Tax Return','GST Return','ROC Filing','Labour Law Return','Environmental Filing','Other Regulatory Return'])}
                  {field(values,'filingPeriod','Filing Period')}
                </div>
              </div>

              {/* Statutory Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Statutory Details</h3>
                <div className="form-fields">
                  {field(values,'regulatoryAuthority','Regulatory Authority')}
                  {field(values,'applicableLaw','Applicable Law / Regulation')}
                  {field(values,'returnName','Return Name')}
                  {field(values,'dueDate','Due Date','date')}
                  {select(values,'frequency','Frequency',['Monthly','Quarterly','Half-Yearly','Annually','Ad-Hoc'])}
                  {select(values,'submissionMode','Submission Mode',['Online Portal','Physical Filing','Email Submission','API Submission'])}
                </div>
              </div>

              {/* Preparation Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Preparation Details</h3>
                <div className="form-fields">
                  {textarea(values,'dataSources','Data Sources')}
                  {field(values,'responsibleOwner','Responsible Owner')}
                  {textarea(values,'preparationNotes','Preparation Steps / Notes')}
                </div>
              </div>

              {/* Review & Validation */}
              <div className="form-section">
                <h3 className="form-section-title">4. Review & Validation</h3>
                <div className="form-fields">
                  {field(values,'reviewedBy','Reviewed By')}
                  {field(values,'validationMethod','Validation Method')}
                  {textarea(values,'issuesIdentified','Issues Identified')}
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
                    Submit Statutory Return Preparation
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

export default FRM00148_StatutoryReturnPreparation;
