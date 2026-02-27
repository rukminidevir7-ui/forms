// FRM01405_BondBGSubmissionChecklist.jsx
// FRM-01405 – Bond / Bank Guarantee Submission Checklist
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
  entityName: Yup.string().required("Required"),
  iecNumber: Yup.string().required("Required"),
  type: Yup.string().required("Required"),
  submissionReferenceNo: Yup.string().required("Required"),
  date: Yup.date().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01405",
  department: "Customs & Trade (Advanced)",
  function: "Customs Operations",

  /* 1. Entity & Submission Details */
  entityName: "",
  iecNumber: "",
  gstin: "",
  type: "",
  submissionReferenceNo: "",
  preparedBy: "",
  date: "",

  /* 2. Checklist */
  checklistItems: [
    { item:"", requirement:"", status:"", remarks:"", dynamicFields:{} }
  ],

  /* 3. Assessment */
  completionStatus: "",
  keyObservations: "",
  risksIssues: "",

  /* 4. Sign-off */
  approvalRoles: [
    { roleName:"Prepared By", data:{} },
    { roleName:"Reviewed By", data:{} },
    { roleName:"Approved By", data:{} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM01405_BondBGSubmissionChecklist = () => {

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
    <ModernFormWrapper formId="FRM-01405" title="Bond / BG Submission Checklist">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Bond / BG Submission Checklist Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01405"
            title="FRM-01405 — Bond / BG Submission Checklist"
            department="Customs & Trade (Advanced) | Customs Operations"
          >

          {/* 1. Entity & Submission Details */}
          <div className="form-section">
            <h3 className="form-section-title">Entity & Submission Details</h3>
            <div className="form-fields">
              {field(values,"entityName","Entity Name")}
              {field(values,"iecNumber","IEC Number")}
              {field(values,"gstin","GSTIN")}

              <div className="form-field">
                <label className="form-label">Type (Bond / Bank Guarantee)</label>
                {!isPrintMode ? (
                  <Field as="select" name="type" className="form-input">
                    <option value="">Select</option>
                    <option>Bond</option>
                    <option>Bank Guarantee</option>
                  </Field>
                ) : (
                  <div className="print-value">{values.type || "_________"}</div>
                )}
              </div>

              {field(values,"submissionReferenceNo","Submission Reference No")}
              {field(values,"preparedBy","Prepared By")}
              {field(values,"date","Date","date")}
            </div>
          </div>

          {/* 2. Checklist */}
          <div className="form-section">
            <h3 className="form-section-title">Bond / BG Submission Checklist</h3>

            {!isPrintMode &&
              <div style={{marginBottom:15}}>
                <button type="button" className="btn-submit" onClick={addColumn}>
                  + Add Column
                </button>
                <button
                  type="button"
                  className="btn-submit"
                  style={{marginLeft:10}}
                  onClick={()=>setFieldValue("checklistItems",[
                    ...values.checklistItems,
                    {item:"",requirement:"",status:"",remarks:"",dynamicFields:{}}
                  ])}
                >
                  + Add Row
                </button>
              </div>
            }

            <FieldArray name="checklistItems">
            {({remove})=>(
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Requirement</th>
                    <th>Status (Yes/No/NA)</th>
                    <th>Remarks</th>
                    {dynamicColumns.map(col=>(
                      <th key={col.key}>{col.label}</th>
                    ))}
                    {!isPrintMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {values.checklistItems.map((row,index)=>(
                    <tr key={index}>
                      <td><Field name={`checklistItems.${index}.item`} className="form-input"/></td>
                      <td><Field name={`checklistItems.${index}.requirement`} className="form-input"/></td>
                      <td>
                        <Field as="select" name={`checklistItems.${index}.status`} className="form-input">
                          <option value="">Select</option>
                          <option>Yes</option>
                          <option>No</option>
                          <option>NA</option>
                        </Field>
                      </td>
                      <td><Field name={`checklistItems.${index}.remarks`} className="form-input"/></td>

                      {dynamicColumns.map(col=>(
                        <td key={col.key}>
                          <Field name={`checklistItems.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

          {/* 3. Assessment */}
          <div className="form-section">
            <h3 className="form-section-title">Assessment</h3>
            <div className="form-fields">
              {field(values,"completionStatus","Checklist Completion Status")}
              {field(values,"keyObservations","Key Observations","text",true)}
              {field(values,"risksIssues","Risks / Issues","text",true)}
            </div>
          </div>

          <FormAttachments values={values}/>
          <FormCustomFields values={values}/>

          {/* 4. Sign-off */}
          <div className="form-section">
            <h3 className="form-section-title">Sign-off</h3>

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

            {field(values,"approvalDate","Date","date")}
          </div>

          {!isPrintMode &&
            <div className="form-actions">
              <button type="submit" className="btn-submit">
                Submit Bond / BG Checklist
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

export default FRM01405_BondBGSubmissionChecklist;