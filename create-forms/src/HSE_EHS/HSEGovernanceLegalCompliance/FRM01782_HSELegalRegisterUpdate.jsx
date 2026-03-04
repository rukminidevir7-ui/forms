// FRM01782_HSELegalRegisterUpdate.jsx
// FRM-01782 – HSE Legal Register Update Log
// Enterprise Grade – HSE Governance & Legal Compliance

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
  department: Yup.string().required("Required"),
  updateDate: Yup.string().required("Required"),
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01782",
  date: "",
  department: "HSE / EHS",
  businessUnit: "",
  siteLocation: "",
  updateDate: "",
  status: "",

  companyName: "",
  corporateOfficeAddress: "",
  plantSiteName: "",
  hseManagerName: "",

  legalEntries: [
    {
      actName: "",
      sectionClause: "",
      amendmentDetails: "",
      effectiveDate: "",
      applicability: "",
      complianceStatus: "",
      responsiblePerson: "",
      nextReviewDate: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  regulatoryAuthorityName: "",
  notificationNumber: "",
  governmentCircularReference: "",

  legalNotificationAttached: "",
  supportingDocumentsAttached: "",
  uploadReferenceId: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By (HSE Manager)", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01782_HSELegalRegisterUpdate = () => {

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

  const field = (values, name, label, type="text", isTextArea=false) => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || "_________"}</div>
        : isTextArea
          ? <Field as="textarea" name={name} className="form-input" rows="3"/>
          : <Field name={name} type={type} className="form-input"/>
      }
      <ErrorMessage name={name} component="div" className="form-error"/>
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-01782" title="HSE Legal Register Update Log">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("HSE Legal Register Update Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01782"
              title="HSE LEGAL REGISTER UPDATE LOG"
              department="HSE / EHS – Governance & Legal Compliance"
            >

              {/* General Information */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"date","Date","date")}
                  {field(values,"department","Department")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"siteLocation","Site / Location")}
                  {field(values,"updateDate","Update Date","date")}
                  {field(values,"status","Status")}
                </div>
              </div>

              {/* Organization Details */}
              <div className="form-section">
                <h3 className="form-section-title">Organization Details</h3>
                <div className="form-fields">
                  {field(values,"companyName","Company Name")}
                  {field(values,"corporateOfficeAddress","Corporate Office Address", "text", true)}
                  {field(values,"plantSiteName","Plant / Site Name")}
                  {field(values,"hseManagerName","HSE Manager Name")}
                </div>
              </div>

              {/* Legal Register Table */}
              <div className="form-section">
                <h3 className="form-section-title">Legal Register Update Entries</h3>

                {!isPrintMode && (
                  <div style={{ marginBottom: 15 }}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>
                    <button
                      type="button"
                      className="btn-submit"
                      style={{ marginLeft: 10 }}
                      onClick={() =>
                        setFieldValue("legalEntries", [
                          ...values.legalEntries,
                          {
                            actName: "",
                            sectionClause: "",
                            amendmentDetails: "",
                            effectiveDate: "",
                            applicability: "",
                            complianceStatus: "",
                            responsiblePerson: "",
                            nextReviewDate: "",
                            remarks: "",
                            dynamicFields: {}
                          }
                        ])
                      }
                    >
                      + Add Row
                    </button>
                  </div>
                )}

                <FieldArray name="legalEntries">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Act / Regulation</th>
                          <th>Section / Clause</th>
                          <th>Amendment Details</th>
                          <th>Effective Date</th>
                          <th>Applicability</th>
                          <th>Compliance Status</th>
                          <th>Responsible Person</th>
                          <th>Next Review Date</th>
                          <th>Remarks</th>
                          {dynamicColumns.map(col => (
                            <th key={col.key}>
                              {col.label}
                              {!isPrintMode &&
                                <button type="button" onClick={()=>removeColumn(col.key)}>x</button>
                              }
                            </th>
                          ))}
                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>

                      <tbody>
                        {values.legalEntries.map((row,index)=>(
                          <tr key={index}>
                            <td><Field as="textarea" name={`legalEntries.${index}.actName`} className="form-input"/></td>
                            <td><Field as="textarea" name={`legalEntries.${index}.sectionClause`} className="form-input"/></td>
                            <td><Field as="textarea" name={`legalEntries.${index}.amendmentDetails`} className="form-input"/></td>
                            <td><Field type="date" name={`legalEntries.${index}.effectiveDate`} className="form-input"/></td>
                            <td><Field name={`legalEntries.${index}.applicability`} className="form-input"/></td>
                            <td><Field name={`legalEntries.${index}.complianceStatus`} className="form-input"/></td>
                            <td><Field name={`legalEntries.${index}.responsiblePerson`} className="form-input"/></td>
                            <td><Field type="date" name={`legalEntries.${index}.nextReviewDate`} className="form-input"/></td>
                            <td><Field as="textarea" name={`legalEntries.${index}.remarks`} className="form-input"/></td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`legalEntries.${index}.dynamicFields.${col.key}`} className="form-input"/>
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
              </div>

              {/* Regulatory Authority */}
              <div className="form-section">
                <h3 className="form-section-title">Regulatory Authority Reference</h3>
                <div className="form-fields">
                  {field(values,"regulatoryAuthorityName","Regulatory Authority Name")}
                  {field(values,"notificationNumber","Notification Number")}
                  {field(values,"governmentCircularReference","Government Circular Reference")}
                </div>
              </div>

              {/* Custom Fields */}
              <FormCustomFields values={values}/>

              {/* Attachments */}
              <div className="form-section">
                <FormAttachments values={values}/>
                <div className="form-fields">
                  {field(values,"legalNotificationAttached","Legal Notification Attached (Yes/No)")}
                  {field(values,"supportingDocumentsAttached","Supporting Documents Attached (Yes/No)")}
                  {field(values,"uploadReferenceId","Upload Reference ID")}
                </div>
              </div>

              {/* Approval */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>

                <FieldArray name="approvalRoles">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode &&
                        <button type="button" className="btn-submit"
                          onClick={()=>push({ roleName:"New Role", data:{} })}>
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
                    Submit HSE Legal Register Update
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

export default FRM01782_HSELegalRegisterUpdate;