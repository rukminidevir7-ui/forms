// FRM00525_HardwareRequest.jsx
// FRM-00525 – Hardware Request Form

import React, { useState } from 'react';
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

  departmentMeta: Yup.string().required('Required'),
  process: Yup.string().required('Required'),
  formType: Yup.string().required('Required'),
  requestDate: Yup.string().required('Required'),
  requestNo: Yup.string().required('Required'),

  employeeName: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  requestorDepartment: Yup.string().required('Required'),
  designation: Yup.string().required('Required'),
  emailId: Yup.string().email('Invalid Email').required('Required'),
  contactNo: Yup.string().required('Required'),

  items: Yup.array().of(
    Yup.object().shape({
      hardwareDescription: Yup.string().required('Required'),
      category: Yup.string().required('Required'),
      quantity: Yup.number().required('Required'),
      requiredDate: Yup.string().required('Required'),
      businessJustification: Yup.string().required('Required'),
      estimatedCost: Yup.string().required('Required'),
      remarks: Yup.string()
    })
  ).min(1, 'At least one item required'),

  budgetAvailability: Yup.string().required('Required'),
  costCenter: Yup.string().required('Required'),

  requestedBySignature: Yup.object(),
  managerSignature: Yup.object(),
  itSignature: Yup.object(),

  additionalSignatures: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {

  departmentMeta: 'IT & Systems',
  process: 'IT Service Management',
  formType: 'Request',
  requestDate: '',
  requestNo: '',

  employeeName: '',
  employeeId: '',
  requestorDepartment: '',
  designation: '',
  emailId: '',
  contactNo: '',

  items: [
    {
      hardwareDescription: '',
      category: '',
      quantity: '',
      requiredDate: '',
      businessJustification: '',
      estimatedCost: '',
      remarks: ''
    }
  ],

  budgetAvailability: '',
  costCenter: '',
  additionalRemarks: '',

  requestedBySignature: {},
  managerSignature: {},
  itSignature: {},

  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00525_HardwareRequest = () => {

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

  return (
    <ModernFormWrapper formId="FRM-00525" title="Hardware Request Form">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Hardware Request submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00525"
              title="HARDWARE REQUEST FORM"
              department="IT & Systems – IT Service Management"
            >

              {/* 1. Form Metadata */}
              <div className="form-section">
                <h3 className="form-section-title">1. Form Metadata</h3>
                <div className="form-fields">
                  {field(values,'departmentMeta','Department')}
                  {field(values,'process','Process')}
                  {field(values,'formType','Form Type')}
                  {field(values,'requestDate','Request Date','date')}
                  {field(values,'requestNo','Request No')}
                </div>
              </div>

              {/* 2. Requestor Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Requestor Details</h3>
                <div className="form-fields">
                  {field(values,'employeeName','Employee Name')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'requestorDepartment','Department')}
                  {field(values,'designation','Designation')}
                  {field(values,'emailId','Email ID','email')}
                  {field(values,'contactNo','Contact No')}
                </div>
              </div>

              {/* 3. Hardware Table */}
              <div className="form-section">
                <h3 className="form-section-title">3. Hardware Request Details</h3>

                <FieldArray name="items">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <div style={{ marginBottom: 20 }}>
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={() =>
                              push({
                                hardwareDescription: '',
                                category: '',
                                quantity: '',
                                requiredDate: '',
                                businessJustification: '',
                                estimatedCost: '',
                                remarks: ''
                              })
                            }
                          >
                            + Add Item
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Hardware Description</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Required Date</th>
                            <th>Business Justification</th>
                            <th>Estimated Cost</th>
                            <th>Remarks</th>
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {values.items.map((row, index) => (
                            <tr key={index}>
                              <td><Field name={`items.${index}.hardwareDescription`} className="form-input" /></td>
                              <td><Field name={`items.${index}.category`} className="form-input" /></td>
                              <td><Field name={`items.${index}.quantity`} type="number" className="form-input" /></td>
                              <td><Field name={`items.${index}.requiredDate`} type="date" className="form-input" /></td>
                              <td><Field name={`items.${index}.businessJustification`} className="form-input" /></td>
                              <td><Field name={`items.${index}.estimatedCost`} className="form-input" /></td>
                              <td><Field name={`items.${index}.remarks`} className="form-input" /></td>
                              {!isPrintMode && (
                                <td>
                                  <button type="button" onClick={() => remove(index)}>
                                    Remove
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>

                    </>
                  )}
                </FieldArray>
              </div>

              {/* 4. Budget & Financial */}
              <div className="form-section">
                <h3 className="form-section-title">4. Budget & Financial Details</h3>
                <div className="form-fields">
                  {field(values,'budgetAvailability','Budget Availability')}
                  {field(values,'costCenter','Cost Center / Project')}
                  {field(values,'additionalRemarks','Additional Remarks')}
                </div>
              </div>

              {/* 5. Sign-Off */}
              <div className="form-section">
                <h3 className="form-section-title">5. Sign-Off</h3>

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
                      label="Manager Approval"
                      value={values.managerSignature || {}}
                      onChange={(val) => setFieldValue("managerSignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="IT Approval"
                      value={values.itSignature || {}}
                      onChange={(val) => setFieldValue("itSignature", val)}
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
                    Submit Hardware Request
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

export default FRM00525_HardwareRequest;
