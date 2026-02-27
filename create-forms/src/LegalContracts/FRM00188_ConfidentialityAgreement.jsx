// FRM00188_ConfidentialityAgreement.jsx
// FRM-00188 – Confidentiality Agreement – Request / Authorization Form

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

  // 2. Party Details
  disclosingPartyName: Yup.string().required('Required'),
  receivingPartyName: Yup.string().required('Required'),
  counterpartyAddress: Yup.string().required('Required'),
  counterpartyContactPerson: Yup.string().required('Required'),
  counterpartyEmailPhone: Yup.string().required('Required'),
  counterpartyJurisdiction: Yup.string().required('Required'),

  // 3. Agreement Scope
  purposeOfDisclosure: Yup.string().required('Required'),
  confidentialInformationDescription: Yup.string().required('Required'),
  permittedUse: Yup.string().required('Required'),

  // 4. Term & Obligations
  effectiveDate: Yup.string().required('Required'),
  expirationDate: Yup.string().required('Required'),
  confidentialityPeriod: Yup.string().required('Required'),
  returnDestructionRequirement: Yup.string().required('Required'),
  nonDisclosureObligations: Yup.string().required('Required'),
  exceptions: Yup.string().required('Required'),

  // 5. Risk & Compliance
  keyRisksIdentified: Yup.string().required('Required'),
  complianceRequirements: Yup.string().required('Required'),
  specialClauses: Yup.string(),

  // 6. Authorization
  preparedByConfirmation: Yup.string().required('Required'),
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
  preparedBy: '',
  employeeId: '',
  contactDetails: '',
  agreementType: '',
  priorityLevel: '',

  disclosingPartyName: '',
  receivingPartyName: '',
  counterpartyAddress: '',
  counterpartyContactPerson: '',
  counterpartyEmailPhone: '',
  counterpartyJurisdiction: '',

  purposeOfDisclosure: '',
  confidentialInformationDescription: '',
  permittedUse: '',

  effectiveDate: '',
  expirationDate: '',
  confidentialityPeriod: '',
  returnDestructionRequirement: '',
  nonDisclosureObligations: '',
  exceptions: '',

  keyRisksIdentified: '',
  complianceRequirements: '',
  specialClauses: '',

  preparedByConfirmation: '',
  businessApproval: '',
  legalApproval: '',
  managementApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00188_ConfidentialityAgreement = () => {

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
      formId="FRM-00188"
      title="Confidentiality Agreement – Request / Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Confidentiality Agreement form submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00188"
              title="Confidentiality Agreement"
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
                  {select(values,'agreementType','Agreement Type',['Employee NDA','Third-Party NDA','Project-Specific NDA'])}
                  {select(values,'priorityLevel','Priority',['Standard','High','Urgent'])}
                </div>
              </div>

              {/* 2. Party Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Party Details</h3>
                <div className="form-fields">
                  {field(values,'disclosingPartyName','Disclosing Party')}
                  {field(values,'receivingPartyName','Receiving Party')}
                  {field(values,'counterpartyAddress','Address')}
                  {field(values,'counterpartyContactPerson','Contact Person')}
                  {field(values,'counterpartyEmailPhone','Email / Phone')}
                  {field(values,'counterpartyJurisdiction','Country / Jurisdiction')}
                </div>
              </div>

              {/* 3. Agreement Scope */}
              <div className="form-section">
                <h3 className="form-section-title">3. Agreement Scope</h3>
                <div className="form-fields">
                  {textarea(values,'purposeOfDisclosure','Purpose of Disclosure')}
                  {textarea(values,'confidentialInformationDescription','Confidential Information Description')}
                  {textarea(values,'permittedUse','Permitted Use')}
                </div>
              </div>

              {/* 4. Term & Obligations */}
              <div className="form-section">
                <h3 className="form-section-title">4. Term & Obligations</h3>
                <div className="form-fields">
                  {field(values,'effectiveDate','Effective Date','date')}
                  {field(values,'expirationDate','Expiration Date','date')}
                  {field(values,'confidentialityPeriod','Confidentiality Period (Years)')}
                  {textarea(values,'returnDestructionRequirement','Return / Destruction Requirement')}
                  {textarea(values,'nonDisclosureObligations','Non-Disclosure Obligations')}
                  {textarea(values,'exceptions','Exceptions')}
                </div>
              </div>

              {/* 5. Risk & Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">5. Risk & Compliance</h3>
                <div className="form-fields">
                  {textarea(values,'keyRisksIdentified','Key Risks Identified')}
                  {textarea(values,'complianceRequirements','Compliance Requirements')}
                  {textarea(values,'specialClauses','Special Clauses / Notes')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByConfirmation','Prepared By (Name)')}
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
                    Submit Confidentiality Agreement
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

export default FRM00188_ConfidentialityAgreement;
