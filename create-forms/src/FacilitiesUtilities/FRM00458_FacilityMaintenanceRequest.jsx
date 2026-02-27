// FRM00458_FacilityMaintenanceRequest.jsx
// FRM-00458 – Facility Maintenance Request – Request / Initiation Form

import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormAttachments from '../components/FormAttachments';
import FormCustomFields from '../components/FormCustomFields';
import ApprovalSignatureBlock from "../components/ApprovalSignatureBlock";
import '../styles/FRM00611.css';

const validationSchema = Yup.object({
  requestorName: Yup.string().required('Required'),
  employeeDepartment: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  facilityLocation: Yup.string().required('Required'),
  areaRoom: Yup.string().required('Required'),
  requestDate: Yup.string().required('Required'),
  priority: Yup.string().required('Required'),
  issueDescription: Yup.string().required('Required'),
  requestedWorkDetails: Yup.string().required('Required'),

  requestedBy: Yup.object(),
  reviewedBy: Yup.object(),
  approvedBy: Yup.object(),

  additionalSignatures: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {
  requestorName: '',
  employeeDepartment: '',
  contactNumber: '',
  facilityLocation: '',
  areaRoom: '',
  requestDate: '',
  priority: '',
  issueDescription: '',
  requestedWorkDetails: '',

  requestedBy: {},
  reviewedBy: {},
  approvedBy: {},

  additionalSignatures: [],

  customFields: [],
  attachments: []
};

const FRM00458_FacilityMaintenanceRequest = () => {

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
        <>
          <Field as="textarea" name={name} className="form-textarea" rows="4" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  const select = (values, name, label, options) => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '_________'}</div>
      ) : (
        <>
          <Field as="select" name={name} className="form-input">
            <option value="">-- Select --</option>
            {options.map(o => (
              <option key={o} value={o}>{o}</option>
            ))}
          </Field>
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (
    <ModernFormWrapper
      formId="FRM-00458"
      title="Facility Maintenance Request – Request / Initiation Form"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Facility maintenance request submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00458"
              title="Facility Maintenance Request"
              department="Facilities & Utilities – Facilities Management"
            >

              {/* 1. Requestor Details */}
              <div className="form-section">
                <h3 className="form-section-title">1. Requestor Details</h3>
                <div className="form-fields">
                  {field(values,'requestorName','Requestor Name')}
                  {field(values,'employeeDepartment','Employee ID / Department')}
                  {field(values,'contactNumber','Contact Number')}
                </div>
              </div>

              {/* 2. Facility Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Facility Details</h3>
                <div className="form-fields">
                  {field(values,'facilityLocation','Facility / Location')}
                  {field(values,'areaRoom','Area / Room')}
                  {field(values,'requestDate','Date of Request','date')}
                  {select(values,'priority','Priority',['Low','Medium','High'])}
                </div>
              </div>

              {/* 3. Issue Description */}
              <div className="form-section">
                <h3 className="form-section-title">3. Issue Description</h3>
                <div className="form-fields">
                  {textarea(values,'issueDescription','Issue Description')}
                </div>
              </div>

              {/* 4. Requested Action */}
              <div className="form-section">
                <h3 className="form-section-title">4. Requested Action / Work Details</h3>
                <div className="form-fields">
                  {textarea(values,'requestedWorkDetails','Requested Action / Work Details')}
                </div>
              </div>

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {/* 5. Approval Section */}
              <div className="form-section">
                <h3 className="form-section-title">5. Approval & Authorization</h3>

                <div className="approval-section">

                  {/* Fixed Signatures */}
                  <ApprovalSignatureBlock
                    label="Requested By"
                    value={values.requestedBy || {}}
                    onChange={(val) => setFieldValue("requestedBy", val)}
                  />

                  <ApprovalSignatureBlock
                    label="Reviewed By"
                    value={values.reviewedBy || {}}
                    onChange={(val) => setFieldValue("reviewedBy", val)}
                  />

                  <ApprovalSignatureBlock
                    label="Approved By"
                    value={values.approvedBy || {}}
                    onChange={(val) => setFieldValue("approvedBy", val)}
                  />

                  {/* Dynamic Additional Signatures */}
                  <FieldArray name="additionalSignatures">
                    {({ push, remove }) => (
                      <>
                        {!isPrintMode && (
                          <button
                            type="button"
                            className="btn-submit"
                            style={{ marginBottom: '15px' }}
                            onClick={() => push({ label: "Additional Signature", data: {} })}
                          >
                            + Add Signature
                          </button>
                        )}

                        {values.additionalSignatures.map((sig, index) => (
                          <div key={index} style={{ position: 'relative' }}>
                            {!isPrintMode && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                style={{
                                  position: 'absolute',
                                  right: 0,
                                  top: 0,
                                  background: 'red',
                                  color: '#fff',
                                  border: 'none',
                                  padding: '4px 8px',
                                  cursor: 'pointer'
                                }}
                              >
                                Remove
                              </button>
                            )}

                            <ApprovalSignatureBlock
                              label={`Additional Signature ${index + 1}`}
                              value={sig.data || {}}
                              onChange={(val) =>
                                setFieldValue(`additionalSignatures.${index}.data`, val)
                              }
                            />
                          </div>
                        ))}
                      </>
                    )}
                  </FieldArray>

                </div>
              </div>

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Maintenance Request
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

export default FRM00458_FacilityMaintenanceRequest;
