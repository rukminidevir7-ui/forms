// FRM01093_InsurancePremiumReconciliation.jsx
// FRM-01093 – Insurance Premium Reconciliation
// Enterprise Grade – Insurance & Risk Finance – Insurance Management

import React, { useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePrintMode } from "../PrintModeContext";
import ModernFormWrapper from "../components/ModernFormWrapper";
import ModernA4Template from "../components/ModernA4Template";
import FormAttachments from "../components/FormAttachments";
import FormCustomFields from "../components/FormCustomFields";
import ApprovalSignatureBlock from "../components/ApprovalSignatureBlock";
import "../styles/FRM00611.css";

/* ================= VALIDATION ================= */

const validationSchema = Yup.object({
  policyNumber: Yup.string().required("Required"),
  insurerName: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-01093",
  date: "",
  department: "Insurance & Risk Finance",
  function: "Insurance Management",
  referenceNumber: "",
  location: "",
  businessUnit: "",
  preparedBy: "",
  currency: "",
  periodCovered: "",

  policyNumber: "",
  insurerName: "",
  policyType: "",
  policyPeriodFrom: "",
  policyPeriodTo: "",

  openingBalance: "",
  premiumPayable: "",
  premiumPaid: "",
  adjustments: "",
  closingBalance: "",

  varianceAmount: "",
  reasonForVariance: "",
  supportingNotes: "",

  reconciliationLines: [
    {
      date: "",
      description: "",
      debit: "",
      credit: "",
      balance: "",
      remarks: "",
      dynamicFields: {}
    }
  ],

  reconciliationStatus: "",
  comments: "",
  nextActions: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM01093_InsurancePremiumReconciliation = () => {

  const { isPrintMode } = usePrintMode();
  const [dynamicColumns, setDynamicColumns] = useState([]);

  /* ================= DYNAMIC COLUMN FUNCTIONS ================= */

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

  const calculateBalance = (lines) => {
    let runningBalance = 0;
    return lines.map(line => {
      const debit = Number(line.debit) || 0;
      const credit = Number(line.credit) || 0;
      runningBalance += debit - credit;
      return runningBalance;
    });
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
      formId="FRM-01093"
      title="Insurance Premium Reconciliation"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Insurance Premium Reconciliation Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => {

          const balances = calculateBalance(values.reconciliationLines);

          return (
            <Form>
              <ModernA4Template
                formId="FRM-01093"
                title="INSURANCE PREMIUM RECONCILIATION"
                department="Insurance & Risk Finance – Insurance Management"
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
                    {field(values,"businessUnit","Business Unit")}
                    {field(values,"preparedBy","Prepared By")}
                    {field(values,"currency","Currency")}
                    {field(values,"periodCovered","Period Covered")}
                  </div>
                </div>

                {/* POLICY DETAILS */}
                <div className="form-section">
                  <h3 className="form-section-title">Policy Details</h3>
                  <div className="form-fields">
                    {field(values,"policyNumber","Policy Number")}
                    {field(values,"insurerName","Insurer Name")}
                    {field(values,"policyType","Policy Type")}
                    {field(values,"policyPeriodFrom","Policy Period From","date")}
                    {field(values,"policyPeriodTo","Policy Period To","date")}
                  </div>
                </div>

                {/* RECONCILIATION SUMMARY */}
                <div className="form-section">
                  <h3 className="form-section-title">Reconciliation Summary</h3>
                  <div className="form-fields">
                    {field(values,"openingBalance","Opening Balance","number")}
                    {field(values,"premiumPayable","Premium Payable","number")}
                    {field(values,"premiumPaid","Premium Paid","number")}
                    {field(values,"adjustments","Adjustments","number")}
                    {field(values,"closingBalance","Closing Balance","number")}
                  </div>
                </div>

                {/* VARIANCE ANALYSIS */}
                <div className="form-section">
                  <h3 className="form-section-title">Variance Analysis</h3>
                  <div className="form-fields">
                    {field(values,"varianceAmount","Variance Amount","number")}
                    {field(values,"reasonForVariance","Reason for Variance")}
                    {field(values,"supportingNotes","Supporting Notes")}
                  </div>
                </div>

                {/* DETAILED LINES */}
                <div className="form-section">
                  <h3 className="form-section-title">Detailed Lines</h3>

                  {!isPrintMode && (
                    <div style={{ marginBottom: 15 }}>
                      <button type="button" className="btn-submit" onClick={addColumn}>
                        + Add Column
                      </button>
                    </div>
                  )}

                  <FieldArray name="reconciliationLines">
                    {({ push, remove }) => (
                      <>
                        {!isPrintMode && (
                          <button
                            type="button"
                            className="btn-submit"
                            style={{ marginBottom: 15 }}
                            onClick={() =>
                              push({
                                date:"",
                                description:"",
                                debit:"",
                                credit:"",
                                balance:"",
                                remarks:"",
                                dynamicFields:{}
                              })
                            }
                          >
                            + Add Line
                          </button>
                        )}

                        <table className="items-table">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Description</th>
                              <th>Debit</th>
                              <th>Credit</th>
                              <th>Balance</th>
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
                            {values.reconciliationLines.map((row,index)=>(
                              <tr key={index}>
                                <td><Field name={`reconciliationLines.${index}.date`} type="date" className="form-input"/></td>
                                <td><Field name={`reconciliationLines.${index}.description`} className="form-input"/></td>
                                <td><Field name={`reconciliationLines.${index}.debit`} type="number" className="form-input"/></td>
                                <td><Field name={`reconciliationLines.${index}.credit`} type="number" className="form-input"/></td>
                                <td className="print-value">{balances[index]}</td>
                                <td><Field name={`reconciliationLines.${index}.remarks`} className="form-input"/></td>

                                {dynamicColumns.map(col=>(
                                  <td key={col.key}>
                                    <Field name={`reconciliationLines.${index}.dynamicFields.${col.key}`} className="form-input"/>
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
                      </>
                    )}
                  </FieldArray>
                </div>

                {/* CONFIRMATION */}
                <div className="form-section">
                  <h3 className="form-section-title">Confirmation</h3>
                  <div className="form-fields">
                    {field(values,"reconciliationStatus","Reconciliation Status")}
                    {field(values,"comments","Comments")}
                    {field(values,"nextActions","Next Actions")}
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
                      Submit Insurance Premium Reconciliation
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

export default FRM01093_InsurancePremiumReconciliation;