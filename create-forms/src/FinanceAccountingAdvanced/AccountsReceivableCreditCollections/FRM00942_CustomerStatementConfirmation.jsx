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
                  <Field name="formId" disabled className="form-input"/>
                  <Field name="date" type="date" className="form-input"/>
                  <Field name="department" className="form-input"/>
                  <Field name="function" className="form-input"/>
                  <Field name="statementPeriodFrom" type="date" className="form-input"/>
                  <Field name="statementPeriodTo" type="date" className="form-input"/>
                  <Field name="referenceNumber" placeholder="Reference Number" className="form-input"/>
                  <Field name="location" placeholder="Location" className="form-input"/>
                </div>
              </div>

              {/* ================= CUSTOMER DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Customer Details</h3>
                <div className="form-fields">
                  <Field name="customerName" placeholder="Customer Name" className="form-input"/>
                  <Field name="customerId" placeholder="Customer ID" className="form-input"/>
                  <Field name="accountNumber" placeholder="Account Number" className="form-input"/>
                  <Field name="businessAddress" placeholder="Business Address" className="form-input"/>
                  <Field name="contactPerson" placeholder="Contact Person" className="form-input"/>
                  <Field name="phone" placeholder="Phone" className="form-input"/>
                  <Field name="email" type="email" placeholder="Email" className="form-input"/>
                </div>
              </div>

              {/* ================= STATEMENT SUMMARY ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Statement Summary</h3>
                <div className="form-fields">
                  <Field name="openingBalance" type="number" placeholder="Opening Balance" className="form-input"/>
                  <Field name="currency" placeholder="Currency" className="form-input"/>
                  <Field name="totalInvoices" type="number" placeholder="Total Invoices" className="form-input"/>
                  <Field name="totalPayments" type="number" placeholder="Total Payments" className="form-input"/>
                  <Field name="adjustments" type="number" placeholder="Adjustments" className="form-input"/>
                  <Field name="closingBalance" type="number" placeholder="Closing Balance" className="form-input"/>
                </div>
              </div>

              {/* ================= CONFIRMATION DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Confirmation Details</h3>
                <div className="form-fields">
                  <Field name="confirmationStatus" as="select" className="form-input">
                    <option value="">Select Confirmation Status</option>
                    <option>Confirmed</option>
                    <option>Confirmed with Differences</option>
                    <option>Not Confirmed</option>
                  </Field>
                  <Field name="customerComments" placeholder="Customer Comments" className="form-input"/>
                  <Field name="discrepancyDetails" placeholder="Discrepancy Details" className="form-input"/>
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