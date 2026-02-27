// FRM02532_MilestoneCompletionCertificateUniversal.jsx
// FRM-02532 – Milestone Completion Certificate — Universal Form
// Enterprise Grade – Client Billing & Revenue Operations – Invoicing (T&M, Milestone, Usage)

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePrintMode } from "../../PrintModeContext";
import ModernFormWrapper from "../../components/ModernFormWrapper";
import ModernA4Template from "../../components/ModernA4Template";
import ApprovalSignatureBlock from "../../components/ApprovalSignatureBlock";
import FormAttachments from "../../components/FormAttachments";
import FormCustomFields from "../../components/FormCustomFields";
import "../../styles/FRM00611.css";

/* ================= VALIDATION ================= */

const validationSchema = Yup.object({
  clientName: Yup.string().required("Required"),
  milestoneName: Yup.string().required("Required"),
  completionDate: Yup.date().required("Required"),
  acceptanceStatus: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02532",
  department: "Client Billing & Revenue Operations",
  function: "Invoicing (T&M, Milestone, Usage)",

  /* 1. Client / Project Details */
  clientName: "",
  clientCode: "",
  projectName: "",
  projectCode: "",
  businessUnit: "",

  /* 2. Milestone Details */
  milestoneName: "",
  milestoneDescription: "",
  milestoneReference: "",
  completionDate: "",
  acceptanceDate: "",

  /* 3. Deliverables Summary */
  deliverables: [
    {
      keyDeliverable: "",
      scopeCompleted: "",
      pendingItems: "",
      dynamicFields: {}
    }
  ],

  /* 4. Acceptance Confirmation */
  acceptedBy: "",
  clientRepresentativeName: "",
  acceptanceStatus: "",
  comments: "",

  /* 5. Certification & Sign-off */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  certificateDate: ""
};

/* ================= COMPONENT ================= */

const FRM02532_MilestoneCompletionCertificateUniversal = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const columnName = prompt("Enter New Column Name");
    if (!columnName) return;
    const key = columnName.replace(/\s+/g, "");
    if (dynamicColumns.find(col => col.key === key)) return alert("Column exists");
    setDynamicColumns([...dynamicColumns, { key, label: columnName }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
  };

  const field = (values, name, label, type="text") => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : <>
            <Field name={name} type={type} className="form-input"/>
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-02532" title="Milestone Completion Certificate">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Milestone Completion Certificate Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02532"
              title="FRM-02532 — Milestone Completion Certificate"
              department="Client Billing & Revenue Operations | Invoicing (T&M, Milestone, Usage)"
            >

              {/* 1. Client / Project Details */}
              <div className="form-section">
                <h3 className="form-section-title">Client / Project Details</h3>
                <div className="form-fields">
                  {field(values,"clientName","Client Name")}
                  {field(values,"clientCode","Client Code")}
                  {field(values,"projectName","Project / Contract Name")}
                  {field(values,"projectCode","Project Code")}
                  {field(values,"businessUnit","Business Unit")}
                </div>
              </div>

              {/* 2. Milestone Details */}
              <div className="form-section">
                <h3 className="form-section-title">Milestone Details</h3>
                <div className="form-fields">
                  {field(values,"milestoneName","Milestone Name")}
                  {field(values,"milestoneDescription","Milestone Description")}
                  {field(values,"milestoneReference","Milestone Reference")}
                  {field(values,"completionDate","Completion Date","date")}
                  {field(values,"acceptanceDate","Acceptance Date","date")}
                </div>
              </div>

              {/* 3. Deliverables Summary */}
              <div className="form-section">
                <h3 className="form-section-title">Deliverables Summary</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom:15 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>
                    <button
                      type="button"
                      className="btn-submit"
                      style={{ marginLeft:10 }}
                      onClick={()=>setFieldValue("deliverables",[
                        ...values.deliverables,
                        { keyDeliverable:"", scopeCompleted:"", pendingItems:"", dynamicFields:{} }
                      ])}
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="deliverables">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Key Deliverables</th>
                          <th>Scope Completed</th>
                          <th>Pending Items</th>
                          {dynamicColumns.map(col=>(
                            <th key={col.key}>{col.label}</th>
                          ))}
                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {values.deliverables.map((row,index)=>(
                          <tr key={index}>
                            <td><Field name={`deliverables.${index}.keyDeliverable`} className="form-input"/></td>
                            <td><Field name={`deliverables.${index}.scopeCompleted`} className="form-input"/></td>
                            <td><Field name={`deliverables.${index}.pendingItems`} className="form-input"/></td>
                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`deliverables.${index}.dynamicFields.${col.key}`} className="form-input"/>
                              </td>
                            ))}
                            {!isPrintMode &&
                              <td>
                                <button type="button" onClick={()=>remove(index)}>Remove</button>
                              </td>}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>
              </div>

              {/* 4. Acceptance Confirmation */}
              <div className="form-section">
                <h3 className="form-section-title">Acceptance Confirmation</h3>
                <div className="form-fields">
                  {field(values,"acceptedBy","Accepted By (Client)")}
                  {field(values,"clientRepresentativeName","Client Representative Name")}
                  {field(values,"acceptanceStatus","Acceptance Status")}
                  {field(values,"comments","Comments")}
                </div>
              </div>

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {/* 5. Certification & Sign-off */}
              <div className="form-section">
                <h3 className="form-section-title">Certification & Sign-off</h3>

                <FieldArray name="approvalRoles">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode &&
                        <button type="button" className="btn-submit"
                          onClick={()=>push({ roleName:"New Role", data:{} })}>
                          + Add Role
                        </button>
                      }

                      <div className="three-column-signatures">
                        {values.approvalRoles.map((role,index)=>(
                          <div key={index}>
                            <ApprovalSignatureBlock
                              roleName={role.roleName}
                              value={role.data}
                              allowRoleEdit={!isPrintMode}
                              onRoleNameChange={(val)=>setFieldValue(`approvalRoles.${index}.roleName`,val)}
                              onChange={(val)=>setFieldValue(`approvalRoles.${index}.data`,val)}
                            />
                            {!isPrintMode &&
                              <button type="button" onClick={()=>remove(index)}>Remove</button>}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </FieldArray>

                {field(values,"certificateDate","Certificate Date","date")}
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Milestone Certificate
                  </button>
                </div>
              }

            </ModernA4Template>
          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM02532_MilestoneCompletionCertificateUniversal;