import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import SignatureComponent from '../components/SignatureComponent';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({
  candidateName: Yup.string().required('Candidate Name is required'),
  fatherHusbandName: Yup.string().required('Father / Husband Name is required'),
  gender: Yup.string().required('Gender is required'),
  dateOfBirth: Yup.string().required('Date of Birth is required'),
  mobileNumber: Yup.string().required('Mobile Number is required'),
  emailID: Yup.string().email('Invalid email').required('Email ID is required'),
  alternateMobileNumber: Yup.string(),
  alternateContactRelation: Yup.string(),
  maritalStatus: Yup.string().required('Marital Status is required'),
  nationality: Yup.string().required('Nationality is required'),
  religion: Yup.string(),
  caste: Yup.string(),
  category: Yup.string().required('Category is required'),
  permanentAddress: Yup.string().required('Permanent Address is required'),
  presentMailingAddress: Yup.string().required('Present Mailing Address is required'),
  panNumber: Yup.string().required('PAN Number is required'),
  aadhaarNumber: Yup.string().required('Aadhaar Number is required'),
  epfMember: Yup.string().required('EPF Member is required'),
  uanNumber: Yup.string(),
  esiMember: Yup.string().required('ESI Member is required'),
  esicNumber: Yup.string(),
  highestQualification: Yup.string().required('Highest Qualification is required'),
  additionalCertifications: Yup.string(),
  experienceInBrief: Yup.string().required('Experience in Brief is required'),
  totalYearsExperience: Yup.string().required('Total Years of Experience is required'),
  currentEmployer: Yup.string(),
  currentCTC: Yup.string(),
  expectedCTC: Yup.string(),
  familyDetails: Yup.array().of(
    Yup.object({
      familyMemberName: Yup.string(),
      relationship: Yup.string(),
      dateOfBirth: Yup.string(),
      natureOfJobBusiness: Yup.string(),
      monthlyIncome: Yup.string(),
      contactNumber: Yup.string()
    })
  ),
  attachments: Yup.object({
    candidatePhoto: Yup.string(),
    panCardCopy: Yup.string(),
    aadhaarCopy: Yup.string(),
    educationalCertificates: Yup.string(),
    experienceCertificates: Yup.string(),
    resume: Yup.string(),
    epfUanScreenshot: Yup.string()
  }),
  customFields: Yup.array().of(
    Yup.object({
      fieldName: Yup.string(),
      fieldValue: Yup.string()
    })
  )
});

const initialValues = {
  candidateName: '',
  fatherHusbandName: '',
  gender: '',
  dateOfBirth: '',
  mobileNumber: '',
  emailID: '',
  alternateMobileNumber: '',
  alternateContactRelation: '',
  maritalStatus: '',
  nationality: '',
  religion: '',
  caste: '',
  category: '',
  permanentAddress: '',
  presentMailingAddress: '',
  panNumber: '',
  aadhaarNumber: '',
  epfMember: '',
  uanNumber: '',
  esiMember: '',
  esicNumber: '',
  highestQualification: '',
  additionalCertifications: '',
  experienceInBrief: '',
  totalYearsExperience: '',
  currentEmployer: '',
  currentCTC: '',
  expectedCTC: '',
  familyDetails: [],
  attachments: {
    candidatePhoto: '',
    panCardCopy: '',
    aadhaarCopy: '',
    educationalCertificates: '',
    experienceCertificates: '',
    resume: '',
    epfUanScreenshot: ''
  },
  customFields: [],
  signatures: {
    requestedBy: { type: '', data: '', name: '' }
  }
};

