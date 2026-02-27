// FRM00628_RecruiterVendorEmpanelment.jsx
// FRM-00628 – Recruiter Vendor Empanelment – Request / Approval / Authorization

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

  vendorID: Yup.string().required('Required'),
  vendorAgencyName: Yup.string().required('Required'),
  vendorType: Yup.string().required('Required'),
  contactPersonName: Yup.string().required('Required'),
  contactEmailID: Yup.string().required('Required'),
  contactMobileNumber: Yup.string().required('Required'),
  vendorAddress: Yup.string().required('Required'),
  areasOfExpertise: Yup.string().required('Required'),
  experienceInRecruitment: Yup.string().required('Required'),
  geographicalCoverage: Yup.string().required('Required'),
  proposedCommercialTerms: Yup.string().required('Required'),
  commercialTermsFeePercentage: Yup.string().required('Required'),
  requestedBy: Yup.string().required('Required'),
  requestDate: Yup.string().required('Required'),

  approvalStatus: Yup.string().required('Required'),
  approvedByName: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  empanelmentStatus: Yup.string().required('Required'),

  customFields: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  vendorID: '',
  vendorAgencyName: '',
  vendorType: '',
  contactPersonName: '',
  contactEmailID: '',
  contactMobileNumber: '',
  contactDetails: '',
  vendorAddress: '',
  areasOfExpertise: '',
  experienceInRecruitment: '',
  geographicalCoverage: '',
  commercialTermsExterior: '',
  proposedCommercialTerms: '',
  commercialTermsFeePercentage: '',
  requestedBy: '',
  requestDate: '',

  approvalStatus: '',
  approvedByName: '',
  approvedBy: '',
  approvalDate: '',
  approvalRemarksConditions: '',

  empanelmentStatus: '',
  empanelmentStartDate: '',
  empanelmentEndDate: '',
  recordCreatedDate: '',

  customFields: [],
  signatures: []

};

const FRM00628_RecruiterVendorEmpanelment = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type = 'text') => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || '___________________'}</div>
        : <>
            <Field name={name} type={type} className="form-input" />
            <ErrorMessage name={name} component="div" className="form-error" />
          </>
      }
    </div>
  );

  const textarea = (values, name, label) => (
    <div className="form-field full-width">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || '___________________'}</div>
        : <>
            <Field as="textarea" name={name} rows="3" className="form-textarea" />
            <ErrorMessage name={name} component="div" className="form-error" />
          </>
      }
    </div>
  );

  const select = (values, name, label, options) => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || '___________________'}</div>
        : <>
            <Field as="select" name={name} className="form-input">
              <option value="">-- Select --</option>
              {options.map(o => <option key={o} value={o}>{o}</option>)}
            </Field>
            <ErrorMessage name={name} component="div" className="form-error" />
          </>
      }
    </div>
  );

  return (

    <ModernFormWrapper
      formId="FRM-00628"
      title="Recruiter Vendor Empanelment – Request / Approval / Authorization"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('FRM-00628 Recruiter Vendor Empanelment Submitted Successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00628"
              title="Recruiter Vendor Empanelment – Request / Approval / Authorization"
              department="HR & People Ops"
            >

              {/* SECTION 1 – Vendor Details */}
              <div className="form-section">
                <h3 className="form-section-title">1. Vendor Details</h3>
                <div className="form-fields">
                  {field(values,'vendorID','Vendor ID')}
                  {field(values,'vendorAgencyName','Vendor / Agency Name')}
                  {field(values,'vendorType','Vendor Type')}
                  {field(values,'contactPersonName','Contact Person Name')}
                  {field(values,'contactEmailID','Contact Email ID','email')}
                  {field(values,'contactMobileNumber','Contact Mobile Number')}
                  {textarea(values,'contactDetails','Additional Contact Details')}
                  {textarea(values,'vendorAddress','Vendor Address')}
                  {textarea(values,'areasOfExpertise','Areas of Expertise')}
                  {field(values,'experienceInRecruitment','Experience in Recruitment (Years)')}
                  {field(values,'geographicalCoverage','Geographical Coverage')}
                </div>
              </div>

              {/* SECTION 2 – Commercial Terms */}
              <div className="form-section">
                <h3 className="form-section-title">2. Commercial Terms</h3>
                <div className="form-fields">
                  {textarea(values,'commercialTermsExterior','Existing Commercial Terms')}
                  {textarea(values,'proposedCommercialTerms','Proposed Commercial Terms')}
                  {field(values,'commercialTermsFeePercentage','Fee Percentage (%)')}
                  {field(values,'requestedBy','Requested By')}
                  {field(values,'requestDate','Request Date','date')}
                </div>
              </div>

              {/* SECTION 3 – Approval & Empanelment */}
              <div className="form-section">
                <h3 className="form-section-title">3. Approval & Empanelment Details</h3>
                <div className="form-fields">
                  {select(values,'approvalStatus','Approval Status',['Approved','Rejected','On Hold'])}
                  {field(values,'approvedByName','Approved By Name')}
                  {field(values,'approvedBy','Approved By (Employee ID)')}
                  {field(values,'approvalDate','Approval Date','date')}
                  {textarea(values,'approvalRemarksConditions','Approval Remarks / Conditions')}
                  {select(values,'empanelmentStatus','Empanelment Status',['Active','Inactive','Pending'])}
                  {field(values,'empanelmentStartDate','Empanelment Start Date','date')}
                  {field(values,'empanelmentEndDate','Empanelment End Date','date')}
                  {field(values,'recordCreatedDate','Record Created Date','date')}
                </div>
              </div>

              <FormCustomFields values={values} />
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

export default FRM00628_RecruiterVendorEmpanelment;
