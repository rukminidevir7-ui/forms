// ContractLabourAttendanceRegisterLogRegister.jsx
// FRM-01132 – Contract Labour Attendance Register

import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormAttachments from '../components/FormAttachments';
import FormCustomFields from '../components/FormCustomFields';
import FormSignatures from '../components/FormSignatures';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({

  projectName: Yup.string().required('Required'),
  projectLocation: Yup.string().required('Required'),
  contractorName: Yup.string().required('Required'),
  period: Yup.string().required('Required'),

  attendanceRecords: Yup.array().of(
    Yup.object({
      id: Yup.string(),
      date: Yup.string().required('Required'),
      workerName: Yup.string().required('Required'),
      workerId: Yup.string().required('Required'),
      skillCategory: Yup.string().required('Required'),
      inTime: Yup.string().required('Required'),
      outTime: Yup.string().required('Required'),
      present: Yup.string().required('Required'),
      remarks: Yup.string()
    })
  ),

  maintainedBy: Yup.string().required('Required'),
  maintainerDesignation: Yup.string().required('Required'),
  maintainedDate: Yup.string().required('Required'),

  verifiedBy: Yup.string().required('Required'),
  verifierDesignation: Yup.string().required('Required'),
  verifiedDate: Yup.string().required('Required'),

  attachments: Yup.array(),
  customFields: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {
  projectName: '',
  projectLocation: '',
  contractorName: '',
  period: '',

  attendanceRecords: [],

  maintainedBy: '',
  maintainerDesignation: '',
  maintainedDate: '',

  verifiedBy: '',
  verifierDesignation: '',
  verifiedDate: '',

  attachments: [],
  customFields: [],
  signatures: []
};

const ContractLabourAttendanceRegisterLogRegister = () => {

  const { isPrintMode } = usePrintMode();

  return (

    <ModernFormWrapper
      formId="FRM-01132"
      title="Contract Labour Attendance Register"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Attendance Register Saved');
        }}
      >

        {({ values }) => (

          <Form>

            <ModernA4Template
              formId="FRM-01132"
              title="Contract Labour Attendance Register"
              department="Subcontractor & Contracting"
            >

              {/* Project Info */}
              <div className="form-section">
                <div className="form-fields">
                  <Field name="projectName" placeholder="Project Name" className="form-input" />
                  <Field name="projectLocation" placeholder="Project Location" className="form-input" />
                  <Field name="contractorName" placeholder="Contractor Name" className="form-input" />
                  <Field name="period" placeholder="Month / Period" className="form-input" />
                </div>
              </div>

              {/* Attendance Table */}
              <div className="form-section">
                <h3 className="form-section-title">Attendance Register</h3>

                {!isPrintMode && (
                  <FieldArray name="attendanceRecords">
                    {(helpers) => (
                      <div>

                        {values.attendanceRecords.map((rec, i) => (
                          <div key={rec.id || i} className="attendance-row">

                            <Field type="date" name={`attendanceRecords.${i}.date`} className="form-input" />
                            <Field name={`attendanceRecords.${i}.workerName`} placeholder="Worker Name" className="form-input" />
                            <Field name={`attendanceRecords.${i}.workerId`} placeholder="ID / Code" className="form-input" />
                            <Field name={`attendanceRecords.${i}.skillCategory`} placeholder="Skill Category" className="form-input" />
                            <Field type="time" name={`attendanceRecords.${i}.inTime`} className="form-input" />
                            <Field type="time" name={`attendanceRecords.${i}.outTime`} className="form-input" />

                            <Field as="select" name={`attendanceRecords.${i}.present`} className="form-input">
                              <option value="">Y/N</option>
                              <option value="Y">Y</option>
                              <option value="N">N</option>
                            </Field>

                            <Field name={`attendanceRecords.${i}.remarks`} placeholder="Remarks" className="form-input" />

                            <button type="button" className="btn-remove" onClick={() => helpers.remove(i)}>
                              Remove
                            </button>

                          </div>
                        ))}

                        <button
                          type="button"
                          className="btn-add-field"
                          onClick={() =>
                            helpers.push({
                              id: uuidv4(),
                              date: '',
                              workerName: '',
                              workerId: '',
                              skillCategory: '',
                              inTime: '',
                              outTime: '',
                              present: '',
                              remarks: ''
                            })
                          }
                        >
                          Add Attendance Entry
                        </button>

                      </div>
                    )}
                  </FieldArray>
                )}

                {isPrintMode && values.attendanceRecords.length > 0 && (
                  <table className="print-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Skill</th>
                        <th>In</th>
                        <th>Out</th>
                        <th>Present</th>
                        <th>Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {values.attendanceRecords.map((rec, i) => (
                        <tr key={i}>
                          <td>{rec.date}</td>
                          <td>{rec.workerName}</td>
                          <td>{rec.workerId}</td>
                          <td>{rec.skillCategory}</td>
                          <td>{rec.inTime}</td>
                          <td>{rec.outTime}</td>
                          <td>{rec.present}</td>
                          <td>{rec.remarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

              </div>

              {/* Maintained & Verified */}
              <div className="form-section">
                <h3 className="form-section-title">Verification</h3>
                <div className="form-fields">
                  <Field name="maintainedBy" placeholder="Maintained By" className="form-input" />
                  <Field name="maintainerDesignation" placeholder="Designation" className="form-input" />
                  <Field type="date" name="maintainedDate" className="form-input" />

                  <Field name="verifiedBy" placeholder="Verified By" className="form-input" />
                  <Field name="verifierDesignation" placeholder="Designation" className="form-input" />
                  <Field type="date" name="verifiedDate" className="form-input" />
                </div>
              </div>

              {/* Universal Components */}
              <FormAttachments values={values} />
              <FormCustomFields values={values} />
              <FormSignatures values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Save Attendance Register
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

export default ContractLabourAttendanceRegisterLogRegister;
