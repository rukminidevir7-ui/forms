// FRM00440_PermitRenewal.jsx
// FRM-00440 – Permit Renewal – Request / Initiation Form

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

  // Header Information
  formDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  location: Yup.string().required('Required'),

  // Requester Details
  requesterName: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  requesterDepartment: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),

  // Vehicle Details
  vehicleNumber: Yup.string().required('Required'),
  vehicleType: Yup.string().required('Required'),
  makeModel: Yup.string().required('Required'),
  registrationNumber: Yup.string().required('Required'),
  currentPermitNumber: Yup.string().required('Required'),
  permitExpiryDate: Yup.string().required('Required'),

  // Renewal Details
  permitType: Yup.string().required('Required'),
  renewalPeriod: Yup.string().required('Required'),
  issuingAuthority: Yup.string().required('Required'),
  renewalReason: Yup.string().required('Required'),

  // Compliance Checklist
  insuranceValid: Yup.string().required('Required'),
  pucValid: Yup.string().required('Required'),
  fitnessValid: Yup.string().required('Required'),
  noPendingViolations: Yup.string().required('Required'),
  documentsVerified: Yup.string().required('Required'),

  // Financial Details
  renewalFees: Yup.number().typeError('Must be a number').required('Required'),
  paymentMode: Yup.string().required('Required'),
  paymentReference: Yup.string().required('Required'),

  // Review Section
  reviewedBy: Yup.string().required('Required'),
  reviewRemarks: Yup.string().required('Required'),
  reviewDate: Yup.string().required('Required'),

  // Authorization
  approvedBy: Yup.string().required('Required'),
  designation: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),

  // Completion Details
  renewalStatus: Yup.string().required('Required'),
  newPermitNumber: Yup.string(),
  newValidTill: Yup.string(),
  updatedBy: Yup.string(),
  dateClosed: Yup.string(),

  // Notes
  additionalNotes: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  formDate: '',
  department: '',
  location: '',

  requesterName: '',
  employeeId: '',
  requesterDepartment: '',
  contactNumber: '',
  email: '',

  vehicleNumber: '',
  vehicleType: '',
  makeModel: '',
  registrationNumber: '',
  currentPermitNumber: '',
  permitExpiryDate: '',

  permitType: '',
  renewalPeriod: '',
  issuingAuthority: '',
  renewalReason: '',

  insuranceValid: '',
  pucValid: '',
  fitnessValid: '',
  noPendingViolations: '',
  documentsVerified: '',

  renewalFees: '',
  paymentMode: '',
  paymentReference: '',

  reviewedBy: '',
  reviewRemarks: '',
  reviewDate: '',

  approvedBy: '',
  designation: '',
  approvalDate: '',

  renewalStatus: '',
  newPermitNumber: '',
  newValidTill: '',
  updatedBy: '',
  dateClosed: '',

  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00440_PermitRenewal = () => {

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

  return (

    <ModernFormWrapper
      formId="FRM-00440"
      title="Permit Renewal – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Permit renewal request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00440"
              title="Permit Renewal"
              department="Fleet & Transport – Compliance & Permits"
            >

              {/* 1. Header */}
              <div className="form-section">
                <h3 className="form-section-title">1. Header Information</h3>
                <div className="form-fields">
                  {field(values,'formDate','Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'location','Location')}
                </div>
              </div>

              {/* 2. Requester */}
              <div className="form-section">
                <h3 className="form-section-title">2. Requester Details</h3>
                <div className="form-fields">
                  {field(values,'requesterName','Name')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'requesterDepartment','Department')}
                  {field(values,'contactNumber','Contact Number')}
                  {field(values,'email','Email','email')}
                </div>
              </div>

              {/* 3. Vehicle */}
              <div className="form-section">
                <h3 className="form-section-title">3. Vehicle / Asset Details</h3>
                <div className="form-fields">
                  {field(values,'vehicleNumber','Vehicle Number')}
                  {field(values,'vehicleType','Vehicle Type')}
                  {field(values,'makeModel','Make / Model')}
                  {field(values,'registrationNumber','Registration Number')}
                  {field(values,'currentPermitNumber','Current Permit Number')}
                  {field(values,'permitExpiryDate','Permit Expiry Date','date')}
                </div>
              </div>

              {/* 4. Renewal */}
              <div className="form-section">
                <h3 className="form-section-title">4. Renewal Details</h3>
                <div className="form-fields">
                  {field(values,'permitType','Type of Permit')}
                  {field(values,'renewalPeriod','Renewal Period')}
                  {field(values,'issuingAuthority','Authority / Issuing Office')}
                  {textarea(values,'renewalReason','Renewal Reason / Notes')}
                </div>
              </div>

              {/* 5. Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">5. Compliance Checklist</h3>
                <div className="form-fields">
                  {selectYesNo(values,'insuranceValid','Insurance Valid')}
                  {selectYesNo(values,'pucValid','PUC Valid')}
                  {selectYesNo(values,'fitnessValid','Fitness Valid')}
                  {selectYesNo(values,'noPendingViolations','No Pending Violations')}
                  {selectYesNo(values,'documentsVerified','Documents Verified')}
                </div>
              </div>

              {/* 6. Financial */}
              <div className="form-section">
                <h3 className="form-section-title">6. Financial Details</h3>
                <div className="form-fields">
                  {field(values,'renewalFees','Renewal Fees','number')}
                  {field(values,'paymentMode','Payment Mode')}
                  {field(values,'paymentReference','Payment Reference')}
                </div>
              </div>

              {/* 7. Review */}
              <div className="form-section">
                <h3 className="form-section-title">7. Review Section</h3>
                <div className="form-fields">
                  {field(values,'reviewedBy','Reviewed By')}
                  {textarea(values,'reviewRemarks','Remarks')}
                  {field(values,'reviewDate','Date','date')}
                </div>
              </div>

              {/* 8. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">8. Authorization</h3>
                <div className="form-fields">
                  {field(values,'approvedBy','Approved By')}
                  {field(values,'designation','Designation')}
                  {field(values,'approvalDate','Date','date')}
                </div>
              </div>

              {/* 9. Completion */}
              <div className="form-section">
                <h3 className="form-section-title">9. Completion Details</h3>
                <div className="form-fields">
                  {field(values,'renewalStatus','Renewal Status')}
                  {field(values,'newPermitNumber','New Permit Number')}
                  {field(values,'newValidTill','New Valid Till','date')}
                  {field(values,'updatedBy','Updated By')}
                  {field(values,'dateClosed','Date Closed','date')}
                </div>
              </div>

              {/* 10. Notes */}
              <div className="form-section">
                <h3 className="form-section-title">10. Notes / Attachments</h3>
                <div className="form-fields">
                  {textarea(values,'additionalNotes','Additional Notes')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Permit Renewal
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

export default FRM00440_PermitRenewal;
