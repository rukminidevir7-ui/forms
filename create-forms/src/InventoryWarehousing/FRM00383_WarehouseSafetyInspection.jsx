// FRM00383_WarehouseSafetyInspection.jsx
// FRM-00383 – Warehouse Safety Inspection – Checklist Form

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

  inspectionDate: Yup.string().required('Required'),
  warehouseLocation: Yup.string().required('Required'),
  areaZone: Yup.string().required('Required'),
  inspectedBy: Yup.string().required('Required'),
  shiftTime: Yup.string().required('Required'),

  inspectionChecks: Yup.array().of(
    Yup.object().shape({
      item: Yup.string().required('Required'),
      status: Yup.string().required('Required'),
      remarks: Yup.string()
    })
  ).min(1, 'At least one inspection item required'),

  observations: Yup.string(),
  risksIdentified: Yup.string(),
  correctiveActions: Yup.string(),

  supervisorReview: Yup.string().required('Required'),
  authorizationComments: Yup.string(),

  supportingDocuments: Yup.string(),
  additionalNotes: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const defaultInspectionChecks = [
  { item: 'Emergency exits accessible and marked', status: '', remarks: '' },
  { item: 'Fire extinguishers available and inspected', status: '', remarks: '' },
  { item: 'Aisles clear and unobstructed', status: '', remarks: '' },
  { item: 'Proper lighting available', status: '', remarks: '' },
  { item: 'Pallet stacking within safe limits', status: '', remarks: '' },
  { item: 'Spill kits available', status: '', remarks: '' },
  { item: 'PPE usage followed', status: '', remarks: '' },
  { item: 'Electrical panels accessible', status: '', remarks: '' },
  { item: 'Material handling equipment safe', status: '', remarks: '' },
  { item: 'Hazard signage displayed', status: '', remarks: '' },
  { item: 'First aid kit available', status: '', remarks: '' },
  { item: 'No damaged racks or pallets', status: '', remarks: '' },
  { item: 'Housekeeping maintained', status: '', remarks: '' },
  { item: 'Safety training records up to date', status: '', remarks: '' }
];

const initialValues = {

  inspectionDate: '',
  warehouseLocation: '',
  areaZone: '',
  inspectedBy: '',
  shiftTime: '',

  inspectionChecks: defaultInspectionChecks,

  observations: '',
  risksIdentified: '',
  correctiveActions: '',

  supervisorReview: '',
  authorizationComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00383_WarehouseSafetyInspection = () => {

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
      formId="FRM-00383"
      title="Warehouse Safety Inspection – Checklist"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Warehouse Safety Inspection submitted successfully');
        }}
      >
        {({ values }) => (
          <Form>
            <ModernA4Template
              formId="FRM-00383"
              title="Warehouse Safety Inspection"
              department="Inventory & Warehousing – Warehouse Control"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'inspectionDate','Inspection Date','date')}
                  {field(values,'warehouseLocation','Warehouse Location')}
                  {field(values,'areaZone','Area / Zone')}
                  {field(values,'inspectedBy','Inspected By')}
                  {field(values,'shiftTime','Shift / Time')}
                </div>
              </div>

              {/* 2. Safety Inspection Checks */}
              <div className="form-section">
                <h3 className="form-section-title">2. Safety Inspection Checks</h3>

                <FieldArray name="inspectionChecks">
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
                          + Add Inspection Item
                        </button>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Inspection Item</th>
                            <th>Compliant</th>
                            <th>Non-Compliant</th>
                            <th>Remarks</th>
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {values.inspectionChecks.map((row, index) => (
                            <tr key={index}>
                              <td>
                                <Field name={`inspectionChecks.${index}.item`} className="form-input" />
                              </td>

                              <td>
                                <Field
                                  type="radio"
                                  name={`inspectionChecks.${index}.status`}
                                  value="Compliant"
                                />
                              </td>

                              <td>
                                <Field
                                  type="radio"
                                  name={`inspectionChecks.${index}.status`}
                                  value="Non-Compliant"
                                />
                              </td>

                              <td>
                                <Field
                                  name={`inspectionChecks.${index}.remarks`}
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

              {/* 3. Observations */}
              <div className="form-section">
                <h3 className="form-section-title">3. Observations</h3>
                <div className="form-fields">
                  {textarea(values,'observations','Observations')}
                  {textarea(values,'risksIdentified','Risks Identified')}
                  {textarea(values,'correctiveActions','Corrective Actions Required')}
                </div>
              </div>

              {/* 4. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">4. Authorization</h3>
                <div className="form-fields">
                  {field(values,'inspectedBy','Inspected By')}
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
                    Submit Safety Inspection
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

export default FRM00383_WarehouseSafetyInspection;
