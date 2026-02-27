// FRM00380_FIFO_FEFO_ComplianceCheck.jsx
// FRM-00380 – FIFO / FEFO Compliance Check – Request / Initiation Form

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

  checkDate: Yup.string().required('Required'),
  warehouseLocation: Yup.string().required('Required'),
  areaZone: Yup.string().required('Required'),
  conductedBy: Yup.string().required('Required'),
  shiftTime: Yup.string().required('Required'),

  inventoryItems: Yup.array().of(
    Yup.object().shape({
      itemDescription: Yup.string().required('Required'),
      itemCode: Yup.string().required('Required'),
      batchNumber: Yup.string().required('Required'),
      manufactureDate: Yup.string().required('Required'),
      expiryDate: Yup.string().required('Required'),
      location: Yup.string().required('Required'),
      complianceStatus: Yup.string().required('Required'),
      dynamicFields: Yup.object()
    })
  ).min(1, 'At least one inventory item required'),

  complianceChecks: Yup.array().of(
    Yup.object().shape({
      item: Yup.string().required('Required'),
      response: Yup.string().required('Required'),
      remarks: Yup.string()
    })
  ).min(1, 'At least one compliance check required'),

  deviationsIdentified: Yup.string(),
  correctiveAction: Yup.string(),
  riskImpact: Yup.string(),

  supervisorReview: Yup.string().required('Required'),
  authorizationComments: Yup.string(),

  supportingDocuments: Yup.string(),
  additionalNotes: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const defaultComplianceChecks = [
  { item: 'Oldest stock issued first', response: '', remarks: '' },
  { item: 'Expiry-based picking followed', response: '', remarks: '' },
  { item: 'Stock rotation followed', response: '', remarks: '' },
  { item: 'Labels clearly visible', response: '', remarks: '' },
  { item: 'Near-expiry items identified', response: '', remarks: '' },
  { item: 'System reflects correct sequence', response: '', remarks: '' },
  { item: 'No expired items in active storage', response: '', remarks: '' },
  { item: 'Segregation followed where required', response: '', remarks: '' }
];

const initialValues = {

  checkDate: '',
  warehouseLocation: '',
  areaZone: '',
  conductedBy: '',
  shiftTime: '',

  inventoryItems: [
    {
      itemDescription: '',
      itemCode: '',
      batchNumber: '',
      manufactureDate: '',
      expiryDate: '',
      location: '',
      complianceStatus: '',
      dynamicFields: {}
    }
  ],

  complianceChecks: defaultComplianceChecks,

  deviationsIdentified: '',
  correctiveAction: '',
  riskImpact: '',

  supervisorReview: '',
  authorizationComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00380_FIFO_FEFO_ComplianceCheck = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const columnName = prompt('Enter New Inventory Field');
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
      formId="FRM-00380"
      title="FIFO / FEFO Compliance Check – Request / Initiation Form"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('FIFO / FEFO Compliance Check submitted successfully');
        }}
      >
        {({ values }) => (
          <Form>
            <ModernA4Template
              formId="FRM-00380"
              title="FIFO / FEFO Compliance Check"
              department="Inventory & Warehousing – Warehouse Control"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'checkDate','Check Date','date')}
                  {field(values,'warehouseLocation','Warehouse Location')}
                  {field(values,'areaZone','Area / Zone')}
                  {field(values,'conductedBy','Conducted By')}
                  {field(values,'shiftTime','Shift / Time')}
                </div>
              </div>

              {/* 2. Inventory Verification */}
              <div className="form-section" style={{ marginBottom: "35px" }}>
  <h3 className="form-section-title">2. Inventory Verification</h3>

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
        + Add Inventory Field
      </button>

      <FieldArray name="inventoryItems">
        {({ push }) => (
          <button
            type="button"
            className="btn-submit"
            onClick={() =>
              push({
                itemDescription: '',
                itemCode: '',
                batchNumber: '',
                manufactureDate: '',
                expiryDate: '',
                location: '',
                complianceStatus: '',
                dynamicFields: {}
              })
            }
          >
            + Add Item
          </button>
        )}
      </FieldArray>
    </div>
  )}

  <FieldArray name="inventoryItems">
    {({ remove }) => (
      <table className="items-table">
        <thead>
          <tr>
            <th>Item Description</th>
            <th>Item Code / SKU</th>
            <th>Batch / Lot</th>
            <th>Manufacture Date</th>
            <th>Expiry Date</th>
            <th>Location</th>
            <th>Compliance Status</th>

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
          {values.inventoryItems.map((row, index) => (
            <tr key={index}>
              <td>
                <Field
                  name={`inventoryItems.${index}.itemDescription`}
                  className="form-input"
                />
              </td>

              <td>
                <Field
                  name={`inventoryItems.${index}.itemCode`}
                  className="form-input"
                />
              </td>

              <td>
                <Field
                  name={`inventoryItems.${index}.batchNumber`}
                  className="form-input"
                />
              </td>

              <td>
                <Field
                  name={`inventoryItems.${index}.manufactureDate`}
                  type="date"
                  className="form-input"
                />
              </td>

              <td>
                <Field
                  name={`inventoryItems.${index}.expiryDate`}
                  type="date"
                  className="form-input"
                />
              </td>

              <td>
                <Field
                  name={`inventoryItems.${index}.location`}
                  className="form-input"
                />
              </td>

              <td>
                <Field
                  name={`inventoryItems.${index}.complianceStatus`}
                  className="form-input"
                />
              </td>

              {dynamicColumns.map(col => (
                <td key={col.key}>
                  <Field
                    name={`inventoryItems.${index}.dynamicFields.${col.key}`}
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


              {/* 3. Compliance Checks */}
              <div className="form-section">
                <h3 className="form-section-title">3. Compliance Checks</h3>

                <FieldArray name="complianceChecks">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={() =>
                            push({ item: '', response: '', remarks: '' })
                          }
                        >
                          + Add Compliance Check
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
                          {values.complianceChecks.map((row, index) => (
                            <tr key={index}>
                              <td>
                                <Field name={`complianceChecks.${index}.item`} className="form-input" />
                              </td>
                              <td>
                                <Field type="radio" name={`complianceChecks.${index}.response`} value="Yes" />
                              </td>
                              <td>
                                <Field type="radio" name={`complianceChecks.${index}.response`} value="No" />
                              </td>
                              <td>
                                <Field name={`complianceChecks.${index}.remarks`} className="form-input" />
                              </td>
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

              {/* 4. Deviations */}
              <div className="form-section">
                <h3 className="form-section-title">4. Deviations</h3>
                <div className="form-fields">
                  {textarea(values,'deviationsIdentified','Deviations Identified')}
                  {textarea(values,'correctiveAction','Corrective Action')}
                  {textarea(values,'riskImpact','Risk Impact')}
                </div>
              </div>

              {/* 5. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'conductedBy','Conducted By')}
                  {field(values,'supervisorReview','Supervisor Review')}
                  {textarea(values,'authorizationComments','Comments')}
                </div>
              </div>

              {/* 6. Supporting Information */}
              <div className="form-section">
                <h3 className="form-section-title">6. Supporting Information</h3>
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
                    Submit Compliance Check
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

export default FRM00380_FIFO_FEFO_ComplianceCheck;
