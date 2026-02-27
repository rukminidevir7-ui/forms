// SubcontractorEmpanelmentApprovalForm.jsx
// FRM-01107 – Subcontractor Empanelment Approval Form

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

const yesNo = ['Yes', 'No'];

const validationSchema = Yup.object({

  companyName: Yup.string().required('Required'),
  registeredAddress: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  phoneNumber: Yup.string().required('Required'),
  emailId: Yup.string().email('Invalid').required('Required'),
  gstNumber: Yup.string().required('Required'),
  panNumber: Yup.string().required('Required'),

  prequalificationCompleted: Yup.string().required('Required'),
  kycCompleted: Yup.string().required('Required'),
  technicalVerified: Yup.string().required('Required'),
  financialVerified: Yup.string().required('Required'),
  complianceStatus: Yup.string().required('Required'),
  riskCategory: Yup.string().required('Required'),

  empanelmentDecision: Yup.string().required('Required'),
  empanelmentValidity: Yup.string().required('Required'),
  approvedWorkCategory: Yup.string().required('Required'),
  remarksConditions: Yup.string().required('Required'),

  customFields: Yup.array().of(
    Yup.object({
      id: Yup.string(),
      fieldName: Yup.string().required('Required'),
      fieldValue: Yup.string().required('Required')
    })
  ),

  attachments: Yup.array().of(
    Yup.object({
      id: Yup.string(),
      fileName: Yup.string().required('File required')
    })
  ),

  signatures: Yup.array().of(
    Yup.object({
      id: Yup.string(),
      signatureName: Yup.string().required('Required'),
      signatureDate: Yup.string().required('Required'),
      signatureData: Yup.string()
    })
  )

});

const initialValues = {

  companyName: '',
  registeredAddress: '',
  contactPerson: '',
  phoneNumber: '',
  emailId: '',
  gstNumber: '',
  panNumber: '',

  prequalificationCompleted: '',
  kycCompleted: '',
  technicalVerified: '',
  financialVerified: '',
  complianceStatus: '',
  riskCategory: '',

  empanelmentDecision: '',
  empanelmentValidity: '',
  approvedWorkCategory: '',
  remarksConditions: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const SubcontractorEmpanelmentApprovalForm = () => {

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
          <Field as="textarea" name={name} className="form-textarea" rows="2" />
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
            {options.map(o => (
              <option key={o} value={o}>{o}</option>
            ))}
          </Field>
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (

    <ModernFormWrapper
      formId="FRM-01107"
      title="Subcontractor Empanelment Approval Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Subcontractor empanelment approval saved');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-01107"
              title="Subcontractor Empanelment Approval Form"
              department="Subcontractor and Contracting"
            >

              {/* Section 1 */}
              <div className="form-section">
                <h3 className="form-section-title">Subcontractor Details</h3>
                <div className="form-fields">
                  {field(values, 'companyName', 'Company Name')}
                  {field(values, 'contactPerson', 'Contact Person')}
                  {field(values, 'phoneNumber', 'Phone Number')}
                  {field(values, 'emailId', 'Email ID')}
                  {field(values, 'gstNumber', 'GST Number')}
                  {field(values, 'panNumber', 'PAN Number')}
                </div>
                <div className="form-fields">
                  {textarea(values, 'registeredAddress', 'Registered Address')}
                </div>
              </div>

              {/* Section 2 */}
              <div className="form-section">
                <h3 className="form-section-title">Evaluation Summary</h3>
                <div className="form-fields">
                  {select(values, 'prequalificationCompleted', 'Prequalification Completed', yesNo)}
                  {select(values, 'kycCompleted', 'KYC Verification Completed', yesNo)}
                  {select(values, 'technicalVerified', 'Technical Capability Verified', yesNo)}
                  {select(values, 'financialVerified', 'Financial Capability Verified', yesNo)}
                  {field(values, 'complianceStatus', 'Compliance Check Status')}
                  {select(values, 'riskCategory', 'Risk Category', ['Low', 'Medium', 'High'])}
                </div>
              </div>

              {/* Section 3 */}
              <div className="form-section">
                <h3 className="form-section-title">Empanelment Decision</h3>
                <div className="form-fields">
                  {select(values, 'empanelmentDecision', 'Decision', ['Approved', 'Rejected', 'Conditional'])}
                  {field(values, 'empanelmentValidity', 'Empanelment Validity Period')}
                  {field(values, 'approvedWorkCategory', 'Approved Work Category')}
                </div>
                <div className="form-fields">
                  {textarea(values, 'remarksConditions', 'Remarks / Conditions')}
                </div>
              </div>

              {/* ✅ Reusable Global Components */}
              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Approval
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

export default SubcontractorEmpanelmentApprovalForm;
