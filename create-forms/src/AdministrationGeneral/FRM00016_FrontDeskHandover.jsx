// FRM00016_FrontDeskHandover.jsx
// FRM-00016 – Front Desk Handover Request & Authorization Form

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

  // Basic Information
  requestDate: Yup.string().required('Required'),
  departmentName: Yup.string().required('Required'),
  handoverFrom: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  handoverTo: Yup.string().required('Required'),
  shiftPeriod: Yup.string().required('Required'),

  // Handover Details
  deskArea: Yup.string().required('Required'),
  handoverDateTime: Yup.string().required('Required'),
  keyResponsibilities: Yup.string().required('Required'),
  pendingTasks: Yup.string().required('Required'),

  // Assets
  assetDescription: Yup.string().required('Required'),
  assetQuantity: Yup.number().required('Required'),
  assetCondition: Yup.string().required('Required'),
  assetRemarks: Yup.string().required('Required'),

  // Authorization
  handedOverBy: Yup.string().required('Required'),
  receivedBy: Yup.string().required('Required'),
  reviewedBy: Yup.string().required('Required'),
  approvedBy: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  // Supporting
  supportingDocuments: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  requestDate: '',
  departmentName: '',
  handoverFrom: '',
  employeeId: '',
  contactNumber: '',
  handoverTo: '',
  shiftPeriod: '',

  deskArea: '',
  handoverDateTime: '',
  keyResponsibilities: '',
  pendingTasks: '',

  assetDescription: '',
  assetQuantity: '',
  assetCondition: '',
  assetRemarks: '',

  handedOverBy: '',
  receivedBy: '',
  reviewedBy: '',
  approvedBy: '',
  approvalComments: '',

  supportingDocuments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00016_FrontDeskHandover = () => {

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

  return (

    <ModernFormWrapper
      formId="FRM-00016"
      title="Front Desk Handover Request & Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Front desk handover submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00016"
              title="Front Desk Handover – Request & Authorization"
              department="Administration & General – Office Administration"
            >

              {/* Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'departmentName','Department Name')}
                  {field(values,'handoverFrom','Handover From')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'contactNumber','Contact')}
                  {field(values,'handoverTo','Handover To')}
                  {field(values,'shiftPeriod','Shift / Period')}
                </div>
              </div>

              {/* Handover Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Handover Details</h3>
                <div className="form-fields">
                  {field(values,'deskArea','Area / Desk')}
                  {field(values,'handoverDateTime','Date & Time','datetime-local')}
                  {textarea(values,'keyResponsibilities','Key Responsibilities')}
                  {textarea(values,'pendingTasks','Pending Tasks')}
                </div>
              </div>

              {/* Assets */}
              <div className="form-section">
                <h3 className="form-section-title">3. Assets / Items</h3>
                <div className="form-fields">
                  {field(values,'assetDescription','Item Description')}
                  {field(values,'assetQuantity','Quantity','number')}
                  {field(values,'assetCondition','Condition')}
                  {textarea(values,'assetRemarks','Remarks')}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">4. Authorization</h3>
                <div className="form-fields">
                  {field(values,'handedOverBy','Handed Over By (Name)')}
                  {field(values,'receivedBy','Received By (Name)')}
                  {field(values,'reviewedBy','Reviewed By')}
                  {field(values,'approvedBy','Approved By')}
                  {textarea(values,'approvalComments','Comments')}
                </div>
              </div>

              {/* Supporting */}
              <div className="form-section">
                <h3 className="form-section-title">5. Supporting Information</h3>
                <div className="form-fields">
                  {textarea(values,'supportingDocuments','Supporting Documents / Additional Notes')}
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

export default FRM00016_FrontDeskHandover;
