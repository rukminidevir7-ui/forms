// FRM01221_ExportPricingApproval.jsx
// FRM-01221 – Export Pricing Approval
// Enterprise Grade – Trade Compliance – Exports (India)

import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
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
  referenceNumber: Yup.string().required("Required"),
  customerName: Yup.string().required("Required"),
  productService: Yup.string().required("Required"),
  unitPrice: Yup.number().typeError("Must be a number"),
  quantity: Yup.number().typeError("Must be a number")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01221",
  date: "",
  department: "Trade Compliance",
  function: "Exports (India)",

  referenceNumber: "",
  businessUnit: "",
  requestedBy: "",
  location: "",

  customerName: "",
  productService: "",
  currency: "",
  unitPrice: "",
  quantity: "",
  totalContractValue: "",

  estimatedCost: "",
  freightLogisticsCost: "",
  dutiesTaxes: "",
  expectedMargin: "",
  pricingJustification: "",

  commercialRiskAssessment: "",
  complianceCheckStatus: "",
  specialConditions: "",

  approvalStatus: "",
  approvedPrice: "",
  effectiveDate: "",
  decisionRemarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01221_ExportPricingApproval = () => {

  const { isPrintMode } = usePrintMode();

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
    <ModernFormWrapper
      formId="FRM-01221"
      title="Export Pricing Approval"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Export Pricing Approval Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01221"
              title="EXPORT PRICING APPROVAL"
              department="Trade Compliance – Exports (India)"
            >

              {/* GENERAL INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"date","Date","date")}
                  {field(values,"department","Department")}
                  {field(values,"function","Function")}
                  {field(values,"referenceNumber","Reference Number")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"requestedBy","Requested By")}
                  {field(values,"location","Location")}
                </div>
              </div>

              {/* PRICING DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Pricing Details</h3>
                <div className="form-fields">
                  {field(values,"customerName","Customer Name")}
                  {field(values,"productService","Product / Service")}
                  {field(values,"currency","Currency")}
                  {field(values,"unitPrice","Unit Price","number")}
                  {field(values,"quantity","Quantity","number")}
                  {field(values,"totalContractValue","Total Contract Value","number")}
                </div>
              </div>

              {/* COST AND MARGIN ANALYSIS */}
              <div className="form-section">
                <h3 className="form-section-title">Cost and Margin Analysis</h3>
                <div className="form-fields">
                  {field(values,"estimatedCost","Estimated Cost","number")}
                  {field(values,"freightLogisticsCost","Freight / Logistics Cost","number")}
                  {field(values,"dutiesTaxes","Duties / Taxes","number")}
                  {field(values,"expectedMargin","Expected Margin")}
                  {field(values,"pricingJustification","Pricing Justification")}
                </div>
              </div>

              {/* RISK AND COMPLIANCE */}
              <div className="form-section">
                <h3 className="form-section-title">Risk and Compliance</h3>
                <div className="form-fields">
                  {field(values,"commercialRiskAssessment","Commercial Risk Assessment")}
                  {field(values,"complianceCheckStatus","Compliance Check Status")}
                  {field(values,"specialConditions","Special Conditions")}
                </div>
              </div>

              {/* DECISION */}
              <div className="form-section">
                <h3 className="form-section-title">Decision</h3>
                <div className="form-fields">
                  {field(values,"approvalStatus","Approval Status")}
                  {field(values,"approvedPrice","Approved Price","number")}
                  {field(values,"effectiveDate","Effective Date","date")}
                  {field(values,"decisionRemarks","Remarks")}
                </div>
              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* AUTHORIZATION */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>

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
                    Submit Pricing Approval
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

export default FRM01221_ExportPricingApproval;