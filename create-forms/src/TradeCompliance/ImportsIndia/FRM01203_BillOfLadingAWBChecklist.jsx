// FRM01203_BillOfLadingAWBChecklist.jsx
// FRM-01203 – Bill of Lading / AWB Checklist
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
  shipmentReference: Yup.string().required("Required"),
  documentNumber: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01203",
  date: "",
  department: "Trade Compliance",
  function: "Imports (India)",

  shipmentReference: "",
  documentNumber: "",
  supplierShipper: "",
  consignee: "",
  preparedBy: "",
  location: "",

  checklistItems: [
    { item: "Document Number Verified", status: "", remarks: "" },
    { item: "Shipper Details Correct", status: "", remarks: "" },
    { item: "Consignee Details Correct", status: "", remarks: "" },
    { item: "Notify Party Details Verified", status: "", remarks: "" },
    { item: "Port of Loading Correct", status: "", remarks: "" },
    { item: "Port of Discharge Correct", status: "", remarks: "" },
    { item: "Description of Goods Matches Invoice", status: "", remarks: "" },
    { item: "Number of Packages Verified", status: "", remarks: "" },
    { item: "Gross / Net Weight Verified", status: "", remarks: "" },
    { item: "Freight Terms Verified", status: "", remarks: "" },
    { item: "Original Copies Received", status: "", remarks: "" },
    { item: "Signatures and Stamps Verified", status: "", remarks: "" }
  ],

  overallStatus: "",
  discrepanciesFound: "",
  correctiveAction: "",
  summaryRemarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01203_BillOfLadingAWBChecklist = () => {

  const { isPrintMode } = usePrintMode();

  return (
    <ModernFormWrapper
      formId="FRM-01203"
      title="Bill of Lading / AWB Checklist"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("BL / AWB Checklist Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01203"
              title="BILL OF LADING / AWB CHECKLIST"
              department="Trade Compliance – Imports (India)"
            >

              {/* GENERAL INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  <Field name="formId" className="form-input" disabled />
                  <Field name="date" type="date" className="form-input" />
                  <Field name="department" className="form-input" />
                  <Field name="function" className="form-input" />
                  <Field name="shipmentReference" className="form-input" placeholder="Shipment Reference"/>
                  <Field name="documentNumber" className="form-input" placeholder="Document Number"/>
                  <Field name="supplierShipper" className="form-input" placeholder="Supplier / Shipper"/>
                  <Field name="consignee" className="form-input" placeholder="Consignee"/>
                  <Field name="preparedBy" className="form-input" placeholder="Prepared By"/>
                  <Field name="location" className="form-input" placeholder="Location"/>
                </div>
              </div>

              {/* CHECKLIST TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">Checklist Items</h3>

                {!isPrintMode && (
                  <button
                    type="button"
                    className="btn-submit"
                    onClick={() =>
                      setFieldValue("checklistItems", [
                        ...values.checklistItems,
                        { item: "", status: "", remarks: "" }
                      ])
                    }
                  >
                    + Add Item
                  </button>
                )}

                <FieldArray name="checklistItems">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Item Description</th>
                          <th>Status (Yes/No)</th>
                          <th>Remarks</th>
                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {values.checklistItems.map((row,index)=>(
                          <tr key={index}>
                            <td>
                              <Field name={`checklistItems.${index}.item`} className="form-input"/>
                            </td>
                            <td>
                              <Field
                                as="select"
                                name={`checklistItems.${index}.status`}
                                className="form-input"
                              >
                                <option value="">Select</option>
                                <option>Yes</option>
                                <option>No</option>
                              </Field>
                            </td>
                            <td>
                              <Field name={`checklistItems.${index}.remarks`} className="form-input"/>
                            </td>
                            {!isPrintMode &&
                              <td>
                                <button type="button" onClick={()=>remove(index)}>
                                  Remove
                                </button>
                              </td>
                            }
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>
              </div>

              {/* SUMMARY */}
              <div className="form-section">
                <h3 className="form-section-title">Checklist Summary</h3>
                <div className="form-fields">
                  <Field name="overallStatus" className="form-input" placeholder="Overall Status"/>
                  <Field name="discrepanciesFound" className="form-input" placeholder="Discrepancies Found"/>
                  <Field name="correctiveAction" className="form-input" placeholder="Corrective Action"/>
                  <Field name="summaryRemarks" className="form-input" placeholder="Remarks"/>
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
                    Submit BL / AWB Checklist
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

export default FRM01203_BillOfLadingAWBChecklist;