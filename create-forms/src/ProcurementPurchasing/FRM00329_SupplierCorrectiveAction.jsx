// FRM00329_SupplierCorrectiveAction.jsx
// FRM-00329 – Supplier Corrective Action – Request / Initiation Form

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
  department: Yup.string().required('Required'),
  requestedBy: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  relatedReference: Yup.string().required('Required'),

  // 2. Supplier Details
  supplierName: Yup.string().required('Required'),
  supplierId: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  contractReference: Yup.string().required('Required'),

  // 3. Issue Details
  issueDescription: Yup.string().required('Required'),
  rootCauseAnalysis: Yup.string().required('Required'),
  impactAssessment: Yup.string().required('Required'),

  // 4. Corrective Action Plan
  correctiveActions: Yup.string().required('Required'),
  responsibleParty: Yup.string().required('Required'),
  targetCompletionDate: Yup.string().required('Required'),

  // 5. Verification & Closure
  verificationMethod: Yup.string().required('Required'),
  verificationDate: Yup.string().required('Required'),
  closureStatus: Yup.string().required('Required'),

  // 6. Authorization
  requesterApproval: Yup.string().required('Required'),
  procurementReview: Yup.string().required('Required'),
  qualityComplianceApproval: Yup.string().required('Required'),
  managementApproval: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  // 7. Supporting Information
  supportingDocuments: Yup.string(),
  additionalNotes: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  requestDate: '',
  department: '',
  requestedBy: '',
  referenceNumber: '',
  relatedReference: '',

  supplierName: '',
  supplierId: '',
  category: '',
  contactPerson: '',
  location: '',
  contractReference: '',

  issueDescription: '',
  rootCauseAnalysis: '',
  impactAssessment: '',

  correctiveActions: '',
  responsibleParty: '',
  targetCompletionDate: '',

  verificationMethod: '',
  verificationDate: '',
  closureStatus: '',

  requesterApproval: '',
  procurementReview: '',
  qualityComplianceApproval: '',
  managementApproval: '',
  approvalComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00329_SupplierCorrectiveAction = () => {

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
      formId="FRM-00329"
      title="Supplier Corrective Action – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Supplier corrective action submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00329"
              title="Supplier Corrective Action"
              department="Procurement & Purchasing – Supplier Management"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'requestedBy','Requested By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {field(values,'relatedReference','Related Audit / Evaluation Ref')}
                </div>
              </div>

              {/* 2. Supplier Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Supplier Details</h3>
                <div className="form-fields">
                  {field(values,'supplierName','Supplier Name')}
                  {field(values,'supplierId','Supplier ID')}
                  {field(values,'category','Category')}
                  {field(values,'contactPerson','Contact Person')}
                  {field(values,'location','Location')}
                  {field(values,'contractReference','Contract / PO Reference')}
                </div>
              </div>

              {/* 3. Issue Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Issue Details</h3>
                <div className="form-fields">
                  {textarea(values,'issueDescription','Issue Description')}
                  {textarea(values,'rootCauseAnalysis','Root Cause Analysis')}
                  {textarea(values,'impactAssessment','Impact Assessment')}
                </div>
              </div>

              {/* 4. Corrective Action Plan */}
              <div className="form-section">
                <h3 className="form-section-title">4. Corrective Action Plan</h3>
                <div className="form-fields">
                  {textarea(values,'correctiveActions','Proposed Corrective Actions')}
                  {field(values,'responsibleParty','Responsible Party')}
                  {field(values,'targetCompletionDate','Target Completion Date','date')}
                </div>
              </div>

              {/* 5. Verification & Closure */}
              <div className="form-section">
                <h3 className="form-section-title">5. Verification & Closure</h3>
                <div className="form-fields">
                  {textarea(values,'verificationMethod','Verification Method')}
                  {field(values,'verificationDate','Verification Date','date')}
                  {select(values,'closureStatus','Closure Status',['Open','In Progress','Completed','Closed'])}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requesterApproval','Requested By (Name & Signature)')}
                  {field(values,'procurementReview','Procurement Review')}
                  {field(values,'qualityComplianceApproval','Quality / Compliance Approval')}
                  {field(values,'managementApproval','Management Approval')}
                  {textarea(values,'approvalComments','Comments')}
                </div>
              </div>

              {/* 7. Supporting Information */}
              <div className="form-section">
                <h3 className="form-section-title">7. Supporting Information</h3>
                <div className="form-fields">
                  {textarea(values,'supportingDocuments','Supporting Documents')}
                  {textarea(values,'additionalNotes','Additional Notes')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Corrective Action
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

export default FRM00329_SupplierCorrectiveAction;
