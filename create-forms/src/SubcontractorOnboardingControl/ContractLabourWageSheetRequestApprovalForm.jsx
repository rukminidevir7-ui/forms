// ContractLabourWageSheetRequestApprovalForm.jsx
// FRM-01133 / FRM-01134 – Contract Labour Wage Sheet

import React, { useEffect } from 'react';
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
  wagePeriod: Yup.string().required('Required'),

  wageRecords: Yup.array().of(
    Yup.object({
      id: Yup.string(),
      workerName: Yup.string().required('Required'),
      workerId: Yup.string().required('Required'),
      skillCategory: Yup.string().required('Required'),
      daysWorked: Yup.number().required('Required'),
      ratePerDay: Yup.number().required('Required'),
      grossWages: Yup.number(),
      deductions: Yup.number().required('Required'),
      netPay: Yup.number()
    })
  ),

  preparedBy: Yup.string().required('Required'),
  preparerDesignation: Yup.string().required('Required'),
  preparedDate: Yup.string().required('Required'),

  approvedBy: Yup.string().required('Required'),
  approverDesignation: Yup.string().required('Required'),
  approvedDate: Yup.string().required('Required'),

  attachments: Yup.array(),
  customFields: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  projectName: '',
  projectLocation: '',
  contractorName: '',
  wagePeriod: '',

  wageRecords: [],

  totalGross: 0,
  totalDeductions: 0,
  totalNet: 0,

  preparedBy: '',
  preparerDesignation: '',
  preparedDate: '',

  approvedBy: '',
  approverDesignation: '',
  approvedDate: '',

  attachments: [],
  customFields: [],
  signatures: []

};

const ContractLabourWageSheetRequestApprovalForm = () => {

  const { isPrintMode } = usePrintMode();

  return (

    <ModernFormWrapper
      formId="FRM-01133 / FRM-01134"
      title="Contract Labour Wage Sheet"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Wage Sheet Saved');
        }}
      >

        {({ values, setFieldValue }) => {

          // Auto Calculation
          useEffect(() => {

            let totalGross = 0;
            let totalDeductions = 0;
            let totalNet = 0;

            values.wageRecords.forEach((r, i) => {

              const gross = (Number(r.daysWorked) || 0) * (Number(r.ratePerDay) || 0);
              const net = gross - (Number(r.deductions) || 0);

              setFieldValue(`wageRecords.${i}.grossWages`, gross);
              setFieldValue(`wageRecords.${i}.netPay`, net);

              totalGross += gross;
              totalDeductions += Number(r.deductions) || 0;
              totalNet += net;
            });

            setFieldValue('totalGross', totalGross);
            setFieldValue('totalDeductions', totalDeductions);
            setFieldValue('totalNet', totalNet);

          }, [values.wageRecords]);

          return (

            <Form>

              <ModernA4Template
                formId="FRM-01133 / FRM-01134"
                title="Contract Labour Wage Sheet"
                department="Subcontractor & Contracting"
              >

                {/* Header */}
                <div className="form-section">
                  <div className="form-fields">
                    <Field name="projectName" placeholder="Project Name" className="form-input" />
                    <Field name="projectLocation" placeholder="Project Location" className="form-input" />
                    <Field name="contractorName" placeholder="Contractor Name" className="form-input" />
                    <Field name="wagePeriod" placeholder="Wage Period (From-To)" className="form-input" />
                  </div>
                </div>

                {/* Wage Table */}
                <div className="form-section">
                  <h3 className="form-section-title">Wage Details</h3>

                  {!isPrintMode && (
                    <FieldArray name="wageRecords">
                      {(helpers) => (
                        <div>

                          {values.wageRecords.map((rec, i) => (
                            <div key={rec.id || i} className="attendance-row">

                              <Field name={`wageRecords.${i}.workerName`} placeholder="Worker Name" className="form-input" />
                              <Field name={`wageRecords.${i}.workerId`} placeholder="ID" className="form-input" />
                              <Field name={`wageRecords.${i}.skillCategory`} placeholder="Skill" className="form-input" />
                              <Field type="number" name={`wageRecords.${i}.daysWorked`} placeholder="Days" className="form-input" />
                              <Field type="number" name={`wageRecords.${i}.ratePerDay`} placeholder="Rate" className="form-input" />
                              <Field type="number" name={`wageRecords.${i}.grossWages`} placeholder="Gross" className="form-input" disabled />
                              <Field type="number" name={`wageRecords.${i}.deductions`} placeholder="Deductions" className="form-input" />
                              <Field type="number" name={`wageRecords.${i}.netPay`} placeholder="Net" className="form-input" disabled />

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
                                workerName: '',
                                workerId: '',
                                skillCategory: '',
                                daysWorked: '',
                                ratePerDay: '',
                                grossWages: 0,
                                deductions: 0,
                                netPay: 0
                              })
                            }
                          >
                            Add Worker
                          </button>

                        </div>
                      )}
                    </FieldArray>
                  )}

                  {/* Print Table */}
                  {isPrintMode && (
                    <table className="print-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>ID</th>
                          <th>Skill</th>
                          <th>Days</th>
                          <th>Rate</th>
                          <th>Gross</th>
                          <th>Deductions</th>
                          <th>Net</th>
                        </tr>
                      </thead>
                      <tbody>
                        {values.wageRecords.map((r, i) => (
                          <tr key={i}>
                            <td>{r.workerName}</td>
                            <td>{r.workerId}</td>
                            <td>{r.skillCategory}</td>
                            <td>{r.daysWorked}</td>
                            <td>{r.ratePerDay}</td>
                            <td>{r.grossWages}</td>
                            <td>{r.deductions}</td>
                            <td>{r.netPay}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                </div>

                {/* Totals */}
                <div className="form-section">
                  <div className="form-fields">
                    <Field name="totalGross" disabled className="form-input" />
                    <Field name="totalDeductions" disabled className="form-input" />
                    <Field name="totalNet" disabled className="form-input" />
                  </div>
                </div>

                {/* Prepared & Approved */}
                <div className="form-section">
                  <h3 className="form-section-title">Authorization</h3>
                  <div className="form-fields">
                    <Field name="preparedBy" placeholder="Prepared By" className="form-input" />
                    <Field name="preparerDesignation" placeholder="Designation" className="form-input" />
                    <Field type="date" name="preparedDate" className="form-input" />

                    <Field name="approvedBy" placeholder="Approved By" className="form-input" />
                    <Field name="approverDesignation" placeholder="Designation" className="form-input" />
                    <Field type="date" name="approvedDate" className="form-input" />
                  </div>
                </div>

                {/* Universal Components */}
                <FormAttachments values={values} />
                <FormCustomFields values={values} />
                <FormSignatures values={values} />

                {!isPrintMode && (
                  <div className="form-actions">
                    <button type="submit" className="btn-submit">
                      Save Wage Sheet
                    </button>
                  </div>
                )}

              </ModernA4Template>

            </Form>

          );
        }}

      </Formik>

    </ModernFormWrapper>

  );
};

export default ContractLabourWageSheetRequestApprovalForm;
