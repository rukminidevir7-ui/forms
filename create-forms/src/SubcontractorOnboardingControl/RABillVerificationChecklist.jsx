// RABillVerificationChecklist.jsx
// FRM-01167 – RA Bill Verification Checklist

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

const initialChecklistItems = [
  'Measurement Sheet Attached',
  'Work Completion Certified',
  'Rates As Per Contract',
  'Quantities Verified',
  'Calculations Checked',
  'Supporting Documents Attached',
  'Previous Bill Adjustments Considered',
  'Retention / Deductions Applied',
  'Taxes Verified',
  'Approval Signatures Available'
];

const initialValues = {

  department: 'Subcontractor & Contracting',
  process: 'Measurement, Billing & Payments',

  projectName: '',
  projectLocation: '',
  subcontractorName: '',
  raBillNo: '',
  verificationDate: '',

  checklistItems: initialChecklistItems.map(item => ({
    id: uuidv4(),
    item,
    verified: '',
    remarks: ''
  })),

  overallRemarks: '',
  discrepancies: '',

  verifiedBy: '',
  verifiedDesignation: '',
  verifiedDate: '',

  approvedBy: '',
  approvedDesignation: '',
  approvedDate: '',

  attachments: [],
  customFields: [],
  signatures: []
};

const RABillVerificationChecklist = () => {

  const { isPrintMode } = usePrintMode();

  return (

    <ModernFormWrapper
      formId="FRM-01167"
      title="RA Bill Verification Checklist"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert('RA Bill Verification Saved');
        }}
      >

      {({ values })=>(
        <Form>

          <ModernA4Template
            formId="FRM-01167"
            title="RA Bill Verification Checklist"
            department={values.department}
          >

            {/* Project Details */}
            <div className="form-section">
              <h3 className="form-section-title">Project / Bill Details</h3>
              <div className="form-fields">
                <Field name="projectName" placeholder="Project Name" className="form-input"/>
                <Field name="projectLocation" placeholder="Project Location" className="form-input"/>
                <Field name="subcontractorName" placeholder="Subcontractor Name" className="form-input"/>
                <Field name="raBillNo" placeholder="RA Bill No" className="form-input"/>
                <Field name="verificationDate" type="date" className="form-input"/>
              </div>
            </div>

            {/* Checklist Table */}
            <div className="form-section">
              <h3 className="form-section-title">Verification Checklist</h3>

              <table className="modern-table">
                <thead>
                  <tr>
                    <th>Verification Item</th>
                    <th>Verified (Y/N)</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>

                  {values.checklistItems.map((row,index)=>(
                    <tr key={row.id}>
                      <td>{row.item}</td>

                      <td>
                        <Field
                          as="select"
                          name={`checklistItems.${index}.verified`}
                          className="form-input"
                        >
                          <option value="">--</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </Field>
                      </td>

                      <td>
                        <Field
                          name={`checklistItems.${index}.remarks`}
                          className="form-input"
                        />
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>

            </div>

            {/* Remarks */}
            <div className="form-section">
              <h3 className="form-section-title">Summary & Observations</h3>
              <div className="form-fields">
                <Field
                  as="textarea"
                  name="overallRemarks"
                  placeholder="Overall Remarks"
                  className="form-textarea"
                />
                <Field
                  as="textarea"
                  name="discrepancies"
                  placeholder="Discrepancies Identified"
                  className="form-textarea"
                />
              </div>
            </div>

            {/* Verification Sign-off */}
            <div className="form-section">
              <h3 className="form-section-title">Verification Sign-off</h3>
              <div className="form-fields">
                <Field name="verifiedBy" placeholder="Verified By (Name)" className="form-input"/>
                <Field name="verifiedDesignation" placeholder="Designation" className="form-input"/>
                <Field name="verifiedDate" type="date" className="form-input"/>

                <Field name="approvedBy" placeholder="Approved By (Name)" className="form-input"/>
                <Field name="approvedDesignation" placeholder="Designation" className="form-input"/>
                <Field name="approvedDate" type="date" className="form-input"/>
              </div>
            </div>

            {/* Shared Components */}
            <FormAttachments/>
            <FormCustomFields/>
            <FormSignatures/>

            {!isPrintMode &&
              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  Save Verification
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

export default RABillVerificationChecklist;
