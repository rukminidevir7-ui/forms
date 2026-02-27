// FRM00339_NewSupplierApproval.jsx
// FRM-00339 – New Supplier Approval – Approval / Authorization Form

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
  approvalDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  requestedBy: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  supplierId: Yup.string().required('Required'),

  // 2. Supplier Details
  supplierName: Yup.string().required('Required'),
  legalName: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().required('Required'),
  businessType: Yup.string().required('Required'),

  // 3. Evaluation Summary
  dueDiligenceCompleted: Yup.string().required('Required'),
  riskRating: Yup.string().required('Required'),
  complianceCheckStatus: Yup.string().required('Required'),
  recommendation: Yup.string().required('Required'),

  // 4. Approval Decision
  approvalStatus: Yup.string().required('Required'),
  approvalConditions: Yup.string().required('Required'),
  effectiveDate: Yup.string().required('Required'),

  // 5. Authorization
  procurementApproval: Yup.string().required('Required'),
  complianceApproval: Yup.string().required('Required'),
  financeApproval: Yup.string().required('Required'),
  managementApproval: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  // 6. Supporting Information
  supportingDocuments: Yup.string(),
  additionalNotes: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  approvalDate: '',
  department: '',
  requestedBy: '',
  referenceNumber: '',
  supplierId: '',

  supplierName: '',
  legalName: '',
  category: '',
  country: '',
  contactPerson: '',
  email: '',
  phone: '',
  businessType: '',

  dueDiligenceCompleted: '',
  riskRating: '',
  complianceCheckStatus: '',
  recommendation: '',

  approvalStatus: '',
  approvalConditions: '',
  effectiveDate: '',

  procurementApproval: '',
  complianceApproval: '',
  financeApproval: '',
  managementApproval: '',
  approvalComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00339_NewSupplierApproval = () => {

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
      formId="FRM-00339"
      title="New Supplier Approval – Approval / Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('New supplier approval submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00339"
              title="New Supplier Approval"
              department="Procurement & Purchasing – Supplier Management"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'approvalDate','Approval Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'requestedBy','Requested By')}
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
                  {field(values,'contactPerson','Contact Person')}
                  {field(values,'email','Email','email')}
                  {field(values,'phone','Phone')}
                  {field(values,'businessType','Business Type')}
                </div>
              </div>

              {/* 3. Evaluation Summary */}
              <div className="form-section">
                <h3 className="form-section-title">3. Evaluation Summary</h3>
                <div className="form-fields">
                  {select(values,'dueDiligenceCompleted','Due Diligence Completed',['Yes','No'])}
                  {select(values,'riskRating','Risk Rating',['Low','Medium','High','Critical'])}
                  {select(values,'complianceCheckStatus','Compliance Check Status',['Completed','Pending','Not Required'])}
                  {textarea(values,'recommendation','Recommendation')}
                </div>
              </div>

              {/* 4. Approval Decision */}
              <div className="form-section">
                <h3 className="form-section-title">4. Approval Decision</h3>
                <div className="form-fields">
                  {select(values,'approvalStatus','Approval Status',['Approved','Approved with Conditions','Rejected'])}
                  {textarea(values,'approvalConditions','Conditions (if any)')}
                  {field(values,'effectiveDate','Effective Date','date')}
                </div>
              </div>

              {/* 5. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'procurementApproval','Procurement Approval')}
                  {field(values,'complianceApproval','Compliance Approval')}
                  {field(values,'financeApproval','Finance Approval')}
                  {field(values,'managementApproval','Management Approval')}
                  {textarea(values,'approvalComments','Comments')}
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
                    Submit Supplier Approval
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

export default FRM00339_NewSupplierApproval;
