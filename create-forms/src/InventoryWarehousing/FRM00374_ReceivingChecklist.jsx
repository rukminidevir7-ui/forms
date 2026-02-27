// FRM00374_ReceivingChecklist.jsx
// FRM-00374 – Receiving Checklist – Checklist Form

import React from 'react';
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
  checkedBy: Yup.string().required('Required'),
  supplierName: Yup.string().required('Required'),
  deliveryReference: Yup.string().required('Required'),

  checklistItems: Yup.array().of(
    Yup.object().shape({
      item: Yup.string().required('Required'),
      response: Yup.string().required('Required'),
      remarks: Yup.string()
    })
  ).min(1, 'At least one checklist item required'),

  exceptions: Yup.string(),
  immediateAction: Yup.string(),

  supervisorApproval: Yup.string().required('Required'),
  authorizationComments: Yup.string(),

  supportingDocuments: Yup.string(),
  additionalNotes: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const defaultChecklistItems = [
  { item: 'Delivery documents verified', response: '', remarks: '' },
  { item: 'Items match purchase order', response: '', remarks: '' },
  { item: 'Quantity verified', response: '', remarks: '' },
  { item: 'No visible damage', response: '', remarks: '' },
  { item: 'Packaging intact', response: '', remarks: '' },
  { item: 'Labels and batch details correct', response: '', remarks: '' },
  { item: 'Expiry dates checked (if applicable)', response: '', remarks: '' },
  { item: 'Transport conditions acceptable', response: '', remarks: '' },
  { item: 'Safety compliance followed', response: '', remarks: '' }
];

const initialValues = {

  checklistDate: '',
  warehouseLocation: '',
  checkedBy: '',
  supplierName: '',
  deliveryReference: '',

  checklistItems: defaultChecklistItems,

  exceptions: '',
  immediateAction: '',

  supervisorApproval: '',
  authorizationComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00374_ReceivingChecklist = () => {

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

  return (
    <ModernFormWrapper
      formId="FRM-00374"
      title="Receiving Checklist – Checklist Form"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Receiving Checklist submitted successfully');
        }}
      >
        {({ values }) => (
          <Form>
            <ModernA4Template
              formId="FRM-00374"
              title="Receiving Checklist"
              department="Inventory & Warehousing – Warehouse Control"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'checklistDate','Checklist Date','date')}
                  {field(values,'warehouseLocation','Warehouse Location')}
                  {field(values,'checkedBy','Checked By')}
                  {field(values,'supplierName','Supplier Name')}
                  {field(values,'deliveryReference','PO / Delivery Ref')}
                </div>
              </div>

              {/* 2. Receiving Checks */}
              <div className="form-section">
                <h3 className="form-section-title">2. Receiving Checks</h3>

                <FieldArray name="checklistItems">
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
                          + Add Checklist Item
                        </button>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Check Item</th>
                            <th>Yes</th>
                            <th>No</th>
                            <th>Remarks</th>
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {values.checklistItems.map((row, index) => (
                            <tr key={index}>
                              <td>
                                <Field
                                  name={`checklistItems.${index}.item`}
                                  className="form-input"
                                />
                              </td>

                              <td>
                                <Field
                                  type="radio"
                                  name={`checklistItems.${index}.response`}
                                  value="Yes"
                                />
                              </td>

                              <td>
                                <Field
                                  type="radio"
                                  name={`checklistItems.${index}.response`}
                                  value="No"
                                />
                              </td>

                              <td>
                                <Field
                                  name={`checklistItems.${index}.remarks`}
                                  className="form-input"
                                />
                              </td>

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

              {/* 3. Exceptions / Issues */}
              <div className="form-section">
                <h3 className="form-section-title">3. Exceptions / Issues</h3>
                <div className="form-fields">
                  {textarea(values,'exceptions','Exceptions / Issues Identified')}
                  {textarea(values,'immediateAction','Immediate Action Taken')}
                </div>
              </div>

              {/* 4. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">4. Authorization</h3>
                <div className="form-fields">
                  {field(values,'checkedBy','Checked By')}
                  {field(values,'supervisorApproval','Stores Supervisor')}
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
                    Submit Checklist
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

export default FRM00374_ReceivingChecklist;
