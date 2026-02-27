// FRM01219_ExportLicenseAuthorizationCheck.jsx
// FRM-01219 – Export License / Authorization Check
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
  orderReference: Yup.string().required("Required"),
  customerName: Yup.string().required("Required"),
  productDescription: Yup.string().required("Required"),
  hsCode: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01219",
  date: "",
  department: "Trade Compliance",
  function: "Exports (India)",

  orderReference: "",
  customerName: "",
  preparedBy: "",
  location: "",

  productDescription: "",
  hsCode: "",
  destinationCountry: "",
  exporterName: "",
  iecNumber: "",

  licenseRequired: "",
  licenseNumber: "",
  issuingAuthority: "",
  validityPeriod: "",
  complianceStatus: "",
  comments: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01219_ExportLicenseAuthorizationCheck = () => {

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
      formId="FRM-01219"
      title="Export License / Authorization Check"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Export License / Authorization Check Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01219"
              title="EXPORT LICENSE / AUTHORIZATION CHECK"
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
                  {field(values,"orderReference","Order Reference")}
                  {field(values,"customerName","Customer Name")}
                  {field(values,"preparedBy","Prepared By")}
                  {field(values,"location","Location")}
                </div>
              </div>

              {/* EXPORT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Export Details</h3>
                <div className="form-fields">
                  {field(values,"productDescription","Product Description")}
                  {field(values,"hsCode","HS Code")}
                  {field(values,"destinationCountry","Destination Country")}
                  {field(values,"exporterName","Exporter Name")}
                  {field(values,"iecNumber","IEC Number")}
                </div>
              </div>

              {/* LICENSE CHECK DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">License Check Details</h3>
                <div className="form-fields">
                  {field(values,"licenseRequired","License Required (Yes/No)")}
                  {field(values,"licenseNumber","License Number")}
                  {field(values,"issuingAuthority","Issuing Authority")}
                  {field(values,"validityPeriod","Validity Period")}
                  {field(values,"complianceStatus","Compliance Status")}
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
                    Submit Export License Check
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

export default FRM01219_ExportLicenseAuthorizationCheck;