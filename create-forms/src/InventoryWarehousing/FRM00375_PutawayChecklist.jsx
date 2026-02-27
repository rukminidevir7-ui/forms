// FRM00375_PutawayChecklist.jsx
// FRM-00375 – Putaway Checklist – Checklist Form

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

  checklistDate: Yup.string().required('Required'),
  warehouseLocation: Yup.string().required('Required'),
  putawayReference: Yup.string().required('Required'),
  checkedBy: Yup.string().required('Required'),
  shiftTime: Yup.string().required('Required'),

  materialItems: Yup.array().of(
    Yup.object().shape({
      itemDescription: Yup.string().required('Required'),
      itemCode: Yup.string().required('Required'),
      batchNumber: Yup.string().required('Required'),
      quantityReceived: Yup.number().required('Required'),
      storageLocation: Yup.string().required('Required'),
      dynamicFields: Yup.object()
    })
  ).min(1, 'At least one material item required'),

  verificationChecks: Yup.array().of(
    Yup.object().shape({
      item: Yup.string().required('Required'),
      response: Yup.string().required('Required'),
      remarks: Yup.string()
    })
  ).min(1, 'At least one verification check required'),

  issuesIdentified: Yup.string(),
  correctiveAction: Yup.string(),

  performedBy: Yup.string().required('Required'),
  supervisorApproval: Yup.string().required('Required'),
  authorizationComments: Yup.string(),

  supportingDocuments: Yup.string(),
  additionalNotes: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()
});

const defaultVerificationChecks = [
  { item: 'Items verified against GRN', response: '', remarks: '' },
  { item: 'Correct storage location identified', response: '', remarks: '' },
  { item: 'Location labeling verified', response: '', remarks: '' },
  { item: 'Quantity physically verified', response: '', remarks: '' },
  { item: 'No damage observed during handling', response: '', remarks: '' },
  { item: 'FIFO / FEFO followed (if applicable)', response: '', remarks: '' },
  { item: 'System entry completed', response: '', remarks: '' },
  { item: 'Safety procedures followed', response: '', remarks: '' },
  { item: 'Handling equipment used correctly', response: '', remarks: '' },
  { item: 'Segregation requirements followed', response: '', remarks: '' }
];

const initialValues = {
  checklistDate: '',
  warehouseLocation: '',
  putawayReference: '',
  checkedBy: '',
  shiftTime: '',

  materialItems: [
    {
      itemDescription: '',
      itemCode: '',
      batchNumber: '',
      quantityReceived: '',
      storageLocation: '',
      dynamicFields: {}
    }
  ],

  verificationChecks: defaultVerificationChecks,

  issuesIdentified: '',
  correctiveAction: '',

  performedBy: '',
  supervisorApproval: '',
  authorizationComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []
};

const FRM00375_PutawayChecklist = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addMaterialColumn = () => {
    const columnName = prompt('Enter New Material Field Name');
    if (!columnName) return;

    const key = columnName.replace(/\s+/g, '');

    if (dynamicColumns.find(col => col.key === key)) {
      alert('Field already exists');
      return;
    }

    setDynamicColumns([...dynamicColumns, { key, label: columnName }]);
  };

  const removeMaterialColumn = (key) => {
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
      formId="FRM-00375"
      title="Putaway Checklist – Checklist Form"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Putaway Checklist submitted successfully');
        }}
      >
        {({ values }) => (
          <Form>
            <ModernA4Template
              formId="FRM-00375"
              title="Putaway Checklist"
              department="Inventory & Warehousing – Warehouse Control"
            >

              {/* 1. Basic Info */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'checklistDate','Checklist Date','date')}
                  {field(values,'warehouseLocation','Warehouse Location')}
                  {field(values,'putawayReference','Putaway Reference / GRN No.')}
                  {field(values,'checkedBy','Checked By')}
                  {field(values,'shiftTime','Shift / Time')}
                </div>
              </div>

              {/* 2. Material Details with Dynamic Columns */}
            <div className="form-section" style={{ marginBottom: "35px" }}>
  <h3 className="form-section-title">2. Material Details</h3>

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
        onClick={addMaterialColumn}
      >
        + Add Material Field
      </button>

      <FieldArray name="materialItems">
        {({ push }) => (
          <button
            type="button"
            className="btn-submit"
            onClick={() =>
              push({
                itemDescription: '',
                itemCode: '',
                batchNumber: '',
                quantityReceived: '',
                storageLocation: '',
                dynamicFields: {}
              })
            }
          >
            + Add Material Item
          </button>
        )}
      </FieldArray>
    </div>
  )}

  <FieldArray name="materialItems">
    {({ remove }) => (
      <table className="items-table">
        <thead>
          <tr>
            <th>Item Description</th>
            <th>Item Code / SKU</th>
            <th>Batch / Lot No.</th>
            <th>Quantity Received</th>
            <th>Storage Location Assigned</th>

            {dynamicColumns.map(col => (
              <th key={col.key}>
                {col.label}
                {!isPrintMode && (
                  <button
                    type="button"
                    onClick={() => removeMaterialColumn(col.key)}
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
          {values.materialItems.map((item, index) => (
            <tr key={index}>
              <td>
                <Field
                  name={`materialItems.${index}.itemDescription`}
                  className="form-input"
                />
              </td>

              <td>
                <Field
                  name={`materialItems.${index}.itemCode`}
                  className="form-input"
                />
              </td>

              <td>
                <Field
                  name={`materialItems.${index}.batchNumber`}
                  className="form-input"
                />
              </td>

              <td>
                <Field
                  name={`materialItems.${index}.quantityReceived`}
                  type="number"
                  className="form-input"
                />
              </td>

              <td>
                <Field
                  name={`materialItems.${index}.storageLocation`}
                  className="form-input"
                />
              </td>

              {dynamicColumns.map(col => (
                <td key={col.key}>
                  <Field
                    name={`materialItems.${index}.dynamicFields.${col.key}`}
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

              {/* 3. Verification Checks (unchanged) */}
              <div className="form-section">
                <h3 className="form-section-title">3. Putaway Verification Checks</h3>

                <FieldArray name="verificationChecks">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <button type="button" className="btn-submit" onClick={() => push({ item: '', response: '', remarks: '' })}>
                          + Add Verification Item
                        </button>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Verification Item</th>
                            <th>Yes</th>
                            <th>No</th>
                            <th>Remarks</th>
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {values.verificationChecks.map((row, index) => (
                            <tr key={index}>
                              <td><Field name={`verificationChecks.${index}.item`} className="form-input" /></td>
                              <td><Field type="radio" name={`verificationChecks.${index}.response`} value="Yes" /></td>
                              <td><Field type="radio" name={`verificationChecks.${index}.response`} value="No" /></td>
                              <td><Field name={`verificationChecks.${index}.remarks`} className="form-input" /></td>
                              {!isPrintMode && (
                                <td>
                                  <button type="button" onClick={() => remove(index)}>Remove</button>
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

              {/* Remaining sections unchanged */}

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} />

            </ModernA4Template>
          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00375_PutawayChecklist;
