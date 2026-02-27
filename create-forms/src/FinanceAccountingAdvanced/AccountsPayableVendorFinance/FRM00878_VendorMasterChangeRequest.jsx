// FRM00878_VendorMasterChangeRequest.jsx
// FRM-00878 – Vendor Master Change Request – Request / Initiation
// Enterprise Grade – Accounts Payable & Vendor Finance

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
  requestId: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  requestedBy: Yup.string().required("Required"),
  contactDetails: Yup.string().required("Required"),
  vendorName: Yup.string().required("Required"),
  vendorCode: Yup.string().required("Required"),
  changeType: Yup.string().required("Required"),
  reasonForChange: Yup.string().required("Required")
});

/* ================= INITIAL VALUES ================= */

const initialValues = {
  formId: "FRM-00878",
  date: "",
  requestId: "",
  department: "",
  requestedBy: "",
  contactDetails: "",

  vendorName: "",
  vendorCode: "",
  vendorType: "",
  taxId: "",
  address: "",
  bankDetails: "",

  changeType: "",
  fieldsToBeChanged: "",
  reasonForChange: "",

  preparedSignature: {},
  reviewedSignature: {},
  approvedSignature: {},
  additionalSignatures: [],

  attachments: [],
  customFields: []
};

const FRM00878_VendorMasterChangeRequest = () => {

  const { isPrintMode } = usePrintMode();

  return (
    <ModernFormWrapper
      formId="FRM-00878"
      title="Vendor Master Change Request"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert("Vendor Master Change Request Submitted Successfully");
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <ModernA4Template
              formId="FRM-00878"
              title="VENDOR MASTER CHANGE REQUEST"
              department="Finance & Accounting – Accounts Payable & Vendor Finance"
            >

              {/* ================= BASIC INFORMATION ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Basic Information</h3>
                <div className="form-fields">
                  <Field name="date" type="date" className="form-input" />
                  <Field name="requestId" placeholder="Request ID" className="form-input" />
                  <Field name="department" placeholder="Department" className="form-input" />
                  <Field name="requestedBy" placeholder="Requested By" className="form-input" />
                  <Field name="contactDetails" placeholder="Contact Details" className="form-input" />
                </div>
              </div>

              {/* ================= VENDOR DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Vendor Details</h3>
                <div className="form-fields">
                  <Field name="vendorName" placeholder="Vendor Name" className="form-input" />
                  <Field name="vendorCode" placeholder="Vendor Code" className="form-input" />
                  <Field name="vendorType" placeholder="Vendor Type" className="form-input" />
                  <Field name="taxId" placeholder="Tax ID / GSTIN" className="form-input" />
                  <Field name="address" placeholder="Address" className="form-input" />
                  <Field name="bankDetails" placeholder="Bank Details" className="form-input" />
                </div>
              </div>

              {/* ================= CHANGE DETAILS ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Change Details</h3>
                <div className="form-fields">

                  <Field
                    as="select"
                    name="changeType"
                    className="form-input"
                  >
                    <option value="">Select Change Type</option>
                    <option value="Add">Add</option>
                    <option value="Update">Update</option>
                    <option value="Deactivate">Deactivate</option>
                  </Field>

                  <Field
                    name="fieldsToBeChanged"
                    placeholder="Fields to be Changed"
                    className="form-input"
                  />

                  <Field
                    name="reasonForChange"
                    placeholder="Reason for Change"
                    className="form-input"
                  />

                </div>
              </div>

              {/* ================= CUSTOM FIELDS ================= */}
              <FormCustomFields values={values} />

              {/* ================= ATTACHMENTS ================= */}
              <FormAttachments values={values} />

              {/* ================= APPROVAL WORKFLOW ================= */}
              <div className="form-section">
                <h3 className="form-section-title">Approval Workflow</h3>
                <div className="three-column-signatures">
                  <ApprovalSignatureBlock
                    label="Prepared By"
                    value={values.preparedSignature}
                    onChange={(val) => setFieldValue("preparedSignature", val)}
                  />

                  <ApprovalSignatureBlock
                    label="Reviewed By"
                    value={values.reviewedSignature}
                    onChange={(val) => setFieldValue("reviewedSignature", val)}
                  />

                  <ApprovalSignatureBlock
                    label="Approved By"
                    value={values.approvedSignature}
                    onChange={(val) => setFieldValue("approvedSignature", val)}
                  />
                </div>
              </div>

              {/* ================= CUSTOM SIGNATURES ================= */}
              <FieldArray name="additionalSignatures">
                {({ push, remove }) => (
                  <>
                    {!isPrintMode && (
                      <button
                        type="button"
                        className="btn-submit"
                        onClick={() => push({ data: {} })}
                      >
                        + Add Custom Signature
                      </button>
                    )}

                    {values.additionalSignatures.map((sig, index) => (
                      <div key={index}>
                        <ApprovalSignatureBlock
                          label={`Custom Signature ${index + 1}`}
                          value={sig.data || {}}
                          onChange={(val) =>
                            setFieldValue(`additionalSignatures.${index}.data`, val)
                          }
                        />
                        {!isPrintMode && (
                          <button type="button" onClick={() => remove(index)}>
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </FieldArray>

              {/* ================= SUBMIT ================= */}
              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Vendor Master Change Request
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

export default FRM00878_VendorMasterChangeRequest;
