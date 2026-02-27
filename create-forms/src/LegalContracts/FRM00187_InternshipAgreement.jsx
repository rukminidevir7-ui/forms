// FRM00187_InternshipAgreement.jsx
// FRM-00187 – Internship Agreement – Request / Authorization Form

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
  departmentFunction: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  contactDetails: Yup.string().required('Required'),
  agreementType: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // 2. Intern Details
  internName: Yup.string().required('Required'),
  internId: Yup.string(),
  educationalInstitution: Yup.string().required('Required'),
  programDegree: Yup.string().required('Required'),
  internEmailPhone: Yup.string().required('Required'),
  internAddress: Yup.string().required('Required'),

  // 3. Internship Details
  internshipTitle: Yup.string().required('Required'),
  internshipDepartment: Yup.string().required('Required'),
  startDate: Yup.string().required('Required'),
  endDate: Yup.string().required('Required'),
  workLocationMode: Yup.string().required('Required'),
  supervisorName: Yup.string().required('Required'),

  // 4. Scope & Learning Objectives
  scopeOfWork: Yup.string().required('Required'),
  learningObjectives: Yup.string().required('Required'),
  keyDeliverables: Yup.string().required('Required'),

  // 5. Stipend & Benefits
  stipendAmount: Yup.string().required('Required'),
  stipendCurrency: Yup.string().required('Required'),
  paymentFrequency: Yup.string().required('Required'),
  benefits: Yup.string(),
  reimbursements: Yup.string(),
  otherCompensation: Yup.string(),

  // 6. Policies & Compliance
  companyPoliciesApplicable: Yup.string().required('Required'),
  confidentialityRequirements: Yup.string().required('Required'),
  complianceRequirements: Yup.string().required('Required'),

  // 7. Authorization
  preparedByConfirmation: Yup.string().required('Required'),
  hrApproval: Yup.string().required('Required'),
  legalApproval: Yup.string().required('Required'),
  supervisorApproval: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  requestDate: '',
  departmentFunction: '',
  preparedBy: '',
  employeeId: '',
  contactDetails: '',
  agreementType: '',
  priorityLevel: '',

  internName: '',
  internId: '',
  educationalInstitution: '',
  programDegree: '',
  internEmailPhone: '',
  internAddress: '',

  internshipTitle: '',
  internshipDepartment: '',
  startDate: '',
  endDate: '',
  workLocationMode: '',
  supervisorName: '',

  scopeOfWork: '',
  learningObjectives: '',
  keyDeliverables: '',

  stipendAmount: '',
  stipendCurrency: '',
  paymentFrequency: '',
  benefits: '',
  reimbursements: '',
  otherCompensation: '',

  companyPoliciesApplicable: '',
  confidentialityRequirements: '',
  complianceRequirements: '',

  preparedByConfirmation: '',
  hrApproval: '',
  legalApproval: '',
  supervisorApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00187_InternshipAgreement = () => {

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
      formId="FRM-00187"
      title="Internship Agreement – Request / Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Internship Agreement form submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00187"
              title="Internship Agreement"
              department="Legal & Contracts – Employment Legal"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'departmentFunction','Department / Function')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'contactDetails','Contact Details')}
                  {select(values,'agreementType','Agreement Type',['New Internship','Extension','Conversion'])}
                  {select(values,'priorityLevel','Priority',['Standard','High','Urgent'])}
                </div>
              </div>

              {/* 2. Intern Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Intern Details</h3>
                <div className="form-fields">
                  {field(values,'internName','Intern Name')}
                  {field(values,'internId','Intern ID (if applicable)')}
                  {field(values,'educationalInstitution','Educational Institution')}
                  {field(values,'programDegree','Program / Degree')}
                  {field(values,'internEmailPhone','Email / Phone')}
                  {field(values,'internAddress','Address')}
                </div>
              </div>

              {/* 3. Internship Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Internship Details</h3>
                <div className="form-fields">
                  {field(values,'internshipTitle','Internship Title')}
                  {field(values,'internshipDepartment','Department')}
                  {field(values,'startDate','Start Date','date')}
                  {field(values,'endDate','End Date','date')}
                  {field(values,'workLocationMode','Work Location / Mode')}
                  {field(values,'supervisorName','Supervisor')}
                </div>
              </div>

              {/* 4. Scope & Learning Objectives */}
              <div className="form-section">
                <h3 className="form-section-title">4. Scope & Learning Objectives</h3>
                <div className="form-fields">
                  {textarea(values,'scopeOfWork','Scope of Work')}
                  {textarea(values,'learningObjectives','Learning Objectives')}
                  {textarea(values,'keyDeliverables','Key Deliverables')}
                </div>
              </div>

              {/* 5. Stipend & Benefits */}
              <div className="form-section">
                <h3 className="form-section-title">5. Stipend & Benefits</h3>
                <div className="form-fields">
                  {field(values,'stipendAmount','Stipend Amount')}
                  {field(values,'stipendCurrency','Currency')}
                  {field(values,'paymentFrequency','Payment Frequency')}
                  {textarea(values,'benefits','Benefits (if any)')}
                  {textarea(values,'reimbursements','Reimbursements')}
                  {textarea(values,'otherCompensation','Other Compensation')}
                </div>
              </div>

              {/* 6. Policies & Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">6. Policies & Compliance</h3>
                <div className="form-fields">
                  {textarea(values,'companyPoliciesApplicable','Company Policies Applicable')}
                  {textarea(values,'confidentialityRequirements','Confidentiality Requirements')}
                  {textarea(values,'complianceRequirements','Compliance Requirements')}
                </div>
              </div>

              {/* 7. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">7. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByConfirmation','Prepared By (Name)')}
                  {field(values,'hrApproval','HR Approval')}
                  {field(values,'legalApproval','Legal Approval')}
                  {field(values,'supervisorApproval','Supervisor Approval')}
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
                    Submit Internship Agreement
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

export default FRM00187_InternshipAgreement;
