// FRM00368_DamagedStockReport.jsx
// FRM-00368 – Damaged Stock Report – Request / Initiation Form

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

  // 1. Basic Information
  identificationDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  identifiedBy: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  warehouseLocation: Yup.string().required('Required'),
  incidentReference: Yup.string().required('Required'),
  approvalReference: Yup.string().required('Required'),

  // 2. Damage Details
  causeOfDamage: Yup.string().required('Required'),
  damageType: Yup.string().required('Required'),
  dateOfDamage: Yup.string().required('Required'),

  // 3. Item Details
  items: Yup.array().of(
    Yup.object().shape({
      itemCode: Yup.string().required('Required'),
      itemDescription: Yup.string().required('Required'),
      batchNumber: Yup.string().required('Required'),
      qtyDamaged: Yup.number().required('Required'),
      unitValue: Yup.number().required('Required'),
      totalValue: Yup.number().required('Required'),
      disposition: Yup.string().required('Required'),
      remarks: Yup.string(),
      dynamicFields: Yup.object()
    })
  ).min(1, 'At least one item required'),

  // 4. Assessment
  financialImpact: Yup.string().required('Required'),
  rootCauseAnalysis: Yup.string().required('Required'),
  correctiveAction: Yup.string().required('Required'),

  // 5. Authorization
  reportedBy: Yup.string().required('Required'),
  storesManagerApproval: Yup.string().required('Required'),
  qualityComplianceApproval: Yup.string().required('Required'),
  financeApproval: Yup.string().required('Required'),
  managementApproval: Yup.string().required('Required'),
  authorizationComments: Yup.string(),

  // 6. Supporting Information
  supportingDocuments: Yup.string(),
  additionalNotes: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  identificationDate: '',
  department: '',
  identifiedBy: '',
  referenceNumber: '',
  warehouseLocation: '',
  incidentReference: '',
  approvalReference: '',

  causeOfDamage: '',
  damageType: '',
  dateOfDamage: '',

  items: [
    {
      itemCode: '',
      itemDescription: '',
      batchNumber: '',
      qtyDamaged: '',
      unitValue: '',
      totalValue: '',
      disposition: '',
      remarks: '',
      dynamicFields: {}
    }
  ],

  financialImpact: '',
  rootCauseAnalysis: '',
  correctiveAction: '',

  reportedBy: '',
  storesManagerApproval: '',
  qualityComplianceApproval: '',
  financeApproval: '',
  managementApproval: '',
  authorizationComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00368_DamagedStockReport = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const columnName = prompt('Enter New Column Name');
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
      {isPrintMode ? (
        <div className="print-value">{values[name] || '___________________'}</div>
      ) : (
        <>
          <Field name={name} type={type} className="form-input" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  const textarea = (values, name, label) => (
    <div className="form-field full-width">
      <label className="form-label">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '___________________'}</div>
      ) : (
        <>
          <Field as="textarea" name={name} className="form-textarea" rows="3" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  const select = (values, name, label, options) => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '___________________'}</div>
      ) : (
        <>
          <Field as="select" name={name} className="form-input">
            <option value="">-- Select --</option>
            {options.map(o => <option key={o} value={o}>{o}</option>)}
          </Field>
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (
    <ModernFormWrapper
      formId="FRM-00368"
      title="Damaged Stock Report – Request / Initiation Form"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Damaged Stock Report submitted successfully');
        }}
      >
        {({ values }) => (
          <Form>
            <ModernA4Template
              formId="FRM-00368"
              title="Damaged Stock Report"
              department="Inventory & Warehousing – Stores Operations"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'identificationDate','Identification Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'identifiedBy','Identified By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {field(values,'warehouseLocation','Warehouse Location')}
                  {field(values,'incidentReference','Incident Reference')}
                  {field(values,'approvalReference','Approval Reference')}
                </div>
              </div>

              {/* 2. Damage Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Damage Details</h3>
                <div className="form-fields">
                  {textarea(values,'causeOfDamage','Cause of Damage')}
                  {select(values,'damageType','Damage Type',['Handling','Storage','Transit','Other'])}
                  {field(values,'dateOfDamage','Date of Damage','date')}
                </div>
              </div>

              {/* 3. Item Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Item Details</h3>

                {!isPrintMode && (
                  <button type="button" className="btn-submit" onClick={addColumn}>
                    + Add Column
                  </button>
                )}

                <FieldArray name="items">
                  {({ push, remove }) => (
                    <>
                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Item Code</th>
                            <th>Description</th>
                            <th>Batch/Lot</th>
                            <th>Qty Damaged</th>
                            <th>Unit Value</th>
                            <th>Total Value</th>
                            <th>Disposition</th>
                            <th>Remarks</th>

                            {dynamicColumns.map(col => (
                              <th key={col.key}>
                                {col.label}
                                {!isPrintMode && (
                                  <button type="button" onClick={() => removeColumn(col.key)}> x </button>
                                )}
                              </th>
                            ))}

                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {values.items.map((item, index) => (
                            <tr key={index}>
                              <td><Field name={`items.${index}.itemCode`} className="form-input" /></td>
                              <td><Field name={`items.${index}.itemDescription`} className="form-input" /></td>
                              <td><Field name={`items.${index}.batchNumber`} className="form-input" /></td>
                              <td><Field name={`items.${index}.qtyDamaged`} type="number" className="form-input" /></td>
                              <td><Field name={`items.${index}.unitValue`} type="number" className="form-input" /></td>
                              <td><Field name={`items.${index}.totalValue`} type="number" className="form-input" /></td>
                              <td><Field name={`items.${index}.disposition`} className="form-input" /></td>
                              <td><Field name={`items.${index}.remarks`} className="form-input" /></td>

                              {dynamicColumns.map(col => (
                                <td key={col.key}>
                                  <Field
                                    name={`items.${index}.dynamicFields.${col.key}`}
                                    className="form-input"
                                  />
                                </td>
                              ))}

                              {!isPrintMode && (
                                <td>
                                  <button type="button" onClick={() => remove(index)}>Remove</button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={() => push({
                            itemCode: '',
                            itemDescription: '',
                            batchNumber: '',
                            qtyDamaged: '',
                            unitValue: '',
                            totalValue: '',
                            disposition: '',
                            remarks: '',
                            dynamicFields: {}
                          })}
                        >
                          + Add Item
                        </button>
                      )}
                    </>
                  )}
                </FieldArray>
              </div>

              {/* 4. Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">4. Assessment</h3>
                <div className="form-fields">
                  {textarea(values,'financialImpact','Financial Impact')}
                  {textarea(values,'rootCauseAnalysis','Root Cause Analysis')}
                  {textarea(values,'correctiveAction','Corrective Action')}
                </div>
              </div>

              {/* 5. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'reportedBy','Reported By')}
                  {field(values,'storesManagerApproval','Stores Manager Approval')}
                  {field(values,'qualityComplianceApproval','Quality / Compliance Approval')}
                  {field(values,'financeApproval','Finance Approval')}
                  {field(values,'managementApproval','Management Approval')}
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
                    Submit Damaged Stock Report
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

export default FRM00368_DamagedStockReport;
