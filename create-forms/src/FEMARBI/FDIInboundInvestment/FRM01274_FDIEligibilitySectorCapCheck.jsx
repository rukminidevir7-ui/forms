// FRM01274_FDIEligibilitySectorCapCheck.jsx
// FRM-01274 – FDI Eligibility & Sector Cap Check
// Enterprise Grade – FEMA & RBI – FDI / Inbound Investment

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
  cin: Yup.string().required("Required"),
  pan: Yup.string().required("Required"),
  proposedInvestmentAmount: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const mandatoryDocuments = [
  "FDI Policy Reference",
  "Valuation / Financial Analysis",
  "Supporting Notes",
  "Other Supporting Documents"
];

const initialValues = {
  formId: "FRM-01274",
  date: "",
  department: "FEMA & RBI",
  function: "FDI / Inbound Investment",

  /* 1. Organization & Regulatory Identification */
  companyName: "",
  cin: "",
  pan: "",
  registeredOffice: "",
  sector: "",
  applicableLaw: "",
  governmentAuthorityReference: "",
  formReferenceNo: "",

  /* 2. Project / Investment Context */
  projectName: "",
  projectLocation: "",
  businessActivity: "",
  proposedInvestmentAmount: "",
  currency: "",

  /* 3. Sector Eligibility Assessment */
  fdiPolicySector: "",
  investmentRoute: "",
  sectoralCap: "",
  proposedForeignHolding: "",
  withinPermissibleLimit: "",

  /* 4. Compliance Evaluation */
  pricingGuidelinesApplicable: "",
  entryConditionsMet: "",
  downstreamInvestmentImpact: "",
  securityRegulatoryConditions: "",
  additionalApprovalsRequired: "",

  

  /* 5. Risk & Remarks */
  riskLevel: "",
  keyObservations: "",
  recommendations: "",

  complianceItems: [
    { item: "", status: "", remarks: "", dynamicFields: {} }
  ],

  mandatoryAttachments: mandatoryDocuments.map(doc => ({
    documentName: doc,
    status: "",
    file: null,
    remarks: ""
  })),

  customAttachments: [],

  approvalRoles: [
    { roleName: "Initiated By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  workflowStatus: "",
  comments: "",

  attachments: [],
  customFields: []
};

/* ================= COMPONENT ================= */

const FRM01274_FDIEligibilitySectorCapCheck = () => {

    const mandatoryDocuments = [
  "FDI Policy Reference",
  "Valuation / Financial Analysis",
  "Supporting Notes",
  "Other Supporting Documents"
];
  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  const addColumn = () => {
    const columnName = prompt("Enter New Column Name");
    if (!columnName) return;
    const key = columnName.replace(/\s+/g, "");
    if (dynamicColumns.find(col => col.key === key)) {
      alert("Column already exists");
      return;
    }
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
    <ModernFormWrapper formId="FRM-01274" title="FDI Eligibility & Sector Cap Check">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("FDI Eligibility & Sector Cap Check Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01274"
              title="FRM-01274 — FDI Eligibility & Sector Cap Check"
              department="FEMA & RBI (Foreign Exchange) | FDI / Inbound Investment"
            >

              {/* 1 */}
              <div className="form-section">
                <h3 className="form-section-title">Organization & Regulatory Identification</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"cin","CIN")}
                  {field(values,"pan","PAN / Tax ID")}
                  {field(values,"registeredOffice","Registered Office Address")}
                  {field(values,"sector","Sector / Industry")}
                  {field(values,"applicableLaw","Applicable Law / Regulation")}
                  {field(values,"governmentAuthorityReference","Government Authority Reference")}
                  {field(values,"formReferenceNo","Form Reference No")}
                </div>
              </div>

              {/* 2 */}
              <div className="form-section">
                <h3 className="form-section-title">Project / Investment Context</h3>
                <div className="form-fields">
                  {field(values,"projectName","Project Name")}
                  {field(values,"projectLocation","Project Location")}
                  {field(values,"businessActivity","Business Activity")}
                  {field(values,"proposedInvestmentAmount","Proposed Investment Amount")}
                  {field(values,"currency","Currency")}
                </div>
              </div>

              {/* 3 */}
              <div className="form-section">
                <h3 className="form-section-title">Sector Eligibility Assessment</h3>
                <div className="form-fields">
                  {field(values,"fdiPolicySector","FDI Policy Sector")}
                  {field(values,"investmentRoute","Automatic / Approval Route")}
                  {field(values,"sectoralCap","Sectoral Cap (%)")}
                  {field(values,"proposedForeignHolding","Proposed Foreign Holding (%)")}
                  {field(values,"withinPermissibleLimit","Within Permissible Limit")}
                </div>
              </div>

              {/* 4 */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Evaluation</h3>
                <div className="form-fields">
                  {field(values,"pricingGuidelinesApplicable","Pricing Guidelines Applicable")}
                  {field(values,"entryConditionsMet","Entry Conditions Met")}
                  {field(values,"downstreamInvestmentImpact","Downstream Investment Impact")}
                  {field(values,"securityRegulatoryConditions","Security / Regulatory Conditions")}
                  {field(values,"additionalApprovalsRequired","Additional Approvals Required")}
                </div>
              </div>

              {/* 5 */}
              <div className="form-section">
                <h3 className="form-section-title">Risk & Remarks</h3>
                <div className="form-fields">
                  {field(values,"riskLevel","Risk Level (Low / Medium / High)")}
                  {field(values,"keyObservations","Key Observations")}
                  {field(values,"recommendations","Recommendations")}
                </div>
              </div>

              {/* Attachments */}
              {/* 7. ATTACHMENTS */}
               <FormCustomFields values={values} />
<div className="form-section">
  {/* <h3 className="form-section-title">Attachments</h3> */}

  <FormAttachments values={values} />

  {/* Mandatory Attachments */}
  <FieldArray name="mandatoryAttachments">
    {() => (
      <table className="items-table">
        <thead>
          <tr>
            <th>Document</th>
            <th>Status</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {values.mandatoryAttachments.map((doc,index)=>(
            <tr key={index}>
              <td>{doc.documentName}</td>
              <td>
                <Field as="select"
                  name={`mandatoryAttachments.${index}.status`}
                  className="form-input">
                  <option value="">Select</option>
                  <option>YES</option>
                  <option>NO</option>
                  <option>NA</option>
                </Field>
              </td>
              <td>
                <Field
                  name={`mandatoryAttachments.${index}.remarks`}
                  className="form-input"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </FieldArray>
</div>
             

              {/* Approval */}
              <div className="form-section">
                <h3 className="form-section-title">Workflow & Approval</h3>

                <FieldArray name="approvalRoles">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode &&
                        <button type="button" className="btn-submit" onClick={()=>push({ roleName:"New Role", data:{} })}>
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
                              <button type="button" onClick={()=>remove(index)}>Remove</button>
                            }
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
                    Submit FDI Eligibility Check
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

export default FRM01274_FDIEligibilitySectorCapCheck;