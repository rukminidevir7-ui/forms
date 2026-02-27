// RABillApprovalForm.jsx
// FRM-01168 – RA Bill Approval Form

import React from 'react';
import { Formik, Form, Field } from 'formik';
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
  subcontractorName: Yup.string().required('Required'),
  raBillNo: Yup.string().required('Required'),
  netPayable: Yup.string().required('Required')
});

const initialValues = {

  department: 'Subcontractor & Contracting',
  process: 'Measurement, Billing & Payments',

  // Project Details
  projectName: '',
  projectLocation: '',
  subcontractorName: '',
  workOrderNo: '',

  // Bill Info
  raBillNo: '',
  billingPeriod: '',
  submissionDate: '',
  invoiceNo: '',
  grossAmount: '',
  deductions: '',
  netPayable: '',

  // Verification Summary
  measurementVerified: '',
  ratesVerified: '',
  calculationsChecked: '',
  documentsVerified: '',
  previousAdjustmentsConsidered: '',

  comments: '',

  // Sign-off
  preparedBy: '',
  preparedDate: '',
  checkedBy: '',
  checkedDate: '',
  approvedBy: '',
  approvedDate: '',
  clientRepresentative: '',
  clientDate: '',

  attachments: [],
  customFields: [],
  signatures: []
};

const yesNoField = (name, label) => (
  <div className="form-field">
    <label className="form-label required">{label}</label>
    <Field as="select" name={name} className="form-input">
      <option value="">-- Select --</option>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </Field>
  </div>
);

const RABillApprovalForm = () => {

  const { isPrintMode } = usePrintMode();

  return (

    <ModernFormWrapper
      formId="FRM-01168"
      title="RA Bill Approval Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert('RA Bill Approval Saved');
        }}
      >

      {({ values })=>(
        <Form>

          <ModernA4Template
            formId="FRM-01168"
            title="RA Bill Approval Form"
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
              </div>
            </div>

            {/* Bill Information */}
            <div className="form-section">
              <h3 className="form-section-title">Bill Information</h3>
              <div className="form-fields">
                <Field name="raBillNo" placeholder="RA Bill No" className="form-input"/>
                <Field name="billingPeriod" placeholder="Billing Period" className="form-input"/>
                <Field name="submissionDate" type="date" className="form-input"/>
                <Field name="invoiceNo" placeholder="Invoice No" className="form-input"/>
                <Field name="grossAmount" placeholder="Gross Amount" className="form-input"/>
                <Field name="deductions" placeholder="Deductions" className="form-input"/>
                <Field name="netPayable" placeholder="Net Payable" className="form-input"/>
              </div>
            </div>

            {/* Verification Summary */}
            <div className="form-section">
              <h3 className="form-section-title">Verification Summary</h3>
              <div className="form-fields">
                {yesNoField('measurementVerified','Measurement Verified')}
                {yesNoField('ratesVerified','Rates Verified')}
                {yesNoField('calculationsChecked','Calculations Checked')}
                {yesNoField('documentsVerified','Supporting Documents Verified')}
                {yesNoField('previousAdjustmentsConsidered','Previous Adjustments Considered')}
              </div>
            </div>

            {/* Remarks */}
            <div className="form-section">
              <h3 className="form-section-title">Remarks</h3>
              <div className="form-fields">
                <Field
                  as="textarea"
                  name="comments"
                  placeholder="Comments"
                  className="form-textarea"
                />
              </div>
            </div>

            {/* Sign-off */}
            <div className="form-section">
              <h3 className="form-section-title">Approval Sign-off</h3>
              <div className="form-fields">
                <Field name="preparedBy" placeholder="Prepared By" className="form-input"/>
                <Field name="preparedDate" type="date" className="form-input"/>

                <Field name="checkedBy" placeholder="Checked By" className="form-input"/>
                <Field name="checkedDate" type="date" className="form-input"/>

                <Field name="approvedBy" placeholder="Approved By" className="form-input"/>
                <Field name="approvedDate" type="date" className="form-input"/>

                <Field name="clientRepresentative" placeholder="Client Representative" className="form-input"/>
                <Field name="clientDate" type="date" className="form-input"/>
              </div>
            </div>

            {/* Shared Components */}
            <FormAttachments/>
            <FormCustomFields/>
            <FormSignatures/>

            {!isPrintMode &&
              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  Approve Bill
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

export default RABillApprovalForm;
