import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import SignatureComponent from '../components/SignatureComponent';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({
  misID: Yup.string().required('MIS ID is required'),
  candidateName: Yup.string().required('Candidate Name is required'),
  dateOfBirth: Yup.string().required('Date of Birth is required'),
  gender: Yup.string().required('Gender is required'),
  category: Yup.string().required('Category is required'),
  qualification: Yup.string().required('Qualification is required'),
  totalExperience: Yup.string().required('Total Experience is required'),
  panNumber: Yup.string().required('PAN Number is required'),
  aadhaarNumber: Yup.string().required('Aadhaar Number is required'),
  epfStatus: Yup.string(),
  esiStatus: Yup.string(),
  maritalStatus: Yup.string(),
  permanentAddress: Yup.string().required('Permanent Address is required'),
  contactNumber: Yup.string().required('Contact Number is required'),
  emailID: Yup.string().email('Invalid email'),
  recordCreatedDate: Yup.string().required('Record Created Date is required'),
  approvedBy: Yup.string().required('Approved By is required')
});

const initialValues = {
  misID: '',
  candidateName: '',
  dateOfBirth: '',
  gender: '',
  category: '',
  qualification: '',
  totalExperience: '',
  panNumber: '',
  aadhaarNumber: '',
  epfStatus: '',
  esiStatus: '',
  maritalStatus: '',
  permanentAddress: '',
  contactNumber: '',
  emailID: '',
  recordCreatedDate: '',
  approvedBy: '',
  signatures: {
    recordkeeper: { type: '', data: '', name: '' }
  }
};

