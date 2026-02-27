// FRM00341_GoodsReceiptGRN.jsx
// FRM-00341 – Goods Receipt (GRN) – Request / Initiation Form

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
  grnDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  receivedBy: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  warehouseLocation: Yup.string().required('Required'),
  supplierName: Yup.string().required('Required'),
  poNumber: Yup.string().required('Required'),

  // 2. Shipment Details
  deliveryChallanNumber: Yup.string().required('Required'),
  deliveryDate: Yup.string().required('Required'),
  transporterName: Yup.string().required('Required'),
  vehicleNumber: Yup.string().required('Required'),
  numberOfPackages: Yup.number().required('Required'),
  receiptCondition: Yup.string().required('Required'),

  // 3. Item Details
  items: Yup.array().of(
    Yup.object().shape({
      itemCode: Yup.string().required('Required'),
      itemDescription: Yup.string().required('Required'),
      uom: Yup.string().required('Required'),
      orderedQty: Yup.number().required('Required'),
      receivedQty: Yup.number().required('Required'),
      acceptedQty: Yup.number().required('Required'),
      rejectedQty: Yup.number().required('Required'),
      remarks: Yup.string(),
      dynamicFields: Yup.object()
    })
  ).min(1, 'At least one item required'),

  // 4. Quality Check
  inspectionRequired: Yup.string().required('Required'),
  inspectionResult: Yup.string().required('Required'),
  nonConformanceDetails: Yup.string(),

  // 5. Authorization
  storesVerifiedBy: Yup.string().required('Required'),
  qualityApprovedBy: Yup.string().required('Required'),
  procurementConfirmedBy: Yup.string().required('Required'),
  authorizationComments: Yup.string(),

  // 6. Supporting Information
  supportingDocuments: Yup.string(),
  additionalNotes: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  grnDate: '',
  department: '',
  receivedBy: '',
  referenceNumber: '',
  warehouseLocation: '',
  supplierName: '',
  poNumber: '',

  deliveryChallanNumber: '',
  deliveryDate: '',
  transporterName: '',
  vehicleNumber: '',
  numberOfPackages: '',
  receiptCondition: '',

  items: [
    {
      itemCode: '',
      itemDescription: '',
      uom: '',
      orderedQty: '',
      receivedQty: '',
      acceptedQty: '',
      rejectedQty: '',
      remarks: '',
      dynamicFields: {}
    }
  ],

  inspectionRequired: '',
  inspectionResult: '',
  nonConformanceDetails: '',

  storesVerifiedBy: '',
  qualityApprovedBy: '',
  procurementConfirmedBy: '',
  authorizationComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00341_GoodsReceiptGRN = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  // ✅ Add Column
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

  // ✅ Remove Column
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
      formId="FRM-00341"
      title="Goods Receipt (GRN) – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('GRN submitted successfully');
        }}
      >

        {({ values }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00341"
              title="Goods Receipt (GRN)"
              department="Inventory & Warehousing – Stores Operations"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'grnDate','GRN Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'receivedBy','Received By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {field(values,'warehouseLocation','Warehouse Location')}
                  {field(values,'supplierName','Supplier Name')}
                  {field(values,'poNumber','PO Number')}
                </div>
              </div>

              {/* 2. Shipment Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Shipment Details</h3>
                <div className="form-fields">
                  {field(values,'deliveryChallanNumber','Delivery Note / Challan No')}
                  {field(values,'deliveryDate','Delivery Date','date')}
                  {field(values,'transporterName','Transporter')}
                  {field(values,'vehicleNumber','Vehicle No')}
                  {field(values,'numberOfPackages','Number of Packages','number')}
                  {field(values,'receiptCondition','Condition on Receipt')}
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
                            <th>UOM</th>
                            <th>Ordered Qty</th>
                            <th>Received Qty</th>
                            <th>Accepted Qty</th>
                            <th>Rejected Qty</th>
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
                              <td><Field name={`items.${index}.orderedQty`} type="number" className="form-input" /></td>
                              <td><Field name={`items.${index}.receivedQty`} type="number" className="form-input" /></td>
                              <td><Field name={`items.${index}.acceptedQty`} type="number" className="form-input" /></td>
                              <td><Field name={`items.${index}.rejectedQty`} type="number" className="form-input" /></td>
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
                                  <button type="button" onClick={() => remove(index)}>
                                    Remove
                                  </button>
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
                            orderedQty: '',
                            receivedQty: '',
                            acceptedQty: '',
                            rejectedQty: '',
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

              {/* 4. Quality Check */}
              <div className="form-section">
                <h3 className="form-section-title">4. Quality Check</h3>
                <div className="form-fields">
                  {select(values,'inspectionRequired','Inspection Required',['Yes','No'])}
                  {select(values,'inspectionResult','Inspection Result',['Accepted','Accepted with Remarks','Rejected'])}
                  {textarea(values,'nonConformanceDetails','Non-Conformance Details')}
                </div>
              </div>

              {/* 5. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'storesVerifiedBy','Stores Verification')}
                  {field(values,'qualityApprovedBy','Quality Approval')}
                  {field(values,'procurementConfirmedBy','Procurement Confirmation')}
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
                    Submit GRN
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

export default FRM00341_GoodsReceiptGRN;
