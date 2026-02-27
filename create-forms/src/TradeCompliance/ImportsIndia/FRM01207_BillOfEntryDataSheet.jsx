// FRM01207_BillOfEntryDataSheet.jsx
// FRM-01207 – Bill of Entry Data Sheet
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
  billOfEntryNumber: Yup.string().required("Required"),
  importerName: Yup.string().required("Required"),
  hsCode: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01207",
  date: "",
  department: "Trade Compliance",
  function: "Imports (India)",
  referenceNumber: "",
  location: "",
  preparedBy: "",
  businessUnit: "",

  billOfEntryNumber: "",
  billOfEntryDate: "",
  portCode: "",
  importerName: "",
  iecNumber: "",
  customsBroker: "",

  supplierExporter: "",
  countryOfOrigin: "",
  portOfLoading: "",
  portOfDischarge: "",
  blAwbNumber: "",

  assessableValue: "",
  basicCustomsDuty: "",
  igst: "",
  socialWelfareSurcharge: "",
  totalDutyPaid: "",

  hsCode: "",
  descriptionOfGoods: "",
  quantity: "",
  unit: "",
  invoiceValue: "",

  comments: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01207_BillOfEntryDataSheet = () => {

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
      formId="FRM-01207"
      title="Bill of Entry Data Sheet"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Bill of Entry Data Sheet Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01207"
              title="BILL OF ENTRY DATA SHEET"
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
                  {field(values,"businessUnit","Business Unit")}
                </div>
              </div>

              {/* BILL OF ENTRY DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Bill of Entry Details</h3>
                <div className="form-fields">
                  {field(values,"billOfEntryNumber","Bill of Entry Number")}
                  {field(values,"billOfEntryDate","Bill of Entry Date","date")}
                  {field(values,"portCode","Port Code")}
                  {field(values,"importerName","Importer Name")}
                  {field(values,"iecNumber","IEC Number")}
                  {field(values,"customsBroker","Customs Broker")}
                </div>
              </div>

              {/* SHIPMENT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Shipment Details</h3>
                <div className="form-fields">
                  {field(values,"supplierExporter","Supplier / Exporter")}
                  {field(values,"countryOfOrigin","Country of Origin")}
                  {field(values,"portOfLoading","Port of Loading")}
                  {field(values,"portOfDischarge","Port of Discharge")}
                  {field(values,"blAwbNumber","BL / AWB Number")}
                </div>
              </div>

              {/* DUTY AND ASSESSMENT */}
              <div className="form-section">
                <h3 className="form-section-title">Duty and Assessment</h3>
                <div className="form-fields">
                  {field(values,"assessableValue","Assessable Value")}
                  {field(values,"basicCustomsDuty","Basic Customs Duty")}
                  {field(values,"igst","IGST")}
                  {field(values,"socialWelfareSurcharge","Social Welfare Surcharge")}
                  {field(values,"totalDutyPaid","Total Duty Paid")}
                </div>
              </div>

              {/* GOODS DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Goods Details</h3>
                <div className="form-fields">
                  {field(values,"hsCode","HS Code")}
                  {field(values,"descriptionOfGoods","Description of Goods")}
                  {field(values,"quantity","Quantity")}
                  {field(values,"unit","Unit")}
                  {field(values,"invoiceValue","Invoice Value")}
                </div>
              </div>

              {/* REMARKS */}
              <div className="form-section">
                <h3 className="form-section-title">Remarks</h3>
                <div className="form-fields">
                  {field(values,"comments","Comments")}
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
                    Submit Bill of Entry Data Sheet
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

export default FRM01207_BillOfEntryDataSheet;