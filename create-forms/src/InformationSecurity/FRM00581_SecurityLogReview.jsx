// FRM00581_SecurityLogReview.jsx
// FRM-00581 – Security Log Review – Log/Register

import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormAttachments from '../components/FormAttachments';
import FormCustomFields from '../components/FormCustomFields';
import ApprovalSignatureBlock from "../components/ApprovalSignatureBlock";
import '../styles/FRM00611.css';

const validationSchema = Yup.object({

  companyName: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  process: Yup.string().required('Required'),

  logs: Yup.array().of(
    Yup.object().shape({
      reviewDate: Yup.string().required('Required'),
      systemSource: Yup.string().required('Required'),
      environment: Yup.string().required('Required'),
      logPeriod: Yup.string().required('Required'),
      reviewerName: Yup.string().required('Required'),
      keyEvents: Yup.string().required('Required'),
      anomalies: Yup.string().required('Required'),
      incidentReference: Yup.string(),
      actionTaken: Yup.string().required('Required'),
      status: Yup.string().required('Required'),
      nextReviewDate: Yup.string().required('Required'),
      remarks: Yup.string()
    })
  ).min(1, 'At least one log entry required'),

  reviewedBySignature: Yup.object(),

  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {

  companyName: '',
  department: 'Information Security',
  process: 'Security Operations',

  logs: [
    {
      reviewDate: '',
      systemSource: '',
      environment: '',
      logPeriod: '',
      reviewerName: '',
      keyEvents: '',
      anomalies: '',
      incidentReference: '',
      actionTaken: '',
      status: '',
      nextReviewDate: '',
      remarks: ''
    }
  ],

  reviewedBySignature: {},
  customFields: [],
  attachments: []
};

const FRM00581_SecurityLogReview = () => {

  const { isPrintMode } = usePrintMode();

  return (
    <ModernFormWrapper formId="FRM-00581" title="Security Log Review – Log/Register">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Security Log Review submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00581"
              title="SECURITY LOG REVIEW – LOG / REGISTER"
              department="Information Security – Security Operations"
            >

              {/* Header */}
              <div className="form-section">
                <h3 className="form-section-title">Register Header</h3>
                <div className="form-fields">
                  <div className="form-field">
                    <label className="form-label required">Company Name</label>
                    <Field name="companyName" className="form-input" />
                    <ErrorMessage name="companyName" component="div" className="form-error" />
                  </div>

                  <div className="form-field">
                    <label className="form-label required">Department</label>
                    <Field name="department" className="form-input" />
                  </div>

                  <div className="form-field">
                    <label className="form-label required">Process</label>
                    <Field name="process" className="form-input" />
                  </div>
                </div>
              </div>

              {/* Log Register Table */}
              <div className="form-section">
                <h3 className="form-section-title">Log Register Entries</h3>

                <FieldArray name="logs">
                  {({ push, remove }) => (
                    <>

                      {!isPrintMode && (
                        <div style={{ marginBottom: 20 }}>
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={() =>
                              push({
                                reviewDate: '',
                                systemSource: '',
                                environment: '',
                                logPeriod: '',
                                reviewerName: '',
                                keyEvents: '',
                                anomalies: '',
                                incidentReference: '',
                                actionTaken: '',
                                status: '',
                                nextReviewDate: '',
                                remarks: ''
                              })
                            }
                          >
                            + Add Log Entry
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Review Date</th>
                            <th>System / Log Source</th>
                            <th>Environment</th>
                            <th>Log Period</th>
                            <th>Reviewer</th>
                            <th>Key Events</th>
                            <th>Anomalies</th>
                            <th>Incident Ref</th>
                            <th>Action Taken</th>
                            <th>Status</th>
                            <th>Next Review</th>
                            <th>Remarks</th>
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {values.logs.map((row, index) => (
                            <tr key={index}>
                              <td><Field name={`logs.${index}.reviewDate`} type="date" className="form-input" /></td>
                              <td><Field name={`logs.${index}.systemSource`} className="form-input" /></td>
                              <td>
                                <Field as="select" name={`logs.${index}.environment`} className="form-input">
                                  <option value="">Select</option>
                                  <option value="Production">Production</option>
                                  <option value="UAT">UAT</option>
                                  <option value="Development">Development</option>
                                  <option value="Others">Others</option>
                                </Field>
                              </td>
                              <td><Field name={`logs.${index}.logPeriod`} className="form-input" /></td>
                              <td><Field name={`logs.${index}.reviewerName`} className="form-input" /></td>
                              <td><Field name={`logs.${index}.keyEvents`} className="form-input" /></td>
                              <td><Field name={`logs.${index}.anomalies`} className="form-input" /></td>
                              <td><Field name={`logs.${index}.incidentReference`} className="form-input" /></td>
                              <td><Field name={`logs.${index}.actionTaken`} className="form-input" /></td>
                              <td>
                                <Field as="select" name={`logs.${index}.status`} className="form-input">
                                  <option value="">Select</option>
                                  <option value="Open">Open</option>
                                  <option value="Under Review">Under Review</option>
                                  <option value="Closed">Closed</option>
                                  <option value="Escalated">Escalated</option>
                                </Field>
                              </td>
                              <td><Field name={`logs.${index}.nextReviewDate`} type="date" className="form-input" /></td>
                              <td><Field name={`logs.${index}.remarks`} className="form-input" /></td>

                              {!isPrintMode && (
                                <td>
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    style={{ padding: "6px 12px" }}
                                  >
                                    Remove
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>

                    </>
                  )}
                </FieldArray>
              </div>

              {/* Sign-Off */}
              <div className="form-section">
                <h3 className="form-section-title">Sign-Off</h3>

                <ApprovalSignatureBlock
                  label="Reviewed By"
                  value={values.reviewedBySignature || {}}
                  onChange={(val) => setFieldValue("reviewedBySignature", val)}
                />
              </div>

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Log Register
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

export default FRM00581_SecurityLogReview;
