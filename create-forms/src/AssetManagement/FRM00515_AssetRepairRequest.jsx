// FRM00515_AssetRepairRequest.jsx
// FRM-00515 – Asset Repair Request Form

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

  requestDate: Yup.string().required('Required'),
  requestNo: Yup.string().required('Required'),
  projectCostCenter: Yup.string().required('Required'),

  requestedByName: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  designation: Yup.string().required('Required'),
  contactDetails: Yup.string().required('Required'),

  assetDescription: Yup.string().required('Required'),
  assetTagNo: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  custodian: Yup.string().required('Required'),

  problemDescription: Yup.string().required('Required'),
  issueDate: Yup.string().required('Required'),
  severityLevel: Yup.string().required('Required'),
  isOperational: Yup.string().required('Required'),
  requestedAction: Yup.string().required('Required'),
  preferredRepairDate: Yup.string().required('Required'),

  requestedBySignature: Yup.object(),
  reviewedBySignature: Yup.object(),
  approvedBySignature: Yup.object(),

  additionalSignatures: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {

  requestDate: '',
  requestNo: '',
  projectCostCenter: '',

  requestedByName: '',
  department: '',
  designation: '',
  contactDetails: '',

  assetDescription: '',
  assetTagNo: '',
  category: '',
  location: '',
  custodian: '',

  problemDescription: '',
  issueDate: '',
  severityLevel: '',
  isOperational: '',
  requestedAction: '',
  preferredRepairDate: '',
  estimatedDowntime: '',
  remarks: '',

  requestedBySignature: {},
  reviewedBySignature: {},
  approvedBySignature: {},

  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00515_AssetRepairRequest = () => {

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
          <Field as="textarea" name={name} className="form-textarea" rows="3" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-00515" title="Asset Repair Request Form">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Asset Repair Request submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00515"
              title="ASSET REPAIR REQUEST FORM"
              department="Asset Management – Asset Lifecycle"
            >

              {/* 1. Basic Info */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'requestNo','Request No')}
                  {field(values,'projectCostCenter','Project / Cost Center')}
                </div>
              </div>

              {/* 2. Requestor Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Requestor Details</h3>
                <div className="form-fields">
                  {field(values,'requestedByName','Requested By (Name)')}
                  {field(values,'department','Department')}
                  {field(values,'designation','Designation')}
                  {field(values,'contactDetails','Contact Details')}
                </div>
              </div>

              {/* 3. Asset Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Asset Details</h3>
                <div className="form-fields">
                  {field(values,'assetDescription','Asset Description')}
                  {field(values,'assetTagNo','Asset ID / Tag No')}
                  {field(values,'category','Category')}
                  {field(values,'location','Location')}
                  {field(values,'custodian','Custodian')}
                </div>
              </div>

              {/* 4. Issue Details */}
              <div className="form-section">
                <h3 className="form-section-title">4. Issue Details</h3>
                <div className="form-fields">
                  {textarea(values,'problemDescription','Problem Description')}
                  {field(values,'issueDate','Date of Issue Identified','date')}
                  {field(values,'severityLevel','Severity Level')}
                  {field(values,'isOperational','Is Asset Operational? (Y/N)')}
                  {field(values,'requestedAction','Requested Action')}
                  {field(values,'preferredRepairDate','Preferred Repair Date','date')}
                  {field(values,'estimatedDowntime','Estimated Downtime')}
                  {textarea(values,'remarks','Remarks')}
                </div>
              </div>

              {/* 5. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>

                <div className="three-column-signatures">

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Requested By"
                      value={values.requestedBySignature || {}}
                      onChange={(val) => setFieldValue("requestedBySignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Reviewed By"
                      value={values.reviewedBySignature || {}}
                      onChange={(val) => setFieldValue("reviewedBySignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Approved By"
                      value={values.approvedBySignature || {}}
                      onChange={(val) => setFieldValue("approvedBySignature", val)}
                    />
                  </div>

                </div>

                {/* Custom Signatures */}
                <div style={{ marginTop: 30 }}>
                  <FieldArray name="additionalSignatures">
                    {({ push, remove }) => (
                      <>
                        {!isPrintMode && (
                          <button
                            type="button"
                            className="btn-submit"
                            style={{ marginBottom: 20 }}
                            onClick={() => push({ data: {} })}
                          >
                            + Add Custom Signature
                          </button>
                        )}

                        {values.additionalSignatures.map((sig, index) => (
                          <div key={index} style={{ marginBottom: 30, position: "relative" }}>
                            {!isPrintMode && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                style={{
                                  position: "absolute",
                                  right: 0,
                                  top: 0,
                                  background: "red",
                                  color: "#fff",
                                  border: "none",
                                  padding: "5px 10px",
                                  cursor: "pointer"
                                }}
                              >
                                Remove
                              </button>
                            )}

                            <ApprovalSignatureBlock
                              label={`Custom Signature ${index + 1}`}
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

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Asset Repair Request
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

export default FRM00515_AssetRepairRequest;
