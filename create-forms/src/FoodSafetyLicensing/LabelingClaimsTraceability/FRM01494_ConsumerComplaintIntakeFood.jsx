// FRM01494_ConsumerComplaintIntakeFood.jsx
// FRM-01494 – Consumer Complaint Intake (Food)
// Enterprise Grade – Food Safety Licensing – Labeling, Claims & Traceability

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
  requestNumber: Yup.string().required("Required"),
  complaintDate: Yup.string().required("Required"),
  applicableStandard: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01494",
  department: "Labeling, Claims & Traceability",

  /* 1. General Information */
  requestNumber: "",
  departmentName: "",
  processArea: "",
  complaintDate: "",
  complaintChannel: "",
  priority: "",
  status: "",

  /* 2. Consumer Details */
  consumerName: "",
  contactNumber: "",
  email: "",
  address: "",
  preferredContactMethod: "",

  /* 3. Product Details */
  productName: "",
  productCode: "",
  batchLotNumber: "",
  manufacturingDate: "",
  expiryDate: "",
  purchaseLocation: "",

  /* 4. Complaint Details */
  complaintCategory: "",
  complaintDescription: "",
  quantityAffected: "",
  issueDetectedDate: "",
  immediateRisk: "",
  healthImpactReported: "",

  /* 5. Initial Assessment */
  complaintValidity: "",
  riskLevel: "",
  initialActionTaken: "",
  investigationRequired: "",
  assignedTo: "",

  /* 6. Compliance & Reference */
  applicableStandard: "",
  regulatoryRequirement: "",
  governmentReference: "",
  licenseNumber: "",

  /* 7. Attachments */
  photosEvidenceAttached: "",
  attachmentList: [
    { item: "Attachment 1", remarks: "", dynamicFields:{} }
  ],
  uploadReferenceId: "",

  /* 8. Authorization */
  approvalRoles: [
    { roleName: "Received By", data:{} },
    { roleName: "Reviewed By", data:{} },
    { roleName: "Approved By", data:{} }
  ]
};

/* ================= COMPONENT ================= */

