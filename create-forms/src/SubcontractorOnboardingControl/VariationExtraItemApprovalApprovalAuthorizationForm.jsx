// VariationExtraItemApprovalApprovalAuthorizationForm.jsx
// FRM-01169 – Variation / Extra Item Approval Form

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
  variationRequestNo: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  estimatedCostImpact: Yup.string().required('Required')
});

const initialValues = {

  department: 'Subcontractor & Contracting',
  process: 'Measurement, Billing & Payments',

  // Project Details
  projectName: '',
  projectLocation: '',
  subcontractorName: '',
  workOrderNo: '',
  requestDate: '',

  // Variation Details
  variationRequestNo: '',
  description: '',
  reasonForVariation: '',
  scopeImpact: '',

  // Cost & Time Impact
  estimatedQuantity: '',
  unitRate: '',
  estimatedCostImpact: '',
  timeImpactDays: '',

  // Justification
  technicalJustification: '',
  commercialJustification: '',

  // Recommendation
  recommendedBy: '',
  recommendedDate: '',

  // Approval
  reviewedBy: '',
  reviewedDate: '',
  approvedBy: '',
  approvalStatus: '',
  approvedDate: '',
  clientApprovalName: '',
  clientApprovalDate: '',

  attachments: [],
  customFields: [],
  signatures: []
};

const yesNoField = (name, label) => (
  <div className="form-field">
    <label className="form-label required">{label}</label>
    <Field as="select" name={name} className="form-input">
      <option value="">-- Select --</option>
      <option value="Approved">Approved</option>
      <option value="Rejected">Rejected</option>
    </Field>
  </div>
);

const VariationExtraItemApprovalForm = () => {

  const { isPrintMode } = usePrintMode();

  return (

    <ModernFormWrapper
      formId="FRM-01169"
      title="Variation / Extra Item Approval Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert('Variation Approval Saved');
        }}
      >

      {({ values })=>(
        <Form>

          <ModernA4Template
            formId="FRM-01169"
            title="Variation / Extra Item Approval Form"
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
                <Field name="requestDate" type="date" className="form-input"/>
              </div>
            </div>

            {/* Variation Details */}
            <div className="form-section">
              <h3 className="form-section-title">Variation / Extra Item Details</h3>
              <div className="form-fields">
                <Field name="variationRequestNo" placeholder="Variation Request No" className="form-input"/>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Description of Variation / Extra Item"
                  className="form-textarea"
                />
                <Field
                  as="textarea"
                  name="reasonForVariation"
                  placeholder="Reason for Variation"
                  className="form-textarea"
                />
                <Field
                  as="textarea"
                  name="scopeImpact"
                  placeholder="Impact on Scope"
                  className="form-textarea"
                />
              </div>
            </div>

            {/* Cost & Time Impact */}
            <div className="form-section">
              <h3 className="form-section-title">Cost & Time Impact</h3>
              <div className="form-fields">
                <Field name="estimatedQuantity" placeholder="Estimated Quantity" className="form-input"/>
                <Field name="unitRate" placeholder="Unit Rate" className="form-input"/>
                <Field name="estimatedCostImpact" placeholder="Estimated Cost Impact" className="form-input"/>
                <Field name="timeImpactDays" placeholder="Time Impact (Days)" className="form-input"/>
              </div>
            </div>

            {/* Justification */}
            <div className="form-section">
              <h3 className="form-section-title">Justification</h3>
              <div className="form-fields">
                <Field
                  as="textarea"
                  name="technicalJustification"
                  placeholder="Technical Justification"
                  className="form-textarea"
                />
                <Field
                  as="textarea"
                  name="commercialJustification"
                  placeholder="Commercial Justification"
                  className="form-textarea"
                />
              </div>
            </div>

            {/* Recommendation */}
            <div className="form-section">
              <h3 className="form-section-title">Recommendation</h3>
              <div className="form-fields">
                <Field name="recommendedBy" placeholder="Recommended By" className="form-input"/>
                <Field name="recommendedDate" type="date" className="form-input"/>
              </div>
            </div>

            {/* Approval */}
            <div className="form-section">
              <h3 className="form-section-title">Approval</h3>
              <div className="form-fields">
                <Field name="reviewedBy" placeholder="Reviewed By" className="form-input"/>
                <Field name="reviewedDate" type="date" className="form-input"/>

                <Field name="approvedBy" placeholder="Approved By" className="form-input"/>
                {yesNoField('approvalStatus','Approval Status')}
                <Field name="approvedDate" type="date" className="form-input"/>

                <Field name="clientApprovalName" placeholder="Client Approval Name" className="form-input"/>
                <Field name="clientApprovalDate" type="date" className="form-input"/>
              </div>
            </div>

            {/* Shared Components */}
            <FormAttachments/>
            <FormCustomFields/>
            <FormSignatures/>

            {!isPrintMode &&
              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  Submit Variation
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

export default VariationExtraItemApprovalForm;
