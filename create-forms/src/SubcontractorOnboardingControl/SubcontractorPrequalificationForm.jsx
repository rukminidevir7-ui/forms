// SubcontractorPrequalificationForm.jsx
// FRM-01101 / FRM-01102 – Subcontractor Prequalification Form

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

  companyName: Yup.string().required('Required'),
  registeredAddress: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  designation: Yup.string().required('Required'),
  phoneNumber: Yup.string().required('Required'),
  emailId: Yup.string().email('Invalid').required('Required'),
  website: Yup.string(),
  yearOfEstablishment: Yup.string().required('Required'),
  businessRegistrationNo: Yup.string().required('Required'),
  gstTaxId: Yup.string().required('Required'),
  natureOfBusiness: Yup.string().required('Required'),

  annualTurnover: Yup.string().required('Required'),
  bankNameBranch: Yup.string().required('Required'),
  panTaxIdentification: Yup.string().required('Required'),

  keyServicesOffered: Yup.string().required('Required'),
  numberOfEmployees: Yup.string().required('Required'),
  keyEquipmentResources: Yup.string().required('Required'),
  certifications: Yup.string().required('Required'),

  majorProjects: Yup.string().required('Required'),
  clientReferences: Yup.string().required('Required'),

  legalCases: Yup.string().required('Required'),
  insuranceDetails: Yup.string().required('Required'),

  authorizedSignatoryName: Yup.string().required('Required'),
  declarationAccepted: Yup.boolean().oneOf([true], 'Required'),
  declarationDate: Yup.string().required('Required'),

  customFields: Yup.array().of(
    Yup.object({
      id: Yup.string(),
      fieldName: Yup.string().required('Required'),
      fieldValue: Yup.string().required('Required')
    })
  ),

  attachments: Yup.array().of(
    Yup.object({
      id: Yup.string(),
      fileName: Yup.string().required('File required')
    })
  ),

  signatures: Yup.array().of(
    Yup.object({
      id: Yup.string(),
      signatureName: Yup.string().required('Required'),
      signatureDate: Yup.string().required('Required'),
      signatureData: Yup.string()
    })
  )

});

const initialValues = {

  companyName: '',
  registeredAddress: '',
  contactPerson: '',
  designation: '',
  phoneNumber: '',
  emailId: '',
  website: '',
  yearOfEstablishment: '',
  businessRegistrationNo: '',
  gstTaxId: '',
  natureOfBusiness: '',

  annualTurnover: '',
  bankNameBranch: '',
  panTaxIdentification: '',

  keyServicesOffered: '',
  numberOfEmployees: '',
  keyEquipmentResources: '',
  certifications: '',

  majorProjects: '',
  clientReferences: '',

  legalCases: '',
  insuranceDetails: '',

  authorizedSignatoryName: '',
  declarationAccepted: false,
  declarationDate: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const SubcontractorPrequalificationForm = () => {

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
          <Field as="textarea" name={name} className="form-textarea" rows="2" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (

    <ModernFormWrapper
      formId="FRM-01101 / FRM-01102"
      title="Subcontractor Prequalification Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Subcontractor prequalification form saved');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-01101 / FRM-01102"
              title="Subcontractor Prequalification Form"
              department="Subcontractor Onboarding Control"
            >

              {/* Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">Basic Information</h3>
                <div className="form-fields">
                  {field(values,'companyName','Company Name')}
                  {field(values,'contactPerson','Contact Person')}
                  {field(values,'designation','Designation')}
                  {field(values,'phoneNumber','Phone Number')}
                  {field(values,'emailId','Email ID')}
                  {field(values,'website','Website')}
                  {field(values,'yearOfEstablishment','Year of Establishment')}
                  {field(values,'businessRegistrationNo','Business Registration No')}
                  {field(values,'gstTaxId','GST / Tax ID')}
                </div>
                <div className="form-fields">
                  {textarea(values,'registeredAddress','Registered Address')}
                  {textarea(values,'natureOfBusiness','Nature of Business')}
                </div>
              </div>

              {/* Financial */}
              <div className="form-section">
                <h3 className="form-section-title">Financial Information</h3>
                <div className="form-fields">
                  {field(values,'annualTurnover','Annual Turnover (Last 3 Years)')}
                  {field(values,'bankNameBranch','Bank Name and Branch')}
                  {field(values,'panTaxIdentification','PAN / Tax Identification')}
                </div>
              </div>

              {/* Technical */}
              <div className="form-section">
                <h3 className="form-section-title">Technical Capability</h3>
                <div className="form-fields">
                  {textarea(values,'keyServicesOffered','Key Services Offered')}
                  {field(values,'numberOfEmployees','Number of Employees')}
                  {textarea(values,'keyEquipmentResources','Key Equipment / Resources')}
                  {field(values,'certifications','Certifications')}
                </div>
              </div>

              {/* Experience */}
              <div className="form-section">
                <h3 className="form-section-title">Experience and References</h3>
                <div className="form-fields">
                  {textarea(values,'majorProjects','Major Projects Completed')}
                  {textarea(values,'clientReferences','Client References')}
                </div>
              </div>

              {/* Compliance */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance and Declaration</h3>
                <div className="form-fields">
                  {textarea(values,'legalCases','Legal Cases')}
                  {textarea(values,'insuranceDetails','Insurance Details')}
                  {field(values,'authorizedSignatoryName','Authorized Signatory Name')}
                  {field(values,'declarationDate','Date','date')}
                </div>

                {!isPrintMode && (
                  <div className="form-field full-width">
                    <label className="form-label required">
                      <Field type="checkbox" name="declarationAccepted" />
                      &nbsp;I declare that the information provided is true
                    </label>
                    <ErrorMessage name="declarationAccepted" component="div" className="form-error" />
                  </div>
                )}
              </div>

              {/* ✅ Reusable Components */}
              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">Submit Form</button>
                </div>
              )}

            </ModernA4Template>

          </Form>

        )}

      </Formik>

    </ModernFormWrapper>

  );

};

export default SubcontractorPrequalificationForm;
