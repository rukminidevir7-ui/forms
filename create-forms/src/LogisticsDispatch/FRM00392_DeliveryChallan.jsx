// FRM00392_DeliveryChallan.jsx
// FRM-00392 – Delivery Challan – Request / Initiation Form

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

  challanNo: Yup.string().required('Required'),
  issueDate: Yup.string().required('Required'),
  dispatchReference: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  modeOfTransport: Yup.string().required('Required'),
  vehicleNo: Yup.string().required('Required'),

  consigneeName: Yup.string().required('Required'),
  deliveryAddress: Yup.string().required('Required'),
  cityState: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),

  materialItems: Yup.array().of(
    Yup.object().shape({
      itemDescription: Yup.string().required('Required'),
      itemCode: Yup.string().required('Required'),
      batchLot: Yup.string().required('Required'),
      quantity: Yup.number().required('Required'),
      unit: Yup.string().required('Required'),
      remarks: Yup.string(),
      dynamicFields: Yup.object()
    })
  ).min(1, 'At least one material item required'),

  expectedDeliveryDate: Yup.string().required('Required'),
  specialInstructions: Yup.string(),
  packagingDetails: Yup.string(),
  totalPackages: Yup.string().required('Required'),
  totalWeight: Yup.string().required('Required'),

  approvedBy: Yup.string().required('Required'),
  receivedBy: Yup.string(),
  authorizationComments: Yup.string(),

  supportingDocuments: Yup.string(),
  additionalNotes: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  challanNo: '',
  issueDate: '',
  dispatchReference: '',
  preparedBy: '',
  department: '',
  modeOfTransport: '',
  vehicleNo: '',

  consigneeName: '',
  deliveryAddress: '',
  cityState: '',
  contactPerson: '',
  contactNumber: '',

  materialItems: [
    {
      itemDescription: '',
      itemCode: '',
      batchLot: '',
      quantity: '',
      unit: '',
      remarks: '',
      dynamicFields: {}
    }
  ],

  expectedDeliveryDate: '',
  specialInstructions: '',
  packagingDetails: '',
  totalPackages: '',
  totalWeight: '',

  approvedBy: '',
  receivedBy: '',
  authorizationComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00392_DeliveryChallan = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const columnName = prompt('Enter New Material Field');
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
      formId="FRM-00392"
      title="Delivery Challan – Request / Initiation Form"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Delivery Challan submitted successfully');
        }}
      >
        {({ values }) => (
          <Form>
            <ModernA4Template
              formId="FRM-00392"
              title="Delivery Challan"
              department="Logistics & Dispatch – Transportation & Dispatch"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'challanNo','Challan No.')}
                  {field(values,'issueDate','Issue Date','date')}
                  {field(values,'dispatchReference','Dispatch Reference')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'department','Department')}
                  {field(values,'modeOfTransport','Mode of Transport')}
                  {field(values,'vehicleNo','Vehicle No.')}
                </div>
              </div>

              {/* 2. Consignee Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Consignee Details</h3>
                <div className="form-fields">
                  {field(values,'consigneeName','Consignee Name')}
                  {textarea(values,'deliveryAddress','Delivery Address')}
                  {field(values,'cityState','City / State')}
                  {field(values,'contactPerson','Contact Person')}
                  {field(values,'contactNumber','Contact Number')}
                </div>
              </div>

              {/* 3. Material Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Material Details</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: '10px' }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Material Field
                    </button>
                  </div>
                )}

                <FieldArray name="materialItems">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <div style={{ marginBottom: '10px' }}>
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={() =>
                              push({
                                itemDescription: '',
                                itemCode: '',
                                batchLot: '',
                                quantity: '',
                                unit: '',
                                remarks: '',
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
                            <th>Batch / Lot</th>
                            <th>Quantity</th>
                            <th>Unit</th>
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
                          {values.materialItems.map((row, index) => (
                            <tr key={index}>
                              <td><Field name={`materialItems.${index}.itemDescription`} className="form-input" /></td>
                              <td><Field name={`materialItems.${index}.itemCode`} className="form-input" /></td>
                              <td><Field name={`materialItems.${index}.batchLot`} className="form-input" /></td>
                              <td><Field name={`materialItems.${index}.quantity`} type="number" className="form-input" /></td>
                              <td><Field name={`materialItems.${index}.unit`} className="form-input" /></td>
                              <td><Field name={`materialItems.${index}.remarks`} className="form-input" /></td>

                              {dynamicColumns.map(col => (
                                <td key={col.key}>
                                  <Field
                                    name={`materialItems.${index}.dynamicFields.${col.key}`}
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

              {/* 4. Delivery Details */}
              <div className="form-section">
                <h3 className="form-section-title">4. Delivery Details</h3>
                <div className="form-fields">
                  {field(values,'expectedDeliveryDate','Expected Delivery Date','date')}
                  {textarea(values,'specialInstructions','Special Instructions')}
                  {textarea(values,'packagingDetails','Packaging Details')}
                  {field(values,'totalPackages','Total Packages')}
                  {field(values,'totalWeight','Total Weight')}
                </div>
              </div>

              {/* 5. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'approvedBy','Approved By')}
                  {field(values,'receivedBy','Received By')}
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
                    Submit Delivery Challan
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

export default FRM00392_DeliveryChallan;
