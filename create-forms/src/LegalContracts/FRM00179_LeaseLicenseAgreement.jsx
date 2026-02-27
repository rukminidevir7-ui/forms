// FRM00179_LeaseLicenseAgreement.jsx
// FRM-00179 – Lease / License Agreement – Request / Authorization Form

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
  lessorLicensorName: Yup.string().required('Required'),
  lesseeLicenseeName: Yup.string().required('Required'),
  counterpartyAddress: Yup.string().required('Required'),
  counterpartyContactPerson: Yup.string().required('Required'),
  counterpartyEmailPhone: Yup.string().required('Required'),
  counterpartyJurisdiction: Yup.string().required('Required'),

  // 3. Asset / Property Details
  assetDescription: Yup.string().required('Required'),
  assetLocation: Yup.string().required('Required'),
  usagePurpose: Yup.string().required('Required'),

  // 4. Term & Financials
  commencementDate: Yup.string().required('Required'),
  endDate: Yup.string().required('Required'),
  leaseLicenseFee: Yup.string().required('Required'),
  paymentFrequency: Yup.string().required('Required'),
  securityDeposit: Yup.string().required('Required'),
  contractCurrency: Yup.string().required('Required'),

  // 5. Obligations & Conditions
  keyObligations: Yup.string().required('Required'),
  maintenanceResponsibilities: Yup.string().required('Required'),
  terminationConditions: Yup.string().required('Required'),

  // 6. Risk & Compliance
  complianceRequirements: Yup.string().required('Required'),
  insuranceRequirements: Yup.string().required('Required'),
  keyRisksIdentified: Yup.string().required('Required'),

  // 7. Authorization
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

  lessorLicensorName: '',
  lesseeLicenseeName: '',
  counterpartyAddress: '',
  counterpartyContactPerson: '',
  counterpartyEmailPhone: '',
  counterpartyJurisdiction: '',

  assetDescription: '',
  assetLocation: '',
  usagePurpose: '',

  commencementDate: '',
  endDate: '',
  leaseLicenseFee: '',
  paymentFrequency: '',
  securityDeposit: '',
  contractCurrency: '',

  keyObligations: '',
  maintenanceResponsibilities: '',
  terminationConditions: '',

  complianceRequirements: '',
  insuranceRequirements: '',
  keyRisksIdentified: '',

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

const FRM00179_LeaseLicenseAgreement = () => {

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
      formId="FRM-00179"
      title="Lease / License Agreement – Request / Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Lease / License Agreement form submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00179"
              title="Lease / License Agreement"
              department="Legal & Contracts – Contracting"
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
                  {select(values,'agreementType','Agreement Type',['Lease','License','Renewal','Amendment'])}
                  {select(values,'priorityLevel','Priority',['Standard','High','Urgent'])}
                </div>
              </div>

              {/* 2. Party Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Party Details</h3>
                <div className="form-fields">
                  {field(values,'lessorLicensorName','Lessor / Licensor Legal Name')}
                  {field(values,'lesseeLicenseeName','Lessee / Licensee Legal Name')}
                  {field(values,'counterpartyAddress','Registered Address')}
                  {field(values,'counterpartyContactPerson','Contact Person')}
                  {field(values,'counterpartyEmailPhone','Email / Phone')}
                  {field(values,'counterpartyJurisdiction','Country / Jurisdiction')}
                </div>
              </div>

              {/* 3. Asset / Property Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Asset / Property Details</h3>
                <div className="form-fields">
                  {textarea(values,'assetDescription','Property / Asset Description')}
                  {field(values,'assetLocation','Location')}
                  {textarea(values,'usagePurpose','Usage Purpose')}
                </div>
              </div>

              {/* 4. Term & Financials */}
              <div className="form-section">
                <h3 className="form-section-title">4. Term & Financials</h3>
                <div className="form-fields">
                  {field(values,'commencementDate','Commencement Date','date')}
                  {field(values,'endDate','End Date','date')}
                  {field(values,'leaseLicenseFee','Lease / License Fee')}
                  {select(values,'paymentFrequency','Payment Frequency',['Monthly','Quarterly','Semi-Annual','Annual'])}
                  {field(values,'securityDeposit','Security Deposit')}
                  {field(values,'contractCurrency','Currency')}
                </div>
              </div>

              {/* 5. Obligations & Conditions */}
              <div className="form-section">
                <h3 className="form-section-title">5. Obligations & Conditions</h3>
                <div className="form-fields">
                  {textarea(values,'keyObligations','Key Obligations')}
                  {textarea(values,'maintenanceResponsibilities','Maintenance Responsibilities')}
                  {textarea(values,'terminationConditions','Termination Conditions')}
                </div>
              </div>

              {/* 6. Risk & Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">6. Risk & Compliance</h3>
                <div className="form-fields">
                  {textarea(values,'complianceRequirements','Compliance Requirements')}
                  {textarea(values,'insuranceRequirements','Insurance Requirements')}
                  {textarea(values,'keyRisksIdentified','Key Risks Identified')}
                </div>
              </div>

              {/* 7. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">7. Authorization</h3>
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
                    Submit Lease / License Agreement
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

export default FRM00179_LeaseLicenseAgreement;
