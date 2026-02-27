// FRM00185_EmploymentAgreement.jsx
// FRM-00185 – Employment Agreement – Request / Authorization Form

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

  // 2. Employee Details
  employeeName: Yup.string().required('Required'),
  employeeNumber: Yup.string().required('Required'),
  jobTitle: Yup.string().required('Required'),
  employeeDepartment: Yup.string().required('Required'),
  reportingManager: Yup.string().required('Required'),
  workLocation: Yup.string().required('Required'),

  // 3. Employment Terms
  startDate: Yup.string().required('Required'),
  endDate: Yup.string(),
  employmentType: Yup.string().required('Required'),
  probationPeriod: Yup.string().required('Required'),
  workingHours: Yup.string().required('Required'),
  noticePeriod: Yup.string().required('Required'),

  // 4. Compensation & Benefits
  baseSalary: Yup.string().required('Required'),
  salaryCurrency: Yup.string().required('Required'),
  bonusIncentives: Yup.string(),
  benefits: Yup.string().required('Required'),
  paymentFrequency: Yup.string().required('Required'),
  otherCompensation: Yup.string(),

  // 5. Obligations & Policies
  keyResponsibilities: Yup.string().required('Required'),
  companyPoliciesApplicable: Yup.string().required('Required'),
  confidentialityNonCompete: Yup.string().required('Required'),

  // 6. Risk & Compliance
  legalConsiderations: Yup.string().required('Required'),
  complianceRequirements: Yup.string().required('Required'),
  specialTermsClauses: Yup.string(),

  // 7. Authorization
  preparedByConfirmation: Yup.string().required('Required'),
  hrApproval: Yup.string().required('Required'),
  legalApproval: Yup.string().required('Required'),
  managementApproval: Yup.string().required('Required'),
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

  employeeName: '',
  employeeNumber: '',
  jobTitle: '',
  employeeDepartment: '',
  reportingManager: '',
  workLocation: '',

  startDate: '',
  endDate: '',
  employmentType: '',
  probationPeriod: '',
  workingHours: '',
  noticePeriod: '',

  baseSalary: '',
  salaryCurrency: '',
  bonusIncentives: '',
  benefits: '',
  paymentFrequency: '',
  otherCompensation: '',

  keyResponsibilities: '',
  companyPoliciesApplicable: '',
  confidentialityNonCompete: '',

  legalConsiderations: '',
  complianceRequirements: '',
  specialTermsClauses: '',

  preparedByConfirmation: '',
  hrApproval: '',
  legalApproval: '',
  managementApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00185_EmploymentAgreement = () => {

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
      formId="FRM-00185"
      title="Employment Agreement – Request / Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Employment Agreement form submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00185"
              title="Employment Agreement"
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
                  {select(values,'agreementType','Agreement Type',['New Hire','Renewal','Conversion','Amendment'])}
                  {select(values,'priorityLevel','Priority',['Standard','High','Urgent'])}
                </div>
              </div>

              {/* 2. Employee Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Employee Details</h3>
                <div className="form-fields">
                  {field(values,'employeeName','Employee Name')}
                  {field(values,'employeeNumber','Employee Number')}
                  {field(values,'jobTitle','Job Title')}
                  {field(values,'employeeDepartment','Department')}
                  {field(values,'reportingManager','Manager / Supervisor')}
                  {field(values,'workLocation','Work Location')}
                </div>
              </div>

              {/* 3. Employment Terms */}
              <div className="form-section">
                <h3 className="form-section-title">3. Employment Terms</h3>
                <div className="form-fields">
                  {field(values,'startDate','Start Date','date')}
                  {field(values,'endDate','End Date (if applicable)','date')}
                  {select(values,'employmentType','Employment Type',['Permanent','Fixed-Term','Contract','Part-Time'])}
                  {field(values,'probationPeriod','Probation Period (Months)')}
                  {field(values,'workingHours','Working Hours')}
                  {field(values,'noticePeriod','Notice Period (Days)')}
                </div>
              </div>

              {/* 4. Compensation & Benefits */}
              <div className="form-section">
                <h3 className="form-section-title">4. Compensation & Benefits</h3>
                <div className="form-fields">
                  {field(values,'baseSalary','Base Salary')}
                  {field(values,'salaryCurrency','Currency')}
                  {field(values,'paymentFrequency','Payment Frequency')}
                  {textarea(values,'bonusIncentives','Bonus / Incentives')}
                  {textarea(values,'benefits','Benefits')}
                  {textarea(values,'otherCompensation','Other Compensation')}
                </div>
              </div>

              {/* 5. Obligations & Policies */}
              <div className="form-section">
                <h3 className="form-section-title">5. Obligations & Policies</h3>
                <div className="form-fields">
                  {textarea(values,'keyResponsibilities','Key Responsibilities')}
                  {textarea(values,'companyPoliciesApplicable','Company Policies Applicable')}
                  {textarea(values,'confidentialityNonCompete','Confidentiality / Non-Compete Terms')}
                </div>
              </div>

              {/* 6. Risk & Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">6. Risk & Compliance</h3>
                <div className="form-fields">
                  {textarea(values,'legalConsiderations','Legal Considerations')}
                  {textarea(values,'complianceRequirements','Compliance Requirements')}
                  {textarea(values,'specialTermsClauses','Special Terms / Clauses')}
                </div>
              </div>

              {/* 7. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">7. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByConfirmation','Prepared By (Name)')}
                  {field(values,'hrApproval','HR Approval')}
                  {field(values,'legalApproval','Legal Approval')}
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
                    Submit Employment Agreement
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

export default FRM00185_EmploymentAgreement;
