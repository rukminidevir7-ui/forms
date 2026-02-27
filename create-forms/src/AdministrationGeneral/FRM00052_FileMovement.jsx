// FRM00052_FileMovement.jsx
// FRM-00052 – File Movement Request & Authorization Form

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
  movementType: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // File Details
  fileTitle: Yup.string().required('Required'),
  fileId: Yup.string().required('Required'),
  fileOwnerDepartment: Yup.string().required('Required'),
  currentLocation: Yup.string().required('Required'),
  confidentialityLevel: Yup.string().required('Required'),
  numberOfFiles: Yup.number().required('Required'),

  // Movement Details
  fromLocation: Yup.string().required('Required'),
  toLocation: Yup.string().required('Required'),
  requestedMovementDate: Yup.string().required('Required'),
  expectedReturnDate: Yup.string(),
  movementJustification: Yup.string().required('Required'),

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
  movementType: '',
  priorityLevel: '',

  fileTitle: '',
  fileId: '',
  fileOwnerDepartment: '',
  currentLocation: '',
  confidentialityLevel: '',
  numberOfFiles: '',

  fromLocation: '',
  toLocation: '',
  requestedMovementDate: '',
  expectedReturnDate: '',
  movementJustification: '',

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

const FRM00052_FileMovement = () => {

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
      formId="FRM-00052"
      title="File Movement Request & Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('File movement request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00052"
              title="File Movement – Request & Authorization"
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
                  {select(values,'movementType','Movement Type',['Temporary Movement','Permanent Transfer','Archive Transfer','External Submission'])}
                  {select(values,'priorityLevel','Priority Level',['Low','Medium','High','Urgent'])}
                </div>
              </div>

              {/* File Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. File Details</h3>
                <div className="form-fields">
                  {field(values,'fileTitle','File Title / Name')}
                  {field(values,'fileId','File ID / Number')}
                  {field(values,'fileOwnerDepartment','Owner / Department')}
                  {field(values,'currentLocation','Current Location')}
                  {select(values,'confidentialityLevel','Confidentiality Level',['Public','Internal','Confidential','Highly Confidential'])}
                  {field(values,'numberOfFiles','Number of Files','number')}
                </div>
              </div>

              {/* Movement Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Movement Details</h3>
                <div className="form-fields">
                  {field(values,'fromLocation','From Location')}
                  {field(values,'toLocation','To Location')}
                  {field(values,'requestedMovementDate','Requested Movement Date','date')}
                  {field(values,'expectedReturnDate','Expected Return Date','date')}
                  {textarea(values,'movementJustification','Purpose / Justification')}
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

export default FRM00052_FileMovement;
