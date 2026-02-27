// FRM00387_DispatchRequest.jsx
// FRM-00387 – Dispatch Request – Request / Initiation Form

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

  requestDate: Yup.string().required('Required'),
  requestedBy: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  priority: Yup.string().required('Required'),
  requiredDispatchDate: Yup.string().required('Required'),
  requiredDeliveryDate: Yup.string().required('Required'),

  consigneeName: Yup.string().required('Required'),
  deliveryAddress: Yup.string().required('Required'),
  cityState: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  consigneeContactNumber: Yup.string().required('Required'),

  shipmentItems: Yup.array().of(
    Yup.object().shape({
      itemDescription: Yup.string().required('Required'),
      itemCode: Yup.string().required('Required'),
      quantity: Yup.number().required('Required'),
      weight: Yup.string().required('Required'),
      dimensions: Yup.string().required('Required'),
      specialHandling: Yup.string(),
      dynamicFields: Yup.object()
    })
  ).min(1, 'At least one shipment item required'),

  modeOfTransport: Yup.string().required('Required'),
  vehicleType: Yup.string().required('Required'),
  preferredCarrier: Yup.string().required('Required'),
  insuranceRequired: Yup.string().required('Required'),
  transportRemarks: Yup.string(),

  approvedBy: Yup.string().required('Required'),
  authorizationComments: Yup.string(),

  supportingDocuments: Yup.string(),
  additionalNotes: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  requestDate: '',
  requestedBy: '',
  department: '',
  contactNumber: '',
  priority: '',
  requiredDispatchDate: '',
  requiredDeliveryDate: '',

  consigneeName: '',
  deliveryAddress: '',
  cityState: '',
  contactPerson: '',
  consigneeContactNumber: '',

  shipmentItems: [
    {
      itemDescription: '',
      itemCode: '',
      quantity: '',
      weight: '',
      dimensions: '',
      specialHandling: '',
      dynamicFields: {}
    }
  ],

  modeOfTransport: '',
  vehicleType: '',
  preferredCarrier: '',
  insuranceRequired: '',
  transportRemarks: '',

  approvedBy: '',
  authorizationComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00387_DispatchRequest = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const columnName = prompt('Enter New Shipment Field');
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
      formId="FRM-00387"
      title="Dispatch Request – Request / Initiation Form"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Dispatch Request submitted successfully');
        }}
      >
        {({ values }) => (
          <Form>
            <ModernA4Template
              formId="FRM-00387"
              title="Dispatch Request"
              department="Logistics & Dispatch – Transportation & Dispatch"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'requestedBy','Requested By')}
                  {field(values,'department','Department')}
                  {field(values,'contactNumber','Contact Number')}
                  {field(values,'priority','Priority')}
                  {field(values,'requiredDispatchDate','Required Dispatch Date','date')}
                  {field(values,'requiredDeliveryDate','Required Delivery Date','date')}
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
                  {field(values,'consigneeContactNumber','Contact Number')}
                </div>
              </div>

              {/* 3. Shipment Details */}
              <div className="form-section">
  <h3 className="form-section-title">3. Shipment Details</h3>

  {!isPrintMode && (
    <div style={{ marginBottom: '15px' }}>
      <button
        type="button"
        className="btn-submit"
        onClick={addColumn}
      >
        + Add Shipment Field
      </button>
    </div>
  )}

  <FieldArray name="shipmentItems">
    {({ push, remove }) => (
      <>
        {!isPrintMode && (
          <div style={{ marginBottom: '15px' }}>
            <button
              type="button"
              className="btn-submit"
              onClick={() =>
                push({
                  itemDescription: '',
                  itemCode: '',
                  quantity: '',
                  weight: '',
                  dimensions: '',
                  specialHandling: '',
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
              <th>Quantity</th>
              <th>Weight</th>
              <th>Dimensions</th>
              <th>Special Handling</th>

              {dynamicColumns.map(col => (
                <th key={col.key}>
                  {col.label}
                  {!isPrintMode && (
                    <button
                      type="button"
                      onClick={() => removeColumn(col.key)}
                    >
                      {' '}x{' '}
                    </button>
                  )}
                </th>
              ))}

              {!isPrintMode && <th>Action</th>}
            </tr>
          </thead>

          <tbody>
            {values.shipmentItems.map((row, index) => (
              <tr key={index}>
                <td>
                  <Field
                    name={`shipmentItems.${index}.itemDescription`}
                    className="form-input"
                  />
                </td>
                <td>
                  <Field
                    name={`shipmentItems.${index}.itemCode`}
                    className="form-input"
                  />
                </td>
                <td>
                  <Field
                    name={`shipmentItems.${index}.quantity`}
                    type="number"
                    className="form-input"
                  />
                </td>
                <td>
                  <Field
                    name={`shipmentItems.${index}.weight`}
                    className="form-input"
                  />
                </td>
                <td>
                  <Field
                    name={`shipmentItems.${index}.dimensions`}
                    className="form-input"
                  />
                </td>
                <td>
                  <Field
                    name={`shipmentItems.${index}.specialHandling`}
                    className="form-input"
                  />
                </td>

                {dynamicColumns.map(col => (
                  <td key={col.key}>
                    <Field
                      name={`shipmentItems.${index}.dynamicFields.${col.key}`}
                      className="form-input"
                    />
                  </td>
                ))}

                {!isPrintMode && (
                  <td>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                    >
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


              {/* 4. Transport Details */}
              <div className="form-section">
                <h3 className="form-section-title">4. Transport Details</h3>
                <div className="form-fields">
                  {field(values,'modeOfTransport','Mode of Transport')}
                  {field(values,'vehicleType','Vehicle Type')}
                  {field(values,'preferredCarrier','Preferred Carrier')}
                  {field(values,'insuranceRequired','Insurance Required')}
                  {textarea(values,'transportRemarks','Remarks')}
                </div>
              </div>

              {/* 5. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'requestedBy','Requested By')}
                  {field(values,'approvedBy','Approved By')}
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
                    Submit Dispatch Request
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

export default FRM00387_DispatchRequest;