const FRM00631 = () => {
  const { isPrintMode } = usePrintMode();

  const renderFormContent = (values, setFieldValue, errors, touched) => (
    <ModernA4Template formId="FRM-00631" title="Recruitment MIS Update – Request / Initiation Form" department="HR & People Ops">
      {/* 👤 Personal Details Section */}
      <div className="form-section">
        <h3 className="form-section-title">Personal Details</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field">
              <label className="form-label required">Candidate Name</label>
              {isPrintMode ? (
                <div className="print-value">{values.candidateName || '___________________'}</div>
              ) : (
                <>
                  <Field name="candidateName" type="text" className="form-input" placeholder="Enter candidate name" />
                  <ErrorMessage name="candidateName" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
            <div className="form-field">
              <label className="form-label required">Father / Husband Name</label>
              {isPrintMode ? (
                <div className="print-value">{values.fatherHusbandName || '___________________'}</div>
              ) : (
                <>
                  <Field name="fatherHusbandName" type="text" className="form-input" placeholder="Enter father/husband name" />
                  <ErrorMessage name="fatherHusbandName" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field">
              <label className="form-label required">Gender</label>
              {isPrintMode ? (
                <div className="print-value">{values.gender || '___________________'}</div>
              ) : (
                <>
                  <Field name="gender" as="select" className="form-input">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage name="gender" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
            <div className="form-field">
              <label className="form-label required">Date of Birth</label>
              {isPrintMode ? (
                <div className="print-value">{values.dateOfBirth || '___________________'}</div>
              ) : (
                <>
                  <Field name="dateOfBirth" type="date" className="form-input" />
                  <ErrorMessage name="dateOfBirth" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
            <div className="form-field">
              <label className="form-label required">Marital Status</label>
              {isPrintMode ? (
                <div className="print-value">{values.maritalStatus || '___________________'}</div>
              ) : (
                <>
                  <Field name="maritalStatus" as="select" className="form-input">
                    <option value="">Select</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </Field>
                  <ErrorMessage name="maritalStatus" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field">
              <label className="form-label required">Mobile Number</label>
              {isPrintMode ? (
                <div className="print-value">{values.mobileNumber || '___________________'}</div>
              ) : (
                <>
                  <Field name="mobileNumber" type="tel" className="form-input" placeholder="10 digit mobile number" />
                  <ErrorMessage name="mobileNumber" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
            <div className="form-field">
              <label className="form-label required">Email ID</label>
              {isPrintMode ? (
                <div className="print-value">{values.emailID || '___________________'}</div>
              ) : (
                <>
                  <Field name="emailID" type="email" className="form-input" placeholder="Enter email address" />
                  <ErrorMessage name="emailID" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field">
              <label className="form-label">Alternate Mobile Number</label>
              {isPrintMode ? (
                <div className="print-value">{values.alternateMobileNumber || '___________________'}</div>
              ) : (
                <>
                  <Field name="alternateMobileNumber" type="tel" className="form-input" placeholder="Alternate mobile" />
                  <ErrorMessage name="alternateMobileNumber" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
            <div className="form-field">
              <label className="form-label">Alternate Contact Relation</label>
              {isPrintMode ? (
                <div className="print-value">{values.alternateContactRelation || '___________________'}</div>
              ) : (
                <>
                  <Field name="alternateContactRelation" type="text" className="form-input" placeholder="Relation to alternate contact" />
                  <ErrorMessage name="alternateContactRelation" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field">
              <label className="form-label">Nationality</label>
              {isPrintMode ? (
                <div className="print-value">{values.nationality || '___________________'}</div>
              ) : (
                <>
                  <Field name="nationality" type="text" className="form-input" placeholder="Nationality" />
                  <ErrorMessage name="nationality" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
            <div className="form-field">
              <label className="form-label">Religion</label>
              {isPrintMode ? (
                <div className="print-value">{values.religion || '___________________'}</div>
              ) : (
                <>
                  <Field name="religion" type="text" className="form-input" placeholder="Religion" />
                  <ErrorMessage name="religion" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
            <div className="form-field">
              <label className="form-label">Caste</label>
              {isPrintMode ? (
                <div className="print-value">{values.caste || '___________________'}</div>
              ) : (
                <>
                  <Field name="caste" type="text" className="form-input" placeholder="Caste" />
                  <ErrorMessage name="caste" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
          </div>

          <div className="form-field" style={{ marginTop: '15px' }}>
            <label className="form-label required">Category (SC / ST / BC / MBC / OBC / GENERAL)</label>
            {isPrintMode ? (
              <div className="print-value">{values.category || '___________________'}</div>
            ) : (
              <>
                <Field name="category" as="select" className="form-input">
                  <option value="">Select Category</option>
                  <option value="SC">SC (Scheduled Caste)</option>
                  <option value="ST">ST (Scheduled Tribe)</option>
                  <option value="BC">BC (Backward Class)</option>
                  <option value="MBC">MBC (Most Backward Class)</option>
                  <option value="OBC">OBC (Other Backward Class)</option>
                  <option value="GENERAL">GENERAL</option>
                </Field>
                <ErrorMessage name="category" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* 📍 Address Details */}
      <div className="form-section">
        <h3 className="form-section-title">Address Details</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Permanent Address</label>
            {isPrintMode ? (
              <div className="print-value" style={{ whiteSpace: 'pre-wrap' }}>{values.permanentAddress || '___________________'}</div>
            ) : (
              <>
                <Field name="permanentAddress" as="textarea" className="form-input" placeholder="Enter permanent address" rows="3" />
                <ErrorMessage name="permanentAddress" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
              </>
            )}
          </div>

          <div className="form-field" style={{ marginTop: '15px' }}>
            <label className="form-label required">Present Mailing Address</label>
            {isPrintMode ? (
              <div className="print-value" style={{ whiteSpace: 'pre-wrap' }}>{values.presentMailingAddress || '___________________'}</div>
            ) : (
              <>
                <Field name="presentMailingAddress" as="textarea" className="form-input" placeholder="Enter present mailing address" rows="3" />
                <ErrorMessage name="presentMailingAddress" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* 🏛️ Government / Compliance Details */}
      <div className="form-section">
        <h3 className="form-section-title">Government / Compliance Details</h3>
        <div className="form-fields">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-field">
              <label className="form-label required">PAN Number (Mandatory)</label>
              {isPrintMode ? (
                <div className="print-value">{values.panNumber || '___________________'}</div>
              ) : (
                <>
                  <Field name="panNumber" type="text" className="form-input" placeholder="PAN Number" />
                  <ErrorMessage name="panNumber" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
            <div className="form-field">
              <label className="form-label required">Aadhaar Number (Mandatory)</label>
              {isPrintMode ? (
                <div className="print-value">{values.aadhaarNumber || '___________________'}</div>
              ) : (
                <>
                  <Field name="aadhaarNumber" type="text" className="form-input" placeholder="Aadhaar Number" />
                  <ErrorMessage name="aadhaarNumber" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field">
              <label className="form-label required">EPF Member (Yes / No)</label>
              {isPrintMode ? (
                <div className="print-value">{values.epfMember || '___________________'}</div>
              ) : (
                <>
                  <Field name="epfMember" as="select" className="form-input">
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </Field>
                  <ErrorMessage name="epfMember" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
            <div className="form-field">
              <label className="form-label">UAN Number (If EPF Yes)</label>
              {isPrintMode ? (
                <div className="print-value">{values.uanNumber || '___________________'}</div>
              ) : (
                <>
                  <Field name="uanNumber" type="text" className="form-input" placeholder="UAN Number" />
                  <ErrorMessage name="uanNumber" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field">
              <label className="form-label required">ESI Member (Yes / No)</label>
              {isPrintMode ? (
                <div className="print-value">{values.esiMember || '___________________'}</div>
              ) : (
                <>
                  <Field name="esiMember" as="select" className="form-input">
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </Field>
                  <ErrorMessage name="esiMember" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
            <div className="form-field">
              <label className="form-label">ESIC Number (If Yes)</label>
              {isPrintMode ? (
                <div className="print-value">{values.esicNumber || '___________________'}</div>
              ) : (
                <>
                  <Field name="esicNumber" type="text" className="form-input" placeholder="ESIC Number" />
                  <ErrorMessage name="esicNumber" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 🎓 Educational Details */}
      <div className="form-section">
        <h3 className="form-section-title">Educational Details</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Highest Qualification</label>
            {isPrintMode ? (
              <div className="print-value">{values.highestQualification || '___________________'}</div>
            ) : (
              <>
                <Field name="highestQualification" type="text" className="form-input" placeholder="e.g., B.Tech, MBA, etc." />
                <ErrorMessage name="highestQualification" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
              </>
            )}
          </div>

          <div className="form-field" style={{ marginTop: '15px' }}>
            <label className="form-label">Additional Certifications</label>
            {isPrintMode ? (
              <div className="print-value" style={{ whiteSpace: 'pre-wrap' }}>{values.additionalCertifications || '___________________'}</div>
            ) : (
              <>
                <Field name="additionalCertifications" as="textarea" className="form-input" placeholder="List additional certifications" rows="2" />
                <ErrorMessage name="additionalCertifications" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* 💼 Experience Details */}
      <div className="form-section">
        <h3 className="form-section-title">Experience Details</h3>
        <div className="form-fields">
          <div className="form-field">
            <label className="form-label required">Experience in Brief</label>
            {isPrintMode ? (
              <div className="print-value" style={{ whiteSpace: 'pre-wrap' }}>{values.experienceInBrief || '___________________'}</div>
            ) : (
              <>
                <Field name="experienceInBrief" as="textarea" className="form-input" placeholder="Brief description of experience" rows="2" />
                <ErrorMessage name="experienceInBrief" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
              </>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div className="form-field">
              <label className="form-label required">Total Years of Experience</label>
              {isPrintMode ? (
                <div className="print-value">{values.totalYearsExperience || '___________________'}</div>
              ) : (
                <>
                  <Field name="totalYearsExperience" type="number" className="form-input" placeholder="Years" />
                  <ErrorMessage name="totalYearsExperience" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
            <div className="form-field">
              <label className="form-label">Current Employer</label>
              {isPrintMode ? (
                <div className="print-value">{values.currentEmployer || '___________________'}</div>
              ) : (
                <>
                  <Field name="currentEmployer" type="text" className="form-input" placeholder="Current employer name" />
                  <ErrorMessage name="currentEmployer" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
            <div className="form-field">
              <label className="form-label">Current CTC</label>
              {isPrintMode ? (
                <div className="print-value">{values.currentCTC || '___________________'}</div>
              ) : (
                <>
                  <Field name="currentCTC" type="text" className="form-input" placeholder="Current CTC" />
                  <ErrorMessage name="currentCTC" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
                </>
              )}
            </div>
          </div>

          <div className="form-field" style={{ marginTop: '15px' }}>
            <label className="form-label">Expected CTC</label>
            {isPrintMode ? (
              <div className="print-value">{values.expectedCTC || '___________________'}</div>
            ) : (
              <>
                <Field name="expectedCTC" type="text" className="form-input" placeholder="Expected CTC" />
                <ErrorMessage name="expectedCTC" component="div" style={{ color: '#ff0000', fontSize: '12px', marginTop: '5px' }} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* 👨‍👩‍👧‍👦 Family Details */}
      <div className="form-section">
        <h3 className="form-section-title">Family Details (Optional)</h3>
        <FieldArray name="familyDetails">
          {(fieldArrayProps) => (
            <div>
              {!isPrintMode && (
                <div style={{ overflowX: 'auto', marginBottom: '15px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                    <thead>
                      <tr style={{ backgroundColor: 'var(--theme-primary)', color: 'white' }}>
                        <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Family Member Name</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Relationship</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Date of Birth</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Nature of Job/Business</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Monthly Income</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'left' }}>Contact Number</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fieldArrayProps.form.values.familyDetails.map((family, index) => (
                        <tr key={family.id || index}>
                          <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                            <Field name={`familyDetails.${index}.familyMemberName`} className="form-input" placeholder="Name" style={{ width: '100%' }} />
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                            <Field name={`familyDetails.${index}.relationship`} className="form-input" placeholder="Relationship" style={{ width: '100%' }} />
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                            <Field name={`familyDetails.${index}.dateOfBirth`} type="date" className="form-input" style={{ width: '100%' }} />
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                            <Field name={`familyDetails.${index}.natureOfJobBusiness`} className="form-input" placeholder="Job/Business" style={{ width: '100%' }} />
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                            <Field name={`familyDetails.${index}.monthlyIncome`} className="form-input" placeholder="Income" style={{ width: '100%' }} />
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                            <Field name={`familyDetails.${index}.contactNumber`} className="form-input" placeholder="Contact" style={{ width: '100%' }} />
                          </td>
                          <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
                            <button type="button" onClick={() => fieldArrayProps.remove(index)} style={{ padding: '4px 8px', backgroundColor: '#d9534f', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '11px' }}>
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {!isPrintMode && (
                <button type="button" onClick={() => fieldArrayProps.push({ id: uuidv4(), familyMemberName: '', relationship: '', dateOfBirth: '', natureOfJobBusiness: '', monthlyIncome: '', contactNumber: '' })} style={{ padding: '8px 16px', backgroundColor: '#5cb85c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', marginBottom: '15px' }}>
                  + Add Family Member
                </button>
              )}
            </div>
          )}
        </FieldArray>
      </div>

      {/* 📎 Attachments */}
      {!isPrintMode && (
        <div className="form-section">
          <h3 className="form-section-title">Attachments Required</h3>
          <div className="form-fields">
            <div className="form-field">
              <label className="form-label">Candidate Photo</label>
              <input type="file" accept="image/*" onChange={(e) => { const file = e.target.files[0]; if (file) { const reader = new FileReader(); reader.onloadend = () => setFieldValue('attachments.candidatePhoto', reader.result); reader.readAsDataURL(file); }}} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', width: '100%' }} />
            </div>

            <div className="form-field" style={{ marginTop: '15px' }}>
              <label className="form-label">PAN Card Copy</label>
              <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => { const file = e.target.files[0]; if (file) { const reader = new FileReader(); reader.onloadend = () => setFieldValue('attachments.panCardCopy', reader.result); reader.readAsDataURL(file); }}} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', width: '100%' }} />
            </div>

            <div className="form-field" style={{ marginTop: '15px' }}>
              <label className="form-label">Aadhaar Copy</label>
              <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => { const file = e.target.files[0]; if (file) { const reader = new FileReader(); reader.onloadend = () => setFieldValue('attachments.aadhaarCopy', reader.result); reader.readAsDataURL(file); }}} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', width: '100%' }} />
            </div>

            <div className="form-field" style={{ marginTop: '15px' }}>
              <label className="form-label">Educational Certificates</label>
              <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => { const file = e.target.files[0]; if (file) { const reader = new FileReader(); reader.onloadend = () => setFieldValue('attachments.educationalCertificates', reader.result); reader.readAsDataURL(file); }}} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', width: '100%' }} />
            </div>

            <div className="form-field" style={{ marginTop: '15px' }}>
              <label className="form-label">Experience Certificates</label>
              <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => { const file = e.target.files[0]; if (file) { const reader = new FileReader(); reader.onloadend = () => setFieldValue('attachments.experienceCertificates', reader.result); reader.readAsDataURL(file); }}} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', width: '100%' }} />
            </div>

            <div className="form-field" style={{ marginTop: '15px' }}>
              <label className="form-label">Resume</label>
              <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => { const file = e.target.files[0]; if (file) { const reader = new FileReader(); reader.onloadend = () => setFieldValue('attachments.resume', reader.result); reader.readAsDataURL(file); }}} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', width: '100%' }} />
            </div>

            <div className="form-field" style={{ marginTop: '15px' }}>
              <label className="form-label">EPF UAN Screenshot (If Applicable)</label>
              <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => { const file = e.target.files[0]; if (file) { const reader = new FileReader(); reader.onloadend = () => setFieldValue('attachments.epfUanScreenshot', reader.result); reader.readAsDataURL(file); }}} style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', width: '100%' }} />
            </div>
          </div>
        </div>
      )}

      {/* 🖊️ Signature */}
      {!isPrintMode && (
        <div className="form-section">
          <h3 className="form-section-title">Requested By</h3>
          <div className="form-fields">
            <SignatureComponent label="Requested By Signature" onChange={(data) => setFieldValue('signatures.requestedBy.data', data)} />
            <div style={{ marginTop: '15px' }}>
              <label className="form-label">Name (Print)</label>
              <Field name="signatures.requestedBy.name" type="text" className="form-input" placeholder="Enter name" />
            </div>
          </div>
        </div>
      )}
    </ModernA4Template>
  );

  return (
    <ModernFormWrapper formId="FRM-00631" title="Recruitment MIS Update – Request / Initiation Form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Form Submitted:', values);
          alert('Form submitted successfully!');
        }}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            {renderFormContent(values, setFieldValue, errors, touched)}
            {!isPrintMode && (
              <div style={{ textAlign: 'center', marginTop: '30px', paddingBottom: '30px' }}>
                <button type="submit" style={{ padding: '12px 30px', backgroundColor: '#5cb85c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', marginRight: '10px' }}>
                  Save Form
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00631;
