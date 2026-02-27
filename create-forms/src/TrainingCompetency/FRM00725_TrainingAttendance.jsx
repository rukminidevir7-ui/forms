// FRM00725_TrainingAttendanceRegister.jsx
// FRM-00725 – Training Attendance Register (Single)

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { usePrintMode } from "../PrintModeContext";
import ModernFormWrapper from "../components/ModernFormWrapper";
import ModernA4Template from "../components/ModernA4Template";
import ApprovalSignatureBlock from "../components/ApprovalSignatureBlock";
import FormAttachments from "../components/FormAttachments";
import FormCustomFields from "../components/FormCustomFields";
import "../styles/FRM00611.css";

const validationSchema = Yup.object({
  trainingTitle: Yup.string().required("Required"),
  trainingCode: Yup.string().required("Required"),
  trainerName: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  trainingDates: Yup.string().required("Required"),
});

const initialValues = {
  trainingTitle: "",
  trainingCode: "",
  trainerName: "",
  department: "",
  trainingDates: "",
  venue: "",
  duration: "",

  participants: [
    {
      employeeName: "",
      empId: "",
      dept: "",
      designation: "",
      inTime: "",
      outTime: "",
      signature: "",
      dynamicFields: {}
    }
  ],

  trainerSignature: {},
  hrSignature: {},

  additionalSignatures: [],

  documentNo: "",
  revisionNo: "",

  attachments: [],
  customFields: []
};

const FRM00725_TrainingAttendanceRegister = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const columnName = prompt("Enter New Field Name");
    if (!columnName) return;

    const key = columnName.replace(/\s+/g, "");

    if (dynamicColumns.find(col => col.key === key)) {
      alert("Field already exists");
      return;
    }

    setDynamicColumns([...dynamicColumns, { key, label: columnName }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
  };

  const renderField = (values, name, label, type = "text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : <Field name={name} type={type} className="form-input" />
      }
    </div>
  );

  return (
    <ModernFormWrapper
      formId="FRM-00725"
      title="Training Attendance Register"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("Training Attendance Register Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00725"
              title="TRAINING ATTENDANCE REGISTER"
              department="Training & Competency"
              process="Training Operations"
            >

              {/* HEADER */}
              <div className="form-section">
                <h3 className="form-section-title">Training Details</h3>
                <div className="form-fields">
                  {renderField(values,"trainingTitle","Training Title")}
                  {renderField(values,"trainingCode","Training Code")}
                  {renderField(values,"trainerName","Trainer Name")}
                  {renderField(values,"department","Department")}
                  {renderField(values,"trainingDates","Training Date(s)")}
                  {renderField(values,"venue","Venue")}
                  {renderField(values,"duration","Duration")}
                </div>
              </div>

              {/* ATTENDANCE TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">Attendance Register</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 15 }}>
                    <button
                      type="button"
                      className="btn-submit"
                      onClick={addColumn}
                      style={{ marginRight: 10 }}
                    >
                      + Add Field
                    </button>
                  </div>
                )}

                <FieldArray name="participants">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          style={{ marginBottom: 15 }}
                          onClick={() =>
                            push({
                              employeeName: "",
                              empId: "",
                              dept: "",
                              designation: "",
                              inTime: "",
                              outTime: "",
                              signature: "",
                              dynamicFields: {}
                            })
                          }
                        >
                          + Add Participant
                        </button>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Employee Name</th>
                            <th>Emp ID</th>
                            <th>Dept</th>
                            <th>Designation</th>
                            <th>In Time</th>
                            <th>Out Time</th>
                            <th>Signature</th>

                            {dynamicColumns.map(col => (
                              <th key={col.key}>
                                {col.label}
                                {!isPrintMode && (
                                  <button
                                    type="button"
                                    style={{ marginLeft: 6 }}
                                    onClick={() => removeColumn(col.key)}
                                  >
                                    x
                                  </button>
                                )}
                              </th>
                            ))}

                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>

                        <tbody>
                          {values.participants.map((row, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>

                              <td><Field name={`participants.${index}.employeeName`} className="form-input" /></td>
                              <td><Field name={`participants.${index}.empId`} className="form-input" /></td>
                              <td><Field name={`participants.${index}.dept`} className="form-input" /></td>
                              <td><Field name={`participants.${index}.designation`} className="form-input" /></td>
                              <td><Field type="time" name={`participants.${index}.inTime`} className="form-input" /></td>
                              <td><Field type="time" name={`participants.${index}.outTime`} className="form-input" /></td>
                              <td><Field name={`participants.${index}.signature`} className="form-input" /></td>

                              {dynamicColumns.map(col => (
                                <td key={col.key}>
                                  <Field
                                    name={`participants.${index}.dynamicFields.${col.key}`}
                                    className="form-input"
                                  />
                                </td>
                              ))}

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

              {/* FOOTER */}
              <div className="form-section">
                <h3 className="form-section-title">Footer & Verification</h3>

                <div className="form-field">
                  <label className="form-label">Total Participants</label>
                  <div className="print-value">
                    {values.participants.length}
                  </div>
                </div>

                <div className="three-column-signatures" style={{ marginTop: 20 }}>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Trainer Signature"
                      value={values.trainerSignature}
                      onChange={(val) => setFieldValue("trainerSignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="HR Verification"
                      value={values.hrSignature}
                      onChange={(val) => setFieldValue("hrSignature", val)}
                    />
                  </div>

                </div>

                {/* CUSTOM SIGNATURES */}
                <div style={{ marginTop: 30 }}>
                  <FieldArray name="additionalSignatures">
                    {({ push, remove }) => (
                      <>
                        {!isPrintMode && (
                          <button
                            type="button"
                            className="btn-submit"
                            style={{ marginBottom: 15 }}
                            onClick={() => push({ data: {} })}
                          >
                            + Add Custom Signature
                          </button>
                        )}

                        {values.additionalSignatures.map((sig, index) => (
                          <div key={index} style={{ marginBottom: 25 }}>
                            <ApprovalSignatureBlock
                              label={`Custom Signature ${index + 1}`}
                              value={sig.data || {}}
                              onChange={(val) =>
                                setFieldValue(`additionalSignatures.${index}.data`, val)
                              }
                            />

                            {!isPrintMode && (
                              <button type="button" onClick={() => remove(index)}>
                                Remove
                              </button>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </FieldArray>
                </div>

                <div className="form-fields" style={{ marginTop: 30 }}>
                  {renderField(values,"documentNo","Document No")}
                  {renderField(values,"revisionNo","Revision No")}
                </div>
              </div>

              {/* ATTACHMENTS & CUSTOM FIELDS */}
              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Attendance Register
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

export default FRM00725_TrainingAttendanceRegister;
