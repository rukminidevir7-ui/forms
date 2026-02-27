// FRM00424_DriverDailyChecklist.jsx
// FRM-00424 – Driver Daily Checklist – Checklist Form

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

  driverName: Yup.string().required('Required'),
  driverId: Yup.string().required('Required'),
  licenseNumber: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  checklistDate: Yup.string().required('Required'),

  vehicleNumber: Yup.string().required('Required'),
  vehicleType: Yup.string().required('Required'),
  odometerReading: Yup.number().typeError('Must be a number').required('Required'),
  fuelLevel: Yup.string().required('Required'),
  assignedRoute: Yup.string().required('Required'),

  checklistItems: Yup.array().of(
    Yup.object().shape({
      item: Yup.string().required('Required'),
      status: Yup.string().required('Required'),
      remarks: Yup.string()
    })
  ),

  driverSignature: Yup.string().required('Required'),
  supervisorName: Yup.string().required('Required'),
  authorizationDate: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()
});

const defaultChecklistItems = [
  'Brakes Condition',
  'Lights & Indicators',
  'Tyre Condition',
  'Horn Function',
  'Mirrors & Windshield',
  'Fuel Level Check',
  'Engine Condition',
  'Documents Available'
];

const initialValues = {

  driverName: '',
  driverId: '',
  licenseNumber: '',
  contactNumber: '',
  checklistDate: '',

  vehicleNumber: '',
  vehicleType: '',
  odometerReading: '',
  fuelLevel: '',
  assignedRoute: '',

  checklistItems: defaultChecklistItems.map(item => ({
    item,
    status: '',
    remarks: ''
  })),

  driverSignature: '',
  supervisorName: '',
  authorizationDate: '',

  customFields: [],
  attachments: [],
  signatures: []
};

const FRM00424_DriverDailyChecklist = () => {

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

  return (

    <ModernFormWrapper
      formId="FRM-00424"
      title="Driver Daily Checklist – Checklist"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Driver daily checklist submitted successfully');
        }}
      >

        {({ values }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00424"
              title="Driver Daily Checklist"
              department="Fleet & Transport – Fleet Operations"
            >

              {/* 1. Driver Details */}
              <div className="form-section">
                <h3 className="form-section-title">1. Driver Details</h3>
                <div className="form-fields">
                  {field(values,'driverName','Driver Name')}
                  {field(values,'driverId','Driver ID')}
                  {field(values,'licenseNumber','License No')}
                  {field(values,'contactNumber','Contact Number')}
                  {field(values,'checklistDate','Date','date')}
                </div>
              </div>

              {/* 2. Vehicle Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Vehicle Details</h3>
                <div className="form-fields">
                  {field(values,'vehicleNumber','Vehicle No')}
                  {field(values,'vehicleType','Vehicle Type')}
                  {field(values,'odometerReading','Odometer Reading','number')}
                  {field(values,'fuelLevel','Fuel Level')}
                  {field(values,'assignedRoute','Assigned Route')}
                </div>
              </div>

              {/* 3. Daily Safety & Condition Checklist (TABLE STRUCTURE) */}
              <div className="form-section">
                <h3 className="form-section-title">3. Daily Safety & Condition Checklist</h3>

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

              {/* 4. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">4. Authorization</h3>
                <div className="form-fields">
                  {field(values,'driverSignature','Driver Signature')}
                  {field(values,'supervisorName','Supervisor Name & Signature')}
                  {field(values,'authorizationDate','Date','date')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} />

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

export default FRM00424_DriverDailyChecklist;
