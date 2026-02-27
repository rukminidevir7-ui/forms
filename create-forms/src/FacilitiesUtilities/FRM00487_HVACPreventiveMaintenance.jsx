// FRM00487_HVACPreventiveMaintenance.jsx
// FRM-00487 / 00488 / 00489 – HVAC Preventive Maintenance – Unified Form

import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
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
  equipmentName: Yup.string().required('Required'),
  equipmentId: Yup.string().required('Required'),
  signatures: Yup.array(),
  attachments: Yup.array(),
  customFields: Yup.array()
});

const initialValues = {

  formId: 'FRM-00487 / 00488 / 00489',
  department: 'Facilities & Utilities',
  process: 'Utilities',
  maintenanceType: 'Preventive Maintenance',

  siteName: '',
  location: '',
  requestDate: '',
  workOrderNo: '',

  equipmentName: '',
  equipmentId: '',
  makeModel: '',
  capacity: '',
  areaLocation: '',
  lastMaintenanceDate: '',

  maintenanceActivities: [
    { activity: 'Filter Cleaning / Replacement', status: '', remarks: '' },
    { activity: 'Coil Cleaning', status: '', remarks: '' },
    { activity: 'Fan & Motor Inspection', status: '', remarks: '' },
    { activity: 'Electrical Connections Check', status: '', remarks: '' },
    { activity: 'Thermostat Calibration', status: '', remarks: '' },
    { activity: 'Refrigerant Level Check', status: '', remarks: '' },
    { activity: 'General Inspection', status: '', remarks: '' }
  ],

  observations: '',
  issuesIdentified: '',
  correctiveActions: '',

  signatures: [],
  attachments: [],
  customFields: []

};

const FRM00487_HVACPreventiveMaintenance = () => {

  const { isPrintMode } = usePrintMode();

  return (
    <ModernFormWrapper
      formId="FRM-00487"
      title="HVAC Preventive Maintenance – Unified Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('HVAC Maintenance form submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00487"
              title="HVAC PREVENTIVE MAINTENANCE"
              department="Facilities & Utilities – Utilities"
            >

              {/* HEADER */}
              <div className="form-section">
                <div className="form-fields">
                  <Field name="formId" className="form-input" />
                  <Field name="department" className="form-input" />
                  <Field name="process" className="form-input" />
                  <Field name="maintenanceType" className="form-input" />
                </div>
              </div>

              {/* SITE DETAILS */}
              <div className="form-section">
                <div className="form-fields">
                  <Field name="siteName" placeholder="Site / Facility Name" className="form-input" />
                  <Field name="location" placeholder="Location" className="form-input" />
                  <Field type="date" name="requestDate" className="form-input" />
                  <Field name="workOrderNo" placeholder="Work Order No" className="form-input" />
                </div>
              </div>

              {/* EQUIPMENT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Equipment Details</h3>
                <div className="form-fields">
                  <Field name="equipmentName" placeholder="Equipment Name" className="form-input" />
                  <Field name="equipmentId" placeholder="Equipment ID" className="form-input" />
                  <Field name="makeModel" placeholder="Make / Model" className="form-input" />
                  <Field name="capacity" placeholder="Capacity" className="form-input" />
                  <Field name="areaLocation" placeholder="Location / Area" className="form-input" />
                  <Field type="date" name="lastMaintenanceDate" className="form-input" />
                </div>
              </div>

              {/* MAINTENANCE CHECKLIST */}
              <div className="form-section">
                <h3 className="form-section-title">Maintenance Activities</h3>

                <FieldArray name="maintenanceActivities">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          style={{ marginBottom: 15 }}
                          onClick={() =>
                            push({ activity: '', status: '', remarks: '' })
                          }
                        >
                          + Add Activity
                        </button>
                      )}

                      {values.maintenanceActivities.map((item, index) => (
                        <div
                          key={index}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '2fr 1fr 2fr auto',
                            gap: '10px',
                            marginBottom: '10px'
                          }}
                        >
                          <Field
                            name={`maintenanceActivities.${index}.activity`}
                            className="form-input"
                          />

                          <Field
                            as="select"
                            name={`maintenanceActivities.${index}.status`}
                            className="form-input"
                          >
                            <option value="">Y/N</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </Field>

                          <Field
                            name={`maintenanceActivities.${index}.remarks`}
                            placeholder="Remarks"
                            className="form-input"
                          />

                          {!isPrintMode && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              style={{
                                background: 'red',
                                color: '#fff',
                                border: 'none'
                              }}
                            >
                              X
                            </button>
                          )}
                        </div>
                      ))}

                    </>
                  )}
                </FieldArray>

              </div>

              {/* OBSERVATIONS */}
              <div className="form-section">
                <Field as="textarea" name="observations" placeholder="Observations" className="form-textarea" rows="2" />
                <Field as="textarea" name="issuesIdentified" placeholder="Issues Identified" className="form-textarea" rows="2" />
                <Field as="textarea" name="correctiveActions" placeholder="Corrective Actions Required" className="form-textarea" rows="2" />
              </div>

              {/* ATTACHMENTS */}
              <div className="form-section">
                <h3 className="form-section-title">Attachments</h3>
                {isPrintMode
                  ? <div className="print-value">Documents Attached</div>
                  : <FormAttachments values={values} />}
              </div>

              {/* SIGNATURES */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr 1fr',
                  gap: '20px'
                }}>
                  <FormSignatures role="Requested By" values={values} setFieldValue={setFieldValue} />
                  <FormSignatures role="Performed By" values={values} setFieldValue={setFieldValue} />
                  <FormSignatures role="Checked By" values={values} setFieldValue={setFieldValue} />
                  <FormSignatures role="Approved By" values={values} setFieldValue={setFieldValue} />
                </div>
              </div>

              {/* CUSTOM FIELDS */}
              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit HVAC Maintenance
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

export default FRM00487_HVACPreventiveMaintenance;
