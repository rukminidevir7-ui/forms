// SubcontractorFinalBillReportRecord.jsx
// FRM-01181 – Subcontractor Final Bill Form

import React, { useEffect } from 'react';
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
  subcontractorName: Yup.string().required('Required'),
  finalBillNo: Yup.string().required('Required')
});

const initialValues = {
  formNo: 'FRM-01181',
  department: 'Subcontractor & Contracting',
  process: 'Measurement, Billing & Payments',

  projectName: '',
  projectLocation: '',
  subcontractorName: '',
  workOrderNo: '',

  finalBillNo: '',
  submissionDate: '',
  contractValue: '',
  finalBillAmount: '',

  items: [],

  totalRABillsPaid: '',
  retentionReleased: '',
  advanceRecovered: '',
  ldPenalty: '',
  backcharges: '',
  otherAdjustments: '',

  grossFinalAmount: 0,
  netFinalPayable: 0,

  attachments: [],
  customFields: [],
  signatures: []
};

const SubcontractorFinalBillReportRecord = () => {

  const { isPrintMode } = usePrintMode();

  return (
    <ModernFormWrapper
      formId="FRM-01181"
      title="Subcontractor Final Bill Form"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Final Bill Saved');
        }}
      >

      {({ values, setFieldValue }) => {

        /* ================= SAFE AUTO CALCULATION ================= */
        useEffect(() => {

          const gross = values.items.reduce(
            (sum, item) =>
              sum +
              (Number(item.totalQty || 0) *
               Number(item.rate || 0)),
            0
          );

          const adjustments =
            (Number(values.totalRABillsPaid) || 0) +
            (Number(values.advanceRecovered) || 0) +
            (Number(values.ldPenalty) || 0) +
            (Number(values.backcharges) || 0) +
            (Number(values.otherAdjustments) || 0);

          const net =
            gross - adjustments +
            (Number(values.retentionReleased) || 0);

          setFieldValue('grossFinalAmount', gross, false);
          setFieldValue('netFinalPayable', net, false);

        }, [
          values.items,
          values.totalRABillsPaid,
          values.advanceRecovered,
          values.ldPenalty,
          values.backcharges,
          values.otherAdjustments,
          values.retentionReleased
        ]);

        return (
          <Form>
            <ModernA4Template
              formId={values.formNo}
              title="Subcontractor Final Bill"
              department={values.department}
            >

              {/* ================= ITEM TABLE ================= */}
              <div className="form-section">
                <h3 className="form-section-title">
                  Item-wise Billing
                </h3>

                <FieldArray name="items">
                  {({ push, remove }) => (
                    <>
                      <table className="modern-table">
                        <thead>
                          <tr>
                            <th>Item No</th>
                            <th>Description</th>
                            <th>Unit</th>
                            <th>Total Qty</th>
                            <th>Rate</th>
                            <th>Amount</th>
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {values.items.map((item, index) => {

                            const amount =
                              (Number(item.totalQty || 0) *
                               Number(item.rate || 0));

                            return (
                              <tr key={item.id || index}>
                                <td>
                                  <Field
                                    name={`items.${index}.itemNo`}
                                    className="form-input"
                                  />
                                </td>

                                <td>
                                  <Field
                                    name={`items.${index}.description`}
                                    className="form-input"
                                  />
                                </td>

                                <td>
                                  <Field
                                    name={`items.${index}.unit`}
                                    className="form-input"
                                  />
                                </td>

                                <td>
                                  <Field
                                    name={`items.${index}.totalQty`}
                                    className="form-input"
                                  />
                                </td>

                                <td>
                                  <Field
                                    name={`items.${index}.rate`}
                                    className="form-input"
                                  />
                                </td>

                                <td>
                                  <input
                                    value={amount}
                                    className="form-input"
                                    disabled
                                  />
                                </td>

                                {!isPrintMode && (
                                  <td>
                                    <button
                                      type="button"
                                      onClick={() => remove(index)}
                                    >
                                      X
                                    </button>
                                  </td>
                                )}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>

                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-add-field"
                          onClick={() =>
                            push({
                              id: uuidv4(),
                              itemNo: '',
                              description: '',
                              unit: '',
                              totalQty: '',
                              rate: ''
                            })
                          }
                        >
                          Add Item
                        </button>
                      )}
                    </>
                  )}
                </FieldArray>
              </div>

              {/* ================= SUMMARY (NO FIELD INPUTS) ================= */}
              <div className="form-section">
                <h3 className="form-section-title">
                  Summary
                </h3>

                <div className="form-summary-box">
                  <div className="summary-row">
                    <strong>Gross Final Amount:</strong>
                    <span>
                      ₹ {Number(values.grossFinalAmount)
                          .toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="summary-row">
                    <strong>Net Final Payable:</strong>
                    <span>
                      ₹ {Number(values.netFinalPayable)
                          .toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <FormAttachments />
              <FormCustomFields />
              <FormSignatures />

              {!isPrintMode && (
                <div className="form-actions">
                  <button
                    type="submit"
                    className="btn-submit"
                  >
                    Save Final Bill
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

export default SubcontractorFinalBillReportRecord;
