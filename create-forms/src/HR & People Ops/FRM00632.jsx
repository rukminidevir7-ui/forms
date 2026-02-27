import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import SignatureComponent from '../components/SignatureComponent';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({
  candidateName: Yup.string().required('Candidate Name is required'),
  applicationID: Yup.string().required('Application ID is required'),
  positionAppliedFor: Yup.string().required('Position Applied For is required'),
  department: Yup.string().required('Department is required'),
  misDataVerified: Yup.string().required('MIS Data Verified is required'),
  documentsVerified: Yup.string().required('Documents Verified is required'),
  approvalStatus: Yup.string().required('Approval Status is required'),
  verifiedBy: Yup.string().required('Verified By (HR Name) is required'),
  approvalDate: Yup.string().required('Approval Date is required'),
  remarks: Yup.string()
});

const initialValues = {
  candidateName: '',
  applicationID: '',
  positionAppliedFor: '',
  department: '',
  misDataVerified: '',
  documentsVerified: '',
  approvalStatus: '',
  verifiedBy: '',
  approvalDate: '',
  remarks: '',
  signatures: {
    approvedBy: { type: '', data: '', name: '' }
  }
};

const FRM00632 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue, errors, touched) => (
    <ModernA4Template formId="FRM-00632" title="Recruitment MIS Update – Approval Form" department="HR & People Ops">
      <div className="form-section">
        <h3 className="form-section-title">Candidate Information</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
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
            <div className="form-field">
              <label className="form-label required">Application ID</label>
              {isPrintMode ? (
                <div className="print-value">{values.applicationID || '___________________'}</div>
              ) : (
                <>
                  <Field name="applicationID" type="text" className="form-input" placeholder="Enter application ID" />
                  <ErrorMessage name="applicationID" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field">
              <label className="form-label required">Position Applied For</label>
              {isPrintMode ? (
                <div className="print-value">{values.positionAppliedFor || '___________________'}</div>
              ) : (
                <>
                  <Field name="positionAppliedFor" type="text" className="form-input" placeholder="Enter position title" />
                  <ErrorMessage name="positionAppliedFor" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
            <div className="form-field">
              <label className="form-label required">Department</label>
              {isPrintMode ? (
                <div className="print-value">{values.department || '___________________'}</div>
              ) : (
                <>
                  <Field name="department" type="text" className="form-input" placeholder="Enter department" />
                  <ErrorMessage name="department" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-section-title">Verification Status</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field">
              <label className="form-label required">MIS Data Verified (Yes / No)</label>
              {isPrintMode ? (
                <div className="print-value">{values.misDataVerified || '___________________'}</div>
              ) : (
                <>
                  <Field name="misDataVerified" as="select" className="form-input">
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </Field>
                  <ErrorMessage name="misDataVerified" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
            <div className="form-field">
              <label className="form-label required">Documents Verified (Yes / No)</label>
              {isPrintMode ? (
                <div className="print-value">{values.documentsVerified || '___________________'}</div>
              ) : (
                <>
                  <Field name="documentsVerified" as="select" className="form-input">
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </Field>
                  <ErrorMessage name="documentsVerified" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 🔔 Approval Decision */}
      <div className="form-section">
        <h3 className="form-section-title">Approval Decision</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Approval Status</label>
            {isPrintMode ? (
              <div className="print-value">{values.approvalStatus || '___________________'}</div>
            ) : (
              <>
                <Field name="approvalStatus" as="select" className="form-input">
                  <option value="">Select Status</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Correction Required">Correction Required</option>
                </Field>
                <ErrorMessage name="approvalStatus" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
              </>
            )}
          </div>

          <div className="form-field" style={{ marginTop: '15px' }}>
            <label className="form-label">Remarks</label>
            {isPrintMode ? (
              <div className="print-value" style={{ whiteSpace: 'pre-wrap' }}>{values.remarks || '___________________'}</div>
            ) : (
              <>
                <Field name="remarks" as="textarea" className="form-input" placeholder="Enter any remarks or reason for decision" rows="3" />
                <ErrorMessage name="remarks" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* 👤 Approver Details */}
      <div className="form-section">
        <h3 className="form-section-title">Approver Details</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field">
              <label className="form-label required">Verified By (HR Name)</label>
              {isPrintMode ? (
                <div className="print-value">{values.verifiedBy || '___________________'}</div>
              ) : (
                <>
                  <Field name="verifiedBy" type="text" className="form-input" placeholder="Enter HR name" />
                  <ErrorMessage name="verifiedBy" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
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

      {!isPrintMode && (
        <div className="form-section">
          <h3 className="form-section-title">Approved By</h3>
          <div className="form-fields">
            <SignatureComponent label="HR Approval Signature" onChange={(data) => setFieldValue('signatures.approvedBy.data', data)} />
            <div style={{ marginTop: '15px' }}>
              <label className="form-label">Name (Print)</label>
              <Field name="signatures.approvedBy.name" type="text" className="form-input" placeholder="Enter name" />
            </div>
          </div>
        </div>
      )}
    </ModernA4Template>
  );

  return (
    <ModernFormWrapper formId="FRM-00632" title="Recruitment MIS Update – Approval Form">
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
                  Save Approval
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00632;
