// FRM00471_FireSystemMaintenance.jsx
// FRM-00471 – Fire System Maintenance – Request / Initiation Form

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

  requestNumber: Yup.string().required('Required'),
  date: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  facilityName: Yup.string().required('Required'),
  requestedBy: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  email: Yup.string().email().required('Required'),

  maintenanceType: Yup.string().required('Required'),
  systemType: Yup.string().required('Required'),
  assetId: Yup.string().required('Required'),

  issueDescription: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  proposedAction: Yup.string().required('Required'),
  estimatedStartDate: Yup.string().required('Required'),
  estimatedCompletionDate: Yup.string().required('Required'),
  assignedTo: Yup.string().required('Required'),

  signatures: Yup.array(),
  attachments: Yup.array(),
  customFields: Yup.array()

});

const initialValues = {

  requestNumber: '',
  date: '',
  department: '',
  location: '',
  facilityName: '',
  requestedBy: '',
  employeeId: '',
  contactNumber: '',
  email: '',

  maintenanceType: '',
  systemType: '',
  assetId: '',
  equipmentDescription: '',
  installationLocation: '',
  lastServiceDate: '',

  issueDescription: '',
  priorityLevel: '',
  impactDescription: '',

  proposedAction: '',
  requiredMaterials: '',
  estimatedStartDate: '',
  estimatedCompletionDate: '',
  assignedTo: '',

  safetyPrecautions: '',
  permitRequired: '',
  complianceReference: '',

  actualStartDate: '',
  actualCompletionDate: '',
  workSummary: '',
  partsReplaced: '',
  systemStatus: '',

  inspectionBy: '',
  inspectionDate: '',
  systemOperational: '',
  verificationRemarks: '',

  signatures: [],
  attachments: [],
  customFields: []

};

const FRM00471_FireSystemMaintenance = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type = 'text') => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
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
      <label className="form-label required">{label}</label>
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
      formId="FRM-00471"
      title="Fire System Maintenance – Request / Initiation Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Fire System Maintenance request submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00471"
              title="FIRE SYSTEM MAINTENANCE FORM"
              department="Facilities & Utilities – Facilities Management"
            >

              {/* SECTION 1 */}
              <div className="form-section">
                <h3 className="form-section-title">SECTION 1: BASIC DETAILS</h3>
                <div className="form-fields">
                  {field(values,'requestNumber','Request Number')}
                  {field(values,'date','Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'location','Location')}
                  {field(values,'facilityName','Facility Name')}
                  {field(values,'requestedBy','Requested By Name')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'contactNumber','Contact Number')}
                  {field(values,'email','Email')}
                </div>
              </div>

              {/* SECTION 2 */}
              <div className="form-section">
                <h3 className="form-section-title">SECTION 2: MAINTENANCE TYPE</h3>
                <div className="form-fields">
                  {select(values,'maintenanceType','Maintenance Type',[
                    'Preventive Maintenance',
                    'Corrective Maintenance',
                    'Emergency Maintenance',
                    'Scheduled Inspection'
                  ])}
                </div>
              </div>

              {/* SECTION 3 */}
              <div className="form-section">
                <h3 className="form-section-title">SECTION 3: SYSTEM DETAILS</h3>
                <div className="form-fields">
                  {field(values,'systemType','System Type')}
                  {field(values,'assetId','Asset ID')}
                  {field(values,'equipmentDescription','Equipment Description')}
                  {field(values,'installationLocation','Installation Location')}
                  {field(values,'lastServiceDate','Last Service Date','date')}
                </div>
              </div>

              {/* SECTION 4 */}
              <div className="form-section">
                <h3 className="form-section-title">SECTION 4: ISSUE OR SERVICE DETAILS</h3>
                <div className="form-fields">
                  {textarea(values,'issueDescription','Description of Issue / Work Required')}
                  {select(values,'priorityLevel','Priority Level',['Low','Medium','High','Critical'])}
                  {textarea(values,'impactDescription','Impact Description')}
                </div>
              </div>

              {/* SECTION 5 */}
              <div className="form-section">
                <h3 className="form-section-title">SECTION 5: WORK PLAN</h3>
                <div className="form-fields">
                  {textarea(values,'proposedAction','Proposed Action')}
                  {textarea(values,'requiredMaterials','Required Materials')}
                  {field(values,'estimatedStartDate','Estimated Start Date','date')}
                  {field(values,'estimatedCompletionDate','Estimated Completion Date','date')}
                  {field(values,'assignedTo','Assigned Technician / Vendor')}
                </div>
              </div>

              {/* SECTION 6 */}
              <div className="form-section">
                <h3 className="form-section-title">SECTION 6: COMPLIANCE & SAFETY</h3>
                <div className="form-fields">
                  {textarea(values,'safetyPrecautions','Safety Precautions Required')}
                  {field(values,'permitRequired','Permit Required')}
                  {field(values,'complianceReference','Compliance Requirement Reference')}
                </div>
              </div>

              {/* SECTION 7 */}
              <div className="form-section">
                <h3 className="form-section-title">SECTION 7: COMPLETION DETAILS</h3>
                <div className="form-fields">
                  {field(values,'actualStartDate','Actual Start Date','date')}
                  {field(values,'actualCompletionDate','Actual Completion Date','date')}
                  {textarea(values,'workSummary','Work Performed Summary')}
                  {textarea(values,'partsReplaced','Parts Replaced')}
                  {field(values,'systemStatus','System Status After Maintenance')}
                </div>
              </div>

              {/* SECTION 8 */}
              <div className="form-section">
                <h3 className="form-section-title">SECTION 8: VERIFICATION</h3>
                <div className="form-fields">
                  {field(values,'inspectionBy','Inspection Conducted By')}
                  {field(values,'inspectionDate','Inspection Date','date')}
                  {field(values,'systemOperational','System Operational (Yes/No)')}
                  {textarea(values,'verificationRemarks','Remarks')}
                </div>
              </div>

              {/* SECTION 9 – APPROVALS */}
              <div className="form-section">
                <h3 className="form-section-title">SECTION 9: APPROVALS</h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr 1fr',
                  gap: '20px'
                }}>
                  <FormSignatures role="Requested By" values={values} setFieldValue={setFieldValue} />
                  <FormSignatures role="Maintenance Supervisor" values={values} setFieldValue={setFieldValue} />
                  <FormSignatures role="Facility Manager" values={values} setFieldValue={setFieldValue} />
                  <FormSignatures role="Safety Officer" values={values} setFieldValue={setFieldValue} />
                </div>
              </div>

              {/* SECTION 10 */}
              <div className="form-section">
                <h3 className="form-section-title">SECTION 10: ATTACHMENTS</h3>
                {isPrintMode ? (
                  <div className="print-value">
                    {values.attachments?.length > 0 ? 'Documents Attached' : '________________'}
                  </div>
                ) : (
                  <FormAttachments values={values} />
                )}
              </div>

              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Fire System Maintenance Request
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

export default FRM00471_FireSystemMaintenance;
