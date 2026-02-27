import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import SignatureComponent from '../components/SignatureComponent';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({
  vendorAgencyName: Yup.string().required('Vendor / Agency Name is required'),
  vendorType: Yup.string().required('Vendor Type is required'),
  contactPersonName: Yup.string().required('Contact Person Name is required'),
  contactEmailID: Yup.string().email('Invalid email').required('Contact Email ID is required'),
  contactMobileNumber: Yup.string().required('Contact Mobile Number is required'),
  vendorAddress: Yup.string().required('Vendor Address is required'),
  areasOfExpertise: Yup.string().required('Areas of Expertise is required'),
  experienceInRecruitment: Yup.string().required('Experience in Recruitment is required'),
  commercialTermsExterior: Yup.string().required('Commercial Terms is required'),
  geographicalCoverage: Yup.string().required('Geographical Coverage is required'),
  requestedBy: Yup.string().required('Requested By is required'),
  requestDate: Yup.string().required('Request Date is required'),
  customFields: Yup.array().of(
    Yup.object({
      fieldName: Yup.string(),
      fieldValue: Yup.string()
    })
  )
});

const initialValues = {
  vendorAgencyName: '',
  vendorType: '',
  contactPersonName: '',
  contactEmailID: '',
  contactMobileNumber: '',
  vendorAddress: '',
  areasOfExpertise: '',
  experienceInRecruitment: '',
  commercialTermsExterior: '',
  geographicalCoverage: '',
  requestedBy: '',
  requestDate: '',
  customFields: [],
  signatures: {
    requestedBy: { type: '', data: '', name: '' }
  }
};

