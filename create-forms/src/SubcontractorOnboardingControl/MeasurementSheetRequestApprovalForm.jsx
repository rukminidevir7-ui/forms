// MeasurementSheetRequestApprovalForm.jsx
// FRM-01163 / FRM-01164 – Measurement Sheet

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
  subcontractorName: Yup.string().required('Required')
});

const initialValues = {

  department: 'Subcontractor & Contracting',
  process: 'Measurement, Billing & Payments',

  projectName: '',
  projectLocation: '',
  subcontractorName: '',
  measurementPeriod: '',
  workOrderNo: '',

  measurements: [],

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

const MeasurementSheetRequestApprovalForm = () => {

  const { isPrintMode } = usePrintMode();

  return (

    <ModernFormWrapper
      formId="FRM-01163 / FRM-01164"
      title="Measurement Sheet"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert('Measurement Sheet Saved');
        }}
      >

      {({ values, setFieldValue })=>{

        const totalQty = values.measurements.reduce(
          (sum,row)=> sum + Number(row.quantity || 0), 0
        );

        const totalAmount = values.measurements.reduce(
          (sum,row)=> sum + Number(row.amount || 0), 0
        );

        return (
        <Form>

          <ModernA4Template
            formId="FRM-01163 / FRM-01164"
            title="Measurement Sheet"
            department={values.department}
          >

            {/* Project Details */}
            <div className="form-section">
              <h3 className="form-section-title">Project / Contract Details</h3>
              <div className="form-fields">
                <Field name="projectName" placeholder="Project Name" className="form-input"/>
                <Field name="projectLocation" placeholder="Project Location" className="form-input"/>
                <Field name="subcontractorName" placeholder="Subcontractor Name" className="form-input"/>
                <Field name="measurementPeriod" placeholder="Measurement Period" className="form-input"/>
                <Field name="workOrderNo" placeholder="Work Order / Contract No" className="form-input"/>
              </div>
            </div>

            {/* Measurement Table */}
            <div className="form-section">
              <h3 className="form-section-title">Measurement Details</h3>

              <FieldArray name="measurements">
                {({ push, remove }) => (

                  <>
                  <table className="modern-table">
                    <thead>
                      <tr>
                        <th>Item No</th>
                        <th>Description</th>
                        <th>Unit</th>
                        <th>L</th>
                        <th>W</th>
                        <th>H/D</th>
                        <th>Qty</th>
                        <th>Rate</th>
                        <th>Amount</th>
                        <th>Remarks</th>
                        {!isPrintMode && <th>Action</th>}
                      </tr>
                    </thead>
                    <tbody>

                      {values.measurements.map((row,index)=>{

                        const amount =
                          Number(row.quantity || 0) *
                          Number(row.rate || 0);

                        setFieldValue(`measurements.${index}.amount`, amount);

                        return (
                        <tr key={index}>
                          <td><Field name={`measurements.${index}.itemNo`} className="form-input"/></td>
                          <td><Field name={`measurements.${index}.description`} className="form-input"/></td>
                          <td><Field name={`measurements.${index}.unit`} className="form-input"/></td>
                          <td><Field name={`measurements.${index}.length`} className="form-input"/></td>
                          <td><Field name={`measurements.${index}.width`} className="form-input"/></td>
                          <td><Field name={`measurements.${index}.height`} className="form-input"/></td>
                          <td><Field name={`measurements.${index}.quantity`} className="form-input"/></td>
                          <td><Field name={`measurements.${index}.rate`} className="form-input"/></td>
                          <td>{amount.toFixed(2)}</td>
                          <td><Field name={`measurements.${index}.remarks`} className="form-input"/></td>
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
                        length:'',
                        width:'',
                        height:'',
                        quantity:'',
                        rate:'',
                        amount:0,
                        remarks:''
                      })}
                    >
                      Add Row
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
                <div>Total Quantity: <strong>{totalQty}</strong></div>
                <div>Total Amount: <strong>{totalAmount.toFixed(2)}</strong></div>
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
                <button type="submit" className="btn-submit">Save Measurement Sheet</button>
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

export default MeasurementSheetRequestApprovalForm;
