// FRM00193_NonSolicitationUndertaking.jsx
// FRM-00193 – Non-Solicitation Undertaking – Request / Initiation Form

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
  undertakingType: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // 2. Party Details
  individualEntityName: Yup.string().required('Required'),
  organizationName: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  emailPhone: Yup.string().required('Required'),
  jurisdiction: Yup.string().required('Required'),

  // 3. Undertaking Details
  effectiveDate: Yup.string().required('Required'),
  endDate: Yup.string().required('Required'),
  restrictedParties: Yup.string().required('Required'),
  scopeOfRestriction: Yup.string().required('Required'),

  // 4. Obligations & Conditions
  keyObligations: Yup.string().required('Required'),
  exceptionsPermittedActions: Yup.string().required('Required'),
  terminationConditions: Yup.string().required('Required'),

  // 5. Risk & Compliance
  keyRisksIdentified: Yup.string().required('Required'),
  complianceLegalConsiderations: Yup.string().required('Required'),
  specialClauses: Yup.string(),

  // 6. Authorization
  requestedByConfirmation: Yup.string().required('Required'),
  businessApproval: Yup.string().required('Required'),
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
  requestedBy: '',
  employeeId: '',
  contactDetails: '',
  undertakingType: '',
  priorityLevel: '',

  individualEntityName: '',
  organizationName: '',
  address: '',
  contactPerson: '',
  emailPhone: '',
  jurisdiction: '',

  effectiveDate: '',
  endDate: '',
  restrictedParties: '',
  scopeOfRestriction: '',

  keyObligations: '',
  exceptionsPermittedActions: '',
  terminationConditions: '',

  keyRisksIdentified: '',
  complianceLegalConsiderations: '',
  specialClauses: '',

  requestedByConfirmation: '',
  businessApproval: '',
  hrApproval: '',
  legalApproval: '',
  managementApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00193_NonSolicitationUndertaking = () => {

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
      formId="FRM-00193"
      title="Non-Solicitation Undertaking – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Non-Solicitation Undertaking submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00193"
              title="Non-Solicitation Undertaking"
              department="Legal & Contracts – Employment Legal"
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
                  {select(values,'undertakingType','Undertaking Type',['Employee Restriction','Vendor Restriction','Partner Restriction','Exit Restriction'])}
                  {select(values,'priorityLevel','Priority',['Standard','High','Urgent'])}
                </div>
              </div>

              {/* 2. Party Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Party Details</h3>
                <div className="form-fields">
                  {field(values,'individualEntityName','Individual / Entity Name')}
                  {field(values,'organizationName','Organization')}
                  {field(values,'address','Address')}
                  {field(values,'contactPerson','Contact Person')}
                  {field(values,'emailPhone','Email / Phone')}
                  {field(values,'jurisdiction','Country / Jurisdiction')}
                </div>
              </div>

              {/* 3. Undertaking Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Undertaking Details</h3>
                <div className="form-fields">
                  {field(values,'effectiveDate','Effective Date','date')}
                  {field(values,'endDate','End Date','date')}
                  {textarea(values,'restrictedParties','Restricted Parties')}
                  {textarea(values,'scopeOfRestriction','Scope of Restriction')}
                </div>
              </div>

              {/* 4. Obligations & Conditions */}
              <div className="form-section">
                <h3 className="form-section-title">4. Obligations & Conditions</h3>
                <div className="form-fields">
                  {textarea(values,'keyObligations','Key Obligations')}
                  {textarea(values,'exceptionsPermittedActions','Exceptions / Permitted Actions')}
                  {textarea(values,'terminationConditions','Termination Conditions')}
                </div>
              </div>

              {/* 5. Risk & Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">5. Risk & Compliance</h3>
                <div className="form-fields">
                  {textarea(values,'keyRisksIdentified','Key Risks Identified')}
                  {textarea(values,'complianceLegalConsiderations','Compliance / Legal Considerations')}
                  {textarea(values,'specialClauses','Special Clauses / Notes')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requestedByConfirmation','Requested By (Name)')}
                  {field(values,'businessApproval','Business Approval')}
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
                    Submit Non-Solicitation Undertaking
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

export default FRM00193_NonSolicitationUndertaking;
