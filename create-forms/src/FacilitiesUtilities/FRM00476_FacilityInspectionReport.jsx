// FRM00476_FacilityInspectionReport.jsx
// FRM-00476 – Facility Inspection Report – Checklist Form

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

  facilityName: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  inspectionDate: Yup.string().required('Required'),
  inspectorName: Yup.string().required('Required'),
  department: Yup.string().required('Required'),

  inspectionItems: Yup.array().of(
    Yup.object().shape({
      item: Yup.string().required('Required'),
      status: Yup.string().required('Required'),
      remarks: Yup.string()
    })
  ).min(1, 'At least one inspection item required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const defaultInspectionItems = Array.from({ length: 10 }, (_, index) => ({
  item: '',
  status: '',
  remarks: ''
}));

const initialValues = {

  facilityName: '',
  location: '',
  inspectionDate: '',
  inspectorName: '',
  department: '',

  inspectionItems: defaultInspectionItems,

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00476_FacilityInspectionReport = () => {

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

  return (

    <ModernFormWrapper
      formId="FRM-00476"
      title="Facility Inspection Report – Checklist"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Facility Inspection Report submitted successfully');
        }}
      >

        {({ values }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00476"
              title="Facility Inspection Checklist"
              department="Facilities & Utilities – Facilities Management"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'facilityName','Facility Name')}
                  {field(values,'location','Location')}
                  {field(values,'inspectionDate','Inspection Date','date')}
                  {field(values,'inspectorName','Inspector Name')}
                  {field(values,'department','Department')}
                </div>
              </div>

              {/* 2. Inspection Checklist Table */}
              <div className="form-section">
                <h3 className="form-section-title">2. Inspection Checklist</h3>

                <FieldArray name="inspectionItems">
                  {({ push, remove }) => (
                    <>

                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          style={{ marginBottom: "15px" }}
                          onClick={() => push({ item: '', status: '', remarks: '' })}
                        >
                          + Add Inspection Item
                        </button>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th style={{ width: "5%" }}>No.</th>
                            <th style={{ width: "30%" }}>Inspection Item</th>
                            <th style={{ width: "15%" }}>OK</th>
                            <th style={{ width: "15%" }}>Issue</th>
                            <th style={{ width: "35%" }}>Remarks</th>
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {values.inspectionItems.map((row, index) => (
                            <tr key={index}>
                              <td style={{ textAlign: "center" }}>
                                {index + 1}
                              </td>

                              <td>
                                <Field
                                  name={`inspectionItems.${index}.item`}
                                  className="form-input"
                                />
                              </td>

                              <td style={{ textAlign: "center" }}>
                                <Field
                                  type="radio"
                                  name={`inspectionItems.${index}.status`}
                                  value="OK"
                                />
                              </td>

                              <td style={{ textAlign: "center" }}>
                                <Field
                                  type="radio"
                                  name={`inspectionItems.${index}.status`}
                                  value="Issue"
                                />
                              </td>

                              <td>
                                <Field
                                  as="textarea"
                                  name={`inspectionItems.${index}.remarks`}
                                  className="form-textarea"
                                  rows="3"
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

              {/* Signatures */}
              <FormSignatures values={values} />

              <FormCustomFields values={values} />
              <FormAttachments values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Report
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

export default FRM00476_FacilityInspectionReport;
