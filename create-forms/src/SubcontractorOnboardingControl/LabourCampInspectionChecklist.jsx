// LabourCampInspectionChecklist.jsx
// FRM-01156 – Labour Camp Inspection Checklist

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

  projectName: Yup.string().required('Required'),
  projectLocation: Yup.string().required('Required'),
  campLocation: Yup.string().required('Required'),
  inspectionDate: Yup.string().required('Required'),
  inspectedBy: Yup.string().required('Required'),

  overallObservations: Yup.string().required('Required'),
  correctiveActionsRequired: Yup.string().required('Required'),

  inspectorName: Yup.string().required('Required'),
  inspectorDate: Yup.string().required('Required'),

  verifiedBy: Yup.string().required('Required'),
  verifiedDate: Yup.string().required('Required'),

  inspectionItems: Yup.array().of(
    Yup.object({
      id: Yup.string(),
      item: Yup.string().required('Required'),
      condition: Yup.string().required('Required'),
      compliant: Yup.string().required('Required'),
      remarks: Yup.string()
    })
  )

});

const defaultInspectionItems = [
  'Accommodation Cleanliness',
  'Drinking Water Availability',
  'Sanitation / Toilets',
  'Waste Disposal System',
  'Electrical Safety',
  'Fire Safety Equipment',
  'Ventilation',
  'Lighting',
  'Cooking Area Hygiene',
  'Medical / First Aid Availability',
  'Pest Control',
  'Security Arrangements'
];

const initialValues = {

  department: 'Subcontractor & Contracting',
  process: 'Contract Labour & Site Compliance',
  formType: 'Checklist',

  projectName: '',
  projectLocation: '',
  campLocation: '',
  inspectionDate: '',
  inspectedBy: '',

  inspectionItems: defaultInspectionItems.map(item => ({
    id: uuidv4(),
    item,
    condition: '',
    compliant: '',
    remarks: ''
  })),

  overallObservations: '',
  correctiveActionsRequired: '',

  inspectorName: '',
  inspectorDate: '',

  verifiedBy: '',
  verifiedDate: '',

  attachments: [],
  customFields: [],
  signatures: []

};

const LabourCampInspectionChecklist = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values,name,label,type='text') => (
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

  return (

    <ModernFormWrapper
      formId="FRM-01156"
      title="Labour Camp Inspection Checklist"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert('Labour Camp Inspection Saved Successfully');
        }}
      >

      {({values})=>(
        <Form>

          <ModernA4Template
            formId="FRM-01156"
            title="Labour Camp Inspection Checklist"
            department={values.department}
          >

            {/* Project Info */}
            <div className="form-section">
              <h3 className="form-section-title">Project Information</h3>
              <div className="form-fields">
                {field(values,'projectName','Project Name')}
                {field(values,'projectLocation','Project Location')}
                {field(values,'campLocation','Camp Location')}
                {field(values,'inspectionDate','Inspection Date','date')}
                {field(values,'inspectedBy','Inspected By')}
              </div>
            </div>

            {/* Inspection Table */}
            <div className="form-section">
              <h3 className="form-section-title">Inspection Checklist</h3>

              <div className="table-responsive">
                <table className="modern-table">
                  <thead>
                    <tr>
                      <th>Inspection Item</th>
                      <th>Condition</th>
                      <th>Compliant (Y/N)</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>

                    {values.inspectionItems.map((item,index)=>(
                      <tr key={item.id}>

                        <td>{item.item}</td>

                        <td>
                          {isPrintMode
                            ? item.condition
                            : <Field as="select"
                                name={`inspectionItems.${index}.condition`}
                                className="form-input">
                                <option value="">--Select--</option>
                                {conditionOptions.map(o=>
                                  <option key={o} value={o}>{o}</option>
                                )}
                              </Field>
                          }
                        </td>

                        <td>
                          {isPrintMode
                            ? item.compliant
                            : <Field as="select"
                                name={`inspectionItems.${index}.compliant`}
                                className="form-input">
                                <option value="">--Select--</option>
                                {yesNo.map(o=>
                                  <option key={o} value={o}>{o}</option>
                                )}
                              </Field>
                          }
                        </td>

                        <td>
                          {isPrintMode
                            ? item.remarks
                            : <Field
                                name={`inspectionItems.${index}.remarks`}
                                className="form-input"
                              />
                          }
                        </td>

                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            </div>

            {/* Observations */}
            <div className="form-section">
              <h3 className="form-section-title">Overall Observations</h3>
              <Field as="textarea"
                     name="overallObservations"
                     className="form-textarea"/>
              <ErrorMessage name="overallObservations"
                            component="div"
                            className="form-error"/>
            </div>

            {/* Corrective Actions */}
            <div className="form-section">
              <h3 className="form-section-title">Corrective Actions Required</h3>
              <Field as="textarea"
                     name="correctiveActionsRequired"
                     className="form-textarea"/>
              <ErrorMessage name="correctiveActionsRequired"
                            component="div"
                            className="form-error"/>
            </div>

            {/* Inspector Sign-off */}
            <div className="form-section">
              <h3 className="form-section-title">Inspector Sign-off</h3>
              <div className="form-fields">
                {field(values,'inspectorName','Inspector Name')}
                {field(values,'inspectorDate','Date','date')}
              </div>
            </div>

            {/* Verification */}
            <div className="form-section">
              <h3 className="form-section-title">Verification</h3>
              <div className="form-fields">
                {field(values,'verifiedBy','Verified By')}
                {field(values,'verifiedDate','Date','date')}
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

export default LabourCampInspectionChecklist;
