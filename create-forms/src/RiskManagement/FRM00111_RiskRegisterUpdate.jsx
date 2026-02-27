// FRM00111_RiskRegisterUpdate.jsx
// FRM-00111 – Risk Register Update – Log / Register Form

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
  updateDate: Yup.string().required('Required'),
  departmentFunction: Yup.string().required('Required'),
  updatedByName: Yup.string().required('Required'),
  employeeId: Yup.string().required('Required'),
  contactNumber: Yup.string().required('Required'),
  updateType: Yup.string().required('Required'),
  priorityLevel: Yup.string().required('Required'),

  // Risk Register Table
  riskRegisterItems: Yup.array().of(
    Yup.object({
      riskId: Yup.string().required('Required'),
      riskTitle: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      owner: Yup.string().required('Required'),
      likelihood: Yup.string().required('Required'),
      impact: Yup.string().required('Required'),
      rating: Yup.string().required('Required'),
      status: Yup.string().required('Required')
    })
  ),

  // Update Details
  changeSummary: Yup.string().required('Required'),
  reasonForUpdate: Yup.string().required('Required'),
  impactOnRiskProfile: Yup.string().required('Required'),

  // Authorization
  updatedByAuthorization: Yup.string().required('Required'),
  reviewedBy: Yup.string().required('Required'),
  approvedBy: Yup.string().required('Required'),
  approvalDate: Yup.string().required('Required'),
  approvalComments: Yup.string().required('Required'),

  customFields: Yup.array(),
  attachments: Yup.array(),
  signatures: Yup.array()

});

const initialValues = {

  updateDate: '',
  departmentFunction: '',
  updatedByName: '',
  employeeId: '',
  contactNumber: '',
  updateType: '',
  priorityLevel: '',

  riskRegisterItems: [
    {
      riskId: '',
      riskTitle: '',
      description: '',
      owner: '',
      likelihood: '',
      impact: '',
      rating: '',
      status: ''
    }
  ],

  changeSummary: '',
  reasonForUpdate: '',
  impactOnRiskProfile: '',

  updatedByAuthorization: '',
  reviewedBy: '',
  approvedBy: '',
  approvalDate: '',
  approvalComments: '',

  customFields: [],
  attachments: [],
  signatures: []

};

const FRM00111_RiskRegisterUpdate = () => {

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
      formId="FRM-00111"
      title="Risk Register Update – Log / Register Form"
    >

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          alert('Risk register updated successfully');
        }}
      >

        {({ values, setFieldValue }) => (

          <Form>

            <ModernA4Template
              formId="FRM-00111"
              title="Risk Register Update – Log / Register"
              department="Risk Management – Enterprise Risk"
            >

              {/* Basic Information */}
              <div className="form-section">
                <h3 className="form-section-title">1. Basic Information</h3>
                <div className="form-fields">
                  {field(values,'updateDate','Date','date')}
                  {field(values,'departmentFunction','Department / Function')}
                  {field(values,'updatedByName','Updated By')}
                  {field(values,'employeeId','Employee ID')}
                  {field(values,'contactNumber','Contact')}
                  {select(values,'updateType','Update Type',['New Risk','Risk Modification','Status Change','Closure','Reassessment'])}
                  {select(values,'priorityLevel','Priority',['Low','Medium','High','Critical'])}
                </div>
              </div>

              {/* Risk Register Details */}
              <div className="form-section">
                <h3 className="form-section-title">2. Risk Register Details</h3>

                <FieldArray name="riskRegisterItems">
                  {({ push, remove }) => (
                    <div>
                      {values.riskRegisterItems.map((item, index) => (
                        <div key={index} className="form-section" style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
                          <div className="form-fields">
                            {field(values,`riskRegisterItems.${index}.riskId`,'Risk ID')}
                            {field(values,`riskRegisterItems.${index}.riskTitle`,'Risk Title')}
                            {textarea(values,`riskRegisterItems.${index}.description`,'Description')}
                            {field(values,`riskRegisterItems.${index}.owner`,'Owner')}
                            {select(values,`riskRegisterItems.${index}.likelihood`,'Likelihood',['Rare','Unlikely','Possible','Likely','Almost Certain'])}
                            {select(values,`riskRegisterItems.${index}.impact`,'Impact',['Insignificant','Minor','Moderate','Major','Severe'])}
                            {field(values,`riskRegisterItems.${index}.rating`,'Risk Rating')}
                            {select(values,`riskRegisterItems.${index}.status`,'Status',['Open','Under Review','Mitigated','Closed','Escalated'])}
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
                            riskId: '',
                            riskTitle: '',
                            description: '',
                            owner: '',
                            likelihood: '',
                            impact: '',
                            rating: '',
                            status: ''
                          })}
                        >
                          Add Risk Entry
                        </button>
                      )}
                    </div>
                  )}
                </FieldArray>
              </div>

              {/* Update Details */}
              <div className="form-section">
                <h3 className="form-section-title">3. Update Details</h3>
                <div className="form-fields">
                  {textarea(values,'changeSummary','Change Summary')}
                  {textarea(values,'reasonForUpdate','Reason for Update')}
                  {textarea(values,'impactOnRiskProfile','Impact on Overall Risk Profile')}
                </div>
              </div>

              {/* Authorization */}
              <div className="form-section">
                <h3 className="form-section-title">4. Authorization</h3>
                <div className="form-fields">
                  {field(values,'updatedByAuthorization','Updated By (Authorization)')}
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
                    Submit Update
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

export default FRM00111_RiskRegisterUpdate;
