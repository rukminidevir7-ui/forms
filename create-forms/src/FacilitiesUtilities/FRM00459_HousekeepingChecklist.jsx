// FRM00459_HousekeepingChecklist.jsx
// FRM-00459 – Housekeeping Checklist – Checklist Form

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

  facilityLocation: Yup.string().required('Required'),
  areaFloor: Yup.string().required('Required'),
  inspectionDate: Yup.string().required('Required'),
  inspectedBy: Yup.string().required('Required'),

  checklistItems: Yup.array().of(
    Yup.object().shape({
      item: Yup.string().required('Required'),
      status: Yup.string().required('Required'),
      remarks: Yup.string()
    })
  ).min(1, 'At least one checklist item required'),

  overallRemarks: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const defaultChecklistItems = [
  'Floors Cleaned',
  'Waste Bins Emptied',
  'Restrooms Clean',
  'Pantry Area Clean',
  'Dusting Completed',
  'Supplies Refilled',
  'No Safety Hazards Observed',
  'Windows & Glass Clean',
  'Common Areas Organized',
  'Cleaning Equipment Properly Stored'
];

const initialValues = {

  facilityLocation: '',
  areaFloor: '',
  inspectionDate: '',
  inspectedBy: '',

  checklistItems: defaultChecklistItems.map(item => ({
    item,
    status: '',
    remarks: ''
  })),

  overallRemarks: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00459_HousekeepingChecklist = () => {

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
      formId="FRM-00459"
      title="Housekeeping Checklist – Checklist"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Housekeeping Checklist submitted successfully');
        }}
      >

        {({ values }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00459"
              title="Housekeeping Checklist"
              department="Facilities & Utilities – Facilities Management"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'facilityLocation','Facility / Location')}
                  {field(values,'areaFloor','Area / Floor')}
                  {field(values,'inspectionDate','Inspection Date','date')}
                  {field(values,'inspectedBy','Inspected By')}
                </div>
              </div>

              {/* 2. Housekeeping Checklist */}
              <div className="form-section">
                <h3 className="form-section-title">2. Housekeeping Inspection Checklist</h3>

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

              {/* 3. Overall Remarks */}
              <div className="form-section">
                <h3 className="form-section-title">3. Remarks</h3>
                <div className="form-fields">
                  {textarea(values,'overallRemarks','General Remarks')}
                </div>
              </div>

              {/* Signatures (Prepared / Reviewed / Approved) */}
              <FormSignatures values={values} />

              <FormCustomFields values={values} />
              <FormAttachments values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Checklist
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

export default FRM00459_HousekeepingChecklist;
