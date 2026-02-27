// FRM01229_ExportPackingList.jsx
// FRM-01229 / 01230 / 01231 – Export Packing List
// Enterprise Grade – Trade Compliance – Exports (India)

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
  referenceNumber: Yup.string().required("Required"),
  customerName: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01229", // Change if needed
  date: "",
  department: "Trade Compliance",
  function: "Exports (India)",

  referenceNumber: "",
  businessUnit: "",
  preparedBy: "",
  location: "",

  customerName: "",
  consignee: "",
  destinationCountry: "",
  portOfLoading: "",
  portOfDischarge: "",
  invoiceNumber: "",

  packingItems: [
    {
      packageNo: "",
      description: "",
      hsCode: "",
      quantity: "",
      unit: "",
      netWeight: "",
      grossWeight: "",
      dimensions: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  totalPackages: "",
  totalNetWeight: "",
  totalGrossWeight: "",
  summaryRemarks: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01229_ExportPackingList = () => {

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
    <ModernFormWrapper
      formId={initialValues.formId}
      title="Export Packing List"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Export Packing List Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId={initialValues.formId}
              title="EXPORT PACKING LIST"
              department="Trade Compliance – Exports (India)"
            >

              {/* GENERAL INFO */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"date","Date","date")}
                  {field(values,"department","Department")}
                  {field(values,"function","Function")}
                  {field(values,"referenceNumber","Reference Number")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"preparedBy","Prepared By")}
                  {field(values,"location","Location")}
                </div>
              </div>

              {/* SHIPMENT DETAILS */}
              <div className="form-section">
                <h3 className="form-section-title">Shipment Details</h3>
                <div className="form-fields">
                  {field(values,"customerName","Customer Name")}
                  {field(values,"consignee","Consignee")}
                  {field(values,"destinationCountry","Destination Country")}
                  {field(values,"portOfLoading","Port of Loading")}
                  {field(values,"portOfDischarge","Port of Discharge")}
                  {field(values,"invoiceNumber","Invoice Number")}
                </div>
              </div>

              {/* PACKING DETAILS TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">Packing Details</h3>

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
                        setFieldValue("packingItems", [
                          ...values.packingItems,
                          {
                            packageNo: "",
                            description: "",
                            hsCode: "",
                            quantity: "",
                            unit: "",
                            netWeight: "",
                            grossWeight: "",
                            dimensions: "",
                            remarks: "",
                            dynamicFields: {}
                          }
                        ])
                      }
                    >
                      + Add Item
                    </button>
                  </div>
                )}

                <FieldArray name="packingItems">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Package No</th>
                          <th>Description</th>
                          <th>HS Code</th>
                          <th>Quantity</th>
                          <th>Unit</th>
                          <th>Net Weight</th>
                          <th>Gross Weight</th>
                          <th>Dimensions</th>
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
                        {values.packingItems.map((row,index)=>(
                          <tr key={index}>
                            <td><Field name={`packingItems.${index}.packageNo`} className="form-input"/></td>
                            <td><Field name={`packingItems.${index}.description`} className="form-input"/></td>
                            <td><Field name={`packingItems.${index}.hsCode`} className="form-input"/></td>
                            <td><Field name={`packingItems.${index}.quantity`} className="form-input"/></td>
                            <td><Field name={`packingItems.${index}.unit`} className="form-input"/></td>
                            <td><Field name={`packingItems.${index}.netWeight`} className="form-input"/></td>
                            <td><Field name={`packingItems.${index}.grossWeight`} className="form-input"/></td>
                            <td><Field name={`packingItems.${index}.dimensions`} className="form-input"/></td>
                            <td><Field name={`packingItems.${index}.remarks`} className="form-input"/></td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field name={`packingItems.${index}.dynamicFields.${col.key}`} className="form-input"/>
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

              {/* SUMMARY */}
              <div className="form-section">
                <h3 className="form-section-title">Summary</h3>
                <div className="form-fields">
                  {field(values,"totalPackages","Total Packages")}
                  {field(values,"totalNetWeight","Total Net Weight")}
                  {field(values,"totalGrossWeight","Total Gross Weight")}
                  {field(values,"summaryRemarks","Remarks")}
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
                    Submit Packing List
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

export default FRM01229_ExportPackingList;