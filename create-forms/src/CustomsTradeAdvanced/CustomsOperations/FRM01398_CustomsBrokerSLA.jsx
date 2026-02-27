// FRM01398_CustomsBrokerSLA.jsx
// FRM-01398 – Customs Broker SLA
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
  companyName: Yup.string().required("Required"),
  brokerName: Yup.string().required("Required"),
  agreementReference: Yup.string().required("Required"),
  effectiveDate: Yup.date().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01398",
  department: "Customs & Trade (Advanced)",
  function: "Customs Operations",

  /* 1. Parties Details */
  companyName: "",
  brokerName: "",
  agreementReference: "",
  effectiveDate: "",
  reviewDate: "",

  /* 2. Scope of Services */
  servicesCovered: "",
  portsLocations: "",
  operatingHours: "",
  transactionTypes: "",

  /* 3. Service Levels */
  serviceLevels: [
    { metric:"", target:"", measurementMethod:"", remarks:"", dynamicFields:{} }
  ],

  /* 4. Performance & Penalties */
  performanceReviewFrequency: "",
  penaltyClauses: "",
  incentives: "",

  /* 5. Sign-off */
  approvalRoles: [
    { roleName:"Prepared By", data:{} },
    { roleName:"Reviewed By", data:{} },
    { roleName:"Approved By", data:{} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM01398_CustomsBrokerSLA = () => {

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
    <ModernFormWrapper formId="FRM-01398" title="Customs Broker SLA">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Customs Broker SLA Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01398"
            title="FRM-01398 — Customs Broker SLA"
            department="Customs & Trade (Advanced) | Customs Operations"
          >

          {/* 1. Parties Details */}
          <div className="form-section">
            <h3 className="form-section-title">Parties Details</h3>
            <div className="form-fields">
              {field(values,"companyName","Company Name")}
              {field(values,"brokerName","Broker Name")}
              {field(values,"agreementReference","Agreement Reference")}
              {field(values,"effectiveDate","Effective Date","date")}
              {field(values,"reviewDate","Review Date","date")}
            </div>
          </div>

          {/* 2. Scope of Services */}
          <div className="form-section">
            <h3 className="form-section-title">Scope of Services</h3>
            <div className="form-fields">
              {field(values,"servicesCovered","Services Covered","text",true)}
              {field(values,"portsLocations","Ports / Locations")}
              {field(values,"operatingHours","Operating Hours")}
              {field(values,"transactionTypes","Transaction Types")}
            </div>
          </div>

          {/* 3. Service Levels */}
          <div className="form-section">
            <h3 className="form-section-title">Service Levels</h3>

            {!isPrintMode &&
              <div style={{marginBottom:15}}>
                <button type="button" className="btn-submit" onClick={addColumn}>
                  + Add Column
                </button>
                <button
                  type="button"
                  className="btn-submit"
                  style={{marginLeft:10}}
                  onClick={()=>setFieldValue("serviceLevels",[
                    ...values.serviceLevels,
                    {metric:"",target:"",measurementMethod:"",remarks:"",dynamicFields:{}}
                  ])}
                >
                  + Add Row
                </button>
              </div>
            }

            <FieldArray name="serviceLevels">
            {({remove})=>(
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Target</th>
                    <th>Measurement Method</th>
                    <th>Remarks</th>
                    {dynamicColumns.map(col=>(
                      <th key={col.key}>{col.label}</th>
                    ))}
                    {!isPrintMode && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {values.serviceLevels.map((row,index)=>(
                    <tr key={index}>
                      <td><Field name={`serviceLevels.${index}.metric`} className="form-input"/></td>
                      <td><Field name={`serviceLevels.${index}.target`} className="form-input"/></td>
                      <td><Field name={`serviceLevels.${index}.measurementMethod`} className="form-input"/></td>
                      <td><Field name={`serviceLevels.${index}.remarks`} className="form-input"/></td>

                      {dynamicColumns.map(col=>(
                        <td key={col.key}>
                          <Field name={`serviceLevels.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

          {/* 4. Performance & Penalties */}
          <div className="form-section">
            <h3 className="form-section-title">Performance & Penalties</h3>
            <div className="form-fields">
              {field(values,"performanceReviewFrequency","Performance Review Frequency")}
              {field(values,"penaltyClauses","Penalty Clauses","text",true)}
              {field(values,"incentives","Incentives","text",true)}
            </div>
          </div>

          <FormAttachments values={values}/>
          <FormCustomFields values={values}/>

          {/* 5. Sign-off */}
          <div className="form-section">
            <h3 className="form-section-title">Sign-off</h3>

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
                Submit SLA
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

export default FRM01398_CustomsBrokerSLA;