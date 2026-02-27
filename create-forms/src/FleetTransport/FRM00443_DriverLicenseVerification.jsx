// FRM00443_DriverLicenseVerification.jsx
// FRM-00443 – Driver License Verification – Checklist Form

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

  employeeName: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),

  licenseNumber: Yup.string().required('Required'),
  licenseType: Yup.string().required('Required'),
  issuingAuthority: Yup.string().required('Required'),
  issueDate: Yup.string().required('Required'),
  expiryDate: Yup.string().required('Required'),
  verificationDate: Yup.string().required('Required'),
  verifiedBy: Yup.string().required('Required'),

  licenseCopyAttached: Yup.string().required('Required'),
  originalVerified: Yup.string().required('Required'),
  detailsMatchRecords: Yup.string().required('Required'),
  noVisibleDamage: Yup.string().required('Required'),
  validForVehicleCategory: Yup.string().required('Required'),

  remarks: Yup.string().required('Required'),

  preparedBy: Yup.string().required('Required'),
  reviewedBy: Yup.string().required('Required'),
  approvedBy: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  employeeName: '',
  employeeId: '',
  department: '',
  contactNumber: '',

  licenseNumber: '',
  licenseType: '',
  issuingAuthority: '',
  issueDate: '',
  expiryDate: '',
  verificationDate: '',
  verifiedBy: '',

  licenseCopyAttached: '',
  originalVerified: '',
  detailsMatchRecords: '',
  noVisibleDamage: '',
  validForVehicleCategory: '',

  remarks: '',

  preparedBy: '',
  reviewedBy: '',
  approvedBy: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00443_DriverLicenseVerification = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type = 'text') => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '_________'}</div>
      ) : (
        <>
          <Field name={name} type={type} className="form-input" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  const selectYesNo = (values, name, label) => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '_________'}</div>
      ) : (
        <>
          <Field as="select" name={name} className="form-input">
            <option value="">-- Select --</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Field>
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  const textarea = (values, name, label) => (
    <div className="form-field full-width">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '_________'}</div>
      ) : (
        <>
          <Field as="textarea" name={name} className="form-textarea" rows="3" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (

    <ModernFormWrapper
      formId="FRM-00443"
      title="Driver License Verification – Checklist"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Driver license verification submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00443"
              title="Driver License Verification"
              department="Fleet & Transport – Compliance & Permits"
            >

              {/* Driver Details */}
              <div className="form-section">
                <h3 className="form-section-title">1. Employee / Driver Details</h3>
                <div className="form-fields">
                  {field(values,'employeeName','Employee / Driver Name')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'department','Department')}
                  {field(values,'contactNumber','Contact Number')}
                </div>
              </div>

              {/* License Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. License Details</h3>
                <div className="form-fields">
                  {field(values,'licenseNumber','License Number')}
                  {field(values,'licenseType','License Type / Class')}
                  {field(values,'issuingAuthority','Issuing Authority')}
                  {field(values,'issueDate','Issue Date','date')}
                  {field(values,'expiryDate','Expiry Date','date')}
                  {field(values,'verificationDate','Verification Date','date')}
                  {field(values,'verifiedBy','Verified By')}
                </div>
              </div>

              {/* Verification Checklist */}
              <div className="form-section">
                <h3 className="form-section-title">3. Verification Checklist</h3>
                <div className="form-fields">
                  {selectYesNo(values,'licenseCopyAttached','License Copy Attached')}
                  {selectYesNo(values,'originalVerified','Original Verified')}
                  {selectYesNo(values,'detailsMatchRecords','Details Match Employee Records')}
                  {selectYesNo(values,'noVisibleDamage','No Visible Damage / Tampering')}
                  {selectYesNo(values,'validForVehicleCategory','Valid for Required Vehicle Category')}
                  {textarea(values,'remarks','Remarks')}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">4. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'reviewedBy','Reviewed By')}
                  {field(values,'approvedBy','Approved By')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Verification
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

export default FRM00443_DriverLicenseVerification;
