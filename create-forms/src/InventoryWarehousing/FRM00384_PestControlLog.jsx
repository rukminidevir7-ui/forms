// FRM00384_PestControlLog.jsx
// FRM-00384 – Pest Control Log – Log / Register Form

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
  serviceProvider: Yup.string().required('Required'),
  serviceFrequency: Yup.string().required('Required'),
  recordedBy: Yup.string().required('Required'),
  shiftTime: Yup.string().required('Required'),

  monitoringEntries: Yup.array().of(
    Yup.object().shape({
      inspectionPoint: Yup.string().required('Required'),
      activityType: Yup.string().required('Required'),
      chemicalMethod: Yup.string().required('Required'),
      observation: Yup.string().required('Required'),
      actionTaken: Yup.string().required('Required'),
      nextDueDate: Yup.string().required('Required'),
      dynamicFields: Yup.object()
    })
  ).min(1, 'At least one monitoring entry required'),

  findingsSummary: Yup.string(),
  correctiveActions: Yup.string(),
  riskLevel: Yup.string(),

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
  serviceProvider: '',
  serviceFrequency: '',
  recordedBy: '',
  shiftTime: '',

  monitoringEntries: [
    {
      inspectionPoint: '',
      activityType: '',
      chemicalMethod: '',
      observation: '',
      actionTaken: '',
      nextDueDate: '',
      dynamicFields: {}
    }
  ],

  findingsSummary: '',
  correctiveActions: '',
  riskLevel: '',

  supervisorReview: '',
  authorizationComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00384_PestControlLog = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const columnName = prompt('Enter New Monitoring Field');
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
      formId="FRM-00384"
      title="Pest Control Log – Log / Register"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Pest Control Log submitted successfully');
        }}
      >
        {({ values }) => (
          <Form>
            <ModernA4Template
              formId="FRM-00384"
              title="Pest Control Log"
              department="Inventory & Warehousing – Warehouse Control"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'logDate','Date','date')}
                  {field(values,'warehouseLocation','Warehouse Location')}
                  {field(values,'areaZone','Area / Zone')}
                  {field(values,'serviceProvider','Service Provider')}
                  {field(values,'serviceFrequency','Service Frequency')}
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
        + Add Monitoring Field
      </button>

      <FieldArray name="monitoringEntries">
        {({ push }) => (
          <button
            type="button"
            className="btn-submit"
            onClick={() =>
              push({
                inspectionPoint: '',
                activityType: '',
                chemicalMethod: '',
                observation: '',
                actionTaken: '',
                nextDueDate: '',
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
            <th>Inspection Point</th>
            <th>Type of Activity</th>
            <th>Chemical / Method Used</th>
            <th>Observation</th>
            <th>Action Taken</th>
            <th>Next Due Date</th>

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
                  name={`monitoringEntries.${index}.inspectionPoint`}
                  className="form-input"
                />
              </td>

              <td>
                <Field
                  name={`monitoringEntries.${index}.activityType`}
                  className="form-input"
                />
              </td>

              <td>
                <Field
                  name={`monitoringEntries.${index}.chemicalMethod`}
                  className="form-input"
                />
              </td>

              <td>
                <Field
                  name={`monitoringEntries.${index}.observation`}
                  className="form-input"
                />
              </td>

              <td>
                <Field
                  name={`monitoringEntries.${index}.actionTaken`}
                  className="form-input"
                />
              </td>

              <td>
                <Field
                  name={`monitoringEntries.${index}.nextDueDate`}
                  type="date"
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

              {/* 3. Findings and Actions */}
              <div className="form-section">
                <h3 className="form-section-title">3. Findings and Actions</h3>
                <div className="form-fields">
                  {textarea(values,'findingsSummary','Findings Summary')}
                  {textarea(values,'correctiveActions','Corrective Actions')}
                  {textarea(values,'riskLevel','Risk Level')}
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
                    Submit Pest Control Log
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

export default FRM00384_PestControlLog;
