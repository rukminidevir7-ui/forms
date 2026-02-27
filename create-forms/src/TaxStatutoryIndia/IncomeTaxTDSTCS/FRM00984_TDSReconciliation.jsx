// FRM00984_TDSReconciliation.jsx
// FRM-00984 – TDS Reconciliation
// Enterprise Grade – Tax & Statutory (India) – Income Tax (TDS/TCS)

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

const validationSchema = Yup.object({
  referenceNumber: Yup.string().required("Required"),
  tan: Yup.string().required("Required"),
  reconciliationPeriodFrom: Yup.date().required("Required"),
  reconciliationPeriodTo: Yup.date().required("Required")
});

const initialValues = {
  formId: "FRM-00984",
  date: "",
  department: "Tax & Statutory (India)",
  function: "Income Tax – TDS/TCS",
  reconciliationPeriodFrom: "",
  reconciliationPeriodTo: "",
  referenceNumber: "",
  location: "",
  tan: "",
  financialYear: "",

  legalName: "",
  pan: "",
  businessUnit: "",
  contactPerson: "",
  phone: "",
  email: "",

  tdsAsPerBooks: "",
  tdsAsPerReturns: "",
  differenceAmount: "",
  differenceReason: "",
  challanBooks: "",
  challanOltas: "",
  netDifference: "",

  adjustmentsIdentified: "",
  adjustmentAmount: "",
  adjustmentNotes: "",

  complianceStatus: "",
  reconciliationStatus: "",
  keyIssues: "",
  actionRequired: "",

  supportingDocsAttached: "",
  documentReference: "",

  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM00984_TDSReconciliation = () => {

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
    <ModernFormWrapper formId="FRM-00984" title="TDS Reconciliation">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("TDS Reconciliation Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>
            <ModernA4Template
              formId="FRM-00984"
              title="TDS RECONCILIATION"
              department="Tax & Statutory (India) – Income Tax (TDS/TCS)"
            >

              {/* General Information */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  {field(values,"formId","Form ID")}
                  {field(values,"date","Date","date")}
                  {field(values,"department","Department")}
                  {field(values,"function","Function")}
                  {field(values,"reconciliationPeriodFrom","Reconciliation Period From","date")}
                  {field(values,"reconciliationPeriodTo","Reconciliation Period To","date")}
                  {field(values,"referenceNumber","Reference Number")}
                  {field(values,"location","Location")}
                  {field(values,"tan","TAN")}
                  {field(values,"financialYear","Financial Year")}
                </div>
              </div>

              {/* Entity Details */}
              <div className="form-section">
                <h3 className="form-section-title">Entity Details</h3>
                <div className="form-fields">
                  {field(values,"legalName","Legal Name")}
                  {field(values,"pan","PAN")}
                  {field(values,"businessUnit","Business Unit")}
                  {field(values,"contactPerson","Contact Person")}
                  {field(values,"phone","Phone")}
                  {field(values,"email","Email")}
                </div>
              </div>

              {/* Reconciliation Summary */}
              <div className="form-section">
                <h3 className="form-section-title">Reconciliation Summary</h3>
                <div className="form-fields">
                  {field(values,"tdsAsPerBooks","TDS as per Books","number")}
                  {field(values,"tdsAsPerReturns","TDS as per Returns","number")}
                  {field(values,"differenceAmount","Difference Amount","number")}
                  {field(values,"differenceReason","Difference Reason")}
                  {field(values,"challanBooks","Challan Amount as per Books","number")}
                  {field(values,"challanOltas","Challan Amount as per OLTAS","number")}
                  {field(values,"netDifference","Net Difference","number")}
                </div>
              </div>

              {/* Adjustments */}
              <div className="form-section">
                <h3 className="form-section-title">Adjustments</h3>
                <div className="form-fields">
                  {field(values,"adjustmentsIdentified","Adjustments Identified")}
                  {field(values,"adjustmentAmount","Adjustment Amount","number")}
                  {field(values,"adjustmentNotes","Adjustment Notes")}
                </div>
              </div>

              {/* Compliance Status */}
              <div className="form-section">
                <h3 className="form-section-title">Compliance Status</h3>
                <div className="form-fields">
                  {field(values,"complianceStatus","Compliance Status")}
                  {field(values,"reconciliationStatus","Reconciliation Status")}
                  {field(values,"keyIssues","Key Issues")}
                  {field(values,"actionRequired","Action Required")}
                </div>
              </div>

              {/* Attachments */}
              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>
                <FieldArray name="approvalRoles">
                  {({ push, remove })=>(
                    <>
                      {!isPrintMode && (
                        <button type="button" className="btn-submit"
                          onClick={()=>push({ roleName:"New Role", data:{} })}>
                          + Add Role
                        </button>
                      )}
                      <div className="three-column-signatures">
                        {values.approvalRoles.map((role,index)=>(
                          <div key={index}>
                            <ApprovalSignatureBlock
                              roleName={role.roleName}
                              value={role.data}
                              allowRoleEdit={!isPrintMode}
                              onRoleNameChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.roleName`,val)
                              }
                              onChange={(val)=>
                                setFieldValue(`approvalRoles.${index}.data`,val)
                              }
                            />
                            {!isPrintMode && (
                              <button type="button"
                                className="btn-remove-role"
                                onClick={()=>remove(index)}>
                                Remove Role
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </FieldArray>
              </div>

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit TDS Reconciliation
                  </button>
                </div>
              )}

            </ModernA4Template>
          </Form>
        )}
      </Formik>
    </ModernFormWrapper>
  );
};

export default FRM00984_TDSReconciliation;