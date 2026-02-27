import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import SignatureComponent from '../components/SignatureComponent';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({
  employeeID: Yup.string().required('Employee ID is required'),
  employeeName: Yup.string().required('Employee Name is required'),
  changeType: Yup.string().required('Change Type is required'),
  oldValue: Yup.string().required('Old Value required'),
  newValue: Yup.string().required('New Value required'),
  approvalStatus: Yup.string().required('Approval Status required'),
  approvedBy: Yup.string().required('Approver required'),
  approvalDate: Yup.string().required('Approval Date required')
});

const initialValues = {
  employeeID: '',
  employeeName: '',
  changeType: '',
  oldValue: '',
  newValue: '',

  supportingDocumentsVerified: '',
  payrollImpact: '',
  statutoryImpact: [],

  approvalStatus: '',
  approvedBy: '',
  approvalDate: '',
  remarks: '',

  customFields: [],
  signatures: {
    approver: { type: '', data: '', name: '' }
  }
};

const FRM00641 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue) => (
    <ModernA4Template
      formId="FRM-00641"
      title="Employee Data Change – Approval / Authorization Form"
      department="HR & People Ops"
    >

      {/* EMPLOYEE DETAILS */}
      <div className="form-section">
        <h3 className="form-section-title">Employee Information</h3>
        <div className="form-fields">
          {['employeeID','employeeName','changeType','oldValue','newValue'].map((field,i)=>(
            <div key={i} className="form-field">
              <label className="form-label required">
                {field.replace(/([A-Z])/g,' $1')}
              </label>
              {isPrintMode ? (
                <div className="print-value">{values[field] || '___________________'}</div>
              ) : (
                <Field name={field} className="form-input" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* VERIFICATION */}
      <div className="form-section">
        <h3 className="form-section-title">Verification & Impact</h3>
        <div className="form-fields">

          <div className="form-field">
            <label className="form-label">Supporting Documents Verified</label>
            {isPrintMode ? (
              <div className="print-value">{values.supportingDocumentsVerified}</div>
            ) : (
              <Field as="select" name="supportingDocumentsVerified" className="form-input">
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Field>
            )}
          </div>

          <div className="form-field">
            <label className="form-label">Payroll Impact</label>
            {isPrintMode ? (
              <div className="print-value">{values.payrollImpact}</div>
            ) : (
              <Field as="select" name="payrollImpact" className="form-input">
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Field>
            )}
          </div>

          <div className="form-field full-width">
            <label className="form-label">Statutory Impact</label>
            {!isPrintMode && (
              <>
                <label><Field type="checkbox" name="statutoryImpact" value="PF" /> PF</label>
                <label><Field type="checkbox" name="statutoryImpact" value="ESIC" /> ESIC</label>
                <label><Field type="checkbox" name="statutoryImpact" value="Tax" /> Tax</label>
              </>
            )}
            {isPrintMode && (
              <div className="print-value">{values.statutoryImpact.join(', ')}</div>
            )}
          </div>

        </div>
      </div>

      {/* APPROVAL */}
      <div className="form-section">
        <h3 className="form-section-title">Approval Decision</h3>
        <div className="form-fields">

          <div className="form-field">
            <label className="form-label required">Approval Status</label>
            {isPrintMode ? (
              <div className="print-value">{values.approvalStatus}</div>
            ) : (
              <Field as="select" name="approvalStatus" className="form-input">
                <option value="">Select</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Correction Required">Correction Required</option>
              </Field>
            )}
          </div>

          <div className="form-field">
            <label className="form-label required">Approved By</label>
            {isPrintMode ? (
              <div className="print-value">{values.approvedBy}</div>
            ) : (
              <Field as="select" name="approvedBy" className="form-input">
                <option value="">Select</option>
                <option value="HR">HR</option>
                <option value="Payroll Head">Payroll Head</option>
              </Field>
            )}
          </div>

          <div className="form-field">
            <label className="form-label required">Approval Date</label>
            {isPrintMode ? (
              <div className="print-value">{values.approvalDate}</div>
            ) : (
              <Field type="date" name="approvalDate" className="form-input" />
            )}
          </div>

        </div>

        <div className="form-field full-width">
          <label className="form-label">Remarks</label>
          {isPrintMode ? (
            <div className="print-value">{values.remarks}</div>
          ) : (
            <Field as="textarea" name="remarks" className="form-textarea" />
          )}
        </div>
      </div>

      {/* SIGNATURE */}
      {!isPrintMode && (
        <div className="form-section">
          <h3 className="form-section-title">Authorization Signature</h3>
          <SignatureComponent
            label="Approver Signature"
            onChange={(data) => setFieldValue('signatures.approver.data', data)}
          />
        </div>
      )}

    </ModernA4Template>
  );

  return (
    <ModernFormWrapper>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('FRM00641 Submitted', values);
          alert('Approval Saved Successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            {renderFormContent(values, setFieldValue)}
          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00641;
