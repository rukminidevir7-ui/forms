// SubcontractorKYCPackForm.jsx
// FRM-01104 / FRM-01105 – Subcontractor KYC Pack Form

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

const yesNo = ['Yes','No'];

const validationSchema = Yup.object({

  legalCompanyName: Yup.string().required('Required'),
  registeredAddress: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  designation: Yup.string().required('Required'),
  phoneNumber: Yup.string().required('Required'),
  emailId: Yup.string().email('Invalid').required('Required'),
  yearOfEstablishment: Yup.string().required('Required'),

  companyRegistrationNo: Yup.string().required('Required'),
  gstNumber: Yup.string().required('Required'),
  panNumber: Yup.string().required('Required'),
  tradeLicenseNo: Yup.string().required('Required'),
  pfRegistration: Yup.string(),
  esiRegistration: Yup.string(),

  bankName: Yup.string().required('Required'),
  branch: Yup.string().required('Required'),
  accountNumber: Yup.string().required('Required'),
  ifscCode: Yup.string().required('Required'),
  cancelledChequeAttached: Yup.string().required('Required'),

  companyRegCert: Yup.string().required('Required'),
  gstCert: Yup.string().required('Required'),
  panCopy: Yup.string().required('Required'),
  addressProof: Yup.string().required('Required'),
  bankProof: Yup.string().required('Required'),
  otherSupportingDocuments: Yup.string(),

  authorizedSignatoryName: Yup.string().required('Required'),
  declarationDate: Yup.string().required('Required'),
  companySeal: Yup.string(),

  verifiedBy: Yup.string().required('Required'),
  verifierDesignation: Yup.string().required('Required'),
  approvalStatus: Yup.string().required('Required'),
  approvalRemarks: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),

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

  legalCompanyName: '',
  registeredAddress: '',
  contactPerson: '',
  designation: '',
  phoneNumber: '',
  emailId: '',
  yearOfEstablishment: '',

  companyRegistrationNo: '',
  gstNumber: '',
  panNumber: '',
  tradeLicenseNo: '',
  pfRegistration: '',
  esiRegistration: '',

  bankName: '',
  branch: '',
  accountNumber: '',
  ifscCode: '',
  cancelledChequeAttached: '',

  companyRegCert: '',
  gstCert: '',
  panCopy: '',
  addressProof: '',
  bankProof: '',
  otherSupportingDocuments: '',

  authorizedSignatoryName: '',
  declarationDate: '',
  companySeal: '',

  verifiedBy: '',
  verifierDesignation: '',
  approvalStatus: '',
  approvalRemarks: '',
  approvalDate: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const SubcontractorKYCPackForm = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type='text') => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || '___________________'}</div>
        : <>
            <Field name={name} type={type} className="form-input"/>
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  const textarea = (values, name, label) => (
    <div className="form-field full-width">
      <label className="form-label required">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || '___________________'}</div>
        : <>
            <Field as="textarea" name={name} className="form-textarea" rows="2"/>
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  const select = (values, name, label, options=yesNo) => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || '___________________'}</div>
        : <>
            <Field as="select" name={name} className="form-input">
              <option value="">-- Select --</option>
              {options.map(o=> <option key={o} value={o}>{o}</option>)}
            </Field>
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return (

    <ModernFormWrapper
      formId="FRM-01104 / FRM-01105"
      title="Subcontractor KYC Pack Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert('Subcontractor KYC pack saved');
        }}
      >

      {({values,setFieldValue})=>(
        <Form>

          <ModernA4Template
            formId="FRM-01104 / FRM-01105"
            title="Subcontractor KYC Pack Form"
            department="Subcontractor and Contracting"
          >

            {/* Company Details */}
            <div className="form-section">
              <h3 className="form-section-title">Company Details</h3>
              <div className="form-fields">
                {field(values,'legalCompanyName','Legal Company Name')}
                {field(values,'contactPerson','Contact Person')}
                {field(values,'designation','Designation')}
                {field(values,'phoneNumber','Phone Number')}
                {field(values,'emailId','Email ID')}
                {field(values,'yearOfEstablishment','Year of Establishment')}
              </div>
              <div className="form-fields">
                {textarea(values,'registeredAddress','Registered Address')}
              </div>
            </div>

            {/* Statutory */}
            <div className="form-section">
              <h3 className="form-section-title">Statutory Identification</h3>
              <div className="form-fields">
                {field(values,'companyRegistrationNo','Company Registration No')}
                {field(values,'gstNumber','GST Number')}
                {field(values,'panNumber','PAN Number')}
                {field(values,'tradeLicenseNo','Trade License No')}
                {field(values,'pfRegistration','PF Registration')}
                {field(values,'esiRegistration','ESI Registration')}
              </div>
            </div>

            {/* Banking */}
            <div className="form-section">
              <h3 className="form-section-title">Banking Information</h3>
              <div className="form-fields">
                {field(values,'bankName','Bank Name')}
                {field(values,'branch','Branch')}
                {field(values,'accountNumber','Account Number')}
                {field(values,'ifscCode','IFSC Code')}
                {select(values,'cancelledChequeAttached','Cancelled Cheque Attached')}
              </div>
            </div>

            {/* Mandatory Checklist */}
            <div className="form-section">
              <h3 className="form-section-title">Mandatory Attachments Checklist</h3>
              <div className="form-fields">
                {select(values,'companyRegCert','Company Registration Certificate')}
                {select(values,'gstCert','GST Certificate')}
                {select(values,'panCopy','PAN Copy')}
                {select(values,'addressProof','Address Proof')}
                {select(values,'bankProof','Bank Proof')}
              </div>
              <div className="form-fields">
                {field(values,'otherSupportingDocuments','Other Supporting Documents')}
              </div>
            </div>

            {/* ✅ Reusable Blocks */}
            <FormCustomFields values={values} />
            <FormAttachments values={values} />
            <FormSignatures values={values} setFieldValue={setFieldValue} />

            {!isPrintMode && (
              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  Submit KYC Pack
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

export default SubcontractorKYCPackForm;
