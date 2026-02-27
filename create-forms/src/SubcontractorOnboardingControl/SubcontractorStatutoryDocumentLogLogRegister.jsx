// SubcontractorStatutoryDocumentLogLogRegister.jsx
// FRM-01157 – Subcontractor Statutory Document Log

import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormAttachments from '../components/FormAttachments';
import FormCustomFields from '../components/FormCustomFields';
import FormSignatures from '../components/FormSignatures';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({

  registerName: Yup.string().required('Required'),
  projectName: Yup.string().required('Required'),
  projectLocation: Yup.string().required('Required'),

  maintainedBy: Yup.string().required('Required'),
  maintainedDate: Yup.string().required('Required'),
  verifiedByName: Yup.string().required('Required'),

  documents: Yup.array().of(
    Yup.object({
      id: Yup.string(),
      subcontractorName: Yup.string().required('Required'),
      documentType: Yup.string().required('Required'),
      documentNumber: Yup.string().required('Required'),
      issueDate: Yup.string().required('Required'),
      expiryDate: Yup.string().required('Required'),
      status: Yup.string().required('Required'),
      verifiedBy: Yup.string().required('Required'),
      remarks: Yup.string()
    })
  )

});

const initialValues = {

  department: 'Subcontractor & Contracting',
  process: 'Subcontractor Onboarding & Control',
  formType: 'Log / Register',

  registerName: 'Subcontractor Statutory Document Register',
  projectName: '',
  projectLocation: '',

  documents: [
    {
      id: uuidv4(),
      subcontractorName: '',
      documentType: '',
      documentNumber: '',
      issueDate: '',
      expiryDate: '',
      status: '',
      verifiedBy: '',
      remarks: ''
    }
  ],

  maintainedBy: '',
  maintainedDate: '',
  verifiedByName: '',

  attachments: [],
  customFields: [],
  signatures: []

};

const SubcontractorStatutoryDocumentLogLogRegister = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values,name,label,type='text') => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode
        ? <div className="print-value">{values[name] || '___________________'}</div>
        : <>
            <Field name={name} type={type} className="form-input"/>
            <ErrorMessage name={name} component="div" className="form-error"/>
          </>
      }
    </div>
  );

  return (

    <ModernFormWrapper
      formId="FRM-01157"
      title="Subcontractor Statutory Document Log"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values)=>{
          console.log(values);
          alert('Statutory Document Log Saved Successfully');
        }}
      >

      {({values})=>(
        <Form>

          <ModernA4Template
            formId="FRM-01157"
            title="Subcontractor Statutory Document Log"
            department={values.department}
          >

            {/* Register Information */}
            <div className="form-section">
              <h3 className="form-section-title">Register Information</h3>
              <div className="form-fields">
                {field(values,'registerName','Register Name')}
                {field(values,'projectName','Project Name')}
                {field(values,'projectLocation','Project Location')}
              </div>
            </div>

            {/* Document Log Table */}
            <div className="form-section">
              <h3 className="form-section-title">Statutory Document Log</h3>

              <FieldArray name="documents">
                {(helpers)=>(
                  <div className="table-responsive">

                    <table className="modern-table">
                      <thead>
                        <tr>
                          <th>Subcontractor Name</th>
                          <th>Document Type</th>
                          <th>Document Number</th>
                          <th>Issue Date</th>
                          <th>Expiry Date</th>
                          <th>Status</th>
                          <th>Verified By</th>
                          <th>Remarks</th>
                          {!isPrintMode && <th>Action</th>}
                        </tr>
                      </thead>

                      <tbody>

                        {values.documents.map((doc,index)=>(
                          <tr key={doc.id}>

                            <td>
                              {isPrintMode
                                ? doc.subcontractorName
                                : <Field name={`documents.${index}.subcontractorName`}
                                         className="form-input"/>
                              }
                            </td>

                            <td>
                              {isPrintMode
                                ? doc.documentType
                                : <Field name={`documents.${index}.documentType`}
                                         className="form-input"/>
                              }
                            </td>

                            <td>
                              {isPrintMode
                                ? doc.documentNumber
                                : <Field name={`documents.${index}.documentNumber`}
                                         className="form-input"/>
                              }
                            </td>

                            <td>
                              {isPrintMode
                                ? doc.issueDate
                                : <Field type="date"
                                         name={`documents.${index}.issueDate`}
                                         className="form-input"/>
                              }
                            </td>

                            <td>
                              {isPrintMode
                                ? doc.expiryDate
                                : <Field type="date"
                                         name={`documents.${index}.expiryDate`}
                                         className="form-input"/>
                              }
                            </td>

                            <td>
                              {isPrintMode
                                ? doc.status
                                : <Field as="select"
                                         name={`documents.${index}.status`}
                                         className="form-input">
                                    <option value="">--Select--</option>
                                    <option value="Valid">Valid</option>
                                    <option value="Expired">Expired</option>
                                  </Field>
                              }
                            </td>

                            <td>
                              {isPrintMode
                                ? doc.verifiedBy
                                : <Field name={`documents.${index}.verifiedBy`}
                                         className="form-input"/>
                              }
                            </td>

                            <td>
                              {isPrintMode
                                ? doc.remarks
                                : <Field name={`documents.${index}.remarks`}
                                         className="form-input"/>
                              }
                            </td>

                            {!isPrintMode && (
                              <td>
                                <button
                                  type="button"
                                  className="btn-remove"
                                  onClick={()=>helpers.remove(index)}
                                >
                                  Remove
                                </button>
                              </td>
                            )}

                          </tr>
                        ))}

                      </tbody>
                    </table>

                    {!isPrintMode && (
                      <button
                        type="button"
                        className="btn-add-field"
                        onClick={()=>helpers.push({
                          id:uuidv4(),
                          subcontractorName:'',
                          documentType:'',
                          documentNumber:'',
                          issueDate:'',
                          expiryDate:'',
                          status:'',
                          verifiedBy:'',
                          remarks:''
                        })}
                      >
                        Add Document Row
                      </button>
                    )}

                  </div>
                )}
              </FieldArray>

            </div>

            {/* Sign-off */}
            <div className="form-section">
              <h3 className="form-section-title">Sign-off</h3>
              <div className="form-fields">
                {field(values,'maintainedBy','Maintained By')}
                {field(values,'maintainedDate','Maintained Date','date')}
                {field(values,'verifiedByName','Verified By Name')}
              </div>
            </div>

            {/* Universal Components */}
            <FormAttachments />
            <FormCustomFields />
            <FormSignatures />

            {!isPrintMode && (
              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  Save Register
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

export default SubcontractorStatutoryDocumentLogLogRegister;
