// FRM00474_AMCTrackerUpdate.jsx
// FRM-00474 – AMC Tracker Update – Log / Register Form

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

  formId: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  functionName: Yup.string().required('Required'),
  formType: Yup.string().required('Required'),

  entryDate: Yup.string().required('Required'),
  amcReferenceNumber: Yup.string().required('Required'),
  contractTitle: Yup.string().required('Required'),
  vendorName: Yup.string().required('Required'),

  contractStartDate: Yup.string().required('Required'),
  contractEndDate: Yup.string().required('Required'),
  serviceFrequency: Yup.string().required('Required'),

  lastServiceDate: Yup.string(),
  nextDueDate: Yup.string(),
  status: Yup.string().required('Required'),

  signatures: Yup.array(),
  attachments: Yup.array(),
  customFields: Yup.array()

});

const initialValues = {

  formId: 'FRM-00474',
  department: 'Facilities & Utilities',
  functionName: 'Facilities Management',
  formType: 'Log/Register',

  entryDate: '',
  amcReferenceNumber: '',
  contractTitle: '',
  vendorName: '',
  vendorContactPerson: '',
  contactNumber: '',
  email: '',
  locationSite: '',

  contractStartDate: '',
  contractEndDate: '',
  serviceFrequency: '',
  scopeOfService: '',
  serviceLevelRequirements: '',

  lastServiceDate: '',
  nextDueDate: '',
  status: '',
  updateDescription: '',
  issuesObserved: '',
  correctiveAction: '',

  slaCompliance: '',
  penaltyApplicable: '',
  penaltyDetails: '',

  remarks: '',

  signatures: [],
  attachments: [],
  customFields: []

};

const FRM00474_AMCTrackerUpdate = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type = 'text', required = false) => (
    <div className="form-field">
      <label className={`form-label ${required ? 'required' : ''}`}>
        {label}
      </label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '_________'}</div>
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
      <label className="form-label">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '_________'}</div>
      ) : (
        <Field as="textarea" name={name} className="form-textarea" rows="4" />
      )}
    </div>
  );

  const select = (values, name, label, options) => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      <Field as="select" name={name} className="form-input">
        <option value="">-- Select --</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </Field>
    </div>
  );

  return (

    <ModernFormWrapper
      formId="FRM-00474"
      title="AMC Tracker Update – Log / Register"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('AMC Tracker Update saved successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00474"
              title="AMC TRACKER UPDATE FORM"
              department="Facilities & Utilities – Facilities Management"
            >

              {/* FORM INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">Form Information</h3>
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'department','Department')}
                  {field(values,'functionName','Function')}
                  {field(values,'formType','Form Type')}
                </div>
              </div>

              {/* GENERAL DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">General Details</h3>
                <div className="form-fields">
                  {field(values,'entryDate','Entry Date','date',true)}
                  {field(values,'amcReferenceNumber','AMC Reference Number', 'text', true)}
                  {field(values,'contractTitle','Contract Title', 'text', true)}
                  {field(values,'vendorName','Vendor Name', 'text', true)}
                  {field(values,'vendorContactPerson','Vendor Contact Person')}
                  {field(values,'contactNumber','Contact Number')}
                  {field(values,'email','Email')}
                  {field(values,'locationSite','Location / Site')}
                </div>
              </div>

              {/* CONTRACT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Contract Details</h3>
                <div className="form-fields">
                  {field(values,'contractStartDate','Contract Start Date','date',true)}
                  {field(values,'contractEndDate','Contract End Date','date',true)}
                  {field(values,'serviceFrequency','Service Frequency', 'text', true)}
                  {textarea(values,'scopeOfService','Scope of Service')}
                  {textarea(values,'serviceLevelRequirements','Service Level Requirements')}
                </div>
              </div>

              {/* UPDATE DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Update Details</h3>
                <div className="form-fields">
                  {field(values,'lastServiceDate','Last Service Date','date')}
                  {field(values,'nextDueDate','Next Due Date','date')}
                  {select(values,'status','Status',['Active','Completed','Pending','Overdue','Terminated'])}
                  {textarea(values,'updateDescription','Update Description')}
                  {textarea(values,'issuesObserved','Issues Observed')}
                  {textarea(values,'correctiveAction','Corrective Action Taken')}
                </div>
              </div>

              {/* COMPLIANCE TRACKING */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Tracking</h3>
                <div className="form-fields">
                  {select(values,'slaCompliance','SLA Compliance',['Yes','No','Partially'])}
                  {select(values,'penaltyApplicable','Penalty Applicable',['Yes','No'])}
                  {textarea(values,'penaltyDetails','Penalty Details')}
                </div>
              </div>

              {/* ATTACHMENTS */}
              <div className="form-section">
                <h3 className="form-section-title">Attachments</h3>
                {isPrintMode ? (
                  <div className="print-value">
                    {values.attachments?.length > 0
                      ? 'Documents Attached'
                      : '________________'}
                  </div>
                ) : (
                  <FormAttachments values={values} />
                )}
              </div>

              {/* REMARKS */}
              <div className="form-section">
                <h3 className="form-section-title">Remarks</h3>
                {textarea(values,'remarks','Remarks')}
              </div>

              {/* AUTHORIZATION */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '20px'
                }}>
                  <FormSignatures
                    role="Prepared By"
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                  <FormSignatures
                    role="Reviewed By"
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                  <FormSignatures
                    role="Approved By"
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                </div>
              </div>

              {/* CUSTOM FIELDS */}
              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Save AMC Tracker Update
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

export default FRM00474_AMCTrackerUpdate;
