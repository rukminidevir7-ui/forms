// FRM00386_WarehouseAudit.jsx
// FRM-00386 – Warehouse Audit – Checklist Form

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

  auditDate: Yup.string().required('Required'),
  warehouseLocation: Yup.string().required('Required'),
  areaZone: Yup.string().required('Required'),
  auditorName: Yup.string().required('Required'),
  auditType: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  shiftTime: Yup.string().required('Required'),

  auditChecks: Yup.array().of(
    Yup.object().shape({
      item: Yup.string().required('Required'),
      status: Yup.string().required('Required'),
      remarks: Yup.string()
    })
  ).min(1, 'At least one audit item required'),

  keyFindings: Yup.string(),
  risksIdentified: Yup.string(),
  correctiveActions: Yup.string(),
  targetCompletionDate: Yup.string(),

  supervisorReview: Yup.string().required('Required'),
  authorizationComments: Yup.string(),

  supportingDocuments: Yup.string(),
  additionalNotes: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const defaultAuditChecks = [
  { item: 'Inventory accuracy maintained', status: '', remarks: '' },
  { item: 'Storage conditions appropriate', status: '', remarks: '' },
  { item: 'FIFO / FEFO followed', status: '', remarks: '' },
  { item: 'Documentation complete', status: '', remarks: '' },
  { item: 'Material identification clear', status: '', remarks: '' },
  { item: 'Safety procedures followed', status: '', remarks: '' },
  { item: 'Equipment maintained', status: '', remarks: '' },
  { item: 'Housekeeping standards met', status: '', remarks: '' },
  { item: 'Access control enforced', status: '', remarks: '' },
  { item: 'Temperature / humidity monitored', status: '', remarks: '' },
  { item: 'Pest control measures in place', status: '', remarks: '' },
  { item: 'Training records available', status: '', remarks: '' },
  { item: 'Incident logs maintained', status: '', remarks: '' },
  { item: 'Corrective actions tracked', status: '', remarks: '' }
];

const initialValues = {

  auditDate: '',
  warehouseLocation: '',
  areaZone: '',
  auditorName: '',
  auditType: '',
  department: '',
  shiftTime: '',

  auditChecks: defaultAuditChecks,

  keyFindings: '',
  risksIdentified: '',
  correctiveActions: '',
  targetCompletionDate: '',

  supervisorReview: '',
  authorizationComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00386_WarehouseAudit = () => {

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
      formId="FRM-00386"
      title="Warehouse Audit – Checklist"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Warehouse Audit submitted successfully');
        }}
      >
        {({ values }) => (
          <Form>
            <ModernA4Template
              formId="FRM-00386"
              title="Warehouse Audit"
              department="Inventory & Warehousing – Warehouse Control"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'auditDate','Audit Date','date')}
                  {field(values,'warehouseLocation','Warehouse Location')}
                  {field(values,'areaZone','Area / Zone')}
                  {field(values,'auditorName','Auditor Name')}
                  {field(values,'auditType','Audit Type')}
                  {field(values,'department','Department')}
                  {field(values,'shiftTime','Shift / Time')}
                </div>
              </div>

              {/* 2. Audit Checks */}
              <div className="form-section">
                <h3 className="form-section-title">2. Audit Checks</h3>

                <FieldArray name="auditChecks">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={() =>
                            push({ item: '', status: '', remarks: '' })
                          }
                        >
                          + Add Audit Item
                        </button>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Audit Item</th>
                            <th>Compliant</th>
                            <th>Non-Compliant</th>
                            <th>Remarks</th>
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {values.auditChecks.map((row, index) => (
                            <tr key={index}>
                              <td>
                                <Field name={`auditChecks.${index}.item`} className="form-input" />
                              </td>
                              <td>
                                <Field
                                  type="radio"
                                  name={`auditChecks.${index}.status`}
                                  value="Compliant"
                                />
                              </td>
                              <td>
                                <Field
                                  type="radio"
                                  name={`auditChecks.${index}.status`}
                                  value="Non-Compliant"
                                />
                              </td>
                              <td>
                                <Field
                                  name={`auditChecks.${index}.remarks`}
                                  className="form-input"
                                />
                              </td>
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

              {/* 3. Findings and Actions */}
              <div className="form-section">
                <h3 className="form-section-title">3. Findings and Actions</h3>
                <div className="form-fields">
                  {textarea(values,'keyFindings','Key Findings')}
                  {textarea(values,'risksIdentified','Risks Identified')}
                  {textarea(values,'correctiveActions','Corrective Actions Required')}
                  {field(values,'targetCompletionDate','Target Completion Date','date')}
                </div>
              </div>

              {/* 4. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">4. Authorization</h3>
                <div className="form-fields">
                  {field(values,'auditorName','Auditor')}
                  {field(values,'supervisorReview','Supervisor Review')}
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
                    Submit Warehouse Audit
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

export default FRM00386_WarehouseAudit;
