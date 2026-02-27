// PrincipalEmployerComplianceChecklist.jsx
// FRM-01158 – Principal Employer Compliance Checklist

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormAttachments from '../components/FormAttachments';
import FormCustomFields from '../components/FormCustomFields';
import FormSignatures from '../components/FormSignatures';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({

  projectName: Yup.string().required('Required'),
  projectLocation: Yup.string().required('Required'),
  principalEmployerName: Yup.string().required('Required'),
  inspectionDate: Yup.string().required('Required'),

  checkedBy: Yup.string().required('Required'),
  checkedByDesignation: Yup.string().required('Required'),
  verifiedBy: Yup.string().required('Required'),
  verifiedByDesignation: Yup.string().required('Required')

});

const complianceItems = [
  'Valid Registration Certificate Available',
  'Contract Labour License Verified',
  'PF Compliance Verified',
  'ESI Compliance Verified',
  'Wage Payment Compliance',
  'Safety Measures Implemented',
  'Statutory Records Maintained',
  'Labour Welfare Facilities Provided',
  'Insurance Coverage Verified',
  'Grievance Mechanism Available'
];

const initialValues = {

  department: 'Subcontractor & Contracting',
  process: 'Contract Labour & Site Compliance',
  formType: 'Checklist',

  projectName: '',
  projectLocation: '',
  principalEmployerName: '',
  inspectionDate: '',

  compliance: complianceItems.map(item => ({
    item,
    status: '',
    remarks: ''
  })),

  overallObservations: '',
  correctiveActionsRequired: '',

  checkedBy: '',
  checkedByDesignation: '',
  verifiedBy: '',
  verifiedByDesignation: '',

  attachments: [],
  customFields: [],
  signatures: []

};

const PrincipalEmployerComplianceChecklist = () => {

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
      formId="FRM-01158"
      title="Principal Employer Compliance Checklist"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert('Principal Employer Compliance Checklist Saved');
        }}
      >

      {({values})=>(
        <Form>

          <ModernA4Template
            formId="FRM-01158"
            title="Principal Employer Compliance Checklist"
            department={values.department}
          >

            {/* Project Info */}
            <div className="form-section">
              <h3 className="form-section-title">Project Information</h3>
              <div className="form-fields">
                {field(values,'projectName','Project Name')}
                {field(values,'projectLocation','Project Location')}
                {field(values,'principalEmployerName','Principal Employer Name')}
                {field(values,'inspectionDate','Inspection Date','date')}
              </div>
            </div>

            {/* Compliance Table */}
            <div className="form-section">
              <h3 className="form-section-title">Compliance Checklist</h3>

              <div className="table-responsive">
                <table className="modern-table">
                  <thead>
                    <tr>
                      <th>Compliance Item</th>
                      <th>Compliant (Y/N)</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>

                    {values.compliance.map((row,index)=>(
                      <tr key={index}>

                        <td>{row.item}</td>

                        <td>
                          {isPrintMode
                            ? row.status
                            : <Field as="select"
                                     name={`compliance.${index}.status`}
                                     className="form-input">
                                <option value="">--Select--</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </Field>
                          }
                        </td>

                        <td>
                          {isPrintMode
                            ? row.remarks
                            : <Field name={`compliance.${index}.remarks`}
                                     className="form-input"/>
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
              <h3 className="form-section-title">Observations & Actions</h3>
              <div className="form-fields">

                <div className="form-field full-width">
                  <label className="form-label">Overall Observations</label>
                  {isPrintMode
                    ? <div className="print-value">{values.overallObservations}</div>
                    : <Field as="textarea"
                             name="overallObservations"
                             className="form-textarea"
                             rows="3"/>
                  }
                </div>

                <div className="form-field full-width">
                  <label className="form-label">Corrective Actions Required</label>
                  {isPrintMode
                    ? <div className="print-value">{values.correctiveActionsRequired}</div>
                    : <Field as="textarea"
                             name="correctiveActionsRequired"
                             className="form-textarea"
                             rows="3"/>
                  }
                </div>

              </div>
            </div>

            {/* Sign-off */}
            <div className="form-section">
              <h3 className="form-section-title">Verification & Sign-off</h3>
              <div className="form-fields">
                {field(values,'checkedBy','Checked By (Name)')}
                {field(values,'checkedByDesignation','Designation')}
                {field(values,'verifiedBy','Verified By (Name)')}
                {field(values,'verifiedByDesignation','Designation')}
              </div>
            </div>

            {/* Universal Components */}
            <FormAttachments />
            <FormCustomFields />
            <FormSignatures />

            {!isPrintMode && (
              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  Save Checklist
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

export default PrincipalEmployerComplianceChecklist;
