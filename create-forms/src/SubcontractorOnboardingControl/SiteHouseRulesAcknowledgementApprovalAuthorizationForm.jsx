// SiteHouseRulesAcknowledgementApprovalAuthorizationForm.jsx
// FRM-01153 / FRM-01154 – Site House Rules Acknowledgement Form

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

  projectName: Yup.string().required('Required'),
  projectLocation: Yup.string().required('Required'),
  acknowledgementDate: Yup.string().required('Required'),

  companyName: Yup.string().required('Required'),
  personName: Yup.string().required('Required'),
  workerId: Yup.string().required('Required'),
  designationRole: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),

  ppeCompliance: Yup.string().required('Required'),
  safetyProceduresFollowed: Yup.string().required('Required'),
  accessRestrictionsUnderstood: Yup.string().required('Required'),
  emergencyProceduresUnderstood: Yup.string().required('Required'),
  prohibitedActivitiesUnderstood: Yup.string().required('Required'),

  acknowledgementName: Yup.string().required('Required'),
  acknowledgementDateSign: Yup.string().required('Required'),

  authorizedBy: Yup.string().required('Required'),
  authorizedDesignation: Yup.string().required('Required'),
  authorizationDate: Yup.string().required('Required')

});

const initialValues = {

  department: 'Subcontractor & Contracting',
  process: 'Contract Labour & Site Compliance',
  formType: 'Acknowledgement',

  projectName: '',
  projectLocation: '',
  acknowledgementDate: '',

  companyName: '',
  personName: '',
  workerId: '',
  designationRole: '',
  contactNumber: '',

  ppeCompliance: '',
  safetyProceduresFollowed: '',
  accessRestrictionsUnderstood: '',
  emergencyProceduresUnderstood: '',
  prohibitedActivitiesUnderstood: '',

  comments: '',

  acknowledgementName: '',
  acknowledgementDateSign: '',

  authorizedBy: '',
  authorizedDesignation: '',
  authorizationDate: '',

  attachments: [],
  customFields: [],
  signatures: []

};

const SiteHouseRulesAcknowledgementApprovalAuthorizationForm = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values,name,label,type='text') => (
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

  const select = (values,name,label,options) => (
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

  const textarea = (values,name,label) => (
    <div className="form-field full-width">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || '___________________'}</div>
        : <>
            <Field as="textarea" name={name} className="form-textarea"/>
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return (

    <ModernFormWrapper
      formId="FRM-01153 / FRM-01154"
      title="Site House Rules Acknowledgement Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert('House Rules Acknowledgement Submitted Successfully');
        }}
      >

      {({values})=>(
        <Form>

          <ModernA4Template
            formId="FRM-01153 / FRM-01154"
            title="Site House Rules Acknowledgement Form"
            department={values.department}
          >

            {/* Project Info */}
            <div className="form-section">
              <h3 className="form-section-title">Project / Site Information</h3>
              <div className="form-fields">
                {field(values,'projectName','Project Name')}
                {field(values,'projectLocation','Project Location')}
                {field(values,'acknowledgementDate','Acknowledgement Date','date')}
              </div>
            </div>

            {/* Person Details */}
            <div className="form-section">
              <h3 className="form-section-title">Person / Contractor Details</h3>
              <div className="form-fields">
                {field(values,'companyName','Company Name')}
                {field(values,'personName','Person Name')}
                {field(values,'workerId','Employee / Worker ID')}
                {field(values,'designationRole','Designation / Role')}
                {field(values,'contactNumber','Contact Number')}
              </div>
            </div>

            {/* Declaration Text */}
            <div className="form-section">
              <h3 className="form-section-title">House Rules Declaration</h3>
              <div className="print-value">
                I confirm that I have received, read, and understood the site house rules.
                I agree to comply with all safety, security, and operational requirements.
                I understand that non-compliance may lead to disciplinary action or removal from site.
              </div>
            </div>

            {/* Checklist */}
            <div className="form-section">
              <h3 className="form-section-title">Key Rules Checklist</h3>
              <div className="form-fields">
                {select(values,'ppeCompliance','PPE Compliance',yesNo)}
                {select(values,'safetyProceduresFollowed','Safety Procedures Followed',yesNo)}
                {select(values,'accessRestrictionsUnderstood','Access Restrictions Understood',yesNo)}
                {select(values,'emergencyProceduresUnderstood','Emergency Procedures Understood',yesNo)}
                {select(values,'prohibitedActivitiesUnderstood','Prohibited Activities Understood',yesNo)}
              </div>
            </div>

            {/* Attachments */}
            <FormAttachments />

            {/* Acknowledgement Sign-off */}
            <div className="form-section">
              <h3 className="form-section-title">Acknowledgement Sign-off</h3>
              <div className="form-fields">
                {field(values,'acknowledgementName','Person Name')}
                {field(values,'acknowledgementDateSign','Date','date')}
              </div>
            </div>

            {/* Authorization */}
            <div className="form-section">
              <h3 className="form-section-title">Authorization</h3>
              <div className="form-fields">
                {field(values,'authorizedBy','Authorized By')}
                {field(values,'authorizedDesignation','Designation')}
                {field(values,'authorizationDate','Date','date')}
              </div>
            </div>

            {/* Universal Components */}
            <FormCustomFields />
            <FormSignatures />

            {!isPrintMode && (
              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  Submit Acknowledgement
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

export default SiteHouseRulesAcknowledgementApprovalAuthorizationForm;
