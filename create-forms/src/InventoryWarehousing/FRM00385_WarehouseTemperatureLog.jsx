// FRM00385_WarehouseTemperatureLog.jsx
// FRM-00385 – Warehouse Temperature Log – Log / Register Form

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
  warehouseLocation: Yup.string().required('Required'),
  areaZone: Yup.string().required('Required'),
  recordedBy: Yup.string().required('Required'),
  shiftTime: Yup.string().required('Required'),
  monitoringDeviceId: Yup.string().required('Required'),
  calibrationDueDate: Yup.string().required('Required'),

  monitoringEntries: Yup.array().of(
    Yup.object().shape({
      time: Yup.string().required('Required'),
      temperature: Yup.string().required('Required'),
      humidity: Yup.string().required('Required'),
      minLimit: Yup.string().required('Required'),
      maxLimit: Yup.string().required('Required'),
      deviation: Yup.string(),
      remarks: Yup.string(),
      dynamicFields: Yup.object()
    })
  ).min(1, 'At least one monitoring entry required'),

  deviationSummary: Yup.string(),
  correctiveActionTaken: Yup.string(),
  escalationRequired: Yup.string(),

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
  warehouseLocation: '',
  areaZone: '',
  recordedBy: '',
  shiftTime: '',
  monitoringDeviceId: '',
  calibrationDueDate: '',

  monitoringEntries: [
    {
      time: '',
      temperature: '',
      humidity: '',
      minLimit: '',
      maxLimit: '',
      deviation: '',
      remarks: '',
      dynamicFields: {}
    }
  ],

  deviationSummary: '',
  correctiveActionTaken: '',
  escalationRequired: '',

  supervisorReview: '',
  authorizationComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00385_WarehouseTemperatureLog = () => {

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
      formId="FRM-00385"
      title="Warehouse Temperature Log – Log / Register"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Warehouse Temperature Log submitted successfully');
        }}
      >
        {({ values }) => (
          <Form>
            <ModernA4Template
              formId="FRM-00385"
              title="Warehouse Temperature Log"
              department="Inventory & Warehousing – Warehouse Control"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'logDate','Date','date')}
                  {field(values,'warehouseLocation','Warehouse Location')}
                  {field(values,'areaZone','Area / Zone')}
                  {field(values,'recordedBy','Recorded By')}
                  {field(values,'shiftTime','Shift / Time')}
                  {field(values,'monitoringDeviceId','Monitoring Device ID')}
                  {field(values,'calibrationDueDate','Calibration Due Date','date')}
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
                minLimit: '',
                maxLimit: '',
                deviation: '',
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
            <th>Min Limit</th>
            <th>Max Limit</th>
            <th>Deviation</th>
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
                  name={`monitoringEntries.${index}.minLimit`}
                  className="form-input"
                />
              </td>

              <td>
                <Field
                  name={`monitoringEntries.${index}.maxLimit`}
                  className="form-input"
                />
              </td>

              <td>
                <Field
                  name={`monitoringEntries.${index}.deviation`}
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


              {/* 3. Deviations and Actions */}
              <div className="form-section">
                <h3 className="form-section-title">3. Deviations and Actions</h3>
                <div className="form-fields">
                  {textarea(values,'deviationSummary','Deviation Summary')}
                  {textarea(values,'correctiveActionTaken','Corrective Action Taken')}
                  {textarea(values,'escalationRequired','Escalation Required')}
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
                    Submit Temperature Log
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

export default FRM00385_WarehouseTemperatureLog;
