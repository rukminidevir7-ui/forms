// FRM00425_VehicleDailyChecklist.jsx
// FRM-00425 – Vehicle Daily Checklist – Checklist Form

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

  vehicleNumber: Yup.string().required('Required'),
  vehicleType: Yup.string().required('Required'),
  odometerReading: Yup.number().typeError('Must be a number').required('Required'),
  fuelLevel: Yup.string().required('Required'),
  inspectionDate: Yup.string().required('Required'),
  inspectedBy: Yup.string().required('Required'),

  checklistItems: Yup.array().of(
    Yup.object().shape({
      item: Yup.string().required('Required'),
      status: Yup.string().required('Required'),
      remarks: Yup.string()
    })
  ),

  notes: Yup.string().required('Required'),

  inspectorSignature: Yup.string().required('Required'),
  supervisorName: Yup.string().required('Required'),
  authorizationDate: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const defaultChecklistItems = [
  'Brakes Condition',
  'Lights & Indicators',
  'Tyres Condition',
  'Battery Condition',
  'Horn Function',
  'Mirrors & Windshield',
  'Engine Condition',
  'Fluid Levels (Oil/Coolant)',
  'Documents Available'
];

const initialValues = {

  vehicleNumber: '',
  vehicleType: '',
  odometerReading: '',
  fuelLevel: '',
  inspectionDate: '',
  inspectedBy: '',

  checklistItems: defaultChecklistItems.map(item => ({
    item,
    status: '',
    remarks: ''
  })),

  notes: '',

  inspectorSignature: '',
  supervisorName: '',
  authorizationDate: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00425_VehicleDailyChecklist = () => {

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
            <Field as="textarea" name={name} className="form-textarea" rows="3" />
            <ErrorMessage name={name} component="div" className="form-error" />
          </>
      }
    </div>
  );

  return (

    <ModernFormWrapper
      formId="FRM-00425"
      title="Vehicle Daily Checklist – Checklist"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Vehicle daily checklist submitted successfully');
        }}
      >

        {({ values }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00425"
              title="Vehicle Daily Checklist"
              department="Fleet & Transport – Fleet Operations"
            >

              {/* 1. Vehicle Details */}
              <div className="form-section">
                <h3 className="form-section-title">1. Vehicle Details</h3>
                <div className="form-fields">
                  {field(values,'vehicleNumber','Vehicle No')}
                  {field(values,'vehicleType','Vehicle Type')}
                  {field(values,'odometerReading','Odometer Reading','number')}
                  {field(values,'fuelLevel','Fuel Level')}
                  {field(values,'inspectionDate','Inspection Date','date')}
                  {field(values,'inspectedBy','Inspected By')}
                </div>
              </div>

              {/* 2. Daily Condition Checklist (TABLE STRUCTURE) */}
              <div className="form-section">
                <h3 className="form-section-title">2. Daily Condition Checklist</h3>

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
                            <th style={{ width: "35%" }}>Checklist Item</th>
                            <th style={{ width: "15%" }}>OK</th>
                            <th style={{ width: "15%" }}>Not OK</th>
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
                                  value="OK"
                                />
                              </td>

                              <td style={{ textAlign: "center" }}>
                                <Field
                                  type="radio"
                                  name={`checklistItems.${index}.status`}
                                  value="Not OK"
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

              {/* 3. Additional Notes */}
              <div className="form-section">
                <h3 className="form-section-title">3. Additional Notes</h3>
                <div className="form-fields">
                  {textarea(values,'notes','Notes')}
                </div>
              </div>

              {/* 4. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">4. Authorization</h3>
                <div className="form-fields">
                  {field(values,'inspectorSignature','Inspector Signature')}
                  {field(values,'supervisorName','Supervisor Name & Signature')}
                  {field(values,'authorizationDate','Date','date')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={() => {}} />

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

export default FRM00425_VehicleDailyChecklist;
