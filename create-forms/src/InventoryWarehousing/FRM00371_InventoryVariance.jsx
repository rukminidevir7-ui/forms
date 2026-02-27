// FRM00371_InventoryVariance.jsx
// FRM-00371 – Inventory Variance – Request / Initiation Form

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
  varianceDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  identifiedBy: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  warehouseLocation: Yup.string().required('Required'),
  relatedCountRef: Yup.string().required('Required'),
  approvalReference: Yup.string().required('Required'),

  // 2. Variance Details
  reasonForVariance: Yup.string().required('Required'),
  varianceType: Yup.string().required('Required'),
  dateIdentified: Yup.string().required('Required'),

  // 3. Item Variance Details
  items: Yup.array().of(
    Yup.object().shape({
      itemCode: Yup.string().required('Required'),
      itemDescription: Yup.string().required('Required'),
      uom: Yup.string().required('Required'),
      systemQty: Yup.number().required('Required'),
      physicalQty: Yup.number().required('Required'),
      varianceQty: Yup.number().required('Required'),
      unitValue: Yup.number().required('Required'),
      totalImpact: Yup.number().required('Required'),
      remarks: Yup.string(),
      dynamicFields: Yup.object()
    })
  ).min(1, 'At least one item required'),

  // 4. Analysis
  rootCauseAnalysis: Yup.string().required('Required'),
  correctiveAction: Yup.string().required('Required'),
  preventiveAction: Yup.string().required('Required'),

  // 5. Authorization
  identifiedByApproval: Yup.string().required('Required'),
  storesManagerApproval: Yup.string().required('Required'),
  financeAuditApproval: Yup.string().required('Required'),
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

  varianceDate: '',
  department: '',
  identifiedBy: '',
  referenceNumber: '',
  warehouseLocation: '',
  relatedCountRef: '',
  approvalReference: '',

  reasonForVariance: '',
  varianceType: '',
  dateIdentified: '',

  items: [
    {
      itemCode: '',
      itemDescription: '',
      uom: '',
      systemQty: '',
      physicalQty: '',
      varianceQty: '',
      unitValue: '',
      totalImpact: '',
      remarks: '',
      dynamicFields: {}
    }
  ],

  rootCauseAnalysis: '',
  correctiveAction: '',
  preventiveAction: '',

  identifiedByApproval: '',
  storesManagerApproval: '',
  financeAuditApproval: '',
  managementApproval: '',
  authorizationComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00371_InventoryVariance = () => {

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
      formId="FRM-00371"
      title="Inventory Variance – Request / Initiation Form"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Inventory Variance submitted successfully');
        }}
      >
        {({ values }) => (
          <Form>
            <ModernA4Template
              formId="FRM-00371"
              title="Inventory Variance"
              department="Inventory & Warehousing – Stores Operations"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'varianceDate','Variance Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'identifiedBy','Identified By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {field(values,'warehouseLocation','Warehouse Location')}
                  {field(values,'relatedCountRef','Related Count Ref')}
                  {field(values,'approvalReference','Approval Reference')}
                </div>
              </div>

              {/* 2. Variance Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Variance Details</h3>
                <div className="form-fields">
                  {textarea(values,'reasonForVariance','Reason for Variance')}
                  {select(values,'varianceType','Variance Type',['Shortage','Excess','Misplacement'])}
                  {field(values,'dateIdentified','Date Identified','date')}
                </div>
              </div>

              {/* 3. Item Variance Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Item Variance Details</h3>

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
                            <th>UOM</th>
                            <th>System Qty</th>
                            <th>Physical Qty</th>
                            <th>Variance Qty</th>
                            <th>Unit Value</th>
                            <th>Total Impact</th>
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
                              <td><Field name={`items.${index}.uom`} className="form-input" /></td>
                              <td><Field name={`items.${index}.systemQty`} type="number" className="form-input" /></td>
                              <td><Field name={`items.${index}.physicalQty`} type="number" className="form-input" /></td>
                              <td><Field name={`items.${index}.varianceQty`} type="number" className="form-input" /></td>
                              <td><Field name={`items.${index}.unitValue`} type="number" className="form-input" /></td>
                              <td><Field name={`items.${index}.totalImpact`} type="number" className="form-input" /></td>
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
                            uom: '',
                            systemQty: '',
                            physicalQty: '',
                            varianceQty: '',
                            unitValue: '',
                            totalImpact: '',
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

              {/* 4. Analysis */}
              <div className="form-section">
                <h3 className="form-section-title">4. Analysis</h3>
                <div className="form-fields">
                  {textarea(values,'rootCauseAnalysis','Root Cause Analysis')}
                  {textarea(values,'correctiveAction','Corrective Action')}
                  {textarea(values,'preventiveAction','Preventive Action')}
                </div>
              </div>

              {/* 5. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'identifiedByApproval','Identified By')}
                  {field(values,'storesManagerApproval','Stores Manager Approval')}
                  {field(values,'financeAuditApproval','Finance / Audit Approval')}
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
                    Submit Inventory Variance
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

export default FRM00371_InventoryVariance;
