// RetentionDeductionWorkingReportRecord.jsx
// FRM-01173 – Retention Deduction Working Form

import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
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
  retentionPercent: Yup.number().required('Required')
});

const initialValues = {

  department: 'Subcontractor & Contracting',
  process: 'Measurement, Billing & Payments',

  projectName: '',
  projectLocation: '',
  subcontractorName: '',
  workOrderNo: '',
  retentionPercent: '',
  calculationDate: '',

  retentionTable: [],

  attachments: [],
  customFields: [],
  signatures: []
};

const calculateTotals = (rows) => {

  let totalRetention = 0;
  let totalReleased = 0;

  rows.forEach(r => {
    totalRetention += parseFloat(r.retentionAmount || 0);
    totalReleased += parseFloat(r.releasedAmount || 0);
  });

  return {
    totalRetention,
    totalReleased,
    balance: totalRetention - totalReleased
  };
};

const RetentionDeductionWorking = () => {

  const { isPrintMode } = usePrintMode();

  return (

    <ModernFormWrapper
      formId="FRM-01173"
      title="Retention Deduction Working Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert('Retention Working Saved');
        }}
      >

      {({ values }) => {

        const totals = calculateTotals(values.retentionTable);

        return (

          <Form>

            <ModernA4Template
              formId="FRM-01173"
              title="Retention Deduction Working"
              department={values.department}
            >

              {/* Project Details */}
              <div className="form-section">
                <h3 className="form-section-title">Project / Contract Details</h3>
                <div className="form-fields">
                  <Field name="projectName" placeholder="Project Name" className="form-input"/>
                  <Field name="projectLocation" placeholder="Project Location" className="form-input"/>
                  <Field name="subcontractorName" placeholder="Subcontractor Name" className="form-input"/>
                  <Field name="workOrderNo" placeholder="Work Order / Contract No" className="form-input"/>
                  <Field name="retentionPercent" placeholder="Retention %" className="form-input"/>
                  <Field name="calculationDate" type="date" className="form-input"/>
                </div>
              </div>

              {/* Retention Working Table */}
              <div className="form-section">
                <h3 className="form-section-title">Retention Working</h3>

                <FieldArray name="retentionTable">
                  {({ push, remove }) => (

                    <div>

                      <table className="modern-table">
                        <thead>
                          <tr>
                            <th>RA Bill No</th>
                            <th>Bill Amount</th>
                            <th>Retention %</th>
                            <th>Retention Amount</th>
                            <th>Released Amount</th>
                            <th>Balance Retention</th>
                            <th>Remarks</th>
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {values.retentionTable.map((row, index) => {

                            const retention =
                              (parseFloat(row.billAmount || 0) *
                                parseFloat(row.retentionPercent || 0)) / 100;

                            const balance =
                              retention - parseFloat(row.releasedAmount || 0);

                            return (
                              <tr key={row.id || index}>
                                <td>
                                  <Field name={`retentionTable.${index}.raBillNo`} className="form-input"/>
                                </td>
                                <td>
                                  <Field name={`retentionTable.${index}.billAmount`} className="form-input"/>
                                </td>
                                <td>
                                  <Field name={`retentionTable.${index}.retentionPercent`} className="form-input"/>
                                </td>
                                <td>{retention.toFixed(2)}</td>
                                <td>
                                  <Field name={`retentionTable.${index}.releasedAmount`} className="form-input"/>
                                </td>
                                <td>{balance.toFixed(2)}</td>
                                <td>
                                  <Field name={`retentionTable.${index}.remarks`} className="form-input"/>
                                </td>

                                {!isPrintMode &&
                                  <td>
                                    <button
                                      type="button"
                                      className="btn-remove"
                                      onClick={() => remove(index)}
                                    >
                                      Remove
                                    </button>
                                  </td>
                                }
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>

                      {!isPrintMode &&
                        <button
                          type="button"
                          className="btn-add-field"
                          onClick={() =>
                            push({
                              id: uuidv4(),
                              raBillNo: '',
                              billAmount: '',
                              retentionPercent: values.retentionPercent,
                              releasedAmount: '',
                              remarks: ''
                            })
                          }
                        >
                          Add Row
                        </button>
                      }

                    </div>
                  )}
                </FieldArray>
              </div>

              {/* Summary */}
              <div className="form-section">
                <h3 className="form-section-title">Summary</h3>
                <div className="form-fields">
                  <div className="form-field">
                    <label>Total Retention Held</label>
                    <div className="print-value">{totals.totalRetention.toFixed(2)}</div>
                  </div>

                  <div className="form-field">
                    <label>Total Released</label>
                    <div className="print-value">{totals.totalReleased.toFixed(2)}</div>
                  </div>

                  <div className="form-field">
                    <label>Balance Retention</label>
                    <div className="print-value">{totals.balance.toFixed(2)}</div>
                  </div>
                </div>
              </div>

              {/* Shared Components */}
              <FormAttachments />
              <FormCustomFields />
              <FormSignatures />

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Save Retention Working
                  </button>
                </div>
              }

            </ModernA4Template>

          </Form>
        );
      }}

      </Formik>

    </ModernFormWrapper>

  );
};

export default RetentionDeductionWorking;
