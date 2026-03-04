// FRM00942_CustomerStatementConfirmation.jsx
// FRM-00942 – Customer Statement Confirmation
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
  statementPeriodFrom: Yup.date().required("Required"),
  statementPeriodTo: Yup.date().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00942",
  version: "1.0",
  date: "",
  department: "Finance & Accounting (Advanced)",
  function: "Accounts Receivable, Credit & Collections",
  statementPeriodFrom: "",
  statementPeriodTo: "",
  referenceNumber: "",
  location: "",

  /* Customer Details */
  customerName: "",
  customerId: "",
  accountNumber: "",
  businessAddress: "",
  contactPerson: "",
  phone: "",
  email: "",

  /* Statement Summary */
  openingBalance: "",
  currency: "",
  totalInvoices: "",
  totalPayments: "",
  adjustments: "",
  closingBalance: "",

  /* Confirmation Details */
  confirmationStatus: "",
  customerComments: "",
  discrepancyDetails: "",

  /* Authorization Roles */
  approvalRoles: [
    { roleName: "Prepared By", data: {} },
    { roleName: "Reviewed By", data: {} },
    { roleName: "Confirmed By (Customer)", data: {} }
  ],

  attachments: [],
  customFields: []
};

const FRM00942_CustomerStatementConfirmation = () => {

  const { isPrintMode } = usePrintMode();

  return (
    <ModernFormWrapper
      formId="FRM-00942"
      title="Customer Statement Confirmation"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert("Customer Statement Confirmation Submitted Successfully");
        }}
      >
        {({ values, setFieldValue })=>(
          <Form>

            <ModernA4Template
              formId="FRM-00942"
              title="CUSTOMER STATEMENT CONFIRMATION"
              department="Finance & Accounting (Advanced) – Accounts Receivable, Credit & Collections"
            >

              {/* ================= GENERAL INFORMATION ================= */}
<div className="form-section">
  <h3 className="form-section-title">General Information</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Form ID</label>
      <Field name="formId" disabled className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Date</label>
      <Field name="date" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Department</label>
      <Field name="department" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Function</label>
      <Field name="function" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Statement Period From</label>
      <Field name="statementPeriodFrom" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Statement Period To</label>
      <Field name="statementPeriodTo" type="date" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Reference Number</label>
      <Field name="referenceNumber" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Location</label>
      <Field name="location" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= CUSTOMER DETAILS ================= */}
<div className="form-section">
  <h3 className="form-section-title">Customer Details</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Customer Name</label>
      <Field name="customerName" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Customer ID</label>
      <Field name="customerId" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Account Number</label>
      <Field name="accountNumber" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Business Address</label>
      <Field name="businessAddress" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Contact Person</label>
      <Field name="contactPerson" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Phone</label>
      <Field name="phone" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Email</label>
      <Field name="email" type="email" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= STATEMENT SUMMARY ================= */}
<div className="form-section">
  <h3 className="form-section-title">Statement Summary</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Opening Balance</label>
      <Field name="openingBalance" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Currency</label>
      <Field name="currency" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Total Invoices</label>
      <Field name="totalInvoices" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Total Payments</label>
      <Field name="totalPayments" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Adjustments</label>
      <Field name="adjustments" type="number" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Closing Balance</label>
      <Field name="closingBalance" type="number" className="form-input"/>
    </div>

  </div>
</div>


{/* ================= CONFIRMATION DETAILS ================= */}
<div className="form-section">
  <h3 className="form-section-title">Confirmation Details</h3>
  <div className="form-fields">

    <div className="form-field">
      <label className="form-label">Confirmation Status</label>
      <Field name="confirmationStatus" as="select" className="form-input">
        <option value="">Select Confirmation Status</option>
        <option>Confirmed</option>
        <option>Confirmed with Differences</option>
        <option>Not Confirmed</option>
      </Field>
    </div>

    <div className="form-field">
      <label className="form-label">Customer Comments</label>
      <Field name="customerComments" className="form-input"/>
    </div>

    <div className="form-field">
      <label className="form-label">Discrepancy Details</label>
      <Field name="discrepancyDetails" className="form-input"/>
    </div>

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
                    Submit Statement Confirmation
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

export default FRM00942_CustomerStatementConfirmation;