// FRM01195_LetterOfCreditApplication.jsx
// FRM-01195 – Letter of Credit (LC) Application
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
  applicantName: Yup.string().required("Required"),
  lcType: Yup.string().required("Required"),
  lcAmount: Yup.string().required("Required"),
  expiryDate: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01195",
  date: "",
  department: "Trade Compliance",
  function: "Imports (India)",
  referenceNumber: "",
  businessUnit: "",
  applicantName: "",
  currency: "",

  lcType: "",
  lcAmount: "",
  expiryDate: "",
  issuingBank: "",
  advisingBank: "",

  beneficiaryName: "",
  beneficiaryAddress: "",
  beneficiaryCountry: "",
  beneficiaryBankDetails: "",

  portOfLoading: "",
  portOfDischarge: "",
  latestShipmentDate: "",
  descriptionOfGoods: "",

  paymentTerms: "",
  documentsRequired: "",
  specialInstructions: "",
  remarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01195_LetterOfCreditApplication = () => {

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
      formId="FRM-01195"
      title="Letter of Credit (LC) Application"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Letter of Credit Application Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01195"
              title="LETTER OF CREDIT (LC) APPLICATION"
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
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"applicantName","Applicant Name")}
                  {field(values,"currency","Currency")}
                </div>
              </div>

              {/* LC DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">LC Details</h3>
                <div className="form-fields">
                  {field(values,"lcType","LC Type")}
                  {field(values,"lcAmount","LC Amount")}
                  {field(values,"expiryDate","Expiry Date","date")}
                  {field(values,"issuingBank","Issuing Bank")}
                  {field(values,"advisingBank","Advising Bank")}
                </div>
              </div>

              {/* BENEFICIARY DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Beneficiary Details</h3>
                <div className="form-fields">
                  {field(values,"beneficiaryName","Beneficiary Name")}
                  {field(values,"beneficiaryAddress","Address")}
                  {field(values,"beneficiaryCountry","Country")}
                  {field(values,"beneficiaryBankDetails","Bank Details")}
                </div>
              </div>

              {/* SHIPMENT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Shipment Details</h3>
                <div className="form-fields">
                  {field(values,"portOfLoading","Port of Loading")}
                  {field(values,"portOfDischarge","Port of Discharge")}
                  {field(values,"latestShipmentDate","Latest Shipment Date","date")}
                  {field(values,"descriptionOfGoods","Description of Goods")}
                </div>
              </div>

              {/* TERMS AND CONDITIONS */}
              <div className="form-section">
                <h3 className="form-section-title">Terms and Conditions</h3>
                <div className="form-fields">
                  {field(values,"paymentTerms","Payment Terms")}
                  {field(values,"documentsRequired","Documents Required")}
                  {field(values,"specialInstructions","Special Instructions")}
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
                    Submit LC Application
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

export default FRM01195_LetterOfCreditApplication;