// SubcontractorRegisterUpdateLogRegister.jsx
// FRM-01130 – Subcontractor Register Update Log

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

  // Register Info
  updateDate: Yup.string().required('Required'),
  updatedBy: Yup.string().required('Required'),

  // Subcontractor Details
  companyName: Yup.string().required('Required'),
  subcontractorId: Yup.string().required('Required'),
  projectName: Yup.string().required('Required'),
  status: Yup.string().required('Required'),

  // Update Details
  updateType: Yup.string().required('Required'),
  fieldUpdated: Yup.string().required('Required'),
  previousValue: Yup.string().required('Required'),
  newValue: Yup.string().required('Required'),
  reasonForUpdate: Yup.string().required('Required'),

  // Supporting Docs Verification
  verifiedBy: Yup.string().required('Required'),
  verificationDate: Yup.string().required('Required'),
  remarks: Yup.string().required('Required'),

  // Approval
  reviewedBy: Yup.string().required('Required'),
  reviewerDesignation: Yup.string().required('Required'),
  reviewDate: Yup.string().required('Required'),

  approvedBy: Yup.string().required('Required'),
  approverDesignation: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),

  attachments: Yup.array(),
  customFields: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  updateDate: '',
  updatedBy: '',

  companyName: '',
  subcontractorId: '',
  projectName: '',
  status: '',

  updateType: '',
  fieldUpdated: '',
  previousValue: '',
  newValue: '',
  reasonForUpdate: '',

  verifiedBy: '',
  verificationDate: '',
  remarks: '',

  reviewedBy: '',
  reviewerDesignation: '',
  reviewDate: '',

  approvedBy: '',
  approverDesignation: '',
  approvalDate: '',

  attachments: [],
  customFields: [],
  signatures: []

};

const SubcontractorRegisterUpdateLogRegister = () => {

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
            {options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </Field>
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (

    <ModernFormWrapper
      formId="FRM-01130"
      title="Subcontractor Register Update Log"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Register update log saved successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-01130"
              title="Subcontractor Register Update Log"
              department="Subcontractor & Contracting"
            >

              {/* 1. Register Info */}
              <div className="form-section">
                <h3 className="form-section-title">Register Information</h3>
                <div className="form-fields">
                  <div className="form-field">
                    <label className="form-label">Register Name</label>
                    <div className="print-value">
                      Subcontractor Master Register
                    </div>
                  </div>
                  {field(values,'updateDate','Update Date','date')}
                  {field(values,'updatedBy','Updated By')}
                </div>
              </div>

              {/* 2. Subcontractor Details */}
              <div className="form-section">
                <h3 className="form-section-title">Subcontractor Details</h3>
                <div className="form-fields">
                  {field(values,'companyName','Company Name')}
                  {field(values,'subcontractorId','Subcontractor ID / Code')}
                  {field(values,'projectName','Project Name')}
                  {select(values,'status','Status',['Active','Inactive','Suspended'])}
                </div>
              </div>

              {/* 3. Update Details */}
              <div className="form-section">
                <h3 className="form-section-title">Update Details</h3>
                <div className="form-fields">
                  {select(values,'updateType','Type of Update',['New','Modification','Removal'])}
                  {field(values,'fieldUpdated','Field Updated')}
                  {field(values,'previousValue','Previous Value')}
                  {field(values,'newValue','New Value')}
                  {textarea(values,'reasonForUpdate','Reason for Update')}
                </div>
              </div>

              {/* 4. Supporting Documents */}
              <FormAttachments values={values} />

              <div className="form-section">
                <h3 className="form-section-title">Verification</h3>
                <div className="form-fields">
                  {field(values,'verifiedBy','Verified By')}
                  {field(values,'verificationDate','Verification Date','date')}
                  {textarea(values,'remarks','Remarks')}
                </div>
              </div>

              {/* 5. Approval */}
              <div className="form-section">
                <h3 className="form-section-title">Approval / Authorization</h3>
                <div className="form-fields">
                  {field(values,'reviewedBy','Reviewed By')}
                  {field(values,'reviewerDesignation','Designation')}
                  {field(values,'reviewDate','Date','date')}

                  {field(values,'approvedBy','Approved By')}
                  {field(values,'approverDesignation','Designation')}
                  {field(values,'approvalDate','Date','date')}
                </div>
              </div>

              {/* Universal Components */}
              <FormCustomFields values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Save Log Entry
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

export default SubcontractorRegisterUpdateLogRegister;
