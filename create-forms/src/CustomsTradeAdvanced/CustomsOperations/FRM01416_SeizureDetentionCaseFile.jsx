// SeizureDetentionCaseUniversalForm.jsx
// Seizure / Detention Case – Universal Form
// Enterprise Grade – Customs & Trade (Advanced) – Customs Operations

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
  formReferenceNo: Yup.string().required("Required"),
  caseId: Yup.string().required("Required"),
  entityName: Yup.string().required("Required"),
  reasonForSeizure: Yup.string().required("Required"),
  decision: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "SEIZURE-DETENTION-UNIVERSAL",
  department: "Customs Operations",

  formReferenceNo: "",
  caseId: "",
  date: "",
  preparedBy: "",
  reviewedBy: "",

  /* Entity & Shipment Details */
  entityName: "",
  iecGstin: "",
  portLocation: "",
  documentNumber: "",
  consignmentDetails: "",

  /* Case Details */
  reasonForSeizure: "",
  legalProvisionsInvoked: "",
  goodsDescription: "",
  estimatedValue: "",
  currentStatus: "",
  immediateActions: "",
  representationFiled: "",
  hearingDetails: "",
  resolutionPlan: "",

  /* Actions Log */
  actionsLog: [
    { actionTaken:"", proposedAction:"", date:"", remarks:"", dynamicFields:{} }
  ],

  /* Attachments */
  noticeCopyAttached: "",
  supportingDocuments: "",
  evidenceFiles: "",
  otherAttachments: "",

  /* Decision */
  decision: "",
  comments: "",
  approvalRoles: [
    { roleName:"Prepared By", data:{} },
    { roleName:"Reviewed By", data:{} },
    { roleName:"Approved By", data:{} }
  ],
  approvalDate: "",
  signature: ""
};

/* ================= COMPONENT ================= */

