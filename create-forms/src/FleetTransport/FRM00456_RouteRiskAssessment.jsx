// FRM00456_RouteRiskAssessmentChecklist.jsx
// FRM-00456 – Route Risk Assessment – Checklist Form

import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormAttachments from '../components/FormAttachments';
import FormCustomFields from '../components/FormCustomFields';
import FormSignatures from '../components/FormSignatures';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({

  routeName: Yup.string().required('Required'),
  origin: Yup.string().required('Required'),
  destination: Yup.string().required('Required'),
  assessmentDate: Yup.string().required('Required'),
  assessedBy: Yup.string().required('Required'),

  checklistItems: Yup.array().of(
    Yup.object().shape({
      item: Yup.string().required('Required'),
      status: Yup.string().required('Required'),
      remarks: Yup.string()
    })
  ).min(1, 'At least one checklist item required'),

  riskSummary: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const defaultChecklistItems = [
  'Road Condition Adequate',
  'Traffic Risk Acceptable',
  'Weather Conditions Considered',
  'Security Risks Identified',
  'Alternate Routes Available',
  'Emergency Contacts Available',
  'Rest Stops Identified',
  'Accident-Prone Areas Identified',
  'Construction / Diversions Checked',
  'Communication Network Availability',
  'Fuel Stations Identified',
  'Medical Facilities Along Route'
];

const initialValues = {

  routeName: '',
  origin: '',
  destination: '',
  assessmentDate: '',
  assessedBy: '',

  checklistItems: defaultChecklistItems.map(item => ({
    item,
    status: '',
    remarks: ''
  })),

  riskSummary: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00456_RouteRiskAssessmentChecklist = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type = 'text') => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || '___________________'}</div>
        : <>
            <Field name={name} type={type} className="form-input" />
            <ErrorMessage name={name} component="div" className="form-error" />
          </>
      }
    </div>
  );

  const textarea = (values, name, label) => (
    <div className="form-field full-width">
      <label className="form-label required">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || '___________________'}</div>
        : <>
            <Field as="textarea" name={name} className="form-textarea" rows="4" />
            <ErrorMessage name={name} component="div" className="form-error" />
          </>
      }
    </div>
  );

  return (

    <ModernFormWrapper
      formId="FRM-00456"
      title="Route Risk Assessment – Checklist"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Route Risk Assessment submitted successfully');
        }}
      >

        {({ values }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00456"
              title="Route Risk Assessment – Checklist"
              department="Fleet & Transport – Compliance & Permits"
            >

              {/* 1. Route Details */}
              <div className="form-section">
                <h3 className="form-section-title">1. Route Details</h3>
                <div className="form-fields">
                  {field(values,'routeName','Route Name / ID')}
                  {field(values,'origin','Origin')}
                  {field(values,'destination','Destination')}
                  {field(values,'assessmentDate','Assessment Date','date')}
                  {field(values,'assessedBy','Assessed By')}
                </div>
              </div>

              {/* 2. Risk Assessment Checklist */}
              <div className="form-section">
                <h3 className="form-section-title">2. Risk Assessment Checklist</h3>

                <FieldArray name="checklistItems">
                  {({ push, remove }) => (
                    <>

                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          style={{ marginBottom: "15px" }}
                          onClick={() => push({ item: '', status: '', remarks: '' })}
                        >
                          + Add Checklist Item
                        </button>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th style={{ width: "35%" }}>Assessment Item</th>
                            <th style={{ width: "15%" }}>Yes</th>
                            <th style={{ width: "15%" }}>No</th>
                            <th style={{ width: "35%" }}>Remarks</th>
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {values.checklistItems.map((row, index) => (
                            <tr key={index}>
                              <td>
                                <Field
                                  name={`checklistItems.${index}.item`}
                                  className="form-input"
                                />
                              </td>

                              <td style={{ textAlign: "center" }}>
                                <Field
                                  type="radio"
                                  name={`checklistItems.${index}.status`}
                                  value="Yes"
                                />
                              </td>

                              <td style={{ textAlign: "center" }}>
                                <Field
                                  type="radio"
                                  name={`checklistItems.${index}.status`}
                                  value="No"
                                />
                              </td>

                              <td>
                                <Field
                                  as="textarea"
                                  name={`checklistItems.${index}.remarks`}
                                  className="form-textarea"
                                  rows="3"
                                />
                              </td>

                              {!isPrintMode && (
                                <td>
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
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

              {/* 3. Risk Summary */}
              <div className="form-section">
                <h3 className="form-section-title">3. Risk Summary / Notes</h3>
                <div className="form-fields">
                  {textarea(values,'riskSummary','Risk Summary / Notes')}
                </div>
              </div>

              {/* Signatures Section (Prepared / Reviewed / Approved) */}
              <FormSignatures values={values} />

              <FormCustomFields values={values} />
              <FormAttachments values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Assessment
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

export default FRM00456_RouteRiskAssessmentChecklist;
