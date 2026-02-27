// SubcontractorToolInspectionChecklist.jsx
// FRM-01148 – Subcontractor Tool Inspection Checklist

import React from 'react';
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

const conditionOptions = ['Good','Fair','Poor'];
const yesNo = ['Yes','No'];

const validationSchema = Yup.object({

  department: Yup.string().required('Required'),
  process: Yup.string().required('Required'),
  formType: Yup.string().required('Required'),

  projectName: Yup.string().required('Required'),
  projectLocation: Yup.string().required('Required'),
  subcontractorName: Yup.string().required('Required'),
  inspectionDate: Yup.string().required('Required'),

  tools: Yup.array().of(
    Yup.object({
      toolName: Yup.string().required('Required'),
      toolId: Yup.string().required('Required'),
      condition: Yup.string().required('Required'),
      safetyGuard: Yup.string().required('Required'),
      calibrationValid: Yup.string().required('Required'),
      remarks: Yup.string()
    })
  ),

  inspectedByName: Yup.string().required('Required'),
  inspectedByDesignation: Yup.string().required('Required'),
  inspectedByDate: Yup.string().required('Required'),

  verifiedByName: Yup.string().required('Required'),
  verifiedByDesignation: Yup.string().required('Required'),
  verifiedByDate: Yup.string().required('Required'),

  attachments: Yup.array(),
  customFields: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  department: 'Subcontractor & Contracting',
  process: 'Subcontractor Onboarding & Control',
  formType: 'Checklist',

  projectName: '',
  projectLocation: '',
  subcontractorName: '',
  inspectionDate: '',

  tools: [],

  inspectedByName: '',
  inspectedByDesignation: '',
  inspectedByDate: '',

  verifiedByName: '',
  verifiedByDesignation: '',
  verifiedByDate: '',

  attachments: [],
  customFields: [],
  signatures: []

};

const SubcontractorToolInspectionChecklist = () => {

  const { isPrintMode } = usePrintMode();

  const renderField = (values, name, label, type='text') => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || '___________________'}</div>
        : <>
            <Field name={name} type={type} className="form-input"/>
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  const renderSelect = (values, name, label, options) => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || '___________________'}</div>
        : <>
            <Field as="select" name={name} className="form-input">
              <option value="">-- Select --</option>
              {options.map(o => <option key={o} value={o}>{o}</option>)}
            </Field>
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return (

    <ModernFormWrapper
      formId="FRM-01148"
      title="Subcontractor Tool Inspection Checklist"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert('Tool Inspection Checklist Saved');
        }}
      >

        {({ values }) => (

          <Form>

            <ModernA4Template
              formId="FRM-01148"
              title="Subcontractor Tool Inspection Checklist"
              department={values.department}
            >

              {/* Metadata */}
              <div className="form-section">
                <h3 className="form-section-title">Form Metadata</h3>
                <div className="form-fields">
                  {renderField(values,'department','Department')}
                  {renderField(values,'process','Process')}
                  {renderField(values,'formType','Form Type')}
                </div>
              </div>

              {/* Project Info */}
              <div className="form-section">
                <h3 className="form-section-title">Project Information</h3>
                <div className="form-fields">
                  {renderField(values,'projectName','Project Name')}
                  {renderField(values,'projectLocation','Project Location')}
                  {renderField(values,'subcontractorName','Subcontractor Name')}
                  {renderField(values,'inspectionDate','Inspection Date','date')}
                </div>
              </div>

              {/* Tool Inspection Table */}
              <div className="form-section">
                <h3 className="form-section-title">Tool Inspection Details</h3>

                {!isPrintMode && (
                  <FieldArray name="tools">
                    {(helpers)=>(
                      <div>

                        {values.tools.map((tool,i)=>(
                          <div key={i} className="custom-field-row">

                            <Field name={`tools.${i}.toolName`} className="form-input" placeholder="Tool Name"/>
                            <Field name={`tools.${i}.toolId`} className="form-input" placeholder="Tool ID / Serial No"/>

                            <Field as="select" name={`tools.${i}.condition`} className="form-input">
                              <option value="">Condition</option>
                              {conditionOptions.map(o=> <option key={o} value={o}>{o}</option>)}
                            </Field>

                            <Field as="select" name={`tools.${i}.safetyGuard`} className="form-input">
                              <option value="">Safety Guard</option>
                              {yesNo.map(o=> <option key={o} value={o}>{o}</option>)}
                            </Field>

                            <Field as="select" name={`tools.${i}.calibrationValid`} className="form-input">
                              <option value="">Calibration</option>
                              {yesNo.map(o=> <option key={o} value={o}>{o}</option>)}
                            </Field>

                            <Field name={`tools.${i}.remarks`} className="form-input" placeholder="Remarks"/>

                            <button type="button" className="btn-remove" onClick={()=>helpers.remove(i)}>
                              Remove
                            </button>

                          </div>
                        ))}

                        <button
                          type="button"
                          className="btn-add-field"
                          onClick={()=>helpers.push({
                            id:uuidv4(),
                            toolName:'',
                            toolId:'',
                            condition:'',
                            safetyGuard:'',
                            calibrationValid:'',
                            remarks:''
                          })}
                        >
                          Add Tool
                        </button>

                      </div>
                    )}
                  </FieldArray>
                )}

                {isPrintMode && values.tools.length > 0 && (
                  <div className="form-fields">
                    {values.tools.map((t,i)=>(
                      <div key={i} className="form-field full-width">
                        {t.toolName} | {t.toolId} | {t.condition} | Guard: {t.safetyGuard} | Calibration: {t.calibrationValid} | {t.remarks}
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* Inspection Signoff */}
              <div className="form-section">
                <h3 className="form-section-title">Inspection Sign-off</h3>
                <div className="form-fields">
                  {renderField(values,'inspectedByName','Inspected By (Name)')}
                  {renderField(values,'inspectedByDesignation','Designation')}
                  {renderField(values,'inspectedByDate','Date','date')}
                </div>
              </div>

              {/* Verification */}
              <div className="form-section">
                <h3 className="form-section-title">Verification</h3>
                <div className="form-fields">
                  {renderField(values,'verifiedByName','Verified By (Name)')}
                  {renderField(values,'verifiedByDesignation','Designation')}
                  {renderField(values,'verifiedByDate','Date','date')}
                </div>
              </div>

              {/* Universal Components */}
              <FormAttachments />
              <FormCustomFields />
              <FormSignatures />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Save Inspection Checklist
                  </button>
                </div>
              )}

            </ModernA4Template>

          </Form>

        )}

      </Formik>

    </ModernFormWrapper>

  );
};

export default SubcontractorToolInspectionChecklist;
