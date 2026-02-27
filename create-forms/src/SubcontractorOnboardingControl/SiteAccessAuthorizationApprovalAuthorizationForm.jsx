// SiteAccessAuthorizationApprovalAuthorizationForm.jsx
// FRM-01152 – Site Access Authorization Form

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
const accessTypeOptions = ['Temporary','Permanent'];

const validationSchema = Yup.object({

  projectName: Yup.string().required('Required'),
  projectLocation: Yup.string().required('Required'),
  requestDate: Yup.string().required('Required'),
  accessFrom: Yup.string().required('Required'),
  accessTo: Yup.string().required('Required'),

  companyName: Yup.string().required('Required'),
  personName: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  designationRole: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),

  accessArea: Yup.string().required('Required'),
  purposeOfAccess: Yup.string().required('Required'),
  accessType: Yup.string().required('Required'),
  accessLevel: Yup.string().required('Required'),

  idVerified: Yup.string().required('Required'),
  safetyInductionCompleted: Yup.string().required('Required'),
  trainingVerified: Yup.string().required('Required'),
  documentsVerified: Yup.string().required('Required'),

  requestedBy: Yup.string().required('Required'),
  requesterDesignation: Yup.string().required('Required'),
  requestDateSign: Yup.string().required('Required'),

  approvedBy: Yup.string().required('Required'),
  approverDesignation: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),

  securityName: Yup.string().required('Required'),
  securityDesignation: Yup.string().required('Required'),
  securityDate: Yup.string().required('Required')

});

const initialValues = {

  department: 'Subcontractor & Contracting',
  process: 'Contract Labour & Site Compliance',
  formType: 'Approval / Authorization',

  projectName: '',
  projectLocation: '',
  requestDate: '',
  accessFrom: '',
  accessTo: '',

  companyName: '',
  personName: '',
  employeeId: '',
  designationRole: '',
  contactNumber: '',

  accessArea: '',
  purposeOfAccess: '',
  accessType: '',
  accessLevel: '',

  idVerified: '',
  safetyInductionCompleted: '',
  trainingVerified: '',
  documentsVerified: '',

  specialConditions: '',
  comments: '',

  requestedBy: '',
  requesterDesignation: '',
  requestDateSign: '',

  approvedBy: '',
  approverDesignation: '',
  approvalDate: '',

  securityName: '',
  securityDesignation: '',
  securityDate: '',

  attachments: [],
  customFields: [],
  signatures: []

};

const SiteAccessAuthorizationApprovalAuthorizationForm = () => {

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

  return (

    <ModernFormWrapper
      formId="FRM-01152"
      title="Site Access Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert('Site Access Authorization Submitted Successfully');
        }}
      >

      {({values})=>(
        <Form>

          <ModernA4Template
            formId="FRM-01152"
            title="Site Access Authorization Form"
            department={values.department}
          >

            {/* Request Details */}
            <div className="form-section">
              <h3 className="form-section-title">Request Details</h3>
              <div className="form-fields">
                {field(values,'projectName','Project Name')}
                {field(values,'projectLocation','Project Location')}
                {field(values,'requestDate','Request Date','date')}
                {field(values,'accessFrom','Access Required From','date')}
                {field(values,'accessTo','Access Required To','date')}
              </div>
            </div>

            {/* Person Details */}
            <div className="form-section">
              <h3 className="form-section-title">Person / Contractor Details</h3>
              <div className="form-fields">
                {field(values,'companyName','Company Name')}
                {field(values,'personName','Person Name')}
                {field(values,'employeeId','Employee / ID Number')}
                {field(values,'designationRole','Designation / Role')}
                {field(values,'contactNumber','Contact Number')}
              </div>
            </div>

            {/* Access Details */}
            <div className="form-section">
              <h3 className="form-section-title">Access Details</h3>
              <div className="form-fields">
                {field(values,'accessArea','Access Area / Zone')}
                {field(values,'purposeOfAccess','Purpose of Access')}
                {select(values,'accessType','Type of Access',accessTypeOptions)}
                {field(values,'accessLevel','Access Level')}
              </div>
            </div>

            {/* Compliance */}
            <div className="form-section">
              <h3 className="form-section-title">Compliance Verification</h3>
              <div className="form-fields">
                {select(values,'idVerified','ID / Badge Verified',yesNo)}
                {select(values,'safetyInductionCompleted','Safety Induction Completed',yesNo)}
                {select(values,'trainingVerified','Training Verified',yesNo)}
                {select(values,'documentsVerified','Documents Verified',yesNo)}
              </div>
            </div>

            {/* Conditions */}
            <div className="form-section">
              <h3 className="form-section-title">Conditions / Remarks</h3>
              {textarea(values,'specialConditions','Special Conditions')}
              {textarea(values,'comments','Comments')}
            </div>

            {/* Attachments */}
            <FormAttachments />

            {/* Authorization */}
            <div className="form-section">
              <h3 className="form-section-title">Authorization</h3>
              <div className="form-fields">
                {field(values,'requestedBy','Requested By')}
                {field(values,'requesterDesignation','Designation')}
                {field(values,'requestDateSign','Date','date')}
              </div>

              <div className="form-fields">
                {field(values,'approvedBy','Approved By')}
                {field(values,'approverDesignation','Designation')}
                {field(values,'approvalDate','Date','date')}
              </div>

              <div className="form-fields">
                {field(values,'securityName','Security Authorization Name')}
                {field(values,'securityDesignation','Designation')}
                {field(values,'securityDate','Date','date')}
              </div>
            </div>

            {/* Universal Components */}
            <FormCustomFields />
            <FormSignatures />

            {!isPrintMode && (
              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  Submit Authorization
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

export default SiteAccessAuthorizationApprovalAuthorizationForm;
