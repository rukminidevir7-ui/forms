// FRM00481_FuelForDGSet.jsx
// FRM-00481 / 00482 / 00483 – Fuel for DG Set – Unified Form

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
  department: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  requestedBy: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  contactDetails: Yup.string().required('Required'),
  priority: Yup.string().required('Required'),

  dgSetId: Yup.string().required('Required'),
  currentMeterReading: Yup.number().required('Required'),
  fuelType: Yup.string().required('Required'),
  requestedQuantity: Yup.number().required('Required'),
  requiredDate: Yup.string().required('Required'),

  signatures: Yup.array(),
  attachments: Yup.array(),
  customFields: Yup.array()

});

const initialValues = {

  formId: 'FRM-00481-00483',
  date: '',
  department: '',
  location: '',
  requestedBy: '',
  employeeId: '',
  contactDetails: '',
  priority: '',

  dgSetId: '',
  currentMeterReading: '',
  fuelType: '',
  requestedQuantity: '',
  availableFuelLevel: '',
  purpose: '',
  requiredDate: '',

  reviewedDate: '',
  approvedDate: '',
  approvalComments: '',

  fuelIssuedQuantity: '',
  finalMeterReading: '',
  issuedBy: '',
  completionDate: '',
  completionRemarks: '',

  signatures: [],
  attachments: [],
  customFields: []

};

const FRM00481_FuelForDGSet = () => {

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
      formId="FRM-00481"
      title="Fuel for DG Set – Unified Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Fuel for DG Set form submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00481"
              title="FUEL FOR DG SET"
              department="Facilities & Utilities – Utilities"
            >

              {/* GENERAL INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,'formId','Form ID')}
                  {field(values,'date','Date','date',true)}
                  {field(values,'department','Department', 'text', true)}
                  {field(values,'location','Location', 'text', true)}
                  {field(values,'requestedBy','Requested By', 'text', true)}
                  {field(values,'employeeId','Employee ID', 'text', true)}
                  {field(values,'contactDetails','Contact Details', 'text', true)}
                  {select(values,'priority','Priority',['Low','Medium','High','Critical'])}
                </div>
              </div>

              {/* FUEL REQUIREMENT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Fuel Requirement Details</h3>
                <div className="form-fields">
                  {field(values,'dgSetId','DG Set ID / Number', 'text', true)}
                  {field(values,'currentMeterReading','Current Meter Reading','number',true)}
                  {select(values,'fuelType','Fuel Type',['Diesel','Petrol','Other'])}
                  {field(values,'requestedQuantity','Requested Quantity (Liters)','number',true)}
                  {field(values,'availableFuelLevel','Available Fuel Level','number')}
                  {textarea(values,'purpose','Purpose / Justification')}
                  {field(values,'requiredDate','Required Date','date',true)}
                </div>
              </div>

              {/* APPROVAL SECTION */}
              <div className="form-section">
                <h3 className="form-section-title">Approval</h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px'
                }}>
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

                <div style={{ marginTop: 20 }}>
                  {textarea(values,'approvalComments','Comments')}
                </div>

              </div>

              {/* COMPLETION DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Completion Details</h3>
                <div className="form-fields">
                  {field(values,'fuelIssuedQuantity','Fuel Issued Quantity','number')}
                  {field(values,'finalMeterReading','Final Meter Reading','number')}
                  {field(values,'issuedBy','Issued By')}
                  {field(values,'completionDate','Completion Date','date')}
                  {textarea(values,'completionRemarks','Remarks')}
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

              {/* CUSTOM FIELDS */}
              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Fuel Request
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

export default FRM00481_FuelForDGSet;
