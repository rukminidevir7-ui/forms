// FRM00457_FleetComplianceRegister.jsx
// FRM-00457 – Fleet Compliance Register – Log / Register Form

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

  registerFrom: Yup.string().required('Required'),
  registerTo: Yup.string().required('Required'),
  departmentLocation: Yup.string().required('Required'),
  maintainedBy: Yup.string().required('Required'),

  complianceEntries: Yup.array().of(
    Yup.object().shape({
      vehicleNumber: Yup.string().required('Required'),
      complianceType: Yup.string().required('Required'),
      dueDate: Yup.string().required('Required'),
      completionDate: Yup.string(),
      status: Yup.string().required('Required'),
      remarks: Yup.string().required('Required')
    })
  ).min(1, 'At least one compliance entry is required'),

  preparedBy: Yup.string().required('Required'),
  reviewedBy: Yup.string().required('Required'),
  approvedBy: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  registerFrom: '',
  registerTo: '',
  departmentLocation: '',
  maintainedBy: '',

  complianceEntries: [
    {
      vehicleNumber: '',
      complianceType: '',
      dueDate: '',
      completionDate: '',
      status: '',
      remarks: ''
    }
  ],

  preparedBy: '',
  reviewedBy: '',
  approvedBy: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00457_FleetComplianceRegister = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type = 'text') => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '_________'}</div>
      ) : (
        <>
          <Field name={name} type={type} className="form-input" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (

    <ModernFormWrapper
      formId="FRM-00457"
      title="Fleet Compliance Register – Log / Register"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Fleet compliance register submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00457"
              title="Fleet Compliance Register"
              department="Fleet & Transport – Compliance & Permits"
            >

              {/* Register Details */}
              <div className="form-section">
                <h3 className="form-section-title">1. Register Details</h3>
                <div className="form-fields">
                  {field(values,'registerFrom','Register Period From','date')}
                  {field(values,'registerTo','Register Period To','date')}
                  {field(values,'departmentLocation','Department / Location')}
                  {field(values,'maintainedBy','Maintained By')}
                </div>
              </div>

              {/* Compliance Entries */}
              <div className="form-section">
                <h3 className="form-section-title">2. Compliance Entries</h3>

                <FieldArray name="complianceEntries">
                  {({ push, remove }) => (
                    <>
                      {values.complianceEntries.map((entry, index) => (
                        <div key={index} className="form-subsection">

                          <div className="form-fields">
                            {field(values,`complianceEntries.${index}.vehicleNumber`,'Vehicle No')}
                            {field(values,`complianceEntries.${index}.complianceType`,'Compliance Type')}
                            {field(values,`complianceEntries.${index}.dueDate`,'Due Date','date')}
                            {field(values,`complianceEntries.${index}.completionDate`,'Completion Date','date')}
                            {field(values,`complianceEntries.${index}.status`,'Status')}
                            {field(values,`complianceEntries.${index}.remarks`,'Remarks')}
                          </div>

                          {!isPrintMode && (
                            <div style={{ marginBottom: '15px' }}>
                              <button
                                type="button"
                                className="btn-remove"
                                onClick={() => remove(index)}
                              >
                                Remove Entry
                              </button>
                            </div>
                          )}

                        </div>
                      ))}

                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-add"
                          onClick={() => push({
                            vehicleNumber: '',
                            complianceType: '',
                            dueDate: '',
                            completionDate: '',
                            status: '',
                            remarks: ''
                          })}
                        >
                          Add Compliance Entry
                        </button>
                      )}

                    </>
                  )}
                </FieldArray>

              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">3. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'reviewedBy','Reviewed By')}
                  {field(values,'approvedBy','Approved By')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Register
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

export default FRM00457_FleetComplianceRegister;
