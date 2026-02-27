// BillingDisputeResolutionReportRecord.jsx
// FRM-01188 – Billing Dispute Resolution Form

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
  disputeReferenceNo: Yup.string().required('Required')
});

const initialValues = {

  formNo: 'FRM-01188',
  department: 'Subcontractor & Contracting',
  process: 'Measurement, Billing & Payments',
  formType: 'Resolution',

  // Project / Contract Details
  projectName: '',
  projectLocation: '',
  subcontractorName: '',
  workOrderNo: '',
  disputeReferenceNo: '',
  disputeDate: '',

  // Bill Information
  billReference: '',
  billingPeriod: '',
  claimAmount: '',
  disputedAmount: '',

  // Dispute Details
  disputeDescription: '',
  disputeReason: '',
  supportingEvidence: '',

  // Resolution Details
  resolutionSummary: '',
  agreedAmount: '',
  adjustmentMethod: '',
  resolutionDate: '',

  // Remarks
  comments: '',

  attachments: [],
  customFields: [],
  signatures: []
};

const BillingDisputeResolutionReportRecord = () => {

  const { isPrintMode } = usePrintMode();

  return (

    <ModernFormWrapper
      formId="FRM-01188"
      title="Billing Dispute Resolution Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert('Billing Dispute Resolution Saved');
        }}
      >

      {({ values }) => (

        <Form>

          <ModernA4Template
            formId={values.formNo}
            title="Billing Dispute Resolution Form"
            department={values.department}
          >

            {/* Project / Contract Details */}
            <div className="form-section">
              <h3 className="form-section-title">Project / Contract Details</h3>
              <div className="form-fields">
                <Field name="projectName" placeholder="Project Name" className="form-input"/>
                <Field name="projectLocation" placeholder="Project Location" className="form-input"/>
                <Field name="subcontractorName" placeholder="Subcontractor Name" className="form-input"/>
                <Field name="workOrderNo" placeholder="Work Order / Contract No" className="form-input"/>
                <Field name="disputeReferenceNo" placeholder="Dispute Reference No" className="form-input"/>
                <Field name="disputeDate" type="date" className="form-input"/>
              </div>
            </div>

            {/* Bill Information */}
            <div className="form-section">
              <h3 className="form-section-title">Bill Information</h3>
              <div className="form-fields">
                <Field name="billReference" placeholder="RA / Final Bill Ref" className="form-input"/>
                <Field name="billingPeriod" placeholder="Billing Period" className="form-input"/>
                <Field name="claimAmount" placeholder="Claim Amount" className="form-input"/>
                <Field name="disputedAmount" placeholder="Disputed Amount" className="form-input"/>
              </div>
            </div>

            {/* Dispute Details */}
            <div className="form-section">
              <h3 className="form-section-title">Dispute Details</h3>

              <Field
                as="textarea"
                name="disputeDescription"
                rows="3"
                className="form-textarea"
                placeholder="Description of Dispute"
              />

              <Field
                as="textarea"
                name="disputeReason"
                rows="3"
                className="form-textarea"
                placeholder="Reason for Dispute"
              />

              <Field
                as="textarea"
                name="supportingEvidence"
                rows="3"
                className="form-textarea"
                placeholder="Supporting Evidence"
              />

            </div>

            {/* Resolution Details */}
            <div className="form-section">
              <h3 className="form-section-title">Resolution Details</h3>

              <Field
                as="textarea"
                name="resolutionSummary"
                rows="3"
                className="form-textarea"
                placeholder="Resolution Summary"
              />

              <div className="form-fields">
                <Field name="agreedAmount" placeholder="Agreed Amount" className="form-input"/>
                <Field name="adjustmentMethod" placeholder="Adjustment Method" className="form-input"/>
                <Field name="resolutionDate" type="date" className="form-input"/>
              </div>

            </div>

            {/* Remarks */}
            <div className="form-section">
              <h3 className="form-section-title">Remarks</h3>

              <Field
                as="textarea"
                name="comments"
                rows="3"
                className="form-textarea"
                placeholder="Comments"
              />
            </div>

            {/* Shared Components */}
            <FormAttachments />
            <FormCustomFields />
            <FormSignatures />

            {!isPrintMode &&
              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  Save Dispute Resolution
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

export default BillingDisputeResolutionReportRecord;
