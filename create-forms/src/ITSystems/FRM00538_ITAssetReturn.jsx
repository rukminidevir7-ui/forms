// FRM00538_ITAssetReturn.jsx
// FRM-00538 / FRM-00539 – IT Asset Return Form

import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormAttachments from '../components/FormAttachments';
import FormCustomFields from '../components/FormCustomFields';
import ApprovalSignatureBlock from "../components/ApprovalSignatureBlock";
import '../styles/FRM00611.css';

const validationSchema = Yup.object({

  departmentMeta: Yup.string().required('Required'),
  process: Yup.string().required('Required'),
  formType: Yup.string().required('Required'),
  returnDate: Yup.string().required('Required'),
  requestNo: Yup.string().required('Required'),
  projectCostCenter: Yup.string().required('Required'),
  returnLocation: Yup.string().required('Required'),
  requestedBy: Yup.string().required('Required'),

  items: Yup.array().of(
    Yup.object().shape({
      assetDescription: Yup.string().required('Required'),
      assetTagNo: Yup.string().required('Required'),
      category: Yup.string().required('Required'),
      returnedBy: Yup.string().required('Required'),
      returnedDepartment: Yup.string().required('Required'),
      assetReturnDate: Yup.string().required('Required'),
      condition: Yup.string().required('Required'),
      accessoriesReturned: Yup.string(),
      remarks: Yup.string()
    })
  ).min(1, 'At least one asset required'),

  receivedByName: Yup.string().required('Required'),
  inspectedByName: Yup.string().required('Required'),
  inspectionDate: Yup.string().required('Required'),
  conditionStatus: Yup.string().required('Required'),

  overallRemarks: Yup.string(),

  preparedBySignature: Yup.object(),
  checkedBySignature: Yup.object(),
  approvedBySignature: Yup.object(),
  assetOwnerSignature: Yup.object(),

  additionalSignatures: Yup.array(),
  customFields: Yup.array(),
  attachments: Yup.array()
});

const initialValues = {

  departmentMeta: 'IT & Systems',
  process: 'IT Service Management',
  formType: 'Return',
  returnDate: '',
  requestNo: '',
  projectCostCenter: '',
  returnLocation: '',
  requestedBy: '',

  items: [
    {
      assetDescription: '',
      assetTagNo: '',
      category: '',
      returnedBy: '',
      returnedDepartment: '',
      assetReturnDate: '',
      condition: '',
      accessoriesReturned: '',
      remarks: ''
    }
  ],

  receivedByName: '',
  inspectedByName: '',
  inspectionDate: '',
  conditionStatus: '',

  overallRemarks: '',

  preparedBySignature: {},
  checkedBySignature: {},
  approvedBySignature: {},
  assetOwnerSignature: {},

  additionalSignatures: [],
  customFields: [],
  attachments: []
};

