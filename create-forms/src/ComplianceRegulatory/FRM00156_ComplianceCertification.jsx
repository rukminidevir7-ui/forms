// FRM00156_ComplianceCertification.jsx
// FRM-00156 – Compliance Certification – Request / Authorization Form

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
  certificationType: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // Certification Details
  certificationName: Yup.string().required('Required'),
  regulatoryBody: Yup.string().required('Required'),
  applicableStandard: Yup.string().required('Required'),
  certificationPeriod: Yup.string().required('Required'),
  effectiveDate: Yup.string().required('Required'),
  expiryDate: Yup.string().required('Required'),

  // Scope & Requirements
  scope: Yup.string().required('Required'),
  keyComplianceRequirements: Yup.string().required('Required'),
  assessmentMethod: Yup.string().required('Required'),

  // Preparation & Review
  responsibleOwner: Yup.string().required('Required'),
  preparationNotes: Yup.string().required('Required'),
  reviewedBy: Yup.string().required('Required'),

  // Authorization
  requestedByAuthorization: Yup.string().required('Required'),
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
  certificationType: '',
  priorityLevel: '',

  certificationName: '',
  regulatoryBody: '',
  applicableStandard: '',
  certificationPeriod: '',
  effectiveDate: '',
  expiryDate: '',

  scope: '',
  keyComplianceRequirements: '',
  assessmentMethod: '',

  responsibleOwner: '',
  preparationNotes: '',
  reviewedBy: '',

  requestedByAuthorization: '',
  complianceApproval: '',
  managementApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00156_ComplianceCertification = () => {

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
      formId="FRM-00156"
      title="Compliance Certification – Request / Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Compliance certification request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00156"
              title="Compliance Certification"
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
                  {select(values,'certificationType','Certification Type',['Initial Certification','Renewal Certification','Surveillance Audit','Re-Certification'])}
                  {select(values,'priorityLevel','Priority',['Low','Medium','High','Critical'])}
                </div>
              </div>

              {/* Certification Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Certification Details</h3>
                <div className="form-fields">
                  {field(values,'certificationName','Certification Name')}
                  {field(values,'regulatoryBody','Regulatory / Standard Body')}
                  {field(values,'applicableStandard','Applicable Regulation / Standard')}
                  {field(values,'certificationPeriod','Certification Period')}
                  {field(values,'effectiveDate','Effective Date','date')}
                  {field(values,'expiryDate','Expiry Date','date')}
                </div>
              </div>

              {/* Scope & Requirements */}
              <div className="form-section">
                <h3 className="form-section-title">3. Scope & Requirements</h3>
                <div className="form-fields">
                  {textarea(values,'scope','Scope')}
                  {textarea(values,'keyComplianceRequirements','Key Compliance Requirements')}
                  {field(values,'assessmentMethod','Assessment Method')}
                </div>
              </div>

              {/* Preparation & Review */}
              <div className="form-section">
                <h3 className="form-section-title">4. Preparation & Review</h3>
                <div className="form-fields">
                  {field(values,'responsibleOwner','Responsible Owner')}
                  {textarea(values,'preparationNotes','Preparation Steps / Notes')}
                  {field(values,'reviewedBy','Reviewed By')}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requestedByAuthorization','Requested By')}
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
                    Submit Compliance Certification
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

export default FRM00156_ComplianceCertification;
