// FRM00181_ContractAmendment.jsx
// FRM-00181 – Contract Amendment – Request / Initiation Form

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
  requestedBy: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  contactDetails: Yup.string().required('Required'),
  amendmentType: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // 2. Contract Details
  contractName: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  counterpartyName: Yup.string().required('Required'),
  originalEffectiveDate: Yup.string().required('Required'),
  currentExpiryDate: Yup.string().required('Required'),
  businessOwner: Yup.string().required('Required'),

  // 3. Amendment Details
  amendmentEffectiveDate: Yup.string().required('Required'),
  amendmentCategory: Yup.string().required('Required'),
  descriptionOfChanges: Yup.string().required('Required'),
  reasonForAmendment: Yup.string().required('Required'),

  // 4. Impact Assessment
  commercialImpact: Yup.string().required('Required'),
  operationalImpact: Yup.string().required('Required'),
  riskComplianceImpact: Yup.string().required('Required'),

  // 5. Review & Validation
  businessReviewer: Yup.string().required('Required'),
  legalReviewer: Yup.string().required('Required'),
  specialNotes: Yup.string(),

  // 6. Authorization
  requestedByConfirmation: Yup.string().required('Required'),
  businessApproval: Yup.string().required('Required'),
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
  requestedBy: '',
  employeeId: '',
  contactDetails: '',
  amendmentType: '',
  priorityLevel: '',

  contractName: '',
  referenceNumber: '',
  counterpartyName: '',
  originalEffectiveDate: '',
  currentExpiryDate: '',
  businessOwner: '',

  amendmentEffectiveDate: '',
  amendmentCategory: '',
  descriptionOfChanges: '',
  reasonForAmendment: '',

  commercialImpact: '',
  operationalImpact: '',
  riskComplianceImpact: '',

  businessReviewer: '',
  legalReviewer: '',
  specialNotes: '',

  requestedByConfirmation: '',
  businessApproval: '',
  legalApproval: '',
  managementApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00181_ContractAmendment = () => {

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
      formId="FRM-00181"
      title="Contract Amendment – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Contract Amendment request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00181"
              title="Contract Amendment"
              department="Legal & Contracts – Contracting"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'departmentFunction','Department / Function')}
                  {field(values,'requestedBy','Requested By')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'contactDetails','Contact Details')}
                  {select(values,'amendmentType','Amendment Type',['Extension','Commercial Change','Scope Change','Termination Amendment','Other'])}
                  {select(values,'priorityLevel','Priority',['Standard','High','Urgent'])}
                </div>
              </div>

              {/* 2. Contract Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Contract Details</h3>
                <div className="form-fields">
                  {field(values,'contractName','Contract Name')}
                  {field(values,'referenceNumber','Reference Number')}
                  {field(values,'counterpartyName','Counterparty')}
                  {field(values,'originalEffectiveDate','Original Effective Date','date')}
                  {field(values,'currentExpiryDate','Current Expiry Date','date')}
                  {field(values,'businessOwner','Business Owner')}
                </div>
              </div>

              {/* 3. Amendment Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Amendment Details</h3>
                <div className="form-fields">
                  {field(values,'amendmentEffectiveDate','Amendment Effective Date','date')}
                  {select(values,'amendmentCategory','Amendment Category',['Commercial','Operational','Legal','Regulatory'])}
                  {textarea(values,'descriptionOfChanges','Description of Changes')}
                  {textarea(values,'reasonForAmendment','Reason for Amendment')}
                </div>
              </div>

              {/* 4. Impact Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">4. Impact Assessment</h3>
                <div className="form-fields">
                  {textarea(values,'commercialImpact','Commercial Impact')}
                  {textarea(values,'operationalImpact','Operational Impact')}
                  {textarea(values,'riskComplianceImpact','Risk / Compliance Impact')}
                </div>
              </div>

              {/* 5. Review & Validation */}
              <div className="form-section">
                <h3 className="form-section-title">5. Review & Validation</h3>
                <div className="form-fields">
                  {field(values,'businessReviewer','Reviewed By (Business)')}
                  {field(values,'legalReviewer','Reviewed By (Legal)')}
                  {textarea(values,'specialNotes','Special Notes / Clauses')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requestedByConfirmation','Requested By (Name)')}
                  {field(values,'businessApproval','Business Approval')}
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
                    Submit Contract Amendment
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

export default FRM00181_ContractAmendment;
