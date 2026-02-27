// FRM02570_BillingDisputeEvidencePackUniversal.jsx
// FRM-02570 – Billing Dispute Evidence Pack — Universal Form
// Enterprise Grade – Client Billing & Revenue Operations – Collections, Receipts & Disputes

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
  evidencePackReferenceNo: Yup.string().required("Required"),
  disputeReferenceNo: Yup.string().required("Required"),
  clientName: Yup.string().required("Required"),
  invoiceNo: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02570",
  department: "Client Billing & Revenue Operations",
  function: "Collections, Receipts & Disputes",

  /* 1. Reference Details */
  evidencePackReferenceNo: "",
  disputeReferenceNo: "",
  preparedDate: "",
  preparedBy: "",
  businessUnit: "",

  /* 2. Client & Invoice Details */
  clientName: "",
  clientCode: "",
  invoiceNo: "",
  invoiceDate: "",
  invoiceAmount: "",
  disputedAmount: "",
  currency: "",

  /* 3. Evidence Index */
  evidenceItems: [
    {
      itemNo: "",
      documentName: "",
      description: "",
      source: "",
      date: "",
      reference: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  /* 4. Summary */
  summary: "",
  keyObservations: "",
  impact: "",

  /* 5. Sign-off */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02570_BillingDisputeEvidencePackUniversal = () => {

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
    <ModernFormWrapper formId="FRM-02570" title="Billing Dispute Evidence Pack">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Evidence Pack Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-02570"
              title="FRM-02570 — Billing Dispute Evidence Pack — Universal Form"
              department="Client Billing & Revenue Operations | Collections, Receipts & Disputes"
            >

              {/* 1. Reference Details */}
              <div className="form-section">
                <h3 className="form-section-title">Reference Details</h3>
                <div className="form-fields">
                  {field(values,"evidencePackReferenceNo","Evidence Pack Reference No")}
                  {field(values,"disputeReferenceNo","Dispute Reference No")}
                  {field(values,"preparedDate","Prepared Date","date")}
                  {field(values,"preparedBy","Prepared By")}
                  {field(values,"businessUnit","Business Unit")}
                </div>
              </div>

              {/* 2. Client & Invoice Details */}
              <div className="form-section">
                <h3 className="form-section-title">Client & Invoice Details</h3>
                <div className="form-fields">
                  {field(values,"clientName","Client Name")}
                  {field(values,"clientCode","Client Code")}
                  {field(values,"invoiceNo","Invoice No")}
                  {field(values,"invoiceDate","Invoice Date","date")}
                  {field(values,"invoiceAmount","Invoice Amount","number")}
                  {field(values,"disputedAmount","Disputed Amount","number")}
                  {field(values,"currency","Currency")}
                </div>
              </div>

              {/* 3. Evidence Index */}
              <div className="form-section">
                <h3 className="form-section-title">Evidence Index</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom:15 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>
                    <button
                      type="button"
                      className="btn-submit"
                      style={{ marginLeft:10 }}
                      onClick={()=>setFieldValue("evidenceItems",[
                        ...values.evidenceItems,
                        {
                          itemNo:"",
                          documentName:"",
                          description:"",
                          source:"",
                          date:"",
                          reference:"",
                          remarks:"",
                          dynamicFields:{}
                        }
                      ])}
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="evidenceItems">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Item No</th>
                          <th>Document Name</th>
                          <th>Description</th>
                          <th>Source</th>
                          <th>Date</th>
                          <th>Reference</th>
                          <th>Remarks</th>
                          {dynamicColumns.map(col=>(
                            <th key={col.key}>{col.label}</th>
                          ))}
                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {values.evidenceItems.map((row,index)=>(
                          <tr key={index}>
                            <td><Field name={`evidenceItems.${index}.itemNo`} className="form-input"/></td>
                            <td><Field name={`evidenceItems.${index}.documentName`} className="form-input"/></td>
                            <td><Field name={`evidenceItems.${index}.description`} className="form-input"/></td>
                            <td><Field name={`evidenceItems.${index}.source`} className="form-input"/></td>
                            <td><Field type="date" name={`evidenceItems.${index}.date`} className="form-input"/></td>
                            <td><Field name={`evidenceItems.${index}.reference`} className="form-input"/></td>
                            <td><Field name={`evidenceItems.${index}.remarks`} className="form-input"/></td>
                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`evidenceItems.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* 4. Summary Notes */}
              <div className="form-section">
                <h3 className="form-section-title">Summary Notes</h3>
                <div className="form-fields">
                  {field(values,"summary","Summary","text")}
                  {field(values,"keyObservations","Key Observations")}
                  {field(values,"impact","Impact")}
                </div>
              </div>

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {/* 5. Sign-off */}
              <div className="form-section">
                <h3 className="form-section-title">Sign-off</h3>

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

                {field(values,"approvalDate","Approval Date","date")}
              </div>

              {!isPrintMode &&
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Evidence Pack
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

export default FRM02570_BillingDisputeEvidencePackUniversal;