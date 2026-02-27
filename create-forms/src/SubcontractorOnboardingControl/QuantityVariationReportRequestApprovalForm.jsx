// QuantityVariationReportRequestApprovalForm.jsx
// FRM-01185 / FRM-01186 – Quantity Variation Report

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

  formNo: 'FRM-01185 / FRM-01186',
  department: 'Subcontractor & Contracting',
  process: 'Measurement, Billing & Payments',
  formType: 'Request / Approval',

  // Project Details
  projectName: '',
  projectLocation: '',
  subcontractorName: '',
  workOrderNo: '',
  reportDate: '',
  referenceNo: '',

  // Variation Table
  variations: [],

  // Summary
  totalPositiveVariation: '',
  totalNegativeVariation: '',
  netVariationAmount: '',

  // Justification
  technicalJustification: '',
  commercialImpact: '',
  remarks: '',

  attachments: [],
  customFields: [],
  signatures: []
};

const QuantityVariationReportRequestApprovalForm = () => {

  const { isPrintMode } = usePrintMode();

  return (

    <ModernFormWrapper
      formId="FRM-01185 / FRM-01186"
      title="Quantity Variation Report"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert('Quantity Variation Report Saved');
        }}
      >

      {({ values }) => (

        <Form>

          <ModernA4Template
            formId={values.formNo}
            title="Quantity Variation Report"
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
                <Field name="reportDate" type="date" className="form-input"/>
                <Field name="referenceNo" placeholder="Reference No" className="form-input"/>
              </div>
            </div>

            {/* Variation Table */}
            <div className="form-section">
              <h3 className="form-section-title">Quantity Variation Details</h3>

              <FieldArray name="variations">
                {(helpers)=>(
                  <div>

                    {values.variations.map((row,i)=>(
                      <div key={row.id || i} className="variation-row">

                        <Field name={`variations.${i}.itemNo`} placeholder="Item No" className="form-input"/>
                        <Field name={`variations.${i}.description`} placeholder="Description" className="form-input"/>
                        <Field name={`variations.${i}.unit`} placeholder="Unit" className="form-input"/>
                        <Field name={`variations.${i}.boqQty`} placeholder="BOQ Qty" className="form-input"/>
                        <Field name={`variations.${i}.actualQty`} placeholder="Actual Qty" className="form-input"/>
                        <Field name={`variations.${i}.variationQty`} placeholder="Variation Qty" className="form-input"/>
                        <Field name={`variations.${i}.percentVariation`} placeholder="% Variation" className="form-input"/>
                        <Field name={`variations.${i}.rate`} placeholder="Rate" className="form-input"/>
                        <Field name={`variations.${i}.variationAmount`} placeholder="Variation Amount" className="form-input"/>
                        <Field name={`variations.${i}.remarks`} placeholder="Remarks" className="form-input"/>

                        {!isPrintMode &&
                          <button
                            type="button"
                            className="btn-remove"
                            onClick={()=>helpers.remove(i)}
                          >
                            Remove
                          </button>
                        }

                      </div>
                    ))}

                    {!isPrintMode &&
                      <button
                        type="button"
                        className="btn-add-field"
                        onClick={()=>helpers.push({
                          id: uuidv4(),
                          itemNo:'',
                          description:'',
                          unit:'',
                          boqQty:'',
                          actualQty:'',
                          variationQty:'',
                          percentVariation:'',
                          rate:'',
                          variationAmount:'',
                          remarks:''
                        })}
                      >
                        Add Variation Item
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
                <Field name="totalPositiveVariation" placeholder="Total Positive Variation" className="form-input"/>
                <Field name="totalNegativeVariation" placeholder="Total Negative Variation" className="form-input"/>
                <Field name="netVariationAmount" placeholder="Net Variation Amount" className="form-input"/>
              </div>
            </div>

            {/* Justification */}
            <div className="form-section">
              <h3 className="form-section-title">Justification</h3>

              <Field
                as="textarea"
                name="technicalJustification"
                rows="3"
                className="form-textarea"
                placeholder="Technical Justification"
              />

              <Field
                as="textarea"
                name="commercialImpact"
                rows="3"
                className="form-textarea"
                placeholder="Commercial Impact"
              />

              <Field
                as="textarea"
                name="remarks"
                rows="3"
                className="form-textarea"
                placeholder="Remarks"
              />

            </div>

            {/* Shared Components */}
            <FormAttachments />
            <FormCustomFields />
            <FormSignatures />

            {!isPrintMode &&
              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  Save Quantity Variation Report
                </button>
              </div>
            }

          </ModernA4Template>

        </Form>

      )}

      </Formik>

    </ModernFormWrapper>

  );
};

export default QuantityVariationReportRequestApprovalForm;
