// RunningAccountRABillSubmissionReportRecord.jsx
// FRM-01166 – Running Account (RA) Bill Submission Form

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
  subcontractorName: Yup.string().required('Required'),
  raBillNo: Yup.string().required('Required')
});

const initialValues = {

  department: 'Subcontractor & Contracting',
  process: 'Measurement, Billing & Payments',

  projectName: '',
  projectLocation: '',
  subcontractorName: '',
  workOrderNo: '',

  raBillNo: '',
  billingPeriod: '',
  submissionDate: '',
  invoiceNo: '',

  billingItems: [],

  deductions: '',

  preparedBy: '',
  preparedDate: '',
  checkedBy: '',
  checkedDate: '',
  approvedBy: '',
  approvedDate: '',
  clientRep: '',
  clientDate: '',

  attachments: [],
  customFields: [],
  signatures: []
};

const RunningAccountRABillSubmissionReportRecord = () => {

  const { isPrintMode } = usePrintMode();

  return (

    <ModernFormWrapper
      formId="FRM-01166"
      title="Running Account (RA) Bill Submission"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert('RA Bill Submission Saved');
        }}
      >

      {({ values, setFieldValue })=>{

        const grossAmount = values.billingItems.reduce(
          (sum,row)=> sum + Number(row.amount || 0), 0
        );

        const netPayable =
          grossAmount - Number(values.deductions || 0);

        return (
        <Form>

          <ModernA4Template
            formId="FRM-01166"
            title="Running Account (RA) Bill Submission"
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
              </div>
            </div>

            {/* Bill Information */}
            <div className="form-section">
              <h3 className="form-section-title">Bill Information</h3>
              <div className="form-fields">
                <Field name="raBillNo" placeholder="RA Bill No" className="form-input"/>
                <Field name="billingPeriod" placeholder="Billing Period" className="form-input"/>
                <Field name="submissionDate" type="date" className="form-input"/>
                <Field name="invoiceNo" placeholder="Invoice No" className="form-input"/>
              </div>
            </div>

            {/* Billing Table */}
            <div className="form-section">
              <h3 className="form-section-title">Billing Details</h3>

              <FieldArray name="billingItems">
                {({ push, remove }) => (
                  <>
                  <table className="modern-table">
                    <thead>
                      <tr>
                        <th>Item No</th>
                        <th>Description</th>
                        <th>Unit</th>
                        <th>Qty This Bill</th>
                        <th>Cumulative Qty</th>
                        <th>Rate</th>
                        <th>Amount</th>
                        <th>Remarks</th>
                        {!isPrintMode && <th>Action</th>}
                      </tr>
                    </thead>
                    <tbody>

                      {values.billingItems.map((row,index)=>{

                        const amount =
                          Number(row.qtyThisBill || 0) *
                          Number(row.rate || 0);

                        setFieldValue(`billingItems.${index}.amount`, amount);

                        return (
                        <tr key={index}>
                          <td><Field name={`billingItems.${index}.itemNo`} className="form-input"/></td>
                          <td><Field name={`billingItems.${index}.description`} className="form-input"/></td>
                          <td><Field name={`billingItems.${index}.unit`} className="form-input"/></td>
                          <td><Field name={`billingItems.${index}.qtyThisBill`} className="form-input"/></td>
                          <td><Field name={`billingItems.${index}.cumulativeQty`} className="form-input"/></td>
                          <td><Field name={`billingItems.${index}.rate`} className="form-input"/></td>
                          <td>{amount.toFixed(2)}</td>
                          <td><Field name={`billingItems.${index}.remarks`} className="form-input"/></td>
                          {!isPrintMode &&
                          <td>
                            <button type="button" className="btn-remove" onClick={()=>remove(index)}>Remove</button>
                          </td>}
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
                        qtyThisBill:'',
                        cumulativeQty:'',
                        rate:'',
                        amount:0,
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

            {/* Summary */}
            <div className="form-section">
              <h3 className="form-section-title">Summary</h3>
              <div className="form-fields">
                <div>Gross Amount: <strong>{grossAmount.toFixed(2)}</strong></div>

                <Field
                  name="deductions"
                  placeholder="Deductions"
                  className="form-input"
                />

                <div>Net Payable: <strong>{netPayable.toFixed(2)}</strong></div>
              </div>
            </div>

            {/* Sign-off */}
            <div className="form-section">
              <h3 className="form-section-title">Sign-off</h3>
              <div className="form-fields">
                <Field name="preparedBy" placeholder="Prepared By Name" className="form-input"/>
                <Field name="preparedDate" type="date" className="form-input"/>
                <Field name="checkedBy" placeholder="Checked By Name" className="form-input"/>
                <Field name="checkedDate" type="date" className="form-input"/>
                <Field name="approvedBy" placeholder="Approved By Name" className="form-input"/>
                <Field name="approvedDate" type="date" className="form-input"/>
                <Field name="clientRep" placeholder="Client Representative Name" className="form-input"/>
                <Field name="clientDate" type="date" className="form-input"/>
              </div>
            </div>

            <FormAttachments/>
            <FormCustomFields/>
            <FormSignatures/>

            {!isPrintMode &&
              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  Save RA Bill Submission
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

export default RunningAccountRABillSubmissionReportRecord;
