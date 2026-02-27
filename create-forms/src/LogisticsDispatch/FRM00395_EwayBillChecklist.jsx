// FRM00395_EwayBillChecklist.jsx
// FRM-00395 – E-way Bill Checklist – Checklist Form

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
  dispatchReference: Yup.string().required('Required'),
  invoiceNo: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  transporterName: Yup.string().required('Required'),
  vehicleNo: Yup.string().required('Required'),

  consignorName: Yup.string().required('Required'),
  consigneeName: Yup.string().required('Required'),
  placeOfDispatch: Yup.string().required('Required'),
  placeOfDelivery: Yup.string().required('Required'),
  distanceKm: Yup.string().required('Required'),

  complianceChecks: Yup.array().of(
    Yup.object().shape({
      item: Yup.string().required('Required'),
      status: Yup.string().required('Required'),
      remarks: Yup.string()
    })
  ).min(1, 'At least one compliance check required'),

  issuesIdentified: Yup.string(),
  correctiveActionTaken: Yup.string(),
  exceptionRemarks: Yup.string(),

  verifiedBy: Yup.string().required('Required'),
  authorizationComments: Yup.string(),

  supportingDocuments: Yup.string(),
  additionalNotes: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const defaultChecklistItems = [
  { item: 'Invoice details verified', status: '', remarks: '' },
  { item: 'GSTIN details correct', status: '', remarks: '' },
  { item: 'HSN codes verified', status: '', remarks: '' },
  { item: 'Item description matches invoice', status: '', remarks: '' },
  { item: 'Quantity and value verified', status: '', remarks: '' },
  { item: 'Transporter details verified', status: '', remarks: '' },
  { item: 'Vehicle number updated', status: '', remarks: '' },
  { item: 'Validity period checked', status: '', remarks: '' },
  { item: 'Supporting documents attached', status: '', remarks: '' },
  { item: 'Compliance with regulations confirmed', status: '', remarks: '' }
];

const initialValues = {

  checklistDate: '',
  dispatchReference: '',
  invoiceNo: '',
  preparedBy: '',
  department: '',
  transporterName: '',
  vehicleNo: '',

  consignorName: '',
  consigneeName: '',
  placeOfDispatch: '',
  placeOfDelivery: '',
  distanceKm: '',

  complianceChecks: defaultChecklistItems,

  issuesIdentified: '',
  correctiveActionTaken: '',
  exceptionRemarks: '',

  verifiedBy: '',
  authorizationComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00395_EwayBillChecklist = () => {

  const { isPrintMode } = usePrintMode();

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
      formId="FRM-00395"
      title="E-way Bill Checklist – Checklist"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('E-way Bill Checklist submitted successfully');
        }}
      >
        {({ values }) => (
          <Form>
            <ModernA4Template
              formId="FRM-00395"
              title="E-way Bill Checklist"
              department="Logistics & Dispatch – Transportation & Dispatch"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'checklistDate','Checklist Date','date')}
                  {field(values,'dispatchReference','Dispatch Reference')}
                  {field(values,'invoiceNo','Invoice No.')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'department','Department')}
                  {field(values,'transporterName','Transporter Name')}
                  {field(values,'vehicleNo','Vehicle No.')}
                </div>
              </div>

              {/* 2. Party Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Party Details</h3>
                <div className="form-fields">
                  {field(values,'consignorName','Consignor Name')}
                  {field(values,'consigneeName','Consignee Name')}
                  {field(values,'placeOfDispatch','Place of Dispatch')}
                  {field(values,'placeOfDelivery','Place of Delivery')}
                  {field(values,'distanceKm','Distance (KM)')}
                </div>
              </div>

              {/* 3. Compliance Checks */}
              <div className="form-section">
                <h3 className="form-section-title">3. Compliance Checks</h3>

                <FieldArray name="complianceChecks">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <div style={{ marginBottom: '10px' }}>
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={() =>
                              push({ item: '', status: '', remarks: '' })
                            }
                          >
                            + Add Checklist Item
                          </button>
                        </div>
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
                                <Field
                                  name={`complianceChecks.${index}.item`}
                                  className="form-input"
                                />
                              </td>

                              <td>
                                <Field
                                  type="radio"
                                  name={`complianceChecks.${index}.status`}
                                  value="Yes"
                                />
                              </td>

                              <td>
                                <Field
                                  type="radio"
                                  name={`complianceChecks.${index}.status`}
                                  value="No"
                                />
                              </td>

                              <td>
                                <Field
                                  name={`complianceChecks.${index}.remarks`}
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

              {/* 4. Exceptions */}
              <div className="form-section">
                <h3 className="form-section-title">4. Exceptions</h3>
                <div className="form-fields">
                  {textarea(values,'issuesIdentified','Issues Identified')}
                  {textarea(values,'correctiveActionTaken','Corrective Action Taken')}
                  {textarea(values,'exceptionRemarks','Remarks')}
                </div>
              </div>

              {/* 5. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'verifiedBy','Verified By')}
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

export default FRM00395_EwayBillChecklist;
