// FinalBillChecklistChecklist.jsx
// FRM-01182 – Final Bill Checklist

import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormAttachments from '../components/FormAttachments';
import FormCustomFields from '../components/FormCustomFields';
import FormSignatures from '../components/FormSignatures';
import '../styles/FRM00611.css';

const checklistItems = [
  'Final Measurement Sheet Attached',
  'All RA Bills Reconciled',
  'Retention Calculated / Released',
  'Advance Fully Recovered',
  'LD / Penalties Applied',
  'Backcharges Considered',
  'All Supporting Documents Attached',
  'Tax / Invoice Documents Verified',
  'No Pending Claims',
  'Client Clearance Obtained'
];

const validationSchema = Yup.object({
  projectName: Yup.string().required('Required'),
  subcontractorName: Yup.string().required('Required'),
  finalBillNo: Yup.string().required('Required')
});

const initialValues = {

  formNo: 'FRM-01182',
  department: 'Subcontractor & Contracting',
  process: 'Measurement, Billing & Payments',

  projectName: '',
  projectLocation: '',
  subcontractorName: '',
  finalBillNo: '',
  checklistDate: '',

  checklist: checklistItems.map(item => ({
    item,
    completed: '',
    remarks: ''
  })),

  overallRemarks: '',
  pendingItems: '',

  attachments: [],
  customFields: [],
  signatures: []
};

const FinalBillChecklistChecklist = () => {

  const { isPrintMode } = usePrintMode();

  return (

    <ModernFormWrapper
      formId="FRM-01182"
      title="Final Bill Checklist"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert('Final Bill Checklist Saved');
        }}
      >

      {({ values }) => (

        <Form>

          <ModernA4Template
            formId={values.formNo}
            title="Final Bill Checklist"
            department={values.department}
          >

            {/* Project Details */}
            <div className="form-section">
              <h3 className="form-section-title">Project Details</h3>
              <div className="form-fields">
                <Field name="projectName" placeholder="Project Name" className="form-input"/>
                <Field name="projectLocation" placeholder="Project Location" className="form-input"/>
                <Field name="subcontractorName" placeholder="Subcontractor Name" className="form-input"/>
                <Field name="finalBillNo" placeholder="Final Bill No" className="form-input"/>
                <Field name="checklistDate" type="date" className="form-input"/>
              </div>
            </div>

            {/* Checklist Table */}
            <div className="form-section">
              <h3 className="form-section-title">Checklist Verification</h3>

              <FieldArray name="checklist">
                {() => (
                  <table className="modern-table">
                    <thead>
                      <tr>
                        <th>Checklist Item</th>
                        <th>Completed (Y/N)</th>
                        <th>Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {values.checklist.map((row, index) => (
                        <tr key={index}>
                          <td>{row.item}</td>

                          <td>
                            <Field
                              as="select"
                              name={`checklist.${index}.completed`}
                              className="form-input"
                            >
                              <option value="">-- Select --</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Field>
                          </td>

                          <td>
                            <Field
                              name={`checklist.${index}.remarks`}
                              className="form-input"
                              placeholder="Remarks"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </FieldArray>

            </div>

            {/* Remarks Section */}
            <div className="form-section">
              <h3 className="form-section-title">Remarks</h3>
              <Field
                as="textarea"
                name="overallRemarks"
                className="form-textarea"
                rows="3"
                placeholder="Overall Remarks"
              />

              <Field
                as="textarea"
                name="pendingItems"
                className="form-textarea"
                rows="3"
                placeholder="Pending Items (if any)"
              />
            </div>

            {/* Shared Enterprise Components */}
            <FormAttachments />
            <FormCustomFields />
            <FormSignatures />

            {!isPrintMode &&
              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  Save Final Bill Checklist
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

export default FinalBillChecklistChecklist;
