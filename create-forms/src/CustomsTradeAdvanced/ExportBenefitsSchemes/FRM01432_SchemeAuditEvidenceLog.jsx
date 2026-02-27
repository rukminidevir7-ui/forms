// FRM01432_SchemeAuditEvidenceLog.jsx
// Scheme Audit Evidence Log – Universal
// Enterprise Grade – Customs & Trade (Advanced) – Export Benefits & Schemes

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { usePrintMode } from "../../PrintModeContext";
import ModernFormWrapper from "../../components/ModernFormWrapper";
import ModernA4Template from "../../components/ModernA4Template";
import ApprovalSignatureBlock from "../../components/ApprovalSignatureBlock";
import FormCustomFields from "../../components/FormCustomFields";
import "../../styles/FRM00611.css";

/* ================= VALIDATION ================= */

const validationSchema = Yup.object({
  logReferenceNo: Yup.string().required("Required"),
  schemeName: Yup.string().required("Required"),
  unitName: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01432",
  department: "Export Benefits & Schemes",

  logReferenceNo: "",
  date: "",
  schemeName: "",
  unitName: "",
  iecGstin: "",
  auditPeriod: "",

  evidenceRegister: [
    {
      evidenceId: "",
      documentDescription: "",
      referenceNo: "",
      date: "",
      owner: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  auditNotes: "",
  keyObservations: "",
  gapsIdentified: "",
  actionRequired: "",

  approvalRoles: [
    { roleName: "Prepared By", data:{} },
    { roleName: "Reviewed By", data:{} }
  ]
};

/* ================= COMPONENT ================= */

const FRM01432_SchemeAuditEvidenceLog = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const name = prompt("Enter New Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");
    if(dynamicColumns.find(c=>c.key===key)) return alert("Column exists");
    setDynamicColumns([...dynamicColumns,{key,label:name}]);
  };

  return(
    <ModernFormWrapper formId="FRM-01432" title="Scheme Audit Evidence Log">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Scheme Audit Evidence Log Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01432"
            title="Scheme Audit Evidence Log"
            department="Customs & Trade (Advanced) | Export Benefits & Schemes"
          >

          {/* Log Details */}
          <div className="form-section">
            <h3 className="form-section-title">Log Details</h3>
            <div className="form-fields">

              <div className="form-field">
                <label className="form-label">Log Reference No</label>
                <Field name="logReferenceNo" className="form-input" />
              </div>

              <div className="form-field">
                <label className="form-label">Date</label>
                <Field name="date" type="date" className="form-input" />
              </div>

              <div className="form-field">
                <label className="form-label">Scheme Name</label>
                <Field name="schemeName" className="form-input" />
              </div>

              <div className="form-field">
                <label className="form-label">Unit / Exporter Name</label>
                <Field name="unitName" className="form-input" />
              </div>

              <div className="form-field">
                <label className="form-label">IEC / GSTIN</label>
                <Field name="iecGstin" className="form-input" />
              </div>

              <div className="form-field">
                <label className="form-label">Audit Period</label>
                <Field name="auditPeriod" className="form-input" />
              </div>

            </div>
          </div>

          {/* Evidence Register */}
          <div className="form-section">
            <h3 className="form-section-title">Evidence Register</h3>

            {!isPrintMode &&
              <div style={{marginBottom:15}}>
                <button type="button" className="btn-submit" onClick={addColumn}>
                  + Add Column
                </button>
                <button
                  type="button"
                  className="btn-submit"
                  style={{marginLeft:10}}
                  onClick={()=>setFieldValue("evidenceRegister",[
                    ...values.evidenceRegister,
                    {
                      evidenceId:"",
                      documentDescription:"",
                      referenceNo:"",
                      date:"",
                      owner:"",
                      remarks:"",
                      dynamicFields:{}
                    }
                  ])}
                >
                  + Add Row
                </button>
              </div>
            }

            <FieldArray name="evidenceRegister">
            {({remove})=>(
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Evidence ID</th>
                    <th>Document Description</th>
                    <th>Reference No</th>
                    <th>Date</th>
                    <th>Owner</th>
                    <th>Remarks</th>
                    {dynamicColumns.map(col=>(
                      <th key={col.key}>{col.label}</th>
                    ))}
                    {!isPrintMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {values.evidenceRegister.map((row,index)=>(
                    <tr key={index}>
                      <td><Field name={`evidenceRegister.${index}.evidenceId`} className="form-input"/></td>
                      <td><Field name={`evidenceRegister.${index}.documentDescription`} className="form-input"/></td>
                      <td><Field name={`evidenceRegister.${index}.referenceNo`} className="form-input"/></td>
                      <td><Field name={`evidenceRegister.${index}.date`} type="date" className="form-input"/></td>
                      <td><Field name={`evidenceRegister.${index}.owner`} className="form-input"/></td>
                      <td><Field name={`evidenceRegister.${index}.remarks`} className="form-input"/></td>

                      {dynamicColumns.map(col=>(
                        <td key={col.key}>
                          <Field name={`evidenceRegister.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

          {/* Audit Notes */}
          <div className="form-section">
            <h3 className="form-section-title">Audit Notes</h3>
            <div className="form-fields">

              <div className="form-field">
                <label className="form-label">Audit Notes</label>
                <Field as="textarea" name="auditNotes" className="form-input" />
              </div>

              <div className="form-field">
                <label className="form-label">Key Observations</label>
                <Field as="textarea" name="keyObservations" className="form-input" />
              </div>

              <div className="form-field">
                <label className="form-label">Gaps Identified</label>
                <Field as="textarea" name="gapsIdentified" className="form-input" />
              </div>

              <div className="form-field">
                <label className="form-label">Action Required</label>
                <Field as="textarea" name="actionRequired" className="form-input" />
              </div>

            </div>
          </div>

          <FormCustomFields values={values}/>

          {/* Sign-Off */}
          <div className="form-section">
            <h3 className="form-section-title">Sign-Off</h3>

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

          </div>

          {!isPrintMode &&
            <div className="form-actions">
              <button type="submit" className="btn-submit">
                Submit Evidence Log
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

export default FRM01432_SchemeAuditEvidenceLog;