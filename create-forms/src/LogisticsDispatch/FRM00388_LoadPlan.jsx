// FRM00388_LoadPlan.jsx
// FRM-00388 – Load Plan – Report / Record

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

  planDate: Yup.string().required('Required'),
  dispatchReference: Yup.string().required('Required'),
  orderNo: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  shiftTime: Yup.string().required('Required'),
  vehicleNo: Yup.string().required('Required'),
  driverName: Yup.string().required('Required'),

  loadItems: Yup.array().of(
    Yup.object().shape({
      itemDescription: Yup.string().required('Required'),
      itemCode: Yup.string().required('Required'),
      packageType: Yup.string().required('Required'),
      quantity: Yup.number().required('Required'),
      weight: Yup.string().required('Required'),
      loadingSequence: Yup.string().required('Required'),
      specialInstructions: Yup.string(),
      dynamicFields: Yup.object()
    })
  ).min(1, 'At least one load item required'),

  vehicleCapacity: Yup.string().required('Required'),
  totalLoadWeight: Yup.string().required('Required'),
  loadSecured: Yup.string().required('Required'),
  balanceVerified: Yup.string().required('Required'),
  capacityRemarks: Yup.string(),

  verifiedBy: Yup.string().required('Required'),
  authorizationComments: Yup.string(),

  supportingDocuments: Yup.string(),
  additionalNotes: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  planDate: '',
  dispatchReference: '',
  orderNo: '',
  preparedBy: '',
  shiftTime: '',
  vehicleNo: '',
  driverName: '',

  loadItems: [
    {
      itemDescription: '',
      itemCode: '',
      packageType: '',
      quantity: '',
      weight: '',
      loadingSequence: '',
      specialInstructions: '',
      dynamicFields: {}
    }
  ],

  vehicleCapacity: '',
  totalLoadWeight: '',
  loadSecured: '',
  balanceVerified: '',
  capacityRemarks: '',

  verifiedBy: '',
  authorizationComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00388_LoadPlan = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const columnName = prompt('Enter New Load Field');
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
      formId="FRM-00388"
      title="Load Plan – Report / Record"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Load Plan submitted successfully');
        }}
      >
        {({ values }) => (
          <Form>
            <ModernA4Template
              formId="FRM-00388"
              title="Load Plan"
              department="Logistics & Dispatch – Transportation & Dispatch"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'planDate','Plan Date','date')}
                  {field(values,'dispatchReference','Dispatch Reference')}
                  {field(values,'orderNo','Order No.')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'shiftTime','Shift / Time')}
                  {field(values,'vehicleNo','Vehicle No.')}
                  {field(values,'driverName','Driver Name')}
                </div>
              </div>

              {/* 2. Load Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Load Details</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: '20px' }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Load Field
                    </button>
                  </div>
                )}

                <FieldArray name="loadItems">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <div style={{ marginBottom: '20px' }}>
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={() =>
                              push({
                                itemDescription: '',
                                itemCode: '',
                                packageType: '',
                                quantity: '',
                                weight: '',
                                loadingSequence: '',
                                specialInstructions: '',
                                dynamicFields: {}
                              })
                            }
                          >
                            + Add Item
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Item Description</th>
                            <th>Item Code / SKU</th>
                            <th>Package Type</th>
                            <th>Quantity</th>
                            <th>Weight</th>
                            <th>Loading Sequence</th>
                            <th>Special Instructions</th>

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
                          {values.loadItems.map((row, index) => (
                            <tr key={index}>
                              <td><Field name={`loadItems.${index}.itemDescription`} className="form-input" /></td>
                              <td><Field name={`loadItems.${index}.itemCode`} className="form-input" /></td>
                              <td><Field name={`loadItems.${index}.packageType`} className="form-input" /></td>
                              <td><Field name={`loadItems.${index}.quantity`} type="number" className="form-input" /></td>
                              <td><Field name={`loadItems.${index}.weight`} className="form-input" /></td>
                              <td><Field name={`loadItems.${index}.loadingSequence`} className="form-input" /></td>
                              <td><Field name={`loadItems.${index}.specialInstructions`} className="form-input" /></td>

                              {dynamicColumns.map(col => (
                                <td key={col.key}>
                                  <Field
                                    name={`loadItems.${index}.dynamicFields.${col.key}`}
                                    className="form-input"
                                  />
                                </td>
                              ))}

                              {!isPrintMode && (
                                <td>
                                  <button type="button" onClick={() => remove(index)}>
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

              {/* 3. Capacity and Safety */}
              <div className="form-section">
                <h3 className="form-section-title">3. Capacity and Safety</h3>
                <div className="form-fields">
                  {field(values,'vehicleCapacity','Vehicle Capacity')}
                  {field(values,'totalLoadWeight','Total Load Weight')}
                  {field(values,'loadSecured','Load Secured Properly')}
                  {field(values,'balanceVerified','Balance and Distribution Verified')}
                  {textarea(values,'capacityRemarks','Remarks')}
                </div>
              </div>

              {/* 4. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">4. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'verifiedBy','Verified By')}
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
                    Submit Load Plan
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

export default FRM00388_LoadPlan;
