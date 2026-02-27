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
  vendorID: Yup.string().required('Vendor ID is required'),
  vendorAgencyName: Yup.string().required('Vendor / Agency Name is required'),
  vendorType: Yup.string().required('Vendor Type is required'),
  contactPersonName: Yup.string().required('Contact Person Name is required'),
  contactDetails: Yup.string().required('Contact Details is required'),
  areasOfExpertise: Yup.string().required('Areas of Expertise is required'),
  commercialTermsFeePercentage: Yup.string().required('Commercial Terms (Fee %) is required'),
  empanelmentStatus: Yup.string().required('Empanelment Status is required'),
  empanelmentStartDate: Yup.string().required('Empanelment Start Date is required'),
  empanelmentEndDate: Yup.string(),
  approvedBy: Yup.string().required('Approved By is required'),
  approvalDate: Yup.string().required('Approval Date is required'),
  recordCreatedDate: Yup.string().required('Record Created Date is required'),
  customFields: Yup.array().of(
    Yup.object({
      fieldName: Yup.string(),
      fieldValue: Yup.string()
    })
  )
});

const initialValues = {
  vendorID: '',
  vendorAgencyName: '',
  vendorType: '',
  contactPersonName: '',
  contactDetails: '',
  areasOfExpertise: '',
  commercialTermsFeePercentage: '',
  empanelmentStatus: '',
  empanelmentStartDate: '',
  empanelmentEndDate: '',
  approvedBy: '',
  approvalDate: '',
  recordCreatedDate: '',
  customFields: [],
  signatures: {
    recordPreparedBy: { type: '', data: '', name: '' }
  }
};

