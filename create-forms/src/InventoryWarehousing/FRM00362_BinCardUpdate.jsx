// FRM00362_BinCardUpdate.jsx
// FRM-00362 – Bin Card Update – Request / Initiation Form

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
  updateDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  updatedBy: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  warehouseLocation: Yup.string().required('Required'),
  binLocation: Yup.string().required('Required'),
  itemCode: Yup.string().required('Required'),

  // 2. Item Details
  itemDescription: Yup.string().required('Required'),
  uom: Yup.string().required('Required'),
  currentBalanceQty: Yup.number().required('Required'),

  // 3. Transaction Details
  transactionType: Yup.string().required('Required'),
  transactionDate: Yup.string().required('Required'),
  quantityIn: Yup.number(),
  quantityOut: Yup.number(),
  balanceAfterUpdate: Yup.number().required('Required'),
  referenceDocNo: Yup.string().required('Required'),
  transactionRemarks: Yup.string(),

  // 4. Verification
  verifiedBy: Yup.string().required('Required'),
  verificationDate: Yup.string().required('Required'),
  verificationComments: Yup.string(),

  // 5. Authorization
  storesSupervisorApproval: Yup.string().required('Required'),
  inventoryControllerApproval: Yup.string().required('Required'),
  managementApproval: Yup.string().required('Required'),

  // 6. Supporting Information
  supportingDocuments: Yup.string(),
  additionalNotes: Yup.string(),

  // Keep structure consistent
  items: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  updateDate: '',
  department: '',
  updatedBy: '',
  referenceNumber: '',
  warehouseLocation: '',
  binLocation: '',
  itemCode: '',

  itemDescription: '',
  uom: '',
  currentBalanceQty: '',

  transactionType: '',
  transactionDate: '',
  quantityIn: '',
  quantityOut: '',
  balanceAfterUpdate: '',
  referenceDocNo: '',
  transactionRemarks: '',

  verifiedBy: '',
  verificationDate: '',
  verificationComments: '',

  storesSupervisorApproval: '',
  inventoryControllerApproval: '',
  managementApproval: '',

  supportingDocuments: '',
  additionalNotes: '',

  items: [],   // kept for structural consistency
  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00362_BinCardUpdate = () => {

  const { isPrintMode } = usePrintMode();

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
      formId="FRM-00362"
      title="Bin Card Update – Request / Initiation Form"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Bin Card Update submitted successfully');
        }}
      >
        {({ values }) => (
          <Form>
            <ModernA4Template
              formId="FRM-00362"
              title="Bin Card Update"
              department="Inventory & Warehousing – Stores Operations"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'updateDate','Update Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'updatedBy','Updated By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {field(values,'warehouseLocation','Warehouse Location')}
                  {field(values,'binLocation','Bin / Rack / Shelf')}
                  {field(values,'itemCode','Item Code')}
                </div>
              </div>

              {/* 2. Item Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Item Details</h3>
                <div className="form-fields">
                  {field(values,'itemDescription','Item Description')}
                  {field(values,'uom','UOM')}
                  {field(values,'currentBalanceQty','Current Balance Qty','number')}
                </div>
              </div>

              {/* 3. Transaction Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Transaction Details</h3>
                <div className="form-fields">
                  {select(values,'transactionType','Transaction Type',['Receipt','Issue','Transfer','Adjustment'])}
                  {field(values,'transactionDate','Transaction Date','date')}
                  {field(values,'quantityIn','Quantity In','number')}
                  {field(values,'quantityOut','Quantity Out','number')}
                  {field(values,'balanceAfterUpdate','Balance After Update','number')}
                  {field(values,'referenceDocNo','Reference Doc No')}
                  {textarea(values,'transactionRemarks','Remarks')}
                </div>
              </div>

              {/* 4. Verification */}
              <div className="form-section">
                <h3 className="form-section-title">4. Verification</h3>
                <div className="form-fields">
                  {field(values,'verifiedBy','Verified By')}
                  {field(values,'verificationDate','Verification Date','date')}
                  {textarea(values,'verificationComments','Comments')}
                </div>
              </div>

              {/* 5. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'storesSupervisorApproval','Stores Supervisor Approval')}
                  {field(values,'inventoryControllerApproval','Inventory Controller Approval')}
                  {field(values,'managementApproval','Management Approval')}
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
                    Submit Bin Card Update
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

export default FRM00362_BinCardUpdate;
