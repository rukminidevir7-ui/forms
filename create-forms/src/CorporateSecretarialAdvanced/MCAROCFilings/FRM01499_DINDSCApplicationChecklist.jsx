// FRM01499_DINDSCApplicationChecklist.jsx
// FRM-01499 – DIN / DSC Application Checklist – Checklist
// Corporate & Secretarial (Advanced) – MCA / ROC Filings

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
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
  checklistNumber: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  applicationType: Yup.string().required("Required"),
  applicationDate: Yup.string().required("Required"),
  applicantName: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01499",
  version: "1.0",

  // General Information
  checklistNumber: "",
  department: "",
  applicationType: "",
  applicationDate: "",
  applicantName: "",
  status: "",

  // Organization Details
  companyName: "",
  cinLlp: "",
  registeredOfficeAddress: "",
  businessUnit: "",

  // Applicant Details
  fullName: "",
  fatherName: "",
  dateOfBirth: "",
  nationality: "",
  panNumber: "",
  aadhaarNumber: "",
  emailId: "",
  mobileNumber: "",

  // Document Verification Checklist
  documentChecklist: [
    {
      documentName: "PAN Card Copy",
      mandatory: "",
      submitted: "",
      verified: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  // Compliance & MCA Reference
  applicableActRule: "",
  mcaPortalReference: "",
  srnNumber: "",
  governmentFilingReference: "",

  // Attachments Section
  documentsAttached: "",
  attachmentList: "",
  uploadReferenceId: "",

  preparedSignature: {},
  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM01499_DINDSCApplicationChecklist = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const name = prompt("Enter Column Name");
    if (!name) return;
    const key = name.replace(/\s+/g,"");
    if (dynamicColumns.find(col=>col.key===key)) return;
    setDynamicColumns([...dynamicColumns,{key,label:name}]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col=>col.key!==key));
  };

  return (
    <ModernFormWrapper
      formId="FRM-01499"
      title="DIN / DSC Application Checklist"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("DIN / DSC Application Checklist Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-01499"
              title="DIN / DSC APPLICATION CHECKLIST"
              department="Corporate & Secretarial (Advanced) – MCA / ROC Filings"
            >

{/* ================= GENERAL INFORMATION ================= */}
<div className="form-section">
  <h3 className="form-section-title">General Information</h3>
  <div className="form-fields">

    <div className="form-field">
      <label>Checklist Number</label>
      <Field name="checklistNumber" className="form-input"/>
    </div>

    <div className="form-field">
      <label>Department</label>
      <Field name="department" className="form-input"/>
    </div>

    <div className="form-field">
      <label>Application Type (DIN / DSC)</label>
      <Field name="applicationType" className="form-input"/>
    </div>

    <div className="form-field">
      <label>Application Date</label>
      <Field name="applicationDate" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label>Applicant Name</label>
      <Field name="applicantName" className="form-input"/>
    </div>

    <div className="form-field">
      <label>Status</label>
      <Field name="status" className="form-input"/>
    </div>

  </div>
</div>

{/* ================= ORGANIZATION DETAILS ================= */}
<div className="form-section">
  <h3 className="form-section-title">Organization Details</h3>
  <div className="form-fields">

    <div className="form-field">
      <label>Company Name</label>
      <Field name="companyName" className="form-input"/>
    </div>

    <div className="form-field">
      <label>CIN / LLPIN</label>
      <Field name="cinLlp" className="form-input"/>
    </div>

    <div className="form-field">
      <label>Registered Office Address</label>
      <Field name="registeredOfficeAddress" className="form-input"/>
    </div>

    <div className="form-field">
      <label>Business Unit</label>
      <Field name="businessUnit" className="form-input"/>
    </div>

  </div>
</div>

{/* ================= APPLICANT DETAILS ================= */}
<div className="form-section">
  <h3 className="form-section-title">Applicant Details</h3>
  <div className="form-fields">

    <div className="form-field">
      <label>Full Name (as per PAN)</label>
      <Field name="fullName" className="form-input"/>
    </div>

    <div className="form-field">
      <label>Father's Name</label>
      <Field name="fatherName" className="form-input"/>
    </div>

    <div className="form-field">
      <label>Date of Birth</label>
      <Field name="dateOfBirth" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label>Nationality</label>
      <Field name="nationality" className="form-input"/>
    </div>

    <div className="form-field">
      <label>PAN Number</label>
      <Field name="panNumber" className="form-input"/>
    </div>

    <div className="form-field">
      <label>Aadhaar Number</label>
      <Field name="aadhaarNumber" className="form-input"/>
    </div>

    <div className="form-field">
      <label>Email ID</label>
      <Field name="emailId" className="form-input"/>
    </div>

    <div className="form-field">
      <label>Mobile Number</label>
      <Field name="mobileNumber" className="form-input"/>
    </div>

  </div>
</div>

{/* ================= DOCUMENT VERIFICATION CHECKLIST ================= */}
<div className="form-section">
  <h3 className="form-section-title">Document Verification Checklist</h3>

  <FieldArray name="documentChecklist">
    {({ push, remove })=>(
      <>
        {!isPrintMode && (
          <button type="button" className="btn-submit"
            onClick={()=>push({
              documentName:"",
              mandatory:"",
              submitted:"",
              verified:"",
              remarks:"",
              dynamicFields:{}
            })}
          >
            + Add Row
          </button>
        )}

        <table className="items-table">
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Document Name</th>
              <th>Mandatory</th>
              <th>Submitted</th>
              <th>Verified</th>
              <th>Remarks</th>
              {!isPrintMode && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {values.documentChecklist.map((row,index)=>(
              <tr key={index}>
                <td>{index+1}</td>
                <td><Field name={`documentChecklist.${index}.documentName`} className="form-input"/></td>
                <td><Field name={`documentChecklist.${index}.mandatory`} className="form-input"/></td>
                <td><Field name={`documentChecklist.${index}.submitted`} className="form-input"/></td>
                <td><Field name={`documentChecklist.${index}.verified`} className="form-input"/></td>
                <td><Field name={`documentChecklist.${index}.remarks`} className="form-input"/></td>
                {!isPrintMode && (
                  <td>
                    <button type="button" onClick={()=>remove(index)}>Remove</button>
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

{/* ================= COMPLIANCE & MCA REFERENCE ================= */}
<div className="form-section">
  <h3 className="form-section-title">Compliance & MCA Reference</h3>
  <div className="form-fields">

    <div className="form-field">
      <label>Applicable Act / Rule</label>
      <Field name="applicableActRule" className="form-input"/>
    </div>

    <div className="form-field">
      <label>MCA Portal Reference</label>
      <Field name="mcaPortalReference" className="form-input"/>
    </div>

    <div className="form-field">
      <label>SRN Number</label>
      <Field name="srnNumber" className="form-input"/>
    </div>

    <div className="form-field">
      <label>Government Filing Reference</label>
      <Field name="governmentFilingReference" className="form-input"/>
    </div>

  </div>
</div>

{/* ================= ATTACHMENTS ================= */}
<FormAttachments values={values} />
<FormCustomFields values={values} />

{/* ================= APPROVALS ================= */}
<div className="form-section">
  <h3 className="form-section-title">Authorization</h3>
  <div className="three-column-signatures">
    <ApprovalSignatureBlock
      label="Prepared By"
      value={values.preparedSignature}
      onChange={(val)=>setFieldValue("preparedSignature",val)}
    />
    <ApprovalSignatureBlock
      label="Reviewed By"
      value={values.reviewedSignature}
      onChange={(val)=>setFieldValue("reviewedSignature",val)}
    />
    <ApprovalSignatureBlock
      label="Approved By"
      value={values.approvedSignature}
      onChange={(val)=>setFieldValue("approvedSignature",val)}
    />
  </div>
</div>

{!isPrintMode && (
  <div className="form-actions">
    <button type="submit" className="btn-submit">
      Submit DIN / DSC Application Checklist
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

export default FRM01499_DINDSCApplicationChecklist;