const FRM00633 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue, errors, touched) => (
    <ModernA4Template formId="FRM-00633" title="Recruitment MIS Update – Report / Record Form" department="HR & People Ops">
      {/* 📋 MIS Record Information */}
      <div className="form-section">
        <h3 className="form-section-title">MIS Record Information</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field">
              <label className="form-label required">MIS ID</label>
              {isPrintMode ? (
                <div className="print-value">{values.misID || '___________________'}</div>
              ) : (
                <>
                  <Field name="misID" type="text" className="form-input" placeholder="Enter MIS ID" />
                  <ErrorMessage name="misID" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
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

      {/* 👤 Personal Information */}
      <div className="form-section">
        <h3 className="form-section-title">Personal Information</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Candidate Name</label>
            {isPrintMode ? (
              <div className="print-value">{values.candidateName || '___________________'}</div>
            ) : (
              <>
                <Field name="candidateName" type="text" className="form-input" placeholder="Enter candidate name" />
                <ErrorMessage name="candidateName" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
              </>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field">
              <label className="form-label required">Date of Birth</label>
              {isPrintMode ? (
                <div className="print-value">{values.dateOfBirth || '___________________'}</div>
              ) : (
                <>
                  <Field name="dateOfBirth" type="date" className="form-input" />
                  <ErrorMessage name="dateOfBirth" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
            <div className="form-field">
              <label className="form-label required">Gender</label>
              {isPrintMode ? (
                <div className="print-value">{values.gender || '___________________'}</div>
              ) : (
                <>
                  <Field name="gender" as="select" className="form-input">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage name="gender" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
            <div className="form-field">
              <label className="form-label">Marital Status</label>
              {isPrintMode ? (
                <div className="print-value">{values.maritalStatus || '___________________'}</div>
              ) : (
                <>
                  <Field name="maritalStatus" as="select" className="form-input">
                    <option value="">Select</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </Field>
                  <ErrorMessage name="maritalStatus" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field">
              <label className="form-label required">Category</label>
              {isPrintMode ? (
                <div className="print-value">{values.category || '___________________'}</div>
              ) : (
                <>
                  <Field name="category" as="select" className="form-input">
                    <option value="">Select Category</option>
                    <option value="SC">SC (Scheduled Caste)</option>
                    <option value="ST">ST (Scheduled Tribe)</option>
                    <option value="BC">BC (Backward Class)</option>
                    <option value="MBC">MBC (Most Backward Class)</option>
                    <option value="OBC">OBC (Other Backward Class)</option>
                    <option value="GENERAL">GENERAL</option>
                  </Field>
                  <ErrorMessage name="category" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
            <div className="form-field">
              <label className="form-label required">Qualification</label>
              {isPrintMode ? (
                <div className="print-value">{values.qualification || '___________________'}</div>
              ) : (
                <>
                  <Field name="qualification" type="text" className="form-input" placeholder="e.g., B.Tech, MBA" />
                  <ErrorMessage name="qualification" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
          </div>

          <div className="form-field" style={{ marginTop: '15px' }}>
            <label className="form-label required">Total Experience (Years)</label>
            {isPrintMode ? (
              <div className="print-value">{values.totalExperience || '___________________'}</div>
            ) : (
              <>
                <Field name="totalExperience" type="number" className="form-input" placeholder="Total years of experience" />
                <ErrorMessage name="totalExperience" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* 🏛️ Compliance & Document Details */}
      <div className="form-section">
        <h3 className="form-section-title">Compliance & Document Details</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field">
              <label className="form-label required">PAN Number</label>
              {isPrintMode ? (
                <div className="print-value">{values.panNumber || '___________________'}</div>
              ) : (
                <>
                  <Field name="panNumber" type="text" className="form-input" placeholder="PAN Number" />
                  <ErrorMessage name="panNumber" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
            <div className="form-field">
              <label className="form-label required">Aadhaar Number</label>
              {isPrintMode ? (
                <div className="print-value">{values.aadhaarNumber || '___________________'}</div>
              ) : (
                <>
                  <Field name="aadhaarNumber" type="text" className="form-input" placeholder="Aadhaar Number" />
                  <ErrorMessage name="aadhaarNumber" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field">
              <label className="form-label">EPF Status</label>
              {isPrintMode ? (
                <div className="print-value">{values.epfStatus || '___________________'}</div>
              ) : (
                <>
                  <Field name="epfStatus" as="select" className="form-input">
                    <option value="">Select</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Not Applicable">Not Applicable</option>
                  </Field>
                  <ErrorMessage name="epfStatus" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
            <div className="form-field">
              <label className="form-label">ESI Status</label>
              {isPrintMode ? (
                <div className="print-value">{values.esiStatus || '___________________'}</div>
              ) : (
                <>
                  <Field name="esiStatus" as="select" className="form-input">
                    <option value="">Select</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Not Applicable">Not Applicable</option>
                  </Field>
                  <ErrorMessage name="esiStatus" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 📞 Contact Information */}
      <div className="form-section">
        <h3 className="form-section-title">Contact Information</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Permanent Address</label>
            {isPrintMode ? (
              <div className="print-value" style={{ whiteSpace: 'pre-wrap' }}>{values.permanentAddress || '___________________'}</div>
            ) : (
              <>
                <Field name="permanentAddress" as="textarea" className="form-input" placeholder="Enter permanent address" rows="2" />
                <ErrorMessage name="permanentAddress" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
              </>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field">
              <label className="form-label required">Contact Number</label>
              {isPrintMode ? (
                <div className="print-value">{values.contactNumber || '___________________'}</div>
              ) : (
                <>
                  <Field name="contactNumber" type="tel" className="form-input" placeholder="Contact number" />
                  <ErrorMessage name="contactNumber" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
            <div className="form-field">
              <label className="form-label">Email ID</label>
              {isPrintMode ? (
                <div className="print-value">{values.emailID || '___________________'}</div>
              ) : (
                <>
                  <Field name="emailID" type="email" className="form-input" placeholder="Email address" />
                  <ErrorMessage name="emailID" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Approval Information</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Approved By</label>
            {isPrintMode ? (
              <div className="print-value">{values.approvedBy || '___________________'}</div>
            ) : (
              <>
                <Field name="approvedBy" type="text" className="form-input" placeholder="Name of person who approved this record" />
                <ErrorMessage name="approvedBy" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* 🖊️ Signature */}
      {!isPrintMode && (
        <div className="form-section">
          <h3 className="form-section-title">🖊️ Record Keeper Signature</h3>
          <div className="form-fields">
            <SignatureComponent label="Record Keeper Signature" onChange={(data) => setFieldValue('signatures.recordkeeper.data', data)} />
            <div style={{ marginTop: '15px' }}>
              <label className="form-label">Name (Print)</label>
              <Field name="signatures.recordkeeper.name" type="text" className="form-input" placeholder="Enter name" />
            </div>
          </div>
        </div>
      )}
    </ModernA4Template>
  );

  return (
    <ModernFormWrapper formId="FRM-00633" title="Recruitment MIS Update – Report / Record Form">
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
                  Save Record
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00633;
