// FRM00043_DocumentRelease.jsx
// FRM-00043 – Document Release Request & Authorization Form

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
  releaseType: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // Document Details
  documentTitle: Yup.string().required('Required'),
  documentId: Yup.string().required('Required'),
  documentVersion: Yup.string().required('Required'),
  documentOwnerDepartment: Yup.string().required('Required'),
  effectiveDate: Yup.string().required('Required'),
  confidentialityLevel: Yup.string().required('Required'),

  // Release Details
  releaseScope: Yup.string().required('Required'),
  distributionMethod: Yup.string().required('Required'),
  specialInstructions: Yup.string(),

  // Authorization
  requestedBy: Yup.string().required('Required'),
  reviewedBy: Yup.string().required('Required'),
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
  releaseType: '',
  priorityLevel: '',

  documentTitle: '',
  documentId: '',
  documentVersion: '',
  documentOwnerDepartment: '',
  effectiveDate: '',
  confidentialityLevel: '',

  releaseScope: '',
  distributionMethod: '',
  specialInstructions: '',

  requestedBy: '',
  reviewedBy: '',
  approvedBy: '',
  approvalDate: '',
  approvalComments: '',

  supportingDocuments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00043_DocumentRelease = () => {

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
      <label className="form-label">{label}</label>
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
      formId="FRM-00043"
      title="Document Release Request & Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Document release request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00043"
              title="Document Release – Request & Authorization"
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
                  {select(values,'releaseType','Release Type',['Initial Release','Revision Release','External Release','Controlled Copy Release'])}
                  {select(values,'priorityLevel','Priority Level',['Low','Medium','High','Urgent'])}
                </div>
              </div>

              {/* Document Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Document Details</h3>
                <div className="form-fields">
                  {field(values,'documentTitle','Document Title')}
                  {field(values,'documentId','Document ID')}
                  {field(values,'documentVersion','Version')}
                  {field(values,'documentOwnerDepartment','Owner / Department')}
                  {field(values,'effectiveDate','Effective Date','date')}
                  {select(values,'confidentialityLevel','Confidentiality Level',['Public','Internal','Confidential','Highly Confidential'])}
                </div>
              </div>

              {/* Release Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Release Details</h3>
                <div className="form-fields">
                  {textarea(values,'releaseScope','Release Scope / Audience')}
                  {select(values,'distributionMethod','Distribution Method',['Email','Intranet','Document Management System','Hard Copy','Mixed Distribution'])}
                  {textarea(values,'specialInstructions','Special Instructions')}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">4. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requestedBy','Requested By (Name)')}
                  {field(values,'reviewedBy','Reviewed By')}
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

export default FRM00043_DocumentRelease;
