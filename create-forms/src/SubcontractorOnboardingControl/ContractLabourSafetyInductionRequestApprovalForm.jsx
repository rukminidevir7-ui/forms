// ContractLabourSafetyInductionRequestApprovalForm.jsx
// FRM-01142 / FRM-01143 – Contract Labour Safety Induction Form

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

const yesNo = ['Yes','No'];

const validationSchema = Yup.object({

  companyName: Yup.string().required('Required'),
  projectName: Yup.string().required('Required'),
  projectLocation: Yup.string().required('Required'),
  inductionDate: Yup.string().required('Required'),

  workerName: Yup.string().required('Required'),
  workerId: Yup.string().required('Required'),
  skillCategory: Yup.string().required('Required'),
  departmentArea: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),

  siteSafetyRules: Yup.string().required('Required'),
  ppeRequirements: Yup.string().required('Required'),
  emergencyProcedures: Yup.string().required('Required'),
  hazardIdentification: Yup.string().required('Required'),
  incidentReporting: Yup.string().required('Required'),

  workerUnderstanding: Yup.string().required('Required'),
  assessmentMethod: Yup.string().required('Required'),

  verifiedBy: Yup.string().required('Required'),
  verificationDate: Yup.string().required('Required'),
  attachmentRemarks: Yup.string(),

  trainerName: Yup.string().required('Required'),
  trainerDesignation: Yup.string().required('Required'),
  trainerDate: Yup.string().required('Required'),

  workerAcknowledgementName: Yup.string().required('Required'),
  workerAcknowledgementDate: Yup.string().required('Required'),

  approverName: Yup.string().required('Required'),
  approverDesignation: Yup.string().required('Required'),
  approvalStatus: Yup.string().required('Required'),
  approvalRemarks: Yup.string(),
  approvalDate: Yup.string().required('Required'),

  attachments: Yup.array(),
  customFields: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  companyName: '',
  projectName: '',
  projectLocation: '',
  inductionDate: '',

  workerName: '',
  workerId: '',
  skillCategory: '',
  departmentArea: '',
  contactNumber: '',

  siteSafetyRules: '',
  ppeRequirements: '',
  emergencyProcedures: '',
  hazardIdentification: '',
  incidentReporting: '',

  workerUnderstanding: '',
  assessmentMethod: '',

  verifiedBy: '',
  verificationDate: '',
  attachmentRemarks: '',

  trainerName: '',
  trainerDesignation: '',
  trainerDate: '',

  workerAcknowledgementName: '',
  workerAcknowledgementDate: '',

  approverName: '',
  approverDesignation: '',
  approvalStatus: '',
  approvalRemarks: '',
  approvalDate: '',

  attachments: [],
  customFields: [],
  signatures: []

};

const ContractLabourSafetyInductionRequestApprovalForm = () => {

  const { isPrintMode } = usePrintMode();

  const renderField = (values, name, label, type='text') => (
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

  const renderSelect = (values, name, label, options=yesNo) => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || '___________________'}</div>
        : <>
            <Field as="select" name={name} className="form-input">
              <option value="">-- Select --</option>
              {options.map(o => <option key={o} value={o}>{o}</option>)}
            </Field>
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return (

    <ModernFormWrapper
      formId="FRM-01142 / FRM-01143"
      title="Contract Labour Safety Induction Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert('Safety Induction Form Saved');
        }}
      >

        {({ values }) => (

          <Form>

            <ModernA4Template
              formId="FRM-01142 / FRM-01143"
              title="Contract Labour Safety Induction Form"
              department="Subcontractor & Contracting"
            >

              {/* Contractor / Project Info */}
              <div className="form-section">
                <h3 className="form-section-title">Contractor / Project Information</h3>
                <div className="form-fields">
                  {renderField(values,'companyName','Company Name')}
                  {renderField(values,'projectName','Project Name')}
                  {renderField(values,'projectLocation','Project Location')}
                  {renderField(values,'inductionDate','Induction Date','date')}
                </div>
              </div>

              {/* Worker Details */}
              <div className="form-section">
                <h3 className="form-section-title">Worker Details</h3>
                <div className="form-fields">
                  {renderField(values,'workerName','Worker Name')}
                  {renderField(values,'workerId','Employee / Worker ID')}
                  {renderField(values,'skillCategory','Skill Category')}
                  {renderField(values,'departmentArea','Department / Work Area')}
                  {renderField(values,'contactNumber','Contact Number')}
                </div>
              </div>

              {/* Safety Topics */}
              <div className="form-section">
                <h3 className="form-section-title">Safety Induction Topics Covered</h3>
                <div className="form-fields">
                  {renderSelect(values,'siteSafetyRules','Site Safety Rules Explained')}
                  {renderSelect(values,'ppeRequirements','PPE Requirements Explained')}
                  {renderSelect(values,'emergencyProcedures','Emergency Procedures Explained')}
                  {renderSelect(values,'hazardIdentification','Hazard Identification Explained')}
                  {renderSelect(values,'incidentReporting','Incident Reporting Process Explained')}
                </div>
              </div>

              {/* Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">Assessment / Understanding</h3>
                <div className="form-fields">
                  {renderSelect(values,'workerUnderstanding','Worker Understanding Confirmed')}
                  {renderField(values,'assessmentMethod','Assessment Method (Verbal/Test)')}
                </div>
              </div>

              {/* Attachments Section */}
              <div className="form-section">
                <h3 className="form-section-title">Attachments</h3>
                <div className="form-fields">
                  {renderField(values,'verifiedBy','Verified By')}
                  {renderField(values,'verificationDate','Verification Date','date')}
                  {renderField(values,'attachmentRemarks','Remarks')}
                </div>
              </div>

              {/* Trainer Details */}
              <div className="form-section">
                <h3 className="form-section-title">Trainer / Inductor Details</h3>
                <div className="form-fields">
                  {renderField(values,'trainerName','Trainer Name')}
                  {renderField(values,'trainerDesignation','Designation')}
                  {renderField(values,'trainerDate','Date','date')}
                </div>
              </div>

              {/* Worker Acknowledgement */}
              <div className="form-section">
                <h3 className="form-section-title">Worker Acknowledgement</h3>
                <div className="form-fields">
                  {renderField(values,'workerAcknowledgementName','Worker Name')}
                  {renderField(values,'workerAcknowledgementDate','Date','date')}
                </div>
              </div>

              {/* Approval */}
              <div className="form-section">
                <h3 className="form-section-title">Approval / Authorization</h3>
                <div className="form-fields">
                  {renderField(values,'approverName','Approver Name')}
                  {renderField(values,'approverDesignation','Designation')}
                  {renderSelect(values,'approvalStatus','Approved / Rejected',['Approved','Rejected'])}
                  {renderField(values,'approvalRemarks','Remarks')}
                  {renderField(values,'approvalDate','Date','date')}
                </div>
              </div>

              {/* Universal Enterprise Components */}
              <FormAttachments />
              <FormCustomFields />
              <FormSignatures />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Save Safety Induction Form
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

export default ContractLabourSafetyInductionRequestApprovalForm;