const FRM00628 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue, errors, touched) => (
    <ModernA4Template formId="FRM-00628" title="Recruiter Vendor Empanelment – Request/Initiation Form" department="HR & People Ops">
      {/* VENDOR INFORMATION */}
      <div className="form-section">
        <h3 className="form-section-title">🏚️ Vendor / Agency Information</h3>
        <div className="form-fields">
          <div className="form-field full-width">
            <label className="form-label required">Vendor / Agency Name</label>
            {isPrintMode ? (
              <div className="print-value">{values.vendorAgencyName || '___________________'}</div>
            ) : (
              <>
                <Field name="vendorAgencyName" className="form-input" placeholder="Enter vendor / agency name" />
                <ErrorMessage name="vendorAgencyName" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Vendor Type</label>
            {isPrintMode ? (
              <div className="print-value">{values.vendorType || '___________________'}</div>
            ) : (
              <>
                <Field name="vendorType" as="select" className="form-input">
                  <option value="">-- Select Type --</option>
                  <option value="Recruitment Agency">Recruitment Agency</option>
                  <option value="Staffing Partner">Staffing Partner</option>
                  <option value="Consultant">Consultant</option>
                  <option value="Other">Other</option>
                </Field>
                <ErrorMessage name="vendorType" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field full-width">
            <label className="form-label required">Vendor Address</label>
            {isPrintMode ? (
              <div className="print-value">{values.vendorAddress || '___________________'}</div>
            ) : (
              <>
                <Field name="vendorAddress" as="textarea" className="form-textarea" placeholder="Enter complete vendor address" rows="2" />
                <ErrorMessage name="vendorAddress" component="div" className="form-error" />
              </>
            )}
          </div>
        </div>
      </div>

      {/* CONTACT INFORMATION */}
      <div className="form-section">
        <h3 className="form-section-title">📄 Contact Information</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Contact Person Name</label>
            {isPrintMode ? (
              <div className="print-value">{values.contactPersonName || '___________________'}</div>
            ) : (
              <>
                <Field name="contactPersonName" className="form-input" placeholder="Enter contact person name" />
                <ErrorMessage name="contactPersonName" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Contact Email ID</label>
            {isPrintMode ? (
              <div className="print-value">{values.contactEmailID || '___________________'}</div>
            ) : (
              <>
                <Field name="contactEmailID" type="email" className="form-input" placeholder="Enter email address" />
                <ErrorMessage name="contactEmailID" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Contact Mobile Number</label>
            {isPrintMode ? (
              <div className="print-value">{values.contactMobileNumber || '___________________'}</div>
            ) : (
              <>
                <Field name="contactMobileNumber" className="form-input" placeholder="Enter mobile number" />
                <ErrorMessage name="contactMobileNumber" component="div" className="form-error" />
              </>
            )}
          </div>
        </div>
      </div>

      {/* EXPERTISE & EXPERIENCE */}
      <div className="form-section">
        <h3 className="form-section-title">⭐ Expertise & Experience</h3>
        <div className="form-fields">
          <div className="form-field full-width">
            <label className="form-label required">Areas of Expertise / Skill Domains</label>
            {isPrintMode ? (
              <div className="print-value">{values.areasOfExpertise || '___________________'}</div>
            ) : (
              <>
                <Field name="areasOfExpertise" as="textarea" className="form-textarea" placeholder="List areas of expertise and skill domains" rows="2" />
                <ErrorMessage name="areasOfExpertise" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Experience in Recruitment (Years)</label>
            {isPrintMode ? (
              <div className="print-value">{values.experienceInRecruitment || '___________________'}</div>
            ) : (
              <>
                <Field name="experienceInRecruitment" className="form-input" placeholder="e.g., 10 years" />
                <ErrorMessage name="experienceInRecruitment" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field full-width">
            <label className="form-label required">Geographical Coverage</label>
            {isPrintMode ? (
              <div className="print-value">{values.geographicalCoverage || '___________________'}</div>
            ) : (
              <>
                <Field name="geographicalCoverage" as="textarea" className="form-textarea" placeholder="List geographic areas covered" rows="2" />
                <ErrorMessage name="geographicalCoverage" component="div" className="form-error" />
              </>
            )}
          </div>
        </div>
      </div>

      {/* COMMERCIAL TERMS */}
      <div className="form-section">
        <h3 className="form-section-title">💰 Commercial Terms</h3>
        <div className="form-fields">
          <div className="form-field full-width">
            <label className="form-label required">Commercial Terms / Fee Percentage</label>
            {isPrintMode ? (
              <div className="print-value">{values.commercialTermsExterior || '___________________'}</div>
            ) : (
              <>
                <Field name="commercialTermsExterior" as="textarea" className="form-textarea" placeholder="Enter commercial terms, fee percentage, and payment conditions" rows="3" />
                <ErrorMessage name="commercialTermsExterior" component="div" className="form-error" />
              </>
            )}
          </div>
        </div>
      </div>

      {/* REQUEST INFORMATION */}
      <div className="form-section">
        <h3 className="form-section-title">🕐 Request Information</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Requested By (HR / Talent Acquisition Name)</label>
            {isPrintMode ? (
              <div className="print-value">{values.requestedBy || '___________________'}</div>
            ) : (
              <>
                <Field name="requestedBy" className="form-input" placeholder="Enter requester name" />
                <ErrorMessage name="requestedBy" component="div" className="form-error" />
              </>
            )}
          </div>
          <div className="form-field">
            <label className="form-label required">Request Date</label>
            {isPrintMode ? (
              <div className="print-value">{values.requestDate || '___________________'}</div>
            ) : (
              <>
                <Field name="requestDate" type="date" className="form-input" />
                <ErrorMessage name="requestDate" component="div" className="form-error" />
              </>
            )}
          </div>
        </div>
      </div>

      {/* ADDITIONAL CUSTOM FIELDS */}
      {!isPrintMode && (
        <div className="form-section">
          <h3 className="form-section-title">➕ Additional Custom Fields</h3>
          <FieldArray name="customFields">
            {(fieldArrayProps) => {
              const { push, remove, form } = fieldArrayProps;
              const { values: formValues } = form;
              const { customFields } = formValues;
              return (
                <div>
                  {customFields.map((field, index) => (
                    <div key={field.id || index} className="custom-field-row">
                      <div className="form-field">
                        <Field name={`customFields.${index}.fieldName`} className="form-input" placeholder="Field Name" />
                      </div>
                      <div className="form-field" style={{ flex: 2 }}>
                        <Field name={`customFields.${index}.fieldValue`} className="form-input" placeholder="Field Value" />
                      </div>
                      <button type="button" className="btn-remove" onClick={() => remove(index)}>✕ Remove</button>
                    </div>
                  ))}
                  <button type="button" className="btn-add-field" onClick={() => push({ id: uuidv4(), fieldName: '', fieldValue: '' })}>➕ Add Field</button>
                </div>
              );
            }}
          </FieldArray>
        </div>
      )}

      {isPrintMode && values.customFields && values.customFields.length > 0 && (
        <div className="form-section">
          <h3 className="form-section-title">➕ Additional Fields</h3>
          <div className="form-fields">
            {values.customFields.map((field, index) => (
              <div key={index} className="form-field full-width custom-field-print">
                <strong>{field.fieldName}:</strong> {field.fieldValue || '___________________'}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SIGNATURES */}
      <div className="form-section signatures-section">
        <h3 className="form-section-title">✍️ Digital Signatures & Approvals</h3>
        {!isPrintMode && (
          <div className="signatures-container">
            <SignatureComponent name="Requested By" onChange={(sig) => setFieldValue('signatures.requestedBy', sig)} value={values.signatures.requestedBy} />
          </div>
        )}
        {isPrintMode && (
          <div className="print-signatures">
            <div className="print-signature-box">
              <div className="sig-name">Requested By</div>
              <div className="sig-space">
                {values.signatures.requestedBy?.data && <img src={values.signatures.requestedBy.data} alt="Signature" className="print-sig-image" style={{ maxWidth: '100%', maxHeight: '80px' }} />}
              </div>
              <div className="sig-line"></div>
              <div className="sig-date">{values.signatures.requestedBy?.name && `Name: ${values.signatures.requestedBy.name}`}</div>
            </div>
          </div>
        )}
      </div>

      {/* SUBMIT BUTTON */}
      {!isPrintMode && (
        <div className="form-actions">
          <button type="submit" className="btn-submit">💾 Save Form</button>
        </div>
      )}
    </ModernA4Template>
  );

  return (
    <ModernFormWrapper formId="FRM-00628" title="Recruiter Vendor Empanelment – Request/Initiation Form">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => console.log('Form submitted:', values)} >
        {({ values, setFieldValue, errors, touched }) => <Form>{renderFormContent(values, setFieldValue, errors, touched)}</Form>}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00628;
