// FRM01052_CollateralValuationRequest.jsx
// FRM-01052 – Collateral Valuation Request
// Enterprise Grade – Treasury & Funding – Lending, Borrowing & Credit Facilities

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
  borrowerName: Yup.string().required("Required"),
  collateralType: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01052",
  date: "",
  department: "Treasury & Funding",
  function: "Lending, Borrowing & Credit Facilities",
  referenceNumber: "",
  location: "",
  borrowerName: "",
  facilityReference: "",
  businessUnit: "",
  currency: "",

  collateralItems: [
    {
      collateralType: "",
      description: "",
      locationDetail: "",
      ownershipDetails: "",
      currentBookValue: "",
      dynamicFields: {}
    }
  ],

  requestedValuer: "",
  purposeOfValuation: "",
  valuationBasis: "",
  requiredByDate: "",

  riskConsiderations: "",
  specialInstructions: "",
  remarks: "",

  approvalRoles: [
    { roleName: "Requested By", data:{} },
    { roleName: "Reviewed By", data:{} },
    { roleName: "Approved By", data:{} }
  ],

  attachments: [],
  customFields: []
};

const FRM01052_CollateralValuationRequest = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= COLUMN MANAGEMENT ================= */

  const addColumn = () => {
    const name = prompt("Enter New Column Name");
    if (!name) return;

    const key = name.replace(/\s+/g,"");
    if (dynamicColumns.find(col => col.key === key)) {
      alert("Column already exists");
      return;
    }

    setDynamicColumns([...dynamicColumns,{ key, label:name }]);
  };

  const removeColumn = (key) => {
    setDynamicColumns(dynamicColumns.filter(col => col.key !== key));
  };

  const field = (values,name,label,type="text") => (
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
      formId="FRM-01052"
      title="Collateral Valuation Request"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Collateral Valuation Request Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-01052"
              title="COLLATERAL VALUATION REQUEST"
              department="Treasury & Funding – Lending, Borrowing & Credit Facilities"
            >

              {/* GENERAL INFORMATION */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"date","Date","date")}
                  {field(values,"referenceNumber","Reference Number")}
                  {field(values,"location","Location")}
                  {field(values,"borrowerName","Borrower Name")}
                  {field(values,"facilityReference","Facility Reference")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"currency","Currency")}
                </div>
              </div>

              {/* COLLATERAL DETAILS TABLE */}
              <div className="form-section">
                <h3 className="form-section-title">Collateral Details</h3>

                {!isPrintMode && (
                  <div style={{marginBottom:15}}>
                    <button type="button" className="btn-submit" onClick={addColumn}>
                      + Add Column
                    </button>

                    <button
                      type="button"
                      className="btn-submit"
                      style={{marginLeft:10}}
                      onClick={()=>setFieldValue("collateralItems",[
                        ...values.collateralItems,
                        {
                          collateralType:"",
                          description:"",
                          locationDetail:"",
                          ownershipDetails:"",
                          currentBookValue:"",
                          dynamicFields:{}
                        }
                      ])}
                    >
                      + Add Collateral
                    </button>
                  </div>
                )}

                <FieldArray name="collateralItems">
                  {({ remove }) => (
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Collateral Type</th>
                          <th>Description</th>
                          <th>Location</th>
                          <th>Ownership Details</th>
                          <th>Current Book Value</th>

                          {dynamicColumns.map(col=>(
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
                        {values.collateralItems.map((row,index)=>(
                          <tr key={index}>
                            <td><Field name={`collateralItems.${index}.collateralType`} className="form-input"/></td>
                            <td><Field name={`collateralItems.${index}.description`} className="form-input"/></td>
                            <td><Field name={`collateralItems.${index}.locationDetail`} className="form-input"/></td>
                            <td><Field name={`collateralItems.${index}.ownershipDetails`} className="form-input"/></td>
                            <td><Field name={`collateralItems.${index}.currentBookValue`} className="form-input"/></td>

                            {dynamicColumns.map(col=>(
                              <td key={col.key}>
                                <Field
                                  name={`collateralItems.${index}.dynamicFields.${col.key}`}
                                  className="form-input"
                                />
                              </td>
                            ))}

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

              {/* VALUATION REQUEST */}
              <div className="form-section">
                <h3 className="form-section-title">Valuation Request</h3>
                <div className="form-fields">
                  {field(values,"requestedValuer","Requested Valuer")}
                  {field(values,"purposeOfValuation","Purpose of Valuation")}
                  {field(values,"valuationBasis","Valuation Basis")}
                  {field(values,"requiredByDate","Required By Date","date")}
                </div>
              </div>

              {/* RISK & NOTES */}
              <div className="form-section">
                <h3 className="form-section-title">Risk and Notes</h3>
                <div className="form-fields">
                  {field(values,"riskConsiderations","Risk Considerations")}
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
                              onRoleNameChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.roleName`,val)}
                              onChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.data`,val)}
                            />
                            {!isPrintMode &&
                              <button type="button" onClick={()=>remove(index)}>
                                Remove Role
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
                    Submit Collateral Valuation Request
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

export default FRM01052_CollateralValuationRequest;