const SeizureDetentionCaseUniversalForm = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const name = prompt("Enter New Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");
    if(dynamicColumns.find(c=>c.key===key)) return alert("Column exists");
    setDynamicColumns([...dynamicColumns,{key,label:name}]);
  };

  const field = (values,name,label,type="text",multiline=false)=>(
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name]||"_________"}</div>
        : <>
            {multiline
              ? <Field as="textarea" name={name} className="form-input"/>
              : <Field name={name} type={type} className="form-input"/>
            }
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return(
    <ModernFormWrapper formId="SEIZURE-DETENTION-UNIVERSAL" title="Seizure / Detention Case — Universal Form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Seizure / Detention Case Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="SEIZURE-DETENTION"
            title="Seizure / Detention Case — Universal Form"
            department="Customs & Trade (Advanced) | Customs Operations"
          >

          {/* Basic Details */}
          <div className="form-section">
            <h3 className="form-section-title">Form Information</h3>
            <div className="form-fields">
              {field(values,"formReferenceNo","Form Reference No")}
              {field(values,"caseId","Case ID")}
              {field(values,"date","Date","date")}
              {field(values,"preparedBy","Prepared By")}
              {field(values,"reviewedBy","Reviewed By")}
            </div>
          </div>

          {/* Entity & Shipment */}
          <div className="form-section">
            <h3 className="form-section-title">Entity & Shipment Details</h3>
            <div className="form-fields">
              {field(values,"entityName","Entity Name")}
              {field(values,"iecGstin","IEC / GSTIN")}
              {field(values,"portLocation","Port / Location")}
              {field(values,"documentNumber","BoE / Shipping Bill No")}
              {field(values,"consignmentDetails","Consignment Details","text",true)}
            </div>
          </div>

          {/* Case Details */}
          <div className="form-section">
            <h3 className="form-section-title">Case Details</h3>
            <div className="form-fields">
              {field(values,"reasonForSeizure","Reason for Seizure / Detention","text",true)}
              {field(values,"legalProvisionsInvoked","Legal Provisions Invoked","text",true)}
              {field(values,"goodsDescription","Goods Description","text",true)}
              {field(values,"estimatedValue","Estimated Value")}
              {field(values,"currentStatus","Current Status")}
              {field(values,"immediateActions","Immediate Actions","text",true)}
              {field(values,"representationFiled","Representation Filed")}
              {field(values,"hearingDetails","Hearing Details","text",true)}
              {field(values,"resolutionPlan","Resolution Plan","text",true)}
            </div>
          </div>

          {/* Actions Log */}
          <div className="form-section">
            <h3 className="form-section-title">Actions Taken / Proposed</h3>

            {!isPrintMode &&
              <div style={{marginBottom:15}}>
                <button type="button" className="btn-submit" onClick={addColumn}>
                  + Add Column
                </button>
                <button
                  type="button"
                  className="btn-submit"
                  style={{marginLeft:10}}
                  onClick={()=>setFieldValue("actionsLog",[
                    ...values.actionsLog,
                    {actionTaken:"",proposedAction:"",date:"",remarks:"",dynamicFields:{}}
                  ])}
                >
                  + Add Row
                </button>
              </div>
            }

            <FieldArray name="actionsLog">
            {({remove})=>(
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Action Taken</th>
                    <th>Proposed Action</th>
                    <th>Date</th>
                    <th>Remarks</th>
                    {dynamicColumns.map(col=>(
                      <th key={col.key}>{col.label}</th>
                    ))}
                    {!isPrintMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {values.actionsLog.map((row,index)=>(
                    <tr key={index}>
                      <td><Field name={`actionsLog.${index}.actionTaken`} className="form-input"/></td>
                      <td><Field name={`actionsLog.${index}.proposedAction`} className="form-input"/></td>
                      <td><Field name={`actionsLog.${index}.date`} type="date" className="form-input"/></td>
                      <td><Field name={`actionsLog.${index}.remarks`} className="form-input"/></td>

                      {dynamicColumns.map(col=>(
                        <td key={col.key}>
                          <Field name={`actionsLog.${index}.dynamicFields.${col.key}`} className="form-input"/>
                        </td>
                      ))}

                      {!isPrintMode &&
                        <td>
                          <button type="button" onClick={()=>remove(index)}>
                            Remove
                          </button>
                        </td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            </FieldArray>
          </div>

          {/* Attachments */}
          <div className="form-section">
            <h3 className="form-section-title">Attachments</h3>
            <div className="form-fields">
              {field(values,"noticeCopyAttached","Notice Copy Attached")}
              {field(values,"supportingDocuments","Supporting Documents")}
              {field(values,"evidenceFiles","Evidence Files")}
              {field(values,"otherAttachments","Other Attachments")}
            </div>
          </div>

          <FormAttachments values={values}/>
          <FormCustomFields values={values}/>

          {/* Decision & Sign-off */}
          <div className="form-section">
            <h3 className="form-section-title">Decision & Sign-Off</h3>

            <div className="form-field">
              <label className="form-label">Decision</label>
              {!isPrintMode ? (
                <Field as="select" name="decision" className="form-input">
                  <option value="">Select</option>
                  <option>Release Approved</option>
                  <option>Further Investigation Required</option>
                  <option>Confiscation Recommended</option>
                  <option>Closed</option>
                </Field>
              ) : (
                <div className="print-value">{values.decision || "_________"}</div>
              )}
            </div>

            {field(values,"comments","Comments","text",true)}

            <FieldArray name="approvalRoles">
            {({push,remove})=>(
              <>
              {!isPrintMode &&
                <button type="button" className="btn-submit"
                  onClick={()=>push({roleName:"New Role",data:{}})}>
                  + Add Role
                </button>}
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
                      <button type="button" onClick={()=>remove(index)}>
                        Remove
                      </button>}
                  </div>
                ))}
              </div>
              </>
            )}
            </FieldArray>

            {field(values,"approvalDate","Approval Date","date")}
            {field(values,"signature","Signature")}
          </div>

          {!isPrintMode &&
            <div className="form-actions">
              <button type="submit" className="btn-submit">
                Submit Case File
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

export default SeizureDetentionCaseUniversalForm;