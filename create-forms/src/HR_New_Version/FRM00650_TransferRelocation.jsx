// FRM00650_TransferRelocation.jsx
// FRM-00650 – Transfer / Relocation – Request & Approval Form

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormCustomFields from '../components/FormCustomFields';
import FormAttachments from '../components/FormAttachments';
import FormSignatures from '../components/FormSignatures';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({

  // Section 1
  requesterName: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  employeeName: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  currentDesignation: Yup.string().required('Required'),
  currentDepartmentLocation: Yup.string().required('Required'),
  proposedDepartmentLocation: Yup.string().required('Required'),
  typeOfTransfer: Yup.string().required('Required'),
  reasonForTransfer: Yup.string().required('Required'),
  proposedEffectiveDate: Yup.string().required('Required'),
  reportingManagerName: Yup.string().required('Required'),

  // Section 2
  changeInRoleResponsibilities: Yup.string().required('Required'),
  changeInGradeLevel: Yup.string().required('Required'),
  changeInCompensation: Yup.string().required('Required'),
  relocationSupportRequired: Yup.string().required('Required'),
  impactOnBusinessOperations: Yup.string().required('Required'),
  hrOperationsRemarks: Yup.string().required('Required'),

  // Section 3
  transferRelocationReferenceNumber: Yup.string().required('Required'),
  approvingAuthorityName: Yup.string().required('Required'),
  approvalStatus: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),
  effectiveDateOfTransfer: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  requesterName: '',
  department: '',
  employeeName: '',
  employeeId: '',
  currentDesignation: '',
  currentDepartmentLocation: '',
  proposedDepartmentLocation: '',
  typeOfTransfer: '',
  reasonForTransfer: '',
  proposedEffectiveDate: '',
  reportingManagerName: '',

  changeInRoleResponsibilities: '',
  changeInGradeLevel: '',
  changeInCompensation: '',
  relocationSupportRequired: '',
  impactOnBusinessOperations: '',
  hrOperationsRemarks: '',

  transferRelocationReferenceNumber: '',
  approvingAuthorityName: '',
  approvalStatus: '',
  approvalComments: '',
  effectiveDateOfTransfer: '',
  approvalDate: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00650_TransferRelocation = () => {

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
            {options.map(o => <option key={o} value={o}>{o}</option>)}
          </Field>
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (

    <ModernFormWrapper
      formId="FRM-00650"
      title="Transfer / Relocation – Request & Approval"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('FRM-00650 Transfer / Relocation Submitted Successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00650"
              title="Transfer / Relocation – Request & Approval"
              department="HR & People Ops"
            >

              {/* Section 1 */}
              <div className="form-section">
                <h3 className="form-section-title">1. Request / Initiation Details</h3>
                <div className="form-fields">
                  {field(values,'requesterName','Requester Name')}
                  {field(values,'department','Department')}
                  {field(values,'employeeName','Employee Name')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'currentDesignation','Current Designation')}
                  {field(values,'currentDepartmentLocation','Current Department / Location')}
                  {field(values,'proposedDepartmentLocation','Proposed Department / Location')}
                  {select(values,'typeOfTransfer','Type of Transfer',['Internal','Relocation','Project Based'])}
                  {textarea(values,'reasonForTransfer','Reason for Transfer / Relocation')}
                  {field(values,'proposedEffectiveDate','Proposed Effective Date','date')}
                  {field(values,'reportingManagerName','Reporting Manager Name')}
                </div>
              </div>

              {/* Section 2 */}
              <div className="form-section">
                <h3 className="form-section-title">2. Transfer / Relocation Details</h3>
                <div className="form-fields">
                  {textarea(values,'changeInRoleResponsibilities','Change in Role / Responsibilities')}
                  {textarea(values,'changeInGradeLevel','Change in Grade / Level')}
                  {textarea(values,'changeInCompensation','Change in Compensation')}
                  {select(values,'relocationSupportRequired','Relocation Support Required',['Yes','No'])}
                  {textarea(values,'impactOnBusinessOperations','Impact on Business / Operations')}
                  {textarea(values,'hrOperationsRemarks','HR Operations Remarks')}
                </div>
              </div>

              {/* Section 3 */}
              <div className="form-section">
                <h3 className="form-section-title">3. Approval / Authorization</h3>
                <div className="form-fields">
                  {field(values,'transferRelocationReferenceNumber','Transfer / Relocation Reference Number')}
                  {field(values,'approvingAuthorityName','Approving Authority Name')}
                  {select(values,'approvalStatus','Approval Status',['Approved','Rejected','On Hold'])}
                  {textarea(values,'approvalComments','Approval Decision / Comments')}
                  {field(values,'effectiveDateOfTransfer','Effective Date of Transfer','date')}
                  {field(values,'approvalDate','Approval Date','date')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Form
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

export default FRM00650_TransferRelocation;
