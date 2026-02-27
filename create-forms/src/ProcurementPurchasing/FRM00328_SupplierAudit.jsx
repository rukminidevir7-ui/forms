// FRM00328_SupplierAudit.jsx
// FRM-00328 – Supplier Audit – Checklist Form

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormAttachments from '../components/FormAttachments';
import FormCustomFields from '../components/FormCustomFields';
import FormSignatures from '../components/FormSignatures';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({

  // 1. Basic Information
  auditDate: Yup.string().required('Required'),
  department: Yup.string().required('Required'),
  auditorName: Yup.string().required('Required'),
  referenceNumber: Yup.string().required('Required'),
  auditPeriod: Yup.string().required('Required'),

  // 2. Supplier Details
  supplierName: Yup.string().required('Required'),
  supplierId: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  contactPerson: Yup.string().required('Required'),
  contractReference: Yup.string().required('Required'),

  // 3. Audit Checklist
  qmsInPlace: Yup.string().required('Required'),
  regulatoryCompliance: Yup.string().required('Required'),
  documentedProcedures: Yup.string().required('Required'),
  adequateControls: Yup.string().required('Required'),
  healthSafetyCompliance: Yup.string().required('Required'),
  environmentalCompliance: Yup.string().required('Required'),
  financialStability: Yup.string().required('Required'),
  dataSecurityControls: Yup.string().required('Required'),

  qmsComments: Yup.string().required('Required'),
  regulatoryComments: Yup.string().required('Required'),
  proceduresComments: Yup.string().required('Required'),
  controlsComments: Yup.string().required('Required'),
  hsComments: Yup.string().required('Required'),
  envComments: Yup.string().required('Required'),
  financialComments: Yup.string().required('Required'),
  dataSecurityComments: Yup.string().required('Required'),

  // 4. Findings & Observations
  keyFindings: Yup.string().required('Required'),
  nonConformities: Yup.string().required('Required'),
  recommendations: Yup.string().required('Required'),

  // 5. Risk Assessment
  riskRating: Yup.string().required('Required'),
  correctiveActions: Yup.string().required('Required'),
  targetCompletionDate: Yup.string().required('Required'),

  // 6. Authorization
  auditorApproval: Yup.string().required('Required'),
  procurementReview: Yup.string().required('Required'),
  complianceApproval: Yup.string().required('Required'),
  managementApproval: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  // 7. Supporting Information
  supportingDocuments: Yup.string(),
  additionalNotes: Yup.string(),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  auditDate: '',
  department: '',
  auditorName: '',
  referenceNumber: '',
  auditPeriod: '',

  supplierName: '',
  supplierId: '',
  category: '',
  location: '',
  contactPerson: '',
  contractReference: '',

  qmsInPlace: '',
  regulatoryCompliance: '',
  documentedProcedures: '',
  adequateControls: '',
  healthSafetyCompliance: '',
  environmentalCompliance: '',
  financialStability: '',
  dataSecurityControls: '',

  qmsComments: '',
  regulatoryComments: '',
  proceduresComments: '',
  controlsComments: '',
  hsComments: '',
  envComments: '',
  financialComments: '',
  dataSecurityComments: '',

  keyFindings: '',
  nonConformities: '',
  recommendations: '',

  riskRating: '',
  correctiveActions: '',
  targetCompletionDate: '',

  auditorApproval: '',
  procurementReview: '',
  complianceApproval: '',
  managementApproval: '',
  approvalComments: '',

  supportingDocuments: '',
  additionalNotes: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00328_SupplierAudit = () => {

  const { isPrintMode } = usePrintMode();

  const field = (values, name, label, type = 'text') => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '___________________'}</div>
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
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '___________________'}</div>
      ) : (
        <>
          <Field as="textarea" name={name} className="form-textarea" rows="3" />
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  const select = (values, name, label, options) => (
    <div className="form-field">
      <label className="form-label required">{label}</label>
      {isPrintMode ? (
        <div className="print-value">{values[name] || '___________________'}</div>
      ) : (
        <>
          <Field as="select" name={name} className="form-input">
            <option value="">-- Select --</option>
            {options.map(o => <option key={o} value={o}>{o}</option>)}
          </Field>
          <ErrorMessage name={name} component="div" className="form-error" />
        </>
      )}
    </div>
  );

  return (

    <ModernFormWrapper
      formId="FRM-00328"
      title="Supplier Audit – Checklist"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Supplier audit checklist submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00328"
              title="Supplier Audit Checklist"
              department="Procurement & Purchasing – Supplier Management"
            >

              {/* 1. Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'auditDate','Audit Date','date')}
                  {field(values,'department','Department')}
                  {field(values,'auditorName','Auditor Name')}
                  {field(values,'referenceNumber','Reference Number')}
                  {field(values,'auditPeriod','Audit Period')}
                </div>
              </div>

              {/* 2. Supplier Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Supplier Details</h3>
                <div className="form-fields">
                  {field(values,'supplierName','Supplier Name')}
                  {field(values,'supplierId','Supplier ID')}
                  {field(values,'category','Category')}
                  {field(values,'location','Location')}
                  {field(values,'contactPerson','Contact Person')}
                  {field(values,'contractReference','Contract / PO Reference')}
                </div>
              </div>

              {/* 3. Audit Checklist */}
              <div className="form-section">
                <h3 className="form-section-title">3. Audit Checklist</h3>
                <div className="form-fields">
                  {select(values,'qmsInPlace','Quality Management System in place',['Yes','No'])}
                  {textarea(values,'qmsComments','Comments')}

                  {select(values,'regulatoryCompliance','Regulatory Compliance met',['Yes','No'])}
                  {textarea(values,'regulatoryComments','Comments')}

                  {select(values,'documentedProcedures','Documented Procedures available',['Yes','No'])}
                  {textarea(values,'proceduresComments','Comments')}

                  {select(values,'adequateControls','Adequate Controls implemented',['Yes','No'])}
                  {textarea(values,'controlsComments','Comments')}

                  {select(values,'healthSafetyCompliance','Health & Safety compliance',['Yes','No'])}
                  {textarea(values,'hsComments','Comments')}

                  {select(values,'environmentalCompliance','Environmental compliance',['Yes','No'])}
                  {textarea(values,'envComments','Comments')}

                  {select(values,'financialStability','Financial stability verified',['Yes','No'])}
                  {textarea(values,'financialComments','Comments')}

                  {select(values,'dataSecurityControls','Data security controls adequate',['Yes','No'])}
                  {textarea(values,'dataSecurityComments','Comments')}
                </div>
              </div>

              {/* 4. Findings & Observations */}
              <div className="form-section">
                <h3 className="form-section-title">4. Findings & Observations</h3>
                <div className="form-fields">
                  {textarea(values,'keyFindings','Key Findings')}
                  {textarea(values,'nonConformities','Non-Conformities Identified')}
                  {textarea(values,'recommendations','Recommendations')}
                </div>
              </div>

              {/* 5. Risk Assessment */}
              <div className="form-section">
                <h3 className="form-section-title">5. Risk Assessment</h3>
                <div className="form-fields">
                  {select(values,'riskRating','Risk Rating',['Low','Medium','High','Critical'])}
                  {textarea(values,'correctiveActions','Corrective Actions Required')}
                  {field(values,'targetCompletionDate','Target Completion Date','date')}
                </div>
              </div>

              {/* 6. Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">6. Authorization</h3>
                <div className="form-fields">
                  {field(values,'auditorApproval','Auditor (Name & Signature)')}
                  {field(values,'procurementReview','Procurement Review')}
                  {field(values,'complianceApproval','Compliance Approval')}
                  {field(values,'managementApproval','Management Approval')}
                  {textarea(values,'approvalComments','Comments')}
                </div>
              </div>

              {/* 7. Supporting Information */}
              <div className="form-section">
                <h3 className="form-section-title">7. Supporting Information</h3>
                <div className="form-fields">
                  {textarea(values,'supportingDocuments','Supporting Documents')}
                  {textarea(values,'additionalNotes','Additional Notes')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Supplier Audit
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

export default FRM00328_SupplierAudit;
