// FRM00218_AdvancePayment.jsx
// FRM-00218 – Advance Payment – Request / Initiation Form

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
  formId: Yup.string().required('Required'),
  requestDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  requestedBy: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // 2. Payee Details
  payeeName: Yup.string().required('Required'),
  payeeId: Yup.string().required('Required'),
  payeeAddress: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  contactDetails: Yup.string().required('Required'),
  taxIdGst: Yup.string().required('Required'),

  // 3. Advance Details
  advanceType: Yup.string().required('Required'),
  purpose: Yup.string().required('Required'),
  advanceAmount: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),
  requiredByDate: Yup.string().required('Required'),
  paymentMethod: Yup.string().required('Required'),

  // 4. Related References
  relatedReference: Yup.string().required('Required'),
  projectCostCenter: Yup.string().required('Required'),
  budgetAvailabilityConfirmed: Yup.string().required('Required'),

  // 5. Risk & Justification
  businessJustification: Yup.string().required('Required'),
  riskConsiderations: Yup.string().required('Required'),
  recoveryPlan: Yup.string().required('Required'),

  // 6. Authorization
  requestedByAuthorization: Yup.string().required('Required'),
  businessApproval: Yup.string().required('Required'),
  accountsPayableApproval: Yup.string().required('Required'),
  financeApproval: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  formId: '',
  requestDate: '',
  department: '',
  requestedBy: '',
  referenceNumber: '',
  priorityLevel: '',

  payeeName: '',
  payeeId: '',
  payeeAddress: '',
  contactPerson: '',
  contactDetails: '',
  taxIdGst: '',

  advanceType: '',
  purpose: '',
  advanceAmount: '',
  currency: '',
  requiredByDate: '',
  paymentMethod: '',

  relatedReference: '',
  projectCostCenter: '',
  budgetAvailabilityConfirmed: '',

  businessJustification: '',
  riskConsiderations: '',
  recoveryPlan: '',

  requestedByAuthorization: '',
  businessApproval: '',
  accountsPayableApproval: '',
  financeApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00218_AdvancePayment = () => {

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
      formId="FRM-00218"
      title="Advance Payment – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Advance payment request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00218"
              title="Advance Payment"
              department="Finance & Accounting – Accounts Payable"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'requestedBy','Requested By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {select(values,'priorityLevel','Priority Level',['Low','Medium','High','Urgent'])}
                </div>
              </div>

              {/* 2. Payee Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Payee Details</h3>
                <div className="form-fields">
                  {field(values,'payeeName','Payee Name')}
                  {field(values,'payeeId','Vendor / Employee ID')}
                  {field(values,'payeeAddress','Address')}
                  {field(values,'contactPerson','Contact Person')}
                  {field(values,'contactDetails','Email / Phone')}
                  {field(values,'taxIdGst','Tax ID / GST')}
                </div>
              </div>

              {/* 3. Advance Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Advance Details</h3>
                <div className="form-fields">
                  {select(values,'advanceType','Advance Type',['Vendor Advance','Employee Advance','Project Advance','Retention Advance','Other'])}
                  {textarea(values,'purpose','Purpose')}
                  {field(values,'advanceAmount','Amount','number')}
                  {field(values,'currency','Currency')}
                  {field(values,'requiredByDate','Required By Date','date')}
                  {select(values,'paymentMethod','Payment Method',['Bank Transfer','Cheque','NEFT','RTGS','UPI'])}
                </div>
              </div>

              {/* 4. Related References */}
              <div className="form-section">
                <h3 className="form-section-title">4. Related References</h3>
                <div className="form-fields">
                  {field(values,'relatedReference','Related PO / Contract')}
                  {field(values,'projectCostCenter','Project / Cost Center')}
                  {select(values,'budgetAvailabilityConfirmed','Budget Availability Confirmed',['Yes','No'])}
                </div>
              </div>

              {/* 5. Risk & Justification */}
              <div className="form-section">
                <h3 className="form-section-title">5. Risk & Justification</h3>
                <div className="form-fields">
                  {textarea(values,'businessJustification','Business Justification')}
                  {textarea(values,'riskConsiderations','Risk Considerations')}
                  {textarea(values,'recoveryPlan','Recovery / Adjustment Plan')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requestedByAuthorization','Requested By (Name)')}
                  {field(values,'businessApproval','Business Approval')}
                  {field(values,'accountsPayableApproval','Accounts Payable Approval')}
                  {field(values,'financeApproval','Finance Approval')}
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
                    Submit Advance Payment
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

export default FRM00218_AdvancePayment;
