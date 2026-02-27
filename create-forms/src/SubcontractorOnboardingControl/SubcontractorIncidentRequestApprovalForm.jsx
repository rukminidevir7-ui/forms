// SubcontractorIncidentRequestApprovalForm.jsx
// FRM-01149 / FRM-01150 – Subcontractor Incident Report Form

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

const severityOptions = ['Low','Medium','High'];
const approvalOptions = ['Approved','Rejected'];

const validationSchema = Yup.object({

  projectName: Yup.string().required('Required'),
  projectLocation: Yup.string().required('Required'),
  subcontractorName: Yup.string().required('Required'),
  incidentDate: Yup.string().required('Required'),
  incidentTime: Yup.string().required('Required'),
  incidentLocation: Yup.string().required('Required'),

  incidentType: Yup.string().required('Required'),
  incidentDescription: Yup.string().required('Required'),
  immediateAction: Yup.string().required('Required'),
  injuryDamageDetails: Yup.string().required('Required'),
  severityLevel: Yup.string().required('Required'),

  personsInvolved: Yup.string().required('Required'),
  designationRole: Yup.string().required('Required'),
  contactDetails: Yup.string().required('Required'),

  probableCause: Yup.string().required('Required'),
  correctiveAction: Yup.string().required('Required'),
  preventiveMeasures: Yup.string().required('Required'),
  targetCompletionDate: Yup.string().required('Required'),

  verifiedBy: Yup.string().required('Required'),
  verificationDate: Yup.string().required('Required'),

  reportedByName: Yup.string().required('Required'),
  reportedByDesignation: Yup.string().required('Required'),
  reportedByDate: Yup.string().required('Required'),

  approverName: Yup.string().required('Required'),
  approverDesignation: Yup.string().required('Required'),
  approvalStatus: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required')

});

const initialValues = {

  department: 'Subcontractor & Contracting',
  process: 'Contract Labour & Site Compliance',

  projectName: '',
  projectLocation: '',
  subcontractorName: '',
  incidentDate: '',
  incidentTime: '',
  incidentLocation: '',

  incidentType: '',
  incidentDescription: '',
  immediateAction: '',
  injuryDamageDetails: '',
  severityLevel: '',

  personsInvolved: '',
  designationRole: '',
  contactDetails: '',

  probableCause: '',
  correctiveAction: '',
  preventiveMeasures: '',
  targetCompletionDate: '',

  verifiedBy: '',
  verificationDate: '',
  remarks: '',

  reportedByName: '',
  reportedByDesignation: '',
  reportedByDate: '',

  approverName: '',
  approverDesignation: '',
  approvalStatus: '',
  approvalRemarks: '',
  approvalDate: '',

  attachments: [],
  customFields: [],
  signatures: []

};

const SubcontractorIncidentRequestApprovalForm = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type='text') => (
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

  const textarea = (values, name, label) => (
    <div className="form-field full-width">
      <label className="form-label required">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || '___________________'}</div>
        : <>
            <Field as="textarea" name={name} className="form-textarea" rows="3"/>
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  const select = (values, name, label, options) => (
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
      formId="FRM-01149 / FRM-01150"
      title="Subcontractor Incident Report Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert('Incident Report Saved Successfully');
        }}
      >

      {({values})=>(
        <Form>

          <ModernA4Template
            formId="FRM-01149 / FRM-01150"
            title="Subcontractor Incident Report Form"
            department={values.department}
          >

            {/* Incident Information */}
            <div className="form-section">
              <h3 className="form-section-title">Incident Information</h3>
              <div className="form-fields">
                {field(values,'projectName','Project Name')}
                {field(values,'projectLocation','Project Location')}
                {field(values,'subcontractorName','Subcontractor Name')}
                {field(values,'incidentDate','Date of Incident','date')}
                {field(values,'incidentTime','Time of Incident','time')}
                {field(values,'incidentLocation','Incident Location / Area')}
              </div>
            </div>

            {/* Incident Details */}
            <div className="form-section">
              <h3 className="form-section-title">Incident Details</h3>
              <div className="form-fields">
                {field(values,'incidentType','Type of Incident')}
                {select(values,'severityLevel','Severity Level',severityOptions)}
              </div>
              {textarea(values,'incidentDescription','Description of Incident')}
              {textarea(values,'immediateAction','Immediate Action Taken')}
              {textarea(values,'injuryDamageDetails','Injury / Damage Details')}
            </div>

            {/* Persons Involved */}
            <div className="form-section">
              <h3 className="form-section-title">Persons Involved</h3>
              <div className="form-fields">
                {field(values,'personsInvolved','Name(s) of Person(s) Involved')}
                {field(values,'designationRole','Designation / Role')}
                {field(values,'contactDetails','Contact Details')}
              </div>
            </div>

            {/* Root Cause */}
            <div className="form-section">
              <h3 className="form-section-title">Root Cause & Corrective Action</h3>
              {textarea(values,'probableCause','Probable Cause')}
              {textarea(values,'correctiveAction','Corrective Action Proposed')}
              {textarea(values,'preventiveMeasures','Preventive Measures')}
              {field(values,'targetCompletionDate','Target Completion Date','date')}
            </div>

            {/* Attachments Section */}
            <FormAttachments />

            {/* Verification */}
            <div className="form-section">
              <h3 className="form-section-title">Verification</h3>
              <div className="form-fields">
                {field(values,'verifiedBy','Verified By')}
                {field(values,'verificationDate','Verification Date','date')}
              </div>
              {textarea(values,'remarks','Remarks')}
            </div>

            {/* Reported By */}
            <div className="form-section">
              <h3 className="form-section-title">Reported By</h3>
              <div className="form-fields">
                {field(values,'reportedByName','Name')}
                {field(values,'reportedByDesignation','Designation')}
                {field(values,'reportedByDate','Date','date')}
              </div>
            </div>

            {/* Approval */}
            <div className="form-section">
              <h3 className="form-section-title">Approval / Authorization</h3>
              <div className="form-fields">
                {field(values,'approverName','Approver Name')}
                {field(values,'approverDesignation','Designation')}
                {select(values,'approvalStatus','Approved / Rejected',approvalOptions)}
                {field(values,'approvalDate','Date','date')}
              </div>
              {textarea(values,'approvalRemarks','Remarks')}
            </div>

            {/* Universal Components */}
            <FormCustomFields />
            <FormSignatures />

            {!isPrintMode && (
              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  Submit Incident Report
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

export default SubcontractorIncidentRequestApprovalForm;
