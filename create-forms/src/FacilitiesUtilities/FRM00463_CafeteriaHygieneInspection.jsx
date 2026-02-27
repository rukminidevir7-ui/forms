// FRM00463_CafeteriaHygieneInspection.jsx
// FRM-00463 – Cafeteria Hygiene Inspection – Checklist Form

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

  cafeteriaName: Yup.string().required('Required'),
  inspectionDate: Yup.string().required('Required'),
  inspectionTime: Yup.string().required('Required'),
  inspectedBy: Yup.string().required('Required'),

  checklistItems: Yup.array().of(
    Yup.object().shape({
      item: Yup.string().required('Required'),
      status: Yup.string().required('Required'),
      remarks: Yup.string()
    })
  ).min(1, 'At least one checklist item required'),

  observations: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const defaultChecklistItems = [
  'Food Preparation Area Clean',
  'Utensils Properly Sanitized',
  'Food Storage Conditions Proper',
  'Refrigeration Temperature Adequate',
  'Waste Disposal Managed Properly',
  'Handwashing Facilities Available',
  'Pest Control Measures in Place',
  'Staff Hygiene Adequate',
  'Raw and Cooked Food Segregated',
  'Food Expiry Dates Checked',
  'Protective Clothing Used (Gloves/Aprons)',
  'Cleaning Chemicals Properly Stored'
];

const initialValues = {

  cafeteriaName: '',
  inspectionDate: '',
  inspectionTime: '',
  inspectedBy: '',

  checklistItems: defaultChecklistItems.map(item => ({
    item,
    status: '',
    remarks: ''
  })),

  observations: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00463_CafeteriaHygieneInspection = () => {

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
      <label className="form-label">{label}</label>
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
      formId="FRM-00463"
      title="Cafeteria Hygiene Inspection – Checklist"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Cafeteria Hygiene Inspection submitted successfully');
        }}
      >

        {({ values }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00463"
              title="Cafeteria Hygiene Inspection"
              department="Facilities & Utilities – Facilities Management"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'cafeteriaName','Facility / Cafeteria Name')}
                  {field(values,'inspectionDate','Inspection Date','date')}
                  {field(values,'inspectionTime','Inspection Time','time')}
                  {field(values,'inspectedBy','Inspected By')}
                </div>
              </div>

              {/* 2. Hygiene Checklist */}
              <div className="form-section">
                <h3 className="form-section-title">2. Hygiene Inspection Checklist</h3>

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
                            <th style={{ width: "35%" }}>Inspection Item</th>
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

              {/* 3. Observations / Notes */}
              <div className="form-section">
                <h3 className="form-section-title">3. Observations / Notes</h3>
                <div className="form-fields">
                  {textarea(values,'observations','Observations / Notes')}
                </div>
              </div>

              {/* Signatures */}
              <FormSignatures values={values} />

              <FormCustomFields values={values} />
              <FormAttachments values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Inspection
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

export default FRM00463_CafeteriaHygieneInspection;
