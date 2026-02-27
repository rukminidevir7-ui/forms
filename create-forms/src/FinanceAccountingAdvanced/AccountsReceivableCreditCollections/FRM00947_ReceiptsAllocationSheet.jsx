// FRM00947_00948_00949_ReceiptsAllocationSheet.jsx
// FRM-00947 / 00948 / 00949 – Receipts Allocation Sheet
// Enterprise Grade – Accounts Receivable, Credit & Collections

import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
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
  customerName: Yup.string().required("Required"),
  receiptAmount: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00947 / 00948 / 00949",
  version: "1.0",
  date: "",
  department: "Finance & Accounting (Advanced)",
  function: "Accounts Receivable, Credit & Collections",
  referenceNumber: "",
  location: "",
  allocationType: "",
  priority: "",

  /* Customer / Payer Details */
  customerName: "",
  customerId: "",
  accountNumber: "",
  businessAddress: "",
  contactPerson: "",
  phone: "",

  /* Receipt Details */
  receiptNumber: "",
  receiptDate: "",
  receiptAmount: "",
  currency: "",
  paymentMethod: "",
  bankReference: "",

  /* Allocation Details */
  invoiceNumber: "",
  invoiceDate: "",
  invoiceAmount: "",
  allocatedAmount: "",
  remainingBalance: "",
  allocationNotes: "",

  /* Summary */
  totalReceiptAmount: "",
  totalAllocated: "",
  unallocatedBalance: "",

  /* Attachments */
  supportingDocumentsAttached: "",
  documentReference: "",

  /* Authorization Workflow */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Approved By", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM00947_ReceiptsAllocationSheet = () => {

  const { isPrintMode } = usePrintMode();

  return (
    <ModernFormWrapper
      formId="FRM-00947"
      title="Receipts Allocation Sheet"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Receipts Allocation Sheet Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00947 / 00948 / 00949"
              title="RECEIPTS ALLOCATION SHEET"
              department="Finance & Accounting (Advanced) – Accounts Receivable, Credit & Collections"
            >

              {/* ================= GENERAL INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">General Information</h3>
                <div className="form-fields">
                  <Field name="formId" disabled className="form-input"/>
                  <Field name="date" type="date" className="form-input"/>
                  <Field name="department" className="form-input"/>
                  <Field name="function" className="form-input"/>
                  <Field name="referenceNumber" placeholder="Reference Number" className="form-input"/>
                  <Field name="location" placeholder="Location" className="form-input"/>
                  <Field name="allocationType" placeholder="Allocation Type" className="form-input"/>
                  <Field name="priority" as="select" className="form-input">
                    <option value="">Select Priority</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </Field>
                </div>
              </div>

              {/* ================= CUSTOMER / PAYER DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Customer / Payer Details</h3>
                <div className="form-fields">
                  <Field name="customerName" placeholder="Customer Name" className="form-input"/>
                  <Field name="customerId" placeholder="Customer ID" className="form-input"/>
                  <Field name="accountNumber" placeholder="Account Number" className="form-input"/>
                  <Field name="businessAddress" placeholder="Business Address" className="form-input"/>
                  <Field name="contactPerson" placeholder="Contact Person" className="form-input"/>
                  <Field name="phone" placeholder="Phone" className="form-input"/>
                </div>
              </div>

              {/* ================= RECEIPT DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Receipt Details</h3>
                <div className="form-fields">
                  <Field name="receiptNumber" placeholder="Receipt Number" className="form-input"/>
                  <Field name="receiptDate" type="date" className="form-input"/>
                  <Field name="receiptAmount" type="number" placeholder="Receipt Amount" className="form-input"/>
                  <Field name="currency" placeholder="Currency" className="form-input"/>
                  <Field name="paymentMethod" placeholder="Payment Method" className="form-input"/>
                  <Field name="bankReference" placeholder="Bank Reference" className="form-input"/>
                </div>
              </div>

              {/* ================= ALLOCATION DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Allocation Details</h3>
                <div className="form-fields">
                  <Field name="invoiceNumber" placeholder="Invoice Number" className="form-input"/>
                  <Field name="invoiceDate" type="date" className="form-input"/>
                  <Field name="invoiceAmount" type="number" placeholder="Invoice Amount" className="form-input"/>
                  <Field name="allocatedAmount" type="number" placeholder="Allocated Amount" className="form-input"/>
                  <Field name="remainingBalance" type="number" placeholder="Remaining Balance" className="form-input"/>
                  <Field name="allocationNotes" placeholder="Allocation Notes" className="form-input"/>
                </div>
              </div>

              {/* ================= SUMMARY ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Summary</h3>
                <div className="form-fields">
                  <Field name="totalReceiptAmount" type="number" placeholder="Total Receipt Amount" className="form-input"/>
                  <Field name="totalAllocated" type="number" placeholder="Total Allocated" className="form-input"/>
                  <Field name="unallocatedBalance" type="number" placeholder="Unallocated Balance" className="form-input"/>
                </div>
              </div>

              {/* ================= ATTACHMENTS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Attachments</h3>
                <div className="form-fields">
                  <Field name="supportingDocumentsAttached" as="select" className="form-input">
                    <option value="">Supporting Documents Attached?</option>
                    <option>Yes</option>
                    <option>No</option>
                  </Field>
                  <Field name="documentReference" placeholder="Document Reference" className="form-input"/>
                </div>
              </div>

              <FormAttachments values={values}/>
              <FormCustomFields values={values}/>

              {/* ================= AUTHORIZATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Authorization</h3>

                <FieldArray name="approvalRoles">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-submit"
                          onClick={() =>
                            push({ roleName: "New Role", data: {} })
                          }
                        >
                          + Add Role
                        </button>
                      )}

                      <div className="three-column-signatures">
                        {values.approvalRoles.map((role, index) => (
                          <div key={index}>
                            <ApprovalSignatureBlock
                              roleName={role.roleName}
                              value={role.data}
                              allowRoleEdit={!isPrintMode}
                              onRoleNameChange={(newName) =>
                                setFieldValue(`approvalRoles.${index}.roleName`, newName)
                              }
                              onChange={(val) =>
                                setFieldValue(`approvalRoles.${index}.data`, val)
                              }
                            />

                            {!isPrintMode && (
                              <button
                                type="button"
                                className="btn-remove-role"
                                onClick={() => remove(index)}
                              >
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
                    Submit Receipts Allocation Sheet
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

export default FRM00947_ReceiptsAllocationSheet;