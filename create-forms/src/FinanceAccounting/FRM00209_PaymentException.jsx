// FRM00209_PaymentException.jsx
// FRM-00209 – Payment Exception – Request / Initiation Form

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
  exceptionDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  requestedBy: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // 2. Exception Details
  exceptionId: Yup.string().required('Required'),
  exceptionType: Yup.string().required('Required'),
  relatedPaymentRunId: Yup.string().required('Required'),
  vendorName: Yup.string().required('Required'),
  invoiceNumber: Yup.string().required('Required'),
  exceptionAmount: Yup.string().required('Required'),

  // 3. Description
  exceptionDescription: Yup.string().required('Required'),
  rootCause: Yup.string().required('Required'),
  dateIdentified: Yup.string().required('Required'),

  // 4. Impact Assessment
  operationalImpact: Yup.string().required('Required'),
  financialImpact: Yup.string().required('Required'),
  complianceImpact: Yup.string().required('Required'),

  // 5. Resolution Plan
  immediateActionTaken: Yup.string().required('Required'),
  proposedResolution: Yup.string().required('Required'),
  targetResolutionDate: Yup.string().required('Required'),

  // 6. Control & Risk
  controlGapsIdentified: Yup.string().required('Required'),
  preventiveMeasures: Yup.string().required('Required'),

  // 7. Authorization
  requestedByAuthorization: Yup.string().required('Required'),
  accountsPayableApproval: Yup.string().required('Required'),
  financeApproval: Yup.string().required('Required'),
  internalControlReview: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  formId: '',
  exceptionDate: '',
  department: '',
  requestedBy: '',
  referenceNumber: '',
  priorityLevel: '',

  exceptionId: '',
  exceptionType: '',
  relatedPaymentRunId: '',
  vendorName: '',
  invoiceNumber: '',
  exceptionAmount: '',

  exceptionDescription: '',
  rootCause: '',
  dateIdentified: '',

  operationalImpact: '',
  financialImpact: '',
  complianceImpact: '',

  immediateActionTaken: '',
  proposedResolution: '',
  targetResolutionDate: '',

  controlGapsIdentified: '',
  preventiveMeasures: '',

  requestedByAuthorization: '',
  accountsPayableApproval: '',
  financeApproval: '',
  internalControlReview: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00209_PaymentException = () => {

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
      formId="FRM-00209"
      title="Payment Exception – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Payment exception request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00209"
              title="Payment Exception"
              department="Finance & Accounting – Accounts Payable"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'exceptionDate','Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'requestedBy','Requested By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {select(values,'priorityLevel','Priority Level',['Low','Medium','High','Critical'])}
                </div>
              </div>

              {/* 2. Exception Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Exception Details</h3>
                <div className="form-fields">
                  {field(values,'exceptionId','Exception ID')}
                  {select(values,'exceptionType','Exception Type',['Duplicate Payment','Incorrect Amount','Vendor Mismatch','Bank Detail Error','Approval Bypass','System Error','Other'])}
                  {field(values,'relatedPaymentRunId','Related Payment Run ID')}
                  {field(values,'vendorName','Vendor Name')}
                  {field(values,'invoiceNumber','Invoice Number')}
                  {field(values,'exceptionAmount','Amount','number')}
                </div>
              </div>

              {/* 3. Description */}
              <div className="form-section">
                <h3 className="form-section-title">3. Description</h3>
                <div className="form-fields">
                  {textarea(values,'exceptionDescription','Description of Exception')}
                  {textarea(values,'rootCause','Root Cause')}
                  {field(values,'dateIdentified','Date Identified','date')}
                </div>
              </div>

              {/* 4. Impact Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">4. Impact Assessment</h3>
                <div className="form-fields">
                  {textarea(values,'operationalImpact','Operational Impact')}
                  {textarea(values,'financialImpact','Financial Impact')}
                  {textarea(values,'complianceImpact','Compliance Impact')}
                </div>
              </div>

              {/* 5. Resolution Plan */}
              <div className="form-section">
                <h3 className="form-section-title">5. Resolution Plan</h3>
                <div className="form-fields">
                  {textarea(values,'immediateActionTaken','Immediate Action Taken')}
                  {textarea(values,'proposedResolution','Proposed Resolution')}
                  {field(values,'targetResolutionDate','Target Resolution Date','date')}
                </div>
              </div>

              {/* 6. Control & Risk */}
              <div className="form-section">
                <h3 className="form-section-title">6. Control & Risk</h3>
                <div className="form-fields">
                  {textarea(values,'controlGapsIdentified','Control Gaps Identified')}
                  {textarea(values,'preventiveMeasures','Preventive Measures')}
                </div>
              </div>

              {/* 7. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">7. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requestedByAuthorization','Requested By (Name)')}
                  {field(values,'accountsPayableApproval','Accounts Payable Approval')}
                  {field(values,'financeApproval','Finance Approval')}
                  {field(values,'internalControlReview','Internal Control / Audit Review')}
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
                    Submit Payment Exception
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

export default FRM00209_PaymentException;