const FRM01494_ConsumerComplaintIntakeFood = () => {

  const { isPrintMode } = usePrintMode();
  const [attachmentColumns, setAttachmentColumns] = useState([]);

  const addAttachmentColumn = () => {
    const name = prompt("Enter New Attachment Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");
    if(attachmentColumns.find(c=>c.key===key)) return alert("Column exists");
    setAttachmentColumns([...attachmentColumns,{key,label:name}]);
  };

  return(
    <ModernFormWrapper formId="FRM-01494" title="Consumer Complaint Intake (Food)">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Consumer Complaint Intake Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>(
        <Form>
          <ModernA4Template
            formId="FRM-01494"
            title="FRM-01494 — Consumer Complaint Intake (Food)"
            department="Food Safety Licensing | Labeling, Claims & Traceability"
          >

          {/* Sections 1–3 */}
          {[
            ["General Information",[
              ["requestNumber","Request Number"],
              ["departmentName","Department"],
              ["processArea","Process Area"],
              ["complaintDate","Complaint Date"],
              ["complaintChannel","Complaint Channel"],
              ["priority","Priority"],
              ["status","Status"]
            ]],
            ["Consumer Details",[
              ["consumerName","Consumer Name"],
              ["contactNumber","Contact Number"],
              ["email","Email"],
              ["address","Address"],
              ["preferredContactMethod","Preferred Contact Method"]
            ]],
            ["Product Details",[
              ["productName","Product Name"],
              ["productCode","Product Code"],
              ["batchLotNumber","Batch / Lot Number"],
              ["manufacturingDate","Manufacturing Date"],
              ["expiryDate","Expiry Date"],
              ["purchaseLocation","Purchase Location"]
            ]]
          ].map(([section,fields])=>(
            <div className="form-section" key={section}>
              <h3 className="form-section-title">{section}</h3>
              <div className="form-fields">
                {fields.map(([name,label])=>(
                  <div className="form-field" key={name}>
                    <label className="form-label">{label}</label>
                    <Field
                      name={name}
                      type={["complaintDate","manufacturingDate","expiryDate"].includes(name) ? "date" : "text"}
                      className="form-input"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* 4. Complaint Details */}
          <div className="form-section">
            <h3 className="form-section-title">Complaint Details</h3>
            <div className="form-fields">
              <div className="form-field">
                <label className="form-label">Complaint Category</label>
                <Field name="complaintCategory" className="form-input"/>
              </div>
              <div className="form-field">
                <label className="form-label">Complaint Description</label>
                <Field as="textarea" name="complaintDescription" className="form-input"/>
              </div>
              <div className="form-field">
                <label className="form-label">Quantity Affected</label>
                <Field name="quantityAffected" className="form-input"/>
              </div>
              <div className="form-field">
                <label className="form-label">Issue Detected Date</label>
                <Field type="date" name="issueDetectedDate" className="form-input"/>
              </div>

              {[
                ["immediateRisk","Immediate Risk (Yes/No)"],
                ["healthImpactReported","Health Impact Reported (Yes/No)"]
              ].map(([name,label])=>(
                <div className="form-field" key={name}>
                  <label className="form-label">{label}</label>
                  <Field as="select" name={name} className="form-input">
                    <option value="">Select</option>
                    <option>Yes</option>
                    <option>No</option>
                  </Field>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Initial Assessment */}
          <div className="form-section">
            <h3 className="form-section-title">Initial Assessment</h3>
            <div className="form-fields">
              <Field name="complaintValidity" className="form-input" placeholder="Complaint Validity"/>
              <Field name="riskLevel" className="form-input" placeholder="Risk Level"/>
              <Field as="textarea" name="initialActionTaken" className="form-input" placeholder="Initial Action Taken"/>

              <div className="form-field">
                <label className="form-label">Investigation Required (Yes/No)</label>
                <Field as="select" name="investigationRequired" className="form-input">
                  <option value="">Select</option>
                  <option>Yes</option>
                  <option>No</option>
                </Field>
              </div>

              <Field name="assignedTo" className="form-input" placeholder="Assigned To"/>
            </div>
          </div>

          {/* 6. Compliance & Reference */}
          <div className="form-section">
            <h3 className="form-section-title">Compliance & Reference</h3>
            <div className="form-fields">
              {[
                ["applicableStandard","Applicable Standard"],
                ["regulatoryRequirement","Regulatory Requirement"],
                ["governmentReference","Government Reference"],
                ["licenseNumber","License Number"]
              ].map(([name,label])=>(
                <div className="form-field" key={name}>
                  <label className="form-label">{label}</label>
                  <Field name={name} className="form-input"/>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Attachments */}
          <div className="form-section">
            <h3 className="form-section-title">Attachments</h3>

            {!isPrintMode &&
              <div style={{marginBottom:15}}>
                <button type="button" className="btn-submit" onClick={addAttachmentColumn}>
                  + Add Column
                </button>
                <button
                  type="button"
                  className="btn-submit"
                  style={{marginLeft:10}}
                  onClick={() =>
                    setFieldValue("attachmentList", [
                      ...values.attachmentList,
                      { item: "New Attachment", remarks: "", dynamicFields:{} }
                    ])
                  }
                >
                  + Add Row
                </button>
              </div>
            }

            <FieldArray name="attachmentList">
              {({remove})=>(
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Attachment List</th>
                      <th>Remarks</th>
                      {attachmentColumns.map(col=>(<th key={col.key}>{col.label}</th>))}
                      {!isPrintMode && <th>Action</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {values.attachmentList.map((row,index)=>(
                      <tr key={index}>
                        <td><Field name={`attachmentList.${index}.item`} className="form-input"/></td>
                        <td><Field name={`attachmentList.${index}.remarks`} className="form-input"/></td>
                        {attachmentColumns.map(col=>(
                          <td key={col.key}>
                            <Field name={`attachmentList.${index}.dynamicFields.${col.key}`} className="form-input"/>
                          </td>
                        ))}
                        {!isPrintMode &&
                          <td>
                            <button type="button" onClick={()=>remove(index)}>Remove</button>
                          </td>
                        }
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </FieldArray>

            <div className="form-field" style={{marginTop:15}}>
              <label className="form-label">Photos / Evidence Attached (Yes/No)</label>
              <Field as="select" name="photosEvidenceAttached" className="form-input">
                <option value="">Select</option>
                <option>Yes</option>
                <option>No</option>
              </Field>
            </div>

            <div className="form-field">
              <label className="form-label">Upload Reference ID</label>
              <Field name="uploadReferenceId" className="form-input"/>
            </div>
          </div>

          <FormCustomFields values={values}/>

          {/* 8. Authorization */}
          <div className="form-section">
            <h3 className="form-section-title">Authorization</h3>
            <FieldArray name="approvalRoles">
              {({push,remove})=>(
                <>
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
                Submit Consumer Complaint Intake
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

export default FRM01494_ConsumerComplaintIntakeFood;