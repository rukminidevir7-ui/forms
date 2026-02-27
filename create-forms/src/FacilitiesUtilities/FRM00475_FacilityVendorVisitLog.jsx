// FRM00475_FacilityVendorVisitLog.jsx
// FRM-00475 – Facility Vendor Visit Log – Log / Register Form

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormCustomFields from '../components/FormCustomFields';
import FormSignatures from '../components/FormSignatures';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({

  date: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  department: Yup.string().required('Required'),

  vendorCompanyName: Yup.string().required('Required'),
  vendorContactPerson: Yup.string().required('Required'),
  mobileNumber: Yup.string().required('Required'),

  purposeOfVisit: Yup.string().required('Required'),
  visitDate: Yup.string().required('Required'),
  timeIn: Yup.string().required('Required'),

  idProofType: Yup.string().required('Required'),
  idProofNumber: Yup.string().required('Required'),
  authorizationStatus: Yup.string().required('Required'),

  signatures: Yup.array(),
  customFields: Yup.array()

});

const initialValues = {

  formId: 'FRM-00475',
  functionName: 'Facilities & Utilities',
  process: 'Facilities Management',
  formName: 'Facility Vendor Visit Log',

  date: '',
  location: '',
  department: '',

  vendorCompanyName: '',
  vendorContactPerson: '',
  mobileNumber: '',
  email: '',

  purposeOfVisit: '',
  workOrderReference: '',
  hostEmployee: '',
  visitDate: '',
  timeIn: '',
  timeOut: '',

  idProofType: '',
  idProofNumber: '',
  materialIn: '',
  materialOut: '',
  safetyInductionCompleted: '',
  accessAuthorization: '',
  securityCheckedBy: '',
  authorizationStatus: '',

  remarks: '',

  signatures: [],
  customFields: []

};

const FRM00475_FacilityVendorVisitLog = () => {

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
        <Field as="textarea" name={name} className="form-textarea" rows="3" />
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
      formId="FRM-00475"
      title="Facility Vendor Visit Log – Log / Register"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Facility Vendor Visit Log saved successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00475"
              title="FACILITY VENDOR VISIT LOG"
              department="Facilities & Utilities – Facilities Management"
            >

              {/* FORM HEADER */}
              <div className="form-section">
                <h3 className="form-section-title">Form Information</h3>
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'functionName','Function')}
                  {field(values,'process','Process')}
                  {field(values,'formName','Form Name')}
                </div>
              </div>

              {/* GENERAL INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,'date','Date','date',true)}
                  {field(values,'location','Location / Facility Name', 'text', true)}
                  {field(values,'department','Department', 'text', true)}
                </div>
              </div>

              {/* VENDOR DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Vendor Details</h3>
                <div className="form-fields">
                  {field(values,'vendorCompanyName','Vendor Company Name', 'text', true)}
                  {field(values,'vendorContactPerson','Vendor Contact Person', 'text', true)}
                  {field(values,'mobileNumber','Mobile Number', 'text', true)}
                  {field(values,'email','Email')}
                </div>
              </div>

              {/* VISIT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Visit Details</h3>
                <div className="form-fields">
                  {field(values,'purposeOfVisit','Purpose of Visit', 'text', true)}
                  {field(values,'workOrderReference','Work Order / Reference Number')}
                  {field(values,'hostEmployee','Host / Requesting Employee')}
                  {field(values,'visitDate','Visit Date','date', true)}
                  {field(values,'timeIn','Time In','time', true)}
                  {field(values,'timeOut','Time Out','time')}
                </div>
              </div>

              {/* IDENTIFICATION & SECURITY */}
              <div className="form-section">
                <h3 className="form-section-title">Identification & Security</h3>
                <div className="form-fields">
                  {field(values,'idProofType','ID Proof Type', 'text', true)}
                  {field(values,'idProofNumber','ID Proof Number', 'text', true)}
                  {textarea(values,'materialIn','Material / Tools Carried In')}
                  {textarea(values,'materialOut','Material / Tools Carried Out')}
                  {select(values,'safetyInductionCompleted','Safety Induction Completed',['Yes','No'])}
                  {field(values,'accessAuthorization','Access Authorization')}
                  {field(values,'securityCheckedBy','Security Checked By Name')}
                  {select(values,'authorizationStatus','Authorization Status',['Approved','Rejected','Pending'])}
                </div>
              </div>

              {/* REMARKS */}
              <div className="form-section">
                <h3 className="form-section-title">Remarks / Notes</h3>
                {textarea(values,'remarks','Remarks')}
              </div>

              {/* SIGNATURES */}
              <div className="form-section">
                <h3 className="form-section-title">Signatures</h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '20px'
                }}>
                  <FormSignatures
                    role="Vendor"
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                  <FormSignatures
                    role="Host"
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                  <FormSignatures
                    role="Security"
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                </div>

                <div style={{ marginTop: 20 }}>
                  {field(values,'date','Signature Date','date')}
                </div>

              </div>

              {/* CUSTOM FIELDS */}
              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Save Vendor Visit Log
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

export default FRM00475_FacilityVendorVisitLog;
