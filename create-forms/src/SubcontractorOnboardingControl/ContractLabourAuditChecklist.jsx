// ContractLabourAuditChecklist.jsx
// FRM-01159 – Contract Labour Audit Checklist

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
  contractorName: Yup.string().required('Required'),
  auditDate: Yup.string().required('Required'),
  auditorName: Yup.string().required('Required')

});

const auditItems = [
  'Labour License Valid',
  'PF Compliance Verified',
  'ESI Compliance Verified',
  'Wage Records Maintained',
  'Attendance Records Available',
  'Safety Training Conducted',
  'PPE Compliance',
  'Insurance Coverage Valid',
  'Statutory Registers Maintained',
  'Worker ID / Badge Issued',
  'Grievance Mechanism Available'
];

const initialValues = {

  department: 'Subcontractor & Contracting',
  process: 'Contract Labour & Site Compliance',
  formType: 'Checklist',

  projectName: '',
  projectLocation: '',
  contractorName: '',
  auditDate: '',
  auditorName: '',

  auditChecklist: auditItems.map(item => ({
    item,
    status: '',
    remarks: ''
  })),

  overallFindings: '',
  nonconformitiesIdentified: '',
  correctiveActionsRequired: '',

  attachments: [],
  customFields: [],
  signatures: []

};

const ContractLabourAuditChecklist = () => {

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
      formId="FRM-01159"
      title="Contract Labour Audit Checklist"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert('Contract Labour Audit Checklist Saved');
        }}
      >

      {({values})=>(
        <Form>

          <ModernA4Template
            formId="FRM-01159"
            title="Contract Labour Audit Checklist"
            department={values.department}
          >

            {/* Project Info */}
            <div className="form-section">
              <h3 className="form-section-title">Audit Information</h3>
              <div className="form-fields">
                {field(values,'projectName','Project Name')}
                {field(values,'projectLocation','Project Location')}
                {field(values,'contractorName','Contractor / Subcontractor Name')}
                {field(values,'auditDate','Audit Date','date')}
                {field(values,'auditorName','Auditor Name')}
              </div>
            </div>

            {/* Audit Table */}
            <div className="form-section">
              <h3 className="form-section-title">Audit Checklist</h3>

              <div className="table-responsive">
                <table className="modern-table">
                  <thead>
                    <tr>
                      <th>Audit Item</th>
                      <th>Compliant (Y/N)</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>

                    {values.auditChecklist.map((row,index)=>(
                      <tr key={index}>

                        <td>{row.item}</td>

                        <td>
                          {isPrintMode
                            ? row.status
                            : <Field as="select"
                                     name={`auditChecklist.${index}.status`}
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
                            : <Field name={`auditChecklist.${index}.remarks`}
                                     className="form-input"/>
                          }
                        </td>

                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            </div>

            {/* Findings */}
            <div className="form-section">
              <h3 className="form-section-title">Audit Findings</h3>

              <div className="form-fields">

                <div className="form-field full-width">
                  <label className="form-label">Overall Findings</label>
                  {isPrintMode
                    ? <div className="print-value">{values.overallFindings}</div>
                    : <Field as="textarea"
                             name="overallFindings"
                             className="form-textarea"
                             rows="3"/>
                  }
                </div>

                <div className="form-field full-width">
                  <label className="form-label">Nonconformities Identified</label>
                  {isPrintMode
                    ? <div className="print-value">{values.nonconformitiesIdentified}</div>
                    : <Field as="textarea"
                             name="nonconformitiesIdentified"
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

            {/* Universal Components */}
            <FormAttachments />
            <FormCustomFields />
            <FormSignatures />

            {!isPrintMode && (
              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  Save Audit
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

export default ContractLabourAuditChecklist;
