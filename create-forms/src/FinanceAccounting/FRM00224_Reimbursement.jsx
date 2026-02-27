// FRM00224_Reimbursement.jsx
// FRM-00224 – Reimbursement – Request / Initiation Form

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
  employeeName: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  contactDetails: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // 2. Reimbursement Details
  expensePeriod: Yup.string().required('Required'),
  purpose: Yup.string().required('Required'),
  projectCostCenter: Yup.string().required('Required'),
  currency: Yup.string().required('Required'),
  totalAmountRequested: Yup.string().required('Required'),
  paymentMethod: Yup.string().required('Required'),

  // 3. Expense Breakdown (summary capture)
  expenseBreakdownSummary: Yup.string().required('Required'),

  // 4. Compliance Checks
  receiptsAttached: Yup.string().required('Required'),
  policyComplianceConfirmed: Yup.string().required('Required'),
  managerApprovalObtained: Yup.string().required('Required'),
  duplicateClaimCheck: Yup.string().required('Required'),

  // 5. Justification & Notes
  businessJustification: Yup.string().required('Required'),
  exceptions: Yup.string().required('Required'),
  remarks: Yup.string().required('Required'),

  // 6. Authorization
  employeeSignature: Yup.string().required('Required'),
  managerApproval: Yup.string().required('Required'),
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
  employeeName: '',
  employeeId: '',
  contactDetails: '',
  referenceNumber: '',
  priorityLevel: '',

  expensePeriod: '',
  purpose: '',
  projectCostCenter: '',
  currency: '',
  totalAmountRequested: '',
  paymentMethod: '',

  expenseBreakdownSummary: '',

  receiptsAttached: '',
  policyComplianceConfirmed: '',
  managerApprovalObtained: '',
  duplicateClaimCheck: '',

  businessJustification: '',
  exceptions: '',
  remarks: '',

  employeeSignature: '',
  managerApproval: '',
  financeApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00224_Reimbursement = () => {

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
      formId="FRM-00224"
      title="Reimbursement – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Reimbursement request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00224"
              title="Reimbursement"
              department="Finance & Accounting – Accounts Payable"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'employeeName','Employee Name')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'contactDetails','Contact')}
                  {field(values,'referenceNumber','Reference Number')}
                  {select(values,'priorityLevel','Priority Level',['Low','Medium','High','Urgent'])}
                </div>
              </div>

              {/* 2. Reimbursement Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Reimbursement Details</h3>
                <div className="form-fields">
                  {field(values,'expensePeriod','Expense Period')}
                  {textarea(values,'purpose','Purpose')}
                  {field(values,'projectCostCenter','Project / Cost Center')}
                  {field(values,'currency','Currency')}
                  {field(values,'totalAmountRequested','Total Amount Requested','number')}
                  {select(values,'paymentMethod','Payment Method',['Bank Transfer','Payroll Adjustment','Cheque','UPI'])}
                </div>
              </div>

              {/* 3. Expense Breakdown */}
              <div className="form-section">
                <h3 className="form-section-title">3. Expense Breakdown</h3>
                <div className="form-fields">
                  {textarea(values,'expenseBreakdownSummary','Expense Breakdown (Date / Category / Description / Amount)')}
                </div>
              </div>

              {/* 4. Compliance Checks */}
              <div className="form-section">
                <h3 className="form-section-title">4. Compliance Checks</h3>
                <div className="form-fields">
                  {select(values,'receiptsAttached','Receipts / Proof Attached',['Yes','No'])}
                  {select(values,'policyComplianceConfirmed','Policy Compliance Confirmed',['Yes','No'])}
                  {select(values,'managerApprovalObtained','Manager Approval Obtained',['Yes','No'])}
                  {select(values,'duplicateClaimCheck','Duplicate Claim Check',['Yes','No'])}
                </div>
              </div>

              {/* 5. Justification & Notes */}
              <div className="form-section">
                <h3 className="form-section-title">5. Justification & Notes</h3>
                <div className="form-fields">
                  {textarea(values,'businessJustification','Business Justification')}
                  {textarea(values,'exceptions','Exceptions (if any)')}
                  {textarea(values,'remarks','Remarks')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'employeeSignature','Employee Signature (Name)')}
                  {field(values,'managerApproval','Manager Approval')}
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
                    Submit Reimbursement
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

export default FRM00224_Reimbursement;
