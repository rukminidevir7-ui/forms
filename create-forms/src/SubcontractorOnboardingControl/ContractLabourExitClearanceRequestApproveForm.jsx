// ContractLabourExitClearanceRequestApproveForm.jsx
// FRM-01160 / FRM-01161 – Contract Labour Exit Clearance Form

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
  workerName: Yup.string().required('Required')
});

const initialValues = {

  formNo: 'FRM-01160 / FRM-01161',
  department: 'Subcontractor & Contracting',
  process: 'Contract Labour & Site Compliance',
  formType: 'Initiation / Approval',

  projectName: '',
  projectLocation: '',
  subcontractorName: '',

  // Labour Details
  workerName: '',
  employeeId: '',
  tradeDesignation: '',
  dateOfJoining: '',
  lastWorkingDate: '',
  reasonForExit: '',

  // Clearance Checklist
  clearanceItems: [
    { id: uuidv4(), item: 'ID Card Returned', cleared: '', remarks: '' },
    { id: uuidv4(), item: 'Tools / Equipment Returned', cleared: '', remarks: '' },
    { id: uuidv4(), item: 'Safety Gear Returned', cleared: '', remarks: '' },
    { id: uuidv4(), item: 'Final Wages Settled', cleared: '', remarks: '' },
    { id: uuidv4(), item: 'Accommodation Cleared', cleared: '', remarks: '' },
    { id: uuidv4(), item: 'No Pending Dues', cleared: '', remarks: '' },
    { id: uuidv4(), item: 'Site Clearance Given', cleared: '', remarks: '' }
  ],

  overallRemarks: '',

  attachments: [],
  customFields: [],
  signatures: []
};

const ContractLabourExitClearanceRequestApproveForm = () => {

  const { isPrintMode } = usePrintMode();

  return (

    <ModernFormWrapper
      formId="FRM-01160 / FRM-01161"
      title="Contract Labour Exit Clearance Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert('Exit Clearance Form Saved');
        }}
      >

      {({ values }) => (

        <Form>

          <ModernA4Template
            formId={values.formNo}
            title="Contract Labour Exit Clearance Form"
            department={values.department}
          >

            {/* Project Information */}
            <div className="form-section">
              <h3 className="form-section-title">Project Information</h3>
              <div className="form-fields">
                <Field name="projectName" placeholder="Project Name" className="form-input"/>
                <Field name="projectLocation" placeholder="Project Location" className="form-input"/>
                <Field name="subcontractorName" placeholder="Subcontractor Name" className="form-input"/>
              </div>
            </div>

            {/* Labour Details */}
            <div className="form-section">
              <h3 className="form-section-title">Labour Details</h3>
              <div className="form-fields">
                <Field name="workerName" placeholder="Worker Name" className="form-input"/>
                <Field name="employeeId" placeholder="Employee / ID No" className="form-input"/>
                <Field name="tradeDesignation" placeholder="Trade / Designation" className="form-input"/>
                <Field name="dateOfJoining" type="date" className="form-input"/>
                <Field name="lastWorkingDate" type="date" className="form-input"/>
              </div>

              <Field
                as="textarea"
                name="reasonForExit"
                rows="3"
                className="form-textarea"
                placeholder="Reason for Exit"
              />
            </div>

            {/* Clearance Checklist Table */}
            <div className="form-section">
              <h3 className="form-section-title">Clearance Checklist</h3>

              <table className="modern-table">
                <thead>
                  <tr>
                    <th>Clearance Item</th>
                    <th>Cleared (Y/N)</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {values.clearanceItems.map((item, index) => (
                    <tr key={item.id}>
                      <td>{item.item}</td>
                      <td>
                        <Field
                          as="select"
                          name={`clearanceItems.${index}.cleared`}
                          className="form-input"
                        >
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </Field>
                      </td>
                      <td>
                        <Field
                          name={`clearanceItems.${index}.remarks`}
                          className="form-input"
                          placeholder="Remarks"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>

            {/* Overall Remarks */}
            <div className="form-section">
              <h3 className="form-section-title">Overall Remarks</h3>
              <Field
                as="textarea"
                name="overallRemarks"
                rows="3"
                className="form-textarea"
              />
            </div>

            {/* Shared Components */}
            <FormAttachments />
            <FormCustomFields />
            <FormSignatures />

            {!isPrintMode &&
              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  Submit Exit Clearance
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

export default ContractLabourExitClearanceRequestApproveForm;
