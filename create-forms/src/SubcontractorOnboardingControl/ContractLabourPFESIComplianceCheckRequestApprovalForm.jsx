// ContractLabourPFESIComplianceCheckRequestApprovalForm.jsx
// FRM-01136 / FRM-01137 – Contract Labour PF / ESI Compliance Check Form

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

const yesNo = ['Yes', 'No'];

const validationSchema = Yup.object({

  companyName: Yup.string().required('Required'),
  projectName: Yup.string().required('Required'),
  projectLocation: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  complianceCheckDate: Yup.string().required('Required'),

  pfRegistrationNumber: Yup.string().required('Required'),
  pfRegistrationValid: Yup.string().required('Required'),
  pfChallanSubmitted: Yup.string().required('Required'),
  pfReturnsFiled: Yup.string().required('Required'),
  uanRecordsAvailable: Yup.string().required('Required'),

  esiRegistrationNumber: Yup.string().required('Required'),
  esiRegistrationValid: Yup.string().required('Required'),
  esiChallanSubmitted: Yup.string().required('Required'),
  esiReturnsFiled: Yup.string().required('Required'),
  employeeInsuranceRecords: Yup.string().required('Required'),

  statutoryDocsVerified: Yup.string().required('Required'),
  complianceMeetsLegal: Yup.string().required('Required'),
  nonComplianceObserved: Yup.string().required('Required'),

  comments: Yup.string(),

  verifiedBy: Yup.string().required('Required'),
  verificationDate: Yup.string().required('Required'),
  attachmentRemarks: Yup.string(),

  checkedBy: Yup.string().required('Required'),
  checkedDesignation: Yup.string().required('Required'),
  checkedDate: Yup.string().required('Required'),

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
  contactPerson: '',
  complianceCheckDate: '',

  pfRegistrationNumber: '',
  pfRegistrationValid: '',
  pfChallanSubmitted: '',
  pfReturnsFiled: '',
  uanRecordsAvailable: '',

  esiRegistrationNumber: '',
  esiRegistrationValid: '',
  esiChallanSubmitted: '',
  esiReturnsFiled: '',
  employeeInsuranceRecords: '',

  statutoryDocsVerified: '',
  complianceMeetsLegal: '',
  nonComplianceObserved: '',

  comments: '',

  verifiedBy: '',
  verificationDate: '',
  attachmentRemarks: '',

  checkedBy: '',
  checkedDesignation: '',
  checkedDate: '',

  approverName: '',
  approverDesignation: '',
  approvalStatus: '',
  approvalRemarks: '',
  approvalDate: '',

  attachments: [],
  customFields: [],
  signatures: []

};

const ContractLabourPFESIComplianceCheckRequestApprovalForm = () => {

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
      formId="FRM-01136 / FRM-01137"
      title="Contract Labour PF / ESI Compliance Check Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('PF / ESI Compliance Form Saved');
        }}
      >

        {({ values }) => (

          <Form>

            <ModernA4Template
              formId="FRM-01136 / FRM-01137"
              title="Contract Labour PF / ESI Compliance Check Form"
              department="Subcontractor & Contracting"
            >

              {/* Contractor Info */}
              <div className="form-section">
                <h3 className="form-section-title">Contractor Information</h3>
                <div className="form-fields">
                  {renderField(values,'companyName','Company Name')}
                  {renderField(values,'projectName','Project Name')}
                  {renderField(values,'projectLocation','Project Location')}
                  {renderField(values,'contactPerson','Contact Person')}
                  {renderField(values,'complianceCheckDate','Compliance Check Date','date')}
                </div>
              </div>

              {/* PF Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">PF Compliance Details</h3>
                <div className="form-fields">
                  {renderField(values,'pfRegistrationNumber','PF Registration Number')}
                  {renderSelect(values,'pfRegistrationValid','PF Registration Valid')}
                  {renderSelect(values,'pfChallanSubmitted','Latest PF Challan Submitted')}
                  {renderSelect(values,'pfReturnsFiled','PF Returns Filed')}
                  {renderSelect(values,'uanRecordsAvailable','UAN Records Available')}
                </div>
              </div>

              {/* ESI Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">ESI Compliance Details</h3>
                <div className="form-fields">
                  {renderField(values,'esiRegistrationNumber','ESI Registration Number')}
                  {renderSelect(values,'esiRegistrationValid','ESI Registration Valid')}
                  {renderSelect(values,'esiChallanSubmitted','Latest ESI Challan Submitted')}
                  {renderSelect(values,'esiReturnsFiled','ESI Returns Filed')}
                  {renderSelect(values,'employeeInsuranceRecords','Employee Insurance Records Available')}
                </div>
              </div>

              {/* Compliance Checklist */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Verification Checklist</h3>
                <div className="form-fields">
                  {renderSelect(values,'statutoryDocsVerified','Statutory Documents Verified')}
                  {renderSelect(values,'complianceMeetsLegal','Compliance Meets Legal Requirements')}
                  {renderSelect(values,'nonComplianceObserved','Noncompliance Observed')}
                </div>
              </div>

              {/* Remarks */}
              <div className="form-section">
                <h3 className="form-section-title">Remarks</h3>
                <div className="form-fields">
                  {renderField(values,'comments','Comments')}
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

              {/* Checked By */}
              <div className="form-section">
                <h3 className="form-section-title">Checked By</h3>
                <div className="form-fields">
                  {renderField(values,'checkedBy','Name')}
                  {renderField(values,'checkedDesignation','Designation')}
                  {renderField(values,'checkedDate','Date','date')}
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
              <FormAttachments values={values} />
              <FormCustomFields values={values} />
              <FormSignatures values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Save Compliance Form
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

export default ContractLabourPFESIComplianceCheckRequestApprovalForm;
