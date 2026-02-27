// FRM00178_PurchaseAgreement.jsx
// FRM-00178 – Purchase Agreement – Request / Authorization Form

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
  departmentFunction: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  contactDetails: Yup.string().required('Required'),
  agreementType: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // Party Details
  buyerLegalName: Yup.string().required('Required'),
  sellerLegalName: Yup.string().required('Required'),
  sellerAddress: Yup.string().required('Required'),
  sellerContactPerson: Yup.string().required('Required'),
  sellerEmailPhone: Yup.string().required('Required'),
  sellerJurisdiction: Yup.string().required('Required'),

  // Purchase Details
  goodsServicesDescription: Yup.string().required('Required'),
  quantityVolume: Yup.string().required('Required'),
  specificationsRequirements: Yup.string().required('Required'),

  // Commercial Terms
  effectiveDate: Yup.string().required('Required'),
  deliveryDate: Yup.string().required('Required'),
  paymentTerms: Yup.string().required('Required'),
  totalContractValue: Yup.string().required('Required'),
  pricingBasis: Yup.string().required('Required'),
  contractCurrency: Yup.string().required('Required'),

  // Delivery & Acceptance
  deliveryLocation: Yup.string().required('Required'),
  acceptanceCriteria: Yup.string().required('Required'),
  inspectionRequirements: Yup.string().required('Required'),

  // Risk & Compliance
  complianceRequirements: Yup.string().required('Required'),
  keyRisksIdentified: Yup.string().required('Required'),
  insuranceWarrantyRequirements: Yup.string().required('Required'),

  // Authorization
  preparedByConfirmation: Yup.string().required('Required'),
  businessApproval: Yup.string().required('Required'),
  procurementApproval: Yup.string().required('Required'),
  legalApproval: Yup.string().required('Required'),
  managementApproval: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  requestDate: '',
  departmentFunction: '',
  preparedBy: '',
  employeeId: '',
  contactDetails: '',
  agreementType: '',
  priorityLevel: '',

  buyerLegalName: '',
  sellerLegalName: '',
  sellerAddress: '',
  sellerContactPerson: '',
  sellerEmailPhone: '',
  sellerJurisdiction: '',

  goodsServicesDescription: '',
  quantityVolume: '',
  specificationsRequirements: '',

  effectiveDate: '',
  deliveryDate: '',
  paymentTerms: '',
  totalContractValue: '',
  pricingBasis: '',
  contractCurrency: '',

  deliveryLocation: '',
  acceptanceCriteria: '',
  inspectionRequirements: '',

  complianceRequirements: '',
  keyRisksIdentified: '',
  insuranceWarrantyRequirements: '',

  preparedByConfirmation: '',
  businessApproval: '',
  procurementApproval: '',
  legalApproval: '',
  managementApproval: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00178_PurchaseAgreement = () => {

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
      formId="FRM-00178"
      title="Purchase Agreement – Request / Authorization Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Purchase Agreement form submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00178"
              title="Purchase Agreement"
              department="Legal & Contracts – Contracting"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'departmentFunction','Department / Function')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'contactDetails','Contact Details')}
                  {select(values,'agreementType','Agreement Type',['New Purchase','Renewal','Amendment'])}
                  {select(values,'priorityLevel','Priority',['Standard','High','Urgent'])}
                </div>
              </div>

              {/* 2. Party Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Party Details</h3>
                <div className="form-fields">
                  {field(values,'buyerLegalName','Buyer (Organization Legal Name)')}
                  {field(values,'sellerLegalName','Seller / Supplier Legal Name')}
                  {field(values,'sellerAddress','Registered Address')}
                  {field(values,'sellerContactPerson','Contact Person')}
                  {field(values,'sellerEmailPhone','Email / Phone')}
                  {field(values,'sellerJurisdiction','Country / Jurisdiction')}
                </div>
              </div>

              {/* 3. Purchase Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Purchase Details</h3>
                <div className="form-fields">
                  {textarea(values,'goodsServicesDescription','Description of Goods / Services')}
                  {field(values,'quantityVolume','Quantity / Volume')}
                  {textarea(values,'specificationsRequirements','Specifications / Requirements')}
                </div>
              </div>

              {/* 4. Commercial Terms */}
              <div className="form-section">
                <h3 className="form-section-title">4. Commercial Terms</h3>
                <div className="form-fields">
                  {field(values,'effectiveDate','Effective Date','date')}
                  {field(values,'deliveryDate','Delivery Date','date')}
                  {textarea(values,'paymentTerms','Payment Terms')}
                  {field(values,'totalContractValue','Total Contract Value')}
                  {textarea(values,'pricingBasis','Pricing Basis (Unit / Lump Sum / Rate Card)')}
                  {field(values,'contractCurrency','Currency')}
                </div>
              </div>

              {/* 5. Delivery & Acceptance */}
              <div className="form-section">
                <h3 className="form-section-title">5. Delivery & Acceptance</h3>
                <div className="form-fields">
                  {field(values,'deliveryLocation','Delivery Location')}
                  {textarea(values,'acceptanceCriteria','Acceptance Criteria')}
                  {textarea(values,'inspectionRequirements','Inspection Requirements')}
                </div>
              </div>

              {/* 6. Risk & Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">6. Risk & Compliance</h3>
                <div className="form-fields">
                  {textarea(values,'complianceRequirements','Compliance Requirements')}
                  {textarea(values,'keyRisksIdentified','Key Risks Identified')}
                  {textarea(values,'insuranceWarrantyRequirements','Insurance / Warranty Requirements')}
                </div>
              </div>

              {/* 7. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">7. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByConfirmation','Prepared By (Name)')}
                  {field(values,'businessApproval','Business Approval')}
                  {field(values,'procurementApproval','Procurement Approval')}
                  {field(values,'legalApproval','Legal Approval')}
                  {field(values,'managementApproval','Management Approval')}
                  {field(values,'approvalDate','Approval Date','date')}
                  {textarea(values,'approvalComments','Comments')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Purchase Agreement
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

export default FRM00178_PurchaseAgreement;
