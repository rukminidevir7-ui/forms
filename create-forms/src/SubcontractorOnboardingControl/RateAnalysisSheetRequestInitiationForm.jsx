// RateAnalysisSheetRequestInitiationForm.jsx
// FRM-01170 / FRM-01171 – Rate Analysis Sheet

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
  itemDescription: Yup.string().required('Required')
});

const initialValues = {

  department: 'Subcontractor & Contracting',
  process: 'Measurement, Billing & Payments',

  projectName: '',
  projectLocation: '',
  subcontractorName: '',
  itemDescription: '',
  analysisDate: '',

  materialCost: [],
  labourCost: [],
  equipmentCost: [],

  overheadProfit: '',
  finalRate: '',

  attachments: [],
  customFields: [],
  signatures: []
};

const calculateTotal = (rows) =>
  rows.reduce((sum, row) => {
    const qty = parseFloat(row.qty || 0);
    const rate = parseFloat(row.rate || 0);
    return sum + qty * rate;
  }, 0);

const CostTable = ({ name, title, values }) => {

  const { isPrintMode } = usePrintMode();

  return (
    <div className="form-section">
      <h3 className="form-section-title">{title}</h3>

      <FieldArray name={name}>
        {({ push, remove }) => (

          <div>

            <table className="modern-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Unit</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>Amount</th>
                  {!isPrintMode && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {values[name].map((row, index) => {

                  const amount =
                    (parseFloat(row.qty || 0) *
                      parseFloat(row.rate || 0)).toFixed(2);

                  return (
                    <tr key={row.id || index}>
                      <td>
                        <Field name={`${name}.${index}.description`} className="form-input"/>
                      </td>
                      <td>
                        <Field name={`${name}.${index}.unit`} className="form-input"/>
                      </td>
                      <td>
                        <Field name={`${name}.${index}.qty`} className="form-input"/>
                      </td>
                      <td>
                        <Field name={`${name}.${index}.rate`} className="form-input"/>
                      </td>
                      <td>{amount}</td>

                      {!isPrintMode && (
                        <td>
                          <button type="button" className="btn-remove"
                            onClick={() => remove(index)}>
                            Remove
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
                    description: '',
                    unit: '',
                    qty: '',
                    rate: ''
                  })
                }
              >
                Add Row
              </button>
            )}

          </div>

        )}
      </FieldArray>

    </div>
  );
};

const RateAnalysisSheet = () => {

  const { isPrintMode } = usePrintMode();

  return (

    <ModernFormWrapper
      formId="FRM-01170 / FRM-01171"
      title="Rate Analysis Sheet"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert('Rate Analysis Saved');
        }}
      >

      {({ values }) => {

        const materialTotal = calculateTotal(values.materialCost);
        const labourTotal = calculateTotal(values.labourCost);
        const equipmentTotal = calculateTotal(values.equipmentCost);

        const overhead = parseFloat(values.overheadProfit || 0);
        const final =
          materialTotal + labourTotal + equipmentTotal + overhead;

        return (

          <Form>

            <ModernA4Template
              formId="FRM-01170 / FRM-01171"
              title="Rate Analysis Sheet"
              department={values.department}
            >

              {/* Project Details */}
              <div className="form-section">
                <h3 className="form-section-title">Project Details</h3>
                <div className="form-fields">
                  <Field name="projectName" placeholder="Project Name" className="form-input"/>
                  <Field name="projectLocation" placeholder="Project Location" className="form-input"/>
                  <Field name="subcontractorName" placeholder="Subcontractor Name" className="form-input"/>
                  <Field name="itemDescription" placeholder="Item Description" className="form-input"/>
                  <Field name="analysisDate" type="date" className="form-input"/>
                </div>
              </div>

              {/* A. Material Cost */}
              <CostTable name="materialCost" title="A. Material Cost" values={values}/>

              {/* B. Labour Cost */}
              <CostTable name="labourCost" title="B. Labour Cost" values={values}/>

              {/* C. Equipment Cost */}
              <CostTable name="equipmentCost" title="C. Equipment / Machinery Cost" values={values}/>

              {/* Totals */}
              <div className="form-section">
                <h3 className="form-section-title">Summary</h3>
                <div className="form-fields">
                  <div className="form-field">
                    <label>Total Material Cost</label>
                    <div className="print-value">{materialTotal.toFixed(2)}</div>
                  </div>

                  <div className="form-field">
                    <label>Total Labour Cost</label>
                    <div className="print-value">{labourTotal.toFixed(2)}</div>
                  </div>

                  <div className="form-field">
                    <label>Total Equipment Cost</label>
                    <div className="print-value">{equipmentTotal.toFixed(2)}</div>
                  </div>

                  <div className="form-field">
                    <label>Overheads & Profit</label>
                    <Field name="overheadProfit" className="form-input"/>
                  </div>

                  <div className="form-field">
                    <label>Final Rate</label>
                    <div className="print-value">
                      {final.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Shared Components */}
              <FormAttachments/>
              <FormCustomFields/>
              <FormSignatures/>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Rate Analysis
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

export default RateAnalysisSheet;
