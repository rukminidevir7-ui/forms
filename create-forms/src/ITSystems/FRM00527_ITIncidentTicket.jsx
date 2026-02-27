// FRM00527_ITIncidentTicket.jsx
// FRM-00527 – IT Incident Ticket – Request & Approval Form

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

  ticketNo: Yup.string().required('Required'),
  incidentDate: Yup.string().required('Required'),
  reportedBy: Yup.string().required('Required'),

  employeeName: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  systemName: Yup.string().required('Required'),
  location: Yup.string().required('Required'),

  incidentType: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  impact: Yup.string().required('Required'),

  assignedTo: Yup.string().required('Required'),
  resolutionAction: Yup.string().required('Required'),
  resolutionDate: Yup.string().required('Required'),
  status: Yup.string().required('Required'),

  reportedSignature: Yup.object(),
  managerSignature: Yup.object(),
  itSupportSignature: Yup.object(),

  additionalSignatures: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {

  ticketNo: '',
  incidentDate: '',
  reportedBy: '',

  employeeName: '',
  employeeId: '',
  department: '',
  systemName: '',
  location: '',

  incidentType: '',
  priorityLevel: '',
  description: '',
  impact: '',
  initialAction: '',

  assignedTo: '',
  resolutionAction: '',
  resolutionDate: '',
  status: '',
  remarks: '',

  reportedSignature: {},
  managerSignature: {},
  itSupportSignature: {},

  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00527_ITIncidentTicket = () => {

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
    <ModernFormWrapper formId="FRM-00527" title="IT Incident Ticket – Request & Approval">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('IT Incident Ticket submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00527"
              title="IT INCIDENT TICKET – REQUEST & APPROVAL FORM"
              department="IT & Systems – IT Service Management"
            >

              {/* 1. Ticket Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Ticket Information</h3>
                <div className="form-fields">
                  {field(values,'ticketNo','Ticket No')}
                  {field(values,'incidentDate','Incident Date','date')}
                  {field(values,'reportedBy','Reported By')}
                </div>
              </div>

              {/* 2. User / System Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. User / System Details</h3>
                <div className="form-fields">
                  {field(values,'employeeName','Employee Name')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'department','Department')}
                  {field(values,'systemName','System / Application')}
                  {field(values,'location','Location')}
                </div>
              </div>

              {/* 3. Incident Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Incident Details</h3>
                <div className="form-fields">
                  {field(values,'incidentType','Incident Type')}
                  {field(values,'priorityLevel','Priority Level')}
                  {textarea(values,'description','Description')}
                  {textarea(values,'impact','Impact')}
                  {textarea(values,'initialAction','Initial Action Taken')}
                </div>
              </div>

              {/* 4. Resolution Details */}
              <div className="form-section">
                <h3 className="form-section-title">4. Resolution Details</h3>
                <div className="form-fields">
                  {field(values,'assignedTo','Assigned To')}
                  {textarea(values,'resolutionAction','Resolution Action')}
                  {field(values,'resolutionDate','Resolution Date','date')}
                  {field(values,'status','Status')}
                  {textarea(values,'remarks','Remarks')}
                </div>
              </div>

              {/* 5. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>

                <div className="three-column-signatures">

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Reported By"
                      value={values.reportedSignature || {}}
                      onChange={(val) => setFieldValue("reportedSignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Manager Approval"
                      value={values.managerSignature || {}}
                      onChange={(val) => setFieldValue("managerSignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="IT Support"
                      value={values.itSupportSignature || {}}
                      onChange={(val) => setFieldValue("itSupportSignature", val)}
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
                    Submit IT Incident Ticket
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

export default FRM00527_ITIncidentTicket;
