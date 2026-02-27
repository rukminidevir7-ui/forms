// MobilizationAdvanceSettlementRequestForm.jsx
// FRM-01174 / FRM-01175 – Mobilization Advance Settlement Form

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
  totalAdvanceAmount: Yup.number().required('Required'),
  advanceRecoveryPercent: Yup.number().required('Required')
});

const initialValues = {

  formNo: 'FRM-01174 / FRM-01175',
  department: 'Subcontractor & Contracting',
  process: 'Measurement, Billing & Payments',

  projectName: '',
  projectLocation: '',
  subcontractorName: '',
  workOrderNo: '',
  settlementDate: '',

  totalAdvanceAmount: '',
  advanceRecoveryPercent: '',
  totalRecoveredTillDate: '',
  balanceAdvance: '',

  recoveryTable: [],

  attachments: [],
  customFields: [],
  signatures: []
};

const calculateTotals = (rows, totalAdvance) => {

  let totalRecovered = 0;

  rows.forEach(r => {
    totalRecovered += parseFloat(r.recoveryAmount || 0);
  });

  const balance = parseFloat(totalAdvance || 0) - totalRecovered;

  return {
    totalRecovered,
    balance
  };
};

const MobilizationAdvanceSettlement = () => {

  const { isPrintMode } = usePrintMode();

  return (

    <ModernFormWrapper
      formId="FRM-01174 / FRM-01175"
      title="Mobilization Advance Settlement Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert('Mobilization Advance Settlement Saved');
        }}
      >

      {({ values }) => {

        const totals = calculateTotals(
          values.recoveryTable,
          values.totalAdvanceAmount
        );

        return (

          <Form>

            <ModernA4Template
              formId={values.formNo}
              title="Mobilization Advance Settlement"
              department={values.department}
            >

              {/* Project Details */}
              <div className="form-section">
                <h3 className="form-section-title">
                  Project / Contract Details
                </h3>
                <div className="form-fields">
                  <Field name="projectName" placeholder="Project Name" className="form-input"/>
                  <Field name="projectLocation" placeholder="Project Location" className="form-input"/>
                  <Field name="subcontractorName" placeholder="Subcontractor Name" className="form-input"/>
                  <Field name="workOrderNo" placeholder="Work Order / Contract No" className="form-input"/>
                  <Field name="settlementDate" type="date" className="form-input"/>
                </div>
              </div>

              {/* Advance Summary */}
              <div className="form-section">
                <h3 className="form-section-title">Advance Details</h3>
                <div className="form-fields">
                  <Field name="totalAdvanceAmount" placeholder="Total Advance Amount" className="form-input"/>
                  <Field name="advanceRecoveryPercent" placeholder="Advance Recovery %" className="form-input"/>
                  <div className="form-field">
                    <label>Total Recovered</label>
                    <div className="print-value">
                      {totals.totalRecovered.toFixed(2)}
                    </div>
                  </div>
                  <div className="form-field">
                    <label>Balance Advance</label>
                    <div className="print-value">
                      {totals.balance.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recovery Table */}
              <div className="form-section">
                <h3 className="form-section-title">Settlement Working</h3>

                <FieldArray name="recoveryTable">
                  {({ push, remove }) => (

                    <div>

                      <table className="modern-table">
                        <thead>
                          <tr>
                            <th>RA Bill No</th>
                            <th>Bill Amount</th>
                            <th>Recovery %</th>
                            <th>Recovery Amount</th>
                            <th>Cumulative Recovery</th>
                            <th>Balance Advance</th>
                            <th>Remarks</th>
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {values.recoveryTable.map((row, index) => {

                            const recovery =
                              (parseFloat(row.billAmount || 0) *
                                parseFloat(row.recoveryPercent || 0)) / 100;

                            const cumulative =
                              values.recoveryTable
                                .slice(0, index + 1)
                                .reduce((sum, r) =>
                                  sum +
                                  ((parseFloat(r.billAmount || 0) *
                                    parseFloat(r.recoveryPercent || 0)) / 100),
                                  0
                                );

                            const balance =
                              parseFloat(values.totalAdvanceAmount || 0) -
                              cumulative;

                            return (
                              <tr key={row.id || index}>
                                <td>
                                  <Field name={`recoveryTable.${index}.raBillNo`} className="form-input"/>
                                </td>
                                <td>
                                  <Field name={`recoveryTable.${index}.billAmount`} className="form-input"/>
                                </td>
                                <td>
                                  <Field name={`recoveryTable.${index}.recoveryPercent`} className="form-input"/>
                                </td>
                                <td>{recovery.toFixed(2)}</td>
                                <td>{cumulative.toFixed(2)}</td>
                                <td>{balance.toFixed(2)}</td>
                                <td>
                                  <Field name={`recoveryTable.${index}.remarks`} className="form-input"/>
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
                              recoveryPercent: values.advanceRecoveryPercent,
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

              {/* Shared Components */}
              <FormAttachments />
              <FormCustomFields />
              <FormSignatures />

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Save Settlement
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

export default MobilizationAdvanceSettlement;