const FRM00630 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue, errors, touched) => (
    <ModernA4Template formId="FRM-00630" title="Recruiter Vendor Empanelment – Report/Record" department="HR & People Ops">
      {/* 📋 Vendor Master Record Section */}
      <div className="form-section">
        <h3 className="form-section-title">📋 Vendor Master Record</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field">
              <label className="form-label required">Vendor ID</label>
              {isPrintMode ? (
                <div className="print-value">{values.vendorID || '___________________'}</div>
              ) : (
                <>
                  <Field name="vendorID" type="text" className="form-input" placeholder="Enter vendor ID" />
                  <ErrorMessage name="vendorID" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
            <div className="form-field">
              <label className="form-label required">Vendor / Agency Name</label>
              {isPrintMode ? (
                <div className="print-value">{values.vendorAgencyName || '___________________'}</div>
              ) : (
                <>
                  <Field name="vendorAgencyName" type="text" className="form-input" placeholder="Enter vendor agency name" />
                  <ErrorMessage name="vendorAgencyName" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field">
              <label className="form-label required">Vendor Type</label>
              {isPrintMode ? (
                <div className="print-value">{values.vendorType || '___________________'}</div>
              ) : (
                <>
                  <Field name="vendorType" as="select" className="form-input">
                    <option value="">Select Vendor Type</option>
                    <option value="Recruitment Agency">Recruitment Agency</option>
                    <option value="Staffing Partner">Staffing Partner</option>
                    <option value="Consultant">Consultant</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage name="vendorType" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
            <div className="form-field">
              <label className="form-label required">Contact Person Name</label>
              {isPrintMode ? (
                <div className="print-value">{values.contactPersonName || '___________________'}</div>
              ) : (
                <>
                  <Field name="contactPersonName" type="text" className="form-input" placeholder="Enter contact person name" />
                  <ErrorMessage name="contactPersonName" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 📞 Contact & Expertise Details */}
      <div className="form-section">
        <h3 className="form-section-title">📞 Contact & Expertise Details</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Contact Details</label>
            {isPrintMode ? (
              <div className="print-value" style={{ whiteSpace: 'pre-wrap' }}>{values.contactDetails || '___________________'}</div>
            ) : (
              <>
                <Field name="contactDetails" as="textarea" className="form-input" placeholder="Enter contact details (email, phone, address)" rows="3" />
                <ErrorMessage name="contactDetails" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
              </>
            )}
          </div>

          <div className="form-field" style={{ marginTop: '15px' }}>
            <label className="form-label required">Areas of Expertise</label>
            {isPrintMode ? (
              <div className="print-value" style={{ whiteSpace: 'pre-wrap' }}>{values.areasOfExpertise || '___________________'}</div>
            ) : (
              <>
                <Field name="areasOfExpertise" as="textarea" className="form-input" placeholder="Enter expertise areas (e.g., IT, Finance, Operations)" rows="3" />
                <ErrorMessage name="areasOfExpertise" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* 💼 Empanelment Details & Dates */}
      <div className="form-section">
        <h3 className="form-section-title">💼 Empanelment Details & Dates</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            <div className="form-field">
              <label className="form-label required">Commercial Terms (Fee %)</label>
              {isPrintMode ? (
                <div className="print-value">{values.commercialTermsFeePercentage || '___________________'}</div>
              ) : (
                <>
                  <Field name="commercialTermsFeePercentage" type="text" className="form-input" placeholder="Enter fee percentage" />
                  <ErrorMessage name="commercialTermsFeePercentage" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
            <div className="form-field">
              <label className="form-label required">Empanelment Status</label>
              {isPrintMode ? (
                <div className="print-value">{values.empanelmentStatus || '___________________'}</div>
              ) : (
                <>
                  <Field name="empanelmentStatus" as="select" className="form-input">
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Field>
                  <ErrorMessage name="empanelmentStatus" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
            <div className="form-field">
              <label className="form-label required">Empanelment Start Date</label>
              {isPrintMode ? (
                <div className="print-value">{values.empanelmentStartDate || '___________________'}</div>
              ) : (
                <>
                  <Field name="empanelmentStartDate" type="date" className="form-input" />
                  <ErrorMessage name="empanelmentStartDate" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field">
              <label className="form-label">Empanelment End Date</label>
              {isPrintMode ? (
                <div className="print-value">{values.empanelmentEndDate || '___________________'}</div>
              ) : (
                <>
                  <Field name="empanelmentEndDate" type="date" className="form-input" />
                  <ErrorMessage name="empanelmentEndDate" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
            <div className="form-field">
              <label className="form-label required">Record Created Date</label>
              {isPrintMode ? (
                <div className="print-value">{values.recordCreatedDate || '___________________'}</div>
              ) : (
                <>
                  <Field name="recordCreatedDate" type="date" className="form-input" />
                  <ErrorMessage name="recordCreatedDate" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Approval & Authorization */}
      <div className="form-section">
        <h3 className="form-section-title">✅ Approval & Authorization</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field">
              <label className="form-label required">Approved By</label>
              {isPrintMode ? (
                <div className="print-value">{values.approvedBy || '___________________'}</div>
              ) : (
                <>
                  <Field name="approvedBy" type="text" className="form-input" placeholder="Enter approver name" />
                  <ErrorMessage name="approvedBy" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
            <div className="form-field">
              <label className="form-label required">Approval Date</label>
              {isPrintMode ? (
                <div className="print-value">{values.approvalDate || '___________________'}</div>
              ) : (
                <>
                  <Field name="approvalDate" type="date" className="form-input" />
                  <ErrorMessage name="approvalDate" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 📝 Custom Fields */}
      {!isPrintMode && (
        <div className="form-section">
          <h3 className="form-section-title">📝 Additional Fields</h3>
          <FieldArray name="customFields">
            {(fieldArrayProps) => (
              <div className="form-fields">
                {fieldArrayProps.form.values.customFields.map((field, index) => (
                  <div key={field.id || index} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '10px', marginBottom: '10px', alignItems: 'flex-end' }}>
                    <Field name={`customFields.${index}.fieldName`} placeholder="Field Name" className="form-input" />
                    <Field name={`customFields.${index}.fieldValue`} placeholder="Field Value" className="form-input" />
                    <button type="button" onClick={() => fieldArrayProps.remove(index)} style={{ padding: '8px 12px', backgroundColor: '#d9534f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                      Remove
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => fieldArrayProps.push({ id: uuidv4(), fieldName: '', fieldValue: '' })} style={{ padding: '8px 16px', backgroundColor: '#5cb85c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', marginTop: '10px' }}>
                  + Add Field
                </button>
              </div>
            )}
          </FieldArray>
        </div>
      )}

      {/* 🖊️ Signatures */}
      {!isPrintMode && (
        <div className="form-section">
          <h3 className="form-section-title">🖊️ Record Prepared By</h3>
          <div className="form-fields">
            <SignatureComponent label="Record Prepared By Signature" onChange={(data) => setFieldValue('signatures.recordPreparedBy.data', data)} />
            <div style={{ marginTop: '15px' }}>
              <label className="form-label">Name (Print)</label>
              <Field name="signatures.recordPreparedBy.name" type="text" className="form-input" placeholder="Enter name" />
            </div>
          </div>
        </div>
      )}

      {isPrintMode && values.signatures?.recordPreparedBy?.data && (
        <div className="form-section">
          <h3 className="form-section-title">🖊️ Record Prepared By</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '20px' }}>
            <div>
              <img src={values.signatures.recordPreparedBy.data} alt="Record Prepared By Signature" style={{ height: '80px', border: '1px solid #ddd' }} />
              <div style={{ fontSize: '12px', marginTop: '5px', fontWeight: 'bold' }}>Record Prepared By</div>
            </div>
            <div style={{ fontSize: '12px' }}>
              <div>Name: {values.signatures.recordPreparedBy.name || '___________________'}</div>
            </div>
          </div>
        </div>
      )}
    </ModernA4Template>
  );

  return (
    <ModernFormWrapper formId="FRM-00630" title="Recruiter Vendor Empanelment – Report/Record">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Form Submitted:', values);
          alert('Form submitted successfully!');
        }}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            {renderFormContent(values, setFieldValue, errors, touched)}
            {!isPrintMode && (
              <div style={{ textAlign: 'center', marginTop: '30px', paddingBottom: '30px' }}>
                <button type="submit" style={{ padding: '12px 30px', backgroundColor: '#5cb85c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', marginRight: '10px' }}>
                  💾 Save Form
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00630;
