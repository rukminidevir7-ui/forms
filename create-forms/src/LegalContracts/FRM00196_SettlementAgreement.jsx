// FRM00196_SettlementAgreement.jsx
// FRM-00196 – Settlement Agreement – Request / Authorization Form

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
  referenceId: Yup.string().required('Required'),
  contactDetails: Yup.string().required('Required'),
  settlementType: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // 2. Party Details
  partyOneName: Yup.string().required('Required'),
  partyTwoName: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  emailPhone: Yup.string().required('Required'),
  jurisdiction: Yup.string().required('Required'),

  // 3. Background of Matter
  backgroundSummary: Yup.string().required('Required'),
  disputeDescription: Yup.string().required('Required'),

  // 4. Settlement Terms
  settlementAmount: Yup.string().required('Required'),
  settlementCurrency: Yup.string().required('Required'),
  paymentTerms: Yup.string().required('Required'),
  settlementDate: Yup.string().required('Required'),
  obligationsOfParties: Yup.string().required('Required'),

  // 5. Legal & Compliance
  releaseOfClaims: Yup.string().required('Required'),
  confidentialityRequirement: Yup.string().required('Required'),
  complianceLegalConsiderations: Yup.string().required('Required'),

  // 6. Risk Assessment
  keyRisksIdentified: Yup.string().required('Required'),
  specialClauses: Yup.string(),

  // 7. Authorization
  preparedByConfirmation: Yup.string().required('Required'),
  hrBusinessApproval: Yup.string().required('Required'),
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
  referenceId: '',
  contactDetails: '',
  settlementType: '',
  priorityLevel: '',

  partyOneName: '',
  partyTwoName: '',
  address: '',
  contactPerson: '',
  emailPhone: '',
  jurisdiction: '',

  backgroundSummary: '',
  disputeDescription: '',

  settlementAmount: '',
  settlementCurrency: '',
  paymentTerms: '',
  settlementDate: '',
  obligationsOfParties: '',

  releaseOfClaims: '',
  confidentialityRequirement: '',
  complianceLegalConsiderations: '',

  keyRisksIdentified: '',
  specialClauses: '',

  preparedByConfirmation: '',
  hrBusinessApproval: '',
  legalApproval: '',
  managementApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00196_SettlementAgreement = () => {

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
      formId="FRM-00196"
      title="Settlement Agreement – Request / Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Settlement Agreement form submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00196"
              title="Settlement Agreement"
              department="Legal & Contracts – Employment Legal"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'departmentFunction','Department / Function')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'referenceId','Employee ID / Reference')}
                  {field(values,'contactDetails','Contact Details')}
                  {select(values,'settlementType','Settlement Type',['Employment Dispute','Contractual Dispute','Mutual Separation','Litigation Settlement'])}
                  {select(values,'priorityLevel','Priority',['Standard','High','Urgent'])}
                </div>
              </div>

              {/* 2. Party Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Party Details</h3>
                <div className="form-fields">
                  {field(values,'partyOneName','Party 1 (Organization / Individual)')}
                  {field(values,'partyTwoName','Party 2 (Organization / Individual)')}
                  {field(values,'address','Address')}
                  {field(values,'contactPerson','Contact Person')}
                  {field(values,'emailPhone','Email / Phone')}
                  {field(values,'jurisdiction','Country / Jurisdiction')}
                </div>
              </div>

              {/* 3. Background of Matter */}
              <div className="form-section">
                <h3 className="form-section-title">3. Background of Matter</h3>
                <div className="form-fields">
                  {textarea(values,'backgroundSummary','Background Summary')}
                  {textarea(values,'disputeDescription','Dispute / Issue Description')}
                </div>
              </div>

              {/* 4. Settlement Terms */}
              <div className="form-section">
                <h3 className="form-section-title">4. Settlement Terms</h3>
                <div className="form-fields">
                  {field(values,'settlementAmount','Settlement Amount / Consideration')}
                  {field(values,'settlementCurrency','Currency')}
                  {textarea(values,'paymentTerms','Payment Terms')}
                  {field(values,'settlementDate','Settlement Date','date')}
                  {textarea(values,'obligationsOfParties','Obligations of Parties')}
                </div>
              </div>

              {/* 5. Legal & Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">5. Legal & Compliance</h3>
                <div className="form-fields">
                  {textarea(values,'releaseOfClaims','Release of Claims')}
                  {textarea(values,'confidentialityRequirement','Confidentiality Requirement')}
                  {textarea(values,'complianceLegalConsiderations','Compliance / Legal Considerations')}
                </div>
              </div>

              {/* 6. Risk Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">6. Risk Assessment</h3>
                <div className="form-fields">
                  {textarea(values,'keyRisksIdentified','Key Risks Identified')}
                  {textarea(values,'specialClauses','Special Clauses / Notes')}
                </div>
              </div>

              {/* 7. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">7. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByConfirmation','Prepared By (Name)')}
                  {field(values,'hrBusinessApproval','HR / Business Approval')}
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
                    Submit Settlement Agreement
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

export default FRM00196_SettlementAgreement;
