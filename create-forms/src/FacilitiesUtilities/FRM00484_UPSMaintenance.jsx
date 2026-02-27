// FRM00484_UPSMaintenance.jsx
// FRM-00484 / 00485 / 00486 – UPS Maintenance – Unified Form

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

  date: Yup.string().required('Required'),
  referenceNo: Yup.string().required('Required'),

  requestedBy: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  contactNo: Yup.string().required('Required'),
  maintenanceType: Yup.string().required('Required'),
  priority: Yup.string().required('Required'),

  upsMakeModel: Yup.string().required('Required'),
  capacity: Yup.string().required('Required'),
  serialNo: Yup.string().required('Required'),

  assignedTo: Yup.string(),
  startDate: Yup.string(),
  completionDate: Yup.string(),

  signatures: Yup.array(),
  attachments: Yup.array(),
  customFields: Yup.array()

});

const initialValues = {

  formId: 'FRM-00484 / 00485 / 00486',
  mainDepartment: 'Facilities & Utilities',
  functionName: 'Utilities',
  process: 'UPS Maintenance',

  date: '',
  referenceNo: '',

  requestedBy: '',
  department: '',
  location: '',
  contactNo: '',
  maintenanceType: '',
  priority: '',
  issueDescription: '',

  upsMakeModel: '',
  capacity: '',
  serialNo: '',
  installationDate: '',
  lastServiceDate: '',
  amcVendor: '',

  assignedTo: '',
  startDate: '',
  completionDate: '',
  downtime: '',
  workSummary: '',

  signatures: [],
  attachments: [],
  customFields: []

};

const FRM00484_UPSMaintenance = () => {

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
      formId="FRM-00484"
      title="UPS Maintenance – Unified Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('UPS Maintenance form submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00484"
              title="UPS MAINTENANCE"
              department="Facilities & Utilities – Utilities"
            >

              {/* HEADER INFORMATION */}
              <div className="form-section">
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'mainDepartment','Department')}
                  {field(values,'functionName','Function')}
                  {field(values,'process','Process')}
                  {field(values,'date','Date','date',true)}
                  {field(values,'referenceNo','Reference No', 'text', true)}
                </div>
              </div>

              {/* REQUEST DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Request Details</h3>
                <div className="form-fields">
                  {field(values,'requestedBy','Requested By', 'text', true)}
                  {field(values,'department','Department', 'text', true)}
                  {field(values,'location','Location', 'text', true)}
                  {field(values,'contactNo','Contact No', 'text', true)}
                  {select(values,'maintenanceType','Type of Maintenance',['Preventive','Corrective'])}
                  {select(values,'priority','Priority',['Low','Medium','High'])}
                  {textarea(values,'issueDescription','Issue Description')}
                </div>
              </div>

              {/* EQUIPMENT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Equipment Details</h3>
                <div className="form-fields">
                  {field(values,'upsMakeModel','UPS Make / Model', 'text', true)}
                  {field(values,'capacity','Capacity', 'text', true)}
                  {field(values,'serialNo','Serial No', 'text', true)}
                  {field(values,'installationDate','Installation Date','date')}
                  {field(values,'lastServiceDate','Last Service Date','date')}
                  {field(values,'amcVendor','AMC Vendor')}
                </div>
              </div>

              {/* WORK DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Work Details</h3>
                <div className="form-fields">
                  {field(values,'assignedTo','Assigned To')}
                  {field(values,'startDate','Start Date','date')}
                  {field(values,'completionDate','Completion Date','date')}
                  {field(values,'downtime','Downtime (Hours)')}
                  {textarea(values,'workSummary','Work Summary')}
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
                    role="Verified By"
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
                    Submit UPS Maintenance Form
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

export default FRM00484_UPSMaintenance;
