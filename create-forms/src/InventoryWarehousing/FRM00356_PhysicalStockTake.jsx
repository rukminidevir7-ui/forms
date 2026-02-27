// FRM00356_PhysicalStockTake.jsx
// FRM-00356 – Physical Stock Take – Request / Initiation Form

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
  stockTakeDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  conductedBy: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  warehouseLocation: Yup.string().required('Required'),
  stockTakeType: Yup.string().required('Required'),
  approvalReference: Yup.string().required('Required'),

  // 2. Scope & Planning
  reasonForStockTake: Yup.string().required('Required'),
  areasCovered: Yup.string().required('Required'),
  plannedTime: Yup.string().required('Required'),

  // 3. Item Count Details
  items: Yup.array().of(
    Yup.object().shape({
      itemCode: Yup.string().required('Required'),
      itemDescription: Yup.string().required('Required'),
      uom: Yup.string().required('Required'),
      systemQty: Yup.number().required('Required'),
      physicalQty: Yup.number().required('Required'),
      variance: Yup.number().required('Required'),
      remarks: Yup.string(),
      dynamicFields: Yup.object()
    })
  ).min(1, 'At least one item required'),

  // 4. Variance Summary
  totalVarianceValue: Yup.string().required('Required'),
  keyObservations: Yup.string().required('Required'),
  adjustmentRequired: Yup.string().required('Required'),

  // 5. Authorization
  stockTakeSupervisor: Yup.string().required('Required'),
  storesManagerApproval: Yup.string().required('Required'),
  financeAuditReview: Yup.string().required('Required'),
  authorizationComments: Yup.string(),

  // 6. Supporting Information
  supportingDocuments: Yup.string(),
  additionalNotes: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  stockTakeDate: '',
  department: '',
  conductedBy: '',
  referenceNumber: '',
  warehouseLocation: '',
  stockTakeType: '',
  approvalReference: '',

  reasonForStockTake: '',
  areasCovered: '',
  plannedTime: '',

  items: [
    {
      itemCode: '',
      itemDescription: '',
      uom: '',
      systemQty: '',
      physicalQty: '',
      variance: '',
      remarks: '',
      dynamicFields: {}
    }
  ],

  totalVarianceValue: '',
  keyObservations: '',
  adjustmentRequired: '',

  stockTakeSupervisor: '',
  storesManagerApproval: '',
  financeAuditReview: '',
  authorizationComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00356_PhysicalStockTake = () => {

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

  return (
    <ModernFormWrapper
      formId="FRM-00356"
      title="Physical Stock Take – Request / Initiation Form"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Physical Stock Take submitted successfully');
        }}
      >
        {({ values }) => (
          <Form>
            <ModernA4Template
              formId="FRM-00356"
              title="Physical Stock Take"
              department="Inventory & Warehousing – Stores Operations"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'stockTakeDate','Stock Take Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'conductedBy','Conducted By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {field(values,'warehouseLocation','Warehouse Location')}
                  {field(values,'stockTakeType','Stock Take Type')}
                  {field(values,'approvalReference','Approval Reference')}
                </div>
              </div>

              {/* 2. Scope & Planning */}
              <div className="form-section">
                <h3 className="form-section-title">2. Scope & Planning</h3>
                <div className="form-fields">
                  {textarea(values,'reasonForStockTake','Reason for Stock Take')}
                  {field(values,'areasCovered','Areas Covered')}
                  {field(values,'plannedTime','Planned Start / End Time')}
                </div>
              </div>

              {/* 3. Item Count Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Item Count Details</h3>

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
                            <th>Variance</th>
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
                              <td><Field name={`items.${index}.variance`} type="number" className="form-input" /></td>
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
                            variance: '',
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

              {/* 4. Variance Summary */}
              <div className="form-section">
                <h3 className="form-section-title">4. Variance Summary</h3>
                <div className="form-fields">
                  {field(values,'totalVarianceValue','Total Variance Value')}
                  {textarea(values,'keyObservations','Key Observations')}
                  {field(values,'adjustmentRequired','Adjustment Required')}
                </div>
              </div>

              {/* 5. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'stockTakeSupervisor','Stock Take Supervisor')}
                  {field(values,'storesManagerApproval','Stores Manager Approval')}
                  {field(values,'financeAuditReview','Finance / Audit Review')}
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
                    Submit Physical Stock Take
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

export default FRM00356_PhysicalStockTake;
