// FRM00189_IPAssignment.jsx
// FRM-00189 – IP Assignment – Request / Initiation Form

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
  assignmentType: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // 2. Assignor / Assignee Details
  assignorName: Yup.string().required('Required'),
  assigneeName: Yup.string().required('Required'),
  assignorAddress: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  emailPhone: Yup.string().required('Required'),
  jurisdiction: Yup.string().required('Required'),

  // 3. IP Details
  ipTitleDescription: Yup.string().required('Required'),
  ipType: Yup.string().required('Required'),
  registrationNumber: Yup.string(),

  // 4. Assignment Scope
  scopeOfAssignment: Yup.string().required('Required'),
  territory: Yup.string().required('Required'),
  rightsTransferred: Yup.string().required('Required'),

  // 5. Commercial Terms
  effectiveDate: Yup.string().required('Required'),
  considerationAmount: Yup.string().required('Required'),
  paymentTerms: Yup.string().required('Required'),
  contractCurrency: Yup.string().required('Required'),

  // 6. Obligations & Compliance
  keyObligations: Yup.string().required('Required'),
  confidentialityRequirements: Yup.string().required('Required'),
  complianceLegalConsiderations: Yup.string().required('Required'),

  // 7. Authorization
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
  assignmentType: '',
  priorityLevel: '',

  assignorName: '',
  assigneeName: '',
  assignorAddress: '',
  contactPerson: '',
  emailPhone: '',
  jurisdiction: '',

  ipTitleDescription: '',
  ipType: '',
  registrationNumber: '',

  scopeOfAssignment: '',
  territory: '',
  rightsTransferred: '',

  effectiveDate: '',
  considerationAmount: '',
  paymentTerms: '',
  contractCurrency: '',

  keyObligations: '',
  confidentialityRequirements: '',
  complianceLegalConsiderations: '',

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

const FRM00189_IPAssignment = () => {

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
      formId="FRM-00189"
      title="IP Assignment – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('IP Assignment form submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00189"
              title="IP Assignment"
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
                  {select(values,'assignmentType','Assignment Type',['Employee Assignment','Contractor Assignment','Third-Party Transfer'])}
                  {select(values,'priorityLevel','Priority',['Standard','High','Urgent'])}
                </div>
              </div>

              {/* 2. Assignor / Assignee Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Assignor / Assignee Details</h3>
                <div className="form-fields">
                  {field(values,'assignorName','Assignor (Individual / Entity)')}
                  {field(values,'assigneeName','Assignee (Organization)')}
                  {field(values,'assignorAddress','Address')}
                  {field(values,'contactPerson','Contact Person')}
                  {field(values,'emailPhone','Email / Phone')}
                  {field(values,'jurisdiction','Country / Jurisdiction')}
                </div>
              </div>

              {/* 3. IP Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. IP Details</h3>
                <div className="form-fields">
                  {textarea(values,'ipTitleDescription','IP Title / Description')}
                  {select(values,'ipType','Type of IP',['Patent','Copyright','Trademark','Design','Trade Secret','Other'])}
                  {field(values,'registrationNumber','Registration / Application Number (if any)')}
                </div>
              </div>

              {/* 4. Assignment Scope */}
              <div className="form-section">
                <h3 className="form-section-title">4. Assignment Scope</h3>
                <div className="form-fields">
                  {textarea(values,'scopeOfAssignment','Scope of Assignment')}
                  {field(values,'territory','Territory')}
                  {textarea(values,'rightsTransferred','Rights Transferred')}
                </div>
              </div>

              {/* 5. Commercial Terms */}
              <div className="form-section">
                <h3 className="form-section-title">5. Commercial Terms</h3>
                <div className="form-fields">
                  {field(values,'effectiveDate','Effective Date','date')}
                  {field(values,'considerationAmount','Consideration Amount')}
                  {textarea(values,'paymentTerms','Payment Terms')}
                  {field(values,'contractCurrency','Currency')}
                </div>
              </div>

              {/* 6. Obligations & Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">6. Obligations & Compliance</h3>
                <div className="form-fields">
                  {textarea(values,'keyObligations','Key Obligations')}
                  {textarea(values,'confidentialityRequirements','Confidentiality Requirements')}
                  {textarea(values,'complianceLegalConsiderations','Compliance / Legal Considerations')}
                </div>
              </div>

              {/* 7. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">7. Authorization</h3>
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
                    Submit IP Assignment
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

export default FRM00189_IPAssignment;
