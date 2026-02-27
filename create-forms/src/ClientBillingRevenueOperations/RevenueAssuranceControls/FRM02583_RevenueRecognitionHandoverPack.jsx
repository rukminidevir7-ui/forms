// FRM02583_02585_RevenueRecognitionHandoverPackUniversal.jsx
// FRM-02583–02585 – Revenue Recognition Handover Pack — Universal Form
// Enterprise Grade – Client Billing & Revenue Operations – Revenue Assurance & Controls

import React, { useEffect } from "react";
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
  handoverReferenceNo: Yup.string().required("Required"),
  businessUnit: Yup.string().required("Required"),
  handoverDate: Yup.date().required("Required"),
  clientName: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-02583-02585",
  department: "Client Billing & Revenue Operations",
  function: "Revenue Assurance & Controls",

  /* 1. Reference */
  handoverReferenceNo: "",
  businessUnit: "",
  preparedBy: "",
  handoverDate: "",
  periodCovered: "",

  /* 2. Contract Details */
  clientName: "",
  clientCode: "",
  projectContractName: "",
  contractStartDate: "",
  contractEndDate: "",
  totalContractValue: "",
  currency: "",

  /* 3. Revenue Recognition Summary */
  recognitionMethod: "",
  revenueRecognizedToDate: "",
  currentPeriodRevenue: "",
  remainingPerformanceObligation: "",
  deferredRevenueBalance: "",

  /* 4. Key Judgements */
  keyJudgements: "",
  estimatesUsed: "",
  accountingNotes: "",

  /* 5. Supporting Information */
  documentsAttached: "",
  systemReferences: "",
  remarks: "",

  /* 6. Approval */
  approvalRoles: [
    { roleName:"Prepared By", data:{} },
    { roleName:"Reviewed By", data:{} },
    { roleName:"Approved By", data:{} }
  ],
  approvalDate: ""
};

/* ================= COMPONENT ================= */

const FRM02583_RevenueRecognitionHandoverPack = () => {

  const { isPrintMode } = usePrintMode();

  const calculateRPO = (values,setFieldValue)=>{
    const total = Number(values.totalContractValue || 0);
    const recognized = Number(values.revenueRecognizedToDate || 0);
    const rpo = total - recognized;
    setFieldValue("remainingPerformanceObligation", rpo.toFixed(2));
  };

  const field = (values,name,label,type="text",onBlurHandler=null)=>(
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name]||"_________"}</div>
        : <>
            <Field name={name} type={type} className="form-input" onBlur={onBlurHandler}/>
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return(
    <ModernFormWrapper formId="FRM-02583-02585" title="Revenue Recognition Handover Pack">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Revenue Recognition Handover Pack Submitted Successfully");
        }}
      >
      {({values,setFieldValue})=>{

        useEffect(()=>{
          calculateRPO(values,setFieldValue);
        },[values.totalContractValue,values.revenueRecognizedToDate]);

        return(
        <Form>
          <ModernA4Template
            formId="FRM-02583-02585"
            title="FRM-02583–02585 — Revenue Recognition Handover Pack — Universal Form"
            department="Client Billing & Revenue Operations | Revenue Assurance & Controls"
          >

          {/* 1. Reference */}
          <div className="form-section">
            <h3 className="form-section-title">Reference Details</h3>
            <div className="form-fields">
              {field(values,"handoverReferenceNo","Handover Reference No")}
              {field(values,"businessUnit","Business Unit")}
              {field(values,"preparedBy","Prepared By")}
              {field(values,"handoverDate","Handover Date","date")}
              {field(values,"periodCovered","Period Covered")}
            </div>
          </div>

          {/* 2. Contract Details */}
          <div className="form-section">
            <h3 className="form-section-title">Contract / Project Details</h3>
            <div className="form-fields">
              {field(values,"clientName","Client Name")}
              {field(values,"clientCode","Client Code")}
              {field(values,"projectContractName","Project / Contract Name")}
              {field(values,"contractStartDate","Contract Start Date","date")}
              {field(values,"contractEndDate","Contract End Date","date")}
              {field(values,"totalContractValue","Total Contract Value","number",
                ()=>calculateRPO(values,setFieldValue))}
              {field(values,"currency","Currency")}
            </div>
          </div>

          {/* 3. Revenue Recognition Summary */}
          <div className="form-section">
            <h3 className="form-section-title">Revenue Recognition Summary</h3>
            <div className="form-fields">
              {field(values,"recognitionMethod","Recognition Method")}
              {field(values,"revenueRecognizedToDate","Revenue Recognized To Date","number",
                ()=>calculateRPO(values,setFieldValue))}
              {field(values,"currentPeriodRevenue","Current Period Revenue","number")}
              {field(values,"remainingPerformanceObligation","Remaining Performance Obligation")}
              {field(values,"deferredRevenueBalance","Deferred Revenue Balance","number")}
            </div>
          </div>

          {/* 4. Key Judgements */}
          <div className="form-section">
            <h3 className="form-section-title">Key Judgements & Assumptions</h3>
            <div className="form-fields">
              {field(values,"keyJudgements","Key Judgements")}
              {field(values,"estimatesUsed","Estimates Used")}
              {field(values,"accountingNotes","Accounting Notes")}
            </div>
          </div>

          {/* 5. Supporting Information */}
          <div className="form-section">
            <h3 className="form-section-title">Supporting Information</h3>
            <div className="form-fields">
              {field(values,"documentsAttached","Documents Attached")}
              {field(values,"systemReferences","System References")}
              {field(values,"remarks","Remarks")}
            </div>
          </div>

          <FormAttachments values={values}/>
          <FormCustomFields values={values}/>

          {/* 6. Approval */}
          <div className="form-section">
            <h3 className="form-section-title">Approval & Sign-off</h3>
            <FieldArray name="approvalRoles">
            {({push,remove})=>(
              <>
              {!isPrintMode &&
                <button type="button" className="btn-submit" onClick={()=>push({roleName:"New Role",data:{}})}>+ Add Role</button>}
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
                    {!isPrintMode && <button type="button" onClick={()=>remove(index)}>Remove</button>}
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
                Submit Revenue Recognition Handover
              </button>
            </div>
          }

          </ModernA4Template>
        </Form>
        );
      }}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM02583_RevenueRecognitionHandoverPack;