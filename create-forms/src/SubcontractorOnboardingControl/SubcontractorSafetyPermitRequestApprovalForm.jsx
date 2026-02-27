// SubcontractorSafetyPermitRequestApprovalForm.jsx
// FRM-01145 / FRM-01146 – Subcontractor Safety Permit Form

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
const riskLevels = ['Low','Medium','High'];

const validationSchema = Yup.object({

  projectName: Yup.string().required('Required'),
  projectLocation: Yup.string().required('Required'),
  clientName: Yup.string().required('Required'),
  permitRequestDate: Yup.string().required('Required'),
  workStartDate: Yup.string().required('Required'),
  workEndDate: Yup.string().required('Required'),

  companyName: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  phoneNumber: Yup.string().required('Required'),
  emailId: Yup.string().email('Invalid').required('Required'),

  workType: Yup.string().required('Required'),
  detailedWorkDescription: Yup.string().required('Required'),
  workLocationArea: Yup.string().required('Required'),
  numberOfWorkers: Yup.string().required('Required'),

  potentialHazards: Yup.string().required('Required'),
  riskLevel: Yup.string().required('Required'),
  controlMeasures: Yup.string().required('Required'),

  ppeProvided: Yup.string().required('Required'),
  safetyInductionCompleted: Yup.string().required('Required'),
  toolboxTalkConducted: Yup.string().required('Required'),
  emergencyPreparedness: Yup.string().required('Required'),
  permitDisplayed: Yup.string().required('Required'),

  verifiedBy: Yup.string().required('Required'),
  verificationDate: Yup.string().required('Required'),
  attachmentRemarks: Yup.string(),

  requestedBy: Yup.string().required('Required'),
  requesterDesignation: Yup.string().required('Required'),
  requesterDate: Yup.string().required('Required'),

  safetyOfficerName: Yup.string().required('Required'),
  safetyOfficerDesignation: Yup.string().required('Required'),
  safetyApprovalStatus: Yup.string().required('Required'),
  safetyConditions: Yup.string(),
  safetyApprovalDate: Yup.string().required('Required'),

  finalApproverName: Yup.string().required('Required'),
  finalApproverDesignation: Yup.string().required('Required'),
  finalApprovalDate: Yup.string().required('Required'),

  attachments: Yup.array(),
  customFields: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  projectName: '',
  projectLocation: '',
  clientName: '',
  permitRequestDate: '',
  workStartDate: '',
  workEndDate: '',

  companyName: '',
  contactPerson: '',
  phoneNumber: '',
  emailId: '',

  workType: '',
  detailedWorkDescription: '',
  workLocationArea: '',
  numberOfWorkers: '',

  potentialHazards: '',
  riskLevel: '',
  controlMeasures: '',

  ppeProvided: '',
  safetyInductionCompleted: '',
  toolboxTalkConducted: '',
  emergencyPreparedness: '',
  permitDisplayed: '',

  verifiedBy: '',
  verificationDate: '',
  attachmentRemarks: '',

  requestedBy: '',
  requesterDesignation: '',
  requesterDate: '',

  safetyOfficerName: '',
  safetyOfficerDesignation: '',
  safetyApprovalStatus: '',
  safetyConditions: '',
  safetyApprovalDate: '',

  finalApproverName: '',
  finalApproverDesignation: '',
  finalApprovalDate: '',

  attachments: [],
  customFields: [],
  signatures: []

};

const SubcontractorSafetyPermitRequestApprovalForm = () => {

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

  const renderSelect = (values, name, label, options) => (
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
      formId="FRM-01145 / FRM-01146"
      title="Subcontractor Safety Permit Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert('Safety Permit Form Saved');
        }}
      >

        {({ values }) => (

          <Form>

            <ModernA4Template
              formId="FRM-01145 / FRM-01146"
              title="Subcontractor Safety Permit Form"
              department="Subcontractor & Contracting"
            >

              {/* Project Info */}
              <div className="form-section">
                <h3 className="form-section-title">Project / Work Information</h3>
                <div className="form-fields">
                  {renderField(values,'projectName','Project Name')}
                  {renderField(values,'projectLocation','Project Location')}
                  {renderField(values,'clientName','Client Name')}
                  {renderField(values,'permitRequestDate','Permit Request Date','date')}
                  {renderField(values,'workStartDate','Work Start Date','date')}
                  {renderField(values,'workEndDate','Work End Date','date')}
                </div>
              </div>

              {/* Subcontractor Details */}
              <div className="form-section">
                <h3 className="form-section-title">Subcontractor Details</h3>
                <div className="form-fields">
                  {renderField(values,'companyName','Company Name')}
                  {renderField(values,'contactPerson','Contact Person')}
                  {renderField(values,'phoneNumber','Phone Number')}
                  {renderField(values,'emailId','Email ID')}
                </div>
              </div>

              {/* Work Description */}
              <div className="form-section">
                <h3 className="form-section-title">Work Description</h3>
                <div className="form-fields">
                  {renderField(values,'workType','Type of Work')}
                  {renderField(values,'detailedWorkDescription','Detailed Work Description')}
                  {renderField(values,'workLocationArea','Work Location / Area')}
                  {renderField(values,'numberOfWorkers','Number of Workers')}
                </div>
              </div>

              {/* Hazard Identification */}
              <div className="form-section">
                <h3 className="form-section-title">Hazard Identification</h3>
                <div className="form-fields">
                  {renderField(values,'potentialHazards','Potential Hazards Identified')}
                  {renderSelect(values,'riskLevel','Risk Level',riskLevels)}
                  {renderField(values,'controlMeasures','Control Measures Implemented')}
                </div>
              </div>

              {/* Safety Checklist */}
              <div className="form-section">
                <h3 className="form-section-title">Safety Requirements Checklist</h3>
                <div className="form-fields">
                  {renderSelect(values,'ppeProvided','PPE Provided',yesNo)}
                  {renderSelect(values,'safetyInductionCompleted','Safety Induction Completed',yesNo)}
                  {renderSelect(values,'toolboxTalkConducted','Toolbox Talk Conducted',yesNo)}
                  {renderSelect(values,'emergencyPreparedness','Emergency Preparedness Confirmed',yesNo)}
                  {renderSelect(values,'permitDisplayed','Permit Displayed at Site',yesNo)}
                </div>
              </div>

              {/* Attachments & Verification */}
              <div className="form-section">
                <h3 className="form-section-title">Attachments</h3>
                <div className="form-fields">
                  {renderField(values,'verifiedBy','Verified By')}
                  {renderField(values,'verificationDate','Verification Date','date')}
                  {renderField(values,'attachmentRemarks','Remarks')}
                </div>
              </div>

              {/* Requestor */}
              <div className="form-section">
                <h3 className="form-section-title">Requestor Declaration</h3>
                <div className="form-fields">
                  {renderField(values,'requestedBy','Requested By')}
                  {renderField(values,'requesterDesignation','Designation')}
                  {renderField(values,'requesterDate','Date','date')}
                </div>
              </div>

              {/* Safety Approval */}
              <div className="form-section">
                <h3 className="form-section-title">Safety Approval</h3>
                <div className="form-fields">
                  {renderField(values,'safetyOfficerName','Safety Officer Name')}
                  {renderField(values,'safetyOfficerDesignation','Designation')}
                  {renderSelect(values,'safetyApprovalStatus','Approved / Rejected',['Approved','Rejected'])}
                  {renderField(values,'safetyConditions','Conditions (if any)')}
                  {renderField(values,'safetyApprovalDate','Date','date')}
                </div>
              </div>

              {/* Final Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">Final Authorization</h3>
                <div className="form-fields">
                  {renderField(values,'finalApproverName','Approver Name')}
                  {renderField(values,'finalApproverDesignation','Designation')}
                  {renderField(values,'finalApprovalDate','Date','date')}
                </div>
              </div>

              {/* Universal Components */}
              <FormAttachments />
              <FormCustomFields />
              <FormSignatures />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Save Safety Permit
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

export default SubcontractorSafetyPermitRequestApprovalForm;
