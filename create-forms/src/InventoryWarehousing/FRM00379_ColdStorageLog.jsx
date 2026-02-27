// FRM00379_ColdStorageLog.jsx
// FRM-00379 – Cold Storage Log – Log / Register Form

import React, { useState } from 'react';
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

  logDate: Yup.string().required('Required'),
  storageLocation: Yup.string().required('Required'),
  chamberId: Yup.string().required('Required'),
  recordedBy: Yup.string().required('Required'),
  shiftTime: Yup.string().required('Required'),

  monitoringEntries: Yup.array().of(
    Yup.object().shape({
      time: Yup.string().required('Required'),
      temperature: Yup.string().required('Required'),
      humidity: Yup.string().required('Required'),
      setRange: Yup.string().required('Required'),
      deviationObserved: Yup.string(),
      remarks: Yup.string(),
      dynamicFields: Yup.object()
    })
  ).min(1, 'At least one monitoring entry required'),

  equipmentStatus: Yup.string().required('Required'),
  alarmTriggered: Yup.string(),
  correctiveAction: Yup.string(),

  supervisorReview: Yup.string().required('Required'),
  authorizationComments: Yup.string(),

  supportingDocuments: Yup.string(),
  additionalNotes: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  logDate: '',
  storageLocation: '',
  chamberId: '',
  recordedBy: '',
  shiftTime: '',

  monitoringEntries: [
    {
      time: '',
      temperature: '',
      humidity: '',
      setRange: '',
      deviationObserved: '',
      remarks: '',
      dynamicFields: {}
    }
  ],

  equipmentStatus: '',
  alarmTriggered: '',
  correctiveAction: '',

  supervisorReview: '',
  authorizationComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00379_ColdStorageLog = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const columnName = prompt('Enter New Monitoring Parameter');
    if (!columnName) return;

    const key = columnName.replace(/\s+/g, '');

    if (dynamicColumns.find(col => col.key === key)) {
      alert('Column already exists');
      return;
    }

    setDynamicColumns([...dynamicColumns, { key, label: columnName }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
  };

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
            <Field as="textarea" name={name} className="form-textarea" rows="3" />
            <ErrorMessage name={name} component="div" className="form-error" />
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper
      formId="FRM-00379"
      title="Cold Storage Log – Log / Register"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Cold Storage Log submitted successfully');
        }}
      >
        {({ values }) => (
          <Form>
            <ModernA4Template
              formId="FRM-00379"
              title="Cold Storage Log"
              department="Inventory & Warehousing – Warehouse Control"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'logDate','Date','date')}
                  {field(values,'storageLocation','Storage Location')}
                  {field(values,'chamberId','Unit / Chamber ID')}
                  {field(values,'recordedBy','Recorded By')}
                  {field(values,'shiftTime','Shift / Time')}
                </div>
              </div>

              {/* 2. Monitoring Entries */}
             <div className="form-section" style={{ marginBottom: "35px" }}>
  <h3 className="form-section-title">2. Monitoring Entries</h3>

  {/* BUTTON ROW */}
  {!isPrintMode && (
    <div
      style={{
        display: "flex",
        gap: "15px",
        marginBottom: "20px",
        flexWrap: "wrap"
      }}
    >
      <button
        type="button"
        className="btn-submit"
        onClick={addColumn}
      >
        + Add Monitoring Parameter
      </button>

      <FieldArray name="monitoringEntries">
        {({ push }) => (
          <button
            type="button"
            className="btn-submit"
            onClick={() =>
              push({
                time: '',
                temperature: '',
                humidity: '',
                setRange: '',
                deviationObserved: '',
                remarks: '',
                dynamicFields: {}
              })
            }
          >
            + Add Entry
          </button>
        )}
      </FieldArray>
    </div>
  )}

  <FieldArray name="monitoringEntries">
    {({ remove }) => (
      <table className="items-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Temperature (°C)</th>
            <th>Humidity (%)</th>
            <th>Set Range</th>
            <th>Deviation Observed</th>
            <th>Remarks</th>

            {dynamicColumns.map(col => (
              <th key={col.key}>
                {col.label}
                {!isPrintMode && (
                  <button
                    type="button"
                    onClick={() => removeColumn(col.key)}
                    style={{ marginLeft: "8px" }}
                  >
                    x
                  </button>
                )}
              </th>
            ))}

            {!isPrintMode && <th>Action</th>}
          </tr>
        </thead>

        <tbody>
          {values.monitoringEntries.map((row, index) => (
            <tr key={index}>
              <td>
                <Field
                  name={`monitoringEntries.${index}.time`}
                  type="time"
                  className="form-input"
                />
              </td>

              <td>
                <Field
                  name={`monitoringEntries.${index}.temperature`}
                  className="form-input"
                />
              </td>

              <td>
                <Field
                  name={`monitoringEntries.${index}.humidity`}
                  className="form-input"
                />
              </td>

              <td>
                <Field
                  name={`monitoringEntries.${index}.setRange`}
                  className="form-input"
                />
              </td>

              <td>
                <Field
                  name={`monitoringEntries.${index}.deviationObserved`}
                  className="form-input"
                />
              </td>

              <td>
                <Field
                  name={`monitoringEntries.${index}.remarks`}
                  className="form-input"
                />
              </td>

              {dynamicColumns.map(col => (
                <td key={col.key}>
                  <Field
                    name={`monitoringEntries.${index}.dynamicFields.${col.key}`}
                    className="form-input"
                  />
                </td>
              ))}

              {!isPrintMode && (
                <td style={{ paddingLeft: "10px" }}>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    style={{ marginLeft: "8px" }}
                  >
                    Remove
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </FieldArray>
</div>


              {/* 3. Equipment / Deviation Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Equipment / Deviation Details</h3>
                <div className="form-fields">
                  {textarea(values,'equipmentStatus','Equipment Status')}
                  {textarea(values,'alarmTriggered','Alarm Triggered (if any)')}
                  {textarea(values,'correctiveAction','Corrective Action Taken')}
                </div>
              </div>

              {/* 4. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">4. Authorization</h3>
                <div className="form-fields">
                  {field(values,'recordedBy','Recorded By')}
                  {field(values,'supervisorReview','Supervisor Review')}
                  {textarea(values,'authorizationComments','Comments')}
                </div>
              </div>

              {/* 5. Supporting Information */}
              <div className="form-section">
                <h3 className="form-section-title">5. Supporting Information</h3>
                <div className="form-fields">
                  {textarea(values,'supportingDocuments','Supporting Documents')}
                  {textarea(values,'additionalNotes','Additional Notes')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Cold Storage Log
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

export default FRM00379_ColdStorageLog;
