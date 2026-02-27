// FRM00494_UtilityShutdownRequest.jsx
// FRM-00494 – Utility Shutdown Request – Request / Initiation Form

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

  siteName: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  requestDate: Yup.string().required('Required'),
  requestNo: Yup.string().required('Required'),

  utilityType: Yup.string().required('Required'),
  affectedArea: Yup.string().required('Required'),
  reason: Yup.string().required('Required'),
  shutdownStart: Yup.string().required('Required'),
  restorationTime: Yup.string().required('Required'),

  impactedDepartments: Yup.string().required('Required'),
  riskAssessment: Yup.string().required('Required'),
  mitigationPlan: Yup.string().required('Required'),

  requestedBy: Yup.string().required('Required'),
  designation: Yup.string().required('Required'),

  signatures: Yup.array(),
  attachments: Yup.array(),
  customFields: Yup.array()

});

const initialValues = {

  formId: 'FRM-00494',
  department: 'Facilities & Utilities',
  process: 'Utilities',
  formType: 'Request',

  siteName: '',
  location: '',
  requestDate: '',
  requestNo: '',

  utilityType: '',
  affectedArea: '',
  reason: '',
  shutdownStart: '',
  restorationTime: '',
  expectedDuration: '',

  impactedDepartments: '',
  riskAssessment: '',
  mitigationPlan: '',
  communicationPlan: '',
  remarks: '',

  requestedBy: '',
  designation: '',
  requestDateSigned: '',

  signatures: [],
  attachments: [],
  customFields: []

};

const FRM00494_UtilityShutdownRequest = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type = 'text', required = false) => (
    <div className="form-field">
      <label className={`form-label ${required ? 'required' : ''}`}>
        {label}
      </label>
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
      <label className="form-label">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '_________'}</div>
      ) : (
        <Field as="textarea" name={name} className="form-textarea" rows="3" />
      )}
    </div>
  );

  return (

    <ModernFormWrapper
      formId="FRM-00494"
      title="Utility Shutdown Request – Request Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Utility Shutdown Request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00494"
              title="UTILITY SHUTDOWN REQUEST FORM"
              department="Facilities & Utilities – Utilities"
            >

              {/* HEADER */}
              <div className="form-section">
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'department','Department')}
                  {field(values,'process','Process')}
                  {field(values,'formType','Form Type')}
                  {field(values,'siteName','Site / Facility Name','text',true)}
                  {field(values,'location','Location','text',true)}
                  {field(values,'requestDate','Request Date','date',true)}
                  {field(values,'requestNo','Request No','text',true)}
                </div>
              </div>

              {/* SHUTDOWN DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Shutdown Details</h3>
                <div className="form-fields">
                  {field(values,'utilityType','Utility Type (Power/Water/Air/etc.)','text',true)}
                  {field(values,'affectedArea','Equipment / Area Affected','text',true)}
                  {textarea(values,'reason','Reason for Shutdown')}
                  {field(values,'shutdownStart','Planned Shutdown Start Date & Time','datetime-local',true)}
                  {field(values,'restorationTime','Planned Restoration Date & Time','datetime-local',true)}
                  {field(values,'expectedDuration','Expected Duration')}
                </div>
              </div>

              {/* IMPACT ASSESSMENT */}
              <div className="form-section">
                <h3 className="form-section-title">Impact Assessment</h3>
                <div className="form-fields">
                  {textarea(values,'impactedDepartments','Departments Impacted')}
                  {textarea(values,'riskAssessment','Risk Assessment')}
                  {textarea(values,'mitigationPlan','Mitigation Plan')}
                  {textarea(values,'communicationPlan','Communication Plan')}
                  {textarea(values,'remarks','Remarks')}
                </div>
              </div>

              {/* ATTACHMENTS */}
              <div className="form-section">
                <h3 className="form-section-title">Attachments</h3>
                {isPrintMode
                  ? <div className="print-value">
                      {values.attachments?.length > 0 ? 'Documents Attached' : '________________'}
                    </div>
                  : <FormAttachments values={values} />}
              </div>

              {/* SIGNATURES */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '20px'
                }}>
                  <FormSignatures role="Requested By" values={values} setFieldValue={setFieldValue} />
                  <FormSignatures role="Reviewed By" values={values} setFieldValue={setFieldValue} />
                  <FormSignatures role="Approved By" values={values} setFieldValue={setFieldValue} />
                </div>

              </div>

              {/* CUSTOM FIELDS */}
              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Shutdown Request
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

export default FRM00494_UtilityShutdownRequest;
