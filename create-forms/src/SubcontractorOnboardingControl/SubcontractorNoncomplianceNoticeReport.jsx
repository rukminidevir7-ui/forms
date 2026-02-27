// SubcontractorNoncomplianceNoticeReport.jsx
// FRM-01126 – Subcontractor Noncompliance Notice

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

  // Subcontractor Info
  companyName: Yup.string().required('Required'),
  projectName: Yup.string().required('Required'),
  projectLocation: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  noticeDate: Yup.string().required('Required'),

  // Noncompliance
  referenceContract: Yup.string().required('Required'),
  noncomplianceType: Yup.string().required('Required'),
  descriptionOfIssue: Yup.string().required('Required'),
  dateOfOccurrence: Yup.string().required('Required'),
  severityLevel: Yup.string().required('Required'),

  // Corrective Action
  correctiveActionRequired: Yup.string().required('Required'),
  actionCompletionDeadline: Yup.string().required('Required'),

  // Impact
  impactOnProject: Yup.string().required('Required'),
  immediateActionsTaken: Yup.string().required('Required'),

  // Verification
  verifiedBy: Yup.string().required('Required'),
  verificationDate: Yup.string().required('Required'),
  verificationRemarks: Yup.string().required('Required'),

  // Issued By
  issuedByName: Yup.string().required('Required'),
  issuedByDesignation: Yup.string().required('Required'),
  issuedDate: Yup.string().required('Required'),

  // Acknowledgement
  receivedByName: Yup.string().required('Required'),
  receivedByDesignation: Yup.string().required('Required'),
  receivedDate: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  companyName: '',
  projectName: '',
  projectLocation: '',
  contactPerson: '',
  noticeDate: '',

  referenceContract: '',
  noncomplianceType: '',
  descriptionOfIssue: '',
  dateOfOccurrence: '',
  severityLevel: '',

  correctiveActionRequired: '',
  actionCompletionDeadline: '',

  impactOnProject: '',
  immediateActionsTaken: '',

  verifiedBy: '',
  verificationDate: '',
  verificationRemarks: '',

  issuedByName: '',
  issuedByDesignation: '',
  issuedDate: '',

  receivedByName: '',
  receivedByDesignation: '',
  receivedDate: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const SubcontractorNoncomplianceNoticeReport = () => {

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
      formId="FRM-01126"
      title="Subcontractor Noncompliance Notice"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Noncompliance notice submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-01126"
              title="Subcontractor Noncompliance Notice"
              department="Subcontractor & Contracting"
            >

              {/* 1. Subcontractor Info */}
              <div className="form-section">
                <h3 className="form-section-title">Subcontractor Information</h3>
                <div className="form-fields">
                  {field(values,'companyName','Company Name')}
                  {field(values,'projectName','Project Name')}
                  {field(values,'projectLocation','Project Location')}
                  {field(values,'contactPerson','Contact Person')}
                  {field(values,'noticeDate','Notice Date','date')}
                </div>
              </div>

              {/* 2. Noncompliance */}
              <div className="form-section">
                <h3 className="form-section-title">Noncompliance Details</h3>
                <div className="form-fields">
                  {field(values,'referenceContract','Reference Contract / Work Order')}
                  {field(values,'noncomplianceType','Type of Noncompliance')}
                  {textarea(values,'descriptionOfIssue','Description of Issue')}
                  {field(values,'dateOfOccurrence','Date of Occurrence','date')}
                  {select(values,'severityLevel','Severity Level',['Low','Medium','High'])}
                </div>
              </div>

              {/* 3. Corrective Action */}
              <div className="form-section">
                <h3 className="form-section-title">Required Corrective Action</h3>
                <div className="form-fields">
                  {textarea(values,'correctiveActionRequired','Corrective Action Required')}
                  {field(values,'actionCompletionDeadline','Action Completion Deadline','date')}
                </div>
              </div>

              {/* 4. Impact */}
              <div className="form-section">
                <h3 className="form-section-title">Impact Assessment</h3>
                <div className="form-fields">
                  {textarea(values,'impactOnProject','Impact on Project (Cost/Schedule/Safety/Quality)')}
                  {textarea(values,'immediateActionsTaken','Immediate Actions Taken')}
                </div>
              </div>

              {/* 5. Verification */}
              <div className="form-section">
                <h3 className="form-section-title">Verification</h3>
                <div className="form-fields">
                  {field(values,'verifiedBy','Verified By')}
                  {field(values,'verificationDate','Verification Date','date')}
                  {textarea(values,'verificationRemarks','Remarks')}
                </div>
              </div>

              {/* 6. Issued By */}
              <div className="form-section">
                <h3 className="form-section-title">Issued By</h3>
                <div className="form-fields">
                  {field(values,'issuedByName','Issued By (Name)')}
                  {field(values,'issuedByDesignation','Designation')}
                  {field(values,'issuedDate','Date','date')}
                </div>
              </div>

              {/* 7. Acknowledgement */}
              <div className="form-section">
                <h3 className="form-section-title">Acknowledgement by Subcontractor</h3>
                <div className="form-fields">
                  {field(values,'receivedByName','Received By (Name)')}
                  {field(values,'receivedByDesignation','Designation')}
                  {field(values,'receivedDate','Date','date')}
                </div>
              </div>

              {/* Universal Components */}
              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Notice
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

export default SubcontractorNoncomplianceNoticeReport;
