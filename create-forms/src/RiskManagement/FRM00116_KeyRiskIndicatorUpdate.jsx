// FRM00116_KeyRiskIndicatorUpdate.jsx
// FRM-00116 – Key Risk Indicator (KRI) Update – Request / Authorization Form

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
  updateDate: Yup.string().required('Required'),
  departmentFunction: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  updateType: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // KRI Details
  kriName: Yup.string().required('Required'),
  kriId: Yup.string().required('Required'),
  relatedRisk: Yup.string().required('Required'),
  processArea: Yup.string().required('Required'),
  owner: Yup.string().required('Required'),
  reportingFrequency: Yup.string().required('Required'),

  // Metrics & Thresholds
  currentValue: Yup.string().required('Required'),
  thresholdLevel: Yup.string().required('Required'),
  targetValue: Yup.string().required('Required'),
  toleranceLevel: Yup.string().required('Required'),
  trend: Yup.string().required('Required'),

  // Update Details
  reasonForUpdate: Yup.string().required('Required'),
  impactAssessment: Yup.string().required('Required'),
  actionRequired: Yup.string().required('Required'),

  // Authorization
  preparedByAuthorization: Yup.string().required('Required'),
  reviewedBy: Yup.string().required('Required'),
  approvedBy: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  updateDate: '',
  departmentFunction: '',
  preparedBy: '',
  employeeId: '',
  contactNumber: '',
  updateType: '',
  priorityLevel: '',

  kriName: '',
  kriId: '',
  relatedRisk: '',
  processArea: '',
  owner: '',
  reportingFrequency: '',

  currentValue: '',
  thresholdLevel: '',
  targetValue: '',
  toleranceLevel: '',
  trend: '',

  reasonForUpdate: '',
  impactAssessment: '',
  actionRequired: '',

  preparedByAuthorization: '',
  reviewedBy: '',
  approvedBy: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00116_KeyRiskIndicatorUpdate = () => {

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
      formId="FRM-00116"
      title="Key Risk Indicator (KRI) Update – Request / Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('KRI update submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00116"
              title="Key Risk Indicator (KRI) Update"
              department="Risk Management – Enterprise Risk"
            >

              {/* Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'updateDate','Date','date')}
                  {field(values,'departmentFunction','Department / Function')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'contactNumber','Contact')}
                  {select(values,'updateType','Update Type',['Threshold Revision','Metric Change','Frequency Change','Ownership Change','Data Correction'])}
                  {select(values,'priorityLevel','Priority',['Low','Medium','High','Critical'])}
                </div>
              </div>

              {/* KRI Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. KRI Details</h3>
                <div className="form-fields">
                  {field(values,'kriName','KRI Name')}
                  {field(values,'kriId','KRI ID')}
                  {field(values,'relatedRisk','Related Risk')}
                  {field(values,'processArea','Process / Area')}
                  {field(values,'owner','Owner')}
                  {select(values,'reportingFrequency','Frequency',['Monthly','Quarterly','Bi-Annually','Annually'])}
                </div>
              </div>

              {/* Metrics & Thresholds */}
              <div className="form-section">
                <h3 className="form-section-title">3. Metrics & Thresholds</h3>
                <div className="form-fields">
                  {field(values,'currentValue','Current Value')}
                  {field(values,'thresholdLevel','Threshold Level')}
                  {field(values,'targetValue','Target Value')}
                  {field(values,'toleranceLevel','Tolerance Level')}
                  {select(values,'trend','Trend',['Increasing','Stable','Decreasing'])}
                </div>
              </div>

              {/* Update Details */}
              <div className="form-section">
                <h3 className="form-section-title">4. Update Details</h3>
                <div className="form-fields">
                  {textarea(values,'reasonForUpdate','Reason for Update')}
                  {textarea(values,'impactAssessment','Impact Assessment')}
                  {textarea(values,'actionRequired','Action Required')}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByAuthorization','Prepared By')}
                  {field(values,'reviewedBy','Reviewed By')}
                  {field(values,'approvedBy','Approved By')}
                  {field(values,'approvalDate','Approval Date','date')}
                  {textarea(values,'approvalComments','Comments')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit KRI Update
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

export default FRM00116_KeyRiskIndicatorUpdate;
