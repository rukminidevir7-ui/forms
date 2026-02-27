// SubcontractorCAPARequestApprovalForm.jsx
// FRM-01127 / FRM-01128 – Subcontractor CAPA Form

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

  // Subcontractor Info
  companyName: Yup.string().required('Required'),
  projectName: Yup.string().required('Required'),
  projectLocation: Yup.string().required('Required'),
  capaReferenceNo: Yup.string().required('Required'),
  dateRaised: Yup.string().required('Required'),

  // Issue
  referenceSource: Yup.string().required('Required'),
  descriptionOfNonconformance: Yup.string().required('Required'),
  dateOfOccurrence: Yup.string().required('Required'),
  severityLevel: Yup.string().required('Required'),

  // Root Cause
  rootCauseIdentified: Yup.string().required('Required'),
  methodUsed: Yup.string().required('Required'),

  // Corrective Action
  correctiveActions: Yup.string().required('Required'),
  correctiveResponsiblePerson: Yup.string().required('Required'),
  correctiveTargetDate: Yup.string().required('Required'),

  // Preventive Action
  preventiveActions: Yup.string().required('Required'),
  preventiveResponsiblePerson: Yup.string().required('Required'),
  preventiveTargetDate: Yup.string().required('Required'),

  // Verification
  verificationMethod: Yup.string().required('Required'),
  verificationDate: Yup.string().required('Required'),
  effectivenessStatus: Yup.string().required('Required'),
  verificationRemarks: Yup.string().required('Required'),

  // Declaration
  raisedByName: Yup.string().required('Required'),
  raisedByDesignation: Yup.string().required('Required'),
  raisedDate: Yup.string().required('Required'),

  // Approval
  reviewedBy: Yup.string().required('Required'),
  reviewerDesignation: Yup.string().required('Required'),
  approvalStatus: Yup.string().required('Required'),
  approvalRemarks: Yup.string().required('Required'),
  approverName: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  companyName: '',
  projectName: '',
  projectLocation: '',
  capaReferenceNo: '',
  dateRaised: '',

  referenceSource: '',
  descriptionOfNonconformance: '',
  dateOfOccurrence: '',
  severityLevel: '',

  rootCauseIdentified: '',
  methodUsed: '',

  correctiveActions: '',
  correctiveResponsiblePerson: '',
  correctiveTargetDate: '',

  preventiveActions: '',
  preventiveResponsiblePerson: '',
  preventiveTargetDate: '',

  verificationMethod: '',
  verificationDate: '',
  effectivenessStatus: '',
  verificationRemarks: '',

  raisedByName: '',
  raisedByDesignation: '',
  raisedDate: '',

  reviewedBy: '',
  reviewerDesignation: '',
  approvalStatus: '',
  approvalRemarks: '',
  approverName: '',
  approvalDate: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const SubcontractorCAPARequestApprovalForm = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type = 'text') => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '___________________'}</div>
      ) : (
        <>
          <Field name={name} type={type} className="form-input" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  const textarea = (values, name, label) => (
    <div className="form-field full-width">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '___________________'}</div>
      ) : (
        <>
          <Field as="textarea" name={name} className="form-textarea" rows="3" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  const select = (values, name, label, options) => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '___________________'}</div>
      ) : (
        <>
          <Field as="select" name={name} className="form-input">
            <option value="">-- Select --</option>
            {options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </Field>
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (

    <ModernFormWrapper
      formId="FRM-01127 / FRM-01128"
      title="Subcontractor CAPA (Corrective & Preventive Action) Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('CAPA form submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-01127 / FRM-01128"
              title="Subcontractor CAPA Form"
              department="Subcontractor & Contracting"
            >

              {/* 1. Info */}
              <div className="form-section">
                <h3 className="form-section-title">Subcontractor Information</h3>
                <div className="form-fields">
                  {field(values,'companyName','Company Name')}
                  {field(values,'projectName','Project Name')}
                  {field(values,'projectLocation','Project Location')}
                  {field(values,'capaReferenceNo','CAPA Reference No')}
                  {field(values,'dateRaised','Date Raised','date')}
                </div>
              </div>

              {/* 2. Issue */}
              <div className="form-section">
                <h3 className="form-section-title">Issue Description</h3>
                <div className="form-fields">
                  {field(values,'referenceSource','Reference (Audit/Inspection/Notice)')}
                  {textarea(values,'descriptionOfNonconformance','Description of Nonconformance')}
                  {field(values,'dateOfOccurrence','Date of Occurrence','date')}
                  {select(values,'severityLevel','Severity Level',['Low','Medium','High'])}
                </div>
              </div>

              {/* 3. Root Cause */}
              <div className="form-section">
                <h3 className="form-section-title">Root Cause Analysis</h3>
                <div className="form-fields">
                  {textarea(values,'rootCauseIdentified','Root Cause Identified')}
                  {field(values,'methodUsed','Method Used (5 Why/Fishbone/etc)')}
                </div>
              </div>

              {/* 4. Corrective */}
              <div className="form-section">
                <h3 className="form-section-title">Corrective Action Plan</h3>
                <div className="form-fields">
                  {textarea(values,'correctiveActions','Corrective Actions')}
                  {field(values,'correctiveResponsiblePerson','Responsible Person')}
                  {field(values,'correctiveTargetDate','Target Completion Date','date')}
                </div>
              </div>

              {/* 5. Preventive */}
              <div className="form-section">
                <h3 className="form-section-title">Preventive Action Plan</h3>
                <div className="form-fields">
                  {textarea(values,'preventiveActions','Preventive Actions')}
                  {field(values,'preventiveResponsiblePerson','Responsible Person')}
                  {field(values,'preventiveTargetDate','Target Completion Date','date')}
                </div>
              </div>

              {/* 6. Verification */}
              <div className="form-section">
                <h3 className="form-section-title">Verification of Effectiveness</h3>
                <div className="form-fields">
                  {field(values,'verificationMethod','Verification Method')}
                  {field(values,'verificationDate','Verification Date','date')}
                  {select(values,'effectivenessStatus','Effectiveness Status',['Effective','Not Effective'])}
                  {textarea(values,'verificationRemarks','Remarks')}
                </div>
              </div>

              {/* 7. Declaration */}
              <div className="form-section">
                <h3 className="form-section-title">Requestor Declaration</h3>
                <div className="form-fields">
                  {field(values,'raisedByName','Raised By (Name)')}
                  {field(values,'raisedByDesignation','Designation')}
                  {field(values,'raisedDate','Date','date')}
                </div>
              </div>

              {/* 8. Approval */}
              <div className="form-section">
                <h3 className="form-section-title">Approval / Authorization</h3>
                <div className="form-fields">
                  {field(values,'reviewedBy','Reviewed By')}
                  {field(values,'reviewerDesignation','Designation')}
                  {select(values,'approvalStatus','Approved / Rejected',['Approved','Rejected'])}
                  {textarea(values,'approvalRemarks','Remarks')}
                  {field(values,'approverName','Approver Name')}
                  {field(values,'approvalDate','Date','date')}
                </div>
              </div>

              {/* Universal Components */}
              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit CAPA
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

export default SubcontractorCAPARequestApprovalForm;
