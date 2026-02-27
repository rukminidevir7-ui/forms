// PenaltyLDCalculationRequestApprovalForm.jsx
// FRM-01177 / FRM-01178 – Penalty / LD Calculation Form

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
  contractValue: Yup.number().required('Required'),
  ldRate: Yup.number().required('Required')
});

const initialValues = {

  formNo: 'FRM-01177 / FRM-01178',
  department: 'Subcontractor & Contracting',
  process: 'Measurement, Billing & Payments',

  projectName: '',
  projectLocation: '',
  subcontractorName: '',
  workOrderNo: '',
  calculationDate: '',

  contractCompletionDate: '',
  actualCompletionDate: '',
  delayDays: '',
  ldRate: '',
  maximumLdLimit: '',
  contractValue: '',

  ldTable: [],

  attachments: [],
  customFields: [],
  signatures: []
};

const calculateDelayDays = (contractDate, actualDate) => {
  if (!contractDate || !actualDate) return 0;

  const c = new Date(contractDate);
  const a = new Date(actualDate);

  const diff = Math.floor((a - c) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
};

const PenaltyLDCalculation = () => {

  const { isPrintMode } = usePrintMode();

  return (

    <ModernFormWrapper
      formId="FRM-01177 / FRM-01178"
      title="Penalty / LD Calculation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert('LD Calculation Saved');
        }}
      >

      {({ values, setFieldValue }) => {

        const delayDays = calculateDelayDays(
          values.contractCompletionDate,
          values.actualCompletionDate
        );

        if (values.delayDays !== delayDays) {
          setFieldValue('delayDays', delayDays);
        }

        let totalLD = 0;

        values.ldTable.forEach(r=>{
          totalLD += parseFloat(r.ldAmount || 0);
        });

        const maxCapAmount =
          (parseFloat(values.contractValue || 0) *
           parseFloat(values.maximumLdLimit || 0)) / 100;

        const finalLD =
          maxCapAmount && totalLD > maxCapAmount
            ? maxCapAmount
            : totalLD;

        return (

          <Form>

            <ModernA4Template
              formId={values.formNo}
              title="Penalty / LD Calculation"
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
                  <Field name="calculationDate" type="date" className="form-input"/>
                </div>
              </div>

              {/* LD Basis */}
              <div className="form-section">
                <h3 className="form-section-title">LD Basis Details</h3>
                <div className="form-fields">
                  <Field name="contractCompletionDate" type="date" className="form-input"/>
                  <Field name="actualCompletionDate" type="date" className="form-input"/>
                  <div className="form-field">
                    <label>Delay Days</label>
                    <div className="print-value">{delayDays}</div>
                  </div>
                  <Field name="ldRate" placeholder="LD Rate (% or per day)" className="form-input"/>
                  <Field name="maximumLdLimit" placeholder="Maximum LD Limit (%)" className="form-input"/>
                  <Field name="contractValue" placeholder="Contract Value" className="form-input"/>
                </div>
              </div>

              {/* LD Working Table */}
              <div className="form-section">
                <h3 className="form-section-title">LD Calculation Table</h3>

                <FieldArray name="ldTable">
                  {({ push, remove }) => (

                    <div>

                      <table className="modern-table">
                        <thead>
                          <tr>
                            <th>Milestone / Period</th>
                            <th>Amount Considered</th>
                            <th>LD Rate</th>
                            <th>LD Amount</th>
                            <th>Cumulative LD</th>
                            <th>Remarks</th>
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {values.ldTable.map((row, index)=>{

                            const ldAmount =
                              (parseFloat(row.amountConsidered || 0) *
                               parseFloat(row.ldRate || 0)) / 100;

                            const cumulative =
                              values.ldTable
                                .slice(0,index+1)
                                .reduce((sum,r)=>
                                  sum + ((parseFloat(r.amountConsidered || 0) *
                                  parseFloat(r.ldRate || 0)) / 100),
                                  0
                                );

                            if (row.ldAmount !== ldAmount) {
                              setFieldValue(`ldTable.${index}.ldAmount`, ldAmount);
                            }

                            return (
                              <tr key={row.id || index}>
                                <td><Field name={`ldTable.${index}.milestone`} className="form-input"/></td>
                                <td><Field name={`ldTable.${index}.amountConsidered`} className="form-input"/></td>
                                <td><Field name={`ldTable.${index}.ldRate`} className="form-input"/></td>
                                <td>{ldAmount.toFixed(2)}</td>
                                <td>{cumulative.toFixed(2)}</td>
                                <td><Field name={`ldTable.${index}.remarks`} className="form-input"/></td>

                                {!isPrintMode &&
                                  <td>
                                    <button type="button"
                                      className="btn-remove"
                                      onClick={()=>remove(index)}>
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
                          onClick={()=>push({
                            id:uuidv4(),
                            milestone:'',
                            amountConsidered:'',
                            ldRate:values.ldRate,
                            ldAmount:'',
                            remarks:''
                          })}
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
                <h3 className="form-section-title">LD Summary</h3>
                <div className="form-fields">
                  <div className="form-field">
                    <label>Total LD Calculated</label>
                    <div className="print-value">{totalLD.toFixed(2)}</div>
                  </div>

                  <div className="form-field">
                    <label>LD Capped Amount</label>
                    <div className="print-value">
                      {maxCapAmount ? maxCapAmount.toFixed(2) : '0.00'}
                    </div>
                  </div>

                  <div className="form-field">
                    <label>Final LD Deduction</label>
                    <div className="print-value">{finalLD.toFixed(2)}</div>
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
                    Save LD Calculation
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

export default PenaltyLDCalculation;
