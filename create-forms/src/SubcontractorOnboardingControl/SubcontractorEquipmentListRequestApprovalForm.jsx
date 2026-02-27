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
import '../styles/FRM00611.css';

const validationSchema = Yup.object({
  projectName: Yup.string().required('Required'),
  subcontractorName: Yup.string().required('Required'),
  finalBillNo: Yup.string().required('Required')
});

const initialValues = {

  /* ================= METADATA ================= */
  formNo: 'FRM-01181',
  department: 'Subcontractor & Contracting',
  process: 'Measurement, Billing & Payments',

  /* ================= PROJECT DETAILS ================= */
  projectName: '',
  projectLocation: '',
  subcontractorName: '',
  workOrderNo: '',

  /* ================= FINAL BILL INFO ================= */
  finalBillNo: '',
  submissionDate: '',
  contractValue: '',
  finalBillAmount: '',

  /* ================= ITEMS TABLE ================= */
  items: [],

  /* ================= ADJUSTMENTS ================= */
  totalRABillsPaid: '',
  retentionReleased: '',
  advanceRecovered: '',
  ldPenalty: '',
  backcharges: '',
  otherAdjustments: '',

  /* ================= SUMMARY ================= */
  grossFinalAmount: '',
  netFinalPayable: '',

  /* ================= SIGN-OFF ================= */
  preparedByName: '',
  preparedBySignature: '',
  preparedByDate: '',

  checkedByName: '',
  checkedBySignature: '',
  checkedByDate: '',

  approvedByName: '',
  approvedBySignature: '',
  approvedByDate: '',

  clientRepName: '',
  clientRepSignature: '',
  clientRepDate: '',

  attachments: [],
  customFields: []
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
        onSubmit={(values)=>{
          console.log(values);
          alert('Final Bill Saved');
        }}
      >

      {({ values, setFieldValue }) => {

        /* ================= SAFE CALCULATION ================= */
        useEffect(() => {

          const gross = values.items.reduce(
            (sum, i) => sum + (Number(i.totalQuantity) || 0) * (Number(i.rate) || 0),
            0
          );

          const adjustments =
            (Number(values.totalRABillsPaid) || 0) +
            (Number(values.advanceRecovered) || 0) +
            (Number(values.ldPenalty) || 0) +
            (Number(values.backcharges) || 0) +
            (Number(values.otherAdjustments) || 0);

          const net =
            gross - adjustments + (Number(values.retentionReleased) || 0);

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
              process={values.process}
            >

              {/* ================= PROJECT DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Project / Contract Details</h3>
                <div className="form-fields">
                  <Field name="projectName" placeholder="Project Name" className="form-input"/>
                  <Field name="projectLocation" placeholder="Project Location" className="form-input"/>
                  <Field name="subcontractorName" placeholder="Subcontractor Name" className="form-input"/>
                  <Field name="workOrderNo" placeholder="Work Order / Contract No" className="form-input"/>
                </div>
              </div>

              {/* ================= FINAL BILL INFO ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Final Bill Information</h3>
                <div className="form-fields">
                  <Field name="finalBillNo" placeholder="Final Bill No" className="form-input"/>
                  <Field name="submissionDate" type="date" className="form-input"/>
                  <Field name="contractValue" placeholder="Contract Value" className="form-input"/>
                  <Field name="finalBillAmount" placeholder="Final Bill Amount" className="form-input"/>
                </div>
              </div>

              {/* ================= ITEM TABLE ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Item-wise Billing</h3>

                <FieldArray name="items">
                  {({ push, remove }) => (
                    <>
                      <table className="modern-table">
                        <thead>
                          <tr>
                            <th>Item No</th>
                            <th>Description</th>
                            <th>Unit</th>
                            <th>Total Quantity</th>
                            <th>Rate</th>
                            <th>Amount</th>
                            <th>Remarks</th>
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {values.items.map((item, index) => {
                            const amount =
                              (Number(item.totalQuantity) || 0) *
                              (Number(item.rate) || 0);

                            return (
                              <tr key={item.id || index}>
                                <td><Field name={`items.${index}.itemNo`} className="form-input"/></td>
                                <td><Field name={`items.${index}.description`} className="form-input"/></td>
                                <td><Field name={`items.${index}.unit`} className="form-input"/></td>
                                <td><Field name={`items.${index}.totalQuantity`} className="form-input"/></td>
                                <td><Field name={`items.${index}.rate`} className="form-input"/></td>
                                <td><input value={amount} className="form-input" disabled/></td>
                                <td><Field name={`items.${index}.remarks`} className="form-input"/></td>
                                {!isPrintMode &&
                                  <td>
                                    <button type="button" onClick={()=>remove(index)}>X</button>
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
                            id: uuidv4(),
                            itemNo:'',
                            description:'',
                            unit:'',
                            totalQuantity:'',
                            rate:'',
                            remarks:''
                          })}
                        >
                          Add Item
                        </button>
                      }
                    </>
                  )}
                </FieldArray>
              </div>

              {/* ================= ADJUSTMENTS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Adjustments</h3>
                <div className="form-fields">
                  <Field name="totalRABillsPaid" placeholder="Total RA Bills Paid" className="form-input"/>
                  <Field name="retentionReleased" placeholder="Retention Released" className="form-input"/>
                  <Field name="advanceRecovered" placeholder="Advance Recovered" className="form-input"/>
                  <Field name="ldPenalty" placeholder="LD / Penalty" className="form-input"/>
                  <Field name="backcharges" placeholder="Backcharges" className="form-input"/>
                  <Field name="otherAdjustments" placeholder="Other Adjustments" className="form-input"/>
                </div>
              </div>

              {/* ================= SUMMARY ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Summary</h3>
                <div className="form-summary-box">
  <div className="summary-row">
    <strong>Gross Final Amount:</strong>
    <span>₹ {values.grossFinalAmount}</span>
  </div>

  <div className="summary-row">
    <strong>Net Final Payable:</strong>
    <span>₹ {values.netFinalPayable}</span>
  </div>
</div>

              </div>

              {/* ================= SIGN-OFF ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Sign-off</h3>
                <div className="form-fields">
                  <Field name="preparedByName" placeholder="Prepared By Name" className="form-input"/>
                  <Field name="preparedByDate" type="date" className="form-input"/>

                  <Field name="checkedByName" placeholder="Checked By Name" className="form-input"/>
                  <Field name="checkedByDate" type="date" className="form-input"/>

                  <Field name="approvedByName" placeholder="Approved By Name" className="form-input"/>
                  <Field name="approvedByDate" type="date" className="form-input"/>

                  <Field name="clientRepName" placeholder="Client Representative Name" className="form-input"/>
                  <Field name="clientRepDate" type="date" className="form-input"/>
                </div>
              </div>

              <FormAttachments />
              <FormCustomFields />

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Save Final Bill
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

export default SubcontractorFinalBillReportRecord;
