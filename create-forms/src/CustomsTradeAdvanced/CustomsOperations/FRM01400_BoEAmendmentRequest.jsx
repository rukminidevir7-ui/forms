// FRM01400_BoEAmendmentRequest.jsx
// FRM-01400 – BoE Amendment Request
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
  requestReferenceNo: Yup.string().required("Required"),
  requestDate: Yup.date().required("Required"),
  boeNumber: Yup.string().required("Required"),
  boeDate: Yup.date().required("Required"),
  importerName: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01400",
  department: "Customs & Trade (Advanced)",
  function: "Customs Operations",

  /* 1. Request Details */
  requestReferenceNo: "",
  requestDate: "",
  preparedBy: "",
  departmentName: "",

  /* 2. BoE Details */
  boeNumber: "",
  boeDate: "",
  portOfImport: "",
  importerName: "",
  iecNumber: "",
  gstin: "",

  /* 3. Amendment Details */
  amendments: [
    { fieldToAmend:"", existingValue:"", revisedValue:"", reason:"", dynamicFields:{} }
  ],

  /* 4. Supporting Documents */
  documentsAttached: "",
  additionalNotes: "",

  /* 5. Approval */
  approvalRoles: [
    { roleName:"Requested By", data:{} },
    { roleName:"Reviewed By", data:{} },
    { roleName:"Approved By", data:{} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM01400_BoEAmendmentRequest = () => {

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
    <ModernFormWrapper formId="FRM-01400" title="BoE Amendment Request">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("BoE Amendment Request Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01400"
            title="FRM-01400 — BoE Amendment Request"
            department="Customs & Trade (Advanced) | Customs Operations"
          >

          {/* 1. Request Details */}
          <div className="form-section">
            <h3 className="form-section-title">Request Details</h3>
            <div className="form-fields">
              {field(values,"requestReferenceNo","Request Reference No")}
              {field(values,"requestDate","Request Date","date")}
              {field(values,"preparedBy","Prepared By")}
              {field(values,"departmentName","Department")}
            </div>
          </div>

          {/* 2. BoE Details */}
          <div className="form-section">
            <h3 className="form-section-title">BoE Details</h3>
            <div className="form-fields">
              {field(values,"boeNumber","BoE Number")}
              {field(values,"boeDate","BoE Date","date")}
              {field(values,"portOfImport","Port of Import")}
              {field(values,"importerName","Importer Name")}
              {field(values,"iecNumber","IEC Number")}
              {field(values,"gstin","GSTIN")}
            </div>
          </div>

          {/* 3. Amendment Details */}
          <div className="form-section">
            <h3 className="form-section-title">Amendment Details</h3>

            {!isPrintMode &&
              <div style={{marginBottom:15}}>
                <button type="button" className="btn-submit" onClick={addColumn}>
                  + Add Column
                </button>
                <button
                  type="button"
                  className="btn-submit"
                  style={{marginLeft:10}}
                  onClick={()=>setFieldValue("amendments",[
                    ...values.amendments,
                    {fieldToAmend:"",existingValue:"",revisedValue:"",reason:"",dynamicFields:{}}
                  ])}
                >
                  + Add Row
                </button>
              </div>
            }

            <FieldArray name="amendments">
            {({remove})=>(
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Field to Amend</th>
                    <th>Existing Value</th>
                    <th>Revised Value</th>
                    <th>Reason</th>
                    {dynamicColumns.map(col=>(
                      <th key={col.key}>{col.label}</th>
                    ))}
                    {!isPrintMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {values.amendments.map((row,index)=>(
                    <tr key={index}>
                      <td><Field name={`amendments.${index}.fieldToAmend`} className="form-input"/></td>
                      <td><Field name={`amendments.${index}.existingValue`} className="form-input"/></td>
                      <td><Field name={`amendments.${index}.revisedValue`} className="form-input"/></td>
                      <td><Field name={`amendments.${index}.reason`} className="form-input"/></td>

                      {dynamicColumns.map(col=>(
                        <td key={col.key}>
                          <Field name={`amendments.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

          {/* 4. Supporting Documents */}
          <div className="form-section">
            <h3 className="form-section-title">Supporting Documents</h3>
            <div className="form-fields">
              {field(values,"documentsAttached","Documents Attached")}
              {field(values,"additionalNotes","Additional Notes","text",true)}
            </div>
          </div>

          <FormAttachments values={values}/>
          <FormCustomFields values={values}/>

          {/* 5. Approval */}
          <div className="form-section">
            <h3 className="form-section-title">Approval</h3>

            <FieldArray name="approvalRoles">
            {({push,remove})=>(
              <>
              {!isPrintMode &&
                <button
                  type="button"
                  className="btn-submit"
                  onClick={()=>push({roleName:"New Role",data:{}})}
                >
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
                Submit Amendment Request
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

export default FRM01400_BoEAmendmentRequest;