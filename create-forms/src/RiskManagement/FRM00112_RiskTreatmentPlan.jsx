// FRM00112_RiskTreatmentPlan.jsx
// FRM-00112 – Risk Treatment Plan – Report / Record

import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { usePrintMode } from '../PrintModeContext';
import ModernFormWrapper from '../components/ModernFormWrapper';
import ModernA4Template from '../components/ModernA4Template';
import FormAttachments from '../components/FormAttachments';
import FormCustomFields from '../components/FormCustomFields';
import FormSignatures from '../components/FormSignatures';
import '../styles/FRM00611.css';

const validationSchema = Yup.object({

  // Basic Information
  treatmentDate: Yup.string().required('Required'),
  departmentFunction: Yup.string().required('Required'),
  preparedBy: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  treatmentStrategy: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // Risk Details
  riskId: Yup.string().required('Required'),
  riskTitle: Yup.string().required('Required'),
  riskDescription: Yup.string().required('Required'),
  riskOwner: Yup.string().required('Required'),
  currentRating: Yup.string().required('Required'),

  // Treatment Actions
  treatmentActions: Yup.array().of(
    Yup.object({
      actionDescription: Yup.string().required('Required'),
      actionOwner: Yup.string().required('Required'),
      targetDate: Yup.string().required('Required'),
      status: Yup.string().required('Required'),
      remarks: Yup.string()
    })
  ),

  // Residual Risk
  residualRiskRating: Yup.string().required('Required'),
  targetRiskLevel: Yup.string().required('Required'),
  monitoringMethod: Yup.string().required('Required'),
  reviewFrequency: Yup.string().required('Required'),

  // Authorization
  preparedByAuthorization: Yup.string().required('Required'),
  reviewedBy: Yup.string().required('Required'),
  approvedBy: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  treatmentDate: '',
  departmentFunction: '',
  preparedBy: '',
  employeeId: '',
  contactNumber: '',
  treatmentStrategy: '',
  priorityLevel: '',

  riskId: '',
  riskTitle: '',
  riskDescription: '',
  riskOwner: '',
  currentRating: '',

  treatmentActions: [
    {
      actionDescription: '',
      actionOwner: '',
      targetDate: '',
      status: '',
      remarks: ''
    }
  ],

  residualRiskRating: '',
  targetRiskLevel: '',
  monitoringMethod: '',
  reviewFrequency: '',

  preparedByAuthorization: '',
  reviewedBy: '',
  approvedBy: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00112_RiskTreatmentPlan = () => {

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
      formId="FRM-00112"
      title="Risk Treatment Plan – Report / Record"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Risk treatment plan submitted successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00112"
              title="Risk Treatment Plan"
              department="Risk Management – Enterprise Risk"
            >

              {/* Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'treatmentDate','Date','date')}
                  {field(values,'departmentFunction','Department / Function')}
                  {field(values,'preparedBy','Prepared By')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'contactNumber','Contact')}
                  {select(values,'treatmentStrategy','Treatment Strategy',['Avoid','Reduce','Transfer','Accept'])}
                  {select(values,'priorityLevel','Priority',['Low','Medium','High','Critical'])}
                </div>
              </div>

              {/* Risk Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Risk Details</h3>
                <div className="form-fields">
                  {field(values,'riskId','Risk ID')}
                  {field(values,'riskTitle','Risk Title')}
                  {textarea(values,'riskDescription','Risk Description')}
                  {field(values,'riskOwner','Risk Owner')}
                  {field(values,'currentRating','Current Risk Rating')}
                </div>
              </div>

              {/* Treatment Actions */}
              <div className="form-section">
                <h3 className="form-section-title">3. Treatment Actions</h3>

                <FieldArray name="treatmentActions">
                  {({ push, remove }) => (
                    <div>
                      {values.treatmentActions.map((action, index) => (
                        <div key={index} className="form-section" style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
                          <div className="form-fields">
                            {textarea(values,`treatmentActions.${index}.actionDescription`,'Action Description')}
                            {field(values,`treatmentActions.${index}.actionOwner`,'Owner')}
                            {field(values,`treatmentActions.${index}.targetDate`,'Target Date','date')}
                            {select(values,`treatmentActions.${index}.status`,'Status',['Planned','In Progress','Completed','Delayed'])}
                            {textarea(values,`treatmentActions.${index}.remarks`,'Remarks')}
                          </div>
                          {!isPrintMode && (
                            <button type="button" className="btn-remove" onClick={() => remove(index)}>Remove</button>
                          )}
                        </div>
                      ))}
                      {!isPrintMode && (
                        <button
                          type="button"
                          className="btn-add-field"
                          onClick={() => push({
                            actionDescription: '',
                            actionOwner: '',
                            targetDate: '',
                            status: '',
                            remarks: ''
                          })}
                        >
                          Add Treatment Action
                        </button>
                      )}
                    </div>
                  )}
                </FieldArray>
              </div>

              {/* Residual Risk */}
              <div className="form-section">
                <h3 className="form-section-title">4. Residual Risk</h3>
                <div className="form-fields">
                  {field(values,'residualRiskRating','Residual Risk Rating')}
                  {field(values,'targetRiskLevel','Target Risk Level')}
                  {field(values,'monitoringMethod','Monitoring Method')}
                  {select(values,'reviewFrequency','Review Frequency',['Monthly','Quarterly','Bi-Annually','Annually'])}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">5. Authorization</h3>
                <div className="form-fields">
                  {field(values,'preparedByAuthorization','Prepared By (Authorization)')}
                  {field(values,'reviewedBy','Reviewed By')}
                  {field(values,'approvedBy','Approved By')}
                  {field(values,'approvalDate','Approval Date','date')}
                  {textarea(values,'approvalComments','Comments')}
                </div>
              </div>

              <FormCustomFields values={values} />
              <FormAttachments values={values} />
              <FormSignatures values={values} setFieldValue={setFieldValue} />

              {!isPrintMode && (
                <div className="form-actions">
                  <button type="submit" className="btn-submit">
                    Submit Treatment Plan
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

export default FRM00112_RiskTreatmentPlan;
