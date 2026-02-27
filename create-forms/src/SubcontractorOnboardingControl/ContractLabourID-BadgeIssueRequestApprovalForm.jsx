// ContractLabourIDBadgeIssueRequestApprovalForm.jsx
// FRM-01139 / FRM-01140 – Contract Labour ID / Badge Issue Form

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
  requestDate: Yup.string().required('Required'),

  workerName: Yup.string().required('Required'),
  workerId: Yup.string().required('Required'),
  skillCategory: Yup.string().required('Required'),
  departmentArea: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),

  badgeNumber: Yup.string().required('Required'),
  badgeType: Yup.string().required('Required'),
  issueDate: Yup.string().required('Required'),
  expiryDate: Yup.string().required('Required'),
  accessLevel: Yup.string().required('Required'),

  kycVerified: Yup.string().required('Required'),
  safetyInductionCompleted: Yup.string().required('Required'),
  trainingCompleted: Yup.string().required('Required'),
  documentsVerified: Yup.string().required('Required'),

  verifiedBy: Yup.string().required('Required'),
  verificationDate: Yup.string().required('Required'),
  attachmentRemarks: Yup.string(),

  requestedBy: Yup.string().required('Required'),
  requestDesignation: Yup.string().required('Required'),
  requestDateDeclaration: Yup.string().required('Required'),

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
  requestDate: '',

  workerName: '',
  workerId: '',
  skillCategory: '',
  departmentArea: '',
  contactNumber: '',

  badgeNumber: '',
  badgeType: '',
  issueDate: '',
  expiryDate: '',
  accessLevel: '',

  kycVerified: '',
  safetyInductionCompleted: '',
  trainingCompleted: '',
  documentsVerified: '',

  verifiedBy: '',
  verificationDate: '',
  attachmentRemarks: '',

  requestedBy: '',
  requestDesignation: '',
  requestDateDeclaration: '',

  approverName: '',
  approverDesignation: '',
  approvalStatus: '',
  approvalRemarks: '',
  approvalDate: '',

  attachments: [],
  customFields: [],
  signatures: []

};

const ContractLabourIDBadgeIssueRequestApprovalForm = () => {

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
      formId="FRM-01139 / FRM-01140"
      title="Contract Labour ID / Badge Issue Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert('ID / Badge Issue Form Saved');
        }}
      >

        {({ values }) => (

          <Form>

            <ModernA4Template
              formId="FRM-01139 / FRM-01140"
              title="Contract Labour ID / Badge Issue Form"
              department="Subcontractor & Contracting"
            >

              {/* Contractor / Project Info */}
              <div className="form-section">
                <h3 className="form-section-title">Contractor / Project Information</h3>
                <div className="form-fields">
                  {renderField(values,'companyName','Company Name')}
                  {renderField(values,'projectName','Project Name')}
                  {renderField(values,'projectLocation','Project Location')}
                  {renderField(values,'requestDate','Request Date','date')}
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

              {/* Badge Details */}
              <div className="form-section">
                <h3 className="form-section-title">ID / Badge Details</h3>
                <div className="form-fields">
                  {renderField(values,'badgeNumber','Badge Number')}
                  {renderField(values,'badgeType','Type of Badge (Temporary/Permanent)')}
                  {renderField(values,'issueDate','Issue Date','date')}
                  {renderField(values,'expiryDate','Expiry Date','date')}
                  {renderField(values,'accessLevel','Access Level / Area')}
                </div>
              </div>

              {/* Compliance Verification */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Verification</h3>
                <div className="form-fields">
                  {renderSelect(values,'kycVerified','KYC Verified')}
                  {renderSelect(values,'safetyInductionCompleted','Safety Induction Completed')}
                  {renderSelect(values,'trainingCompleted','Training Completed')}
                  {renderSelect(values,'documentsVerified','Documents Verified')}
                </div>
              </div>

              {/* Attachments */}
              <div className="form-section">
                <h3 className="form-section-title">Attachments</h3>
                <div className="form-fields">
                  {renderField(values,'verifiedBy','Verified By')}
                  {renderField(values,'verificationDate','Verification Date','date')}
                  {renderField(values,'attachmentRemarks','Remarks')}
                </div>
              </div>

              {/* Request Declaration */}
              <div className="form-section">
                <h3 className="form-section-title">Requestor Declaration</h3>
                <div className="form-fields">
                  {renderField(values,'requestedBy','Requested By (Name)')}
                  {renderField(values,'requestDesignation','Designation')}
                  {renderField(values,'requestDateDeclaration','Date','date')}
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

              {/* Universal Components */}
              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>
              <FormSignatures values={values}/>

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Save ID / Badge Form
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

export default ContractLabourIDBadgeIssueRequestApprovalForm;
