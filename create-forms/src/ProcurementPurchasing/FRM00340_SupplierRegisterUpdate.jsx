// FRM00340_SupplierRegisterUpdate.jsx
// FRM-00340 – Supplier Register Update – Log / Register Form

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

  // 1. Basic Information
  updateDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  updatedBy: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  supplierId: Yup.string().required('Required'),

  // 2. Supplier Details
  supplierName: Yup.string().required('Required'),
  legalName: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  supplierStatus: Yup.string().required('Required'),
  effectiveDate: Yup.string().required('Required'),

  // 3. Update Details
  updateType: Yup.string().required('Required'),
  fieldsUpdated: Yup.string().required('Required'),
  previousValue: Yup.string().required('Required'),
  newValue: Yup.string().required('Required'),
  updateReason: Yup.string().required('Required'),

  // 4. Review & Approval
  reviewedBy: Yup.string().required('Required'),
  approvalStatus: Yup.string().required('Required'),
  reviewComments: Yup.string().required('Required'),

  // 5. Authorization
  procurementApproval: Yup.string().required('Required'),
  complianceApproval: Yup.string().required('Required'),
  managementApproval: Yup.string().required('Required'),

  // 6. Supporting Information
  supportingDocuments: Yup.string(),
  additionalNotes: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  updateDate: '',
  department: '',
  updatedBy: '',
  referenceNumber: '',
  supplierId: '',

  supplierName: '',
  legalName: '',
  category: '',
  country: '',
  supplierStatus: '',
  effectiveDate: '',

  updateType: '',
  fieldsUpdated: '',
  previousValue: '',
  newValue: '',
  updateReason: '',

  reviewedBy: '',
  approvalStatus: '',
  reviewComments: '',

  procurementApproval: '',
  complianceApproval: '',
  managementApproval: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00340_SupplierRegisterUpdate = () => {

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
      formId="FRM-00340"
      title="Supplier Register Update – Log / Register"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Supplier register update logged successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00340"
              title="Supplier Register Update"
              department="Procurement & Purchasing – Supplier Management"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'updateDate','Update Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'updatedBy','Updated By')}
                  {field(values,'referenceNumber','Reference Number')}
                  {field(values,'supplierId','Supplier ID')}
                </div>
              </div>

              {/* 2. Supplier Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Supplier Details</h3>
                <div className="form-fields">
                  {field(values,'supplierName','Supplier Name')}
                  {field(values,'legalName','Legal Name')}
                  {field(values,'category','Category')}
                  {field(values,'country','Country')}
                  {select(values,'supplierStatus','Status',['Active','Inactive'])}
                  {field(values,'effectiveDate','Effective Date','date')}
                </div>
              </div>

              {/* 3. Update Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Update Details</h3>
                <div className="form-fields">
                  {select(values,'updateType','Type of Update',['Master Data Change','Status Change','Banking Update','Contact Update','Category Update','Other'])}
                  {textarea(values,'fieldsUpdated','Field(s) Updated')}
                  {textarea(values,'previousValue','Previous Value')}
                  {textarea(values,'newValue','New Value')}
                  {textarea(values,'updateReason','Reason for Update')}
                </div>
              </div>

              {/* 4. Review & Approval */}
              <div className="form-section">
                <h3 className="form-section-title">4. Review & Approval</h3>
                <div className="form-fields">
                  {field(values,'reviewedBy','Reviewed By')}
                  {select(values,'approvalStatus','Approval Status',['Approved','Rejected','Pending Review'])}
                  {textarea(values,'reviewComments','Comments')}
                </div>
              </div>

              {/* 5. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'procurementApproval','Procurement Approval')}
                  {field(values,'complianceApproval','Compliance Approval')}
                  {field(values,'managementApproval','Management Approval')}
                </div>
              </div>

              {/* 6. Supporting Information */}
              <div className="form-section">
                <h3 className="form-section-title">6. Supporting Information</h3>
                <div className="form-fields">
                  {textarea(values,'supportingDocuments','Supporting Documents')}
                  {textarea(values,'additionalNotes','Additional Notes')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Register Update
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

export default FRM00340_SupplierRegisterUpdate;
