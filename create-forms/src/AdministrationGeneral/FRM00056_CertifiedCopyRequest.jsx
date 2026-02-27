// FRM00056_CertifiedCopyRequest.jsx
// FRM-00056 – Certified Copy Request & Authorization Form

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

  // Basic Information
  requestDate: Yup.string().required('Required'),
  departmentName: Yup.string().required('Required'),
  requesterName: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  requestCategory: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // Document Identification
  documentTitle: Yup.string().required('Required'),
  documentReferenceId: Yup.string().required('Required'),
  documentOwnerDepartment: Yup.string().required('Required'),
  confidentialityLevel: Yup.string().required('Required'),
  documentVersionDate: Yup.string().required('Required'),
  numberOfCopies: Yup.number().required('Required'),

  // Request Details
  justification: Yup.string().required('Required'),
  intendedUse: Yup.string().required('Required'),
  deliveryMethod: Yup.string().required('Required'),

  // Authorization
  requestedBy: Yup.string().required('Required'),
  verifiedBy: Yup.string().required('Required'),
  approvedBy: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  // Supporting
  supportingDocuments: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  requestDate: '',
  departmentName: '',
  requesterName: '',
  employeeId: '',
  contactNumber: '',
  requestCategory: '',
  priorityLevel: '',

  documentTitle: '',
  documentReferenceId: '',
  documentOwnerDepartment: '',
  confidentialityLevel: '',
  documentVersionDate: '',
  numberOfCopies: '',

  justification: '',
  intendedUse: '',
  deliveryMethod: '',

  requestedBy: '',
  verifiedBy: '',
  approvedBy: '',
  approvalDate: '',
  approvalComments: '',

  supportingDocuments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00056_CertifiedCopyRequest = () => {

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
      formId="FRM-00056"
      title="Certified Copy Request & Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Certified copy request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00056"
              title="Certified Copy Request – Request & Authorization"
              department="Administration & General – Records & Documentation"
            >

              {/* Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'departmentName','Department Name')}
                  {field(values,'requesterName','Requester Name')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'contactNumber','Contact')}
                  {select(values,'requestCategory','Request Category',['Internal Use','External Submission','Legal Purpose','Client Requirement','Audit Requirement'])}
                  {select(values,'priorityLevel','Priority Level',['Low','Medium','High','Urgent'])}
                </div>
              </div>

              {/* Document Identification */}
              <div className="form-section">
                <h3 className="form-section-title">2. Document Identification</h3>
                <div className="form-fields">
                  {field(values,'documentTitle','Document Title')}
                  {field(values,'documentReferenceId','Document ID / Reference')}
                  {field(values,'documentOwnerDepartment','Owner / Department')}
                  {select(values,'confidentialityLevel','Confidentiality Level',['Public','Internal','Confidential','Highly Confidential'])}
                  {field(values,'documentVersionDate','Version / Date')}
                  {field(values,'numberOfCopies','Number of Copies Required','number')}
                </div>
              </div>

              {/* Request Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Request Details</h3>
                <div className="form-fields">
                  {textarea(values,'justification','Purpose / Justification')}
                  {textarea(values,'intendedUse','Intended Use')}
                  {select(values,'deliveryMethod','Delivery Method',['Email (Scanned Copy)','Hard Copy Collection','Courier','Registered Post'])}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">4. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requestedBy','Requested By (Name)')}
                  {field(values,'verifiedBy','Verified By')}
                  {field(values,'approvedBy','Approved By')}
                  {field(values,'approvalDate','Approval Date','date')}
                  {textarea(values,'approvalComments','Comments')}
                </div>
              </div>

              {/* Supporting */}
              <div className="form-section">
                <h3 className="form-section-title">5. Supporting Information</h3>
                <div className="form-fields">
                  {textarea(values,'supportingDocuments','Supporting Documents / Additional Notes')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Form
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

export default FRM00056_CertifiedCopyRequest;
