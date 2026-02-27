// FRM01208_DutyCalculationWorking.jsx
// FRM-01208 – Duty Calculation Working
// Enterprise Grade – Trade Compliance – Imports (India)

import React from "react";
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
  billOfEntryNo: Yup.string().required("Required"),
  hsCode: Yup.string().required("Required"),
  assessableValue: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01208",
  date: "",
  department: "Trade Compliance",
  function: "Imports (India)",
  referenceNumber: "",
  location: "",
  preparedBy: "",
  currency: "",

  billOfEntryNo: "",
  importerName: "",
  supplier: "",
  countryOfOrigin: "",
  hsCode: "",

  fobValue: "",
  freight: "",
  insurance: "",
  cifValue: "",
  exchangeRate: "",
  assessableValue: "",

  basicCustomsDuty: "",
  socialWelfareSurcharge: "",
  igst: "",
  compensationCess: "",
  otherCharges: "",
  totalDuty: "",

  totalLandedCost: "",
  remarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01208_DutyCalculationWorking = () => {

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
      formId="FRM-01208"
      title="Duty Calculation Working"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Duty Calculation Working Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01208"
              title="DUTY CALCULATION WORKING"
              department="Trade Compliance – Imports (India)"
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
                  {field(values,"location","Location")}
                  {field(values,"preparedBy","Prepared By")}
                  {field(values,"currency","Currency")}
                </div>
              </div>

              {/* IMPORT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Import Details</h3>
                <div className="form-fields">
                  {field(values,"billOfEntryNo","Bill of Entry No")}
                  {field(values,"importerName","Importer Name")}
                  {field(values,"supplier","Supplier")}
                  {field(values,"countryOfOrigin","Country of Origin")}
                  {field(values,"hsCode","HS Code")}
                </div>
              </div>

              {/* VALUE CALCULATION */}
              <div className="form-section">
                <h3 className="form-section-title">Value Calculation</h3>
                <div className="form-fields">
                  {field(values,"fobValue","FOB Value")}
                  {field(values,"freight","Freight")}
                  {field(values,"insurance","Insurance")}
                  {field(values,"cifValue","CIF Value")}
                  {field(values,"exchangeRate","Exchange Rate")}
                  {field(values,"assessableValue","Assessable Value")}
                </div>
              </div>

              {/* DUTY COMPONENTS */}
              <div className="form-section">
                <h3 className="form-section-title">Duty Components</h3>
                <div className="form-fields">
                  {field(values,"basicCustomsDuty","Basic Customs Duty")}
                  {field(values,"socialWelfareSurcharge","Social Welfare Surcharge")}
                  {field(values,"igst","IGST")}
                  {field(values,"compensationCess","Compensation Cess")}
                  {field(values,"otherCharges","Other Charges")}
                  {field(values,"totalDuty","Total Duty")}
                </div>
              </div>

              {/* SUMMARY */}
              <div className="form-section">
                <h3 className="form-section-title">Summary</h3>
                <div className="form-fields">
                  {field(values,"totalLandedCost","Total Landed Cost")}
                  {field(values,"remarks","Remarks")}
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
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={()=>push({ roleName:"New Role", data:{} })}
                        >
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
                              <button type="button" onClick={()=>remove(index)}>
                                Remove
                              </button>
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
                    Submit Duty Calculation Working
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

export default FRM01208_DutyCalculationWorking;