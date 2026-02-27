// FRM00184_ContractRegisterUpdate.jsx
// FRM-00184 – Contract Register Update – Log / Register Form

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
  updateDate: Yup.string().required('Required'),
  departmentFunction: Yup.string().required('Required'),
  updatedBy: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  contactDetails: Yup.string().required('Required'),
  updateType: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // 2. Contract Details
  contractName: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  counterpartyName: Yup.string().required('Required'),
  businessOwner: Yup.string().required('Required'),
  effectiveDate: Yup.string().required('Required'),
  expiryDate: Yup.string().required('Required'),

  // 3. Update Details
  fieldUpdated: Yup.string().required('Required'),
  previousValue: Yup.string().required('Required'),
  newValue: Yup.string().required('Required'),
  reasonForUpdate: Yup.string().required('Required'),

  // 4. Validation
  reviewerName: Yup.string().required('Required'),
  validationNotes: Yup.string().required('Required'),

  // 5. Authorization
  updatedByConfirmation: Yup.string().required('Required'),
  businessApproval: Yup.string().required('Required'),
  legalApproval: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  updateDate: '',
  departmentFunction: '',
  updatedBy: '',
  employeeId: '',
  contactDetails: '',
  updateType: '',
  priorityLevel: '',

  contractName: '',
  referenceNumber: '',
  counterpartyName: '',
  businessOwner: '',
  effectiveDate: '',
  expiryDate: '',

  fieldUpdated: '',
  previousValue: '',
  newValue: '',
  reasonForUpdate: '',

  reviewerName: '',
  validationNotes: '',

  updatedByConfirmation: '',
  businessApproval: '',
  legalApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00184_ContractRegisterUpdate = () => {

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
      formId="FRM-00184"
      title="Contract Register Update – Log / Register Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Contract Register Update submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00184"
              title="Contract Register Update"
              department="Legal & Contracts – Contracting"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'updateDate','Update Date','date')}
                  {field(values,'departmentFunction','Department / Function')}
                  {field(values,'updatedBy','Updated By')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'contactDetails','Contact Details')}
                  {select(values,'updateType','Update Type',['Data Correction','Renewal Update','Amendment Update','Termination Update','Status Change'])}
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
                  {field(values,'businessOwner','Business Owner')}
                  {field(values,'effectiveDate','Effective Date','date')}
                  {field(values,'expiryDate','Expiry Date','date')}
                </div>
              </div>

              {/* 3. Update Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Update Details</h3>
                <div className="form-fields">
                  {field(values,'fieldUpdated','Field Updated')}
                  {textarea(values,'previousValue','Previous Value')}
                  {textarea(values,'newValue','New Value')}
                  {textarea(values,'reasonForUpdate','Reason for Update')}
                </div>
              </div>

              {/* 4. Validation */}
              <div className="form-section">
                <h3 className="form-section-title">4. Validation</h3>
                <div className="form-fields">
                  {field(values,'reviewerName','Reviewed By')}
                  {textarea(values,'validationNotes','Validation Notes')}
                </div>
              </div>

              {/* 5. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'updatedByConfirmation','Updated By (Name)')}
                  {field(values,'businessApproval','Business Approval')}
                  {field(values,'legalApproval','Legal Approval')}
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
                    Submit Register Update
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

export default FRM00184_ContractRegisterUpdate;
