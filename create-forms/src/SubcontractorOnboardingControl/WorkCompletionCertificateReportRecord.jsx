// WorkCompletionCertificateReportRecord.jsx
// FRM-01184 – Work Completion Certificate

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
  certificateNo: Yup.string().required('Required')
});

const initialValues = {

  formNo: 'FRM-01184',
  department: 'Subcontractor & Contracting',
  process: 'Measurement, Billing & Payments',
  formType: 'Certificate',

  // Project Details
  projectName: '',
  projectLocation: '',
  subcontractorName: '',
  workOrderNo: '',

  // Certificate Details
  certificateNo: '',
  certificateDate: '',
  workDescription: '',
  scopeCovered: '',
  startDate: '',
  completionDate: '',
  originalContractDuration: '',
  actualDuration: '',

  // Remarks
  remarks: '',
  pendingItems: '',

  // Shared enterprise components
  attachments: [],
  customFields: [],
  signatures: []
};

const WorkCompletionCertificateReportRecord = () => {

  const { isPrintMode } = usePrintMode();

  return (

    <ModernFormWrapper
      formId="FRM-01184"
      title="Work Completion Certificate"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert('Work Completion Certificate Saved');
        }}
      >

      {({ values }) => (

        <Form>

          <ModernA4Template
            formId={values.formNo}
            title="Work Completion Certificate"
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
              </div>
            </div>

            {/* Certificate Details */}
            <div className="form-section">
              <h3 className="form-section-title">Certificate Details</h3>
              <div className="form-fields">
                <Field name="certificateNo" placeholder="Certificate No" className="form-input"/>
                <Field name="certificateDate" type="date" className="form-input"/>
                <Field name="startDate" type="date" className="form-input"/>
                <Field name="completionDate" type="date" className="form-input"/>
                <Field name="originalContractDuration" placeholder="Original Contract Duration" className="form-input"/>
                <Field name="actualDuration" placeholder="Actual Duration" className="form-input"/>
              </div>

              <div className="form-fields">
                <Field
                  as="textarea"
                  name="workDescription"
                  rows="3"
                  className="form-textarea"
                  placeholder="Work Description"
                />

                <Field
                  as="textarea"
                  name="scopeCovered"
                  rows="3"
                  className="form-textarea"
                  placeholder="Scope Covered"
                />
              </div>
            </div>

            {/* Certification Statement */}
            <div className="form-section">
              <h3 className="form-section-title">Certification Statement</h3>

              <div className="certificate-text">
                This is to certify that the above-mentioned works have been completed
                in accordance with the contract specifications and quality requirements,
                subject to final verification and closure of all contractual obligations.
              </div>
            </div>

            {/* Remarks */}
            <div className="form-section">
              <h3 className="form-section-title">Remarks / Observations</h3>

              <Field
                as="textarea"
                name="remarks"
                rows="3"
                className="form-textarea"
                placeholder="Remarks / Observations"
              />

              <Field
                as="textarea"
                name="pendingItems"
                rows="3"
                className="form-textarea"
                placeholder="Pending Items (if any)"
              />
            </div>

            {/* Enterprise Shared Components */}
            <FormAttachments />
            <FormCustomFields />
            <FormSignatures />

            {!isPrintMode &&
              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  Save Work Completion Certificate
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

export default WorkCompletionCertificateReportRecord;