const FRM00538_ITAssetReturn = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type = 'text') => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '_________'}</div>
      ) : (
        <>
          <Field name={name} type={type} className="form-input" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  const textarea = (values, name, label) => (
    <div className="form-field full-width">
      <label className="form-label">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '_________'}</div>
      ) : (
        <>
          <Field as="textarea" name={name} className="form-textarea" rows="3" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (
    <ModernFormWrapper formId="FRM-00538" title="IT Asset Return Form">

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('IT Asset Return submitted successfully');
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>

            <ModernA4Template
              formId="FRM-00538"
              title="IT ASSET RETURN FORM"
              department="IT & Systems – IT Service Management"
            >

              {/* 1. Metadata */}
              <div className="form-section">
                <h3 className="form-section-title">1. Form Metadata</h3>
                <div className="form-fields">
                  {field(values,'departmentMeta','Department')}
                  {field(values,'process','Process')}
                  {field(values,'formType','Form Type')}
                  {field(values,'returnDate','Return Date','date')}
                  {field(values,'requestNo','Request No')}
                  {field(values,'projectCostCenter','Project / Cost Center')}
                  {field(values,'returnLocation','Return Location')}
                  {field(values,'requestedBy','Requested By')}
                </div>
              </div>

              {/* 2. Asset Return Table */}
              <div className="form-section">
                <h3 className="form-section-title">2. Asset Return Details</h3>

                <FieldArray name="items">
                  {({ push, remove }) => (
                    <>
                      {!isPrintMode && (
                        <div style={{ marginBottom: 20 }}>
                          <button
                            type="button"
                            className="btn-submit"
                            onClick={() =>
                              push({
                                assetDescription: '',
                                assetTagNo: '',
                                category: '',
                                returnedBy: '',
                                returnedDepartment: '',
                                assetReturnDate: '',
                                condition: '',
                                accessoriesReturned: '',
                                remarks: ''
                              })
                            }
                          >
                            + Add Asset
                          </button>
                        </div>
                      )}

                      <table className="items-table">
                        <thead>
                          <tr>
                            <th>Asset Description</th>
                            <th>Asset ID / Tag No</th>
                            <th>Category</th>
                            <th>Returned By</th>
                            <th>Department</th>
                            <th>Return Date</th>
                            <th>Condition</th>
                            <th>Accessories Returned</th>
                            <th>Remarks</th>
                            {!isPrintMode && <th>Action</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {values.items.map((row, index) => (
                            <tr key={index}>
                              <td><Field name={`items.${index}.assetDescription`} className="form-input" /></td>
                              <td><Field name={`items.${index}.assetTagNo`} className="form-input" /></td>
                              <td><Field name={`items.${index}.category`} className="form-input" /></td>
                              <td><Field name={`items.${index}.returnedBy`} className="form-input" /></td>
                              <td><Field name={`items.${index}.returnedDepartment`} className="form-input" /></td>
                              <td><Field name={`items.${index}.assetReturnDate`} type="date" className="form-input" /></td>
                              <td><Field name={`items.${index}.condition`} className="form-input" /></td>
                              <td><Field name={`items.${index}.accessoriesReturned`} className="form-input" /></td>
                              <td><Field name={`items.${index}.remarks`} className="form-input" /></td>
                              {!isPrintMode && (
                                <td>
                                  <button type="button" onClick={() => remove(index)}>Remove</button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </FieldArray>
              </div>

              {/* 3. Inspection Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Inspection Details</h3>
                <div className="form-fields">
                  {field(values,'receivedByName','Received By Name')}
                  {field(values,'inspectedByName','Inspected By Name')}
                  {field(values,'inspectionDate','Inspection Date','date')}
                  {field(values,'conditionStatus','Condition Status')}
                </div>
              </div>

              {/* 4. Overall Remarks */}
              <div className="form-section">
                <h3 className="form-section-title">4. Overall Remarks</h3>
                {textarea(values,'overallRemarks','Overall Remarks')}
              </div>

              {/* 5. Sign-Off */}
              <div className="form-section">
                <h3 className="form-section-title">5. Final Sign-Off</h3>

                <div className="three-column-signatures">
                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Prepared By"
                      value={values.preparedBySignature || {}}
                      onChange={(val) => setFieldValue("preparedBySignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Checked By"
                      value={values.checkedBySignature || {}}
                      onChange={(val) => setFieldValue("checkedBySignature", val)}
                    />
                  </div>

                  <div className="signature-column">
                    <ApprovalSignatureBlock
                      label="Approved By"
                      value={values.approvedBySignature || {}}
                      onChange={(val) => setFieldValue("approvedBySignature", val)}
                    />
                  </div>
                </div>

                <div style={{ marginTop: 30 }}>
                  <ApprovalSignatureBlock
                    label="IT Asset Owner"
                    value={values.assetOwnerSignature || {}}
                    onChange={(val) => setFieldValue("assetOwnerSignature", val)}
                  />
                </div>
              </div>

              <FormAttachments values={values} />
              <FormCustomFields values={values} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit IT Asset Return
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

export default FRM00538_ITAssetReturn;
