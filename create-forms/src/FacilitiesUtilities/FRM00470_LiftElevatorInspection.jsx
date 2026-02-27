// FRM00470_LiftElevatorInspection.jsx
// FRM-00470 – Lift / Elevator Inspection – Checklist Form

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

  facilityName: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  liftNumber: Yup.string().required('Required'),
  inspectionDate: Yup.string().required('Required'),
  inspectorName: Yup.string().required('Required'),
  department: Yup.string().required('Required'),

  checklistItems: Yup.array().of(
    Yup.object().shape({
      item: Yup.string().required('Required'),
      status: Yup.string().required('Required'),
      remarks: Yup.string()
    })
  ).min(1, 'At least one checkpoint required'),

  observations: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const defaultChecklistItems = [
  'Door Operation Smooth',
  'Emergency Alarm Functional',
  'Lighting Working Properly',
  'Control Panel Operational',
  'Overload Indicator Working',
  'Ventilation Adequate',
  'Safety Signage Visible',
  'Emergency Phone Working',
  'No Unusual Noise / Vibration',
  'Lift Cabin Clean and Maintained',
  'Floor Level Alignment Accurate',
  'Emergency Stop Button Functional'
];

const initialValues = {

  facilityName: '',
  location: '',
  liftNumber: '',
  inspectionDate: '',
  inspectorName: '',
  department: '',

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

const FRM00470_LiftElevatorInspection = () => {

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
      formId="FRM-00470"
      title="Lift / Elevator Inspection – Checklist"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Lift / Elevator Inspection submitted successfully');
        }}
      >

        {({ values }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00470"
              title="Lift / Elevator Inspection"
              department="Facilities & Utilities – Facilities Management"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'facilityName','Facility Name')}
                  {field(values,'location','Location')}
                  {field(values,'liftNumber','Lift Number')}
                  {field(values,'inspectionDate','Inspection Date','date')}
                  {field(values,'inspectorName','Inspector Name')}
                  {field(values,'department','Department')}
                </div>
              </div>

              {/* 2. Inspection Checklist */}
              <div className="form-section">
                <h3 className="form-section-title">2. Inspection Checklist</h3>

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
                          + Add Checkpoint
                        </button>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th style={{ width: "35%" }}>Checkpoint</th>
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

              {/* 3. Observations */}
              <div className="form-section">
                <h3 className="form-section-title">3. Observations</h3>
                <div className="form-fields">
                  {textarea(values,'observations','Observations')}
                </div>
              </div>

              {/* Signatures Section */}
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

export default FRM00470_LiftElevatorInspection;
